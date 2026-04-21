import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { isDatabaseConfigured } from "@/db";
import { signOutAction } from "@/lib/actions/auth";
import { syncAppUserFromAuth } from "@/lib/data/users";
import { getSessionUser, getUserDisplayName } from "@/lib/supabase/user";
import styles from "./page.module.css";

const navItems = ["Dashboard", "Discover", "Saved", "Activity", "Settings"];
const heroTabs = ["Overview", "Collection", "Archive"];

export default async function DashboardPage() {
  const user = await getSessionUser();
  const databaseConfigured = isDatabaseConfigured();

  if (user && databaseConfigured) {
    try {
      await syncAppUserFromAuth(user);
    } catch (error) {
      console.error("Failed to sync app user from dashboard render", error);
    }
  }

  const displayName = user ? getUserDisplayName(user) : "Guest viewer";
  const sessionState = user ? "Logged in" : "Not logged in";

  return (
    <main className={styles.page}>
      <section className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTop}>
            <div className={styles.logo}>GG</div>
            <p className={styles.brand}>GGU</p>
          </div>

          <nav className={styles.nav} aria-label="Dashboard sections">
            {navItems.map((item, index) => (
              <a
                key={item}
                href={index === 0 ? "/dashboard" : "#"}
                className={index === 0 ? styles.navItemActive : styles.navItem}
              >
                <span className={styles.navBullet} />
                <span>{item}</span>
              </a>
            ))}
          </nav>

          <div className={styles.sidebarFooter}>
            <p className={styles.sidebarLabel}>Profile</p>
            <p className={styles.sidebarName}>{displayName}</p>
            <p className={styles.sidebarState}>{sessionState}</p>
          </div>
        </aside>

        <section className={styles.main}>
          <section className={styles.hero}>
            <div className={styles.heroTopBar}>
              <div className={styles.heroTabs}>
                {heroTabs.map((tab, index) => (
                  <span
                    key={tab}
                    className={
                      index === 0 ? styles.heroTabActive : styles.heroTab
                    }
                  >
                    {tab}
                  </span>
                ))}
              </div>

              <div className={styles.profilePill}>
                <span
                  className={user ? styles.profileDotActive : styles.profileDot}
                />
                <span>{sessionState}</span>
              </div>
            </div>

            <div className={styles.heroBody}>
              <div className={styles.heroCopyBlock}>
                <p className={styles.eyebrow}>Dashboard</p>
                <h1 className={styles.heroTitle}>Curated visual workspace</h1>
                <p className={styles.heroText}>
                  A stripped-back dashboard page that mirrors the reference
                  layout, with only placeholder imagery standing in for missing
                  assets.
                </p>
              </div>

              <div className={styles.heroImageCard}>
                <Image
                  src="/placeholders/dashboard-hero.svg"
                  alt="Portrait placeholder used in the hero area"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 28vw"
                  className={styles.image}
                />
              </div>
            </div>
          </section>

          <section className={styles.contentGrid}>
            <article className={`${styles.card} ${styles.largeCard}`}>
              <div className={styles.cardHeader}>
                <div>
                  <p className={styles.cardEyebrow}>Feature</p>
                  <h2 className={styles.cardTitle}>Main gallery panel</h2>
                </div>
              </div>

              <div className={styles.largeImageWrap}>
                <Image
                  src="/placeholders/dashboard-secondary-one.svg"
                  alt="Large placeholder image in the main gallery panel"
                  fill
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className={styles.image}
                />
              </div>
            </article>

            <div className={styles.rightColumn}>
              <article className={`${styles.card} ${styles.smallImageCard}`}>
                <div className={styles.smallImageWrap}>
                  <Image
                    src="/placeholders/dashboard-secondary-two.svg"
                    alt="Secondary placeholder image"
                    fill
                    sizes="(max-width: 1024px) 100vw, 24vw"
                    className={styles.image}
                  />
                </div>
              </article>

              <article className={`${styles.card} ${styles.infoCard}`}>
                <div className={styles.infoCardTop}>
                  <div>
                    <p className={styles.cardEyebrow}>Account</p>
                    <h2 className={styles.infoTitle}>{displayName}</h2>
                  </div>
                  <span className={styles.infoState}>{sessionState}</span>
                </div>

                <p className={styles.infoText}>
                  {user
                    ? "Signed in and ready."
                    : "Public guest view is active."}
                </p>

                <div className={styles.infoActions}>
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
              </article>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
