import {
  createSlice
} from "@reduxjs/toolkit";

// Load from localStorage (for refresh persist)
const savedUser = JSON.parse(localStorage.getItem("user"));
const savedToken = localStorage.getItem("token");

const initialState = {
  isLoggedIn: !!savedToken,
  userEmail: savedUser?.email || "",
  user: savedUser || null,
  token: savedToken || null,
  loading: false,
  error: null,
  successMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // LOGIN
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      const {
        token,
        user
      } = action.payload;

      state.isLoggedIn = true;
      state.user = user;
      state.userEmail = user.email;
      state.token = token;
      state.loading = false;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // SIGNUP
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // FORGOT PASSWORD
    forgotPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
    },

    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },


    // LOGOUT
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.userEmail = "";
      state.user = null;
      state.token = null;
      state.loading = false;

      // Remove from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,

  logoutRequest,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;