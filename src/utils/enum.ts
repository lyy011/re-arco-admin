import type { Options } from "@/types/global";

// 禁用/启用状态
export const EnableStatus: Options<string>[] = [
  {
    value: "0",
    label: "已禁用",
  },
  {
    value: "1",
    label: "已启用",
  },
];
