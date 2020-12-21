import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import Weather from './Components/Weather'

const WEATHER_API_KEY = '56cf9d89021d6fa5f6f11dc98cce6f6c';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {
 const [errorMessage, setErrorMessage] = useState(null);
 const [currentWeather, setCurrentWeather] = useState(null);
 const [units, setUnits] = useState('imperial')

  useEffect(() => {
    load()
  }, [])
    async function load() {
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
    const { main : {temp}} = currentWeather
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <Weather currentWeather={currentWeather}/>
        </View>
      </View>
    )} else {
      return (
        <View style={styles.container}>
          <Text>{errorMessage}</Text>
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
