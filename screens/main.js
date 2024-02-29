import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";
import LoactionPicker from "../components/Places/LocationPicker";
import { Colors } from "../constants/colors";

const AirPollutionComponent = () => {
  const [airPollutionData, setAirPollutionData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [pickedLocation, setPickedLocation] = useState();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${37.61934022118293}&lon=${126.84345505721909}&appid=${"c126b481d55e7b9043ca06710440fc55"}`
        );
        const { main, weather, wind, rain } = response.data;
        const weatherInfo = {
          temperature: main.temp - 273.15, // Kelvin to Celsius conversion
          humidity: main.humidity,
          weatherCondition: weather[0].main,
          windSpeed: wind.speed,
          rainVolume: rain ? rain["1h"] : 0,
        };
        setWeatherData(weatherInfo);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const fetchAirPollutionData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${37.61934022118293}&lon=${126.84345505721909}&appid=${"c126b481d55e7b9043ca06710440fc55"}`
        );
        setAirPollutionData(response.data);
      } catch (error) {
        console.error("Error fetching air pollution data:", error);
      }
    };

    fetchWeatherData();
    fetchAirPollutionData();

    // Cleanup functions to clear data when component unmounts
    return () => {
      setWeatherData(null);
      setAirPollutionData(null);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  // Function to determine appropriate icon based on air quality index
  const getIconForAirQuality = (index) => {
    switch (index) {
      case 1:
        return <Icon name="smile" size={20} />;
      case 2:
        return <Icon name="meh" size={20} />;
      case 3:
        return <Icon name="frown" size={20} />;
      case 4:
        return <Icon name="sad-cry" size={20} />;
      case 5:
        return <Icon name="angry" size={20} />;
      default:
        return <Icon name="smile" size={20} />;
    }
  };

  return (
    <View style={styles.container}>
      {weatherData && (
        <View style={styles.weatherSection}>
          <Text style={styles.headerText}>현재위치</Text>
          <Text style={styles.locationText}>
            대한민국 경기도 고양시 덕양구 행신동 741-14
          </Text>
          {weatherData.weatherCondition === "Clear" ? (
            <View style={styles.clearContainer}>
              <Icon
                name="sun"
                size={60}
                style={[styles.clearIcon, { color: Colors.primary700 }]}
              />
              <Text style={[styles.clearText, { color: Colors.primary700 }]}>
                {weatherData.temperature.toFixed(2)}°C
              </Text>
            </View>
          ) : (
            <View style={styles.weatherContainer}>
              <Text style={[styles.weatherText, { color: Colors.primary700 }]}>
                <Icon name="sun" size={20} /> 날씨:{" "}
                {weatherData.weatherCondition}
              </Text>
              <Text style={[styles.weatherText, { color: Colors.primary700 }]}>
                <Icon name="temperature-high" size={20} /> 온도:{" "}
                {weatherData.temperature.toFixed(2)}°C
              </Text>
            </View>
          )}
        </View>
      )}
      <View style={styles.separator} />
      <View style={styles.sectionPoultion}>
        <Text style={styles.headerText}>대기 오염 정보</Text>
        <View style={styles.pollutionContainer}>
          <View style={styles.pollutionRow}>
            <Text style={styles.pollutionLabel}>
              <Icon name="smile" size={20} /> 아황산가스(SO2) :
            </Text>
            <Text style={styles.pollutionValue}>
              {airPollutionData?.list[0]?.components.so2}
            </Text>
          </View>
          <View style={styles.pollutionRow}>
            <Text style={styles.pollutionLabel}>
              <Icon name="meh" size={20} /> 이산화질소(NO2) :
            </Text>
            <Text style={styles.pollutionValue}>
              {airPollutionData?.list[0]?.components.no2}
            </Text>
          </View>
          <View style={styles.pollutionRow}>
            <Text style={styles.pollutionLabel}>
              <Icon name="meh-rolling-eyes" size={20} />
              미세먼지(PM10) :
            </Text>
            <Text style={styles.pollutionValue}>
              {airPollutionData?.list[0]?.components.pm10}
            </Text>
          </View>
          <View style={styles.pollutionRow}>
            <Text style={styles.pollutionLabel}>
              <Icon name="frown" size={20} /> 초미세먼지(PM2.5) :
            </Text>
            <Text style={styles.pollutionValue}>
              {airPollutionData?.list[0]?.components.pm2_5}
            </Text>
          </View>
          <View style={styles.pollutionRow}>
            <Text style={styles.pollutionLabel}>
              <Icon name="angry" size={20} /> 오존(O3) :
            </Text>
            <Text style={styles.pollutionValue}>
              {airPollutionData?.list[0]?.components.o3}
            </Text>
          </View>
          <View style={styles.pollutionRow}>
            <Text style={styles.pollutionLabel}>
              <Icon name="smile" size={20} /> 일산화탄소(CO) :
            </Text>
            <Text style={styles.pollutionValue}>
              {airPollutionData?.list[0]?.components.co}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#BDE0FE",
  },
  weatherSection: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  weatherContainer: {
    alignItems: "center",
  },
  clearContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  clearIcon: {
    color: "#fff",
  },
  clearText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  locationText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  weatherText: {
    color: "#333",
    fontSize: 16,
    marginBottom: 5,
  },
  sectionPoultion: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pollutionContainer: {
    marginTop: 10,
  },
  pollutionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  pollutionLabel: {
    fontSize: 16,
    color: "#333",
  },
  pollutionValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  separator: {
    backgroundColor: "#ffffff",
    height: 1,
    width: "100%",
    marginBottom: 20,
  },
});

export default AirPollutionComponent;
