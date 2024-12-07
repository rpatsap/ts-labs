const modal = document.getElementById("modal");
const modalOpenButton = document.getElementById("openModal");
const modalCloseButton = document.getElementById("closeModal");

if (modal && modalOpenButton && modalCloseButton) {
  modalOpenButton.addEventListener(
    "click",
    () => (modal.style.display = "block")
  );
  modalCloseButton.addEventListener(
    "click",
    () => (modal.style.display = "none")
  );
}

window.addEventListener("scroll", () => {
  console.log("Scrolled!");
});

async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  const postsContainer = document.getElementById("posts");

  if (postsContainer) {
    postsContainer.innerHTML = posts
      .map(
        (post: any) => `
            <div>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `
      )
      .join("");
  }
}

fetchPosts();
