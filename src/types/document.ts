export interface Document {
  id: string;
  name: string;
  type: string; // MIME type
  size: number; // bytes
  taskId?: string;
  projectId: string;
  uploadedBy?: string;
  uploadedAt: Date;
  updatedAt: Date;
  content: string; // Base64 encoded file content
  version: number;
  tags?: string[];
  description?: string;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  content: string; // Base64 encoded
  uploadedBy?: string;
  uploadedAt: Date;
  comment?: string;
  size: number;
}

export interface DocumentFolder {
  id: string;
  name: string;
  projectId: string;
  parentFolderId?: string;
  createdAt: Date;
  color?: string;
}

// Supported file types for preview
export const PREVIEWABLE_TYPES = {
  images: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
  pdf: ['application/pdf'],
  text: ['text/plain', 'text/markdown', 'text/html'],
};

export const isPreviewable = (mimeType: string): boolean => {
  return [
    ...PREVIEWABLE_TYPES.images,
    ...PREVIEWABLE_TYPES.pdf,
    ...PREVIEWABLE_TYPES.text,
  ].includes(mimeType);
};

export const getFileIcon = (mimeType: string): string => {
  if (PREVIEWABLE_TYPES.images.includes(mimeType)) return '🖼️';
  if (PREVIEWABLE_TYPES.pdf.includes(mimeType)) return '📄';
  if (PREVIEWABLE_TYPES.text.includes(mimeType)) return '📝';
  if (mimeType.includes('video')) return '🎥';
  if (mimeType.includes('audio')) return '🎵';
  if (mimeType.includes('zip') || mimeType.includes('archive')) return '📦';
  return '📎';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
