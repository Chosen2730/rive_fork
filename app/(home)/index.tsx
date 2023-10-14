import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Button,
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
import RiveList from "../../components/Home/riveList";

export type RiveType = {
  amount: number;
  date: string;
  description: string;
  status: string;
};

type NavType = {
  img: any;
  link: any;
  title: string;
};

const Welcome = () => {
  const router = useRouter();
  // router.push("/trips/");
  const topNav: NavType[] = [
    {
      img: require("../../assets/images/home/smart-car.png"),
      link: "/trips/trips",
      title: "Quick Rive",
    },
    {
      img: require("../../assets/images/home/truck-fast.png"),
      link: "",
      title: "Delivery Rive",
    },
    {
      img: require("../../assets/images/home/award.png"),
      link: "",
      title: "Recieve Rive",
    },
    {
      img: require("../../assets/images/home/award.png"),
      link: "",
      title: "Rewards",
    },
  ];

  const currentRives: RiveType[] = [
    {
      amount: 4900,
      date: "Today 12:30PM",
      description: "Ford escape 6GK2C14",
      status: "cancelled",
    },
    {
      amount: 5500,
      date: "Today 12:30PM",
      description: "Ford escape 6GK2C14",
      status: "pending",
    },
    {
      amount: 7000,
      date: "Today 12:30PM",
      description: "Ford escape 6GK2C14",
      status: "in progress",
    },
    {
      amount: 2400,
      date: "Today 12:30PM",
      description: "Ford escape 6GK2C14",
      status: "completed",
    },
  ];

  const [rives, setRives] = useState<RiveType[]>(currentRives);

  return (
    <SafeAreaView style={{ paddingTop, paddingBottom }} className='px-4 flex-1'>
      <View className='flex-row items-center justify-between'>
        <Ionicons
          onPress={() => router.back()}
          name='chevron-back-outline'
          size={24}
          color={iconColor()}
        />
        <Text text='Home' sm bold />
        <Image
          className='w-[24px] h-[24px ]'
          resizeMode='contain'
          source={require("../../assets/images/home/Button.png")}
        />
      </View>
      <View className='bg-primary p-8 rounded-md relative mt- overflow-hidden'>
        <Text color='white' text='Hello Emmanuel!' />
        <Text
          color='white'
          md
          bold
          text='Want to get a rive today?'
          styles='mt-2 w-[158px]'
        />
        <Image
          className='absolute right-0 bottom-0'
          resizeMode='cover'
          source={require("../../assets/images/home/Subtract.png")}
        />
      </View>
      <View className='flex-row justify-between mt-4'>
        {topNav.map(({ img, link, title }, ind) => (
          <TouchableOpacity onPress={() => router.push(link)} key={ind}>
            <Container border={1} styles='p-7 rounded-md'>
              <Image
                className='w-[24px] h-[24px] mx-auto'
                resizeMode='contain'
                source={img}
              />
            </Container>
            <Text text={title} color='#7A7A7A' styles='text-center mt-2' />
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView className='flex-1 mt-5' showsVerticalScrollIndicator={false}>
        {rives?.length < 1 ? <NoRives /> : <RiveList rives={rives} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
