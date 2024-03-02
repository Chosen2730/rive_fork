import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
	Container,
	Text,
	iconColor,
	paddingBottom,
	Button,
} from "../../components/Elements";

import { Image, Platform, SafeAreaView, View } from "react-native";
import { useGlobalContext } from "../../AppContext/context";
import { ScrollView } from "react-native-gesture-handler";
import CurrencyFormatter from "../../components/Elements/currency";

const PickupSummary = () => {
	const router = useRouter();
	const {
		pickupLocation,
		destinationLocation,
		tripDetails,
		tripPrice,
		theme: { dark },
		bookRide,
		isLoading,
	} = useGlobalContext();

	return (
		<SafeAreaView
			style={{ paddingTop: Platform.OS === "android" ? 40 : 0 }}
			className='p-4 flex-1'
		>
			<ScrollView>
				<View className='flex-row items-center'>
					<Ionicons
						onPress={() => router.back()}
						name='chevron-back-outline'
						size={24}
						color={iconColor()}
					/>
					<Text styles='my-1 text-center flex-1' text='Review Ride' sm />
				</View>
				<View
					style={{
						borderColor: dark ? "#20262E" : "#BDCDD6",
					}}
					className='my-5 p-4 rounded-md border-[1px]'
				>
					<Text styles='py-4' text='Picking Up At' md bold />
					<View
						style={{
							borderBottomColor: dark ? "#20262E" : "#BDCDD6",
						}}
						className='border-b-[1px] my-2'
					/>
					<View className='flex-row justify-between items-start'>
						<View>
							{/* <Text text='Ibrahim Adebisi' /> */}
							<Text color='#7A7A7A' text={pickupLocation?.desc} styles='mt-3' />
						</View>
						<View className='p-2 ml-3 bg-[#D9E8F6] rounded-md'>
							<Image source={require("../../assets/images/home/edit.png")} />
						</View>
					</View>
				</View>
				<View
					style={{
						borderColor: dark ? "#20262E" : "#BDCDD6",
					}}
					className='my-5 p-4 rounded-md border-[1px]'
				>
					<Text styles='py-4' text='Dropping Off At' md bold />
					<View
						style={{
							borderBottomColor: dark ? "#20262E" : "#BDCDD6",
						}}
						className='border-b-[1px] my-2'
					/>
					<View className='flex-row justify-between items-start'>
						<View>
							{/* <Text text='Ibrahim Adebisi' /> */}
							<Text
								color='#7A7A7A'
								text={destinationLocation?.desc}
								styles='mt-3'
							/>
						</View>
						<View className='p-2 ml-3 bg-[#D9E8F6] rounded-md'>
							<Image source={require("../../assets/images/home/edit.png")} />
						</View>
					</View>
				</View>
				<Container styles='my-5 p-4 rounded-md' border={1}>
					<Text styles='py-4' text='Estimated Trip Time' md bold />
					<View
						style={{
							borderBottomColor: dark ? "#20262E" : "#BDCDD6",
						}}
						className='border-b-[1px] my-2'
					/>

					<Text text={tripDetails?.duration} />
				</Container>
				<Container styles='my-5 p-4 rounded-md' border={1}>
					<Text styles='py-4' text='Total Bill' md bold />
					<View
						style={{
							borderBottomColor: dark ? "#20262E" : "#BDCDD6",
						}}
						className='border-b-[1px] my-2'
					/>
					<CurrencyFormatter value={Number(tripPrice)} />
				</Container>
				<Button
					action={bookRide}
					loadingState={isLoading}
					bgColor='#3EA2FF'
					styles='mt-4'
					textColor='white'
					label='Book Ride'
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default PickupSummary;
