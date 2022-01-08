import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, breakPhrase} from '../../utils';
import Answer from './Answer';
import Option from './Options';

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

export default function Exercise() {
  const [selected, setSelected] = React.useState<{
    id: number;
    word: string;
  } | null>(null);
  const [answer, setAnswer] = React.useState<number | null>(null);

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
              style={styles.selected}
              disabled={answer !== null}
              onPress={() => setSelected(null)}>
              <Text style={styles.selectedText}>{selected.word}</Text>
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
        <Answer
          disabled={selected === null}
          onPress={() => (selected ? setAnswer(selected.id) : null)}
          correctWord={
            options.filter(word => word.id === correctWordId)[0].word
          }
          correctWordId={correctWordId}
          answer={answer}
        />
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
  selected: {
    display: 'flex',
    borderRadius: 16,
    margin: 8,
    padding: 16,
    backgroundColor: colors.white,
  },
  selectedText: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});
