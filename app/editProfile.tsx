import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [newName, setNewName] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleConfirmEdit = async () => {
    if (!newName || !newEmail || !newPassword) {
      Alert.alert("Campos obrigatórios", "Preencha nome, email e senha.");
      return;
    }
  
    try {
      const response = await fetch('https://nseiarotaainda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          password: newPassword,
          profileImage: imageUri,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
        router.back();
      } else {
        Alert.alert("Erro", data?.message || "Erro ao atualizar perfil.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro de rede ou servidor.");
    }
  };
  

  const handleEditPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "Precisamos de acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topIcon}>
        <Image
          source={require('../assets/images/LogoWithoutName.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.profileIconContainer}>
          <TouchableOpacity onPress={handleEditPhoto}>
            <Image
              source={
                imageUri
                  ? { uri: imageUri }
                  : require('../assets/images/ProfilePhoto.png')
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEditPhoto} style={styles.editIcon}>
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Nome"
          value={newName}
          onChangeText={setNewName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={newEmail}
          onChangeText={setNewEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Senha"
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirmar senha"
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity onPress={handleConfirmEdit} style={styles.button}>
          <Text style={styles.buttonText}>Confirmar alterações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topIcon: {
    marginTop: 40,
    marginLeft: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  card: {
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  profileIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    right: -5,
    bottom: 0,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#d3d3d3',
    width: '100%',
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: '500',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
