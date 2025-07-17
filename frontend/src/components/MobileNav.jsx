import {
  HomeIcon,
  UserIcon,
  BookmarkIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function MobileNav({ onLogout }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around items-center py-2 md:hidden z-50">
      <Link to="/" className="flex flex-col items-center text-sm text-gray-700">
        <HomeIcon className="h-6 w-6" />
        <span>Home</span>
      </Link>
      <Link to="/profile" className="flex flex-col items-center text-sm text-gray-700">
        <UserIcon className="h-6 w-6" />
        <span>Profile</span>
      </Link>
      <Link to="/saved" className="flex flex-col items-center text-sm text-gray-700">
        <BookmarkIcon className="h-6 w-6" />
        <span>Saved</span>
      </Link>
      <button
        onClick={onLogout}
        className="flex flex-col items-center text-sm text-red-700"
      >
        <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
        <span>Logout</span>
      </button>
    </div>
  );
}
