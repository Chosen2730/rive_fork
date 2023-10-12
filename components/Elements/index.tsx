import {
  Text as DefaultText,
  KeyboardTypeOptions,
  OpaqueColorValue,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

type TextType = {
  text: string;
  styles?: string;
  md?: any;
  sm?: any;
  lg?: any;
  bold?: any;
  position?: any;
  color?: string;
  just?: string;
};

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

export const Text = ({
  text,
  styles,
  md,
  sm,
  lg,
  bold,
  position,
  color,
  just,
}: TextType) => {
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
};

export const TextField = ({
  onChange,
  val,
  color,
  border,
  styles,
  type,
}: TextFieldType) => {
  const mode = useColorScheme();
  return (
    <TextInput
      onChangeText={onChange}
      value={val}
      keyboardType={type}
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
};

export const Button = ({ label, bgColor, textColor }: ButtonType) => {
  const mode = useColorScheme();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgColor
          ? bgColor
          : mode === "dark"
          ? "#121212"
          : "#FFFFFF",
      }}
      className='p-4 rounded-md'
    >
      <Text text={label} color={textColor} styles='text-center' />
    </TouchableOpacity>
  );
};

type ButtonContainerType = {
  bgColor?: string;
  children?: any;
  styles?: string;
};

export const ButtonContainer = ({
  bgColor,
  children,
  styles,
}: ButtonContainerType) => {
  const mode = useColorScheme();
  return (
    <TouchableOpacity
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
};

export const TextButton = ({ label, styles, textColor }: TextButtonType) => {
  const mode = useColorScheme();
  return (
    <TouchableOpacity className={styles}>
      <Text text={label} color={textColor} styles='text-center' />
    </TouchableOpacity>
  );
};
