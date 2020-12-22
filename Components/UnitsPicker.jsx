import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import AppLoading from 'expo-app-loading';
import { 
    useFonts, 
    Hanuman_400Regular
  } from '@expo-google-fonts/hanuman';

export default function UnitsPicker({units, setUnits}) {

    let [fontsLoaded] = useFonts({
        Hanuman_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const styles = StyleSheet.create({
        unitsSystem: {
            position: 'absolute',
            top: 100,
            left: 20,
            height: 50,
            width: 80,
        },
        unit: {
            fontFamily:'Hanuman_400Regular',
            fontSize: 800,
        }
    });

    return (
        <View style={styles.unitsSystem}>
            <Picker style={styles.unit} selectedValue={units} onValueChange={(item) => setUnits(item)}>
                <Picker.Item style={styles.unit} label="C°" value='metric' />
                <Picker.Item style={styles.unit} label="F°" value='imperial' />
            </Picker>
        </View>
    )
}
