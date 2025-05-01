import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from '../components/LoginScreen';

export default function Index() {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
