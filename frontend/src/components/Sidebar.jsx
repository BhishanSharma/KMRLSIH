import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileUp,
  Link2,
  FileClock,
  HandHelping,
  FileText,
  View,
  ChartLine,
  FolderCode,
  Crown,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function Sidebar() {
  const { t } = useLanguage();

  const links = [
    { to: "/dashboard", icon: <LayoutDashboard />, label: t.dashboard },
    { to: "/uploadfile", icon: <FileUp />, label: t.documents },
    { to: "/uploadurl", icon: <Link2 />, label: t.uploadLink },
    { to: "/history", icon: <FileClock />, label: t.history },
    { to: "/help", icon: <HandHelping />, label: t.help },
    { to: "/compliance", icon: <FileText />, label: t.compliance },

    { to: "/analytics", icon: <ChartLine />, label: t.analytics },
    { to: "/about", icon: <FolderCode />, label: t.about },
    { to: "/admin-options", icon: <Crown />, label: t.adminOptions },
  ];

  return (
    <aside
      className="
        fixed top-4 left-4
        h-[calc(100%-2rem)] w-64
        bg-white/30 backdrop-blur-xl
        rounded-2xl
        flex flex-col
        transition-all duration-300
      "
    >
      {/* Logo */}
      <div className="flex items-center justify-center border-b border-gray-200">
        <span className="font-bold text-sm w-50 m-0 h-full">
          <img src="./logo2-2.svg" alt="logo" />
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-2 gap-1 flex-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors
              hover:bg-gray-100/60
              ${isActive ? "bg-blue-200 text-black" : "text-gray-700"}`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
