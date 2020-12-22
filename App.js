import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState }  from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import Weather from './Components/Weather';
import { WEATHER_API_KEY } from 'react-native-dotenv';
import Picker from './Components/UnitsPicker';
import { colors } from './Utlities/index';
import RefreshIcon from './Components/RefreshIcon';
import WeatherInfo from './Components/WeatherInfo'

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {
 const [errorMessage, setErrorMessage] = useState(null);
 const [currentWeather, setCurrentWeather] = useState(null);
 const [units, setUnits] = useState('imperial');

  useEffect(() => {
    load()
  }, [units])
    async function load() {
      setCurrentWeather(null);
      setErrorMessage(null);
      try {
        let { status } = await Location.requestPermissionsAsync();

        if(status !== 'granted') {
          setErrorMessage('Location access is needed for this app.')
          return
        }
        const location = await Location.getCurrentPositionAsync();

        const {latitude, longitude} = location.coords

        const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${units}&appid=${WEATHER_API_KEY}`;

        const response = await fetch(weatherURL);

        const result = await response.json();

        if(response.ok) {
          setCurrentWeather(result)
        } else {
          setErrorMessage(result.message)
        }

      } catch (error) {
        setErrorMessage(error.message)
      }
    }

  if(currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <Picker units={units} setUnits={setUnits}/>
          <RefreshIcon load={load}/>
          <Weather currentWeather={currentWeather} units={units}/>
        </View>
        <WeatherInfo currentWeather={currentWeather} units={units}/>
      </View>
    )} else if (errorMessage) {
      return (
        <View style={styles.container}>
          <Text>{errorMessage}</Text>
          <StatusBar style="auto" />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' color={colors.PRIMARY_COLOR}/>
          <StatusBar style="auto" />
        </View>
      )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  }
});
