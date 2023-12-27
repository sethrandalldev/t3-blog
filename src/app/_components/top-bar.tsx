import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export default async function TopBar() {
  const session = await getServerAuthSession();
  return (
    <div className="top-bar m-2">
      <div className="flex flex-row items-center gap-2 justify-between">
        <div>
          <Link className="nav-item m-2" href="/posts">Home</Link>
          <Link className="nav-item m-2" href={`/users/${session?.user.id}`}>Profile</Link>
          <Link className="nav-item m-2" href="/posts/new">Create Post</Link>
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <p className="text-center text-2xl text-white">
            {session && <span>{session.user?.name}</span>}
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
