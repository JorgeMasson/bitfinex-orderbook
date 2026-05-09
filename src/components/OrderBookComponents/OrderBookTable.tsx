import React, { memo, useCallback, useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { BookLevel } from "../../models";
import {
  ITEM_HEIGHT,
  MID_PRICE_HEIGHT,
  ORDER_BOOK_WIDTH,
  OrderBookTableProps,
  viewPort,
} from "../../utils";
import { OrderBookRow } from "./OrderBookRow";

type SpreadItem = {
  id: "spread";
  type: "spread";
};

type BookRowItem = {
  id: string;
  type: "ask" | "bid";
  item: BookLevel;
};

type ListItem = SpreadItem | BookRowItem;

export const OrderBookTable = memo<OrderBookTableProps>(
  ({ viewMode, asks, bids, spread, style }) => {
    const maxBidAmount = useMemo(
      () => Math.max(...bids.map((item) => item.amount), 1),
      [bids]
    );

    const maxAskAmount = useMemo(
      () => Math.max(...asks.map((item) => item.amount), 1),
      [asks]
    );

    const bestBid = bids[0]?.price;
    const bestAsk = asks[0]?.price;

    const midPrice = bestBid && bestAsk ? (bestBid + bestAsk) / 2 : null;

    const data = useMemo<ListItem[]>(() => {
      if (viewMode === "asks") {
        return asks.map((item) => ({
          id: `ask-${item.price}`,
          type: "ask",
          item,
        }));
      }

      if (viewMode === "bids") {
        return bids.map((item) => ({
          id: `bid-${item.price}`,
          type: "bid",
          item,
        }));
      }

      return [
        ...asks.map((item) => ({
          id: `ask-${item.price}`,
          type: "ask" as const,
          item,
        })),
        {
          id: "spread",
          type: "spread" as const,
        },
        ...bids.map((item) => ({
          id: `bid-${item.price}`,
          type: "bid" as const,
          item,
        })),
      ];
    }, [asks, bids, viewMode]);

    const keyExtractor = useCallback((item: ListItem) => item.id, []);

    const renderItem = useCallback(
      ({ item }: { item: ListItem }) => {
        if (item.type === "spread") {
          return (
            <View style={styles.midPriceContainer}>
              <Text style={styles.midPrice}>
                {midPrice?.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                }) ?? "--"}
              </Text>

              <Text style={styles.spreadText}>Spread {spread.toFixed(2)}</Text>
            </View>
          );
        }

        return (
          <OrderBookRow
            item={item.item}
            type={item.type}
            maxTotal={item.type === "bid" ? maxBidAmount : maxAskAmount}
          />
        );
      },
      [maxAskAmount, maxBidAmount, midPrice, spread]
    );

    const getItemLayout = (
      _: ArrayLike<ListItem> | null | undefined,
      index: number
    ) => {
      const spreadIndex = viewMode === "dual" ? asks.length : -1;

      if (spreadIndex === -1 || index < spreadIndex) {
        return {
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        };
      }

      if (index === spreadIndex) {
        return {
          length: MID_PRICE_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        };
      }

      return {
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * (index - 1) + MID_PRICE_HEIGHT,
        index,
      };
    };

    return (
      <View style={[styles.container, style]}>
        <View style={styles.bookHeader}>
          <View>
            <Text style={styles.headerTitle}>Price</Text>
            <Text style={styles.headerSubtitle}>BTC</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>Amount</Text>
            <Text style={styles.headerSubtitle}>USDt</Text>
          </View>
        </View>
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          showsVerticalScrollIndicator={false}
          initialNumToRender={24}
          maxToRenderPerBatch={12}
          updateCellsBatchingPeriod={50}
          windowSize={7}
          removeClippedSubviews
          keyboardShouldPersistTaps="handled"
          scrollEventThrottle={16}
          bounces={false}
          overScrollMode="never"
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookHeader: {
    width: viewPort(ORDER_BOOK_WIDTH),
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: viewPort(10),
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: viewPort(18),
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#7f8d9a",
    fontSize: viewPort(16),
    marginTop: viewPort(6),
  },
  midPriceContainer: {
    width: viewPort(ORDER_BOOK_WIDTH),
    height: viewPort(48),
    justifyContent: "center",
  },
  midPrice: {
    color: "#00c896",
    fontSize: viewPort(30),
    fontWeight: "800",
  },
  spreadText: {
    color: "#8fa1b2",
    fontSize: viewPort(12),
    fontWeight: "600",
    marginTop: viewPort(2),
  },
});
