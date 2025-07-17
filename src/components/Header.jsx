import { useProductFilterStore } from "@/hooks/useProductFilterStore";
import { Link, useParams } from "react-router";
import { Button } from "./ui/button";

const Header = () => {
  const { category } = useParams();
  const setSearchTerm = useProductFilterStore((state) => state.setSearchTerm);

  const handleClearSearch = () => setSearchTerm("");

  return (
    <div>
      <div className="flex items-center justify-center px-4 py-6 max-w-4xl mx-auto gap-12 overflow-hidden">
        <Button
          variant={category === "snacks" ? "" : "ghost"}
          className={`text-2xl font-bold p-0 h-min cursor-pointer ${
            category === "snacks" ? "neon" : "border-3 neon-inactif"
          }`}
        >
          <Link
            to="/categorie/snacks"
            onClick={handleClearSearch}
            className="w-full h-full inline-block px-4 py-2"
          >
            🍟 Snacks
          </Link>
        </Button>

        <Link to="/" onClick={handleClearSearch}>
          <img src="/logo.png" alt="logo" width={86} height={86} />
        </Link>

        <Button
          variant={category === "boissons" ? "" : "ghost"}
          className={`text-2xl font-bold p-0 h-min cursor-pointer ${
            category === "boissons" ? "neon" : "border-3 neon-inactif"
          }`}
        >
          <Link
            to="/categorie/boissons"
            onClick={handleClearSearch}
            className="w-full h-full inline-block px-4 py-2"
          >
            🍹 Boissons
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
