import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Logo.png')} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.welcome}>Bem vindo(a)</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
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

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Continuar</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Caso não possua uma conta{' '}
          <Text style={styles.link}>registre-se</Text>
        </Text>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require("../assets/images/Logo-Google.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Continuar com Google</Text>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E9E5F',
    marginBottom: 20,
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
    fontSize: 16,
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
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerText: {
    fontSize: 12,
    color: '#333',
    marginTop: 12,
  },
  link: {
    color: '#2E9E5F',
    textDecorationLine: 'underline',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 15,
    width: '100%',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  googleButtonText: {
    fontWeight: '600',
  },
});
