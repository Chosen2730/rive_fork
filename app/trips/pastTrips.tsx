import { Modal, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { TripType } from "../../types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Container, Text, iconColor } from "../../components/Elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import TripDetails from "./tripDetails";

export const currentTrips: TripType[] = [
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

const PastTrips = () => {
  const [trips, setTrips] = useState<TripType[]>(currentTrips);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  return (
    <SafeAreaView className='p-4'>
      <Ionicons
        onPress={() => router.back()}
        name='chevron-back-outline'
        size={24}
        color={iconColor()}
      />
      <View className='my-4'>
        <Text text='Past Trips' lg bold />
        <Text
          color='#7A7A7A'
          styles='my-1'
          text={`Checkout where you've been`}
          sm
        />
      </View>
      <FlatList
        data={trips}
        renderItem={({ index, item }) => (
          <TouchableOpacity onPress={() => router.push("/trips/tripDetails")}>
            <Container styles='p-8 rounded-md mb-4'>
              <View className='flex-row items-center justify-between'>
                <Text text={`₦ ${item.amount}`} />
                <View className='flex-row items-center'>
                  <View
                    className={`w-2 h-2 rounded-full ${
                      item.status === "cancelled"
                        ? "bg-red-600"
                        : item.status === "completed"
                        ? "bg-green-500"
                        : item.status === "in progress"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }  mr-2`}
                  />
                  <Text styles='capitalize' text={item.status} />
                </View>
              </View>
              <Text color='#7A7A7A' styles='my-2' text={item.date} />
              <Text color='#7A7A7A' text={item.description} />
            </Container>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default PastTrips;
