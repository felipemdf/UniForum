export enum TAG {
  DUVIDA = 1,
  ARTIGO = 2,
  PROJETO = 3,
  OPORTUNIDADE = 4,
  EVENTO = 5,
  TAG_NAO_ENCONTRADA=-1
}

export const TAG_LABELS: Record<TAG, string> = {
  [TAG.DUVIDA]: 'Dúvida',
  [TAG.ARTIGO]: 'Artigo',
  [TAG.PROJETO]: 'Projeto',
  [TAG.OPORTUNIDADE]: 'Oportunidade',
  [TAG.EVENTO]: 'Evento',
  [TAG.TAG_NAO_ENCONTRADA]: ''
};

export function getTagLabel(tagId: number): string {
  const tag: TAG = tagId as TAG;
  return TAG_LABELS[tag] || TAG_LABELS[TAG.TAG_NAO_ENCONTRADA];
}
