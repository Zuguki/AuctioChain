import{T as r}from"./timeZone-da1aee6f.js";class i{static getDateNow(){return this.getDateNowISO().substring(0,16)}static getDatetimeLocal(t){return t.substring(0,16)}static getDateNowISO(){return new Date().toISOString()}static getDateByStringISO(t){return new Date(t).toISOString()}static getBaseFormatDateToStringISO(t,e=!1){return new Intl.DateTimeFormat("ru",{year:"numeric",month:e?"short":"long",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",timeZone:r}).format(new Date(t))}}export{i as D};
