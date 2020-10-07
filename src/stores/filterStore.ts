import { makeAutoObservable } from "mobx";

import type { RootStore } from "./index";
import * as Types from "types/api";
import { SettingsCheckbox } from "types/filter";

import { EMPTY_FIELD } from "utils/utils";

export class FilterStore {
  rootStore: RootStore;
  settingAuth: SettingsCheckbox;
  settingCors: SettingsCheckbox;
  selectedCategory: string[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.settingAuth = {};
    this.settingCors = {};
  }

  initSettings(entries: Types.Api[]) {
    this.settingAuth = this.collectCheckSetting(entries, "Auth");
    this.settingCors = this.collectCheckSetting(entries, "Cors");
  }

  /**
   * Собирает значения из списка апи
   * @param entries список апи
   * @param nameSetting имя поля
   */
  private collectCheckSetting(
    entries: Types.Api[],
    nameSetting: Types.FieldNames
  ) {
    let reSet = new Set<string>();
    entries.forEach((a) => reSet.add(a[nameSetting] as string));
    let arraySettings = Array.from(reSet).sort();
    // Дать название пустому значению
    arraySettings = this.renameEmptyName(arraySettings);
    return arraySettings.reduce(this.reduceCheckSettings, {});
  }

  /**
   * Сохранение настроек в объект
   * @param r
   * @param c
   */
  private reduceCheckSettings(r: SettingsCheckbox, c: string) {
    r[c] = false;
    return r;
  }

  private renameEmptyName(a: string[], emptyName: string = EMPTY_FIELD) {
    const idx = a.findIndex(this.checkEmptyString);
    if (idx > -1) a[idx] = emptyName;
    return a;
  }

  changeFilter = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const { setting } = e.target.dataset;
    const { name } = e.target;
    if (setting === "selectedCategory") {
      if (!checked) {
        const idx = this.selectedCategory.indexOf(name);
        this.selectedCategory.splice(idx, 1);
      } else this.selectedCategory.push(name);
    }
    if (setting === "settingCors") {
      this.settingCors[name] = checked;
    }
    if (setting === "settingAuth") {
      this.settingAuth[name] = checked;
    }
  };

  /**
   * Список настроек "Категории"
   */
  get settingCategories() {
    const re = this.rootStore.apiStore.listCategory.reduce(
      (a: SettingsCheckbox, id) => {
        a[id] = id in this.selectedCategory;
        return a;
      },
      {}
    );
    return re;
  }

  private checkEmptyString(s: string) {
    return !s.length;
  }
}
