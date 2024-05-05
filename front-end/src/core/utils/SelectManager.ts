import type { Select } from '../interfaces/Select';

type GenericEnum = number | string;

export class SelectManager<TEnum extends GenericEnum, TLabel extends string> {
  private _itens: Select[];

  constructor(
    enumLabels: Record<TEnum, TLabel>,
    private defaultValue?: TEnum
  ) {
    this._itens = this.generateSelectList(enumLabels, defaultValue);
  }

  private generateSelectList(enumLabels: Record<TEnum, TLabel>, defaultValue?: TEnum): Select[] {
    return Object.entries(enumLabels).map(([id, label]) => ({
      id: parseInt(id),
      label: label as string,
      selected: defaultValue !== undefined && parseInt(id) === defaultValue
    }));
  }

  getSelectedItem(): number {
    return this.itens.find((item) => item.selected)?.id || -1;
  }

  resetSelectList() {
    this._itens.forEach(
      (item) => (item.selected = this.defaultValue !== undefined && item.id === this.defaultValue)
    );
  }

  select(id: number) {
    this._itens.forEach((item) => (item.selected = item.id == id));
  }

  get itens(): Select[] {
    return this._itens;
  }
}
