import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { bgWhite, darkBlue, lightBlue } from '../utils/colors';
import { ActionButton } from './ActionButton';

export default function QuizIsEmpty({ goBack }) {
    return (
        <View style={styles.Container}>
            <Text style={styles.Text}>
                Sorry you cannot take a quiz because there are no cards in this
                deck.
            </Text>

            <ActionButton
                onPress={goBack}
                style={[styles.backBtn, { backgroundColor: lightBlue }]}
                color={darkBlue}
            >
                Back
            </ActionButton>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: bgWhite,
    },
    Text: {
        textAlign: 'center',
        fontSize: 30,
    },
    backBtn: {
        padding: 20,
        width: 250,
        marginTop: 30,
        borderRadius: 15,
    },
});
