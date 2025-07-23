import { useProductFilterStore } from "@/hooks/useProductFilterStore";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
    slug: "meat-lover",
    name: "Meat Lover",
    image: "/images/categories/meat-lover.png",
    icon: "🥩",
  },
  {
    slug: "fruits-de-mer",
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
  const scrollRef = useRef(null);
  const locoScrollRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollInstance = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      smartphone: { smooth: true },
      getDirection: true,
      getSpeed: true,
    });

    locoScrollRef.current = scrollInstance;

    scrollInstance.on("scroll", (args) => {
      const shouldShow = args.scroll.y > 100;
      setShowScrollTop((prev) => {
        if (prev !== shouldShow) return shouldShow;
        return prev;
      });
    });

    return () => {
      scrollInstance.destroy();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      // Donne le temps à React de rendre tous les éléments (ProductList, images, etc.)
      setTimeout(() => {
        locoScrollRef.current?.update();
      }, 300); // délai court pour laisser le temps au DOM de s'afficher
    }
  }, [loading]);
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
      <div className="bg-app-container" data-scroll-container ref={scrollRef}>
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
      {showScrollTop && (
        <button
          onClick={() => {
            if (locoScrollRef.current) {
              locoScrollRef.current.scrollTo("#header", {
                duration: 800,
                easing: [0.25, 0.0, 0.35, 1.0],
              });
            }
          }}
          className="size-12 fixed z-[99999999] top-[93vh] right-4 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer"
        >
          <ChevronUp />
        </button>
      )}
    </div>
  );
};

export default Category;
