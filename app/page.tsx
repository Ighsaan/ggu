import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { isDatabaseConfigured } from "@/db";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getSessionUser } from "@/lib/supabase/user";
import styles from "./page.module.css";

export default async function Home() {
  const user = await getSessionUser();
  const supabaseConfigured = isSupabaseConfigured();
  const databaseConfigured = isDatabaseConfigured();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>GGU</p>
        <h1 className={styles.title}>
          Supabase auth, Postgres, Drizzle, and Vercel — ready to wire up.
        </h1>
        <p className={styles.description}>
          This project now includes Google sign-in with Supabase Auth, a Drizzle
          ORM database layer for Supabase Postgres, secure session handling for
          the App Router, and deployment guidance for Vercel.
        </p>
        <div className={styles.actions}>
          <ButtonLink href={user ? "/dashboard" : "/login"}>
            {user ? "Open dashboard" : "Sign in with Google"}
          </ButtonLink>
          <ButtonLink href="/login" variant="secondary">
            Review auth flow
          </ButtonLink>
        </div>
      </section>

      <section className={styles.grid}>
        <Card
          title="Authentication"
          description="Supabase Auth is set up for Google sign-in only."
        >
          <div className={styles.inline}>
            <Badge tone={supabaseConfigured ? "success" : "warning"}>
              {supabaseConfigured
                ? "Supabase env detected"
                : "Needs Supabase env"}
            </Badge>
          </div>
          <p className={styles.bodyText}>
            Server-side auth helpers, proxy session refresh, and an OAuth
            callback route are all in place.
          </p>
        </Card>

        <Card
          title="Database"
          description="Supabase Postgres is wired through Drizzle ORM and migrations."
        >
          <div className={styles.inline}>
            <Badge tone={databaseConfigured ? "success" : "warning"}>
              {databaseConfigured
                ? "Database env detected"
                : "Needs DATABASE_URL"}
            </Badge>
          </div>
          <ul className={styles.list}>
            <li>Drizzle schema and migration config are ready.</li>
            <li>A starter `profiles` table is included.</li>
            <li>RLS policies are added in the initial SQL migration.</li>
          </ul>
        </Card>

        <Card
          title="Hosting"
          description="Vercel remains the intended hosting target."
        >
          <div className={styles.inline}>
            <Badge tone="neutral">Vercel-ready</Badge>
          </div>
          <p className={styles.bodyText}>
            The repo includes Vercel-specific setup guidance, preview-aware
            callback handling, and environment variable instructions.
          </p>
        </Card>
      </section>
    </main>
  );
}
