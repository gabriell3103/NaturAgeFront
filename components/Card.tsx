// components/CategoryCard.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageSourcePropType, Image } from 'react-native';
import { useRouter } from 'expo-router';

type Question = {
  question: string;
  initialValue?: number;
};

type Props = {
  title: string;
  icon: ImageSourcePropType;
  goal: number;
  description: string;
  questions: Question[];
  color: string;
};

const Card = ({ title, icon, goal, description, questions, color }: Props) => {
  const router = useRouter();
  const [values, setValues] = useState<number[]>(questions.map((q) => q.initialValue ?? 0));

  const increment = (index: number) => {
    const newValues = [...values];
    newValues[index]++;
    setValues(newValues);
  };

  const decrement = (index: number) => {
    const newValues = [...values];
    newValues[index] = Math.max(0, newValues[index] - 1); // Impede que valores fiquem negativos
    setValues(newValues);
  };

  const handleSalvar = async () => {
    const convertedAnswers = values.map((val, index) => {
      if (index === 0 || index === 1) {
        return val * 80;
      } else if (index === 2) {
        return val * 25;
      } else {
        return val;
      }
    });

    const payload = {
      PorcaoFrutas: 1,
      PorcaoLegumesVerduras: 1,
      AlimentosProcessados: 1,
      userId: "d2f0ce28-d187-4bc6-a743-a30e9c53ff83"
    };

    try {
      const response = await fetch('http://localhost:3000/nutricao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Respostas salvas com sucesso!');
        router.back();
      } else {
        console.error('Erro ao salvar:', await response.text());
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Image source={icon} style={styles.icon} />
            <Text style={styles.title}>{title}</Text>
          </View>

          <View style={styles.summaryBox}>
            <Text style={[styles.goalText, { color }]}>{`0/${goal}`}</Text> {/* Sempre 0/goal */}
            <Text>{description}</Text>
          </View>

          <View style={styles.questionsBox}>
            {questions.map((item, idx) => (
              <View key={idx} style={styles.questionRow}>
                <Text style={styles.questionText}>{item.question}</Text>
                <View style={styles.counter}>
                  <TouchableOpacity onPress={() => decrement(idx)}>
                    <Text style={styles.counterBtn}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterVal}>{values[idx]}</Text>
                  <TouchableOpacity onPress={() => increment(idx)}>
                    <Text style={styles.counterBtn}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity style={[styles.saveButton, { backgroundColor: color }]} onPress={handleSalvar}>
        <Text style={styles.backButtonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.fixedButton, { backgroundColor: color }]} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#74CD95',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  content: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  summaryBox: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  goalText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  questionsBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  questionText: {
    flex: 1,
    marginRight: 10,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterBtn: {
    fontSize: 20,
    paddingHorizontal: 8,
  },
  counterVal: {
    fontSize: 16,
    marginHorizontal: 4,
  },
  backButton: {
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#060609',
    fontWeight: 'bold',
  },
  fixedButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  saveButton: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
    resizeMode: 'contain',
  },
});

export default Card;
