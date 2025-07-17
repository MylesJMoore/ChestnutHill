import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import MobileNav from "./MobileNav";

export default function Layout({ children, onLogout }) {
  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Left Sidebar (hidden on mobile) */}
      <aside className="hidden md:block w-64 border-r border-gray-200 p-4">
        <Sidebar onLogout={onLogout} />
      </aside>

      {/* Mobile Nav (only shows on mobile) */}
      <MobileNav onLogout={onLogout} />

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto p-4 border-r border-gray-200 min-h-screen">
        {children}
      </main>

      {/* Right Sidebar */}
      <aside className="hidden lg:block w-64 p-0">
        <RightSidebar />
      </aside>
    </div>
  );
}
