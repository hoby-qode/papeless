import { useProductFilterStore } from "@/hooks/useProductFilterStore";
import { useEffect, useState } from "react";

const categories = [
  { slug: "all", name: "Tous", image: "", icon: "" },
  {
    slug: "boissons",
    name: "Boissons",
    image: "/images/categories/boissons.png",
    icon: "🥂",
  },
  {
    slug: "snacks",
    name: "Snacks",
    image: "/images/categories/snacks.png",
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
    <>
      <div className="max-w-4xl mx-auto px-4 min-h-lvh">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
        laborum, corporis et quasi, eos amet necessitatibus nobis obcaecati
        porro rerum, facere reiciendis est. Voluptate dolores rem inventore in
        doloremque. Facilis.
      </div>
    </>
  );
};

export default Home;
