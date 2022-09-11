/*
 * @Author: Lyy
 * @Date: 2022-08-24 17:44:23
 * @LastEditor: Lyy
 * @LastEditTime: 2022-09-02 17:52:35
 * @Description: 公共定义
 */
export interface AnyObject {
  [key: string]: unknown;
}

export interface Options<T> {
  value: T;
  label: string;
}

export interface NodeOptions<T> extends Options<T> {
  children?: NodeOptions<T>[];
}

export interface GetParams {
  body: null;
  type: string;
  url: string;
}

export interface PostData {
  body: string;
  type: string;
  url: string;
}

export interface Pagination {
  pageNum: number;
  pageSize: number;
  total?: number;
}

export interface PageInfo<T> {
  pageNum: number;
  pageSize: number;
  total: number;
  list: Array<T>;
  pages?: number;
}

export interface PageDateRange {
  startDate: string | null;
  endDate: string | null;
}

export type TimeRanger = [string, string];

export interface GeneralChart {
  xAxis: string[];
  data: Array<{ name: string; value: number[] }>;
}

// 转换对象类型 可选 && 可为null 浅转换
export type PartialOrNull<T> = {
  [P in keyof T]?: T[P] | null;
};
