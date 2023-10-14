import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Container,
  Text,
  iconColor,
  paddingTop,
  paddingBottom,
  TextField,
  Button,
} from "../../components/Elements";

import { Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import NoRives from "../../components/Home/noRives";
import TripList from "../../components/Trips/triplist";
import { TripType } from "../../types";
import { currentTrips } from "../trips/pastTrips";

const Trips = () => {
  const router = useRouter();

  const [trips, setTrips] = useState<TripType[]>(currentTrips);

  return (
    <SafeAreaView style={{ paddingTop, paddingBottom }} className='px-4 flex-1'>
      <View className='flex-row items-center justify-between'>
        <Ionicons
          onPress={() => router.back()}
          name='chevron-back-outline'
          size={24}
          color={iconColor()}
        />
        <Text text='Select Location' md />
        <Image
          className='w-[24px] h-[24px ]'
          resizeMode='contain'
          source={require("../../assets/images/home/Button.png")}
        />
      </View>

      <Container border={1} styles='flex-row items-center rounded-md mt-4 p-4'>
        <Image source={require("../../assets/images/home/Tags.png")} />
        <View className='border-b-[1px] border-b-gray-200 flex-1 p-2'>
          <Text color='#D0D0D0' styles='mb-1' text='Pickup Location' />
          <TextField place='Enter Pickup Location Here' />
          <View className='flex-row items-center'>
            <View className='flex-1 border-b-2 border-b-gray-200' />
            <View className='rounded-md p-2 bg-[#D9E8F6]'>
              <Image
                source={require("../../assets/images/home/arrow-swap.png")}
              />
            </View>
          </View>
          <Text color='#D0D0D0' styles='my-1' text='Destination' />
          <TextField place='Enter Destination Here' />
        </View>
      </Container>
      <Button
        action={() => router.push("/trips/packageDetails")}
        label='Proceed'
        bgColor='#3EA2FF'
        textColor='white'
        styles='my-4'
      />
      <View className='mx-4'>
        <Image
          className='w-full h-full'
          source={require("../../assets/images/home/Map.png")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Trips;
