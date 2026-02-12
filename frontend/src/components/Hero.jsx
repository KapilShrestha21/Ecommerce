import homeImage from "../assets/frontImage.jpg";
import middleImage from "../assets/middleImage.jpg";
import middleImage2 from "../assets/middleImage2.jpg";
import middleImage3 from "../assets/middleImage3.jpg";

import { categories } from "../data/categories";
import { categories2 } from "../data/categories2";
import InstagramDetail from "../components/InstagramDetail";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

  const navigate = useNavigate();

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative h-screen w-full">
        <img
          src={homeImage}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 h-full flex items-center px-10">
          <div className="max-w-md">
            <h2 className="text-white text-3xl font-light ml-9 mb-4">
              Bringing India to your Wardrobe
            </h2>

            <p className="text-gray-200 ml-9 mb-6">Shipping worldwide</p>

            <button
              onClick={() => navigate("/shop")}
              className="transition-all duration-300 ease-out bg-black hover:bg-gray-600 cursor-pointer text-white ml-9 px-8 py-2 text-sm tracking-wide">
              SHOP ALL
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- CATEGORIES - 1 (SCROLLING LAYER) ---------------- */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 bg-white relative z-10 py-14 sm:py-16 lg:py-20">

        {/* Heading */}
        <div className="flex items-center flex-col justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <h1 className="text-center text-xl sm:text-2xl font-light">
            Collection List
          </h1>
          <div className="w-20 sm:w-26 max-w-xl h-0.5 bg-gray-500"></div>
        </div>

        {/* Grid */}
        <div className="
    grid 
    grid-cols-2 
    sm:grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-4 
    gap-x-6 sm:gap-x-8 lg:gap-x-10
    gap-y-10 sm:gap-y-12 lg:gap-y-16
  ">
          {categories.map((item) => (
            <div key={item.id} className="group cursor-pointer">

              {/* Image */}
              <div className="overflow-hidden rounded-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="
              w-full 
              h-[300px] sm:h-[360px] md:h-[380px] lg:h-[420px]
              object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-105
            "
                />
              </div>

              {/* Title */}
              <p
                className="
            mt-3 sm:mt-4
            text-center text-xs sm:text-sm tracking-wide
            transition-colors duration-300
            group-hover:text-gray-600
          "
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>

      </section>


      {/* ---------------- STICKY BACKGROUND IMAGE ---------------- */}
      <section className="relative h-[800px] w-full">
        <div className="sticky top-0 h-[600px] w-full">

          <img
            src={middleImage}
            alt="Middle"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 h-full flex items-center px-10">
            <div className="max-w-md">
              <h2 className="text-white text-3xl font-light ml-9 mb-4">
                Bringing India to your Wardrobe
              </h2>

              <p className="text-gray-200 ml-9 mb-6">
                Shipping worldwide
              </p>

              <button className="transition-all duration-300 ease-out bg-black hover:bg-gray-600 cursor-pointer text-white ml-9 px-8 py-2 text-sm tracking-wide">
                SHOP ALL
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- Categories - 2 ------------------------- */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 bg-white relative z-10 py-14 sm:py-16 lg:py-20">

        {/* Heading */}
        <div className="flex items-center flex-col justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <h1 className="text-center text-xl sm:text-2xl font-light">
            Featured Collection
          </h1>
          <div className="w-20 sm:w-26 max-w-xl h-0.5 bg-gray-500"></div>
        </div>

        {/* Grid */}
        <div
          className="
      grid
      grid-cols-2
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-x-6 sm:gap-x-8 lg:gap-x-10
      gap-y-10 sm:gap-y-12 lg:gap-y-16
    "
        >
          {categories2.map((item) => (
            <div key={item.id} className="group cursor-pointer">

              {/* Image */}
              <div className="overflow-hidden rounded-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="
              w-full
              h-[300px] sm:h-[360px] md:h-[380px] lg:h-[420px]
              object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-105
            "
                />
              </div>

              {/* Title */}
              <p
                className="
            mt-3 sm:mt-4
            text-center text-xs sm:text-sm tracking-wide
            transition-colors duration-300
            group-hover:text-gray-600
          "
              >
                {item.title}
              </p>

              {/* Price */}
              <p
                className="
            mt-1 sm:mt-2
            text-center text-sm font-semibold tracking-wide
            transition-colors duration-300
            group-hover:text-gray-600
          "
              >
                {item.money}
              </p>

            </div>
          ))}
        </div>

      </section>

      {/* ---------------- STICKY BACKGROUND IMAGE ---------------- */}
      <section className="relative h-[800px] w-full">
        <div className="sticky top-0 h-[600px] w-full">

          <img
            src={middleImage3}
            alt="Middle"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10 h-full flex items-center px-10">
            <div className="max-w-md">
              <h2 className="text-white text-3xl font-light ml-9 mb-4">
                Bringing India to your Wardrobe
              </h2>

              <p className="text-gray-200 ml-9 mb-6">
                Shipping worldwide
              </p>

              <button className="transition-all duration-300 ease-out bg-black hover:bg-gray-600 cursor-pointer text-white ml-9 px-8 py-2 text-sm tracking-wide">
                SHOP ALL
              </button>
            </div>
          </div>

        </div>
      </section>

      <InstagramDetail />
    </>
  );
};

export default HeroSection;
