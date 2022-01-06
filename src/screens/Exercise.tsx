import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {colors} from '../utils';

const Option = (props: {text: string}) => {
  return (
    <View style={optionStyles.option}>
      <Text style={optionStyles.text}>{props.text}</Text>
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

export default function Exercise() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Fill the missing word</Text>
        <Text style={styles.primaryLanguageText}>
          The{' '}
          <Text style={[styles.primaryLanguageText, styles.primaryWord]}>
            house
          </Text>{' '}
          is small.
        </Text>
        <Text style={styles.learningLanguageText}>Das ________ ist klein.</Text>
        <View style={styles.options}>
          <Option text="Hause" />
          <Option text="folgen" />
          <Option text="Schaf" />
          <Option text="Bereiden" />
        </View>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
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
  learningLanguageText: {
    textAlign: 'center',
    fontSize: 24,
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '55%',
    flexWrap: 'wrap',
    margin: 40,
    marginBottom: 130,
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
});
