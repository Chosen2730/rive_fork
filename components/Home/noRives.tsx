import { View, Image } from "react-native";
import React from "react";
import { Button, Text } from "../Elements";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../../AppContext/context";

const NoRives = () => {
  const router = useRouter();
  const {
    theme: { dark },
  } = useGlobalContext();
  const noRiveImg = dark
    ? require("../../assets/images/home/cuate-dark.png")
    : require("../../assets/images/home/cuate.png");
  return (
    <View>
      <Image
        className='h-[386px] w-full mx-auto'
        resizeMode='contain'
        source={noRiveImg}
      />
      <Text text='Awaiting your adventure' lg bold styles='text-center my-2' />
      <Text
        text='At this moment, there are no active trips in progress. Our top-notch transport rivers are standing by'
        color='#7A7A7A'
      />
      <Button
        action={() => router.push("/(trips)/newTrip")}
        styles='my-4'
        textColor='white'
        label='Start Riving'
        bgColor='#3EA2FF'
      />
    </View>
  );
};

export default NoRives;
