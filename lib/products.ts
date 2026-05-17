export interface Product {
  id: string;
  name: string;
  category: "brownies" | "cookies" | "bars";
  subcategory?: string;
  description?: string;
  italic_label?: string;
  price_pack6?: number;
  price_pack16?: number;
  price_single?: number;
  image_url?: string;
  is_available: boolean;
  is_recommended: boolean;
  sort_order?: number;
}

export interface CategoryGroup {
  id: string;
  name: string;
  label: string; // italic descriptor shown on card
  italic_label: string;
  items: Product[];
}

export const MENU_ITEMS: Product[] = [
  // ─── BROWNIES – Classic Favourites ─────────────────────────────────
  {
    id: "b1",
    name: "Fudge Brownies",
    category: "brownies",
    subcategory: "Classic Favourites",
    price_pack6: 600,
    price_pack16: 1400,
    is_available: true,
    is_recommended: false,
    description: "The original. Dense, fudgy, and unapologetically rich.",
  },
  {
    id: "b2",
    name: "Walnut Brownies",
    category: "brownies",
    subcategory: "Classic Favourites",
    price_pack6: 650,
    price_pack16: 1500,
    is_available: true,
    is_recommended: false,
    description: "Classic fudgy brownie with toasted walnut pieces throughout.",
  },

  // ─── BROWNIES – Gourmet Indulgence ─────────────────────────────────
  {
    id: "b3",
    name: "Nutella Brownies",
    category: "brownies",
    subcategory: "Gourmet Indulgence",
    price_pack6: 650,
    price_pack16: 1550,
    is_available: true,
    is_recommended: true,
    description: "Fudgy brownie base swirled with generous Nutella.",
  },
  {
    id: "b4",
    name: "Nutella Ferrero Rocher Brownies",
    category: "brownies",
    subcategory: "Gourmet Indulgence",
    price_pack6: 800,
    price_pack16: 1900,
    is_available: true,
    is_recommended: false,
    description: "The ultimate indulgence — Nutella brownie crowned with a Ferrero Rocher.",
  },
  {
    id: "b5",
    name: "Cheesecake Brownies",
    category: "brownies",
    subcategory: "Gourmet Indulgence",
    price_pack6: 750,
    price_pack16: 1800,
    is_available: true,
    is_recommended: true,
    description: "Fudgy brownie marbled with silky cream cheese swirls.",
  },

  // ─── BROWNIES – Chocolate Lover's Picks ────────────────────────────
  {
    id: "b6",
    name: "Chocolate Chunk Brownies",
    category: "brownies",
    subcategory: "Chocolate Lover's Picks",
    price_pack6: 650,
    price_pack16: 1500,
    is_available: true,
    is_recommended: false,
    description: "Milk, Dark, or White — packed with couverture chocolate chunks.",
  },
  {
    id: "b7",
    name: "Triple Chocolate Chunk Brownies",
    category: "brownies",
    subcategory: "Chocolate Lover's Picks",
    price_pack6: 650,
    price_pack16: 1550,
    is_available: true,
    is_recommended: true,
    description: "Milk, dark, and white chocolate — all three in every bite.",
  },
  {
    id: "b8",
    name: "Dark Fudge Brownies",
    category: "brownies",
    subcategory: "Chocolate Lover's Picks",
    price_pack6: 650,
    price_pack16: 1500,
    is_available: true,
    is_recommended: false,
    description: "Made with 72% dark chocolate for the purists.",
  },
  {
    id: "b9",
    name: "Classic Fudgy with Caramelised White Chocolate Swirl",
    category: "brownies",
    subcategory: "Chocolate Lover's Picks",
    price_pack6: 650,
    price_pack16: 1500,
    is_available: true,
    is_recommended: false,
    description: "Fudgy brownie base with a golden caramelised white chocolate swirl.",
  },

  // ─── COOKIE TINS ───────────────────────────────────────────────────
  {
    id: "c1",
    name: "Classic Cookie Tin",
    category: "cookies",
    price_single: 650,
    is_available: true,
    is_recommended: false,
    description:
      "460–500g of rich buttery dough, molten couverture core, pure Belgian chocolate callets on top.",
  },
  {
    id: "c2",
    name: "Nutella Cookie Tin",
    category: "cookies",
    price_single: 750,
    is_available: true,
    is_recommended: true,
    description:
      "460–500g of rich buttery dough with a molten Nutella core and Belgian chocolate callets.",
  },

  // ─── BARS – Cheekies ───────────────────────────────────────────────
  {
    id: "ba1",
    name: "Cheekies — Basic",
    category: "bars",
    subcategory: "Cheekies",
    price_pack6: 500,
    price_pack16: 1200,
    is_available: true,
    is_recommended: true,
    description: "Cheesecake cookie dough bars — creamy, dense, and addictive.",
  },
  {
    id: "ba2",
    name: "Cheekies — Nutella Swirl",
    category: "bars",
    subcategory: "Cheekies",
    price_pack6: 580,
    price_pack16: 1350,
    is_available: true,
    is_recommended: false,
    description: "Cheesecake cookie dough swirled through with real Nutella.",
  },
  {
    id: "ba3",
    name: "Cheekies — Biscoff Swirl",
    category: "bars",
    subcategory: "Cheekies",
    price_pack6: 580,
    price_pack16: 1350,
    is_available: true,
    is_recommended: false,
    description: "Cheesecake cookie dough swirled with Biscoff spread.",
  },

  // ─── BARS – Blondies ───────────────────────────────────────────────
  {
    id: "ba4",
    name: "Blondies — Basic",
    category: "bars",
    subcategory: "Blondies",
    price_pack6: 450,
    price_pack16: 1000,
    is_available: true,
    is_recommended: false,
    description: "Chocolate chunk cookie bars — buttery, chewy, studded with chocolate.",
  },
  {
    id: "ba5",
    name: "Blondies — Walnuts",
    category: "bars",
    subcategory: "Blondies",
    price_pack6: 600,
    price_pack16: 1400,
    is_available: true,
    is_recommended: false,
    description: "Classic blondie loaded with toasted walnuts.",
  },
  {
    id: "ba6",
    name: "Blondies — Nutella",
    category: "bars",
    subcategory: "Blondies",
    price_pack6: 550,
    price_pack16: 1300,
    is_available: true,
    is_recommended: true,
    description: "Chocolate chunk cookie bar with ribbons of Nutella baked in.",
  },
  {
    id: "ba7",
    name: "Blondies — Biscoff",
    category: "bars",
    subcategory: "Blondies",
    price_pack6: 600,
    price_pack16: 1400,
    is_available: true,
    is_recommended: false,
    description: "Blondie with Biscoff spread folded through every layer.",
  },
  {
    id: "ba8",
    name: "Blondies — Salted Caramel",
    category: "bars",
    subcategory: "Blondies",
    price_pack6: 600,
    price_pack16: 1400,
    is_available: true,
    is_recommended: false,
    description: "Buttery blondie with a salted caramel layer baked in.",
  },

  // ─── BARS – Brookies ───────────────────────────────────────────────
  {
    id: "ba9",
    name: "Brookies — Basic",
    category: "bars",
    subcategory: "Brookies",
    price_pack6: 700,
    price_pack16: 1600,
    is_available: true,
    is_recommended: true,
    description: "Brownie meets cookie in one bar. The best of both worlds.",
  },
  {
    id: "ba10",
    name: "Brookies — Nutella Swirl",
    category: "bars",
    subcategory: "Brookies",
    price_pack6: 750,
    price_pack16: 1700,
    is_available: true,
    is_recommended: false,
    description: "Brookie bar with Nutella swirled through the cookie layer.",
  },
];

// Category groups for the 3-card menu layout
export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "brownies",
    name: "BROWNIES",
    label: "Fudgy · Dark · Unapologetic",
    italic_label: "Fudgy · Dark · Unapologetic",
    items: MENU_ITEMS.filter((p) => p.category === "brownies"),
  },
  {
    id: "cookies",
    name: "COOKIE TINS",
    label: "Molten Core · Belgian Finish",
    italic_label: "Molten Core · Belgian Finish",
    items: MENU_ITEMS.filter((p) => p.category === "cookies"),
  },
  {
    id: "bars",
    name: "BARS",
    label: "Cheekies · Blondies · Brookies",
    italic_label: "Cheekies · Blondies · Brookies",
    items: MENU_ITEMS.filter((p) => p.category === "bars"),
  },
];
