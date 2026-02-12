import { useState } from "react";
import { categories4 } from "../data/categories4";

export default function InstagramDetail() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">

      {/* ===== GRID ===== */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
          gap-3 sm:gap-4
        "
      >
        {categories4.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImg(item)}
            className="relative group cursor-pointer overflow-hidden"
          >
            {/* Image */}
            <img
              src={item.image}
              alt="Post"
              className="
                w-full
                h-[180px] sm:h-[220px] md:h-[240px] lg:h-[280px]
                object-cover
                transition-transform duration-700 ease-out
                group-hover:scale-105
              "
            />

            {/* Soft overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Play Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                className="w-10 h-10 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* ===== POPUP MODAL ===== */}
      {selectedImg && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">

          <div
            className="
              relative
              bg-white
              w-full
              max-w-4xl
              rounded-lg
              overflow-hidden
              grid
              grid-cols-1
              md:grid-cols-2
              animate-fadeIn
            "
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImg(null)}
              className="
                absolute
                top-3 right-4
                text-gray-600
                text-2xl
                hover:text-black
                transition
              "
            >
              ✕
            </button>

            {/* Image */}
            <div className="w-full">
              <img
                src={selectedImg.image}
                alt="Zoomed"
                className="w-full h-[300px] md:h-[500px] object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  {selectedImg.title || "Instagram Post"}
                </h2>

                <hr className="my-4" />

                <p className="text-gray-600 text-sm mb-4">
                  This is a sample Instagram or product description.
                  Replace it with real content from your backend.
                </p>

                <div className="flex gap-4 text-sm text-gray-700">
                  <span>❤️ 1,234</span>
                  <span>💬 56</span>
                </div>
              </div>

              <button
                className="
                  mt-6
                  bg-black
                  text-white
                  py-2
                  rounded-md
                  hover:bg-gray-800
                  transition
                "
              >
                View Product
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
