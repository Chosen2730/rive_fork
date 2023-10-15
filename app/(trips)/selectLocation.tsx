import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import LocationSelector from "../../components/Trips/locationSelector";
import { useGlobalContext } from "../../AppContext/context";
import Map from "../../components/Trips/map";

const Trips = () => {
  const router = useRouter();
  const {
    setDestinationLocation,
    setPickupLocation,
    pickupLocation,
    destinationLocation,
  } = useGlobalContext();

  console.log(destinationLocation);

  return (
    <View style={{ paddingTop: 20 }} className='px-4 flex-1'>
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
        {pickupLocation ? (
          <Image source={require("../../assets/images/home/Tags.png")} />
        ) : (
          <Image source={require("../../assets/images/home/Tags1.png")} />
        )}

        <View className='border-b-[1px] border-b-gray-200 flex-1 p-2'>
          <Text color='#D0D0D0' styles='mb-1' text='Pickup Location' />
          <LocationSelector
            place='Enter Location'
            setLocationDetails={setPickupLocation}
          />
          <View className='flex-row items-center -mt-4'>
            <View className='flex-1 border-b-2 border-b-gray-200' />
            <View className='rounded-md p-2 bg-[#D9E8F6]'>
              <Image
                source={require("../../assets/images/home/arrow-swap.png")}
              />
            </View>
          </View>
          {pickupLocation && (
            <View>
              <Text color='#D0D0D0' styles='my-1' text='Destination' />
              <LocationSelector
                place='Enter Location'
                setLocationDetails={setDestinationLocation}
              />
            </View>
          )}
        </View>
      </Container>

      <Button
        isDisabled={destinationLocation === null && true}
        action={() => router.push("/(trips)/packageDetails")}
        label='Confirm'
        bgColor='#3EA2FF'
        textColor='white'
        styles='my-4'
      />
      {/* )} */}

      <View className='-mx-4 flex-1'>{pickupLocation && <Map />}</View>
    </View>
  );
};

export default Trips;
