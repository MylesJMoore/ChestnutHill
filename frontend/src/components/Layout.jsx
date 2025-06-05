import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";

export default function Layout({ children, onLogout }) {
  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Left Sidebar */}
      <aside className="w-64 border-r border-gray-200 p-4">
        <Sidebar onLogout={onLogout} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 border-r border-gray-200 min-h-screen max-w-2xl mx-auto p-4">
        {children}
      </main>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
}
