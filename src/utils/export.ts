import jsPDF from 'jspdf';
import Papa from 'papaparse';
import { Project, Task } from '../types';

// CSV Export
export const exportProjectsToCSV = (projects: Project[]) => {
  const rows = projects.flatMap((project) =>
    project.tasks.map((task) => ({
      'Project Name': project.name,
      'Project Description': project.description || '',
      'Task ID': task.id,
      'Task Title': task.title,
      'Task Description': task.description || '',
      Status: task.status,
      Priority: task.priority,
      'Due Date': task.dueDate ? new Date(task.dueDate).toLocaleDateString('tr-TR') : '',
      Tags: task.tags?.join(', ') || '',
      'Created At': new Date(task.createdAt).toLocaleDateString('tr-TR'),
      'Updated At': new Date(task.updatedAt).toLocaleDateString('tr-TR'),
    }))
  );

  const csv = Papa.unparse(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `project-cicero-export-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportTasksToCSV = (tasks: Task[], projectName: string) => {
  const rows = tasks.map((task) => ({
    'Task ID': task.id,
    Title: task.title,
    Description: task.description || '',
    Status: task.status,
    Priority: task.priority,
    'Due Date': task.dueDate ? new Date(task.dueDate).toLocaleDateString('tr-TR') : '',
    Tags: task.tags?.join(', ') || '',
    'Created At': new Date(task.createdAt).toLocaleDateString('tr-TR'),
    'Updated At': new Date(task.updatedAt).toLocaleDateString('tr-TR'),
  }));

  const csv = Papa.unparse(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${projectName}-tasks-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

// PDF Export
export const exportProjectToPDF = (project: Project) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.text(project.name, 20, 20);

  // Description
  if (project.description) {
    doc.setFontSize(12);
    doc.text(project.description, 20, 30);
  }

  // Metadata
  doc.setFontSize(10);
  doc.text(`Created: ${new Date(project.createdAt).toLocaleDateString('tr-TR')}`, 20, 40);
  doc.text(`Total Tasks: ${project.metadata.totalTasks}`, 20, 45);
  doc.text(`Completed: ${project.metadata.completedTasks}`, 20, 50);

  // Tasks
  doc.setFontSize(14);
  doc.text('Tasks:', 20, 60);

  let yPosition = 70;
  const pageHeight = doc.internal.pageSize.height;

  project.tasks.forEach((task, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${task.title}`, 20, yPosition);
    yPosition += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);

    if (task.description) {
      const descLines = doc.splitTextToSize(task.description, 170);
      doc.text(descLines, 25, yPosition);
      yPosition += descLines.length * 4;
    }

    doc.text(`Status: ${task.status} | Priority: ${task.priority}`, 25, yPosition);
    yPosition += 5;

    if (task.dueDate) {
      doc.text(`Due: ${new Date(task.dueDate).toLocaleDateString('tr-TR')}`, 25, yPosition);
      yPosition += 5;
    }

    if (task.tags && task.tags.length > 0) {
      doc.text(`Tags: ${task.tags.join(', ')}`, 25, yPosition);
      yPosition += 5;
    }

    yPosition += 5; // Space between tasks
  });

  // Save
  doc.save(`${project.name}-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportAllProjectsToPDF = (projects: Project[]) => {
  const doc = new jsPDF();

  // Cover page
  doc.setFontSize(24);
  doc.text('Project Cicero', 20, 30);
  doc.setFontSize(14);
  doc.text('Project Summary Report', 20, 40);
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString('tr-TR')}`, 20, 50);
  doc.text(`Total Projects: ${projects.length}`, 20, 55);

  let yPosition = 70;
  const pageHeight = doc.internal.pageSize.height;

  projects.forEach((project, projIndex) => {
    // New page for each project
    if (projIndex > 0) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(18);
    doc.text(project.name, 20, yPosition);
    yPosition += 10;

    if (project.description) {
      doc.setFontSize(11);
      const descLines = doc.splitTextToSize(project.description, 170);
      doc.text(descLines, 20, yPosition);
      yPosition += descLines.length * 5 + 5;
    }

    doc.setFontSize(10);
    doc.text(
      `Total Tasks: ${project.metadata.totalTasks} | Completed: ${project.metadata.completedTasks}`,
      20,
      yPosition
    );
    yPosition += 10;

    // Tasks summary
    doc.setFontSize(12);
    doc.text('Tasks:', 20, yPosition);
    yPosition += 7;

    project.tasks.forEach((task, index) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(10);
      doc.text(`${index + 1}. ${task.title} [${task.status}]`, 25, yPosition);
      yPosition += 5;
    });
  });

  doc.save(`all-projects-${new Date().toISOString().split('T')[0]}.pdf`);
};
