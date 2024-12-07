import { setupModal } from "./modal/modal.js";
import { setupScrollListener } from "./scroll/scroll.js";
import { fetchPosts, displayPosts } from "./api/api.js";

// Initialize modal functionality
setupModal();

// Initialize scroll listener
setupScrollListener();

// Fetch and display posts
fetchPosts().then((posts) => displayPosts(posts));
