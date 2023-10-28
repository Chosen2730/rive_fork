import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Container,
  Text,
  TextField,
  iconColor,
  showAlert,
} from "../../components/Elements";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { useGlobalContext } from "../../AppContext/context";
import { baseURL, config } from "../../api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
("react-native-gesture-handler");

const EnterName = () => {
  const router = useRouter();
  const {
    theme: { dark },
  } = useGlobalContext();

  const { userInput, setUserInput, getUserDetails, getSavedUser } =
    useGlobalContext();

  const [isLoading, setIsLoading] = useState(false);

  const updateUser = async () => {
    const firstName = userInput?.firstName?.toLocaleLowerCase();
    const lastName = userInput?.lastName?.toLocaleLowerCase();
    const tel = userInput?.tel;
    const email = userInput?.email?.toLocaleLowerCase();

    const url = `${baseURL}/auth/update-user/${email}`;
    if (!tel || !firstName || !lastName) {
      showAlert({
        message: "Please fill all inputs",
        title: "Ooops",
        type: "error",
      });

      return;
    }
    setIsLoading(true);

    const payload = { firstName, lastName, tel };

    try {
      const res = await axios.patch(url, payload, await config());
      showAlert({
        message: res.data.msg,
        title: "Profile Details updated Successfully",
        type: "success",
      });
      await getUserDetails();
      await getSavedUser();
      router.push("/(onboarding)/paymentMethod");
    } catch (error: any) {
      const errorLog = JSON.stringify(error);
      console.log(errorLog);
      showAlert({
        message: `${error?.response?.data.msg || "An error occurred"}`,
        title: "Oops!",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          val={userInput?.firstName || ""}
          onChange={(val) => setUserInput({ ...userInput, firstName: val })}
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
          val={userInput?.lastName || ""}
          onChange={(val) => setUserInput({ ...userInput, lastName: val })}
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
          val={userInput?.tel || ""}
          onChange={(val) => setUserInput({ ...userInput, tel: val })}
          styles='flex-1 ml-2 rounded-md px-4'
        />
      </View>

      <Button
        loadingState={isLoading}
        action={updateUser}
        label='Continue'
        bgColor='#3EA2FF'
        textColor='white'
      />
    </SafeAreaView>
  );
};

export default EnterName;
