import React, { Dispatch, SetStateAction } from "react";
("react-native-gesture-handler");
import OTPTextView from "react-native-otp-textinput";
import * as Clipboard from "expo-clipboard";
import { useGlobalContext } from "../../AppContext/context";

type OTPType = {
	otpInput: string;
	setOtpInput: Dispatch<SetStateAction<string>>;
	input: any;
};

const OTPInput = ({ input, setOtpInput }: OTPType) => {
	// const [otpInput, setOtpInput] = useState<string>("");
	// const updateOtpText = () => input.current?.setValue(otpInput);
	// const showTextAlert = () => otpInput && Alert.alert(otpInput);

	const handleCellTextChange = async (text: string, i: number) => {
		if (i === 0) {
			const clippedText = await Clipboard.getStringAsync();
			if (clippedText.slice(0, 1) === text) {
				input.current?.setValue(clippedText, true);
			}
		}
	};

	const {
		theme: { dark },
	} = useGlobalContext();

	return (
		<OTPTextView
			ref={input}
			containerStyle={{ marginBottom: 20 }}
			textInputStyle={{
				borderWidth: 1,
				flexGrow: 1,
				height: 50,
				width: 20,
				borderBottomWidth: 1,
				backgroundColor: dark ? "#61677A" : "#F5F5F5",
				borderRadius: 4,
			}}
			handleTextChange={setOtpInput}
			handleCellTextChange={handleCellTextChange}
			inputCount={6}
			keyboardType='numeric'
			tintColor={dark ? "#0F0F0F" : "#3EA2FF"}
			offTintColor={dark ? "#0F0F0F" : "#D0D0D0"}
			autoFocus={true}
		/>
	);
};

export default OTPInput;
