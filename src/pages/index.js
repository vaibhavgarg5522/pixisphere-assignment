import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the Category Listing Page
    router.push("/category");
  }, [router]);

  return null;
}
