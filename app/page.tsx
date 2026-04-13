import { connectDb } from "./lib/db";
import PublicHome from "@/component/PublicHome";

export default async function Home() {
  await connectDb();
  return (
    <main>
      <PublicHome />
    </main>
  );
}

