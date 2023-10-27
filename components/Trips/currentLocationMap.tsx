import { View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const CurrentMap = ({ location }: any) => {
  const mapRef = useRef<MapView | null>(null);
  const [currentLocation, setCurrentLocation] = useState(
    location || {
      lat: 7.2245,
      lng: 3.9115,
    }
  );

  useEffect(() => {
    if (mapRef.current && location) {
      setCurrentLocation(location);
      mapRef.current.animateToRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [location]);

  const { lat, lng } = currentLocation;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: lat,
              longitude: lng,
            }}
            title={"Your Destination"}
            description={location?.desc}
          />
        )}
      </MapView>
    </View>
  );
};

export default CurrentMap;
