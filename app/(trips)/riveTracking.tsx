import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Container,
  Text,
  iconColor,
  paddingBottom,
  Button,
  ButtonContainer,
} from "../../components/Elements";

import { Image, Linking, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../AppContext/context";
import TrackMap from "../../components/Trips/track";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CallIcon, RiveIcon } from "../../assets/svg";

const RiveTracking = () => {
  const router = useRouter();
  const {
    pickupLocation,
    destinationLocation,
    tripDetails,
    theme: { dark },
  } = useGlobalContext();

  console.log({ tripDetails, pickupLocation, destinationLocation });

  return (
    <View className='flex-1'>
      <View className='flex-row items-center mt-12 p-4'>
        <Ionicons
          onPress={() => router.back()}
          name='chevron-back-outline'
          size={24}
          color={iconColor()}
        />
        <Text styles='my-1 text-center flex-1' text='Trip Tracking' sm />
      </View>
      <TrackMap />
      <View className='absolute bottom-5 w-full'>
        <Waiting />
        <Driver />
        <Riving />
        <Button
          action={() => router.push("/(trips)/paymentMethod")}
          label='Complete Trip'
          styles='m-4'
          bgColor='#3EA2FF'
          textColor='white'
        />
      </View>
    </View>
  );
};

export default RiveTracking;

export const Waiting = () => {
  return (
    <View className='flex-row items-center mx-4 my-2 rounded-md overflow-hidden border-[1px] border-[#BDCDD6]'>
      <Container
        color='#ECF1F6'
        styles='flex-row justify-between items-center flex-1 rounded-md p-4'
      >
        <View className='flex-row items-center'>
          <Image
            className='w-[40px] h-[40px]'
            resizeMode='contain'
            source={require("../../assets/images/home/user.png")}
          />
          <View>
            <Text text='Emmanuel John' color='black' bold />
            <Text
              xs
              text='Waiting for Driver...'
              styles='mt-1'
              color='#7A7A7A'
            />
          </View>
        </View>
      </Container>
    </View>
  );
};

export const Driver = () => {
  return (
    <View className='flex-row items-center mx-4 my-2 rounded-md overflow-hidden border-[1px] border-[#BDCDD6]'>
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
            <Text text='Nathaniel Effiong' color='black' bold />
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
      <TouchableOpacity
        onPress={() => Linking.openURL(`tel:${"08132157321"}`)}
        className='bg-[#59FF3E] flex-grow items-center justify-center p-2'
      >
        <CallIcon color='black' />
      </TouchableOpacity>
    </View>
  );
};

export const Riving = () => {
  return (
    <View className='flex-row items-center mx-4 my-2 rounded-md overflow-hidden border-[1px] border-[#BDCDD6]'>
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
            <Text text='Emmanuel John' color='black' bold />
            <Text xs text='Already riving' styles='mt-1' color='#7A7A7A' />
          </View>
        </View>
        <View className='flex-row'>
          <View>
            <Text styles='text-right' color='#7A7A7A' text='ETA: 5 Mins' />
            <Text color='#7A7A7A' text='Johnson Emmanuel' styles='text-right' />
          </View>
        </View>
      </Container>
      <TouchableOpacity className='bg-[#3EA2FF] flex-grow items-center justify-center p-2'>
        <RiveIcon color='black' />
      </TouchableOpacity>
    </View>
  );
};
