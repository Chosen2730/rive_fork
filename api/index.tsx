import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseURL = "https://rive-backend.vercel.app/api/v1";
// export const baseURL = "http://localhost:3000/api/v1";
export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("token");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const config = async () => {
  const token = await getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const uploadConfig = async () => {
  const token = await getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
};
// eas build --profile preview --platform android
