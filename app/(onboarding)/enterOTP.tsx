import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, TextButton, iconColor } from "../../components/Elements";
import { useRouter } from "expo-router";
("react-native-gesture-handler");
import OTPInput from "../../components/Elements/OTPInput";

const EnterOTP = () => {
  const router = useRouter();
  const [otpInput, setOtpInput] = useState<string>("");
  return (
    <SafeAreaView className='p-4'>
      <Ionicons
        onPress={() => router.back()}
        name='chevron-back-outline'
        size={24}
        color={iconColor()}
      />
      <Text
        text='Enter the 6-digit code sent to you at 0807*****546.'
        styles='font-medium my-6'
        md
      />

      <OTPInput setOtpInput={setOtpInput} otpInput={otpInput} />
      <Button
        action={() => router.push("/(onboarding)/enterEmail")}
        label='Continue'
        bgColor='#3EA2FF'
        textColor='white'
      />
      <Text styles='my-4' color='#4B4B4B' text='I haven’t received any code' />
      <TextButton label='Resend' textColor='#3EA2FF' />
    </SafeAreaView>
  );
};

export default EnterOTP;
