import React, { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { OrderBookControlsProps, VIEW_MODES, viewPort } from "../../utils";

export const OrderBookControls = memo<OrderBookControlsProps>(
  ({ viewMode, precision, setViewMode, setPrecision, style }) => (
    <View style={[styles.container, style]}>
      <View style={styles.segment}>
        {VIEW_MODES.map((mode) => (
          <Pressable
            key={mode}
            onPress={() => setViewMode(mode)}
            style={[
              styles.segmentButton,
              viewMode === mode && styles.segmentButtonActive,
            ]}
          >
            <Text
              style={[
                styles.segmentText,
                viewMode === mode && styles.segmentTextActive,
              ]}
            >
              {mode.toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
);

const styles = StyleSheet.create({
  container: {
    marginTop: viewPort(18),
    marginBottom: viewPort(12),
  },
  segment: {
    flexDirection: "row",
    backgroundColor: "#102638",
    borderRadius: 10,
    padding: viewPort(4),
  },
  segmentButton: {
    flex: 1,
    paddingVertical: viewPort(9),
    borderRadius: 8,
    alignItems: "center",
  },
  segmentButtonActive: {
    backgroundColor: "#1c3b52",
  },
  segmentText: {
    color: "#8fa1b2",
    fontSize: viewPort(11),
    fontWeight: "600",
  },
  segmentTextActive: {
    color: "#ffffff",
  },
});
