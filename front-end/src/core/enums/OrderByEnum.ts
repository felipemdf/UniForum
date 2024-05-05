export enum ORDER_BY {
  MAIS_RECENTES = 1,
  MELHORES = 2
}

export const ORDER_BY_LABELS: Record<ORDER_BY, string> = {
  [ORDER_BY.MAIS_RECENTES]: 'Mais recentes',
  [ORDER_BY.MELHORES]: 'Melhores'
};
