import { ActivityIndicator, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { RiveType } from "./index";
import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  Container,
  Text,
  iconColor,
  paddingBottom,
  paddingTop,
} from "../../components/Elements";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { useGlobalContext } from "../../AppContext/context";
import dateFormat from "dateformat";
import CurrencyFormatter from "../../components/Elements/currency";
import NoRives from "../../components/Home/noRives";
const History = () => {
  const { rives, isLoading, getRiveDetails } = useGlobalContext();
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

      {isLoading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : rives.length < 1 ? (
        <NoRives />
      ) : (
        <FlatList
          data={rives}
          className='flex-1'
          renderItem={({ item }) => {
            const {
              createdAt,
              price,
              _id,
              tripStatus: status,
              ride,
              origin,
              destination,
            } = item;
            const date = dateFormat(createdAt, "ddd, mmm dS, h:MMtt");
            return (
              <View>
                <Container styles='p-8 rounded-md mb-3'>
                  <View className='flex-row items-center justify-between'>
                    <CurrencyFormatter value={price} />
                    <View className='flex-row items-center'>
                      <View
                        className={`w-2 h-2 rounded-full ${
                          status === "cancelled"
                            ? "bg-red-600"
                            : status === "completed"
                            ? "bg-green-500"
                            : status === "ongoing"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }  mr-2`}
                      />
                      <Text styles='capitalize' text={status} />
                    </View>
                  </View>
                  <Text color='#7A7A7A' styles='my-2' text={date} />
                  <Text
                    color='#7A7A7A'
                    styles='capitalize'
                    text={ride.category}
                  />
                </Container>
                {status === "ongoing" && (
                  <>
                    <Container styles='p-8 rounded-md flex-row'>
                      <View className='w-1/2 mr-2'>
                        <Text color='#D0D0D0' xs text='From' />
                        <View className='mt-1'>
                          <Text
                            color='#8A8A8A'
                            styles='capitalize'
                            text={origin.desc}
                          />
                        </View>
                      </View>
                      <View className='w-1/2 ml-2'>
                        <Text color='#D0D0D0' xs text='To' />
                        <View className='mt-1'>
                          <Text
                            color='#8A8A8A'
                            styles='capitalize'
                            text={destination.desc}
                          />
                        </View>
                      </View>
                    </Container>
                    <Button
                      loadingState={isLoading}
                      action={() => getRiveDetails(_id)}
                      styles='mb-4'
                      textColor='#fff'
                      label='View More Details'
                      bgColor='#3EA2FF'
                    />
                  </>
                )}
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default History;
