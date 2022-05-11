import React, { useState } from "react";
import { ArrowLeft } from "phosphor-react-native";
import { captureScreen } from "react-native-view-shot";
import * as FileStystem from "expo-file-system";

import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";

import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { FeedbackType } from "../Widget";
import { ScreenshotButton } from "../ScreenshotButton";

import { styles } from "./styles";
import { Button } from "../Button";
import { Copyright } from "../Copyright";
import { api } from "../../libs/api";

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export const feedbackTypesPlaceholders = {
  BUG: "Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...",
  IDEA: "Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!",
  OTHER: "Queremos te ouvir. O que você gostaria de nos dizer? ",
};

export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: FormProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const { title, image } = feedbackTypes[feedbackType];

  const placeholder = feedbackTypesPlaceholders[feedbackType];

  function handleScreenshot() {
    captureScreen({ format: "jpg", quality: 0.8 })
      .then((screenshot) => setScreenshot(screenshot))
      .catch((error) => console.log(error));
  }

  function handleResetScreenshot() {
    setScreenshot(null);
  }

  async function handleSendFeedback() {
    if (isSendingFeedback) {
      return;
    }

    try {
      setIsSendingFeedback(true);

      const screenshotBase64 =
        screenshot &&
        (await FileStystem.readAsStringAsync(screenshot, {
          encoding: "base64",
        }));

      await api.post("/feedbacks", {
        type: feedbackType,
        comment,
        screenshot: screenshot && `data:image/png;base64,${screenshotBase64}`,
      });

      setIsSendingFeedback(false);

      onFeedbackSent();
    } catch (error) {
      setIsSendingFeedback(false);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
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
        autoCorrect={false}
        value={comment}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onTakeScreenshot={handleScreenshot}
          onRemoveScreenshot={handleResetScreenshot}
        />

        <Button
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback}
          disabled={!comment || isSendingFeedback}
        >
          <Text style={styles.buttonTitle}>Enviar Feedback</Text>
        </Button>
      </View>

      <Copyright />
    </View>
  );
}
