import { LanguageModel } from '../language/language.model';

export interface Environment {
  production: boolean;
  defaultLanguage: LanguageModel.LANGUAGE;
  dictionaryDebugMode: boolean;
}
