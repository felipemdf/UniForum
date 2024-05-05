export enum TAG {
  DUVIDA = 1,
  ARTIGO = 2,
  PROJETO = 3,
  OPORTUNIDADE = 4,
  EVENTO = 5
}

export const TAG_LABELS: Record<TAG, string> = {
  [TAG.DUVIDA]: 'Dúvida',
  [TAG.ARTIGO]: 'Artigo',
  [TAG.PROJETO]: 'Projeto',
  [TAG.OPORTUNIDADE]: 'Oportunidade',
  [TAG.EVENTO]: 'Evento'
};
