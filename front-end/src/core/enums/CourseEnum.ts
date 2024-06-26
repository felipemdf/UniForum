export enum COURSE {
  ADMINISTRACAO = 1,
  BIOMEDICINA = 2,
  ENFERMAGEM = 3,
  ENGENHARIA_CIVIL = 4,
  FARMACIA = 5,
  NUTRICAO = 6,
  ARQUITETURA_E_URBANISMO = 7,
  DIREITO = 8,
  ENGENHARIA_AMBIENTAL = 9,
  LETRAS = 10,
  PSICOLOGIA = 11,
  ANALISE_E_DESENVOLVIMENTO_DE_SISTEMA = 12,
  CIENCIAS_CONTABEIS = 13,
  ENGENHARIA_MECANICA = 14,
  GASTRONOMIA = 15,
  PEDAGOGIA = 16,
  SISTEMAS_DE_INFORMACAO = 17,
  CURSO_NAO_ENCONTRADO = -1
}

export const COURSE_LABELS: Record<COURSE, string> = {
  [COURSE.ADMINISTRACAO]: 'Administração',
  [COURSE.BIOMEDICINA]: 'Biomedicina',
  [COURSE.ENFERMAGEM]: 'Enfermagem',
  [COURSE.ENGENHARIA_CIVIL]: 'Engenharia Civil',
  [COURSE.FARMACIA]: 'Farmácia',
  [COURSE.NUTRICAO]: 'Nutrição',
  [COURSE.ARQUITETURA_E_URBANISMO]: 'Arquitetura e Urbanismo',
  [COURSE.DIREITO]: 'Direito',
  [COURSE.ENGENHARIA_AMBIENTAL]: 'Engenharia Ambiental',
  [COURSE.LETRAS]: 'Letras',
  [COURSE.PSICOLOGIA]: 'Psicologia',
  [COURSE.ANALISE_E_DESENVOLVIMENTO_DE_SISTEMA]: 'Análise e Desenvolvimento de Sistema',
  [COURSE.CIENCIAS_CONTABEIS]: 'Ciências Contábeis',
  [COURSE.ENGENHARIA_MECANICA]: 'Engenharia Mecânica',
  [COURSE.GASTRONOMIA]: 'Gastronomia',
  [COURSE.PEDAGOGIA]: 'Pedagogia',
  [COURSE.SISTEMAS_DE_INFORMACAO]: 'Sistemas de Informação',
  [COURSE.CURSO_NAO_ENCONTRADO]: ''
};

export function getCourseLabel(courseId: number | undefined): string {
  const course: COURSE = courseId as COURSE;
  return COURSE_LABELS[course] || COURSE_LABELS[COURSE.CURSO_NAO_ENCONTRADO];
}

export function getCourseValue(courseId: number | undefined): COURSE {
  return (courseId as COURSE) || COURSE.CURSO_NAO_ENCONTRADO;
}
