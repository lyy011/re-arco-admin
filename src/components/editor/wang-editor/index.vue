<template>
  <div>
    <div>
      <a-button @click="handleFn('insertText')">insert text</a-button>
      <a-button @click="handleFn('printHtml')">print html</a-button>
      <a-button @click="handleFn('disable')">disable</a-button>
      <a-button @click="handleFn('clear')">clear</a-button>
    </div>
    <div style="border: 1px solid #ccc; margin-top: 10px">
      <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        :defaultConfig="editorConfig"
        v-model="valueHtml"
        style="height: 400px; overflow-y: hidden"
        @onCreated="handleCreated"
        @onChange="handleChange"
        @onDestroyed="handleDestroyed"
        @onFocus="handleFocus"
        @onBlur="handleBlur"
        @customAlert="customAlert"
        @customPaste="customPaste"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, ref, onBeforeUnmount } from "vue";

import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

const editorRef = shallowRef();
const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };
const mode = ref<"default" | "simple">("default");
const valueHtml = ref("");

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;

  editor.destroy();
});

const handleFn = (type: string) => {
  const editor = editorRef.value;
  switch (type) {
    case "insertText":
      if (editor == null) return;
      editor.insertText("hello world");
      break;
    case "printHtml":
      if (editor == null) return;
      console.log(editor.getHtml());
      break;
    case "disable":
      if (editor == null) return;
      if (editor.isDisabled()) {
        editor.enable();
      } else {
        editor.disable();
      }
      break;
    case "clear":
      editor.clear();
      break;
  }
};

// 编辑器回调函数
const handleCreated = (editor: any) => {
  console.log("created", editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const handleChange = () => {
  console.log("change");
};

const handleDestroyed = () => {
  console.log("destroyed");
};

const handleFocus = (editor: any) => {
  console.log("focus", editor);
};
const handleBlur = (editor: any) => {
  console.log("blur", editor);
};
const customAlert = (info: string, type: string) => {
  alert(`【自定义提示】${type} - ${info}`);
};
const customPaste = (editor: any, event: any, callback: any) => {
  console.log("ClipboardEvent 粘贴事件对象", event);

  // 自定义插入内容
  // editor.insertText("xxx");

  // 返回值（注意，vue 事件的返回值，不能用 return）
  // callback(false); // 返回 false ，阻止默认粘贴行为
  // callback(true) // 返回 true ，继续默认的粘贴行为
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
