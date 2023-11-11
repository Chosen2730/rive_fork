import { View } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useGlobalContext } from "../../AppContext/context";
import MapViewDirections from "react-native-maps-directions";
import { Image } from "react-native";

const TrackMap = () => {
  const { MAPS_KEY2, riveDetails } = useGlobalContext();
  const mapRef = useRef<MapView | null>(null);

  const pickupLocation = riveDetails?.origin;
  const destinationLocation = riveDetails?.destination;
  const driverLocation = riveDetails?.driver;
  const tripStatus = riveDetails?.tripStatus;
  const cancelled = tripStatus === "cancelled";
  const completed = tripStatus === "completed";

  useEffect(() => {
    if (mapRef.current !== null) {
      const markersToFit = ["destination"];
      if (pickupLocation) {
        markersToFit.push("origin");
      }
      if (driverLocation) {
        markersToFit.push("driver");
      }
      mapRef.current.fitToSuppliedMarkers(markersToFit, {
        edgePadding: { bottom: 50, left: 50, right: 50, top: 50 },
      });
    }
  }, [pickupLocation, destinationLocation, driverLocation]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        region={{
          // @ts-ignore
          latitude: destinationLocation?.lat,
          // @ts-ignore
          longitude: destinationLocation?.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {destinationLocation && pickupLocation && (
          <MapViewDirections
            // @ts-ignore
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
            strokeColor='#3EA2FF'
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

        {!(cancelled || completed) && driverLocation && (
          <Marker
            coordinate={{
              longitude: driverLocation?.lng,
              latitude: driverLocation?.lat,
            }}
            description={driverLocation?.desc}
            title={"Driver Destination"}
            identifier='driver'
            pinColor='#0000ff'
          >
            <View className='w-12 h-12 rounded-full bg-white items-center justify-center'>
              <Image
                className='w-8'
                resizeMode='contain'
                source={require("../../assets/images/home/driver.png")}
              />
            </View>
          </Marker>
        )}
        {driverLocation && pickupLocation && (
          <MapViewDirections
            // @ts-ignore
            origin={
              pickupLocation
                ? {
                    longitude: pickupLocation?.lng,
                    latitude: pickupLocation?.lat,
                  }
                : location
            }
            destination={{
              longitude: driverLocation?.lng,
              latitude: driverLocation?.lat,
            }}
            apikey={MAPS_KEY2}
            strokeColor='green'
            strokeWidth={3}
          />
        )}
      </MapView>
    </View>
  );
};

export default TrackMap;
