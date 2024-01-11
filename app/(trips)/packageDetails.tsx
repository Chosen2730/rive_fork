import {
  ActivityIndicator,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Text, paddingTop } from "../../components/Elements";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";
import { useGlobalContext } from "../../AppContext/context";
import CurrencyFormatter from "../../components/Elements/currency";

const PackageDetails = () => {
  const [selectedRideIndex, setSelectedRideIndex] = useState(0);
  const { getRides, rides, isLoading, setChosenRide, getTripPrice } =
    useGlobalContext();

  const extraPad = Platform.OS !== "ios" ? paddingTop + 20 : paddingTop;

  const router = useRouter();

  useEffect(() => {
    getRides();
  }, []);

  useEffect(() => {
    setChosenRide(rides[selectedRideIndex]);
  }, [selectedRideIndex]);

  const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     setChosenRide(rides[0]);
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  // console.log(rides);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ paddingTop: extraPad, flex: 1 }}>
      <View
        style={{
          padding: 16,
          flex: 1,
        }}
      >
        <View className=''>
          <Text text='Ride Details' bold styles='text-center' md />
          <View className='h-[1px] border-b-slate-300 border-b-2 my-6' />
        </View>
        <FlatList
          className=''
          data={rides}
          renderItem={({
            item: { isRecommended, price, category, type },
            index,
          }) => (
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
                source={
                  type === "bike"
                    ? require("../../assets/images/home/Objects.png")
                    : require("../../assets/images/home/Car.png")
                }
              />
              <View className='p-6 flex-row w-full items-center'>
                <View className='flex-1'>
                  <CurrencyFormatter value={price} />
                  <Text
                    text={category}
                    styles='capitalize'
                    xs
                    color='#7A7A7A'
                  />
                </View>
                {isRecommended && (
                  <View className='bg-[#D9E8F6]  px-6 py-3 rounded-full'>
                    <Text text='Recommended' color='black' styles='' />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />

        <Button
          action={async () => {
            getTripPrice();
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
