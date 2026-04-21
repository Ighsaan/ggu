import styles from "./SectionBanner.module.css";

type SectionBannerProps = {
  title: string;
};

export function SectionBanner({ title }: SectionBannerProps) {
  return (
    <div className={styles.banner}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
