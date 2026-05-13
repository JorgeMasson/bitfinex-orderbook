import { useCallback } from "react";
import { SetBookPayload } from "../models";
import {
  connectOrderBook,
  disconnectOrderBook,
  setBook,
  setConnected,
  setPrecision,
  setViewMode,
} from "../redux/features";
import { Precision, ViewMode } from "../utils";
import { useAppDispatch, useAppSelector } from "./useRedux";

export const useOrderBookState = () => {
  const dispatch = useAppDispatch();
  const { asks, bids, connected, precision, spread, viewMode } = useAppSelector(
    (state) => state.orderBookSlice
  );

  return {
    asks,
    bids,
    connected,
    precision,
    spread,
    viewMode,
    connectOrderBook: useCallback(
      () => dispatch(connectOrderBook()),
      [dispatch]
    ),
    disconnectOrderBook: useCallback(
      () => dispatch(disconnectOrderBook()),
      [dispatch]
    ),
    setConnected: useCallback(
      (payload: boolean) => dispatch(setConnected(payload)),
      [dispatch]
    ),
    setPrecision: useCallback(
      (payload: Precision) => dispatch(setPrecision(payload)),
      [dispatch]
    ),
    setViewMode: useCallback(
      (payload: ViewMode) => dispatch(setViewMode(payload)),
      [dispatch]
    ),
    setBook: useCallback(
      (payload: SetBookPayload) => dispatch(setBook(payload)),
      [dispatch]
    ),
  };
};
