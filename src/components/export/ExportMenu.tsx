import { useState } from 'react';
import { FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { useStore } from '../../stores/useStore';
import {
  exportProjectsToCSV,
  exportTasksToCSV,
  exportProjectToPDF,
  exportAllProjectsToPDF,
} from '../../utils/export';

export const ExportMenu = () => {
  const { projects, selectedProjectId } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const handleExportCurrentProjectCSV = () => {
    if (selectedProject) {
      exportTasksToCSV(selectedProject.tasks, selectedProject.name);
      setIsModalOpen(false);
    }
  };

  const handleExportCurrentProjectPDF = () => {
    if (selectedProject) {
      exportProjectToPDF(selectedProject);
      setIsModalOpen(false);
    }
  };

  const handleExportAllProjectsCSV = () => {
    exportProjectsToCSV(projects);
    setIsModalOpen(false);
  };

  const handleExportAllProjectsPDF = () => {
    exportAllProjectsToPDF(projects);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        title="PDF veya CSV olarak dışa aktar"
      >
        <FileText size={16} />
        <span className="hidden sm:inline ml-2">Export</span>
      </Button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Dışa Aktar">
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Projelerinizi ve görevlerinizi PDF veya CSV formatında dışa aktarın.
          </p>

          {/* Current Project */}
          {selectedProject && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Mevcut Proje: {selectedProject.name}
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleExportCurrentProjectCSV}
                  className="flex-1"
                >
                  <FileSpreadsheet size={16} className="mr-2" />
                  CSV Olarak İndir
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleExportCurrentProjectPDF}
                  className="flex-1"
                >
                  <FileText size={16} className="mr-2" />
                  PDF Olarak İndir
                </Button>
              </div>
            </div>
          )}

          {/* All Projects */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Tüm Projeler ({projects.length})
            </h3>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleExportAllProjectsCSV}
                className="flex-1"
              >
                <FileSpreadsheet size={16} className="mr-2" />
                CSV Olarak İndir
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleExportAllProjectsPDF}
                className="flex-1"
              >
                <FileText size={16} className="mr-2" />
                PDF Olarak İndir
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Not:</strong> CSV formatı Excel'de açılabilir. PDF formatı görsel rapor için
              uygundur.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};
