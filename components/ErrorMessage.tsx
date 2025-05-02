import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps): JSX.Element | null {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFCCCC',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: '#D8000C',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
