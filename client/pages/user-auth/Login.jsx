import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { loginRequest } from "../../redux/slices/authSlice";
import { loginSuccess, loginFailure } from "../../redux/slices/authSlice";

import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //   const handleLogin = (e) => {
  //   e.preventDefault();
  //   dispatch(loginRequest({ email, password }));
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      dispatch(loginFailure("Email and password required"));
      return;
    }
    const fakeUser = {
      id: 1,
      email,
      name: "Admin",
      role_name: "Admin",
    };

    const fakeToken = "dummy-token-123";
    dispatch(
      loginSuccess({
        user: fakeUser,
        token: fakeToken,
      })
    );
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Side - Design */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-100 to-orange-50 flex-col items-center justify-center relative overflow-hidden">
        <img
          src="/bigbee-logo.png"
          alt="Company Logo"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Login</h2>
            <p className="text-muted-foreground text-sm">Enter your credentials to access your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <a href="/forgot-password" className="text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                disabled={loading}
                className="w-4 h-4 rounded border border-input bg-background cursor-pointer disabled:opacity-50"
              />
              <label htmlFor="remember" className="text-sm text-foreground cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </a>
            </p>
          </div>


        </div>
      </div>
    </div>
  );
}
