import { computed, type Ref } from "vue";
export default function useRangePicker(
  starDate: Ref<string | null>,
  endDate: Ref<string | null>
) {
  const rangeValue = computed({
    get: () => {
      if (starDate.value && endDate.value) {
        return [starDate.value, endDate.value];
      }
      return [];
    },
    set: (arr) => {
      if (arr && arr.length > 0) {
        starDate.value = arr[0];
        endDate.value = arr[1];
      } else {
        starDate.value = null;
        endDate.value = null;
      }
    },
  });

  return {
    rangeValue,
  };
}
