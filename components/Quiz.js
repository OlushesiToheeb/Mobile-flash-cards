import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
    bgWhite,
    darkBlue,
    lightBlue,
    lightOrange,
    orange,
    white,
} from '../utils/colors';
import {
    setLocalNotification,
    clearLocalNotification,
} from '../utils/notification.js';
import QuizIsEmpty from './QuizIsEmpty';
import ActionButton from './ActionButton';

class Quiz extends Component {
    state = {
        questionIndex: 0,
        showAnswer: false,
        correct: 0,
        incorrect: 0,
    };

    toggleQuestionAnswerHandler = () => {
        this.setState((preState) => ({
            showAnswer: !preState.showAnswer,
        }));
    };

    handleUserAnswer = (answer) => {
        if (
            this.state.showAnswer === true &&
            this.state.questionIndex !== this.props.deck.questions.length - 1
        ) {
            this.setState((prevState) => ({
                showAnswer: !prevState.showAnswer,
            }));
        }
        if (answer === 'correct') {
            this.setState((prevState) => ({
                correct: prevState.correct + 1,
            }));
        } else {
            this.setState((prevState) => ({
                incorrect: prevState.incorrect + 1,
            }));
        }
        this.setState(
            (prevState) => ({
                questionIndex: prevState.questionIndex + 1,
            }),
            () => {
                const { questionIndex } = this.state;
                const { questions } = this.props.deck;

                if (questionIndex === questions.length) {
                    clearLocalNotification().then(setLocalNotification);
                }
            }
        );
    };

    restartQuiz = () => {
        this.setState({
            questionIndex: 0,
            showAnswer: false,
            correct: 0,
            incorrect: 0,
        });
    };

    goBack = () => this.props.navigation.goBack();

    render() {
        const { deck } = this.props;
        const { showAnswer, incorrect, correct, questionIndex } = this.state;

        if (deck.questions.length === 0) {
            return (
                <View style={styles.isEmptyContainer}>
                    <Text style={styles.isEmptyText}>
                        Sorry you cannot take a quiz because there are no cards
                        in this deck.
                    </Text>

                    <ActionButton
                        onPress={this.goBack}
                        style={[
                            styles.isEmptybackBtn,
                            { backgroundColor: lightBlue },
                        ]}
                        color={darkBlue}
                    >
                        Back
                    </ActionButton>
                </View>
            );
        }

        if (questionIndex === deck.questions.length) {
            return (
                <View style={styles.compeletedContainer}>
                    <Text style={styles.compeletedmessage}>
                        You got {correct} out of {deck.questions.length} !
                    </Text>
                    {correct > incorrect ? (
                        <Text style={{ fontSize: 90 }}>🤩🤩</Text>
                    ) : (
                        <Text style={{ fontSize: 90 }}>😔😔</Text>
                    )}

                    <View>
                        <ActionButton
                            onPress={this.restartQuiz}
                            style={[
                                styles.compeletedbackBtn,
                                { backgroundColor: darkBlue },
                            ]}
                            color={white}
                        >
                            Try Again
                        </ActionButton>

                        <ActionButton
                            onPress={this.goBack}
                            style={[
                                styles.compeletedbackBtn,
                                { backgroundColor: lightBlue },
                            ]}
                            color={darkBlue}
                        >
                            Back
                        </ActionButton>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {deck.questions.map((question, index) => {
                    if (questionIndex === index) {
                        return (
                            <View key={index}>
                                <View
                                    style={{
                                        marginTop: -200,
                                    }}
                                >
                                    <View
                                        style={{
                                            alignItems: 'flex-start',
                                            marginBottom: 10,
                                            marginLeft: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                color: darkBlue,
                                            }}
                                        >
                                            {index + 1} /{' '}
                                            {deck.questions.length}
                                        </Text>
                                    </View>
                                    {showAnswer ? (
                                        <View
                                            style={[
                                                styles.questionContainer,
                                                {
                                                    backgroundColor:
                                                        lightOrange,
                                                },
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.questionText,
                                                    { color: darkBlue },
                                                ]}
                                            >
                                                {question.answer}
                                            </Text>
                                        </View>
                                    ) : (
                                        <View
                                            style={[
                                                styles.questionContainer,
                                                { backgroundColor: orange },
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.questionText,
                                                    { color: white },
                                                ]}
                                            >
                                                {question.question}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        );
                    }
                })}
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.toggleQuestionAnswerHandler}
                >
                    <Text style={styles.textStyle}>
                        {showAnswer ? 'Show Answer' : 'Show Question'}
                    </Text>
                </TouchableOpacity>
                <ActionButton
                    onPress={() => this.handleUserAnswer('correct')}
                    style={[styles.actionBtn, { backgroundColor: darkBlue }]}
                    color={white}
                >
                    Correct
                </ActionButton>
                <ActionButton
                    onPress={() => this.handleUserAnswer('incorrect')}
                    style={[styles.actionBtn, { backgroundColor: lightBlue }]}
                    color={darkBlue}
                >
                    Incorrect
                </ActionButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgWhite,
    },
    questionContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        maxWidth: '100%',
        marginBottom: 20,
        borderRadius: 10,
        height: 300,
    },
    questionText: {
        fontSize: 25,
        paddingTop: 8,
        paddingLeft: 8,
        lineHeight: 30,
        textAlign: 'center',
    },
    textStyle: {
        color: darkBlue,
        textAlign: 'center',
        padding: 5,
        fontSize: 18,
    },
    button: {
        borderRadius: 6,
        padding: 10,
    },
    actionBtn: {
        padding: 20,
        width: 300,
        marginTop: 30,
        borderRadius: 10,
    },

    compeletedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: bgWhite,
    },
    compeletedText: {
        textAlign: 'center',
        fontSize: 20,
    },
    compeletedbackBtn: {
        padding: 20,
        width: 200,
        marginBottom: 15,
        marginTop: 12,
        borderRadius: 15,
    },
    compeletedmessage: {
        fontSize: 30,
        color: darkBlue,
        marginTop: -50,
        marginBottom: 20,
        textAlign: 'center',
    },
    isEmptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: bgWhite,
    },
    isEmptyText: {
        textAlign: 'center',
        fontSize: 20,
    },
    isEmptybackBtn: {
        padding: 20,
        width: 250,
        marginTop: 30,
        borderRadius: 15,
    },
});

const mapStateToProps = (state, { route }) => {
    const { title } = route.params;
    return {
        deck: state[title],
    };
};

export default connect(mapStateToProps)(Quiz);
