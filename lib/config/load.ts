import { readFile } from "node:fs/promises";
import path from "node:path";
import { parse } from "yaml";
import { dashboardConfigSchema, type DashboardConfig } from "./schema";

function getConfigPath(): string {
  const configuredPath = process.env.CONFIG_PATH;
  return path.resolve(process.cwd(), configuredPath || "config.yaml");
}

export async function loadDashboardConfig(): Promise<DashboardConfig> {
  const configPath = getConfigPath();
  const raw = await readFile(configPath, "utf-8");
  const parsed = parse(raw);
  return dashboardConfigSchema.parse(parsed);
}
