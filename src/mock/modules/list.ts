import Mock from "mockjs";
import qs from "query-string";
import type { GetParams } from "@/types/global";
import setupMock, { successResponseWrap } from "../setup-mock";

const { Random } = Mock;

const data = Mock.mock({
  "list|55": [
    {
      "id|8": /[A-Z][a-z][-][0-9]/,
      "number|2-3": /[0-9]/,
      "name|4-8": /[A-Z]/,
      "contentType|1": ["img", "horizontalVideo", "verticalVideo"],
      "count|2-3": /[0-9]/,
      "status|1": [0, 1],
      "filterType|1": ["artificial", "rules"],
      createdTime: Random.datetime(),
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp("/api/list/policy"), (params: GetParams) => {
      const { pageNum = 1, pageSize = 10 } = qs.parseUrl(params.url).query;
      const p = pageNum as number;
      const ps = pageSize as number;
      const total = 55;
      return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total,
        pageNum,
        pageSize,
      });
    });
  },
});
