import { View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { useGlobalContext } from "../../AppContext/context";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
  const { pickupLocation, destinationLocation, MAPS_KEY } = useGlobalContext();
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    if (pickupLocation && destinationLocation) {
      if (mapRef.current !== null) {
        // Check mapRef.current
        mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
          edgePadding: { bottom: 50, left: 50, right: 50, top: 50 },
        });
      }
    }
  }, [pickupLocation, destinationLocation]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        mapType='mutedStandard'
        region={{
          latitude: pickupLocation.lat,
          longitude: pickupLocation.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={{ flex: 1, backgroundColor: "black" }}
      >
        {destinationLocation && pickupLocation && (
          <MapViewDirections
            origin={pickupLocation.desc}
            destination={destinationLocation.desc}
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
            identifier='destination'
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;
