import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

const flatCompat = new FlatCompat();

const config = [
  ...fixupConfigRules(flatCompat.extends('next/core-web-vitals')),
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ['src/components/ui/*'],
  },
];

export default config;
