import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    onLogout();          // clear token
    navigate("/login");  // go to login screen
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <aside className="w-64 bg-white shadow-lg border-r">
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-green-700">🌿 Chestnut Hill</h1>
          <nav className="space-y-2">
            <Link className="block text-lg hover:text-green-600" to="/">Home</Link>
            <Link className="block text-lg hover:text-green-600" to="/profile">Profile</Link>
            <Link className="block text-lg hover:text-green-600" to="/saved">Saved</Link>
            <a className="block text-lg hover:text-green-600" href="/logout" onClick={handleLogoutClick}>Logout</a>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}