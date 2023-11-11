import React from "react";
import { View } from "react-native";
import { Container, Text, TextButton } from "../Elements";
import { RiveType, useGlobalContext } from "../../AppContext/context";
import dateFormat from "dateformat";
import { router } from "expo-router";
import CurrencyFormatter from "../Elements/currency";

type RiveListType = {
  rives: RiveType[];
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "cancelled":
      return "bg-red-600";
    case "completed":
      return "bg-green-500";
    case "ongoing":
      return "bg-yellow-500";
    default:
      return "bg-primary";
  }
};

const RiveList = ({ rives }: RiveListType) => {
  const { getRiveDetails, isLoading } = useGlobalContext();

  const renderDetailsButton = (_id: string) => {
    return (
      <TextButton
        styles='text-right mt-1'
        textColor='#3EA2FF'
        label='Details'
        loadingState={isLoading}
        action={() => getRiveDetails(_id)}
      />
    );
  };

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
            const cancelled = status === "cancelled";
            const completed = status === "completed";
            const statusColor = getStatusColor(status);

            return (
              <View key={_id}>
                <Container styles='p-8 rounded-md mb-4'>
                  <View className='flex-row items-center justify-between'>
                    <CurrencyFormatter value={price} />

                    <View className='flex-row items-center'>
                      <View
                        className={`w-2 h-2 rounded-full ${statusColor}  mr-2`}
                      />
                      <Text styles='capitalize' text={status} />
                    </View>
                  </View>
                  <View className='flex-row items-center justify-between'>
                    <Text color='#7A7A7A' styles='my-2' text={date} />
                    {renderDetailsButton(_id)}
                  </View>
                  <Text
                    color='#7A7A7A'
                    styles='capitalize'
                    text={ride.category}
                  />
                </Container>
              </View>
            );
          }
        )}
      </View>
    </View>
  );
};

export default RiveList;
