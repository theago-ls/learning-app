import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../utils';

type OptionsProps = {text: string; isSelected: boolean; onTap: () => void};

const Option = ({text, isSelected, onTap}: OptionsProps) => {
  const selectedStyles = [
    {opacity: isSelected ? 0.3 : 1},
    {opacity: isSelected ? 0 : 1},
  ];

  return (
    <View style={selectedStyles[0]}>
      <TouchableOpacity style={optionStyles.option} onPress={onTap}>
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
              text={option.word}
              isSelected={selected?.id === option.id}
              onTap={() => setSelected(option)}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
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
    padding: 8,
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
    position: 'absolute',
    bottom: 80,
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: colors.white,
    fontWeight: 'bold',
  },
});
