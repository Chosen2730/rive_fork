import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Container,
  Text,
  TextField,
  iconColor,
} from "../../components/Elements";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useGlobalContext } from "../../AppContext/context";
("react-native-gesture-handler");

const EnterName = () => {
  const router = useRouter();
  const {
    theme: { dark },
  } = useGlobalContext();

  return (
    <SafeAreaView className='p-4'>
      <Ionicons
        onPress={() => router.back()}
        name='chevron-back-outline'
        size={24}
        color={iconColor()}
      />
      <View className='my-6'>
        <Text text='What’s Your Name?' styles='font-medium' lg />
        <Text
          text={`Let's get to know you`}
          color='#7A7A7A'
          styles='font-medium mt-1'
          sm
        />
      </View>
      <View className='my-1'>
        <Text text='First Name' styles='mb-1' />
        <TextField
          border={1}
          type='name-phone-pad'
          styles='p-3 rounded-md mb-4'
          place='Enter Firstname'
        />
      </View>
      <View className='my-1'>
        <Text text='Last Name' styles='mb-1' />
        <TextField
          border={1}
          type='name-phone-pad'
          styles='p-3 rounded-md mb-4'
          place='Enter lastname'
        />
      </View>
      <Text text='Enter Mobile Number' styles='font-medium my-2' md />
      <View className='flex-row space-x-4 mb-4'>
        <Container
          color={dark ? "#383838" : "#F7F7F7"}
          styles='p-4 rounded-md'
          border={1}
        >
          <Text text='+234' color='rgb(107 114 128)' />
        </Container>
        <TextField
          type='phone-pad'
          border={1}
          styles='flex-1 ml-2 rounded-md px-4'
        />
      </View>

      <Button
        action={() => router.push("/(onboarding)/paymentMethod")}
        label='Continue'
        bgColor='#3EA2FF'
        textColor='white'
      />
    </SafeAreaView>
  );
};

export default EnterName;
