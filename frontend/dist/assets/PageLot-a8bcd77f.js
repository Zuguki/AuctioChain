import{j as t,F as P,H as F,B as k,g as $,r as h,C as I,u as v,b as A,P as _,S as T,f as D,e as E,N as U}from"./index-de2d1123.js";import{L as b}from"./LogicDownload-41104aa4.js";import{C as S}from"./CloseButton-e966d2fe.js";import{u as f}from"./useGetAPI-8a4b8c88.js";import{L}from"./LotService-2ef5cf2f.js";import{u as G,F as H}from"./useDataUser-7a2b0287.js";import{u as M,L as R}from"./usePostAPI-61665161.js";import{A as y}from"./AuctionService-80fcdd5a.js";import{u as V,P as z}from"./useGetUserName-386ae884.js";import{a as w}from"./AuctionLogic-f40de452.js";import{u as W}from"./usePathLocation-e2385006.js";import"./useQuery-baed50f9.js";import"./utils-73056672.js";const q="_position_1kmsx_1",J="_left_1kmsx_5",K="_positionButton_1kmsx_10",O="_textBets_1kmsx_14",Q="_positionShowBet_1kmsx_19",X="_notBet_1kmsx_25",Y="_positionClose_1kmsx_33",Z="_right_1kmsx_39",tt="_information_1kmsx_44",st="_img_1kmsx_52",et="_auxiliaryText_1kmsx_59",ot="_linkLot_1kmsx_65",nt="_protectedText_1kmsx_70",it="_price_1kmsx_76",at="_btnArrow_1kmsx_80",ct="_informationBet_1kmsx_90",rt="_backgroundInformation_1kmsx_96",lt="_cannotAddBet_1kmsx_104",dt="_textCannotAddBet_1kmsx_118",s={position:q,left:J,positionButton:K,textBets:O,positionShowBet:Q,notBet:X,positionClose:Y,right:Z,information:tt,img:st,auxiliaryText:et,linkLot:ot,protectedText:nt,price:it,btnArrow:at,informationBet:ct,backgroundInformation:rt,cannotAddBet:lt,textCannotAddBet:dt},mt="_background_dpnir_1",xt="_form_dpnir_19",ut="_positionSubmit_dpnir_31",ht="_textInformation_dpnir_35",pt="_textBalance_dpnir_39",g={background:mt,form:xt,positionSubmit:ut,textInformation:ht,textBalance:pt},_t=({close:o,lot:r,setBet:n})=>{const{id:l,currentMaxBet:d,initialPrice:m,betStep:e}=r,{error:i,blurError:a,postData:c}=M(p=>L.postBetInLot(p));let{dataUser:x,logicFormValue:u}=G();const{data:{balance:j},isLoading:B}=f(()=>$.getBalanceUser(),["balance"]),N=async()=>{a(),x={...x,lotId:l};const p=await c(x);p&&n(p)};return t.jsx("div",{className:g.background,children:t.jsx(P,{className:g.form,onSubmit:N,children:t.jsx(b,{isLoading:B,children:t.jsxs(t.Fragment,{children:[t.jsx(S,{logicClick:o}),t.jsx("h3",{children:"Ставка"}),t.jsx(R,{loading:B,err:i}),t.jsxs("p",{className:g.textBalance,children:["На вашем счёте: ",j," Ac"]}),t.jsxs("p",{className:g.textInformation,children:["Цена на данный момент: ",d||m," Ac"]}),t.jsxs("p",{className:g.textInformation,children:["Минимальный шаг: ",e," Ac"]}),t.jsx(F,{width:"small"}),t.jsx(H,{title:"Ваша ставка",name:"amount",width:"small",type:"number",error:i,changeValue:u,errorBlur:a}),t.jsx("div",{className:g.positionSubmit,children:t.jsx(k,{type:"submit",children:"Поставить ставку"})})]})})})})},{isCreation:jt,isWaitBidding:gt}=w,Bt=h.memo(({lot:o})=>{const{image:r,auctionId:n,name:l,id:d}=o,{userStore:m}=h.useContext(I),e=v(),{data:i}=f(()=>y.getAuctionByID(n),["auction",n]),{userId:a}=i,{username:c}=V(a),x=a===m.user.userId&&(jt(i)||gt(i)),u=async()=>{try{await L.deleteLotById(d),e(`${_.auction}/${n}`)}catch{alert("Ошибка удаления лота!")}};return t.jsxs("div",{className:s.left,children:[t.jsx("img",{className:s.img,src:r,alt:"lot"}),c&&n&&t.jsxs(t.Fragment,{children:[t.jsxs("p",{className:s.auxiliaryText,children:["Владелец: ",t.jsxs(A,{to:`${_.account}/${a}`,className:s.linkLot,children:["@",c]})]}),t.jsxs("p",{className:s.auxiliaryText,children:["Аукцион: ",t.jsx(A,{className:s.linkLot,to:`${_.auction}/${n}`,children:l})]})]}),x&&t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:s.positionButton,children:[t.jsx(k,{onClick:()=>e(`${_.editLot}/${d}`),children:"Редактировать лот"}),t.jsx(k,{red:!0,onClick:u,style:{marginLeft:5},children:"Удалить лот"})]}),t.jsx("p",{className:s.protectedText,children:"Удаление и редактирование лотов доступно только в статусе создания аукциона и ожидания торгов!"})]}),t.jsx("p",{className:s.protectedText,children:"Все права защищены."})]})}),ft="/assets/collapse-6845353a.svg",kt="/assets/collapse close-5089fd48.svg",Lt=({betsLot:o,...r})=>{const[n,l]=h.useState(!1),[d,m]=h.useState(null);return h.useEffect(()=>{(async()=>{l(()=>!0);try{const e=await Promise.all(o.map(async i=>{const{userId:a,amount:c,id:x}=i,{data:{userName:u}}=await z.getUserName(a);return t.jsxs("p",{className:s.informationBet,children:["Пользователь @",u," поставил ставку"," ",c," Ac"]},x)}));m(()=>e)}catch{m(()=>t.jsx("p",{className:s.informationBet,children:"Не удалось загрузить данные"}))}finally{l(()=>!1)}})()},[o]),t.jsx("div",{...r,children:t.jsx(b,{isLoading:n,children:t.jsx(t.Fragment,{children:d})})})},Nt=({isLoading:o,children:r})=>t.jsx(t.Fragment,{children:o?t.jsx(T,{}):r}),bt=({lot:o,openBet:r})=>{const{data:{bets:n},isLoading:l}=f(()=>L.getBetsByLotID(o.id),["bets",o.id],{bets:[]}),{name:d,currentMaxBet:m,description:e,initialPrice:i,betStep:a,auctionId:c}=o,{data:x,isLoading:u,error:j}=f(()=>y.getAuctionByID(c),["auction",c]),[B,N]=h.useState(!1),p=!u&&w.isBidding(x);return t.jsxs("div",{className:s.right,children:[t.jsxs("div",{className:s.backgroundInformation,children:[t.jsx("h1",{children:d}),t.jsx("p",{children:e})]}),t.jsxs("div",{className:s.backgroundInformation,children:[t.jsxs("h3",{className:s.price,children:["Цена на рынке: ",m||i," Ac"]}),t.jsxs("div",{className:s.information,children:[t.jsxs("p",{children:["Начальная цена: ",i," Ac"]}),t.jsxs("p",{children:["Шаг: ",a," Ac"]}),t.jsx(Nt,{isLoading:l,children:t.jsx(t.Fragment,{children:!l&&!j&&t.jsxs("div",{children:[t.jsxs("p",{children:["Количество ставок: ",n.length]}),n.length!==0&&t.jsxs("div",{children:[t.jsx("p",{className:s.textBets,children:"Показать ставки"}),t.jsx("div",{className:s.positionShowBet,children:t.jsx("button",{className:s.btnArrow,onClick:()=>N(C=>!C),children:t.jsx("img",{src:B?kt:ft,alt:"arrow"})})}),t.jsx(Lt,{style:{display:B?"block":"none"},betsLot:n})]}),p&&t.jsx(k,{onClick:r,children:"Поставить ставку"})]})})})]})]}),!p&&t.jsx("div",{className:s.cannotAddBet,children:t.jsx("p",{className:s.textCannotAddBet,children:"Невозможно поставить ставку!"})})]})},Ut=()=>{const{id:o}=D(),{userStore:r}=h.useContext(I),n=v(),l=E(),[d,m]=h.useState(null);if(o==null)return alert("Ошибка загрузки страницы!"),t.jsx(U,{to:_.main});const{data:e,isLoading:i}=f(()=>L.getLotByID(o),["lot",d]),[a,c]=h.useState(!1),{fromPath:x}=W(`${_.auction}/${e.auctionId}`),u=()=>c(()=>!1),j=()=>{if(r.isAuth){c(()=>!0);return}n(_.authorization,{state:{from:l}})};return t.jsx(b,{isLoading:i,children:t.jsxs("div",{children:[t.jsx("div",{className:s.positionClose,children:t.jsx(S,{logicClick:x})}),e.auctionId&&e.id&&t.jsxs("div",{className:s.position,children:[t.jsx(Bt,{lot:e}),t.jsx(bt,{lot:e,openBet:j})]}),a&&t.jsx(_t,{setBet:m,lot:e,close:u})]})})};export{Ut as default};
