import { OrderBookInitialState } from "../models";

export type ViewMode = "dual" | "bids" | "asks";

export type Precision = "P0" | "P1" | "P2" | "P3";

export type OrderBookSocketEvent =
  | { type: "connected" }
  | { type: "disconnected" }
  | { type: "book"; payload: OrderBookInitialState };
