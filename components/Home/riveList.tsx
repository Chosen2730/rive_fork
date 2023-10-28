import { View } from "react-native";
import React from "react";
import { Container, Text, TextButton } from "../Elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RiveType } from "../../AppContext/context";
import dateFormat, { masks } from "dateformat";
import { router } from "expo-router";
import CurrencyFormatter from "../Elements/currency";

type RiveListType = {
  rives: RiveType[];
};

const RiveList = ({ rives }: RiveListType) => {
  return (
    <View>
      <View className='flex-row justify-between'>
        <Text color='#7A7A7A' md bold text='Your Rives' />
        <TextButton
          textColor='#3EA2FF'
          action={() => router.push("/(home)/history")}
          label='See all'
        />
      </View>
      <View className='mt-5'>
        {rives.map(
          ({ createdAt, price, _id, tripStatus: status, ride }, ind) => {
            const date = dateFormat(createdAt, "ddd, mmm dS, h:MMtt");
            return (
              <TouchableOpacity key={_id}>
                <Container styles='p-8 rounded-md mb-4'>
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
              </TouchableOpacity>
            );
          }
        )}
      </View>
    </View>
  );
};

export default RiveList;
