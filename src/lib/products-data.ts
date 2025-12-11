/**
 * Product data types and sample data for the furniture e-commerce demo.
 * This serves as fallback/demo data when not using Uniform entries.
 */

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  hoverImage?: string;
  badge?: "Sale" | "New" | "Best Seller";
  rating: number;
  reviewCount: number;
  description: string;
  colors: string[];
  materials: string[];
  dimensions: string;
  care: string;
  shipping: string;
  inStock: boolean;
}

/**
 * Sample products data for demo purposes
 */
export const products: Product[] = [
  {
    id: "oslo-sectional-sofa",
    slug: "oslo-sectional-sofa",
    name: "Oslo Sectional Sofa",
    price: 2499,
    originalPrice: 2899,
    category: "sofas",
    image: "/mid-century-modern-sectional-sofa-in-charcoal-velv.jpg",
    hoverImage: "/mid-century-modern-sectional-sofa-different-angle.jpg",
    badge: "Sale",
    rating: 4.8,
    reviewCount: 124,
    description:
      "Experience the perfect blend of mid-century modern design and contemporary comfort. Handcrafted by skilled artisans using premium materials, this piece is built to last for generations. The thoughtful design features clean lines, tapered legs, and carefully selected upholstery that brings warmth and sophistication to any space.",
    colors: ["Charcoal", "Cream", "Sage"],
    materials: ["Velvet", "Wood"],
    dimensions: '84" W × 36" D × 32" H',
    care: "Clean with a soft, damp cloth. Avoid harsh chemicals and direct sunlight. For upholstered pieces, vacuum regularly using the soft brush attachment. Blot spills immediately with a clean cloth. Professional cleaning recommended annually.",
    shipping:
      "Free standard shipping on all orders over $999. Your piece will be delivered within 2-4 weeks. White-glove delivery service is available for $199, which includes room placement and packaging removal. Assembly is included with white-glove delivery.",
    inStock: true,
  },
  {
    id: "copenhagen-lounge-chair",
    slug: "copenhagen-lounge-chair",
    name: "Copenhagen Lounge Chair",
    price: 899,
    category: "chairs",
    image: "/cozy-reading-nook-dusty-pink-velvet-armchair-books.jpg",
    hoverImage: "/reading-nook-dusty-rose-armchair-bookshelf-warm-am.jpg",
    badge: "New",
    rating: 4.9,
    reviewCount: 86,
    description:
      "The Copenhagen Lounge Chair combines Scandinavian simplicity with exceptional comfort. Its generous proportions and carefully angled back provide ergonomic support for hours of relaxation.",
    colors: ["Cream", "Gray", "Olive"],
    materials: ["Linen", "Oak"],
    dimensions: '32" W × 34" D × 30" H',
    care: "Vacuum upholstery regularly. Spot clean with mild soap and water. Rotate cushions periodically for even wear.",
    shipping:
      "Free shipping on orders over $999. Delivery within 1-2 weeks. White-glove delivery available.",
    inStock: true,
  },
  {
    id: "stockholm-dining-table",
    slug: "stockholm-dining-table",
    name: "Stockholm Dining Table",
    price: 1899,
    category: "tables",
    image: "/mid-century-modern-oval-coffee-table-natural-oak-b.jpg",
    hoverImage: "/mid-century-modern-oval-coffee-table-natural-oak-b.jpg",
    rating: 4.7,
    reviewCount: 52,
    description:
      "A stunning centerpiece for your dining room, the Stockholm Dining Table features a solid hardwood top with beautiful natural grain patterns. The minimalist base design allows for comfortable seating arrangements.",
    colors: ["Natural Oak", "Walnut", "Ebony"],
    materials: ["Solid Oak", "Steel"],
    dimensions: '72" L × 36" W × 30" H',
    care: "Wipe with a soft, dry cloth. Use coasters and placemats to protect the surface. Avoid placing hot items directly on the wood.",
    shipping:
      "Free shipping. Delivery within 3-4 weeks due to custom finishing. Professional assembly included.",
    inStock: true,
  },
  {
    id: "bergen-coffee-table",
    slug: "bergen-coffee-table",
    name: "Bergen Coffee Table",
    price: 649,
    originalPrice: 799,
    category: "tables",
    image: "/mid-century-modern-oval-coffee-table-natural-oak-b.jpg",
    hoverImage: "/mid-century-modern-oval-coffee-table-natural-oak-b.jpg",
    badge: "Sale",
    rating: 4.6,
    reviewCount: 38,
    description:
      "The Bergen Coffee Table brings understated elegance to your living space. Its floating design creates visual lightness while the solid wood top provides durability and warmth.",
    colors: ["Natural Oak", "Walnut"],
    materials: ["Solid Wood", "Brass"],
    dimensions: '48" L × 24" W × 16" H',
    care: "Dust regularly with a soft cloth. Apply wood polish seasonally to maintain luster.",
    shipping:
      "Free shipping on orders over $500. Delivery within 1-2 weeks.",
    inStock: true,
  },
  {
    id: "malmo-bookshelf",
    slug: "malmo-bookshelf",
    name: "Malmö Bookshelf",
    price: 1299,
    category: "storage",
    image: "/mid-century-modern-bookshelf-walnut-open-shelving-.jpg",
    hoverImage: "/mid-century-modern-bookshelf-walnut-open-shelving-.jpg",
    badge: "Best Seller",
    rating: 4.8,
    reviewCount: 94,
    description:
      "The Malmö Bookshelf combines open storage with a sculptural presence. Its asymmetrical design creates visual interest while providing ample space for books, objects, and display items.",
    colors: ["White", "Natural Oak", "Black"],
    materials: ["MDF", "Oak Veneer"],
    dimensions: '36" W × 12" D × 72" H',
    care: "Wipe shelves with a damp cloth. Do not exceed 30 lbs per shelf.",
    shipping:
      "Free shipping. Assembly required. Delivery within 2-3 weeks.",
    inStock: true,
  },
  {
    id: "nordic-accent-chair",
    slug: "nordic-accent-chair",
    name: "Nordic Accent Chair",
    price: 599,
    category: "chairs",
    image: "/oversized-accent-chair-dusty-rose-pink-velvet-cozy.jpg",
    hoverImage: "/elegant-accent-chair-in-styled-room-corner--lifest.jpg",
    rating: 4.5,
    reviewCount: 67,
    description:
      "A versatile accent piece that adds character to any room. The Nordic Accent Chair features a curved back and comfortable cushioning in a compact footprint.",
    colors: ["Sage", "Blush", "Navy"],
    materials: ["Velvet", "Walnut"],
    dimensions: '28" W × 30" D × 32" H',
    care: "Professional cleaning recommended for velvet upholstery. Avoid direct sunlight.",
    shipping:
      "Free shipping on orders over $500. Delivery within 1-2 weeks.",
    inStock: true,
  },
  {
    id: "helsinki-sideboard",
    slug: "helsinki-sideboard",
    name: "Helsinki Sideboard",
    price: 1599,
    category: "storage",
    image: "/mid-century-modern-teak-sideboard-brass-handles-li.jpg",
    hoverImage: "/mid-century-modern-teak-sideboard-brass-handles-li.jpg",
    rating: 4.7,
    reviewCount: 41,
    description:
      "The Helsinki Sideboard offers generous storage with a refined aesthetic. Featuring sliding doors and adjustable interior shelving, it's perfect for dining rooms or living spaces.",
    colors: ["Natural Oak", "Walnut", "White"],
    materials: ["Oak", "Brass Hardware"],
    dimensions: '60" W × 18" D × 30" H',
    care: "Dust regularly. Use felt pads under objects to prevent scratches.",
    shipping:
      "Free white-glove delivery included. Delivery within 3-4 weeks.",
    inStock: true,
  },
  {
    id: "olive-velvet-sofa",
    slug: "olive-velvet-sofa",
    name: "Olive Velvet Sofa",
    price: 1899,
    category: "sofas",
    image: "/modern-sectional-sofa-olive-green-velvet.jpg",
    hoverImage: "/a-frame-cabin-living-room-olive-green-velvet-sofa-.jpg",
    badge: "New",
    rating: 4.9,
    reviewCount: 73,
    description:
      "Make a statement with our stunning Olive Velvet Sofa. The rich green hue brings nature indoors while the plush velvet upholstery invites you to sink in and relax. Perfect for modern and traditional spaces alike.",
    colors: ["Olive", "Peacock", "Rust"],
    materials: ["Velvet", "Oak"],
    dimensions: '86" W × 38" D × 34" H',
    care: "Professional cleaning recommended. Brush velvet regularly to maintain texture.",
    shipping:
      "Free shipping. Delivery within 2-3 weeks. White-glove service available.",
    inStock: true,
  },
];

/**
 * Get a product by its slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * Get related products (same category, excluding the current product)
 */
export function getRelatedProducts(
  product: Product,
  limit: number = 4
): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

/**
 * Get all product slugs for static generation
 */
export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
