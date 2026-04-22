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
import {
  getSessionUser,
  getUserAvatarUrl,
  getUserDisplayName,
} from "@/lib/supabase/user";
import styles from "./page.module.css";

const recentlyVisitedGames: readonly GameCarouselItem[] = [
  {
    title: "Apex Legends",
    image: "/games/apex-legends.png",
  },
  {
    title: "Overwatch 2",
    image: "/games/overwatch-2.png",
  },
  {
    title: "Arc Raiders",
    image: "/games/arc-raiders.png",
  },
];

const trendingGames: readonly GameCarouselItem[] = [
  {
    title: "Apex Legends",
    image: "/games/apex-legends.png",
  },
  {
    title: "Overwatch 2",
    image: "/games/overwatch-2.png",
  },
  {
    title: "Dota 2",
    image: "/games/dota-2.png",
  },
  {
    title: "Arc Raiders",
    image: "/games/arc-raiders.png",
  },
  {
    title: "Call of Duty Warzone",
    image: "/games/warzone.png",
  },
  {
    title: "Battlefield 6",
    image: "/games/battlefield-6.png",
  },
];

export default async function DashboardPage() {
  const user = await getSessionUser();
  const userName = user ? getUserDisplayName(user) : null;
  const userAvatarUrl = user ? getUserAvatarUrl(user) : null;
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
          <TopBar userName={userName} userAvatarUrl={userAvatarUrl} />
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

        <div className={styles.carouselSlot}>
          <GameCarousel items={trendingGames} />
        </div>

        <div className={styles.footerSlot}>
          <FooterBar />
        </div>
      </section>
    </main>
  );
}
