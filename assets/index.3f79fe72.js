import{d as r,l as u,h as t,a6 as m,bm as f,E as v,$ as c,bd as z,aW as x,I as $,a4 as y,a5 as h}from"./index.4f8fb45a.js";const C=5;var S=r({name:"DotLoading",props:{size:{type:Number}},setup(e){const n=u("dot-loading");return()=>{const i=e.size?{width:`${e.size}px`,height:`${e.size}px`}:{};return t("div",{class:n,style:{width:e.size?`${e.size*7}px`:void 0,height:e.size?`${e.size}px`:void 0}},[Array(C).fill(1).map((a,o)=>t("div",{class:`${n}-item`,key:o,style:i},null))])}}}),l=r({name:"Spin",props:{size:{type:Number},loading:Boolean,dot:Boolean,tip:String},setup(e,{slots:n}){const i=u("spin"),a=m(f,void 0),o=v(()=>[i,{[`${i}-loading`]:e.loading,[`${i}-with-tip`]:e.tip&&!n.default}]),g=()=>{if(n.icon){const s=z(n.icon());if(s)return x(s,{spin:!0})}return n.element?n.element():e.dot?t(S,{size:e.size},null):a!=null&&a.slots.loading?a.slots.loading():t($,{spin:!0},null)},d=()=>{const s=e.size?{fontSize:`${e.size}px`}:void 0;return t(c,null,[t("div",{class:`${i}-icon`,style:s},[g()]),e.tip&&t("div",{class:`${i}-tip`},[e.tip])])};return()=>t("div",{class:o.value},[n.default?t(c,null,[n.default(),e.loading&&t("div",{class:`${i}-mask`},[t("div",{class:`${i}-mask-icon`},[d()])])]):d()])}});const p=Object.assign(l,{install:(e,n)=>{y(e,n);const i=h(n);e.component(i+l.name,l)}});export{p as S};
