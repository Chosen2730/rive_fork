import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Text,
  TextButton,
  iconColor,
  showAlert,
} from "../../components/Elements";
import { useRouter } from "expo-router";
("react-native-gesture-handler");
import OTPInput from "../../components/Elements/OTPInput";
import { useGlobalContext } from "../../AppContext/context";
import { baseURL } from "../../api";
import axios from "axios";
import { View } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import Countdown from "../../components/Elements/countdown";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EnterOTP = () => {
  const router = useRouter();
  const { userInput, getUserDetails } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const input = useRef<OTPTextView>(null);
  const [isResendShown, setIsResendShown] = useState(false);

  const verifyOTP = async () => {
    const url = `${baseURL}/auth/verify-otp`;
    if (!otp) {
      showAlert({
        message: "Please enter your OTP",
        title: "Ooops",
        type: "error",
      });

      return;
    }
    setIsLoading(true);

    const payload = { otp, email: userInput?.email?.toLocaleLowerCase() };
    console.log(payload);

    try {
      const res = await axios.post(url, payload);
      console.log(res.data.msg);
      showAlert({
        message: res.data.msg,
        title: "Verification Successful",
        type: "success",
      });

      const token = res.data.token;
      const profileCompleted = res.data.profileCompleted;
      await AsyncStorage.setItem("token", token);
      if (profileCompleted === true) {
        await getUserDetails();
        router.push("/(home)");
      } else {
        router.push("/(onboarding)/enterName");
      }
    } catch (error: any) {
      showAlert({
        message: `${error?.response?.data.msg || "An error occurred"}`,
        title: "Oops!",
        type: "error",
      });
    } finally {
      setIsLoading(false);
      input.current?.clear();
    }
  };
  const resendOTP = async () => {
    const url = `${baseURL}/auth/resend-otp`;

    setIsLoading(true);
    const payload = { email: userInput?.email?.toLocaleLowerCase() };
    try {
      const res = await axios.post(url, payload);
      showAlert({
        message: res.data.msg,
        title: "Successful",
        type: "success",
      });
      setIsResendShown(false);
    } catch (error: any) {
      showAlert({
        message: `${error?.response?.data.msg || "An error occurred"}`,
        title: "Oops!",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

      <OTPInput input={input} setOtpInput={setOtp} otpInput={otp} />
      <Button
        action={verifyOTP}
        loadingState={isLoading}
        label='Continue'
        bgColor='#3EA2FF'
        textColor='white'
      />
      <View className='my-4'>
        {isResendShown ? (
          <View className='flex-row items-center'>
            <Text
              styles='mr-1'
              color='#4B4B4B'
              text='I haven’t received any code,'
            />
            <TextButton action={resendOTP} label='Resend' textColor='#3EA2FF' />
          </View>
        ) : (
          <Countdown setIsResendShown={setIsResendShown} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default EnterOTP;
