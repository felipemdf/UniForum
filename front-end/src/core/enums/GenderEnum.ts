export enum GENDER {
  MASCULINO = 1,
  FEMININO = 2,
  NAO_ENCONTRADO = 3
}

export const GENDER_LABELS: Record<GENDER, string> = {
  [GENDER.MASCULINO]: 'Masculino',
  [GENDER.FEMININO]: 'Feminino',
  [GENDER.NAO_ENCONTRADO]: ''
};

export function getGenderLabel(genderId: number | undefined): string {
  const gender: GENDER = genderId as GENDER;
  return GENDER_LABELS[gender] || GENDER_LABELS[GENDER.NAO_ENCONTRADO];
}
