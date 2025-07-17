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
    <div className="relative h-[400px] w-full  flex items-center justify-center p-8">
      <div className="bg-glass z-20 w-full md:max-w-4xl max-w-[90%]">
        <div className="flex justify-center mb-7">
          <SearchBar />
        </div>

        <div className="sm:px-16 px-2">
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
                      className="basis-full sm:basis-1/2  md:basis-1/4 flex flex-col items-center"
                    >
                      <div className="sm:w-full w-4/5 sm:max-w-full max-w-[200px] rounded-full border border-white text-white flex flex-col justify-center items-center cursor-pointer aspect-square">
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
        className="w-full h-full object-cover absolute top-0 left-0"
      />
    </div>
  );
};

export default CategoryTabs;
