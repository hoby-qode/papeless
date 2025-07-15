import { create } from "zustand";

export const useProductFilterStore = create((set, get) => ({
  searchTerm: "",
  selectedCategory: "all",

  setSearchTerm: (term) => set({ searchTerm: term }),
  setCategory: (category) => set({ selectedCategory: category }),
  resetFilters: () => set({ searchTerm: "", selectedCategory: "all" }),

  filterProducts: (products) => {
    const { searchTerm, selectedCategory } = get();

    return products.filter((product) => {
      const matchCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchSearch =
        searchTerm.trim() === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

      // On applique toujours les deux filtres
      return matchCategory && matchSearch;
    });
  },
}));
