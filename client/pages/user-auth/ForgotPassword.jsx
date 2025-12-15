import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordRequest } from "../../redux/slices/authSlice";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordRequest({ email }));
  };

  return (
    <div className="flex h-screen bg-background">
      
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-100 to-orange-50 flex-col items-center justify-center">
        <img src="/bigbee-logo.png" />
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold mb-2">Forgot Password</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Enter your email to receive a password reset link.
          </p>

          {error && <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600">{error}</div>}
          {successMessage && <div className="p-3 bg-green-50 border border-green-200 rounded text-green-600">{successMessage}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-lg"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/login" className="text-primary hover:underline">Back to Login</a>
          </div>

        </div>
      </div>

    </div>
  );
}
