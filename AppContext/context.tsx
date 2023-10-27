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
import { baseURL, config } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type TripDetailsType = {
  distance: {
    text: string;
    value: number;
  };
  duration: string;
};

type UserDetailsType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  tel?: string;
  paymentMethod?: string;
};

type RideType = {
  category?: string;
  price?: number;
  features?: string;
  type?: string;
  isRecommended?: boolean;
  _id: string;
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
  userInput: UserDetailsType | null;
  userDetails: UserDetailsType | null;
  setUserInput: Dispatch<UserDetailsType | null>;
  setUserDetails?: Dispatch<UserDetailsType | null>;
  isLoading: boolean;
  setIsLoading: Dispatch<boolean>;
  getUserDetails: Function;
  getSavedUser: Function;
  rides: RideType[];
  getRides: Function;
  tripPrice: number;
  getTripPrice: Function;
  setChosenRide: Dispatch<RideType | null>;
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
  const [userInput, setUserInput] = useState<UserDetailsType | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rides, setRides] = useState<RideType[] | []>([]);
  const [tripPrice, setTripPrice] = useState<number>(0);
  const [chosenRide, setChosenRide] = useState<RideType | null>(null);

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

  const getUserDetails = async () => {
    const email = userInput?.email?.toLocaleLowerCase();
    const url = `${baseURL}/auth/user/${email}`;
    setIsLoading(true);
    try {
      const res = await axios.get(url, await config());
      const data = JSON.stringify(res.data.user);
      await AsyncStorage.setItem("user", data);
    } catch (error: any) {
      console.log(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  const getRides = async () => {
    const url = `${baseURL}/rides`;
    setIsLoading(true);
    try {
      const res = await axios.get(url, await config());
      setRides(res.data.rides);
    } catch (error: any) {
      console.log(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  const getTripPrice = async () => {
    const url = `${baseURL}/multiplier/getTripPrice`;
    setIsLoading(true);
    const payload = {
      distance: tripDetails?.distance.value,
      ride: chosenRide?._id,
    };
    console.log(payload);
    try {
      const res = await axios.post(url, payload, await config());
      console.log(res.data);
      setTripPrice(res.data.tripPrice);
      router.replace("/(trips)/pickupSummary");
    } catch (error: any) {
      console.log({ error });
      console.log(error.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  const getSavedUser = async () => {
    try {
      const data = await AsyncStorage.getItem("user");
      const currentUser = data != null ? JSON.parse(data) : null;
      setUserDetails(currentUser);
    } catch (e) {
      // error reading value
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
        userInput,
        setUserInput,
        isLoading,
        setIsLoading,
        userDetails,
        getUserDetails,
        getSavedUser,
        rides,
        getRides,
        tripPrice,
        setChosenRide,
        getTripPrice,
      }}
    >
      <ThemeProvider value={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};

// eas build --profile preview --platform android
