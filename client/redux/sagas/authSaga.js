import {
  call,
  put,
  takeEvery
} from "redux-saga/effects";
import axios from "axios";
import {
  API
} from "../../api";

import {
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
} from "../slices/authSlice";

// LOGIN FLOW
function* handleLogin(action) {
  try {
    const {
      email,
      password
    } = action.payload;

    const response = yield call(() =>
      axios.post(API.AUTH.LOGIN, {
        email,
        password
      })
    );

    yield put(
      loginSuccess({
        token: response.data.token,
        user: response.data.user,
      })
    );
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}



// REGISTER FLOW
function* handleRegister(action) {
  try {
    const response = yield call(() =>
      axios.post(API.AUTH.REGISTER, action.payload)
    );

    yield put(registerSuccess(response.data.message));
  } catch (error) {
    yield put(registerFailure(error.response?.data?.message || "Register failed"));
  }
}

// FORGOT PASSWORD
function* handleForgotPassword(action) {
  try {
    const response = yield call(() =>
      axios.post(API.AUTH.FORGOT_PASSWORD, {
        email: action.payload.email
      })
    );

    yield put(forgotPasswordSuccess(response.data.message));
  } catch (error) {
    yield put(forgotPasswordFailure(error.response?.data?.message || "Error"));
  }
}

function* handleResetPassword(action) {
  try {
    const response = yield call(() =>
      axios.post(API.AUTH.RESET_PASSWORD, {
        token: action.payload.token,
        new_password: action.payload.new_password,
      })
    );

    yield put(resetPasswordSuccess(response.data.message));

  } catch (error) {
    yield put(
      resetPasswordFailure(error.response?.data?.message || "Reset failed")
    );
  }
}


// LOGOUT
function* handleLogout() {
  localStorage.clear();
  yield put(logoutSuccess());
}

export function* watchAuthSaga() {
  yield takeEvery(loginRequest.type, handleLogin);
  yield takeEvery(registerRequest.type, handleRegister);
  yield takeEvery(forgotPasswordRequest.type, handleForgotPassword);
  yield takeEvery(resetPasswordRequest.type, handleResetPassword);
  yield takeEvery(logoutRequest.type, handleLogout);
}