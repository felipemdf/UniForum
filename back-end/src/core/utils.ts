export function getArrayNumberFromQueryParam(queryParam: string): any[] {
  return queryParam != undefined && queryParam.trim().length > 0
    ? queryParam.split(",").map((v) => parseInt(v, 10))
    : [];
}
