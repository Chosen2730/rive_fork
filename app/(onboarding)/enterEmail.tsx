import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, TextField, iconColor } from "../../components/Elements";
import { useRouter } from "expo-router";
("react-native-gesture-handler");

const EnterEmail = () => {
  const router = useRouter();

  return (
    <SafeAreaView className='p-4'>
      <Ionicons
        onPress={() => router.back()}
        name='chevron-back-outline'
        size={24}
        color={iconColor()}
      />
      <Text text='What’s Your Email?' styles='font-medium my-6' md />
      <TextField
        border={1}
        type='email-address'
        styles='p-3 rounded-md mb-4'
        place='user@example.com'
      />

      <Button
        action={() => router.push("/(onboarding)/enterName")}
        label='Continue'
        bgColor='#3EA2FF'
        textColor='white'
      />
    </SafeAreaView>
  );
};

export default EnterEmail;
