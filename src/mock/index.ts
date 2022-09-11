import Mock from "mockjs";

// 批量导入
import.meta.glob("./modules/*.ts", { eager: true });

Mock.setup({
  timeout: "600-1000",
});
