import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({ onPress, children, style, color, disabled }) {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                style={style}
                disabled={disabled}
            >
                <Text style={[styles.text, { color: color }]}>{children}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
    },
});
