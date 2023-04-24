
export type languageTypes = 'English' | 'Sinhala' | 'Tamil';

export type flagTypes = 'en' | 'si' | 'ta';

export interface langState {
    flag: flagTypes;
    lang?: languageTypes;
}
