<template>
  <div>
    <editor :init="initOptions" id="myTinymce" v-model="contentValue" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Editor from "@tinymce/tinymce-vue";
import type { RawEditorOptions } from "tinymce";
import "tinymce";

import "tinymce/models/dom"; // 引入dom模块。从 Tinymce6，开始必须有此模块导入
import "tinymce/themes/silver"; // 默认主题
import "tinymce/icons/default"; // 引入编辑器图标icon，不引入则不显示对应图标

import "tinymce/plugins/advlist"; // 高级列表
import "tinymce/plugins/anchor"; // 锚点
import "tinymce/plugins/autolink"; // 自动链接
import "tinymce/plugins/autoresize"; // 编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
import "tinymce/plugins/autosave"; // 自动存稿
import "tinymce/plugins/charmap"; // 特殊字符
import "tinymce/plugins/code"; // 编辑源码
import "tinymce/plugins/codesample"; // 代码示例
import "tinymce/plugins/directionality"; // 文字方向
import "tinymce/plugins/emoticons"; // 表情
import "tinymce/plugins/fullscreen"; // 全屏
import "tinymce/plugins/help"; // 帮助
import "tinymce/plugins/image"; // 插入编辑图片
import "tinymce/plugins/importcss"; // 引入css
import "tinymce/plugins/insertdatetime"; // 插入日期时间
import "tinymce/plugins/link"; // 超链接
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/media"; // 插入编辑媒体
import "tinymce/plugins/nonbreaking"; // 插入不间断空格
import "tinymce/plugins/pagebreak"; // 插入分页符
import "tinymce/plugins/preview"; // 预览
import "tinymce/plugins/quickbars"; // 快速工具栏
import "tinymce/plugins/save"; // 保存
import "tinymce/plugins/searchreplace"; // 查找替换
import "tinymce/plugins/table"; // 表格
import "tinymce/plugins/template"; // 内容模板
import "tinymce/plugins/visualblocks"; // 显示元素范围
import "tinymce/plugins/visualchars"; // 显示不可见字符
import "tinymce/plugins/wordcount"; // 字数统计

interface PropsConfig {
  modelValue: string;
  height?: number;
  id?: string;
}
const props = withDefaults(defineProps<PropsConfig>(), {
  modelValue: "",
  height: 600,
  id: "myTinymce",
});

const emit = defineEmits(["update:modelValue"]);

const contentValue = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit("update:modelValue", value);
  },
});

const initOptions: RawEditorOptions = {
  language: "zh-Hans",
  language_url: "/tinymce/langs/zh-Hans.js",
  skin_url: "/tinymce/skins/ui/oxide",
  content_css: "/tinymce/skins/content/default/content.css",
  content_style:
    "body{font-size:14px;font-family:Microsoft YaHei,微软雅黑,宋体,Arial,Helvetica,sans-serif;line-height:1.5}img {max-width:100%;}",
  height: props.height,
  menubar: false,
  // menubar: "file edit view insert format tools table help",
  // menu: {
  //   file: {
  //     title: "File",
  //     items: "newdocument | preview | export | deleteallconversations",
  //   },
  //   edit: {
  //     title: "Edit",
  //     items: "undo redo restoredraft | cut copy | selectall | searchreplace",
  //   },
  //   view: {
  //     title: "View",
  //     items:
  //       "code | visualaid visualchars visualblocks | preview fullscreen | showcomments",
  //   },
  //   insert: {
  //     title: "Insert",
  //     items:
  //       "image link media addcomment pageembed template codesample inserttable | charmap emoticons | pagebreak nonbreaking anchor tableofcontents | insertdatetime",
  //   },
  //   format: {
  //     title: "Format",
  //     items:
  //       "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat",
  //   },
  //   tools: { title: "Tools", items: "a11ycheck code wordcount" },
  //   table: {
  //     title: "Table",
  //     items:
  //       "inserttable | cell row column | advtablesort | tableprops deletetable",
  //   },
  //   help: { title: "Help", items: "help" },
  // },
  toolbar_mode: "wrap",
  toolbar:
    "forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent  lineheight | styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media | indent2em formatpainter axupimgs| fullscreen code",
  plugins:
    "code codesample preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount autosave ",
  line_height_formats: "1 1.2 1.4 1.6 2", // 行高
  font_size_formats:
    "12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px", // 字体大小
  font_family_formats:
    "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
  images_file_types: "jpeg,jpg,png,gif,bmp",
  placeholder: "在这里输入文字",
  branding: false, // tiny技术支持信息是否显示
  statusbar: false, // 最下方的元素路径和字数统计那一栏是否显示
  elementpath: false, // 元素路径是否显示
  custom_undo_redo_levels: 10, // 撤销和重做的次数
  draggable_modal: true, // 对话框允许拖拽
  images_upload_handler: (blobInfo, progress) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open("POST", "postAcceptor.php");

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject(new Error());
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject(new Error(`HTTP Error: ${xhr.status}`));
          return;
        }

        const json = JSON.parse(xhr.responseText);

        if (!json || typeof json.location !== "string") {
          reject(new Error(`Invalid JSON: ${xhr.responseText}`));
          return;
        }

        resolve(json.location);
      };

      xhr.onerror = () => {
        reject(
          new Error(
            `Image upload failed due to a XHR Transport error. Code: ${xhr.status}`
          )
        );
      };

      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    });
  },
  file_picker_callback: (callback, value, meta) => {
    // 文件分类
    let filetype =
      ".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4";
    // 后端接收上传文件的地址
    let upurl = "/demo/upfile.php";
    // 为不同插件指定文件类型及后端地址
    switch (meta.filetype) {
      case "image":
        filetype = ".jpg, .jpeg, .png, .gif";
        upurl = "upimg.php";
        break;
      case "media":
        filetype = ".mp3, .mp4";
        upurl = "upfile.php";
        break;
      case "file":
      default:
    }

    // 模拟出一个input用于添加本地文件
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", filetype);
    input.click();
    input.onchange = function () {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        console.log(file.name);
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open("POST", upurl);
        xhr.onload = function () {
          if (xhr.status !== 200) {
            callback(`HTTP Error: ${xhr.status}`);
            return;
          }
          const json = JSON.parse(xhr.responseText);
          if (!json || typeof json.location !== "string") {
            callback(`Invalid JSON: ${xhr.responseText}`);
            return;
          }
          callback(json.location);
        };
      }

      // const formData = new FormData();
      // formData.append('file', file, file.name);
      // xhr.send(formData);
      // 下方被注释掉的是官方的一个例子
      // 放到下面给大家参考
      /* var reader = new FileReader();
            reader.onload = function () {
                // Note: Now we need to register the blob in TinyMCEs image blob
                // registry. In the next release this part hopefully won't be
                // necessary, as we are looking to handle it internally.
                var id = 'blobid' + (new Date()).getTime();
                var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(',')[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                // call the callback and populate the Title field with the file name
                callback(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file); */
    };
  },
};
</script>
<style scoped>
:deep(.tox .tox-promotion) {
  display: none;
}
</style>
