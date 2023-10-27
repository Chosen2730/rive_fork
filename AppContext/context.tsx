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
// @ts-ignore
import { MAPS_API_KEY as MAPS_KEY2 } from "@env";
import * as Location from "expo-location";
import axios from "axios";

type TripDetailsType = {
  distance: {
    text: string;
    value: number;
  };
  duration: string;
};

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
  MAPS_KEY2: string;
  getDistance: Function;
  tripDetails: TripDetailsType | null;
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
  const [tripDetails, setTripDetails] = useState<TripDetailsType | null>(null);

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

  const getDistance = async () => {
    // console.log(pickupLocation, destinationLocation);
    const { lat: lat1, lng: lng1 } = pickupLocation;
    const { lat: lat2, lng: lng2 } = destinationLocation;
    const origins = `${lat1},${lng1}`;
    const destinations = `${lat2},${lng2}`;
    const API_ENDPOINT =
      "https://maps.googleapis.com/maps/api/distancematrix/json";
    try {
      const response = await axios.get(API_ENDPOINT, {
        params: {
          origins,
          destinations,
          key: MAPS_KEY2,
        },
      });

      if (response.data.status === "OK") {
        const distanceRes = response.data.rows[0].elements[0].distance;
        const text = distanceRes.text;
        const value: number = distanceRes.value;
        const duration: string =
          response.data.rows[0].elements[0].duration.text;
        const distance = { text, value };
        setTripDetails({ distance, duration });
      } else {
        throw new Error("Distance Matrix API request failed");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      throw error;
    }
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
  }, [useLocation]);

  // console.log({ MAPS_KEY2, MAPS_KEY });

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
        MAPS_KEY2,
        getDistance,
        tripDetails,
      }}
    >
      <ThemeProvider value={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};
//  "env": {
//         "GOOGLE_MAPS_API_KEY": "AIzaSyCl1oUl9lV20uNfJr2Z7gnczW8WY5s0IDo"
//       }
