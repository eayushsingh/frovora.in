"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { MENU_ITEMS, Product } from "@/lib/products";
import { Trash2, Edit3, Plus, Check, X, RotateCcw } from "lucide-react";

// ─── Admin auth ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "frovora2024";
    if (pw === correct) {
      sessionStorage.setItem("frovora-admin", "1");
      onLogin();
    } else {
      setError("Incorrect password.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-[#E8E8E8] p-10 flex flex-col gap-6"
      >
        <div>
          <p className="font-display text-3xl text-[#0D0D0D]">Frovora Admin</p>
          <p className="font-body text-sm text-[#9A9A9A] mt-1">Enter admin password to continue.</p>
        </div>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          className="border border-[#E8E8E8] px-4 py-3 font-body text-sm focus:outline-none focus:border-[#1B3A8C] transition-colors"
        />
        {error && <p className="font-body text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-[#1B3A8C] text-white font-body font-medium text-sm tracking-widest uppercase py-3 hover:bg-[#0F2563] transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}

// ─── Add/Edit Modal ──────────────────────────────────────────────────────────
function ProductModal({
  product,
  onClose,
  onSave,
}: {
  product: Partial<Product> | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const isEdit = !!product?.id;
  const [form, setForm] = useState<Partial<Product>>(
    product ?? {
      name: "",
      category: "brownies",
      subcategory: "",
      description: "",
      italic_label: "",
      price_pack6: undefined,
      price_pack16: undefined,
      price_single: undefined,
      image_url: "",
      is_available: true,
      is_recommended: false,
      sort_order: 0,
    }
  );
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const set = (key: keyof Product, val: unknown) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    if (!form.name || !form.category) {
      setErr("Name and category are required.");
      return;
    }
    setSaving(true);
    setErr("");
    const { id, ...data } = form;
    const { error } = isEdit
      ? await supabase.from("products").update(data).eq("id", id!)
      : await supabase.from("products").insert(data);
    setSaving(false);
    if (error) {
      setErr(error.message);
    } else {
      onSave();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg mx-4 border border-[#E8E8E8] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E8E8]">
          <h3 className="font-display text-2xl">{isEdit ? "Edit Product" : "Add Product"}</h3>
          <button onClick={onClose} className="text-[#9A9A9A] hover:text-[#0D0D0D]">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {[
            { label: "Name", key: "name", type: "text", required: true },
            { label: "Subcategory", key: "subcategory", type: "text" },
            { label: "Description", key: "description", type: "text" },
            { label: "Italic Label", key: "italic_label", type: "text" },
            { label: "Price (Pack of 6)", key: "price_pack6", type: "number" },
            { label: "Price (Pack of 16)", key: "price_pack16", type: "number" },
            { label: "Price (Single)", key: "price_single", type: "number" },
            { label: "Image URL", key: "image_url", type: "text" },
            { label: "Sort Order", key: "sort_order", type: "number" },
          ].map(({ label, key, type, required }) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="font-body text-xs tracking-widest uppercase text-[#9A9A9A]">
                {label}
              </label>
              <input
                type={type}
                required={required}
                value={(form[key as keyof Product] as string | number) ?? ""}
                onChange={(e) =>
                  set(
                    key as keyof Product,
                    type === "number"
                      ? e.target.value === ""
                        ? undefined
                        : parseInt(e.target.value)
                      : e.target.value
                  )
                }
                className="border border-[#E8E8E8] px-4 py-2.5 font-body text-sm focus:outline-none focus:border-[#1B3A8C] transition-colors"
              />
            </div>
          ))}

          {/* Category select */}
          <div className="flex flex-col gap-1">
            <label className="font-body text-xs tracking-widest uppercase text-[#9A9A9A]">
              Category
            </label>
            <select
              value={form.category ?? "brownies"}
              onChange={(e) => set("category", e.target.value as Product["category"])}
              className="border border-[#E8E8E8] px-4 py-2.5 font-body text-sm focus:outline-none focus:border-[#1B3A8C] bg-white"
            >
              <option value="brownies">Brownies</option>
              <option value="cookies">Cookie Tins</option>
              <option value="bars">Bars</option>
            </select>
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_available ?? true}
                onChange={(e) => set("is_available", e.target.checked)}
                className="accent-[#1B3A8C] w-4 h-4"
              />
              <span className="font-body text-sm">Available</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_recommended ?? false}
                onChange={(e) => set("is_recommended", e.target.checked)}
                className="accent-[#1B3A8C] w-4 h-4"
              />
              <span className="font-body text-sm">Frovora's Pick</span>
            </label>
          </div>

          {err && <p className="font-body text-xs text-red-500">{err}</p>}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-[#1B3A8C] text-white font-body font-medium text-sm py-3 hover:bg-[#0F2563] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving…" : isEdit ? "Update" : "Add Product"}
            </button>
            <button
              onClick={onClose}
              className="px-6 border border-[#E8E8E8] text-[#9A9A9A] hover:text-[#0D0D0D] font-body text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<Partial<Product> | null | false>(false); // false=closed, null=new, product=edit
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("frovora-admin") === "1") setAuthed(true);
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setProducts(data);
    if (error) setError(error.message);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchProducts();
  }, [authed, fetchProducts]);

  const toggleAvailable = async (id: string, val: boolean) => {
    await supabase.from("products").update({ is_available: !val }).eq("id", id);
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  const seedDB = async () => {
    if (!confirm("Seed database with all default menu items?")) return;
    const rows = MENU_ITEMS.map(({ id: _id, ...rest }) => rest);
    const { error } = await supabase.from("products").insert(rows);
    if (error) alert("Error: " + error.message);
    else {
      alert("Seeded successfully!");
      fetchProducts();
    }
  };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-[#F8F7F5] font-body">
      {modal !== false && (
        <ProductModal
          product={modal}
          onClose={() => setModal(false)}
          onSave={fetchProducts}
        />
      )}

      {/* Header */}
      <header className="bg-white border-b border-[#E8E8E8] px-6 md:px-12 py-5 flex items-center justify-between sticky top-0 z-10">
        <div>
          <p className="font-display text-2xl text-[#0D0D0D]">Frovora Admin</p>
          <p className="font-body text-xs text-[#9A9A9A] mt-0.5">
            {products.length} products in database
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={seedDB}
            className="flex items-center gap-1.5 border border-[#E8E8E8] px-4 py-2 text-xs font-body font-medium tracking-widest uppercase text-[#9A9A9A] hover:text-[#0D0D0D] hover:border-[#0D0D0D] transition-colors"
          >
            <RotateCcw size={14} />
            Seed DB
          </button>
          <button
            onClick={() => setModal(null)}
            className="flex items-center gap-1.5 bg-[#1B3A8C] text-white px-4 py-2 text-xs font-body font-medium tracking-widest uppercase hover:bg-[#0F2563] transition-colors"
          >
            <Plus size={14} />
            Add Product
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("frovora-admin");
              setAuthed(false);
            }}
            className="text-xs font-body text-[#9A9A9A] hover:text-[#0D0D0D] transition-colors"
          >
            Log out
          </button>
        </div>
      </header>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 px-4 py-3 font-body text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="bg-white border border-[#E8E8E8] overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E8E8] bg-[#F8F7F5]">
                {["Product", "Category", "Pack 6", "Pack 16", "Single", "Status", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 font-body text-[11px] tracking-[0.15em] uppercase text-[#9A9A9A] font-medium"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center font-body text-[#9A9A9A]">
                    Loading…
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center font-body text-[#9A9A9A]">
                    No products. Use &quot;Seed DB&quot; to add the default menu.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-[#E8E8E8] hover:bg-[#F8F7F5] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="font-body font-medium text-[#0D0D0D] text-sm leading-snug">
                        {p.name}
                      </p>
                      {p.subcategory && (
                        <p className="font-body text-xs text-[#9A9A9A]">{p.subcategory}</p>
                      )}
                      {p.is_recommended && (
                        <span className="text-[10px] bg-[#EEF2FF] text-[#1B3A8C] px-1.5 py-0.5 rounded font-body font-medium">
                          Pick
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-body text-sm capitalize text-[#9A9A9A]">
                      {p.category}
                    </td>
                    <td className="px-4 py-3 font-body text-sm">
                      {p.price_pack6 ? `₹${p.price_pack6}` : "—"}
                    </td>
                    <td className="px-4 py-3 font-body text-sm">
                      {p.price_pack16 ? `₹${p.price_pack16}` : "—"}
                    </td>
                    <td className="px-4 py-3 font-body text-sm">
                      {p.price_single ? `₹${p.price_single}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleAvailable(p.id, p.is_available)}
                        className={`text-[10px] font-body font-medium tracking-widest uppercase px-2.5 py-1 border rounded ${
                          p.is_available
                            ? "border-green-400 text-green-600 bg-green-50"
                            : "border-[#E8E8E8] text-[#9A9A9A]"
                        }`}
                      >
                        {p.is_available ? "Available" : "Sold Out"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setModal(p)}
                          className="text-[#9A9A9A] hover:text-[#1B3A8C] transition-colors"
                          aria-label="Edit"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-[#9A9A9A] hover:text-red-500 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
