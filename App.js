import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllPlaces from "./screens/AllPlaces";
import IconButton from "./components/UI/IconButton";
import AddPlace from "./screens/AddPlace";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { useEffect, useState } from "react";
import { dropTable, init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import PlaceDetails from "./screens/PlaceDetails";
import AirPollutionComponent from "./screens/main";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
        SplashScreen.hideAsync();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!dbInitialized) {
    SplashScreen.preventAutoHideAsync();
    return <View style={{ flex: 1, backgroundColor: "white" }} />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: "#BDE0FE" },
          }}
        >
          <Stack.Screen
            name="AirPollutionComponent"
            component={AirPollutionComponent}
            options={({ navigation }) => ({
              title: "미세먼지정보",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add-circle-outline"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AllPlaces")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "장소등록",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "Add a new Places",
            }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              title: "Loading Place...",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

/*

        */
