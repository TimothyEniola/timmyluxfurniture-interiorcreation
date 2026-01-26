import { pool } from "../config/db.js"; 
import { config } from "dotenv";

// Load environment variables
config();

const products = [
  {
    name: "Luxury King Bed Frame",
    price: 485000,
    category: "Bedroom",
    image: "https://images.pexels.com/photos/7546283/pexels-photo-7546283.jpeg",
    description: "Elegant modern bed frame with premium upholstered headboard",
    featured: true,
  },
  {
    name: "Premium Velvet Sofa",
    price: 420000,
    category: "Living Room",
    image: "https://images.pexels.com/photos/8135267/pexels-photo-8135267.jpeg",
    description: "Sophisticated velvet sofa with contemporary design",
    featured: true,
  },
  {
    name: "Elegant Dining Set",
    price: 380000,
    category: "Dining",
    image: "https://images.pexels.com/photos/7195591/pexels-photo-7195591.jpeg",
    description: "Modern dining table with 6 premium velvet chairs",
    featured: true,
  },
  {
    name: "Luxury Armchair",
    price: 185000,
    category: "Living Room",
    image: "https://images.pexels.com/photos/8837965/pexels-photo-8837965.jpeg",
    description: "Plush armchair with premium fabric and elegant design",
    featured: false,
  },
  {
    name: "Modern Coffee Table",
    price: 125000,
    category: "Living Room",
    image: "https://images.pexels.com/photos/12277201/pexels-photo-12277201.jpeg",
    description: "Contemporary wooden coffee table with sleek finish",
    featured: false,
  },
  {
    name: "Designer Bookshelf",
    price: 245000,
    category: "Storage",
    image: "https://images.pexels.com/photos/18210546/pexels-photo-18210546.jpeg",
    description: "Elegant bookshelf with modern aesthetic",
    featured: false,
  },
  {
    name: "Premium Wardrobe",
    price: 650000,
    category: "Bedroom",
    image: "https://images.pexels.com/photos/7214472/pexels-photo-7214472.jpeg",
    description: "Spacious luxury wardrobe with mirrored doors",
    featured: true,
  },
  {
    name: "Executive Office Desk",
    price: 385000,
    category: "Office",
    image: "https://images.pexels.com/photos/7046161/pexels-photo-7046161.jpeg",
    description: "Premium office desk with marble and wood finish",
    featured: false,
  },
  {
    name: "Modern Dining Table",
    price: 295000,
    category: "Dining",
    image: "https://images.pexels.com/photos/33326582/pexels-photo-33326582.jpeg",
    description: "Elegant dining table for contemporary homes",
    featured: false,
  },
  {
    name: "Comfort Sofa Set",
    price: 520000,
    category: "Living Room",
    image: "https://images.pexels.com/photos/3757055/pexels-photo-3757055.jpeg",
    description: "Luxurious white sofa set with premium cushioning",
    featured: false,
  },
  {
    name: "Designer Bedroom Suite",
    price: 890000,
    category: "Bedroom",
    image: "https://images.pexels.com/photos/30287124/pexels-photo-30287124.jpeg",
    description: "Complete luxury bedroom furniture collection",
    featured: true,
  },
  {
    name: "Minimalist Office Chair",
    price: 145000,
    category: "Office",
    image: "https://images.pexels.com/photos/7195522/pexels-photo-7195522.jpeg",
    description: "Ergonomic designer chair for modern workspaces",
    featured: false,
  },
];

async function seed() {
  const client = await pool.connect();
  
  try {
    console.log("🌱 Starting database seed...");
    
    // Clear existing products (Optional - safer for avoiding duplicates during dev)
    // await client.query('DELETE FROM products'); 

    for (const product of products) {
      const query = `
        INSERT INTO products 
        (name, description, price, category, image, featured, available, has_discount, discount_price) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;
      
      const values = [
        product.name,
        product.description,
        product.price,
        product.category,
        product.image,
        product.featured,
        true,  // available
        false, // has_discount (default)
        null   // discount_price (default)
      ];

      await client.query(query, values);
      console.log(`✅ Inserted: ${product.name}`);
    }

    console.log("✨ Seeding complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    client.release();
    pool.end(); // Close the pool
  }
}

seed();