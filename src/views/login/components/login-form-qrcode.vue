<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">请用招呼扫码登录</div>
    <div class="login-form-sub-title">登录xxxx</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-spin :loading="loading">
      <div class="login-form-qrcode">
        <qrcode :url="qrcodeUrl" @click="handleSubmit" />

        <div
          v-show="showQrcodeExpired"
          class="login-form-qrcode-expired"
          @click="getQrcodeUrl"
        >
          <span>二维码已过期</span>
          <span>点击重新获取</span>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
import { useUserStore } from "@/stores";
import useLoading from "@/hooks/loading";
import qrcode from "@/components/qrcode/index.vue";

const router = useRouter();
const errorMessage = ref("");

const userStore = useUserStore();

const qrcodeUrl = ref("");
const showQrcodeExpired = ref(false);
const { loading, setLoading } = useLoading(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await userStore.login({
      username: "admin", // 演示默认值
      password: "admin", // demo default value
    });
    const { redirect, ...othersQuery } = router.currentRoute.value.query;
    router.push({
      path: (redirect as string) || "/",
      query: {
        ...othersQuery,
      },
    });
    Message.success("登录成功");
  } catch (err) {
    errorMessage.value = (err as Error).message;
  } finally {
    setLoading(false);
  }
};
/** 获取二维码 */
const getQrcodeUrl = () => {
  showQrcodeExpired.value = false;
  setLoading(true);
  setTimeout(() => {
    qrcodeUrl.value = "https://baidu.com";
    setLoading(false);
    setTimeout(() => {
      showQrcodeExpired.value = true;
    }, 10 * 60 * 1000);
  }, 1500);
};

// 初始化
getQrcodeUrl();
</script>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 320px;
    text-align: center;
    padding-bottom: 30px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-qrcode {
    position: relative;
    width: 220px;
    height: 220px;
    background-color: var(--color-fill-1);
    &-expired {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.76);
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--color-white);
      font-size: 14px;
      line-height: 1.5;
    }
  }
}
</style>
