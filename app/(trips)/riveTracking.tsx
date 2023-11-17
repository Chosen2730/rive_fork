import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, iconColor, Button, showAlert } from "../../components/Elements";
import { View } from "react-native";
import { logResult, socket, useGlobalContext } from "../../AppContext/context";
import TrackMap from "../../components/Trips/track";
import Waiting from "../../components/Trips/waiting";
import Driver from "../../components/Trips/driver";
import Riving from "../../components/Trips/riving";
import { baseURL, config } from "../../api";
import axios from "axios";

const RiveTracking = () => {
  const router = useRouter();
  const { riveDetails, getRiveDetails, getRives } = useGlobalContext();
  const id = riveDetails?._id;

  const { tripStatus } = riveDetails || {};
  const ongoing = tripStatus === "ongoing";
  const pending = tripStatus === "pending";
  const approaching = tripStatus === "driver approaching";
  const [isCancelling, setIsCancelling] = useState(false);

  const cancelTrip = async () => {
    const url = `${baseURL}/rive/riveDetails/${id}`;
    setIsCancelling(true);

    try {
      await axios.patch(url, { tripStatus: "cancelled" }, await config());
      showAlert({
        type: "success",
        title: "Trip Cancelled",
        message: "Trip Cancelled Successfully",
      });
      socket.emit("cancelTrip");
      getRiveDetails(id);
      getRives();
      router.push("/(home)/");
    } catch (error: any) {
      const msg = error.response?.data?.msg || "An error occurred";
      showAlert({ type: "error", title: "Oops!", message: msg });
    } finally {
      setIsCancelling(false);
    }
  };

  // logResult(riveDetails);

  return (
    <View className='flex-1'>
      <View className='flex-row items-center mt-12 p-4'>
        <Ionicons
          onPress={() => router.back()}
          name='chevron-back-outline'
          size={24}
          color={iconColor()}
        />
        <Text styles='my-1 text-center flex-1' text='Trip Tracking' sm />
      </View>
      <TrackMap />
      <View className='absolute bottom-5 w-full'>
        {pending && <Waiting />}
        {approaching && <Driver />}
        {ongoing && <Riving />}

        {(pending || approaching) && (
          <Button
            action={cancelTrip}
            label='Cancel Trip'
            styles='m-4'
            bgColor='#F55050'
            textColor='white'
            loadingState={isCancelling}
          />
        )}
      </View>
    </View>
  );
};

export default RiveTracking;
