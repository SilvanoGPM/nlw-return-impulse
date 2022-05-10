import { StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

import { theme } from "../../theme";

export const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    position: "absolute",
    bottom: getBottomSpace() + 16,
    right: 16,
    backgroundColor: theme.colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },

  modal: {
    backgroundColor: theme.colors.surface_primary,
    paddingBottom: getBottomSpace() + 16,
  },

  indicator: {
    backgroundColor: theme.colors.text_primary,
    width: 56,
    padding: 0,
  },
});
