import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { handleInitialData } from '../utils/helpers';
import { resetStore } from '../actions';
import Deck from './Deck';
import { ScrollView } from 'react-native-gesture-handler';
import { resetDecks } from '../utils/helpers';
import { bgWhite, darkBlue } from '../utils/colors';

class DeckList extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    resetDeck = () => {
        const { dispatch } = this.props;
        dispatch(resetStore());
        resetDecks();
        dispatch(handleInitialData());
    };

    render() {
        const { decks } = this.props;
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    {Object.values(decks).map((deck) => (
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('Deck View', {
                                    title: deck.title,
                                })
                            }
                            key={deck.title}
                            style={{ flex: 1 }}
                        >
                            <Deck deck={deck} />
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity onPress={this.resetDeck}>
                        <Text style={{ color: darkBlue }}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: bgWhite,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 30,
        height: '100%',
    },
    text: {
        borderColor: 'black',
        borderWidth: 3,
        fontSize: 50,
    },
});

function mapStateToProps(state) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(DeckList);
