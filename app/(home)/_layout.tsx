import React from "react";
import { Tabs } from "expo-router";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";

const Home = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name='home' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='trips'
        options={{
          title: "Trips",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='card-travel' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='delivery'
        options={{
          title: "Delivery",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='truck-fast-outline'
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <AntDesign name='setting' size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Home;
