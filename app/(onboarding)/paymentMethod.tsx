import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	Button,
	Container,
	Text,
	TextButton,
	iconColor,
} from "../../components/Elements";
import { useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import CustomModal from "../../components/Elements/customModal";
import { logResult, useGlobalContext } from "../../AppContext/context";
import CurrencyFormatter from "../../components/Elements/currency";
import { Paystack, paystackProps } from "react-native-paystack-webview";

const PaymentMethod = () => {
	const router = useRouter();
	const [isModalShown, setIsModalShown] = useState(false);
	const {
		riveDetails,
		confirmPayment,
		isConfirming,
		isLoading,
		userDetails,
		verify,
		isVerifying,
	} = useGlobalContext();
	const { price, assignedDriver } = riveDetails || {};
	const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
	const paymentMethods = [
		"Bank Transfer",
		"Internet Banking",
		"Master Card",
		"Cash",
	];

	const handlePayment = (index: number) => {
		if (index == 3) {
			setIsModalShown(true);
			return;
		} else {
			console.log(paystackWebViewRef.current);
			paystackWebViewRef?.current?.startTransaction();
		}
	};

	useEffect(() => {
		if (riveDetails?.paymentStatus === "Paid") {
			setIsModalShown(false);
		}
	}, [riveDetails?.paymentStatus]);

	return (
		<SafeAreaView className='p-4 flex-1'>
			<Ionicons
				onPress={() => router.back()}
				name='chevron-back-outline'
				size={24}
				color={iconColor()}
			/>
			<View className='my-6'>
				<Text text='Payment Method' styles='font-medium' lg />
				<Text
					text={`Select Prefered Payment Method`}
					color='#7A7A7A'
					styles='font-medium mt-1'
					sm
				/>
			</View>
			<View className='mb-5 bg-gray'>
				{paymentMethods.map((paymentMethod, ind) => (
					<TextButton
						key={ind}
						textStyle=''
						label={paymentMethod}
						styles='py-4 rounded-md border-b-[1px] '
						textColor='#3EA2FF'
						action={() => handlePayment(ind)}
					/>
				))}
			</View>

			<CustomModal visibilityStatus={isModalShown}>
				<Container styles='p-5 rounded-md'>
					<View className='flex-row justify-between'>
						<Text styles='uppercase' bold text='Payment Method' />
						<Text text='CASH' bold />
					</View>
					<View className='border-b-[1px] border-b-gray-500 my-6' />
					<View className='flex-row justify-between my-2'>
						<Text text='Amount to Pay:' />
						{/* @ts-ignore */}
						<CurrencyFormatter value={price} color='green' />
					</View>
					<View className='flex-row justify-between my-2'>
						<Text text='Payable to:' />
						<Text
							text={`Driver, ${assignedDriver?.firstName} ${assignedDriver?.lastName}`}
						/>
					</View>
					<Button
						action={() => confirmPayment(riveDetails?._id)}
						label={`${
							isConfirming ? "Pending Authorization" : "Confirm Payment"
						}`}
						loadingState={isLoading}
						bgColor='#3EA2FF'
						textColor='#fff'
						styles='mt-5'
					/>
				</Container>
			</CustomModal>

			<Paystack
				paystackKey={process.env.EXPO_PUBLIC_PAYSTACK_PK!}
				billingEmail={userDetails?.email!}
				amount={Math.ceil(price!)}
				onCancel={(e) => {
					logResult(e);
				}}
				onSuccess={(res) => {
					//@ts-ignore
					verify(res?.transactionRef?.reference, riveDetails?._id);
				}}
				ref={paystackWebViewRef as React.RefObject<React.ReactNode>}
			/>

			<CustomModal visibilityStatus={isVerifying}>
				<View>
					<ActivityIndicator />
				</View>
			</CustomModal>
		</SafeAreaView>
	);
};

export default PaymentMethod;
