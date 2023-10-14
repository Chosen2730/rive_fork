import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Container,
  Text,
  iconColor,
  paddingTop,
  paddingBottom,
} from "../../components/Elements";

import { Image, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import NoRives from "../../components/Home/noRives";
import TripList from "../../components/Trips/triplist";
import { TripType } from "../../types";
import { currentTrips } from "../(trips)/pastTrips";
import DeliveryList from "../../components/delivery/deliveryList";

const Delivery = () => {
  const router = useRouter();

  const [delivery, setDelivery] = useState<TripType[]>(currentTrips);

  return (
    <SafeAreaView style={{ paddingTop, paddingBottom }} className='px-4 flex-1'>
      <View className='flex-row items-center justify-between'>
        <Ionicons
          onPress={() => router.back()}
          name='chevron-back-outline'
          size={24}
          color={iconColor()}
        />

        <Image
          className='w-[24px] h-[24px ]'
          resizeMode='contain'
          source={require("../../assets/images/home/Button.png")}
        />
      </View>
      <View className='mb-4'>
        <Text text='Delivery' lg bold />
        <Text
          color='#7A7A7A'
          styles='my-1'
          text='Want to recieve or send something?'
          sm
        />
      </View>

      <View className='flex-row justify-between'>
        <TouchableOpacity
          className='w-1/2'
          onPress={() => router.push("/(delivery)/pickup")}
        >
          <Container
            styles='p-7 rounded-md h-[162px] items-center justify-center mr-3'
            color='#D9E8F6'
          >
            <Image
              className='mx-auto'
              resizeMode='contain'
              source={require("../../assets/images/home/del.png")}
            />
          </Container>
          <Text text='Send Rive' color='#7A7A7A' styles='text-center mt-2' />
        </TouchableOpacity>
        <TouchableOpacity
          className='w-1/2'
          onPress={() => router.push("/(delivery)/pickup")}
        >
          <Container
            styles='p-7 rounded-md h-[162px] items-center justify-center ml-3'
            color='#D9E8F6'
          >
            <Image
              className=' mx-auto'
              resizeMode='contain'
              source={require("../../assets/images/home/recieve.png")}
            />
          </Container>
          <Text text='Recieve Rive' color='#7A7A7A' styles='text-center mt-2' />
        </TouchableOpacity>
      </View>

      <ScrollView className='flex-1 mt-5' showsVerticalScrollIndicator={false}>
        {delivery?.length > 1 && <DeliveryList delivery={delivery} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Delivery;
