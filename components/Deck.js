import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Deck({ deck, style }) {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.deckTitle}>{deck.title}</Text>
            <Text style={[styles.deckCards]}>
                {deck.questions.length}{' '}
                {deck.questions.length > 1 ? 'cards' : 'card'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#CDF2FC',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        maxWidth: '100%',
        marginBottom: 30,
        borderRadius: 10,
    },
    deckTitle: {
        fontSize: 35,
        marginBottom: 2,
        color: '#022B69',
    },
    deckCards: {
        fontSize: 18,
        color: 'gray',
    },
});
