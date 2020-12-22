import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
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
          position: "absolute",
          ...Platform.select({
            ios: {
              top: -30,
            },
            android: {
              top: 50,
            },
          }),
          left: 20,
          height: 50,
          width: 100,
        },
        picker: {
            color: '#006894',
        }
      });

    return (
        <View style={styles.unitsSystem}>
            <Picker style={styles.picker} selectedValue={units} onValueChange={(item) => setUnits(item)} mode='dropdown'>
                <Picker.Item label="F°" value='imperial' />
                <Picker.Item label="C°" value='metric' />
            </Picker>
        </View>
    )
}
