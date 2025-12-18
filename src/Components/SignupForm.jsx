// components/SignupForm.jsx
import React, { useState } from "react";
//import { signupWithEmail } from "../auth/authService"; // Firebase signup
// import { useAuth } from "../auth/useAuth";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle, signupWithEmail } from "../auth/authService";

const SignupForm = ({ onClose, onSwitchToLogin }) => {
 const [showPassword, setShowPassword] = useState(false);
     const [formData, setFormData] = useState({
         name: '',
         email: '',
         password: ''
     });
     const [loading, setLoading] = useState(false);
 
     const handleSubmit = async (e) => {
         e.preventDefault();
         setLoading(true);
         // Add your signup logic here
        await signupWithEmail(formData.email,formData.password,formData.name);
         setTimeout(() => {
             setLoading(false);
             onClose();
         }, 1500);
     };
 
     return (
         <form onSubmit={handleSubmit} className="space-y-5">
             {/* Name Input */}
             <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-300">Full Name</label>
                 <div className="relative">
                     <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                     <input
                         type="text"
                         placeholder="John Doe"
                         value={formData.name}
                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                         className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500"
                         required
                     />
                 </div>
             </div>
 
             {/* Email Input */}
             <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-300">Email Address</label>
                 <div className="relative">
                     <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                     <input
                         type="email"
                         placeholder="you@example.com"
                         value={formData.email}
                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                         className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500"
                         required
                     />
                 </div>
             </div>
 
             {/* Password Input */}
             <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-300">Password</label>
                 <div className="relative">
                     <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                     <input
                         type={showPassword ? "text" : "password"}
                         placeholder="••••••••"
                         value={formData.password}
                         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                         className="w-full pl-12 pr-12 py-3 bg-[#0a0a0a] border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500"
                         required
                         minLength={8}
                     />
                     <button
                         type="button"
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                     >
                         {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                     </button>
                 </div>
                 <p className="text-xs text-gray-500">Must be at least 8 characters</p>
             </div>
 
             {/* Submit Button */}
             <button
                 type="submit"
                 disabled={loading}
                 className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 cursor-pointer"
             >
                 {loading ? (
                     <>
                         <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                         Creating Account...
                     </>
                 ) : (
                     'Create Account'
                 )}
             </button>
 
             {/* Divider */}
             <div className="relative my-6">
                 <div className="absolute inset-0 flex items-center">
                     <div className="w-full border-t border-gray-700"></div>
                 </div>
                 <div className="relative flex justify-center text-sm">
                     <span className="px-4 bg-[#151515] text-gray-500">or continue with</span>
                 </div>
             </div>
 
             {/* Google Sign Up */}
             <button
                 type="button"
                 onClick={signInWithGoogle}
                 className="w-full py-3 px-4 bg-[#0a0a0a] border border-gray-700 hover:border-gray-600 hover:bg-[#151515] text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
             >
                 <FcGoogle size={22} />
                 Sign up with Google
             </button>
 
             {/* Switch to Login */}
             <p className="text-center text-sm text-gray-400 mt-6">
                 Already have an account?{' '}
                 <button
                     type="button"
                     onClick={onSwitchToLogin}
                     className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
                 >
                     Sign in
                 </button>
             </p>
         </form>
     );
};

export default SignupForm;
