import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Text,
  iconColor,
  paddingTop,
  paddingBottom,
  TextButton,
  Button,
} from "../../components/Elements";

import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../AppContext/context";

const Settings = () => {
  const router = useRouter();
  const {
    toggleTheme,
    theme: { dark },
  } = useGlobalContext();

  return (
    <SafeAreaView style={{ paddingTop, paddingBottom }} className='px-4 flex-1'>
      <View className='flex-row items-center justify-between'>
        <Ionicons
          onPress={() => router.back()}
          name='chevron-back-outline'
          size={24}
          color={iconColor()}
        />

        <Image
          className='w-[24px] h-[24px ]'
          resizeMode='contain'
          source={require("../../assets/images/home/Button.png")}
        />
      </View>
      <View className='mb-4'>
        <Text text='Settings' lg bold />
        <Text
          color='#7A7A7A'
          styles='my-1'
          text='You could fix some bolts and nuts'
          sm
        />
      </View>
      <View className='mb-5 bg-gray'>
        <TextButton
          action={toggleTheme}
          textStyle=''
          label={`Activate ${dark ? "Light" : "Dark"} Mode`}
          styles='py-4 rounded-md border-b-[1px] '
          textColor='#3EA2FF'
        />
        <TextButton
          textStyle=''
          label='Report User'
          styles='py-4 rounded-md border-b-[1px] '
          textColor='#3EA2FF'
        />
        <TextButton
          action={() => router.push("/(settings)/terms")}
          textStyle=''
          label='Terms of Use'
          styles='py-4 rounded-md border-b-[1px] '
          textColor='#3EA2FF'
        />
        <TextButton
          action={() => router.push("/(settings)/terms")}
          textStyle=''
          label='Delete Account'
          styles='p-4 rounded-md border-b-[1px]'
          textColor='#FF3E3E'
          bgColor='#F6D9D9'
        />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
