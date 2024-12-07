export function openModal(modal) {
    modal.style.display = "block";
}
export function closeModal(modal) {
    modal.style.display = "none";
}
export function setupModal() {
    const modal = document.getElementById("modal");
    const modalOpenButton = document.getElementById("openModal");
    const modalCloseButton = document.getElementById("closeModal");
    if (modal && modalOpenButton && modalCloseButton) {
        modalOpenButton.addEventListener("click", () => openModal(modal));
        modalCloseButton.addEventListener("click", () => closeModal(modal));
    }
}
