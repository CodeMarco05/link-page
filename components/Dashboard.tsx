import { connection } from "next/server";
import { loadDashboardConfig } from "@/lib/config/load";
import { collectMonitorSnapshots } from "@/lib/monitor/collect";
import { GroupSection } from "./GroupSection";
import { Clock } from "./Clock";
import { GroupStoragePruner } from "./GroupStoragePruner";
import { ThemeProvider } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

export async function Dashboard() {
  // config.yaml and the monitor data dir are runtime mounts, so this page must
  // render per request rather than being prerendered at build time.
  await connection();

  const config = await loadDashboardConfig();
  const monitorSnapshots = collectMonitorSnapshots(config);

  return (
    <ThemeProvider defaultTheme={config.theme}>
      <div className="min-h-screen bg-[var(--background)] px-6 py-10 sm:px-10">
        <GroupStoragePruner groupNames={config.groups.map((group) => group.name)} />
        <div className="mx-auto flex max-w-5xl flex-col gap-10">
          <div className="flex items-start justify-between gap-6">
            <h1 className="text-2xl font-semibold text-[var(--foreground)]">{config.title}</h1>
            <div className="flex items-start gap-4">
              <Clock />
              <ThemeToggle />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {config.groups.map((group) => (
              <GroupSection
                key={group.name}
                group={group}
                style={config.style}
                columns={config.columns}
                linkTarget={config.linkTarget}
                monitorSnapshots={monitorSnapshots}
              />
            ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
