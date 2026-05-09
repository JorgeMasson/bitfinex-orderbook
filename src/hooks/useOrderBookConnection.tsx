import { useEffect } from "react";
import { useOrderBookState } from "./useOrderBookState";

export const useOrderBookConnection = () => {
  const { connectOrderBook, disconnectOrderBook } = useOrderBookState();

  useEffect(() => {
    connectOrderBook();

    return () => {
      disconnectOrderBook();
    };
  }, [connectOrderBook, disconnectOrderBook]);
};
