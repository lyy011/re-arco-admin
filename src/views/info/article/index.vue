<!--
 * @Author: Lyy
 * @Date: 2022-08-31 15:03:26
 * @LastEditors: Lyy
 * @LastEditTime: 2022-09-20 17:13:07
 * @Description: 文章列表
-->
<template>
  <div class="page-container">
    <Breadcrumb />
    <a-card
      class="general-card page-main"
      :title="($route.meta.title as string)"
    >
      <!-- 顶部 -->
      <a-form
        ref="searchFormRef"
        :model="formModel"
        layout="inline"
        class="table-search-form"
      >
        <a-form-item field="columnId" label="栏目">
          <a-select
            v-model="formModel.columnId"
            :options="columnOpts"
            placeholder="全部"
          />
        </a-form-item>
        <a-form-item field="title" label="标题">
          <a-input v-model="formModel.title" placeholder="请输入标题" />
        </a-form-item>
        <a-form-item field="articleType" label="类型">
          <a-select
            v-model="formModel.articleType"
            :options="articleTypeOpts"
            placeholder="全部"
          />
        </a-form-item>
        <a-form-item field="startDate" label="创建时间" style="width: 300px">
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
          <a-button type="primary" size="small" @click="goPage('articleAdd')">
            <template #icon>
              <icon-plus />
            </template>
            <span>新增</span>
          </a-button>
          <a-button type="primary" status="danger" size="small">删除</a-button>
          <a-button size="small">批量导入文章</a-button>
        </a-space>
        <a-button-group size="small">
          <a-button @click="handleSearch">
            <template #icon> <icon-refresh /> </template>
          </a-button>
          <a-button @click="handleExport('#pageTable', '文章数据')">
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
        @page-size-change="onPageSizeChange"
        id="pageTable"
        :row-selection="rowSelection"
        v-model:selectedKeys="selectedKeys"
      >
        <template #columns>
          <a-table-column title="栏目" data-index="columnName" :width="80" />
          <a-table-column title="标题" data-index="title" :width="180" />
          <a-table-column title="摘要" data-index="desc" :width="240" />
          <a-table-column title="作者" data-index="author" :width="100" />
          <a-table-column
            title="内容体裁"
            data-index="articleType"
            :width="100"
            align="center"
          >
            <template #cell="{ record }">
              <a-space>
                <a-avatar
                  v-if="record.articleType === '1'"
                  :size="16"
                  shape="square"
                >
                  <img
                    alt="avatar"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-avatar
                  v-else-if="record.articleType === '2'"
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
                {{ articleTypeMap[record.articleType] }}
              </a-space>
            </template>
          </a-table-column>
          <a-table-column
            title="排序"
            data-index="order"
            :width="90"
            align="center"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          />
          <a-table-column
            title="是否置顶"
            data-index="top"
            :width="100"
            align="center"
          >
            <template #cell="{ record }">
              <a-switch
                :model-value="record.top"
                :checked-value="1"
                :unchecked-value="0"
                size="small"
              />
            </template>
          </a-table-column>
          <a-table-column
            title="是否热门"
            data-index="hot"
            :width="100"
            align="center"
          >
            <template #cell="{ record }">
              <a-switch
                :model-value="record.hot"
                :checked-value="1"
                :unchecked-value="0"
                size="small"
              />
            </template>
          </a-table-column>
          <a-table-column
            title="是否推荐"
            data-index="recommend"
            :width="100"
            align="center"
          >
            <template #cell="{ record }">
              <a-switch
                :model-value="record.recommend"
                :checked-value="1"
                :unchecked-value="0"
                size="small"
              />
            </template>
          </a-table-column>
          <a-table-column
            title="是否隐藏"
            data-index="status"
            :width="100"
            align="center"
          >
            <template #cell="{ record }">
              <a-switch
                :model-value="record.status"
                :checked-value="1"
                :unchecked-value="0"
                size="small"
                @update:model-value="
                  (value) => {
                    handleEnable(value, record.id);
                  }
                "
              />
            </template>
          </a-table-column>
          <a-table-column
            title="创建时间"
            data-index="createTime"
            :width="180"
            align="center"
          >
          </a-table-column>
          <!-- <a-table-column title="状态" data-index="status">
            <template #cell="{ record }">
              <span v-if="record.status === 0" class="circle"></span>
              <span v-else class="circle pass"></span>
              {{ statusMap[record.status] }}
            </template>
          </a-table-column> -->
          <a-table-column
            title="操作"
            data-index="operations"
            align="center"
            :width="160"
            fixed="right"
          >
            <template #cell="{ record }">
              <a-button
                type="text"
                size="small"
                @click="goPage('articleAdd', { id: record.id })"
                >编辑</a-button
              >
              <a-button
                type="text"
                size="small"
                @click="handleDelete(record.id)"
                >删除</a-button
              >
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from "vue";

import useRangePicker from "@/hooks/range-picker";
import { useDictFromServer, useDict } from "@/hooks/dict";
import useTable, { useTableSelection } from "@/hooks/table";

import { DisplayStatus } from "@/utils/enum";

import {
  queryArticlePage,
  deleteArticle,
  changeArticleStatus,
  type ArticleRecord,
  type ArticleParams,
} from "@/api/article";

const formModel = reactive<ArticleParams>({
  startDate: null,
  endDate: null,
  pageSize: 20,
  pageNum: 1,
});
const { startDate, endDate } = toRefs(formModel);
const { rangeValue } = useRangePicker(startDate, endDate);
const searchFormRef = ref();
const { selectedKeys, rowSelection } = useTableSelection();

const { dictList: articleTypeOpts, dictLabelMap: articleTypeMap } =
  useDictFromServer("articleType", { all: true });

const { dictList: columnOpts } = useDictFromServer("columnOpts", { all: true });

const { dictList: statusOpts, dictLabelMap: statusLabelMap } = useDict(
  DisplayStatus,
  { all: true }
);

const {
  handleDelete,
  loading,
  pagination,
  renderData,
  handleSearch,
  handleReset,
  handleExport,
  handleEnable,
  onPageChange,
  onPageSizeChange,
  goPage,
  initTable,
} = useTable<ArticleRecord, ArticleParams>({
  keyword: "文章",
  formModel,
  api: queryArticlePage,
  apiDelete: deleteArticle,
  apiEnable: changeArticleStatus,
  searchFormRef,
  statusLabelMap,
});

initTable();
</script>

<script lang="ts">
export default {
  name: "articleList",
};
</script>

<style lang="less" scoped></style>
