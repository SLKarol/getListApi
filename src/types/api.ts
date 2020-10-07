/**
 * Виды Cors
 */
export type Cors = "yes" | "no" | "unknown";

/**
 * Информация об апи
 */
export interface Api {
  API: string;
  Auth: string | null;
  Category: string;
  Cors: Cors;
  Description: string;
  HTTPS: boolean;
  Link: string;
}

/**
 * Сгруппированный список апи
 */
export interface GroupApi {
  [groupName: string]: Api[];
}

export type FetchState = "pending" | "done" | "error";

export type ResponseApi = {
  count: number;
  entries: Api[];
};

export type FieldNames = Extract<keyof Api, string>;
