import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordRequest } from "../../redux/slices/authSlice";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../api/Api_url";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const [loadingPage, setLoadingPage] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const { loading, error, successMessage } = useSelector((s) => s.auth);

  useEffect(() => {
    async function checkToken() {
      try {
        await axios.post(`${API_URL}/auth/check-reset-token`, { token });
        setIsValidToken(true);
      } catch (err) {
        setIsValidToken(false);
      }
      setLoadingPage(false);
    }
    checkToken();
  }, [token]);

  if (loadingPage) {
    return <div className="text-center mt-10">Checking token...</div>;
  }

  if (!isValidToken) {
    return (
      <div className="text-center mt-20 text-red-600 text-xl">
        Invalid or expired reset link.
        <br />
        <a href="/forgot-password" className="text-blue-600 underline">
          Request a new reset link
        </a>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");

    dispatch(resetPasswordRequest({ token, new_password: newPassword }));
  };

  if (successMessage) {
    setTimeout(() => navigate("/login"), 1500);
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="hidden lg:flex lg:w-1/2 bg-orange-50 items-center justify-center">
        <img src="/bigbee-logo.png" alt="Logo" />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold mb-2">Reset Password</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Enter your new password.
          </p>

          {error && <div className="p-3 mb-5 bg-red-200 rounded">{error}</div>}
          {passwordError && (
            <div className="p-3 mb-5 bg-red-200 rounded">{passwordError}</div>
          )}
          {successMessage && (
            <div className="p-3 mb-5 bg-green-200 rounded">{successMessage}</div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>

            <div className="relative">
              <label className="text-sm font-medium">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  placeholder="••••••••"
                  disabled={loading}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 pr-10 py-3 rounded-lg border border-input bg-background 
                 text-foreground placeholder-muted-foreground 
                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
                 disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground 
                 hover:text-foreground transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  placeholder="••••••••"
                  disabled={loading}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 pr-10 py-3 rounded-lg border border-input bg-background 
                 text-foreground placeholder-muted-foreground 
                 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
                 disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground 
                 hover:text-foreground transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>


            <button
              className="w-full py-3 bg-primary text-white rounded disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
