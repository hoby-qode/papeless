const CategoryTabs = ({ categoryFilter, setCategoryFilter, categories }) => {
  return (
    <div className="flex gap-2 items-center justify-center mt-11">
      {categories.map((category) => (
        <div
          key={category.slug}
          onClick={() => setCategoryFilter(category.slug)}
          className={`${
            categoryFilter == category.slug
              ? "border-primary text-white"
              : " text-[#857ECB]"
          } cursor-pointer px-4 py-2  min-w-[193px] h-[205px] border rounded-md items-center flex flex-col justify-center bg-card transition-all `}
        >
          {category.image && (
            <div
              className={`size-[130px] m-0 mb-3 transition-all ${
                categoryFilter == category.slug ? "scale-110" : "scale-100"
              }`}
            >
              <img src={category.image} alt={category.name} />
            </div>
          )}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryTabs;
