import PostList from "./PostList";

export default function Feed() {
  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-xl">
        <PostList />
      </div>
    </div>
  );
}