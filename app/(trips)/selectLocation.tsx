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
import { useGlobalContext } from "../../AppContext/context";
import Map from "../../components/Trips/map";

const Trips = () => {
  const router = useRouter();
  const {
    setPickupLocation,
    useLocation,
    destinationLocation,
    pickupLocation,
    location,
    theme: { dark },
  } = useGlobalContext();

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
        <Image source={require("../../assets/images/home/Tags.png")} />

        <View className='border-b-[1px] border-b-gray-200 flex-1 p-2'>
          <Text color='#D0D0D0' styles='mb-1' text='Pickup Destination' />
          <TextField
            editable={false}
            styles='py-2 font-medium'
            val={destinationLocation?.desc}
          />
          {/* 192836 */}
          <View className='flex-row items-center -mt-4'>
            <View
              style={{
                borderColor: dark ? "#192836" : "#D0D0D0",
              }}
              className='flex-1 border-b-[1px]'
            />
            <View className='rounded-md p-2 bg-[#D9E8F6]'>
              <Image
                source={require("../../assets/images/home/arrow-swap.png")}
              />
            </View>
          </View>
          {!useLocation && destinationLocation && (
            <View>
              <Text color='#D0D0D0' styles='my-1' text='Pick Up Location' />
              <LocationSelector
                place={"Enter Location"}
                setLocationDetails={setPickupLocation}
              />
            </View>
          )}
          {useLocation && (
            <>
              <Text color='#D0D0D0' styles='my-1' text='Pick Up Location' />
              <TextField
                editable={false}
                styles='py-2 font-medium'
                val={location?.desc}
              />
            </>
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

      <View className='-mx-4 flex-1'>{destinationLocation && <Map />}</View>
    </View>
  );
};

export default Trips;
