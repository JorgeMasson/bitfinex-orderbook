import { Precision, ViewMode } from "../utils";

export interface BookLevel {
  price: number;
  count: number;
  amount: number;
  total: number;
}

export interface OrderBookInitialState {
  bids: BookLevel[];
  asks: BookLevel[];
  precision: Precision;
  viewMode: ViewMode;
  connected: boolean;
  spread: number;
}
