import { useState } from "react";

export default function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      setContent("");
      setError("");
      onPostCreated(); // Refresh post list
    } catch (err) {
      console.error(err);
      setError("Could not create post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow mb-6 border border-gray-200 space-y-2">
      <textarea
        className="w-full border border-gray-300 rounded p-2 resize-none"
        placeholder="What's on your mind?"
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Post
        </button>
      </div>
    </form>
  );
}
