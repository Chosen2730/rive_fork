import React, {
	Dispatch,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { Alert, useColorScheme } from "react-native";
import {
	DefaultTheme,
	DarkTheme,
	ThemeProvider,
} from "@react-navigation/native";
import * as Location from "expo-location";
import axios from "axios";
import { baseURL, config } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import io from "socket.io-client";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const url = "https://rive.onrender.com/";
const url2 = "http://localhost:3000";

// console.log(PAYSTACK_PK);

const showAlert = ({
	type,
	title,
	message,
}: {
	type: string;
	title: string;
	message: string;
}) => {
	return Toast.show({
		text1: title,
		text2: message,
		type: type,
		position: "bottom",
	});
};

type TripDetailsType = {
	distance: {
		text: string;
		value: number;
	};
	duration: string;
	durValue: number;
};

type UserDetailsType = {
	firstName?: string;
	lastName?: string;
	email?: string;
	tel?: string;
	paymentMethod?: string;
	_id?: string;
};

type RideType = {
	category?: string;
	price: number;
	features?: string;
	type?: string;
	isRecommended?: boolean;
	_id?: string;
	ride_id?: string;
};
export type CoordType = {
	lng: number;
	lat: number;
	desc: string;
};

export type RiveType = {
	assignedDriver: UserDetailsType;
	_id: string;
	ride: RideType;
	user: string;
	price: number;
	distance: number;
	duration: string;
	tripStatus: string;
	paymentStatus: string;
	createdAt: Date;
	updatedAt: Date;
	origin: CoordType;
	destination: CoordType;
	driver: CoordType;
};

export type TripPriceType = RideType[];

export type AppContextType = {
	theme: typeof DefaultTheme | typeof DarkTheme;
	toggleTheme: () => void;
	pickupLocation: any;
	setPickupLocation: Dispatch<any>;
	destinationLocation: any;
	setDestinationLocation: Dispatch<any>;
	location: any;
	getUserLocation: Function;
	completeTrip: Function;
	useLocation: boolean;
	setUseLocation: Dispatch<boolean>;
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
	tripPrice: TripPriceType;
	getTripPrice: Function;
	setChosenRide: Dispatch<RideType | null>;
	bookRide: any;
	rives: RiveType[];
	getRives: Function;
	riveDetails: RiveType | null;
	getRiveDetails: any;
	deleteUser: any;
	confirmPayment: Function;
	isConfirming: boolean;
	isVerifying: boolean;
	verify: Function;
	driverLocation: CoordType | null;
	setDriverLocation: Dispatch<CoordType | null>;
	selectedRideIndex: number;
	setSelectedRideIndex: Dispatch<number>;
	chosenRide: RideType | null;
};

const AppContext = createContext<AppContextType | null>(null);

export const useGlobalContext = () => {
	return useContext(AppContext) as AppContextType;
};
export const socket = io(url);

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
	const [rives, setRives] = useState<RiveType[] | []>([]);
	const [tripPrice, setTripPrice] = useState<TripPriceType | []>([]);
	const [chosenRide, setChosenRide] = useState<RideType | null>(null);
	const [riveDetails, setRiveDetails] = useState<RiveType | null>(null);
	const [isConfirming, setIsConfirming] = useState(false);
	const userIdRef = useRef(userDetails?._id);
	const [isVerifying, setIsVerifying] = useState(false);
	const [driverLocation, setDriverLocation] = useState<CoordType | null>(null);
	const [selectedRideIndex, setSelectedRideIndex] = useState(0);

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
		const { lat: lat1, lng: lng1 } = pickupLocation;
		const { lat: lat2, lng: lng2 } = destinationLocation;
		const origins = `${lat1},${lng1}`;
		const destinations = `${lat2},${lng2}`;
		const API_ENDPOINT =
			"https://maps.googleapis.com/maps/api/distancematrix/json";
		setIsLoading(true);
		try {
			const response = await axios.get(API_ENDPOINT, {
				params: {
					origins,
					destinations,
					key: process.env.EXPO_PUBLIC_MAPS_API_KEY,
				},
			});

			if (response.data.status === "OK") {
				const distanceRes = response.data.rows[0].elements[0].distance;
				const text = distanceRes.text;
				const value: number = distanceRes?.value;

				const duration: string =
					response.data.rows[0].elements[0].duration.text;
				const durValue = response?.data?.rows[0]?.elements[0]?.duration?.value;
				const distance = { text, value };
				setTripDetails({ distance, duration, durValue });
				getTripPrice(value, durValue);
			} else {
				throw new Error("Distance Matrix API request failed");
			}
		} catch (error) {
			console.error("Error fetching data: ", error);
			setIsLoading(false);
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

	const deleteUser = () => {
		const url = `${baseURL}/auth/delete-account`;
		setIsLoading(true);
		Alert.alert(
			"Delete Account",
			"Are you sure you want to delete your account?",
			[
				{ text: "No", onPress: () => {} },
				{
					text: "Yes",
					onPress: async () => {
						try {
							await axios.delete(url, await config());
							await AsyncStorage.clear();
							router.push("/(onboarding)/login");
						} catch (error: any) {
							console.log(error.response.data.msg);
						} finally {
							setIsLoading(false);
						}
					},
				},
			],

			{ cancelable: false }
		);
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

	const getTripPrice = async (distance: any, duration: any) => {
		const url = `${baseURL}/price/getTripPrice`;
		const payload = {
			distance,
			duration,
		};
		try {
			const res = await axios.post(url, payload, await config());
			// logResult(res.data);
			setTripPrice(res.data);
			router.push("/(trips)/packageDetails");
		} catch (error: any) {
			showAlert({
				message: error.response.data.msg,
				title: "Error getting trip price",
				type: "error",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const verify = async (reference: string, id: string) => {
		setIsVerifying(true);
		const url = `${baseURL}/rive/verify-payment`;
		const url2 = `${baseURL}/rive/riveDetails/${id}`;
		setIsLoading(true);
		try {
			await axios.post(url, { reference, riveId: id }, await config());
			// await axios.patch(url2, { paymentStatus: "Paid" }, await config());
			socket.emit("confirmPayment", id);

			setIsVerifying(false);
			router.push("/complete");
		} catch (error: any) {
			logResult(error);
		} finally {
			setIsLoading(false);
		}
	};

	const bookRide = async () => {
		const url = `${baseURL}/rive`;
		setIsLoading(true);
		const payload = {
			distance: tripDetails?.distance.value,
			ride: chosenRide?.ride_id,
			duration: tripDetails?.duration,
			price: chosenRide?.price,
			user: userDetails?._id,
			destination: destinationLocation,
			origin: pickupLocation,
		};
		try {
			const res = await axios.post(url, payload, await config());
			const riveId = res.data.rive._id;
			socket.emit("bookRide");
			router.push("/(home)/");
			await getRiveDetails(riveId);
			Toast.show({
				text1: "Ride Booked",
				text2: "Your ride has been booked successfully",
				type: "success",
			});
			getRives();
		} catch (error: any) {
			console.log(error?.response?.data);
			Toast.show({
				text1: "Error",
				text2: error.response.data.msg,
				type: "error",
				position: "bottom",
			});
		} finally {
			setIsLoading(false);
		}
	};
	const getRives = async () => {
		const id = userDetails?._id || userIdRef.current;

		if (id !== undefined) {
			const url = `${baseURL}/rive/userRives/${id}`;
			setIsLoading(true);
			try {
				const res = await axios.get(url, await config());
				setRives(res.data.rives);
			} catch (error: any) {
				console.log(error.response.data.msg);
			} finally {
				setIsLoading(false);
			}
		}
	};

	const getRiveDetails = async (id: string) => {
		const url = `${baseURL}/rive/riveDetails/${id}`;
		setIsLoading(true);
		try {
			const res = await axios.get(url, await config());
			setRiveDetails(res.data.rive);
			router.push("/(trips)/riveTracking");
		} catch (error: any) {
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
			logResult(e);
		}
	};

	const confirmPayment = async (id: string) => {
		const url = `${baseURL}/rive/riveDetails/${id}`;
		setIsLoading(true);
		try {
			const res = await axios.patch(
				url,
				{ paymentStatus: "Paid" },
				await config()
			);
			socket.emit("confirmPayment", id);
			setIsConfirming(true);
		} catch (error: any) {
			logResult(error);
		} finally {
			setIsLoading(false);
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

	useEffect(() => {
		userIdRef.current = userDetails?._id;
	}, [isLoading, userDetails]);

	useEffect(() => {
		socket.on("getStatus", (data) => {
			getRiveDetails(data);
			getRives();
		});

		socket.on("getRives", () => {
			getRives();
		});
		socket.on("tripCompleted", (id) => {
			setIsConfirming(false);
			getRiveDetails(id);
			getRives();
			router.push("/(home)");
		});
		socket.on("driverLocationChanged", (data) => {
			setDriverLocation(data);
		});
		return () => {
			socket.disconnect();
		};
	}, []);

	// logResult(riveDetails);

	return (
		<AppContext.Provider
			value={{
				theme,
				toggleTheme,
				destinationLocation,
				pickupLocation,
				setDestinationLocation,
				setPickupLocation,
				location,
				getUserLocation,
				completeTrip,
				useLocation,
				setUseLocation,
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
				bookRide,
				rives,
				getRives,
				riveDetails,
				getRiveDetails,
				deleteUser,
				confirmPayment,
				isConfirming,
				verify,
				isVerifying,
				driverLocation,
				setDriverLocation,
				selectedRideIndex,
				setSelectedRideIndex,
				chosenRide,
			}}
		>
			<GestureHandlerRootView>
				<ThemeProvider value={theme}>{children}</ThemeProvider>
			</GestureHandlerRootView>
		</AppContext.Provider>
	);
};

export const logResult = (data: any) => {
	return console.log(JSON.stringify(data, null, 2));
};

// eas build --profile preview --platform android
// eas build --profile development --platform ios
// eas build -p ios --auto-submit
