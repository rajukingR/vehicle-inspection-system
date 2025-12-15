import { fork } from "redux-saga/effects";
import { watchAuthSaga } from "./authSaga";

export function* rootSaga() {
  yield fork(watchAuthSaga);
}
