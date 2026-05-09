import React, { memo } from "react";
import { DimensionValue, StyleSheet, Text, View } from "react-native";
import {
  AMOUNT_WIDTH,
  ORDER_BOOK_WIDTH,
  OrderBookRowProps,
  PRICE_WIDTH,
  viewPort,
} from "../../utils";

export const OrderBookRow = memo<OrderBookRowProps>(
  ({ item, type, maxTotal, style }) => {
    const depthWidth = `${Math.min(
      (item.amount / maxTotal) * 100,
      100
    )}%` as DimensionValue;

    return (
      <View style={[styles.container, style]}>
        <Text
          style={[
            styles.priceText,
            type === "bid" ? styles.bidText : styles.askText,
          ]}
        >
          {item.price.toLocaleString()}
        </Text>

        <View style={styles.amountContainer}>
          <View
            style={[
              styles.depthBar,
              type === "bid" ? styles.bidDepth : styles.askDepth,
              { width: depthWidth },
            ]}
          />

          <Text style={styles.amountText}>{item.amount.toFixed(4)}</Text>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: viewPort(ORDER_BOOK_WIDTH),
    height: viewPort(28),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    width: viewPort(PRICE_WIDTH),
    fontSize: viewPort(18),
    fontWeight: "700",
  },
  amountContainer: {
    width: viewPort(AMOUNT_WIDTH),
    height: viewPort(24),
    justifyContent: "center",
    alignItems: "flex-end",
    overflow: "hidden",
  },
  amountText: {
    color: "#dce7ef",
    fontSize: viewPort(18),
    zIndex: 1,
    paddingRight: viewPort(6),
  },
  depthBar: {
    position: "absolute",
    right: 0,
    height: "100%",
    borderRadius: viewPort(3),
  },
  bidDepth: {
    backgroundColor: "rgba(0, 200, 150, 0.35)",
  },
  askDepth: {
    backgroundColor: "rgba(255, 92, 92, 0.28)",
  },
  bidText: {
    color: "#00c896",
  },
  askText: {
    color: "#ff5c5c",
  },
});
