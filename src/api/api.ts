// src/api/api.ts
import { Post } from "../types/types";

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: Post[] = await response.json();
  return posts;
}

export function displayPosts(posts: Post[]): void {
  const postsContainer = document.getElementById("posts");
  if (postsContainer) {
    postsContainer.innerHTML = posts
      .map(
        (post) => `
            <div>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `
      )
      .join("");
  }
}
