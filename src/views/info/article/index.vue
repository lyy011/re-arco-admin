<template>
  <div class="page-container">
    <Breadcrumb />
    <a-card
      class="general-card page-main"
      :title="($route.meta.title as string)"
    >
      <!-- 顶部 -->
      <a-form :model="formModel" layout="inline" class="table-search-form">
        <a-form-item field="filterType" label="栏目">
          <a-select
            v-model="formModel.filterType"
            :options="articleTypeOpts"
            placeholder="全部"
          />
        </a-form-item>
        <a-form-item field="name" label="标题">
          <a-input v-model="formModel.name" placeholder="请输入标题" />
        </a-form-item>
        <a-form-item field="filterType" label="类型">
          <a-select
            v-model="formModel.filterType"
            :options="articleTypeOpts"
            placeholder="全部"
          />
        </a-form-item>
        <a-form-item field="createdTime" label="创建时间" style="width: 300px">
          <a-range-picker v-model="rangeValue" style="width: 100%" />
        </a-form-item>
        <a-form-item field="status" label="状态">
          <a-select
            v-model="formModel.status"
            :options="statusOpts"
            placeholder="全部"
          />
        </a-form-item>
        <a-form-item class="table-search-form-btn">
          <a-button type="primary" @click="handleSearch">
            <template #icon>
              <icon-search />
            </template>
            <span>查询</span>
          </a-button>
          <a-button @click="handleReset">
            <template #icon>
              <icon-refresh />
            </template>
            <span>重置</span>
          </a-button>
        </a-form-item>
      </a-form>
      <!-- 操作栏 -->
      <div class="table-action-bar">
        <a-space wrap>
          <!-- <a-button type="primary" size="small">新建文章</a-button> -->
          <a-button type="primary" size="small">
            <template #icon>
              <icon-plus />
            </template>
            <span>新增</span>
          </a-button>
          <a-button type="primary" status="danger" size="small">删除</a-button>
          <a-button size="small">批量导入文章</a-button>
        </a-space>
        <a-button-group size="small">
          <a-button>
            <template #icon> <icon-refresh /> </template>
          </a-button>
          <a-button @click="onDownload">
            <template #icon> <icon-download /> </template>
          </a-button>
        </a-button-group>
      </div>
      <!-- table -->
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :data="renderData"
        :bordered="false"
        @page-change="onPageChange"
        id="pageTable"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
      >
        <template #columns>
          <a-table-column title="集合编号" data-index="number" />
          <a-table-column title="集合名称" data-index="name" />
          <a-table-column title="内容体裁" data-index="contentType">
            <template #cell="{ record }">
              <a-space>
                <a-avatar
                  v-if="record.contentType === 'img'"
                  :size="16"
                  shape="square"
                >
                  <img
                    alt="avatar"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-avatar
                  v-else-if="record.contentType === 'horizontalVideo'"
                  :size="16"
                  shape="square"
                >
                  <img
                    alt="avatar"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77721e365eb2ab786c889682cbc721c1.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-avatar v-else :size="16" shape="square">
                  <img
                    alt="avatar"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/ea8b09190046da0ea7e070d83c5d1731.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                内容体裁
              </a-space>
            </template>
          </a-table-column>
          <a-table-column title="内容量" data-index="count" />
          <a-table-column
            title="创建时间"
            data-index="createdTime"
            :width="200"
          />
          <a-table-column title="状态" data-index="status">
            <template #cell="{ record }">
              <span v-if="record.status === 0" class="circle"></span>
              <span v-else class="circle pass"></span>
              {{ statusMap[record.status] }}
            </template>
          </a-table-column>
          <a-table-column title="操作" data-index="operations" align="center">
            <template #cell="{ record }">
              <a-button
                type="text"
                size="small"
                @click="
                  $router.push({
                    name: 'articleDetail',
                    query: { id: record.id },
                  })
                "
                >查看</a-button
              >
              <a-button type="text" size="small">删除</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from "vue";
import * as XLSX from "xlsx";

import type { PaginationProps } from "@arco-design/web-vue";

import useLoading from "@/hooks/loading";
import useRangePicker from "@/hooks/range-picker";
import { useDictFromServer, useDict } from "@/hooks/dict";

import { EnableStatus } from "@/utils/enum";

import type { PolicyRecord, PolicyParams } from "@/api/list";
import { queryPolicyList } from "@/api/list";

const { loading, setLoading } = useLoading(true);

const formModel = reactive<PolicyParams>({
  startDate: null,
  endDate: null,
  pageSize: 20,
  pageNum: 1,
});
const { startDate, endDate } = toRefs(formModel);
const { rangeValue } = useRangePicker(startDate, endDate);

const renderData = ref<PolicyRecord[]>([]);
const pagination = reactive<PaginationProps>({
  current: formModel.pageNum,
  pageSize: formModel.pageSize,
  showTotal: true,
  showJumper: true,
  showPageSize: true,
});
const { dictList: articleTypeOpts, dictLabelMap: articleTypeMap } =
  useDictFromServer("articleType", { all: true });
const { dictList: statusOpts, dictLabelMap: statusMap } = useDict(
  EnableStatus,
  { all: true }
);
const selectedKeys = ref(["1", "2"]);

const rowSelection = reactive({
  type: "checkbox",
  showCheckedAll: true,
  onlyCurrent: true,
});

const handleSearch = () => {
  console.log(formModel);
  console.log("search");
};
const handleReset = () => {
  console.log("reset");
};
// 删除
const handleDelete = (ids: string[] | string) => {
  console.log(typeof ids);
};
handleDelete(["1", "2", "3"]);

const fetchData = async () => {
  setLoading(true);
  try {
    const { data } = await queryPolicyList(formModel);
    renderData.value = data.list;
    pagination.current = formModel.pageNum;
    pagination.total = data.total;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};

// const search = () => {
//   fetchData({
//     ...basePagination,
//     ...formModel.value,
//   } as unknown as PolicyParams);
// };
const onPageChange = (current: number) => {
  // fetchData({ ...basePagination, current });
};

const onDownload = () => {
  // const rows: any = [
  //   { name: "George Washington", birthday: "1732-02-22" },
  //   { name: "John Adams", birthday: "1735-10-19" },
  // ... one row per President
  // ];
  /* generate worksheet and workbook */
  // const worksheet = XLSX.utils.table_to_sheet(
  //   document.querySelector("#pageTable")
  // );
  // const workbook = XLSX.utils.book_new();
  // XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

  /* fix headers */
  // XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

  // console.log("sheet_to_json", XLSX.utils.sheet_to_json(worksheet));
  // const rowArr: any[] = XLSX.utils.sheet_to_json(worksheet);
  // /* calculate column width */
  // const arr = Object.values(
  //   rowArr.reduce((acc: any, pre: any) => {
  //     Object.keys(pre).forEach((key) => {
  //       if (!acc[key]) {
  //         acc[key] = [];
  //       }
  //       acc[key].push(pre[key]);
  //     });
  //     return acc;
  //   }, {})
  // );
  // worksheet["!cols"] = arr.map((colArr: any) => {
  //   return {
  //     wch: colArr.reduce((maxWidth: number, val: any) => {
  //       let valWidth = 0;
  //       if (val == null) {
  //         valWidth = 10;
  //       } else if (val.toString().charCodeAt(0) > 255) {
  //         // if chinese
  //         valWidth = val.toString().length * 2;
  //       } else {
  //         valWidth = val.toString().length;
  //       }
  //       return Math.max(maxWidth, valWidth);
  //     }, 10),
  //   };
  // });
  // console.log(worksheet["!cols"]);

  // const max_width = rows.reduce((w, r) => {
  //   return Math.max(w, r.name.length);
  // }, 10);
  // // set worksheet max width per col
  // const colWidth = rows.map((row) =>
  //   row.map((val: any) => {
  //     // if null/undefined
  // if (val == null) {
  //   return { wch: 10 };
  // } else if (val.toString().charCodeAt(0) > 255) {
  //   // if chinese
  //   return { wch: val.toString().length * 2 };
  // } else {
  //   return { wch: val.toString().length };
  // }
  //   })
  // );

  // worksheet["!cols"] = [{ wch: max_width }, { wch: 2 }];

  /* create an XLSX file and try to save to Presidents.xlsx */
  XLSX.writeFile(
    XLSX.utils.table_to_book(document.querySelector("#pageTable"), {
      raw: false,
    }),
    "Presidents.xlsx"
  );
};
fetchData();
</script>

<script lang="ts">
export default {
  name: "articleList",
};
</script>

<style lang="less" scoped></style>
