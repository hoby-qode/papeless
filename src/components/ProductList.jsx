import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const ProductList = ({ filtered, category }) => {
  return (
    <div className="">
      <h2 className="text-2xl mb-10">
        {category.icon} {category.slug != "all" && "Nos"} {category.name}
      </h2>
      <div className="grid grid-cols-4 gap-4">
        {filtered.map((product) => (
          <Dialog key={product.id} className="bg-card">
            <DialogTrigger asChild>
              <div className="border p-2 rounded-[8px] cursor-pointer group">
                <div
                  className={`h-40 w-full rounded-[7px] bg-card  overflow-hidden mb-2 ${
                    product.category == "boissons"
                      ? "border border-[#3F3D4F]"
                      : ""
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full group-hover:scale-110 transition-all h-full  ${
                      product.category === "boissons"
                        ? "object-contain"
                        : "object-cover"
                    }`}
                  />
                </div>
                <h3 className="text-base mb-1.5 text-white">{product.name}</h3>
                <p className="m-0 text-[14px] text-white">{product.price} Ar</p>
              </div>
            </DialogTrigger>
            <DialogContent className="bg-card">
              <DialogHeader className="flex justify-center">
                <DialogTitle className="text-center text-3xl text-white">
                  {product.name}
                </DialogTitle>
                <DialogDescription className="hidden">
                  {product.name}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 text-sm">
                <Carousel className="w-full max-w-xs">
                  <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index} className="">
                        <img
                          src={product.image}
                          alt={product.name}
                          className={`w-full h-full  ${
                            product.category === "boissons"
                              ? "object-contain"
                              : "object-cover"
                          }`}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <p>
                  Catégorie : <strong>{product.category}</strong>
                </p>
                <p>
                  Prix : <strong>{product.price.toLocaleString()} Ar</strong>
                </p>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
