import { View, Image } from "react-native";
import React from "react";
import { Button, Text } from "../../components/Elements";
import { router } from "expo-router";

const Complete = () => {
  return (
    <View className='flex-1 items-center justify-center p-4'>
      <Image source={require("../../assets/images/home/complete.png")} />
      <Text lg text='Payment Completed' styles='mt-4' />
      <Text sm text='Thank you for using rive' styles='my-2' />
      <Button
        action={() => router.replace("/(home)")}
        label='Go Home'
        styles='w-full'
        textColor='white'
        bgColor='#3EA2FF'
      />
    </View>
  );
};

export default Complete;
