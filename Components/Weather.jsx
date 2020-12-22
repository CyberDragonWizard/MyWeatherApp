import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {colors} from '../Utlities/index';
import AppLoading from 'expo-app-loading';
import { 
    useFonts, 
    Hanuman_400Regular
  } from '@expo-google-fonts/hanuman';

const {PRIMARY_COLOR, SECONDARY_COLOR} = colors;

export default function Weather({currentWeather, units}) {
    let [fontsLoaded] = useFonts({
        Hanuman_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    
    const {
        main: { temp },
        weather: [details],
        name,
    } = currentWeather;

    const {icon, main, description} = details;

    const roundTemp = units === 'metric' ? `${Math.round(temp)}°C` : `${Math.round(temp)}°F`

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    const styles = StyleSheet.create({
        weatherInfo: {
            alignItems: 'center',
            fontFamily:'Hanuman_400Regular'
        },
        weatherIcon: {
            width: 100,
            height: 100,
        },
        weatherDescription: {
            textTransform: 'capitalize',
            fontFamily:'Hanuman_400Regular'
        },
        textPrimary: {
            fontSize: 40,
            color: PRIMARY_COLOR,
            fontFamily:'Hanuman_400Regular'
        },
        textSecondary: {
            fontFamily:'Hanuman_400Regular',
            color: SECONDARY_COLOR,
            margin: 10,
            fontSize: 30,
        }
    })

    return (
        <View style={styles.weatherInfo}>
            <Text>{name}</Text>
            <Image style={styles.weatherIcon} source={{uri: iconUrl}}/>
            <Text style={styles.textPrimary}>{roundTemp}</Text>
            <Text style={styles.weatherDescription}>{description}</Text>
            <Text style={styles.textSecondary}>{main}</Text>
            <Text></Text>
        </View>
    )
}


