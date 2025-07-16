import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CategoryTabs from "../components/CategoryTabs";
import Copyright from "../components/Copyright";
import Header from "../components/Header";
import ProductList from "../components/ProductList";

const subCategorySnack = [
  { slug: "all", name: "Tous", image: "", icon: "" },
  { slug: "apero", name: "Apéro", image: "", icon: "🍢" },
  { slug: "pasta", name: "Pâtes", image: "", icon: "🍝" },
  { slug: "pizza", name: "Pizza", image: "", icon: "🍕" },
  { slug: "tacos", name: "Tacos", image: "", icon: "🌮" },
  { slug: "salade", name: "Salade", image: "", icon: "🥗" },
  { slug: "meat lover", name: "Meat Lover", image: "", icon: "🥩" },
  { slug: "fruits de mer", name: "Fruits de Mer", image: "", icon: "🦐" },
  { slug: "accompagnements", name: "Accompagnements", image: "", icon: "🍟" },
];

const subCategoryDrink = [
  { slug: "all", name: "Tous", image: "", icon: "" },
  { slug: "non-alcoolisees", name: "Non-Alcoolisées", image: "", icon: "🥤" },
  { slug: "alcoolisees", name: "Alcoolisées", image: "", icon: "🍸" },
  { slug: "cocktails", name: "Cocktails", image: "", icon: "🍹" },
  {
    slug: "boissons-de-saison",
    name: "Boissons de Saison",
    image: "",
    icon: "🌞",
  },
];

const Category = () => {
  const { category } = useParams(); // "boissons" ou "snacks"
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement produits :", err);
        setLoading(false);
      });
  }, []);

  // 1. Filtrer par catégorie principale
  const filtered = allProducts.filter((p) => p.category === category);

  // 2. Grouper par sous-catégorie
  const groupedBySubCategory = filtered.reduce((acc, product) => {
    const subCat = product.sous_category || "autres";
    if (!acc[subCat]) acc[subCat] = [];
    acc[subCat].push(product);
    return acc;
  }, {});

  return (
    <>
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
    </>
  );
};

export default Category;
