import type { Options } from "@/types/global";

// 禁用/启用状态
export const EnableStatus: Options<string>[] = [
  {
    value: "0",
    label: "禁用",
  },
  {
    value: "1",
    label: "启用",
  },
];

// 隐藏/显示
export const DisplayStatus: Options<string>[] = [
  {
    value: "0",
    label: "隐藏",
  },
  {
    value: "1",
    label: "显示",
  },
];
