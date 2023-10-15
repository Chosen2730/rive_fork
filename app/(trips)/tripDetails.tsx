import { View, useColorScheme } from "react-native";
import React from "react";
import { Button, Container, Text } from "../../components/Elements";
import { useGlobalContext } from "../../AppContext/context";

const TripDetails = () => {
  const {
    theme: { dark },
  } = useGlobalContext();
  return (
    <View
      style={{
        backgroundColor: dark ? "black" : "transparent",
        flex: 1,
        padding: 16,
      }}
    >
      <View>
        <Text text='Trip Details' bold styles='text-center' md />
        <View className='h-[1px] border-b-slate-300 border-b-2 my-6' />
        <Container border={1} styles='p-4 rounded-2xl'>
          <View className='flex-row justify-between'>
            <Text text='From' color='#D0D0D0' />
            <Text text='To' color='#D0D0D0' />
          </View>
          <View className='flex-row justify-between items-center my-3'>
            <Text text='Unilag' md bold color='#8A8A8A' />
            <Text text='AM - 23rd of Aug' color='#D0D0D0' />
            <Text text='Ikoyi' md color='#8A8A8A' />
          </View>
        </Container>
        <Container border={1} styles='p-4 rounded-2xl mt-8'>
          <View className='flex-row justify-between my-2'>
            <Text text='Price' color='#7A7A7A' />
            <Text text='₦5000' bold color='#D0D0D0' />
          </View>
          <View className='flex-row justify-between my-2'>
            <Text text='Status' color='#7A7A7A' />
            <View className='flex-row items-center'>
              <View
                className={`w-2 h-2 rounded-full ${"bg-yellow-500"}  mr-2`}
              />
              <Text styles='capitalize' text={"In Progress"} />
            </View>
          </View>
          <View className='flex-row justify-between my-2'>
            <Text text='Trip Type' color='#7A7A7A' />
            <Text text='Transportation' bold color='#D0D0D0' />
          </View>
          <View className='flex-row justify-between my-2'>
            <Text text='Transportation' color='#7A7A7A' />
            <Text text='Ford escape 6GK2C14' bold color='#D0D0D0' />
          </View>
          <View className='flex-row justify-between my-2'>
            <Text text='Trip Start' color='#7A7A7A' />
            <Text text='12:30 PM' bold color='#D0D0D0' />
          </View>
          <View className='flex-row justify-between my-2'>
            <Text text='Trip End' color='#7A7A7A' />
            <Text text='2:30 PM' bold color='#D0D0D0' />
          </View>
        </Container>
        <View className='mt-5'>
          <Button label='Share Ride' bgColor='#3EA2FF' textColor='white' />
          <Button
            label='End Ride'
            bgColor='#F6D9D9'
            styles='mt-3'
            textColor='#FF3E3E'
          />
        </View>
      </View>
    </View>
  );
};

export default TripDetails;
