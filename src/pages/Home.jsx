import { useProductFilterStore } from "@/hooks/useProductFilterStore";
import { useEffect, useState } from "react";
import CategoryTabs from "../components/CategoryTabs";
import ProductList from "../components/ProductList";

const categories = [
  { slug: "all", name: "Tous", image: "", icon: "" },
  {
    slug: "boissons",
    name: "Boissons",
    image: "/categories/boissons.png",
    icon: "🥂",
  },
  {
    slug: "snacks",
    name: "Snacks",
    image: "/categories/snacks.png",
    icon: "🍟",
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectedCategory = useProductFilterStore(
    (state) => state.selectedCategory
  );
  const searchTerm = useProductFilterStore((state) => state.searchTerm);
  const setCategory = useProductFilterStore((state) => state.setCategory);
  const filterProducts = useProductFilterStore((state) => state.filterProducts);

  const filtered = filterProducts(products);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Erreur de chargement produits :", err));
  }, []);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timeout);
  }, [selectedCategory, searchTerm]); // ← écoute aussi searchTerm

  return (
    <div className="max-w-4xl mx-auto px-4 min-h-lvh">
      <CategoryTabs
        categoryFilter={selectedCategory}
        setCategoryFilter={setCategory}
        categories={categories}
      />

      <div className="mt-4">
        {/* Place ton SearchBar ici si ce n’est pas déjà fait */}
        {/* <SearchBar /> */}

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <ProductList
            filtered={filtered}
            category={categories.find((c) => c.slug === selectedCategory)}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
