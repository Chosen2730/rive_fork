import React from "react";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  ButtonContainer,
  Container,
  Text,
  TextButton,
  TextField,
  iconColor,
} from "../../components/Elements";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useGlobalContext } from "../../AppContext/context";

const EnterPhone = () => {
  const router = useRouter();
  const {
    theme: { dark },
  } = useGlobalContext();

  const buttonTexts = [
    {
      icon: <AntDesign name='apple-o' size={24} color='black' />,
      label: "Apple",
    },
    {
      icon: <AntDesign name='facebook-square' size={24} color='black' />,
      label: "Facebook",
    },
    {
      icon: <AntDesign name='google' size={24} color='black' />,
      label: "Google",
    },
    // {
    //   icon: (
    //     <MaterialCommunityIcons name='email-outline' size={24} color='black' />
    //   ),
    //   label: "Email",
    // },
  ];

  return (
    <SafeAreaView className='p-4'>
      <ScrollView>
        <Ionicons
          onPress={() => router.back()}
          name='chevron-back-outline'
          size={24}
          color={iconColor()}
        />
        <Text text='Enter Email' styles='font-medium my-6' md />
        <TextField
          border={1}
          type='email-address'
          styles='p-3 rounded-md mb-4'
          place='user@example.com'
        />
        <Button
          action={() => router.push("/(onboarding)/enterOTP")}
          label='Continue'
          bgColor='#3EA2FF'
          textColor='white'
        />
        <View className='flex-row items-center my-8'>
          <View className='flex-1 h-[1px] bg-gray-600' />
          <Container styles='p-2 py-3' border={1}>
            <Text text='or' color='rgb(107 114 128)' />
          </Container>
          <View className='flex-1 h-[1px] bg-gray-600' />
        </View>

        <View>
          {buttonTexts.map(({ icon, label }, ind) => (
            <ButtonContainer
              key={ind}
              styles='flex-row items-center justify-center mb-4'
              bgColor='#D9E8F6'
            >
              {icon}
              <Text
                styles='ml-1'
                color='black'
                text={`Continue with ${label}`}
              />
            </ButtonContainer>
          ))}
        </View>
        <View className='flex-row items-center my-8'>
          <View className='flex-1 h-[1px] bg-gray-600' />
          <Container styles='p-2 py-3' border={1}>
            <Text text='or' color='rgb(107 114 128)' />
          </Container>
          <View className='flex-1 h-[1px] bg-gray-600' />
        </View>

        <TextButton
          textStyle='text-center'
          textColor='#3EA2FF'
          label='Login to your account'
        />
        <Text
          text='By continuing, you agree to receive calls, WhatsApp, or SMS messages, from Rive and its affiliates at the provided number.'
          styles='mt-4'
          color='#7A7A7A'
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EnterPhone;
