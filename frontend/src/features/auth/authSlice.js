import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./authThunks";

// try loading user from localStorage
const userFromStorage = (() => {
  const stored = localStorage.getItem("user");
  try {
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.warn("Invalid user in localStorage, clearing it.");
    localStorage.removeItem("user");
    return null;
  }
})();

const initialState = {
  user: userFromStorage,
  isLoading: false,
  isAuthenticated: !!userFromStorage,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    }
  },

  extraReducers: (builder) => {
    // ===== LOGIN =====
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      // Make sure payload has user object
      const user = action.payload.user;
      if (user) {
        state.user = user; // store user with role
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", action.payload.accessToken);
      } else {
        state.error = "Login failed: no user data";
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // ===== REGISTER =====
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload; // use payload directly
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // ===== LOGOUT =====
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
