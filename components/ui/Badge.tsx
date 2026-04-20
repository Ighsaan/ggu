import type { ReactNode } from "react";
import styles from "./Badge.module.css";

type BadgeProps = {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning";
};

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  const classes = [styles.badge, styles[tone]].join(" ");

  return <span className={classes}>{children}</span>;
}
