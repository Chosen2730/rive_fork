import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert, useColorScheme } from "react-native";
import {
  DefaultTheme,
  DarkTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { GOOGLE_MAPS_API_KEY as MAPS_KEY } from "@env";
import * as Location from "expo-location";

export type AppContextType = {
  theme: typeof DefaultTheme | typeof DarkTheme;
  toggleTheme: () => void;
  MAPS_KEY: string;
  pickupLocation: any;
  setPickupLocation: Dispatch<any>;
  destinationLocation: any;
  setDestinationLocation: Dispatch<any>;
  location: any;
  getUserLocation: Function;
  completeTrip: Function;
};

const AppContext = createContext<AppContextType | null>(null);

export const useGlobalContext = () => {
  return useContext(AppContext) as AppContextType;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<typeof DefaultTheme | typeof DarkTheme>(
    colorScheme === "dark" ? DarkTheme : DefaultTheme
  );

  //STATES
  const [pickupLocation, setPickupLocation] = useState<any>(null);
  const [destinationLocation, setDestinationLocation] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);

  // FUNCTIONS
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === DefaultTheme ? DarkTheme : DefaultTheme
    );
  };

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = currentLocation.coords;
    const location = { latitude, longitude };
    setLocation(location);
  };

  const completeTrip = () => {
    setDestinationLocation(null);
    setPickupLocation(null);
  };

  // USEEFFECTS
  useEffect(() => {
    if (colorScheme === "dark") {
      setTheme(DarkTheme);
    } else {
      setTheme(DefaultTheme);
    }
  }, [colorScheme]);

  // console.log(MAPS_KEY);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        MAPS_KEY,
        destinationLocation,
        pickupLocation,
        setDestinationLocation,
        setPickupLocation,
        location,
        getUserLocation,
        completeTrip,
      }}
    >
      <ThemeProvider value={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};
