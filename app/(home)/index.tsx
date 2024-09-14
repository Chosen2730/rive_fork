import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
	Button,
	Container,
	Text,
	paddingTop,
	paddingBottom,
} from "../../components/Elements";

import { Image, View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import NoRives from "../../components/Home/noRives";
import RiveList from "../../components/Home/riveList";
import { socket, useGlobalContext } from "../../AppContext/context";
import { ActivityIndicator } from "react-native";

export type RiveType = {
	amount: number;
	date: string;
	description: string;
	status: string;
};

const Welcome = () => {
	const router = useRouter();
	const {
		getUserLocation,
		getSavedUser,
		userDetails,
		getRives,
		rives,
		isLoading,
		getRides,
	} = useGlobalContext();

	const getUser = async () => {
		await getSavedUser();
	};

	useEffect(() => {
		getUserLocation();
		getUser();
		getRides();
	}, []);
	useEffect(() => {
		getRives();
	}, [userDetails]);

	return (
		<SafeAreaView style={{ paddingTop, paddingBottom }} className='px-4 flex-1'>
			<View className='flex-row items-center justify-between mt-10'>
				<Text text='Home' bold md styles='mb-4' />
			</View>
			<View className='bg-primary p-8 py-12 rounded-md relative mt- overflow-hidden'>
				<Text
					color='white'
					md
					bold
					text='Want to get a rive today?'
					styles='mt-2 w-[158px]'
				/>
				<Image
					className='absolute right-0 bottom-0'
					resizeMode='cover'
					source={require("../../assets/images/home/Subtract.png")}
				/>
			</View>
			<View className='flex-row justify-between mt-4'>
				<Container
					styles='flex-row justify-between items-center flex-1 p-4 rounded-md'
					border={1}
				>
					<View className='flex-row items-center'>
						<Image source={require("../../assets/images/home/user.png")} />
						<View>
							<Text
								text={`${userDetails?.firstName} ${userDetails?.lastName}`}
								styles='capitalize'
								bold
							/>
							<Text text='Welcome to Rive' styles='mt-1' color='#7A7A7A' />
						</View>
					</View>
					<Button
						action={() => router.push("/(trips)/newTrip2")}
						label='Take a Ride'
						bgColor='#3EA2FF'
						textColor='#fff'
					/>
				</Container>
			</View>
			<ScrollView
				refreshControl={
					//@ts-ignore
					<RefreshControl refreshing={isLoading} onRefresh={getRives} />
				}
				className='flex-1 mt-5'
				showsVerticalScrollIndicator={false}
			>
				{rives?.length < 1 ? <NoRives /> : <RiveList rives={rives} />}
			</ScrollView>
		</SafeAreaView>
	);
};

export default Welcome;
