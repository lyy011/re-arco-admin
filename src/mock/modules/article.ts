import Mock from "mockjs";
import qs from "query-string";
import type { GetParams } from "@/types/global";
import setupMock, { successResponseWrap } from "../setup-mock";
import { formatDate } from "@/utils";

const columnList = ["生活", "美食", "科技", "游戏"];
const { Random } = Mock;

const data = Mock.mock({
  "list|55": [
    {
      "id|8": /[A-Z][a-z][-][0-9]/,
      "title|4-8": /[A-Z]/,
      content: "文章内容",
      desc: "摘要内容摘要内容...",
      author: Random.cname(),
      columnName: "",
      "columnId|1": /[1-4]/,
      "order|1": /[1-99]/,
      "top|1": [0, 1],
      "hot|1": [0, 1],
      "recommend|1": [0, 1],
      "articleType|1": ["1", "2"],
      "status|1": [0, 1],
      createTime: formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp("/api/article/page"), (params: GetParams) => {
      const {
        pageNum = 1,
        pageSize = 10,
        columnId = null,
        title = null,
        articleType = null,
        startDate = null,
        endDate = null,
        status = null,
      } = qs.parseUrl(params.url).query;
      const p = pageNum as number;
      const ps = pageSize as number;
      const total = 55;
      let filterList = data.list;
      filterList = filterList.filter((o: any) => {
        let flag = true;
        if (columnId != null && columnId !== "") {
          flag = flag && o.columnId === columnId;
        }
        if (title) {
          flag = flag && o.title.indexOf(title) > -1;
        }
        if (articleType) {
          flag = flag && o.articleType === articleType;
        }
        if (startDate && endDate) {
          flag =
            flag &&
            formatDate(o.createTime, "yyyy-MM-dd") >= startDate &&
            formatDate(o.createTime, "yyyy-MM-dd") <= endDate;
        }
        if (status != null) {
          flag = flag && o.status == status;
        }
        return flag;
      });

      const list = filterList.slice((p - 1) * ps, p * ps);
      list.map((o: any) => {
        o.columnName = columnList[o.columnId - 1];
      });
      return successResponseWrap({
        list,
        total,
        pageNum,
        pageSize,
      });
    });
    Mock.mock(
      new RegExp("/api/article/delete"),
      "delete",
      (params: GetParams) => {
        const { id } = qs.parseUrl(params.url).query;
        return successResponseWrap(true);
      }
    );
    Mock.mock(new RegExp("/api/article/enable"), "put", (params: GetParams) => {
      const { id } = qs.parseUrl(params.url).query;
      return successResponseWrap(true);
    });
  },
});
