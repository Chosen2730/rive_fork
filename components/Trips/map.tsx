import { View } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useGlobalContext } from "../../AppContext/context";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
	const {
		pickupLocation,
		destinationLocation,
		useLocation,
		location,
		MAPS_KEY2,
	} = useGlobalContext();
	const mapRef = useRef<MapView | null>(null);

	useEffect(() => {
		if (mapRef.current !== null) {
			const markersToFit = ["destination"];
			if (pickupLocation) {
				markersToFit.push("origin");
			}
			if (location) {
				markersToFit.push("location");
			}

			mapRef.current.fitToSuppliedMarkers(markersToFit, {
				edgePadding: { bottom: 50, left: 50, right: 50, top: 50 },
			});
		}
	}, [pickupLocation, destinationLocation, location, useLocation]);

	return (
		<View style={{ flex: 1 }}>
			<MapView
				provider={PROVIDER_GOOGLE}
				ref={mapRef}
				region={{
					latitude: pickupLocation?.lat,
					longitude: pickupLocation?.lng,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005,
				}}
				style={{ width: "100%", height: "100%" }}
			>
				{destinationLocation && pickupLocation && (
					<MapViewDirections
						origin={
							pickupLocation
								? {
										longitude: pickupLocation?.lng,
										latitude: pickupLocation?.lat,
								  }
								: location
						}
						destination={{
							longitude: destinationLocation?.lng,
							latitude: destinationLocation?.lat,
						}}
						apikey={MAPS_KEY2}
						strokeColor='red'
						strokeWidth={3}
					/>
				)}
				{pickupLocation && (
					<Marker
						coordinate={{
							longitude: pickupLocation?.lng,
							latitude: pickupLocation?.lat,
						}}
						description={pickupLocation?.desc}
						title={"Pickup location"}
						identifier='origin'
					/>
				)}
				{destinationLocation && (
					<Marker
						coordinate={{
							longitude: destinationLocation?.lng,
							latitude: destinationLocation?.lat,
						}}
						description={destinationLocation?.desc}
						title={"Pickup Destination"}
						identifier='destination'
						pinColor='#0000ff'
					/>
				)}
				{useLocation && location && (
					<Marker
						coordinate={{
							longitude: location?.lng,
							latitude: location?.lat,
						}}
						description={location?.desc}
						title={"Your Location"}
						identifier='location'
					/>
				)}
			</MapView>
		</View>
	);
};

export default Map;
