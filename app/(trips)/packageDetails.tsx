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

const PackageDetails = () => {
  const [selectedRideIndex, setSelectedRideIndex] = useState(0);
  const mode = useColorScheme();
  const transportOptions = [
    {
      vehicle: require("../../assets/images/home/Car.png"),
      name: "Ford escape 6GK2C14",
      price: "5000",
    },
    {
      vehicle: require("../../assets/images/home/Objects.png"),
      name: "Ford escape 6GK2C14",
      price: "5000",
    },
  ];
  const extraPad = Platform.OS !== "ios" ? paddingTop + 20 : paddingTop;

  const router = useRouter();
  return (
    <SafeAreaView style={{ paddingTop: extraPad, flex: 1 }}>
      <View
        style={{
          backgroundColor: mode === "dark" ? "black" : "transparent",
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
          renderItem={({ item: { vehicle }, index }) => (
            <TouchableOpacity
              onPress={() => setSelectedRideIndex(index)}
              className={`p-4 py-10 items-center h-[180px] ${
                selectedRideIndex === index && "border border-[#65B4FD]"
              } rounded-md`}
            >
              <Image
                className='w-[250px] h-full'
                resizeMode='contain'
                source={vehicle}
              />
            </TouchableOpacity>
          )}
        />
        <View className='mt-2'>
          <Container styles='p-6' border={1}>
            <Text text='₦5000' bold />
            <Text text='Transportation' styles='my-1' color='#7A7A7A' />
            <Text text='Ford escape 6GK2C14' color='#7A7A7A' />
          </Container>
          <ButtonContainer
            action={() => router.replace("/(trips)/paymentMethod")}
            bgColor='#D9E8F6'
            styles='flex-row justify-between border-2 border-gray-200 my-4'
          >
            <Text color='black' text='Choose Payment Method' />
            <AntDesign name='right' size={24} color='black' />
          </ButtonContainer>
          <Button
            action={() => router.replace("/(trips)/complete")}
            label='Complete'
            bgColor='#3EA2FF'
            textColor='white'
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PackageDetails;
