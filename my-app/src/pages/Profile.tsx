import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profile } from "../services/authService";

const Profile = () => {
  const navigate = useNavigate();
  
  // 1. Get initial data from localStorage
  const savedUser = localStorage.getItem("user");
  const initialUser = savedUser ? JSON.parse(savedUser) : null;

  // 2. Initialize state with localStorage data
  const [name, setName] = useState(initialUser?.name || '');
  const [email] = useState(initialUser?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  // 3. Security: Redirect to login if no user/token found
  useEffect(() => {
    if (!initialUser || !initialUser.token) {
      navigate("/login");
    }
  }, [initialUser, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const token = initialUser?.token;
    const userData = {
      name: name,
      email: email as string,
      password: password,
    };

    // 4. Call the service with data and token
    profile(userData, token)
      .then((res) => {
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          const updatedUser = { ...res.data.data, token: token };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          alert("Profile updated successfully!");
        }
      })
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      
      {/* Header Section */}
      <div className="flex items-center gap-6 bg-white p-8 rounded-2xl shadow-sm border">
        <img 
          src={`https://ui-avatars.com/api/?name=${name}&background=4f46e5&color=fff&size=128`} 
          alt="Profile" 
          className="w-24 h-24 rounded-full border-4 border-indigo-50 shadow-sm"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{name || 'User'}</h1>
          <p className="text-gray-500">{email}</p>
          <span className="mt-2 inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase">
            Active Account
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Account Details Form */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-lg font-bold mb-4 border-b pb-2 text-gray-800">Update Profile</h2>
            
            {/* Error Message Display */}
            {errors.length > 0 && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                {errors.map((err, i) => <p key={i}>{err}</p>)}
              </div>
            )}

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm text-gray-500 cursor-not-allowed sm:text-sm"
                />
                <p className="text-xs text-gray-400 mt-1 italic">Contact admin to change your primary email.</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-bold text-red-600 mb-3 uppercase tracking-wider">Change Password</h3>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              >
                Save Changes
              </button>
            </form>
          </section>
        </div>

        {/* Right Column: Info Panel */}
        <div className="space-y-6">
          <section className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 shadow-sm">
            <h3 className="font-bold text-indigo-900 mb-2">Account Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-indigo-700">Posts Shared:</span>
                <span className="font-bold text-indigo-900 text-lg">24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-indigo-700">Security Status:</span>
                <span className="font-bold text-green-600">Verified</span>
              </div>
            </div>
          </section>
          
          <button 
            onClick={() => alert("Contact support to delete account.")}
            className="w-full py-3 text-red-600 border border-red-200 rounded-xl hover:bg-red-50 font-bold transition shadow-sm bg-white"
          >
            Deactivate Account
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;