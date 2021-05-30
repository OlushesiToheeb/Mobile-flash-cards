import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import ActionButton from './ActionButton';
import { bgWhite, darkBlue, white } from '../utils/colors';
import { saveDeckTitle } from '../utils/helpers';

class AddDeckScreen extends Component {
    state = {
        deckTitle: '',
    };

    handleChange = (value) => {
        this.setState({
            deckTitle: value,
        });
    };

    handleSubmit = () => {
        const { deckTitle } = this.state;
        const { dispatch } = this.props;
        dispatch(addDeck(deckTitle));
        saveDeckTitle(deckTitle);
        this.toDeck(deckTitle);
        this.setState({
            deckTitle: '',
        });
    };

    toDeck = (deckTitle) => {
        this.props.navigation.navigate('Deck View', { title: deckTitle });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.block]}>
                    <Text style={styles.label}>
                        What is the title of your new deck?
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.deckTitle}
                        onChangeText={this.handleChange}
                        placeholder='Enter new deck title'
                        autoFocus={false}
                        blurOnSubmit={false}
                        onSubmitEditing={Keyboard.dismiss}
                    />
                </View>
                <ActionButton
                    onPress={this.handleSubmit}
                    style={[
                        styles.deckBtn,
                        {
                            backgroundColor: darkBlue,
                            width: 300,
                            padding: 15,
                        },
                    ]}
                    disabled={this.state.deckTitle === ''}
                    color={white}
                >
                    Submit
                </ActionButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 100,
        backgroundColor: bgWhite,
    },
    deckBtn: {
        padding: 10,
        width: 200,
        marginBottom: 30,
        borderRadius: 5,
    },
    block: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        fontSize: 20,
        height: 40,
        width: 300,
        marginBottom: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
});

export default connect()(AddDeckScreen);
