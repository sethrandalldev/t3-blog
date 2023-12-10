import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          All Posts
        </h1>
        <div className="flex flex-row">
          <Link href={`/user/${session?.user.id}/posts`}>My Posts</Link>
          &emsp;{"|"}&emsp;
          <Link href="/posts/new">New Post</Link>
        </div>
        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const allPosts = await api.post.getAll.query();

  return (
    <div className="w-full max-w-xs">
      {allPosts.map((post) => {
        return (
          <div
            key={post.id}
            className="mb-10 rounded-sm bg-white p-3 text-black"
          >
            <h2 className="text-3xl font-bold">
              <Link href={`/posts/${post.id}`}>{post.name}</Link>
            </h2>
            <p>{post.body}</p>
          </div>
        );
      })}
    </div>
  );
}
