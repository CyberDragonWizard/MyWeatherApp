import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../Utlities/index';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR} = colors

export default function WeatherInfo({currentWeather, units}) {

    const {
        main: { feels_like, humidity, pressure },
        wind: { speed }
    } = currentWeather;

    const windSpeed = units === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/hour`

    const styles = StyleSheet.create({
        weatherDetails: {
            marginTop: 'auto',
            margin: 15,
            borderWidth: 2,
            borderColor: BORDER_COLOR,
            borderRadius: 8,
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        box: {
            flex: 1,
            padding: 20
        },
        items: {
            alignItems: 'flex-end',
            justifyContent: 'flex-end'
        },
        textSecondary: {
            fontSize: 15,
            color: PRIMARY_COLOR,
            margin: 1
        }
    })
    return (
        <View style={styles.weatherDetails}>
            <View style={styles.row}>
                <View style={{ ...styles.box, borderRightWidth: 2, borderRightColor: BORDER_COLOR}}>
                    <View style={styles.row}>
                        <FontAwesome5 name='temperature-low' size={25} color={SECONDARY_COLOR} />
                        <View style={styles.items}>
                            <Text>Feels Like: </Text>
                            <Text style={styles.textSecondary}>{feels_like}</Text>
                        </View>
                    </View >
                </View>
                <View style={styles.box}>
                <View style={styles.row}>
                        <MaterialCommunityIcons name='water' size={32} color={SECONDARY_COLOR} />
                        <View style={styles.items}>
                            <Text>Humidity: </Text>
                            <Text style={styles.textSecondary}>{humidity} %</Text>
                        </View>
                    </View >
                </View>
            </View>
            <View style={{ ...styles.row, borderTopWidth: 1, borderTopColor: BORDER_COLOR}}>
                <View style={{ ...styles.box, borderRightWidth: 2, borderRightColor: BORDER_COLOR}}>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name='weather-windy' size={30} color={SECONDARY_COLOR} />
                        <View style={styles.items}>
                            <Text>Wind: </Text>
                            <Text style={styles.textSecondary}>{windSpeed}</Text>
                        </View>
                    </View >
                </View>
                <View style={styles.box}>
                <View style={styles.row}>
                        <MaterialCommunityIcons name='speedometer' size={32} color={SECONDARY_COLOR} />
                        <View style={styles.items}>
                            <Text>Pressure: </Text>
                            <Text style={styles.textSecondary}>{pressure} hPa</Text>
                        </View>
                    </View >
                </View>
            </View>
        </View>
    )
}
