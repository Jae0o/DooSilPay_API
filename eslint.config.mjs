import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 백엔드 외 디렉터리·산출물 제외
  { ignores: ['dist', 'node_modules', 'coverage', 'api/_bundle.cjs', 'public', 'Design', '기획', 'api-plan'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: { globals: { ...globals.node }, parserOptions: { sourceType: 'module' } },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  { files: ['tests/**/*.ts', '**/*.test.ts'], rules: { '@typescript-eslint/no-explicit-any': 'off' } },
  eslintConfigPrettier, // 반드시 마지막
);
