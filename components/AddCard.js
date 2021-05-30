import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bgWhite, darkBlue, white } from '../utils/colors';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import ActionButton from './ActionButton';
import { addCard } from '../actions';
import { addCardToDeck } from '../utils/helpers';

class AddCardScreen extends Component {
    state = {
        question: '',
        answer: '',
    };

    handleQuestionChange = (value) => {
        this.setState({
            question: value,
        });
    };

    handleAnswerChange = (value) => {
        this.setState({
            answer: value,
        });
    };

    handleSubmit = () => {
        const { question, answer } = this.state;
        const { title } = this.props.route.params;
        this.props.dispatch(addCard(title, { question, answer }));
        addCardToDeck(title, { question, answer });
        this.props.navigation.goBack();
        this.setState({
            question: '',
            answer: '',
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.block]}>
                    <Text style={styles.label}>Enter a New Question</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.question}
                        onChangeText={this.handleQuestionChange}
                        placeholder='Enter Question...'
                        autoFocus={true}
                        returnKeyType='next'
                        blurOnSubmit={false}
                        onSubmitEditing={() => this.answerTextInput.focus()}
                    />
                </View>
                <View style={[styles.block]}>
                    <Text style={styles.label}>
                        Enter the Answer to the Question
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.answer}
                        onChangeText={this.handleAnswerChange}
                        placeholder='Enter Answer...'
                        returnKeyType='done'
                        onSubmitEditing={this.handleSubmit}
                        ref={(input) => {
                            this.answerTextInput = input;
                        }}
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
                    color={white}
                    disabled={
                        this.state.question === '' || this.state.answer === ''
                    }
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
        borderRadius: 15,
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

export default connect()(AddCardScreen);
