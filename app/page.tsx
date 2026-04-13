import { connectDb } from "./lib/db";
export default async function Home() {
  await connectDb();
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p>Database connected successfully.</p>
    </div>
  );
}
