import{u as L,F as q,_ as M}from"./index.cda8ade3.js";import{d as C,u as N,r as R,a as T,b as U,c as y,o as S,e as k,f as s,t as m,g as i,h as e,w as o,i as _,M as z,B as j,_ as A,j as Q,n as G,p as H,k as J}from"./index.eea0dd1e.js";import{I as K,C as O,L as W,S as X,a as Y}from"./index.df8d2805.js";import{F as Z,a as ee}from"./index.b3cb3c23.js";/* empty css              */import{u as oe}from"./loading.386dc66b.js";import"./get-value-by-path.6581d1e7.js";const se={class:"login-form-wrapper"},ae={class:"login-form-title"},te={class:"login-form-sub-title"},ne={class:"login-form-error-msg"},re={class:"login-form-password-actions"},ue=C({__name:"login-form",setup(r){const d=N(),p=R(""),{loading:g,setLoading:f}=oe(),b=T(),x="Admin",a=L("login-config",{rememberPassword:!0,username:"admin",password:"admin"}),u=U({username:a.value.username,password:a.value.password}),D=async({values:t,errors:n})=>{if(!n){f(!0);try{await b.login({username:t.username,password:t.password}),z.success("\u767B\u5F55\u6210\u529F");const{redirect:l,...v}=d.currentRoute.value.query;d.push({path:l||"/",query:{...v}});const{rememberPassword:c}=a.value,{username:h,password:w}=t;a.value.username=c?h:"",a.value.password=c?w:""}catch(l){p.value=l.message}finally{f(!1)}}},I=t=>{a.value.rememberPassword=t};return(t,n)=>{const l=y("icon-user"),v=K,c=ee,h=y("icon-lock"),w=Y,V=O,P=W,B=j,E=X,$=Z;return S(),k("div",se,[s("div",ae,"\u767B\u5F55 "+m(i(x)),1),s("div",te,"\u767B\u5F55 "+m(i(x)),1),s("div",ne,m(p.value),1),e($,{ref:"loginForm",model:u,class:"login-form",layout:"vertical",onSubmit:D},{default:o(()=>[e(c,{field:"username",rules:[{required:!0,message:"\u7528\u6237\u540D\u4E0D\u80FD\u4E3A\u7A7A"}],"validate-trigger":["change","blur"],"hide-label":""},{default:o(()=>[e(v,{modelValue:u.username,"onUpdate:modelValue":n[0]||(n[0]=F=>u.username=F),placeholder:"\u7528\u6237\u540D\uFF1Aadmin"},{prefix:o(()=>[e(l)]),_:1},8,["modelValue"])]),_:1}),e(c,{field:"password",rules:[{required:!0,message:"\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A"}],"validate-trigger":["change","blur"],"hide-label":""},{default:o(()=>[e(w,{modelValue:u.password,"onUpdate:modelValue":n[1]||(n[1]=F=>u.password=F),placeholder:"\u5BC6\u7801\uFF1Aadmin","allow-clear":""},{prefix:o(()=>[e(h)]),_:1},8,["modelValue"])]),_:1}),e(E,{size:16,direction:"vertical"},{default:o(()=>[s("div",re,[e(V,{checked:"rememberPassword","model-value":i(a).rememberPassword,onChange:I},{default:o(()=>[_("\u8BB0\u4F4F\u5BC6\u7801")]),_:1},8,["model-value","onChange"]),e(P,null,{default:o(()=>[_("\u5FD8\u8BB0\u5BC6\u7801")]),_:1})]),e(B,{type:"primary","html-type":"submit",long:"",loading:i(g)},{default:o(()=>[_(" \u767B\u5F55 ")]),_:1},8,["loading"]),e(B,{type:"text",long:"",class:"login-form-register-btn"},{default:o(()=>[_(" \u6CE8\u518C\u8D26\u53F7 ")]),_:1})]),_:1})]),_:1},8,["model"])])}}});const le=A(ue,[["__scopeId","data-v-288f92d6"]]),ce=r=>(H("data-v-43c10102"),r=r(),J(),r),ie={class:"logo"},de=ce(()=>s("img",{alt:"logo",src:M},null,-1)),_e={class:"logo-text"},me={class:"content"},pe={class:"footer"},ge=C({__name:"index",setup(r){const d="Admin",g=Q().theme==="dark";return(f,b)=>(S(),k("div",{class:G(["container",{dark:g}])},[s("div",ie,[de,s("div",_e,m(i(d)),1)]),s("div",me,[e(le)]),s("div",pe,[e(q)])],2))}});const Be=A(ge,[["__scopeId","data-v-43c10102"]]);export{Be as default};