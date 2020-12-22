import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function Header() {
    const styles = StyleSheet.create({
        header: {
            height: 50,
            width: '100%',
            backgroundColor: '#54c79b',
            top: 50,
        },
    });

    return (
        <View style={styles.header}>
        </View>
    )
}
