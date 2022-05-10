import React, { useRef } from "react";
import { TouchableOpacity } from "react-native";
import { ChatTeardropDots } from "phosphor-react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { Options } from '../Options';
import { theme } from "../../theme";

import { styles } from "./styles";

function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpenBottomSheet() {
    bottomSheetRef.current?.expand();
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpenBottomSheet}>
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight="bold"
        />
      </TouchableOpacity>

      <BottomSheet
        snapPoints={[1, 280]}
        ref={bottomSheetRef}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        <Options />
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
