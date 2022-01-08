import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../utils';

type OptionsProps = {
  text: string;
  isSelected: boolean;
  disabled: boolean;
  onTap: () => void;
};

const Option = ({text, isSelected, disabled, onTap}: OptionsProps) => {
  const selectedStyles = [
    {opacity: isSelected ? 0.3 : 1},
    {opacity: isSelected ? 0 : 1},
  ];

  return (
    <View style={selectedStyles[0]}>
      <TouchableOpacity
        disabled={disabled}
        style={optionStyles.option}
        onPress={onTap}>
        <Text style={[optionStyles.text, selectedStyles[1]]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const optionStyles = StyleSheet.create({
  option: {
    display: 'flex',
    borderRadius: 16,
    margin: 8,
    padding: 16,
    backgroundColor: colors.white,
  },
  text: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});

const options = [
  {id: 0, word: 'Hause'},
  {id: 1, word: 'folgen'},
  {id: 2, word: 'Schaf'},
  {id: 3, word: 'Bereiden'},
];

const primaryWords = [
  {
    id: 0,
    word: 'The',
  },
  {
    id: 1,
    word: 'house',
  },
  {
    id: 2,
    word: 'is',
  },
  {
    id: 3,
    word: 'small',
  },
];

const learningWords = [
  {
    id: 0,
    word: 'Das',
  },
  {
    id: 1,
    word: null,
  },
  {
    id: 2,
    word: 'ist',
  },
  {
    id: 3,
    word: 'klein',
  },
];

const primaryWordId = 1;
const learningWordId = 1;
const correctWordId = 0;

const breakPhrase = (
  words: {id: number; word: string | null}[],
  pivotId: number,
) => {
  const before = words
    .slice(
      0,
      words.findIndex(word => word.id === pivotId),
    )
    .map(({word}) => word)
    .join(' ');

  const after = words
    .filter(word => word.id > pivotId)
    .map(word => word.word)
    .join(' ');

  const pivot = words.find(word => word.id === pivotId)?.word;

  return {before, after, pivot};
};

export default function Exercise() {
  const [selected, setSelected] = React.useState<{
    id: number;
    word: string;
  } | null>(null);
  const [answer, setAnswer] = React.useState<number | null>(null);

  const answerStyle = {
    backgroundColor:
      answer !== null
        ? answer === correctWordId
          ? colors.secondary
          : colors.pink
        : 'transparent',
  };

  const answerButtonStyle =
    answer !== null
      ? {
          backgroundColor: colors.white,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        }
      : null;

  const answerButtonTextStyle =
    answer !== null
      ? {
          color: answer === correctWordId ? colors.secondary : colors.pink,
        }
      : null;

  const {
    before: beforePrimary,
    after: afterPrimary,
    pivot: primary,
  } = breakPhrase(primaryWords, primaryWordId);

  const {before: beforeLearning, after: afterLearning} = breakPhrase(
    learningWords,
    learningWordId,
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Fill the missing word</Text>
        <Text style={styles.primaryLanguageText}>
          {beforePrimary}{' '}
          <Text style={[styles.primaryLanguageText, styles.primaryWord]}>
            {primary}
          </Text>{' '}
          {afterPrimary}
        </Text>
        <View style={[styles.learningLanguageContainer]}>
          <Text style={styles.learningLanguageText}>{beforeLearning}</Text>
          {selected ? (
            <TouchableOpacity
              style={optionStyles.option}
              disabled={answer !== null}
              onPress={() => setSelected(null)}>
              <Text style={optionStyles.text}>{selected.word}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.underline}>________</Text>
          )}
          <Text style={styles.learningLanguageText}>{afterLearning}</Text>
        </View>
        <View style={styles.options}>
          {options.map(option => (
            <Option
              key={option.id}
              disabled={answer !== null}
              text={option.word}
              isSelected={selected?.id === option.id}
              onTap={() => setSelected(option)}
            />
          ))}
        </View>
        <View style={[styles.resultContainer, answerStyle]}>
          {answer !== null && (
            <Text style={styles.resultText}>
              {answer === correctWordId
                ? 'Great job!'
                : `Wrong! Correct answer: ${
                    options.filter(word => word.id === correctWordId)[0].word
                  }`}
            </Text>
          )}
          <TouchableOpacity
            style={[styles.button, answerButtonStyle]}
            disabled={selected === null}
            onPress={() => (selected ? setAnswer(selected.id) : null)}>
            <Text style={[styles.buttonText, answerButtonTextStyle]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: colors.secondary,
    height: '100%',
    justifyContent: 'flex-end',
  },
  content: {
    display: 'flex',
    backgroundColor: colors.primary,
    height: '80%',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 40,
  },
  primaryLanguageText: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 30,
    color: colors.white,
  },
  primaryWord: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  learningLanguageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    height: '15%',
  },
  learningLanguageText: {
    textAlign: 'center',
    fontSize: 24,
    marginHorizontal: 10,
  },
  underline: {
    marginBottom: -12,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '55%',
    flexWrap: 'wrap',
    margin: 40,
  },
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
