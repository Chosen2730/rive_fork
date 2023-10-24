import { View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { useGlobalContext } from "../../AppContext/context";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
  const {
    pickupLocation,
    destinationLocation,
    MAPS_KEY,
    useLocation,
    location,
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

  console.log({ pickupLocation, destinationLocation, location, useLocation });

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        mapType='mutedStandard'
        region={{
          latitude: destinationLocation?.lat,
          longitude: destinationLocation?.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={{ flex: 1, backgroundColor: "black" }}
      >
        {destinationLocation && pickupLocation && (
          <MapViewDirections
            origin={
              pickupLocation
                ? {
                    longitude: pickupLocation.lng,
                    latitude: pickupLocation.lat,
                  }
                : location
            }
            destination={{
              longitude: destinationLocation.lng,
              latitude: destinationLocation.lat,
            }}
            apikey={MAPS_KEY}
            strokeColor='red'
            strokeWidth={3}
          />
        )}
        {pickupLocation && (
          <Marker
            coordinate={{
              longitude: pickupLocation.lng,
              latitude: pickupLocation.lat,
            }}
            description={pickupLocation.desc}
            title={"Pickup location"}
            identifier='origin'
          />
        )}
        {destinationLocation && (
          <Marker
            coordinate={{
              longitude: destinationLocation.lng,
              latitude: destinationLocation.lat,
            }}
            description={destinationLocation.desc}
            title={"Pickup Destination"}
            identifier='destination'
          />
        )}
        {useLocation && location && (
          <Marker
            coordinate={{
              longitude: location.lng,
              latitude: location.lat,
            }}
            description={location.desc}
            title={"Your Location"}
            identifier='location'
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;
