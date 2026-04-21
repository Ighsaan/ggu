import { FooterBar } from "@/components/dashboard/FooterBar";
import {
  GameCarousel,
  type GameCarouselItem,
} from "@/components/dashboard/GameCarousel";
import { HeroBanner } from "@/components/dashboard/HeroBanner";
import { SectionBanner } from "@/components/dashboard/SectionBanner";
import { TopBar } from "@/components/dashboard/TopBar";
import { isDatabaseConfigured } from "@/db";
import { syncAppUserFromAuth } from "@/lib/data/users";
import { getSessionUser } from "@/lib/supabase/user";
import styles from "./page.module.css";

const recentlyVisitedGames: readonly GameCarouselItem[] = [
  {
    title: "Apex Legends",
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
];

const trendingGames: readonly GameCarouselItem[] = [
  {
    title: "Apex Legends",
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
  {
    title: "Call of Duty Warzone",
    image: "/placeholders/game-card-warzone.svg",
  },
  {
    title: "Battlefield 6",
    image: "/placeholders/game-card-battlefield.svg",
  },
];

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
      <section className={styles.shell}>
        <div className={styles.topBarSlot}>
          <TopBar />
        </div>

        <div className={styles.heroSlot}>
          <HeroBanner />
        </div>

        <div className={styles.bannerSlot}>
          <SectionBanner title="Recently Visited" />
        </div>

        <div className={styles.carouselSlot}>
          <GameCarousel items={recentlyVisitedGames} />
        </div>

        <div className={styles.bannerSlot}>
          <SectionBanner title="Top trending games" />
        </div>

        <div className={styles.carouselSlotLarge}>
          <GameCarousel items={trendingGames} dense />
        </div>

        <div className={styles.footerSlot}>
          <FooterBar />
        </div>
      </section>
    </main>
  );
}
