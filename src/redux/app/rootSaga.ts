import { all, fork } from "redux-saga/effects";
import { orderBookSaga } from "../sagas";

export function* rootSaga() {
  yield all([fork(orderBookSaga)]);
}
