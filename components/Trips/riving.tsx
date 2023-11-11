import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { logResult, useGlobalContext } from "../../AppContext/context";
import { Container, Text } from "../Elements";
import { RiveIcon } from "../../assets/svg";

const Riving = () => {
  const { userDetails, riveDetails } = useGlobalContext();
  // console.log("first");
  return (
    <View className='flex-row items-center mx-4 my-2 rounded-md overflow-hidden border-[1px] border-[#BDCDD6] h-20'>
      <Container
        color='#ECF1F6'
        styles='flex-row justify-between items-center flex-1 p-4'
      >
        <View className='flex-row items-center'>
          <Image
            className='w-[40px] h-[40px]'
            resizeMode='contain'
            source={require("../../assets/images/home/user.png")}
          />
          <View>
            <Text
              text={`${userDetails?.firstName} ${userDetails?.lastName}`}
              styles='capitalize'
              color='black'
              bold
            />
            <Text xs text='Already riving' styles='mt-1' color='#7A7A7A' />
          </View>
        </View>
        <View className='flex-row'>
          <View>
            <Text
              styles='text-right'
              color='#7A7A7A'
              text={`ETA: ${riveDetails?.duration}`}
            />
            <Text
              color='#7A7A7A'
              text={`${riveDetails?.assignedDriver?.firstName} ${riveDetails?.assignedDriver?.lastName}`}
              styles='text-right'
            />
          </View>
        </View>
      </Container>
      <TouchableOpacity className='bg-[#3EA2FF] h-full items-center justify-center p-2'>
        <RiveIcon color='black' />
      </TouchableOpacity>
    </View>
  );
};

export default Riving;
