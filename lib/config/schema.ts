import { z } from "zod";

export const cardStyleNames = ["modern", "minimal", "glass", "terminal"] as const;
export const themeNames = ["dark", "light", "auto"] as const;
export const itemTypeNames = ["page", "page-monitored"] as const;
export const linkTargetNames = ["current", "new-tab"] as const;

export const linkItemSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  icon: z.string().optional(),
  type: z.enum(itemTypeNames).default("page"),
  okStatus: z.array(z.number().int()).default([200]),
  checkIntervalSeconds: z.number().int().min(5).optional(),
  degradedLatencyMs: z.number().int().min(1).default(500),
});

export const groupSchema = z.object({
  name: z.string(),
  items: z.array(linkItemSchema),
});

export const dashboardConfigSchema = z.object({
  title: z.string().default("Dashboard"),
  style: z.enum(cardStyleNames).default("modern"),
  theme: z.enum(themeNames).default("dark"),
  columns: z.number().int().min(1).max(8).default(3),
  linkTarget: z.enum(linkTargetNames).default("current"),
  checkIntervalSeconds: z.number().int().min(5).default(60),
  groups: z.array(groupSchema).default([]),
});

export type LinkItem = z.infer<typeof linkItemSchema>;
export type Group = z.infer<typeof groupSchema>;
export type DashboardConfig = z.infer<typeof dashboardConfigSchema>;
export type CardStyleName = (typeof cardStyleNames)[number];
export type ThemeName = (typeof themeNames)[number];
export type ItemType = (typeof itemTypeNames)[number];
export type LinkTarget = (typeof linkTargetNames)[number];
