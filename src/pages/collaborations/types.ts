export interface Collaboration {
  icon: string;
  link: string;
  tasks: Task[];
}

export interface Task {
  icon: string;
  title: string;
  points: number;
}
