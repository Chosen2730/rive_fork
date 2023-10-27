import { View, Image, Dimensions, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Text } from "../../components/Elements";
import { useGlobalContext } from "../../AppContext/context";

const Onboard = ({}) => {
  const router = useRouter();
  const {
    theme: { dark },
  } = useGlobalContext();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const slider = useRef<ICarouselInstance>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const pages = [
    {
      img: dark
        ? require(`../../assets/images/onboarding/1-dark.png`)
        : require(`../../assets/images/onboarding/1.png`),
      header: "More Than Luxury",
      content: "Elevating Luxury Transportation Beyond Expectations.",
    },
    {
      img: dark
        ? require(`../../assets/images/onboarding/2-dark.png`)
        : require(`../../assets/images/onboarding/2.png`),
      header: "Exclusive Rewards.",
      content: "benefits that elevate your experience even further",
    },
    {
      img: dark
        ? require(`../../assets/images/onboarding/3-dark.png`)
        : require(`../../assets/images/onboarding/3.png`),
      header: "Advanced Safety.",
      content: "state-of-the-art safety features and real-time monitoring",
    },
  ];

  const nextSlide = () => {
    router.push("/(onboarding)/enterPhone");
  };

  return (
    <View>
      <Carousel
        ref={slider}
        loop={false}
        width={width}
        height={height}
        autoPlay={false}
        data={pages}
        pagingEnabled
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setActiveSlide(index)}
        renderItem={({ item }) => {
          return (
            <View className='p-5 flex-1'>
              <View className='py-10'>
                <View className='flex-1 justify-center flex-row gap-2'>
                  {pages.map((item, ind) => (
                    <View
                      key={ind}
                      className={`flex-1 h-2 ${
                        activeSlide === ind ? "bg-primary" : "bg-gray-200"
                      } rounded-full`}
                    />
                  ))}
                </View>
              </View>
              <View className='items-center flex-1 justify-center w-full'>
                <Image style={styles.image} source={item.img} />
                <Text text={item.header} lg bold />

                <Text styles='text-center my-3' text={item.content} />
                <View className='w-full my-5'>
                  <TouchableOpacity
                    className='bg-primary p-4 px-20  rounded-md w-full'
                    onPress={nextSlide}
                  >
                    <Text
                      text='Get Started'
                      bold
                      color='white'
                      styles='text-center text-white'
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  image: {
    width: 1 * Dimensions.get("window").width,
    height: 1 * Dimensions.get("window").width,
    resizeMode: "contain",
  },
});

export default Onboard;
