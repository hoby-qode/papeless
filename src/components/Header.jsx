import { Link, useParams } from "react-router";
import { Button } from "./ui/button";

const Header = () => {
  const { category } = useParams();
  return (
    <div>
      <div className="flex items-center justify-center px-4 py-6 max-w-4xl mx-auto gap-12 overflow-hidden">
        <Button
          variant={category === "snacks" ? "" : "ghost"}
          className={`text-2xl font-bold px-4 h-min ${
            category === "snacks" ? "neon" : "border-3 neon-inactif"
          }`}
        >
          <Link to="/categorie/snacks">🍟 Snacks</Link>
        </Button>
        <Link to="/">
          <img src="/logo.png" alt="logo" width={86} height={86} />
        </Link>
        <Button
          variant={category === "boissons" ? "" : "ghost"}
          className={`text-2xl font-bold px-4 h-min ${
            category === "boissons" ? "neon" : "border-3 neon-inactif"
          }`}
        >
          <Link to="/categorie/boissons">🍹Boissons</Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
