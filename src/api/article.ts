import axios from "axios";
import qs from "query-string";
import type { Pagination, PageInfo, PageDateRange } from "@/types/global";

export interface ArticleRecord {
  id: string;
  title: string;
  content: string;
  desc: string;
  author: string;
  order: number;
  top: number;
  hot: number;
  recommend: number;
  articleType: string;
  status: number;
  columnName: string;
  columnId: number;
  createdTime: string;
}

// 可选/查询参数
export type ArticleParams = Partial<ArticleRecord> & PageDateRange & Pagination;

export type ArticleListRes = PageInfo<ArticleRecord>;

export function queryArticlePage(params: ArticleParams) {
  return axios.get<ArticleListRes>("/api/article/page", {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function deleteArticle(id: string) {
  return axios.delete<boolean>("/api/article/delete", {
    params: { id },
  });
}

export function changeArticleStatus(status: string, id: string) {
  return axios.put<boolean>("/api/article/enable", {
    params: { status, id },
  });
}
