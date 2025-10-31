import FlexSearch from 'flexsearch';
import { Task, Project } from '../types';

// Create search indexes
export const createTaskIndex = () => {
  return new FlexSearch.Index({
    tokenize: 'forward',
    threshold: 0,
    resolution: 9,
    depth: 3,
    cache: 100,
  });
};

export const createProjectIndex = () => {
  return new FlexSearch.Index({
    tokenize: 'forward',
    threshold: 0,
    resolution: 9,
    depth: 3,
    cache: 100,
  });
};

// Index tasks
export const indexTasks = (tasks: Task[], index: FlexSearch.Index) => {
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
export const indexProjects = (projects: Project[], index: FlexSearch.Index) => {
  projects.forEach((project) => {
    const searchText = [project.name, project.description || ''].join(' ');

    index.add(project.id, searchText);
  });
};

// Search tasks
export const searchTasks = (query: string, tasks: Task[], index: FlexSearch.Index): Task[] => {
  if (!query.trim()) return tasks;

  const results = index.search(query);
  return tasks.filter((task) => results.includes(task.id));
};

// Search projects
export const searchProjects = (
  query: string,
  projects: Project[],
  index: FlexSearch.Index
): Project[] => {
  if (!query.trim()) return projects;

  const results = index.search(query);
  return projects.filter((project) => results.includes(project.id));
};
