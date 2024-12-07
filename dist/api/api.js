export async function fetchPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    return posts;
}
export function displayPosts(posts) {
    const postsContainer = document.getElementById("posts");
    if (postsContainer) {
        postsContainer.innerHTML = posts
            .map((post) => `
            <div>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `)
            .join("");
    }
}
