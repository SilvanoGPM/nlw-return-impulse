import React from "react";
import { ArrowLeft } from "phosphor-react-native";

import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";

import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { FeedbackType } from "../Widget";
import { ScreenshotButton } from "../ScreenshotButton";

import { styles } from "./styles";
import { Button } from "../Button";

interface FormProps {
  feedbackType: FeedbackType;
}

export const feedbackTypesPlaceholders = {
  BUG: "Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...",
  IDEA: "Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!",
  OTHER: "Queremos te ouvir. O que você gostaria de nos dizer? ",
};

export function Form({ feedbackType }: FormProps) {
  const { title, image } = feedbackTypes[feedbackType];

  const placeholder = feedbackTypesPlaceholders[feedbackType];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image style={styles.image} source={image} />
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot=""
          onTakeScreenshot={() => {}}
          onRemoveScreenshot={() => {}}
        />

        <Button>
          <Text style={styles.buttonTitle}>Enviar Feedback</Text>
        </Button>
      </View>
    </View>
  );
}
