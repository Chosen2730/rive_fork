import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Container, Text, iconColor, Button } from "../../components/Elements";

import { Image, View } from "react-native";
import LocationSelector from "../../components/Trips/locationSelector";
import { useGlobalContext } from "../../AppContext/context";
import CurrentMap from "../../components/Trips/currentLocationMap";

const Trips = () => {
  const router = useRouter();
  const { setDestinationLocation, destinationLocation } = useGlobalContext();

  return (
    <View style={{ paddingTop: 20 }} className='px-4 flex-1'>
      <View className='flex-row items-center justify-between'>
        <Ionicons
          onPress={() => router.back()}
          name='chevron-back-outline'
          size={24}
          color={iconColor()}
        />
        <Text text='Select Destination' md />
        <Image
          className='w-[24px] h-[24px ]'
          resizeMode='contain'
          source={require("../../assets/images/home/Button.png")}
        />
      </View>

      <Container border={1} styles='flex-row items-center rounded-md p-4'>
        <Image source={require("../../assets/images/home/Tags1.png")} />

        <View className='border-b-[1px] border-b-gray-200 flex-1 p-2'>
          <Text color='#D0D0D0' styles='mb-1' text='Destination' />
          <LocationSelector
            place='Enter Destination Here'
            setLocationDetails={setDestinationLocation}
          />
        </View>
      </Container>

      <Button
        isDisabled={destinationLocation === null && true}
        action={() => router.push("/(trips)/newTrip2")}
        label='Continue'
        bgColor='#3EA2FF'
        textColor='white'
        styles='my-4'
      />
      {/* )} */}

      <View className='-mx-4 flex-1'>
        {destinationLocation && <CurrentMap location={destinationLocation} />}
      </View>
    </View>
  );
};

export default Trips;
