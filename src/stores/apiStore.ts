import { makeAutoObservable, runInAction } from "mobx";

import type { RootStore } from "./index";
import * as Types from "types/api";
import { CheckValues, SettingsCheckbox } from "types/filter";

import { EMPTY_FIELD } from "utils/utils";

export class ApiStore {
  rootStore: RootStore;
  list: Types.Api[] = [];
  state: Types.FetchState = "done";

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }
  loadApi = async () => {
    this.state = "pending";
    try {
      const response = await fetch("https://api.publicapis.org/entries");
      const result = (await response.json()) as Types.ResponseApi;
      const { entries } = result;
      runInAction(() => {
        this.list = entries;
        this.state = "done";
        this.rootStore.filterStore.initSettings(entries);
      });
    } catch (e) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };

  get countAll() {
    return this.list.length;
  }
  get stateText() {
    switch (this.state) {
      case "done":
        return "Список публичных api";
      case "error":
        return "Ошибка получения списка";
      case "pending":
        return "Загрузка ...";
      default:
        return this.state as never;
    }
  }

  /**
   * Список категорий
   */
  get listCategory() {
    let reSet = new Set<string>();
    this.list.forEach((a) => reSet.add(a.Category));
    const array = Array.from(reSet).sort();
    return array;
  }

  /**
   * Сгруппированный список публичных апи
   */
  get listApi() {
    const list = this.getFilteredList();
    const group = list.reduce(this.reduceGroupApi, {});
    return group;
  }

  /**
   * Список категорий по фильтрованному списку
   */
  get listFilteredCategory() {
    let reSet = new Set<string>();
    this.getFilteredList().forEach((a) => reSet.add(a.Category));
    const array = Array.from(reSet).sort();
    return array;
  }

  /**
   * Количество отфильтрованных записей
   */
  get countFiltered() {
    return this.getFilteredList().length;
  }

  /**
   * Отдать выбранные ключи
   */
  private getSelectedKeys(setting: SettingsCheckbox) {
    let arraySetting: CheckValues[] = Object.entries(setting);
    let selectedKeys = arraySetting
      .filter(this.getCheckValue)
      .reduce(this.reduceValues, []);
    return selectedKeys;
  }

  /**
   * Возвращает отфильтрованный список
   */
  private getFilteredList() {
    let { list } = this;
    const {
      selectedCategory,
      settingAuth,
      settingCors,
    } = this.rootStore.filterStore;
    //--- Auth
    let selectedKeys = this.getSelectedKeys(settingAuth);
    if (selectedKeys.length) {
      list = list.filter(this.filterApi, {
        selectedKeys,
        field: "Auth" as Types.FieldNames,
      });
    }
    //---Cors
    selectedKeys = this.getSelectedKeys(settingCors);
    if (selectedKeys.length) {
      list = list.filter(this.filterApi, {
        selectedKeys,
        field: "Cors" as Types.FieldNames,
      });
    }
    //---Category
    if (selectedCategory.length) {
      list = list.filter(this.filterApi, {
        selectedKeys: selectedCategory,
        field: "Category" as Types.FieldNames,
      });
    }
    return list;
  }

  /**
   * Группировка апи
   */
  private reduceGroupApi(groupApi: Types.GroupApi, a: Types.Api) {
    groupApi[a.Category] = [...(groupApi[a.Category] || []), a];
    return groupApi;
  }

  /**
   * Вернуть выбранное значение в кортеже CheckValues
   */
  private getCheckValue(record: CheckValues) {
    return record[1];
  }

  /**
   * Собрать в массив все выбранные значения из CheckValues[]
   */
  private reduceValues(a: string[], s: CheckValues) {
    a.push(s[0] === EMPTY_FIELD ? "" : s[0]);
    return a;
  }
  private filterApi(
    this: { selectedKeys: string[]; field: Types.FieldNames },
    api: Types.Api
  ) {
    const { field, selectedKeys } = this;
    return selectedKeys.some((k) => k === api[field]);
  }
}
