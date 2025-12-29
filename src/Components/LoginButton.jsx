import { signInWithGoogle, logout } from "../auth/authService";
import { useAuth } from "../auth/useAuth";

const LoginButton = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <img
            src={user.photoURL}
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          <button
            onClick={logout}
            className="px-3 py-1 rounded bg-red-500 text-white text-sm"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="px-4 py-2 rounded bg-blue-500 text-white text-sm"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default LoginButton;
