import { View, Image } from "react-native";
import React from "react";
import { Container, Text } from "../Elements";
import { useGlobalContext } from "../../AppContext/context";

const Waiting = () => {
  const { userDetails } = useGlobalContext();
  return (
    <View className='flex-row items-center mx-4 my-2 rounded-md overflow-hidden border-[1px] border-[#BDCDD6]'>
      <Container
        color='#ECF1F6'
        styles='flex-row justify-between items-center flex-1 rounded-md p-4'
      >
        <View className='flex-row items-center'>
          <Image
            className='w-[40px] h-[40px]'
            resizeMode='contain'
            source={require("../../assets/images/home/user.png")}
          />
          <View>
            <Text
              styles='capitalize'
              text={`${userDetails?.firstName} ${userDetails?.lastName}`}
              color='black'
              bold
            />
            <Text
              xs
              text='Waiting for Driver...'
              styles='mt-1'
              color='#7A7A7A'
            />
          </View>
        </View>
      </Container>
    </View>
  );
};

export default Waiting;
