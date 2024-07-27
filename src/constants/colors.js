// // constants/colors.js

// const colors = {
//   primary: "#6689ff",
//   primaryLight: "#e0e7ff",
//   primaryDark: "#2a3b8e",
//   secondary: "#474747",
//   gray: "#eaeaea",
//   black: "#151515",
//   white: "#eff2ff"
// };

// export default colors;


import { useSelector } from 'react-redux';
import { Dimensions } from 'react-native';
import { green } from 'react-native-reanimated/lib/typescript/Colors';

const { width,height } = Dimensions.get('window');

const baseTheme = {
  fontSize: {
    small: 12,
    body: 14,
    medium:16,
    button: 18,
    title: 18,
    large:20,
    heading: 24,
    display1: 30,
    display2: 36,
  },
  padding: {
    header: 45,
    bottomBar: 54,
  },
  dimensions:{
    width:width,
    height:height,
    statusBarHeight:30
  },
  primary: "#6689ff",
  primaryLight: "#e0e7ff",
  primaryDark: "#2a3b8e",
  accent: '#09101D',
  black: '#151619',
  white: "#ffffff",
  gray: '#B9B9B9',
  purple: '#8B13B1',
  red: "#EE1B1B",
  darkwhite:'#B9B9B9',
  green: "#1da32f",
};

export const lightTheme = {
  ...baseTheme,
  primary: "#009fe3",
  primary_100: "#177cc4",
  primary_200: "#1987d5",
  primaryAlt: "#1571b2",
  primaryAlt_100: "#00adf7",
  primaryAlt_200: "#0cb6ff",
  background: '#ffffff',
  backgroundAlt: '#ebf5ff',
  text: '#141615',
  textAlt: '#7c7c7c',
  textPrimary: '#1571b2',
  separator: '#c0c0c0',
  redSupport: "rgba(255, 3, 8, 0.15)",
  type:'light'
};

export const darkTheme = {
  ...baseTheme,
  primary: "#1571b2",
  primary_100: "#00adf7",
  primary_200: "#0cb6ff",
  primaryAlt: "#009fe3",
  primaryAlt_100: "#177cc4",
  primaryAlt_200: "#1987d5",
  background: '#171925',
  backgroundAlt: '#282f3f',
  text: '#ccd2e0',
  textAlt: '#b8bece',
  textPrimary: '#009fe3',
  separator: '#303650',
  redSupport: "rgba(255, 3, 8, 0.15)",
  type:'dark'
};

export const useTheme = () => {
  const theme = useSelector((state) => 
    state.themeData.value === 'light' ? lightTheme : darkTheme
  );
  return theme;
};