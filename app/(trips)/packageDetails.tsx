import {
	Image,
	Platform,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect } from "react";
import { Button, Text } from "../../components/Elements";
import { useGlobalContext } from "../../AppContext/context";
import CurrencyFormatter from "../../components/Elements/currency";
import { router, useNavigation } from "expo-router";

const PackageDetails = () => {
	const { selectedRideIndex, setSelectedRideIndex, setChosenRide, tripPrice } =
		useGlobalContext();

	const navigation = useNavigation();

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			setChosenRide(tripPrice[0]);
		});
		return unsubscribe;
	}, [navigation]);

	// console.log(tripPrice);

	return (
		<SafeAreaView
			style={{ paddingTop: Platform.OS === "android" ? 40 : 0 }}
			className='flex-1'
		>
			<View
				style={{
					padding: 16,
					flex: 1,
				}}
			>
				<View className=''>
					<Text text='Ride Details' bold styles='text-center' md />
					<View className='h-[1px] border-b-slate-300 border-b-2 my-6' />
				</View>
				<ScrollView className='flex-1'>
					{tripPrice.map(({ price, category, type, _id }, index) => {
						const renderImageSource = () =>
							type === "bike"
								? require("../../assets/images/home/Objects.png")
								: require("../../assets/images/home/Car.png");

						return (
							<TouchableOpacity
								onPress={() => {
									setSelectedRideIndex(index);
									setChosenRide(tripPrice[index]);
								}}
								key={index}
								className={`p-4 py-10 items-center ${
									selectedRideIndex === index
										? "border-[#65B4FD]"
										: "border-gray-300"
								}  border rounded-md mb-4`}
							>
								<Image
									className='w-[250px]'
									resizeMode='contain'
									source={renderImageSource()}
								/>
								<View className='p-6 flex-row w-full items-center'>
									<View className='flex-1'>
										<CurrencyFormatter value={price!} />
										<Text
											text={category}
											styles='capitalize'
											xs
											color='#7A7A7A'
										/>
									</View>
									{/* {isRecommended && (
											<View className='bg-[#D9E8F6]  px-6 py-3 rounded-full'>
												<Text text='Recommended' color='black' styles='' />
											</View>
										)} */}
								</View>
							</TouchableOpacity>
						);
					})}
				</ScrollView>

				<Button
					action={async () => {
						router.push("/(trips)/pickupSummary");
					}}
					label='Confirm Ride'
					bgColor='#3EA2FF'
					textColor='white'
				/>
			</View>
		</SafeAreaView>
	);
};

export default PackageDetails;
