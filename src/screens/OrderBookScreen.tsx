import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOrderBookConnection, useOrderBookState } from "../hooks";
import { viewPort } from "../utils";
import {
  OrderBookAggregationControl,
  OrderBookControls,
  OrderBookHeader,
  OrderBookTable,
} from "../components/OrderBookComponents";

export const OrderBookScreen = () => {
  useOrderBookConnection();

  const {
    bids,
    asks,
    spread,
    connected,
    precision,
    viewMode,
    setPrecision,
    setViewMode,
  } = useOrderBookState();

  return (
    <SafeAreaView style={styles.safeArea}>
      <OrderBookHeader connected={connected} />
      <OrderBookControls
        viewMode={viewMode}
        precision={precision}
        setViewMode={setViewMode}
        setPrecision={setPrecision}
      />
      <OrderBookTable
        viewMode={viewMode}
        asks={asks}
        bids={bids}
        spread={spread}
      />
      <OrderBookAggregationControl
        precision={precision}
        setPrecision={setPrecision}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0b1720",
    paddingHorizontal: viewPort(16),
    paddingTop: viewPort(14),
  },
});
