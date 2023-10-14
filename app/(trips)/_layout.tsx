import React from "react";
import { Stack } from "expo-router";

const Onboard = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='tripDetails' options={{ presentation: "modal" }} />
      <Stack.Screen name='packageDetails' options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default Onboard;
