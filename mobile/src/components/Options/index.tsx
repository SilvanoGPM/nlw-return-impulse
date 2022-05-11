import React from "react";
import { Text, View } from "react-native";

import { Copyright } from "../Copyright";
import { Option } from "../Option";

import { feedbackTypes } from "../../utils/feedbackTypes";
import { styles } from "./styles";
import { FeedbackType } from "../Widget";

interface OptionsProps {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void;
}

export function Options({ onFeedbackTypeChanged }: OptionsProps) {
  function handleOptionPress(key: FeedbackType) {
    return () => onFeedbackTypeChanged(key);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe seu feedback</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option key={key} {...value} onPress={handleOptionPress(key as FeedbackType)} />
        ))}
      </View>

      <Copyright />
    </View>
  );
}
