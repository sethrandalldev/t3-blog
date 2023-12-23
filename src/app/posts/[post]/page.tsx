import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import type { Post, User } from "~/types";
import Link from "next/link";
import Button from "~/app/_components/button";

type Props = {
  params: {
    post: string;
  };
};

export default async function Page({ params }: Props) {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const post: Post | null = await api.post.getById.query(params.post);
  const author: User | null = post
    ? await api.user.getById.query(post.createdById)
    : null;

  // render post name, body, and author name and email
  const renderPost = () => {
    console.log(post)
    return (
      <div>
        <div>
          <h2 className="text-cyan-50 text-4xl">{post.name}</h2>
          <p><em>{author?.name}</em></p>
          <p>{(new Date(post.createdAt)).toLocaleDateString()}</p>
        </div>
        <p className="py-10">{post?.body}</p>
      </div>
    );
  };

  return post ? (
    <div className="p-5">
      {renderPost()}
      <br />
      <Link href="/posts">View All Posts</Link>
      {session.user.id === post.createdById ? (
        <div>
          <Link href={`/posts/${post.id}/edit`}>Edit Post</Link>
          &emsp;|&emsp;
          <Button
            clickHandler={async () => {
              "use server";
              await api.post.delete.mutate(post.id);
            }}
            route="/posts"
          >
            Delete Post
          </Button>
        </div>
      ) : null}
    </div>
  ) : (
    "Post does not exist"
  );
}
