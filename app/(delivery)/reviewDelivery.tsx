import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import {
  Container,
  Text,
  iconColor,
  paddingBottom,
  TextField,
  Button,
} from "../../components/Elements";

import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

const ReviewDelivery = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ paddingBottom }} className='p-4 flex-1'>
      <View className='flex-row items-center'>
        <Ionicons
          onPress={() => router.back()}
          name='chevron-back-outline'
          size={24}
          color={iconColor()}
        />
        <Text styles='my-1 text-center flex-1' text='Review Delivery' sm />
      </View>
      <Container styles='my-5 p-4 rounded-md'>
        <Text text='Picking Up At' md bold />
        <View className='border-b-[1px] border-b-gray-300 my-2' />
        <View className='flex-row justify-between items-start'>
          <View>
            <Text text='Ibrahim Adebisi' />
            <Text
              color='#7A7A7A'
              text='31 Ade-Ibrahim St Egbeda 10212, Lagos +234898398922868'
              styles='mt-3'
            />
          </View>
          <View className='p-2 ml-3 bg-[#D9E8F6] rounded-md'>
            <Image source={require("../../assets/images/home/edit.png")} />
          </View>
        </View>
      </Container>
      <Container styles='my-5 p-4 rounded-md'>
        <Text text='Delivering To' md bold />
        <View className='border-b-[1px] border-b-gray-300 my-2' />
        <View className='flex-row justify-between items-start'>
          <View>
            <Text text='Ibrahim Adebisi' />
            <Text
              color='#7A7A7A'
              text='31 Ade-Ibrahim St Egbeda 10212, Lagos +234898398922868'
              styles='mt-3'
            />
          </View>
          <View className='p-2 ml-3 bg-[#D9E8F6] rounded-md'>
            <Image source={require("../../assets/images/home/edit.png")} />
          </View>
        </View>
      </Container>

      <Button
        bgColor='#3EA2FF'
        styles='mt-4'
        textColor='white'
        label='Confirm Delivery 5,000'
      />
    </SafeAreaView>
  );
};

export default ReviewDelivery;
