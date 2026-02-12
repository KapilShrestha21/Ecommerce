import {
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaPinterestP,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LEFT SECTION */}
        <div>
          <h4 className="text-gray-500 mb-4">Follow</h4>

          {/* SOCIAL ICONS */}
          <div className="flex gap-3 mb-8">
            {[
              FaTwitter,
              FaFacebookF,
              FaYoutube,
              FaPinterestP,
              FaInstagram,
              FaLinkedinIn,
              FaTelegramPlane,
            ].map((Icon, index) => (
              <div
                key={index}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-gray-500 hover:bg-black hover:text-white transition cursor-pointer"
              >
                <Icon size={16} />
              </div>
            ))}
          </div>

          {/* STORE INFO */}
          <div className="text-sm text-gray-500 space-y-4">
            <p>
              <span className="font-medium">Store Location:</span><br />
              819, 27th Main, HSR Layout, Sector 1, Bangalore 560102
            </p>

            <p>
              <span className="font-medium">Store Hours:</span><br />
              Mon–Sat: 11:00 am to 7:30 pm
            </p>

            <p>Sun: 2:00 pm to 7:30 pm</p>

            <p>
              Email us at{" "}
              <span className="underline cursor-pointer">
                contact@mogradesigns.com
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col gap-6">

          {/* LINKS */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-gray-500 text-sm">
            <a href="#">Shipping Information</a>
            <a href="#">Size Guide</a>
            <a href="#">Refund Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>

          {/* NEWSLETTER */}
          <div>
            <p className="text-sm text-gray-500 mb-3">
              Sign up to get the latest on sales, new releases and more...
            </p>

            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 border border-gray-300 px-4 py-3 text-sm outline-none"
              />
              <button className="bg-black text-white px-6 py-3 text-sm hover:bg-gray-800">
                SIGN UP
              </button>
            </div>
          </div>

          {/* COPYRIGHT */}
          <p className="text-sm text-gray-400 mt-6">
            © 2026 Mogra Designs.
          </p>
        </div>
      </div>
    </footer>
  );
}
