import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../../utils';

type AnswerProps = {
  answer: number | null;
  correctWord: string;
  correctWordId: number;
  disabled: boolean;
  onPress: () => void | null;
};

const Answer = ({
  answer,
  correctWord,
  correctWordId,
  disabled,
  onPress,
}: AnswerProps) => {
  const thereIsAnswer = answer !== null;
  const isAnswerCorrect = answer === correctWordId;

  const getColor = () =>
    answer === correctWordId ? colors.secondary : colors.pink;

  const answerStyle = {
    backgroundColor: thereIsAnswer ? getColor() : 'transparent',
  };

  const answerButtonStyle = answer !== null && {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  };

  const answerButtonTextStyle =
    answer !== null
      ? {
          color: getColor(),
        }
      : null;
  return (
    <View style={[styles.resultContainer, answerStyle]}>
      {answer !== null && (
        <Text style={styles.resultText}>
          {isAnswerCorrect
            ? 'Great job!'
            : `Wrong! Correct answer: ${correctWord}`}
        </Text>
      )}
      <TouchableOpacity
        style={[styles.button, answerButtonStyle]}
        disabled={disabled}
        onPress={onPress}>
        <Text style={[styles.buttonText, answerButtonTextStyle]}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    padding: 18,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.4)',
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: colors.white,
    fontWeight: 'bold',
  },
  resultContainer: {
    display: 'flex',
    flex: 1,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 20,
  },
  resultText: {
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 40,
  },
});

export default Answer;
