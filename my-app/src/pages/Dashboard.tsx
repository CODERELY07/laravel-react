import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
    const savedUser = localStorage.getItem("user");
    const navigate = useNavigate();
    const initialUser = savedUser ? JSON.parse(savedUser) : null;
    const [user] = useState(initialUser);

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');

        navigate('/login');
    }
  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-indigo-900 text-white hidden md:block">
        <div className="p-6 text-2xl font-bold border-b border-indigo-800">
          MyApp
        </div>
        <nav className="mt-6 p-4 space-y-2">
          <Link to={'/dashboard'} className="bg-indigo-800 p-3 rounded-lg cursor-pointer font-medium">Dashboard</Link>
          <Link to={'/profile'} className="hover:bg-indigo-800 p-3 rounded-lg cursor-pointer transition">Profile</Link>
          <div className="hover:bg-indigo-800 p-3 rounded-lg cursor-pointer transition">Settings</div>
        </nav>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col">
        
        {/* --- TOP HEADER --- */}
        <header className="h-16 bg-white shadow-sm border-b px-8 flex items-center justify-between relative">
          <h2 className="text-xl font-semibold text-gray-700">Dashboard Overview</h2>

          {/* Profile Dropdown Container */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <img 
                src="https://ui-avatars.com/api/?name=John+Doe&background=4f46e5&color=fff" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-gray-200"
              />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl z-50 py-2">
                <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Your Profile
                </a>
                <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Account Settings
                </a>
                <hr className="my-1 border-gray-100" />
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold"
                  onClick={logout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* --- PAGE CONTENT --- */}
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm">Total Posts</p>
              <h3 className="text-3xl font-bold">24</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm">Active Users</p>
              <h3 className="text-3xl font-bold">1,204</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm">Server Status</p>
              <h3 className="text-3xl font-bold text-green-500">Online</h3>
            </div>
          </div>

          <div className="mt-8 bg-white h-64 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
            Main content goes here...
          </div>
        </main>

      </div>
    </div>
  );
};

export default Dashboard;