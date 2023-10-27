import React from "react";
// @ts-ignore
import CountDown from "react-native-countdown-component-maintained";

const Countdown = ({ setIsResendShown }: { setIsResendShown: any }) => {
  return (
    <CountDown
      until={120}
      onFinish={() => setIsResendShown(true)}
      onPress={() => alert("hello")}
      size={20}
      style={{
        backgroundColor: "transparent",
      }}
      digitStyle={{ backgroundColor: "#FFF" }}
      digitTxtStyle={{ color: "#3EA2FF" }}
      timeToShow={["M", "S"]}
      timeLabels={{ m: "MM", s: "SS" }}
    />
  );
};

export default Countdown;
