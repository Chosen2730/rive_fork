import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Container,
  Text,
  iconColor,
  Button,
  TextField,
} from "../../components/Elements";

import { Image, View } from "react-native";
import LocationSelector from "../../components/Trips/locationSelector";
import { logResult, useGlobalContext } from "../../AppContext/context";
import Map from "../../components/Trips/map";
import CurrentMap from "../../components/Trips/currentLocationMap";

const Trips = () => {
  const router = useRouter();
  const {
    setPickupLocation,
    useLocation,
    destinationLocation,
    pickupLocation,
    location,
    theme: { dark },
    getDistance,
  } = useGlobalContext();

  // logResult({ location, useLocation });

  return (
    <View style={{ paddingTop: 20 }} className='px-4 flex-1'>
      <View className='flex-row items-center justify-between mt-10 mb-5'>
        <Ionicons
          onPress={() => router.back()}
          name='chevron-back-outline'
          size={24}
          color={iconColor()}
        />
        <Text text='Select Location' md />
        <Image
          className='w-[24px] h-[24px]'
          resizeMode='contain'
          source={require("../../assets/images/home/Button.png")}
        />
      </View>

      <Container border={1} styles='flex-row items-center rounded-md p-4'>
        <Image source={require("../../assets/images/home/Tags1.png")} />
        {useLocation ? (
          <View className='border-b-[1px] border-b-gray-200 flex-1 p-2'>
            <Text color='#D0D0D0' styles='mb-1' text='Pick Up Location' />
            <Text color='#D0D0D0' styles='mb-1' text={location?.desc} />
          </View>
        ) : (
          <View className='border-b-[1px] border-b-gray-200 flex-1 p-2'>
            <Text color='#D0D0D0' styles='mb-1' text='Pick Up Location' />
            <LocationSelector
              place='Enter Location Here'
              setLocationDetails={setPickupLocation}
            />
          </View>
        )}
      </Container>

      <Button
        isDisabled={pickupLocation === null && true}
        // action={() => {
        //   getDistance();
        //   router.push("/(trips)/packageDetails");
        // }}
        action={() => router.push("/(trips)/newTrip")}
        label='Confirm'
        bgColor='#3EA2FF'
        textColor='white'
        styles='my-4'
      />

      <View className='-mx-4 flex-1'>
        {pickupLocation && <CurrentMap location={pickupLocation} />}
      </View>
    </View>
  );
};

export default Trips;
