import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProductFilterStore } from "@/hooks/useProductFilterStore";
import { Search } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

const SearchBar = () => {
  const { category } = useParams();
  const setSearchTerm = useProductFilterStore((state) => state.setSearchTerm);
  const searchTerm = useProductFilterStore((state) => state.searchTerm);

  const [inputValue, setInputValue] = useState(searchTerm || "");

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-1 items-center border border-white rounded-md py-1.5 px-3">
      <Input
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        onBlur={handleSearch}
        placeholder={`Chercher ${
          category === "boissons" ? "à boire" : "à manger"
        }`}
        className="border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 py-1 h-8"
      />

      <Button
        variant="ghost"
        size="icon"
        onClick={handleSearch}
        className="p-1 h-8 w-8"
      >
        <Search className="w-4 h-4 text-muted-foreground" />
      </Button>
    </div>
  );
};

export default SearchBar;
