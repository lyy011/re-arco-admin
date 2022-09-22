/*
 * @Author: Lyy
 * @Date: 2022-09-05 14:07:22
 * @LastEditor: Lyy
 * @LastEditTime: 2022-09-20 16:18:30
 * @Description: 数据字典
 */

import { computed, ref } from "vue";
import type { Options } from "@/types/global";
import { getDictByKey } from "@/api/common";

const allSelectItem = [{ label: "全部", value: "" }];

interface DictOption {
  all: boolean;
}
export function useDictFromServer(dictKey: string, option?: DictOption) {
  const dictList = ref<Options<string>[]>([]);

  const loading = ref(false);

  const setDictList = async () => {
    dictList.value = [];
    loading.value = true;
    try {
      const { data: dictData } = await getDictByKey(dictKey);
      if (dictData && dictData.length > 0) {
        dictList.value = option?.all
          ? allSelectItem.concat(dictData)
          : dictData;
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      loading.value = false;
    }
  };

  const dictLabelMap = computed(() => {
    return dictList.value.reduce((dist: Record<string, string>, o) => {
      const obj = dist;
      if (o.value) {
        obj[o.value] = o.label;
      }
      return obj;
    }, {});
  });

  setDictList();
  return {
    dictList,
    dictLabelMap,
    loading,
    setDictList,
  };
}

export function useDict(data: Options<string>[], option?: DictOption) {
  const dictList = ref(
    option?.all && data.length > 0 ? allSelectItem.concat(data) : data
  );

  const dictLabelMap = dictList.value.reduce(
    (dist: Record<string, string>, o) => {
      const obj = dist;
      if (o.value) {
        obj[o.value] = o.label;
      }
      return obj;
    },
    {}
  );

  return {
    dictList,
    dictLabelMap,
  };
}
