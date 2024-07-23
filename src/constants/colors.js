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
    default:15
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
  white: "#eff2ff",
  gray: '#B9B9B9',
  purple: '#8B13B1',
  red: "#EE1B1B",
  darkwhite:'#B9B9B9'
};

export const lightTheme = {
  ...baseTheme,
  primary: "#b8bece",
  background: '#ffffff',
  backgroundAlt: '#ebf5ff',
  textTitle: '#141615',
  textAlt: '#7c7c7c',
  textPrimary: '#1571b2',
  type:'light'
};

export const darkTheme = {
  ...baseTheme,
  primary: "#009fe3",
  background: '#171925',
  backgroundAlt: '#171925',
  textTitle: '#ccd2e0',
  textAlt: '#b8bece',
  textPrimary: '#0b98df',
  type:'dark'
};

export const useTheme = () => {
  const theme = useSelector((state) => state.themeData.value === 'light' ? lightTheme : darkTheme);
  return theme;
};