import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { router } from 'expo-router';
import ErrorMessage from '@/components/ErrorMessage';

export default function GetAge(): JSX.Element {
  const [idade, setIdade] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleGetAge = (): void => {
    if (!idade.trim()) {
      setError('Por favor, preencha o campo.');
      return;
    }

    setError('');
    router.push('/home');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Logo.png')} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.information}>
          Para que possamos calibrar o aplicativo, favor digite a sua idade
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Idade"
          placeholderTextColor="#666"
          value={idade}
          onChangeText={(text: string) => setIdade(text)}
          keyboardType="numeric"
        />

        {error ? <ErrorMessage message={error} /> : null}

        <TouchableOpacity onPress={handleGetAge} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>

      <Text>&copy; 2024 Conheço uma Ponte. All rights reserved.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  card: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  information: {
    fontSize: 16,
    marginBottom: 15,
    color: '#222',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#DDD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 14,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#49AD78',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  primaryButtonText: {
    color: '#060609',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold',
  },
});
