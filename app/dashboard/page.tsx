import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { isDatabaseConfigured } from "@/db";
import { signOutAction } from "@/lib/actions/auth";
import { syncAppUserFromAuth } from "@/lib/data/users";
import {
  getSessionUser,
  getUserDisplayName,
  getUserProviderLabel,
} from "@/lib/supabase/user";
import styles from "./page.module.css";

type SyncState = {
  tone: "success" | "warning" | "neutral";
  label: string;
  detail: string;
};

const visualCards = [
  {
    src: "/placeholders/dashboard-hero.svg",
    alt: "Placeholder hero art for the reference-inspired dashboard",
    eyebrow: "Hero visual",
    title: "Main showcase image",
    caption:
      "Local placeholder art used until the final hero image is supplied.",
  },
  {
    src: "/placeholders/dashboard-secondary-one.svg",
    alt: "Placeholder supporting artwork card one",
    eyebrow: "Supporting image",
    title: "Secondary tile",
    caption:
      "Used for the reference layout where the original artwork is not available.",
  },
  {
    src: "/placeholders/dashboard-secondary-two.svg",
    alt: "Placeholder supporting artwork card two",
    eyebrow: "Supporting image",
    title: "Detail tile",
    caption:
      "Another local placeholder matching the visual composition of the mockup.",
  },
] as const;

export default async function DashboardPage() {
  const user = await getSessionUser();
  const databaseConfigured = isDatabaseConfigured();

  let appUser: Awaited<ReturnType<typeof syncAppUserFromAuth>> = null;
  let syncState: SyncState = databaseConfigured
    ? user
      ? {
          tone: "neutral",
          label: "Ready to sync",
          detail:
            "The dashboard will create or refresh your app user row while you are signed in.",
        }
      : {
          tone: "neutral",
          label: "Public guest view",
          detail:
            "This dashboard stays open to everyone. Sign in to create or refresh a row in public.users.",
        }
    : {
        tone: "warning",
        label: "Database not configured",
        detail:
          "Add DATABASE_URL before the app can sync the public.users table.",
      };

  if (user && databaseConfigured) {
    try {
      appUser = await syncAppUserFromAuth(user);
      syncState = {
        tone: "success",
        label: "User row synced",
        detail:
          "The authenticated user has been inserted or updated in public.users.",
      };
    } catch (error) {
      syncState = {
        tone: "warning",
        label: "User row sync failed",
        detail:
          error instanceof Error
            ? error.message
            : "The app reached the database layer, but the users table is not ready yet.",
      };
    }
  }

  const displayName = user ? getUserDisplayName(user) : "Guest viewer";
  const provider = user ? getUserProviderLabel(user) : "No provider";
  const sessionStateLabel = user ? "Logged in" : "Not logged in";

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.brandBlock}>
            <div className={styles.logo}>GGU</div>
            <div>
              <p className={styles.sidebarEyebrow}>
                Reference-inspired dashboard
              </p>
              <h1 className={styles.sidebarTitle}>Visual dashboard</h1>
            </div>
          </div>

          <nav className={styles.navList} aria-label="Dashboard links">
            <a className={styles.navItemActive} href="/dashboard">
              Dashboard
            </a>
            <a className={styles.navItem} href="/login">
              Login
            </a>
          </nav>

          <div className={styles.sidebarPanel}>
            <p className={styles.panelEyebrow}>Access</p>
            <p className={styles.sidebarCopy}>
              The dashboard is intentionally public, while still reflecting the
              real auth state and database sync state.
            </p>
            <div className={styles.sidebarBadgeRow}>
              <span
                className={`${styles.badge} ${user ? styles.success : styles.neutral}`}
              >
                {sessionStateLabel}
              </span>
              <span className={`${styles.badge} ${styles.neutral}`}>
                Provider: {provider}
              </span>
            </div>
          </div>
        </aside>

        <section className={styles.content}>
          <header className={styles.header}>
            <div>
              <p className={styles.headerEyebrow}>Dashboard</p>
              <h2 className={styles.headerTitle}>
                A visual layout matched to the attached reference.
              </h2>
              <p className={styles.headerCopy}>
                Placeholder artwork is used where the original images were not
                supplied, while the live auth and database states remain real.
              </p>
            </div>

            <div className={styles.headerActions}>
              <ButtonLink href="/login" variant="secondary">
                Open login
              </ButtonLink>
              {user ? (
                <form className={styles.inlineForm} action={signOutAction}>
                  <Button type="submit" variant="subtle">
                    Sign out
                  </Button>
                </form>
              ) : null}
            </div>
          </header>

          <section className={styles.heroGrid}>
            <article className={`${styles.card} ${styles.heroCard}`}>
              <div className={styles.heroMedia}>
                <Image
                  src={visualCards[0].src}
                  alt={visualCards[0].alt}
                  fill
                  sizes="(max-width: 1100px) 100vw, 58vw"
                  className={styles.heroImage}
                />
                <div className={styles.heroOverlay}>
                  <span className={styles.overlayPill}>
                    {visualCards[0].eyebrow}
                  </span>
                  <h3 className={styles.heroTitle}>{visualCards[0].title}</h3>
                  <p className={styles.heroCopy}>{visualCards[0].caption}</p>
                </div>
              </div>
            </article>

            <article className={`${styles.card} ${styles.statusCard}`}>
              <div className={styles.statusTopRow}>
                <div>
                  <p className={styles.panelEyebrow}>Live status</p>
                  <h3 className={styles.panelTitle}>{displayName}</h3>
                </div>
                <span
                  className={`${styles.badge} ${user ? styles.success : styles.neutral}`}
                >
                  {sessionStateLabel}
                </span>
              </div>

              <p className={styles.statusCopy}>{syncState.detail}</p>

              <dl className={styles.metricGrid}>
                <div className={styles.metricCard}>
                  <dt className={styles.metricLabel}>Route access</dt>
                  <dd className={styles.metricValue}>Public</dd>
                </div>
                <div className={styles.metricCard}>
                  <dt className={styles.metricLabel}>Database</dt>
                  <dd className={styles.metricValue}>
                    {databaseConfigured ? "Connected" : "Missing env"}
                  </dd>
                </div>
                <div className={styles.metricCard}>
                  <dt className={styles.metricLabel}>User table</dt>
                  <dd className={styles.metricValue}>{syncState.label}</dd>
                </div>
              </dl>

              <dl className={styles.detailList}>
                <div className={styles.detailRow}>
                  <dt className={styles.detailLabel}>Email</dt>
                  <dd className={styles.detailValue}>
                    {user?.email ?? "Not available"}
                  </dd>
                </div>
                <div className={styles.detailRow}>
                  <dt className={styles.detailLabel}>Provider</dt>
                  <dd className={styles.detailValue}>{provider}</dd>
                </div>
                <div className={styles.detailRow}>
                  <dt className={styles.detailLabel}>Database row</dt>
                  <dd className={styles.detailValue}>
                    {appUser ? "public.users updated" : "No synced row yet"}
                  </dd>
                </div>
              </dl>
            </article>
          </section>

          <section className={styles.lowerGrid}>
            <article className={`${styles.card} ${styles.galleryCard}`}>
              <div className={styles.sectionHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Gallery</p>
                  <h3 className={styles.panelTitle}>Placeholder visuals</h3>
                </div>
                <p className={styles.sectionCopy}>
                  These tiles stand in for the image assets that were not
                  provided.
                </p>
              </div>

              <div className={styles.galleryGrid}>
                {visualCards.slice(1).map((card) => (
                  <article key={card.src} className={styles.visualTile}>
                    <div className={styles.visualImageWrap}>
                      <Image
                        src={card.src}
                        alt={card.alt}
                        fill
                        sizes="(max-width: 760px) 100vw, 24vw"
                        className={styles.visualImage}
                      />
                    </div>
                    <div className={styles.visualBody}>
                      <p className={styles.visualEyebrow}>{card.eyebrow}</p>
                      <h4 className={styles.visualTitle}>{card.title}</h4>
                      <p className={styles.visualCopy}>{card.caption}</p>
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <article className={`${styles.card} ${styles.runtimeCard}`}>
              <div className={styles.sectionHeader}>
                <div>
                  <p className={styles.panelEyebrow}>Runtime</p>
                  <h3 className={styles.panelTitle}>Application state</h3>
                </div>
              </div>

              <ul className={styles.timeline}>
                <li className={styles.timelineItem}>
                  <span className={styles.timelineDot} />
                  <div>
                    <p className={styles.timelineTitle}>
                      Public dashboard access
                    </p>
                    <p className={styles.timelineCopy}>
                      Anyone can load this route without authentication.
                    </p>
                  </div>
                </li>
                <li className={styles.timelineItem}>
                  <span className={styles.timelineDot} />
                  <div>
                    <p className={styles.timelineTitle}>
                      Successful login writes to public.users
                    </p>
                    <p className={styles.timelineCopy}>{syncState.detail}</p>
                  </div>
                </li>
                <li className={styles.timelineItem}>
                  <span className={styles.timelineDot} />
                  <div>
                    <p className={styles.timelineTitle}>Current actor</p>
                    <p className={styles.timelineCopy}>
                      {user
                        ? `${displayName}${user.email ? ` · ${user.email}` : ""}`
                        : "Guest viewer with no authenticated session."}
                    </p>
                  </div>
                </li>
              </ul>

              {appUser ? (
                <div className={styles.runtimePanel}>
                  <p className={styles.panelEyebrow}>Synced row</p>
                  <div className={styles.runtimeStatRow}>
                    <span className={styles.runtimeKey}>Updated at</span>
                    <span className={styles.runtimeValue}>
                      {appUser.updatedAt.toISOString()}
                    </span>
                  </div>
                  <div className={styles.runtimeStatRow}>
                    <span className={styles.runtimeKey}>Last sign-in</span>
                    <span className={styles.runtimeValue}>
                      {appUser.lastSignInAt
                        ? appUser.lastSignInAt.toISOString()
                        : "Not set"}
                    </span>
                  </div>
                </div>
              ) : null}
            </article>
          </section>
        </section>
      </section>
    </main>
  );
}
