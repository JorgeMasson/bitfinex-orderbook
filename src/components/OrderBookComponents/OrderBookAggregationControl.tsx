import React, { memo, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  LEVELS,
  OrderBookAggregationControlProps,
  viewPort,
} from "../../utils";

export const OrderBookAggregationControl =
  memo<OrderBookAggregationControlProps>(
    ({ precision, setPrecision, style }) => {
      const [visible, setVisible] = useState(false);

      const currentLabel =
        LEVELS.find((item) => item.value === precision)?.label ?? "1";

      return (
        <>
          <View style={[styles.container, style]}>
            <Pressable style={styles.button} onPress={() => setVisible(true)}>
              <Text style={styles.buttonText}>{currentLabel}</Text>
              <Text style={styles.chevron}>⌄</Text>
            </Pressable>
          </View>

          <Modal transparent visible={visible} animationType="slide">
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
              <View style={styles.backdrop}>
                <TouchableWithoutFeedback>
                  <View style={styles.sheet}>
                    <View style={styles.dragHandle} />

                    <View style={styles.sheetHeader}>
                      <Text style={styles.sheetTitle}>Aggregation level</Text>

                      <Pressable onPress={() => setVisible(false)}>
                        <Text style={styles.close}>×</Text>
                      </Pressable>
                    </View>

                    {LEVELS.map((item) => {
                      const active = item.value === precision;

                      return (
                        <Pressable
                          key={item.value}
                          style={[styles.option, active && styles.optionActive]}
                          onPress={() => {
                            setPrecision(item.value);
                            setVisible(false);
                          }}
                        >
                          <Text style={styles.optionText}>{item.label}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </>
      );
    }
  );

const styles = StyleSheet.create({
  container: {
    marginTop: viewPort(10),
    marginBottom: viewPort(18),
  },
  button: {
    width: viewPort(260),
    height: viewPort(52),
    backgroundColor: "#102638",
    borderRadius: viewPort(8),
    paddingHorizontal: viewPort(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: viewPort(18),
    fontWeight: "600",
  },
  chevron: {
    color: "#ffffff",
    fontSize: viewPort(22),
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.58)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#132c40",
    borderTopLeftRadius: viewPort(22),
    borderTopRightRadius: viewPort(22),
    paddingBottom: viewPort(28),
    overflow: "hidden",
  },
  dragHandle: {
    width: viewPort(54),
    height: viewPort(5),
    borderRadius: viewPort(999),
    backgroundColor: "#07131d",
    alignSelf: "center",
    marginTop: viewPort(10),
    marginBottom: viewPort(18),
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: viewPort(20),
    paddingBottom: viewPort(18),
  },
  sheetTitle: {
    color: "#ffffff",
    fontSize: viewPort(24),
    fontWeight: "800",
  },
  close: {
    color: "#ffffff",
    fontSize: viewPort(34),
  },
  option: {
    height: viewPort(70),
    justifyContent: "center",
    paddingHorizontal: viewPort(20),
    backgroundColor: "#132c40",
  },
  optionActive: {
    backgroundColor: "#2c4d66",
  },
  optionText: {
    color: "#ffffff",
    fontSize: viewPort(24),
  },
});
