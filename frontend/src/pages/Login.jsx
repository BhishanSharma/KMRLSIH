import { Eye, EyeOff } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import gsap from "gsap";
import { login as loginUser } from "../api/services";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // new state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const trainRef = useRef(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const bgRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await loginUser(employeeId, password);
      login(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    gsap.to(trainRef.current, {
      y: "-=10",
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut",
    });
  }, []);

  const handleMouseMove = (e) => {
    const rect = bgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    gsap.to(coords, {
      x,
      y,
      duration: 0.3,
      onUpdate: () => setCoords({ x: coords.x, y: coords.y }),
    });
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-gray-100">
      {/* Left Section */}
      <div
        ref={bgRef}
        onMouseMove={handleMouseMove}
        className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 relative overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${coords.x}% ${coords.y}%,rgba(77,197,94,0.2), rgba(255,255,255,1) 70%)`,
        }}
      >
        <div className="w-full relative z-10">
          {/* Heading */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mt-2">
              Please enter your details below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee ID *
              </label>
              <input
                type="text"
                placeholder="Enter Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="mt-2 w-full px-5 py-4 border rounded-xl  focus:outline-none text-base bg-white/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // toggle type
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full px-5 py-4 border rounded-xl  focus:outline-none text-base bg-white/40 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-green-200 text-green-500 hover:bg-green-700 hover:text-green-200 rounded-xl transition-colors font-semibold flex items-center justify-center text-lg"
            >
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-1/2 relative items-center justify-center">
        <img
          ref={trainRef}
          src="/train4.png"
          alt="Train Station"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-black backdrop-blur-xl p-6 sm:p-10 rounded-2xl shadow-xl w-11/12 md:w-4/5 lg:w-3/4">
          <p className="text-base sm:text-lg md:text-xl mb-6">
            “Our train station workflow system enhances efficiency, improves
            coordination, and ensures a smooth journey for passengers and staff
            alike.”
          </p>
          <h4 className="font-bold text-lg sm:text-xl md:text-2xl">
            KMRL Workflow
          </h4>
          <p className="text-sm sm:text-base opacity-80">
            Metro Operations Team
          </p>
        </div>
      </div>
    </div>
  );
}
