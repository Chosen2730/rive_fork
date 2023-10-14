import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Container,
  Text,
  iconColor,
  paddingTop,
  paddingBottom,
  TextButton,
  Button,
} from "../../components/Elements";

import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Terms = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ paddingBottom }} className='p-4 flex-1'>
      <View className='flex-row items-center justify-between'>
        <Ionicons
          onPress={() => router.back()}
          name='chevron-back-outline'
          size={24}
          color={iconColor()}
        />
      </View>
      <View className='mb-4'>
        <Text styles='mt-5' text='Terms of Use' lg bold />
        <Text
          color='#7A7A7A'
          styles='my-1'
          text='Do you Agree to terms of use'
          sm
        />
      </View>
      <Text
        styles='my-5'
        color='#7A7A7A'
        text='By selecting "Continue" below, you confirm that you have reviewed and accepted the terms of use and acknowledge the privacy notice. Additionally, you certify that you are at least 18 years old.'
      />
      {/* <Button label='Delete Account' textColor='#FF3E3E' bgColor='#F6D9D9' /> */}
    </SafeAreaView>
  );
};

export default Terms;
