import "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';
import React from "react";
import { StatusBar, useColorScheme, LogBox } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useSelector } from 'react-redux'

/**
 * ? Local Imports
 */
import Navigation from "./src/navigation";
import { isAndroid } from "@freakycoder/react-native-helpers";


LogBox.ignoreAllLogs();

const App = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  // const reduxState = useSelector((state)=>{
  //  return{
  //   todos:state?.todos
  //  }
  // })
  // console.log("🚀 ~ file: App.tsx:23 ~ reduxState ~ reduxState:", reduxState)

  const data = useSelector((state: any) => {
    const initialData = state.todos
    return initialData
  })
  console.log("🚀 ~ file: App.tsx:37 ~ data ~ data:", data)

  React.useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    if (isAndroid) {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    }

    setTimeout(() => {
      SplashScreen.hide();
    }, 550);
  }, [scheme, isDarkMode]);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Navigation />
      </SafeAreaView>

    </>
  );
};

export default App;
