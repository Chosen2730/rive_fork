import {
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
export const iconColor = (color?: string | OpaqueColorValue | undefined) => {
  const mode = useColorScheme();
  if (color) {
    return color;
  } else if (mode === "dark") {
    return "white";
  } else {
    return "black";
  }
};

type TextType = {
  text: string;
  styles?: string;
  md?: any;
  sm?: any;
  lg?: any;
  bold?: any;
  color?: string;
};

export const Text = ({ text, styles, md, sm, lg, bold, color }: TextType) => {
  const mode = useColorScheme();
  return (
    <DefaultText
      className={styles}
      style={{
        color: color ? color : mode === "dark" ? "white" : "black",
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
  const mode = useColorScheme();
  return (
    <TextInput
      onChangeText={onChange}
      value={val}
      keyboardType={type}
      placeholder={place}
      style={{
        color: mode === "dark" ? "#8A8A8A" : "#8A8A8A",
        borderWidth: border,
        borderColor: color
          ? color
          : mode === "dark"
          ? "rgb(31 41 55)"
          : "#D0D0D0",
        backgroundColor: mode === "dark" ? "#121212" : "#FFFFFF",
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
  const mode = useColorScheme();
  return (
    <View
      style={{
        borderWidth: border,
        borderColor: borderColor
          ? borderColor
          : mode === "dark"
          ? "rgb(31 41 55)"
          : "#D0D0D0",
        backgroundColor: color
          ? color
          : mode === "dark"
          ? "#121212"
          : "#FFFFFF",
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
};

export const Button = ({
  label,
  bgColor,
  textColor,
  action,
  styles,
}: ButtonType) => {
  const mode = useColorScheme();
  return (
    <TouchableOpacity
      onPress={action}
      style={{
        backgroundColor: bgColor
          ? bgColor
          : mode === "dark"
          ? "#121212"
          : "#FFFFFF",
      }}
      className={`${styles} p-4 rounded-md`}
    >
      <Text text={label} color={textColor} styles='text-center' />
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
  const mode = useColorScheme();
  return (
    <TouchableOpacity
      onPress={action}
      style={{
        backgroundColor: bgColor
          ? bgColor
          : mode === "dark"
          ? "#121212"
          : "#FFFFFF",
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
};

export const TextButton = ({
  label,
  styles,
  textColor,
  textStyle,
  action,
}: TextButtonType) => {
  const mode = useColorScheme();
  return (
    <TouchableOpacity
      style={{ borderColor: mode === "dark" ? "#001C30" : "#F5F5F5" }}
      className={styles}
      onPress={action}
    >
      <Text text={label} color={textColor} styles={textStyle} />
    </TouchableOpacity>
  );
};

export const paddingTop: any = Platform.OS === "ios" ? -30 : -20;
export const paddingBottom: any = Platform.OS === "ios" ? -20 : 20;
