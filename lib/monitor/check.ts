import type { LinkItem } from "@/lib/config/schema";

export type MonitorStatus = "up" | "degraded" | "down";

export type MonitorResult = {
  status: MonitorStatus;
  detail?: string;
};

const CHECK_TIMEOUT_MS = 5000;

export async function checkItemStatus(item: LinkItem): Promise<MonitorResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS);

  try {
    const response = await fetch(item.url, {
      method: "GET",
      signal: controller.signal,
      redirect: "follow",
      cache: "no-store",
    });

    if (item.okStatus.includes(response.status)) {
      return { status: "up" };
    }

    return {
      status: "degraded",
      detail: `Unexpected status: ${response.status} ${response.statusText}`.trim(),
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return { status: "down", detail: `Timed out after ${CHECK_TIMEOUT_MS}ms` };
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return { status: "down", detail: message };
  } finally {
    clearTimeout(timeout);
  }
}
