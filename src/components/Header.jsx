import { Pin } from "lucide-react";
import { Link } from "react-router";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div className="border-b">
      <div className="flex items-center justify-between px-4 py-6 max-w-4xl mx-auto ">
        <Link to="/">
          <img src="/logo.png" alt="logo" width={86} height={86} />
        </Link>
        <p className="m-0 flex items-center gap-1">
          <Pin /> Pattaya-Bar/Barbershop Ambohipo
        </p>
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
