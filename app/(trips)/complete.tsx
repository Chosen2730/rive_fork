import { View, Image } from "react-native";
import React from "react";
import { Button, Text } from "../../components/Elements";
import { router } from "expo-router";
import { useGlobalContext } from "../../AppContext/context";

const Complete = () => {
  const {
    theme: { dark },
  } = useGlobalContext();
  const completeImg = dark
    ? require("../../assets/images/home/complete-dark.png")
    : require("../../assets/images/home/complete.png");
  return (
    <View className='flex-1 items-center justify-center p-4'>
      <Image className='h-[368px]' resizeMode='contain' source={completeImg} />
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
