// components/LoginForm.jsx
import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../FireBase/firebase";
// import { useAuth } from "../auth/useAuth";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import {loginWithEmail, signInWithGoogle} from "../auth/authService"

const LoginForm = ({ onClose, onSwitchToSignup }) => {
   const [showPassword, setShowPassword] = useState(false);
      const [formData, setFormData] = useState({
          email: '',
          password: ''
      });
      const [loading, setLoading] = useState(false);
  
      const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);
          // Add your login logic here
          await loginWithEmail(formData.email,formData.password);
          setTimeout(() => {
              setLoading(false);
              onClose();
          }, 1500);
      };
  
      return (
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-300">Password</label>
                      <button
                          type="button"
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                          Forgot password?
                      </button>
                  </div>
                  <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full pl-12 pr-12 py-3 bg-[#0a0a0a] border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500"
                          required
                      />
                      <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                  </div>
              </div>
  
              {/* Remember Me */}
              <div className="flex items-center gap-2">
                  <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 rounded border-gray-600 bg-[#0a0a0a] text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-400">
                      Remember me for 30 days
                  </label>
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
                          Signing in...
                      </>
                  ) : (
                      'Sign In'
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
  
              {/* Google Sign In */}
              <button
                  type="button"
                  onClick={()=>{signInWithGoogle(),onClose()}}
                  className="w-full py-3 px-4 bg-[#0a0a0a] border border-gray-700 hover:border-gray-600 hover:bg-[#151515] text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
              >
                  <FcGoogle size={22} />
                  Sign in with Google
              </button>
  
              {/* Switch to Signup */}
              <p className="text-center text-sm text-gray-400 mt-6">
                  Don't have an account?{' '}
                  <button
                      type="button"
                      onClick={onSwitchToSignup}
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer"
                  >
                      Sign up
                  </button>
              </p>
          </form>
      );
};

export default LoginForm;
