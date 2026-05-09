import { viewPort } from "./generalUtils";
import { Precision } from "./types";

export const VIEW_MODES = ["dual", "bids", "asks"] as const;

export const ORDER_BOOK_WIDTH = 330;

export const PRICE_WIDTH = 130;

export const AMOUNT_WIDTH = 150;

export const LEVELS: { label: string; value: Precision }[] = [
  { label: "1", value: "P0" },
  { label: "10", value: "P1" },
  { label: "100", value: "P2" },
  { label: "1000", value: "P3" },
];

export const ITEM_HEIGHT = viewPort(28);

export const MID_PRICE_HEIGHT = viewPort(70);

export const UPDATE_INTERVAL = 100;
