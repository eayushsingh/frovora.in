import { useCartStore } from "./cartStore";

export function buildWhatsAppMessage(): string {
  const { items, getTotal } = useCartStore.getState();

  const lines = items
    .map(
      (item) =>
        `• ${item.quantity}× ${item.name} (${item.packSize}) — ₹${item.price * item.quantity}`
    )
    .join("\n");

  return [
    "Hi Frovora Bakehouse! 🍫",
    "",
    "I'd like to place an order:",
    "",
    lines,
    "",
    `Total: ₹${getTotal()}`,
    "",
    "My Name:",
    "My Address:",
    "Preferred Time:",
    "",
    "Found you on Instagram @frovora.in ✨",
  ].join("\n");
}

export function openWhatsApp() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919999999999";
  const msg = encodeURIComponent(buildWhatsAppMessage());
  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}

