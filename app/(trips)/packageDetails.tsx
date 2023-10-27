import {
  Image,
  Platform,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import {
  Button,
  ButtonContainer,
  Container,
  Text,
  paddingTop,
} from "../../components/Elements";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../../AppContext/context";

const PackageDetails = () => {
  const [selectedRideIndex, setSelectedRideIndex] = useState(0);
  const { theme: dark, completeTrip } = useGlobalContext();
  const transportOptions = [
    {
      vehicle: require("../../assets/images/home/Car.png"),
      name: "Ford escape 6GK2C14",
      price: "5000",
      recommeded: true,
    },
    {
      vehicle: require("../../assets/images/home/Objects.png"),
      name: "Ford escape 6GK2C14",
      price: "2500",
    },
  ];
  const extraPad = Platform.OS !== "ios" ? paddingTop + 20 : paddingTop;

  const router = useRouter();
  return (
    <SafeAreaView style={{ paddingTop: extraPad, flex: 1 }}>
      <View
        style={{
          padding: 16,
          flex: 1,
        }}
      >
        <View className=''>
          <Text text='Package Details' bold styles='text-center' md />
          <View className='h-[1px] border-b-slate-300 border-b-2 my-6' />
        </View>
        <FlatList
          className=''
          data={transportOptions}
          renderItem={({ item: { vehicle, recommeded, price }, index }) => (
            <TouchableOpacity
              onPress={() => setSelectedRideIndex(index)}
              className={`p-4 py-10 items-center ${
                selectedRideIndex === index
                  ? "border-[#65B4FD]"
                  : "border-gray-300"
              }  border rounded-md mb-4`}
            >
              <Image
                className='w-[250px]'
                resizeMode='contain'
                source={vehicle}
              />
              <View className='p-6 flex-row w-full items-center'>
                <View className='flex-1'>
                  <Text text={`₦${price}`} bold />
                  <Text text='Economy' xs color='#7A7A7A' />
                </View>
                {recommeded && (
                  <View className='bg-[#D9E8F6]  px-6 py-3 rounded-full'>
                    <Text text='Recommended' color='black' styles='' />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />

        <Button
          action={() => {
            router.replace("/(trips)/pickupSummary");
          }}
          label='Confirm Ride'
          bgColor='#3EA2FF'
          textColor='white'
        />
      </View>
    </SafeAreaView>
  );
};

export default PackageDetails;
