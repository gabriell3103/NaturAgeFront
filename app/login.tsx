import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { router } from 'expo-router';

import ErrorMessage from '@/components/ErrorMessage';

export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');


  const handleLogin = () => {
    const validEmail = 'teste@gmail.com';
    const validPassword = '123456';

    if (email === validEmail && password === validPassword) {
     router.push('/home');
   } else if (!email || !password){
     setError('Preencha todos os campos.')
   }
   
   else {
      setError('Email ou senha inválidos');
    }
  }

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
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <ErrorMessage message={error} />

      <TouchableOpacity onPress={handleLogin} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Continuar</Text>
      </TouchableOpacity>


      <Text style={styles.registerText}>
        Caso não possua uma conta{' '}
        <Text style={styles.link} onPress={() => router.push('/register')}>
          registre-se
        </Text>
      </Text>



        <TouchableOpacity onPress={() => router.push('/getAge')} style={styles.googleButton}>
          <Image
            source={require('../assets/images/Logo-Google.png')}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Continuar com Google</Text>
        </TouchableOpacity>
      </View>

      <Text>© 2024 Conheço uma Ponte. All rights reserved.</Text>
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
    height: 380,
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
  registerText: {
    fontSize: 12,
    color: '#333',
    marginTop: 12,
  },
  link: {
    color: '#49AD78',
    textDecorationLine: 'underline',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
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
