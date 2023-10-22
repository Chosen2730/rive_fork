import { View, Text, ColorValue } from "react-native";
import React from "react";
import { SvgXml } from "react-native-svg";

export const HomeTabIcon = ({ color }: { color: ColorValue | undefined }) => {
  const colorString = typeof color === "symbol" ? String(color) : color;

  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        d='M9.895 2.83992L4.505 7.03992C3.605 7.73992 2.875 9.22992 2.875 10.3599V17.7699C2.875 20.0899 4.765 21.9899 7.085 21.9899H18.665C20.985 21.9899 22.875 20.0899 22.875 17.7799V10.4999C22.875 9.28992 22.065 7.73992 21.075 7.04992L14.895 2.71992C13.495 1.73992 11.245 1.78992 9.895 2.83992Z'
        stroke='${colorString}'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M12.875 17.99V14.99'
        stroke='${colorString}'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  `;

  return <SvgXml xml={svgIcon} width='24' height='24' fill={"transparent"} />;
};

export const TripTabIcon = ({ color }: { color: ColorValue | undefined }) => {
  const colorString = typeof color === "symbol" ? String(color) : color;

  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
    d='M17.525 22H7.72501C6.02501 22 4.625 20.61 4.625 18.9V5.10001C4.625 3.40001 6.01501 2 7.72501 2H17.525C19.225 2 20.625 3.39001 20.625 5.10001V18.9C20.625 20.61 19.235 22 17.525 22Z'
    stroke='${colorString}'
    stroke-width='1.5'
    stroke-linecap='round'
    stroke-linejoin='round'
  />
  <path
    d='M19.125 13H6.125C5.295 13 4.625 12.33 4.625 11.5V9.5C4.625 8.67 5.295 8 6.125 8H19.125C19.955 8 20.625 8.67 20.625 9.5V11.5C20.625 12.33 19.955 13 19.125 13Z'
   stroke='${colorString}'
    stroke-width='1.5'
    stroke-linecap='round'
    stroke-linejoin='round'
  />
  <path
    d='M9.11951 17.7H9.12849'
    stroke='${colorString}'
    stroke-width='1.5'
    stroke-linecap='round'
    stroke-linejoin='round'
  />
  <path
    d='M16.1195 17.7H16.1285'
    stroke='${colorString}'
    stroke-width='1.5'
    stroke-linecap='round'
    stroke-linejoin='round'
  />
  <path
    d='M10.125 5H15.125'
    stroke='${colorString}'
    stroke-width='1.5'
    stroke-linecap='round'
    stroke-linejoin='round'
  />
    </svg>
  `;

  return <SvgXml xml={svgIcon} width='24' height='24' fill={"transparent"} />;
};

export const DeliveryTabIcon = ({
  color,
}: {
  color: ColorValue | undefined;
}) => {
  const colorString = typeof color === "symbol" ? String(color) : color;

  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
    d='M12.375 14H13.375C14.475 14 15.375 13.1 15.375 12V2H6.375C4.875 2 3.56501 2.82999 2.88501 4.04999'
    stroke='${colorString}'
    stroke-width='1.5'
    stroke-linecap='round'
    stroke-linejoin='round'
  />
  <path
    d='M2.375 17C2.375 18.66 3.715 20 5.375 20H6.375C6.375 18.9 7.275 18 8.375 18C9.475 18 10.375 18.9 10.375 20H14.375C14.375 18.9 15.275 18 16.375 18C17.475 18 18.375 18.9 18.375 20H19.375C21.035 20 22.375 18.66 22.375 17V14H19.375C18.825 14 18.375 13.55 18.375 13V10C18.375 9.45 18.825 9 19.375 9H20.665L18.955 6.01001C18.595 5.39001 17.935 5 17.215 5H15.375V12C15.375 13.1 14.475 14 13.375 14H12.375'
   stroke='${colorString}'
    stroke-width='1.5'
    stroke-linecap='round'
    stroke-linejoin='round'
  />
  <path
    d='M8.375 22C9.47957 22 10.375 21.1046 10.375 20C10.375 18.8954 9.47957 18 8.375 18C7.27043 18 6.375 18.8954 6.375 20C6.375 21.1046 7.27043 22 8.375 22Z'
   stroke='${colorString}'
    stroke-width='1.5'
    stroke-linecap='round'
    stroke-linejoin='round'
  />
  <path
    d='M16.375 22C17.4796 22 18.375 21.1046 18.375 20C18.375 18.8954 17.4796 18 16.375 18C15.2704 18 14.375 18.8954 14.375 20C14.375 21.1046 15.2704 22 16.375 22Z'
   stroke='${colorString}'
    stroke-width='1.5'
    stroke-linecap='round'
    stroke-linejoin='round'
  />
  <path
    d='M22.375 12V14H19.375C18.825 14 18.375 13.55 18.375 13V10C18.375 9.45 18.825 9 19.375 9H20.665L22.375 12Z'
   stroke='${colorString}'
    stroke-width='1.5'
    stroke-linecap='round'
    stroke-linejoin='round'
  />
  <path
    d='M2.375 8H8.375'
    stroke='${colorString}'
    stroke-width='1.5'
    stroke-linecap='round'
    stroke-linejoin='round'
  />
  <path
    d='M2.375 11H6.375'
   stroke='${colorString}'
    stroke-width='1.5'
    stroke-linecap='round'
    stroke-linejoin='round'
  />
  <path
    d='M2.375 14H4.375'
   stroke='${colorString}'
    stroke-width='1.5'
    stroke-linecap='round'
    stroke-linejoin='round'
  />

    </svg>
  `;

  return <SvgXml xml={svgIcon} width='24' height='24' fill={"transparent"} />;
};

export const SettingsTabIcon = ({
  color,
}: {
  color: ColorValue | undefined;
}) => {
  const colorString = typeof color === "symbol" ? String(color) : color;

  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
    d='M12.125 15C13.7819 15 15.125 13.6569 15.125 12C15.125 10.3431 13.7819 9 12.125 9C10.4681 9 9.125 10.3431 9.125 12C9.125 13.6569 10.4681 15 12.125 15Z'
    stroke='${colorString}'
    stroke-width='1.5'
    stroke-miterlimit='10'
    stroke-linecap='round'
    stroke-linejoin='round'
  />
  <path
    d='M2.125 12.8799V11.1199C2.125 10.0799 2.975 9.21994 4.025 9.21994C5.835 9.21994 6.575 7.93994 5.665 6.36994C5.145 5.46994 5.455 4.29994 6.365 3.77994L8.095 2.78994C8.885 2.31994 9.905 2.59994 10.375 3.38994L10.485 3.57994C11.385 5.14994 12.865 5.14994 13.775 3.57994L13.885 3.38994C14.355 2.59994 15.375 2.31994 16.165 2.78994L17.895 3.77994C18.805 4.29994 19.115 5.46994 18.595 6.36994C17.685 7.93994 18.425 9.21994 20.235 9.21994C21.275 9.21994 22.135 10.0699 22.135 11.1199V12.8799C22.135 13.9199 21.285 14.7799 20.235 14.7799C18.425 14.7799 17.685 16.0599 18.595 17.6299C19.115 18.5399 18.805 19.6999 17.895 20.2199L16.165 21.2099C15.375 21.6799 14.355 21.3999 13.885 20.6099L13.775 20.4199C12.875 18.8499 11.395 18.8499 10.485 20.4199L10.375 20.6099C9.905 21.3999 8.885 21.6799 8.095 21.2099L6.365 20.2199C5.455 19.6999 5.145 18.5299 5.665 17.6299C6.575 16.0599 5.835 14.7799 4.025 14.7799C2.975 14.7799 2.125 13.9199 2.125 12.8799Z'
    stroke='${colorString}'
    stroke-width='1.5'
    stroke-miterlimit='10'
    stroke-linecap='round'
    stroke-linejoin='round'
  />

    </svg>
  `;

  return <SvgXml xml={svgIcon} width='24' height='24' fill={"transparent"} />;
};

<svg
  width='25'
  height='24'
  viewBox='0 0 25 24'
  fill='none'
  xmlns='http://www.w3.org/2000/svg'
></svg>;
