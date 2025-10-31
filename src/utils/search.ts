import FlexSearch from 'flexsearch';
import { Task, Project } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FlexSearchIndex = any;

// Create search indexes
export const createTaskIndex = (): FlexSearchIndex => {
  return new FlexSearch.Index({
    tokenize: 'forward',
    resolution: 9,
    cache: 100,
  });
};

export const createProjectIndex = (): FlexSearchIndex => {
  return new FlexSearch.Index({
    tokenize: 'forward',
    resolution: 9,
    cache: 100,
  });
};

// Index tasks
export const indexTasks = (tasks: Task[], index: FlexSearchIndex) => {
  tasks.forEach((task) => {
    const searchText = [
      task.title,
      task.description || '',
      task.tags?.join(' ') || '',
      task.priority,
      task.status,
    ].join(' ');

    index.add(task.id, searchText);
  });
};

// Index projects
export const indexProjects = (projects: Project[], index: FlexSearchIndex) => {
  projects.forEach((project) => {
    const searchText = [project.name, project.description || ''].join(' ');

    index.add(project.id, searchText);
  });
};

// Search tasks
export const searchTasks = (query: string, tasks: Task[], index: FlexSearchIndex): Task[] => {
  if (!query.trim()) return tasks;

  const results = index.search(query);
  return tasks.filter((task) => results.includes(task.id));
};

// Search projects
export const searchProjects = (
  query: string,
  projects: Project[],
  index: FlexSearchIndex
): Project[] => {
  if (!query.trim()) return projects;

  const results = index.search(query);
  return projects.filter((project) => results.includes(project.id));
};
