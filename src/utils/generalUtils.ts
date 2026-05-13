import { Dimensions } from "react-native";

export const viewPort = (size: number): number => {
  const { width, height } = Dimensions.get("window");

  const base = Math.min(width, height);

  return base * (size / 412);
};
