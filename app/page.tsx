import styles from "./page.module.css";

const currentDeliverables = [
  "A simple Next.js 16 App Router application scaffolded and customized for this repo.",
  "AI governance guidance to keep human review, security, and accountability explicit.",
  "Coding standards covering TypeScript, React, Next.js, styling, and validation expectations.",
] as const;

const qualityGates = [
  "ESLint for static analysis",
  "TypeScript type-checking",
  "Next.js production build validation",
  "GitHub Actions CI for repeatable checks",
] as const;

const nextSteps = [
  "Define the actual product goals for GGU.",
  "Add routes, data models, and features based on confirmed requirements.",
  "Expand test coverage once business logic becomes more complex.",
] as const;

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>GGU</p>
        <h1 className={styles.title}>
          A simple, governance-ready Next.js web app starter.
        </h1>
        <p className={styles.description}>
          This project currently provides a clean web foundation, a starter user
          interface, and clear rules for both human and AI contributors.
        </p>
        <div className={styles.badges} aria-label="Project highlights">
          <span className={styles.badge}>Next.js 16</span>
          <span className={styles.badge}>React 19</span>
          <span className={styles.badge}>TypeScript</span>
          <span className={styles.badge}>AI Governance</span>
        </div>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2>Current deliverables</h2>
          <ul>
            {currentDeliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className={styles.card}>
          <h2>Quality gates</h2>
          <ul>
            {qualityGates.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className={styles.card}>
          <h2>Suggested next steps</h2>
          <ul>
            {nextSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
