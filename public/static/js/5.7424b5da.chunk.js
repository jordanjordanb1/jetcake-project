(this["webpackJsonpjetcake-project"]=this["webpackJsonpjetcake-project"]||[]).push([[5],{328:function(e,a,t){"use strict";var r=t(329);function n(e){this.message=e}n.prototype=new Error,n.prototype.name="InvalidTokenError",e.exports=function(e,a){if("string"!==typeof e)throw new n("Invalid token specified");var t=!0===(a=a||{}).header?0:1;try{return JSON.parse(r(e.split(".")[t]))}catch(c){throw new n("Invalid token specified: "+c.message)}},e.exports.InvalidTokenError=n},329:function(e,a,t){var r=t(330);e.exports=function(e){var a=e.replace(/-/g,"+").replace(/_/g,"/");switch(a.length%4){case 0:break;case 2:a+="==";break;case 3:a+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,a){var t=a.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(a)}catch(t){return r(a)}}},330:function(e,a){function t(e){this.message=e}t.prototype=new Error,t.prototype.name="InvalidCharacterError",e.exports="undefined"!==typeof window&&window.atob&&window.atob.bind(window)||function(e){var a=String(e).replace(/=+$/,"");if(a.length%4==1)throw new t("'atob' failed: The string to be decoded is not correctly encoded.");for(var r,n,c=0,l=0,s="";n=a.charAt(l++);~n&&(r=c%4?64*r+n:n,c++%4)?s+=String.fromCharCode(255&r>>(-2*c&6)):0)n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(n);return s}},331:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(){for(var e=arguments.length,a=Array(e),t=0;t<e;t++)a[t]=arguments[t];function r(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];var n=null;return a.forEach((function(e){if(null==n){var a=e.apply(void 0,t);null!=a&&(n=a)}})),n}return(0,c.default)(r)};var r,n=t(332),c=(r=n)&&r.__esModule?r:{default:r};e.exports=a.default},332:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e){function a(a,t,r,n,c,l){var s=n||"<<anonymous>>",i=l||r;if(null==t[r])return a?new Error("Required "+c+" `"+i+"` was not specified in `"+s+"`."):null;for(var o=arguments.length,u=Array(o>6?o-6:0),d=6;d<o;d++)u[d-6]=arguments[d];return e.apply(void 0,[t,r,s,c,i].concat(u))}var t=a.bind(null,!1);return t.isRequired=a.bind(null,!0),t},e.exports=a.default},333:function(e,a,t){"use strict";var r=function(){};e.exports=r},339:function(e,a,t){"use strict";var r=t(1),n=t(2),c=t(3),l=t.n(c),s=t(0),i=t.n(s),o=(t(331),t(9)),u=t.n(o),d={type:u.a.string.isRequired,as:u.a.elementType},f=i.a.forwardRef((function(e,a){var t=e.as,c=void 0===t?"div":t,s=e.className,o=e.type,u=Object(n.a)(e,["as","className","type"]);return i.a.createElement(c,Object(r.a)({},u,{ref:a,className:l()(s,o&&o+"-feedback")}))}));f.displayName="Feedback",f.propTypes=d,f.defaultProps={type:"valid"};var m=f,p=t(97),b=t(8),v=i.a.forwardRef((function(e,a){var t=e.id,c=e.bsPrefix,o=e.bsCustomPrefix,u=e.className,d=e.isValid,f=e.isInvalid,m=e.isStatic,v=e.as,h=void 0===v?"input":v,y=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","className","isValid","isInvalid","isStatic","as"]),O=Object(s.useContext)(p.a),x=O.controlId;return c=O.custom?Object(b.a)(o,"custom-control-input"):Object(b.a)(c,"form-check-input"),i.a.createElement(h,Object(r.a)({},y,{ref:a,id:t||x,className:l()(u,c,d&&"is-valid",f&&"is-invalid",m&&"position-static")}))}));v.displayName="FormCheckInput",v.defaultProps={type:"checkbox"};var h=v,y=i.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.bsCustomPrefix,o=e.className,u=e.htmlFor,d=Object(n.a)(e,["bsPrefix","bsCustomPrefix","className","htmlFor"]),f=Object(s.useContext)(p.a),m=f.controlId;return t=f.custom?Object(b.a)(c,"custom-control-label"):Object(b.a)(t,"form-check-label"),i.a.createElement("label",Object(r.a)({},d,{ref:a,htmlFor:u||m,className:l()(o,t)}))}));y.displayName="FormCheckLabel";var O=y,x=i.a.forwardRef((function(e,a){var t=e.id,c=e.bsPrefix,o=e.bsCustomPrefix,u=e.inline,d=e.disabled,f=e.isValid,v=e.isInvalid,y=e.feedback,x=e.className,j=e.style,E=e.title,N=e.type,w=e.label,P=e.children,k=e.custom,g=e.as,I=void 0===g?"input":g,C=Object(n.a)(e,["id","bsPrefix","bsCustomPrefix","inline","disabled","isValid","isInvalid","feedback","className","style","title","type","label","children","custom","as"]),F="switch"===N||k;c=F?Object(b.a)(o,"custom-control"):Object(b.a)(c,"form-check");var R=Object(s.useContext)(p.a).controlId,S=Object(s.useMemo)((function(){return{controlId:t||R,custom:F}}),[R,F,t]),T=null!=w&&!1!==w&&!P,_=i.a.createElement(h,Object(r.a)({},C,{type:"switch"===N?"checkbox":N,ref:a,isValid:f,isInvalid:v,isStatic:!T,disabled:d,as:I}));return i.a.createElement(p.a.Provider,{value:S},i.a.createElement("div",{style:j,className:l()(x,c,F&&"custom-"+N,u&&c+"-inline")},P||i.a.createElement(i.a.Fragment,null,_,T&&i.a.createElement(O,{title:E},w),(f||v)&&i.a.createElement(m,{type:f?"valid":"invalid"},y))))}));x.displayName="FormCheck",x.defaultProps={type:"checkbox",inline:!1,disabled:!1,isValid:!1,isInvalid:!1,title:""},x.Input=h,x.Label=O;var j=x,E=(t(333),i.a.forwardRef((function(e,a){var t,c,o=e.bsPrefix,u=e.type,d=e.size,f=e.id,m=e.className,v=e.isValid,h=e.isInvalid,y=e.plaintext,O=e.readOnly,x=e.as,j=void 0===x?"input":x,E=Object(n.a)(e,["bsPrefix","type","size","id","className","isValid","isInvalid","plaintext","readOnly","as"]),N=Object(s.useContext)(p.a).controlId;if(o=Object(b.a)(o,"form-control"),y)(c={})[o+"-plaintext"]=!0,t=c;else if("file"===u){var w;(w={})[o+"-file"]=!0,t=w}else{var P;(P={})[o]=!0,P[o+"-"+d]=d,t=P}return i.a.createElement(j,Object(r.a)({},E,{type:u,ref:a,readOnly:O,id:f||N,className:l()(m,t,v&&"is-valid",h&&"is-invalid")}))})));E.displayName="FormControl",E.Feedback=m;var N=E,w=t(23),P=t(16),k=i.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.column,o=e.srOnly,u=e.className,d=e.htmlFor,f=Object(n.a)(e,["bsPrefix","column","srOnly","className","htmlFor"]),m=Object(s.useContext)(p.a).controlId;t=Object(b.a)(t,"form-label");var v=l()(u,t,o&&"sr-only",c&&"col-form-label");return d=d||m,c?i.a.createElement(P.a,Object(r.a)({as:"label",className:v,htmlFor:d},f)):i.a.createElement("label",Object(r.a)({ref:a,className:v,htmlFor:d},f))}));k.displayName="FormLabel",k.defaultProps={column:!1,srOnly:!1};var g=k,I=i.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.className,s=e.as,o=void 0===s?"small":s,u=e.muted,d=Object(n.a)(e,["bsPrefix","className","as","muted"]);return t=Object(b.a)(t,"form-text"),i.a.createElement(o,Object(r.a)({},d,{ref:a,className:l()(c,t,u&&"text-muted")}))}));I.displayName="FormText";var C=I,F=i.a.forwardRef((function(e,a){return i.a.createElement(j,Object(r.a)({},e,{ref:a,type:"switch"}))}));F.displayName="Switch",F.Input=j.Input,F.Label=j.Label;var R=F,S=t(37),T=i.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.inline,s=e.className,o=e.validated,u=e.as,d=void 0===u?"form":u,f=Object(n.a)(e,["bsPrefix","inline","className","validated","as"]);return t=Object(b.a)(t,"form"),i.a.createElement(d,Object(r.a)({},f,{ref:a,className:l()(s,o&&"was-validated",c&&t+"-inline")}))}));T.displayName="Form",T.defaultProps={inline:!1},T.Row=Object(S.a)("form-row"),T.Group=w.a,T.Control=N,T.Check=j,T.Switch=R,T.Label=g,T.Text=C;a.a=T},347:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),c=t(17),l=t(16),s=t(91),i=t.n(s),o=t(30),u=t(22),d=t(339),f=t(4),m=t(45),p=t(14),b=t(36),v=t.n(b),h=t(19),y=t(328),O=t.n(y);function x(e){var a=e.token,t=Object(r.useState)(),s=Object(o.a)(t,2),b=s[0],y=s[1],x=Object(r.useState)(),j=Object(o.a)(x,2),E=j[0],N=j[1],w=Object(r.useState)(),P=Object(o.a)(w,2),k=P[0],g=P[1],I=Object(h.g)(),C=Object(u.c)();return n.a.createElement(d.a,{onSubmit:function(e){var t,r,n,c,l;return i.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return e.preventDefault(),t=function(e){return new Promise((function(a,t){var r=new FileReader;r.readAsDataURL(e),r.onload=function(){return a(r.result)},r.onerror=function(e){return t(e)}}))},r=O()(a),n=r._id,s.next=6,i.a.awrap(t(k));case 6:c=s.sent,l={image:c},v.a.post("/users/profilepicture/".concat(n),l,{headers:{Authorization:"Bearer ".concat(a)}}).then((function(e){return e.data.success?(y(!0),N("Profile image successfully uploaded"),C({type:"SET_HAS_PROFILE_PIC",payload:!0}),setTimeout((function(){I.push("/dashboard")}))):(y(!1),N("An unknown error occured"),!1)}));case 9:case"end":return s.stop()}}))},encType:"multipart/form-data"},n.a.createElement(c.a,null,n.a.createElement(l.a,{xs:{span:10,offset:1}},n.a.createElement("hr",null),n.a.createElement("div",{className:"text-center form-reason"},n.a.createElement("h3",null,"Please upload a profile picture")),n.a.createElement("hr",null),E?b?n.a.createElement(p.a,{className:"mb-2 form-success text-center"},E):n.a.createElement(p.a,{className:"mb-2 form-error text-center"},E):null,n.a.createElement(d.a.Group,null,n.a.createElement(f.a,{className:"user-check-inputs"},n.a.createElement(d.a.Control,{onChange:function(e){return g(e.target.files[0])},className:"form-control-file",type:"file",name:"picture.image",accept:".jpg,.jpeg,.png"}))))),n.a.createElement(d.a.Group,{className:"m-0"},n.a.createElement(m.a,{className:"user-check-button",type:"submit"},"SUBMIT")))}function j(e){var a=e.token;return n.a.createElement("div",{className:"user-check-cards"},n.a.createElement(c.a,{className:"text-center"},n.a.createElement(l.a,{xs:"12",className:" mt-4 mb-2"},n.a.createElement("h1",null,"PROFILE PICTURE"))),n.a.createElement(c.a,null,n.a.createElement(l.a,{xs:"12"},n.a.createElement(x,{token:a}))))}t.d(a,"default",(function(){return j}))}}]);