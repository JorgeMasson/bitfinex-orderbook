import { EventChannel, eventChannel } from "redux-saga";
import {
  Effect,
  call,
  put,
  select,
  take,
  takeLatest,
} from "redux-saga/effects";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import {
  connectOrderBook,
  setBook,
  setConnected,
  setPrecision,
} from "../features/orderBookSlice";
import { BookLevel } from "../../models";
import { OrderBookSocketEvent, Precision } from "../../utils";

const WS_URL = "wss://api-pub.bitfinex.com/ws/2";

const normalizeBook = (bookMap: Map<number, BookLevel>) => {
  const bids = Array.from(bookMap.values())
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.price - a.price);

  const asks = Array.from(bookMap.values())
    .filter((item) => item.amount < 0)
    .map((item) => ({ ...item, amount: Math.abs(item.amount) }))
    .sort((a, b) => a.price - b.price);

  let bidTotal = 0;
  let askTotal = 0;

  return {
    bids: bids.slice(0, 25).map((item) => {
      bidTotal += item.amount;
      return { ...item, total: bidTotal };
    }),
    asks: asks.slice(0, 25).map((item) => {
      askTotal += item.amount;
      return { ...item, total: askTotal };
    }),
  };
};

const createSocketChannel = (precision: Precision) => {
  return eventChannel((emit) => {
    const ws = new WebSocket(WS_URL);
    const book = new Map<number, BookLevel>();

    ws.onopen = () => {
      emit({ type: "connected" });

      ws.send(
        JSON.stringify({
          event: "subscribe",
          channel: "book",
          symbol: "tBTCUSD",
          prec: precision,
          freq: "F0",
          len: "25",
        })
      );
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (!Array.isArray(message)) return;
      if (message[1] === "hb") return;

      const payload = message[1];

      if (Array.isArray(payload[0])) {
        payload.forEach(([price, count, amount]: number[]) => {
          if (count > 0) {
            book.set(price, { price, count, amount, total: 0 });
          }
        });
      } else {
        const [price, count, amount] = payload;

        if (count === 0) {
          book.delete(price);
        } else {
          book.set(price, { price, count, amount, total: 0 });
        }
      }

      emit({
        type: "book",
        payload: normalizeBook(book),
      });
    };

    ws.onerror = () => {
      emit({ type: "disconnected" });
    };

    ws.onclose = () => {
      emit({ type: "disconnected" });
    };

    return () => ws.close();
  });
};

function* watchOrderBookSocket(): Generator<Effect, void, any> {
  while (true) {
    yield take(connectOrderBook.type);

    const precision: Precision = yield select(
      (state) => state.orderBook.precision
    );

    const channel: EventChannel<OrderBookSocketEvent> = yield call(
      createSocketChannel,
      precision
    );

    try {
      while (true) {
        const event: OrderBookSocketEvent = yield take(channel);

        if (event.type === "connected") {
          yield put(setConnected(true));
        }

        if (event.type === "disconnected") {
          yield put(setConnected(false));

          const netState: NetInfoState = yield call(NetInfo.fetch);

          if (netState.isConnected) {
            yield put(connectOrderBook());
          }

          break;
        }

        if (event.type === "book") {
          yield put(setBook(event.payload));
        }
      }
    } finally {
      channel.close();
    }
  }
}

export function* orderBookSaga() {
  yield takeLatest(setPrecision.type, function* () {
    yield put(connectOrderBook());
  });

  yield call(watchOrderBookSocket);
}
