import type { Options } from "@/types/global";
import axios from "axios";

/**
 * 字典
 * @param key key值
 * @returns
 */
export function getDictByKey(key: string) {
  return axios.get<Options<string>[]>("/api/dict/get", { params: { key } });
}
