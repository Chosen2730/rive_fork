import {
  ColorValue,
  Text as DefaultText,
  GestureResponderEvent,
  KeyboardTypeOptions,
  OpaqueColorValue,
  Platform,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useGlobalContext } from "../../AppContext/context";
export const iconColor = (color?: string | OpaqueColorValue | undefined) => {
  const {
    theme: { dark },
  } = useGlobalContext();
  if (color) {
    return color;
  } else if (dark) {
    return "white";
  } else {
    return "black";
  }
};

type TextType = {
  text: any;
  styles?: string;
  md?: any;
  sm?: any;
  lg?: any;
  bold?: any;
  color?: string;
};

export const Text = ({ text, styles, md, sm, lg, bold, color }: TextType) => {
  const {
    theme: { dark },
  } = useGlobalContext();
  const textColor = color ? color : dark ? "white" : "black";
  return (
    <DefaultText
      className={styles}
      style={{
        color: textColor,
        fontSize: sm ? 16 : md ? 20 : lg ? 32 : 14,
        fontWeight: bold ? "bold" : "normal",
      }}
    >
      {text}
    </DefaultText>
  );
};

type TextFieldType = {
  onChange?: (value: any) => void;
  val?: any;
  styles?: string;
  color?: string;
  border?: number;
  type?: KeyboardTypeOptions;
  place?: string;
};

export const TextField = ({
  onChange,
  val,
  color,
  border,
  styles,
  type,
  place,
}: TextFieldType) => {
  const {
    theme: { dark },
  } = useGlobalContext();
  return (
    <TextInput
      onChangeText={onChange}
      value={val}
      keyboardType={type}
      placeholder={place}
      placeholderTextColor={dark ? "#8A8A8A" : "#8A8A8A"}
      style={{
        color: dark ? "#8A8A8A" : "#8A8A8A",
        borderWidth: border,
        borderColor: color ? color : dark ? "rgb(31 41 55)" : "#D0D0D0",
        backgroundColor: dark ? "#121212" : "#FFFFFF",
      }}
      className={styles}
    />
  );
};

type ContainerType = {
  children: any;
  styles?: string;
  color?: string;
  border?: number;
  borderColor?: string;
};

export const Container = ({
  children,
  color,
  border,
  styles,
  borderColor,
}: ContainerType) => {
  const {
    theme: { dark },
  } = useGlobalContext();
  return (
    <View
      style={{
        borderWidth: border,
        borderColor: borderColor
          ? borderColor
          : dark
          ? "rgb(31 41 55)"
          : "#D0D0D0",
        backgroundColor: color ? color : dark ? "#121212" : "#FFFFFF",
      }}
      className={styles}
    >
      {children}
    </View>
  );
};

type ButtonType = {
  label: string;
  bgColor?: string;
  textColor?: string;
  action?: (event: GestureResponderEvent) => void;
  styles?: string;
  isDisabled?: boolean;
};

export const Button = ({
  label,
  bgColor,
  textColor,
  action,
  styles,
  isDisabled,
}: ButtonType) => {
  const {
    theme: { dark },
  } = useGlobalContext();
  return (
    <TouchableOpacity
      onPress={action}
      disabled={isDisabled}
      style={{
        backgroundColor: isDisabled
          ? "#D0D0D0"
          : bgColor
          ? bgColor
          : dark
          ? "#121212"
          : "#FFFFFF",
      }}
      className={`${styles} p-4 rounded-md`}
    >
      <Text
        text={label}
        color={isDisabled ? "#8A8A8A" : textColor}
        styles='text-center'
      />
    </TouchableOpacity>
  );
};

type ButtonContainerType = {
  bgColor?: string;
  children?: any;
  styles?: string;
  action?: (event: GestureResponderEvent) => void;
};

export const ButtonContainer = ({
  bgColor,
  children,
  styles,
  action,
}: ButtonContainerType) => {
  const {
    theme: { dark },
  } = useGlobalContext();
  return (
    <TouchableOpacity
      onPress={action}
      style={{
        backgroundColor: bgColor ? bgColor : dark ? "#121212" : "#FFFFFF",
      }}
      className={`${styles} p-4 rounded-md`}
    >
      {children}
    </TouchableOpacity>
  );
};

type TextButtonType = {
  label: string;
  textColor?: string;
  styles?: string;
  textStyle?: string;
  borderColor?: string;
  action?: (event: GestureResponderEvent) => void;
  bgColor?: ColorValue;
};

export const TextButton = ({
  label,
  styles,
  textColor,
  textStyle,
  bgColor,
  action,
}: TextButtonType) => {
  const {
    theme: { dark },
  } = useGlobalContext();
  return (
    <TouchableOpacity
      style={{
        borderColor: dark ? "#001C30" : "#F5F5F5",
        backgroundColor: bgColor ? bgColor : "transaparent",
      }}
      className={styles}
      onPress={action}
    >
      <Text text={label} color={textColor} styles={textStyle} />
    </TouchableOpacity>
  );
};

export const paddingTop: any = Platform.OS === "ios" ? -30 : -20;
export const paddingBottom: any = Platform.OS === "ios" ? -20 : 20;
