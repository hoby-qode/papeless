import { useProductFilterStore } from "@/hooks/useProductFilterStore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

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
  const navigate = useNavigate();
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
      <div className=" mx-auto min-h-lvh relative ">
        <div className="absolute top-5 w-full flex flex-col items-center gap-4">
          <h1>Fais-toi kiffer</h1>
          <Link to="/">
            <img src="/logo.png" alt="logo" width={86} height={86} />
          </Link>
        </div>
        <div className="flex h-screen w-screen">
          <div
            className="basis-1/2 flex items-center justify-center cursor-pointer bg-orange-500 text-white text-5xl"
            onClick={() => navigate("/categorie/snack")}
          >
            Snacks
          </div>
          <div
            className="basis-1/2 flex items-center justify-center cursor-pointer bg-pink-600 text-white text-5xl"
            onClick={() => navigate("/categorie/boissons")}
          >
            Boissons
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
