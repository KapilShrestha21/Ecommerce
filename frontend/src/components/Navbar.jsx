import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { logoutUser } from "../features/auth/authThunks";
import { logout } from "../features/auth/authSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import SearchBtn from "./SearchBtn";
import { openCart } from "../features/cart/cartSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items)

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const shopRef = useRef(null);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [showShop, setShowShop] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close mega menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target)) {
        setShowShop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());       // Clear state - frontend logout
    dispatch(logoutUser());   // Call backend logout - backend logout
    navigate("/");         // Redirect to home
  };

  return (
    <nav
      className={`fixed top-0 w-full z-40 px-10 py-5 flex justify-between items-center
      transition-all duration-300
      ${scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
        }`}
    >
      {/* LOGO */}
      <Link
        to="/"
        className={`text-3xl font-bold tracking-wide transition-colors duration-300 text-black
        `}
      >
        mogra
      </Link>

      {/* CENTER MENU */}
      <div
        className={`hidden md:flex gap-8 uppercase font-semibold text-sm
        transition-colors duration-300 text-black
        `}
      >
        {/* SHOP */}
        <div ref={shopRef} className="relative">
          <div
            onClick={() => setShowShop((prev) => !prev)}
            className="flex items-center gap-1 hover:text-gray-500 transition"
          >
            Shop
            <span className="text-3xl leading-none">
              <RiArrowDropDownLine />
            </span>
          </div>

          {/* MEGA MENU */}
          <div
            className={`fixed left-1/2 top-[80px] -translate-x-1/2 w-[620px]
            bg-white  text-black shadow-xl 
            transition-all duration-500 ease-out
            ${showShop
                ? "opacity-80 translate-y-0 my-6 pointer-events-auto"
                : "opacity-0 -translate-y-6 pointer-events-none"
              }`}
          >
            <div className="grid grid-cols-2 p-6 text-sm">
              {/* LEFT */}
              <div>
                <h3 className="font-semibold mb-4">CLOTHING</h3>
                <ul className="space-y-3 ml-2 text-xs text-black/60">
                  {[
                    "Dresses",
                    "Corsets",
                    "Tops",
                    "Skirts",
                    "Co-ord Sets",
                    "Jackets",
                    "Lehengas",
                    "Ethnic Wear",
                    "Blouses",
                    "Sarees",
                  ].map((item) => (
                    <li
                      key={item}
                      className="hover:text-black cursor-pointer transition"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* RIGHT */}
              <div>
                <h3 className="font-semibold mb-4">JEWELRY</h3>
                <ul className="space-y-3 ml-2 mb-6 text-xs text-black/60">
                  {["Necklaces", "Earrings", "Bracelets", "Rings"].map(
                    (item) => (
                      <li
                        key={item}
                        className="hover:text-black cursor-pointer transition"
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>

                <h3 className="font-semibold mb-4">ACCESSORIES</h3>
                <ul className="space-y-3 ml-2 mb-6 text-xs text-black/60">
                  {["Bindis", "Bags / Clutches", "Belts / Straps"].map(
                    (item) => (
                      <li
                        key={item}
                        className="hover:text-black cursor-pointer transition"
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>

                <ul className="space-y-3 font-semibold text-sm">
                  {["JEANS UPCYCLE", "BLUE GULMOHAR", "MOGRA LIVING"].map(
                    (item) => (
                      <li
                        key={item}
                        className="hover:text-gray-600 cursor-pointer transition"
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Link to="/" className="hover:text-gray-500 transition items-center flex">
          About Us
        </Link>
        <Link to="/" className="hover:text-gray-500 transition items-center flex">
          Contact Us
        </Link>
      </div>

      {/* RIGHT MENU */}
      <div
        className={`flex items-center gap-4 text-sm
        transition-colors duration-300 text-black
        `}
      >
        {!isAuthenticated ? (
          <Link to="/login" className="hover:text-gray-500 transition ">
            SIGN IN
          </Link>
        ) : (
          <>
            <span className="text-sm">Hi, {user?.firstName}</span>
            <button
              onClick={handleLogout}
              className="text-red-500 text-sm cursor-pointer hover:text-red-700 transition"
            >
              Logout
            </button>
          </>
        )}

        <SearchBtn />

        <div
          onClick={() => dispatch(openCart())}
          className="flex items-center gap-2 cursor-pointer">
          <FaCartShopping className="text-lg" />

          {cartCount > 0 && (
            <span className="text-sm font-medium">
              ({cartCount})
            </span>
          )}
        </div>

      </div>
    </nav>
  );
}
