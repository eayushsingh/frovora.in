import { useCartStore } from "./cartStore";

export function buildWhatsAppMessage(name?: string, address?: string, time?: string): string {
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
    `My Name: ${name?.trim() || ""}`,
    `My Address: ${address?.trim() || ""}`,
    `Preferred Time: ${time?.trim() || ""}`,
    "",
    "Found you on Instagram @frovora.in ✨",
  ].join("\n");
}

export function openWhatsApp(name?: string, address?: string, time?: string) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918008292482";
  const msg = encodeURIComponent(buildWhatsAppMessage(name, address, time));
  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}

