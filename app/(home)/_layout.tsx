import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import {
  DeliveryTabIcon,
  HomeTabIcon,
  SettingsTabIcon,
  TripTabIcon,
} from "../../assets/svg";

const Home = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeTabIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name='trips'
        options={{
          title: "Trips",
          tabBarIcon: ({ color }) => <TripTabIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name='delivery'
        options={{
          title: "Delivery",
          tabBarIcon: ({ color }) => <DeliveryTabIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <SettingsTabIcon color={color} />,
        }}
      />
    </Tabs>
  );
};

export default Home;
