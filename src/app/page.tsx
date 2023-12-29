import { CreatePost } from "~/app/_components/create-post";
import PostPreview from "~/app/_components/post-preview";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Your Feed
        </h1>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPosts = await api.post.getLatest.query(5);
  console.log(latestPosts);

  return (
    <div className="w-full max-w-xs">
      {latestPosts ? latestPosts.map(post => {
        return <PostPreview post={post} />;
        })
        : (
        <p>No recent posts available.</p>
      )}
    </div>
  );
}
