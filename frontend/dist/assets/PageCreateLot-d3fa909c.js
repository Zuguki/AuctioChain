import{f as g,j as L,i as P,P as d}from"./index-de2d1123.js";import{u as I}from"./usePostAPI-61665161.js";import{u as F}from"./useDataUser-7a2b0287.js";import{u as b}from"./ImageForm-31ec2828.js";import{u as x,L as D}from"./useSendDataLot-dfaf43ce.js";import{L as S}from"./LotService-2ef5cf2f.js";import"./utils-73056672.js";const j=(t,a)=>{const{initialPrice:s,betStep:o}=t;return{...t,initialPrice:+s,betStep:+o,image:a}},y=()=>{const{id:t}=g(),{error:a,isPending:s,blurError:o,postData:r}=I(e=>S.addLot(e)),{dataUser:i,logicFormValue:n}=F(),{setFile:m,imageFile:c,postCorrectImage:u}=b(),{sendData:p}=x(),l=async()=>{o();const e=await u();if(!e)return;const f={...j(i,e),auctionId:t};await p(()=>r(f),P,`${d.auction}/${t}`)};return L.jsx(D,{submitForm:l,loading:s,error:a,logicFormValue:n,blurError:o,logicFileImage:{setFileImage:m,imageFile:c},componentInteraction:{title:"Создание лота",buttonText:"Создать",component:null}})};export{y as default};
