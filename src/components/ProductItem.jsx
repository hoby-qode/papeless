import { Button } from "@/components/ui/button";
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
import { Search } from "lucide-react";
const ProductItem = ({ product }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="  cursor-pointer group">
          <div
            className={`aspect-square w-full rounded-full border border-[#3F3D4F] overflow-hidden mb-2 p-3 bg-[#2A2A2A]  ${
              product.category === "boissons" ? "border border-[#3F3D4F]" : ""
            }`}
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full transition-all group-hover:scale-110 ${
                  product.category === "boissons"
                    ? "object-contain"
                    : "object-cover"
                }`}
              />
            )}
          </div>
          <div className="px-3">
            <div className="flex justify-between gap-3 items-end">
              <div className="flex flex-col">
                <h3 className="text-base  text-white">{product.name}</h3>
                <p className="m-0 text-[14px] text-white">
                  {product.price?.toLocaleString?.()} Ar
                </p>
              </div>
              <Button className="cursor-pointer h-auto text-white">
                <Search />
              </Button>
            </div>
          </div>
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
              {[product.image, ...(product.images_supplementaires || [])].map(
                (img, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={img}
                      alt={`${product.name} ${index}`}
                      className={`w-full h-full ${
                        product.category === "boissons"
                          ? "object-contain"
                          : "object-cover"
                      }`}
                    />
                  </CarouselItem>
                )
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <p>
            Catégorie : <strong>{product.category}</strong>
          </p>
          <p>
            Prix : <strong>{product.price?.toLocaleString?.()} Ar</strong>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductItem;
