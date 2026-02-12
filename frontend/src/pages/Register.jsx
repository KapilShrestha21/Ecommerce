import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authThunks";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((res) => {
      if (!res.error) {
        navigate("/");
      }
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="w-full max-w-md">

        <h2 className="text-2xl text-center mb-8">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium mb-1">FIRST NAME</label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              required
              className="w-full border border-gray-300 px-4 py-2 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">LAST NAME</label>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
              required
              className="w-full border border-gray-300 px-4 py-2 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">EMAIL</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
              className="w-full border border-gray-300 px-4 py-2 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">PASSWORD</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
              className="w-full border border-gray-300 px-4 py-2 outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-2 hover:bg-gray-800"
          >
            {isLoading ? "Creating..." : "SIGN UP"}
          </button>

          <p className="text-center text-sm mt-4">
            Returning Customer?{" "}
            <Link to="/login" className="text-pink-600">
              Sign In →
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}
