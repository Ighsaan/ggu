import Image from "next/image";
import { isDatabaseConfigured } from "@/db";
import { syncAppUserFromAuth } from "@/lib/data/users";
import { getSessionUser } from "@/lib/supabase/user";
import styles from "./page.module.css";

const visitedGames = [
  {
    title: "Legends",
    image: "/placeholders/game-card-legends.svg",
  },
  {
    title: "Overwatch 2",
    image: "/placeholders/game-card-overwatch.svg",
  },
  {
    title: "Arc Raiders",
    image: "/placeholders/game-card-arc-raiders.svg",
  },
] as const;

const trendingGames = [
  {
    title: "Legends",
    image: "/placeholders/game-card-legends.svg",
  },
  {
    title: "Overwatch 2",
    image: "/placeholders/game-card-overwatch.svg",
  },
  {
    title: "Dota 2",
    image: "/placeholders/game-card-dota.svg",
  },
  {
    title: "Arc Raiders",
    image: "/placeholders/game-card-arc-raiders.svg",
  },
] as const;

const footerLinks = [
  "Contact Us",
  "Terms & Conditions",
  "Privacy Policy",
  "Enquiries",
] as const;

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

  return (
    <main className={styles.page}>
      <section className={styles.frame}>
        <aside className={styles.sidebar}>
          <div className={styles.brandBlock}>
            <div className={styles.brandMark}>GGU</div>
            <div className={styles.brandText}>
              <span>GGU</span>
              <span>GLOBAL GAME</span>
            </div>
          </div>

          <div className={styles.iconRail}>
            <span className={styles.iconButton} />
            <span className={styles.iconButtonActive} />
            <span className={styles.iconButton} />
            <span className={styles.iconButton} />
          </div>

          <div className={styles.bottomRail}>
            <span className={styles.iconButton} />
            <span className={styles.iconButton} />
          </div>
        </aside>

        <section className={styles.content}>
          <section className={styles.heroSection}>
            <div className={styles.heroTextBlock}>
              <p className={styles.heroEyebrow}>GGU GLOBAL GAME</p>
              <h1 className={styles.heroTitle}>LET THE DEVS KNOW!</h1>
            </div>

            <div className={styles.heroImageWrap}>
              <Image
                src="/placeholders/game-hero-poster.svg"
                alt="Placeholder hero poster"
                fill
                priority
                sizes="(max-width: 1000px) 100vw, 30vw"
                className={styles.image}
              />
            </div>
          </section>

          <section className={styles.bottomSection}>
            <section className={styles.leftColumn}>
              <article className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Recently Visited</h2>
                <div className={styles.visitedGrid}>
                  {visitedGames.map((game) => (
                    <article key={game.title} className={styles.visitCard}>
                      <div className={styles.visitImageWrap}>
                        <Image
                          src={game.image}
                          alt={`${game.title} placeholder image`}
                          fill
                          sizes="(max-width: 1000px) 33vw, 12vw"
                          className={styles.image}
                        />
                      </div>
                      <p className={styles.gameLabel}>{game.title}</p>
                    </article>
                  ))}
                </div>
              </article>

              <article className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>Top Trending Games</h2>
                <div className={styles.trendingGrid}>
                  {trendingGames.map((game) => (
                    <article key={game.title} className={styles.trendingCard}>
                      <div className={styles.trendingImageWrap}>
                        <Image
                          src={game.image}
                          alt={`${game.title} trending placeholder image`}
                          fill
                          sizes="(max-width: 1000px) 25vw, 10vw"
                          className={styles.image}
                        />
                      </div>
                      <p className={styles.gameLabel}>{game.title}</p>
                    </article>
                  ))}
                </div>
              </article>
            </section>

            <aside className={styles.rightColumn}>
              <div className={styles.tagRow}>
                <span>Call Of Duty</span>
                <span>Warzone</span>
                <span>Battlefield 6</span>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureImageWrap}>
                  <Image
                    src="/placeholders/game-feature-poster.svg"
                    alt="Featured game placeholder poster"
                    fill
                    sizes="(max-width: 1000px) 100vw, 22vw"
                    className={styles.image}
                  />
                </div>
                <p className={styles.featureTitle}>Call Of Duty</p>
                <p className={styles.featureSubtitle}>Warzone Battlefield 6</p>
              </div>

              <footer className={styles.footerLinks}>
                {footerLinks.map((link) => (
                  <span key={link}>{link}</span>
                ))}
              </footer>
            </aside>
          </section>
        </section>
      </section>
    </main>
  );
}
