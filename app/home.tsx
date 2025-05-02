import { router } from 'expo-router';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  findNodeHandle,
  UIManager,
  TouchableWithoutFeedback,
} from 'react-native';

export default function Home(): JSX.Element {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const profileRef = useRef<any>(null);

  const showMenu = () => {
    const handle = findNodeHandle(profileRef.current);
    if (handle) {
      UIManager.measureInWindow(handle, (_x, y, _width, height) => {
        setMenuPosition({
          top: y - 10,
          right: 20,
        });
        setMenuVisible(true);
      });
    }
  };

  const handleEditProfile = () => {
    router.push('/editProfile');
    setMenuVisible(false);
  };

  const handleLogout = () => {
    router.push('/login');
    setMenuVisible(false);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={require('../assets/images/LogoWithoutName.png')} style={styles.logo} />
        <TouchableOpacity ref={profileRef} style={styles.profile} onPress={showMenu}>
          <Image
            source={require('../assets/images/ProfilePhoto.png')}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      {menuVisible && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={StyleSheet.absoluteFill}>
            <View style={[styles.floatingMenu, { top: menuPosition.top, right: menuPosition.right }]}>
              <TouchableOpacity onPress={handleEditProfile} style={styles.menuItem}>
                <Text style={styles.menuText}>Editar Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
                <Text style={[styles.menuText, styles.logoutText]}>Sair</Text> {/* Cor vermelha aqui */}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  logo: {
    width: 50,
    height: 50,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  floatingMenu: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 1000,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuText: {
    fontSize: 16,
  },
  logoutText: {
    color: 'red',
  },
});
