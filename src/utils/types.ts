import { StyleProp, ViewStyle } from "react-native";
import { BookLevel, OrderBookInitialState } from "../models";

export type StyleProps = {
  style?: StyleProp<ViewStyle>;
};

export type ViewMode = "dual" | "bids" | "asks";

export type Precision = "P0" | "P1" | "P2" | "P3";

export type OrderBookSocketEvent =
  | { type: "connected" }
  | { type: "disconnected" }
  | { type: "book"; payload: OrderBookInitialState };

export type OrderBookRowProps = StyleProps & {
  item: {
    price: number;
    amount: number;
    total: number;
  };
  type: "bid" | "ask";
  maxTotal: number;
};

export type OrderBookHeaderProps = StyleProps & {
  connected: boolean;
};

export type OrderBookControlsProps = StyleProps & {
  viewMode: ViewMode;
  precision: Precision;
  setViewMode: (payload: ViewMode) => void;
  setPrecision: (payload: Precision) => void;
};

export type OrderBookTableProps = StyleProps & {
  viewMode: ViewMode;
  asks: BookLevel[];
  bids: BookLevel[];
  spread: number;
};

export type OrderBookAggregationControlProps = StyleProps & {
  precision: Precision;
  setPrecision: (precision: Precision) => void;
};
