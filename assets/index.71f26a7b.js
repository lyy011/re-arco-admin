import{d as N,X as A,l as z,a6 as P,O as F,an as H,r as x,E as b,Q as O,D,h as c,A as I,c as T,$ as w,N as E,a8 as K,a9 as Q,aa as U,b as X,V as q,a4 as J,a5 as L}from"./index.4f8fb45a.js";const j=Symbol("RadioGroup");var C=N({name:"Radio",components:{IconHover:A},props:{modelValue:{type:[String,Number,Boolean],default:void 0},defaultChecked:{type:Boolean,default:!1},value:{type:[String,Number,Boolean],default:!0},type:{type:String,default:"radio"},disabled:{type:Boolean,default:!1},uninjectGroupContext:{type:Boolean,default:!1}},emits:{"update:modelValue":e=>!0,change:(e,i)=>!0},setup(e,{emit:i,slots:n}){const t=z("radio"),d=e.uninjectGroupContext?void 0:P(j,void 0),{mergedDisabled:$,eventHandlers:h}=F({disabled:H(e,"disabled")}),v=x(null),g=x(e.defaultChecked),p=b(()=>(d==null?void 0:d.name)==="ArcoRadioGroup"),m=b(()=>{var l;return(l=d==null?void 0:d.type)!=null?l:e.type}),f=b(()=>(d==null?void 0:d.disabled)||$.value),r=b(()=>{var l,u;return p.value?(d==null?void 0:d.value)===((l=e.value)!=null?l:!0):O(e.modelValue)?g.value:e.modelValue===((u=e.value)!=null?u:!0)});D(r,(l,u)=>{l!==u&&(g.value=l,v.value&&(v.value.checked=l))});const B=l=>{var u,o;(o=(u=h.value)==null?void 0:u.onFocus)==null||o.call(u,l)},k=l=>{var u,o;(o=(u=h.value)==null?void 0:u.onBlur)==null||o.call(u,l)},R=l=>{l.stopPropagation()},a=l=>{var u,o,_,V,S;g.value=!0,p.value?d==null||d.handleChange((u=e.value)!=null?u:!0,l):(i("update:modelValue",(o=e.value)!=null?o:!0),i("change",(_=e.value)!=null?_:!0,l),(S=(V=h.value)==null?void 0:V.onChange)==null||S.call(V,l)),I(()=>{v.value&&v.value.checked!==r.value&&(v.value.checked=r.value)})},s=b(()=>[`${m.value==="button"?`${t}-button`:t}`,{[`${t}-checked`]:r.value,[`${t}-disabled`]:f.value}]),y=()=>c(w,null,[c(T("icon-hover"),{class:`${t}-icon-hover`,disabled:f.value||r.value},{default:()=>[c("span",{class:`${t}-icon`},null)]}),n.default&&c("span",{class:`${t}-label`},[n.default()])]);return()=>{var l,u,o,_;return c("label",{class:s.value},[c("input",{ref:v,type:"radio",checked:r.value,value:e.value,class:`${t}-target`,disabled:f.value,onClick:R,onChange:a,onFocus:B,onBlur:k},null),m.value==="radio"?(_=(o=(u=n.radio)!=null?u:(l=d==null?void 0:d.slots)==null?void 0:l.radio)==null?void 0:o({checked:r.value,disabled:f.value}))!=null?_:y():c("span",{class:`${t}-button-content`},[n.default&&n.default()])])}}}),G=N({name:"RadioGroup",props:{modelValue:{type:[String,Number,Boolean],default:void 0},defaultValue:{type:[String,Number,Boolean],default:""},type:{type:String,default:"radio"},size:{type:String},options:{type:Array},direction:{type:String,default:"horizontal"},disabled:{type:Boolean,default:!1}},emits:{"update:modelValue":e=>!0,change:(e,i)=>!0},setup(e,{emit:i,slots:n}){const t=z("radio-group"),{size:d,type:$,disabled:h}=E(e),{mergedDisabled:v,mergedSize:g,eventHandlers:p}=F({size:d,disabled:h}),m=x(e.defaultValue),f=b(()=>{var a;return(a=e.modelValue)!=null?a:m.value}),r=b(()=>{var a;return((a=e.options)!=null?a:[]).map(s=>K(s)||Q(s)?{label:s,value:s}:s)});U(j,X({name:"ArcoRadioGroup",value:f,size:g,type:$,disabled:v,slots:n,handleChange:(a,s)=>{var y,l;m.value=a,i("update:modelValue",a),i("change",a,s),(l=(y=p.value)==null?void 0:y.onChange)==null||l.call(y,s)}})),D(f,a=>{m.value!==a&&(m.value=a)});const k=b(()=>[`${t}${e.type==="button"?"-button":""}`,`${t}-size-${g.value}`,`${t}-direction-${e.direction}`,{[`${t}-disabled`]:v.value}]),R=()=>r.value.map(a=>c(C,{key:a.value,value:a.value,disabled:a.disabled,modelValue:f.value===a.value},{default:()=>[n.label?n.label({data:a}):q(a.label)?a.label():a.label]}));return()=>{var a;return c("span",{class:k.value},[r.value.length>0?R():(a=n.default)==null?void 0:a.call(n)])}}});const W=Object.assign(C,{Group:G,install:(e,i)=>{J(e,i);const n=L(i);e.component(n+C.name,C),e.component(n+G.name,G)}});export{W as R,G as a};