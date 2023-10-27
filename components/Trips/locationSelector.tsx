import { View, Text } from "react-native";
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
  const { MAPS_KEY2 } = useGlobalContext();
  // console.log(MAPS_KEY2);
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
        onPress={(data, details = null) => {
          const desc = data.description;
          const location = details?.geometry.location;
          setLocationDetails({ ...location, desc });
        }}
        fetchDetails={true}
        query={{
          key: MAPS_KEY2,
          language: "en",
          components: "country:NG",
        }}
      />
    </View>
  );
};

export default LocationSelector;
