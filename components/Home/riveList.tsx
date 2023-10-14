import { View } from "react-native";
import React from "react";
import { RiveType } from "../../app/(home)";
import { Container, Text, TextButton } from "../Elements";
import { TouchableOpacity } from "react-native-gesture-handler";

type RiveListType = {
  rives: RiveType[];
};
const RiveList = ({ rives }: RiveListType) => {
  return (
    <View>
      <View className='flex-row justify-between'>
        <Text color='#7A7A7A' md bold text='Your Rives' />
        <TextButton textColor='#3EA2FF' label='See all' />
      </View>
      <View className='mt-5'>
        {rives.map(({ amount, date, description, status }, ind) => (
          <TouchableOpacity key={ind}>
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
        ))}
      </View>
    </View>
  );
};

export default RiveList;
