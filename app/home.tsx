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

// Images
import NutricaoIcon from '../assets/images/NutricaoIcon.png';
import EspiritualidadeIcon from '../assets/images/EspiritualidadeIcon.png';
import DescansoIcon from '../assets/images/DescansoIcon.png';
import RespiracaoIcon from '../assets/images/RespiracaoIcon.png';
import ExercicioIcon from '../assets/images/ExercicioIcon.png';
import HidratacaoIcon from '../assets/images/HidratacaoIcon.png';
import LuzSolarIcon from '../assets/images/LuzSolarIcon.png';
import TemperancaIcon from '../assets/images/TemperancaIcon.png';

export default function Home(): JSX.Element {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const profileRef = useRef<any>(null);

  const cards = [
    { title: 'Nutrição', color: '#7FC49B', route: '/nutricao', image: NutricaoIcon },
    { title: 'Espiritualidade', color: '#92C9E3', route: '/espiritualidade', image: EspiritualidadeIcon },
    { title: 'Descanso', color: '#C4B6F1', route: '/descanso', image: DescansoIcon },
    { title: 'Respiração', color: '#A3F6E2', route: '/respiracao', image: RespiracaoIcon },
    { title: 'Exercícios', color: '#F25C4C', route: '/exercicios', image: ExercicioIcon },
    { title: 'Hidratação', color: '#60D9F8', route: '/hidratacao', image: HidratacaoIcon },
    { title: 'Luz solar', color: '#F7C942', route: '/luzsolar', image: LuzSolarIcon },
    { title: 'Temperança', color: '#B1BCC6', route: '/temperanca', image: TemperancaIcon },
  ];

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
        <View style={styles.overlay}>
          <View style={[styles.floatingMenu, { top: menuPosition.top, right: menuPosition.right }]}>
            <TouchableOpacity onPress={handleEditProfile} style={styles.menuItem}>
              <Text style={styles.menuText}>Editar Perfil</Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
                <Text style={[styles.menuText, styles.logoutText]}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
       </TouchableWithoutFeedback>
      )}

      <View style={styles.cardsContainer}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: card.color }]}
            onPress={() => router.push(card.route as any)}
          >
            <View style={styles.cardContent}>
              <Image source={card.image} style={styles.cardIcon} />
              <Text style={styles.cardText}>{card.title}</Text>
              <Text style={styles.cardArrow}>→</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
  cardsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cardArrow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cardIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },  
});
