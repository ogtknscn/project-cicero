import { useState } from 'react';
import { useTemplateStore } from '../../stores/templateStore';
import { useStore, generateId } from '../../stores/useStore';
import { useToastStore } from '../../stores/toastStore';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { FilePlus, Trash2, Copy } from 'lucide-react';
import { Task, Project } from '../../types';

export const TemplateManager = () => {
  const { taskTemplates, projectTemplates, deleteTaskTemplate, deleteProjectTemplate } =
    useTemplateStore();
  const { addTask, addProject, selectedProjectId } = useStore();
  const { addToast } = useToastStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'task' | 'project'>('task');

  const handleUseTaskTemplate = (templateId: string) => {
    if (!selectedProjectId) {
      addToast({
        message: 'Lütfen önce bir proje seçin',
        type: 'warning',
      });
      return;
    }

    const template = taskTemplates.find((t) => t.id === templateId);
    if (template) {
      const newTask: Task = {
        ...template.template,
        id: generateId(),
        projectId: selectedProjectId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      addTask(newTask);
      setIsModalOpen(false);
    }
  };

  const handleUseProjectTemplate = (templateId: string) => {
    const template = projectTemplates.find((t) => t.id === templateId);
    if (template) {
      const newProject: Project = {
        ...template.template,
        id: generateId(),
        tasks:
          template.taskTemplates?.map((taskTemplate) => ({
            ...taskTemplate,
            id: generateId(),
            projectId: generateId(), // Will be overwritten after project creation
            createdAt: new Date(),
            updatedAt: new Date(),
          })) || [],
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          totalTasks: template.taskTemplates?.length || 0,
          completedTasks: 0,
        },
      };
      addProject(newProject);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        title="Şablonlardan oluştur"
      >
        <FilePlus size={16} />
        <span className="hidden sm:inline ml-2">Şablonlar</span>
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Şablonlar">
        <div className="space-y-4">
          {/* Tabs */}
          <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('task')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'task'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Görev Şablonları ({taskTemplates.length})
            </button>
            <button
              onClick={() => setActiveTab('project')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'project'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Proje Şablonları ({projectTemplates.length})
            </button>
          </div>

          {/* Task Templates */}
          {activeTab === 'task' && (
            <div className="space-y-2">
              {taskTemplates.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                  Henüz görev şablonu yok
                </p>
              ) : (
                taskTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
                      {template.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {template.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleUseTaskTemplate(template.id)}
                        title="Bu şablonu kullan"
                      >
                        <Copy size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (confirm('Bu şablonu silmek istediğinize emin misiniz?')) {
                            deleteTaskTemplate(template.id);
                          }
                        }}
                        title="Şablonu sil"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Project Templates */}
          {activeTab === 'project' && (
            <div className="space-y-2">
              {projectTemplates.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                  Henüz proje şablonu yok
                </p>
              ) : (
                projectTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
                      {template.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {template.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {template.taskTemplates?.length || 0} görev içerir
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleUseProjectTemplate(template.id)}
                        title="Bu şablonu kullan"
                      >
                        <Copy size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (confirm('Bu şablonu silmek istediğinize emin misiniz?')) {
                            deleteProjectTemplate(template.id);
                          }
                        }}
                        title="Şablonu sil"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
