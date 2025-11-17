import { Exercise, WorkoutPlan } from "./types"

export const exercises: Exercise[] = [
  {
    id: "1",
    name: "Flexão de Braço",
    category: "Peito",
    location: "ambos",
    difficulty: "iniciante",
    muscleGroup: "Peitoral, Tríceps, Ombros",
    imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    tips: [
      "Mantenha o corpo reto como uma prancha",
      "Desça até o peito quase tocar o chão",
      "Cotovelos a 45° do corpo",
      "Olhar para frente, não para baixo"
    ],
    sets: "3-4",
    reps: "8-15"
  },
  {
    id: "2",
    name: "Agachamento Livre",
    category: "Pernas",
    location: "ambos",
    difficulty: "iniciante",
    muscleGroup: "Quadríceps, Glúteos, Core",
    imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop",
    tips: [
      "Pés na largura dos ombros",
      "Joelhos alinhados com os pés",
      "Desça até coxas paralelas ao chão",
      "Mantenha o peito erguido",
      "Peso nos calcanhares"
    ],
    sets: "4",
    reps: "10-15"
  },
  {
    id: "3",
    name: "Supino Reto",
    category: "Peito",
    location: "academia",
    difficulty: "intermediário",
    muscleGroup: "Peitoral, Tríceps, Ombros",
    imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=300&fit=crop",
    tips: [
      "Pegada um pouco mais larga que os ombros",
      "Barra na linha dos mamilos",
      "Escápulas retraídas e deprimidas",
      "Pés firmes no chão",
      "Controle na descida e explosão na subida"
    ],
    sets: "4",
    reps: "8-12"
  },
  {
    id: "4",
    name: "Prancha Abdominal",
    category: "Core",
    location: "ambos",
    difficulty: "iniciante",
    muscleGroup: "Abdômen, Core, Lombar",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    tips: [
      "Corpo reto dos ombros aos calcanhares",
      "Cotovelos sob os ombros",
      "Contraia o abdômen",
      "Não deixe o quadril cair",
      "Respire normalmente"
    ],
    sets: "3",
    reps: "30-60 seg"
  },
  {
    id: "5",
    name: "Barra Fixa",
    category: "Costas",
    location: "ambos",
    difficulty: "intermediário",
    muscleGroup: "Dorsais, Bíceps, Antebraços",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    tips: [
      "Pegada pronada (palmas para frente)",
      "Puxe até o queixo passar a barra",
      "Escápulas retraídas",
      "Evite balançar o corpo",
      "Controle na descida"
    ],
    sets: "3-4",
    reps: "6-12"
  },
  {
    id: "6",
    name: "Leg Press 45°",
    category: "Pernas",
    location: "academia",
    difficulty: "intermediário",
    muscleGroup: "Quadríceps, Glúteos, Posteriores",
    imageUrl: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=300&fit=crop",
    tips: [
      "Pés na largura dos ombros",
      "Desça até 90° nos joelhos",
      "Não estenda completamente no topo",
      "Lombar sempre apoiada",
      "Empurre pelos calcanhares"
    ],
    sets: "4",
    reps: "10-15"
  },
  {
    id: "7",
    name: "Rosca Direta",
    category: "Bíceps",
    location: "ambos",
    difficulty: "iniciante",
    muscleGroup: "Bíceps, Antebraços",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop",
    tips: [
      "Cotovelos fixos ao lado do corpo",
      "Pegada supinada (palmas para cima)",
      "Controle total do movimento",
      "Não balance o corpo",
      "Contraia no topo por 1 segundo"
    ],
    sets: "3",
    reps: "10-12"
  },
  {
    id: "8",
    name: "Desenvolvimento de Ombros",
    category: "Ombros",
    location: "ambos",
    difficulty: "intermediário",
    muscleGroup: "Deltoides, Tríceps",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop",
    tips: [
      "Halteres na altura dos ombros",
      "Empurre verticalmente",
      "Não arquear as costas",
      "Core contraído",
      "Controle na descida"
    ],
    sets: "3-4",
    reps: "8-12"
  },
  {
    id: "9",
    name: "Burpee",
    category: "Cardio",
    location: "ambos",
    difficulty: "avançado",
    muscleGroup: "Corpo inteiro, Cardio",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop",
    tips: [
      "Movimento explosivo e contínuo",
      "Flexão completa no chão",
      "Salto vertical no final",
      "Mantenha o ritmo constante",
      "Respire de forma controlada"
    ],
    sets: "3",
    reps: "10-15"
  },
  {
    id: "10",
    name: "Remada Curvada",
    category: "Costas",
    location: "ambos",
    difficulty: "intermediário",
    muscleGroup: "Dorsais, Trapézio, Bíceps",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop",
    tips: [
      "Tronco inclinado 45°",
      "Joelhos levemente flexionados",
      "Puxe em direção ao abdômen",
      "Escápulas retraídas no topo",
      "Lombar neutra sempre"
    ],
    sets: "4",
    reps: "8-12"
  },
  {
    id: "11",
    name: "Afundo",
    category: "Pernas",
    location: "ambos",
    difficulty: "iniciante",
    muscleGroup: "Quadríceps, Glúteos, Equilíbrio",
    imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop",
    tips: [
      "Passo largo para frente",
      "Joelho traseiro quase toca o chão",
      "Joelho da frente não ultrapassa o pé",
      "Tronco ereto",
      "Alterne as pernas"
    ],
    sets: "3",
    reps: "10-12 cada"
  },
  {
    id: "12",
    name: "Tríceps Testa",
    category: "Tríceps",
    location: "ambos",
    difficulty: "intermediário",
    muscleGroup: "Tríceps",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop",
    tips: [
      "Cotovelos fixos e apontando para cima",
      "Desça até próximo da testa",
      "Extensão completa no topo",
      "Movimento controlado",
      "Não abra os cotovelos"
    ],
    sets: "3",
    reps: "10-15"
  }
]

export const workoutPlans: WorkoutPlan[] = [
  {
    id: "1",
    name: "Treino Full Body Casa",
    description: "Treino completo para fazer em casa sem equipamentos",
    location: "casa",
    duration: "30-40 min",
    level: "Iniciante",
    exercises: ["Flexão de Braço", "Agachamento Livre", "Prancha Abdominal", "Afundo", "Burpee"],
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "2",
    name: "Hipertrofia Academia",
    description: "Foco em ganho de massa muscular",
    location: "academia",
    duration: "60-75 min",
    level: "Intermediário",
    exercises: ["Supino Reto", "Leg Press 45°", "Barra Fixa", "Desenvolvimento de Ombros", "Rosca Direta"],
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "3",
    name: "Treino HIIT Casa",
    description: "Alta intensidade para queima de gordura",
    location: "casa",
    duration: "20-30 min",
    level: "Avançado",
    exercises: ["Burpee", "Agachamento Livre", "Flexão de Braço", "Prancha Abdominal", "Afundo"],
    color: "from-orange-500 to-red-600"
  },
  {
    id: "4",
    name: "Força e Potência",
    description: "Desenvolvimento de força máxima",
    location: "academia",
    duration: "75-90 min",
    level: "Avançado",
    exercises: ["Supino Reto", "Agachamento Livre", "Barra Fixa", "Leg Press 45°", "Remada Curvada"],
    color: "from-purple-500 to-pink-600"
  }
]
