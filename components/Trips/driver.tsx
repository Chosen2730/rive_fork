import { Image, Linking, TouchableOpacity, View } from "react-native";
import React from "react";
import { Container, Text } from "../Elements";
import { CallIcon } from "../../assets/svg";
import { useGlobalContext } from "../../AppContext/context";

const Driver = () => {
  const { riveDetails } = useGlobalContext();
  return (
    <View className='flex-row items-center mx-4 my-2 rounded-md overflow-hidden border-[1px] border-[#BDCDD6] h-20'>
      <Container
        color='white'
        styles='flex-row justify-between items-center flex-1 w-full p-4'
      >
        <View className='flex-row items-center flex-1'>
          <Image
            className='w-[40px]'
            resizeMode='contain'
            source={require("../../assets/images/home/user.png")}
          />
          <View>
            <Text
              text={`${riveDetails?.assignedDriver?.firstName} ${riveDetails?.assignedDriver?.lastName}`}
              color='black'
              bold
            />
            <Text xs text='Toyota Camry' styles='mt-1' color='#7A7A7A' />
          </View>
        </View>
        <View className='flex-row'>
          <View>
            <Text color='#7A7A7A' styles='text-right' text='ETA: 5 Mins' />
            <Text color='#7A7A7A' styles='text-right' text='LVHJ321' />
          </View>
        </View>
      </Container>
      <View className='h-full w-16 flex-row bg-violet-300'>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(`tel:${riveDetails?.assignedDriver.tel}`)
          }
          className='bg-[#59FF3E] w-full items-center justify-center p-2'
        >
          <CallIcon color='black' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Driver;
