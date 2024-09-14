import { View, Text, Button } from "react-native";
import React, { Dispatch } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useGlobalContext } from "../../AppContext/context";
type LocationSelectorType = {
	setLocationDetails: Dispatch<any>;
	place: string;
};
const LocationSelector = ({
	setLocationDetails,
	place,
}: LocationSelectorType) => {
	const {
		theme: { dark },
	} = useGlobalContext();
	return (
		<View>
			<GooglePlacesAutocomplete
				placeholder={place}
				nearbyPlacesAPI='GooglePlacesSearch'
				debounce={400}
				onFail={(error) => console.error(error)}
				minLength={2}
				enablePoweredByContainer={false}
				styles={{
					container: {
						flex: 0,
					},
					textInput: {
						margin: 0,
						fontSize: 16,
						backgroundColor: "transparent",
						color: "#8A8A8A",
					},
				}}
				textInputProps={{
					placeholderTextColor: "#8A8A8A",
					returnKeyType: "search",
				}}
				onPress={(data, details = null) => {
					const desc = data.description;
					const location = details?.geometry.location;
					setLocationDetails({ ...location, desc });
				}}
				fetchDetails={true}
				query={{
					key: process.env.EXPO_PUBLIC_MAPS_API_KEY,
					language: "en",
					components: "country:NG",
					administrativeArea: "Ogun",
				}}
			/>
		</View>
	);
};

export default LocationSelector;
