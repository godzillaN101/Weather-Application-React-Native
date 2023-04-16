import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const API_KEY = '96061bcba7c511677ac9aa1ec5b22b35';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
  }

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  return (
    <ImageBackground source={require('../assets/weather_image.jpg')} style={styles.container}>
      <Text style={styles.heading}>Weather App</Text>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for a city"
          placeholderTextColor="#fff"
          style={styles.searchInput}
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.searchButton} onPress={fetchWeatherData}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {weather && weather["name"] && 
        <View style={styles.weatherContainer}>
        <Text style={styles.cityName}>{weather.name}</Text>
        <Text style={styles.weatherDescription}>{weather.weather[0].description}</Text>
        <Text style={styles.temperature}>{weather.main.temp} °C</Text>
      </View>
      }
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#fff',
    flex: 1,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchButtonText: {
    fontWeight: 'bold',
    color: '#000',
  },
  weatherContainer: {
    flex: 0.5,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  weatherDescription: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default WeatherApp;