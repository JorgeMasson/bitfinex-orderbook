import { BookLevel } from ".";

export interface SetBookPayload {
  bids: BookLevel[];
  asks: BookLevel[];
}
