import { LinkIcon } from "lucide-react";
import slugify from "slugify";
import ProductItem from "./ProductItem";
const ProductList = ({ products, categories }) => {
  if (!products || Object.keys(products).length === 0) {
    return <p>Aucun produit disponible.</p>;
  }
  const scrollToAnchor = (slug) => {
    const anchor = document.getElementById(slug);
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const sortedEntries = Object.entries(products).sort(([keyA], [keyB]) => {
    if (keyA === "autres") return 1; // "autres" toujours en dernier
    if (keyB === "autres") return -1;
    return 0; // sinon on garde l'ordre actuel
  });
  return (
    <div>
      {sortedEntries.map(([subCatKey, productList]) => (
        <div key={subCatKey} className="mb-8">
          <div className="anchor h-2.5" id={`${slugify(subCatKey)}`}></div>
          <h2
            className="text-2xl mb-6 flex items-center gap-2 border-b border-[#3F3D4F] pb-3 group cursor-pointer capitalize"
            onClick={() => {
              scrollToAnchor(slugify(subCatKey));
            }}
          >
            {categories?.[subCatKey]?.icon}{" "}
            {subCatKey !== "all" && subCatKey !== "autres" && "Nos"}{" "}
            {categories?.[subCatKey]?.name || subCatKey}
            {subCatKey === "accompagnements" && <>&nbsp;(gratuit)</>}
            <LinkIcon className="ml-1.5 size-5  transition-all group-hover:opacity-100 opacity-0" />
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
