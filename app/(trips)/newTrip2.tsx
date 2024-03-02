import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import {
	Container,
	Text,
	iconColor,
	paddingTop,
	paddingBottom,
	TextButton,
} from "../../components/Elements";

import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import CurrentMap from "../../components/Trips/currentLocationMap";
import { useGlobalContext } from "../../AppContext/context";

const Trips2 = () => {
	const router = useRouter();
	const { location, setUseLocation, setPickupLocation } = useGlobalContext();
	return (
		<SafeAreaView style={{ paddingTop, paddingBottom }} className='flex-1'>
			<View className='flex-row items-center justify-between mt-10 mb-5 px-4'>
				<Ionicons
					onPress={() => router.back()}
					name='chevron-back-outline'
					size={24}
					color={iconColor()}
				/>
				<Text text='Take a Ride' />
				<Image
					className='w-[24px] h-[24px]'
					resizeMode='contain'
					source={require("../../assets/images/home/Button.png")}
				/>
			</View>

			<CurrentMap location={location} />

			<Container styles='p-4'>
				<Text
					md
					bold
					text='Where would you like to be Picked?'
					styles='mt-2 w-[200px]'
				/>

				<View className='mb-5'>
					<TouchableOpacity
						onPress={() => {
							setUseLocation(false);
							router.push("/(trips)/selectLocation");
						}}
					>
						<Container
							border={1}
							styles='flex-row items-center pl-4 justify-between rounded-md mt-4'
						>
							<Text color='#8A8A8A' text='Choose Location' />
							<Container border={1} color='#3EA2FF' styles='p-4 border-0'>
								<Image
									className=''
									source={require("../../assets/images/home/gps2.png")}
								/>
							</Container>
						</Container>
					</TouchableOpacity>
					<TextButton
						action={() => {
							setUseLocation(true);
							router.push("/(trips)/selectLocation");
						}}
						styles='my-3'
						textColor='#7A7A7A'
						label='Use Current Location'
					/>
				</View>
			</Container>
		</SafeAreaView>
	);
};

export default Trips2;
