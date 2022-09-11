<template>
  <div class="container" :class="{ dark: isDark }">
    <div class="logo">
      <img alt="logo" src="@/assets/logo.svg" />
      <div class="logo-text">{{ appTitle }}</div>
    </div>
    <div class="content">
      <LoginForm />
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Footer from "@/components/footer/index.vue";
// import LoginFormQrcode from "./components/login-form-qrcode.vue";
import LoginForm from "./components/login-form.vue";
import { useAppStore } from "@/stores";

const appTitle = import.meta.env.VITE_APP_TITLE;
const appStore = useAppStore();

const isDark = appStore.theme === "dark";
</script>

<style lang="less" scoped>
.container {
  position: relative;
  height: 100vh;
  background-color: #f3f7f9;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-image: url("@/assets/images/login/login-bg.png");
  background-size: cover;
  &.dark {
    background-image: none;
    background-color: var(--color-bg-1);
    .content {
      background-color: var(--color-bg-2);
    }
  }
  .footer {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
  }
  .content {
    background-color: var(--color-bg-1);
    padding: 30px 55px 20px;
    border-radius: var(--border-radius-medium);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
}

.logo {
  position: fixed;
  top: 24px;
  left: 22px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  & > img {
    width: 34px;
    height: 34px;
  }
  &-text {
    margin-right: 4px;
    margin-left: 4px;
    color: var(--color-text-1);
    font-size: 20px;
  }
}
</style>
