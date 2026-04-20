import { signInWithGoogleAction } from "@/lib/actions/auth";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import styles from "./GoogleSignInCard.module.css";

type GoogleSignInCardProps = {
  next?: string;
};

export function GoogleSignInCard({
  next = "/dashboard",
}: GoogleSignInCardProps) {
  return (
    <Card
      title="Google sign-in"
      description="Authentication is handled by Supabase Auth using Google as the only sign-in provider for now."
    >
      <div className={styles.content}>
        <p className={styles.meta}>
          This flow uses Supabase SSR helpers, stores the session in secure
          cookies, and redirects back through a dedicated auth callback route.
        </p>
        <ul className={styles.list}>
          <li>Provider: Google only</li>
          <li>Session handling: Supabase SSR proxy + server client</li>
          <li>Protected route example: dashboard</li>
        </ul>
        <form action={signInWithGoogleAction} className={styles.form}>
          <input type="hidden" name="next" value={next} />
          <Button type="submit">Continue with Google</Button>
        </form>
      </div>
    </Card>
  );
}
