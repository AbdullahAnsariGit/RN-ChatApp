import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
import { LightTheme } from "@theme/themes";
// ? Screens
import DetailScreen from "@screens/detail/DetailScreen";
import Login from "@screens/authstack/login/Login";
import Register from "@screens/authstack/register/Register";
import SplashScreen from "@screens/authstack/splash/Splash";
import Chatlist from "@screens/appstack/chat/chatlist/Chatlist";
import Chatscreen from "@screens/appstack/chat/chatscreen/Chatscreen";
import BooksListApp from "@screens/appstack/todo/Todo";

// ? If you want to use stack or tab or both
const Stack = createStackNavigator();

const Navigation = () => {
  const [token, setToken] = useState<string | null>(null);
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  useEffect(() => {
    AsyncStorage.getItem('USERID')
      .then(result => {
        const userID = JSON.parse(result).userId;
        console.log('userID', userID);
        setToken(userID);
      })
      .catch(error => {
        console.log('Error retrieving user ID from AsyncStorage:', error);
      });

    return () => {
      isReadyRef.current = false;
    };
  }, []);


  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={LightTheme}
    > 
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token == null ? (
          <>
            <Stack.Screen name={SCREENS.SPLASHSCREEN} component={SplashScreen} />
            <Stack.Screen name={SCREENS.LOGIN} component={Login} />
            <Stack.Screen name={SCREENS.REGISTER} component={Register} />
            <Stack.Screen name={SCREENS.DETAIL} component={DetailScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name={SCREENS.TODO} component={BooksListApp} />
            <Stack.Screen name={SCREENS.CHATLIST} component={Chatlist} />
            <Stack.Screen name={SCREENS.CHATSCREEN} component={Chatscreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
