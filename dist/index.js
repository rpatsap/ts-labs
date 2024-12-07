"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const modal = document.getElementById("modal");
const modalOpenButton = document.getElementById("openModal");
const modalCloseButton = document.getElementById("closeModal");
if (modal && modalOpenButton && modalCloseButton) {
    modalOpenButton.addEventListener("click", () => (modal.style.display = "block"));
    modalCloseButton.addEventListener("click", () => (modal.style.display = "none"));
}
window.addEventListener("scroll", () => {
    console.log("Scrolled!");
});
function fetchPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = yield response.json();
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
    });
}
fetchPosts();
