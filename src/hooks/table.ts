import { ref, reactive, type UnwrapNestedRefs, type Ref } from "vue";
import { useRouter, type LocationQueryRaw } from "vue-router";
import * as XLSX from "xlsx";

import { Modal, Message } from "@arco-design/web-vue";
import type { PaginationProps, TableRowSelection } from "@arco-design/web-vue";

import type { Pagination, PageInfo } from "@/types/global";
import type { AxiosResponse } from "axios";

import useLoading from "@/hooks/loading";

interface TableOption<T, P> {
  onEnable?: () => void;
  api: (params: P) => Promise<AxiosResponse<PageInfo<T>>>;
  apiDelete?: (id: string) => Promise<AxiosResponse<boolean>>;
  apiEnable?: (status: string, id: string) => Promise<AxiosResponse<boolean>>;
  keyword?: string;
  formModel: UnwrapNestedRefs<Pagination>;
  defaultValue?: T[];
  fetchData?: () => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchFormRef: Ref<any>;
  statusLabelMap?: Record<string, string>;
}
export default function useTable<T, P>(option: TableOption<T, P>) {
  const renderData = ref(option.defaultValue ?? []) as Ref<T[]>;
  const { loading, setLoading } = useLoading(true);
  const router = useRouter();

  const pagination = reactive<PaginationProps>({
    current: option.formModel.pageNum,
    pageSize: option.formModel.pageSize,
    showTotal: true,
    showJumper: true,
    showPageSize: true,
  });

  // 可自定义fetchData
  const handleFetch = async () => {
    setLoading(true);
    try {
      const { data } = await option.api(option.formModel as unknown as P);
      renderData.value = data.list;
      pagination.current = option.formModel.pageNum;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  // 加载数据
  const fetchData = option.fetchData ? option.fetchData : handleFetch;

  // 删除
  const handleDelete = (id: string) => {
    if (!option.apiDelete) {
      console.log("apiDelete cannot be null");
      return false;
    }
    Modal.warning({
      title: "温馨提示",
      content: `您确定要删除该${option.keyword}吗？`,
      simple: false,
      hideCancel: false,
      width: 420,
      onBeforeOk: async (done) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          await option.apiDelete!(id);
          Message.success("删除成功");
          fetchData();
        } catch (err) {
          // you can report use errorHandler or other
        } finally {
          done(true);
        }
      },
    });
  };

  // 搜索
  const handleSearch = () => {
    onPageChange(1);
  };

  // 重置
  const handleReset = () => {
    if (option.searchFormRef.value) {
      option.searchFormRef.value.resetFields();
    }
    onPageChange(1);
  };

  // 导出
  const handleExport = (element: string, prefix?: string) => {
    XLSX.writeFile(
      XLSX.utils.table_to_book(document.querySelector(element), {
        raw: false,
      }),
      prefix + "Presidents.xlsx"
    );
  };

  // 跳转
  const goPage = (name: string, query?: LocationQueryRaw) => {
    router.push({
      name,
      query,
    });
  };

  // 启用、禁用
  const handleEnable = (status: string | number | boolean, id: string) => {
    if (!option.statusLabelMap) {
      console.log("statusLabelMap cannot be null");
      return false;
    }
    if (!option.apiEnable) {
      console.log("apiEnable cannot be null");
      return false;
    }
    let resultStatus = "0";
    if (typeof status === "boolean") {
      status = status ? "1" : "0";
    } else {
      resultStatus = `${status}`;
    }
    Modal.warning({
      title: "温馨提示",
      content: `您确定要${option.statusLabelMap[resultStatus]}该${option.keyword}吗？`,
      simple: false,
      hideCancel: false,
      width: 420,
      onBeforeOk: async (done) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          await option.apiEnable!(resultStatus, id);

          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          Message.success(`${option.statusLabelMap![resultStatus]}成功`);
          fetchData();
        } catch (err) {
          // you can report use errorHandler or other
        } finally {
          done(true);
        }
      },
    });
  };

  // 分页切换
  const onPageChange = (page: number) => {
    option.formModel.pageNum = page;
    fetchData();
  };

  // 分页-页数
  const onPageSizeChange = (pageSize: number) => {
    option.formModel.pageSize = pageSize;
    pagination.pageSize = pageSize;
    onPageChange(1);
  };

  const initTable = () => {
    fetchData();
  };
  return {
    handleDelete,
    handleEnable,
    handleSearch,
    handleReset,
    handleExport,
    goPage,
    loading,
    setLoading,
    pagination,
    renderData,
    fetchData,
    initTable,
    onPageChange,
    onPageSizeChange,
  };
}

export function useTableSelection() {
  const rowSelection = reactive<TableRowSelection>({
    type: "checkbox",
    showCheckedAll: true,
    onlyCurrent: false,
  });
  const selectedKeys = ref([]);

  // const handleBatchDelete = () => {};
  // const handleBatchEnable = () => {};
  return {
    rowSelection,
    selectedKeys,
    // handleBatchDelete,
    // handleBatchEnable,
  };
}
