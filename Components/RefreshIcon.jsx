import React from 'react'
import { View, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

export default function RefreshIcon({load}) {
    const styles = StyleSheet.create({
        icon: {
            position: 'absolute',
            ...Platform.select({
                ios: {
                  top: -30,
                },
                android: {
                  top: 65,
                },
            }),
            right: 20,
        }
    });

    const refreshIcon = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh';

    return (
        <View style={styles.icon}>
            <Ionicons onPress={load} name={refreshIcon} size={28} color="#006894" />
        </View>
    )
}
