import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { OrderBookHeaderProps, viewPort } from "../../utils";

export const OrderBookHeader = memo<OrderBookHeaderProps>(
  ({ connected, style }) => (
    <View style={[styles.container, style]}>
      <View>
        <Text style={styles.title}>BTC/USD</Text>
        <Text style={styles.subtitle}>Bitcoin / US Dollar</Text>
      </View>
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusDot,
            connected ? styles.onlineDot : styles.offlineDot,
          ]}
        />
        <Text style={styles.statusText}>{connected ? "Live" : "Offline"}</Text>
      </View>
    </View>
  )
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: viewPort(22),
    fontWeight: "700",
  },
  subtitle: {
    color: "#8fa1b2",
    fontSize: viewPort(12),
    marginTop: viewPort(2),
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#102638",
    paddingHorizontal: viewPort(10),
    paddingVertical: viewPort(6),
    borderRadius: 999,
  },
  statusDot: {
    width: viewPort(8),
    height: viewPort(8),
    borderRadius: viewPort(4),
    marginRight: viewPort(6),
  },
  onlineDot: {
    backgroundColor: "#00c896",
  },
  offlineDot: {
    backgroundColor: "#ff5c5c",
  },
  statusText: {
    color: "#d9e5ee",
    fontSize: viewPort(12),
  },
});
