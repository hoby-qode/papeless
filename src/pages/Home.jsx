import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();

  // Parallax sur les titres
  const parallaxSnacks = useTransform(scrollY, [0, 300], [0, -50]);
  const parallaxBoissons = useTransform(scrollY, [0, 300], [0, -50]);

  // Attendre que toutes les images soient chargées
  useEffect(() => {
    const handleImagesLoaded = () => {
      const allImages = Array.from(document.images);
      const unloaded = allImages.filter((img) => !img.complete);

      if (unloaded.length === 0) {
        setIsLoaded(true);
        return;
      }

      let loadedCount = 0;
      unloaded.forEach((img) => {
        img.addEventListener("load", () => {
          loadedCount += 1;
          if (loadedCount === unloaded.length) {
            setIsLoaded(true);
          }
        });
        img.addEventListener("error", () => {
          loadedCount += 1;
          if (loadedCount === unloaded.length) {
            setIsLoaded(true);
          }
        });
      });
    };

    handleImagesLoaded();
  }, []);

  return (
    <div className="relative mx-auto min-h-lvh overflow-hidden">
      {/* Loader avec logo tournant */}
      {!isLoaded && (
        <div className="fixed top-0 inset-0 z-50 bg-black flex items-center justify-center">
          <motion.img
            src="/logo.svg"
            alt="loading-logo"
            className="w-20 h-20 border-2 border-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      )}

      {/* Titre + Logo */}
      <motion.div
        className="absolute top-8 w-full flex flex-col items-center gap-4 z-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -50 }}
        transition={{ duration: 1.2, delay: 1 }}
      >
        <motion.h1
          className="text-white md:text-5xl text-xl font-bold tracking-tight"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: isLoaded ? 1 : 0.8, opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Fais-toi kiffer !!
        </motion.h1>

        <div className="mt-16">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <Link to="/" className=" block">
              <img
                src="/logo.svg"
                alt="logo"
                width={86}
                height={86}
                className=" border-2 border-white rounded-full "
              />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Fond flou */}
      <motion.img
        src="/images/fond/bg-blur.jpg"
        alt="fond"
        className="absolute w-full h-full object-cover top-0 left-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 2, duration: 1.2 }}
      />

      {/* Fond bois qui monte du bas */}
      <motion.img
        src="/images/fond/bg-bois.jpg"
        alt="fond"
        className="absolute w-full h-[210px] object-cover bottom-0 left-0 z-[5]"
        initial={{ y: 210 }}
        animate={{ y: isLoaded ? 0 : 210 }}
        transition={{ delay: 0.5, duration: 1 }}
      />

      {/* Contenu principal */}
      <div className="flex h-screen w-screen relative z-10">
        {/* Snacks */}
        <div
          className="basis-1/2 flex items-center justify-center cursor-pointer bg-[#FF9500]/45 relative group overflow-hidden"
          onClick={() => navigate("/categorie/snacks")}
        >
          <motion.h2
            className="text-white md:text-8xl text-3xl -rotate-[7deg] absolute md:top-1/4 top-1/2 z-10 font-bold italic"
            style={{ y: parallaxSnacks }}
            initial={{ opacity: 0, y: 160 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 160 }}
            transition={{ delay: 1.2, duration: 1.8, ease: "backInOut" }}
          >
            Snacks
          </motion.h2>

          <motion.img
            src="/images/fond/snacks.png"
            alt="snacks"
            className="group-hover:scale-110 transition-transform duration-300 ease-out
             absolute w-5/6 h-auto left-1/2 -translate-x-1/2 bottom-10 z-0 max-w-[680px]"
            initial={{ y: 1800, opacity: 0 }}
            animate={{
              y: isLoaded ? [300, -30, 0] : 1800,
              opacity: isLoaded ? 1 : 0,
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              delay: 1.2,
            }}
          />
        </div>

        {/* Boissons */}
        <div
          className="basis-1/2 flex items-center justify-center cursor-pointer bg-[#1C2D57]/45 relative group overflow-hidden"
          onClick={() => navigate("/categorie/boissons")}
        >
          <motion.h2
            className="text-white md:text-8xl text-3xl -rotate-[7deg] absolute md:top-1/6 top-1/2 z-10 font-bold italic"
            style={{ y: parallaxBoissons }}
            initial={{ opacity: 0, y: 160 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 160 }}
            transition={{ delay: 1.2, duration: 1.8, ease: "backInOut" }}
          >
            Boissons
          </motion.h2>

          <motion.img
            src="/images/fond/boissons.png"
            alt="boissons"
            initial={{ y: 1800, opacity: 0 }}
            animate={{
              y: isLoaded ? [300, -30, 0] : 1800,
              opacity: isLoaded ? 1 : 0,
            }}
            transition={{
              duration: 2.5,
              ease: "easeOut",
              delay: 1.2,
            }}
            className="group-hover:scale-110 transition-transform duration-300 ease-out
             absolute w-2/3 h-auto left-1/2 -translate-x-1/2 bottom-10 z-0 max-w-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
