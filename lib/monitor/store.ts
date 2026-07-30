import { mkdirSync, readFileSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import type { MonitorResult, MonitorStatus } from "./check";

export type MonitorSample = MonitorResult & { checkedAt: number };

const HISTORY_WINDOW_MS = 24 * 60 * 60 * 1000;

function getDataDir(): string {
  const configuredDir = process.env.DATA_DIR;
  return path.resolve(process.cwd(), configuredDir || "data");
}

function getFilePathForUrl(url: string): string {
  const hash = createHash("sha256").update(url).digest("hex").slice(0, 16);
  return path.join(getDataDir(), `${hash}.json`);
}

type PersistedEntry = {
  url: string;
  samples: MonitorSample[];
};

const memoryCache = new Map<string, MonitorSample[]>();
let hydrated = false;

function ensureDataDir(): void {
  mkdirSync(getDataDir(), { recursive: true });
}

function hydrateFromDisk(): void {
  if (hydrated) {
    return;
  }
  hydrated = true;
  ensureDataDir();

  let files: string[] = [];
  try {
    files = readdirSync(getDataDir()).filter((file) => file.endsWith(".json"));
  } catch {
    return;
  }

  for (const file of files) {
    try {
      const raw = readFileSync(path.join(getDataDir(), file), "utf-8");
      const parsed = JSON.parse(raw) as PersistedEntry;
      memoryCache.set(parsed.url, parsed.samples);
    } catch {
      // Skip unreadable/corrupt files rather than crash the whole store.
    }
  }
}

function pruneToWindow(samples: MonitorSample[]): MonitorSample[] {
  const cutoff = Date.now() - HISTORY_WINDOW_MS;
  return samples.filter((sample) => sample.checkedAt >= cutoff);
}

function persist(url: string, samples: MonitorSample[]): void {
  ensureDataDir();
  const entry: PersistedEntry = { url, samples };
  writeFileSync(getFilePathForUrl(url), JSON.stringify(entry), "utf-8");
}

export function recordSample(url: string, result: MonitorResult): void {
  hydrateFromDisk();

  const existing = memoryCache.get(url) ?? [];
  const updated = pruneToWindow([...existing, { ...result, checkedAt: Date.now() }]);

  memoryCache.set(url, updated);
  persist(url, updated);
}

export function removeUrl(url: string): void {
  hydrateFromDisk();
  memoryCache.delete(url);
  try {
    rmSync(getFilePathForUrl(url), { force: true });
  } catch {
    // Best-effort cleanup; a leftover file will simply be ignored on next hydrate.
  }
}

export function pruneOrphanedUrls(activeUrls: Set<string>): void {
  hydrateFromDisk();
  for (const url of memoryCache.keys()) {
    if (!activeUrls.has(url)) {
      removeUrl(url);
    }
  }
}

export const HEARTBEAT_HISTORY_LENGTH = 50;

export type MonitorSnapshot = {
  latest: MonitorSample;
  uptimePercent: number;
  sampleCount: number;
  history: MonitorSample[];
};

function snapshotFromSamples(samples: MonitorSample[]): MonitorSnapshot | undefined {
  const recentSamples = pruneToWindow(samples);
  if (recentSamples.length === 0) {
    return undefined;
  }

  const upCount = recentSamples.filter((sample) => sample.status === ("up" as MonitorStatus)).length;
  const uptimePercent = (upCount / recentSamples.length) * 100;
  const latest = recentSamples[recentSamples.length - 1];
  const history = recentSamples.slice(-HEARTBEAT_HISTORY_LENGTH);

  return { latest, uptimePercent, sampleCount: recentSamples.length, history };
}

export function getSnapshot(url: string): MonitorSnapshot | undefined {
  hydrateFromDisk();
  const samples = memoryCache.get(url);
  if (!samples) {
    return undefined;
  }
  return snapshotFromSamples(samples);
}

export function getAllSnapshots(): Map<string, MonitorSnapshot> {
  hydrateFromDisk();
  const snapshots = new Map<string, MonitorSnapshot>();
  for (const [url, samples] of memoryCache) {
    const snapshot = snapshotFromSamples(samples);
    if (snapshot) {
      snapshots.set(url, snapshot);
    }
  }
  return snapshots;
}
