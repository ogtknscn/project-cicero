import React from 'react';
import { Zap, CheckCircle, Tag, Bell, Clock, UserPlus } from 'lucide-react';
import { AutomationRule } from '../../types/automation';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  rule: Omit<AutomationRule, 'id' | 'createdAt' | 'projectId'>;
}

const templates: Template[] = [
  {
    id: 'auto-complete',
    name: 'Görev Tamamlandı → Etiket Ekle',
    description:
      'Görev "Tamamlandı" durumuna geldiğinde otomatik olarak "Tamamlandı" etiketi ekler',
    icon: CheckCircle,
    rule: {
      name: 'Görev Tamamlandığında Etiket Ekle',
      trigger: {
        type: 'task_status_changed',
        value: 'done',
      },
      conditions: [
        {
          field: 'status',
          operator: 'equals',
          value: 'done',
        },
      ],
      actions: [
        {
          type: 'add_tag',
          value: 'Tamamlandı',
        },
      ],
      enabled: true,
      updatedAt: new Date(),
      executionCount: 0,
    },
  },
  {
    id: 'high-priority-notify',
    name: 'Yüksek Öncelik → Bildirim Gönder',
    description: 'Yüksek öncelikli görev oluşturulduğunda ekip üyelerine bildirim gönderir',
    icon: Bell,
    rule: {
      name: 'Yüksek Öncelikli Görev Bildirimi',
      trigger: {
        type: 'task_created',
      },
      conditions: [
        {
          field: 'priority',
          operator: 'equals',
          value: 'high',
        },
      ],
      actions: [
        {
          type: 'send_notification',
          value: 'Yeni yüksek öncelikli görev oluşturuldu',
        },
      ],
      enabled: true,
      updatedAt: new Date(),
      executionCount: 0,
    },
  },
  {
    id: 'overdue-escalate',
    name: 'Gecikmiş Görev → Önceliği Artır',
    description: 'Son tarihi geçen görevlerin önceliğini otomatik olarak yükseltir',
    icon: Clock,
    rule: {
      name: 'Gecikmiş Görev Öncelik Artırma',
      trigger: {
        type: 'task_status_changed',
      },
      conditions: [
        {
          field: 'status',
          operator: 'not_equals',
          value: 'done',
        },
      ],
      actions: [
        {
          type: 'change_priority',
          value: 'high',
        },
        {
          type: 'add_tag',
          value: 'Gecikmiş',
        },
      ],
      enabled: true,
      updatedAt: new Date(),
      executionCount: 0,
    },
  },
  {
    id: 'assign-notify',
    name: 'Görev Atandı → Bildirim',
    description: 'Görev atandığında kişiye otomatik bildirim gönderir',
    icon: UserPlus,
    rule: {
      name: 'Görev Atama Bildirimi',
      trigger: {
        type: 'task_assigned',
      },
      conditions: [],
      actions: [
        {
          type: 'send_notification',
          value: 'Size yeni bir görev atandı',
        },
      ],
      enabled: true,
      updatedAt: new Date(),
      executionCount: 0,
    },
  },
  {
    id: 'in-progress-tag',
    name: 'Devam Ediyor → Etiket',
    description: 'Görev "Devam Ediyor" durumuna geldiğinde "Aktif" etiketi ekler',
    icon: Tag,
    rule: {
      name: 'Devam Eden Görev Etiketleme',
      trigger: {
        type: 'task_status_changed',
        value: 'in-progress',
      },
      conditions: [
        {
          field: 'status',
          operator: 'equals',
          value: 'in-progress',
        },
      ],
      actions: [
        {
          type: 'add_tag',
          value: 'Aktif',
        },
      ],
      enabled: true,
      updatedAt: new Date(),
      executionCount: 0,
    },
  },
];

interface AutomationTemplatesProps {
  onSelectTemplate: (rule: Omit<AutomationRule, 'id' | 'createdAt' | 'projectId'>) => void;
}

export const AutomationTemplates: React.FC<AutomationTemplatesProps> = ({ onSelectTemplate }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Hazır Şablonlar</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.rule)}
              className="text-left p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 
                bg-white dark:bg-neutral-800 hover:border-primary-300 dark:hover:border-primary-600
                hover:shadow-md transition-all duration-normal focus:outline-none focus:ring-2 
                focus:ring-primary-500 group"
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 
                  text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform"
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                    {template.name}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {template.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
