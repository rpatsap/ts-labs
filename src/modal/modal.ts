import { ModalElement, ButtonElement } from "../types/types";

export function openModal(modal: ModalElement): void {
  modal.style.display = "block";
}

export function closeModal(modal: ModalElement): void {
  modal.style.display = "none";
}

export function setupModal(): void {
  const modal = document.getElementById("modal") as ModalElement;
  const modalOpenButton = document.getElementById("openModal") as ButtonElement;
  const modalCloseButton = document.getElementById(
    "closeModal"
  ) as ButtonElement;

  if (modal && modalOpenButton && modalCloseButton) {
    modalOpenButton.addEventListener("click", () => openModal(modal));
    modalCloseButton.addEventListener("click", () => closeModal(modal));
  }
}
