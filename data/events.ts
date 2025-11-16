
import { EventType } from '../types';

const now = new Date();

export const mockEvents: EventType[] = [
  {
    id: '1',
    title: 'Festival de Jazz na Praça',
    startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10, 19, 0),
    endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10, 23, 0),
    location: 'Praça da Liberdade, Centro',
    description: 'Uma noite mágica com os melhores músicos de jazz da região. Traga sua cadeira e aproveite a música sob as estrelas.',
    agenda: [
      '19:00 - Abertura com a banda "Blue Notes"',
      '20:30 - Apresentação especial de "Ella\'s Mood"',
      '22:00 - Jam session com artistas convidados',
    ],
    image: 'https://picsum.photos/seed/jazz/800/600',
  },
  {
    id: '2',
    title: 'Exposição de Arte Moderna "Cores da Cidade"',
    startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 10, 0),
    endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 25, 18, 0),
    location: 'Museu de Arte Contemporânea',
    description: 'Descubra a vibração da cidade através dos olhos de artistas locais. Uma coleção de pinturas, esculturas e instalações que capturam a essência urbana.',
    agenda: [
      '10:00 - Abertura da exposição',
      '14:00 - Visita guiada com o curador',
      '16:00 - Oficina de pintura para crianças (aos sábados)',
    ],
    image: 'https://picsum.photos/seed/art/800/600',
  },
  {
    id: '3',
    title: 'Feira Gastronômica Sabores do Mundo',
    startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 15, 12, 0),
    endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 16, 22, 0),
    location: 'Parque Municipal',
    description: 'Uma viagem culinária sem sair da cidade. Experimente pratos de diferentes países em dezenas de food trucks e barracas.',
    agenda: [
      '12:00 - Início do evento',
      '15:00 - Aula-show de culinária italiana',
      '19:00 - Música ao vivo com a banda "Sabor Tropical"',
    ],
    image: 'https://picsum.photos/seed/food/800/600',
  },
  {
    id: '4',
    title: 'Noite de Cinema ao Ar Livre: Clássicos dos Anos 80',
    startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 20, 20, 0),
    endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 20, 22, 30),
    location: 'Anfiteatro do Lago',
    description: 'Relembre os grandes sucessos do cinema dos anos 80 em uma tela gigante ao ar livre. Pipooca e nostalgia garantidas!',
    agenda: ['20:00 - Exibição do filme "De Volta para o Futuro"'],
    image: 'https://picsum.photos/seed/movie/800/600',
  },
  {
    id: '5',
    title: 'Concerto da Orquestra Sinfônica',
    startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10, 20, 0),
    endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10, 22, 0),
    location: 'Teatro Municipal',
    description: 'A orquestra sinfônica da cidade apresenta um repertório de Beethoven e Mozart em uma noite de gala inesquecível.',
    agenda: [
      '20:00 - Abertura com a 5ª Sinfonia de Beethoven',
      '21:00 - Interlúdio',
      '21:15 - Peças selecionadas de Mozart',
    ],
    image: 'https://picsum.photos/seed/music/800/600',
  },
  {
    id: '6',
    title: 'Maratona de Programação "HackaCity"',
    startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30, 9, 0),
    endDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29, 18, 0),
    location: 'Centro de Convenções Tech',
    description: '24 horas de programação, inovação e colaboração para resolver desafios urbanos usando tecnologia. Prêmios para as melhores soluções.',
    agenda: [
      '09:00 - Abertura e apresentação dos desafios',
      '10:00 - Início da maratona',
      '18:00 (Dia 2) - Apresentação dos projetos e premiação',
    ],
    image: 'https://picsum.photos/seed/tech/800/600',
  },
];
