var P=Object.defineProperty;var f=(t,s,r)=>s in t?P(t,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[s]=r;var g=(t,s,r)=>(f(t,typeof s!="symbol"?s+"":s,r),r);import{r as i,j as e,u as j,C as v,R as C,P as b}from"./index-de2d1123.js";import{u as q,F as N}from"./useAuthResponse-c0e770c2.js";import{F as p,u as R}from"./useDataUser-7a2b0287.js";import{C as k}from"./CloseButton-e966d2fe.js";import"./usePostAPI-61665161.js";import"./utils-73056672.js";import"./usePathLocation-e2385006.js";const F="_div_5cg0t_1",I="_label_5cg0t_10",_={div:F,label:I},U=i.forwardRef(({children:t,...s},r)=>e.jsxs("div",{className:_.div,children:[e.jsx("input",{type:"checkbox",className:"form-check-input",...s,ref:r}),e.jsx("label",{className:_.label,children:t})]})),y="_forgotPassword_7z0qv_1",B="_positionClose_7z0qv_10",V="_marginForgotPassword_7z0qv_19",z="_link_7z0qv_23",D="_checkbox_7z0qv_29",x={forgotPassword:y,positionClose:B,marginForgotPassword:V,link:z,checkbox:D},E="_title_19fnh_1",O="_requirement_19fnh_9",S="_requirementDone_19fnh_14",A="_card_19fnh_18",$="_olRequirement_19fnh_32",m={title:E,requirement:O,requirementDone:S,card:A,olRequirement:$},J={lengthPassword:"Минимум 8 символов",haveUpCase:"Наличие верхнего регистра",haveNumber:"Наличие цифры и спецсимвола"},L=({show:t,isCorrect:s})=>e.jsx(e.Fragment,{children:t&&e.jsxs("div",{className:m.card,children:[e.jsx("p",{className:m.title,children:"Требования к паролю:"}),e.jsx("ol",{className:m.olRequirement,children:Object.entries(J).map(([r,n])=>e.jsx("li",{className:`${m.requirement} ${s[r]&&m.requirementDone}`,children:n},r))})]})});class w{}g(w,"hasUppercase",s=>s.match(/[A-Z]/)!==null),g(w,"hasNumber",s=>/\d/.test(s));const Z=()=>{const[t,s]=i.useState(!1),[r,n]=i.useState({userPassword:"",correctPassword:null}),[a,l]=i.useState({lengthPassword:!1,haveUpCase:!1,haveNumber:!1}),c=()=>s(()=>!1),u=()=>s(()=>!0),h=o=>{n(d=>({...d,userPassword:o.target.value})),Object.values(a).every(d=>d===!0)&&n(d=>({...d,correctPassword:o.target.value}))};return i.useEffect(()=>{const o={...a};o.lengthPassword=r.userPassword.length>=8,o.haveUpCase=w.hasUppercase(r.userPassword),o.haveNumber=w.hasNumber(r.userPassword),JSON.stringify(o)!==JSON.stringify(a)&&l(()=>o)},[r]),i.useEffect(()=>{Object.values(a).every(o=>o===!0)?n(o=>({...o,correctPassword:o.userPassword})):n(o=>({...o,correctPassword:null}))},[a]),{password:r.correctPassword,showRequirement:t,isCorrectPassword:a,focusInputPassword:u,blurInputPassword:c,changeUserValue:h}},G=["}","{","]",'"',"'",";",":","?","/","|","\\","*","#","№","%","^","&","$",","," ","(",")","-","=","+"],K=({error:t,blurError:s,changeValue:r})=>{const{showRequirement:n,isCorrectPassword:a,focusInputPassword:l,blurInputPassword:c,changeUserValue:u}=Z();return e.jsxs(e.Fragment,{children:[e.jsx(p,{error:t,title:"Пароль",name:"password",changeValue:h=>{r(h),u(h)},errorBlur:()=>{s(),l()},onBlur:c,blockChars:G}),e.jsx(L,{show:n,isCorrect:a})]})},es=()=>{const t=j(),{userStore:s}=i.useContext(v),{dataUser:r,logicFormValue:n}=R(),{error:a,logicButton:l,blurError:c,loading:u}=q(()=>s.registration(r),"Зарегестрироваться",s.isAuth,C(s.user.name));return e.jsxs(N,{title:"Регистрация",logicButton:l,errorBlur:c,error:a,loading:u,children:[e.jsx("div",{className:x.positionClose,children:e.jsx(k,{back:!0,logicClick:()=>t(b.authorization)})}),e.jsx(p,{title:"Имя пользователя (max: 10)",name:"userName",autoFocus:!0,error:a,errorBlur:c,changeValue:n,maxLength:10}),e.jsx(p,{title:"Почта",name:"email",type:"email",error:a,errorBlur:c,changeValue:n}),e.jsx(K,{error:a,blurError:c,changeValue:n}),e.jsx(p,{title:"Повторите пароль",name:"passwordConfirm",error:a,errorBlur:c,changeValue:n}),e.jsx(U,{required:!0,children:e.jsxs("p",{className:x.checkbox,children:["Принимаете"," ",e.jsxs("span",{className:x.link,children:[" ","условия соглашения"]})," ","сайта"]})})]})};export{es as default};
