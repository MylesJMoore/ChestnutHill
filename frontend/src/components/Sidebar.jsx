import { Link } from "react-router-dom";
import { HomeIcon, UserIcon, BookmarkIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

const navItems = [
  { label: "Home", path: "/", icon: HomeIcon },
  { label: "Profile", path: "/profile", icon: UserIcon },
  { label: "Saved", path: "/saved", icon: BookmarkIcon },
  { label: "Logout", path: "/logout", icon: ArrowLeftStartOnRectangleIcon },
];

export default function Sidebar() {
  return (
    <div className="p-4 space-y-4">
      <Link to="/">
        <h1 className="text-2xl font-bold text-green-700 mb-8 hover:text-green-500 transition-colors duration-500">Chestnut Hill</h1>
      </Link>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex items-center gap-4 p-2 rounded-full hover:bg-green-100 transition w-full"
          >
            <item.icon className="h-6 w-6 text-green-700" />
            <span className="text-lg font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
