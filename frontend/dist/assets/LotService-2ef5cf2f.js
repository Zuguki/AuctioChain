var r=Object.defineProperty;var L=(e,t,s)=>t in e?r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var o=(e,t,s)=>(L(e,typeof t!="symbol"?t+"":t,s),s);import{$ as a,p as n}from"./index-de2d1123.js";class h{constructor(){o(this,"pathLots","auction/lots");o(this,"pathLotBets",`${this.pathLots}/bets`)}async getLots(t,s=1,p=3){return a.get(`${this.pathLots}`,{params:{AuctionId:t,...n(s,p)}})}async getLotByID(t){return a.get(`${this.pathLots}/${t}`)}async getBetsByLotID(t){return a.get(`${this.pathLotBets}`,{params:{LotId:t}})}async postBetInLot(t){return a.post(`${this.pathLotBets}`,t)}async addLot(t){return a.post(`${this.pathLots}`,t)}async updateLot(t){return a.put(`${this.pathLots}`,t)}async deleteLotById(t){return a.delete(`${this.pathLots}`,{params:{LotId:t}})}}const $=new h;export{$ as L};
