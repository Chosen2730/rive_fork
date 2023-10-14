import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useRouter } from "expo-router";
("react-native-gesture-handler");
import OTPTextView from "react-native-otp-textinput";
import * as Clipboard from "expo-clipboard";
import { useColorScheme } from "react-native";

type OTPType = {
  otpInput: string;
  setOtpInput: Dispatch<SetStateAction<string>>;
};

const OTPInput = ({ otpInput, setOtpInput }: OTPType) => {
  const router = useRouter();
  // const [otpInput, setOtpInput] = useState<string>("");

  const input = useRef<OTPTextView>(null);

  // const clear = () => input.current?.clear();

  // const updateOtpText = () => input.current?.setValue(otpInput);

  // const showTextAlert = () => otpInput && Alert.alert(otpInput);

  const handleCellTextChange = async (text: string, i: number) => {
    if (i === 0) {
      const clippedText = await Clipboard.getStringAsync();
      if (clippedText.slice(0, 1) === text) {
        input.current?.setValue(clippedText, true);
      }
    }
  };

  const mode = useColorScheme();

  return (
    <OTPTextView
      ref={input}
      containerStyle={{ marginBottom: 20 }}
      textInputStyle={{
        borderWidth: 1,
        flexGrow: 1,
        height: 50,
        borderBottomWidth: 1,
        backgroundColor: mode === "dark" ? "#61677A" : "#F5F5F5",
        borderRadius: 4,
      }}
      handleTextChange={setOtpInput}
      handleCellTextChange={handleCellTextChange}
      inputCount={6}
      keyboardType='numeric'
      tintColor={mode === "dark" ? "#0F0F0F" : "#3EA2FF"}
      offTintColor={mode === "dark" ? "#0F0F0F" : "#D0D0D0"}
    />
  );
};

export default OTPInput;
