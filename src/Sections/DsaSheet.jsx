import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiChevronRight, FiChevronDown, FiExternalLink, FiSearch, 
    FiCheckCircle, FiCircle, FiMenu, FiX, FiHome, FiUser, 
    FiLogOut, FiSettings, FiMail, FiLock, FiEye, FiEyeOff 
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import dsaRawData from '../Constants/CodeData';
import LoginButton from '../Components/LoginButton';
import { useAuth } from '../auth/useAuth';
import {
    getUserProgress,
    toggleProblem as toggleProblemInDB
} from "../services/progressService";
import { logout } from "../auth/authService";
import SignupForm from '../Components/SignupForm';
import LoginForm from '../Components/LoginForm';

// Beautiful Modal Component
const AuthModal = ({ isOpen, onClose, children, title }) => {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    
                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative w-full max-w-md mx-4 sm:mx-auto"
                    >
                        <div className="relative bg-gradient-to-b from-[#1a1a1a] to-[#121212] rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
                            {/* Decorative gradient top border */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                            
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 transition-colors z-10 group"
                                aria-label="Close modal"
                            >
                                <FiX size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                            </button>
                            
                            {/* Content */}
                            <div className="p-6 sm:p-8">
                                {title && (
                                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                                        {title}
                                    </h2>
                                )}
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// Enhanced Sign Up Form Component
const EnhancedSignupForm = ({ onClose, onSwitchToLogin }) => {
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
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
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
                className="w-full py-3 px-4 bg-[#0a0a0a] border border-gray-700 hover:border-gray-600 hover:bg-[#151515] text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
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
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                    Sign in
                </button>
            </p>
        </form>
    );
};

// Enhanced Login Form Component
const EnhancedLoginForm = ({ onClose, onSwitchToSignup }) => {
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
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
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
                className="w-full py-3 px-4 bg-[#0a0a0a] border border-gray-700 hover:border-gray-600 hover:bg-[#151515] text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
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
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                    Sign up
                </button>
            </p>
        </form>
    );
};

const DSADashboard = () => {
    const { user, loading } = useAuth();
    const [problems, setProblems] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [stats, setStats] = useState({ total: 0, completed: 0, easy: { total: 0, completed: 0 }, medium: { total: 0, completed: 0 }, hard: { total: 0, completed: 0 } });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    const isLoggedIn = !!user;

    // Switch between modals
    const handleSwitchToLogin = () => {
        setSignupOpen(false);
        setTimeout(() => setLoginOpen(true), 150);
    };

    const handleSwitchToSignup = () => {
        setLoginOpen(false);
        setTimeout(() => setSignupOpen(true), 150);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userDropdownOpen && !e.target.closest('.user-dropdown-container')) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [userDropdownOpen]);

    // Memoize calculateStats to avoid unnecessary re-renders
    const calculateStats = useCallback(() => {
        let total = 0;
        let completed = 0;
        let easy = { total: 0, completed: 0 };
        let medium = { total: 0, completed: 0 };
        let hard = { total: 0, completed: 0 };

        problems.forEach(category => {
            Object.values(category.problems).forEach(problemList => {
                problemList.forEach(problem => {
                    total++;
                    if (problem.completed) completed++;

                    const problemDifficulty = problem.difficulty || 'medium';

                    if (problemDifficulty === 'easy') {
                        easy.total++;
                        if (problem.completed) easy.completed++;
                    } else if (problemDifficulty === 'medium') {
                        medium.total++;
                        if (problem.completed) medium.completed++;
                    } else if (problemDifficulty === 'hard') {
                        hard.total++;
                        if (problem.completed) hard.completed++;
                    }
                });
            });
        });

        setStats({ total, completed, easy, medium, hard });
    }, [problems]);

    useEffect(() => {
        calculateStats();
    }, [problems, calculateStats]);

    useEffect(() => {
        if (loading) return;

        const loadProgress = async () => {
            let progress = {};
            if (user) {
                progress = await getUserProgress(user.uid);
            }

            const initialProblems = dsaRawData.categories.map(category => {
                const updatedProblems = Object.fromEntries(
                    Object.entries(category.problems).map(([difficulty, list]) => [
                        difficulty,
                        list.map(problem => ({
                            ...problem,
                            difficulty,
                            completed: !!progress[problem.id],
                        }))
                    ])
                );
                return {
                    ...category,
                    problems: updatedProblems
                };
            });

            setProblems(initialProblems);
        };

        loadProgress();
    }, [user, loading]);

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    const handleToggleProblem = async (categoryId, difficulty, problemId) => {
        if (!user) {
            setLoginOpen(true);
            return;
        }

        setProblems(prev =>
            prev.map(category => {
                if (category.id !== categoryId) return category;

                return {
                    ...category,
                    problems: {
                        ...category.problems,
                        [difficulty]: category.problems[difficulty].map(problem => {
                            if (problem.id !== problemId) return problem;

                            const toggled = !problem.completed;

                            toggleProblemInDB(user.uid, problem.id, toggled)
                                .catch(err => {
                                    console.error("Failed to update DB:", err);
                                    setProblems(prev2 =>
                                        prev2.map(cat => {
                                            if (cat.id !== categoryId) return cat;
                                            return {
                                                ...cat,
                                                problems: {
                                                    ...cat.problems,
                                                    [difficulty]: cat.problems[difficulty].map(p =>
                                                        p.id === problemId ? { ...p, completed: problem.completed } : p
                                                    )
                                                }
                                            };
                                        })
                                    );
                                });

                            return { ...problem, completed: toggled };
                        })
                    }
                };
            })
        );
    };

    const getCategoryStats = (category) => {
        let total = 0;
        let completed = 0;

        Object.values(category.problems).forEach(difficultyArray => {
            difficultyArray.forEach(problem => {
                total++;
                if (problem.completed) completed++;
            });
        });
        return { total, completed };
    };

    const filteredProblems = problems.map(category => ({
        ...category,
        problems: Object.fromEntries(
            Object.entries(category.problems).map(([difficulty, problemList]) => [
                difficulty,
                problemList.filter(problem => {
                    if (selectedDifficulty !== 'all' && problem.difficulty !== selectedDifficulty) return false;
                    if (searchQuery && !problem.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
                    return true;
                })
            ])
        )
    })).filter(category =>
        Object.values(category.problems).some(arr => arr.length > 0)
    );

    const percentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white text-lg">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex flex-col font-sans">
            {/* NAVBAR */}
            <nav className="bg-[#121212]/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo and Home */}
                        <div className="flex items-center">
                            <a href="/" className="flex items-center gap-2 text-white hover:bg-[#1a1a1a] px-3 py-2 rounded-lg transition-colors group">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <FiHome size={18} className="text-white" />
                                </div>
                                <span className="font-bold text-lg hidden sm:inline bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    DSA Sheet
                                </span>
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            <a href="/" className="px-4 py-2 text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-all text-sm font-medium">
                                Home
                            </a>
                            <a href="#" className="px-4 py-2 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-all text-sm font-medium">
                                Solutions
                            </a>
                            <a href="#" className="px-4 py-2 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-all text-sm font-medium">
                                Discussions
                            </a>
                        </div>

                        {/* Right side - Auth or User Menu */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {!isLoggedIn ? (
                                <>
                                    {/* Desktop Auth Buttons */}
                                    <div className="hidden sm:flex items-center gap-2">
                                        <button
                                            onClick={() => setLoginOpen(true)}
                                            className="px-4 py-2 text-gray-300 hover:text-white font-medium rounded-lg transition-all hover:bg-[#1a1a1a] text-sm cursor-pointer"
                                        >
                                            Sign In
                                        </button>
                                        <button
                                            onClick={() => setSignupOpen(true)}
                                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all text-sm shadow-lg shadow-blue-500/25 cursor-pointer"
                                        >
                                            Get Started
                                        </button>
                                    </div>

                                    {/* Mobile Auth Button */}
                                    <button
                                        onClick={() => setLoginOpen(true)}
                                        className="sm:hidden px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm"
                                    >
                                        Sign In
                                    </button>
                                </>
                            ) : (
                                <div className="relative user-dropdown-container">
                                    <button
                                        onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                        className="flex items-center gap-2 hover:bg-[#1a1a1a] p-1.5 sm:px-3 sm:py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    >
                                        <img
                                            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=3b82f6&color=fff&bold=true`}
                                            alt={user.displayName || "User"}
                                            className="w-8 h-8 rounded-full ring-2 ring-blue-500/50"
                                        />
                                        <span className="hidden sm:inline text-sm font-medium text-gray-300 max-w-[120px] truncate">
                                            {user.displayName || user.email?.split('@')[0]}
                                        </span>
                                        <FiChevronDown 
                                            size={16} 
                                            className={`hidden sm:block text-gray-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} 
                                        />
                                    </button>

                                    {/* User Dropdown Menu */}
                                    <AnimatePresence>
                                        {userDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 mt-2 w-56 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-xl overflow-hidden z-50"
                                            >
                                                <div className="px-4 py-3 border-b border-gray-700 bg-[#151515]">
                                                    <p className="text-sm font-semibold text-white truncate">{user.displayName}</p>
                                                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                                </div>
                                                <div className="py-1">
                                                    <a
                                                        href="#"
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-[#252525] hover:text-white transition-colors"
                                                    >
                                                        <FiUser size={16} className="text-blue-400" />
                                                        My Profile
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-[#252525] hover:text-white transition-colors"
                                                    >
                                                        <FiSettings size={16} className="text-gray-400" />
                                                        Settings
                                                    </a>
                                                </div>
                                                <div className="border-t border-gray-700 py-1">
                                                    <button
                                                        onClick={logout}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-[#252525] hover:text-red-300 transition-colors"
                                                    >
                                                        <FiLogOut size={16} />
                                                        Sign Out
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
                            >
                                {mobileMenuOpen ? <FiX size={22} className="text-white" /> : <FiMenu size={22} className="text-white" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="md:hidden border-t border-gray-800 overflow-hidden"
                            >
                                <div className="py-3 space-y-1">
                                    <a href="/" className="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors font-medium">
                                        Home
                                    </a>
                                    <a href="#" className="block px-4 py-2.5 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors font-medium">
                                        Solutions
                                    </a>
                                    <a href="#" className="block px-4 py-2.5 text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors font-medium">
                                        Discussions
                                    </a>
                                    
                                    {!isLoggedIn && (
                                        <div className="pt-3 border-t border-gray-800 space-y-2 px-4">
                                            <button
                                                onClick={() => {
                                                    setMobileMenuOpen(false);
                                                    setSignupOpen(true);
                                                }}
                                                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg transition-colors"
                                            >
                                                Get Started
                                            </button>
                                        </div>
                                    )}
                                    
                                    {isLoggedIn && (
                                        <div className="pt-3 border-t border-gray-800">
                                            <button
                                                onClick={logout}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-[#1a1a1a] rounded-lg transition-colors"
                                            >
                                                <FiLogOut size={16} />
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>

            {/* Auth Modals */}
            <AuthModal
                isOpen={signupOpen}
                onClose={() => setSignupOpen(false)}
                title="Create your account"
            >
                <SignupForm 
                    onClose={() => setSignupOpen(false)} 
                    onSwitchToLogin={handleSwitchToLogin}
                />
            </AuthModal>

            <AuthModal
                isOpen={loginOpen}
                onClose={() => setLoginOpen(false)}
                title="Welcome back"
            >
                <LoginForm 
                    onClose={() => setLoginOpen(false)} 
                    onSwitchToSignup={handleSwitchToSignup}
                />
            </AuthModal>

            {/* Main Content */}
            <main className="flex-1">
                {/* Header */}
                <header className="bg-gradient-to-b from-[#121212] to-[#0a0a0a] border-b border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
                                    Devdrip21{' '}
                                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                        SDE Sheet
                                    </span>
                                </h1>
                                <p className="text-sm sm:text-base text-gray-400 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    Last updated: December 18, 2025
                                </p>
                            </div>
                        </div>
                        <p className="text-sm sm:text-base text-gray-400 mt-6 leading-relaxed max-w-2xl">
                            Top coding interview questions from Data Structures & Algorithms. 
                            Handpicked for companies like{' '}
                            <span className="text-blue-400">Google</span>,{' '}
                            <span className="text-yellow-400">Amazon</span>,{' '}
                            <span className="text-green-400">Microsoft</span>, and more. 
                            Keep Coding, Be Consistent.
                        </p>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    {/* Tabs and Filters */}
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="flex flex-wrap gap-2">
                            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all">
                                All Problems
                            </button>
                            <button className="px-5 py-2.5 bg-transparent text-gray-400 rounded-xl font-medium hover:bg-[#1a1a1a] hover:text-white transition-all text-sm border border-gray-700/50">
                                Revision
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search problems..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-[#1a1a1a] border border-gray-700/50 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm text-white placeholder-gray-500"
                                />
                            </div>
                            <select
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                                className="px-4 py-3 bg-[#1a1a1a] border border-gray-700/50 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm text-white cursor-pointer min-w-[160px]"
                            >
                                <option value="all">All Difficulties</option>
                                <option value="easy">🟢 Easy</option>
                                <option value="medium">🟡 Medium</option>
                                <option value="hard">🔴 Hard</option>
                            </select>
                        </div>
                    </div>

                    {/* Overall Progress */}
                    <div className="bg-gradient-to-br from-[#121212] to-[#1a1a1a] rounded-2xl border border-gray-800 p-5 sm:p-6 mb-8 shadow-xl">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-5 w-full lg:w-auto">
                                {/* Circular Progress */}
                                <div className="relative w-24 h-24 flex-shrink-0">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="48"
                                            cy="48"
                                            r="40"
                                            stroke="#1f2937"
                                            strokeWidth="8"
                                            fill="none"
                                        />
                                        <motion.circle
                                            cx="48"
                                            cy="48"
                                            r="40"
                                            stroke="url(#progressGradient)"
                                            strokeWidth="8"
                                            fill="none"
                                            strokeLinecap="round"
                                            initial={{ strokeDasharray: "0 251.2" }}
                                            animate={{ strokeDasharray: `${(percentage / 100) * 251.2} 251.2` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                        <defs>
                                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#3b82f6" />
                                                <stop offset="100%" stopColor="#8b5cf6" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">{percentage}%</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Your Progress</h3>
                                    <p className="text-sm sm:text-base text-gray-400">
                                        {stats.completed} of {stats.total} problems solved
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 w-full lg:w-auto">
                                <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                    <span className="text-sm text-gray-300">Easy:</span>
                                    <span className="text-sm font-bold text-white">{stats.easy.completed}/{stats.easy.total}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-lg border border-yellow-500/20">
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                    <span className="text-sm text-gray-300">Medium:</span>
                                    <span className="text-sm font-bold text-white">{stats.medium.completed}/{stats.medium.total}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                    <span className="text-sm text-gray-300">Hard:</span>
                                    <span className="text-sm font-bold text-white">{stats.hard.completed}/{stats.hard.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories List */}
                    <div className="space-y-4 pb-6">
                        {filteredProblems.map((category, index) => {
                            const categoryStats = getCategoryStats(category);
                            const isExpanded = expandedCategories[category.id];
                            const categoryPercentage = categoryStats.total > 0 ? Math.round((categoryStats.completed / categoryStats.total) * 100) : 0;

                            return (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03, duration: 0.3 }}
                                    className="bg-[#121212] rounded-xl border border-gray-800 overflow-hidden shadow-lg hover:border-gray-700 transition-colors"
                                >
                                    {/* Category Header */}
                                    <button
                                        onClick={() => toggleCategory(category.id)}
                                        className="w-full px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-[#1a1a1a]/50 transition-colors focus:outline-none"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className={`p-1 rounded-lg transition-colors ${isExpanded ? 'bg-blue-500/20' : 'bg-gray-800'}`}>
                                                {isExpanded ? (
                                                    <FiChevronDown className="text-blue-400" size={20} />
                                                ) : (
                                                    <FiChevronRight className="text-gray-400" size={20} />
                                                )}
                                            </div>
                                            <span className="text-base sm:text-lg font-semibold text-white truncate">{category.name}</span>
                                            {categoryStats.completed === categoryStats.total && categoryStats.total > 0 && (
                                                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full font-medium">
                                                    ✓ Complete
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3 w-full sm:w-auto ml-0 sm:ml-4">
                                            <div className="flex-1 sm:flex-initial sm:w-48 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${categoryPercentage}%` }}
                                                    transition={{ duration: 0.5, delay: 0.2 }}
                                                    className={`h-full rounded-full ${
                                                        categoryPercentage === 100 
                                                            ? 'bg-gradient-to-r from-green-500 to-emerald-400' 
                                                            : 'bg-gradient-to-r from-blue-500 to-purple-500'
                                                    }`}
                                                />
                                            </div>
                                            <span className="text-sm font-medium text-gray-400 whitespace-nowrap min-w-[50px] text-right">
                                                {categoryStats.completed}/{categoryStats.total}
                                            </span>
                                        </div>
                                    </button>

                                    {/* Problems List */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-4 sm:px-6 py-4 border-t border-gray-800 bg-[#0d0d0d]">
                                                    {Object.entries(category.problems).map(([difficulty, problemList]) => (
                                                        problemList.length > 0 && (
                                                            <div key={difficulty} className="mb-5 last:mb-0">
                                                                <div className="flex items-center gap-2 mb-3">
                                                                    <div className={`w-2 h-2 rounded-full ${
                                                                        difficulty === 'easy' ? 'bg-green-500' : 
                                                                        difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                                                                    }`}></div>
                                                                    <h4 className={`text-sm font-semibold ${
                                                                        difficulty === 'easy' ? 'text-green-400' : 
                                                                        difficulty === 'medium' ? 'text-yellow-400' : 'text-red-400'
                                                                    }`}>
                                                                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} 
                                                                        <span className="text-gray-500 font-normal ml-1">({problemList.length})</span>
                                                                    </h4>
                                                                </div>
                                                                <div className="space-y-1">
                                                                    {problemList.map((problem) => (
                                                                        <div
                                                                            key={problem.id}
                                                                            className="flex items-center gap-3 py-2.5 border-b border-gray-800/50 last:border-0 group hover:bg-[#1a1a1a] px-3 -mx-3 rounded-lg transition-colors"
                                                                        >
                                                                            <button
                                                                                onClick={() => handleToggleProblem(category.id, difficulty, problem.id)}
                                                                                className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-full p-0.5"
                                                                                aria-label={`Mark ${problem.name} as ${problem.completed ? 'incomplete' : 'complete'}`}
                                                                            >
                                                                                {problem.completed ? (
                                                                                    <FiCheckCircle className="text-green-500" size={20} />
                                                                                ) : (
                                                                                    <FiCircle className="text-gray-600 group-hover:text-blue-400 transition-colors" size={20} />
                                                                                )}
                                                                            </button>

                                                                            <span className={`flex-1 text-sm truncate transition-colors ${
                                                                                problem.completed ? 'text-gray-500 line-through' : 'text-gray-300 group-hover:text-white'
                                                                            }`}>
                                                                                {problem.name}
                                                                            </span>

                                                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                                                {problem.isTheory && (
                                                                                    <span className="px-2 py-1 text-xs bg-purple-500/10 text-purple-400 rounded-md border border-purple-500/20 font-medium">
                                                                                        Theory
                                                                                    </span>
                                                                                )}

                                                                                {problem.url && (
                                                                                    <a
                                                                                        href={problem.url}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        onClick={(e) => e.stopPropagation()}
                                                                                        className="p-2 rounded-lg bg-[#1a1a1a] hover:bg-[#252525] transition-all opacity-60 md:opacity-0 md:group-hover:opacity-100 hover:scale-110"
                                                                                        aria-label={`View ${problem.name}`}
                                                                                    >
                                                                                        <FiExternalLink className="text-gray-400 hover:text-blue-400" size={14} />
                                                                                    </a>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>

                    {filteredProblems.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#121212] rounded-2xl border border-gray-800 p-12 text-center"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                                <FiSearch className="text-gray-500" size={28} />
                            </div>
                            <p className="text-gray-300 text-lg font-medium">No problems found</p>
                            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
                        </motion.div>
                    )}
                </div>
            </main>

            {/* FOOTER */}
            <footer className="bg-[#0a0a0a] border-t border-gray-800 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                        <div>
                            <h4 className="text-white font-bold text-base mb-4">DSA Sheet</h4>
                            <ul className="space-y-2.5">
                                <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Pricing</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-base mb-4">Resources</h4>
                            <ul className="space-y-2.5">
                                <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Tutorials</a></li>
                                <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-base mb-4">Community</h4>
                            <ul className="space-y-2.5">
                                <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Discussions</a></li>
                                <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Discord</a></li>
                                <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">GitHub</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-base mb-4">Legal</h4>
                            <ul className="space-y-2.5">
                                <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-gray-500 text-sm">© 2025 DSA Sheet. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#252525] transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#252525] transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DSADashboard;