import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export default async function TopBar() {
  const session = await getServerAuthSession();
  return (
    <div className="top-bar m-2">
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-row items-center justify-center gap-4">
          <p className="text-center text-2xl text-white">
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </div>
    </div>
  );
}
