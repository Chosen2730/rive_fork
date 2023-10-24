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
  useLocation: boolean;
  setUseLocation: Dispatch<boolean>;
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
  const [useLocation, setUseLocation] = useState(false);

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
    try {
      const loc = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (loc.length > 0) {
        const firstLocation = loc[0];
        // console.log(firstLocation);
        const description = `${firstLocation.name}, ${firstLocation.city},`;
        const userLocation = {
          lng: longitude,
          lat: latitude,
          desc: description,
        };
        setLocation(userLocation);
      } else {
        return "Location not found";
      }
    } catch (error) {
      console.error("Error getting location description:", error);
      return "Error getting location description";
    }
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

  useEffect(() => {
    if (useLocation) {
      setPickupLocation(location);
    }
    {
      setPickupLocation(null);
    }
  }, [useLocation]);

  // console.log(location);

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
        useLocation,
        setUseLocation,
      }}
    >
      <ThemeProvider value={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};
