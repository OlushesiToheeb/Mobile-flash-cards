import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ActionButton from './ActionButton';
import { orange, lightOrange, darkBlue, white, bgWhite } from '../utils/colors';
import { connect } from 'react-redux';
import Deck from './Deck';
import { removeDeck } from '../actions';
import { deleteDeck } from '../utils/helpers';

class DeckView extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.deck !== undefined;
    }

    addCard = () => {
        const { navigation, route } = this.props;
        navigation.navigate('Add Card', {
            title: route.params.title,
        });
    };

    startQuiz = () => {
        const { navigation, route } = this.props;
        navigation.navigate('Quiz', {
            title: route.params.title,
        });
    };

    handleRemoveDeck = () => {
        const { title, deck, navigation, dispatch } = this.props;
        dispatch(removeDeck(title));
        deleteDeck(deck.title);
        navigation.goBack();
    };

    render() {
        const { deck } = this.props;
        return (
            <View style={styles.container}>
                <View>
                    <Deck deck={deck} style={{ height: 300 }} />
                </View>
                <ActionButton
                    onPress={this.startQuiz}
                    style={[styles.deckBtn, { backgroundColor: orange }]}
                    color={white}
                >
                    Start Quiz
                </ActionButton>
                <ActionButton
                    onPress={this.addCard}
                    style={[styles.deckBtn, { backgroundColor: lightOrange }]}
                    color={darkBlue}
                >
                    Add New Card
                </ActionButton>
                <TouchableOpacity
                    onPress={this.handleRemoveDeck}
                    style={styles.removeBtn}
                >
                    <Text style={{ color: darkBlue }}>Delete Deck</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: bgWhite,
        paddingTop: 30,
    },
    deckBtn: {
        padding: 20,
        width: 300,
        marginBottom: 30,
        borderRadius: 5,
    },
});

const mapStateToProps = (state, { route }) => {
    const { title } = route.params;
    return {
        deck: state[title],
        title,
    };
};

export default connect(mapStateToProps)(DeckView);
