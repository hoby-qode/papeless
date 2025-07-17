import { useProductFilterStore } from "@/hooks/useProductFilterStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CategoryTabs from "../components/CategoryTabs";
import Copyright from "../components/Copyright";
import Header from "../components/Header";
import ProductList from "../components/ProductList";

const subCategorySnack = [
  { slug: "all", name: "Tous", image: "", icon: "" },
  {
    slug: "aperos",
    name: "Apéros",
    image: "/images/categories/snacks.png",
    icon: "🍢",
  },
  {
    slug: "pastas",
    name: "Pastas",
    image: "/images/categories/pasta.png",
    icon: "🍝",
  },
  {
    slug: "pizzas",
    name: "Pizzas",
    image: "/images/categories/pizza.png",
    icon: "🍕",
  },
  {
    slug: "tacos",
    name: "Tacos",
    image: "/images/categories/tacos.png",
    icon: "🌮",
  },
  {
    slug: "salades",
    name: "Salades",
    image: "/images/categories/salade.png",
    icon: "🥗",
  },
  {
    slug: "meat lover",
    name: "Meat Lover",
    image: "/images/categories/meat-lover.png",
    icon: "🥩",
  },
  {
    slug: "fruits de mer",
    name: "Fruits de Mer",
    image: "/images/categories/22ad216e.png",
    icon: "🦐",
  },
  {
    slug: "accompagnements",
    name: "Accompagnements",
    image: "/images/categories/accompagnement.png",
    icon: "🍟",
  },
];

const subCategoryDrink = [
  { slug: "all", name: "Tous", image: "", icon: "" },
  {
    slug: "non-alcoolises",
    name: "Non-Alcoolisées",
    image: "/images/categories/jus-naturel.webp",
    icon: "🥤",
  },
  {
    slug: "alcoolises",
    name: "Alcoolisées",
    image: "/images/categories/boissons.png",
    icon: "🍸",
  },
  {
    slug: "cocktails",
    name: "Cocktails",
    image: "/images/categories/cocktail.png",
    icon: "🍹",
  },
  {
    slug: "boissons-de-saison",
    name: "Boissons de Saison",
    image: "/images/categories/boissons-saisons.png",
    icon: "🌞",
  },
];

const Category = () => {
  const { category } = useParams(); // "boissons" ou "snacks"
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchTerm = useProductFilterStore((state) => state.searchTerm);
  useEffect(() => {
    const cachedData = localStorage.getItem("products_cache");
    if (cachedData) {
      try {
        setAllProducts(JSON.parse(cachedData));
        setLoading(false);
      } catch (e) {
        console.warn("Cache corrompu, suppression...");
        localStorage.removeItem("products_cache");
      }
    }

    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        localStorage.setItem("products_cache", JSON.stringify(data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement produits :", err);
        setLoading(false);
      });
  }, []);
  // 1. Filtrer par catégorie principale
  const filtered = allProducts.filter((p) => p.category === category);

  // 2. Filtrer par searchTerm (si présent)
  const searched = searchTerm
    ? filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filtered;
  // 3. Grouper par sous-catégorie
  const groupedBySubCategory = searched.reduce((acc, product) => {
    const subCat = product.sous_category || "autres";
    if (!acc[subCat]) acc[subCat] = [];
    acc[subCat].push(product);
    return acc;
  }, {});

  return (
    <div className="bg-app">
      <div className="relative z-10">
        <Header />
        <CategoryTabs
          categories={
            category === "boissons" ? subCategoryDrink : subCategorySnack
          }
        />

        <div className="max-w-4xl mx-auto px-4 min-h-lvh">
          <div className="mt-4">
            {loading ? (
              <p>Chargement...</p>
            ) : (
              <ProductList
                products={groupedBySubCategory}
                categories={(category === "boissons"
                  ? subCategoryDrink
                  : subCategorySnack
                ).reduce((acc, cat) => {
                  acc[cat.slug] = cat;
                  return acc;
                }, {})}
              />
            )}
          </div>
        </div>
        <Copyright />
      </div>
    </div>
  );
};

export default Category;
