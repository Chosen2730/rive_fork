import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextButton, iconColor } from "../../components/Elements";
import { useRouter } from "expo-router";
import { View } from "react-native";
("react-native-gesture-handler");

const PaymentMethod = () => {
  const router = useRouter();

  const paymentMethods = ["Bank Transfer", "Internet Banking", "Master Card"];

  return (
    <SafeAreaView className='p-4'>
      <Ionicons
        onPress={() => router.back()}
        name='chevron-back-outline'
        size={24}
        color={iconColor()}
      />
      <View className='my-6'>
        <Text text='Payment Method' styles='font-medium' lg />
        <Text
          text={`Select Preffered Payment Method`}
          color='#7A7A7A'
          styles='font-medium mt-1'
          sm
        />
      </View>
      <View className='mb-5 bg-gray'>
        {paymentMethods.map((paymentMethod, ind) => (
          <TextButton
            key={ind}
            action={() => router.push("/(trips)/complete")}
            textStyle=''
            label={paymentMethod}
            styles='py-4 rounded-md border-b-[1px] '
            textColor='#3EA2FF'
          />
        ))}
      </View>

      <TextButton
        action={() => router.push("/(home)")}
        textStyle=''
        label='Do this later'
        styles='py-4 rounded-md'
        textColor='#FD6565'
      />
    </SafeAreaView>
  );
};

export default PaymentMethod;
