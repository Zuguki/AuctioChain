var n=Object.defineProperty;var o=(r,e,t)=>e in r?n(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var i=(r,e,t)=>(o(r,typeof e!="symbol"?e+"":e,t),t);import{$ as a,p as u}from"./index-de2d1123.js";import{u as g}from"./useQuery-baed50f9.js";class c{constructor(){i(this,"pathProfile","profiles")}async getUserName(e){return a.get(`${this.pathProfile}/userName`,{params:{UserId:e}})}async getProfileAuctions(e,t=1,s=3){return a.get(`${this.pathProfile}/auctions`,this.getConfig(e,t,s))}async getActiveLots(e,t=1,s=3){return a.get(`${this.pathProfile}/activeLots`,this.getConfig(e,t,s))}async getWinLot(e,t=1,s=3){return a.get(`${this.pathProfile}/winLots`,this.getConfig(e,t,s))}getConfig(e,t,s){return{params:{...u(t,s),UserId:e}}}}const f=new c,P=r=>{const{data:e,isLoading:t,error:s}=g({queryKey:["username",r],queryFn:async()=>await f.getUserName(r)});return{username:(e==null?void 0:e.data.userName)??null,isLoading:t,error:s}};export{f as P,P as u};
