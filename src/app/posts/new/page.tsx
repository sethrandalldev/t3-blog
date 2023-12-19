import { CreatePost } from "~/app/_components/create-post";

export default async function Page() {
  return (
    <div className="min-h-screen m-auto bg-gradient-to-b from-[#2e026d] to-[#15162c] flex justify-center">
      <div className="lg:w-4/12 w-9/12">
        <h1 className="text-center text-5xl m-3">New Post</h1>
        <CreatePost />
      </div>
    </div>
  );
}
