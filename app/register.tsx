import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import ErrorMessage from '@/components/ErrorMessage';

export default function Register() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (): void => {
    if (!nome || !idade || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    router.push('/home');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Logo.png')} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.welcome}>Bem vindo(a)</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#666"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Idade"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={idade}
          onChangeText={setIdade}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          placeholderTextColor="#666"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {error ? <ErrorMessage message={error}/> : null}

        <TouchableOpacity onPress={handleRegister} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
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
  welcome: {
    fontSize: 24,
    marginBottom: 15,
    color: '#222',
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
