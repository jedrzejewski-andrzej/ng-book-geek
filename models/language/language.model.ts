export namespace LanguageModel {
  export enum LANGUAGE {
    PL = 'pl',
  }

  export function isValidLanguage(
    language: string | LanguageModel.LANGUAGE,
  ): boolean {
    return Object.values(LanguageModel.LANGUAGE).includes(
      language as LanguageModel.LANGUAGE,
    );
  }
}
