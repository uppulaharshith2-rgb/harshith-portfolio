import {
  Brain,
  Calculator,
  ClipboardCheck,
  Database,
  Fingerprint,
  FlaskConical,
  GitCompare,
  Hammer,
  type LucideIcon,
  NotebookText,
  Plane,
  ShieldCheck,
  Sparkles,
  Timer,
  Workflow,
} from "lucide-react";
import { PROJECT_ICON_NAMES } from "@/lib/projects";

const ICONS: Record<string, LucideIcon> = {
  Brain,
  Calculator,
  ClipboardCheck,
  Database,
  Fingerprint,
  FlaskConical,
  GitCompare,
  Hammer,
  NotebookText,
  Plane,
  ShieldCheck,
  Sparkles,
  Timer,
  Workflow,
};

export function ProjectIcon({
  slug,
  size = 22,
  strokeWidth = 2.2,
  color = "#fff",
}: {
  slug: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const name = PROJECT_ICON_NAMES[slug];
  const Icon = name ? ICONS[name] : null;
  if (!Icon) return <Sparkles size={size} strokeWidth={strokeWidth} color={color} aria-hidden />;
  return <Icon size={size} strokeWidth={strokeWidth} color={color} aria-hidden />;
}
