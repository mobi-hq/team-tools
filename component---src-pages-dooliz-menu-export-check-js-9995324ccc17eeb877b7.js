(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"014J":function(e,t,n){e.exports={error:"dooliz-menu-export-check-module--error--Da3zU",success:"dooliz-menu-export-check-module--success--5sBJF",item_type:"dooliz-menu-export-check-module--item_type--2OcP-",item_name:"dooliz-menu-export-check-module--item_name--2Gq5n"}},Dg4a:function(e,t,n){"use strict";function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function o(e,t,n){return(o=i()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var c=new(Function.bind.apply(e,r));return n&&a(c,n.prototype),c}).apply(null,arguments)}function u(e){var t="function"==typeof Map?new Map:void 0;return(u=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return o(e,arguments,c(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),a(r,e)})(e)}n.r(t);var l=n("q1tI"),p=n.n(l),m=n("Bl7J"),s=n("vrFN"),f=n("014J"),d=n.n(f);function y(e,t){y=function(e,t){return new i(e,void 0,t)};var n=u(RegExp),a=RegExp.prototype,c=new WeakMap;function i(e,t,a){var r=n.call(this,e,t);return c.set(r,a||c.get(e)),r}function o(e,t){var n=c.get(t);return Object.keys(n).reduce((function(t,a){return t[a]=e[n[a]],t}),Object.create(null))}return r(i,n),i.prototype.exec=function(e){var t=a.exec.call(this,e);return t&&(t.groups=o(t,this)),t},i.prototype[Symbol.replace]=function(e,t){if("string"==typeof t){var n=c.get(this);return a[Symbol.replace].call(this,e,t.replace(/\$<([^>]+)>/g,(function(e,t){return"$"+n[t]})))}if("function"==typeof t){var r=this;return a[Symbol.replace].call(this,e,(function(){var e=[];return e.push.apply(e,arguments),"object"!=typeof e[e.length-1]&&e.push(o(e,r)),t.apply(this,e)}))}return a[Symbol.replace].call(this,e,t)},y.apply(this,arguments)}var _=function(e){var t=y(/\[([0-9]+)\].*/,{menu_id:1}).exec(e);return t&&t.groups&&t.groups.menu_id?t.groups.menu_id:null},E=function(e){var t=e.name,n=e.value,a=e.setValue;return p.a.createElement(p.a.Fragment,null,p.a.createElement("label",{htmlFor:t},"JSON ",t),p.a.createElement("br",null),p.a.createElement("textarea",{id:t,placeholder:t,value:n,onChange:function(e){a(e.target.value)}}))},h=function(e){var t=e.setValue;return p.a.createElement(p.a.Fragment,null,p.a.createElement("input",{type:"file",onChange:function(e){if(e.target.files[0]){var n=new FileReader;n.onload=function(){var e=n.result;t(e)},n.readAsText(e.target.files[0])}else t(null)}}))};t.default=function(){var e=Object(l.useState)(""),t=e[0],n=e[1],a=Object(l.useState)(null),r=a[0],c=a[1],i=Object(l.useState)(null),o=i[0],u=i[1];return p.a.createElement(m.a,null,p.a.createElement(s.a,{title:"dooliz-menu-export-check"}),p.a.createElement("h2",null,"dooliz-menu-export-check"),p.a.createElement("div",null,p.a.createElement(E,{name:"menu",value:t,setValue:n}),p.a.createElement("br",null),"OR",p.a.createElement("br",null),p.a.createElement(h,{setValue:c})),p.a.createElement("br",null),p.a.createElement("button",{type:"button",onClick:function(){var e=t||r;if(e)try{u(function(e){var t=JSON.parse(e),n=[],a={},r={},c={},i={},o={},u={};return t.menus.forEach((function(e){e.backend_name in a?n.push({type:"DUPLICATE",item_type:"menu",id:e.backend_name}):a[e.backend_name]=e})),t.categories.forEach((function(e){e.backend_name in r?n.push({type:"DUPLICATE",item_type:"category",id:e.backend_name}):r[e.backend_name]=e})),t.products.forEach((function(e){e.backend_name in c?n.push({type:"DUPLICATE",item_type:"product",id:e.backend_name}):c[e.backend_name]=e})),t.modifier_groups.forEach((function(e){e.backend_name in i?n.push({type:"DUPLICATE",item_type:"modifier_group",id:e.backend_name}):i[e.backend_name]=e})),t.modifiers.forEach((function(e){e.backend_name in o?n.push({type:"DUPLICATE",item_type:"modifier",id:e.backend_name}):o[e.backend_name]=e})),Object.keys(a).forEach((function(e){a[e].categories.forEach((function(e){e in r?r[e].used=!0:n.push({type:"MISSING",item_type:"category",id:e})}))})),Object.keys(r).forEach((function(e){r[e].products.forEach((function(e){e in c?c[e].used=!0:n.push({type:"MISSING",item_type:"product",id:e})}))})),Object.keys(c).forEach((function(e){var t=c[e];if(t.modifier_groups=t.modifier_groups||[],t.modifier_groups.forEach((function(e){e in i?i[e].used=!0:n.push({type:"MISSING",item_type:"modifier_group",id:e})})),"plu"in t&&t.plu){var a={item_type:"product",item:t},r=_(t.backend_name)+"_"+t.plu;r in u?u[r].push(a):u[r]=[a]}else n.push({type:"EMPTY_PLU",item_type:"product",id:e})})),Object.keys(i).forEach((function(e){i[e].modifiers.forEach((function(e){e in o?o[e].used=!0:n.push({type:"MISSING",item_type:"modifier",id:e})}))})),Object.keys(o).forEach((function(e){var t=o[e];if("plu"in t&&t.plu){var a={item_type:"modifier",item:t},r=_(t.backend_name)+"_"+t.plu;r in u?u[r].push(a):u[r]=[a]}else n.push({type:"EMPTY_PLU",item_type:"modifier",id:e})})),Object.keys(u).forEach((function(e){var t=u[e];1!==t.length&&n.push({id:t[0].item.backend_name,type:"DUPLICATE_PLU",records:t})})),Object.keys(r).forEach((function(e){var t=r[e];!0!==t.used&&n.push({type:"UNUSED_ITEM",item_type:"category",id:t.backend_name})})),Object.keys(c).forEach((function(e){var t=c[e];!0!==t.used&&n.push({type:"UNUSED_ITEM",item_type:"product",id:t.backend_name})})),Object.keys(i).forEach((function(e){var t=i[e];!0!==t.used&&n.push({type:"UNUSED_ITEM",item_type:"modifier_group",id:t.backend_name})})),Object.keys(o).forEach((function(e){var t=o[e];!0!==t.used&&n.push({type:"UNUSED_ITEM",item_type:"modifier",id:t.backend_name}),t.type&&!["boolean","size","quantity"].includes(t.type)&&n.push({type:"INVALID_MODIFIER_TYPE",id:t.backend_name,modifier_type:t.type})})),n}(e))}catch(n){alert(n)}else alert("missing input")}},"Detect errors"),p.a.createElement("br",null),o&&0===o.length&&p.a.createElement("div",{className:d.a.success},"No errors"),o&&o.length>0&&p.a.createElement("div",null,o.map((function(e){var t=e.type+e.id;switch(e.type){case"DUPLICATE":return p.a.createElement("div",{className:d.a.error,key:t},"Duplicate"," ",p.a.createElement("span",{className:d.a.item_type},e.item_type)," ","named"," ",p.a.createElement("span",{className:d.a.item_name},e.id));case"MISSING":return p.a.createElement("div",{className:d.a.error,key:t},"Missing"," ",p.a.createElement("span",{className:d.a.item_type},e.item_type)," ","named"," ",p.a.createElement("span",{className:d.a.item_name},e.id));case"EMPTY_PLU":return p.a.createElement("div",{className:d.a.error,key:t},"No PLU set for"," ",p.a.createElement("span",{className:d.a.item_type},e.item_type)," ","named"," ",p.a.createElement("span",{className:d.a.item_name},e.id));case"DUPLICATE_PLU":return p.a.createElement("div",{className:d.a.error,key:t},"Multiple items with the same plu"," ",p.a.createElement("span",{className:d.a.item_type},e.records[0].item.plu)," ","named"," ",p.a.createElement("ul",null,e.records.map((function(e){return p.a.createElement("li",{key:e.item.backend_name},p.a.createElement("span",{className:d.a.item_name},"(",e.item_type,")",e.item.backend_name))}))));case"UNUSED_ITEM":return p.a.createElement("div",{className:d.a.error,key:t},"Unused"," ",p.a.createElement("span",{className:d.a.item_type},e.item_type)," ","named"," ",p.a.createElement("span",{className:d.a.item_name},e.id));case"INVALID_MODIFIER_TYPE":return p.a.createElement("div",{className:d.a.error,key:t},"Invalid type"," ",p.a.createElement("span",{className:d.a.item_type},e.modifier_type)," ","for modifier named"," ",p.a.createElement("span",{className:d.a.item_name},e.id))}return null}))))}}}]);
//# sourceMappingURL=component---src-pages-dooliz-menu-export-check-js-9995324ccc17eeb877b7.js.map