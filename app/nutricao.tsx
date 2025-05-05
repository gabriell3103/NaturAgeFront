import React from 'react';
import Card from '../components/Card';

import NutricaoIcon from '../assets/images/NutricaoIcon.png'

export default function Nutricao() {
  return (
    <Card
      title="Nutrição"
      icon= {NutricaoIcon}
      color="#7FC49B"
      goal={3} 
      description="Consuma 3 porções diárias"
      questions={[
        { question: 'Porções de frutas (80g)' },
        { question: 'Porções de legumes ou verduras (80g)' },
        { question: 'Comeu alimento ultraprocessado ou com muito açúcar (25g)' },
      ]}
    />
  );
}
