var h=Object.defineProperty,y=Object.defineProperties;var g=Object.getOwnPropertyDescriptors;var u=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable;var f=(a,e,r)=>e in a?h(a,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[e]=r,c=(a,e)=>{for(var r in e||(e={}))k.call(e,r)&&f(a,r,e[r]);if(u)for(var r of u(e))q.call(e,r)&&f(a,r,e[r]);return a},l=(a,e)=>y(a,g(e));import{d as v,s as w,v as _,e as n,h as B,f as i,C as S,A as m,F as x,af as C,y as F,z as T}from"./vendor.813164fd.js";import{u as b}from"./index.544f6c89.js";const z=["src"],A={name:"Iframe"},L=v(l(c({},A),{setup(a){const e=w(),r=b(),p=_(()=>r.data.filter(t=>{var s;return(s=t==null?void 0:t.query)==null?void 0:s.iframe}).map(t=>{var s;return(s=t==null?void 0:t.query)==null?void 0:s.iframe})),d=_(()=>e.query.iframe);return(t,s)=>(n(),B(C,{to:"#iframe"},[(n(!0),i(x,null,S(m(p),o=>F((n(),i("iframe",{src:o,key:o,frameborder:"0",width:"100%",height:"100%"},null,8,z)),[[T,m(d)===o]])),128))]))}}));export{L as default};
