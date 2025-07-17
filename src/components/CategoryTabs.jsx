import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import slugify from "slugify";
import SearchBar from "./SearchBar";
const CategoryTabs = ({ categories }) => {
  const scrollToAnchor = (slug) => {
    const anchor = document.getElementById(slug);
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative h-[400px] w-full">
      <div className="bg-glass absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:max-w-4xl max-w-[90%]">
        <div className="flex justify-center mb-7">
          <SearchBar />
        </div>

        <div className="px-16">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full "
          >
            <CarouselContent>
              {categories.map(
                (category) =>
                  category.slug != "all" && (
                    <CarouselItem
                      key={category.slug}
                      onClick={() => {
                        scrollToAnchor(category.slug);
                      }}
                      className="md:basis-1/3 lg:basis-1/4"
                    >
                      <div className="w-full rounded-full border border-white text-white flex flex-col justify-center items-center cursor-pointer aspect-square">
                        {category.image && (
                          <div className="w-5/6 aspect-square">
                            <img
                              src={category.image}
                              alt={category.name}
                              className="w-full h-full object-cover "
                            />
                          </div>
                        )}
                      </div>
                      <h3
                        className="text-lg text-center text-primary mt-2 underline underline-offset-4 font-bold cursor-pointer"
                        onClick={() => {
                          scrollToAnchor(slugify(category.slug));
                        }}
                      >
                        {category.name}
                      </h3>
                    </CarouselItem>
                  )
              )}
            </CarouselContent>
            {categories.length - 1 > 4 && (
              <>
                <CarouselNext />
                <CarouselPrevious />
              </>
            )}
          </Carousel>
        </div>
      </div>

      <img
        src="/images/fond/bg-fleur-mural.jpg"
        alt="fond"
        width={1024}
        height={225}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default CategoryTabs;
