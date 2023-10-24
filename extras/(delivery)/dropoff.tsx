import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import {
  Container,
  Text,
  iconColor,
  paddingTop,
  paddingBottom,
  TextField,
  Button,
} from "../../components/Elements";

import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

const DropOff = () => {
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
        <Text styles='my-1 text-center flex-1' text='Drop off Details' sm />
      </View>
      <View className='my-5'>
        <Text text='Drop Off' lg bold />
      </View>

      <Text styles='my-1' text='Reciever' />
      <TextField styles='p-4' place='John Doe' />

      <Text styles='my-1 mt-4' text='Reciever Contact' />
      <TextField styles='p-4' place='234' type='phone-pad' />

      <Text styles='my-1 mt-4' text='Pickup' />
      <TouchableOpacity onPress={() => router.push("/(trips)/selectLocation")}>
        <Container
          border={1}
          styles='flex-row items-center pl-4 justify-between rounded-md'
        >
          <Text color='#8A8A8A' text='Choose Location' />
          <Container border={1} styles='p-4 border-0'>
            <Image
              className=''
              source={require("../../assets/images/home/gps.png")}
            />
          </Container>
        </Container>
      </TouchableOpacity>
      <Button
        action={() => router.push("/(delivery)/reviewDelivery")}
        bgColor='#3EA2FF'
        styles='mt-4'
        textColor='white'
        label='Confirm'
      />
    </SafeAreaView>
  );
};

export default DropOff;
