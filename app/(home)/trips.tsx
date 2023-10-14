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

        <Image
          className='w-[24px] h-[24px ]'
          resizeMode='contain'
          source={require("../../assets/images/home/Button.png")}
        />
      </View>
      <View className='mb-4'>
        <Text text='Trips' lg bold />
        <Text
          color='#7A7A7A'
          styles='my-1'
          text='Looking for somewhere to go?'
          sm
        />
      </View>
      <View className='bg-primary p-8 rounded-md relative mt- overflow-hidden'>
        <Text color='white' text='Hello Emmanuel!' />
        <Text
          color='white'
          md
          bold
          text='Where would you like to go today?'
          styles='mt-2 w-[158px]'
        />
        <Image
          className='absolute right-0 bottom-0'
          resizeMode='cover'
          source={require("../../assets/images/home/Subtract.png")}
        />
      </View>

      <Container
        border={1}
        styles='flex-row items-center pl-4 justify-between rounded-md mt-4'
      >
        <Text color='#8A8A8A' text='Choose Location' />
        <Container border={1} styles='p-4 border-0'>
          <Image
            className=''
            source={require("../../assets/images/home/gps.png")}
          />
        </Container>
      </Container>

      <ScrollView className='flex-1 mt-5' showsVerticalScrollIndicator={false}>
        {trips?.length < 1 ? <NoRives /> : <TripList trips={trips} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Trips;
