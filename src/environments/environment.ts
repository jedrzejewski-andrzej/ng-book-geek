import {LanguageModel} from "../../models/language/language.model";
import {Environment} from "../../models/environment/environment.interface";

export const environment: Environment = {
  production: false,
  defaultLanguage: LanguageModel.LANGUAGE.PL,
  dictionaryDebugMode: true,
};
