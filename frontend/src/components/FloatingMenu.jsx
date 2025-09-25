import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Link as LinkIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-green-200 shadow-lg hover:scale-110 transition-transform"
      >
        {open ? <X size={24} /> : <Upload size={24} />}
      </button>

      {/* Floating Options */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 flex flex-col gap-5"
          >
            {/* Upload File */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/uploadfile")}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-green-50 text-green-500 border-green-500 hover:bg-green-500 hover:text-green-200  shadow-md hover:scale-110 transition-transform"
            >
              <Upload size={20} />
            </motion.button>

            {/* Upload Link */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/uploadurl")}
              className="flex items-center justify-center w-14 h-14 rounded-full  bg-green-50 text-green-500 border-green-500 hover:bg-green-500 hover:text-green-200  shadow-md hover:scale-110 transition-transform"
            >
              <LinkIcon size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
