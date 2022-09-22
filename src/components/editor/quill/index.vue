<template>
  <div>
    <div ref="quillRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Quill from "quill";
const quillRef = ref();

onMounted(() => {
  const editor = new Quill(quillRef.value, {
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction

        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [
          {
            font: [
              "Microsoft YaHei",
              "Helvetica Neue",
              "PingFang SC",
              "sans-serif",
              "simsun",
              "serif",
              "FangSong,serif",
              "SimHei",
            ],
          },
        ],

        // "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",

        [{ align: [] }],

        ["clean"], // remove formatting button
        ["link", "image", "video"],
      ],
    },
    theme: "snow",
  });
});
</script>

<style lang="less" scoped>
:deep(.ql-container.ql-snow) {
  height: 300px;
}
</style>
<style src="quill/dist/quill.snow.css"></style>
<style lang="less">
.ql-picker-options {
  span[data-value="Microsoft YaHei"]::before {
    content: "微软雅黑";
  }
}
/* data-value="Microsoft YaHei" */
</style>
