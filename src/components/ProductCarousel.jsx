import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductCarousel = ({ filtered, categoryFilter }) => {
  return (
    <div className="">
      <h2>Nos {categoryFilter.name}</h2>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent>
          {filtered.map((p, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p>{p.price} Ar</p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
