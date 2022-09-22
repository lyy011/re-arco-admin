<template>
  <div class="page-container">
    <Breadcrumb />
    <a-card
      class="general-card page-main"
      :title="($route.meta.title as string)"
    >
      <a-radio-group type="button" v-model="editorName">
        <a-radio value="wangEditor">wangEditor</a-radio>
        <a-radio value="tinymce">tinymce</a-radio>
        <a-radio value="quill">quill</a-radio>
      </a-radio-group>
      <div style="margin-top: 10px">
        <wang-editor v-if="editorName === 'wangEditor'"></wang-editor>
        <tinymce v-if="editorName === 'tinymce'"></tinymce>
        <quill v-if="editorName === 'quill'"></quill>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import WangEditor from "@/components/editor/wang-editor/index.vue";
import tinymce from "@/components/editor/tinymce/index.vue";
import quill from "@/components/editor/quill/index.vue";

const editorName = ref<"wangEditor" | "tinymce" | "quill">("wangEditor");
</script>
<style lang="scss" scoped></style>
