import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileUp,
  Link2,
  FileClock,
  HandHelping,
  FileText,
  ChartLine,
  FolderCode,
  Crown,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function Sidebar() {
  const { t } = useLanguage();

  const links = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: t.dashboard,
    },
    { to: "/uploadfile", icon: <FileUp size={20} />, label: t.documents },
    { to: "/uploadurl", icon: <Link2 size={20} />, label: t.uploadLink },
    { to: "/history", icon: <FileClock size={20} />, label: t.history },
    { to: "/help", icon: <HandHelping size={20} />, label: t.help },
    { to: "/compliance", icon: <FileText size={20} />, label: t.compliance },
    { to: "/analytics", icon: <ChartLine size={20} />, label: t.analytics },
    { to: "/about", icon: <FolderCode size={20} />, label: t.about },
    { to: "/admin-options", icon: <Crown size={20} />, label: t.adminOptions },
  ];

  return (
    <aside
      className="
        fixed top-4 left-4
        h-[calc(100%-2rem)] w-64
        bg-white/10 backdrop-blur-2xl
        rounded-4xl shadow-sm border border-white/20
        flex flex-col
        transition-all duration-300
      "
    >
      {/* Logo */}
      <div className="flex items-center justify-center py-6 border-b border-white/20">
        <img
          src="./logo2-2.svg"
          alt="logo"
          className="h-12 w-auto object-contain drop-shadow-lg"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-3 gap-2 flex-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
               ${
                 isActive
                   ? "bg-gradient-to-r from-white/80 to-white/50 text-gray-900 shadow-sm"
                   : "text-gray-400 hover:bg-white/15 hover:text-black/80"
               }`
            }
          >
            {link.icon}
            <span className="font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
