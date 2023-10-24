import { View } from "react-native";
import React, { useState } from "react";
import { RiveType } from "./index";
import { Ionicons } from "@expo/vector-icons";
import {
  Container,
  Text,
  iconColor,
  paddingBottom,
  paddingTop,
} from "../../components/Elements";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
const History = () => {
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
    <SafeAreaView className='p-4 flex-1' style={{ paddingTop, paddingBottom }}>
      <View className='flex-row items-center justify-between mt-10 mb-5'>
        <Ionicons
          onPress={() => router.back()}
          name='chevron-back-outline'
          size={24}
          color={iconColor()}
        />
      </View>
      <Text text='Rive History' lg bold />
      <Text
        styles='mt-1 mb-4'
        color='#7A7A7A'
        text={`Checkout Where you've been`}
      />
      <FlatList
        data={rives}
        className='flex-1'
        renderItem={({ item, index }) => {
          const { amount, date, description, status } = item;
          return (
            <TouchableOpacity>
              <Container styles='p-8 rounded-md mb-4'>
                <View className='flex-row items-center justify-between'>
                  <Text text={`₦ ${amount}`} />
                  <View className='flex-row items-center'>
                    <View
                      className={`w-2 h-2 rounded-full ${
                        status === "cancelled"
                          ? "bg-red-600"
                          : status === "completed"
                          ? "bg-green-500"
                          : status === "in progress"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }  mr-2`}
                    />
                    <Text styles='capitalize' text={status} />
                  </View>
                </View>
                <Text color='#7A7A7A' styles='my-2' text={date} />
                <Text color='#7A7A7A' text={description} />
              </Container>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default History;
