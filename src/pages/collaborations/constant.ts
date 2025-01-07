import CollaborationImage1 from './assets/collaboration_001.png';
import CollaborationImage2 from './assets/collaboration_002.png';
import CollaborationImage3 from './assets/collaboration_003.png';
import TaskImage1 from './assets/collaboration_001.svg';
import { Collaboration } from './types';

export const collaborations: { [key: string]: Collaboration } = {
  1: {
    icon: CollaborationImage1,
    link: '',
    tasks: [
      { icon: TaskImage1, title: 'Share Telegram story', points: 50 },
      { icon: TaskImage1, title: 'Like and retweet on X', points: 50 },
      { icon: TaskImage1, title: 'Like and retweet on X', points: 50 },
    ],
  },
  2: { icon: CollaborationImage2, link: '', tasks: [] },
  3: { icon: CollaborationImage3, link: '', tasks: [] },
};
