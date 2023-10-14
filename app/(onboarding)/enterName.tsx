import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, TextField, iconColor } from "../../components/Elements";
import { useRouter } from "expo-router";
import { View } from "react-native";
("react-native-gesture-handler");

const EnterName = () => {
  const router = useRouter();

  return (
    <SafeAreaView className='p-4'>
      <Ionicons
        onPress={() => router.back()}
        name='chevron-back-outline'
        size={24}
        color={iconColor()}
      />
      <View className='my-6'>
        <Text text='What’s Your Name?' styles='font-medium' lg />
        <Text
          text={`Let's get to know you`}
          color='#7A7A7A'
          styles='font-medium mt-1'
          sm
        />
      </View>
      <View className='my-1'>
        <Text text='First Name' styles='mb-1' />
        <TextField
          border={1}
          type='name-phone-pad'
          styles='p-3 rounded-md mb-4'
          place='Enter Firstname'
        />
      </View>
      <View className='my-1'>
        <Text text='Last Name' styles='mb-1' />
        <TextField
          border={1}
          type='name-phone-pad'
          styles='p-3 rounded-md mb-4'
          place='Enter lastname'
        />
      </View>

      <Button
        action={() => router.push("/(onboarding)/paymentMethod")}
        label='Continue'
        bgColor='#3EA2FF'
        textColor='white'
      />
    </SafeAreaView>
  );
};

export default EnterName;
