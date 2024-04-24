import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const apikey = "56a19bacfd850426f1828fbcea369381";

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fetch weather data for current location when component mounts
    fetchWeatherByLocation();
  }, []);

  const fetchWeatherByLocation = async () => {
    // Replace with React Native's Geolocation API to get current location coordinates
    const latitude = 0; // Replace with latitude
    const longitude = 0; // Replace with longitude

    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;

    fetchWeatherData(url);
  };

  const fetchWeatherByCity = async () => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    fetchWeatherData(url);
    setCity('');
  };

  const fetchWeatherData = async (url) => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>WEATHER APP</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity style={styles.searchButton} onPress={fetchWeatherByCity}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{weatherData.name}, {weatherData.sys.country}</Text>
          <View style={styles.tempBox}>
            <Image style={styles.weatherIcon} source={{ uri: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` }} />
            <Text style={styles.temperature}>{Math.floor(weatherData.main.temp - 273)} °C</Text>
          </View>
          <Text style={styles.clouds}>{weatherData.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: 'rgb(214, 147, 45)',
    textDecorationLine: 'underline',
    fontFamily: 'Orbitron',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 5,
    borderRadius: 15,
    backgroundColor: 'aliceblue',
  },
  searchButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: 'cadetblue',
    borderRadius: 15,
  },
  searchButtonText: {
    color: 'aliceblue',
    fontSize: 17,
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  city: {
    fontSize: 30,
  },
  tempBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  weatherIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(240, 248, 255, 0.408)',
  },
  temperature: {
    fontSize: 50,
    marginLeft: 30,
    marginBottom: 10,
  },
  clouds: {
    fontSize: 20,
    backgroundColor: 'rgba(153, 205, 50, 0.778)',
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
});

export default App;
