import type { ReactNode } from "react";
import styles from "./Card.module.css";

type CardProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

export function Card({ children, className, description, title }: CardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ");

  return (
    <section className={classes}>
      {(title || description) && (
        <header className={styles.header}>
          {title ? <h2 className={styles.title}>{title}</h2> : null}
          {description ? (
            <p className={styles.description}>{description}</p>
          ) : null}
        </header>
      )}
      <div className={styles.content}>{children}</div>
    </section>
  );
}
