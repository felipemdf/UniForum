import type { Checkbox } from '../interfaces/Checkbox';

type GenericEnum = number | string;

export class CheckboxManager<TEnum extends GenericEnum, TLabel extends string> {
  private _checkboxes: Checkbox[];

  constructor(
    enumLabels: Record<TEnum, TLabel>,
    private defaultValue?: TEnum
  ) {
    this._checkboxes = this.generateCheckboxList(enumLabels, defaultValue);
  }

  private generateCheckboxList(
    enumLabels: Record<TEnum, TLabel>,
    defaultValue?: TEnum
  ): Checkbox[] {
    return Object.entries(enumLabels).map(([id, label]) => ({
      id: parseInt(id),
      label: label as string,
      checked: defaultValue !== undefined && parseInt(id) === defaultValue
    }));
  }

  getCheckedCheckboxesToString(): string {
    return this.checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id)
      .join(',');
  }

  resetCheckboxList() {
    this.checkboxes.forEach(
      (checkbox) =>
        (checkbox.checked = this.defaultValue !== undefined && checkbox.id === this.defaultValue)
    );
  }

  check(id: number) {
    this._checkboxes.forEach((checkbox) => (checkbox.checked = checkbox.id == id));
  }

  get checkboxes(): Checkbox[] {
    return this._checkboxes;
  }
}
