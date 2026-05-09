import { all, fork } from "redux-saga/effects";
import { orderBookSaga } from "../features";

export function* rootSaga() {
  yield all([fork(orderBookSaga)]);
}
