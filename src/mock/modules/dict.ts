import Mock from "mockjs";
import qs from "query-string";
import type { GetParams } from "@/types/global";
import setupMock, { successResponseWrap } from "../setup-mock";

const data: Record<string, any> = {
  articleType: [
    {
      value: "1",
      label: "文章",
    },
    {
      value: "2",
      label: "公告",
    },
    {
      value: "3",
      label: "图文",
    },
  ],
};

setupMock({
  setup() {
    Mock.mock(new RegExp("/api/dict/get"), (params: GetParams) => {
      const { key }: { key?: string } = qs.parseUrl(params.url).query;
      return successResponseWrap(key && data[key] ? data[key] : []);
    });
  },
});
