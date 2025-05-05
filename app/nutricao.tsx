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
      userId='d2f0ce28-d187-4bc6-a743-a30e9c53ff83'
      description="Consuma 3 porções diárias"
      questions={[
        { question: 'Porções de frutas (80g)' },
        { question: 'Porções de legumes ou verduras (80g)' },
        { question: 'Comeu alimento ultraprocessado ou com muito açúcar (25g)' },
      ]}
    />
  );
}
