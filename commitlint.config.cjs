module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Yeni özellik
        'fix',      // Bug fix
        'docs',     // Dokümantasyon
        'style',    // Kod formatı (beyaz boşluk, noktalı virgül vb.)
        'refactor', // Ne bug fix ne de özellik eklemeyen kod değişikliği
        'perf',     // Performans iyileştirmesi
        'test',     // Test ekleme veya düzeltme
        'chore',    // Build işlemi veya yardımcı araç değişiklikleri
        'revert',   // Önceki commit'i geri alma
      ],
    ],
    'subject-case': [0], // Konu satırı case'ini zorunlu kılma
  },
};

