import React from "react";
import { Tabs } from "expo-router";
// import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import {
  // DeliveryTabIcon,
  HistoryTabIcon,
  HomeTabIcon,
  SettingsTabIcon,
  // TripTabIcon,
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
        name='history'
        options={{
          title: "History",
          tabBarIcon: ({ color }) => <HistoryTabIcon color={color} />,
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
