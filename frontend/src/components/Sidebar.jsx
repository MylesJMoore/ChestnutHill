import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-green-700">🌿 Chestnut Hill</h1>
      <nav className="space-y-2">
        <Link to="/" className="block text-lg hover:text-green-600">Home</Link>
        <Link to="/profile" className="block text-lg hover:text-green-600">Profile</Link>
        <Link to="/saved" className="block text-lg hover:text-green-600">Saved</Link>
        <Link to="/logout" className="block text-lg hover:text-green-600">Logout</Link>
      </nav>
    </div>
  );
}