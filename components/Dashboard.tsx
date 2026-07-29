import { loadDashboardConfig } from "@/lib/config/load";
import { themeClassName } from "@/lib/styles/themes";
import { collectMonitorResults } from "@/lib/monitor/collect";
import { GroupSection } from "./GroupSection";
import { Clock } from "./Clock";

export async function Dashboard() {
  const config = await loadDashboardConfig();
  const monitorResults = await collectMonitorResults(config);

  return (
    <div className={`min-h-screen bg-[var(--background)] px-6 py-10 sm:px-10 ${themeClassName(config.theme)}`}>
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="flex items-start justify-between gap-6">
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">{config.title}</h1>
          <Clock />
        </div>
        <div className="flex flex-col gap-8">
          {config.groups.map((group) => (
            <GroupSection
              key={group.name}
              group={group}
              style={config.style}
              columns={config.columns}
              linkTarget={config.linkTarget}
              monitorResults={monitorResults}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
