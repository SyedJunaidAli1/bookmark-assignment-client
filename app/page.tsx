"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL!;

export default function Home() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("");

  const [form, setForm] = useState({
    url: "",
    title: "",
    description: "",
    tags: "",
  });

  async function fetchBookmarks() {
    let url = `${API}/bookmarks`;

    if (activeTag) {
      url += `?tag=${activeTag}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    setBookmarks(data);
  }

  useEffect(() => {
    fetchBookmarks();
  }, [activeTag]);

  // CREATE
  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!form.url || !form.title) {
      alert("URL and title required");
      return;
    }

    await fetch(`${API}/bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim().toLowerCase())
          : [],
      }),
    });

    setForm({
      url: "",
      title: "",
      description: "",
      tags: "",
    });

    fetchBookmarks();
  }

  // DELETE
  async function deleteBookmark(id: string) {
    if (!confirm("Delete bookmark?")) return;

    await fetch(`${API}/bookmarks/${id}`, {
      method: "DELETE",
    });

    fetchBookmarks();
  }

  const filtered = bookmarks.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.url.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Bookmark Manager</h1>

      {/* SEARCH */}
      <input
        placeholder="Search bookmarks..."
        className="border p-2 w-full rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FORM */}
      <form onSubmit={handleSubmit} className="border p-4 rounded space-y-2">
        <input
          placeholder="URL"
          className="border p-2 w-full"
          value={form.url}
          onChange={(e) => setForm({ ...form, url: e.target.value })}
        />

        <input
          placeholder="Title"
          className="border p-2 w-full"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Description"
          className="border p-2 w-full"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Tags (comma separated)"
          className="border p-2 w-full"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />

        <button className="border px-4 py-2 rounded">Add Bookmark</button>
      </form>

      {/* TAG FILTER */}
      {activeTag && (
        <button className="text-sm underline" onClick={() => setActiveTag("")}>
          Clear filter: {activeTag}
        </button>
      )}

      {/* LIST */}
      <div className="space-y-3">
        {filtered.map((b) => (
          <div key={b.id} className="border p-3 rounded">
            <a
              href={b.url}
              target="_blank"
              className="font-semibold text-blue-600"
            >
              {b.title}
            </a>

            <p className="text-sm">{b.description}</p>

            <div className="flex gap-2 flex-wrap mt-2">
              {b.tags?.map((tag: string) => (
                <span
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className="text-xs border border-red-200  px-2 py-1 rounded cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => deleteBookmark(b.id)}
              className="text-red-500 text-sm mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
