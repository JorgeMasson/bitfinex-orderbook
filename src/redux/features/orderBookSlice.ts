import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OrderBookInitialState, SetBookPayload } from "../../models";
import { Precision, ViewMode } from "../../utils";

const initialState: OrderBookInitialState = {
  bids: [],
  asks: [],
  precision: "P0",
  viewMode: "dual",
  connected: false,
  spread: 0,
};

const orderBookSlice = createSlice({
  name: "orderBookSlice",
  initialState,
  reducers: {
    connectOrderBook: (state) => state,
    disconnectOrderBook: (state) => state,
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
    setPrecision: (state, action: PayloadAction<Precision>) => {
      state.precision = action.payload;
      state.bids = [];
      state.asks = [];
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    setBook: (state, action: PayloadAction<SetBookPayload>) => {
      state.bids = action.payload.bids;
      state.asks = action.payload.asks;
      state.spread =
        action.payload.asks[0] && action.payload.bids[0]
          ? action.payload.asks[0].price - action.payload.bids[0].price
          : 0;
    },
  },
});

export const {
  connectOrderBook,
  disconnectOrderBook,
  setConnected,
  setPrecision,
  setViewMode,
  setBook,
} = orderBookSlice.actions;

export const orderBookReducer = orderBookSlice.reducer;
