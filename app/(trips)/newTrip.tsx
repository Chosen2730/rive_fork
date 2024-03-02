import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
	Container,
	Text,
	iconColor,
	paddingTop,
	paddingBottom,
} from "../../components/Elements";

import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import CurrentMap from "../../components/Trips/currentLocationMap";
import { logResult, useGlobalContext } from "../../AppContext/context";

const Trips = () => {
	const router = useRouter();
	const { location } = useGlobalContext();

	// console.log(location);

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
					text='Where would you like to go today?'
					styles='mt-2 w-[200px]'
				/>

				<TouchableOpacity
					onPress={() => router.push("/(trips)/selectDestination")}
					className='mb-5'
				>
					<Container
						border={1}
						styles='flex-row items-center pl-4 justify-between rounded-md mt-4'
					>
						<Text color='#8A8A8A' text='Choose Location' />
						<Container color='#3EA2FF' border={1} styles='p-4 border-0'>
							<Image
								className=''
								source={require("../../assets/images/home/gps2.png")}
							/>
						</Container>
					</Container>
				</TouchableOpacity>
			</Container>
		</SafeAreaView>
	);
};

export default Trips;
