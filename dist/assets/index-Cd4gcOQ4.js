var vp=Object.defineProperty;var xp=(s,t,e)=>t in s?vp(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var kn=(s,t,e)=>xp(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jl="169",_p=0,Uu=1,yp=2,Gd=1,Vd=2,Ni=3,as=0,fn=1,Wn=2,ss=0,mo=1,zu=2,Fu=3,ku=4,Mp=5,Es=100,wp=101,Sp=102,Ep=103,bp=104,Tp=200,Ap=201,Cp=202,Rp=203,Jc=204,Qc=205,Pp=206,Ip=207,Lp=208,Dp=209,Np=210,Up=211,zp=212,Fp=213,kp=214,tl=0,el=1,nl=2,Mo=3,il=4,sl=5,ol=6,rl=7,Wd=0,Op=1,Bp=2,os=0,Hp=1,Gp=2,Vp=3,Wp=4,Xp=5,qp=6,Xd=7,qd=300,wo=301,So=302,al=303,cl=304,Da=306,va=1e3,Is=1001,ll=1002,qn=1003,Yp=1004,Mr=1005,ei=1006,Wa=1007,Ls=1008,Hi=1009,Yd=1010,Kd=1011,ur=1012,Ql=1013,Ns=1014,Fi=1015,pr=1016,tu=1017,eu=1018,Eo=1020,jd=35902,Zd=1021,$d=1022,si=1023,Jd=1024,Qd=1025,go=1026,bo=1027,tf=1028,nu=1029,ef=1030,iu=1031,su=1033,oa=33776,ra=33777,aa=33778,ca=33779,ul=35840,hl=35841,dl=35842,fl=35843,pl=36196,ml=37492,gl=37496,vl=37808,xl=37809,_l=37810,yl=37811,Ml=37812,wl=37813,Sl=37814,El=37815,bl=37816,Tl=37817,Al=37818,Cl=37819,Rl=37820,Pl=37821,la=36492,Il=36494,Ll=36495,nf=36283,Dl=36284,Nl=36285,Ul=36286,Kp=3200,jp=3201,sf=0,Zp=1,ns="",Vn="srgb",hs="srgb-linear",ou="display-p3",Na="display-p3-linear",xa="linear",Ie="srgb",_a="rec709",ya="p3",Gs=7680,Ou=519,$p=512,Jp=513,Qp=514,of=515,tm=516,em=517,nm=518,im=519,Bu=35044,Hu="300 es",ki=2e3,Ma=2001;class zo{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const o=i.indexOf(e);o!==-1&&i.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let o=0,r=i.length;o<r;o++)i[o].call(this,t);t.target=null}}}const vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Xa=Math.PI/180,zl=180/Math.PI;function mr(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(vn[s&255]+vn[s>>8&255]+vn[s>>16&255]+vn[s>>24&255]+"-"+vn[t&255]+vn[t>>8&255]+"-"+vn[t>>16&15|64]+vn[t>>24&255]+"-"+vn[e&63|128]+vn[e>>8&255]+"-"+vn[e>>16&255]+vn[e>>24&255]+vn[n&255]+vn[n>>8&255]+vn[n>>16&255]+vn[n>>24&255]).toLowerCase()}function hn(s,t,e){return Math.max(t,Math.min(e,s))}function sm(s,t){return(s%t+t)%t}function qa(s,t,e){return(1-e)*s+e*t}function Bo(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function En(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class Ft{constructor(t=0,e=0){Ft.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(hn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*n-r*i+t.x,this.y=o*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ie{constructor(t,e,n,i,o,r,a,c,l){ie.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,o,r,a,c,l)}set(t,e,n,i,o,r,a,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=o,h[5]=c,h[6]=n,h[7]=r,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,o=this.elements,r=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],_=i[0],p=i[3],g=i[6],M=i[1],E=i[4],T=i[7],U=i[2],D=i[5],w=i[8];return o[0]=r*_+a*M+c*U,o[3]=r*p+a*E+c*D,o[6]=r*g+a*T+c*w,o[1]=l*_+h*M+u*U,o[4]=l*p+h*E+u*D,o[7]=l*g+h*T+u*w,o[2]=f*_+d*M+m*U,o[5]=f*p+d*E+m*D,o[8]=f*g+d*T+m*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*r*h-e*a*l-n*o*h+n*a*c+i*o*l-i*r*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*r-a*l,f=a*c-h*o,d=l*o-r*c,m=e*u+n*f+i*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return t[0]=u*_,t[1]=(i*l-h*n)*_,t[2]=(a*n-i*r)*_,t[3]=f*_,t[4]=(h*e-i*c)*_,t[5]=(i*o-a*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(r*e-n*o)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,o,r,a){const c=Math.cos(o),l=Math.sin(o);return this.set(n*c,n*l,-n*(c*r+l*a)+r+t,-i*l,i*c,-i*(-l*r+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ya.makeScale(t,e)),this}rotate(t){return this.premultiply(Ya.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ya.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ya=new ie;function rf(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function wa(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function om(){const s=wa("canvas");return s.style.display="block",s}const Gu={};function ua(s){s in Gu||(Gu[s]=!0,console.warn(s))}function rm(s,t,e){return new Promise(function(n,i){function o(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:n()}}setTimeout(o,e)})}function am(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function cm(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Vu=new ie().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Wu=new ie().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ho={[hs]:{transfer:xa,primaries:_a,luminanceCoefficients:[.2126,.7152,.0722],toReference:s=>s,fromReference:s=>s},[Vn]:{transfer:Ie,primaries:_a,luminanceCoefficients:[.2126,.7152,.0722],toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Na]:{transfer:xa,primaries:ya,luminanceCoefficients:[.2289,.6917,.0793],toReference:s=>s.applyMatrix3(Wu),fromReference:s=>s.applyMatrix3(Vu)},[ou]:{transfer:Ie,primaries:ya,luminanceCoefficients:[.2289,.6917,.0793],toReference:s=>s.convertSRGBToLinear().applyMatrix3(Wu),fromReference:s=>s.applyMatrix3(Vu).convertLinearToSRGB()}},lm=new Set([hs,Na]),xe={enabled:!0,_workingColorSpace:hs,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!lm.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=Ho[t].toReference,i=Ho[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return Ho[s].primaries},getTransfer:function(s){return s===ns?xa:Ho[s].transfer},getLuminanceCoefficients:function(s,t=this._workingColorSpace){return s.fromArray(Ho[t].luminanceCoefficients)}};function vo(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ka(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Vs;class um{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Vs===void 0&&(Vs=wa("canvas")),Vs.width=t.width,Vs.height=t.height;const n=Vs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Vs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=wa("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),o=i.data;for(let r=0;r<o.length;r++)o[r]=vo(o[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(vo(e[n]/255)*255):e[n]=vo(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let hm=0;class af{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hm++}),this.uuid=mr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let o;if(Array.isArray(i)){o=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?o.push(ja(i[r].image)):o.push(ja(i[r]))}else o=ja(i);n.url=o}return e||(t.images[this.uuid]=n),n}}function ja(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?um.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let dm=0;class Sn extends zo{constructor(t=Sn.DEFAULT_IMAGE,e=Sn.DEFAULT_MAPPING,n=Is,i=Is,o=ei,r=Ls,a=si,c=Hi,l=Sn.DEFAULT_ANISOTROPY,h=ns){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dm++}),this.uuid=mr(),this.name="",this.source=new af(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=o,this.minFilter=r,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ft(0,0),this.repeat=new Ft(1,1),this.center=new Ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==qd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case va:t.x=t.x-Math.floor(t.x);break;case Is:t.x=t.x<0?0:1;break;case ll:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case va:t.y=t.y-Math.floor(t.y);break;case Is:t.y=t.y<0?0:1;break;case ll:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Sn.DEFAULT_IMAGE=null;Sn.DEFAULT_MAPPING=qd;Sn.DEFAULT_ANISOTROPY=1;class Me{constructor(t=0,e=0,n=0,i=1){Me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*o,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*o,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*o,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,o;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],m=c[9],_=c[2],p=c[6],g=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(m+p)<.1&&Math.abs(l+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(l+1)/2,T=(d+1)/2,U=(g+1)/2,D=(h+f)/4,w=(u+_)/4,I=(m+p)/4;return E>T&&E>U?E<.01?(n=0,i=.707106781,o=.707106781):(n=Math.sqrt(E),i=D/n,o=w/n):T>U?T<.01?(n=.707106781,i=0,o=.707106781):(i=Math.sqrt(T),n=D/i,o=I/i):U<.01?(n=.707106781,i=.707106781,o=0):(o=Math.sqrt(U),n=w/o,i=I/o),this.set(n,i,o,e),this}let M=Math.sqrt((p-m)*(p-m)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(p-m)/M,this.y=(u-_)/M,this.z=(f-h)/M,this.w=Math.acos((l+d+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class fm extends zo{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Me(0,0,t,e),this.scissorTest=!1,this.viewport=new Me(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ei,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const o=new Sn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,o=this.textures.length;i<o;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new af(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Us extends fm{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class cf extends Sn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=qn,this.minFilter=qn,this.wrapR=Is,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class pm extends Sn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=qn,this.minFilter=qn,this.wrapR=Is,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}let Gi=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,o,r,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const f=o[r+0],d=o[r+1],m=o[r+2],_=o[r+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=m,t[e+3]=_;return}if(u!==_||c!==f||l!==d||h!==m){let p=1-a;const g=c*f+l*d+h*m+u*_,M=g>=0?1:-1,E=1-g*g;if(E>Number.EPSILON){const U=Math.sqrt(E),D=Math.atan2(U,g*M);p=Math.sin(p*D)/U,a=Math.sin(a*D)/U}const T=a*M;if(c=c*p+f*T,l=l*p+d*T,h=h*p+m*T,u=u*p+_*T,p===1-a){const U=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=U,l*=U,h*=U,u*=U}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,o,r){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=o[r],f=o[r+1],d=o[r+2],m=o[r+3];return t[e]=a*m+h*u+c*d-l*f,t[e+1]=c*m+h*f+l*u-a*d,t[e+2]=l*m+h*d+a*f-c*u,t[e+3]=h*m-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,o=t._z,r=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(o/2),f=c(n/2),d=c(i/2),m=c(o/2);switch(r){case"XYZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"YZX":this._x=f*h*u+l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u-f*d*m;break;case"XZY":this._x=f*h*u-l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u+f*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],o=e[8],r=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(o-l)*d,this._z=(r-i)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(i+r)/d,this._z=(o+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(o-l)/d,this._x=(i+r)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(r-i)/d,this._x=(o+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(hn(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,o=t._z,r=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+r*a+i*l-o*c,this._y=i*h+r*c+o*a-n*l,this._z=o*h+r*l+n*c-i*a,this._w=r*h-n*a-i*c-o*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,o=this._z,r=this._w;let a=r*t._w+n*t._x+i*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=n,this._y=i,this._z=o,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*r+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*o+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=r*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=o*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class K{constructor(t=0,e=0,n=0){K.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*i,this.y=o[1]*e+o[4]*n+o[7]*i,this.z=o[2]*e+o[5]*n+o[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,o=t.elements,r=1/(o[3]*e+o[7]*n+o[11]*i+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*i+o[12])*r,this.y=(o[1]*e+o[5]*n+o[9]*i+o[13])*r,this.z=(o[2]*e+o[6]*n+o[10]*i+o[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,o=t.x,r=t.y,a=t.z,c=t.w,l=2*(r*i-a*n),h=2*(a*e-o*i),u=2*(o*n-r*e);return this.x=e+c*l+r*u-a*h,this.y=n+c*h+a*l-o*u,this.z=i+c*u+o*h-r*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i,this.y=o[1]*e+o[5]*n+o[9]*i,this.z=o[2]*e+o[6]*n+o[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,o=t.z,r=e.x,a=e.y,c=e.z;return this.x=i*c-o*a,this.y=o*r-n*c,this.z=n*a-i*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Za.copy(this).projectOnVector(t),this.sub(Za)}reflect(t){return this.sub(Za.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(hn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Za=new K,Xu=new Gi;class gr{constructor(t=new K(1/0,1/0,1/0),e=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(jn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(jn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=jn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,jn):jn.fromBufferAttribute(o,r),jn.applyMatrix4(t.matrixWorld),this.expandByPoint(jn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),wr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),wr.copy(n.boundingBox)),wr.applyMatrix4(t.matrixWorld),this.union(wr)}const i=t.children;for(let o=0,r=i.length;o<r;o++)this.expandByObject(i[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,jn),jn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Go),Sr.subVectors(this.max,Go),Ws.subVectors(t.a,Go),Xs.subVectors(t.b,Go),qs.subVectors(t.c,Go),Yi.subVectors(Xs,Ws),Ki.subVectors(qs,Xs),ds.subVectors(Ws,qs);let e=[0,-Yi.z,Yi.y,0,-Ki.z,Ki.y,0,-ds.z,ds.y,Yi.z,0,-Yi.x,Ki.z,0,-Ki.x,ds.z,0,-ds.x,-Yi.y,Yi.x,0,-Ki.y,Ki.x,0,-ds.y,ds.x,0];return!$a(e,Ws,Xs,qs,Sr)||(e=[1,0,0,0,1,0,0,0,1],!$a(e,Ws,Xs,qs,Sr))?!1:(Er.crossVectors(Yi,Ki),e=[Er.x,Er.y,Er.z],$a(e,Ws,Xs,qs,Sr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,jn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(jn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(wi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),wi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),wi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),wi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),wi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),wi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),wi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),wi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(wi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const wi=[new K,new K,new K,new K,new K,new K,new K,new K],jn=new K,wr=new gr,Ws=new K,Xs=new K,qs=new K,Yi=new K,Ki=new K,ds=new K,Go=new K,Sr=new K,Er=new K,fs=new K;function $a(s,t,e,n,i){for(let o=0,r=s.length-3;o<=r;o+=3){fs.fromArray(s,o);const a=i.x*Math.abs(fs.x)+i.y*Math.abs(fs.y)+i.z*Math.abs(fs.z),c=t.dot(fs),l=e.dot(fs),h=n.dot(fs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const mm=new gr,Vo=new K,Ja=new K;let ru=class{constructor(t=new K,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):mm.setFromPoints(t).getCenter(n);let i=0;for(let o=0,r=t.length;o<r;o++)i=Math.max(i,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Vo.subVectors(t,this.center);const e=Vo.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Vo,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ja.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Vo.copy(t.center).add(Ja)),this.expandByPoint(Vo.copy(t.center).sub(Ja))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}};const Si=new K,Qa=new K,br=new K,ji=new K,tc=new K,Tr=new K,ec=new K;let gm=class{constructor(t=new K,e=new K(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Si)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Si.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Si.copy(this.origin).addScaledVector(this.direction,e),Si.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Qa.copy(t).add(e).multiplyScalar(.5),br.copy(e).sub(t).normalize(),ji.copy(this.origin).sub(Qa);const o=t.distanceTo(e)*.5,r=-this.direction.dot(br),a=ji.dot(this.direction),c=-ji.dot(br),l=ji.lengthSq(),h=Math.abs(1-r*r);let u,f,d,m;if(h>0)if(u=r*c-a,f=r*a-c,m=o*h,u>=0)if(f>=-m)if(f<=m){const _=1/h;u*=_,f*=_,d=u*(u+r*f+2*a)+f*(r*u+f+2*c)+l}else f=o,u=Math.max(0,-(r*f+a)),d=-u*u+f*(f+2*c)+l;else f=-o,u=Math.max(0,-(r*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-m?(u=Math.max(0,-(-r*o+a)),f=u>0?-o:Math.min(Math.max(-o,-c),o),d=-u*u+f*(f+2*c)+l):f<=m?(u=0,f=Math.min(Math.max(-o,-c),o),d=f*(f+2*c)+l):(u=Math.max(0,-(r*o+a)),f=u>0?o:Math.min(Math.max(-o,-c),o),d=-u*u+f*(f+2*c)+l);else f=r>0?-o:o,u=Math.max(0,-(r*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Qa).addScaledVector(br,f),d}intersectSphere(t,e){Si.subVectors(t.center,this.origin);const n=Si.dot(this.direction),i=Si.dot(Si)-n*n,o=t.radius*t.radius;if(i>o)return null;const r=Math.sqrt(o-i),a=n-r,c=n+r;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,o,r,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,i=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,i=(t.min.x-f.x)*l),h>=0?(o=(t.min.y-f.y)*h,r=(t.max.y-f.y)*h):(o=(t.max.y-f.y)*h,r=(t.min.y-f.y)*h),n>r||o>i||((o>n||isNaN(n))&&(n=o),(r<i||isNaN(i))&&(i=r),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Si)!==null}intersectTriangle(t,e,n,i,o){tc.subVectors(e,t),Tr.subVectors(n,t),ec.crossVectors(tc,Tr);let r=this.direction.dot(ec),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;ji.subVectors(this.origin,t);const c=a*this.direction.dot(Tr.crossVectors(ji,Tr));if(c<0)return null;const l=a*this.direction.dot(tc.cross(ji));if(l<0||c+l>r)return null;const h=-a*ji.dot(ec);return h<0?null:this.at(h/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class ze{constructor(t,e,n,i,o,r,a,c,l,h,u,f,d,m,_,p){ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,o,r,a,c,l,h,u,f,d,m,_,p)}set(t,e,n,i,o,r,a,c,l,h,u,f,d,m,_,p){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=i,g[1]=o,g[5]=r,g[9]=a,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=f,g[3]=d,g[7]=m,g[11]=_,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ze().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ys.setFromMatrixColumn(t,0).length(),o=1/Ys.setFromMatrixColumn(t,1).length(),r=1/Ys.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,o=t.z,r=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(o),u=Math.sin(o);if(t.order==="XYZ"){const f=r*h,d=r*u,m=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+m*l,e[5]=f-_*l,e[9]=-a*c,e[2]=_-f*l,e[6]=m+d*l,e[10]=r*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,m=l*h,_=l*u;e[0]=f+_*a,e[4]=m*a-d,e[8]=r*l,e[1]=r*u,e[5]=r*h,e[9]=-a,e[2]=d*a-m,e[6]=_+f*a,e[10]=r*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,m=l*h,_=l*u;e[0]=f-_*a,e[4]=-r*u,e[8]=m+d*a,e[1]=d+m*a,e[5]=r*h,e[9]=_-f*a,e[2]=-r*l,e[6]=a,e[10]=r*c}else if(t.order==="ZYX"){const f=r*h,d=r*u,m=a*h,_=a*u;e[0]=c*h,e[4]=m*l-d,e[8]=f*l+_,e[1]=c*u,e[5]=_*l+f,e[9]=d*l-m,e[2]=-l,e[6]=a*c,e[10]=r*c}else if(t.order==="YZX"){const f=r*c,d=r*l,m=a*c,_=a*l;e[0]=c*h,e[4]=_-f*u,e[8]=m*u+d,e[1]=u,e[5]=r*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+m,e[10]=f-_*u}else if(t.order==="XZY"){const f=r*c,d=r*l,m=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+_,e[5]=r*h,e[9]=d*u-m,e[2]=m*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(vm,t,xm)}lookAt(t,e,n){const i=this.elements;return Pn.subVectors(t,e),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),Zi.crossVectors(n,Pn),Zi.lengthSq()===0&&(Math.abs(n.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),Zi.crossVectors(n,Pn)),Zi.normalize(),Ar.crossVectors(Pn,Zi),i[0]=Zi.x,i[4]=Ar.x,i[8]=Pn.x,i[1]=Zi.y,i[5]=Ar.y,i[9]=Pn.y,i[2]=Zi.z,i[6]=Ar.z,i[10]=Pn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,o=this.elements,r=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],_=n[6],p=n[10],g=n[14],M=n[3],E=n[7],T=n[11],U=n[15],D=i[0],w=i[4],I=i[8],A=i[12],x=i[1],v=i[5],P=i[9],b=i[13],S=i[2],R=i[6],L=i[10],G=i[14],k=i[3],B=i[7],F=i[11],H=i[15];return o[0]=r*D+a*x+c*S+l*k,o[4]=r*w+a*v+c*R+l*B,o[8]=r*I+a*P+c*L+l*F,o[12]=r*A+a*b+c*G+l*H,o[1]=h*D+u*x+f*S+d*k,o[5]=h*w+u*v+f*R+d*B,o[9]=h*I+u*P+f*L+d*F,o[13]=h*A+u*b+f*G+d*H,o[2]=m*D+_*x+p*S+g*k,o[6]=m*w+_*v+p*R+g*B,o[10]=m*I+_*P+p*L+g*F,o[14]=m*A+_*b+p*G+g*H,o[3]=M*D+E*x+T*S+U*k,o[7]=M*w+E*v+T*R+U*B,o[11]=M*I+E*P+T*L+U*F,o[15]=M*A+E*b+T*G+U*H,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],o=t[12],r=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],m=t[3],_=t[7],p=t[11],g=t[15];return m*(+o*c*u-i*l*u-o*a*f+n*l*f+i*a*d-n*c*d)+_*(+e*c*d-e*l*f+o*r*f-i*r*d+i*l*h-o*c*h)+p*(+e*l*u-e*a*d-o*r*u+n*r*d+o*a*h-n*l*h)+g*(-i*a*h-e*c*u+e*a*f+i*r*u-n*r*f+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],m=t[12],_=t[13],p=t[14],g=t[15],M=u*p*l-_*f*l+_*c*d-a*p*d-u*c*g+a*f*g,E=m*f*l-h*p*l-m*c*d+r*p*d+h*c*g-r*f*g,T=h*_*l-m*u*l+m*a*d-r*_*d-h*a*g+r*u*g,U=m*u*c-h*_*c-m*a*f+r*_*f+h*a*p-r*u*p,D=e*M+n*E+i*T+o*U;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/D;return t[0]=M*w,t[1]=(_*f*o-u*p*o-_*i*d+n*p*d+u*i*g-n*f*g)*w,t[2]=(a*p*o-_*c*o+_*i*l-n*p*l-a*i*g+n*c*g)*w,t[3]=(u*c*o-a*f*o-u*i*l+n*f*l+a*i*d-n*c*d)*w,t[4]=E*w,t[5]=(h*p*o-m*f*o+m*i*d-e*p*d-h*i*g+e*f*g)*w,t[6]=(m*c*o-r*p*o-m*i*l+e*p*l+r*i*g-e*c*g)*w,t[7]=(r*f*o-h*c*o+h*i*l-e*f*l-r*i*d+e*c*d)*w,t[8]=T*w,t[9]=(m*u*o-h*_*o-m*n*d+e*_*d+h*n*g-e*u*g)*w,t[10]=(r*_*o-m*a*o+m*n*l-e*_*l-r*n*g+e*a*g)*w,t[11]=(h*a*o-r*u*o-h*n*l+e*u*l+r*n*d-e*a*d)*w,t[12]=U*w,t[13]=(h*_*i-m*u*i+m*n*f-e*_*f-h*n*p+e*u*p)*w,t[14]=(m*a*i-r*_*i-m*n*c+e*_*c+r*n*p-e*a*p)*w,t[15]=(r*u*i-h*a*i+h*n*c-e*u*c-r*n*f+e*a*f)*w,this}scale(t){const e=this.elements,n=t.x,i=t.y,o=t.z;return e[0]*=n,e[4]*=i,e[8]*=o,e[1]*=n,e[5]*=i,e[9]*=o,e[2]*=n,e[6]*=i,e[10]*=o,e[3]*=n,e[7]*=i,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),o=1-n,r=t.x,a=t.y,c=t.z,l=o*r,h=o*a;return this.set(l*r+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*r,0,l*c-i*a,h*c+i*r,o*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,o,r){return this.set(1,n,o,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,o=e._x,r=e._y,a=e._z,c=e._w,l=o+o,h=r+r,u=a+a,f=o*l,d=o*h,m=o*u,_=r*h,p=r*u,g=a*u,M=c*l,E=c*h,T=c*u,U=n.x,D=n.y,w=n.z;return i[0]=(1-(_+g))*U,i[1]=(d+T)*U,i[2]=(m-E)*U,i[3]=0,i[4]=(d-T)*D,i[5]=(1-(f+g))*D,i[6]=(p+M)*D,i[7]=0,i[8]=(m+E)*w,i[9]=(p-M)*w,i[10]=(1-(f+_))*w,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let o=Ys.set(i[0],i[1],i[2]).length();const r=Ys.set(i[4],i[5],i[6]).length(),a=Ys.set(i[8],i[9],i[10]).length();this.determinant()<0&&(o=-o),t.x=i[12],t.y=i[13],t.z=i[14],Zn.copy(this);const l=1/o,h=1/r,u=1/a;return Zn.elements[0]*=l,Zn.elements[1]*=l,Zn.elements[2]*=l,Zn.elements[4]*=h,Zn.elements[5]*=h,Zn.elements[6]*=h,Zn.elements[8]*=u,Zn.elements[9]*=u,Zn.elements[10]*=u,e.setFromRotationMatrix(Zn),n.x=o,n.y=r,n.z=a,this}makePerspective(t,e,n,i,o,r,a=ki){const c=this.elements,l=2*o/(e-t),h=2*o/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i);let d,m;if(a===ki)d=-(r+o)/(r-o),m=-2*r*o/(r-o);else if(a===Ma)d=-r/(r-o),m=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,o,r,a=ki){const c=this.elements,l=1/(e-t),h=1/(n-i),u=1/(r-o),f=(e+t)*l,d=(n+i)*h;let m,_;if(a===ki)m=(r+o)*u,_=-2*u;else if(a===Ma)m=o*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=_,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ys=new K,Zn=new ze,vm=new K(0,0,0),xm=new K(1,1,1),Zi=new K,Ar=new K,Pn=new K,qu=new ze,Yu=new Gi;class yi{constructor(t=0,e=0,n=0,i=yi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,o=i[0],r=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(hn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-hn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,o),this._z=0);break;case"ZXY":this._x=Math.asin(hn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-hn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(hn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,o)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-hn(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return qu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Yu.setFromEuler(this),this.setFromQuaternion(Yu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yi.DEFAULT_ORDER="XYZ";class lf{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let _m=0;const Ku=new K,Ks=new Gi,Ei=new ze,Cr=new K,Wo=new K,ym=new K,Mm=new Gi,ju=new K(1,0,0),Zu=new K(0,1,0),$u=new K(0,0,1),Ju={type:"added"},wm={type:"removed"},js={type:"childadded",child:null},nc={type:"childremoved",child:null};class pn extends zo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_m++}),this.uuid=mr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pn.DEFAULT_UP.clone();const t=new K,e=new yi,n=new Gi,i=new K(1,1,1);function o(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ze},normalMatrix:{value:new ie}}),this.matrix=new ze,this.matrixWorld=new ze,this.matrixAutoUpdate=pn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ks.setFromAxisAngle(t,e),this.quaternion.multiply(Ks),this}rotateOnWorldAxis(t,e){return Ks.setFromAxisAngle(t,e),this.quaternion.premultiply(Ks),this}rotateX(t){return this.rotateOnAxis(ju,t)}rotateY(t){return this.rotateOnAxis(Zu,t)}rotateZ(t){return this.rotateOnAxis($u,t)}translateOnAxis(t,e){return Ku.copy(t).applyQuaternion(this.quaternion),this.position.add(Ku.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ju,t)}translateY(t){return this.translateOnAxis(Zu,t)}translateZ(t){return this.translateOnAxis($u,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ei.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Cr.copy(t):Cr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Wo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ei.lookAt(Wo,Cr,this.up):Ei.lookAt(Cr,Wo,this.up),this.quaternion.setFromRotationMatrix(Ei),i&&(Ei.extractRotation(i.matrixWorld),Ks.setFromRotationMatrix(Ei),this.quaternion.premultiply(Ks.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ju),js.child=t,this.dispatchEvent(js),js.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(wm),nc.child=t,this.dispatchEvent(nc),nc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ei.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ei.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ei),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ju),js.child=t,this.dispatchEvent(js),js.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let o=0,r=i.length;o<r;o++)i[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wo,t,ym),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wo,Mm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let o=0,r=i.length;o<r;o++)i[o].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function o(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];o(t.shapes,u)}else o(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(o(t.materials,this.material[c]));i.material=a}else i.material=o(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(o(t.animations,c))}}if(e){const a=r(t.geometries),c=r(t.materials),l=r(t.textures),h=r(t.images),u=r(t.shapes),f=r(t.skeletons),d=r(t.animations),m=r(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=i,n;function r(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}pn.DEFAULT_UP=new K(0,1,0);pn.DEFAULT_MATRIX_AUTO_UPDATE=!0;pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const $n=new K,bi=new K,ic=new K,Ti=new K,Zs=new K,$s=new K,Qu=new K,sc=new K,oc=new K,rc=new K,ac=new Me,cc=new Me,lc=new Me;class ni{constructor(t=new K,e=new K,n=new K){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),$n.subVectors(t,e),i.cross($n);const o=i.lengthSq();return o>0?i.multiplyScalar(1/Math.sqrt(o)):i.set(0,0,0)}static getBarycoord(t,e,n,i,o){$n.subVectors(i,e),bi.subVectors(n,e),ic.subVectors(t,e);const r=$n.dot($n),a=$n.dot(bi),c=$n.dot(ic),l=bi.dot(bi),h=bi.dot(ic),u=r*l-a*a;if(u===0)return o.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,m=(r*h-a*c)*f;return o.set(1-d-m,m,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Ti)===null?!1:Ti.x>=0&&Ti.y>=0&&Ti.x+Ti.y<=1}static getInterpolation(t,e,n,i,o,r,a,c){return this.getBarycoord(t,e,n,i,Ti)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,Ti.x),c.addScaledVector(r,Ti.y),c.addScaledVector(a,Ti.z),c)}static getInterpolatedAttribute(t,e,n,i,o,r){return ac.setScalar(0),cc.setScalar(0),lc.setScalar(0),ac.fromBufferAttribute(t,e),cc.fromBufferAttribute(t,n),lc.fromBufferAttribute(t,i),r.setScalar(0),r.addScaledVector(ac,o.x),r.addScaledVector(cc,o.y),r.addScaledVector(lc,o.z),r}static isFrontFacing(t,e,n,i){return $n.subVectors(n,e),bi.subVectors(t,e),$n.cross(bi).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return $n.subVectors(this.c,this.b),bi.subVectors(this.a,this.b),$n.cross(bi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ni.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ni.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,o){return ni.getInterpolation(t,this.a,this.b,this.c,e,n,i,o)}containsPoint(t){return ni.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ni.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,o=this.c;let r,a;Zs.subVectors(i,n),$s.subVectors(o,n),sc.subVectors(t,n);const c=Zs.dot(sc),l=$s.dot(sc);if(c<=0&&l<=0)return e.copy(n);oc.subVectors(t,i);const h=Zs.dot(oc),u=$s.dot(oc);if(h>=0&&u<=h)return e.copy(i);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return r=c/(c-h),e.copy(n).addScaledVector(Zs,r);rc.subVectors(t,o);const d=Zs.dot(rc),m=$s.dot(rc);if(m>=0&&d<=m)return e.copy(o);const _=d*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector($s,a);const p=h*m-d*u;if(p<=0&&u-h>=0&&d-m>=0)return Qu.subVectors(o,i),a=(u-h)/(u-h+(d-m)),e.copy(i).addScaledVector(Qu,a);const g=1/(p+_+f);return r=_*g,a=f*g,e.copy(n).addScaledVector(Zs,r).addScaledVector($s,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const uf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$i={h:0,s:0,l:0},Rr={h:0,s:0,l:0};function uc(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class he{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Vn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,xe.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=xe.workingColorSpace){return this.r=t,this.g=e,this.b=n,xe.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=xe.workingColorSpace){if(t=sm(t,1),e=hn(e,0,1),n=hn(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,r=2*n-o;this.r=uc(r,o,t+1/3),this.g=uc(r,o,t),this.b=uc(r,o,t-1/3)}return xe.toWorkingColorSpace(this,i),this}setStyle(t,e=Vn){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=i[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Vn){const n=uf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=vo(t.r),this.g=vo(t.g),this.b=vo(t.b),this}copyLinearToSRGB(t){return this.r=Ka(t.r),this.g=Ka(t.g),this.b=Ka(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Vn){return xe.fromWorkingColorSpace(xn.copy(this),t),Math.round(hn(xn.r*255,0,255))*65536+Math.round(hn(xn.g*255,0,255))*256+Math.round(hn(xn.b*255,0,255))}getHexString(t=Vn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=xe.workingColorSpace){xe.fromWorkingColorSpace(xn.copy(this),e);const n=xn.r,i=xn.g,o=xn.b,r=Math.max(n,i,o),a=Math.min(n,i,o);let c,l;const h=(a+r)/2;if(a===r)c=0,l=0;else{const u=r-a;switch(l=h<=.5?u/(r+a):u/(2-r-a),r){case n:c=(i-o)/u+(i<o?6:0);break;case i:c=(o-n)/u+2;break;case o:c=(n-i)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=xe.workingColorSpace){return xe.fromWorkingColorSpace(xn.copy(this),e),t.r=xn.r,t.g=xn.g,t.b=xn.b,t}getStyle(t=Vn){xe.fromWorkingColorSpace(xn.copy(this),t);const e=xn.r,n=xn.g,i=xn.b;return t!==Vn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL($i),this.setHSL($i.h+t,$i.s+e,$i.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL($i),t.getHSL(Rr);const n=qa($i.h,Rr.h,e),i=qa($i.s,Rr.s,e),o=qa($i.l,Rr.l,e);return this.setHSL(n,i,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*i,this.g=o[1]*e+o[4]*n+o[7]*i,this.b=o[2]*e+o[5]*n+o[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xn=new he;he.NAMES=uf;let Sm=0,vr=class extends zo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sm++}),this.uuid=mr(),this.name="",this.type="Material",this.blending=mo,this.side=as,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Jc,this.blendDst=Qc,this.blendEquation=Es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new he(0,0,0),this.blendAlpha=0,this.depthFunc=Mo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ou,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gs,this.stencilZFail=Gs,this.stencilZPass=Gs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==mo&&(n.blending=this.blending),this.side!==as&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Jc&&(n.blendSrc=this.blendSrc),this.blendDst!==Qc&&(n.blendDst=this.blendDst),this.blendEquation!==Es&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Mo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ou&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Gs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Gs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(o){const r=[];for(const a in o){const c=o[a];delete c.metadata,r.push(c)}return r}if(e){const o=i(t.textures),r=i(t.images);o.length>0&&(n.textures=o),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let o=0;o!==i;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}};class yn extends vr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=Wd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const qe=new K,Pr=new Ft;class gi{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Bu,this.updateRanges=[],this.gpuType=Fi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,o=this.itemSize;i<o;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Pr.fromBufferAttribute(this,e),Pr.applyMatrix3(t),this.setXY(e,Pr.x,Pr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix3(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix4(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyNormalMatrix(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.transformDirection(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Bo(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=En(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Bo(e,this.array)),e}setX(t,e){return this.normalized&&(e=En(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Bo(e,this.array)),e}setY(t,e){return this.normalized&&(e=En(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Bo(e,this.array)),e}setZ(t,e){return this.normalized&&(e=En(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Bo(e,this.array)),e}setW(t,e){return this.normalized&&(e=En(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=En(e,this.array),n=En(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=En(e,this.array),n=En(n,this.array),i=En(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,o){return t*=this.itemSize,this.normalized&&(e=En(e,this.array),n=En(n,this.array),i=En(i,this.array),o=En(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Bu&&(t.usage=this.usage),t}}class hf extends gi{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class df extends gi{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ne extends gi{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Em=0;const On=new ze,hc=new pn,Js=new K,In=new gr,Xo=new gr,on=new K;class Nn extends zo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Em++}),this.uuid=mr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(rf(t)?df:hf)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new ie().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return On.makeRotationFromQuaternion(t),this.applyMatrix4(On),this}rotateX(t){return On.makeRotationX(t),this.applyMatrix4(On),this}rotateY(t){return On.makeRotationY(t),this.applyMatrix4(On),this}rotateZ(t){return On.makeRotationZ(t),this.applyMatrix4(On),this}translate(t,e,n){return On.makeTranslation(t,e,n),this.applyMatrix4(On),this}scale(t,e,n){return On.makeScale(t,e,n),this.applyMatrix4(On),this}lookAt(t){return hc.lookAt(t),hc.updateMatrix(),this.applyMatrix4(hc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Js).negate(),this.translate(Js.x,Js.y,Js.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const o=t[n];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new Ne(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const o=e[n];In.setFromBufferAttribute(o),this.morphTargetsRelative?(on.addVectors(this.boundingBox.min,In.min),this.boundingBox.expandByPoint(on),on.addVectors(this.boundingBox.max,In.max),this.boundingBox.expandByPoint(on)):(this.boundingBox.expandByPoint(In.min),this.boundingBox.expandByPoint(In.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ru);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(t){const n=this.boundingSphere.center;if(In.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];Xo.setFromBufferAttribute(a),this.morphTargetsRelative?(on.addVectors(In.min,Xo.min),In.expandByPoint(on),on.addVectors(In.max,Xo.max),In.expandByPoint(on)):(In.expandByPoint(Xo.min),In.expandByPoint(Xo.max))}In.getCenter(n);let i=0;for(let o=0,r=t.count;o<r;o++)on.fromBufferAttribute(t,o),i=Math.max(i,n.distanceToSquared(on));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)on.fromBufferAttribute(a,l),c&&(Js.fromBufferAttribute(t,l),on.add(Js)),i=Math.max(i,n.distanceToSquared(on))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new gi(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new K,c[I]=new K;const l=new K,h=new K,u=new K,f=new Ft,d=new Ft,m=new Ft,_=new K,p=new K;function g(I,A,x){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,A),u.fromBufferAttribute(n,x),f.fromBufferAttribute(o,I),d.fromBufferAttribute(o,A),m.fromBufferAttribute(o,x),h.sub(l),u.sub(l),d.sub(f),m.sub(f);const v=1/(d.x*m.y-m.x*d.y);isFinite(v)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(v),p.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(v),a[I].add(_),a[A].add(_),a[x].add(_),c[I].add(p),c[A].add(p),c[x].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let I=0,A=M.length;I<A;++I){const x=M[I],v=x.start,P=x.count;for(let b=v,S=v+P;b<S;b+=3)g(t.getX(b+0),t.getX(b+1),t.getX(b+2))}const E=new K,T=new K,U=new K,D=new K;function w(I){U.fromBufferAttribute(i,I),D.copy(U);const A=a[I];E.copy(A),E.sub(U.multiplyScalar(U.dot(A))).normalize(),T.crossVectors(D,A);const v=T.dot(c[I])<0?-1:1;r.setXYZW(I,E.x,E.y,E.z,v)}for(let I=0,A=M.length;I<A;++I){const x=M[I],v=x.start,P=x.count;for(let b=v,S=v+P;b<S;b+=3)w(t.getX(b+0)),w(t.getX(b+1)),w(t.getX(b+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new gi(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new K,o=new K,r=new K,a=new K,c=new K,l=new K,h=new K,u=new K;if(t)for(let f=0,d=t.count;f<d;f+=3){const m=t.getX(f+0),_=t.getX(f+1),p=t.getX(f+2);i.fromBufferAttribute(e,m),o.fromBufferAttribute(e,_),r.fromBufferAttribute(e,p),h.subVectors(r,o),u.subVectors(i,o),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),o.fromBufferAttribute(e,f+1),r.fromBufferAttribute(e,f+2),h.subVectors(r,o),u.subVectors(i,o),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)on.fromBufferAttribute(t,e),on.normalize(),t.setXYZ(e,on.x,on.y,on.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,m=0;for(let _=0,p=c.length;_<p;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*h;for(let g=0;g<h;g++)f[m++]=l[d++]}return new gi(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Nn,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const o=this.morphAttributes;for(const a in o){const c=[],l=o[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,c=r.length;a<c;a++){const l=r[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let o=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(i[c]=h,o=!0)}o&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const o=t.morphAttributes;for(const l in o){const h=[],u=o[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let l=0,h=r.length;l<h;l++){const u=r[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const th=new ze,ps=new gm,Ir=new ru,eh=new K,Lr=new K,Dr=new K,Nr=new K,dc=new K,Ur=new K,nh=new K,zr=new K;class Pt extends pn{constructor(t=new Nn,e=new yn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=i.length;o<r;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,o=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(o&&a){Ur.set(0,0,0);for(let c=0,l=o.length;c<l;c++){const h=a[c],u=o[c];h!==0&&(dc.fromBufferAttribute(u,t),r?Ur.addScaledVector(dc,h):Ur.addScaledVector(dc.sub(e),h))}e.add(Ur)}return e}raycast(t,e){const n=this.geometry,i=this.material,o=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ir.copy(n.boundingSphere),Ir.applyMatrix4(o),ps.copy(t.ray).recast(t.near),!(Ir.containsPoint(ps.origin)===!1&&(ps.intersectSphere(Ir,eh)===null||ps.origin.distanceToSquared(eh)>(t.far-t.near)**2))&&(th.copy(o).invert(),ps.copy(t.ray).applyMatrix4(th),!(n.boundingBox!==null&&ps.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ps)))}_computeIntersections(t,e,n){let i;const o=this.geometry,r=this.material,a=o.index,c=o.attributes.position,l=o.attributes.uv,h=o.attributes.uv1,u=o.attributes.normal,f=o.groups,d=o.drawRange;if(a!==null)if(Array.isArray(r))for(let m=0,_=f.length;m<_;m++){const p=f[m],g=r[p.materialIndex],M=Math.max(p.start,d.start),E=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let T=M,U=E;T<U;T+=3){const D=a.getX(T),w=a.getX(T+1),I=a.getX(T+2);i=Fr(this,g,t,n,l,h,u,D,w,I),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const m=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let p=m,g=_;p<g;p+=3){const M=a.getX(p),E=a.getX(p+1),T=a.getX(p+2);i=Fr(this,r,t,n,l,h,u,M,E,T),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(r))for(let m=0,_=f.length;m<_;m++){const p=f[m],g=r[p.materialIndex],M=Math.max(p.start,d.start),E=Math.min(c.count,Math.min(p.start+p.count,d.start+d.count));for(let T=M,U=E;T<U;T+=3){const D=T,w=T+1,I=T+2;i=Fr(this,g,t,n,l,h,u,D,w,I),i&&(i.faceIndex=Math.floor(T/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const m=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let p=m,g=_;p<g;p+=3){const M=p,E=p+1,T=p+2;i=Fr(this,r,t,n,l,h,u,M,E,T),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function bm(s,t,e,n,i,o,r,a){let c;if(t.side===fn?c=n.intersectTriangle(r,o,i,!0,a):c=n.intersectTriangle(i,o,r,t.side===as,a),c===null)return null;zr.copy(a),zr.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(zr);return l<e.near||l>e.far?null:{distance:l,point:zr.clone(),object:s}}function Fr(s,t,e,n,i,o,r,a,c,l){s.getVertexPosition(a,Lr),s.getVertexPosition(c,Dr),s.getVertexPosition(l,Nr);const h=bm(s,t,e,n,Lr,Dr,Nr,nh);if(h){const u=new K;ni.getBarycoord(nh,Lr,Dr,Nr,u),i&&(h.uv=ni.getInterpolatedAttribute(i,a,c,l,u,new Ft)),o&&(h.uv1=ni.getInterpolatedAttribute(o,a,c,l,u,new Ft)),r&&(h.normal=ni.getInterpolatedAttribute(r,a,c,l,u,new K),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new K,materialIndex:0};ni.getNormal(Lr,Dr,Nr,f.normal),h.face=f,h.barycoord=u}return h}class vi extends Nn{constructor(t=1,e=1,n=1,i=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:o,depthSegments:r};const a=this;i=Math.floor(i),o=Math.floor(o),r=Math.floor(r);const c=[],l=[],h=[],u=[];let f=0,d=0;m("z","y","x",-1,-1,n,e,t,r,o,0),m("z","y","x",1,-1,n,e,-t,r,o,1),m("x","z","y",1,1,t,n,e,i,r,2),m("x","z","y",1,-1,t,n,-e,i,r,3),m("x","y","z",1,-1,t,e,n,i,o,4),m("x","y","z",-1,-1,t,e,-n,i,o,5),this.setIndex(c),this.setAttribute("position",new Ne(l,3)),this.setAttribute("normal",new Ne(h,3)),this.setAttribute("uv",new Ne(u,2));function m(_,p,g,M,E,T,U,D,w,I,A){const x=T/w,v=U/I,P=T/2,b=U/2,S=D/2,R=w+1,L=I+1;let G=0,k=0;const B=new K;for(let F=0;F<L;F++){const H=F*v-b;for(let V=0;V<R;V++){const $=V*x-P;B[_]=$*M,B[p]=H*E,B[g]=S,l.push(B.x,B.y,B.z),B[_]=0,B[p]=0,B[g]=D>0?1:-1,h.push(B.x,B.y,B.z),u.push(V/w),u.push(1-F/I),G+=1}}for(let F=0;F<I;F++)for(let H=0;H<w;H++){const V=f+H+R*F,$=f+H+R*(F+1),N=f+(H+1)+R*(F+1),Y=f+(H+1)+R*F;c.push(V,$,Y),c.push($,N,Y),k+=6}a.addGroup(d,k,A),d+=k,f+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function To(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function _n(s){const t={};for(let e=0;e<s.length;e++){const n=To(s[e]);for(const i in n)t[i]=n[i]}return t}function Tm(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function ff(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:xe.workingColorSpace}const Am={clone:To,merge:_n};var Cm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Rm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class cs extends vr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cm,this.fragmentShader=Rm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=To(t.uniforms),this.uniformsGroups=Tm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?e.uniforms[i]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[i]={type:"m4",value:r.toArray()}:e.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class pf extends pn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ze,this.projectionMatrix=new ze,this.projectionMatrixInverse=new ze,this.coordinateSystem=ki}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ji=new K,ih=new Ft,sh=new Ft;class Dn extends pf{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=zl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Xa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return zl*2*Math.atan(Math.tan(Xa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ji.x,Ji.y).multiplyScalar(-t/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ji.x,Ji.y).multiplyScalar(-t/Ji.z)}getViewSize(t,e){return this.getViewBounds(t,ih,sh),e.subVectors(sh,ih)}setViewOffset(t,e,n,i,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Xa*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,o=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;o+=r.offsetX*i/c,e-=r.offsetY*n/l,i*=r.width/c,n*=r.height/l}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Qs=-90,to=1;class Pm extends pn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Dn(Qs,to,t,e);i.layers=this.layers,this.add(i);const o=new Dn(Qs,to,t,e);o.layers=this.layers,this.add(o);const r=new Dn(Qs,to,t,e);r.layers=this.layers,this.add(r);const a=new Dn(Qs,to,t,e);a.layers=this.layers,this.add(a);const c=new Dn(Qs,to,t,e);c.layers=this.layers,this.add(c);const l=new Dn(Qs,to,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,o,r,a,c]=e;for(const l of e)this.remove(l);if(t===ki)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ma)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,o),t.setRenderTarget(n,1,i),t.render(e,r),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class mf extends Sn{constructor(t,e,n,i,o,r,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:wo,super(t,e,n,i,o,r,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Im extends Us{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new mf(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ei}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new vi(5,5,5),o=new cs({name:"CubemapFromEquirect",uniforms:To(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:fn,blending:ss});o.uniforms.tEquirect.value=e;const r=new Pt(i,o),a=e.minFilter;return e.minFilter===Ls&&(e.minFilter=ei),new Pm(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,i){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,i);t.setRenderTarget(o)}}const fc=new K,Lm=new K,Dm=new ie;let ws=class{constructor(t=new K(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=fc.subVectors(n,e).cross(Lm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(fc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/i;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Dm.getNormalMatrix(t),i=this.coplanarPoint(fc).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}};const ms=new ru,kr=new K;class au{constructor(t=new ws,e=new ws,n=new ws,i=new ws,o=new ws,r=new ws){this.planes=[t,e,n,i,o,r]}set(t,e,n,i,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ki){const n=this.planes,i=t.elements,o=i[0],r=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],f=i[7],d=i[8],m=i[9],_=i[10],p=i[11],g=i[12],M=i[13],E=i[14],T=i[15];if(n[0].setComponents(c-o,f-l,p-d,T-g).normalize(),n[1].setComponents(c+o,f+l,p+d,T+g).normalize(),n[2].setComponents(c+r,f+h,p+m,T+M).normalize(),n[3].setComponents(c-r,f-h,p-m,T-M).normalize(),n[4].setComponents(c-a,f-u,p-_,T-E).normalize(),e===ki)n[5].setComponents(c+a,f+u,p+_,T+E).normalize();else if(e===Ma)n[5].setComponents(a,u,_,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ms.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ms.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ms)}intersectsSprite(t){return ms.center.set(0,0,0),ms.radius=.7071067811865476,ms.applyMatrix4(t.matrixWorld),this.intersectsSphere(ms)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(kr.x=i.normal.x>0?t.max.x:t.min.x,kr.y=i.normal.y>0?t.max.y:t.min.y,kr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(kr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function gf(){let s=null,t=!1,e=null,n=null;function i(o,r){e(o,r),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){s=o}}}function Nm(s){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=s.createBuffer();s.bindBuffer(c,f),s.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=s.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=s.SHORT;else if(l instanceof Uint32Array)d=s.UNSIGNED_INT;else if(l instanceof Int32Array)d=s.INT;else if(l instanceof Int8Array)d=s.BYTE;else if(l instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(s.bindBuffer(l,a),u.length===0)s.bufferSubData(l,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){const m=u[f],_=u[d];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){const _=u[d];s.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(s.deleteBuffer(c.buffer),t.delete(a))}function r(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:o,update:r}}class zs extends Nn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const o=t/2,r=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=t/a,f=e/c,d=[],m=[],_=[],p=[];for(let g=0;g<h;g++){const M=g*f-r;for(let E=0;E<l;E++){const T=E*u-o;m.push(T,-M,0),_.push(0,0,1),p.push(E/a),p.push(1-g/c)}}for(let g=0;g<c;g++)for(let M=0;M<a;M++){const E=M+l*g,T=M+l*(g+1),U=M+1+l*(g+1),D=M+1+l*g;d.push(E,T,D),d.push(T,U,D)}this.setIndex(d),this.setAttribute("position",new Ne(m,3)),this.setAttribute("normal",new Ne(_,3)),this.setAttribute("uv",new Ne(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zs(t.width,t.height,t.widthSegments,t.heightSegments)}}var Um=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Fm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,km=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Om=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Gm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Wm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ym=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Km=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,jm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Zm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$m=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,t0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,e0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,n0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,i0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,s0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,o0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,r0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,a0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,c0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,l0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,u0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,h0="gl_FragColor = linearToOutputTexel( gl_FragColor );",d0=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,f0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,p0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,m0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,g0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,v0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,x0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,y0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,M0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,w0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,S0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,E0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,b0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,T0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,A0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,C0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,R0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,P0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,I0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,L0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,D0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,N0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,U0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,z0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,F0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,k0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,O0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,B0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,H0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,G0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,V0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,W0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,X0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,q0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Y0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,K0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,j0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Z0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,J0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Q0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,tg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ng=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ig=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,sg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,og=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ag=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ug=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,vg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,xg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,_g=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,yg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,wg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Eg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ag=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Rg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Dg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ng=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ug=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Og=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Hg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Gg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Vg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Xg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Yg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,jg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$g=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Qg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ev=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,nv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ov=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,av=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,lv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,uv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,dv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ee={alphahash_fragment:Um,alphahash_pars_fragment:zm,alphamap_fragment:Fm,alphamap_pars_fragment:km,alphatest_fragment:Om,alphatest_pars_fragment:Bm,aomap_fragment:Hm,aomap_pars_fragment:Gm,batching_pars_vertex:Vm,batching_vertex:Wm,begin_vertex:Xm,beginnormal_vertex:qm,bsdfs:Ym,iridescence_fragment:Km,bumpmap_pars_fragment:jm,clipping_planes_fragment:Zm,clipping_planes_pars_fragment:$m,clipping_planes_pars_vertex:Jm,clipping_planes_vertex:Qm,color_fragment:t0,color_pars_fragment:e0,color_pars_vertex:n0,color_vertex:i0,common:s0,cube_uv_reflection_fragment:o0,defaultnormal_vertex:r0,displacementmap_pars_vertex:a0,displacementmap_vertex:c0,emissivemap_fragment:l0,emissivemap_pars_fragment:u0,colorspace_fragment:h0,colorspace_pars_fragment:d0,envmap_fragment:f0,envmap_common_pars_fragment:p0,envmap_pars_fragment:m0,envmap_pars_vertex:g0,envmap_physical_pars_fragment:A0,envmap_vertex:v0,fog_vertex:x0,fog_pars_vertex:_0,fog_fragment:y0,fog_pars_fragment:M0,gradientmap_pars_fragment:w0,lightmap_pars_fragment:S0,lights_lambert_fragment:E0,lights_lambert_pars_fragment:b0,lights_pars_begin:T0,lights_toon_fragment:C0,lights_toon_pars_fragment:R0,lights_phong_fragment:P0,lights_phong_pars_fragment:I0,lights_physical_fragment:L0,lights_physical_pars_fragment:D0,lights_fragment_begin:N0,lights_fragment_maps:U0,lights_fragment_end:z0,logdepthbuf_fragment:F0,logdepthbuf_pars_fragment:k0,logdepthbuf_pars_vertex:O0,logdepthbuf_vertex:B0,map_fragment:H0,map_pars_fragment:G0,map_particle_fragment:V0,map_particle_pars_fragment:W0,metalnessmap_fragment:X0,metalnessmap_pars_fragment:q0,morphinstance_vertex:Y0,morphcolor_vertex:K0,morphnormal_vertex:j0,morphtarget_pars_vertex:Z0,morphtarget_vertex:$0,normal_fragment_begin:J0,normal_fragment_maps:Q0,normal_pars_fragment:tg,normal_pars_vertex:eg,normal_vertex:ng,normalmap_pars_fragment:ig,clearcoat_normal_fragment_begin:sg,clearcoat_normal_fragment_maps:og,clearcoat_pars_fragment:rg,iridescence_pars_fragment:ag,opaque_fragment:cg,packing:lg,premultiplied_alpha_fragment:ug,project_vertex:hg,dithering_fragment:dg,dithering_pars_fragment:fg,roughnessmap_fragment:pg,roughnessmap_pars_fragment:mg,shadowmap_pars_fragment:gg,shadowmap_pars_vertex:vg,shadowmap_vertex:xg,shadowmask_pars_fragment:_g,skinbase_vertex:yg,skinning_pars_vertex:Mg,skinning_vertex:wg,skinnormal_vertex:Sg,specularmap_fragment:Eg,specularmap_pars_fragment:bg,tonemapping_fragment:Tg,tonemapping_pars_fragment:Ag,transmission_fragment:Cg,transmission_pars_fragment:Rg,uv_pars_fragment:Pg,uv_pars_vertex:Ig,uv_vertex:Lg,worldpos_vertex:Dg,background_vert:Ng,background_frag:Ug,backgroundCube_vert:zg,backgroundCube_frag:Fg,cube_vert:kg,cube_frag:Og,depth_vert:Bg,depth_frag:Hg,distanceRGBA_vert:Gg,distanceRGBA_frag:Vg,equirect_vert:Wg,equirect_frag:Xg,linedashed_vert:qg,linedashed_frag:Yg,meshbasic_vert:Kg,meshbasic_frag:jg,meshlambert_vert:Zg,meshlambert_frag:$g,meshmatcap_vert:Jg,meshmatcap_frag:Qg,meshnormal_vert:tv,meshnormal_frag:ev,meshphong_vert:nv,meshphong_frag:iv,meshphysical_vert:sv,meshphysical_frag:ov,meshtoon_vert:rv,meshtoon_frag:av,points_vert:cv,points_frag:lv,shadow_vert:uv,shadow_frag:hv,sprite_vert:dv,sprite_frag:fv},Rt={common:{diffuse:{value:new he(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ie}},envmap:{envMap:{value:null},envMapRotation:{value:new ie},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ie},normalScale:{value:new Ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new he(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new he(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0},uvTransform:{value:new ie}},sprite:{diffuse:{value:new he(16777215)},opacity:{value:1},center:{value:new Ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}}},pi={basic:{uniforms:_n([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:_n([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,Rt.lights,{emissive:{value:new he(0)}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:_n([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,Rt.lights,{emissive:{value:new he(0)},specular:{value:new he(1118481)},shininess:{value:30}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:_n([Rt.common,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.roughnessmap,Rt.metalnessmap,Rt.fog,Rt.lights,{emissive:{value:new he(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:_n([Rt.common,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.gradientmap,Rt.fog,Rt.lights,{emissive:{value:new he(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:_n([Rt.common,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:_n([Rt.points,Rt.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:_n([Rt.common,Rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:_n([Rt.common,Rt.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:_n([Rt.common,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:_n([Rt.sprite,Rt.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ie}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distanceRGBA:{uniforms:_n([Rt.common,Rt.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distanceRGBA_vert,fragmentShader:ee.distanceRGBA_frag},shadow:{uniforms:_n([Rt.lights,Rt.fog,{color:{value:new he(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};pi.physical={uniforms:_n([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ie},clearcoatNormalScale:{value:new Ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ie},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ie},sheen:{value:0},sheenColor:{value:new he(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ie},transmissionSamplerSize:{value:new Ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ie},attenuationDistance:{value:0},attenuationColor:{value:new he(0)},specularColor:{value:new he(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ie},anisotropyVector:{value:new Ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ie}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};const Or={r:0,b:0,g:0},gs=new yi,pv=new ze;function mv(s,t,e,n,i,o,r){const a=new he(0);let c=o===!0?0:1,l,h,u=null,f=0,d=null;function m(M){let E=M.isScene===!0?M.background:null;return E&&E.isTexture&&(E=(M.backgroundBlurriness>0?e:t).get(E)),E}function _(M){let E=!1;const T=m(M);T===null?g(a,c):T&&T.isColor&&(g(T,1),E=!0);const U=s.xr.getEnvironmentBlendMode();U==="additive"?n.buffers.color.setClear(0,0,0,1,r):U==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(s.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function p(M,E){const T=m(E);T&&(T.isCubeTexture||T.mapping===Da)?(h===void 0&&(h=new Pt(new vi(1,1,1),new cs({name:"BackgroundCubeMaterial",uniforms:To(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:fn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(U,D,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),gs.copy(E.backgroundRotation),gs.x*=-1,gs.y*=-1,gs.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(gs.y*=-1,gs.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(pv.makeRotationFromEuler(gs)),h.material.toneMapped=xe.getTransfer(T.colorSpace)!==Ie,(u!==T||f!==T.version||d!==s.toneMapping)&&(h.material.needsUpdate=!0,u=T,f=T.version,d=s.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new Pt(new zs(2,2),new cs({name:"BackgroundMaterial",uniforms:To(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:as,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=xe.getTransfer(T.colorSpace)!==Ie,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||f!==T.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,u=T,f=T.version,d=s.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function g(M,E){M.getRGB(Or,ff(s)),n.buffers.color.setClear(Or.r,Or.g,Or.b,E,r)}return{getClearColor:function(){return a},setClearColor:function(M,E=1){a.set(M),c=E,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,g(a,c)},render:_,addToRenderList:p}}function gv(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=f(null);let o=i,r=!1;function a(x,v,P,b,S){let R=!1;const L=u(b,P,v);o!==L&&(o=L,l(o.object)),R=d(x,b,P,S),R&&m(x,b,P,S),S!==null&&t.update(S,s.ELEMENT_ARRAY_BUFFER),(R||r)&&(r=!1,T(x,v,P,b),S!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(S).buffer))}function c(){return s.createVertexArray()}function l(x){return s.bindVertexArray(x)}function h(x){return s.deleteVertexArray(x)}function u(x,v,P){const b=P.wireframe===!0;let S=n[x.id];S===void 0&&(S={},n[x.id]=S);let R=S[v.id];R===void 0&&(R={},S[v.id]=R);let L=R[b];return L===void 0&&(L=f(c()),R[b]=L),L}function f(x){const v=[],P=[],b=[];for(let S=0;S<e;S++)v[S]=0,P[S]=0,b[S]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:P,attributeDivisors:b,object:x,attributes:{},index:null}}function d(x,v,P,b){const S=o.attributes,R=v.attributes;let L=0;const G=P.getAttributes();for(const k in G)if(G[k].location>=0){const F=S[k];let H=R[k];if(H===void 0&&(k==="instanceMatrix"&&x.instanceMatrix&&(H=x.instanceMatrix),k==="instanceColor"&&x.instanceColor&&(H=x.instanceColor)),F===void 0||F.attribute!==H||H&&F.data!==H.data)return!0;L++}return o.attributesNum!==L||o.index!==b}function m(x,v,P,b){const S={},R=v.attributes;let L=0;const G=P.getAttributes();for(const k in G)if(G[k].location>=0){let F=R[k];F===void 0&&(k==="instanceMatrix"&&x.instanceMatrix&&(F=x.instanceMatrix),k==="instanceColor"&&x.instanceColor&&(F=x.instanceColor));const H={};H.attribute=F,F&&F.data&&(H.data=F.data),S[k]=H,L++}o.attributes=S,o.attributesNum=L,o.index=b}function _(){const x=o.newAttributes;for(let v=0,P=x.length;v<P;v++)x[v]=0}function p(x){g(x,0)}function g(x,v){const P=o.newAttributes,b=o.enabledAttributes,S=o.attributeDivisors;P[x]=1,b[x]===0&&(s.enableVertexAttribArray(x),b[x]=1),S[x]!==v&&(s.vertexAttribDivisor(x,v),S[x]=v)}function M(){const x=o.newAttributes,v=o.enabledAttributes;for(let P=0,b=v.length;P<b;P++)v[P]!==x[P]&&(s.disableVertexAttribArray(P),v[P]=0)}function E(x,v,P,b,S,R,L){L===!0?s.vertexAttribIPointer(x,v,P,S,R):s.vertexAttribPointer(x,v,P,b,S,R)}function T(x,v,P,b){_();const S=b.attributes,R=P.getAttributes(),L=v.defaultAttributeValues;for(const G in R){const k=R[G];if(k.location>=0){let B=S[G];if(B===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(B=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(B=x.instanceColor)),B!==void 0){const F=B.normalized,H=B.itemSize,V=t.get(B);if(V===void 0)continue;const $=V.buffer,N=V.type,Y=V.bytesPerElement,st=N===s.INT||N===s.UNSIGNED_INT||B.gpuType===Ql;if(B.isInterleavedBufferAttribute){const at=B.data,pt=at.stride,nt=B.offset;if(at.isInstancedInterleavedBuffer){for(let Mt=0;Mt<k.locationSize;Mt++)g(k.location+Mt,at.meshPerAttribute);x.isInstancedMesh!==!0&&b._maxInstanceCount===void 0&&(b._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Mt=0;Mt<k.locationSize;Mt++)p(k.location+Mt);s.bindBuffer(s.ARRAY_BUFFER,$);for(let Mt=0;Mt<k.locationSize;Mt++)E(k.location+Mt,H/k.locationSize,N,F,pt*Y,(nt+H/k.locationSize*Mt)*Y,st)}else{if(B.isInstancedBufferAttribute){for(let at=0;at<k.locationSize;at++)g(k.location+at,B.meshPerAttribute);x.isInstancedMesh!==!0&&b._maxInstanceCount===void 0&&(b._maxInstanceCount=B.meshPerAttribute*B.count)}else for(let at=0;at<k.locationSize;at++)p(k.location+at);s.bindBuffer(s.ARRAY_BUFFER,$);for(let at=0;at<k.locationSize;at++)E(k.location+at,H/k.locationSize,N,F,H*Y,H/k.locationSize*at*Y,st)}}else if(L!==void 0){const F=L[G];if(F!==void 0)switch(F.length){case 2:s.vertexAttrib2fv(k.location,F);break;case 3:s.vertexAttrib3fv(k.location,F);break;case 4:s.vertexAttrib4fv(k.location,F);break;default:s.vertexAttrib1fv(k.location,F)}}}}M()}function U(){I();for(const x in n){const v=n[x];for(const P in v){const b=v[P];for(const S in b)h(b[S].object),delete b[S];delete v[P]}delete n[x]}}function D(x){if(n[x.id]===void 0)return;const v=n[x.id];for(const P in v){const b=v[P];for(const S in b)h(b[S].object),delete b[S];delete v[P]}delete n[x.id]}function w(x){for(const v in n){const P=n[v];if(P[x.id]===void 0)continue;const b=P[x.id];for(const S in b)h(b[S].object),delete b[S];delete P[x.id]}}function I(){A(),r=!0,o!==i&&(o=i,l(o.object))}function A(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:I,resetDefaultState:A,dispose:U,releaseStatesOfGeometry:D,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:p,disableUnusedAttributes:M}}function vv(s,t,e){let n;function i(l){n=l}function o(l,h){s.drawArrays(n,l,h),e.update(h,n,1)}function r(l,h,u){u!==0&&(s.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let m=0;m<u;m++)d+=h[m];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<l.length;m++)r(l[m],h[m],f[m]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let m=0;for(let _=0;_<u;_++)m+=h[_];for(let _=0;_<f.length;_++)e.update(m,n,f[_])}}this.setMode=i,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function xv(s,t,e,n){let i;function o(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(w){return!(w!==si&&n.convert(w)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const I=w===pr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Hi&&n.convert(w)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Fi&&!I)}function c(w){if(w==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(f===!0){const w=t.get("EXT_clip_control");w.clipControlEXT(w.LOWER_LEFT_EXT,w.ZERO_TO_ONE_EXT)}const d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),M=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),T=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),U=m>0,D=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:T,vertexTextures:U,maxSamples:D}}function _v(s){const t=this;let e=null,n=0,i=!1,o=!1;const r=new ws,a=new ie,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const m=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,g=s.get(u);if(!i||m===null||m.length===0||o&&!p)o?h(null):l();else{const M=o?0:n,E=M*4;let T=g.clippingState||null;c.value=T,T=h(m,f,E,d);for(let U=0;U!==E;++U)T[U]=e[U];g.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,m){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=c.value,m!==!0||p===null){const g=d+_*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(p===null||p.length<g)&&(p=new Float32Array(g));for(let E=0,T=d;E!==_;++E,T+=4)r.copy(u[E]).applyMatrix4(M,a),r.normal.toArray(p,T),p[T+3]=r.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function yv(s){let t=new WeakMap;function e(r,a){return a===al?r.mapping=wo:a===cl&&(r.mapping=So),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===al||a===cl)if(t.has(r)){const c=t.get(r).texture;return e(c,r.mapping)}else{const c=r.image;if(c&&c.height>0){const l=new Im(c.height);return l.fromEquirectangularTexture(s,r),t.set(r,l),r.addEventListener("dispose",i),e(l.texture,r.mapping)}else return null}}return r}function i(r){const a=r.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class vf extends pf{constructor(t=-1,e=1,n=1,i=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let o=n-t,r=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,r=o+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const co=4,oh=[.125,.215,.35,.446,.526,.582],bs=20,pc=new vf,rh=new he;let mc=null,gc=0,vc=0,xc=!1;const Ss=(1+Math.sqrt(5))/2,eo=1/Ss,ah=[new K(-Ss,eo,0),new K(Ss,eo,0),new K(-eo,0,Ss),new K(eo,0,Ss),new K(0,Ss,-eo),new K(0,Ss,eo),new K(-1,1,-1),new K(1,1,-1),new K(-1,1,1),new K(1,1,1)];class Fl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){mc=this._renderer.getRenderTarget(),gc=this._renderer.getActiveCubeFace(),vc=this._renderer.getActiveMipmapLevel(),xc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,i,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=uh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(mc,gc,vc),this._renderer.xr.enabled=xc,t.scissorTest=!1,Br(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===wo||t.mapping===So?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),mc=this._renderer.getRenderTarget(),gc=this._renderer.getActiveCubeFace(),vc=this._renderer.getActiveMipmapLevel(),xc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ei,minFilter:ei,generateMipmaps:!1,type:pr,format:si,colorSpace:hs,depthBuffer:!1},i=ch(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ch(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Mv(o)),this._blurMaterial=wv(o,t,e)}return i}_compileMaterial(t){const e=new Pt(this._lodPlanes[0],t);this._renderer.compile(e,pc)}_sceneToCubeUV(t,e,n,i){const a=new Dn(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(rh),h.toneMapping=os,h.autoClear=!1;const d=new yn({name:"PMREM.Background",side:fn,depthWrite:!1,depthTest:!1}),m=new Pt(new vi,d);let _=!1;const p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,_=!0):(d.color.copy(rh),_=!0);for(let g=0;g<6;g++){const M=g%3;M===0?(a.up.set(0,c[g],0),a.lookAt(l[g],0,0)):M===1?(a.up.set(0,0,c[g]),a.lookAt(0,l[g],0)):(a.up.set(0,c[g],0),a.lookAt(0,0,l[g]));const E=this._cubeSize;Br(i,M*E,g>2?E:0,E,E),h.setRenderTarget(i),_&&h.render(m,a),h.render(t,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===wo||t.mapping===So;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=uh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lh());const o=i?this._cubemapMaterial:this._equirectMaterial,r=new Pt(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const c=this._cubeSize;Br(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(r,pc)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let o=1;o<i;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=ah[(i-o-1)%ah.length];this._blur(t,o-1,o,r,a)}e.autoClear=n}_blur(t,e,n,i,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,i,"latitudinal",o),this._halfBlur(r,t,n,n,i,"longitudinal",o)}_halfBlur(t,e,n,i,o,r,a){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Pt(this._lodPlanes[i],l),f=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(o)?Math.PI/(2*d):2*Math.PI/(2*bs-1),_=o/m,p=isFinite(o)?1+Math.floor(h*_):bs;p>bs&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${bs}`);const g=[];let M=0;for(let w=0;w<bs;++w){const I=w/_,A=Math.exp(-I*I/2);g.push(A),w===0?M+=A:w<p&&(M+=2*A)}for(let w=0;w<g.length;w++)g[w]=g[w]/M;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=g,f.latitudinal.value=r==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:E}=this;f.dTheta.value=m,f.mipInt.value=E-n;const T=this._sizeLods[i],U=3*T*(i>E-co?i-E+co:0),D=4*(this._cubeSize-T);Br(e,U,D,3*T,2*T),c.setRenderTarget(e),c.render(u,pc)}}function Mv(s){const t=[],e=[],n=[];let i=s;const o=s-co+1+oh.length;for(let r=0;r<o;r++){const a=Math.pow(2,i);e.push(a);let c=1/a;r>s-co?c=oh[r-s+co-1]:r===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,m=6,_=3,p=2,g=1,M=new Float32Array(_*m*d),E=new Float32Array(p*m*d),T=new Float32Array(g*m*d);for(let D=0;D<d;D++){const w=D%3*2/3-1,I=D>2?0:-1,A=[w,I,0,w+2/3,I,0,w+2/3,I+1,0,w,I,0,w+2/3,I+1,0,w,I+1,0];M.set(A,_*m*D),E.set(f,p*m*D);const x=[D,D,D,D,D,D];T.set(x,g*m*D)}const U=new Nn;U.setAttribute("position",new gi(M,_)),U.setAttribute("uv",new gi(E,p)),U.setAttribute("faceIndex",new gi(T,g)),t.push(U),i>co&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ch(s,t,e){const n=new Us(s,t,e);return n.texture.mapping=Da,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Br(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function wv(s,t,e){const n=new Float32Array(bs),i=new K(0,1,0);return new cs({name:"SphericalGaussianBlur",defines:{n:bs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:cu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ss,depthTest:!1,depthWrite:!1})}function lh(){return new cs({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ss,depthTest:!1,depthWrite:!1})}function uh(){return new cs({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ss,depthTest:!1,depthWrite:!1})}function cu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Sv(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===al||c===cl,h=c===wo||c===So;if(l||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Fl(s)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return l&&d&&d.height>0||h&&d&&i(d)?(e===null&&(e=new Fl(s)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",o),u.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function o(a){const c=a.target;c.removeEventListener("dispose",o);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function Ev(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&ua("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function bv(s,t,e,n){const i={},o=new WeakMap;function r(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const m in f.attributes)t.remove(f.attributes[m]);for(const m in f.morphAttributes){const _=f.morphAttributes[m];for(let p=0,g=_.length;p<g;p++)t.remove(_[p])}f.removeEventListener("dispose",r),delete i[f.id];const d=o.get(f);d&&(t.remove(d),o.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return i[f.id]===!0||(f.addEventListener("dispose",r),i[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const m in f)t.update(f[m],s.ARRAY_BUFFER);const d=u.morphAttributes;for(const m in d){const _=d[m];for(let p=0,g=_.length;p<g;p++)t.update(_[p],s.ARRAY_BUFFER)}}function l(u){const f=[],d=u.index,m=u.attributes.position;let _=0;if(d!==null){const M=d.array;_=d.version;for(let E=0,T=M.length;E<T;E+=3){const U=M[E+0],D=M[E+1],w=M[E+2];f.push(U,D,D,w,w,U)}}else if(m!==void 0){const M=m.array;_=m.version;for(let E=0,T=M.length/3-1;E<T;E+=3){const U=E+0,D=E+1,w=E+2;f.push(U,D,D,w,w,U)}}else return;const p=new(rf(f)?df:hf)(f,1);p.version=_;const g=o.get(u);g&&t.remove(g),o.set(u,p)}function h(u){const f=o.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return o.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Tv(s,t,e){let n;function i(f){n=f}let o,r;function a(f){o=f.type,r=f.bytesPerElement}function c(f,d){s.drawElements(n,d,o,f*r),e.update(d,n,1)}function l(f,d,m){m!==0&&(s.drawElementsInstanced(n,d,o,f*r,m),e.update(d,n,m))}function h(f,d,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,o,f,0,m);let p=0;for(let g=0;g<m;g++)p+=d[g];e.update(p,n,1)}function u(f,d,m,_){if(m===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<f.length;g++)l(f[g]/r,d[g],_[g]);else{p.multiDrawElementsInstancedWEBGL(n,d,0,o,f,0,_,0,m);let g=0;for(let M=0;M<m;M++)g+=d[M];for(let M=0;M<_.length;M++)e.update(g,n,_[M])}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Av(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,r,a){switch(e.calls++,r){case s.TRIANGLES:e.triangles+=a*(o/3);break;case s.LINES:e.lines+=a*(o/2);break;case s.LINE_STRIP:e.lines+=a*(o-1);break;case s.LINE_LOOP:e.lines+=a*o;break;case s.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Cv(s,t,e){const n=new WeakMap,i=new Me;function o(r,a,c){const l=r.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let x=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",x)};var d=x;f!==void 0&&f.texture.dispose();const m=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let T=0;m===!0&&(T=1),_===!0&&(T=2),p===!0&&(T=3);let U=a.attributes.position.count*T,D=1;U>t.maxTextureSize&&(D=Math.ceil(U/t.maxTextureSize),U=t.maxTextureSize);const w=new Float32Array(U*D*4*u),I=new cf(w,U,D,u);I.type=Fi,I.needsUpdate=!0;const A=T*4;for(let v=0;v<u;v++){const P=g[v],b=M[v],S=E[v],R=U*D*4*v;for(let L=0;L<P.count;L++){const G=L*A;m===!0&&(i.fromBufferAttribute(P,L),w[R+G+0]=i.x,w[R+G+1]=i.y,w[R+G+2]=i.z,w[R+G+3]=0),_===!0&&(i.fromBufferAttribute(b,L),w[R+G+4]=i.x,w[R+G+5]=i.y,w[R+G+6]=i.z,w[R+G+7]=0),p===!0&&(i.fromBufferAttribute(S,L),w[R+G+8]=i.x,w[R+G+9]=i.y,w[R+G+10]=i.z,w[R+G+11]=S.itemSize===4?i.w:1)}}f={count:u,texture:I,size:new Ft(U,D)},n.set(a,f),a.addEventListener("dispose",x)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",r.morphTexture,e);else{let m=0;for(let p=0;p<l.length;p++)m+=l[p];const _=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(s,"morphTargetBaseInfluence",_),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:o}}function Rv(s,t,e,n){let i=new WeakMap;function o(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(i.get(u)!==l&&(t.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return u}function r(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:o,dispose:r}}class xf extends Sn{constructor(t,e,n,i,o,r,a,c,l,h=go){if(h!==go&&h!==bo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===go&&(n=Ns),n===void 0&&h===bo&&(n=Eo),super(null,i,o,r,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:qn,this.minFilter=c!==void 0?c:qn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const _f=new Sn,hh=new xf(1,1),yf=new cf,Mf=new pm,wf=new mf,dh=[],fh=[],ph=new Float32Array(16),mh=new Float32Array(9),gh=new Float32Array(4);function Fo(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let o=dh[i];if(o===void 0&&(o=new Float32Array(i),dh[i]=o),t!==0){n.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,s[r].toArray(o,a)}return o}function en(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function nn(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Ua(s,t){let e=fh[t];e===void 0&&(e=new Int32Array(t),fh[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Pv(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Iv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(en(e,t))return;s.uniform2fv(this.addr,t),nn(e,t)}}function Lv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(en(e,t))return;s.uniform3fv(this.addr,t),nn(e,t)}}function Dv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(en(e,t))return;s.uniform4fv(this.addr,t),nn(e,t)}}function Nv(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(en(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),nn(e,t)}else{if(en(e,n))return;gh.set(n),s.uniformMatrix2fv(this.addr,!1,gh),nn(e,n)}}function Uv(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(en(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),nn(e,t)}else{if(en(e,n))return;mh.set(n),s.uniformMatrix3fv(this.addr,!1,mh),nn(e,n)}}function zv(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(en(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),nn(e,t)}else{if(en(e,n))return;ph.set(n),s.uniformMatrix4fv(this.addr,!1,ph),nn(e,n)}}function Fv(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function kv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(en(e,t))return;s.uniform2iv(this.addr,t),nn(e,t)}}function Ov(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(en(e,t))return;s.uniform3iv(this.addr,t),nn(e,t)}}function Bv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(en(e,t))return;s.uniform4iv(this.addr,t),nn(e,t)}}function Hv(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Gv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(en(e,t))return;s.uniform2uiv(this.addr,t),nn(e,t)}}function Vv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(en(e,t))return;s.uniform3uiv(this.addr,t),nn(e,t)}}function Wv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(en(e,t))return;s.uniform4uiv(this.addr,t),nn(e,t)}}function Xv(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let o;this.type===s.SAMPLER_2D_SHADOW?(hh.compareFunction=of,o=hh):o=_f,e.setTexture2D(t||o,i)}function qv(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Mf,i)}function Yv(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||wf,i)}function Kv(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||yf,i)}function jv(s){switch(s){case 5126:return Pv;case 35664:return Iv;case 35665:return Lv;case 35666:return Dv;case 35674:return Nv;case 35675:return Uv;case 35676:return zv;case 5124:case 35670:return Fv;case 35667:case 35671:return kv;case 35668:case 35672:return Ov;case 35669:case 35673:return Bv;case 5125:return Hv;case 36294:return Gv;case 36295:return Vv;case 36296:return Wv;case 35678:case 36198:case 36298:case 36306:case 35682:return Xv;case 35679:case 36299:case 36307:return qv;case 35680:case 36300:case 36308:case 36293:return Yv;case 36289:case 36303:case 36311:case 36292:return Kv}}function Zv(s,t){s.uniform1fv(this.addr,t)}function $v(s,t){const e=Fo(t,this.size,2);s.uniform2fv(this.addr,e)}function Jv(s,t){const e=Fo(t,this.size,3);s.uniform3fv(this.addr,e)}function Qv(s,t){const e=Fo(t,this.size,4);s.uniform4fv(this.addr,e)}function tx(s,t){const e=Fo(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function ex(s,t){const e=Fo(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function nx(s,t){const e=Fo(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function ix(s,t){s.uniform1iv(this.addr,t)}function sx(s,t){s.uniform2iv(this.addr,t)}function ox(s,t){s.uniform3iv(this.addr,t)}function rx(s,t){s.uniform4iv(this.addr,t)}function ax(s,t){s.uniform1uiv(this.addr,t)}function cx(s,t){s.uniform2uiv(this.addr,t)}function lx(s,t){s.uniform3uiv(this.addr,t)}function ux(s,t){s.uniform4uiv(this.addr,t)}function hx(s,t,e){const n=this.cache,i=t.length,o=Ua(e,i);en(n,o)||(s.uniform1iv(this.addr,o),nn(n,o));for(let r=0;r!==i;++r)e.setTexture2D(t[r]||_f,o[r])}function dx(s,t,e){const n=this.cache,i=t.length,o=Ua(e,i);en(n,o)||(s.uniform1iv(this.addr,o),nn(n,o));for(let r=0;r!==i;++r)e.setTexture3D(t[r]||Mf,o[r])}function fx(s,t,e){const n=this.cache,i=t.length,o=Ua(e,i);en(n,o)||(s.uniform1iv(this.addr,o),nn(n,o));for(let r=0;r!==i;++r)e.setTextureCube(t[r]||wf,o[r])}function px(s,t,e){const n=this.cache,i=t.length,o=Ua(e,i);en(n,o)||(s.uniform1iv(this.addr,o),nn(n,o));for(let r=0;r!==i;++r)e.setTexture2DArray(t[r]||yf,o[r])}function mx(s){switch(s){case 5126:return Zv;case 35664:return $v;case 35665:return Jv;case 35666:return Qv;case 35674:return tx;case 35675:return ex;case 35676:return nx;case 5124:case 35670:return ix;case 35667:case 35671:return sx;case 35668:case 35672:return ox;case 35669:case 35673:return rx;case 5125:return ax;case 36294:return cx;case 36295:return lx;case 36296:return ux;case 35678:case 36198:case 36298:case 36306:case 35682:return hx;case 35679:case 36299:case 36307:return dx;case 35680:case 36300:case 36308:case 36293:return fx;case 36289:case 36303:case 36311:case 36292:return px}}class gx{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=jv(e.type)}}class vx{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=mx(e.type)}}class xx{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let o=0,r=i.length;o!==r;++o){const a=i[o];a.setValue(t,e[a.id],n)}}}const _c=/(\w+)(\])?(\[|\.)?/g;function vh(s,t){s.seq.push(t),s.map[t.id]=t}function _x(s,t,e){const n=s.name,i=n.length;for(_c.lastIndex=0;;){const o=_c.exec(n),r=_c.lastIndex;let a=o[1];const c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&r+2===i){vh(e,l===void 0?new gx(a,s,t):new vx(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new xx(a),vh(e,u)),e=u}}}class ha{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const o=t.getActiveUniform(e,i),r=t.getUniformLocation(e,o.name);_x(o,r,this)}}setValue(t,e,n,i){const o=this.map[e];o!==void 0&&o.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let o=0,r=e.length;o!==r;++o){const a=e[o],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,o=t.length;i!==o;++i){const r=t[i];r.id in e&&n.push(r)}return n}}function xh(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const yx=37297;let Mx=0;function wx(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=i;r<o;r++){const a=r+1;n.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return n.join(`
`)}function Sx(s){const t=xe.getPrimaries(xe.workingColorSpace),e=xe.getPrimaries(s);let n;switch(t===e?n="":t===ya&&e===_a?n="LinearDisplayP3ToLinearSRGB":t===_a&&e===ya&&(n="LinearSRGBToLinearDisplayP3"),s){case hs:case Na:return[n,"LinearTransferOETF"];case Vn:case ou:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function _h(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const o=/ERROR: 0:(\d+)/.exec(i);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+i+`

`+wx(s.getShaderSource(t),r)}else return i}function Ex(s,t){const e=Sx(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function bx(s,t){let e;switch(t){case Hp:e="Linear";break;case Gp:e="Reinhard";break;case Vp:e="Cineon";break;case Wp:e="ACESFilmic";break;case qp:e="AgX";break;case Xd:e="Neutral";break;case Xp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Hr=new K;function Tx(){xe.getLuminanceCoefficients(Hr);const s=Hr.x.toFixed(4),t=Hr.y.toFixed(4),e=Hr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ax(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(nr).join(`
`)}function Cx(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Rx(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const o=s.getActiveAttrib(t,i),r=o.name;let a=1;o.type===s.FLOAT_MAT2&&(a=2),o.type===s.FLOAT_MAT3&&(a=3),o.type===s.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:s.getAttribLocation(t,r),locationSize:a}}return e}function nr(s){return s!==""}function yh(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Mh(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Px=/^[ \t]*#include +<([\w\d./]+)>/gm;function kl(s){return s.replace(Px,Lx)}const Ix=new Map;function Lx(s,t){let e=ee[t];if(e===void 0){const n=Ix.get(t);if(n!==void 0)e=ee[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return kl(e)}const Dx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wh(s){return s.replace(Dx,Nx)}function Nx(s,t,e,n){let i="";for(let o=parseInt(t);o<parseInt(e);o++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return i}function Sh(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Ux(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Gd?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Vd?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Ni&&(t="SHADOWMAP_TYPE_VSM"),t}function zx(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case wo:case So:t="ENVMAP_TYPE_CUBE";break;case Da:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Fx(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case So:t="ENVMAP_MODE_REFRACTION";break}return t}function kx(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Wd:t="ENVMAP_BLENDING_MULTIPLY";break;case Op:t="ENVMAP_BLENDING_MIX";break;case Bp:t="ENVMAP_BLENDING_ADD";break}return t}function Ox(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Bx(s,t,e,n){const i=s.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const c=Ux(e),l=zx(e),h=Fx(e),u=kx(e),f=Ox(e),d=Ax(e),m=Cx(o),_=i.createProgram();let p,g,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(nr).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(nr).join(`
`),g.length>0&&(g+=`
`)):(p=[Sh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(nr).join(`
`),g=[Sh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==os?"#define TONE_MAPPING":"",e.toneMapping!==os?ee.tonemapping_pars_fragment:"",e.toneMapping!==os?bx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,Ex("linearToOutputTexel",e.outputColorSpace),Tx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(nr).join(`
`)),r=kl(r),r=yh(r,e),r=Mh(r,e),a=kl(a),a=yh(a,e),a=Mh(a,e),r=wh(r),a=wh(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",e.glslVersion===Hu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Hu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const E=M+p+r,T=M+g+a,U=xh(i,i.VERTEX_SHADER,E),D=xh(i,i.FRAGMENT_SHADER,T);i.attachShader(_,U),i.attachShader(_,D),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function w(v){if(s.debug.checkShaderErrors){const P=i.getProgramInfoLog(_).trim(),b=i.getShaderInfoLog(U).trim(),S=i.getShaderInfoLog(D).trim();let R=!0,L=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(R=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,U,D);else{const G=_h(i,U,"vertex"),k=_h(i,D,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+v.name+`
Material Type: `+v.type+`

Program Info Log: `+P+`
`+G+`
`+k)}else P!==""?console.warn("THREE.WebGLProgram: Program Info Log:",P):(b===""||S==="")&&(L=!1);L&&(v.diagnostics={runnable:R,programLog:P,vertexShader:{log:b,prefix:p},fragmentShader:{log:S,prefix:g}})}i.deleteShader(U),i.deleteShader(D),I=new ha(i,_),A=Rx(i,_)}let I;this.getUniforms=function(){return I===void 0&&w(this),I};let A;this.getAttributes=function(){return A===void 0&&w(this),A};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(_,yx)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Mx++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=U,this.fragmentShader=D,this}let Hx=0;class Gx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),o=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Vx(t),e.set(t,n)),n}}class Vx{constructor(t){this.id=Hx++,this.code=t,this.usedTimes=0}}function Wx(s,t,e,n,i,o,r){const a=new lf,c=new Gx,l=new Set,h=[],u=i.logarithmicDepthBuffer,f=i.reverseDepthBuffer,d=i.vertexTextures;let m=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return l.add(x),x===0?"uv":`uv${x}`}function g(x,v,P,b,S){const R=b.fog,L=S.geometry,G=x.isMeshStandardMaterial?b.environment:null,k=(x.isMeshStandardMaterial?e:t).get(x.envMap||G),B=k&&k.mapping===Da?k.image.height:null,F=_[x.type];x.precision!==null&&(m=i.getMaxPrecision(x.precision),m!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",m,"instead."));const H=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,V=H!==void 0?H.length:0;let $=0;L.morphAttributes.position!==void 0&&($=1),L.morphAttributes.normal!==void 0&&($=2),L.morphAttributes.color!==void 0&&($=3);let N,Y,st,at;if(F){const sn=pi[F];N=sn.vertexShader,Y=sn.fragmentShader}else N=x.vertexShader,Y=x.fragmentShader,c.update(x),st=c.getVertexShaderID(x),at=c.getFragmentShaderID(x);const pt=s.getRenderTarget(),nt=S.isInstancedMesh===!0,Mt=S.isBatchedMesh===!0,yt=!!x.map,Dt=!!x.matcap,X=!!k,ce=!!x.aoMap,Bt=!!x.lightMap,Yt=!!x.bumpMap,Ct=!!x.normalMap,qt=!!x.displacementMap,It=!!x.emissiveMap,O=!!x.metalnessMap,C=!!x.roughnessMap,q=x.anisotropy>0,J=x.clearcoat>0,ut=x.dispersion>0,rt=x.iridescence>0,Ut=x.sheen>0,xt=x.transmission>0,St=q&&!!x.anisotropyMap,jt=J&&!!x.clearcoatMap,_t=J&&!!x.clearcoatNormalMap,et=J&&!!x.clearcoatRoughnessMap,lt=rt&&!!x.iridescenceMap,vt=rt&&!!x.iridescenceThicknessMap,mt=Ut&&!!x.sheenColorMap,Nt=Ut&&!!x.sheenRoughnessMap,Et=!!x.specularMap,$t=!!x.specularColorMap,Z=!!x.specularIntensityMap,At=xt&&!!x.transmissionMap,ot=xt&&!!x.thicknessMap,ht=!!x.gradientMap,Tt=!!x.alphaMap,bt=x.alphaTest>0,re=!!x.alphaHash,Fe=!!x.extensions;let Ze=os;x.toneMapped&&(pt===null||pt.isXRRenderTarget===!0)&&(Ze=s.toneMapping);const le={shaderID:F,shaderType:x.type,shaderName:x.name,vertexShader:N,fragmentShader:Y,defines:x.defines,customVertexShaderID:st,customFragmentShaderID:at,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:m,batching:Mt,batchingColor:Mt&&S._colorsTexture!==null,instancing:nt,instancingColor:nt&&S.instanceColor!==null,instancingMorph:nt&&S.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:pt===null?s.outputColorSpace:pt.isXRRenderTarget===!0?pt.texture.colorSpace:hs,alphaToCoverage:!!x.alphaToCoverage,map:yt,matcap:Dt,envMap:X,envMapMode:X&&k.mapping,envMapCubeUVHeight:B,aoMap:ce,lightMap:Bt,bumpMap:Yt,normalMap:Ct,displacementMap:d&&qt,emissiveMap:It,normalMapObjectSpace:Ct&&x.normalMapType===Zp,normalMapTangentSpace:Ct&&x.normalMapType===sf,metalnessMap:O,roughnessMap:C,anisotropy:q,anisotropyMap:St,clearcoat:J,clearcoatMap:jt,clearcoatNormalMap:_t,clearcoatRoughnessMap:et,dispersion:ut,iridescence:rt,iridescenceMap:lt,iridescenceThicknessMap:vt,sheen:Ut,sheenColorMap:mt,sheenRoughnessMap:Nt,specularMap:Et,specularColorMap:$t,specularIntensityMap:Z,transmission:xt,transmissionMap:At,thicknessMap:ot,gradientMap:ht,opaque:x.transparent===!1&&x.blending===mo&&x.alphaToCoverage===!1,alphaMap:Tt,alphaTest:bt,alphaHash:re,combine:x.combine,mapUv:yt&&p(x.map.channel),aoMapUv:ce&&p(x.aoMap.channel),lightMapUv:Bt&&p(x.lightMap.channel),bumpMapUv:Yt&&p(x.bumpMap.channel),normalMapUv:Ct&&p(x.normalMap.channel),displacementMapUv:qt&&p(x.displacementMap.channel),emissiveMapUv:It&&p(x.emissiveMap.channel),metalnessMapUv:O&&p(x.metalnessMap.channel),roughnessMapUv:C&&p(x.roughnessMap.channel),anisotropyMapUv:St&&p(x.anisotropyMap.channel),clearcoatMapUv:jt&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:_t&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:lt&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:vt&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:mt&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&p(x.sheenRoughnessMap.channel),specularMapUv:Et&&p(x.specularMap.channel),specularColorMapUv:$t&&p(x.specularColorMap.channel),specularIntensityMapUv:Z&&p(x.specularIntensityMap.channel),transmissionMapUv:At&&p(x.transmissionMap.channel),thicknessMapUv:ot&&p(x.thicknessMap.channel),alphaMapUv:Tt&&p(x.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(Ct||q),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:S.isPoints===!0&&!!L.attributes.uv&&(yt||Tt),fog:!!R,useFog:x.fog===!0,fogExp2:!!R&&R.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:f,skinning:S.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:V,morphTextureStride:$,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ze,decodeVideoTexture:yt&&x.map.isVideoTexture===!0&&xe.getTransfer(x.map.colorSpace)===Ie,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Wn,flipSided:x.side===fn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Fe&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Fe&&x.extensions.multiDraw===!0||Mt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return le.vertexUv1s=l.has(1),le.vertexUv2s=l.has(2),le.vertexUv3s=l.has(3),l.clear(),le}function M(x){const v=[];if(x.shaderID?v.push(x.shaderID):(v.push(x.customVertexShaderID),v.push(x.customFragmentShaderID)),x.defines!==void 0)for(const P in x.defines)v.push(P),v.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(E(v,x),T(v,x),v.push(s.outputColorSpace)),v.push(x.customProgramCacheKey),v.join()}function E(x,v){x.push(v.precision),x.push(v.outputColorSpace),x.push(v.envMapMode),x.push(v.envMapCubeUVHeight),x.push(v.mapUv),x.push(v.alphaMapUv),x.push(v.lightMapUv),x.push(v.aoMapUv),x.push(v.bumpMapUv),x.push(v.normalMapUv),x.push(v.displacementMapUv),x.push(v.emissiveMapUv),x.push(v.metalnessMapUv),x.push(v.roughnessMapUv),x.push(v.anisotropyMapUv),x.push(v.clearcoatMapUv),x.push(v.clearcoatNormalMapUv),x.push(v.clearcoatRoughnessMapUv),x.push(v.iridescenceMapUv),x.push(v.iridescenceThicknessMapUv),x.push(v.sheenColorMapUv),x.push(v.sheenRoughnessMapUv),x.push(v.specularMapUv),x.push(v.specularColorMapUv),x.push(v.specularIntensityMapUv),x.push(v.transmissionMapUv),x.push(v.thicknessMapUv),x.push(v.combine),x.push(v.fogExp2),x.push(v.sizeAttenuation),x.push(v.morphTargetsCount),x.push(v.morphAttributeCount),x.push(v.numDirLights),x.push(v.numPointLights),x.push(v.numSpotLights),x.push(v.numSpotLightMaps),x.push(v.numHemiLights),x.push(v.numRectAreaLights),x.push(v.numDirLightShadows),x.push(v.numPointLightShadows),x.push(v.numSpotLightShadows),x.push(v.numSpotLightShadowsWithMaps),x.push(v.numLightProbes),x.push(v.shadowMapType),x.push(v.toneMapping),x.push(v.numClippingPlanes),x.push(v.numClipIntersection),x.push(v.depthPacking)}function T(x,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),x.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.alphaToCoverage&&a.enable(20),x.push(a.mask)}function U(x){const v=_[x.type];let P;if(v){const b=pi[v];P=Am.clone(b.uniforms)}else P=x.uniforms;return P}function D(x,v){let P;for(let b=0,S=h.length;b<S;b++){const R=h[b];if(R.cacheKey===v){P=R,++P.usedTimes;break}}return P===void 0&&(P=new Bx(s,v,x,o),h.push(P)),P}function w(x){if(--x.usedTimes===0){const v=h.indexOf(x);h[v]=h[h.length-1],h.pop(),x.destroy()}}function I(x){c.remove(x)}function A(){c.dispose()}return{getParameters:g,getProgramCacheKey:M,getUniforms:U,acquireProgram:D,releaseProgram:w,releaseShaderCache:I,programs:h,dispose:A}}function Xx(){let s=new WeakMap;function t(r){return s.has(r)}function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function n(r){s.delete(r)}function i(r,a,c){s.get(r)[a]=c}function o(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:o}}function qx(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Eh(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function bh(){const s=[];let t=0;const e=[],n=[],i=[];function o(){t=0,e.length=0,n.length=0,i.length=0}function r(u,f,d,m,_,p){let g=s[t];return g===void 0?(g={id:u.id,object:u,geometry:f,material:d,groupOrder:m,renderOrder:u.renderOrder,z:_,group:p},s[t]=g):(g.id=u.id,g.object=u,g.geometry=f,g.material=d,g.groupOrder=m,g.renderOrder=u.renderOrder,g.z=_,g.group=p),t++,g}function a(u,f,d,m,_,p){const g=r(u,f,d,m,_,p);d.transmission>0?n.push(g):d.transparent===!0?i.push(g):e.push(g)}function c(u,f,d,m,_,p){const g=r(u,f,d,m,_,p);d.transmission>0?n.unshift(g):d.transparent===!0?i.unshift(g):e.unshift(g)}function l(u,f){e.length>1&&e.sort(u||qx),n.length>1&&n.sort(f||Eh),i.length>1&&i.sort(f||Eh)}function h(){for(let u=t,f=s.length;u<f;u++){const d=s[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:o,push:a,unshift:c,finish:h,sort:l}}function Yx(){let s=new WeakMap;function t(n,i){const o=s.get(n);let r;return o===void 0?(r=new bh,s.set(n,[r])):i>=o.length?(r=new bh,o.push(r)):r=o[i],r}function e(){s=new WeakMap}return{get:t,dispose:e}}function Kx(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new K,color:new he};break;case"SpotLight":e={position:new K,direction:new K,color:new he,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new K,color:new he,distance:0,decay:0};break;case"HemisphereLight":e={direction:new K,skyColor:new he,groundColor:new he};break;case"RectAreaLight":e={color:new he,position:new K,halfWidth:new K,halfHeight:new K};break}return s[t.id]=e,e}}}function jx(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Zx=0;function $x(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Jx(s){const t=new Kx,e=jx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new K);const i=new K,o=new ze,r=new ze;function a(l){let h=0,u=0,f=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let d=0,m=0,_=0,p=0,g=0,M=0,E=0,T=0,U=0,D=0,w=0;l.sort($x);for(let A=0,x=l.length;A<x;A++){const v=l[A],P=v.color,b=v.intensity,S=v.distance,R=v.shadow&&v.shadow.map?v.shadow.map.texture:null;if(v.isAmbientLight)h+=P.r*b,u+=P.g*b,f+=P.b*b;else if(v.isLightProbe){for(let L=0;L<9;L++)n.probe[L].addScaledVector(v.sh.coefficients[L],b);w++}else if(v.isDirectionalLight){const L=t.get(v);if(L.color.copy(v.color).multiplyScalar(v.intensity),v.castShadow){const G=v.shadow,k=e.get(v);k.shadowIntensity=G.intensity,k.shadowBias=G.bias,k.shadowNormalBias=G.normalBias,k.shadowRadius=G.radius,k.shadowMapSize=G.mapSize,n.directionalShadow[d]=k,n.directionalShadowMap[d]=R,n.directionalShadowMatrix[d]=v.shadow.matrix,M++}n.directional[d]=L,d++}else if(v.isSpotLight){const L=t.get(v);L.position.setFromMatrixPosition(v.matrixWorld),L.color.copy(P).multiplyScalar(b),L.distance=S,L.coneCos=Math.cos(v.angle),L.penumbraCos=Math.cos(v.angle*(1-v.penumbra)),L.decay=v.decay,n.spot[_]=L;const G=v.shadow;if(v.map&&(n.spotLightMap[U]=v.map,U++,G.updateMatrices(v),v.castShadow&&D++),n.spotLightMatrix[_]=G.matrix,v.castShadow){const k=e.get(v);k.shadowIntensity=G.intensity,k.shadowBias=G.bias,k.shadowNormalBias=G.normalBias,k.shadowRadius=G.radius,k.shadowMapSize=G.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=R,T++}_++}else if(v.isRectAreaLight){const L=t.get(v);L.color.copy(P).multiplyScalar(b),L.halfWidth.set(v.width*.5,0,0),L.halfHeight.set(0,v.height*.5,0),n.rectArea[p]=L,p++}else if(v.isPointLight){const L=t.get(v);if(L.color.copy(v.color).multiplyScalar(v.intensity),L.distance=v.distance,L.decay=v.decay,v.castShadow){const G=v.shadow,k=e.get(v);k.shadowIntensity=G.intensity,k.shadowBias=G.bias,k.shadowNormalBias=G.normalBias,k.shadowRadius=G.radius,k.shadowMapSize=G.mapSize,k.shadowCameraNear=G.camera.near,k.shadowCameraFar=G.camera.far,n.pointShadow[m]=k,n.pointShadowMap[m]=R,n.pointShadowMatrix[m]=v.shadow.matrix,E++}n.point[m]=L,m++}else if(v.isHemisphereLight){const L=t.get(v);L.skyColor.copy(v.color).multiplyScalar(b),L.groundColor.copy(v.groundColor).multiplyScalar(b),n.hemi[g]=L,g++}}p>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Rt.LTC_FLOAT_1,n.rectAreaLTC2=Rt.LTC_FLOAT_2):(n.rectAreaLTC1=Rt.LTC_HALF_1,n.rectAreaLTC2=Rt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const I=n.hash;(I.directionalLength!==d||I.pointLength!==m||I.spotLength!==_||I.rectAreaLength!==p||I.hemiLength!==g||I.numDirectionalShadows!==M||I.numPointShadows!==E||I.numSpotShadows!==T||I.numSpotMaps!==U||I.numLightProbes!==w)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=p,n.point.length=m,n.hemi.length=g,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=T,n.spotShadowMap.length=T,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=T+U-D,n.spotLightMap.length=U,n.numSpotLightShadowsWithMaps=D,n.numLightProbes=w,I.directionalLength=d,I.pointLength=m,I.spotLength=_,I.rectAreaLength=p,I.hemiLength=g,I.numDirectionalShadows=M,I.numPointShadows=E,I.numSpotShadows=T,I.numSpotMaps=U,I.numLightProbes=w,n.version=Zx++)}function c(l,h){let u=0,f=0,d=0,m=0,_=0;const p=h.matrixWorldInverse;for(let g=0,M=l.length;g<M;g++){const E=l[g];if(E.isDirectionalLight){const T=n.directional[u];T.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),T.direction.sub(i),T.direction.transformDirection(p),u++}else if(E.isSpotLight){const T=n.spot[d];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(p),T.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),T.direction.sub(i),T.direction.transformDirection(p),d++}else if(E.isRectAreaLight){const T=n.rectArea[m];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(p),r.identity(),o.copy(E.matrixWorld),o.premultiply(p),r.extractRotation(o),T.halfWidth.set(E.width*.5,0,0),T.halfHeight.set(0,E.height*.5,0),T.halfWidth.applyMatrix4(r),T.halfHeight.applyMatrix4(r),m++}else if(E.isPointLight){const T=n.point[f];T.position.setFromMatrixPosition(E.matrixWorld),T.position.applyMatrix4(p),f++}else if(E.isHemisphereLight){const T=n.hemi[_];T.direction.setFromMatrixPosition(E.matrixWorld),T.direction.transformDirection(p),_++}}}return{setup:a,setupView:c,state:n}}function Th(s){const t=new Jx(s),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function o(h){e.push(h)}function r(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:o,pushShadow:r}}function Qx(s){let t=new WeakMap;function e(i,o=0){const r=t.get(i);let a;return r===void 0?(a=new Th(s),t.set(i,[a])):o>=r.length?(a=new Th(s),r.push(a)):a=r[o],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class t_ extends vr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Kp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class e_ extends vr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const n_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,i_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function s_(s,t,e){let n=new au;const i=new Ft,o=new Ft,r=new Me,a=new t_({depthPacking:jp}),c=new e_,l={},h=e.maxTextureSize,u={[as]:fn,[fn]:as,[Wn]:Wn},f=new cs({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ft},radius:{value:4}},vertexShader:n_,fragmentShader:i_}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const m=new Nn;m.setAttribute("position",new gi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Pt(m,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gd;let g=this.type;this.render=function(D,w,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||D.length===0)return;const A=s.getRenderTarget(),x=s.getActiveCubeFace(),v=s.getActiveMipmapLevel(),P=s.state;P.setBlending(ss),P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const b=g!==Ni&&this.type===Ni,S=g===Ni&&this.type!==Ni;for(let R=0,L=D.length;R<L;R++){const G=D[R],k=G.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const B=k.getFrameExtents();if(i.multiply(B),o.copy(k.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(o.x=Math.floor(h/B.x),i.x=o.x*B.x,k.mapSize.x=o.x),i.y>h&&(o.y=Math.floor(h/B.y),i.y=o.y*B.y,k.mapSize.y=o.y)),k.map===null||b===!0||S===!0){const H=this.type!==Ni?{minFilter:qn,magFilter:qn}:{};k.map!==null&&k.map.dispose(),k.map=new Us(i.x,i.y,H),k.map.texture.name=G.name+".shadowMap",k.camera.updateProjectionMatrix()}s.setRenderTarget(k.map),s.clear();const F=k.getViewportCount();for(let H=0;H<F;H++){const V=k.getViewport(H);r.set(o.x*V.x,o.y*V.y,o.x*V.z,o.y*V.w),P.viewport(r),k.updateMatrices(G,H),n=k.getFrustum(),T(w,I,k.camera,G,this.type)}k.isPointLightShadow!==!0&&this.type===Ni&&M(k,I),k.needsUpdate=!1}g=this.type,p.needsUpdate=!1,s.setRenderTarget(A,x,v)};function M(D,w){const I=t.update(_);f.defines.VSM_SAMPLES!==D.blurSamples&&(f.defines.VSM_SAMPLES=D.blurSamples,d.defines.VSM_SAMPLES=D.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new Us(i.x,i.y)),f.uniforms.shadow_pass.value=D.map.texture,f.uniforms.resolution.value=D.mapSize,f.uniforms.radius.value=D.radius,s.setRenderTarget(D.mapPass),s.clear(),s.renderBufferDirect(w,null,I,f,_,null),d.uniforms.shadow_pass.value=D.mapPass.texture,d.uniforms.resolution.value=D.mapSize,d.uniforms.radius.value=D.radius,s.setRenderTarget(D.map),s.clear(),s.renderBufferDirect(w,null,I,d,_,null)}function E(D,w,I,A){let x=null;const v=I.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(v!==void 0)x=v;else if(x=I.isPointLight===!0?c:a,s.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const P=x.uuid,b=w.uuid;let S=l[P];S===void 0&&(S={},l[P]=S);let R=S[b];R===void 0&&(R=x.clone(),S[b]=R,w.addEventListener("dispose",U)),x=R}if(x.visible=w.visible,x.wireframe=w.wireframe,A===Ni?x.side=w.shadowSide!==null?w.shadowSide:w.side:x.side=w.shadowSide!==null?w.shadowSide:u[w.side],x.alphaMap=w.alphaMap,x.alphaTest=w.alphaTest,x.map=w.map,x.clipShadows=w.clipShadows,x.clippingPlanes=w.clippingPlanes,x.clipIntersection=w.clipIntersection,x.displacementMap=w.displacementMap,x.displacementScale=w.displacementScale,x.displacementBias=w.displacementBias,x.wireframeLinewidth=w.wireframeLinewidth,x.linewidth=w.linewidth,I.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const P=s.properties.get(x);P.light=I}return x}function T(D,w,I,A,x){if(D.visible===!1)return;if(D.layers.test(w.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&x===Ni)&&(!D.frustumCulled||n.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,D.matrixWorld);const b=t.update(D),S=D.material;if(Array.isArray(S)){const R=b.groups;for(let L=0,G=R.length;L<G;L++){const k=R[L],B=S[k.materialIndex];if(B&&B.visible){const F=E(D,B,A,x);D.onBeforeShadow(s,D,w,I,b,F,k),s.renderBufferDirect(I,null,b,F,D,k),D.onAfterShadow(s,D,w,I,b,F,k)}}}else if(S.visible){const R=E(D,S,A,x);D.onBeforeShadow(s,D,w,I,b,R,null),s.renderBufferDirect(I,null,b,R,D,null),D.onAfterShadow(s,D,w,I,b,R,null)}}const P=D.children;for(let b=0,S=P.length;b<S;b++)T(P[b],w,I,A,x)}function U(D){D.target.removeEventListener("dispose",U);for(const I in l){const A=l[I],x=D.target.uuid;x in A&&(A[x].dispose(),delete A[x])}}}const o_={[tl]:el,[nl]:ol,[il]:rl,[Mo]:sl,[el]:tl,[ol]:nl,[rl]:il,[sl]:Mo};function r_(s){function t(){let Z=!1;const At=new Me;let ot=null;const ht=new Me(0,0,0,0);return{setMask:function(Tt){ot!==Tt&&!Z&&(s.colorMask(Tt,Tt,Tt,Tt),ot=Tt)},setLocked:function(Tt){Z=Tt},setClear:function(Tt,bt,re,Fe,Ze){Ze===!0&&(Tt*=Fe,bt*=Fe,re*=Fe),At.set(Tt,bt,re,Fe),ht.equals(At)===!1&&(s.clearColor(Tt,bt,re,Fe),ht.copy(At))},reset:function(){Z=!1,ot=null,ht.set(-1,0,0,0)}}}function e(){let Z=!1,At=!1,ot=null,ht=null,Tt=null;return{setReversed:function(bt){At=bt},setTest:function(bt){bt?st(s.DEPTH_TEST):at(s.DEPTH_TEST)},setMask:function(bt){ot!==bt&&!Z&&(s.depthMask(bt),ot=bt)},setFunc:function(bt){if(At&&(bt=o_[bt]),ht!==bt){switch(bt){case tl:s.depthFunc(s.NEVER);break;case el:s.depthFunc(s.ALWAYS);break;case nl:s.depthFunc(s.LESS);break;case Mo:s.depthFunc(s.LEQUAL);break;case il:s.depthFunc(s.EQUAL);break;case sl:s.depthFunc(s.GEQUAL);break;case ol:s.depthFunc(s.GREATER);break;case rl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ht=bt}},setLocked:function(bt){Z=bt},setClear:function(bt){Tt!==bt&&(s.clearDepth(bt),Tt=bt)},reset:function(){Z=!1,ot=null,ht=null,Tt=null}}}function n(){let Z=!1,At=null,ot=null,ht=null,Tt=null,bt=null,re=null,Fe=null,Ze=null;return{setTest:function(le){Z||(le?st(s.STENCIL_TEST):at(s.STENCIL_TEST))},setMask:function(le){At!==le&&!Z&&(s.stencilMask(le),At=le)},setFunc:function(le,sn,gn){(ot!==le||ht!==sn||Tt!==gn)&&(s.stencilFunc(le,sn,gn),ot=le,ht=sn,Tt=gn)},setOp:function(le,sn,gn){(bt!==le||re!==sn||Fe!==gn)&&(s.stencilOp(le,sn,gn),bt=le,re=sn,Fe=gn)},setLocked:function(le){Z=le},setClear:function(le){Ze!==le&&(s.clearStencil(le),Ze=le)},reset:function(){Z=!1,At=null,ot=null,ht=null,Tt=null,bt=null,re=null,Fe=null,Ze=null}}}const i=new t,o=new e,r=new n,a=new WeakMap,c=new WeakMap;let l={},h={},u=new WeakMap,f=[],d=null,m=!1,_=null,p=null,g=null,M=null,E=null,T=null,U=null,D=new he(0,0,0),w=0,I=!1,A=null,x=null,v=null,P=null,b=null;const S=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let R=!1,L=0;const G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(L=parseFloat(/^WebGL (\d)/.exec(G)[1]),R=L>=1):G.indexOf("OpenGL ES")!==-1&&(L=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),R=L>=2);let k=null,B={};const F=s.getParameter(s.SCISSOR_BOX),H=s.getParameter(s.VIEWPORT),V=new Me().fromArray(F),$=new Me().fromArray(H);function N(Z,At,ot,ht){const Tt=new Uint8Array(4),bt=s.createTexture();s.bindTexture(Z,bt),s.texParameteri(Z,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(Z,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let re=0;re<ot;re++)Z===s.TEXTURE_3D||Z===s.TEXTURE_2D_ARRAY?s.texImage3D(At,0,s.RGBA,1,1,ht,0,s.RGBA,s.UNSIGNED_BYTE,Tt):s.texImage2D(At+re,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Tt);return bt}const Y={};Y[s.TEXTURE_2D]=N(s.TEXTURE_2D,s.TEXTURE_2D,1),Y[s.TEXTURE_CUBE_MAP]=N(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[s.TEXTURE_2D_ARRAY]=N(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Y[s.TEXTURE_3D]=N(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),o.setClear(1),r.setClear(0),st(s.DEPTH_TEST),o.setFunc(Mo),Bt(!1),Yt(Uu),st(s.CULL_FACE),X(ss);function st(Z){l[Z]!==!0&&(s.enable(Z),l[Z]=!0)}function at(Z){l[Z]!==!1&&(s.disable(Z),l[Z]=!1)}function pt(Z,At){return h[Z]!==At?(s.bindFramebuffer(Z,At),h[Z]=At,Z===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=At),Z===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=At),!0):!1}function nt(Z,At){let ot=f,ht=!1;if(Z){ot=u.get(At),ot===void 0&&(ot=[],u.set(At,ot));const Tt=Z.textures;if(ot.length!==Tt.length||ot[0]!==s.COLOR_ATTACHMENT0){for(let bt=0,re=Tt.length;bt<re;bt++)ot[bt]=s.COLOR_ATTACHMENT0+bt;ot.length=Tt.length,ht=!0}}else ot[0]!==s.BACK&&(ot[0]=s.BACK,ht=!0);ht&&s.drawBuffers(ot)}function Mt(Z){return d!==Z?(s.useProgram(Z),d=Z,!0):!1}const yt={[Es]:s.FUNC_ADD,[wp]:s.FUNC_SUBTRACT,[Sp]:s.FUNC_REVERSE_SUBTRACT};yt[Ep]=s.MIN,yt[bp]=s.MAX;const Dt={[Tp]:s.ZERO,[Ap]:s.ONE,[Cp]:s.SRC_COLOR,[Jc]:s.SRC_ALPHA,[Np]:s.SRC_ALPHA_SATURATE,[Lp]:s.DST_COLOR,[Pp]:s.DST_ALPHA,[Rp]:s.ONE_MINUS_SRC_COLOR,[Qc]:s.ONE_MINUS_SRC_ALPHA,[Dp]:s.ONE_MINUS_DST_COLOR,[Ip]:s.ONE_MINUS_DST_ALPHA,[Up]:s.CONSTANT_COLOR,[zp]:s.ONE_MINUS_CONSTANT_COLOR,[Fp]:s.CONSTANT_ALPHA,[kp]:s.ONE_MINUS_CONSTANT_ALPHA};function X(Z,At,ot,ht,Tt,bt,re,Fe,Ze,le){if(Z===ss){m===!0&&(at(s.BLEND),m=!1);return}if(m===!1&&(st(s.BLEND),m=!0),Z!==Mp){if(Z!==_||le!==I){if((p!==Es||E!==Es)&&(s.blendEquation(s.FUNC_ADD),p=Es,E=Es),le)switch(Z){case mo:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case zu:s.blendFunc(s.ONE,s.ONE);break;case Fu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ku:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",Z);break}else switch(Z){case mo:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case zu:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Fu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ku:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",Z);break}g=null,M=null,T=null,U=null,D.set(0,0,0),w=0,_=Z,I=le}return}Tt=Tt||At,bt=bt||ot,re=re||ht,(At!==p||Tt!==E)&&(s.blendEquationSeparate(yt[At],yt[Tt]),p=At,E=Tt),(ot!==g||ht!==M||bt!==T||re!==U)&&(s.blendFuncSeparate(Dt[ot],Dt[ht],Dt[bt],Dt[re]),g=ot,M=ht,T=bt,U=re),(Fe.equals(D)===!1||Ze!==w)&&(s.blendColor(Fe.r,Fe.g,Fe.b,Ze),D.copy(Fe),w=Ze),_=Z,I=!1}function ce(Z,At){Z.side===Wn?at(s.CULL_FACE):st(s.CULL_FACE);let ot=Z.side===fn;At&&(ot=!ot),Bt(ot),Z.blending===mo&&Z.transparent===!1?X(ss):X(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.blendColor,Z.blendAlpha,Z.premultipliedAlpha),o.setFunc(Z.depthFunc),o.setTest(Z.depthTest),o.setMask(Z.depthWrite),i.setMask(Z.colorWrite);const ht=Z.stencilWrite;r.setTest(ht),ht&&(r.setMask(Z.stencilWriteMask),r.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),r.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),qt(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?st(s.SAMPLE_ALPHA_TO_COVERAGE):at(s.SAMPLE_ALPHA_TO_COVERAGE)}function Bt(Z){A!==Z&&(Z?s.frontFace(s.CW):s.frontFace(s.CCW),A=Z)}function Yt(Z){Z!==_p?(st(s.CULL_FACE),Z!==x&&(Z===Uu?s.cullFace(s.BACK):Z===yp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):at(s.CULL_FACE),x=Z}function Ct(Z){Z!==v&&(R&&s.lineWidth(Z),v=Z)}function qt(Z,At,ot){Z?(st(s.POLYGON_OFFSET_FILL),(P!==At||b!==ot)&&(s.polygonOffset(At,ot),P=At,b=ot)):at(s.POLYGON_OFFSET_FILL)}function It(Z){Z?st(s.SCISSOR_TEST):at(s.SCISSOR_TEST)}function O(Z){Z===void 0&&(Z=s.TEXTURE0+S-1),k!==Z&&(s.activeTexture(Z),k=Z)}function C(Z,At,ot){ot===void 0&&(k===null?ot=s.TEXTURE0+S-1:ot=k);let ht=B[ot];ht===void 0&&(ht={type:void 0,texture:void 0},B[ot]=ht),(ht.type!==Z||ht.texture!==At)&&(k!==ot&&(s.activeTexture(ot),k=ot),s.bindTexture(Z,At||Y[Z]),ht.type=Z,ht.texture=At)}function q(){const Z=B[k];Z!==void 0&&Z.type!==void 0&&(s.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function J(){try{s.compressedTexImage2D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function ut(){try{s.compressedTexImage3D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function rt(){try{s.texSubImage2D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Ut(){try{s.texSubImage3D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function xt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function St(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function jt(){try{s.texStorage2D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function _t(){try{s.texStorage3D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function et(){try{s.texImage2D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function lt(){try{s.texImage3D.apply(s,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function vt(Z){V.equals(Z)===!1&&(s.scissor(Z.x,Z.y,Z.z,Z.w),V.copy(Z))}function mt(Z){$.equals(Z)===!1&&(s.viewport(Z.x,Z.y,Z.z,Z.w),$.copy(Z))}function Nt(Z,At){let ot=c.get(At);ot===void 0&&(ot=new WeakMap,c.set(At,ot));let ht=ot.get(Z);ht===void 0&&(ht=s.getUniformBlockIndex(At,Z.name),ot.set(Z,ht))}function Et(Z,At){const ht=c.get(At).get(Z);a.get(At)!==ht&&(s.uniformBlockBinding(At,ht,Z.__bindingPointIndex),a.set(At,ht))}function $t(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),l={},k=null,B={},h={},u=new WeakMap,f=[],d=null,m=!1,_=null,p=null,g=null,M=null,E=null,T=null,U=null,D=new he(0,0,0),w=0,I=!1,A=null,x=null,v=null,P=null,b=null,V.set(0,0,s.canvas.width,s.canvas.height),$.set(0,0,s.canvas.width,s.canvas.height),i.reset(),o.reset(),r.reset()}return{buffers:{color:i,depth:o,stencil:r},enable:st,disable:at,bindFramebuffer:pt,drawBuffers:nt,useProgram:Mt,setBlending:X,setMaterial:ce,setFlipSided:Bt,setCullFace:Yt,setLineWidth:Ct,setPolygonOffset:qt,setScissorTest:It,activeTexture:O,bindTexture:C,unbindTexture:q,compressedTexImage2D:J,compressedTexImage3D:ut,texImage2D:et,texImage3D:lt,updateUBOMapping:Nt,uniformBlockBinding:Et,texStorage2D:jt,texStorage3D:_t,texSubImage2D:rt,texSubImage3D:Ut,compressedTexSubImage2D:xt,compressedTexSubImage3D:St,scissor:vt,viewport:mt,reset:$t}}function Ah(s,t,e,n){const i=a_(n);switch(e){case Zd:return s*t;case Jd:return s*t;case Qd:return s*t*2;case tf:return s*t/i.components*i.byteLength;case nu:return s*t/i.components*i.byteLength;case ef:return s*t*2/i.components*i.byteLength;case iu:return s*t*2/i.components*i.byteLength;case $d:return s*t*3/i.components*i.byteLength;case si:return s*t*4/i.components*i.byteLength;case su:return s*t*4/i.components*i.byteLength;case oa:case ra:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case aa:case ca:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case hl:case fl:return Math.max(s,16)*Math.max(t,8)/4;case ul:case dl:return Math.max(s,8)*Math.max(t,8)/2;case pl:case ml:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case gl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case vl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case xl:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case _l:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case yl:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Ml:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case wl:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Sl:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case El:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case bl:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Tl:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Al:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Cl:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Rl:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Pl:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case la:case Il:case Ll:return Math.ceil(s/4)*Math.ceil(t/4)*16;case nf:case Dl:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Nl:case Ul:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function a_(s){switch(s){case Hi:case Yd:return{byteLength:1,components:1};case ur:case Kd:case pr:return{byteLength:2,components:1};case tu:case eu:return{byteLength:2,components:4};case Ns:case Ql:case Fi:return{byteLength:4,components:1};case jd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function c_(s,t,e,n,i,o,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ft,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(O,C){return d?new OffscreenCanvas(O,C):wa("canvas")}function _(O,C,q){let J=1;const ut=It(O);if((ut.width>q||ut.height>q)&&(J=q/Math.max(ut.width,ut.height)),J<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const rt=Math.floor(J*ut.width),Ut=Math.floor(J*ut.height);u===void 0&&(u=m(rt,Ut));const xt=C?m(rt,Ut):u;return xt.width=rt,xt.height=Ut,xt.getContext("2d").drawImage(O,0,0,rt,Ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ut.width+"x"+ut.height+") to ("+rt+"x"+Ut+")."),xt}else return"data"in O&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ut.width+"x"+ut.height+")."),O;return O}function p(O){return O.generateMipmaps&&O.minFilter!==qn&&O.minFilter!==ei}function g(O){s.generateMipmap(O)}function M(O,C,q,J,ut=!1){if(O!==null){if(s[O]!==void 0)return s[O];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let rt=C;if(C===s.RED&&(q===s.FLOAT&&(rt=s.R32F),q===s.HALF_FLOAT&&(rt=s.R16F),q===s.UNSIGNED_BYTE&&(rt=s.R8)),C===s.RED_INTEGER&&(q===s.UNSIGNED_BYTE&&(rt=s.R8UI),q===s.UNSIGNED_SHORT&&(rt=s.R16UI),q===s.UNSIGNED_INT&&(rt=s.R32UI),q===s.BYTE&&(rt=s.R8I),q===s.SHORT&&(rt=s.R16I),q===s.INT&&(rt=s.R32I)),C===s.RG&&(q===s.FLOAT&&(rt=s.RG32F),q===s.HALF_FLOAT&&(rt=s.RG16F),q===s.UNSIGNED_BYTE&&(rt=s.RG8)),C===s.RG_INTEGER&&(q===s.UNSIGNED_BYTE&&(rt=s.RG8UI),q===s.UNSIGNED_SHORT&&(rt=s.RG16UI),q===s.UNSIGNED_INT&&(rt=s.RG32UI),q===s.BYTE&&(rt=s.RG8I),q===s.SHORT&&(rt=s.RG16I),q===s.INT&&(rt=s.RG32I)),C===s.RGB_INTEGER&&(q===s.UNSIGNED_BYTE&&(rt=s.RGB8UI),q===s.UNSIGNED_SHORT&&(rt=s.RGB16UI),q===s.UNSIGNED_INT&&(rt=s.RGB32UI),q===s.BYTE&&(rt=s.RGB8I),q===s.SHORT&&(rt=s.RGB16I),q===s.INT&&(rt=s.RGB32I)),C===s.RGBA_INTEGER&&(q===s.UNSIGNED_BYTE&&(rt=s.RGBA8UI),q===s.UNSIGNED_SHORT&&(rt=s.RGBA16UI),q===s.UNSIGNED_INT&&(rt=s.RGBA32UI),q===s.BYTE&&(rt=s.RGBA8I),q===s.SHORT&&(rt=s.RGBA16I),q===s.INT&&(rt=s.RGBA32I)),C===s.RGB&&q===s.UNSIGNED_INT_5_9_9_9_REV&&(rt=s.RGB9_E5),C===s.RGBA){const Ut=ut?xa:xe.getTransfer(J);q===s.FLOAT&&(rt=s.RGBA32F),q===s.HALF_FLOAT&&(rt=s.RGBA16F),q===s.UNSIGNED_BYTE&&(rt=Ut===Ie?s.SRGB8_ALPHA8:s.RGBA8),q===s.UNSIGNED_SHORT_4_4_4_4&&(rt=s.RGBA4),q===s.UNSIGNED_SHORT_5_5_5_1&&(rt=s.RGB5_A1)}return(rt===s.R16F||rt===s.R32F||rt===s.RG16F||rt===s.RG32F||rt===s.RGBA16F||rt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function E(O,C){let q;return O?C===null||C===Ns||C===Eo?q=s.DEPTH24_STENCIL8:C===Fi?q=s.DEPTH32F_STENCIL8:C===ur&&(q=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===Ns||C===Eo?q=s.DEPTH_COMPONENT24:C===Fi?q=s.DEPTH_COMPONENT32F:C===ur&&(q=s.DEPTH_COMPONENT16),q}function T(O,C){return p(O)===!0||O.isFramebufferTexture&&O.minFilter!==qn&&O.minFilter!==ei?Math.log2(Math.max(C.width,C.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?C.mipmaps.length:1}function U(O){const C=O.target;C.removeEventListener("dispose",U),w(C),C.isVideoTexture&&h.delete(C)}function D(O){const C=O.target;C.removeEventListener("dispose",D),A(C)}function w(O){const C=n.get(O);if(C.__webglInit===void 0)return;const q=O.source,J=f.get(q);if(J){const ut=J[C.__cacheKey];ut.usedTimes--,ut.usedTimes===0&&I(O),Object.keys(J).length===0&&f.delete(q)}n.remove(O)}function I(O){const C=n.get(O);s.deleteTexture(C.__webglTexture);const q=O.source,J=f.get(q);delete J[C.__cacheKey],r.memory.textures--}function A(O){const C=n.get(O);if(O.depthTexture&&O.depthTexture.dispose(),O.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(C.__webglFramebuffer[J]))for(let ut=0;ut<C.__webglFramebuffer[J].length;ut++)s.deleteFramebuffer(C.__webglFramebuffer[J][ut]);else s.deleteFramebuffer(C.__webglFramebuffer[J]);C.__webglDepthbuffer&&s.deleteRenderbuffer(C.__webglDepthbuffer[J])}else{if(Array.isArray(C.__webglFramebuffer))for(let J=0;J<C.__webglFramebuffer.length;J++)s.deleteFramebuffer(C.__webglFramebuffer[J]);else s.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&s.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&s.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let J=0;J<C.__webglColorRenderbuffer.length;J++)C.__webglColorRenderbuffer[J]&&s.deleteRenderbuffer(C.__webglColorRenderbuffer[J]);C.__webglDepthRenderbuffer&&s.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const q=O.textures;for(let J=0,ut=q.length;J<ut;J++){const rt=n.get(q[J]);rt.__webglTexture&&(s.deleteTexture(rt.__webglTexture),r.memory.textures--),n.remove(q[J])}n.remove(O)}let x=0;function v(){x=0}function P(){const O=x;return O>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+i.maxTextures),x+=1,O}function b(O){const C=[];return C.push(O.wrapS),C.push(O.wrapT),C.push(O.wrapR||0),C.push(O.magFilter),C.push(O.minFilter),C.push(O.anisotropy),C.push(O.internalFormat),C.push(O.format),C.push(O.type),C.push(O.generateMipmaps),C.push(O.premultiplyAlpha),C.push(O.flipY),C.push(O.unpackAlignment),C.push(O.colorSpace),C.join()}function S(O,C){const q=n.get(O);if(O.isVideoTexture&&Ct(O),O.isRenderTargetTexture===!1&&O.version>0&&q.__version!==O.version){const J=O.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(q,O,C);return}}e.bindTexture(s.TEXTURE_2D,q.__webglTexture,s.TEXTURE0+C)}function R(O,C){const q=n.get(O);if(O.version>0&&q.__version!==O.version){$(q,O,C);return}e.bindTexture(s.TEXTURE_2D_ARRAY,q.__webglTexture,s.TEXTURE0+C)}function L(O,C){const q=n.get(O);if(O.version>0&&q.__version!==O.version){$(q,O,C);return}e.bindTexture(s.TEXTURE_3D,q.__webglTexture,s.TEXTURE0+C)}function G(O,C){const q=n.get(O);if(O.version>0&&q.__version!==O.version){N(q,O,C);return}e.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture,s.TEXTURE0+C)}const k={[va]:s.REPEAT,[Is]:s.CLAMP_TO_EDGE,[ll]:s.MIRRORED_REPEAT},B={[qn]:s.NEAREST,[Yp]:s.NEAREST_MIPMAP_NEAREST,[Mr]:s.NEAREST_MIPMAP_LINEAR,[ei]:s.LINEAR,[Wa]:s.LINEAR_MIPMAP_NEAREST,[Ls]:s.LINEAR_MIPMAP_LINEAR},F={[$p]:s.NEVER,[im]:s.ALWAYS,[Jp]:s.LESS,[of]:s.LEQUAL,[Qp]:s.EQUAL,[nm]:s.GEQUAL,[tm]:s.GREATER,[em]:s.NOTEQUAL};function H(O,C){if(C.type===Fi&&t.has("OES_texture_float_linear")===!1&&(C.magFilter===ei||C.magFilter===Wa||C.magFilter===Mr||C.magFilter===Ls||C.minFilter===ei||C.minFilter===Wa||C.minFilter===Mr||C.minFilter===Ls)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(O,s.TEXTURE_WRAP_S,k[C.wrapS]),s.texParameteri(O,s.TEXTURE_WRAP_T,k[C.wrapT]),(O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY)&&s.texParameteri(O,s.TEXTURE_WRAP_R,k[C.wrapR]),s.texParameteri(O,s.TEXTURE_MAG_FILTER,B[C.magFilter]),s.texParameteri(O,s.TEXTURE_MIN_FILTER,B[C.minFilter]),C.compareFunction&&(s.texParameteri(O,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(O,s.TEXTURE_COMPARE_FUNC,F[C.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===qn||C.minFilter!==Mr&&C.minFilter!==Ls||C.type===Fi&&t.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const q=t.get("EXT_texture_filter_anisotropic");s.texParameterf(O,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,i.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function V(O,C){let q=!1;O.__webglInit===void 0&&(O.__webglInit=!0,C.addEventListener("dispose",U));const J=C.source;let ut=f.get(J);ut===void 0&&(ut={},f.set(J,ut));const rt=b(C);if(rt!==O.__cacheKey){ut[rt]===void 0&&(ut[rt]={texture:s.createTexture(),usedTimes:0},r.memory.textures++,q=!0),ut[rt].usedTimes++;const Ut=ut[O.__cacheKey];Ut!==void 0&&(ut[O.__cacheKey].usedTimes--,Ut.usedTimes===0&&I(C)),O.__cacheKey=rt,O.__webglTexture=ut[rt].texture}return q}function $(O,C,q){let J=s.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(J=s.TEXTURE_2D_ARRAY),C.isData3DTexture&&(J=s.TEXTURE_3D);const ut=V(O,C),rt=C.source;e.bindTexture(J,O.__webglTexture,s.TEXTURE0+q);const Ut=n.get(rt);if(rt.version!==Ut.__version||ut===!0){e.activeTexture(s.TEXTURE0+q);const xt=xe.getPrimaries(xe.workingColorSpace),St=C.colorSpace===ns?null:xe.getPrimaries(C.colorSpace),jt=C.colorSpace===ns||xt===St?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,C.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,C.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt);let _t=_(C.image,!1,i.maxTextureSize);_t=qt(C,_t);const et=o.convert(C.format,C.colorSpace),lt=o.convert(C.type);let vt=M(C.internalFormat,et,lt,C.colorSpace,C.isVideoTexture);H(J,C);let mt;const Nt=C.mipmaps,Et=C.isVideoTexture!==!0,$t=Ut.__version===void 0||ut===!0,Z=rt.dataReady,At=T(C,_t);if(C.isDepthTexture)vt=E(C.format===bo,C.type),$t&&(Et?e.texStorage2D(s.TEXTURE_2D,1,vt,_t.width,_t.height):e.texImage2D(s.TEXTURE_2D,0,vt,_t.width,_t.height,0,et,lt,null));else if(C.isDataTexture)if(Nt.length>0){Et&&$t&&e.texStorage2D(s.TEXTURE_2D,At,vt,Nt[0].width,Nt[0].height);for(let ot=0,ht=Nt.length;ot<ht;ot++)mt=Nt[ot],Et?Z&&e.texSubImage2D(s.TEXTURE_2D,ot,0,0,mt.width,mt.height,et,lt,mt.data):e.texImage2D(s.TEXTURE_2D,ot,vt,mt.width,mt.height,0,et,lt,mt.data);C.generateMipmaps=!1}else Et?($t&&e.texStorage2D(s.TEXTURE_2D,At,vt,_t.width,_t.height),Z&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,_t.width,_t.height,et,lt,_t.data)):e.texImage2D(s.TEXTURE_2D,0,vt,_t.width,_t.height,0,et,lt,_t.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){Et&&$t&&e.texStorage3D(s.TEXTURE_2D_ARRAY,At,vt,Nt[0].width,Nt[0].height,_t.depth);for(let ot=0,ht=Nt.length;ot<ht;ot++)if(mt=Nt[ot],C.format!==si)if(et!==null)if(Et){if(Z)if(C.layerUpdates.size>0){const Tt=Ah(mt.width,mt.height,C.format,C.type);for(const bt of C.layerUpdates){const re=mt.data.subarray(bt*Tt/mt.data.BYTES_PER_ELEMENT,(bt+1)*Tt/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ot,0,0,bt,mt.width,mt.height,1,et,re,0,0)}C.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ot,0,0,0,mt.width,mt.height,_t.depth,et,mt.data,0,0)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ot,vt,mt.width,mt.height,_t.depth,0,mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Et?Z&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,ot,0,0,0,mt.width,mt.height,_t.depth,et,lt,mt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,ot,vt,mt.width,mt.height,_t.depth,0,et,lt,mt.data)}else{Et&&$t&&e.texStorage2D(s.TEXTURE_2D,At,vt,Nt[0].width,Nt[0].height);for(let ot=0,ht=Nt.length;ot<ht;ot++)mt=Nt[ot],C.format!==si?et!==null?Et?Z&&e.compressedTexSubImage2D(s.TEXTURE_2D,ot,0,0,mt.width,mt.height,et,mt.data):e.compressedTexImage2D(s.TEXTURE_2D,ot,vt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Et?Z&&e.texSubImage2D(s.TEXTURE_2D,ot,0,0,mt.width,mt.height,et,lt,mt.data):e.texImage2D(s.TEXTURE_2D,ot,vt,mt.width,mt.height,0,et,lt,mt.data)}else if(C.isDataArrayTexture)if(Et){if($t&&e.texStorage3D(s.TEXTURE_2D_ARRAY,At,vt,_t.width,_t.height,_t.depth),Z)if(C.layerUpdates.size>0){const ot=Ah(_t.width,_t.height,C.format,C.type);for(const ht of C.layerUpdates){const Tt=_t.data.subarray(ht*ot/_t.data.BYTES_PER_ELEMENT,(ht+1)*ot/_t.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ht,_t.width,_t.height,1,et,lt,Tt)}C.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,_t.width,_t.height,_t.depth,et,lt,_t.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,vt,_t.width,_t.height,_t.depth,0,et,lt,_t.data);else if(C.isData3DTexture)Et?($t&&e.texStorage3D(s.TEXTURE_3D,At,vt,_t.width,_t.height,_t.depth),Z&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,_t.width,_t.height,_t.depth,et,lt,_t.data)):e.texImage3D(s.TEXTURE_3D,0,vt,_t.width,_t.height,_t.depth,0,et,lt,_t.data);else if(C.isFramebufferTexture){if($t)if(Et)e.texStorage2D(s.TEXTURE_2D,At,vt,_t.width,_t.height);else{let ot=_t.width,ht=_t.height;for(let Tt=0;Tt<At;Tt++)e.texImage2D(s.TEXTURE_2D,Tt,vt,ot,ht,0,et,lt,null),ot>>=1,ht>>=1}}else if(Nt.length>0){if(Et&&$t){const ot=It(Nt[0]);e.texStorage2D(s.TEXTURE_2D,At,vt,ot.width,ot.height)}for(let ot=0,ht=Nt.length;ot<ht;ot++)mt=Nt[ot],Et?Z&&e.texSubImage2D(s.TEXTURE_2D,ot,0,0,et,lt,mt):e.texImage2D(s.TEXTURE_2D,ot,vt,et,lt,mt);C.generateMipmaps=!1}else if(Et){if($t){const ot=It(_t);e.texStorage2D(s.TEXTURE_2D,At,vt,ot.width,ot.height)}Z&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,et,lt,_t)}else e.texImage2D(s.TEXTURE_2D,0,vt,et,lt,_t);p(C)&&g(J),Ut.__version=rt.version,C.onUpdate&&C.onUpdate(C)}O.__version=C.version}function N(O,C,q){if(C.image.length!==6)return;const J=V(O,C),ut=C.source;e.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+q);const rt=n.get(ut);if(ut.version!==rt.__version||J===!0){e.activeTexture(s.TEXTURE0+q);const Ut=xe.getPrimaries(xe.workingColorSpace),xt=C.colorSpace===ns?null:xe.getPrimaries(C.colorSpace),St=C.colorSpace===ns||Ut===xt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,C.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,C.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);const jt=C.isCompressedTexture||C.image[0].isCompressedTexture,_t=C.image[0]&&C.image[0].isDataTexture,et=[];for(let ht=0;ht<6;ht++)!jt&&!_t?et[ht]=_(C.image[ht],!0,i.maxCubemapSize):et[ht]=_t?C.image[ht].image:C.image[ht],et[ht]=qt(C,et[ht]);const lt=et[0],vt=o.convert(C.format,C.colorSpace),mt=o.convert(C.type),Nt=M(C.internalFormat,vt,mt,C.colorSpace),Et=C.isVideoTexture!==!0,$t=rt.__version===void 0||J===!0,Z=ut.dataReady;let At=T(C,lt);H(s.TEXTURE_CUBE_MAP,C);let ot;if(jt){Et&&$t&&e.texStorage2D(s.TEXTURE_CUBE_MAP,At,Nt,lt.width,lt.height);for(let ht=0;ht<6;ht++){ot=et[ht].mipmaps;for(let Tt=0;Tt<ot.length;Tt++){const bt=ot[Tt];C.format!==si?vt!==null?Et?Z&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Tt,0,0,bt.width,bt.height,vt,bt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Tt,Nt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Et?Z&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Tt,0,0,bt.width,bt.height,vt,mt,bt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Tt,Nt,bt.width,bt.height,0,vt,mt,bt.data)}}}else{if(ot=C.mipmaps,Et&&$t){ot.length>0&&At++;const ht=It(et[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,At,Nt,ht.width,ht.height)}for(let ht=0;ht<6;ht++)if(_t){Et?Z&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,0,0,et[ht].width,et[ht].height,vt,mt,et[ht].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,Nt,et[ht].width,et[ht].height,0,vt,mt,et[ht].data);for(let Tt=0;Tt<ot.length;Tt++){const re=ot[Tt].image[ht].image;Et?Z&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Tt+1,0,0,re.width,re.height,vt,mt,re.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Tt+1,Nt,re.width,re.height,0,vt,mt,re.data)}}else{Et?Z&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,0,0,vt,mt,et[ht]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,Nt,vt,mt,et[ht]);for(let Tt=0;Tt<ot.length;Tt++){const bt=ot[Tt];Et?Z&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Tt+1,0,0,vt,mt,bt.image[ht]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Tt+1,Nt,vt,mt,bt.image[ht])}}}p(C)&&g(s.TEXTURE_CUBE_MAP),rt.__version=ut.version,C.onUpdate&&C.onUpdate(C)}O.__version=C.version}function Y(O,C,q,J,ut,rt){const Ut=o.convert(q.format,q.colorSpace),xt=o.convert(q.type),St=M(q.internalFormat,Ut,xt,q.colorSpace);if(!n.get(C).__hasExternalTextures){const _t=Math.max(1,C.width>>rt),et=Math.max(1,C.height>>rt);ut===s.TEXTURE_3D||ut===s.TEXTURE_2D_ARRAY?e.texImage3D(ut,rt,St,_t,et,C.depth,0,Ut,xt,null):e.texImage2D(ut,rt,St,_t,et,0,Ut,xt,null)}e.bindFramebuffer(s.FRAMEBUFFER,O),Yt(C)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,ut,n.get(q).__webglTexture,0,Bt(C)):(ut===s.TEXTURE_2D||ut>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ut<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,J,ut,n.get(q).__webglTexture,rt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function st(O,C,q){if(s.bindRenderbuffer(s.RENDERBUFFER,O),C.depthBuffer){const J=C.depthTexture,ut=J&&J.isDepthTexture?J.type:null,rt=E(C.stencilBuffer,ut),Ut=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xt=Bt(C);Yt(C)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,xt,rt,C.width,C.height):q?s.renderbufferStorageMultisample(s.RENDERBUFFER,xt,rt,C.width,C.height):s.renderbufferStorage(s.RENDERBUFFER,rt,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ut,s.RENDERBUFFER,O)}else{const J=C.textures;for(let ut=0;ut<J.length;ut++){const rt=J[ut],Ut=o.convert(rt.format,rt.colorSpace),xt=o.convert(rt.type),St=M(rt.internalFormat,Ut,xt,rt.colorSpace),jt=Bt(C);q&&Yt(C)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,jt,St,C.width,C.height):Yt(C)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,jt,St,C.width,C.height):s.renderbufferStorage(s.RENDERBUFFER,St,C.width,C.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function at(O,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,O),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(C.depthTexture).__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),S(C.depthTexture,0);const J=n.get(C.depthTexture).__webglTexture,ut=Bt(C);if(C.depthTexture.format===go)Yt(C)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0,ut):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,J,0);else if(C.depthTexture.format===bo)Yt(C)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0,ut):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function pt(O){const C=n.get(O),q=O.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==O.depthTexture){const J=O.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),J){const ut=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,J.removeEventListener("dispose",ut)};J.addEventListener("dispose",ut),C.__depthDisposeCallback=ut}C.__boundDepthTexture=J}if(O.depthTexture&&!C.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");at(C.__webglFramebuffer,O)}else if(q){C.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(s.FRAMEBUFFER,C.__webglFramebuffer[J]),C.__webglDepthbuffer[J]===void 0)C.__webglDepthbuffer[J]=s.createRenderbuffer(),st(C.__webglDepthbuffer[J],O,!1);else{const ut=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,rt=C.__webglDepthbuffer[J];s.bindRenderbuffer(s.RENDERBUFFER,rt),s.framebufferRenderbuffer(s.FRAMEBUFFER,ut,s.RENDERBUFFER,rt)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=s.createRenderbuffer(),st(C.__webglDepthbuffer,O,!1);else{const J=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ut=C.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ut),s.framebufferRenderbuffer(s.FRAMEBUFFER,J,s.RENDERBUFFER,ut)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function nt(O,C,q){const J=n.get(O);C!==void 0&&Y(J.__webglFramebuffer,O,O.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),q!==void 0&&pt(O)}function Mt(O){const C=O.texture,q=n.get(O),J=n.get(C);O.addEventListener("dispose",D);const ut=O.textures,rt=O.isWebGLCubeRenderTarget===!0,Ut=ut.length>1;if(Ut||(J.__webglTexture===void 0&&(J.__webglTexture=s.createTexture()),J.__version=C.version,r.memory.textures++),rt){q.__webglFramebuffer=[];for(let xt=0;xt<6;xt++)if(C.mipmaps&&C.mipmaps.length>0){q.__webglFramebuffer[xt]=[];for(let St=0;St<C.mipmaps.length;St++)q.__webglFramebuffer[xt][St]=s.createFramebuffer()}else q.__webglFramebuffer[xt]=s.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){q.__webglFramebuffer=[];for(let xt=0;xt<C.mipmaps.length;xt++)q.__webglFramebuffer[xt]=s.createFramebuffer()}else q.__webglFramebuffer=s.createFramebuffer();if(Ut)for(let xt=0,St=ut.length;xt<St;xt++){const jt=n.get(ut[xt]);jt.__webglTexture===void 0&&(jt.__webglTexture=s.createTexture(),r.memory.textures++)}if(O.samples>0&&Yt(O)===!1){q.__webglMultisampledFramebuffer=s.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let xt=0;xt<ut.length;xt++){const St=ut[xt];q.__webglColorRenderbuffer[xt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,q.__webglColorRenderbuffer[xt]);const jt=o.convert(St.format,St.colorSpace),_t=o.convert(St.type),et=M(St.internalFormat,jt,_t,St.colorSpace,O.isXRRenderTarget===!0),lt=Bt(O);s.renderbufferStorageMultisample(s.RENDERBUFFER,lt,et,O.width,O.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,q.__webglColorRenderbuffer[xt])}s.bindRenderbuffer(s.RENDERBUFFER,null),O.depthBuffer&&(q.__webglDepthRenderbuffer=s.createRenderbuffer(),st(q.__webglDepthRenderbuffer,O,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(rt){e.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),H(s.TEXTURE_CUBE_MAP,C);for(let xt=0;xt<6;xt++)if(C.mipmaps&&C.mipmaps.length>0)for(let St=0;St<C.mipmaps.length;St++)Y(q.__webglFramebuffer[xt][St],O,C,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,St);else Y(q.__webglFramebuffer[xt],O,C,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0);p(C)&&g(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ut){for(let xt=0,St=ut.length;xt<St;xt++){const jt=ut[xt],_t=n.get(jt);e.bindTexture(s.TEXTURE_2D,_t.__webglTexture),H(s.TEXTURE_2D,jt),Y(q.__webglFramebuffer,O,jt,s.COLOR_ATTACHMENT0+xt,s.TEXTURE_2D,0),p(jt)&&g(s.TEXTURE_2D)}e.unbindTexture()}else{let xt=s.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(xt=O.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(xt,J.__webglTexture),H(xt,C),C.mipmaps&&C.mipmaps.length>0)for(let St=0;St<C.mipmaps.length;St++)Y(q.__webglFramebuffer[St],O,C,s.COLOR_ATTACHMENT0,xt,St);else Y(q.__webglFramebuffer,O,C,s.COLOR_ATTACHMENT0,xt,0);p(C)&&g(xt),e.unbindTexture()}O.depthBuffer&&pt(O)}function yt(O){const C=O.textures;for(let q=0,J=C.length;q<J;q++){const ut=C[q];if(p(ut)){const rt=O.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Ut=n.get(ut).__webglTexture;e.bindTexture(rt,Ut),g(rt),e.unbindTexture()}}}const Dt=[],X=[];function ce(O){if(O.samples>0){if(Yt(O)===!1){const C=O.textures,q=O.width,J=O.height;let ut=s.COLOR_BUFFER_BIT;const rt=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ut=n.get(O),xt=C.length>1;if(xt)for(let St=0;St<C.length;St++)e.bindFramebuffer(s.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Ut.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer);for(let St=0;St<C.length;St++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(ut|=s.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(ut|=s.STENCIL_BUFFER_BIT)),xt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ut.__webglColorRenderbuffer[St]);const jt=n.get(C[St]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,jt,0)}s.blitFramebuffer(0,0,q,J,0,0,q,J,ut,s.NEAREST),c===!0&&(Dt.length=0,X.length=0,Dt.push(s.COLOR_ATTACHMENT0+St),O.depthBuffer&&O.resolveDepthBuffer===!1&&(Dt.push(rt),X.push(rt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,X)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Dt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),xt)for(let St=0;St<C.length;St++){e.bindFramebuffer(s.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.RENDERBUFFER,Ut.__webglColorRenderbuffer[St]);const jt=n.get(C[St]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Ut.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.TEXTURE_2D,jt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&c){const C=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[C])}}}function Bt(O){return Math.min(i.maxSamples,O.samples)}function Yt(O){const C=n.get(O);return O.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function Ct(O){const C=r.render.frame;h.get(O)!==C&&(h.set(O,C),O.update())}function qt(O,C){const q=O.colorSpace,J=O.format,ut=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||q!==hs&&q!==ns&&(xe.getTransfer(q)===Ie?(J!==si||ut!==Hi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),C}function It(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(l.width=O.naturalWidth||O.width,l.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(l.width=O.displayWidth,l.height=O.displayHeight):(l.width=O.width,l.height=O.height),l}this.allocateTextureUnit=P,this.resetTextureUnits=v,this.setTexture2D=S,this.setTexture2DArray=R,this.setTexture3D=L,this.setTextureCube=G,this.rebindTextures=nt,this.setupRenderTarget=Mt,this.updateRenderTargetMipmap=yt,this.updateMultisampleRenderTarget=ce,this.setupDepthRenderbuffer=pt,this.setupFrameBufferTexture=Y,this.useMultisampledRTT=Yt}function l_(s,t){function e(n,i=ns){let o;const r=xe.getTransfer(i);if(n===Hi)return s.UNSIGNED_BYTE;if(n===tu)return s.UNSIGNED_SHORT_4_4_4_4;if(n===eu)return s.UNSIGNED_SHORT_5_5_5_1;if(n===jd)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Yd)return s.BYTE;if(n===Kd)return s.SHORT;if(n===ur)return s.UNSIGNED_SHORT;if(n===Ql)return s.INT;if(n===Ns)return s.UNSIGNED_INT;if(n===Fi)return s.FLOAT;if(n===pr)return s.HALF_FLOAT;if(n===Zd)return s.ALPHA;if(n===$d)return s.RGB;if(n===si)return s.RGBA;if(n===Jd)return s.LUMINANCE;if(n===Qd)return s.LUMINANCE_ALPHA;if(n===go)return s.DEPTH_COMPONENT;if(n===bo)return s.DEPTH_STENCIL;if(n===tf)return s.RED;if(n===nu)return s.RED_INTEGER;if(n===ef)return s.RG;if(n===iu)return s.RG_INTEGER;if(n===su)return s.RGBA_INTEGER;if(n===oa||n===ra||n===aa||n===ca)if(r===Ie)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===oa)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ra)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===aa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ca)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===oa)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ra)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===aa)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ca)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ul||n===hl||n===dl||n===fl)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===ul)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===hl)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===dl)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===fl)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===pl||n===ml||n===gl)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===pl||n===ml)return r===Ie?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===gl)return r===Ie?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===vl||n===xl||n===_l||n===yl||n===Ml||n===wl||n===Sl||n===El||n===bl||n===Tl||n===Al||n===Cl||n===Rl||n===Pl)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===vl)return r===Ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xl)return r===Ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===_l)return r===Ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===yl)return r===Ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ml)return r===Ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===wl)return r===Ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Sl)return r===Ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===El)return r===Ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===bl)return r===Ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Tl)return r===Ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Al)return r===Ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Cl)return r===Ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Rl)return r===Ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Pl)return r===Ie?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===la||n===Il||n===Ll)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===la)return r===Ie?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Il)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ll)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===nf||n===Dl||n===Nl||n===Ul)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===la)return o.COMPRESSED_RED_RGTC1_EXT;if(n===Dl)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Nl)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ul)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Eo?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class u_ extends Dn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Mn extends pn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const h_={type:"move"};class yc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,o=null,r=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){r=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),g=this._getHandJoint(l,_);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;l.inputState.pinching&&f>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&o!==null&&(i=o),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(h_)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Mn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const d_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,f_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class p_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Sn,o=t.properties.get(i);o.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new cs({vertexShader:d_,fragmentShader:f_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Pt(new zs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class m_ extends zo{constructor(t,e){super();const n=this;let i=null,o=1,r=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,m=null;const _=new p_,p=e.getContextAttributes();let g=null,M=null;const E=[],T=[],U=new Ft;let D=null;const w=new Dn;w.layers.enable(1),w.viewport=new Me;const I=new Dn;I.layers.enable(2),I.viewport=new Me;const A=[w,I],x=new u_;x.layers.enable(1),x.layers.enable(2);let v=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let Y=E[N];return Y===void 0&&(Y=new yc,E[N]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(N){let Y=E[N];return Y===void 0&&(Y=new yc,E[N]=Y),Y.getGripSpace()},this.getHand=function(N){let Y=E[N];return Y===void 0&&(Y=new yc,E[N]=Y),Y.getHandSpace()};function b(N){const Y=T.indexOf(N.inputSource);if(Y===-1)return;const st=E[Y];st!==void 0&&(st.update(N.inputSource,N.frame,l||r),st.dispatchEvent({type:N.type,data:N.inputSource}))}function S(){i.removeEventListener("select",b),i.removeEventListener("selectstart",b),i.removeEventListener("selectend",b),i.removeEventListener("squeeze",b),i.removeEventListener("squeezestart",b),i.removeEventListener("squeezeend",b),i.removeEventListener("end",S),i.removeEventListener("inputsourceschange",R);for(let N=0;N<E.length;N++){const Y=T[N];Y!==null&&(T[N]=null,E[N].disconnect(Y))}v=null,P=null,_.reset(),t.setRenderTarget(g),d=null,f=null,u=null,i=null,M=null,$.stop(),n.isPresenting=!1,t.setPixelRatio(D),t.setSize(U.width,U.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){o=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){a=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(N){l=N},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(N){if(i=N,i!==null){if(g=t.getRenderTarget(),i.addEventListener("select",b),i.addEventListener("selectstart",b),i.addEventListener("selectend",b),i.addEventListener("squeeze",b),i.addEventListener("squeezestart",b),i.addEventListener("squeezeend",b),i.addEventListener("end",S),i.addEventListener("inputsourceschange",R),p.xrCompatible!==!0&&await e.makeXRCompatible(),D=t.getPixelRatio(),t.getSize(U),i.renderState.layers===void 0){const Y={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:o};d=new XRWebGLLayer(i,e,Y),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new Us(d.framebufferWidth,d.framebufferHeight,{format:si,type:Hi,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let Y=null,st=null,at=null;p.depth&&(at=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Y=p.stencil?bo:go,st=p.stencil?Eo:Ns);const pt={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:o};u=new XRWebGLBinding(i,e),f=u.createProjectionLayer(pt),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),M=new Us(f.textureWidth,f.textureHeight,{format:si,type:Hi,depthTexture:new xf(f.textureWidth,f.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await i.requestReferenceSpace(a),$.setContext(i),$.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function R(N){for(let Y=0;Y<N.removed.length;Y++){const st=N.removed[Y],at=T.indexOf(st);at>=0&&(T[at]=null,E[at].disconnect(st))}for(let Y=0;Y<N.added.length;Y++){const st=N.added[Y];let at=T.indexOf(st);if(at===-1){for(let nt=0;nt<E.length;nt++)if(nt>=T.length){T.push(st),at=nt;break}else if(T[nt]===null){T[nt]=st,at=nt;break}if(at===-1)break}const pt=E[at];pt&&pt.connect(st)}}const L=new K,G=new K;function k(N,Y,st){L.setFromMatrixPosition(Y.matrixWorld),G.setFromMatrixPosition(st.matrixWorld);const at=L.distanceTo(G),pt=Y.projectionMatrix.elements,nt=st.projectionMatrix.elements,Mt=pt[14]/(pt[10]-1),yt=pt[14]/(pt[10]+1),Dt=(pt[9]+1)/pt[5],X=(pt[9]-1)/pt[5],ce=(pt[8]-1)/pt[0],Bt=(nt[8]+1)/nt[0],Yt=Mt*ce,Ct=Mt*Bt,qt=at/(-ce+Bt),It=qt*-ce;if(Y.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(It),N.translateZ(qt),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert(),pt[10]===-1)N.projectionMatrix.copy(Y.projectionMatrix),N.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const O=Mt+qt,C=yt+qt,q=Yt-It,J=Ct+(at-It),ut=Dt*yt/C*O,rt=X*yt/C*O;N.projectionMatrix.makePerspective(q,J,ut,rt,O,C),N.projectionMatrixInverse.copy(N.projectionMatrix).invert()}}function B(N,Y){Y===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(Y.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(i===null)return;let Y=N.near,st=N.far;_.texture!==null&&(_.depthNear>0&&(Y=_.depthNear),_.depthFar>0&&(st=_.depthFar)),x.near=I.near=w.near=Y,x.far=I.far=w.far=st,(v!==x.near||P!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),v=x.near,P=x.far);const at=N.parent,pt=x.cameras;B(x,at);for(let nt=0;nt<pt.length;nt++)B(pt[nt],at);pt.length===2?k(x,w,I):x.projectionMatrix.copy(w.projectionMatrix),F(N,x,at)};function F(N,Y,st){st===null?N.matrix.copy(Y.matrixWorld):(N.matrix.copy(st.matrixWorld),N.matrix.invert(),N.matrix.multiply(Y.matrixWorld)),N.matrix.decompose(N.position,N.quaternion,N.scale),N.updateMatrixWorld(!0),N.projectionMatrix.copy(Y.projectionMatrix),N.projectionMatrixInverse.copy(Y.projectionMatrixInverse),N.isPerspectiveCamera&&(N.fov=zl*2*Math.atan(1/N.projectionMatrix.elements[5]),N.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(N){c=N,f!==null&&(f.fixedFoveation=N),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=N)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let H=null;function V(N,Y){if(h=Y.getViewerPose(l||r),m=Y,h!==null){const st=h.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let at=!1;st.length!==x.cameras.length&&(x.cameras.length=0,at=!0);for(let nt=0;nt<st.length;nt++){const Mt=st[nt];let yt=null;if(d!==null)yt=d.getViewport(Mt);else{const X=u.getViewSubImage(f,Mt);yt=X.viewport,nt===0&&(t.setRenderTargetTextures(M,X.colorTexture,f.ignoreDepthValues?void 0:X.depthStencilTexture),t.setRenderTarget(M))}let Dt=A[nt];Dt===void 0&&(Dt=new Dn,Dt.layers.enable(nt),Dt.viewport=new Me,A[nt]=Dt),Dt.matrix.fromArray(Mt.transform.matrix),Dt.matrix.decompose(Dt.position,Dt.quaternion,Dt.scale),Dt.projectionMatrix.fromArray(Mt.projectionMatrix),Dt.projectionMatrixInverse.copy(Dt.projectionMatrix).invert(),Dt.viewport.set(yt.x,yt.y,yt.width,yt.height),nt===0&&(x.matrix.copy(Dt.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),at===!0&&x.cameras.push(Dt)}const pt=i.enabledFeatures;if(pt&&pt.includes("depth-sensing")){const nt=u.getDepthInformation(st[0]);nt&&nt.isValid&&nt.texture&&_.init(t,nt,i.renderState)}}for(let st=0;st<E.length;st++){const at=T[st],pt=E[st];at!==null&&pt!==void 0&&pt.update(at,Y,l||r)}H&&H(N,Y),Y.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Y}),m=null}const $=new gf;$.setAnimationLoop(V),this.setAnimationLoop=function(N){H=N},this.dispose=function(){}}}const vs=new yi,g_=new ze;function v_(s,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,ff(s)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function i(p,g,M,E,T){g.isMeshBasicMaterial||g.isMeshLambertMaterial?o(p,g):g.isMeshToonMaterial?(o(p,g),u(p,g)):g.isMeshPhongMaterial?(o(p,g),h(p,g)):g.isMeshStandardMaterial?(o(p,g),f(p,g),g.isMeshPhysicalMaterial&&d(p,g,T)):g.isMeshMatcapMaterial?(o(p,g),m(p,g)):g.isMeshDepthMaterial?o(p,g):g.isMeshDistanceMaterial?(o(p,g),_(p,g)):g.isMeshNormalMaterial?o(p,g):g.isLineBasicMaterial?(r(p,g),g.isLineDashedMaterial&&a(p,g)):g.isPointsMaterial?c(p,g,M,E):g.isSpriteMaterial?l(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function o(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===fn&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===fn&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);const M=t.get(g),E=M.envMap,T=M.envMapRotation;E&&(p.envMap.value=E,vs.copy(T),vs.x*=-1,vs.y*=-1,vs.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(vs.y*=-1,vs.z*=-1),p.envMapRotation.value.setFromMatrix4(g_.makeRotationFromEuler(vs)),p.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function r(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function a(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function c(p,g,M,E){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*M,p.scale.value=E*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function l(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function u(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function f(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function d(p,g,M){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===fn&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){const M=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function x_(s,t,e,n){let i={},o={},r=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,E){const T=E.program;n.uniformBlockBinding(M,T)}function l(M,E){let T=i[M.id];T===void 0&&(m(M),T=h(M),i[M.id]=T,M.addEventListener("dispose",p));const U=E.program;n.updateUBOMapping(M,U);const D=t.render.frame;o[M.id]!==D&&(f(M),o[M.id]=D)}function h(M){const E=u();M.__bindingPointIndex=E;const T=s.createBuffer(),U=M.__size,D=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,U,D),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,E,T),T}function u(){for(let M=0;M<a;M++)if(r.indexOf(M)===-1)return r.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const E=i[M.id],T=M.uniforms,U=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,E);for(let D=0,w=T.length;D<w;D++){const I=Array.isArray(T[D])?T[D]:[T[D]];for(let A=0,x=I.length;A<x;A++){const v=I[A];if(d(v,D,A,U)===!0){const P=v.__offset,b=Array.isArray(v.value)?v.value:[v.value];let S=0;for(let R=0;R<b.length;R++){const L=b[R],G=_(L);typeof L=="number"||typeof L=="boolean"?(v.__data[0]=L,s.bufferSubData(s.UNIFORM_BUFFER,P+S,v.__data)):L.isMatrix3?(v.__data[0]=L.elements[0],v.__data[1]=L.elements[1],v.__data[2]=L.elements[2],v.__data[3]=0,v.__data[4]=L.elements[3],v.__data[5]=L.elements[4],v.__data[6]=L.elements[5],v.__data[7]=0,v.__data[8]=L.elements[6],v.__data[9]=L.elements[7],v.__data[10]=L.elements[8],v.__data[11]=0):(L.toArray(v.__data,S),S+=G.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,P,v.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(M,E,T,U){const D=M.value,w=E+"_"+T;if(U[w]===void 0)return typeof D=="number"||typeof D=="boolean"?U[w]=D:U[w]=D.clone(),!0;{const I=U[w];if(typeof D=="number"||typeof D=="boolean"){if(I!==D)return U[w]=D,!0}else if(I.equals(D)===!1)return I.copy(D),!0}return!1}function m(M){const E=M.uniforms;let T=0;const U=16;for(let w=0,I=E.length;w<I;w++){const A=Array.isArray(E[w])?E[w]:[E[w]];for(let x=0,v=A.length;x<v;x++){const P=A[x],b=Array.isArray(P.value)?P.value:[P.value];for(let S=0,R=b.length;S<R;S++){const L=b[S],G=_(L),k=T%U,B=k%G.boundary,F=k+B;T+=B,F!==0&&U-F<G.storage&&(T+=U-F),P.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=T,T+=G.storage}}}const D=T%U;return D>0&&(T+=U-D),M.__size=T,M.__cache={},this}function _(M){const E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),E}function p(M){const E=M.target;E.removeEventListener("dispose",p);const T=r.indexOf(E.__bindingPointIndex);r.splice(T,1),s.deleteBuffer(i[E.id]),delete i[E.id],delete o[E.id]}function g(){for(const M in i)s.deleteBuffer(i[M]);r=[],i={},o={}}return{bind:c,update:l,dispose:g}}class __{constructor(t={}){const{canvas:e=om(),context:n=null,depth:i=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=r;const d=new Uint32Array(4),m=new Int32Array(4);let _=null,p=null;const g=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Vn,this.toneMapping=os,this.toneMappingExposure=1;const E=this;let T=!1,U=0,D=0,w=null,I=-1,A=null;const x=new Me,v=new Me;let P=null;const b=new he(0);let S=0,R=e.width,L=e.height,G=1,k=null,B=null;const F=new Me(0,0,R,L),H=new Me(0,0,R,L);let V=!1;const $=new au;let N=!1,Y=!1;const st=new ze,at=new ze,pt=new K,nt=new Me,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let yt=!1;function Dt(){return w===null?G:1}let X=n;function ce(z,j){return e.getContext(z,j)}try{const z={alpha:!0,depth:i,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Jl}`),e.addEventListener("webglcontextlost",ht,!1),e.addEventListener("webglcontextrestored",Tt,!1),e.addEventListener("webglcontextcreationerror",bt,!1),X===null){const j="webgl2";if(X=ce(j,z),X===null)throw ce(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(z){throw console.error("THREE.WebGLRenderer: "+z.message),z}let Bt,Yt,Ct,qt,It,O,C,q,J,ut,rt,Ut,xt,St,jt,_t,et,lt,vt,mt,Nt,Et,$t,Z;function At(){Bt=new Ev(X),Bt.init(),Et=new l_(X,Bt),Yt=new xv(X,Bt,t,Et),Ct=new r_(X),Yt.reverseDepthBuffer&&Ct.buffers.depth.setReversed(!0),qt=new Av(X),It=new Xx,O=new c_(X,Bt,Ct,It,Yt,Et,qt),C=new yv(E),q=new Sv(E),J=new Nm(X),$t=new gv(X,J),ut=new bv(X,J,qt,$t),rt=new Rv(X,ut,J,qt),vt=new Cv(X,Yt,O),_t=new _v(It),Ut=new Wx(E,C,q,Bt,Yt,$t,_t),xt=new v_(E,It),St=new Yx,jt=new Qx(Bt),lt=new mv(E,C,q,Ct,rt,f,c),et=new s_(E,rt,Yt),Z=new x_(X,qt,Yt,Ct),mt=new vv(X,Bt,qt),Nt=new Tv(X,Bt,qt),qt.programs=Ut.programs,E.capabilities=Yt,E.extensions=Bt,E.properties=It,E.renderLists=St,E.shadowMap=et,E.state=Ct,E.info=qt}At();const ot=new m_(E,X);this.xr=ot,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){const z=Bt.get("WEBGL_lose_context");z&&z.loseContext()},this.forceContextRestore=function(){const z=Bt.get("WEBGL_lose_context");z&&z.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(z){z!==void 0&&(G=z,this.setSize(R,L,!1))},this.getSize=function(z){return z.set(R,L)},this.setSize=function(z,j,Q=!0){if(ot.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}R=z,L=j,e.width=Math.floor(z*G),e.height=Math.floor(j*G),Q===!0&&(e.style.width=z+"px",e.style.height=j+"px"),this.setViewport(0,0,z,j)},this.getDrawingBufferSize=function(z){return z.set(R*G,L*G).floor()},this.setDrawingBufferSize=function(z,j,Q){R=z,L=j,G=Q,e.width=Math.floor(z*Q),e.height=Math.floor(j*Q),this.setViewport(0,0,z,j)},this.getCurrentViewport=function(z){return z.copy(x)},this.getViewport=function(z){return z.copy(F)},this.setViewport=function(z,j,Q,it){z.isVector4?F.set(z.x,z.y,z.z,z.w):F.set(z,j,Q,it),Ct.viewport(x.copy(F).multiplyScalar(G).round())},this.getScissor=function(z){return z.copy(H)},this.setScissor=function(z,j,Q,it){z.isVector4?H.set(z.x,z.y,z.z,z.w):H.set(z,j,Q,it),Ct.scissor(v.copy(H).multiplyScalar(G).round())},this.getScissorTest=function(){return V},this.setScissorTest=function(z){Ct.setScissorTest(V=z)},this.setOpaqueSort=function(z){k=z},this.setTransparentSort=function(z){B=z},this.getClearColor=function(z){return z.copy(lt.getClearColor())},this.setClearColor=function(){lt.setClearColor.apply(lt,arguments)},this.getClearAlpha=function(){return lt.getClearAlpha()},this.setClearAlpha=function(){lt.setClearAlpha.apply(lt,arguments)},this.clear=function(z=!0,j=!0,Q=!0){let it=0;if(z){let tt=!1;if(w!==null){const wt=w.texture.format;tt=wt===su||wt===iu||wt===nu}if(tt){const wt=w.texture.type,Lt=wt===Hi||wt===Ns||wt===ur||wt===Eo||wt===tu||wt===eu,kt=lt.getClearColor(),Ht=lt.getClearAlpha(),Wt=kt.r,Kt=kt.g,Vt=kt.b;Lt?(d[0]=Wt,d[1]=Kt,d[2]=Vt,d[3]=Ht,X.clearBufferuiv(X.COLOR,0,d)):(m[0]=Wt,m[1]=Kt,m[2]=Vt,m[3]=Ht,X.clearBufferiv(X.COLOR,0,m))}else it|=X.COLOR_BUFFER_BIT}j&&(it|=X.DEPTH_BUFFER_BIT,X.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),Q&&(it|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X.clear(it)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ht,!1),e.removeEventListener("webglcontextrestored",Tt,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),St.dispose(),jt.dispose(),It.dispose(),C.dispose(),q.dispose(),rt.dispose(),$t.dispose(),Z.dispose(),Ut.dispose(),ot.dispose(),ot.removeEventListener("sessionstart",Bs),ot.removeEventListener("sessionend",Wi),zn.stop()};function ht(z){z.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Tt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const z=qt.autoReset,j=et.enabled,Q=et.autoUpdate,it=et.needsUpdate,tt=et.type;At(),qt.autoReset=z,et.enabled=j,et.autoUpdate=Q,et.needsUpdate=it,et.type=tt}function bt(z){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",z.statusMessage)}function re(z){const j=z.target;j.removeEventListener("dispose",re),Fe(j)}function Fe(z){Ze(z),It.remove(z)}function Ze(z){const j=It.get(z).programs;j!==void 0&&(j.forEach(function(Q){Ut.releaseProgram(Q)}),z.isShaderMaterial&&Ut.releaseShaderCache(z))}this.renderBufferDirect=function(z,j,Q,it,tt,wt){j===null&&(j=Mt);const Lt=tt.isMesh&&tt.matrixWorld.determinant()<0,kt=Ge(z,j,Q,it,tt);Ct.setMaterial(it,Lt);let Ht=Q.index,Wt=1;if(it.wireframe===!0){if(Ht=ut.getWireframeAttribute(Q),Ht===void 0)return;Wt=2}const Kt=Q.drawRange,Vt=Q.attributes.position;let ye=Kt.start*Wt,Ce=(Kt.start+Kt.count)*Wt;wt!==null&&(ye=Math.max(ye,wt.start*Wt),Ce=Math.min(Ce,(wt.start+wt.count)*Wt)),Ht!==null?(ye=Math.max(ye,0),Ce=Math.min(Ce,Ht.count)):Vt!=null&&(ye=Math.max(ye,0),Ce=Math.min(Ce,Vt.count));const Be=Ce-ye;if(Be<0||Be===1/0)return;$t.setup(tt,it,kt,Q,Ht);let Cn,me=mt;if(Ht!==null&&(Cn=J.get(Ht),me=Nt,me.setIndex(Cn)),tt.isMesh)it.wireframe===!0?(Ct.setLineWidth(it.wireframeLinewidth*Dt()),me.setMode(X.LINES)):me.setMode(X.TRIANGLES);else if(tt.isLine){let Xt=it.linewidth;Xt===void 0&&(Xt=1),Ct.setLineWidth(Xt*Dt()),tt.isLineSegments?me.setMode(X.LINES):tt.isLineLoop?me.setMode(X.LINE_LOOP):me.setMode(X.LINE_STRIP)}else tt.isPoints?me.setMode(X.POINTS):tt.isSprite&&me.setMode(X.TRIANGLES);if(tt.isBatchedMesh)if(tt._multiDrawInstances!==null)me.renderMultiDrawInstances(tt._multiDrawStarts,tt._multiDrawCounts,tt._multiDrawCount,tt._multiDrawInstances);else if(Bt.get("WEBGL_multi_draw"))me.renderMultiDraw(tt._multiDrawStarts,tt._multiDrawCounts,tt._multiDrawCount);else{const Xt=tt._multiDrawStarts,cn=tt._multiDrawCounts,ge=tt._multiDrawCount,Kn=Ht?J.get(Ht).bytesPerElement:1,Hs=It.get(it).currentProgram.getUniforms();for(let Rn=0;Rn<ge;Rn++)Hs.setValue(X,"_gl_DrawID",Rn),me.render(Xt[Rn]/Kn,cn[Rn])}else if(tt.isInstancedMesh)me.renderInstances(ye,Be,tt.count);else if(Q.isInstancedBufferGeometry){const Xt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,cn=Math.min(Q.instanceCount,Xt);me.renderInstances(ye,Be,cn)}else me.render(ye,Be)};function le(z,j,Q){z.transparent===!0&&z.side===Wn&&z.forceSinglePass===!1?(z.side=fn,z.needsUpdate=!0,fe(z,j,Q),z.side=as,z.needsUpdate=!0,fe(z,j,Q),z.side=Wn):fe(z,j,Q)}this.compile=function(z,j,Q=null){Q===null&&(Q=z),p=jt.get(Q),p.init(j),M.push(p),Q.traverseVisible(function(tt){tt.isLight&&tt.layers.test(j.layers)&&(p.pushLight(tt),tt.castShadow&&p.pushShadow(tt))}),z!==Q&&z.traverseVisible(function(tt){tt.isLight&&tt.layers.test(j.layers)&&(p.pushLight(tt),tt.castShadow&&p.pushShadow(tt))}),p.setupLights();const it=new Set;return z.traverse(function(tt){if(!(tt.isMesh||tt.isPoints||tt.isLine||tt.isSprite))return;const wt=tt.material;if(wt)if(Array.isArray(wt))for(let Lt=0;Lt<wt.length;Lt++){const kt=wt[Lt];le(kt,Q,tt),it.add(kt)}else le(wt,Q,tt),it.add(wt)}),M.pop(),p=null,it},this.compileAsync=function(z,j,Q=null){const it=this.compile(z,j,Q);return new Promise(tt=>{function wt(){if(it.forEach(function(Lt){It.get(Lt).currentProgram.isReady()&&it.delete(Lt)}),it.size===0){tt(z);return}setTimeout(wt,10)}Bt.get("KHR_parallel_shader_compile")!==null?wt():setTimeout(wt,10)})};let sn=null;function gn(z){sn&&sn(z)}function Bs(){zn.stop()}function Wi(){zn.start()}const zn=new gf;zn.setAnimationLoop(gn),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(z){sn=z,ot.setAnimationLoop(z),z===null?zn.stop():zn.start()},ot.addEventListener("sessionstart",Bs),ot.addEventListener("sessionend",Wi),this.render=function(z,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(j),j=ot.getCamera()),z.isScene===!0&&z.onBeforeRender(E,z,j,w),p=jt.get(z,M.length),p.init(j),M.push(p),at.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),$.setFromProjectionMatrix(at),Y=this.localClippingEnabled,N=_t.init(this.clippingPlanes,Y),_=St.get(z,g.length),_.init(),g.push(_),ot.enabled===!0&&ot.isPresenting===!0){const wt=E.xr.getDepthSensingMesh();wt!==null&&Xi(wt,j,-1/0,E.sortObjects)}Xi(z,j,0,E.sortObjects),_.finish(),E.sortObjects===!0&&_.sort(k,B),yt=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,yt&&lt.addToRenderList(_,z),this.info.render.frame++,N===!0&&_t.beginShadows();const Q=p.state.shadowsArray;et.render(Q,z,j),N===!0&&_t.endShadows(),this.info.autoReset===!0&&this.info.reset();const it=_.opaque,tt=_.transmissive;if(p.setupLights(),j.isArrayCamera){const wt=j.cameras;if(tt.length>0)for(let Lt=0,kt=wt.length;Lt<kt;Lt++){const Ht=wt[Lt];Zt(it,tt,z,Ht)}yt&&lt.render(z);for(let Lt=0,kt=wt.length;Lt<kt;Lt++){const Ht=wt[Lt];yr(_,z,Ht,Ht.viewport)}}else tt.length>0&&Zt(it,tt,z,j),yt&&lt.render(z),yr(_,z,j);w!==null&&(O.updateMultisampleRenderTarget(w),O.updateRenderTargetMipmap(w)),z.isScene===!0&&z.onAfterRender(E,z,j),$t.resetDefaultState(),I=-1,A=null,M.pop(),M.length>0?(p=M[M.length-1],N===!0&&_t.setGlobalState(E.clippingPlanes,p.state.camera)):p=null,g.pop(),g.length>0?_=g[g.length-1]:_=null};function Xi(z,j,Q,it){if(z.visible===!1)return;if(z.layers.test(j.layers)){if(z.isGroup)Q=z.renderOrder;else if(z.isLOD)z.autoUpdate===!0&&z.update(j);else if(z.isLight)p.pushLight(z),z.castShadow&&p.pushShadow(z);else if(z.isSprite){if(!z.frustumCulled||$.intersectsSprite(z)){it&&nt.setFromMatrixPosition(z.matrixWorld).applyMatrix4(at);const Lt=rt.update(z),kt=z.material;kt.visible&&_.push(z,Lt,kt,Q,nt.z,null)}}else if((z.isMesh||z.isLine||z.isPoints)&&(!z.frustumCulled||$.intersectsObject(z))){const Lt=rt.update(z),kt=z.material;if(it&&(z.boundingSphere!==void 0?(z.boundingSphere===null&&z.computeBoundingSphere(),nt.copy(z.boundingSphere.center)):(Lt.boundingSphere===null&&Lt.computeBoundingSphere(),nt.copy(Lt.boundingSphere.center)),nt.applyMatrix4(z.matrixWorld).applyMatrix4(at)),Array.isArray(kt)){const Ht=Lt.groups;for(let Wt=0,Kt=Ht.length;Wt<Kt;Wt++){const Vt=Ht[Wt],ye=kt[Vt.materialIndex];ye&&ye.visible&&_.push(z,Lt,ye,Q,nt.z,Vt)}}else kt.visible&&_.push(z,Lt,kt,Q,nt.z,null)}}const wt=z.children;for(let Lt=0,kt=wt.length;Lt<kt;Lt++)Xi(wt[Lt],j,Q,it)}function yr(z,j,Q,it){const tt=z.opaque,wt=z.transmissive,Lt=z.transparent;p.setupLightsView(Q),N===!0&&_t.setGlobalState(E.clippingPlanes,Q),it&&Ct.viewport(x.copy(it)),tt.length>0&&te(tt,j,Q),wt.length>0&&te(wt,j,Q),Lt.length>0&&te(Lt,j,Q),Ct.buffers.depth.setTest(!0),Ct.buffers.depth.setMask(!0),Ct.buffers.color.setMask(!0),Ct.setPolygonOffset(!1)}function Zt(z,j,Q,it){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[it.id]===void 0&&(p.state.transmissionRenderTarget[it.id]=new Us(1,1,{generateMipmaps:!0,type:Bt.has("EXT_color_buffer_half_float")||Bt.has("EXT_color_buffer_float")?pr:Hi,minFilter:Ls,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:xe.workingColorSpace}));const wt=p.state.transmissionRenderTarget[it.id],Lt=it.viewport||x;wt.setSize(Lt.z,Lt.w);const kt=E.getRenderTarget();E.setRenderTarget(wt),E.getClearColor(b),S=E.getClearAlpha(),S<1&&E.setClearColor(16777215,.5),E.clear(),yt&&lt.render(Q);const Ht=E.toneMapping;E.toneMapping=os;const Wt=it.viewport;if(it.viewport!==void 0&&(it.viewport=void 0),p.setupLightsView(it),N===!0&&_t.setGlobalState(E.clippingPlanes,it),te(z,Q,it),O.updateMultisampleRenderTarget(wt),O.updateRenderTargetMipmap(wt),Bt.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let Vt=0,ye=j.length;Vt<ye;Vt++){const Ce=j[Vt],Be=Ce.object,Cn=Ce.geometry,me=Ce.material,Xt=Ce.group;if(me.side===Wn&&Be.layers.test(it.layers)){const cn=me.side;me.side=fn,me.needsUpdate=!0,Qt(Be,Q,it,Cn,me,Xt),me.side=cn,me.needsUpdate=!0,Kt=!0}}Kt===!0&&(O.updateMultisampleRenderTarget(wt),O.updateRenderTargetMipmap(wt))}E.setRenderTarget(kt),E.setClearColor(b,S),Wt!==void 0&&(it.viewport=Wt),E.toneMapping=Ht}function te(z,j,Q){const it=j.isScene===!0?j.overrideMaterial:null;for(let tt=0,wt=z.length;tt<wt;tt++){const Lt=z[tt],kt=Lt.object,Ht=Lt.geometry,Wt=it===null?Lt.material:it,Kt=Lt.group;kt.layers.test(Q.layers)&&Qt(kt,j,Q,Ht,Wt,Kt)}}function Qt(z,j,Q,it,tt,wt){z.onBeforeRender(E,j,Q,it,tt,wt),z.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,z.matrixWorld),z.normalMatrix.getNormalMatrix(z.modelViewMatrix),tt.onBeforeRender(E,j,Q,it,z,wt),tt.transparent===!0&&tt.side===Wn&&tt.forceSinglePass===!1?(tt.side=fn,tt.needsUpdate=!0,E.renderBufferDirect(Q,j,it,tt,z,wt),tt.side=as,tt.needsUpdate=!0,E.renderBufferDirect(Q,j,it,tt,z,wt),tt.side=Wn):E.renderBufferDirect(Q,j,it,tt,z,wt),z.onAfterRender(E,j,Q,it,tt,wt)}function fe(z,j,Q){j.isScene!==!0&&(j=Mt);const it=It.get(z),tt=p.state.lights,wt=p.state.shadowsArray,Lt=tt.state.version,kt=Ut.getParameters(z,tt.state,wt,j,Q),Ht=Ut.getProgramCacheKey(kt);let Wt=it.programs;it.environment=z.isMeshStandardMaterial?j.environment:null,it.fog=j.fog,it.envMap=(z.isMeshStandardMaterial?q:C).get(z.envMap||it.environment),it.envMapRotation=it.environment!==null&&z.envMap===null?j.environmentRotation:z.envMapRotation,Wt===void 0&&(z.addEventListener("dispose",re),Wt=new Map,it.programs=Wt);let Kt=Wt.get(Ht);if(Kt!==void 0){if(it.currentProgram===Kt&&it.lightsStateVersion===Lt)return an(z,kt),Kt}else kt.uniforms=Ut.getUniforms(z),z.onBeforeCompile(kt,E),Kt=Ut.acquireProgram(kt,Ht),Wt.set(Ht,Kt),it.uniforms=kt.uniforms;const Vt=it.uniforms;return(!z.isShaderMaterial&&!z.isRawShaderMaterial||z.clipping===!0)&&(Vt.clippingPlanes=_t.uniform),an(z,kt),it.needsLights=Se(z),it.lightsStateVersion=Lt,it.needsLights&&(Vt.ambientLightColor.value=tt.state.ambient,Vt.lightProbe.value=tt.state.probe,Vt.directionalLights.value=tt.state.directional,Vt.directionalLightShadows.value=tt.state.directionalShadow,Vt.spotLights.value=tt.state.spot,Vt.spotLightShadows.value=tt.state.spotShadow,Vt.rectAreaLights.value=tt.state.rectArea,Vt.ltc_1.value=tt.state.rectAreaLTC1,Vt.ltc_2.value=tt.state.rectAreaLTC2,Vt.pointLights.value=tt.state.point,Vt.pointLightShadows.value=tt.state.pointShadow,Vt.hemisphereLights.value=tt.state.hemi,Vt.directionalShadowMap.value=tt.state.directionalShadowMap,Vt.directionalShadowMatrix.value=tt.state.directionalShadowMatrix,Vt.spotShadowMap.value=tt.state.spotShadowMap,Vt.spotLightMatrix.value=tt.state.spotLightMatrix,Vt.spotLightMap.value=tt.state.spotLightMap,Vt.pointShadowMap.value=tt.state.pointShadowMap,Vt.pointShadowMatrix.value=tt.state.pointShadowMatrix),it.currentProgram=Kt,it.uniformsList=null,Kt}function Ae(z){if(z.uniformsList===null){const j=z.currentProgram.getUniforms();z.uniformsList=ha.seqWithValue(j.seq,z.uniforms)}return z.uniformsList}function an(z,j){const Q=It.get(z);Q.outputColorSpace=j.outputColorSpace,Q.batching=j.batching,Q.batchingColor=j.batchingColor,Q.instancing=j.instancing,Q.instancingColor=j.instancingColor,Q.instancingMorph=j.instancingMorph,Q.skinning=j.skinning,Q.morphTargets=j.morphTargets,Q.morphNormals=j.morphNormals,Q.morphColors=j.morphColors,Q.morphTargetsCount=j.morphTargetsCount,Q.numClippingPlanes=j.numClippingPlanes,Q.numIntersection=j.numClipIntersection,Q.vertexAlphas=j.vertexAlphas,Q.vertexTangents=j.vertexTangents,Q.toneMapping=j.toneMapping}function Ge(z,j,Q,it,tt){j.isScene!==!0&&(j=Mt),O.resetTextureUnits();const wt=j.fog,Lt=it.isMeshStandardMaterial?j.environment:null,kt=w===null?E.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:hs,Ht=(it.isMeshStandardMaterial?q:C).get(it.envMap||Lt),Wt=it.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Kt=!!Q.attributes.tangent&&(!!it.normalMap||it.anisotropy>0),Vt=!!Q.morphAttributes.position,ye=!!Q.morphAttributes.normal,Ce=!!Q.morphAttributes.color;let Be=os;it.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Be=E.toneMapping);const Cn=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,me=Cn!==void 0?Cn.length:0,Xt=It.get(it),cn=p.state.lights;if(N===!0&&(Y===!0||z!==A)){const Fn=z===A&&it.id===I;_t.setState(it,z,Fn)}let ge=!1;it.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==cn.state.version||Xt.outputColorSpace!==kt||tt.isBatchedMesh&&Xt.batching===!1||!tt.isBatchedMesh&&Xt.batching===!0||tt.isBatchedMesh&&Xt.batchingColor===!0&&tt.colorTexture===null||tt.isBatchedMesh&&Xt.batchingColor===!1&&tt.colorTexture!==null||tt.isInstancedMesh&&Xt.instancing===!1||!tt.isInstancedMesh&&Xt.instancing===!0||tt.isSkinnedMesh&&Xt.skinning===!1||!tt.isSkinnedMesh&&Xt.skinning===!0||tt.isInstancedMesh&&Xt.instancingColor===!0&&tt.instanceColor===null||tt.isInstancedMesh&&Xt.instancingColor===!1&&tt.instanceColor!==null||tt.isInstancedMesh&&Xt.instancingMorph===!0&&tt.morphTexture===null||tt.isInstancedMesh&&Xt.instancingMorph===!1&&tt.morphTexture!==null||Xt.envMap!==Ht||it.fog===!0&&Xt.fog!==wt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==_t.numPlanes||Xt.numIntersection!==_t.numIntersection)||Xt.vertexAlphas!==Wt||Xt.vertexTangents!==Kt||Xt.morphTargets!==Vt||Xt.morphNormals!==ye||Xt.morphColors!==Ce||Xt.toneMapping!==Be||Xt.morphTargetsCount!==me)&&(ge=!0):(ge=!0,Xt.__version=it.version);let Kn=Xt.currentProgram;ge===!0&&(Kn=fe(it,j,tt));let Hs=!1,Rn=!1,Ha=!1;const Ve=Kn.getUniforms(),qi=Xt.uniforms;if(Ct.useProgram(Kn.program)&&(Hs=!0,Rn=!0,Ha=!0),it.id!==I&&(I=it.id,Rn=!0),Hs||A!==z){Yt.reverseDepthBuffer?(st.copy(z.projectionMatrix),am(st),cm(st),Ve.setValue(X,"projectionMatrix",st)):Ve.setValue(X,"projectionMatrix",z.projectionMatrix),Ve.setValue(X,"viewMatrix",z.matrixWorldInverse);const Fn=Ve.map.cameraPosition;Fn!==void 0&&Fn.setValue(X,pt.setFromMatrixPosition(z.matrixWorld)),Yt.logarithmicDepthBuffer&&Ve.setValue(X,"logDepthBufFC",2/(Math.log(z.far+1)/Math.LN2)),(it.isMeshPhongMaterial||it.isMeshToonMaterial||it.isMeshLambertMaterial||it.isMeshBasicMaterial||it.isMeshStandardMaterial||it.isShaderMaterial)&&Ve.setValue(X,"isOrthographic",z.isOrthographicCamera===!0),A!==z&&(A=z,Rn=!0,Ha=!0)}if(tt.isSkinnedMesh){Ve.setOptional(X,tt,"bindMatrix"),Ve.setOptional(X,tt,"bindMatrixInverse");const Fn=tt.skeleton;Fn&&(Fn.boneTexture===null&&Fn.computeBoneTexture(),Ve.setValue(X,"boneTexture",Fn.boneTexture,O))}tt.isBatchedMesh&&(Ve.setOptional(X,tt,"batchingTexture"),Ve.setValue(X,"batchingTexture",tt._matricesTexture,O),Ve.setOptional(X,tt,"batchingIdTexture"),Ve.setValue(X,"batchingIdTexture",tt._indirectTexture,O),Ve.setOptional(X,tt,"batchingColorTexture"),tt._colorsTexture!==null&&Ve.setValue(X,"batchingColorTexture",tt._colorsTexture,O));const Ga=Q.morphAttributes;if((Ga.position!==void 0||Ga.normal!==void 0||Ga.color!==void 0)&&vt.update(tt,Q,Kn),(Rn||Xt.receiveShadow!==tt.receiveShadow)&&(Xt.receiveShadow=tt.receiveShadow,Ve.setValue(X,"receiveShadow",tt.receiveShadow)),it.isMeshGouraudMaterial&&it.envMap!==null&&(qi.envMap.value=Ht,qi.flipEnvMap.value=Ht.isCubeTexture&&Ht.isRenderTargetTexture===!1?-1:1),it.isMeshStandardMaterial&&it.envMap===null&&j.environment!==null&&(qi.envMapIntensity.value=j.environmentIntensity),Rn&&(Ve.setValue(X,"toneMappingExposure",E.toneMappingExposure),Xt.needsLights&&Oe(qi,Ha),wt&&it.fog===!0&&xt.refreshFogUniforms(qi,wt),xt.refreshMaterialUniforms(qi,it,G,L,p.state.transmissionRenderTarget[z.id]),ha.upload(X,Ae(Xt),qi,O)),it.isShaderMaterial&&it.uniformsNeedUpdate===!0&&(ha.upload(X,Ae(Xt),qi,O),it.uniformsNeedUpdate=!1),it.isSpriteMaterial&&Ve.setValue(X,"center",tt.center),Ve.setValue(X,"modelViewMatrix",tt.modelViewMatrix),Ve.setValue(X,"normalMatrix",tt.normalMatrix),Ve.setValue(X,"modelMatrix",tt.matrixWorld),it.isShaderMaterial||it.isRawShaderMaterial){const Fn=it.uniformsGroups;for(let Va=0,gp=Fn.length;Va<gp;Va++){const Nu=Fn[Va];Z.update(Nu,Kn),Z.bind(Nu,Kn)}}return Kn}function Oe(z,j){z.ambientLightColor.needsUpdate=j,z.lightProbe.needsUpdate=j,z.directionalLights.needsUpdate=j,z.directionalLightShadows.needsUpdate=j,z.pointLights.needsUpdate=j,z.pointLightShadows.needsUpdate=j,z.spotLights.needsUpdate=j,z.spotLightShadows.needsUpdate=j,z.rectAreaLights.needsUpdate=j,z.hemisphereLights.needsUpdate=j}function Se(z){return z.isMeshLambertMaterial||z.isMeshToonMaterial||z.isMeshPhongMaterial||z.isMeshStandardMaterial||z.isShadowMaterial||z.isShaderMaterial&&z.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(z,j,Q){It.get(z.texture).__webglTexture=j,It.get(z.depthTexture).__webglTexture=Q;const it=It.get(z);it.__hasExternalTextures=!0,it.__autoAllocateDepthBuffer=Q===void 0,it.__autoAllocateDepthBuffer||Bt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),it.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(z,j){const Q=It.get(z);Q.__webglFramebuffer=j,Q.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(z,j=0,Q=0){w=z,U=j,D=Q;let it=!0,tt=null,wt=!1,Lt=!1;if(z){const Ht=It.get(z);if(Ht.__useDefaultFramebuffer!==void 0)Ct.bindFramebuffer(X.FRAMEBUFFER,null),it=!1;else if(Ht.__webglFramebuffer===void 0)O.setupRenderTarget(z);else if(Ht.__hasExternalTextures)O.rebindTextures(z,It.get(z.texture).__webglTexture,It.get(z.depthTexture).__webglTexture);else if(z.depthBuffer){const Vt=z.depthTexture;if(Ht.__boundDepthTexture!==Vt){if(Vt!==null&&It.has(Vt)&&(z.width!==Vt.image.width||z.height!==Vt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");O.setupDepthRenderbuffer(z)}}const Wt=z.texture;(Wt.isData3DTexture||Wt.isDataArrayTexture||Wt.isCompressedArrayTexture)&&(Lt=!0);const Kt=It.get(z).__webglFramebuffer;z.isWebGLCubeRenderTarget?(Array.isArray(Kt[j])?tt=Kt[j][Q]:tt=Kt[j],wt=!0):z.samples>0&&O.useMultisampledRTT(z)===!1?tt=It.get(z).__webglMultisampledFramebuffer:Array.isArray(Kt)?tt=Kt[Q]:tt=Kt,x.copy(z.viewport),v.copy(z.scissor),P=z.scissorTest}else x.copy(F).multiplyScalar(G).floor(),v.copy(H).multiplyScalar(G).floor(),P=V;if(Ct.bindFramebuffer(X.FRAMEBUFFER,tt)&&it&&Ct.drawBuffers(z,tt),Ct.viewport(x),Ct.scissor(v),Ct.setScissorTest(P),wt){const Ht=It.get(z.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ht.__webglTexture,Q)}else if(Lt){const Ht=It.get(z.texture),Wt=j||0;X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,Ht.__webglTexture,Q||0,Wt)}I=-1},this.readRenderTargetPixels=function(z,j,Q,it,tt,wt,Lt){if(!(z&&z.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=It.get(z).__webglFramebuffer;if(z.isWebGLCubeRenderTarget&&Lt!==void 0&&(kt=kt[Lt]),kt){Ct.bindFramebuffer(X.FRAMEBUFFER,kt);try{const Ht=z.texture,Wt=Ht.format,Kt=Ht.type;if(!Yt.textureFormatReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Yt.textureTypeReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=z.width-it&&Q>=0&&Q<=z.height-tt&&X.readPixels(j,Q,it,tt,Et.convert(Wt),Et.convert(Kt),wt)}finally{const Ht=w!==null?It.get(w).__webglFramebuffer:null;Ct.bindFramebuffer(X.FRAMEBUFFER,Ht)}}},this.readRenderTargetPixelsAsync=async function(z,j,Q,it,tt,wt,Lt){if(!(z&&z.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let kt=It.get(z).__webglFramebuffer;if(z.isWebGLCubeRenderTarget&&Lt!==void 0&&(kt=kt[Lt]),kt){const Ht=z.texture,Wt=Ht.format,Kt=Ht.type;if(!Yt.textureFormatReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Yt.textureTypeReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(j>=0&&j<=z.width-it&&Q>=0&&Q<=z.height-tt){Ct.bindFramebuffer(X.FRAMEBUFFER,kt);const Vt=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,Vt),X.bufferData(X.PIXEL_PACK_BUFFER,wt.byteLength,X.STREAM_READ),X.readPixels(j,Q,it,tt,Et.convert(Wt),Et.convert(Kt),0);const ye=w!==null?It.get(w).__webglFramebuffer:null;Ct.bindFramebuffer(X.FRAMEBUFFER,ye);const Ce=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await rm(X,Ce,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,Vt),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,wt),X.deleteBuffer(Vt),X.deleteSync(Ce),wt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(z,j=null,Q=0){z.isTexture!==!0&&(ua("WebGLRenderer: copyFramebufferToTexture function signature has changed."),j=arguments[0]||null,z=arguments[1]);const it=Math.pow(2,-Q),tt=Math.floor(z.image.width*it),wt=Math.floor(z.image.height*it),Lt=j!==null?j.x:0,kt=j!==null?j.y:0;O.setTexture2D(z,0),X.copyTexSubImage2D(X.TEXTURE_2D,Q,0,0,Lt,kt,tt,wt),Ct.unbindTexture()},this.copyTextureToTexture=function(z,j,Q=null,it=null,tt=0){z.isTexture!==!0&&(ua("WebGLRenderer: copyTextureToTexture function signature has changed."),it=arguments[0]||null,z=arguments[1],j=arguments[2],tt=arguments[3]||0,Q=null);let wt,Lt,kt,Ht,Wt,Kt;Q!==null?(wt=Q.max.x-Q.min.x,Lt=Q.max.y-Q.min.y,kt=Q.min.x,Ht=Q.min.y):(wt=z.image.width,Lt=z.image.height,kt=0,Ht=0),it!==null?(Wt=it.x,Kt=it.y):(Wt=0,Kt=0);const Vt=Et.convert(j.format),ye=Et.convert(j.type);O.setTexture2D(j,0),X.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,j.flipY),X.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),X.pixelStorei(X.UNPACK_ALIGNMENT,j.unpackAlignment);const Ce=X.getParameter(X.UNPACK_ROW_LENGTH),Be=X.getParameter(X.UNPACK_IMAGE_HEIGHT),Cn=X.getParameter(X.UNPACK_SKIP_PIXELS),me=X.getParameter(X.UNPACK_SKIP_ROWS),Xt=X.getParameter(X.UNPACK_SKIP_IMAGES),cn=z.isCompressedTexture?z.mipmaps[tt]:z.image;X.pixelStorei(X.UNPACK_ROW_LENGTH,cn.width),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,cn.height),X.pixelStorei(X.UNPACK_SKIP_PIXELS,kt),X.pixelStorei(X.UNPACK_SKIP_ROWS,Ht),z.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,tt,Wt,Kt,wt,Lt,Vt,ye,cn.data):z.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,tt,Wt,Kt,cn.width,cn.height,Vt,cn.data):X.texSubImage2D(X.TEXTURE_2D,tt,Wt,Kt,wt,Lt,Vt,ye,cn),X.pixelStorei(X.UNPACK_ROW_LENGTH,Ce),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,Be),X.pixelStorei(X.UNPACK_SKIP_PIXELS,Cn),X.pixelStorei(X.UNPACK_SKIP_ROWS,me),X.pixelStorei(X.UNPACK_SKIP_IMAGES,Xt),tt===0&&j.generateMipmaps&&X.generateMipmap(X.TEXTURE_2D),Ct.unbindTexture()},this.copyTextureToTexture3D=function(z,j,Q=null,it=null,tt=0){z.isTexture!==!0&&(ua("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Q=arguments[0]||null,it=arguments[1]||null,z=arguments[2],j=arguments[3],tt=arguments[4]||0);let wt,Lt,kt,Ht,Wt,Kt,Vt,ye,Ce;const Be=z.isCompressedTexture?z.mipmaps[tt]:z.image;Q!==null?(wt=Q.max.x-Q.min.x,Lt=Q.max.y-Q.min.y,kt=Q.max.z-Q.min.z,Ht=Q.min.x,Wt=Q.min.y,Kt=Q.min.z):(wt=Be.width,Lt=Be.height,kt=Be.depth,Ht=0,Wt=0,Kt=0),it!==null?(Vt=it.x,ye=it.y,Ce=it.z):(Vt=0,ye=0,Ce=0);const Cn=Et.convert(j.format),me=Et.convert(j.type);let Xt;if(j.isData3DTexture)O.setTexture3D(j,0),Xt=X.TEXTURE_3D;else if(j.isDataArrayTexture||j.isCompressedArrayTexture)O.setTexture2DArray(j,0),Xt=X.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}X.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,j.flipY),X.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),X.pixelStorei(X.UNPACK_ALIGNMENT,j.unpackAlignment);const cn=X.getParameter(X.UNPACK_ROW_LENGTH),ge=X.getParameter(X.UNPACK_IMAGE_HEIGHT),Kn=X.getParameter(X.UNPACK_SKIP_PIXELS),Hs=X.getParameter(X.UNPACK_SKIP_ROWS),Rn=X.getParameter(X.UNPACK_SKIP_IMAGES);X.pixelStorei(X.UNPACK_ROW_LENGTH,Be.width),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,Be.height),X.pixelStorei(X.UNPACK_SKIP_PIXELS,Ht),X.pixelStorei(X.UNPACK_SKIP_ROWS,Wt),X.pixelStorei(X.UNPACK_SKIP_IMAGES,Kt),z.isDataTexture||z.isData3DTexture?X.texSubImage3D(Xt,tt,Vt,ye,Ce,wt,Lt,kt,Cn,me,Be.data):j.isCompressedArrayTexture?X.compressedTexSubImage3D(Xt,tt,Vt,ye,Ce,wt,Lt,kt,Cn,Be.data):X.texSubImage3D(Xt,tt,Vt,ye,Ce,wt,Lt,kt,Cn,me,Be),X.pixelStorei(X.UNPACK_ROW_LENGTH,cn),X.pixelStorei(X.UNPACK_IMAGE_HEIGHT,ge),X.pixelStorei(X.UNPACK_SKIP_PIXELS,Kn),X.pixelStorei(X.UNPACK_SKIP_ROWS,Hs),X.pixelStorei(X.UNPACK_SKIP_IMAGES,Rn),tt===0&&j.generateMipmaps&&X.generateMipmap(Xt),Ct.unbindTexture()},this.initRenderTarget=function(z){It.get(z).__webglFramebuffer===void 0&&O.setupRenderTarget(z)},this.initTexture=function(z){z.isCubeTexture?O.setTextureCube(z,0):z.isData3DTexture?O.setTexture3D(z,0):z.isDataArrayTexture||z.isCompressedArrayTexture?O.setTexture2DArray(z,0):O.setTexture2D(z,0),Ct.unbindTexture()},this.resetState=function(){U=0,D=0,w=null,Ct.reset(),$t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ki}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ou?"display-p3":"srgb",e.unpackColorSpace=xe.workingColorSpace===Na?"display-p3":"srgb"}}class lu{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new he(t),this.near=e,this.far=n}clone(){return new lu(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Sf extends pn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yi,this.environmentIntensity=1,this.environmentRotation=new yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class uu extends Sn{constructor(t,e,n,i,o,r,a,c,l){super(t,e,n,i,o,r,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Mi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),o=0;e.push(0);for(let r=1;r<=t;r++)n=this.getPoint(r/t),o+=n.distanceTo(i),e.push(o),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const o=n.length;let r;e?r=e:r=t*n[o-1];let a=0,c=o-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-r,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===r)return i/(o-1);const h=n[i],f=n[i+1]-h,d=(r-h)/f;return(i+d)/(o-1)}getTangent(t,e){let i=t-1e-4,o=t+1e-4;i<0&&(i=0),o>1&&(o=1);const r=this.getPoint(i),a=this.getPoint(o),c=e||(r.isVector2?new Ft:new K);return c.copy(a).sub(r).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new K,i=[],o=[],r=[],a=new K,c=new ze;for(let d=0;d<=t;d++){const m=d/t;i[d]=this.getTangentAt(m,new K)}o[0]=new K,r[0]=new K;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),o[0].crossVectors(i[0],a),r[0].crossVectors(i[0],o[0]);for(let d=1;d<=t;d++){if(o[d]=o[d-1].clone(),r[d]=r[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(hn(i[d-1].dot(i[d]),-1,1));o[d].applyMatrix4(c.makeRotationAxis(a,m))}r[d].crossVectors(i[d],o[d])}if(e===!0){let d=Math.acos(hn(o[0].dot(o[t]),-1,1));d/=t,i[0].dot(a.crossVectors(o[0],o[t]))>0&&(d=-d);for(let m=1;m<=t;m++)o[m].applyMatrix4(c.makeRotationAxis(i[m],d*m)),r[m].crossVectors(i[m],o[m])}return{tangents:i,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class hu extends Mi{constructor(t=0,e=0,n=1,i=1,o=0,r=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Ft){const n=e,i=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=i;for(;o>i;)o-=i;o<Number.EPSILON&&(r?o=0:o=i),this.aClockwise===!0&&!r&&(o===i?o=-i:o=o-i);const a=this.aStartAngle+t*o;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class y_ extends hu{constructor(t,e,n,i,o,r){super(t,e,n,n,i,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function du(){let s=0,t=0,e=0,n=0;function i(o,r,a,c){s=o,t=a,e=-3*o+3*r-2*a-c,n=2*o-2*r+a+c}return{initCatmullRom:function(o,r,a,c,l){i(r,a,l*(a-o),l*(c-r))},initNonuniformCatmullRom:function(o,r,a,c,l,h,u){let f=(r-o)/l-(a-o)/(l+h)+(a-r)/h,d=(a-r)/h-(c-r)/(h+u)+(c-a)/u;f*=h,d*=h,i(r,a,f,d)},calc:function(o){const r=o*o,a=r*o;return s+t*o+e*r+n*a}}}const Gr=new K,Mc=new du,wc=new du,Sc=new du;class M_ extends Mi{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new K){const n=e,i=this.points,o=i.length,r=(o-(this.closed?0:1))*t;let a=Math.floor(r),c=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:c===0&&a===o-1&&(a=o-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%o]:(Gr.subVectors(i[0],i[1]).add(i[0]),l=Gr);const u=i[a%o],f=i[(a+1)%o];if(this.closed||a+2<o?h=i[(a+2)%o]:(Gr.subVectors(i[o-1],i[o-2]).add(i[o-1]),h=Gr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),m<1e-4&&(m=_),p<1e-4&&(p=_),Mc.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,m,_,p),wc.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,m,_,p),Sc.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,m,_,p)}else this.curveType==="catmullrom"&&(Mc.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),wc.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Sc.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(Mc.calc(c),wc.calc(c),Sc.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new K().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ch(s,t,e,n,i){const o=(n-t)*.5,r=(i-e)*.5,a=s*s,c=s*a;return(2*e-2*n+o+r)*c+(-3*e+3*n-2*o-r)*a+o*s+e}function w_(s,t){const e=1-s;return e*e*t}function S_(s,t){return 2*(1-s)*s*t}function E_(s,t){return s*s*t}function or(s,t,e,n){return w_(s,t)+S_(s,e)+E_(s,n)}function b_(s,t){const e=1-s;return e*e*e*t}function T_(s,t){const e=1-s;return 3*e*e*s*t}function A_(s,t){return 3*(1-s)*s*s*t}function C_(s,t){return s*s*s*t}function rr(s,t,e,n,i){return b_(s,t)+T_(s,e)+A_(s,n)+C_(s,i)}class Ef extends Mi{constructor(t=new Ft,e=new Ft,n=new Ft,i=new Ft){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Ft){const n=e,i=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(rr(t,i.x,o.x,r.x,a.x),rr(t,i.y,o.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class R_ extends Mi{constructor(t=new K,e=new K,n=new K,i=new K){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new K){const n=e,i=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(rr(t,i.x,o.x,r.x,a.x),rr(t,i.y,o.y,r.y,a.y),rr(t,i.z,o.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class bf extends Mi{constructor(t=new Ft,e=new Ft){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ft){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ft){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class P_ extends Mi{constructor(t=new K,e=new K){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new K){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new K){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Tf extends Mi{constructor(t=new Ft,e=new Ft,n=new Ft){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Ft){const n=e,i=this.v0,o=this.v1,r=this.v2;return n.set(or(t,i.x,o.x,r.x),or(t,i.y,o.y,r.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class I_ extends Mi{constructor(t=new K,e=new K,n=new K){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new K){const n=e,i=this.v0,o=this.v1,r=this.v2;return n.set(or(t,i.x,o.x,r.x),or(t,i.y,o.y,r.y),or(t,i.z,o.z,r.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Af extends Mi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ft){const n=e,i=this.points,o=(i.length-1)*t,r=Math.floor(o),a=o-r,c=i[r===0?r:r-1],l=i[r],h=i[r>i.length-2?i.length-1:r+1],u=i[r>i.length-3?i.length-1:r+2];return n.set(Ch(a,c.x,l.x,h.x,u.x),Ch(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new Ft().fromArray(i))}return this}}var Rh=Object.freeze({__proto__:null,ArcCurve:y_,CatmullRomCurve3:M_,CubicBezierCurve:Ef,CubicBezierCurve3:R_,EllipseCurve:hu,LineCurve:bf,LineCurve3:P_,QuadraticBezierCurve:Tf,QuadraticBezierCurve3:I_,SplineCurve:Af});class L_ extends Mi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Rh[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let o=0;for(;o<i.length;){if(i[o]>=n){const r=i[o]-n,a=this.curves[o],c=a.getLength(),l=c===0?0:1-r/c;return a.getPointAt(l,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,o=this.curves;i<o.length;i++){const r=o[i],a=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,c=r.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Rh[i.type]().fromJSON(i))}return this}}class D_ extends L_{constructor(t){super(),this.type="Path",this.currentPoint=new Ft,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new bf(this.currentPoint.clone(),new Ft(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const o=new Tf(this.currentPoint.clone(),new Ft(t,e),new Ft(n,i));return this.curves.push(o),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,o,r){const a=new Ef(this.currentPoint.clone(),new Ft(t,e),new Ft(n,i),new Ft(o,r));return this.curves.push(a),this.currentPoint.set(o,r),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Af(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,o,r){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,o,r),this}absarc(t,e,n,i,o,r){return this.absellipse(t,e,n,n,i,o,r),this}ellipse(t,e,n,i,o,r,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,o,r,a,c),this}absellipse(t,e,n,i,o,r,a,c){const l=new hu(t,e,n,i,o,r,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class fu extends Nn{constructor(t=[new Ft(0,-.5),new Ft(.5,0),new Ft(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=hn(i,0,Math.PI*2);const o=[],r=[],a=[],c=[],l=[],h=1/e,u=new K,f=new Ft,d=new K,m=new K,_=new K;let p=0,g=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:p=t[M+1].x-t[M].x,g=t[M+1].y-t[M].y,d.x=g*1,d.y=-p,d.z=g*0,_.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:p=t[M+1].x-t[M].x,g=t[M+1].y-t[M].y,d.x=g*1,d.y=-p,d.z=g*0,m.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),c.push(d.x,d.y,d.z),_.copy(m)}for(let M=0;M<=e;M++){const E=n+M*h*i,T=Math.sin(E),U=Math.cos(E);for(let D=0;D<=t.length-1;D++){u.x=t[D].x*T,u.y=t[D].y,u.z=t[D].x*U,r.push(u.x,u.y,u.z),f.x=M/e,f.y=D/(t.length-1),a.push(f.x,f.y);const w=c[3*D+0]*T,I=c[3*D+1],A=c[3*D+0]*U;l.push(w,I,A)}}for(let M=0;M<e;M++)for(let E=0;E<t.length-1;E++){const T=E+M*t.length,U=T,D=T+t.length,w=T+t.length+1,I=T+1;o.push(U,D,I),o.push(w,I,D)}this.setIndex(o),this.setAttribute("position",new Ne(r,3)),this.setAttribute("uv",new Ne(a,2)),this.setAttribute("normal",new Ne(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fu(t.points,t.segments,t.phiStart,t.phiLength)}}class pu extends fu{constructor(t=1,e=1,n=4,i=8){const o=new D_;o.absarc(0,-e/2,t,Math.PI*1.5,0),o.absarc(0,e/2,t,0,Math.PI*.5),super(o.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new pu(t.radius,t.length,t.capSegments,t.radialSegments)}}class mu extends Nn{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const o=[],r=[],a=[],c=[],l=new K,h=new Ft;r.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*i;l.x=t*Math.cos(d),l.y=t*Math.sin(d),r.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(r[f]/t+1)/2,h.y=(r[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)o.push(u,u+1,0);this.setIndex(o),this.setAttribute("position",new Ne(r,3)),this.setAttribute("normal",new Ne(a,3)),this.setAttribute("uv",new Ne(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new mu(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ao extends Nn{constructor(t=1,e=1,n=1,i=32,o=1,r=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),o=Math.floor(o);const h=[],u=[],f=[],d=[];let m=0;const _=[],p=n/2;let g=0;M(),r===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new Ne(u,3)),this.setAttribute("normal",new Ne(f,3)),this.setAttribute("uv",new Ne(d,2));function M(){const T=new K,U=new K;let D=0;const w=(e-t)/n;for(let I=0;I<=o;I++){const A=[],x=I/o,v=x*(e-t)+t;for(let P=0;P<=i;P++){const b=P/i,S=b*c+a,R=Math.sin(S),L=Math.cos(S);U.x=v*R,U.y=-x*n+p,U.z=v*L,u.push(U.x,U.y,U.z),T.set(R,w,L).normalize(),f.push(T.x,T.y,T.z),d.push(b,1-x),A.push(m++)}_.push(A)}for(let I=0;I<i;I++)for(let A=0;A<o;A++){const x=_[A][I],v=_[A+1][I],P=_[A+1][I+1],b=_[A][I+1];t>0&&(h.push(x,v,b),D+=3),e>0&&(h.push(v,P,b),D+=3)}l.addGroup(g,D,0),g+=D}function E(T){const U=m,D=new Ft,w=new K;let I=0;const A=T===!0?t:e,x=T===!0?1:-1;for(let P=1;P<=i;P++)u.push(0,p*x,0),f.push(0,x,0),d.push(.5,.5),m++;const v=m;for(let P=0;P<=i;P++){const S=P/i*c+a,R=Math.cos(S),L=Math.sin(S);w.x=A*L,w.y=p*x,w.z=A*R,u.push(w.x,w.y,w.z),f.push(0,x,0),D.x=R*.5+.5,D.y=L*.5*x+.5,d.push(D.x,D.y),m++}for(let P=0;P<i;P++){const b=U+P,S=v+P;T===!0?h.push(S,S+1,b):h.push(S+1,S,b),I+=3}l.addGroup(g,I,T===!0?1:2),g+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ao(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class za extends Ao{constructor(t=1,e=1,n=32,i=1,o=!1,r=0,a=Math.PI*2){super(0,t,e,n,i,o,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(t){return new za(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class gu extends Nn{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const o=[],r=[];a(i),l(n),h(),this.setAttribute("position",new Ne(o,3)),this.setAttribute("normal",new Ne(o.slice(),3)),this.setAttribute("uv",new Ne(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const E=new K,T=new K,U=new K;for(let D=0;D<e.length;D+=3)d(e[D+0],E),d(e[D+1],T),d(e[D+2],U),c(E,T,U,M)}function c(M,E,T,U){const D=U+1,w=[];for(let I=0;I<=D;I++){w[I]=[];const A=M.clone().lerp(T,I/D),x=E.clone().lerp(T,I/D),v=D-I;for(let P=0;P<=v;P++)P===0&&I===D?w[I][P]=A:w[I][P]=A.clone().lerp(x,P/v)}for(let I=0;I<D;I++)for(let A=0;A<2*(D-I)-1;A++){const x=Math.floor(A/2);A%2===0?(f(w[I][x+1]),f(w[I+1][x]),f(w[I][x])):(f(w[I][x+1]),f(w[I+1][x+1]),f(w[I+1][x]))}}function l(M){const E=new K;for(let T=0;T<o.length;T+=3)E.x=o[T+0],E.y=o[T+1],E.z=o[T+2],E.normalize().multiplyScalar(M),o[T+0]=E.x,o[T+1]=E.y,o[T+2]=E.z}function h(){const M=new K;for(let E=0;E<o.length;E+=3){M.x=o[E+0],M.y=o[E+1],M.z=o[E+2];const T=p(M)/2/Math.PI+.5,U=g(M)/Math.PI+.5;r.push(T,1-U)}m(),u()}function u(){for(let M=0;M<r.length;M+=6){const E=r[M+0],T=r[M+2],U=r[M+4],D=Math.max(E,T,U),w=Math.min(E,T,U);D>.9&&w<.1&&(E<.2&&(r[M+0]+=1),T<.2&&(r[M+2]+=1),U<.2&&(r[M+4]+=1))}}function f(M){o.push(M.x,M.y,M.z)}function d(M,E){const T=M*3;E.x=t[T+0],E.y=t[T+1],E.z=t[T+2]}function m(){const M=new K,E=new K,T=new K,U=new K,D=new Ft,w=new Ft,I=new Ft;for(let A=0,x=0;A<o.length;A+=9,x+=6){M.set(o[A+0],o[A+1],o[A+2]),E.set(o[A+3],o[A+4],o[A+5]),T.set(o[A+6],o[A+7],o[A+8]),D.set(r[x+0],r[x+1]),w.set(r[x+2],r[x+3]),I.set(r[x+4],r[x+5]),U.copy(M).add(E).add(T).divideScalar(3);const v=p(U);_(D,x+0,M,v),_(w,x+2,E,v),_(I,x+4,T,v)}}function _(M,E,T,U){U<0&&M.x===1&&(r[E]=M.x-1),T.x===0&&T.z===0&&(r[E]=U/2/Math.PI+.5)}function p(M){return Math.atan2(M.z,-M.x)}function g(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gu(t.vertices,t.indices,t.radius,t.details)}}class vu extends gu{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new vu(t.radius,t.detail)}}class Co extends Nn{constructor(t=.5,e=1,n=32,i=1,o=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:o,thetaLength:r},n=Math.max(3,n),i=Math.max(1,i);const a=[],c=[],l=[],h=[];let u=t;const f=(e-t)/i,d=new K,m=new Ft;for(let _=0;_<=i;_++){for(let p=0;p<=n;p++){const g=o+p/n*r;d.x=u*Math.cos(g),d.y=u*Math.sin(g),c.push(d.x,d.y,d.z),l.push(0,0,1),m.x=(d.x/e+1)/2,m.y=(d.y/e+1)/2,h.push(m.x,m.y)}u+=f}for(let _=0;_<i;_++){const p=_*(n+1);for(let g=0;g<n;g++){const M=g+p,E=M,T=M+n+1,U=M+n+2,D=M+1;a.push(E,T,D),a.push(T,U,D)}}this.setIndex(a),this.setAttribute("position",new Ne(c,3)),this.setAttribute("normal",new Ne(l,3)),this.setAttribute("uv",new Ne(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Co(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ls extends Nn{constructor(t=1,e=32,n=16,i=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(r+a,Math.PI);let l=0;const h=[],u=new K,f=new K,d=[],m=[],_=[],p=[];for(let g=0;g<=n;g++){const M=[],E=g/n;let T=0;g===0&&r===0?T=.5/e:g===n&&c===Math.PI&&(T=-.5/e);for(let U=0;U<=e;U++){const D=U/e;u.x=-t*Math.cos(i+D*o)*Math.sin(r+E*a),u.y=t*Math.cos(r+E*a),u.z=t*Math.sin(i+D*o)*Math.sin(r+E*a),m.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),p.push(D+T,1-E),M.push(l++)}h.push(M)}for(let g=0;g<n;g++)for(let M=0;M<e;M++){const E=h[g][M+1],T=h[g][M],U=h[g+1][M],D=h[g+1][M+1];(g!==0||r>0)&&d.push(E,T,D),(g!==n-1||c<Math.PI)&&d.push(T,U,D)}this.setIndex(d),this.setAttribute("position",new Ne(m,3)),this.setAttribute("normal",new Ne(_,3)),this.setAttribute("uv",new Ne(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ls(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class us extends vr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new he(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sf,this.normalScale=new Ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Fa extends pn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new he(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class N_ extends Fa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new he(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ec=new ze,Ph=new K,Ih=new K;class Cf{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ft(512,512),this.map=null,this.mapPass=null,this.matrix=new ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new au,this._frameExtents=new Ft(1,1),this._viewportCount=1,this._viewports=[new Me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ph.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ph),Ih.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ih),e.updateMatrixWorld(),Ec.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ec),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ec)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Lh=new ze,qo=new K,bc=new K;class U_ extends Cf{constructor(){super(new Dn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ft(4,2),this._viewportCount=6,this._viewports=[new Me(2,1,1,1),new Me(0,1,1,1),new Me(3,1,1,1),new Me(1,1,1,1),new Me(3,0,1,1),new Me(1,0,1,1)],this._cubeDirections=[new K(1,0,0),new K(-1,0,0),new K(0,0,1),new K(0,0,-1),new K(0,1,0),new K(0,-1,0)],this._cubeUps=[new K(0,1,0),new K(0,1,0),new K(0,1,0),new K(0,1,0),new K(0,0,1),new K(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,o=t.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),qo.setFromMatrixPosition(t.matrixWorld),n.position.copy(qo),bc.copy(n.position),bc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(bc),n.updateMatrixWorld(),i.makeTranslation(-qo.x,-qo.y,-qo.z),Lh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lh)}}class z_ extends Fa{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new U_}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class F_ extends Cf{constructor(){super(new vf(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Dh extends Fa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pn.DEFAULT_UP),this.updateMatrix(),this.target=new pn,this.shadow=new F_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class k_ extends Fa{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class O_{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Nh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Nh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Nh(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jl);class oi{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){const t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){const t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){const e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new y);const e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new y);const n=this.elements,i=t.x,o=t.y,r=t.z;return e.x=n[0]*i+n[1]*o+n[2]*r,e.y=n[3]*i+n[4]*o+n[5]*r,e.z=n[6]*i+n[7]*o+n[8]*r,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new oi);const n=this.elements,i=t.elements,o=e.elements,r=n[0],a=n[1],c=n[2],l=n[3],h=n[4],u=n[5],f=n[6],d=n[7],m=n[8],_=i[0],p=i[1],g=i[2],M=i[3],E=i[4],T=i[5],U=i[6],D=i[7],w=i[8];return o[0]=r*_+a*M+c*U,o[1]=r*p+a*E+c*D,o[2]=r*g+a*T+c*w,o[3]=l*_+h*M+u*U,o[4]=l*p+h*E+u*D,o[5]=l*g+h*T+u*w,o[6]=f*_+d*M+m*U,o[7]=f*p+d*E+m*D,o[8]=f*g+d*T+m*w,e}scale(t,e){e===void 0&&(e=new oi);const n=this.elements,i=e.elements;for(let o=0;o!==3;o++)i[3*o+0]=t.x*n[3*o+0],i[3*o+1]=t.y*n[3*o+1],i[3*o+2]=t.z*n[3*o+2];return e}solve(t,e){e===void 0&&(e=new y);const n=3,i=4,o=[];let r,a;for(r=0;r<n*i;r++)o.push(0);for(r=0;r<3;r++)for(a=0;a<3;a++)o[r+i*a]=this.elements[r+3*a];o[3+4*0]=t.x,o[3+4*1]=t.y,o[3+4*2]=t.z;let c=3;const l=c;let h;const u=4;let f;do{if(r=l-c,o[r+i*r]===0){for(a=r+1;a<l;a++)if(o[r+i*a]!==0){h=u;do f=u-h,o[f+i*r]+=o[f+i*a];while(--h);break}}if(o[r+i*r]!==0)for(a=r+1;a<l;a++){const d=o[r+i*a]/o[r+i*r];h=u;do f=u-h,o[f+i*a]=f<=r?0:o[f+i*a]-o[f+i*r]*d;while(--h)}}while(--c);if(e.z=o[2*i+3]/o[2*i+2],e.y=(o[1*i+3]-o[1*i+2]*e.z)/o[1*i+1],e.x=(o[0*i+3]-o[0*i+2]*e.z-o[0*i+1]*e.y)/o[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";const e=",";for(let n=0;n<9;n++)t+=this.elements[n]+e;return t}reverse(t){t===void 0&&(t=new oi);const e=3,n=6,i=B_;let o,r;for(o=0;o<3;o++)for(r=0;r<3;r++)i[o+n*r]=this.elements[o+3*r];i[3+6*0]=1,i[3+6*1]=0,i[3+6*2]=0,i[4+6*0]=0,i[4+6*1]=1,i[4+6*2]=0,i[5+6*0]=0,i[5+6*1]=0,i[5+6*2]=1;let a=3;const c=a;let l;const h=n;let u;do{if(o=c-a,i[o+n*o]===0){for(r=o+1;r<c;r++)if(i[o+n*r]!==0){l=h;do u=h-l,i[u+n*o]+=i[u+n*r];while(--l);break}}if(i[o+n*o]!==0)for(r=o+1;r<c;r++){const f=i[o+n*r]/i[o+n*o];l=h;do u=h-l,i[u+n*r]=u<=o?0:i[u+n*r]-i[u+n*o]*f;while(--l)}}while(--a);o=2;do{r=o-1;do{const f=i[o+n*r]/i[o+n*o];l=n;do u=n-l,i[u+n*r]=i[u+n*r]-i[u+n*o]*f;while(--l)}while(r--)}while(--o);o=2;do{const f=1/i[o+n*o];l=n;do u=n-l,i[u+n*o]=i[u+n*o]*f;while(--l)}while(o--);o=2;do{r=2;do{if(u=i[e+r+n*o],isNaN(u)||u===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(o,r,u)}while(r--)}while(o--);return t}setRotationFromQuaternion(t){const e=t.x,n=t.y,i=t.z,o=t.w,r=e+e,a=n+n,c=i+i,l=e*r,h=e*a,u=e*c,f=n*a,d=n*c,m=i*c,_=o*r,p=o*a,g=o*c,M=this.elements;return M[3*0+0]=1-(f+m),M[3*0+1]=h-g,M[3*0+2]=u+p,M[3*1+0]=h+g,M[3*1+1]=1-(l+m),M[3*1+2]=d-_,M[3*2+0]=u-p,M[3*2+1]=d+_,M[3*2+2]=1-(l+f),this}transpose(t){t===void 0&&(t=new oi);const e=this.elements,n=t.elements;let i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}}const B_=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class y{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new y);const n=t.x,i=t.y,o=t.z,r=this.x,a=this.y,c=this.z;return e.x=a*o-c*i,e.y=c*n-r*o,e.z=r*i-a*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new y(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new y(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new oi([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){const o=1/i;this.x*=o,this.y*=o,this.z*=o}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new y);const e=this.x,n=this.y,i=this.z;let o=Math.sqrt(e*e+n*n+i*i);return o>0?(o=1/o,t.x=e*o,t.y=n*o,t.z=i*o):(t.x=1,t.y=0,t.z=0),t}length(){const t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){const e=this.x,n=this.y,i=this.z,o=t.x,r=t.y,a=t.z;return Math.sqrt((o-e)*(o-e)+(r-n)*(r-n)+(a-i)*(a-i))}distanceSquared(t){const e=this.x,n=this.y,i=this.z,o=t.x,r=t.y,a=t.z;return(o-e)*(o-e)+(r-n)*(r-n)+(a-i)*(a-i)}scale(t,e){e===void 0&&(e=new y);const n=this.x,i=this.y,o=this.z;return e.x=t*n,e.y=t*i,e.z=t*o,e}vmul(t,e){return e===void 0&&(e=new y),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new y),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new y),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){const n=this.length();if(n>0){const i=H_,o=1/n;i.set(this.x*o,this.y*o,this.z*o);const r=G_;Math.abs(i.x)<.9?(r.set(1,0,0),i.cross(r,t)):(r.set(0,1,0),i.cross(r,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){const i=this.x,o=this.y,r=this.z;n.x=i+(t.x-i)*e,n.y=o+(t.y-o)*e,n.z=r+(t.z-r)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(Uh),Uh.almostEquals(t,e)}clone(){return new y(this.x,this.y,this.z)}}y.ZERO=new y(0,0,0);y.UNIT_X=new y(1,0,0);y.UNIT_Y=new y(0,1,0);y.UNIT_Z=new y(0,0,1);const H_=new y,G_=new y,Uh=new y;class Un{constructor(t){t===void 0&&(t={}),this.lowerBound=new y,this.upperBound=new y,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){const o=this.lowerBound,r=this.upperBound,a=n;o.copy(t[0]),a&&a.vmult(o,o),r.copy(o);for(let c=1;c<t.length;c++){let l=t[c];a&&(a.vmult(l,zh),l=zh),l.x>r.x&&(r.x=l.x),l.x<o.x&&(o.x=l.x),l.y>r.y&&(r.y=l.y),l.y<o.y&&(o.y=l.y),l.z>r.z&&(r.z=l.z),l.z<o.z&&(o.z=l.z)}return e&&(e.vadd(o,o),e.vadd(r,r)),i&&(o.x-=i,o.y-=i,o.z-=i,r.x+=i,r.y+=i,r.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new Un().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,o=t.upperBound,r=i.x<=n.x&&n.x<=o.x||e.x<=o.x&&o.x<=n.x,a=i.y<=n.y&&n.y<=o.y||e.y<=o.y&&o.y<=n.y,c=i.z<=n.z&&n.z<=o.z||e.z<=o.z&&o.z<=n.z;return r&&a&&c}volume(){const t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,o=t.upperBound;return e.x<=i.x&&n.x>=o.x&&e.y<=i.y&&n.y>=o.y&&e.z<=i.z&&n.z>=o.z}getCorners(t,e,n,i,o,r,a,c){const l=this.lowerBound,h=this.upperBound;t.copy(l),e.set(h.x,l.y,l.z),n.set(h.x,h.y,l.z),i.set(l.x,h.y,h.z),o.set(h.x,l.y,h.z),r.set(l.x,h.y,l.z),a.set(l.x,l.y,h.z),c.copy(h)}toLocalFrame(t,e){const n=Fh,i=n[0],o=n[1],r=n[2],a=n[3],c=n[4],l=n[5],h=n[6],u=n[7];this.getCorners(i,o,r,a,c,l,h,u);for(let f=0;f!==8;f++){const d=n[f];t.pointToLocal(d,d)}return e.setFromPoints(n)}toWorldFrame(t,e){const n=Fh,i=n[0],o=n[1],r=n[2],a=n[3],c=n[4],l=n[5],h=n[6],u=n[7];this.getCorners(i,o,r,a,c,l,h,u);for(let f=0;f!==8;f++){const d=n[f];t.pointToWorld(d,d)}return e.setFromPoints(n)}overlapsRay(t){const{direction:e,from:n}=t,i=1/e.x,o=1/e.y,r=1/e.z,a=(this.lowerBound.x-n.x)*i,c=(this.upperBound.x-n.x)*i,l=(this.lowerBound.y-n.y)*o,h=(this.upperBound.y-n.y)*o,u=(this.lowerBound.z-n.z)*r,f=(this.upperBound.z-n.z)*r,d=Math.max(Math.max(Math.min(a,c),Math.min(l,h)),Math.min(u,f)),m=Math.min(Math.min(Math.max(a,c),Math.max(l,h)),Math.max(u,f));return!(m<0||d>m)}}const zh=new y,Fh=[new y,new y,new y,new y,new y,new y,new y,new y];class kh{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){const o=i;i=n,n=o}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:o}=e;if(o>i){const r=o;o=i,i=r}this.matrix[(i*(i+1)>>1)+o-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}}class Rf{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;const n=this._listeners;if(n[t]===void 0)return this;const i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;const n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,o=n.length;i<o;i++)n[i].call(this,t)}return this}}class Ke{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){const n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new y),this.normalize();const e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){const n=V_,i=W_;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{const n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new Ke);const n=this.x,i=this.y,o=this.z,r=this.w,a=t.x,c=t.y,l=t.z,h=t.w;return e.x=n*h+r*a+i*l-o*c,e.y=i*h+r*c+o*a-n*l,e.z=o*h+r*l+n*c-i*a,e.w=r*h-n*a-i*c-o*l,e}inverse(t){t===void 0&&(t=new Ke);const e=this.x,n=this.y,i=this.z,o=this.w;this.conjugate(t);const r=1/(e*e+n*n+i*i+o*o);return t.x*=r,t.y*=r,t.z*=r,t.w*=r,t}conjugate(t){return t===void 0&&(t=new Ke),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){const t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new y);const n=t.x,i=t.y,o=t.z,r=this.x,a=this.y,c=this.z,l=this.w,h=l*n+a*o-c*i,u=l*i+c*n-r*o,f=l*o+r*i-a*n,d=-r*n-a*i-c*o;return e.x=h*l+d*-r+u*-c-f*-a,e.y=u*l+d*-a+f*-r-h*-c,e.z=f*l+d*-c+h*-a-u*-r,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,o;const r=this.x,a=this.y,c=this.z,l=this.w;switch(e){case"YZX":const h=r*a+c*l;if(h>.499&&(n=2*Math.atan2(r,l),i=Math.PI/2,o=0),h<-.499&&(n=-2*Math.atan2(r,l),i=-Math.PI/2,o=0),n===void 0){const u=r*r,f=a*a,d=c*c;n=Math.atan2(2*a*l-2*r*c,1-2*f-2*d),i=Math.asin(2*h),o=Math.atan2(2*r*l-2*a*c,1-2*u-2*d)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=o}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");const o=Math.cos(t/2),r=Math.cos(e/2),a=Math.cos(n/2),c=Math.sin(t/2),l=Math.sin(e/2),h=Math.sin(n/2);return i==="XYZ"?(this.x=c*r*a+o*l*h,this.y=o*l*a-c*r*h,this.z=o*r*h+c*l*a,this.w=o*r*a-c*l*h):i==="YXZ"?(this.x=c*r*a+o*l*h,this.y=o*l*a-c*r*h,this.z=o*r*h-c*l*a,this.w=o*r*a+c*l*h):i==="ZXY"?(this.x=c*r*a-o*l*h,this.y=o*l*a+c*r*h,this.z=o*r*h+c*l*a,this.w=o*r*a-c*l*h):i==="ZYX"?(this.x=c*r*a-o*l*h,this.y=o*l*a+c*r*h,this.z=o*r*h-c*l*a,this.w=o*r*a+c*l*h):i==="YZX"?(this.x=c*r*a+o*l*h,this.y=o*l*a+c*r*h,this.z=o*r*h-c*l*a,this.w=o*r*a-c*l*h):i==="XZY"&&(this.x=c*r*a-o*l*h,this.y=o*l*a-c*r*h,this.z=o*r*h+c*l*a,this.w=o*r*a+c*l*h),this}clone(){return new Ke(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new Ke);const i=this.x,o=this.y,r=this.z,a=this.w;let c=t.x,l=t.y,h=t.z,u=t.w,f,d,m,_,p;return d=i*c+o*l+r*h+a*u,d<0&&(d=-d,c=-c,l=-l,h=-h,u=-u),1-d>1e-6?(f=Math.acos(d),m=Math.sin(f),_=Math.sin((1-e)*f)/m,p=Math.sin(e*f)/m):(_=1-e,p=e),n.x=_*i+p*c,n.y=_*o+p*l,n.z=_*r+p*h,n.w=_*a+p*u,n}integrate(t,e,n,i){i===void 0&&(i=new Ke);const o=t.x*n.x,r=t.y*n.y,a=t.z*n.z,c=this.x,l=this.y,h=this.z,u=this.w,f=e*.5;return i.x+=f*(o*u+r*h-a*l),i.y+=f*(r*u+a*c-o*h),i.z+=f*(a*u+o*l-r*c),i.w+=f*(-o*c-r*l-a*h),i}}const V_=new y,W_=new y,X_={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class zt{constructor(t){t===void 0&&(t={}),this.id=zt.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}zt.idCounter=0;zt.types=X_;class pe{constructor(t){t===void 0&&(t={}),this.position=new y,this.quaternion=new Ke,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return pe.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return pe.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new y),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new y),n.vsub(t,i),e.conjugate(Oh),Oh.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new y),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new y),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new y),e.w*=-1,e.vmult(n,i),e.w*=-1,i}}const Oh=new Ke;class xo extends zt{constructor(t){t===void 0&&(t={});const{vertices:e=[],faces:n=[],normals:i=[],axes:o,boundingSphereRadius:r}=t;super({type:zt.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),r?this.boundingSphereRadius=r:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=o?o.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;const i=new y;for(let o=0;o!==t.length;o++){const r=t[o],a=r.length;for(let c=0;c!==a;c++){const l=(c+1)%a;e[r[c]].vsub(e[r[l]],i),i.normalize();let h=!1;for(let u=0;u!==n.length;u++)if(n[u].almostEquals(i)||n[u].almostEquals(i)){h=!0;break}h||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);const e=this.faceNormals[t]||new y;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;const n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){const n=this.faces[t],i=this.vertices[n[0]],o=this.vertices[n[1]],r=this.vertices[n[2]];xo.computeNormal(i,o,r,e)}static computeNormal(t,e,n,i){const o=new y,r=new y;e.vsub(t,r),n.vsub(e,o),o.cross(r,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,o,r,a,c,l){const h=new y;let u=-1,f=-Number.MAX_VALUE;for(let m=0;m<n.faces.length;m++){h.copy(n.faceNormals[m]),o.vmult(h,h);const _=h.dot(r);_>f&&(f=_,u=m)}const d=[];for(let m=0;m<n.faces[u].length;m++){const _=n.vertices[n.faces[u][m]],p=new y;p.copy(_),o.vmult(p,p),i.vadd(p,p),d.push(p)}u>=0&&this.clipFaceAgainstHull(r,t,e,d,a,c,l)}findSeparatingAxis(t,e,n,i,o,r,a,c){const l=new y,h=new y,u=new y,f=new y,d=new y,m=new y;let _=Number.MAX_VALUE;const p=this;if(p.uniqueAxes)for(let g=0;g!==p.uniqueAxes.length;g++){n.vmult(p.uniqueAxes[g],l);const M=p.testSepAxis(l,t,e,n,i,o);if(M===!1)return!1;M<_&&(_=M,r.copy(l))}else{const g=a?a.length:p.faces.length;for(let M=0;M<g;M++){const E=a?a[M]:M;l.copy(p.faceNormals[E]),n.vmult(l,l);const T=p.testSepAxis(l,t,e,n,i,o);if(T===!1)return!1;T<_&&(_=T,r.copy(l))}}if(t.uniqueAxes)for(let g=0;g!==t.uniqueAxes.length;g++){o.vmult(t.uniqueAxes[g],h);const M=p.testSepAxis(h,t,e,n,i,o);if(M===!1)return!1;M<_&&(_=M,r.copy(h))}else{const g=c?c.length:t.faces.length;for(let M=0;M<g;M++){const E=c?c[M]:M;h.copy(t.faceNormals[E]),o.vmult(h,h);const T=p.testSepAxis(h,t,e,n,i,o);if(T===!1)return!1;T<_&&(_=T,r.copy(h))}}for(let g=0;g!==p.uniqueEdges.length;g++){n.vmult(p.uniqueEdges[g],f);for(let M=0;M!==t.uniqueEdges.length;M++)if(o.vmult(t.uniqueEdges[M],d),f.cross(d,m),!m.almostZero()){m.normalize();const E=p.testSepAxis(m,t,e,n,i,o);if(E===!1)return!1;E<_&&(_=E,r.copy(m))}}return i.vsub(e,u),u.dot(r)>0&&r.negate(r),!0}testSepAxis(t,e,n,i,o,r){const a=this;xo.project(a,t,n,i,Tc),xo.project(e,t,o,r,Ac);const c=Tc[0],l=Tc[1],h=Ac[0],u=Ac[1];if(c<u||h<l)return!1;const f=c-u,d=h-l;return f<d?f:d}calculateLocalInertia(t,e){const n=new y,i=new y;this.computeLocalAABB(i,n);const o=n.x-i.x,r=n.y-i.y,a=n.z-i.z;e.x=1/12*t*(2*r*2*r+2*a*2*a),e.y=1/12*t*(2*o*2*o+2*a*2*a),e.z=1/12*t*(2*r*2*r+2*o*2*o)}getPlaneConstantOfFace(t){const e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,o,r,a){const c=new y,l=new y,h=new y,u=new y,f=new y,d=new y,m=new y,_=new y,p=this,g=[],M=i,E=g;let T=-1,U=Number.MAX_VALUE;for(let x=0;x<p.faces.length;x++){c.copy(p.faceNormals[x]),n.vmult(c,c);const v=c.dot(t);v<U&&(U=v,T=x)}if(T<0)return;const D=p.faces[T];D.connectedFaces=[];for(let x=0;x<p.faces.length;x++)for(let v=0;v<p.faces[x].length;v++)D.indexOf(p.faces[x][v])!==-1&&x!==T&&D.connectedFaces.indexOf(x)===-1&&D.connectedFaces.push(x);const w=D.length;for(let x=0;x<w;x++){const v=p.vertices[D[x]],P=p.vertices[D[(x+1)%w]];v.vsub(P,l),h.copy(l),n.vmult(h,h),e.vadd(h,h),u.copy(this.faceNormals[T]),n.vmult(u,u),e.vadd(u,u),h.cross(u,f),f.negate(f),d.copy(v),n.vmult(d,d),e.vadd(d,d);const b=D.connectedFaces[x];m.copy(this.faceNormals[b]);const S=this.getPlaneConstantOfFace(b);_.copy(m),n.vmult(_,_);const R=S-_.dot(e);for(this.clipFaceAgainstPlane(M,E,_,R);M.length;)M.shift();for(;E.length;)M.push(E.shift())}m.copy(this.faceNormals[T]);const I=this.getPlaneConstantOfFace(T);_.copy(m),n.vmult(_,_);const A=I-_.dot(e);for(let x=0;x<M.length;x++){let v=_.dot(M[x])+A;if(v<=o&&(console.log(`clamped: depth=${v} to minDist=${o}`),v=o),v<=r){const P=M[x];if(v<=1e-6){const b={point:P,normal:_,depth:v};a.push(b)}}}}clipFaceAgainstPlane(t,e,n,i){let o,r;const a=t.length;if(a<2)return e;let c=t[t.length-1],l=t[0];o=n.dot(c)+i;for(let h=0;h<a;h++){if(l=t[h],r=n.dot(l)+i,o<0)if(r<0){const u=new y;u.copy(l),e.push(u)}else{const u=new y;c.lerp(l,o/(o-r),u),e.push(u)}else if(r<0){const u=new y;c.lerp(l,o/(o-r),u),e.push(u),e.push(l)}c=l,o=r}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new y);const n=this.vertices,i=this.worldVertices;for(let o=0;o!==this.vertices.length;o++)e.vmult(n[o],i[o]),t.vadd(i[o],i[o]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){const n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){const o=n[i];o.x<t.x?t.x=o.x:o.x>e.x&&(e.x=o.x),o.y<t.y?t.y=o.y:o.y>e.y&&(e.y=o.y),o.z<t.z?t.z=o.z:o.z>e.z&&(e.z=o.z)}}computeWorldFaceNormals(t){const e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new y);const n=this.faceNormals,i=this.worldFaceNormals;for(let o=0;o!==e;o++)t.vmult(n[o],i[o]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0;const e=this.vertices;for(let n=0;n!==e.length;n++){const i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){const o=this.vertices;let r,a,c,l,h,u,f=new y;for(let d=0;d<o.length;d++){f.copy(o[d]),e.vmult(f,f),t.vadd(f,f);const m=f;(r===void 0||m.x<r)&&(r=m.x),(l===void 0||m.x>l)&&(l=m.x),(a===void 0||m.y<a)&&(a=m.y),(h===void 0||m.y>h)&&(h=m.y),(c===void 0||m.z<c)&&(c=m.z),(u===void 0||m.z>u)&&(u=m.z)}n.set(r,a,c),i.set(l,h,u)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new y);const e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){const n=this.vertices.length,i=this.vertices;if(e){for(let o=0;o<n;o++){const r=i[o];e.vmult(r,r)}for(let o=0;o<this.faceNormals.length;o++){const r=this.faceNormals[o];e.vmult(r,r)}}if(t)for(let o=0;o<n;o++){const r=i[o];r.vadd(t,r)}}pointIsInside(t){const e=this.vertices,n=this.faces,i=this.faceNormals,o=new y;this.getAveragePointLocal(o);for(let r=0;r<this.faces.length;r++){let a=i[r];const c=e[n[r][0]],l=new y;t.vsub(c,l);const h=a.dot(l),u=new y;o.vsub(c,u);const f=a.dot(u);if(h<0&&f>0||h>0&&f<0)return!1}return-1}static project(t,e,n,i,o){const r=t.vertices.length,a=q_;let c=0,l=0;const h=Y_,u=t.vertices;h.setZero(),pe.vectorToLocalFrame(n,i,e,a),pe.pointToLocalFrame(n,i,h,h);const f=h.dot(a);l=c=u[0].dot(a);for(let d=1;d<r;d++){const m=u[d].dot(a);m>c&&(c=m),m<l&&(l=m)}if(l-=f,c-=f,l>c){const d=l;l=c,c=d}o[0]=c,o[1]=l}}const Tc=[],Ac=[];new y;const q_=new y,Y_=new y;class We extends zt{constructor(t){super({type:zt.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=y,o=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],r=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],c=new xo({vertices:o,faces:r,axes:a});this.convexPolyhedronRepresentation=c,c.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new y),We.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){const i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){const n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let o=0;o!==n.length;o++)e.vmult(n[o],n[o]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){const i=this.halfExtents,o=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let r=0;r<o.length;r++)Qi.set(o[r][0],o[r][1],o[r][2]),e.vmult(Qi,Qi),t.vadd(Qi,Qi),n(Qi.x,Qi.y,Qi.z)}calculateWorldAABB(t,e,n,i){const o=this.halfExtents;ci[0].set(o.x,o.y,o.z),ci[1].set(-o.x,o.y,o.z),ci[2].set(-o.x,-o.y,o.z),ci[3].set(-o.x,-o.y,-o.z),ci[4].set(o.x,-o.y,-o.z),ci[5].set(o.x,o.y,-o.z),ci[6].set(-o.x,o.y,-o.z),ci[7].set(o.x,-o.y,o.z);const r=ci[0];e.vmult(r,r),t.vadd(r,r),i.copy(r),n.copy(r);for(let a=1;a<8;a++){const c=ci[a];e.vmult(c,c),t.vadd(c,c);const l=c.x,h=c.y,u=c.z;l>i.x&&(i.x=l),h>i.y&&(i.y=h),u>i.z&&(i.z=u),l<n.x&&(n.x=l),h<n.y&&(n.y=h),u<n.z&&(n.z=u)}}}const Qi=new y,ci=[new y,new y,new y,new y,new y,new y,new y,new y],xu={DYNAMIC:1,STATIC:2,KINEMATIC:4},_u={AWAKE:0,SLEEPY:1,SLEEPING:2};class gt extends Rf{constructor(t){t===void 0&&(t={}),super(),this.id=gt.idCounter++,this.index=-1,this.world=null,this.vlambda=new y,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new y,this.previousPosition=new y,this.interpolatedPosition=new y,this.initPosition=new y,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new y,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new y,this.force=new y;const e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?gt.STATIC:gt.DYNAMIC,typeof t.type==typeof gt.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=gt.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new y,this.quaternion=new Ke,this.initQuaternion=new Ke,this.previousQuaternion=new Ke,this.interpolatedQuaternion=new Ke,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new y,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new y,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new y,this.invInertia=new y,this.invInertiaWorld=new oi,this.invMassSolve=0,this.invInertiaSolve=new y,this.invInertiaWorldSolve=new oi,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new y(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new y(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new Un,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new y,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){const t=this.sleepState;this.sleepState=gt.AWAKE,this.wakeUpAfterNarrowphase=!1,t===gt.SLEEPING&&this.dispatchEvent(gt.wakeupEvent)}sleep(){this.sleepState=gt.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){const e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===gt.AWAKE&&n<i?(this.sleepState=gt.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(gt.sleepyEvent)):e===gt.SLEEPY&&n>i?this.wakeUp():e===gt.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(gt.sleepEvent))}}updateSolveMassProperties(){this.sleepState===gt.SLEEPING||this.type===gt.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new y),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new y),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new y),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new y),this.quaternion.vmult(t,e),e}addShape(t,e,n){const i=new y,o=new Ke;return e&&i.copy(e),n&&o.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(o),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){const e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){const t=this.shapes,e=this.shapeOffsets,n=t.length;let i=0;for(let o=0;o!==n;o++){const r=t[o];r.updateBoundingSphereRadius();const a=e[o].length(),c=r.boundingSphereRadius;a+c>i&&(i=a+c)}this.boundingRadius=i}updateAABB(){const t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,o=K_,r=j_,a=this.quaternion,c=this.aabb,l=Z_;for(let h=0;h!==i;h++){const u=t[h];a.vmult(e[h],o),o.vadd(this.position,o),a.mult(n[h],r),u.calculateWorldAABB(o,r,l.lowerBound,l.upperBound),h===0?c.copy(l):c.extend(l)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){const e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){const n=$_,i=J_;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new y),this.type!==gt.DYNAMIC)return;this.sleepState===gt.SLEEPING&&this.wakeUp();const n=Q_;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new y),this.type!==gt.DYNAMIC)return;const n=ty,i=ey;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===gt.DYNAMIC&&(this.sleepState===gt.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new y),this.type!==gt.DYNAMIC)return;this.sleepState===gt.SLEEPING&&this.wakeUp();const n=e,i=ny;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);const o=iy;n.cross(t,o),this.invInertiaWorld.vmult(o,o),this.angularVelocity.vadd(o,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new y),this.type!==gt.DYNAMIC)return;const n=sy,i=oy;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){const t=ry;this.invMass=this.mass>0?1/this.mass:0;const e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),We.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){const n=new y;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===gt.DYNAMIC||this.type===gt.KINEMATIC)||this.sleepState===gt.SLEEPING)return;const i=this.velocity,o=this.angularVelocity,r=this.position,a=this.force,c=this.torque,l=this.quaternion,h=this.invMass,u=this.invInertiaWorld,f=this.linearFactor,d=h*t;i.x+=a.x*d*f.x,i.y+=a.y*d*f.y,i.z+=a.z*d*f.z;const m=u.elements,_=this.angularFactor,p=c.x*_.x,g=c.y*_.y,M=c.z*_.z;o.x+=t*(m[0]*p+m[1]*g+m[2]*M),o.y+=t*(m[3]*p+m[4]*g+m[5]*M),o.z+=t*(m[6]*p+m[7]*g+m[8]*M),r.x+=i.x*t,r.y+=i.y*t,r.z+=i.z*t,l.integrate(this.angularVelocity,t,this.angularFactor,l),e&&(n?l.normalizeFast():l.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}gt.idCounter=0;gt.COLLIDE_EVENT_NAME="collide";gt.DYNAMIC=xu.DYNAMIC;gt.STATIC=xu.STATIC;gt.KINEMATIC=xu.KINEMATIC;gt.AWAKE=_u.AWAKE;gt.SLEEPY=_u.SLEEPY;gt.SLEEPING=_u.SLEEPING;gt.wakeupEvent={type:"wakeup"};gt.sleepyEvent={type:"sleepy"};gt.sleepEvent={type:"sleep"};const K_=new y,j_=new Ke,Z_=new Un,$_=new oi,J_=new oi;new oi;const Q_=new y,ty=new y,ey=new y,ny=new y,iy=new y,sy=new y,oy=new y,ry=new y;class ay{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!(!(t.collisionFilterGroup&e.collisionFilterMask)||!(e.collisionFilterGroup&t.collisionFilterMask)||(t.type&gt.STATIC||t.sleepState===gt.SLEEPING)&&(e.type&gt.STATIC||e.sleepState===gt.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){const o=cy;e.position.vsub(t.position,o);const r=(t.boundingRadius+e.boundingRadius)**2;o.lengthSquared()<r&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){const n=ly,i=uy,o=hy,r=t.length;for(let a=0;a!==r;a++)i[a]=t[a],o[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==r;a++){const c=i[a].id,l=o[a].id,h=c<l?`${c},${l}`:`${l},${c}`;n[h]=a,n.keys.push(h)}for(let a=0;a!==n.keys.length;a++){const c=n.keys.pop(),l=n[c];t.push(i[l]),e.push(o[l]),delete n[c]}}setWorld(t){}static boundingSphereCheck(t,e){const n=new y;t.position.vsub(e.position,n);const i=t.shapes[0],o=e.shapes[0];return Math.pow(i.boundingSphereRadius+o.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const cy=new y;new y;new Ke;new y;const ly={keys:[]},uy=[],hy=[];new y;new y;new y;class Pf extends ay{constructor(){super()}collisionPairs(t,e,n){const i=t.bodies,o=i.length;let r,a;for(let c=0;c!==o;c++)for(let l=0;l!==c;l++)r=i[c],a=i[l],this.needBroadphaseCollision(r,a)&&this.intersectionTest(r,a,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){const o=t.bodies[i];o.aabbNeedsUpdate&&o.updateAABB(),o.aabb.overlaps(e)&&n.push(o)}return n}}class hr{constructor(){this.rayFromWorld=new y,this.rayToWorld=new y,this.hitNormalWorld=new y,this.hitPointWorld=new y,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,o,r,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=o,this.body=r,this.distance=a}}let If,Lf,Df,Nf,Uf,zf,Ff;const yu={CLOSEST:1,ANY:2,ALL:4};If=zt.types.SPHERE;Lf=zt.types.PLANE;Df=zt.types.BOX;Nf=zt.types.CYLINDER;Uf=zt.types.CONVEXPOLYHEDRON;zf=zt.types.HEIGHTFIELD;Ff=zt.types.TRIMESH;class Xe{get[If](){return this._intersectSphere}get[Lf](){return this._intersectPlane}get[Df](){return this._intersectBox}get[Nf](){return this._intersectConvex}get[Uf](){return this._intersectConvex}get[zf](){return this._intersectHeightfield}get[Ff](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new y),e===void 0&&(e=new y),this.from=t.clone(),this.to=e.clone(),this.direction=new y,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=Xe.ANY,this.result=new hr,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||Xe.ANY,this.result=e.result||new hr,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(Bh),Cc.length=0,t.broadphase.aabbQuery(t,Bh,Cc),this.intersectBodies(Cc),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());const n=this.checkCollisionResponse;if(n&&!t.collisionResponse||!(this.collisionFilterGroup&t.collisionFilterMask)||!(t.collisionFilterGroup&this.collisionFilterMask))return;const i=dy,o=fy;for(let r=0,a=t.shapes.length;r<a;r++){const c=t.shapes[r];if(!(n&&!c.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[r],o),t.quaternion.vmult(t.shapeOffsets[r],i),i.vadd(t.position,i),this.intersectShape(c,o,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){const o=this.from;if(Ay(o,this.direction,n)>t.boundingSphereRadius)return;const a=this[t.type];a&&a.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,o){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,o)}_intersectPlane(t,e,n,i,o){const r=this.from,a=this.to,c=this.direction,l=new y(0,0,1);e.vmult(l,l);const h=new y;r.vsub(n,h);const u=h.dot(l);a.vsub(n,h);const f=h.dot(l);if(u*f>0||r.distanceTo(a)<u)return;const d=l.dot(c);if(Math.abs(d)<this.precision)return;const m=new y,_=new y,p=new y;r.vsub(n,m);const g=-l.dot(m)/d;c.scale(g,_),r.vadd(_,p),this.reportIntersection(l,p,o,i,-1)}getAABB(t){const{lowerBound:e,upperBound:n}=t,i=this.to,o=this.from;e.x=Math.min(i.x,o.x),e.y=Math.min(i.y,o.y),e.z=Math.min(i.z,o.z),n.x=Math.max(i.x,o.x),n.y=Math.max(i.y,o.y),n.z=Math.max(i.z,o.z)}_intersectHeightfield(t,e,n,i,o){t.data,t.elementSize;const r=py;r.from.copy(this.from),r.to.copy(this.to),pe.pointToLocalFrame(n,e,r.from,r.from),pe.pointToLocalFrame(n,e,r.to,r.to),r.updateDirection();const a=my;let c,l,h,u;c=l=0,h=u=t.data.length-1;const f=new Un;r.getAABB(f),t.getIndexOfPosition(f.lowerBound.x,f.lowerBound.y,a,!0),c=Math.max(c,a[0]),l=Math.max(l,a[1]),t.getIndexOfPosition(f.upperBound.x,f.upperBound.y,a,!0),h=Math.min(h,a[0]+1),u=Math.min(u,a[1]+1);for(let d=c;d<h;d++)for(let m=l;m<u;m++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(d,m,f),!!f.overlapsRay(r)){if(t.getConvexTrianglePillar(d,m,!1),pe.pointToWorldFrame(n,e,t.pillarOffset,Vr),this._intersectConvex(t.pillarConvex,e,Vr,i,o,Hh),this.result.shouldStop)return;t.getConvexTrianglePillar(d,m,!0),pe.pointToWorldFrame(n,e,t.pillarOffset,Vr),this._intersectConvex(t.pillarConvex,e,Vr,i,o,Hh)}}}_intersectSphere(t,e,n,i,o){const r=this.from,a=this.to,c=t.radius,l=(a.x-r.x)**2+(a.y-r.y)**2+(a.z-r.z)**2,h=2*((a.x-r.x)*(r.x-n.x)+(a.y-r.y)*(r.y-n.y)+(a.z-r.z)*(r.z-n.z)),u=(r.x-n.x)**2+(r.y-n.y)**2+(r.z-n.z)**2-c**2,f=h**2-4*l*u,d=gy,m=vy;if(!(f<0))if(f===0)r.lerp(a,f,d),d.vsub(n,m),m.normalize(),this.reportIntersection(m,d,o,i,-1);else{const _=(-h-Math.sqrt(f))/(2*l),p=(-h+Math.sqrt(f))/(2*l);if(_>=0&&_<=1&&(r.lerp(a,_,d),d.vsub(n,m),m.normalize(),this.reportIntersection(m,d,o,i,-1)),this.result.shouldStop)return;p>=0&&p<=1&&(r.lerp(a,p,d),d.vsub(n,m),m.normalize(),this.reportIntersection(m,d,o,i,-1))}}_intersectConvex(t,e,n,i,o,r){const a=xy,c=Gh,l=r&&r.faceList||null,h=t.faces,u=t.vertices,f=t.faceNormals,d=this.direction,m=this.from,_=this.to,p=m.distanceTo(_),g=l?l.length:h.length,M=this.result;for(let E=0;!M.shouldStop&&E<g;E++){const T=l?l[E]:E,U=h[T],D=f[T],w=e,I=n;c.copy(u[U[0]]),w.vmult(c,c),c.vadd(I,c),c.vsub(m,c),w.vmult(D,a);const A=d.dot(a);if(Math.abs(A)<this.precision)continue;const x=a.dot(c)/A;if(!(x<0)){d.scale(x,bn),bn.vadd(m,bn),Jn.copy(u[U[0]]),w.vmult(Jn,Jn),I.vadd(Jn,Jn);for(let v=1;!M.shouldStop&&v<U.length-1;v++){li.copy(u[U[v]]),ui.copy(u[U[v+1]]),w.vmult(li,li),w.vmult(ui,ui),I.vadd(li,li),I.vadd(ui,ui);const P=bn.distanceTo(m);!(Xe.pointInTriangle(bn,Jn,li,ui)||Xe.pointInTriangle(bn,li,Jn,ui))||P>p||this.reportIntersection(a,bn,o,i,T)}}}}_intersectTrimesh(t,e,n,i,o,r){const a=_y,c=by,l=Ty,h=Gh,u=yy,f=My,d=wy,m=Ey,_=Sy,p=t.indices;t.vertices;const g=this.from,M=this.to,E=this.direction;l.position.copy(n),l.quaternion.copy(e),pe.vectorToLocalFrame(n,e,E,u),pe.pointToLocalFrame(n,e,g,f),pe.pointToLocalFrame(n,e,M,d),d.x*=t.scale.x,d.y*=t.scale.y,d.z*=t.scale.z,f.x*=t.scale.x,f.y*=t.scale.y,f.z*=t.scale.z,d.vsub(f,u),u.normalize();const T=f.distanceSquared(d);t.tree.rayQuery(this,l,c);for(let U=0,D=c.length;!this.result.shouldStop&&U!==D;U++){const w=c[U];t.getNormal(w,a),t.getVertex(p[w*3],Jn),Jn.vsub(f,h);const I=u.dot(a),A=a.dot(h)/I;if(A<0)continue;u.scale(A,bn),bn.vadd(f,bn),t.getVertex(p[w*3+1],li),t.getVertex(p[w*3+2],ui);const x=bn.distanceSquared(f);!(Xe.pointInTriangle(bn,li,Jn,ui)||Xe.pointInTriangle(bn,Jn,li,ui))||x>T||(pe.vectorToWorldFrame(e,a,_),pe.pointToWorldFrame(n,e,bn,m),this.reportIntersection(_,m,o,i,w))}c.length=0}reportIntersection(t,e,n,i,o){const r=this.from,a=this.to,c=r.distanceTo(e),l=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(l.hitFaceIndex=typeof o<"u"?o:-1,this.mode){case Xe.ALL:this.hasHit=!0,l.set(r,a,t,e,n,i,c),l.hasHit=!0,this.callback(l);break;case Xe.CLOSEST:(c<l.distance||!l.hasHit)&&(this.hasHit=!0,l.hasHit=!0,l.set(r,a,t,e,n,i,c));break;case Xe.ANY:this.hasHit=!0,l.hasHit=!0,l.set(r,a,t,e,n,i,c),l.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,Ts),n.vsub(e,Yo),t.vsub(e,Rc);const o=Ts.dot(Ts),r=Ts.dot(Yo),a=Ts.dot(Rc),c=Yo.dot(Yo),l=Yo.dot(Rc);let h,u;return(h=c*a-r*l)>=0&&(u=o*l-r*a)>=0&&h+u<o*c-r*r}}Xe.CLOSEST=yu.CLOSEST;Xe.ANY=yu.ANY;Xe.ALL=yu.ALL;const Bh=new Un,Cc=[],Yo=new y,Rc=new y,dy=new y,fy=new Ke,bn=new y,Jn=new y,li=new y,ui=new y;new y;new hr;const Hh={faceList:[0]},Vr=new y,py=new Xe,my=[],gy=new y,vy=new y,xy=new y;new y;new y;const Gh=new y,_y=new y,yy=new y,My=new y,wy=new y,Sy=new y,Ey=new y;new Un;const by=[],Ty=new pe,Ts=new y,Wr=new y;function Ay(s,t,e){e.vsub(s,Ts);const n=Ts.dot(t);return t.scale(n,Wr),Wr.vadd(s,Wr),e.distanceTo(Wr)}class kf{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}}class ka{constructor(t,e,n){n===void 0&&(n={}),n=kf.defaults(n,{collideConnected:!0,wakeUpBodies:!0}),this.equations=[],this.bodyA=t,this.bodyB=e,this.id=ka.idCounter++,this.collideConnected=n.collideConnected,n.wakeUpBodies&&(t&&t.wakeUp(),e&&e.wakeUp())}update(){throw new Error("method update() not implmemented in this Constraint subclass!")}enable(){const t=this.equations;for(let e=0;e<t.length;e++)t[e].enabled=!0}disable(){const t=this.equations;for(let e=0;e<t.length;e++)t[e].enabled=!1}}ka.idCounter=0;class Vh{constructor(){this.spatial=new y,this.rotational=new y}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}}class Fs{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=Fs.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new Vh,this.jacobianElementB=new Vh,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){const i=e,o=t,r=n;this.a=4/(r*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(r*r*o*(1+4*i))}computeB(t,e,n){const i=this.computeGW(),o=this.computeGq(),r=this.computeGiMf();return-o*t-i*e-r*n}computeGq(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.position,r=i.position;return t.spatial.dot(o)+e.spatial.dot(r)}computeGW(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.velocity,r=i.velocity,a=n.angularVelocity,c=i.angularVelocity;return t.multiplyVectors(o,a)+e.multiplyVectors(r,c)}computeGWlambda(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.vlambda,r=i.vlambda,a=n.wlambda,c=i.wlambda;return t.multiplyVectors(o,a)+e.multiplyVectors(r,c)}computeGiMf(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.force,r=n.torque,a=i.force,c=i.torque,l=n.invMassSolve,h=i.invMassSolve;return o.scale(l,Wh),a.scale(h,Xh),n.invInertiaWorldSolve.vmult(r,qh),i.invInertiaWorldSolve.vmult(c,Yh),t.multiplyVectors(Wh,qh)+e.multiplyVectors(Xh,Yh)}computeGiMGt(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.invMassSolve,r=i.invMassSolve,a=n.invInertiaWorldSolve,c=i.invInertiaWorldSolve;let l=o+r;return a.vmult(t.rotational,Xr),l+=Xr.dot(t.rotational),c.vmult(e.rotational,Xr),l+=Xr.dot(e.rotational),l}addToWlambda(t){const e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,o=this.bj,r=Cy;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),o.vlambda.addScaledVector(o.invMassSolve*t,n.spatial,o.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,r),i.wlambda.addScaledVector(t,r,i.wlambda),o.invInertiaWorldSolve.vmult(n.rotational,r),o.wlambda.addScaledVector(t,r,o.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}Fs.idCounter=0;const Wh=new y,Xh=new y,qh=new y,Yh=new y,Xr=new y,Cy=new y;class da extends Fs{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new y,this.rj=new y,this.ni=new y}computeB(t){const e=this.a,n=this.b,i=this.bi,o=this.bj,r=this.ri,a=this.rj,c=Ry,l=Py,h=i.velocity,u=i.angularVelocity;i.force,i.torque;const f=o.velocity,d=o.angularVelocity;o.force,o.torque;const m=Iy,_=this.jacobianElementA,p=this.jacobianElementB,g=this.ni;r.cross(g,c),a.cross(g,l),g.negate(_.spatial),c.negate(_.rotational),p.spatial.copy(g),p.rotational.copy(l),m.copy(o.position),m.vadd(a,m),m.vsub(i.position,m),m.vsub(r,m);const M=g.dot(m),E=this.restitution+1,T=E*f.dot(g)-E*h.dot(g)+d.dot(l)-u.dot(c),U=this.computeGiMf();return-M*e-T*n-t*U}getImpactVelocityAlongNormal(){const t=Ly,e=Dy,n=Ny,i=Uy,o=zy;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,o),this.ni.dot(o)}}const Ry=new y,Py=new y,Iy=new y,Ly=new y,Dy=new y,Ny=new y,Uy=new y,zy=new y;class Of extends ka{constructor(t,e,n,i,o){e===void 0&&(e=new y),i===void 0&&(i=new y),o===void 0&&(o=1e6),super(t,n),this.pivotA=e.clone(),this.pivotB=i.clone();const r=this.equationX=new da(t,n),a=this.equationY=new da(t,n),c=this.equationZ=new da(t,n);this.equations.push(r,a,c),r.minForce=a.minForce=c.minForce=-o,r.maxForce=a.maxForce=c.maxForce=o,r.ni.set(1,0,0),a.ni.set(0,1,0),c.ni.set(0,0,1)}update(){const t=this.bodyA,e=this.bodyB,n=this.equationX,i=this.equationY,o=this.equationZ;t.quaternion.vmult(this.pivotA,n.ri),e.quaternion.vmult(this.pivotB,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),o.ri.copy(n.ri),o.rj.copy(n.rj)}}class Fy extends Fs{constructor(t,e,n){n===void 0&&(n={});const i=typeof n.maxForce<"u"?n.maxForce:1e6;super(t,e,-i,i),this.axisA=n.axisA?n.axisA.clone():new y(1,0,0),this.axisB=n.axisB?n.axisB.clone():new y(0,1,0),this.angle=typeof n.angle<"u"?n.angle:0}computeB(t){const e=this.a,n=this.b,i=this.axisA,o=this.axisB,r=ky,a=Oy,c=this.jacobianElementA,l=this.jacobianElementB;i.cross(o,r),o.cross(i,a),c.rotational.copy(a),l.rotational.copy(r);const h=Math.cos(this.angle)-i.dot(o),u=this.computeGW(),f=this.computeGiMf();return-h*e-u*n-t*f}}const ky=new y,Oy=new y;class By extends Fs{constructor(t,e,n){n===void 0&&(n={});const i=typeof n.maxForce<"u"?n.maxForce:1e6;super(t,e,-i,i),this.axisA=n.axisA?n.axisA.clone():new y(1,0,0),this.axisB=n.axisB?n.axisB.clone():new y(0,1,0),this.maxAngle=Math.PI/2}computeB(t){const e=this.a,n=this.b,i=this.axisA,o=this.axisB,r=Hy,a=Gy,c=this.jacobianElementA,l=this.jacobianElementB;i.cross(o,r),o.cross(i,a),c.rotational.copy(a),l.rotational.copy(r);const h=Math.cos(this.maxAngle)-i.dot(o),u=this.computeGW(),f=this.computeGiMf();return-h*e-u*n-t*f}}const Hy=new y,Gy=new y;class Vy extends Of{constructor(t,e,n){n===void 0&&(n={});const i=typeof n.maxForce<"u"?n.maxForce:1e6,o=n.pivotA?n.pivotA.clone():new y,r=n.pivotB?n.pivotB.clone():new y;super(t,o,e,r,i),this.axisA=n.axisA?n.axisA.clone():new y,this.axisB=n.axisB?n.axisB.clone():new y,this.collideConnected=!!n.collideConnected,this.angle=typeof n.angle<"u"?n.angle:0;const a=this.coneEquation=new Fy(t,e,n),c=this.twistEquation=new By(t,e,n);this.twistAngle=typeof n.twistAngle<"u"?n.twistAngle:0,a.maxForce=0,a.minForce=-i,c.maxForce=0,c.minForce=-i,this.equations.push(a,c)}update(){const t=this.bodyA,e=this.bodyB,n=this.coneEquation,i=this.twistEquation;super.update(),t.vectorToWorldFrame(this.axisA,n.axisA),e.vectorToWorldFrame(this.axisB,n.axisB),this.axisA.tangents(i.axisA,i.axisA),t.vectorToWorldFrame(i.axisA,i.axisA),this.axisB.tangents(i.axisB,i.axisB),e.vectorToWorldFrame(i.axisB,i.axisB),n.angle=this.angle,i.maxAngle=this.twistAngle}}new y;new y;new y;new y;new y;new y;class Kh extends Fs{constructor(t,e,n){super(t,e,-n,n),this.ri=new y,this.rj=new y,this.t=new y}computeB(t){this.a;const e=this.b;this.bi,this.bj;const n=this.ri,i=this.rj,o=Wy,r=Xy,a=this.t;n.cross(a,o),i.cross(a,r);const c=this.jacobianElementA,l=this.jacobianElementB;a.negate(c.spatial),o.negate(c.rotational),l.spatial.copy(a),l.rotational.copy(r);const h=this.computeGW(),u=this.computeGiMf();return-h*e-t*u}}const Wy=new y,Xy=new y;class Ln{constructor(t,e,n){n=kf.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=Ln.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}}Ln.idCounter=0;class zi{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=zi.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}}zi.idCounter=0;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new Xe;new y;new y;new y;new y(1,0,0),new y(0,1,0),new y(0,0,1);new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;class xi extends zt{constructor(t){if(super({type:zt.types.SPHERE}),this.radius=t!==void 0?t:1,this.radius<0)throw new Error("The sphere radius cannot be negative.");this.updateBoundingSphereRadius()}calculateLocalInertia(t,e){e===void 0&&(e=new y);const n=2*t*this.radius*this.radius/5;return e.x=n,e.y=n,e.z=n,e}volume(){return 4*Math.PI*Math.pow(this.radius,3)/3}updateBoundingSphereRadius(){this.boundingSphereRadius=this.radius}calculateWorldAABB(t,e,n,i){const o=this.radius,r=["x","y","z"];for(let a=0;a<r.length;a++){const c=r[a];n[c]=t[c]-o,i[c]=t[c]+o}}}new y;new y;new y;new y;new y;new y;new y;new y;new y;class qy extends xo{constructor(t,e,n,i){if(t===void 0&&(t=1),e===void 0&&(e=1),n===void 0&&(n=1),i===void 0&&(i=8),t<0)throw new Error("The cylinder radiusTop cannot be negative.");if(e<0)throw new Error("The cylinder radiusBottom cannot be negative.");const o=i,r=[],a=[],c=[],l=[],h=[],u=Math.cos,f=Math.sin;r.push(new y(-e*f(0),-n*.5,e*u(0))),l.push(0),r.push(new y(-t*f(0),n*.5,t*u(0))),h.push(1);for(let m=0;m<o;m++){const _=2*Math.PI/o*(m+1),p=2*Math.PI/o*(m+.5);m<o-1?(r.push(new y(-e*f(_),-n*.5,e*u(_))),l.push(2*m+2),r.push(new y(-t*f(_),n*.5,t*u(_))),h.push(2*m+3),c.push([2*m,2*m+1,2*m+3,2*m+2])):c.push([2*m,2*m+1,1,0]),(o%2===1||m<o/2)&&a.push(new y(-f(p),0,u(p)))}c.push(l),a.push(new y(0,1,0));const d=[];for(let m=0;m<h.length;m++)d.push(h[h.length-m-1]);c.push(d),super({vertices:r,faces:c,axes:a}),this.type=zt.types.CYLINDER,this.radiusTop=t,this.radiusBottom=e,this.height=n,this.numSegments=i}}class Yy extends zt{constructor(){super({type:zt.types.PLANE}),this.worldNormal=new y,this.worldNormalNeedsUpdate=!0,this.boundingSphereRadius=Number.MAX_VALUE}computeWorldNormal(t){const e=this.worldNormal;e.set(0,0,1),t.vmult(e,e),this.worldNormalNeedsUpdate=!1}calculateLocalInertia(t,e){return e===void 0&&(e=new y),e}volume(){return Number.MAX_VALUE}calculateWorldAABB(t,e,n,i){Ai.set(0,0,1),e.vmult(Ai,Ai);const o=Number.MAX_VALUE;n.set(-o,-o,-o),i.set(o,o,o),Ai.x===1?i.x=t.x:Ai.x===-1&&(n.x=t.x),Ai.y===1?i.y=t.y:Ai.y===-1&&(n.y=t.y),Ai.z===1?i.z=t.z:Ai.z===-1&&(n.z=t.z)}updateBoundingSphereRadius(){this.boundingSphereRadius=Number.MAX_VALUE}}const Ai=new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new y;new Un;new y;new Un;new y;new y;new y;new y;new y;new y;new y;new Un;new y;new pe;new Un;class Ky{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){const e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}}class jy extends Ky{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0;const i=this.iterations,o=this.tolerance*this.tolerance,r=this.equations,a=r.length,c=e.bodies,l=c.length,h=t;let u,f,d,m,_,p;if(a!==0)for(let T=0;T!==l;T++)c[T].updateSolveMassProperties();const g=$y,M=Jy,E=Zy;g.length=a,M.length=a,E.length=a;for(let T=0;T!==a;T++){const U=r[T];E[T]=0,M[T]=U.computeB(h),g[T]=1/U.computeC()}if(a!==0){for(let D=0;D!==l;D++){const w=c[D],I=w.vlambda,A=w.wlambda;I.set(0,0,0),A.set(0,0,0)}for(n=0;n!==i;n++){m=0;for(let D=0;D!==a;D++){const w=r[D];u=M[D],f=g[D],p=E[D],_=w.computeGWlambda(),d=f*(u-_-w.eps*p),p+d<w.minForce?d=w.minForce-p:p+d>w.maxForce&&(d=w.maxForce-p),E[D]+=d,m+=d>0?d:-d,w.addToWlambda(d)}if(m*m<o)break}for(let D=0;D!==l;D++){const w=c[D],I=w.velocity,A=w.angularVelocity;w.vlambda.vmul(w.linearFactor,w.vlambda),I.vadd(w.vlambda,I),w.wlambda.vmul(w.angularFactor,w.wlambda),A.vadd(w.wlambda,A)}let T=r.length;const U=1/h;for(;T--;)r[T].multiplier=E[T]*U}return n}}const Zy=[],$y=[],Jy=[];class Qy{constructor(){this.objects=[],this.type=Object}release(){const t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){const e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}}class tM extends Qy{constructor(){super(...arguments),this.type=y}constructObject(){return new y}}const Re={sphereSphere:zt.types.SPHERE,spherePlane:zt.types.SPHERE|zt.types.PLANE,boxBox:zt.types.BOX|zt.types.BOX,sphereBox:zt.types.SPHERE|zt.types.BOX,planeBox:zt.types.PLANE|zt.types.BOX,convexConvex:zt.types.CONVEXPOLYHEDRON,sphereConvex:zt.types.SPHERE|zt.types.CONVEXPOLYHEDRON,planeConvex:zt.types.PLANE|zt.types.CONVEXPOLYHEDRON,boxConvex:zt.types.BOX|zt.types.CONVEXPOLYHEDRON,sphereHeightfield:zt.types.SPHERE|zt.types.HEIGHTFIELD,boxHeightfield:zt.types.BOX|zt.types.HEIGHTFIELD,convexHeightfield:zt.types.CONVEXPOLYHEDRON|zt.types.HEIGHTFIELD,sphereParticle:zt.types.PARTICLE|zt.types.SPHERE,planeParticle:zt.types.PLANE|zt.types.PARTICLE,boxParticle:zt.types.BOX|zt.types.PARTICLE,convexParticle:zt.types.PARTICLE|zt.types.CONVEXPOLYHEDRON,cylinderCylinder:zt.types.CYLINDER,sphereCylinder:zt.types.SPHERE|zt.types.CYLINDER,planeCylinder:zt.types.PLANE|zt.types.CYLINDER,boxCylinder:zt.types.BOX|zt.types.CYLINDER,convexCylinder:zt.types.CONVEXPOLYHEDRON|zt.types.CYLINDER,heightfieldCylinder:zt.types.HEIGHTFIELD|zt.types.CYLINDER,particleCylinder:zt.types.PARTICLE|zt.types.CYLINDER,sphereTrimesh:zt.types.SPHERE|zt.types.TRIMESH,planeTrimesh:zt.types.PLANE|zt.types.TRIMESH};class eM{get[Re.sphereSphere](){return this.sphereSphere}get[Re.spherePlane](){return this.spherePlane}get[Re.boxBox](){return this.boxBox}get[Re.sphereBox](){return this.sphereBox}get[Re.planeBox](){return this.planeBox}get[Re.convexConvex](){return this.convexConvex}get[Re.sphereConvex](){return this.sphereConvex}get[Re.planeConvex](){return this.planeConvex}get[Re.boxConvex](){return this.boxConvex}get[Re.sphereHeightfield](){return this.sphereHeightfield}get[Re.boxHeightfield](){return this.boxHeightfield}get[Re.convexHeightfield](){return this.convexHeightfield}get[Re.sphereParticle](){return this.sphereParticle}get[Re.planeParticle](){return this.planeParticle}get[Re.boxParticle](){return this.boxParticle}get[Re.convexParticle](){return this.convexParticle}get[Re.cylinderCylinder](){return this.convexConvex}get[Re.sphereCylinder](){return this.sphereConvex}get[Re.planeCylinder](){return this.planeConvex}get[Re.boxCylinder](){return this.boxConvex}get[Re.convexCylinder](){return this.convexConvex}get[Re.heightfieldCylinder](){return this.heightfieldCylinder}get[Re.particleCylinder](){return this.particleCylinder}get[Re.sphereTrimesh](){return this.sphereTrimesh}get[Re.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new tM,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,o,r){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new da(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;const c=this.currentContactMaterial;a.restitution=c.restitution,a.setSpookParams(c.contactEquationStiffness,c.contactEquationRelaxation,this.world.dt);const l=n.material||t.material,h=i.material||e.material;return l&&h&&l.restitution>=0&&h.restitution>=0&&(a.restitution=l.restitution*h.restitution),a.si=o||n,a.sj=r||i,a}createFrictionEquationsFromContact(t,e){const n=t.bi,i=t.bj,o=t.si,r=t.sj,a=this.world,c=this.currentContactMaterial;let l=c.friction;const h=o.material||n.material,u=r.material||i.material;if(h&&u&&h.friction>=0&&u.friction>=0&&(l=h.friction*u.friction),l>0){const f=l*(a.frictionGravity||a.gravity).length();let d=n.invMass+i.invMass;d>0&&(d=1/d);const m=this.frictionEquationPool,_=m.length?m.pop():new Kh(n,i,f*d),p=m.length?m.pop():new Kh(n,i,f*d);return _.bi=p.bi=n,_.bj=p.bj=i,_.minForce=p.minForce=-f*d,_.maxForce=p.maxForce=f*d,_.ri.copy(t.ri),_.rj.copy(t.rj),p.ri.copy(t.ri),p.rj.copy(t.rj),t.ni.tangents(_.t,p.t),_.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),p.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),_.enabled=p.enabled=t.enabled,e.push(_,p),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;const n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];xs.setZero(),no.setZero(),io.setZero();const o=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==o?(xs.vadd(e.ni,xs),no.vadd(e.ri,no),io.vadd(e.rj,io)):(xs.vsub(e.ni,xs),no.vadd(e.rj,no),io.vadd(e.ri,io));const r=1/t;no.scale(r,n.ri),io.scale(r,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),xs.normalize(),xs.tangents(n.t,i.t)}getContacts(t,e,n,i,o,r,a){this.contactPointPool=o,this.frictionEquationPool=a,this.result=i,this.frictionResult=r;const c=sM,l=oM,h=nM,u=iM;for(let f=0,d=t.length;f!==d;f++){const m=t[f],_=e[f];let p=null;m.material&&_.material&&(p=n.getContactMaterial(m.material,_.material)||null);const g=m.type&gt.KINEMATIC&&_.type&gt.STATIC||m.type&gt.STATIC&&_.type&gt.KINEMATIC||m.type&gt.KINEMATIC&&_.type&gt.KINEMATIC;for(let M=0;M<m.shapes.length;M++){m.quaternion.mult(m.shapeOrientations[M],c),m.quaternion.vmult(m.shapeOffsets[M],h),h.vadd(m.position,h);const E=m.shapes[M];for(let T=0;T<_.shapes.length;T++){_.quaternion.mult(_.shapeOrientations[T],l),_.quaternion.vmult(_.shapeOffsets[T],u),u.vadd(_.position,u);const U=_.shapes[T];if(!(E.collisionFilterMask&U.collisionFilterGroup&&U.collisionFilterMask&E.collisionFilterGroup)||h.distanceTo(u)>E.boundingSphereRadius+U.boundingSphereRadius)continue;let D=null;E.material&&U.material&&(D=n.getContactMaterial(E.material,U.material)||null),this.currentContactMaterial=D||p||n.defaultContactMaterial;const w=E.type|U.type,I=this[w];if(I){let A=!1;E.type<U.type?A=I.call(this,E,U,h,u,c,l,m,_,E,U,g):A=I.call(this,U,E,u,h,l,c,_,m,E,U,g),A&&g&&(n.shapeOverlapKeeper.set(E.id,U.id),n.bodyOverlapKeeper.set(m.id,_.id))}}}}}sphereSphere(t,e,n,i,o,r,a,c,l,h,u){if(u)return n.distanceSquared(i)<(t.radius+e.radius)**2;const f=this.createContactEquation(a,c,t,e,l,h);i.vsub(n,f.ni),f.ni.normalize(),f.ri.copy(f.ni),f.rj.copy(f.ni),f.ri.scale(t.radius,f.ri),f.rj.scale(-e.radius,f.rj),f.ri.vadd(n,f.ri),f.ri.vsub(a.position,f.ri),f.rj.vadd(i,f.rj),f.rj.vsub(c.position,f.rj),this.result.push(f),this.createFrictionEquationsFromContact(f,this.frictionResult)}spherePlane(t,e,n,i,o,r,a,c,l,h,u){const f=this.createContactEquation(a,c,t,e,l,h);if(f.ni.set(0,0,1),r.vmult(f.ni,f.ni),f.ni.negate(f.ni),f.ni.normalize(),f.ni.scale(t.radius,f.ri),n.vsub(i,qr),f.ni.scale(f.ni.dot(qr),jh),qr.vsub(jh,f.rj),-qr.dot(f.ni)<=t.radius){if(u)return!0;const d=f.ri,m=f.rj;d.vadd(n,d),d.vsub(a.position,d),m.vadd(i,m),m.vsub(c.position,m),this.result.push(f),this.createFrictionEquationsFromContact(f,this.frictionResult)}}boxBox(t,e,n,i,o,r,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,o,r,a,c,t,e,u)}sphereBox(t,e,n,i,o,r,a,c,l,h,u){const f=this.v3pool,d=IM;n.vsub(i,Yr),e.getSideNormals(d,r);const m=t.radius;let _=!1;const p=DM,g=NM,M=UM;let E=null,T=0,U=0,D=0,w=null;for(let L=0,G=d.length;L!==G&&_===!1;L++){const k=CM;k.copy(d[L]);const B=k.length();k.normalize();const F=Yr.dot(k);if(F<B+m&&F>0){const H=RM,V=PM;H.copy(d[(L+1)%3]),V.copy(d[(L+2)%3]);const $=H.length(),N=V.length();H.normalize(),V.normalize();const Y=Yr.dot(H),st=Yr.dot(V);if(Y<$&&Y>-$&&st<N&&st>-N){const at=Math.abs(F-B-m);if((w===null||at<w)&&(w=at,U=Y,D=st,E=B,p.copy(k),g.copy(H),M.copy(V),T++,u))return!0}}}if(T){_=!0;const L=this.createContactEquation(a,c,t,e,l,h);p.scale(-m,L.ri),L.ni.copy(p),L.ni.negate(L.ni),p.scale(E,p),g.scale(U,g),p.vadd(g,p),M.scale(D,M),p.vadd(M,L.rj),L.ri.vadd(n,L.ri),L.ri.vsub(a.position,L.ri),L.rj.vadd(i,L.rj),L.rj.vsub(c.position,L.rj),this.result.push(L),this.createFrictionEquationsFromContact(L,this.frictionResult)}let I=f.get();const A=LM;for(let L=0;L!==2&&!_;L++)for(let G=0;G!==2&&!_;G++)for(let k=0;k!==2&&!_;k++)if(I.set(0,0,0),L?I.vadd(d[0],I):I.vsub(d[0],I),G?I.vadd(d[1],I):I.vsub(d[1],I),k?I.vadd(d[2],I):I.vsub(d[2],I),i.vadd(I,A),A.vsub(n,A),A.lengthSquared()<m*m){if(u)return!0;_=!0;const B=this.createContactEquation(a,c,t,e,l,h);B.ri.copy(A),B.ri.normalize(),B.ni.copy(B.ri),B.ri.scale(m,B.ri),B.rj.copy(I),B.ri.vadd(n,B.ri),B.ri.vsub(a.position,B.ri),B.rj.vadd(i,B.rj),B.rj.vsub(c.position,B.rj),this.result.push(B),this.createFrictionEquationsFromContact(B,this.frictionResult)}f.release(I),I=null;const x=f.get(),v=f.get(),P=f.get(),b=f.get(),S=f.get(),R=d.length;for(let L=0;L!==R&&!_;L++)for(let G=0;G!==R&&!_;G++)if(L%3!==G%3){d[G].cross(d[L],x),x.normalize(),d[L].vadd(d[G],v),P.copy(n),P.vsub(v,P),P.vsub(i,P);const k=P.dot(x);x.scale(k,b);let B=0;for(;B===L%3||B===G%3;)B++;S.copy(n),S.vsub(b,S),S.vsub(v,S),S.vsub(i,S);const F=Math.abs(k),H=S.length();if(F<d[B].length()&&H<m){if(u)return!0;_=!0;const V=this.createContactEquation(a,c,t,e,l,h);v.vadd(b,V.rj),V.rj.copy(V.rj),S.negate(V.ni),V.ni.normalize(),V.ri.copy(V.rj),V.ri.vadd(i,V.ri),V.ri.vsub(n,V.ri),V.ri.normalize(),V.ri.scale(m,V.ri),V.ri.vadd(n,V.ri),V.ri.vsub(a.position,V.ri),V.rj.vadd(i,V.rj),V.rj.vsub(c.position,V.rj),this.result.push(V),this.createFrictionEquationsFromContact(V,this.frictionResult)}}f.release(x,v,P,b,S)}planeBox(t,e,n,i,o,r,a,c,l,h,u){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,o,r,a,c,t,e,u)}convexConvex(t,e,n,i,o,r,a,c,l,h,u,f,d){const m=ZM;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,o,i,r,m,f,d)){const _=[],p=$M;t.clipAgainstHull(n,o,e,i,r,m,-100,100,_);let g=0;for(let M=0;M!==_.length;M++){if(u)return!0;const E=this.createContactEquation(a,c,t,e,l,h),T=E.ri,U=E.rj;m.negate(E.ni),_[M].normal.negate(p),p.scale(_[M].depth,p),_[M].point.vadd(p,T),U.copy(_[M].point),T.vsub(n,T),U.vsub(i,U),T.vadd(n,T),T.vsub(a.position,T),U.vadd(i,U),U.vsub(c.position,U),this.result.push(E),g++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(E,this.frictionResult)}this.enableFrictionReduction&&g&&this.createFrictionFromAverage(g)}}sphereConvex(t,e,n,i,o,r,a,c,l,h,u){const f=this.v3pool;n.vsub(i,zM);const d=e.faceNormals,m=e.faces,_=e.vertices,p=t.radius;let g=!1;for(let M=0;M!==_.length;M++){const E=_[M],T=BM;r.vmult(E,T),i.vadd(T,T);const U=OM;if(T.vsub(n,U),U.lengthSquared()<p*p){if(u)return!0;g=!0;const D=this.createContactEquation(a,c,t,e,l,h);D.ri.copy(U),D.ri.normalize(),D.ni.copy(D.ri),D.ri.scale(p,D.ri),T.vsub(i,D.rj),D.ri.vadd(n,D.ri),D.ri.vsub(a.position,D.ri),D.rj.vadd(i,D.rj),D.rj.vsub(c.position,D.rj),this.result.push(D),this.createFrictionEquationsFromContact(D,this.frictionResult);return}}for(let M=0,E=m.length;M!==E&&g===!1;M++){const T=d[M],U=m[M],D=HM;r.vmult(T,D);const w=GM;r.vmult(_[U[0]],w),w.vadd(i,w);const I=VM;D.scale(-p,I),n.vadd(I,I);const A=WM;I.vsub(w,A);const x=A.dot(D),v=XM;if(n.vsub(w,v),x<0&&v.dot(D)>0){const P=[];for(let b=0,S=U.length;b!==S;b++){const R=f.get();r.vmult(_[U[b]],R),i.vadd(R,R),P.push(R)}if(AM(P,D,n)){if(u)return!0;g=!0;const b=this.createContactEquation(a,c,t,e,l,h);D.scale(-p,b.ri),D.negate(b.ni);const S=f.get();D.scale(-x,S);const R=f.get();D.scale(-p,R),n.vsub(i,b.rj),b.rj.vadd(R,b.rj),b.rj.vadd(S,b.rj),b.rj.vadd(i,b.rj),b.rj.vsub(c.position,b.rj),b.ri.vadd(n,b.ri),b.ri.vsub(a.position,b.ri),f.release(S),f.release(R),this.result.push(b),this.createFrictionEquationsFromContact(b,this.frictionResult);for(let L=0,G=P.length;L!==G;L++)f.release(P[L]);return}else for(let b=0;b!==U.length;b++){const S=f.get(),R=f.get();r.vmult(_[U[(b+1)%U.length]],S),r.vmult(_[U[(b+2)%U.length]],R),i.vadd(S,S),i.vadd(R,R);const L=FM;R.vsub(S,L);const G=kM;L.unit(G);const k=f.get(),B=f.get();n.vsub(S,B);const F=B.dot(G);G.scale(F,k),k.vadd(S,k);const H=f.get();if(k.vsub(n,H),F>0&&F*F<L.lengthSquared()&&H.lengthSquared()<p*p){if(u)return!0;const V=this.createContactEquation(a,c,t,e,l,h);k.vsub(i,V.rj),k.vsub(n,V.ni),V.ni.normalize(),V.ni.scale(p,V.ri),V.rj.vadd(i,V.rj),V.rj.vsub(c.position,V.rj),V.ri.vadd(n,V.ri),V.ri.vsub(a.position,V.ri),this.result.push(V),this.createFrictionEquationsFromContact(V,this.frictionResult);for(let $=0,N=P.length;$!==N;$++)f.release(P[$]);f.release(S),f.release(R),f.release(k),f.release(H),f.release(B);return}f.release(S),f.release(R),f.release(k),f.release(H),f.release(B)}for(let b=0,S=P.length;b!==S;b++)f.release(P[b])}}}planeConvex(t,e,n,i,o,r,a,c,l,h,u){const f=qM,d=YM;d.set(0,0,1),o.vmult(d,d);let m=0;const _=KM;for(let p=0;p!==e.vertices.length;p++)if(f.copy(e.vertices[p]),r.vmult(f,f),i.vadd(f,f),f.vsub(n,_),d.dot(_)<=0){if(u)return!0;const M=this.createContactEquation(a,c,t,e,l,h),E=jM;d.scale(d.dot(_),E),f.vsub(E,E),E.vsub(n,M.ri),M.ni.copy(d),f.vsub(i,M.rj),M.ri.vadd(n,M.ri),M.ri.vsub(a.position,M.ri),M.rj.vadd(i,M.rj),M.rj.vsub(c.position,M.rj),this.result.push(M),m++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(M,this.frictionResult)}this.enableFrictionReduction&&m&&this.createFrictionFromAverage(m)}boxConvex(t,e,n,i,o,r,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,o,r,a,c,t,e,u)}sphereHeightfield(t,e,n,i,o,r,a,c,l,h,u){const f=e.data,d=t.radius,m=e.elementSize,_=lw,p=cw;pe.pointToLocalFrame(i,r,n,p);let g=Math.floor((p.x-d)/m)-1,M=Math.ceil((p.x+d)/m)+1,E=Math.floor((p.y-d)/m)-1,T=Math.ceil((p.y+d)/m)+1;if(M<0||T<0||g>f.length||E>f[0].length)return;g<0&&(g=0),M<0&&(M=0),E<0&&(E=0),T<0&&(T=0),g>=f.length&&(g=f.length-1),M>=f.length&&(M=f.length-1),T>=f[0].length&&(T=f[0].length-1),E>=f[0].length&&(E=f[0].length-1);const U=[];e.getRectMinMax(g,E,M,T,U);const D=U[0],w=U[1];if(p.z-d>w||p.z+d<D)return;const I=this.result;for(let A=g;A<M;A++)for(let x=E;x<T;x++){const v=I.length;let P=!1;if(e.getConvexTrianglePillar(A,x,!1),pe.pointToWorldFrame(i,r,e.pillarOffset,_),n.distanceTo(_)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(P=this.sphereConvex(t,e.pillarConvex,n,_,o,r,a,c,t,e,u)),u&&P||(e.getConvexTrianglePillar(A,x,!0),pe.pointToWorldFrame(i,r,e.pillarOffset,_),n.distanceTo(_)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(P=this.sphereConvex(t,e.pillarConvex,n,_,o,r,a,c,t,e,u)),u&&P))return!0;if(I.length-v>2)return}}boxHeightfield(t,e,n,i,o,r,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,o,r,a,c,t,e,u)}convexHeightfield(t,e,n,i,o,r,a,c,l,h,u){const f=e.data,d=e.elementSize,m=t.boundingSphereRadius,_=rw,p=aw,g=ow;pe.pointToLocalFrame(i,r,n,g);let M=Math.floor((g.x-m)/d)-1,E=Math.ceil((g.x+m)/d)+1,T=Math.floor((g.y-m)/d)-1,U=Math.ceil((g.y+m)/d)+1;if(E<0||U<0||M>f.length||T>f[0].length)return;M<0&&(M=0),E<0&&(E=0),T<0&&(T=0),U<0&&(U=0),M>=f.length&&(M=f.length-1),E>=f.length&&(E=f.length-1),U>=f[0].length&&(U=f[0].length-1),T>=f[0].length&&(T=f[0].length-1);const D=[];e.getRectMinMax(M,T,E,U,D);const w=D[0],I=D[1];if(!(g.z-m>I||g.z+m<w))for(let A=M;A<E;A++)for(let x=T;x<U;x++){let v=!1;if(e.getConvexTrianglePillar(A,x,!1),pe.pointToWorldFrame(i,r,e.pillarOffset,_),n.distanceTo(_)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(v=this.convexConvex(t,e.pillarConvex,n,_,o,r,a,c,null,null,u,p,null)),u&&v||(e.getConvexTrianglePillar(A,x,!0),pe.pointToWorldFrame(i,r,e.pillarOffset,_),n.distanceTo(_)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(v=this.convexConvex(t,e.pillarConvex,n,_,o,r,a,c,null,null,u,p,null)),u&&v))return!0}}sphereParticle(t,e,n,i,o,r,a,c,l,h,u){const f=ew;if(f.set(0,0,1),i.vsub(n,f),f.lengthSquared()<=t.radius*t.radius){if(u)return!0;const m=this.createContactEquation(c,a,e,t,l,h);f.normalize(),m.rj.copy(f),m.rj.scale(t.radius,m.rj),m.ni.copy(f),m.ni.negate(m.ni),m.ri.set(0,0,0),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult)}}planeParticle(t,e,n,i,o,r,a,c,l,h,u){const f=JM;f.set(0,0,1),a.quaternion.vmult(f,f);const d=QM;if(i.vsub(a.position,d),f.dot(d)<=0){if(u)return!0;const _=this.createContactEquation(c,a,e,t,l,h);_.ni.copy(f),_.ni.negate(_.ni),_.ri.set(0,0,0);const p=tw;f.scale(f.dot(i),p),i.vsub(p,p),_.rj.copy(p),this.result.push(_),this.createFrictionEquationsFromContact(_,this.frictionResult)}}boxParticle(t,e,n,i,o,r,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,o,r,a,c,t,e,u)}convexParticle(t,e,n,i,o,r,a,c,l,h,u){let f=-1;const d=iw,m=sw;let _=null;const p=nw;if(p.copy(i),p.vsub(n,p),o.conjugate(Zh),Zh.vmult(p,p),t.pointIsInside(p)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,o),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(o);for(let g=0,M=t.faces.length;g!==M;g++){const E=[t.worldVertices[t.faces[g][0]]],T=t.worldFaceNormals[g];i.vsub(E[0],$h);const U=-T.dot($h);if(_===null||Math.abs(U)<Math.abs(_)){if(u)return!0;_=U,f=g,d.copy(T)}}if(f!==-1){const g=this.createContactEquation(c,a,e,t,l,h);d.scale(_,m),m.vadd(i,m),m.vsub(n,m),g.rj.copy(m),d.negate(g.ni),g.ri.set(0,0,0);const M=g.ri,E=g.rj;M.vadd(i,M),M.vsub(c.position,M),E.vadd(n,E),E.vsub(a.position,E),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,o,r,a,c,l,h,u){return this.convexHeightfield(e,t,i,n,r,o,c,a,l,h,u)}particleCylinder(t,e,n,i,o,r,a,c,l,h,u){return this.convexParticle(e,t,i,n,r,o,c,a,l,h,u)}sphereTrimesh(t,e,n,i,o,r,a,c,l,h,u){const f=fM,d=pM,m=mM,_=gM,p=vM,g=xM,M=wM,E=dM,T=uM,U=SM;pe.pointToLocalFrame(i,r,n,p);const D=t.radius;M.lowerBound.set(p.x-D,p.y-D,p.z-D),M.upperBound.set(p.x+D,p.y+D,p.z+D),e.getTrianglesInAABB(M,U);const w=hM,I=t.radius*t.radius;for(let b=0;b<U.length;b++)for(let S=0;S<3;S++)if(e.getVertex(e.indices[U[b]*3+S],w),w.vsub(p,T),T.lengthSquared()<=I){if(E.copy(w),pe.pointToWorldFrame(i,r,E,w),w.vsub(n,T),u)return!0;let R=this.createContactEquation(a,c,t,e,l,h);R.ni.copy(T),R.ni.normalize(),R.ri.copy(R.ni),R.ri.scale(t.radius,R.ri),R.ri.vadd(n,R.ri),R.ri.vsub(a.position,R.ri),R.rj.copy(w),R.rj.vsub(c.position,R.rj),this.result.push(R),this.createFrictionEquationsFromContact(R,this.frictionResult)}for(let b=0;b<U.length;b++)for(let S=0;S<3;S++){e.getVertex(e.indices[U[b]*3+S],f),e.getVertex(e.indices[U[b]*3+(S+1)%3],d),d.vsub(f,m),p.vsub(d,g);const R=g.dot(m);p.vsub(f,g);let L=g.dot(m);if(L>0&&R<0&&(p.vsub(f,g),_.copy(m),_.normalize(),L=g.dot(_),_.scale(L,g),g.vadd(f,g),g.distanceTo(p)<t.radius)){if(u)return!0;const k=this.createContactEquation(a,c,t,e,l,h);g.vsub(p,k.ni),k.ni.normalize(),k.ni.scale(t.radius,k.ri),k.ri.vadd(n,k.ri),k.ri.vsub(a.position,k.ri),pe.pointToWorldFrame(i,r,g,g),g.vsub(c.position,k.rj),pe.vectorToWorldFrame(r,k.ni,k.ni),pe.vectorToWorldFrame(r,k.ri,k.ri),this.result.push(k),this.createFrictionEquationsFromContact(k,this.frictionResult)}}const A=_M,x=yM,v=MM,P=lM;for(let b=0,S=U.length;b!==S;b++){e.getTriangleVertices(U[b],A,x,v),e.getNormal(U[b],P),p.vsub(A,g);let R=g.dot(P);if(P.scale(R,g),p.vsub(g,g),R=g.distanceTo(p),Xe.pointInTriangle(g,A,x,v)&&R<t.radius){if(u)return!0;let L=this.createContactEquation(a,c,t,e,l,h);g.vsub(p,L.ni),L.ni.normalize(),L.ni.scale(t.radius,L.ri),L.ri.vadd(n,L.ri),L.ri.vsub(a.position,L.ri),pe.pointToWorldFrame(i,r,g,g),g.vsub(c.position,L.rj),pe.vectorToWorldFrame(r,L.ni,L.ni),pe.vectorToWorldFrame(r,L.ri,L.ri),this.result.push(L),this.createFrictionEquationsFromContact(L,this.frictionResult)}}U.length=0}planeTrimesh(t,e,n,i,o,r,a,c,l,h,u){const f=new y,d=rM;d.set(0,0,1),o.vmult(d,d);for(let m=0;m<e.vertices.length/3;m++){e.getVertex(m,f);const _=new y;_.copy(f),pe.pointToWorldFrame(i,r,_,f);const p=aM;if(f.vsub(n,p),d.dot(p)<=0){if(u)return!0;const M=this.createContactEquation(a,c,t,e,l,h);M.ni.copy(d);const E=cM;d.scale(p.dot(d),E),f.vsub(E,E),M.ri.copy(E),M.ri.vsub(a.position,M.ri),M.rj.copy(f),M.rj.vsub(c.position,M.rj),this.result.push(M),this.createFrictionEquationsFromContact(M,this.frictionResult)}}}}const xs=new y,no=new y,io=new y,nM=new y,iM=new y,sM=new Ke,oM=new Ke,rM=new y,aM=new y,cM=new y,lM=new y,uM=new y;new y;const hM=new y,dM=new y,fM=new y,pM=new y,mM=new y,gM=new y,vM=new y,xM=new y,_M=new y,yM=new y,MM=new y,wM=new Un,SM=[],qr=new y,jh=new y,EM=new y,bM=new y,TM=new y;function AM(s,t,e){let n=null;const i=s.length;for(let o=0;o!==i;o++){const r=s[o],a=EM;s[(o+1)%i].vsub(r,a);const c=bM;a.cross(t,c);const l=TM;e.vsub(r,l);const h=c.dot(l);if(n===null||h>0&&n===!0||h<=0&&n===!1){n===null&&(n=h>0);continue}else return!1}return!0}const Yr=new y,CM=new y,RM=new y,PM=new y,IM=[new y,new y,new y,new y,new y,new y],LM=new y,DM=new y,NM=new y,UM=new y,zM=new y,FM=new y,kM=new y,OM=new y,BM=new y,HM=new y,GM=new y,VM=new y,WM=new y,XM=new y;new y;new y;const qM=new y,YM=new y,KM=new y,jM=new y,ZM=new y,$M=new y,JM=new y,QM=new y,tw=new y,ew=new y,Zh=new Ke,nw=new y;new y;const iw=new y,$h=new y,sw=new y,ow=new y,rw=new y,aw=[0],cw=new y,lw=new y;class Jh{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){const n=e;e=t,t=n}return t<<16|e}set(t,e){const n=this.getKey(t,e),i=this.current;let o=0;for(;n>i[o];)o++;if(n!==i[o]){for(let r=i.length-1;r>=o;r--)i[r+1]=i[r];i[o]=n}}tick(){const t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){const n=this.current,i=this.previous,o=n.length,r=i.length;let a=0;for(let c=0;c<o;c++){let l=!1;const h=n[c];for(;h>i[a];)a++;l=h===i[a],l||Qh(t,h)}a=0;for(let c=0;c<r;c++){let l=!1;const h=i[c];for(;h>n[a];)a++;l=n[a]===h,l||Qh(e,h)}}}function Qh(s,t){s.push((t&4294901760)>>16,t&65535)}const Pc=(s,t)=>s<t?`${s}-${t}`:`${t}-${s}`;class uw{constructor(){this.data={keys:[]}}get(t,e){const n=Pc(t,e);return this.data[n]}set(t,e,n){const i=Pc(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){const n=Pc(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){const t=this.data,e=t.keys;for(;e.length>0;){const n=e.pop();delete t[n]}}}class hw extends Rf{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new y,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new y,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new Pf,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new jy,this.constraints=[],this.narrowphase=new eM(this),this.collisionMatrix=new kh,this.collisionMatrixPrevious=new kh,this.bodyOverlapKeeper=new Jh,this.shapeOverlapKeeper=new Jh,this.contactmaterials=[],this.contactMaterialTable=new uw,this.defaultMaterial=new zi("default"),this.defaultContactMaterial=new Ln(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){const t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){const e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof hr?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=Xe.ALL,n.from=t,n.to=e,n.callback=i,Ic.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=Xe.ANY,n.from=t,n.to=e,n.result=i,Ic.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=Xe.CLOSEST,n.from=t,n.to=e,n.result=i,Ic.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof gt&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;const e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let o=0;o!==n.length;o++)n[o].index=o;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){const e=this.bodies;for(let n=0;n<e.length;n++){const i=e[n].shapes;for(let o=0;o<i.length;o++){const r=i[o];if(r.id===t)return r}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){const e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);const n=Je.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{const i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;const i=Je.now();let o=0;for(;this.accumulator>=t&&o<n&&(this.internalStep(t),this.accumulator-=t,o++,!(Je.now()-i>t*1e3)););this.accumulator=this.accumulator%t;const r=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){const c=this.bodies[a];c.previousPosition.lerp(c.position,r,c.interpolatedPosition),c.previousQuaternion.slerp(c.quaternion,r,c.interpolatedQuaternion),c.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;const e=this.contacts,n=gw,i=vw,o=this.bodies.length,r=this.bodies,a=this.solver,c=this.gravity,l=this.doProfiling,h=this.profile,u=gt.DYNAMIC;let f=-1/0;const d=this.constraints,m=mw;c.length();const _=c.x,p=c.y,g=c.z;let M=0;for(l&&(f=Je.now()),M=0;M!==o;M++){const b=r[M];if(b.type===u){const S=b.force,R=b.mass;S.x+=R*_,S.y+=R*p,S.z+=R*g}}for(let b=0,S=this.subsystems.length;b!==S;b++)this.subsystems[b].update();l&&(f=Je.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),l&&(h.broadphase=Je.now()-f);let E=d.length;for(M=0;M!==E;M++){const b=d[M];if(!b.collideConnected)for(let S=n.length-1;S>=0;S-=1)(b.bodyA===n[S]&&b.bodyB===i[S]||b.bodyB===n[S]&&b.bodyA===i[S])&&(n.splice(S,1),i.splice(S,1))}this.collisionMatrixTick(),l&&(f=Je.now());const T=pw,U=e.length;for(M=0;M!==U;M++)T.push(e[M]);e.length=0;const D=this.frictionEquations.length;for(M=0;M!==D;M++)m.push(this.frictionEquations[M]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,T,this.frictionEquations,m),l&&(h.narrowphase=Je.now()-f),l&&(f=Je.now()),M=0;M<this.frictionEquations.length;M++)a.addEquation(this.frictionEquations[M]);const w=e.length;for(let b=0;b!==w;b++){const S=e[b],R=S.bi,L=S.bj,G=S.si,k=S.sj;let B;if(R.material&&L.material?B=this.getContactMaterial(R.material,L.material)||this.defaultContactMaterial:B=this.defaultContactMaterial,B.friction,R.material&&L.material&&(R.material.friction>=0&&L.material.friction>=0&&R.material.friction*L.material.friction,R.material.restitution>=0&&L.material.restitution>=0&&(S.restitution=R.material.restitution*L.material.restitution)),a.addEquation(S),R.allowSleep&&R.type===gt.DYNAMIC&&R.sleepState===gt.SLEEPING&&L.sleepState===gt.AWAKE&&L.type!==gt.STATIC){const F=L.velocity.lengthSquared()+L.angularVelocity.lengthSquared(),H=L.sleepSpeedLimit**2;F>=H*2&&(R.wakeUpAfterNarrowphase=!0)}if(L.allowSleep&&L.type===gt.DYNAMIC&&L.sleepState===gt.SLEEPING&&R.sleepState===gt.AWAKE&&R.type!==gt.STATIC){const F=R.velocity.lengthSquared()+R.angularVelocity.lengthSquared(),H=R.sleepSpeedLimit**2;F>=H*2&&(L.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(R,L,!0),this.collisionMatrixPrevious.get(R,L)||(Ko.body=L,Ko.contact=S,R.dispatchEvent(Ko),Ko.body=R,L.dispatchEvent(Ko)),this.bodyOverlapKeeper.set(R.id,L.id),this.shapeOverlapKeeper.set(G.id,k.id)}for(this.emitContactEvents(),l&&(h.makeContactConstraints=Je.now()-f,f=Je.now()),M=0;M!==o;M++){const b=r[M];b.wakeUpAfterNarrowphase&&(b.wakeUp(),b.wakeUpAfterNarrowphase=!1)}for(E=d.length,M=0;M!==E;M++){const b=d[M];b.update();for(let S=0,R=b.equations.length;S!==R;S++){const L=b.equations[S];a.addEquation(L)}}a.solve(t,this),l&&(h.solve=Je.now()-f),a.removeAllEquations();const I=Math.pow;for(M=0;M!==o;M++){const b=r[M];if(b.type&u){const S=I(1-b.linearDamping,t),R=b.velocity;R.scale(S,R);const L=b.angularVelocity;if(L){const G=I(1-b.angularDamping,t);L.scale(G,L)}}}this.dispatchEvent(fw),l&&(f=Je.now());const x=this.stepnumber%(this.quatNormalizeSkip+1)===0,v=this.quatNormalizeFast;for(M=0;M!==o;M++)r[M].integrate(t,x,v);this.clearForces(),this.broadphase.dirty=!0,l&&(h.integrate=Je.now()-f),this.stepnumber+=1,this.dispatchEvent(dw);let P=!0;if(this.allowSleep)for(P=!1,M=0;M!==o;M++){const b=r[M];b.sleepTick(this.time),b.sleepState!==gt.SLEEPING&&(P=!0)}this.hasActiveBodies=P}emitContactEvents(){const t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(Ci,Ri),t){for(let o=0,r=Ci.length;o<r;o+=2)jo.bodyA=this.getBodyById(Ci[o]),jo.bodyB=this.getBodyById(Ci[o+1]),this.dispatchEvent(jo);jo.bodyA=jo.bodyB=null}if(e){for(let o=0,r=Ri.length;o<r;o+=2)Zo.bodyA=this.getBodyById(Ri[o]),Zo.bodyB=this.getBodyById(Ri[o+1]),this.dispatchEvent(Zo);Zo.bodyA=Zo.bodyB=null}Ci.length=Ri.length=0;const n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(Ci,Ri),n){for(let o=0,r=Ci.length;o<r;o+=2){const a=this.getShapeById(Ci[o]),c=this.getShapeById(Ci[o+1]);Pi.shapeA=a,Pi.shapeB=c,a&&(Pi.bodyA=a.body),c&&(Pi.bodyB=c.body),this.dispatchEvent(Pi)}Pi.bodyA=Pi.bodyB=Pi.shapeA=Pi.shapeB=null}if(i){for(let o=0,r=Ri.length;o<r;o+=2){const a=this.getShapeById(Ri[o]),c=this.getShapeById(Ri[o+1]);Ii.shapeA=a,Ii.shapeB=c,a&&(Ii.bodyA=a.body),c&&(Ii.bodyB=c.body),this.dispatchEvent(Ii)}Ii.bodyA=Ii.bodyB=Ii.shapeA=Ii.shapeB=null}}clearForces(){const t=this.bodies,e=t.length;for(let n=0;n!==e;n++){const i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}}new Un;const Ic=new Xe,Je=globalThis.performance||{};if(!Je.now){let s=Date.now();Je.timing&&Je.timing.navigationStart&&(s=Je.timing.navigationStart),Je.now=()=>Date.now()-s}new y;const dw={type:"postStep"},fw={type:"preStep"},Ko={type:gt.COLLIDE_EVENT_NAME,body:null,contact:null},pw=[],mw=[],gw=[],vw=[],Ci=[],Ri=[],jo={type:"beginContact",bodyA:null,bodyB:null},Zo={type:"endContact",bodyA:null,bodyB:null},Pi={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Ii={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};class xw extends Sf{constructor(){super();const t=new vi;t.deleteAttribute("uv");const e=new us({side:fn}),n=new us,i=new z_(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);const o=new Pt(t,e);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);const r=new Pt(t,n);r.position.set(-10.906,2.009,1.846),r.rotation.set(0,-.195,0),r.scale.set(2.328,7.905,4.651),this.add(r);const a=new Pt(t,n);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const c=new Pt(t,n);c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),this.add(c);const l=new Pt(t,n);l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),this.add(l);const h=new Pt(t,n);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);const u=new Pt(t,n);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);const f=new Pt(t,so(50));f.position.set(-16.116,14.37,8.208),f.scale.set(.1,2.428,2.739),this.add(f);const d=new Pt(t,so(50));d.position.set(-16.109,18.021,-8.207),d.scale.set(.1,2.425,2.751),this.add(d);const m=new Pt(t,so(17));m.position.set(14.904,12.198,-1.832),m.scale.set(.15,4.265,6.331),this.add(m);const _=new Pt(t,so(43));_.position.set(-.462,8.89,14.52),_.scale.set(4.38,5.441,.088),this.add(_);const p=new Pt(t,so(20));p.position.set(3.235,11.486,-12.541),p.scale.set(2.5,2,.1),this.add(p);const g=new Pt(t,so(100));g.position.set(0,20,0),g.scale.set(1,.1,1),this.add(g)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function so(s){const t=new yn;return t.color.setScalar(s),t}const $o=new K;function Bn(s,t,e,n,i,o){const r=2*Math.PI*i/4,a=Math.max(o-2*i,0),c=Math.PI/4;$o.copy(t),$o[n]=0,$o.normalize();const l=.5*r/(r+a),h=1-$o.angleTo(s)/c;return Math.sign($o[e])===1?h*l:a/(r+a)+l+l*(1-h)}class _w extends vi{constructor(t=1,e=1,n=1,i=2,o=.1){if(i=i*2+1,o=Math.min(t/2,e/2,n/2,o),super(1,1,1,i,i,i),i===1)return;const r=this.toNonIndexed();this.index=null,this.attributes.position=r.attributes.position,this.attributes.normal=r.attributes.normal,this.attributes.uv=r.attributes.uv;const a=new K,c=new K,l=new K(t,e,n).divideScalar(2).subScalar(o),h=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,d=h.length/6,m=new K,_=.5/i;for(let p=0,g=0;p<h.length;p+=3,g+=2)switch(a.fromArray(h,p),c.copy(a),c.x-=Math.sign(c.x)*_,c.y-=Math.sign(c.y)*_,c.z-=Math.sign(c.z)*_,c.normalize(),h[p+0]=l.x*Math.sign(a.x)+c.x*o,h[p+1]=l.y*Math.sign(a.y)+c.y*o,h[p+2]=l.z*Math.sign(a.z)+c.z*o,u[p+0]=c.x,u[p+1]=c.y,u[p+2]=c.z,Math.floor(p/d)){case 0:m.set(1,0,0),f[g+0]=Bn(m,c,"z","y",o,n),f[g+1]=1-Bn(m,c,"y","z",o,e);break;case 1:m.set(-1,0,0),f[g+0]=1-Bn(m,c,"z","y",o,n),f[g+1]=1-Bn(m,c,"y","z",o,e);break;case 2:m.set(0,1,0),f[g+0]=1-Bn(m,c,"x","z",o,t),f[g+1]=Bn(m,c,"z","x",o,n);break;case 3:m.set(0,-1,0),f[g+0]=1-Bn(m,c,"x","z",o,t),f[g+1]=1-Bn(m,c,"z","x",o,n);break;case 4:m.set(0,0,1),f[g+0]=1-Bn(m,c,"x","y",o,t),f[g+1]=1-Bn(m,c,"y","x",o,e);break;case 5:m.set(0,0,-1),f[g+0]=Bn(m,c,"x","y",o,t),f[g+1]=1-Bn(m,c,"y","x",o,e);break}}}const Jo={floorA:16181192,floorB:15126433,floorRim:14268292},Ro=new Map,td=new Map;function Te(s,t,e){const n=`b${s},${t},${e}`;let i=Ro.get(n);if(!i){const o=Math.min(.055,Math.min(s,t,e)*.3);i=new _w(s,t,e,2,o),Ro.set(n,i)}return i}function dr(s,t,e,n=18){const i=`c${s},${t},${e},${n}`;let o=Ro.get(i);return o||(o=new Ao(s,t,e,n),Ro.set(i,o)),o}function Ui(s,t=18){const e=`s${s},${t}`;let n=Ro.get(e);return n||(n=new ls(s,t,Math.max(8,t>>1)),Ro.set(e,n)),n}function ne(s,t={}){const e=t.rough??.5,n=t.metal??.03,i=t.emissive??0,o=t.emissiveIntensity??1,r=t.opacity??1,a=`${s}|${e}|${n}|${i}|${o}|${r}`;let c=td.get(a);return c||(c=new us({color:s,roughness:e,metalness:n,emissive:i,emissiveIntensity:o,transparent:r<1,opacity:r}),td.set(a,c)),c}function rs(s,t,e,n,i,o=!0){const r=new Pt(t,e);return r.position.set(n[0],n[1],n[2]),r.rotation.set(i[0],i[1],i[2]),r.castShadow=o,r.receiveShadow=!0,s.root.add(r),r}function yw(s,t,e,n){const i=new gt({type:gt.STATIC,shape:t,material:s.mat});return i.position.set(e[0],e[1],e[2]),i.quaternion.setFromEuler(n[0],n[1],n[2]),s.physics.addBody(i),s.bodies.push(i),i}function An(s,t,e,n,i=[0,0,0],o){const r=rs(s,Te(t[0],t[1],t[2]),ne(n,o),e,i);return yw(s,new We(new y(t[0]/2,t[1]/2,t[2]/2)),e,i),r}function ue(s,t,e,n,i=[0,0,0],o){const r=Math.min(t[0],t[1],t[2])>=.12;return rs(s,Te(t[0],t[1],t[2]),ne(n,o),e,i,r)}function lo(s,t,e,n,i,o,r=[0,0,0],a){const c=Math.min(t,e)>=.1;return rs(s,dr(t,e,n),ne(o,a),i,r,c)}function Mw(s,t,e,n,i=[1,1,1],o){const r=rs(s,Ui(t),ne(n,o),e,[0,0,0]);return r.scale.set(i[0],i[1],i[2]),r}function Mu(s){let t=s>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ww(){const t=document.createElement("canvas");t.width=t.height=128*2;const e=t.getContext("2d"),n=a=>"#"+a.toString(16).padStart(6,"0");e.fillStyle=n(Jo.floorRim),e.fillRect(0,0,128*2,128*2);const i=(a,c,l)=>{e.fillStyle=n(l),e.fillRect(a*128+3,c*128+3,122,122);const h=e.createLinearGradient(a*128,c*128,a*128,c*128+128);h.addColorStop(0,"rgba(255,255,255,0.28)"),h.addColorStop(.55,"rgba(255,255,255,0.0)"),h.addColorStop(1,"rgba(0,0,0,0.07)"),e.fillStyle=h,e.fillRect(a*128+3,c*128+3,122,122)};i(0,0,Jo.floorA),i(1,1,Jo.floorA),i(1,0,Jo.floorB),i(0,1,Jo.floorB);const o=Mu(7);e.globalAlpha=.05;for(let a=0;a<400;a++){e.fillStyle=o()>.5?"#ffffff":"#000000";const c=1+o()*3;e.fillRect(o()*128*2,o()*128*2,c,c)}e.globalAlpha=1;const r=new uu(t);return r.wrapS=r.wrapT=va,r.repeat.set(15,15),r.colorSpace=Vn,r}function Sw(){const e=document.createElement("canvas");e.width=64,e.height=512;const n=e.getContext("2d"),i=n.createLinearGradient(0,0,0,512);i.addColorStop(0,"#3f8fe0"),i.addColorStop(.35,"#79bdf2"),i.addColorStop(.62,"#bfe3fb"),i.addColorStop(.8,"#ffe6c9"),i.addColorStop(1,"#ffd7ae"),n.fillStyle=i,n.fillRect(0,0,64,512);const o=Mu(31);n.globalAlpha=.26,n.fillStyle="#ffffff";for(let a=0;a<22;a++){const c=512*(.5+o()*.28),l=3+o()*8;n.beginPath(),n.ellipse(64/2,c,64*(.5+o()*.6),l,0,0,Math.PI*2),n.fill()}n.globalAlpha=1;const r=new uu(e);return r.colorSpace=Vn,r}const He={laneA:9430015,laneB:11989247,laneEdge:5227511,fence:16748487,fenceTop:16765286,post:10185983,start:8121759,finish:16765286,skirt:7259903,cloud:16777215,balloon:[16739210,16765286,8121759,6607615,12882175,16752488]};function ed(s,t,e,n,i=1.7){const o=Math.abs(n-e),r=(e+n)/2;An(s,[.36,i,o],[t,i/2,r],He.fence,[0,0,0],{rough:.5}),ue(s,[.5,.16,o],[t,i+.08,r],He.fenceTop,[0,0,0],{rough:.4});for(let a=Math.min(e,n);a<=Math.max(e,n);a+=4)lo(s,.16,.16,i+.5,[t,(i+.5)/2,a],He.post,[0,0,0],{rough:.45}),Mw(s,.2,[t,i+.55,a],He.fenceTop,[1,.8,1],{rough:.35})}const nd=new Map;function Ew(s,t){const e=`${s}|${t}`,n=nd.get(e);if(n)return n;const i=256,o=document.createElement("canvas");o.width=i,o.height=i;const r=o.getContext("2d");r.clearRect(0,0,i,i);const a=s.length<=1?168:s.length<=2?132:300/s.length;r.font=`900 ${a}px ui-sans-serif, system-ui, "Malgun Gothic", sans-serif`,r.textAlign="center",r.textBaseline="middle",r.lineWidth=a*.16,r.strokeStyle="rgba(18,24,32,0.85)",r.strokeText(s,i/2,i/2+a*.02),r.fillStyle=`#${t.toString(16).padStart(6,"0")}`,r.fillText(s,i/2,i/2+a*.02);const c=new uu(o);c.anisotropy=4;const l=new yn({map:c,transparent:!0,depthWrite:!1,toneMapped:!1});return nd.set(e,l),l}function bw(s,t,e,n,i,o,r){ue(s,[n,.04,i],[t,.03,e],r,[0,0,0],{rough:.8});const a=.16;ue(s,[n,.05,a],[t,.045,e-i/2+a/2],16777215,[0,0,0],{rough:.7}),ue(s,[n,.05,a],[t,.045,e+i/2-a/2],16777215,[0,0,0],{rough:.7}),ue(s,[a,.05,i],[t-n/2+a/2,.045,e],16777215,[0,0,0],{rough:.7}),ue(s,[a,.05,i],[t+n/2-a/2,.045,e],16777215,[0,0,0],{rough:.7});const c=Math.min(n,i)*.8,l=new Pt(new zs(c,c),Ew(o,16777215));l.rotation.x=-Math.PI/2,l.rotation.z=Math.PI,l.position.set(t,.07,e),s.root.add(l)}function Tw(s,t,e,n=16777215){for(const r of[-1,1])An(s,[.22,3.2,.22],[r*e,3.2/2,t],n,[0,0,0],{rough:.35});An(s,[e*2+.22,.22,.22],[0,3.2,t],n,[0,0,0],{rough:.35}),An(s,[e*2,3.2,.2],[0,3.2/2,t-2.2],14675967,[0,0,0],{rough:.9});for(const r of[-1,1])An(s,[.2,3.2,2.2],[r*e,3.2/2,t-1.1],14675967,[0,0,0],{rough:.9});for(let r=1;r<6;r++){const a=.5333333333333333*r;ue(s,[e*2,.05,.05],[0,a,t-2.15],16777215,[0,0,0],{rough:.8})}for(let r=-3;r<=3;r++)ue(s,[.05,3.2,.05],[e/3.2*r,3.2/2,t-2.15],16777215,[0,0,0],{rough:.8});ue(s,[e*2+1.2,.06,.28],[0,.045,t],16777215,[0,0,0],{rough:.8})}function Aw(s,t,e,n={}){const i=n.slotH??.78,o=n.sideGap??1.6,r=n.wallH??2.4,a=n.color??16747069,c=.5,l=e-o;if(l<=.2)return;An(s,[l*2,r-i,c],[0,i+(r-i)/2,t],a,[0,0,0],{rough:.45});for(const f of[-1,1])An(s,[.26,i,c*1.1],[f*l,i/2,t],a,[0,0,0],{rough:.45});const h=Math.max(2,Math.round(l));for(let f=1;f<h;f++){const d=-l+l*2*f/h;ue(s,[.1,i,.1],[d,i/2,t],16765286,[0,0,0],{rough:.5})}ue(s,[l*2,.05,1.6],[0,.04,t],16765286,[0,0,0],{rough:.75});for(const f of[-1,1])ue(s,[o-.2,.05,1.6],[f*(e-o/2),.04,t],8121759,[0,0,0],{rough:.75});const u=.42;for(const f of[-1,1])An(s,[o-.2,u,.36],[f*(e-o/2),u/2,t],4180362,[0,0,0],{rough:.6})}function id(s,t,e,n,i=1){const o=[[0,0,0,1],[.9,-.15,.1,.72],[-.95,-.1,-.1,.66],[.35,.35,-.2,.62],[-.4,.28,.25,.55]];for(const[r,a,c,l]of o){const h=rs(s,Ui(l*i,14),ne(He.cloud,{rough:1,metal:0}),[t+r*i,e+a*i,n+c*i],[0,0,0],!1);h.receiveShadow=!1}}function Cw(s,t,e,n,i,o=1){rs(s,Ui(.42*o,16),ne(i,{rough:.3}),[t,e,n],[0,0,0],!1).scale.set(1,1.18,1),rs(s,dr(.07*o,.02*o,.16*o),ne(i,{rough:.4}),[t,e-.5*o,n],[0,0,0],!1);const a=rs(s,dr(.015,.015,1.6*o),ne(16777215,{rough:.9}),[t,e-1.38*o,n],[0,0,0],!1);a.receiveShadow=!1}const tn=90,Rw=100,Pw=200,Iw=300,W={spinRate:1.5,spinY:1.05,spinThick:.34,pistonPeriod:4.4,pistonOutFrac:.32,pistonSpeed:5.5,pistonW:1.5,pistonH:1.5,pistonD:2.6,rollR:1.9,rollMass:120,rollSpeed:7.5,rollPeriod:7,rollRun:18,rollParkY:-40,sweepW:2.2,sweepH:1.3,sweepD:.7,sweepSpeed:3.6,sweepEdgeGap:.6,popW:5.4,popH:1.5,popD:.6,popPeriod:3.4,popUpFrac:.42,popSpeed:4.5,popSink:.15,shutterH:1.6,shutterD:.6,shutterPeriod:4,shutterSpeed:3.2,shutterGapHalf:.55,gateW:5.6,gateH:2.6,gateD:.5,gateSink:3.2,gateSpeed:4,shutterW:6.45,btnPadX:4.6,btnPadAhead:3.6,btnPadHalf:1.15,btnPadMaxY:1.5,rollHitPad:.6,rollKnockSide:90,rollKnockUp:30,rollKnockdownTime:1.4,rollHitCooldown:1.3,hitPad:.42,hitPadY:.12,hitMinSpeed:1.2,hitCooldownTime:2.4,hitMinY:.62,knockPush:62,knockUp:26,knockdownTime:1.15,platH:.4,platW:3.2,platD:3,platY:-.2,platSpeed:2.4,platHold:.6,platRiderGrace:.25,convW:8,convH:.3,convD:8,convY:.15,convSpeed:3.4,convGrip:9,convRideH:1.5,windW:14,windH:4,windD:10,windAccel:6.5,windBallMul:2.6,sockR:1.35,sockY:.35,sockHold:.35,sockMaxSpeed:3.2,sockGrace:.5,leverW:2.2,leverD:2.2,leverY:.06,leverMaxY:1.5,leverGrace:.35};function Lw(s,t){let e=Math.imul(s+1,2654435761)^Math.imul(t+1,2246822507);return e=Math.imul(e^e>>>16,2146121005),e=Math.imul(e^e>>>15,2221713035),((e^e>>>16)>>>0)/4294967296}const Dw=new Set(["spinner","piston","sweeper","shutter"]),sd=new y,Kr=new y;function Nw(s,t){const e=s.shapes[0];if(!(e instanceof We))return!1;const n=e.halfExtents;return t.vsub(s.position,sd),s.quaternion.conjugate().vmult(sd,Kr),Math.abs(Kr.x)<=n.x+W.hitPad&&Math.abs(Kr.y)<=n.y+W.hitPadY&&Math.abs(Kr.z)<=n.z+W.hitPad}function Uw(s,t){let e=[];const n=new Map;function i(){var w,I,A,x;e=[],n.clear();for(const v of s.obstacleSpecs){const P=s.objectById.get(v.id);P&&e.push({spec:v,body:P.body,clock:v.phase,rolling:!1,x:0,cycle:0,homeX:v.arg*(t+W.pistonW*.5),opened:!1,forceOpen:!1,signalOn:!1,sockT:0,sockGraceT:0,leverGraceT:0,leverLatched:!1,dir:1,holdT:0,axis:(((w=v.params)==null?void 0:w.axis)??0)>=.5?1:0,half:((I=v.params)==null?void 0:I.span)!==void 0?Math.max(.5,v.params.span*.5):Math.max(.5,v.arg),speed:((A=v.params)==null?void 0:A.speed)??W.platSpeed,px:v.x??0,py:((x=v.params)==null?void 0:x.y)??W.platY,prevX:0,prevZ:0,riders:new Map})}o()}function o(){for(const w of e){w.clock=w.spec.phase,w.cycle=0,w.rolling=!1,w.opened=!1,w.forceOpen=!1,w.signalOn=!1,w.sockT=0,w.sockGraceT=0,w.leverGraceT=0,w.leverLatched=!1,w.holdT=0,w.riders.clear();const I=w.body;switch(I.velocity.setZero(),I.angularVelocity.setZero(),I.force.setZero(),I.torque.setZero(),w.spec.kind){case"spinner":I.position.set(0,W.spinY,w.spec.z),I.angularVelocity.set(0,W.spinRate,0);break;case"piston":I.position.set(w.homeX,W.pistonH*.5,w.spec.z);break;case"roller":I.position.set(0,W.rollParkY,w.spec.z);break;case"sweeper":I.position.set(-5.300000000000001,W.sweepH*.5,w.spec.z);break;case"popup":I.position.set(w.spec.arg*2.4,-1.5*.5-W.popSink,w.spec.z);break;case"shutter":I.position.set(w.spec.arg*(t+1),W.shutterH*.5,w.spec.z);break;case"platform":{const A=a(w,w.spec.phase);w.dir=A.dir,w.holdT=A.holdT,w.axis===0?I.position.set(w.px+A.off,w.py,w.spec.z):I.position.set(w.px,w.py,w.spec.z+A.off),w.prevX=I.position.x,w.prevZ=I.position.z;break}case"conveyor":I.position.set(w.px,W.convY,w.spec.z);break;case"wind":I.position.set(w.px,W.windH*.5,w.spec.z);break;case"ballsocket":I.position.set(w.px,W.sockY,w.spec.z);break;case"lever":I.position.set(w.px,W.leverY,w.spec.z);break;case"holdgate":I.position.set(w.px,W.gateH*.5,w.spec.z);break;case"coopgate":case"buttongate":I.position.set(0,W.gateH*.5,w.spec.z);break}I.wakeUp()}}function r(w,I){const A=new Set;for(const v of s.physics.contacts)v.bi===w?A.add(v.bj):v.bj===w&&A.add(v.bi);if(A.size===0)return[];const x=[];for(const v of I)if(!(v.pelvis.position.y<w.position.y+.2)){for(const P of v.bodies)if(A.has(P)){x.push(v);break}}return x}function a(w,I){const A=2*w.half/Math.max(.01,w.speed),x=W.platHold,v=2*A+2*x;let P=v>0?I%v:0;return P<0&&(P+=v),P<A?{off:-w.half+w.speed*P,dir:1,holdT:0}:(P-=A,P<x?{off:w.half,dir:-1,holdT:x-P}:(P-=x,P<A?{off:w.half-w.speed*P,dir:-1,holdT:0}:(P-=A,{off:-w.half,dir:1,holdT:x-P})))}function c(w){for(const I of e)if(I.signalOn&&I.spec.link===w)return!0;return!1}function l(w){let I=0;for(const A of e)if(!(A.spec.link!==w||!h(A))&&(I++,!A.signalOn))return!1;return I>0}const h=w=>w.spec.kind==="lever"||w.spec.kind==="ballsocket"||w.spec.kind==="buttongate";function u(){const w=new Set;for(const I of e)I.signalOn&&I.spec.link!==void 0&&w.add(I.spec.link);return[...w].sort((I,A)=>I-A)}function f(w,I,A){var v,P,b;const x=[];for(const[S,R]of n){const L=R-w;L<=0?n.delete(S):n.set(S,L)}for(const S of e){S.clock+=w;const R=S.body;switch(S.spec.kind){case"spinner":R.position.set(0,W.spinY,S.spec.z),R.velocity.setZero(),R.angularVelocity.set(0,W.spinRate,0);break;case"piston":{const G=S.clock%W.pistonPeriod<W.pistonPeriod*W.pistonOutFrac,k=S.spec.arg*(t-W.pistonW*.9),F=(G?k:S.homeX)-R.position.x,H=Math.abs(F)<.05?0:Math.sign(F)*W.pistonSpeed;R.velocity.set(H,0,0),R.position.y=W.pistonH*.5,R.position.z=S.spec.z;break}case"sweeper":{const L=t-W.sweepW*.5-W.sweepEdgeGap,G=L*2,k=G*2/W.sweepSpeed,B=(S.clock%k+k)%k,V=((B<k/2?-L+B/(k/2)*G:L-(B-k/2)/(k/2)*G)-R.position.x)/Math.max(.001,w);R.velocity.set(Math.max(-3.6,Math.min(W.sweepSpeed,V)),0,0),R.position.y=W.sweepH*.5,R.position.z=S.spec.z;break}case"popup":{const G=S.clock%W.popPeriod<W.popPeriod*W.popUpFrac,k=W.popH*.5,B=-1.5*.5-W.popSink,H=(G?k:B)-R.position.y;R.velocity.set(0,Math.abs(H)<.05?0:Math.sign(H)*W.popSpeed,0),R.position.x=S.spec.arg*2.4,R.position.z=S.spec.z;break}case"shutter":{const G=S.clock%W.shutterPeriod<W.shutterPeriod*.5,k=W.shutterW,B=S.spec.arg*(W.shutterGapHalf+k*.5),F=S.spec.arg*(t+k*.5),V=(G?B:F)-R.position.x,$=Math.abs(V)<.05?0:Math.sign(V)*W.shutterSpeed;R.velocity.set($,0,0),R.position.y=W.shutterH*.5,R.position.z=S.spec.z;break}case"buttongate":{if(!S.forceOpen){let k=!1;for(const B of I){if(B.state!=="ACTIVE")continue;const F=B.pelvis.position;if(!(F.y>W.btnPadMaxY)&&!(Math.abs(F.z-(S.spec.z+W.btnPadAhead))>W.btnPadHalf)&&!(Math.abs(Math.abs(F.x)-W.btnPadX)>W.btnPadHalf)){k=!0;break}}if(S.opened=k,k){for(const B of I)if(B.pelvis.position.z<S.spec.z-W.gateD){S.forceOpen=!0;break}}}S.signalOn=S.opened;const G=(S.opened?-2.6*.5-W.gateSink:W.gateH*.5)-R.position.y;R.velocity.set(0,Math.abs(G)<.05?0:Math.sign(G)*W.gateSpeed,0),R.position.x=0,R.position.z=S.spec.z;break}case"coopgate":{if(S.spec.link!==void 0&&(S.opened=S.forceOpen||c(S.spec.link),S.opened)){for(const k of I)if(k.pelvis.position.z<S.spec.z-W.gateD){S.forceOpen=!0;break}}const G=(S.opened?-2.6*.5-W.gateSink:W.gateH*.5)-R.position.y;R.velocity.set(0,Math.abs(G)<.05?0:Math.sign(G)*W.gateSpeed,0),R.position.x=0,R.position.z=S.spec.z;break}case"holdgate":{if(S.opened=S.forceOpen||S.spec.link!==void 0&&l(S.spec.link),S.opened){for(const k of I)if(k.pelvis.position.z<S.spec.z-W.gateD){S.forceOpen=!0;break}}const G=(S.opened?-2.6*.5-W.gateSink:W.gateH*.5)-R.position.y;R.velocity.set(0,Math.abs(G)<.05?0:Math.sign(G)*W.gateSpeed,0),R.position.x=S.px,R.position.z=S.spec.z;break}case"lever":{R.position.set(S.px,W.leverY,S.spec.z),R.velocity.setZero();const L=(((v=S.spec.params)==null?void 0:v.w)??W.leverW)*.5,G=(((P=S.spec.params)==null?void 0:P.len)??W.leverD)*.5;let k=!1;for(const F of I){const H=F.pelvis.position;if(!(H.y>W.leverMaxY)&&!(Math.abs(H.x-S.px)>L)&&!(Math.abs(H.z-S.spec.z)>G)){k=!0;break}}const B=(((b=S.spec.params)==null?void 0:b.hold)??1)>=.5;k?(S.leverLatched=!0,S.leverGraceT=W.leverGrace):S.leverGraceT=Math.max(0,S.leverGraceT-w),S.signalOn=B?k||S.leverGraceT>0:S.leverLatched;break}case"platform":{{const G=R.position.x-S.prevX,k=R.position.z-S.prevZ;for(const B of r(R,I))S.riders.set(B,W.platRiderGrace);for(const[B,F]of S.riders){const H=F-w;H<=0?S.riders.delete(B):S.riders.set(B,H)}if(G!==0||k!==0){const B=(F,H)=>H>=0?Math.max(0,Math.min(F,H)):Math.min(0,Math.max(F,H));for(const F of S.riders.keys()){const H=B(G-F.pelvis.velocity.x*w,G),V=B(k-F.pelvis.velocity.z*w,k);if(!(H===0&&V===0))for(const $ of F.bodies)$.position.x+=H,$.position.z+=V}}S.prevX=R.position.x,S.prevZ=R.position.z}const L=S.speed;S.holdT>0?(S.holdT=Math.max(0,S.holdT-w),R.velocity.setZero()):S.axis===0?(R.velocity.set(S.dir*L,0,0),S.dir>0&&R.position.x>=S.px+S.half?(R.position.x=S.px+S.half,S.dir=-1,S.holdT=W.platHold):S.dir<0&&R.position.x<=S.px-S.half&&(R.position.x=S.px-S.half,S.dir=1,S.holdT=W.platHold)):(R.velocity.set(0,0,S.dir*L),S.dir>0&&R.position.z>=S.spec.z+S.half?(R.position.z=S.spec.z+S.half,S.dir=-1,S.holdT=W.platHold):S.dir<0&&R.position.z<=S.spec.z-S.half&&(R.position.z=S.spec.z-S.half,S.dir=1,S.holdT=W.platHold)),S.axis===0?R.position.z=S.spec.z:R.position.x=S.px,R.position.y=S.py;break}case"conveyor":{R.position.set(S.px,W.convY,S.spec.z),R.velocity.setZero();const L=S.spec.params??{},G=(L.w??W.convW)*.5,k=(L.len??W.convD)*.5,B=L.speed??W.convSpeed,F=(L.dirZ??1)>=0?B:-B,H=W.convY+W.convH*.5,V=(N,Y,st)=>Math.abs(N-S.px)<=G&&Math.abs(st-S.spec.z)<=k&&Y>=H-.35&&Y<=H+W.convRideH,$=N=>{const Y=F-N;return Math.sign(Y)*Math.min(Math.abs(Y),W.convGrip*w)};for(const N of I){const Y=N.pelvis.position;V(Y.x,Y.y,Y.z)&&N.pelvis.applyImpulse(new y(0,0,$(N.pelvis.velocity.z)*N.pelvis.mass))}A&&V(A.position.x,A.position.y,A.position.z)&&(A.wakeUp(),A.applyImpulse(new y(0,0,$(A.velocity.z)*A.mass)));break}case"wind":{R.position.set(S.px,W.windH*.5,S.spec.z),R.velocity.setZero();const L=S.spec.params??{},G=(L.w??W.windW)*.5,k=(L.len??W.windD)*.5,B=L.force??W.windAccel,F=(L.dirX??S.spec.arg)*B,H=(L.dirZ??0)*B,V=($,N,Y)=>Math.abs($-S.px)<=G&&Math.abs(Y-S.spec.z)<=k&&N>=-.2&&N<=W.windH;for(const $ of I){const N=$.pelvis.position;V(N.x,N.y,N.z)&&$.pelvis.applyImpulse(new y(F*w*$.pelvis.mass,0,H*w*$.pelvis.mass))}if(A&&V(A.position.x,A.position.y,A.position.z)){A.wakeUp();const $=A.mass*W.windBallMul*w;A.applyImpulse(new y(F*$,0,H*$))}break}case"ballsocket":{R.position.set(S.px,W.sockY,S.spec.z),R.velocity.setZero();let L=!1;if(A){const G=A.position.x-S.px,k=A.position.z-S.spec.z,B=Math.hypot(A.velocity.x,A.velocity.z);L=Math.hypot(G,k)<=W.sockR&&Math.abs(A.position.y-W.sockY)<1.2&&B<=W.sockMaxSpeed}L?(S.sockT+=w,S.sockGraceT=W.sockGrace):(S.sockT=0,S.sockGraceT=Math.max(0,S.sockGraceT-w)),S.signalOn=S.sockT>=W.sockHold||S.signalOn&&S.sockGraceT>0;break}case"roller":{if(S.rolling)(R.position.z>S.spec.z+W.rollRun||R.position.y<-5)&&(R.position.set(0,W.rollParkY,S.spec.z),R.velocity.setZero(),R.angularVelocity.setZero(),S.rolling=!1,S.cycle++,S.clock=0);else if(S.clock>=W.rollPeriod){const L=Lw(S.spec.id,S.cycle);S.x=(L*2-1)*(t-W.rollR-.4),R.position.set(S.x,W.rollR+.05,S.spec.z),R.velocity.set(0,0,W.rollSpeed),R.angularVelocity.set(W.rollSpeed/W.rollR,0,0),R.wakeUp(),S.rolling=!0,S.clock=0}break}}if(Dw.has(S.spec.kind)){let L=R.velocity.x,G=R.velocity.z,k=Math.hypot(L,G,R.velocity.y);if(S.spec.kind==="spinner"&&(k=1/0),k>=W.hitMinSpeed)for(const B of I){if(B.state!=="ACTIVE"||n.has(B)||B.pelvis.position.y<W.hitMinY||!Nw(R,B.pelvis.position))continue;let F=L,H=G;if(S.spec.kind==="spinner"){const $=B.pelvis.position.x-R.position.x,N=B.pelvis.position.z-R.position.z;F=W.spinRate*N,H=-1.5*$}const V=Math.hypot(F,H);V<.001?(F=0,H=1):(F/=V,H/=V),B.knockdown(W.knockdownTime),B.pelvis.applyImpulse(new y(F*W.knockPush,W.knockUp,H*W.knockPush)),n.set(B,W.hitCooldownTime),x.push({rag:B,dirX:F,dirZ:H})}}if(!(S.spec.kind!=="roller"||!S.rolling))for(const L of I){if(L.state!=="ACTIVE"||n.has(L))continue;const G=L.pelvis.position,k=G.x-R.position.x,B=G.z-R.position.z;if(Math.hypot(k,B)>W.rollR+W.rollHitPad||Math.abs(G.y-R.position.y)>W.rollR+1.2)continue;let F=k;Math.abs(F)<.2&&(F=G.x>=0?1:-1);const H=Math.hypot(F,1)||1;L.knockdown(W.rollKnockdownTime),L.pelvis.applyImpulse(new y(F/H*W.rollKnockSide*.5,W.rollKnockUp,W.rollKnockSide)),n.set(L,W.rollHitCooldown),x.push({rag:L,dirX:F/H,dirZ:1})}}return x}function d(){const w=[];for(const I of e)I.spec.kind==="roller"&&(I.body.position.y<0||w.push({x:I.body.position.x,z:I.body.position.z,r:W.rollR}));return w}function m(w){n.delete(w)}const _=w=>w.spec.kind==="coopgate"&&w.spec.link===void 0;function p(w){if(w===void 0)return 0;let I=0;for(const A of e)A.spec.link===w&&h(A)&&I++;return I}const g=w=>w.spec.kind==="buttongate"?!0:w.spec.kind==="coopgate"?w.spec.link===void 0:w.spec.kind==="holdgate"?p(w.spec.link)>=2:!1;function M(w){if(w===void 0){const v=e.filter(P=>g(P)&&!P.opened);for(const P of v)P.opened=!0,P.forceOpen=!0;return v.length?v[0].spec.z:null}const I=e.filter(v=>_(v)&&!v.opened);if(I.length===0)return null;const x=I.filter(v=>v.spec.z<w).sort((v,P)=>P.spec.z-v.spec.z)[0]??I[0];return x.opened=!0,x.spec.z}function E(){return e.filter(w=>_(w)&&!w.opened).map(w=>w.spec.z)}function T(){return e.filter(w=>w.spec.kind==="buttongate").map(w=>({z:w.spec.z,open:w.body.position.y<0}))}function U(w,I,A,x){return A>W.btnPadMaxY||Math.abs(x-(w+W.btnPadAhead))>W.btnPadHalf?!1:Math.abs(Math.abs(I)-W.btnPadX)<=W.btnPadHalf}function D(){for(const w of e)if(g(w)&&!w.forceOpen)return!0;return!1}return{rebuild:i,park:o,update:f,rollers:d,signals:u,signalActive:c,signalAll:l,forget:m,openGate:M,closedGates:E,needsSoloOpen:D,buttonGates:T,onPad:U,get stations(){return e}}}const Bf={spinner:"live",piston:"live",roller:"live",sweeper:"live",popup:"live",shutter:"live",coopgate:"live",buttongate:"live",platform:"live",conveyor:"live",wind:"live",ballsocket:"live",lever:"live",holdgate:"live",press:"planned",thief:"planned"};function zw(s){return Bf[s]==="live"}const Fw={press:16735603,thief:12882175};function kw(s,t){const e=t.kind,n=Fw[e]??16777215,i=t.x??0,o=t.params??{},r=o.w??o.width??3.2,a=o.len??o.length??2.4;ue(s,[r,.04,a],[i,.028,t.z],n,[0,0,0],{rough:.85});for(const c of[-1,1])ue(s,[r,.06,.18],[i,.045,t.z+c*(a/2-.09)],2830136,[0,0,0],{rough:.8});for(const c of[-1,1])lo(s,.14,.18,.9,[i+c*(r/2-.2),.45,t.z],n,[0,0,0],{rough:.5})}const ir=[],oe=7,Ow=2.6,hi=1.2,ks=4.2,Hf=[[6,"WASD",4176112],[-1,"F",15765823],[-6,"SHIFT",10185983],[-11,"E",4180362]],Bw=2.6;function Hw(s){const t=Array.isArray(s)?{z0:s[0],z1:s[1],half:s[2]}:s;return{...t,x:t.x??0}}function ko(s){return function({b:e,addProp:n,addBall:i,addHazard:o,addObstacle:r}){const{startZ:a,finishZ:c}=s,l=Mu(s.seed),h=s.sections.map(Hw),u=s.label??"stage";function f(v){const{z0:P,z1:b,half:S,x:R}=v,L=v.color??He.laneB,G=P-b,k=(P+b)/2;An(e,[S*2,hi,G],[R,-hi/2,k],L,[0,0,0],{rough:.6});for(let B=b;B<P;B+=4){const F=Math.min(4,P-B);ue(e,[S*2-.4,.04,F*.5],[R,.02,B+F*.25],He.laneA,[0,0,0],{rough:.75})}for(const B of[-1,1])ue(e,[.5,.06,G],[R+B*(S-.25),.03,k],He.laneEdge,[0,0,0],{rough:.6});ue(e,[S*2+.5,.5,G],[R,-hi-.2,k],He.skirt,[0,0,0],{rough:.7})}function d(v,P){ue(e,[oe*2-.6,.06,.7],[0,.045,v],P,[0,0,0],{rough:.7});for(const b of[-1,1])lo(e,.28,.28,3.4,[b*(oe-.4),1.7,v],P,[0,0,0],{rough:.45});ue(e,[oe*2,.32,.32],[0,3.4,v],P,[0,0,0],{rough:.45})}for(const v of h)f(v);for(const[v,P]of s.gates)d(v,P);const m=(v,P)=>h.some(b=>P<=b.z0+.01&&P>=b.z1-.01&&Math.abs(v-b.x)<=b.half+.01);for(const v of h){for(const[P,b]of[[v.z0,1],[v.z1,-1]]){if(m(v.x,P+b*.6)||Math.abs(P-a)<.01||Math.abs(P-c)<.01)continue;const S=Math.max(3,Math.round(v.half)),R=v.half*2/S;for(let L=0;L<S;L++)ue(e,[R*.86,.07,.7],[v.x-v.half+R*(L+.5),.05,P-b*.4],L%2?2830136:16765286,[0,0,0],{rough:.8})}if(!(v.half>=oe))for(const P of[-1,1])m(v.x+P*(v.half+.6),(v.z0+v.z1)/2)||ue(e,[.34,.07,v.z0-v.z1],[v.x+P*(v.half-.17),.045,(v.z0+v.z1)/2],16735603,[0,0,0],{rough:.7})}{const v=[];for(let P=a-1;P>c+1;P-=1)m(0,P)||v.push(P);v.length&&console.warn(`[course:${u}] x=0에 바닥이 없는 z가 ${v.length}곳 있다 (${v[0]} ~ ${v[v.length-1]}). 떨어진 공이 x=0으로 되돌아오므로 그 자리에서 무한히 다시 떨어진다. 좁아도 좋으니 가운데를 잇는 판을 남길 것.`)}for(const v of h)for(let P=v.z0-8;P>v.z1;P-=26)for(const b of[-1,1])lo(e,.5,.34,14,[v.x+b*(v.half-1),-hi-7.2,P],He.post,[0,0,0],{rough:.6});ue(e,[oe*2-.6,.05,11],[0,.035,a-5.5],He.start,[0,0,0],{rough:.7}),ue(e,[oe*2-.6,.05,9],[0,.035,c+4.5],He.finish,[0,0,0],{rough:.7});for(let v=0;v<14;v++){const P=(oe*2-.6)/14;ue(e,[P,.06,.5],[-oe+.3+P*(v+.5),.045,c+9],v%2?16777215:2830136,[0,0,0],{rough:.8})}ue(e,[oe*2-.6,.06,.4],[0,.045,a-11.5],16777215,[0,0,0],{rough:.8});const _=oe+3.2,p=1.5,g=1.6;function M(v,P){const b=[];for(const[L,G]of s.shortcuts??[])for(const k of[L,G]){const B=Math.min(v,k+g),F=Math.max(P,k-g);B>F&&b.push([B,F])}if(b.length===0)return[[v,P]];b.sort((L,G)=>G[0]-L[0]);const S=[];let R=v;for(const[L,G]of b)R>L&&S.push([R,L]),R=Math.min(R,G);return R>P&&S.push([R,P]),S}for(const[v,P]of s.shortcuts??[]){const b=v-P;An(e,[p*2,hi,b],[_,-hi/2,(v+P)/2],He.laneB,[0,0,0],{rough:.6});for(const S of[-1,1])ue(e,[.34,.07,b],[_+S*(p-.17),.04,(v+P)/2],16735603,[0,0,0],{rough:.7});ue(e,[p*2+.5,.5,b],[_,-hi-.2,(v+P)/2],He.skirt,[0,0,0],{rough:.7});for(const S of[v,P]){const R=(oe+_-p)/2,L=_-p-oe;An(e,[L,hi,g*2],[R,-hi/2,S],He.laneB,[0,0,0],{rough:.6}),ue(e,[L+1.2,.06,.34],[R,.045,S+g-.2],16765286,[0,0,0],{rough:.7}),ue(e,[L+1.2,.06,.34],[R,.045,S-g+.2],16765286,[0,0,0],{rough:.7})}for(const[S,R]of[[v,1],[P,-1]])An(e,[p*2,1.2,.4],[_,.6,S+R*(g+.2)],He.fence,[0,0,0],{rough:.5}),ue(e,[p*2,.14,.5],[_,1.27,S+R*(g+.2)],16735603,[0,0,0],{rough:.4});for(let S=v-6;S>P;S-=26)lo(e,.45,.3,14,[_,-hi-7.2,S],He.post,[0,0,0],{rough:.6})}for(const v of h){const P=v.fence??"auto",b=v.half<oe,S=P==="both"||P==="left"||P==="auto"&&!b,R=P==="both"||P==="right"||P==="auto"&&!b,L=v.curb??(!S||!R);if(S&&ed(e,v.x-v.half,v.z0,v.z1),R)for(const[G,k]of M(v.z0,v.z1))ed(e,v.x+v.half,G,k);if(b)for(const G of[v.z0,v.z1])for(const k of[-1,1])k<0&&S||k>0&&R||lo(e,.34,.34,2.2,[v.x+k*(v.half+.4),1.1,G],16765286,[0,0,0],{rough:.45});if(L)for(const G of[-1,1])G<0&&S||G>0&&R||An(e,[.22,.42,v.z0-v.z1],[v.x+G*(v.half-.11),.21,(v.z0+v.z1)/2],16765286,[0,0,0],{rough:.6})}for(const v of[a,c])An(e,[oe*2,1.7,.4],[0,.85,v],He.fence,[0,0,0],{rough:.5}),ue(e,[oe*2,.16,.5],[0,1.78,v],He.fenceTop,[0,0,0],{rough:.4});const E=v=>{let P=0;for(const b of h)v<=b.z0&&v>=b.z1&&(P=Math.max(P,Math.abs(b.x)+b.half));return P||oe};for(let v=a+6;v>c-10;v-=11){const P=l()>.5?1:-1;id(e,P*(oe+5+l()*5),-2-l()*4,v+l()*5,1.1+l()*.9),l()>.5&&id(e,-P*(oe+7+l()*6),3+l()*5,v-l()*6,.9+l()*.8)}let T=0;for(let v=a-4;v>c+4;v-=14)for(const P of[-1,1]){const b=He.balloon[T++%He.balloon.length];Cw(e,P*(E(v)+1.1),3.2+T%3*.5,v,b,1)}(s.hazards??[]).forEach((v,P)=>o(Rw+P,v,2.2+P*1.15));for(let v=ir.length-1;v>=0;v--)ir[v].map===u&&ir.splice(v,1);const U=new Map,D=v=>{if(v===void 0)return;let P=U.get(v);return P===void 0&&(P=U.size,U.set(v,P)),P};let w=Pw;for(const v of s.gimmicks??[]){if(!zw(v.kind)){kw(e,v),ir.push({map:u,kind:v.kind,z:v.z});continue}if(r(w++,v.kind,v.z,v.arg??0,v.phase??0,{x:v.x,params:v.params,link:D(v.link)}),v.kind==="buttongate")for(const P of[-1,1]){const b=P*W.btnPadX,S=v.z+W.btnPadAhead;ue(e,[W.btnPadHalf*2,.06,W.btnPadHalf*2],[b,.045,S],9133302,[0,0,0],{rough:.6}),ue(e,[W.btnPadHalf*1.5,.09,W.btnPadHalf*1.5],[b,.07,S],16765286,[0,0,0],{rough:.5}),ue(e,[.14,.05,W.btnPadAhead],[b,.035,v.z+W.btnPadAhead/2],9133302,[0,0,0],{rough:.7})}}let I=Iw;for(const v of s.props??[])n(I++,v.size,v.pos,v.color,v.mass,v.grabRadius??Math.max(...v.size)*.8);for(const v of s.ballSlots??[])Aw(e,v,oe);if(s.tutorial)for(const[v,P,b]of Hf)bw(e,0,v,5.2,4.2,P,b);Tw(e,c+6,ks);const[A,x]=s.ballStart??[0,a-11];i(tn,.3,[A,.31,x])}}const Gw={id:"s1-warmup",name:"1. 몸풀기",blurb:"굴리고, 차고, 넣는다",timeLimit:190,targetId:tn,targetName:"공",goal:{x:0,z:-104,radius:2.4,halfWidth:ks},spawns:[[-1.6,10],[1.6,10],[-3.6,10],[3.6,10]],ballSlots:[-56],tutorial:!0,floor:{size:30,color:9430015,outside:10475775,hideOutside:!0,hideFloor:!0,noGround:!0},fog:[12577279,70,210],build:ko({label:"s1-warmup",startZ:18,finishZ:-110,seed:20260827,tutorial:!0,sections:[[18,-12,oe],[-12,-52,oe],[-52,-110,oe]],gates:[[-12,He.laneEdge],[-52,16747069]],hazards:[2,-30,-76],gimmicks:[{kind:"popup",z:-20,arg:-1,phase:0,note:"첫 장애물. 내려간 사이에 지나간다"},{kind:"spinner",z:-33,arg:4.2,phase:1,note:"몸은 못 지나가고 공은 굴려 통과"},{kind:"piston",z:-46,arg:-1,phase:.4,note:"길이 좁아지는 타이밍"},{kind:"sweeper",z:-66,arg:0,phase:0,note:"지나갈 틈이 좌우로 움직인다"},{kind:"popup",z:-78,arg:1,phase:1.2},{kind:"piston",z:-86,arg:1,phase:1.6,note:"마지막 관문. 여기부터 골까지는 비어 있다"}],ballSlots:[-56]})},Vw={id:"s2-levers",name:"2. 양쪽 레버",blurb:"둘이 같이 밟고 있어야 열린다",timeLimit:230,targetId:tn,targetName:"공",goal:{x:0,z:-124,radius:2.4,halfWidth:ks},spawns:[[-1.6,10],[1.6,10],[-3.6,10],[3.6,10]],botSpawns:[[3.4,-26]],ballSlots:[-40],floor:{size:30,color:13170136,outside:11857097,hideOutside:!0,hideFloor:!0,noGround:!0},fog:[13826018,68,205],build:ko({label:"s2-levers",startZ:18,finishZ:-130,seed:5150220,sections:[[18,-14,oe],[-14,-70,oe],[-70,-130,oe]],gates:[[-14,8121759],[-70,16765286]],hazards:[-4,-42,-100],gimmicks:[{kind:"buttongate",z:-20,arg:0,phase:0,note:"배우는 자리. 주변에 아무것도 없다"},{kind:"spinner",z:-34,arg:4.2,phase:.8},{kind:"buttongate",z:-50,arg:0,phase:0,note:"회전봉 뒤. 발판 자리를 골라야 한다"},{kind:"popup",z:-62,arg:-1,phase:.5},{kind:"sweeper",z:-76,arg:0,phase:.3},{kind:"buttongate",z:-92,arg:0,phase:0,note:"지난 쪽이 곧바로 다음 압박을 만난다"},{kind:"piston",z:-106,arg:1,phase:.6,note:"여기부터 골(-124)까지 18m는 비워 둔다"}],ballSlots:[-40]})},od=4.9,Lc=1.6,Ww={id:"s3-movingfloor",name:"3. 움직이는 바닥",blurb:"갈라진 길과 낭떠러지",timeLimit:240,targetId:tn,targetName:"공",goal:{x:0,z:-124,radius:2.4,halfWidth:ks},spawns:[[-1.6,10],[1.6,10],[-3.6,10],[3.6,10]],floor:{size:30,color:16769202,outside:16765088,hideOutside:!0,hideFloor:!0,noGround:!0},fog:[16769728,65,200],build:ko({label:"s3-movingfloor",startZ:18,finishZ:-130,seed:30303030,sections:[{z0:18,z1:-14,half:oe},{z0:-14,z1:-46,half:Lc,x:0,fence:"none",curb:!1},{z0:-14,z1:-46,half:Lc,x:-od,fence:"left",curb:!0},{z0:-14,z1:-46,half:Lc,x:od,fence:"right",curb:!0},{z0:-46,z1:-50,half:oe},{z0:-50,z1:-60,half:.9,x:0,fence:"none",curb:!0},{z0:-60,z1:-130,half:oe}],gates:[[-14,16765286],[-50,16735603],[-60,8150271]],hazards:[4,-66,-96],gimmicks:[{kind:"sweeper",z:-22,arg:0,phase:0,note:"틈 위를 가로질러 온다. 밀리면 그대로 낙하"},{kind:"popup",z:-34,arg:0,phase:.6,note:"가운데 줄을 막는다 = 옆줄로 갈라지게 만든다"},{kind:"platform",z:-55,x:-4.6,phase:0,params:{axis:1,span:10,speed:2.4,w:3.2,len:3},note:"외줄 다리의 넓고 느린 대안. 왼쪽"},{kind:"platform",z:-55,x:4.6,phase:2.1,params:{axis:1,span:10,speed:2.4,w:3.2,len:3},note:"같은 것 오른쪽. 위상을 어긋나게 둔다"},{kind:"spinner",z:-70,arg:4.4,phase:.5},{kind:"roller",z:-92,arg:0,phase:0},{kind:"piston",z:-102,arg:-1,phase:0},{kind:"piston",z:-106,arg:1,phase:1.2,note:"여기부터 골(-124)까지는 비워 둔다"}]})},Xw=[{kind:"spinner",z:-10,arg:4.4,phase:0},{kind:"piston",z:-22,arg:-1,phase:0},{kind:"sweeper",z:-34,arg:0,phase:0},{kind:"popup",z:-46,arg:0,phase:0},{kind:"shutter",z:-58,arg:-1,phase:0},{kind:"shutter",z:-58,arg:1,phase:0},{kind:"coopgate",z:-70,arg:0,phase:0},{kind:"buttongate",z:-88,arg:0,phase:0},{kind:"roller",z:-118,arg:0,phase:0}],qw=[{kind:"lever",z:-130,x:-4.5,link:"lab-door",phase:0,params:{hold:1,w:2.2,len:2.2},note:"hold=1이면 밟고 있는 동안만 켜짐, 0이면 한 번 켜면 유지"},{kind:"lever",z:-130,x:4.5,link:"lab-door",phase:0,params:{hold:1,w:2.2,len:2.2}},{kind:"holdgate",z:-142,link:"lab-door",params:{w:5.6,h:2.6},note:"같은 link의 lever가 전부 켜져 있는 동안만 열린다"},{kind:"platform",z:-152,x:0,phase:0,params:{axis:0,span:8,speed:2.4,w:3.2,len:3},note:"axis 0=x축 왕복 / 1=z축 왕복. 위에 탄 것을 같이 옮긴다"},{kind:"wind",z:-162,params:{dirX:1,dirZ:0,force:26,w:14,len:10,period:5.2,onFrac:.55},note:"구역 안의 사람과 공을 dir 방향으로 민다. period/onFrac으로 켜졌다 꺼진다"},{kind:"conveyor",z:-172,params:{dirZ:1,speed:3.4,w:8,len:8},note:"dirZ +1이면 플레이어를 출발선 쪽으로 되돌려 보낸다"},{kind:"press",z:-182,x:0,phase:0,params:{w:5,len:3,period:3.6,downFrac:.3,speed:6},note:"위에서 내려와 찍고 올라간다. 아래 있으면 넘어진다"},{kind:"thief",z:-192,params:{speed:4.2,stealRange:1.6,flee:18,respawn:6},note:"공을 빼앗아 flee(m)만큼 도망간다. 넘어지면 공을 놓는다"}],Yw={id:"lab",name:"기믹 시험장",blurb:"기믹을 하나씩 세워 둔 작업대",timeLimit:900,targetId:tn,targetName:"공",goal:{x:0,z:-224,radius:2.4,halfWidth:ks},spawns:[[-1.6,10],[1.6,10],[-3.6,10],[3.6,10]],floor:{size:30,color:15132400,outside:14079718,hideOutside:!0,hideFloor:!0,noGround:!0},fog:[15263988,80,260],build:ko({label:"lab",startZ:18,finishZ:-230,seed:1,sections:[[18,-230,oe]],gates:[[-124,16735603]],gimmicks:[...Xw,...qw]})},Kw={id:"canyon",name:"회전 협곡 (보관)",blurb:"공만 지나가는 틈과 좁은 다리",timeLimit:230,targetId:tn,targetName:"공",goal:{x:0,z:-134,radius:2.4,halfWidth:ks},spawns:[[-1.6,10],[1.6,10],[-3.6,10],[3.6,10]],botSpawns:[[3.2,-50],[-3.2,-112]],ballSlots:[-20,-104],floor:{size:30,color:16769202,outside:16765088,hideOutside:!0,hideFloor:!0,noGround:!0},fog:[16769728,65,200],build:ko({label:"canyon",startZ:18,finishZ:-140,seed:771133,sections:[[18,-10,oe],[-10,-56,oe],[-56,-96,Ow],[-96,-140,oe]],gates:[[-10,16765286],[-56,16747069],[-96,8150271]],hazards:[-4,-34,-108],ballSlots:[-20,-104],gimmicks:[{kind:"sweeper",z:-26,arg:0,phase:0},{kind:"buttongate",z:-36,arg:0,phase:0},{kind:"spinner",z:-46,arg:4.4,phase:1.1},{kind:"piston",z:-52,arg:-1,phase:0},{kind:"popup",z:-52,arg:1,phase:.9},{kind:"coopgate",z:-70,arg:0,phase:0},{kind:"popup",z:-98,arg:0,phase:.7},{kind:"spinner",z:-110,arg:4.4,phase:.5},{kind:"piston",z:-113,arg:1,phase:1.4}],shortcuts:[[-40,-56]]})},jw={id:"denof",name:"봇 소굴 (보관)",blurb:"셔터 통로와 방해꾼 셋",timeLimit:260,targetId:tn,targetName:"공",goal:{x:0,z:-154,radius:2.4,halfWidth:ks},spawns:[[-1.6,10],[1.6,10],[-3.6,10],[3.6,10]],botSpawns:[[3.4,-34],[-3.4,-86],[2.6,-108]],ballSlots:[-72],floor:{size:30,color:14272767,outside:13219583,hideOutside:!0,hideFloor:!0,noGround:!0},fog:[14208255,60,190],build:ko({label:"denof",startZ:18,finishZ:-160,seed:424242,sections:[[18,-14,oe],[-14,-60,oe],[-60,-100,oe],[-100,-160,oe]],gates:[[-14,8150271],[-60,16747069],[-100,16765286]],hazards:[-6,-50,-112],ballSlots:[-72],gimmicks:[{kind:"buttongate",z:-16,arg:0,phase:0},{kind:"shutter",z:-24,arg:-1,phase:0},{kind:"shutter",z:-24,arg:1,phase:0},{kind:"roller",z:-44,arg:0,phase:0},{kind:"spinner",z:-54,arg:4.4,phase:.8},{kind:"coopgate",z:-66,arg:0,phase:0},{kind:"piston",z:-78,arg:-1,phase:0},{kind:"piston",z:-81,arg:1,phase:1.1},{kind:"sweeper",z:-92,arg:0,phase:.5},{kind:"coopgate",z:-102,arg:0,phase:0},{kind:"shutter",z:-104,arg:-1,phase:1.3},{kind:"shutter",z:-104,arg:1,phase:1.3},{kind:"popup",z:-108,arg:0,phase:.4},{kind:"buttongate",z:-114,arg:0,phase:0},{kind:"spinner",z:-120,arg:4.4,phase:.3}],shortcuts:[[-86,-100]]})},Zw=[Kw,jw],Gf=[{no:1,id:"s1-warmup",name:"몸풀기",theme:"이동 · 드리블 · 킥 · 골. 규칙을 배운다",coop:"공 전용 틈에서 공과 사람이 갈라진다 — 먼저 돌아 나온 쪽이 공을 잇는다",needs:["popup","spinner","piston","sweeper"],terrain:"튜토리얼 패드, 공 전용 틈",status:"playable"},{no:2,id:"s2-levers",name:"양쪽 레버",theme:"눌러 두는 동안에만 열리는 문",coop:"한 명이 발판 위에서 버티고 다른 한 명이 공을 몰고 지난다. 손을 떼면 닫힌다",needs:["buttongate","spinner","popup","sweeper","piston"],terrain:"공 전용 틈",status:"playable"},{no:3,id:"s3-movingfloor",name:"움직이는 바닥",theme:"바닥이 갈라지고 끊긴다",coop:"길이 셋인데 공은 하나다. 갈라서면 공을 틈 너머로 건네야 한다",needs:["platform","sweeper","popup","spinner","roller","piston"],terrain:"세 갈래 + 사이 낭떠러지, 외줄 다리",status:"playable"},{no:4,id:"s4-push",name:"양쪽에서 밀어",theme:"혼자서는 움직이지 않는 무게",coop:"질량으로 강제한다. 한 사람 몫의 밀기 힘으로는 안 밀리는 상자를 길이 막고 있다",needs:["conveyor","piston"],terrain:"무거운 상자(props), 상자를 끼워 넣어야 건너는 홈",status:"designed"},{no:5,id:"s5-wind",name:"바람이 분다",theme:"사람과 공을 옆으로 밀어내는 바람",coop:"한 명이 바람막이 뒤에 서서 바람을 끊어 주고 그 그늘로 다른 한 명이 공을 민다",needs:["wind","popup","sweeper"],terrain:"바람 방향으로 뚫린 낭떠러지, 이동 가능한 바람막이(props)",status:"designed"},{no:6,id:"s6-thief",name:"공 도둑",theme:"AI가 공을 빼앗아 도망간다",coop:"혼자서는 못 잡는다 — 한 명이 길을 막고 다른 한 명이 몰아간다",needs:["thief","shutter","spinner","roller"],terrain:"막다른 골목과 되돌아오는 순환로 (몰이가 성립하는 지형)",status:"designed"},{no:7,id:"s7-twopaths",name:"두 개의 길",theme:"둘이 아예 다른 길을 간다",coop:"한쪽 길에만 레버가 있고 다른 쪽 길에만 공이 지나갈 수 있다. 서로를 볼 수 없다",needs:["lever","holdgate","spinner","piston"],terrain:"완전히 갈라진 두 갈래(중앙에 벽), 공만 넘어가는 창",status:"designed"},{no:8,id:"s8-factory",name:"공장",theme:"컨베이어 · 회전 · 프레스 · 낙하물이 겹친다",coop:"컨베이어가 공을 계속 되돌려 보낸다. 한 명이 프레스 타이밍을 잡아 주고 다른 한 명이 통과",needs:["conveyor","press","spinner","shutter","piston"],terrain:"층이 나뉜 라인, 아래로 떨어진 공이 다시 올라오는 경로",status:"designed"},{no:9,id:"s9-chaos",name:"대혼돈",theme:"지금까지의 기믹을 전부 섞는다 + 시간 제한",coop:"공을 떨어뜨려도 되돌아오는 구조라, 한 명이 회수하러 가는 동안 다른 한 명이 길을 연다",needs:["wind","conveyor","press","platform","buttongate","roller","sweeper"],terrain:"떨어진 공이 다시 코스로 올라오는 회수 경사로",status:"designed"},{no:10,id:"s10-final",name:"THE FINAL RUSH",theme:"핵심 기믹을 하나의 긴 코스에",coop:"마지막 골은 둘이 같이 넣어야 한다 (한 명이 문을 열어 둔 채 다른 한 명이 슛)",needs:["holdgate","lever","platform","wind","conveyor","press","thief"],terrain:"각 스테이지의 대표 구간을 한 줄로 이은 장거리 코스",status:"designed"}];function $w(s){return s.needs.filter(t=>Bf[t]!=="live")}function Jw(){const s=new Map,t=new Map;for(const e of Gf)for(const n of $w(e))s.has(n)||s.set(n,e.no),t.set(n,(t.get(n)??0)+1);return[...s].map(([e,n])=>({kind:e,stage:n,count:t.get(e)??0})).sort((e,n)=>e.stage-n.stage)}const Vf=[Gw,Vw,Ww],Qw=typeof location<"u"&&new URLSearchParams(location.search).has("lab"),ri=Qw?[Yw,...Zw]:Vf;typeof window<"u"&&(window.__stages={MAPS:ri,STAGES:Vf,plans:Gf,pending:ir,backlog:Jw});const ve={radius:1.1,mass:40,hoverY:13,warnTime:1.3,linger:1.9,period:6.2,hitPad:.75,hitVertical:1.6,knockSide:78,knockUp:34,knockdownTime:1.5,hitCooldown:1.2,voidY:-8};function tS(s,t){let e=Math.imul(s+1,2654435761)^Math.imul(t+1,2246822507);return e=Math.imul(e^e>>>16,2146121005),e=Math.imul(e^e>>>15,2221713035),((e^e>>>16)>>>0)/4294967296}function eS(s,t){let e=[];const n=new Map;function i(){e=[],n.clear();for(const h of s.hazardSpecs){const u=s.objectById.get(h.id);u&&e.push({spec:h,body:u.body,phase:"wait",timer:h.phase,x:0,cycle:0})}o()}function o(){for(const h of e)h.phase="wait",h.timer=h.spec.phase,h.cycle=0,r(h,0)}function r(h,u){h.body.position.set(u,ve.hoverY,h.spec.z),h.body.velocity.setZero(),h.body.angularVelocity.setZero(),h.body.force.setZero(),h.body.torque.setZero(),h.body.wakeUp()}function a(h,u){const f=[];for(const[d,m]of n){const _=m-h;_<=0?n.delete(d):n.set(d,_)}for(const d of e){switch(d.timer-=h,d.phase){case"wait":if(d.timer<=0){const m=tS(d.spec.id,d.cycle);d.x=(m*2-1)*(t-ve.radius-.6),d.phase="warn",d.timer=ve.warnTime,r(d,d.x)}else r(d,d.x);break;case"warn":r(d,d.x),d.timer<=0&&(d.phase="fall",d.timer=6);break;case"fall":(d.body.position.y<=ve.radius+.35||d.timer<=0)&&(d.phase="linger",d.timer=ve.linger);break;case"linger":d.timer<=0&&(d.cycle++,d.phase="wait",d.timer=ve.period,r(d,0));break}if(!(d.phase!=="fall"&&d.phase!=="linger"))for(const m of u){if(m.state!=="ACTIVE"||n.has(m))continue;const _=m.pelvis.position,p=_.x-d.body.position.x,g=_.z-d.body.position.z;if(Math.hypot(p,g)>ve.radius+ve.hitPad||Math.abs(_.y-d.body.position.y)>ve.radius+ve.hitVertical)continue;let E=p,T=g;const U=Math.hypot(E,T);U<.001?(E=_.x>=0?1:-1,T=0):(E/=U,T/=U),m.knockdown(ve.knockdownTime),m.pelvis.applyImpulse(new y(E*ve.knockSide,ve.knockUp,T*ve.knockSide)),m.torso.applyImpulse(new y(E*ve.knockSide*.35,0,T*ve.knockSide*.35)),n.set(m,ve.hitCooldown),f.push({rag:m,dirX:E,dirZ:T})}}return f}function c(){const h=[];for(const u of e){const f=u.body.position.y;f<ve.radius+.6||h.push({x:u.body.position.x,z:u.body.position.z,y:f,r:ve.radius})}return h}function l(h){n.delete(h)}return{rebuild:i,park:o,update:a,activeMarkers:c,forget:l,get stations(){return e}}}function nS(s){const t=new Sf,e=new lu(14281983,45,130);t.fog=e;const n=new Dn(70,window.innerWidth/window.innerHeight,.1,220),i=new __({antialias:!0});i.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.setSize(window.innerWidth,window.innerHeight),i.toneMapping=Xd,i.toneMappingExposure=1,i.shadowMap.enabled=!0,i.shadowMap.type=Vd,s.appendChild(i.domElement);const o=new Fl(i),r=new xw;t.environment=o.fromScene(r,.04).texture,t.environmentIntensity=.35,r.dispose(),o.dispose(),t.add(new k_(16777215,.12)),t.add(new N_(12574975,15258536,.4));const a=new Dh(16773852,2.7);a.position.set(17,19,11),a.castShadow=!0,a.shadow.mapSize.set(2048,2048),a.shadow.camera.left=-22,a.shadow.camera.right=22,a.shadow.camera.top=22,a.shadow.camera.bottom=-22,a.shadow.camera.near=1,a.shadow.camera.far=70,a.shadow.bias=-6e-4,a.shadow.normalBias=.025,t.add(a),t.add(a.target);const c=new Dh(11128319,.28);c.position.set(-12,9,-14),t.add(c);const l=new Pt(new ls(95,32,20),new yn({map:Sw(),side:fn,depthWrite:!1,fog:!1}));l.renderOrder=-1,t.add(l);const h=new hw({gravity:new y(0,-18,0)});h.broadphase=new Pf,h.allowSleep=!1,h.solver.iterations=22,h.solver.tolerance=5e-4;const u=new zi("ground"),f=new zi("player"),d=new zi("prop"),m=new zi("held"),_=new zi("ball");h.addContactMaterial(new Ln(u,f,{friction:.55,restitution:0})),h.addContactMaterial(new Ln(u,d,{friction:.2,restitution:.05})),h.addContactMaterial(new Ln(f,d,{friction:.3,restitution:.05})),h.addContactMaterial(new Ln(u,m,{friction:.004,restitution:.05})),h.addContactMaterial(new Ln(f,m,{friction:.3,restitution:.05})),h.addContactMaterial(new Ln(d,m,{friction:.2,restitution:.05})),h.addContactMaterial(new Ln(u,_,{friction:.32,restitution:.45})),h.addContactMaterial(new Ln(f,_,{friction:.28,restitution:.35})),h.addContactMaterial(new Ln(d,_,{friction:.25,restitution:.45}));const p=ww();p.anisotropy=i.capabilities.getMaxAnisotropy();const g=new Pt(new zs(30,30),new us({map:p,roughness:.72,metalness:.02}));g.rotation.x=-Math.PI/2,g.receiveShadow=!0,t.add(g);const M=new Pt(new zs(190,190),new us({color:8306794,roughness:.95,metalness:0}));M.rotation.x=-Math.PI/2,M.position.y=-.08,t.add(M);const E=new gt({type:gt.STATIC,shape:new Yy,material:u});E.quaternion.setFromEuler(-Math.PI/2,0,0),h.addBody(E);const T=[],U=new Map;let D=null,w=[],I=0;const A=[],x=(B,F,H,V,$,N,Y,st={rough:.45})=>{const at=new Mn,pt=new Pt(Te(F[0],F[1],F[2]),ne(V,st));pt.castShadow=!0,pt.receiveShadow=!0,at.add(pt),Y==null||Y(at),at.position.set(H[0],H[1],H[2]),t.add(at);const nt=new gt({mass:$,shape:new We(new y(F[0]/2,F[1]/2,F[2]/2)),position:new y(H[0],H[1],H[2]),material:d});nt.angularDamping=.2,nt.linearDamping=.02,h.addBody(nt);const Mt={id:B,mesh:at,body:nt,grabRadius:N,mass:$};T.push(Mt),U.set(B,Mt)},v=(B,F,H,V={})=>{const{mass:$=1.1,color:N=16777215,patch:Y=2830136}=V,st=new Mn,at=new Pt(Ui(F,28),ne(N,{rough:.38}));at.castShadow=!0,at.receiveShadow=!0,st.add(at);const pt=[[0,1,0],[0,-1,0],[1,.3,.5],[-1,.3,-.5],[.5,-.3,-1],[-.5,-.3,1],[.8,.2,-.8],[-.8,.2,.8]];for(const yt of pt){const Dt=Math.hypot(yt[0],yt[1],yt[2]),X=new Pt(Ui(F*.34,14),ne(Y,{rough:.4}));X.position.set(yt[0]/Dt*F*.86,yt[1]/Dt*F*.86,yt[2]/Dt*F*.86),X.scale.set(1,1,1),st.add(X)}st.position.set(H[0],H[1],H[2]),t.add(st);const nt=new gt({mass:$,shape:new xi(F),position:new y(H[0],H[1],H[2]),material:_});nt.angularDamping=.65,nt.linearDamping=.012,h.addBody(nt);const Mt={id:B,mesh:st,body:nt,grabRadius:F+1.6,grabReach:1.5,mass:$};T.push(Mt),U.set(B,Mt)},P=[],b=(B,F,H)=>{const V=new Mn,$=new Pt(Ui(ve.radius,24),ne(16735603,{rough:.35}));$.castShadow=!0,$.receiveShadow=!0,V.add($);for(const[st,at]of[[.55,.62],[-.55,.62],[0,.9]]){const pt=new Pt(Ui(ve.radius*at,18),ne(16765286,{rough:.4}));pt.position.y=ve.radius*st,pt.scale.set(1,.42,1),V.add(pt)}V.position.set(0,ve.hoverY,F),t.add(V);const N=new gt({mass:ve.mass,shape:new xi(ve.radius),position:new y(0,ve.hoverY,F),material:d});N.angularDamping=.35,N.linearDamping=.008,h.addBody(N);const Y={id:B,mesh:V,body:N,grabRadius:0,grabbable:!1,mass:ve.mass};T.push(Y),U.set(B,Y),P.push({id:B,z:F,phase:H})},S=[],R=(B,F,H,V,$,N)=>{var pt,nt,Mt,yt,Dt,X,ce,Bt,Yt,Ct,qt,It,O;const Y=new Mn;let st;if(F==="roller"){const C=new Pt(Ui(W.rollR,26),ne(16747069,{rough:.4}));C.castShadow=!0,C.receiveShadow=!0,Y.add(C);for(const q of[.5,-.5]){const J=new Pt(Ui(W.rollR*.72,20),ne(2830149,{rough:.5}));J.position.y=W.rollR*q,J.scale.set(1,.34,1),Y.add(J)}st=new gt({mass:W.rollMass,shape:new xi(W.rollR),position:new y(0,W.rollParkY,H),material:d}),st.angularDamping=.05,st.linearDamping=.005}else if(F==="spinner"){const C=new Pt(Te(V*2,W.spinThick,W.spinThick),ne(16765286,{rough:.35}));C.castShadow=!0,C.receiveShadow=!0,Y.add(C);for(const q of[-1,1]){const J=new Pt(Te(W.spinThick*1.6,W.spinThick*1.6,W.spinThick*1.6),ne(16735603,{rough:.35}));J.position.x=q*V,Y.add(J)}st=new gt({mass:0,type:gt.KINEMATIC,shape:new We(new y(V,W.spinThick*.5,W.spinThick*.5)),position:new y(0,W.spinY,H),material:d})}else if(F==="sweeper"){const C=new Pt(Te(W.sweepW,W.sweepH,W.sweepD),ne(3200672,{rough:.4}));C.castShadow=!0,C.receiveShadow=!0,Y.add(C);for(const q of[-1,1]){const J=new Pt(Te(.28,W.sweepH*1.06,W.sweepD*1.06),ne(16765286,{rough:.35}));J.position.x=q*W.sweepW*.5,Y.add(J)}st=new gt({mass:0,type:gt.KINEMATIC,shape:new We(new y(W.sweepW*.5,W.sweepH*.5,W.sweepD*.5)),position:new y(0,W.sweepH*.5,H),material:d})}else if(F==="popup"){const C=new Pt(Te(W.popW,W.popH,W.popD),ne(16735603,{rough:.42}));C.castShadow=!0,C.receiveShadow=!0,Y.add(C);const q=new Pt(Te(W.popW*1.02,.18,W.popD*1.06),ne(16765286,{rough:.35}));q.position.y=W.popH*.5-.09,Y.add(q),st=new gt({mass:0,type:gt.KINEMATIC,shape:new We(new y(W.popW*.5,W.popH*.5,W.popD*.5)),position:new y(0,-1.5,H),material:d})}else if(F==="coopgate"){const C=new Pt(Te(W.gateW,W.gateH,W.gateD),ne(2078376,{rough:.4}));C.castShadow=!0,C.receiveShadow=!0,Y.add(C);for(let q=0;q<4;q++){const J=new Pt(Te(W.gateW*1.02,.2,W.gateD*1.06),ne(16765286,{rough:.35}));J.position.y=-2.6*.35+q*(W.gateH*.23),Y.add(J)}st=new gt({mass:0,type:gt.KINEMATIC,shape:new We(new y(W.gateW*.5,W.gateH*.5,W.gateD*.5)),position:new y(0,W.gateH*.5,H),material:d})}else if(F==="buttongate"){const C=new Pt(Te(W.gateW,W.gateH,W.gateD),ne(9133302,{rough:.4}));C.castShadow=!0,C.receiveShadow=!0,Y.add(C);for(let q=0;q<4;q++){const J=new Pt(Te(W.gateW*1.02,.2,W.gateD*1.06),ne(16765286,{rough:.35}));J.position.y=-2.6*.35+q*(W.gateH*.23),Y.add(J)}st=new gt({mass:0,type:gt.KINEMATIC,shape:new We(new y(W.gateW*.5,W.gateH*.5,W.gateD*.5)),position:new y(0,W.gateH*.5,H),material:d})}else if(F==="shutter"){const C=W.shutterW,q=new Pt(Te(C,W.shutterH,W.shutterD),ne(5217791,{rough:.4}));q.castShadow=!0,q.receiveShadow=!0,Y.add(q);const J=new Pt(Te(.24,W.shutterH*1.04,W.shutterD*1.06),ne(16765286,{rough:.35}));J.position.x=-Math.sign(V||1)*C*.5,Y.add(J),st=new gt({mass:0,type:gt.KINEMATIC,shape:new We(new y(C*.5,W.shutterH*.5,W.shutterD*.5)),position:new y(0,W.shutterH*.5,H),material:d})}else if(F==="platform"){const C=((pt=N==null?void 0:N.params)==null?void 0:pt.w)??W.platW,q=((nt=N==null?void 0:N.params)==null?void 0:nt.len)??W.platD,J=new Pt(Te(C,W.platH,q),ne(5100287,{rough:.45}));J.castShadow=!0,J.receiveShadow=!0,Y.add(J);for(const ut of[-1,1]){const rt=new Pt(Te(.18,W.platH*1.5,q),ne(16765286,{rough:.4}));rt.position.set(ut*(C*.5-.09),W.platH*.2,0),Y.add(rt)}st=new gt({mass:0,type:gt.KINEMATIC,shape:new We(new y(C*.5,W.platH*.5,q*.5)),position:new y((N==null?void 0:N.x)??0,((Mt=N==null?void 0:N.params)==null?void 0:Mt.y)??W.platY,H),material:d})}else if(F==="conveyor"){const C=((yt=N==null?void 0:N.params)==null?void 0:yt.w)??W.convW,q=((Dt=N==null?void 0:N.params)==null?void 0:Dt.len)??W.convD,J=(((X=N==null?void 0:N.params)==null?void 0:X.dirZ)??1)>=0?1:-1,ut=new Pt(Te(C,W.convH,q),ne(2830149,{rough:.7}));ut.receiveShadow=!0,Y.add(ut);for(let rt=-2;rt<=2;rt++){const Ut=new Pt(Te(C*.62,.06,.34),ne(3200672,{rough:.3}));Ut.position.set(0,W.convH*.5+.03,rt*(q/5.5)+J*.2),Y.add(Ut)}st=new gt({mass:0,type:gt.KINEMATIC,shape:new We(new y(C*.5,W.convH*.5,q*.5)),position:new y((N==null?void 0:N.x)??0,W.convY,H),material:d})}else if(F==="wind"){const C=((ce=N==null?void 0:N.params)==null?void 0:ce.w)??W.windW,q=((Bt=N==null?void 0:N.params)==null?void 0:Bt.len)??W.windD,J=(((Yt=N==null?void 0:N.params)==null?void 0:Yt.dirX)??V)>=0?1:-1;for(let ut=-1;ut<=1;ut++){const rt=new Pt(Te(C*.9,.06,q*.8),ne(10473727,{rough:.2,opacity:.22}));rt.position.set(J*.4,W.windH*(.3+ut*.22),0),rt.rotation.z=J*.12,Y.add(rt)}st=new gt({mass:0,type:gt.KINEMATIC,shape:new We(new y(C*.5,W.windH*.5,q*.5)),position:new y((N==null?void 0:N.x)??0,W.windH*.5,H),material:d}),st.collisionResponse=!1}else if(F==="ballsocket"){const C=new Pt(dr(W.sockR,W.sockR,.12,22),ne(16765286,{rough:.35}));Y.add(C);const q=new Pt(dr(W.sockR*.72,W.sockR*.72,.16,22),ne(1711918,{rough:.8}));q.position.y=.03,Y.add(q),st=new gt({mass:0,type:gt.KINEMATIC,shape:new qy(W.sockR,W.sockR,.12,12),position:new y((N==null?void 0:N.x)??0,W.sockY,H),material:d}),st.collisionResponse=!1}else if(F==="lever"){const C=((Ct=N==null?void 0:N.params)==null?void 0:Ct.w)??W.leverW,q=((qt=N==null?void 0:N.params)==null?void 0:qt.len)??W.leverD,J=new Pt(Te(C,.1,q),ne(16765286,{rough:.5}));Y.add(J);const ut=new Pt(Te(C*.72,.12,q*.72),ne(16747069,{rough:.4}));ut.position.y=.02,Y.add(ut),st=new gt({mass:0,type:gt.KINEMATIC,shape:new We(new y(C*.5,.05,q*.5)),position:new y((N==null?void 0:N.x)??0,W.leverY,H),material:d}),st.collisionResponse=!1}else if(F==="holdgate"){const C=((It=N==null?void 0:N.params)==null?void 0:It.w)??W.gateW,q=((O=N==null?void 0:N.params)==null?void 0:O.h)??W.gateH,J=new Pt(Te(C,q,W.gateD),ne(9133302,{rough:.4}));J.castShadow=!0,J.receiveShadow=!0,Y.add(J);for(let ut=0;ut<3;ut++){const rt=new Pt(Te(C*1.02,.2,W.gateD*1.06),ne(16765286,{rough:.35}));rt.position.y=-q*.35+ut*(q*.23),Y.add(rt)}st=new gt({mass:0,type:gt.KINEMATIC,shape:new We(new y(C*.5,q*.5,W.gateD*.5)),position:new y((N==null?void 0:N.x)??0,q*.5,H),material:d})}else{const C=new Pt(Te(W.pistonW,W.pistonH,W.pistonD),ne(8150271,{rough:.4}));C.castShadow=!0,C.receiveShadow=!0,Y.add(C);const q=new Pt(Te(W.pistonW*1.02,.22,W.pistonD*1.02),ne(16765286,{rough:.4}));q.position.y=W.pistonH*.22,Y.add(q),st=new gt({mass:0,type:gt.KINEMATIC,shape:new We(new y(W.pistonW*.5,W.pistonH*.5,W.pistonD*.5)),position:new y(0,W.pistonH*.5,H),material:d})}t.add(Y),h.addBody(st);const at={id:B,mesh:Y,body:st,grabRadius:0,grabbable:!1,mass:st.mass};T.push(at),U.set(B,at),S.push({id:B,kind:F,z:H,arg:V,phase:$,x:N==null?void 0:N.x,params:N==null?void 0:N.params,link:N==null?void 0:N.link})};function L(){for(const B of w)h.removeBody(B);w=[],D&&(t.remove(D),D.clear(),D=null);for(const B of T)h.removeBody(B.body),t.remove(B.mesh),B.mesh.clear();T.length=0,U.clear(),P.length=0,S.length=0}function G(B){L(),I=Math.max(0,Math.min(ri.length-1,B));const F=ri[I];D=new Mn,t.add(D),w=[];const H={physics:h,mat:u,root:D,bodies:w};F.build({b:H,addProp:x,addBall:v,addHazard:b,addObstacle:R}),g.scale.set(F.floor.size/30,F.floor.size/30,1),g.material.color.setHex(F.floor.color),M.material.color.setHex(F.floor.outside),g.visible=!F.floor.hideFloor;const V=!F.floor.noGround,$=h.bodies.includes(E);V&&!$&&h.addBody(E),!V&&$&&h.removeBody(E),M.visible=!F.floor.hideOutside;const N=F.fog??[14281983,45,130];e.color.setHex(N[0]),e.near=N[1],e.far=N[2];for(const Y of A)Y()}G(0),window.addEventListener("resize",()=>{n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),i.setSize(window.innerWidth,window.innerHeight)});const k={scene:t,camera:n,renderer:i,physics:h,objects:T,objectById:U,groundBody:E,materials:{ground:u,player:f,prop:d,held:m,ball:_},sun:a,get mapIndex(){return I},get map(){return ri[I]},mapCount:ri.length,loadMap:G,onMapLoaded(B){A.push(B)},hazardSpecs:P,obstacleSpecs:S};return window.__world=k,k}const iS=1,ct={rideHeight:.86,rideSpring:2600,rideDamp:220,rideRayExtra:.5,uprightTorque:70,uprightDamp:46,yawTorque:42,yawMaxRate:9,moveAccel:8,moveForce:980,maxSpeed:4.6,airForceRatio:.22,brakeRatio:1,leanAmount:.26,jumpImpulse:88,jumpCooldown:.45,legSwing:17,kneeSwing:6,armSwing:6,swingSpeed:8.5,swingDamp:1.2,endSpinDamp:40,endDamp:.85,carryTorque:3.5,carryDamp:.5,carryObjDamp:.45,carryObjAngDamp:.7,carryDist:.55,carryHeight:.12,carryKp:62,carryKd:15,carryLiftStrength:260,carryPushStrength:400,pushLowRatio:.85,pushSpeedFactor:1,pushVelGain:10,pushCatchGain:6,pushCatchMax:3,pushHoldDist:.42,antiHangK:2600,antiHangMax:900,antiHangDamp:260,carryUprightAccel:45,carryUprightDampRate:9,carryDragAssist:.75,carryRamp:.55,grabReach:.5,holdForceMin:300,holdForceScale:2.5,holdForceMax:500,carryUprightBoost:1.5,reachTorque:6.5,reachElbowRatio:.6,reachDamp:.9,handReachKp:400,handReachKd:40,handReachMax:60,handReachRamp:.35,fallTiltDot:.42,fallTiltTime:.55,impactSpeed:13,ragdollTime:1.7,recoverTime:1.3},Gt={pelvis:{rx:.17,mass:5},torso:{r:.2,sep:.28,mass:5,y:.42},head:{r:.19,mass:1.2,y:.44},upperArm:{r:.085,sep:.18,mass:.55},lowerArm:{r:.075,sep:.17,mass:.45},hand:{r:.085,mass:.3},upperLeg:{r:.105,sep:.2,mass:1.5},lowerLeg:{r:.09,sep:.2,mass:1.1},foot:{r:.1,mass:.6},shoulderX:.29,hipX:.14};function Li(s,t,e,n,i,o,r,a=.35){const c=new gt({mass:e,position:n.clone(),material:i,linearDamping:.02,angularDamping:a,collisionFilterGroup:o,collisionFilterMask:r});return t>0?(c.addShape(new xi(s),new y(0,-t/2,0)),c.addShape(new xi(s),new y(0,t/2,0))):c.addShape(new xi(s)),c.updateMassProperties(),c.allowSleep=!1,c}const Qn={head:{r:1.95,len:1,up:.16},torso:{r:1.22,len:.85},pelvis:{r:1.28,len:1},upperArm:{r:1.55,len:.55},lowerArm:{r:1.62,len:.55},hand:{r:2.05,len:1},upperLeg:{r:1.15,len:.86},lowerLeg:{r:1.3,len:.76},foot:{r:1.62,len:1}};function sS(s){return new us({color:s,roughness:.42,metalness:.05})}const oS={r:1,len:1};function Di(s,t,e,n=oS){const i=s*n.r,o=t>0?t*n.len:t,r=t>0?new pu(i,o,8,20):new ls(i,24,16);n.up&&r.translate(0,n.up,0);const a=new Pt(r,sS(e));return a.castShadow=!0,a.receiveShadow=!0,a}function rS(s,t,e,n=0){const i=new ls(t*.19,12,10),o=new us({color:e,roughness:.25,metalness:.1});for(const r of[-1,1]){const a=new Pt(i,o);a.position.set(r*t*.34,n+t*.1,t*.9),s.add(a);const c=new Pt(new ls(t*.07,8,6),new yn({color:16777215}));c.position.set(r*t*.3,n+t*.16,t*1.02),s.add(c)}}function ts(s,t,e,n,i,o,r=4e3){return new Vy(s,t,{pivotA:e,pivotB:n,axisA:new y(0,-1,0),axisB:new y(0,-1,0),angle:i,twistAngle:o,maxForce:r})}function aS(s,t){const e=Math.min(255,Math.round((s>>16&255)*t)),n=Math.min(255,Math.round((s>>8&255)*t)),i=Math.min(255,Math.round((s&255)*t));return e<<16|n<<8|i}function cS(s,t,e,n,i,o,r){const a=new Map,c=[],l=[],h=new Mn;t.add(h);const u=r;function f(et,lt,vt){return s.addBody(lt),h.add(vt),a.set(et,{name:et,body:lt,mesh:vt}),c.push(lt),lt}const d=e,m=Li(Gt.pelvis.rx,0,Gt.pelvis.mass,new y(d.x,d.y,d.z),n,o,u);f("pelvis",m,Di(Gt.pelvis.rx,0,i.pants,Qn.pelvis));const _=d.y+Gt.torso.y,p=Li(Gt.torso.r,Gt.torso.sep,Gt.torso.mass,new y(d.x,_,d.z),n,o,u);f("torso",p,Di(Gt.torso.r,Gt.torso.sep,i.shirt,Qn.torso));const g=_+Gt.head.y,M=Li(Gt.head.r,0,Gt.head.mass,new y(d.x,g,d.z),n,o,u,ct.endDamp),E=Di(Gt.head.r,0,i.skin,Qn.head);rS(E,Gt.head.r*Qn.head.r,i.eye??3811874,Qn.head.up??0),f("head",M,E);function T(et,lt){const vt=d.x+et*Gt.shoulderX,Nt=_+.13-Gt.upperArm.sep/2-.08,Et=Li(Gt.upperArm.r,Gt.upperArm.sep,Gt.upperArm.mass,new y(vt,Nt,d.z),n,o,u);f("upperArm"+lt,Et,Di(Gt.upperArm.r,Gt.upperArm.sep,i.shirt,Qn.upperArm));const $t=Nt-Gt.upperArm.sep/2-Gt.lowerArm.sep/2-.05,Z=Li(Gt.lowerArm.r,Gt.lowerArm.sep,Gt.lowerArm.mass,new y(vt,$t,d.z),n,o,u,ct.endDamp);f("lowerArm"+lt,Z,Di(Gt.lowerArm.r,Gt.lowerArm.sep,i.skin,Qn.lowerArm));const At=$t-Gt.lowerArm.sep/2-Gt.hand.r-.02,ot=Li(Gt.hand.r,0,Gt.hand.mass,new y(vt,At,d.z),n,o,u,ct.endDamp);f("hand"+lt,ot,Di(Gt.hand.r,0,i.skin,Qn.hand));const ht=ts(p,Et,new y(et*Gt.shoulderX,.13,0),new y(0,Gt.upperArm.sep/2+.08,0),Math.PI*.55,Math.PI/4,5e3);s.addConstraint(ht),l.push(ht);const Tt=ts(Et,Z,new y(0,-.18/2-.025,0),new y(0,Gt.lowerArm.sep/2+.025,0),Math.PI*.3,Math.PI/8,2200);s.addConstraint(Tt),l.push(Tt);const bt=ts(Z,ot,new y(0,-.17/2-.01,0),new y(0,Gt.hand.r+.01,0),Math.PI*.22,Math.PI/8,900);return s.addConstraint(bt),l.push(bt),{ua:Et,la:Z,hand:ot}}const U=T(-1,"L"),D=T(1,"R");function w(et,lt){const vt=d.x+et*Gt.hipX,Nt=d.y-.1-Gt.upperLeg.sep/2-.06,Et=Li(Gt.upperLeg.r,Gt.upperLeg.sep,Gt.upperLeg.mass,new y(vt,Nt,d.z),n,o,u);f("upperLeg"+lt,Et,Di(Gt.upperLeg.r,Gt.upperLeg.sep,i.pants,Qn.upperLeg));const $t=Nt-Gt.upperLeg.sep/2-Gt.lowerLeg.sep/2-.05,Z=Li(Gt.lowerLeg.r,Gt.lowerLeg.sep,Gt.lowerLeg.mass,new y(vt,$t,d.z),n,o,u);f("lowerLeg"+lt,Z,Di(Gt.lowerLeg.r,Gt.lowerLeg.sep,i.pants,Qn.lowerLeg));const At=$t-Gt.lowerLeg.sep/2-Gt.foot.r,ot=Li(Gt.foot.r,0,Gt.foot.mass,new y(vt,At,d.z+.03),n,o,u,ct.endDamp);f("foot"+lt,ot,Di(Gt.foot.r,0,i.shoes??aS(i.pants,.55),Qn.foot));const ht=ts(m,Et,new y(et*Gt.hipX,-.1,0),new y(0,Gt.upperLeg.sep/2+.06,0),Math.PI*.42,Math.PI/6,9e3);s.addConstraint(ht),l.push(ht);const Tt=ts(Et,Z,new y(0,-.2/2-.025,0),new y(0,Gt.lowerLeg.sep/2+.025,0),Math.PI*.26,Math.PI/10,4e3);s.addConstraint(Tt),l.push(Tt);const bt=ts(Z,ot,new y(0,-.2/2-.01,0),new y(0,Gt.foot.r+.01,0),Math.PI*.2,Math.PI/10,1500);return s.addConstraint(bt),l.push(bt),{ul:Et,ll:Z,foot:ot}}const I=w(-1,"L"),A=w(1,"R"),x=ts(m,p,new y(0,Gt.torso.y/2,0),new y(0,-.42/2,0),Math.PI*.18,Math.PI/7,26e3);s.addConstraint(x),l.push(x);const v=ts(p,M,new y(0,Gt.head.y/2,0),new y(0,-.44/2,0),Math.PI*.16,Math.PI/6,3e3);s.addConstraint(v),l.push(v);const P=c.map(et=>et.position.vsub(m.position)),b=c.reduce((et,lt)=>et+lt.mass,0);let S="ACTIVE",R=0,L=0,G=0,k=0,B=0,F=!1,H=0,V=0,$=0;const N=new Set;let Y=0,st=[],at=0,pt=0,nt=0,Mt=0,yt=0,Dt=0,X=0,ce=1;for(const et of["head","torso","pelvis"])a.get(et).body.addEventListener("collide",vt=>{if(S!=="ACTIVE"||ce>0||V>0)return;const mt=Math.abs(vt.contact.getImpactVelocityAlongNormal());mt>ct.impactSpeed&&Bt(ct.ragdollTime,`충격(${et}) rel=${mt.toFixed(1)}`)});function Bt(et=ct.ragdollTime,lt="unknown"){if(S==="RAGDOLL")return;console.warn(`[ragdoll] knockdown 발동! reason=${lt} state=${S}->RAGDOLL seconds=${et.toFixed(2)}`),S="RAGDOLL",L=et,G=0,R=0;const vt=9,mt=7;for(const Nt of c){const Et=Nt.velocity.length();Et>vt&&Nt.velocity.scale(vt/Et,Nt.velocity);const $t=Nt.angularVelocity.length();$t>mt&&Nt.angularVelocity.scale(mt/$t,Nt.angularVelocity)}}const Yt=new y(0,1,0),Ct=new y,qt=new Xe,It=new hr;function O(){return p.quaternion.vmult(Yt,Ct),Ct.y}function C(et){qt.from.set(m.position.x,m.position.y,m.position.z),qt.to.set(m.position.x,m.position.y-(ct.rideHeight+ct.rideRayExtra),m.position.z);let lt=-1;for(const vt of et.bodies)if(vt.collisionFilterGroup!==o&&!N.has(vt)&&(It.reset(),qt.intersectBody(vt,It),It.hasHit)){const mt=m.position.y-It.hitPointWorld.y;(lt<0||mt<lt)&&(lt=mt)}return lt}function q(et,lt){et.torque.x+=lt.x,et.torque.y+=lt.y,et.torque.z+=lt.z}function J(et,lt,vt,mt){const Nt=Math.min(et.inertia.x,et.inertia.y,et.inertia.z),Et=Math.abs(lt)*Nt/mt,$t=-lt*vt;return Math.max(-Et,Math.min(Et,$t))}function ut(et,lt,vt,mt){const Et=Math.min(et.inertia.x,et.inertia.y,et.inertia.z)*vt/mt;return Math.max(-Et,Math.min(Et,lt))}const rt=new y;function Ut(et,lt,vt,mt,Nt){const Et=vt.x-lt.x,$t=vt.y-lt.y,Z=vt.z-lt.z,At=Math.hypot(Et,$t,Z);if(!(At>1e-4))return;const ot=Et/At,ht=$t/At,Tt=Z/At;rt.set(0,-1,0),et.quaternion.vmult(rt,rt);const bt=rt;q(et,new y((bt.y*Tt-bt.z*ht)*mt+J(et,et.angularVelocity.x,ct.reachDamp,Nt),(bt.z*ot-bt.x*Tt)*mt+J(et,et.angularVelocity.y,ct.reachDamp,Nt),(bt.x*ht-bt.y*ot)*mt+J(et,et.angularVelocity.z,ct.reachDamp,Nt)))}function xt(et,lt,vt){if(k=Math.max(0,k-et),ce=Math.max(0,ce-et),V=Math.max(0,V-et),S==="ACTIVE"&&ce<=0&&V<=0)for(const Zt of["torso","pelvis","head"]){const te=a.get(Zt).body;if(te.angularVelocity.length()>34||te.velocity.length()>34){Bt(.9,`선제안전장치(${Zt}) angVel=${te.angularVelocity.length().toFixed(1)} vel=${te.velocity.length().toFixed(1)}`);break}}const mt=C(vt);F=mt>=0&&mt<=ct.rideHeight+.18;const Nt=O();if(S==="ACTIVE")Nt<ct.fallTiltDot&&ce<=0&&V<=0?(R+=et,R>ct.fallTiltTime&&Bt(ct.ragdollTime,`기울어짐 up=${Nt.toFixed(2)}`)):R=0;else if(S==="RAGDOLL")L-=et,L<=0&&(console.warn("[ragdoll] RAGDOLL -> RECOVERING"),S="RECOVERING",G=ct.recoverTime);else if(S==="RECOVERING"&&(G-=et,G<=0)){console.warn("[ragdoll] RECOVERING -> ACTIVE"),S="ACTIVE",R=0,V=.9;for(const Zt of c)Zt.velocity.scale(.35,Zt.velocity),Zt.angularVelocity.scale(.35,Zt.angularVelocity)}if(S==="RAGDOLL")return;const Et=S==="RECOVERING"?1-Math.max(0,G)/ct.recoverTime:1,$t=Nt;if(mt>=0&&mt<ct.rideHeight+.12&&$t>.35&&k<=0){const Zt=Math.abs(vt.gravity.y),te=b*Zt,Qt=ct.rideHeight-mt,fe=Math.max(-.15,Math.min(.22,Qt)),Ae=m.velocity.y,an=Math.min(1,($t-.35)/.4),Ge=(te+fe*ct.rideSpring-Ae*ct.rideDamp)*Et*an;if(Number.isFinite(Ge)){const Oe=Math.max(-te*.4,Math.min(te*1.55,Ge));m.applyForce(new y(0,Oe,0))}}const Z=$>0?.35:1,At=Math.hypot(pt,nt);let ot=0,ht=0;if(At>.001&&F){const Zt=Math.min(1,At)*ct.leanAmount*Z;ot=pt/At*Zt,ht=nt/At*Zt}const Tt=Math.hypot(ot,1,ht),bt=ot/Tt,re=1/Tt,Fe=ht/Tt;p.quaternion.vmult(Yt,Ct);const Ze=ct.uprightTorque*Et*($>0?ct.carryUprightBoost:1);q(p,new y((Ct.y*Fe-Ct.z*re)*Ze+J(p,p.angularVelocity.x,ct.uprightDamp,et),J(p,p.angularVelocity.y,ct.uprightDamp*.4,et),(Ct.x*re-Ct.y*bt)*Ze+J(p,p.angularVelocity.z,ct.uprightDamp,et))),m.quaternion.vmult(Yt,Ct),q(m,new y((Ct.y*Fe-Ct.z*re)*Ze*.6+J(m,m.angularVelocity.x,ct.uprightDamp*.5,et),J(m,m.angularVelocity.y,ct.uprightDamp*.25,et),(Ct.x*re-Ct.y*bt)*Ze*.6+J(m,m.angularVelocity.z,ct.uprightDamp*.5,et)));const le=m.velocity.x,sn=m.velocity.z,gn=Math.hypot(le,sn),Bs=Math.hypot(lt.moveX,lt.moveZ),Wi=Bs>.01,zn=Wi?lt.moveX/Bs:0,Xi=Wi?lt.moveZ/Bs:0;Mt=zn,yt=Xi;{const Zt=lt.aimX??0,te=lt.aimZ??0,Qt=Math.hypot(Zt,te);Qt>.01&&(Dt=Zt/Qt,X=te/Qt)}if(F||Wi){const Zt=zn*ct.maxSpeed,te=Xi*ct.maxSpeed,Qt=Zt-le,fe=te-sn,Ae=b+Y*ct.carryDragAssist,an=Ae/b,Ge=F?1:ct.airForceRatio,Oe=ct.moveAccel*Ae*Ge*Et*(Wi?1:ct.brakeRatio);let Se=Qt*Oe,z=fe*Oe;const j=Math.hypot(Se,z),Q=ct.moveForce*an*Ge*Et;j>Q&&(Se=Se/j*Q,z=z/j*Q),m.applyForce(new y(Se,0,z)),p.applyForce(new y(Se*.22,0,z*.22)),pt=Se/Math.max(1,Q),nt=z/Math.max(1,Q)}else pt=0,nt=0;if(Wi){const Zt=Math.atan2(zn,Xi),te=new y(0,0,1);p.quaternion.vmult(te,te);const Qt=Math.atan2(te.x,te.z);let fe=Zt-Qt;for(;fe>Math.PI;)fe-=Math.PI*2;for(;fe<-Math.PI;)fe+=Math.PI*2;q(p,new y(0,ut(p,fe*ct.yawTorque*Et,ct.yawMaxRate,et),0))}if(F&&gn>.15){const Zt=Math.min(1,gn/(ct.maxSpeed*.75));B+=et*ct.swingSpeed*(.35+.65*Zt);const te=Math.sin(B),Qt=gn>.01?le/gn:zn,fe=gn>.01?sn/gn:Xi,Ae=(Se,z,j,Q)=>q(Se,new y(z*Q+J(Se,Se.angularVelocity.x,ct.swingDamp,et),J(Se,Se.angularVelocity.y,ct.swingDamp,et),j*Q+J(Se,Se.angularVelocity.z,ct.swingDamp,et))),an=ct.legSwing*Et*Zt;Ae(I.ul,fe*te,-Qt*te,an),Ae(A.ul,-fe*te,Qt*te,an);const Ge=ct.kneeSwing*Et*Zt,Oe=Math.sin(B-Math.PI/2);if(Ae(I.ll,fe*Oe,-Qt*Oe,Ge),Ae(A.ll,-fe*Oe,Qt*Oe,Ge),$===0){const Se=ct.armSwing*Et*Zt;Ae(U.ua,-fe*te,Qt*te,Se),Ae(D.ua,fe*te,-Qt*te,Se)}}for(const Zt of[U.hand,D.hand,I.foot,A.foot])q(Zt,new y(J(Zt,Zt.angularVelocity.x,ct.endSpinDamp,et),J(Zt,Zt.angularVelocity.y,ct.endSpinDamp,et),J(Zt,Zt.angularVelocity.z,ct.endSpinDamp,et)));const yr=Y*Math.abs(vt.gravity.y)<=ct.carryLiftStrength;if(st.length>0&&S==="ACTIVE"){at+=et;const Zt=Math.min(1,at/ct.handReachRamp)*Et,te=Math.abs(vt.gravity.y);for(const Qt of st){const fe=Qt.hand===U.hand?-1:1,Ae=fe<0?U:D;let an=0;for(const Kt of[Ae.ua,Ae.la,Qt.hand]){const Vt=Kt.mass*te*Zt;Kt.applyForce(new y(0,Vt,0)),an+=Vt}p.applyForce(new y(0,-an,0));const Ge=new y(fe*Gt.shoulderX,.13,0);p.quaternion.vmult(Ge,Ge),Ge.vadd(p.position,Ge),Ut(Ae.ua,Ge,Qt.target,ct.reachTorque*Zt,et);const Oe=new y(0,-.18/2-.025,0);Ae.ua.quaternion.vmult(Oe,Oe),Oe.vadd(Ae.ua.position,Oe),Ut(Ae.la,Oe,Qt.target,ct.reachTorque*ct.reachElbowRatio*Zt,et);const Se=Qt.target.vsub(Qt.hand.position),z=Qt.targetVel,j=Qt.hand.velocity.x-(z?z.x:0),Q=Qt.hand.velocity.y-(z?z.y:0),it=Qt.hand.velocity.z-(z?z.z:0),tt=(Se.x*ct.handReachKp-j*ct.handReachKd)*Qt.hand.mass,wt=(Se.y*ct.handReachKp-Q*ct.handReachKd)*Qt.hand.mass,Lt=(Se.z*ct.handReachKp-it*ct.handReachKd)*Qt.hand.mass,kt=Math.hypot(tt,wt,Lt),Ht=(kt>ct.handReachMax?ct.handReachMax/kt:1)*Zt,Wt=new y(tt*Ht,wt*Ht,Lt*Ht);Number.isFinite(Wt.x)&&Number.isFinite(Wt.y)&&Number.isFinite(Wt.z)&&(Qt.hand.applyForce(Wt),p.applyForce(new y(-Wt.x,-Wt.y,-Wt.z)))}}if($>0&&yr){const Zt=new y(0,0,1);p.quaternion.vmult(Zt,Zt);const te=Zt.x*.86,Qt=-.5,fe=Zt.z*.86,Ae=Math.hypot(te,Qt,fe),an=te/Ae,Ge=Qt/Ae,Oe=fe/Ae,Se=ct.carryTorque*Et;for(const j of[U.ua,D.ua]){const Q=new y(0,-1,0);j.quaternion.vmult(Q,Q),q(j,new y((Q.y*Oe-Q.z*Ge)*Se+J(j,j.angularVelocity.x,ct.carryDamp,et),(Q.z*an-Q.x*Oe)*Se+J(j,j.angularVelocity.y,ct.carryDamp,et),(Q.x*Ge-Q.y*an)*Se+J(j,j.angularVelocity.z,ct.carryDamp,et)))}const z=ct.carryTorque*.55*Et;for(const j of[U.la,D.la]){const Q=new y(0,-1,0);j.quaternion.vmult(Q,Q),q(j,new y((Q.y*Oe-Q.z*Ge)*z+J(j,j.angularVelocity.x,ct.carryDamp,et),(Q.z*an-Q.x*Oe)*z+J(j,j.angularVelocity.y,ct.carryDamp,et),(Q.x*Ge-Q.y*an)*z+J(j,j.angularVelocity.z,ct.carryDamp,et)))}}lt.jump&&F&&k<=0&&S==="ACTIVE"&&(k=ct.jumpCooldown,m.applyImpulse(new y(0,ct.jumpImpulse,0)),p.applyImpulse(new y(0,ct.jumpImpulse*.25,0)),I.ul.applyImpulse(new y(0,-2,1.5)),A.ul.applyImpulse(new y(0,-2,1.5)));{const Zt=m.velocity.x,te=m.velocity.z,Qt=Math.hypot(Zt,te),fe=ct.maxSpeed*1.3;Qt>fe&&(m.velocity.x=Zt/Qt*fe,m.velocity.z=te/Qt*fe),k<=0&&m.velocity.y>6.5&&(m.velocity.y=6.5)}}function St(){let et=!1;for(const lt of c){const vt=lt.position,mt=lt.velocity,Nt=lt.angularVelocity,Et=lt.quaternion;if(!Number.isFinite(vt.x)||!Number.isFinite(vt.y)||!Number.isFinite(vt.z)||!Number.isFinite(mt.x)||!Number.isFinite(mt.y)||!Number.isFinite(mt.z)||!Number.isFinite(Nt.x)||!Number.isFinite(Nt.y)||!Number.isFinite(Nt.z)||!Number.isFinite(Et.x)||!Number.isFinite(Et.y)||!Number.isFinite(Et.z)||!Number.isFinite(Et.w)||vt.y<-25||vt.y>45||Math.abs(vt.x)>400||Math.abs(vt.z)>400){et=!0;break}}if(et){H++,console.warn(`[ragdoll] NaN/이탈 감지 -> 복구 (#${H})`);const lt=new y(Number.isFinite(m.position.x)?m.position.x:0,3,Number.isFinite(m.position.z)?m.position.z:0);return jt(lt),!0}for(const lt of c){const vt=lt.velocity.length();vt>40&&lt.velocity.scale(40/vt,lt.velocity);const mt=lt.angularVelocity.length();mt>20&&lt.angularVelocity.scale(20/mt,lt.angularVelocity)}return!1}function jt(et){c.forEach((lt,vt)=>{const mt=P[vt];lt.type=gt.DYNAMIC,lt.position.set(et.x+mt.x,et.y+mt.y,et.z+mt.z),lt.velocity.setZero(),lt.angularVelocity.setZero(),lt.quaternion.set(0,0,0,1),lt.force.setZero(),lt.torque.setZero(),lt.updateMassProperties(),lt.wakeUp()}),S="ACTIVE",R=0,L=0,G=0,ce=1,V=0}return{parts:a,bodies:c,constraints:l,group:h,pelvis:m,torso:p,handL:U.hand,handR:D.hand,get state(){return S},get grounded(){return F},get swingPhase(){return B},get aimX(){return Dt},get aimZ(){return X},get intentX(){return Mt},get intentZ(){return yt},control:xt,sync(){for(const et of a.values())et.mesh.position.set(et.body.position.x,et.body.position.y,et.body.position.z),et.mesh.quaternion.set(et.body.quaternion.x,et.body.quaternion.y,et.body.quaternion.z,et.body.quaternion.w)},knockdown:Bt,setNetState(et){S=et},setHeld(et,lt=[]){$=et.length,N.clear(),Y=0;for(const vt of et)N.add(vt),Y+=vt.mass;lt.length===0&&(at=0),st=lt},reset:jt,guard:St,dispose(et,lt){for(const vt of l)et.removeConstraint(vt);for(const vt of c)et.removeBody(vt);lt.remove(h),h.traverse(vt=>{const mt=vt;if(!mt.isMesh)return;mt.geometry.dispose();const Nt=mt.material;if(Array.isArray(Nt))for(const Et of Nt)Et.dispose();else Nt.dispose()})}}}function Ol(s){const t=s.shapes[0];if(t instanceof We)return t.halfExtents;if(t instanceof xi){const n=t.radius;return new y(n,n,n)}const e=s.boundingRadius||.5;return new y(e,e,e)}function lS(s,t){const e=s.quaternion.clone().conjugate().vmult(t.vsub(s.position)),n=s.shapes[0];if(n instanceof xi){const o=e.length();return o<1e-6?new y(0,n.radius,0):e.scale(n.radius/o)}const i=Ol(s);return new y(Math.max(-i.x,Math.min(i.x,e.x)),Math.max(-i.y,Math.min(i.y,e.y)),Math.max(-i.z,Math.min(i.z,e.z)))}function Dc(s,t,e){const n=s.shapes[0];if(n instanceof xi)return n.radius;if(!(n instanceof We))return 0;const i=n.halfExtents;let o=0;const r=new y;for(const[a,c]of[[new y(1,0,0),i.x],[new y(0,1,0),i.y],[new y(0,0,1),i.z]])s.quaternion.vmult(a,r),o+=Math.abs(r.x*t+r.z*e)*c;return o}function uS(s){const t=s.shapes[0];if(t instanceof xi)return t.radius;if(!(t instanceof We))return 0;const e=t.halfExtents;let n=0;const i=new y;for(const[o,r]of[[new y(1,0,0),e.x],[new y(0,1,0),e.y],[new y(0,0,1),e.z]])s.quaternion.vmult(o,i),n+=Math.abs(i.y)*r;return n}function hS(s,t,e){if(e.length===0)return;const n=Math.abs(s.gravity.y),i=t.mass*n;let o=0,r=0,a=0,c=0,l=0;for(const U of e){const D=Math.min(1,U.ramp/ct.carryRamp);o+=ct.carryLiftStrength*D,r+=ct.carryPushStrength*D;const w=new y(0,0,1);U.rag.torso.quaternion.vmult(w,w);const I=Math.hypot(w.x,w.z)||1,A=w.x/I,x=w.z/I;a+=U.rag.torso.position.x+A*(ct.carryDist+Dc(t,A,x)),c+=U.rag.torso.position.y+ct.carryHeight,l+=U.rag.torso.position.z+x*(ct.carryDist+Dc(t,A,x))}const h=e.length;a/=h,c/=h,l/=h;const u=i<=o;let f=0;u&&(f=i+(c-t.position.y)*ct.carryKp*t.mass-t.velocity.y*ct.carryKd*t.mass,f=Math.max(-o,Math.min(o,f)));let d,m;if(u)d=(a-t.position.x)*ct.carryKp*t.mass-t.velocity.x*ct.carryKd*t.mass,m=(l-t.position.z)*ct.carryKp*t.mass-t.velocity.z*ct.carryKd*t.mass;else{let U=0,D=0;for(const x of e)U+=x.rag.intentX,D+=x.rag.intentZ;const w=Math.hypot(U,D);let I=0,A=0;for(const x of e){const v=t.position.x-x.rag.torso.position.x,P=t.position.z-x.rag.torso.position.z,b=Math.hypot(v,P);if(b<1e-4)continue;const S=v/b,R=P/b,L=b-(ct.pushHoldDist+Dc(t,S,R));if(L<=0)continue;const G=Math.min(ct.pushCatchMax,L*ct.pushCatchGain);I-=S*G,A-=R*G}if(I/=e.length,A/=e.length,w>.01){const x=U/w*ct.maxSpeed*ct.pushSpeedFactor+I,v=D/w*ct.maxSpeed*ct.pushSpeedFactor+A;d=(x-t.velocity.x)*ct.pushVelGain*t.mass,m=(v-t.velocity.z)*ct.pushVelGain*t.mass}else I!==0||A!==0?(d=(I-t.velocity.x)*ct.pushVelGain*t.mass,m=(A-t.velocity.z)*ct.pushVelGain*t.mass):(d=-t.velocity.x*ct.pushVelGain*t.mass*.5,m=-t.velocity.z*ct.pushVelGain*t.mass*.5)}const _=Math.hypot(d,m);if(_>r){const U=r/_;d*=U,m*=U}if(u)t.applyForce(new y(d,f,m));else{const U=new y(0,-uS(t)*ct.pushLowRatio,0);t.applyForce(new y(d,0,m),U)}const p=1/e.length;for(const U of e)if(U.rag.pelvis.applyForce(new y(-d*p,-f*p,-m*p)),!u){const D=U.rag.pelvis.position.y-ct.rideHeight;if(D>0){const w=Math.min(ct.antiHangMax,D*ct.antiHangK)+Math.max(0,U.rag.pelvis.velocity.y)*ct.antiHangDamp;U.rag.pelvis.applyForce(new y(0,-w,0))}}const g=new y(0,1,0);t.quaternion.vmult(g,g);const M=Math.max(t.inertia.x,t.inertia.z),E=ct.carryUprightAccel*e.length,T=ct.carryUprightDampRate*e.length;t.torque.x+=M*(-g.z*E-t.angularVelocity.x*T),t.torque.z+=M*(g.x*E-t.angularVelocity.z*T)}function dS(s,t){return Math.min(ct.holdForceMax,Math.max(ct.holdForceMin,s.mass*t*ct.holdForceScale))}class fS{constructor(){kn(this,"ws",null);kn(this,"id",null);kn(this,"hostId",null);kn(this,"peers",new Set);kn(this,"ping",0);kn(this,"room",null);kn(this,"offline",!1);kn(this,"picks",{});kn(this,"myPreset",0);kn(this,"handlers",[]);kn(this,"pingTimer",null)}connect(t){this.close();const e=new WebSocket(t);this.ws=e,this.offline=!1,e.onopen=()=>{this.pingTimer=window.setInterval(()=>{this.send({type:"ping",t:performance.now()})},1e3)},e.onmessage=n=>{let i;try{i=JSON.parse(n.data)}catch{return}if(i.type==="pong"){this.ping=Math.round(performance.now()-i.t);return}if(i.type==="welcome"){this.id=i.id,this.hostId=i.hostId,this.room=i.room,this.picks=i.picks??{},this.peers.clear();for(const o of i.players)this.peers.add(o)}i.type==="picks"&&(this.picks=i.picks,this.id!==null&&this.picks[this.id]!==void 0&&(this.myPreset=this.picks[this.id])),i.type==="host"&&(this.hostId=i.hostId),i.type==="playerJoined"&&this.peers.add(i.id),i.type==="playerLeft"&&this.peers.delete(i.id);for(const o of this.handlers)o(i)},e.onclose=()=>{this.pingTimer!==null&&(window.clearInterval(this.pingTimer),this.pingTimer=null),this.ws===e&&(this.ws=null)}}goOffline(t=0){this.close(),this.offline=!0,this.id=t,this.hostId=t,this.room=null,this.peers.clear(),this.picks={[t]:this.myPreset}}presetOf(t){const e=this.picks[t];return e===void 0?null:e}close(){if(this.pingTimer!==null&&(window.clearInterval(this.pingTimer),this.pingTimer=null),this.ws){const t=this.ws;this.ws=null,t.onopen=t.onmessage=t.onclose=null,(t.readyState===WebSocket.OPEN||t.readyState===WebSocket.CONNECTING)&&t.close()}}get isHost(){return this.id!==null&&this.id===this.hostId}get controlledId(){if(this.id===null)return null;const t=[...this.peers][0];return t!==void 0?t:this.id}get statusText(){if(this.offline)return"SOLO";if(!this.ws)return"CLOSED";switch(this.ws.readyState){case WebSocket.CONNECTING:return"CONNECTING";case WebSocket.OPEN:return"OPEN";case WebSocket.CLOSING:return"CLOSING";default:return"CLOSED"}}on(t){this.handlers.push(t)}send(t){this.ws&&this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify(t))}}const Oi=[{name:"블루베리",shirt:5217791,pants:3621201,shoes:16777215,skin:16767416,eye:2042436},{name:"딸기우유",shirt:16752331,pants:9060178,shoes:16777215,skin:16769732,eye:4861789},{name:"라임소다",shirt:9363562,pants:3112296,shoes:2830136,skin:15774084,eye:3104058},{name:"귤",shirt:16747069,pants:9190186,shoes:15783503,skin:16236693,eye:3811874},{name:"포도",shirt:12160255,pants:5978746,shoes:9133302,skin:14260844,eye:4861789},{name:"민트초코",shirt:6281380,pants:4869980,shoes:7031343,skin:9263674,eye:1119516},{name:"레몬",shirt:16769126,pants:5663535,shoes:4165455,skin:16767416,eye:3811874},{name:"체리콕",shirt:15753082,pants:2908042,shoes:14236475,skin:12089934,eye:2042436}];function Wf(s){return(s+1)*3%Oi.length}function pS(s){const t=Oi[(s%Oi.length+Oi.length)%Oi.length];return{skin:t.skin,shirt:t.shirt,pants:t.pants,shoes:t.shoes,eye:t.eye}}function mS(s){const t=typeof location<"u"?location:{protocol:"http:",host:"localhost:5173",port:"5173"},e=t.protocol==="https:"?"wss:":"ws:";return t.port==="8080"?`${e}//${t.host}`:`${e}//${t.host}/ws`}const Nc=mS(),Pe=s=>document.getElementById(s),rd={noRoom:"그런 방이 없다. 코드를 다시 확인해라.",full:"방이 가득 찼다 (최대 4명).",badCode:"코드는 영문/숫자 4자리다."};function gS(s,t){var x;const e=Pe("menu"),n={title:Pe("panel-title"),pick:Pe("panel-pick"),mode:Pe("panel-mode"),create:Pe("panel-create"),join:Pe("panel-join"),lobby:Pe("panel-lobby")},i=Pe("join-code"),o=Pe("join-error"),r=Pe("lobby-code"),a=Pe("lobby-players"),c=Pe("lobby-hint"),l=Pe("btn-start-game"),h=Pe("pick-grid"),u=Pe("pick-hint");let f=!1,d="single";const m=(((x=location.hash.match(/[A-Za-z0-9]{4}/))==null?void 0:x[0])??"").toUpperCase(),_=/^[A-Z0-9]{4}$/.test(m)?m:"",p=()=>s.room?`${location.origin}${location.pathname}#${s.room}`:"";function g(v){for(const[P,b]of Object.entries(n))b.hidden=P!==v;e.hidden=!1,v==="join"&&(o.textContent="",i.focus())}function M(){e.hidden=!0}const E=v=>"#"+v.toString(16).padStart(6,"0");function T(){const v=s.myPreset,P=new Map;for(const[b,S]of Object.entries(s.picks)){const R=Number(b);R!==s.id&&P.set(S,R)}h.innerHTML=Oi.map((b,S)=>{const R=P.get(S),L=["pick-card"];return S===v&&R===void 0&&L.push("selected"),R!==void 0&&L.push("taken"),`<div class="${L.join(" ")}" data-i="${S}" role="button" tabindex="0">
        <div class="doll">
          <i class="head" style="background:${E(b.skin)}"></i>
          <i class="eye eyeL" style="background:${E(b.eye??0)}"></i>
          <i class="eye eyeR" style="background:${E(b.eye??0)}"></i>
          <i class="arm armL" style="background:${E(b.shirt)}"></i>
          <i class="arm armR" style="background:${E(b.shirt)}"></i>
          <i class="body" style="background:${E(b.shirt)}"></i>
          <i class="leg legL" style="background:${E(b.pants)}"></i>
          <i class="leg legR" style="background:${E(b.pants)}"></i>
          <i class="foot footL" style="background:${E(b.shoes??3355443)}"></i>
          <i class="foot footR" style="background:${E(b.shoes??3355443)}"></i>
        </div>
        <div class="pick-name">${b.name}</div>
        <div class="pick-by">${R!==void 0?`P${D(R)} 사용중`:""}</div>
      </div>`}).join(""),u.textContent=d==="lobby"?"회색으로 흐린 캐릭터는 같은 방의 다른 사람이 쓰는 중이다.":d==="multi"?"먼저 캐릭터를 고른다. 방에서 겹치면 자동으로 다른 걸로 바꿔준다.":"마음에 드는 캐릭터를 골라라."}h.addEventListener("click",v=>{const P=v.target.closest(".pick-card");!P||P.classList.contains("taken")||(s.myPreset=Number(P.dataset.i),s.offline||s.send({type:"pick",preset:s.myPreset}),T())});function U(){return[s.id,...s.peers].filter(v=>v!==null).sort((v,P)=>v-P)}function D(v){const P=U().indexOf(v);return P>=0?P+1:v}function w(){r.textContent=s.room??"----";const v=U();if(a.innerHTML=v.map((P,b)=>{const S=P===s.id?" (나)":"",R=P===s.hostId?" · 방장":"",L=s.presetOf(P)??Wf(P);return`<li>P${b+1}${S}${R} — ${Oi[L%Oi.length].name}</li>`}).join(""),l.hidden=!s.isHost,s.isHost&&v.length<2){const P=p();c.textContent=P?`친구에게 이 주소를 보내라 (누르면 복사): ${P}`:"혼자서도 시작할 수 있다. 친구에게 위 코드를 알려줘라."}else c.textContent=s.isHost?"모두 모였으면 시작해라.":"방장이 시작하기를 기다리는 중…"}s.on(v=>{switch(v.type){case"joinError":g("join"),o.textContent=rd[v.reason]??"방에 들어가지 못했다.";break;case"welcome":if(s.send({type:"pick",preset:s.myPreset}),s.room)try{history.replaceState(null,"",`#${s.room}`)}catch{}w(),g("lobby");break;case"picks":{if(s.id!==null&&v.picks[s.id]===void 0){const P=new Set(Object.values(v.picks)),b=Oi.findIndex((S,R)=>!P.has(R));b>=0&&(s.myPreset=b,s.send({type:"pick",preset:b}))}f||(T(),w());break}case"playerJoined":case"playerLeft":case"host":f||w();break;case"gameStart":if(f)break;f=!0,M(),t.onStart("multi");break}});function I(){f||(f=!0,s.goOffline(0),M(),t.onStart("single"))}Pe("btn-single").addEventListener("click",()=>{d="single",T(),g("pick")}),Pe("btn-multi").addEventListener("click",()=>{d="multi",T(),g("pick")}),Pe("btn-pick-ok").addEventListener("click",()=>{d==="single"?I():d==="lobby"?(w(),g("lobby")):_?(g("join"),o.textContent="들어가는 중…",s.connect(`${Nc}/?room=${encodeURIComponent(_)}`)):g("mode")}),Pe("btn-pick-back").addEventListener("click",()=>{d==="lobby"?(w(),g("lobby")):g("title")}),Pe("btn-change-char").addEventListener("click",()=>{d="lobby",T(),g("pick")}),Pe("btn-back-title").addEventListener("click",()=>g("title")),Pe("btn-create-room").addEventListener("click",()=>{g("create"),s.connect(`${Nc}/?create=1`)}),Pe("btn-join-room").addEventListener("click",()=>g("join"));for(const v of["btn-back-mode","btn-back-mode2","btn-leave-lobby"])Pe(v).addEventListener("click",()=>{s.close(),l.disabled=!1,g("mode")});function A(){const v=i.value.trim().toUpperCase();if(v.length!==4){o.textContent=rd.badCode;return}o.textContent="들어가는 중…",s.connect(`${Nc}/?room=${encodeURIComponent(v)}`)}Pe("btn-join-go").addEventListener("click",A),i.addEventListener("keydown",v=>{v.key==="Enter"&&A()}),i.addEventListener("input",()=>{i.value=i.value.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,4)}),l.addEventListener("click",()=>{s.isHost&&(l.disabled=!0,s.send({type:"startGame"}))}),r.addEventListener("click",()=>{var P;const v=s.room;v&&((P=navigator.clipboard)==null||P.writeText(v))}),c.addEventListener("click",()=>{var P;const v=p();v&&s.isHost&&((P=navigator.clipboard)==null||P.writeText(v))}),_?(d="multi",T(),g("pick")):g("title")}ri[0].targetId;ri[0].targetName;ri[0].timeLimit;const ad=3,oo=4054148,Uc=16765503;function vS(s){const t=s.charCodeAt(s.length-1),e=t>=44032&&t<=55203&&(t-44032)%28!==0;return s+(e?"을":"를")}function cd(s){const t=Math.max(0,Math.ceil(s));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function zc(s){const t=new yn({color:s});return t.depthTest=!1,t.depthWrite=!1,t.toneMapped=!1,t}function xS(s,t){const{scene:e}=s;let n=null,i=null,o=null,r,a,c,l,h=0,u=0,f=1.6,d=4,m=null,_=!1,p=null,g=ri[0].timeLimit,M=!0;function E(nt){nt.traverse(Mt=>{const yt=Mt;if(!yt.isMesh)return;yt.geometry.dispose();const Dt=yt.material;if(Array.isArray(Dt))for(const X of Dt)X.dispose();else Dt.dispose()})}function T(){n&&(e.remove(n),E(n),n=null),o&&(e.remove(o),E(o),o=null),i&&(i.removeFromParent(),E(i),i=null)}function U(){T();const nt=s.map;h=nt.goal.x,u=nt.goal.z,f=nt.goal.radius,d=nt.goal.halfWidth??nt.goal.radius*2.4,m=null,_=!1,g=nt.timeLimit,M=nt.judge!==!1,w.hidden=!M;const Mt=s.objectById.get(nt.targetId)??null;p=(Mt==null?void 0:Mt.body)??null;const yt=new Mn;yt.position.set(h,0,u),yt.visible=M,e.add(yt),n=yt,a=new Pt(new mu(f,48),new yn({color:oo,transparent:!0,opacity:.18,depthWrite:!1,toneMapped:!1})),a.rotation.x=-Math.PI/2,a.position.y=.015,yt.add(a),r=new Pt(new Co(f-.22,f,64),new yn({color:oo,transparent:!0,opacity:.85,depthWrite:!1,toneMapped:!1})),r.rotation.x=-Math.PI/2,r.position.y=.02,yt.add(r),c=new Mn,c.rotation.x=-Math.PI/2,c.position.y=.03;for(let Ct=0;Ct<6;Ct++)c.add(new Pt(new Co(f+.08,f+.3,8,1,Ct/6*Math.PI*2,.55),new yn({color:oo,transparent:!0,opacity:.7,depthWrite:!1,toneMapped:!1})));yt.add(c);const Dt=new Pt(new Ao(f*.92,f,2.8,32,1,!0),new yn({color:oo,transparent:!0,opacity:.1,side:Wn,depthWrite:!1,toneMapped:!1}));Dt.position.y=1.4,yt.add(Dt);const X=new us({color:3123306,roughness:.5}),ce=f*1.45,Bt=2.6;for(const Ct of[-1,1]){const qt=new Pt(new vi(.26,Bt,.26),X);qt.position.set(0,Bt/2,Ct*ce),qt.castShadow=!0,yt.add(qt)}const Yt=new Pt(new vi(.26,.26,ce*2+.26),X);if(Yt.position.set(0,Bt+.13,0),Yt.castShadow=!0,yt.add(Yt),l=new Pt(new vu(.34),zc(oo)),l.position.set(h,3.5,u),l.renderOrder=998,e.add(l),n.add(l),l.position.set(0,3.5,0),o=new Mn,o.visible=!1,o.renderOrder=999,e.add(o),Mt){const Ct=Ol(Mt.body);i=new Pt(new vi(Ct.x*2,Ct.y*2,Ct.z*2),new yn({color:Uc,side:fn,toneMapped:!1})),i.scale.setScalar(1.05),Mt.mesh.add(i);const qt=new Pt(new Ao(.09,.09,.42,12),zc(Uc));qt.position.y=.42;const It=new Pt(new za(.26,.42,14),zc(Uc));It.rotation.z=Math.PI,o.add(qt,It);for(const O of o.children)O.renderOrder=999;o.visible=!0}D.textContent=Mt?M?`[${s.mapIndex+1}/${s.mapCount}] ${nt.name} — ${vS(nt.targetName)} 출구까지`:`${nt.name} — ${nt.blurb}`:`목표 오브젝트(id ${nt.targetId})를 찾을 수 없다`}const D=document.getElementById("goal-text"),w=document.getElementById("timer"),I=document.getElementById("goal-dist"),A=document.getElementById("result"),x=document.getElementById("result-title"),v=document.getElementById("result-sub"),P=document.getElementById("retry"),b=document.getElementById("next-map");A.hidden=!0;let S="playing",R=ri[0].timeLimit,L=0,G=0,k="playing",B=0,F=!1;U(),R=g,s.onMapLoaded(()=>{U(),S="playing",R=g,L=0});function H(){var yt;if(!p)return!1;const nt=p.position.z,Mt=m;return m=nt,!(Mt===null||!(Mt>u&&nt<=u)||Math.abs(p.position.x-h)>d||p.position.y>ad||(yt=t.isBallCarried)!=null&&yt.call(t))}function V(){if(!p||p.position.y>ad)return!1;const nt=p.position.x-h,Mt=p.position.z-u;return Math.hypot(nt,Mt)<=f}function $(nt){var Mt,yt;if(M&&t.isAuthority()&&S==="playing"){if(R-=nt,R<=0){R=0,S="fail",(Mt=t.onFail)==null||Mt.call(t);return}H()&&(_=!0),_&&(_=!1,S="success",L=R,(yt=t.onGoal)==null||yt.call(t))}}const N=nt=>nt.replace(/^\d+\.\s*/,"");function Y(){const nt=S==="success",Mt=s.mapIndex>=s.mapCount-1,yt=s.mapIndex+1;nt&&Mt&&(F=!0),x.textContent=F?"전체 클리어!":nt?"성공!":"실패!",x.style.color=nt?"#5ef2a0":"#ff8080";const Dt=Mt?null:N(ri[s.mapIndex+1].name);v.textContent=F?`STAGE 1~${s.mapCount} 전부 통과했다. 수고했다!`:nt?`STAGE ${yt} 「${N(s.map.name)}」 클리어 — 남은 시간 ${cd(L)}`+(Dt?` · 다음은 「${Dt}」`:""):`STAGE ${yt} 「${N(s.map.name)}」 — 시간 초과`+(p?` · 골까지 ${Math.hypot(p.position.x-h,p.position.z-u).toFixed(0)}m 남았다`:""),b&&(b.hidden=!(nt&&!Mt)),P.textContent=F?"처음부터":"다시하기",A.hidden=!1,document.pointerLockElement&&document.exitPointerLock()}function st(nt){G+=nt,c.rotation.z+=nt*.6;const Mt=1+Math.sin(G*2.4)*.04;if(r.scale.set(Mt,Mt,1),l.position.y=3.5+Math.sin(G*2)*.16,l.rotation.y+=nt*1.2,p&&i&&o){i.scale.setScalar(1.04+Math.sin(G*3.2)*.012);const X=Ol(p).y;o.position.set(p.position.x,p.position.y+X+.55+Math.sin(G*2.6)*.12,p.position.z),o.rotation.y+=nt*1.5}const Dt=S==="success"||V()?16777215:oo;if(r.material.color.setHex(Dt),a.material.color.setHex(Dt),w.textContent=cd(R),w.classList.toggle("urgent",S==="playing"&&R<=30),p){const X=Math.hypot(p.position.x-h,p.position.z-u);I.textContent=M?`출구까지 ${X.toFixed(1)}m`:`코스 끝까지 ${X.toFixed(0)}m`}(S!==k||S!=="playing"&&s.mapIndex!==B)&&(k=S,B=s.mapIndex,S==="playing"?A.hidden=!0:Y())}function at(){if(F){F=!1,P.textContent="다시하기",s.loadMap(0),t.resetWorld();return}t.resetWorld(),S="playing",R=g,L=0}function pt(){s.mapIndex>=s.mapCount-1||(s.loadMap(s.mapIndex+1),t.resetWorld())}return P.addEventListener("click",nt=>{nt.preventDefault(),t.isAuthority()?at():t.requestRestartRemote()}),b==null||b.addEventListener("click",nt=>{var Mt;nt.preventDefault(),t.isAuthority()?pt():(Mt=t.requestNextMapRemote)==null||Mt.call(t)}),{get phase(){return S},update:$,render:st,restart:at,nextMap:pt,snapshot(){return{phase:S,t:Math.round(R*10)/10,m:s.mapIndex}},applyRemote(nt){t.isAuthority()||(nt.m!==void 0&&nt.m!==s.mapIndex&&s.loadMap(nt.m),nt.phase==="success"&&S!=="success"&&(L=nt.t),S=nt.phase,R=nt.t)}}}function Xf(s){const t=Math.sin(s),e=Math.cos(s);return{fx:t,fz:e,rx:-e,rz:t}}const _S=-.15,yS=.85,ld=.0022,jr=50,Fc=(s,t,e)=>Math.max(t,Math.min(e,s));function qf(s,t,e){const n=Fc(t,-jr,jr),i=Fc(e,-jr,jr);return{yaw:s.yaw-n*ld,pitch:Fc(s.pitch+i*ld,_S,yS)}}function MS(s){return 1<<(s>=0?s%10:10+(-s-1)%4)+1}function wS(s){return 65535&~s}const dt={radius:.3,mass:1.1,range:2.6,fade:.25,touchAhead:1.7,touchSide:1.6,touchIntervalSlow:.13,touchIntervalFast:.22,touchSpeed:1,ahead:1.2,leadBase:.62,leadPerSpeed:.22,pushOut:1.8,minAhead:.34,unstickSpeed:2.1,behindLimit:-.4,touchMax:6,touchBrake:2,turnBite:.6,turnBoost:.8,turnAlign:.72,turnResetDot:.93,turnReachAhead:1.25,turnReachSide:1.55,turnRateFull:6,turnSmooth:.13,turnBehind:-1.35,guideAccel:5.5,guideDamp:2,trapRange:1.8,trapMaxSpeed:6.5,trapMax:2.5,kickRange:1.85,chargeTime:.55,kickForwardMin:6.5,kickForwardMax:15.5,kickUpMin:1.6,kickUpMax:4.4,kickCooldown:.55,rushRange:14,rushTime:.45,rushImpulse:26,rushAccel:45,rushReach:2.2,rushTouchKeep:.25,rushCooldown:1.2,rushSteer:.22,kickLockout:.5,kickRecoil:6,scoopRange:2.8,scoopTime:.55,scoopAccel:30,scoopAhead:.45,scoopHeight:.05,carryDrag:150,trickCooldown:.8,trickBallUp:4.2,trickBallSide:3.2,trickBallKeep:1,trickLockout:.45,trickSettleTime:.85,trickSettleDamp:3.4,trickSettleFwdDamp:.7,trickBodySide:30,trickDash:.42,trickDashForward:.85,trickBodyUp:16,trickTorque:34,trickRange:2.1,stopCooldown:1,stopRange:2.2,stopBallKeep:.12,stopBallPull:2.2,stopBrake:1.35,stopDash:.38,stopLockout:.22};function SS(){const s=new Map;function t(A){let x=s.get(A);return x||(x={trickTimer:0,lockout:0,pokeTimer:0,kickTimer:0,scoopTimer:0,dashTimer:0,dashX:0,dashZ:0,lastTrick:0,stopTimer:0,settleTimer:0,settleRefX:0,settleRefZ:0,lastDirX:0,lastDirZ:0,turnRate:0,rushTimer:0,rushX:0,rushZ:0,rushCd:0,touch:null,lastTrickInfo:null},s.set(A,x)),x}function e(A){const x=A.intentX,v=A.intentZ;return Math.hypot(x,v)>.01?{x,z:v}:n(A)}function n(A){const x=A.aimX,v=A.aimZ;if(Math.hypot(x,v)>.01)return{x,z:v};const P=new y(0,0,1);A.torso.quaternion.vmult(P,P);const b=Math.hypot(P.x,P.z)||1;return{x:P.x/b,z:P.z/b}}const i=A=>Math.hypot(A.intentX,A.intentZ)>.01;function o(A,x,v,P){if(P||A.state!=="ACTIVE")return;const b=t(A);if(b.settleTimer>0){const xt=x.velocity,St=b.settleRefX,jt=b.settleRefZ,_t=xt.x*St+xt.z*jt,et=St*_t,lt=jt*_t,vt=xt.x-et,mt=xt.z-lt,Nt=x.mass;x.applyForce(new y(-(et*dt.trickSettleFwdDamp+vt*dt.trickSettleDamp)*Nt,0,-(lt*dt.trickSettleFwdDamp+mt*dt.trickSettleDamp)*Nt)),x.wakeUp()}if(b.lockout>0||b.scoopTimer>0||x.position.y>dt.radius*2.2)return;const S=A.pelvis.position,R=x.position.x-S.x,L=x.position.z-S.z,G=Math.hypot(R,L);if(G>dt.range)return;const k=A.pelvis.velocity,B=x.velocity.x,F=x.velocity.z,H=Math.hypot(B,F);if(!i(A)){if(G<dt.trapRange&&H>.15&&H<dt.trapMaxSpeed&&b.pokeTimer<=0){const xt=Math.min(dt.trapMax,H*x.mass);x.applyImpulse(new y(-B/H*xt,0,-F/H*xt),new y(0,dt.radius,0)),b.pokeTimer=dt.touchIntervalSlow,b.touch={x:x.position.x,y:dt.radius*.5,z:x.position.z,strength:Math.min(1,xt/dt.trapMax)*.6},x.wakeUp()}return}const V=e(A),$=Math.hypot(k.x,k.z),N=dt.leadBase+$*dt.leadPerSpeed,Y=dt.range*(1-dt.fade),st=G<=Y?1:Math.max(0,(dt.range-G)/(dt.range-Y));{const xt=R*V.z-L*V.x;let St=-V.z*xt*dt.guideAccel,jt=V.x*xt*dt.guideAccel;const _t=(x.velocity.x-k.x)*V.z-(x.velocity.z-k.z)*V.x;St+=-V.z*_t*dt.guideDamp,jt+=V.x*_t*dt.guideDamp;const et=Math.hypot(St,jt),lt=dt.guideAccel*st;et>lt&&et>0&&(St=St/et*lt,jt=jt/et*lt),x.applyForce(new y(St*x.mass,0,jt*x.mass))}const at=R*V.x+L*V.z,pt=b.lastDirX!==0||b.lastDirZ!==0,nt=pt?Math.max(-1,Math.min(1,V.x*b.lastDirX+V.z*b.lastDirZ)):1,Mt=pt?nt<dt.turnResetDot:!1,yt=Math.acos(nt)/Math.max(1e-4,v),Dt=1-Math.exp(-v/dt.turnSmooth);b.turnRate+=(yt-b.turnRate)*Dt;const X=Math.min(1,b.turnRate/dt.turnRateFull);b.lastDirX=V.x,b.lastDirZ=V.z;const ce=b.rushTimer>0?dt.rushReach:1,Bt=dt.touchAhead*(1+(dt.turnReachAhead-1)*X)*ce,Yt=dt.touchSide*(1+(dt.turnReachSide-1)*X)*ce,Ct=dt.behindLimit+(dt.turnBehind-dt.behindLimit)*X;if(at<Ct||at>Bt){x.wakeUp();return}if(Math.abs(R*V.z-L*V.x)>Yt){x.wakeUp();return}const qt=at<dt.minAhead;if(b.pokeTimer>0&&!qt&&!Mt){x.wakeUp();return}let It=$*dt.touchSpeed+Math.max(0,N-at)*dt.pushOut;const O=b.rushTimer>0&&at>N;O&&(It=$*dt.rushTouchKeep),qt&&(It=Math.max(It,$+dt.unstickSpeed));const C=H>.5?(B*V.x+F*V.z)/H:1;let q,J,ut;if(C<dt.turnAlign)q=(V.x*It-B*dt.turnBite)*x.mass,J=(V.z*It-F*dt.turnBite)*x.mass,ut=dt.touchMax*dt.turnBoost;else{const xt=B*V.x+F*V.z,St=(It-xt)*x.mass;q=V.x*St,J=V.z*St,ut=St>=0||O?dt.touchMax:dt.touchBrake}const rt=Math.hypot(q,J);rt>ut&&rt>0&&(q=q/rt*ut,J=J/rt*ut),x.applyImpulse(new y(q,0,J));const Ut=Math.min(1,$/ct.maxSpeed);b.pokeTimer=dt.touchIntervalSlow+(dt.touchIntervalFast-dt.touchIntervalSlow)*Ut,b.touch={x:x.position.x-V.x*dt.radius,y:dt.radius*.5,z:x.position.z-V.z*dt.radius,strength:Math.min(1,Math.hypot(q,J)/dt.touchMax)},x.wakeUp()}function r(A,x,v,P=0){if(A.state!=="ACTIVE")return null;const b=t(A);if(b.kickTimer>0||v)return null;const S=A.pelvis.position,R=x.position.x-S.x,L=x.position.z-S.z;if(Math.hypot(R,L)>dt.kickRange)return null;const G=Math.max(0,Math.min(1,P)),k=dt.kickForwardMin+(dt.kickForwardMax-dt.kickForwardMin)*G,B=dt.kickUpMin+(dt.kickUpMax-dt.kickUpMin)*G,F=n(A);x.applyImpulse(new y(F.x*k,B,F.z*k));const H=dt.kickRecoil*(.5+G*.5);return A.pelvis.applyImpulse(new y(-F.x*H,0,-F.z*H)),x.wakeUp(),b.kickTimer=dt.kickCooldown,b.lockout=Math.max(b.lockout,dt.kickLockout),{x:x.position.x,y:.02,z:x.position.z,power:G}}function a(A){return Math.max(0,t(A).kickTimer/dt.kickCooldown)}function c(A){const x=t(A),v=x.lastTrickInfo;return x.lastTrickInfo=null,v}function l(A){const x=t(A),v=x.touch;return x.touch=null,v}function h(A,x){if(A.state!=="ACTIVE")return!1;const v=A.pelvis.position;return Math.hypot(x.position.x-v.x,x.position.z-v.z)>dt.scoopRange?!1:(t(A).scoopTimer=dt.scoopTime,!0)}function u(A){return t(A).scoopTimer>0}function f(A,x){const v=new y(0,0,1);A.torso.quaternion.vmult(v,v);const P=Math.hypot(v.x,v.z)||1,b=A.torso.position.x+v.x/P*dt.scoopAhead,S=A.torso.position.y+dt.scoopHeight,R=A.torso.position.z+v.z/P*dt.scoopAhead,L=Math.abs(-18);let G=(b-x.position.x)*34-x.velocity.x*6,k=(S-x.position.y)*34-x.velocity.y*6+L,B=(R-x.position.z)*34-x.velocity.z*6;const F=Math.hypot(G,k,B);if(F>dt.scoopAccel){const H=dt.scoopAccel/F;G*=H,k*=H,B*=H}x.applyForce(new y(G*x.mass,k*x.mass,B*x.mass)),x.wakeUp()}function d(A){const x=A.pelvis.velocity;A.pelvis.applyForce(new y(-x.x*dt.carryDrag,0,-x.z*dt.carryDrag))}function m(A,x,v){const P=t(A);if(P.trickTimer>0||v||A.state!=="ACTIVE"||A.pelvis.position.y>ct.rideHeight+.35)return!1;const b=A.pelvis.position;if(Math.hypot(x.position.x-b.x,x.position.z-b.z)>dt.trickRange)return!1;const R=n(A);e(A);const L=-R.z,G=R.x,k=A.intentX*L+A.intentZ*G;let B;Math.abs(k)>.25?B=Math.sign(k):B=(x.position.x-b.x)*L+(x.position.z-b.z)*G>=0?-1:1;const F=-B;{const N=A.pelvis.velocity,Y=N.x*R.x+N.z*R.z,st=R.x*Y*dt.trickBallKeep+L*F*dt.trickBallSide,at=R.z*Y*dt.trickBallKeep+G*F*dt.trickBallSide;x.applyImpulse(new y((st-x.velocity.x)*x.mass,dt.trickBallUp,(at-x.velocity.z)*x.mass))}x.wakeUp(),A.pelvis.applyImpulse(new y(L*B*dt.trickBodySide,dt.trickBodyUp,G*B*dt.trickBodySide)),A.torso.torque.y+=B*dt.trickTorque,P.trickTimer=dt.trickCooldown,P.lockout=dt.trickLockout,P.settleTimer=dt.trickSettleTime,P.settleRefX=R.x,P.settleRefZ=R.z;const H=L*B+R.x*dt.trickDashForward,V=G*B+R.z*dt.trickDashForward,$=Math.hypot(H,V)||1;return P.dashTimer=dt.trickDash,P.dashX=H/$,P.dashZ=V/$,P.lastTrick=performance.now(),P.lastTrickInfo={x:b.x,z:b.z,dodgeX:L*B,dodgeZ:G*B,ballX:L*F,ballZ:G*F},!0}function _(A,x,v){const P=t(A);if(P.stopTimer>0||v||A.state!=="ACTIVE"||A.pelvis.position.y>ct.rideHeight+.35)return!1;const b=A.pelvis.position;if(Math.hypot(x.position.x-b.x,x.position.z-b.z)>dt.stopRange)return!1;const R=x.velocity;x.applyImpulse(new y(-R.x*(1-dt.stopBallKeep)*x.mass,0,-R.z*(1-dt.stopBallKeep)*x.mass),new y(0,dt.radius,0));const L=b.x-x.position.x,G=b.z-x.position.z,k=Math.hypot(L,G)||1;x.applyImpulse(new y(L/k*dt.stopBallPull,0,G/k*dt.stopBallPull)),x.wakeUp();const B=A.pelvis.velocity,F=Math.hypot(B.x,B.z);for(const V of[A.pelvis,A.torso]){const $=V.velocity;V.applyImpulse(new y(-$.x*dt.stopBrake*V.mass,0,-$.z*dt.stopBrake*V.mass))}const H=F>.3?{x:-B.x/F,z:-B.z/F}:e(A);return P.dashTimer=dt.stopDash,P.dashX=F>.3?H.x:-H.x,P.dashZ=F>.3?H.z:-H.z,P.stopTimer=dt.stopCooldown,P.lockout=Math.max(P.lockout,dt.stopLockout),P.lastTrickInfo={x:b.x,z:b.z,dodgeX:P.dashX,dodgeZ:P.dashZ,ballX:0,ballZ:0},!0}function p(A){return Math.max(0,t(A).stopTimer/dt.stopCooldown)}function g(A,x){const v=t(A);if(v.trickTimer=Math.max(0,v.trickTimer-x),v.stopTimer=Math.max(0,v.stopTimer-x),v.settleTimer=Math.max(0,v.settleTimer-x),v.lockout=Math.max(0,v.lockout-x),v.pokeTimer=Math.max(0,v.pokeTimer-x),v.kickTimer=Math.max(0,v.kickTimer-x),v.scoopTimer=Math.max(0,v.scoopTimer-x),v.dashTimer=Math.max(0,v.dashTimer-x),v.rushCd=Math.max(0,v.rushCd-x),v.rushTimer>0)if(v.rushTimer=Math.max(0,v.rushTimer-x),A.state!=="ACTIVE")v.rushTimer=0;else for(const P of A.bodies)P.applyForce(new y(v.rushX*dt.rushAccel*P.mass,0,v.rushZ*dt.rushAccel*P.mass))}function M(A,x,v){if(v||A.state!=="ACTIVE")return null;const P=t(A);if(P.rushCd>0||P.rushTimer>0)return null;const b=A.pelvis.position,S=Math.hypot(x.position.x-b.x,x.position.z-b.z);if(S<=dt.kickRange||S>dt.rushRange)return null;const R=e(A);P.rushTimer=dt.rushTime,P.rushX=R.x,P.rushZ=R.z,P.rushCd=dt.rushCooldown;const L=A.bodies.reduce((G,k)=>G+k.mass,0)||1;for(const G of A.bodies){const k=dt.rushImpulse*G.mass/L;G.applyImpulse(new y(R.x*k,0,R.z*k))}return{x:R.x,z:R.z}}function E(A){return t(A).rushTimer>0}function T(A){const x=t(A);return x.rushTimer<=0?null:{x:x.rushX,z:x.rushZ}}function U(A){return t(A).rushCd}function D(A){const x=t(A);return x.dashTimer<=0?null:{x:x.dashX,z:x.dashZ}}function w(A){s.delete(A)}function I(A){return t(A).trickTimer}return{dribble:o,tryKick:r,kickCooldownOf:a,carryPenalty:d,tryTrick:m,tick:g,forget:w,cooldownOf:I,requestPickup:h,scooping:u,scoopStep:f,dashDir:D,takeTouch:l,takeTrick:c,tryStopTurn:_,stopCooldownOf:p,tryRush:M,rushing:E,rushCooldownOf:U,rushDir:T}}function Zr(s,t,e,n){const i=new yn({color:n.color,transparent:!0,depthWrite:!1,toneMapped:!1,side:Wn}),o=[];for(let r=0;r<e;r++){const a=i.clone(),c=new Pt(t,a);c.visible=!1,n.flat&&(c.rotation.x=-Math.PI/2),c.renderOrder=997,s.add(c),o.push({mesh:c,mat:a,life:0,maxLife:1,from:1,to:1,alpha:1,vx:0,vy:0,vz:0})}return i.dispose(),o}function ES(s){const t=new Mn;t.frustumCulled=!1,s.add(t);const e=new Co(.55,1,20),n=new ls(1,10,8),i=Zr(t,e,10,{color:16777215,flat:!0}),o=Zr(t,n,14,{color:16765503}),r=Zr(t,e,8,{color:16777215,flat:!0}),a=Zr(t,e,4,{color:10479359,flat:!0}),c=[i,o,r,a];function l(u){let f=u[0];for(const d of u){if(d.life<=0)return d;d.life<f.life&&(f=d)}return f}function h(u,f,d,m,_,p,g,M,E=0,T=0,U=0){u.mesh.position.set(f,d,m),u.life=_,u.maxLife=_,u.from=p,u.to=g,u.alpha=M,u.vx=E,u.vy=T,u.vz=U,u.mesh.scale.setScalar(p),u.mat.opacity=M,u.mesh.visible=!0}return{touch(u,f,d,m){const _=Math.max(.25,Math.min(1,m));h(l(i),u,f+.02,d,.26,.24*_,.9*_,.62*_)},trail(u,f,d){h(l(o),u,f,d,.5,.26,.06,.8)},dash(u,f,d,m){for(let _=0;_<3;_++){const p=.6+_*.35;h(l(r),u-d*.15*_,.04,f-m*.15*_,.42+_*.06,.3,1.25+_*.25,.62,-d*p,0,-m*p)}},kick(u,f,d,m){const _=.6+m*.9;h(l(a),u,f+.02,d,.3,.3,1.9*_,.6)},update(u){for(const f of c)for(const d of f){if(d.life<=0)continue;if(d.life-=u,d.life<=0){d.mesh.visible=!1,d.mat.opacity=0;continue}const m=1-d.life/d.maxLife;d.mesh.scale.setScalar(d.from+(d.to-d.from)*m),d.mat.opacity=d.alpha*(1-m),d.mesh.position.x+=d.vx*u,d.mesh.position.y+=d.vy*u,d.mesh.position.z+=d.vz*u}},dispose(){s.remove(t);for(const u of c)for(const f of u)f.mat.dispose();e.dispose(),n.dispose()}}}const bS={step:{type:"triangle",f0:150,f1:90,dur:.07,gain:.05,noise:.8,attack:.002},touch:{type:"sine",f0:420,f1:260,dur:.07,gain:.1,noise:.25,attack:.002},kick:{type:"sine",f0:220,f1:70,dur:.16,gain:.3,noise:.35,attack:.002},kickHard:{type:"sine",f0:200,f1:52,dur:.24,gain:.4,noise:.45,attack:.001},kickCharge:{type:"square",f0:660,f1:880,dur:.06,gain:.07,attack:.004},trick:{type:"triangle",f0:480,f1:1150,dur:.2,gain:.2,attack:.004,harmonic:1.5},pickup:{type:"sine",f0:520,f1:780,dur:.12,gain:.16,attack:.004},drop:{type:"sine",f0:500,f1:300,dur:.1,gain:.13,attack:.004},hit:{type:"sawtooth",f0:180,f1:60,dur:.24,gain:.3,noise:.6,attack:.001},ballBounce:{type:"sine",f0:300,f1:120,dur:.12,gain:.2,noise:.5,attack:.001},ballHard:{type:"sawtooth",f0:240,f1:66,dur:.2,gain:.34,noise:.55,attack:.001},ragdoll:{type:"triangle",f0:420,f1:90,dur:.34,gain:.24,noise:.3,attack:.004},land:{type:"triangle",f0:130,f1:70,dur:.1,gain:.12,noise:.5,attack:.002},botSpawn:{type:"sawtooth",f0:300,f1:120,dur:.45,gain:.22,attack:.02,harmonic:.5},goal:{type:"square",f0:520,f1:1050,dur:.55,gain:.26,attack:.006,harmonic:1.5},crowd:{type:"sawtooth",f0:200,f1:420,dur:1.2,gain:.18,noise:.75,attack:.05},fail:{type:"sawtooth",f0:380,f1:110,dur:.7,gain:.24,attack:.01},countdown:{type:"square",f0:700,f1:700,dur:.1,gain:.18,attack:.004},start:{type:"square",f0:900,f1:1300,dur:.3,gain:.24,attack:.004,harmonic:1.5},ui:{type:"sine",f0:660,f1:880,dur:.07,gain:.12,attack:.003}};function TS(){let s=null,t=null,e=null,n=null,i=!1,o=!1,r=.9,a=.32,c=null,l=null,h=null,u=null,f=0,d=0;const m=new Map,_=new Map,p={step:.12,touch:.05,hit:.12,land:.15,kickCharge:.05,ballBounce:.11,ballHard:.14,kickHard:.15,ragdoll:.4,crowd:2,trick:.35};function g(){if(s)return s;try{const b=window.AudioContext??window.webkitAudioContext;if(!b)return null;s=new b,t=s.createGain(),t.gain.value=i?0:r,t.connect(s.destination),e=s.createGain(),e.gain.value=0,e.connect(t)}catch{s=null}return s}let M=null;function E(b){if(M)return M;const S=Math.floor(b.sampleRate*.5);M=b.createBuffer(1,S,b.sampleRate);const R=M.getChannelData(0);for(let L=0;L<S;L++)R[L]=Math.random()*2-1;return M}function T(b,S={}){if(i||!o)return;const R=g();if(!R||!t)return;f++;const L=R.currentTime,G=p[b];if(G!==void 0){const pt=_.get(b)??-1e9;if(L-pt<G)return;_.set(b,L)}d++;const k=S.vol??1,B=S.rate??1;let F=t;if(S.pan!==void 0&&typeof R.createStereoPanner=="function"){const pt=R.createStereoPanner();pt.pan.value=Math.max(-1,Math.min(1,S.pan)),pt.connect(t),F=pt}const H=m.get(b);if(H){const pt=R.createBufferSource();pt.buffer=H,pt.playbackRate.value=B;const nt=R.createGain();nt.gain.value=k,pt.connect(nt).connect(F),pt.start();return}const V=bS[b],$=V.dur/B,N=R.createGain(),Y=V.gain*k,st=V.attack??.005;N.gain.setValueAtTime(1e-4,L),N.gain.exponentialRampToValueAtTime(Math.max(2e-4,Y),L+st),N.gain.exponentialRampToValueAtTime(1e-4,L+$),N.connect(F);const at=R.createOscillator();if(at.type=V.type,at.frequency.setValueAtTime(V.f0*B,L),at.frequency.exponentialRampToValueAtTime(Math.max(20,V.f1*B),L+$),at.connect(N),at.start(L),at.stop(L+$+.02),V.harmonic){const pt=R.createOscillator();pt.type=V.type,pt.frequency.setValueAtTime(V.f0*V.harmonic*B,L),pt.frequency.exponentialRampToValueAtTime(Math.max(20,V.f1*V.harmonic*B),L+$);const nt=R.createGain();nt.gain.value=.4,pt.connect(nt).connect(N),pt.start(L),pt.stop(L+$+.02)}if(V.noise){const pt=R.createBufferSource();pt.buffer=E(R);const nt=R.createBiquadFilter();nt.type="bandpass",nt.frequency.value=V.f0*2;const Mt=R.createGain();Mt.gain.value=V.noise,pt.connect(nt).connect(Mt).connect(N),pt.start(L),pt.stop(L+$+.02)}}const U=[[262,330,392],[294,370,440],[220,277,330],[247,311,392]];let D=0;function w(){const b=g();if(!b||!e||i)return;const S=b.currentTime,R=U[D++%U.length];for(const L of R){const G=b.createOscillator();G.type="triangle",G.frequency.value=L;const k=b.createGain();k.gain.setValueAtTime(1e-4,S),k.gain.exponentialRampToValueAtTime(.05,S+.25),k.gain.exponentialRampToValueAtTime(1e-4,S+1.9),G.connect(k).connect(e),G.start(S),G.stop(S+2)}}function I(b){if(!(!g()||!e))if(b){if(n!==null)return;e.gain.value=1,w(),n=window.setInterval(w,2e3)}else n!==null&&(clearInterval(n),n=null),e.gain.value=0}function A(b){if(b)try{b.pause(),b.currentTime=0,b.src="",b.load()}catch{}}function x(){h&&(clearInterval(h),h=null);const b=c;if(!b)return;const S=performance.now();h=window.setInterval(()=>{if(c!==b){h&&clearInterval(h),h=null;return}const R=Math.min(1,(performance.now()-S)/400);try{b.volume=i?0:a*R}catch{}R>=1&&h&&(clearInterval(h),h=null)},40)}function v(){if(!o)return;const b=l;if(c&&(c.dataset.url??null)===b&&b!==null){if(c.paused){const S=c.play();S&&typeof S.catch=="function"&&S.catch(R=>{u=`play() 거부: ${(R==null?void 0:R.name)??R}`})}return}if(h&&(clearInterval(h),h=null),A(c),c=null,!!b)try{const S=new Audio(b);S.loop=!0,S.preload="auto",S.volume=0,S.muted=i,S.dataset.url=b,S.addEventListener("error",()=>{var L;c===S&&(u=`로드 실패(code ${((L=S.error)==null?void 0:L.code)??"?"}): ${b}`)});const R=S.play();R&&typeof R.catch=="function"&&R.catch(L=>{u=`play() 거부: ${(L==null?void 0:L.name)??L}`}),c=S,x()}catch{c=null}}function P(b){if(b===l){v();return}l=b,u=null,v()}return{play:T,music:I,playBgm:P,setSfxVolume(b){r=Math.max(0,Math.min(1,b)),t&&!i&&(t.gain.value=r)},setMusicVolume(b){if(a=Math.max(0,Math.min(1,b)),c&&!h)try{c.volume=i?0:a}catch{}},getSfxVolume(){return r},getMusicVolume(){return a},unlock(){const b=g();b&&(o=!0,b.state==="suspended"&&b.resume(),v())},status(){return{ctx:s?s.state:"none",unlocked:o,muted:i,played:f,heard:d,sfxVolume:r,musicVolume:a,bgm:{want:l,src:c?c.src:null,paused:c?c.paused:null,volume:c?c.volume:null,readyState:c?c.readyState:null,error:u}}},setMuted(b){i=b,t&&(t.gain.value=b?0:r),c&&(c.muted=b)},get muted(){return i},async loadSamples(b){const S=g();if(S){for(const[R,L]of Object.entries(b))if(L)try{m.set(R,await S.decodeAudioData(L.slice(0)))}catch{}}},async loadSampleUrls(b){const S=g();S&&await Promise.all(Object.entries(b).map(async([R,L])=>{if(L)try{const G=await fetch(L);if(!G.ok)return;const k=await G.arrayBuffer();m.set(R,await S.decodeAudioData(k))}catch{}}))},dispose(){n!==null&&clearInterval(n),h&&(clearInterval(h),h=null),A(c),c=null,l=null,s&&s.close(),s=null}}}const ud="gr.vol.bgm",hd="gr.vol.sfx",AS=.32,CS=.9,Sa=s=>Math.max(0,Math.min(1,s));function dd(s){try{const t=localStorage.getItem(s);if(t===null)return null;const e=t.trim();if(e==="")return null;const n=Number(e);return!Number.isFinite(n)||n<0?null:n>1&&n<=100?Sa(n/100):Sa(n)}catch{return null}}function fd(s,t){try{localStorage.setItem(s,String(t))}catch{}}const _s=s=>document.getElementById(s);function RS(s){s.setMusicVolume(dd(ud)??AS),s.setSfxVolume(dd(hd)??CS);const t=_s("settings"),e=_s("btn-settings-gear"),n=_s("btn-settings-close"),i=_s("vol-bgm"),o=_s("vol-sfx"),r=_s("vol-bgm-val"),a=_s("vol-sfx-val");if(!t||!i||!o)return;const c=d=>`${Math.round(d*100)}%`,l=d=>{i.value=String(Math.round(d*100)),r&&(r.textContent=c(d))},h=d=>{o.value=String(Math.round(d*100)),a&&(a.textContent=c(d))};l(s.getMusicVolume()),h(s.getSfxVolume()),i.addEventListener("input",()=>{const d=Sa(Number(i.value)/100);s.setMusicVolume(d),r&&(r.textContent=c(d)),fd(ud,d)}),o.addEventListener("input",()=>{const d=Sa(Number(o.value)/100);s.setSfxVolume(d),a&&(a.textContent=c(d)),fd(hd,d)}),o.addEventListener("change",()=>s.play("ui"));const u=()=>{l(s.getMusicVolume()),h(s.getSfxVolume()),t.hidden=!1},f=()=>{t.hidden=!0};e==null||e.addEventListener("click",u),n==null||n.addEventListener("click",f),t.addEventListener("click",d=>{d.target===t&&f()}),document.addEventListener("keydown",d=>{d.key==="Escape"&&!t.hidden&&f()})}const ae={reactionTime:.3,turnRate:3.2,leadTime:.85,stealDist:1.45,stealImpulse:4.6,stealCooldown:2.6,bumpDist:1.35,bumpImpulse:3.4,bumpCooldown:1.1,laneMargin:1.3,hugDist:.55,spawnGrace:1.1,blockAhead:4.5,shoveDist:1.5,shoveImpulse:15,shoveUp:3,shoveCooldown:2.4,carrierLead:.4,tackleBallDist:2.4,tackleDist:1.3,tackleKnockTime:1,tackleImpulse:26,tackleCooldown:6.5},pd=["chaser","chaser","blocker","bruiser","chaser","blocker"];function PS(s){return pd[(-s-1)%pd.length]??"chaser"}function IS(s){const t=new Map;function e(o){let r=t.get(o);return r||(r={memory:[],dirX:0,dirZ:-1,stealTimer:0,bumpTimer:0,shoveTimer:0,tackleTimer:0,clock:0},t.set(o,r)),r}function n(o){t.delete(o)}function i(o,r,a,c){const{carriers:l,humans:h,goalZ:u,role:f}=c,d=e(o);d.clock+=a,d.stealTimer=Math.max(0,d.stealTimer-a),d.bumpTimer=Math.max(0,d.bumpTimer-a),d.shoveTimer=Math.max(0,d.shoveTimer-a),d.tackleTimer=Math.max(0,d.tackleTimer-a);const m=[],_=[];for(d.memory.push({t:d.clock,x:r.position.x,z:r.position.z,vx:r.velocity.x,vz:r.velocity.z});d.memory.length>2&&d.memory[1].t<=d.clock-ae.reactionTime;)d.memory.shift();const p=d.memory[0];if(o.state!=="ACTIVE")return{input:{moveX:0,moveZ:0,jump:!1},brokeCarry:m,tackled:_};const g=o.pelvis.position,M=s-ae.laneMargin;let E=null,T=1/0;for(const k of h){if(k.state!=="ACTIVE")continue;const B=Math.hypot(k.pelvis.position.x-g.x,k.pelvis.position.z-g.z);B<T&&(T=B,E=k)}const U=l.find(k=>k.state==="ACTIVE")??null;let D,w;if(f==="bruiser"){const k=U??E;k?(D=k.pelvis.position.x+k.pelvis.velocity.x*ae.carrierLead,w=k.pelvis.position.z+k.pelvis.velocity.z*ae.carrierLead):(D=p.x,w=p.z)}else if(f==="blocker"){const k=u<p.z?-1:1;D=p.x*.45,w=p.z+k*ae.blockAhead,k<0&&(w=Math.max(w,u+3)),Math.hypot(p.x-g.x,p.z-g.z)>7&&(g.z-p.z)*k>=ae.blockAhead*.5&&(D=g.x*.9,w=g.z)}else if(U)D=U.pelvis.position.x+U.pelvis.velocity.x*ae.carrierLead,w=U.pelvis.position.z+U.pelvis.velocity.z*ae.carrierLead;else{const k=Math.hypot(p.x-g.x,p.z-g.z),B=Math.min(ae.leadTime,k/6);D=p.x+p.vx*B,w=p.z+p.vz*B}D=Math.max(-M,Math.min(M,D));let I=D-g.x,A=w-g.z;const x=Math.hypot(I,A);if(x>.001?(I/=x,A/=x):(I=d.dirX,A=d.dirZ),x<ae.hugDist){const k=-A,B=I;I=I*.35+k*.94,A=A*.35+B*.94;const F=Math.hypot(I,A)||1;I/=F,A/=F}const v=Math.atan2(d.dirX,d.dirZ);let b=Math.atan2(I,A)-v;for(;b>Math.PI;)b-=Math.PI*2;for(;b<-Math.PI;)b+=Math.PI*2;const S=ae.turnRate*a,R=v+Math.max(-S,Math.min(S,b));d.dirX=Math.sin(R),d.dirZ=Math.cos(R);const L=r.position.x-g.x,G=r.position.z-g.z;if(f!=="bruiser"&&Math.hypot(L,G)<ae.stealDist&&d.stealTimer<=0&&d.clock>=ae.spawnGrace&&(r.applyImpulse(new y(d.dirX*ae.stealImpulse,.8,d.dirZ*ae.stealImpulse)),r.wakeUp(),d.stealTimer=ae.stealCooldown),d.bumpTimer<=0&&d.clock>=ae.spawnGrace)for(const k of l){const B=k.pelvis.position;if(!(Math.hypot(B.x-g.x,B.z-g.z)>ae.bumpDist)){m.push(k),d.bumpTimer=ae.bumpCooldown;break}}if(f==="bruiser"&&d.shoveTimer<=0&&d.clock>=ae.spawnGrace)for(const k of h){if(k.state!=="ACTIVE")continue;const B=k.pelvis.position;let F=B.x-g.x,H=B.z-g.z;const V=Math.hypot(F,H);if(V>ae.shoveDist||V<.001)continue;F/=V,H/=V;const $=B.x>=0?1:-1;k.pelvis.applyImpulse(new y((F*.4+$*.9)*ae.shoveImpulse,ae.shoveUp,H*.4*ae.shoveImpulse)),k.pelvis.wakeUp(),d.shoveTimer=ae.shoveCooldown;break}if(f==="chaser"&&d.tackleTimer<=0&&d.clock>=ae.spawnGrace){const k=B=>Math.hypot(B.pelvis.position.x-r.position.x,B.pelvis.position.z-r.position.z)<ae.tackleBallDist;for(const B of h){if(B.state!=="ACTIVE")continue;const F=B.pelvis.position;let H=F.x-g.x,V=F.z-g.z;const $=Math.hypot(H,V);if(!($>ae.tackleDist||$<.001||!k(B))){H/=$,V/=$,B.pelvis.applyImpulse(new y(H*ae.tackleImpulse,12,V*ae.tackleImpulse)),o.pelvis.applyImpulse(new y(-H*ae.tackleImpulse*.7,10,-V*ae.tackleImpulse*.7)),o.knockdown(ae.tackleKnockTime),o.pelvis.wakeUp(),B.pelvis.wakeUp(),_.push(B),d.tackleTimer=ae.tackleCooldown;break}}}return{input:{moveX:d.dirX,moveZ:d.dirZ,jump:!1},brokeCarry:m,tackled:_}}return{update:i,forget:n,stateOf:e}}const ft={hitImmunity:.65,frontDot:.44,PUSH_RANGE:2,PUSH_FORCE:46,PUSH_UP:7,PUSH_MIN:.4,PUSH_TWIST:20,PUSH_TWIST_AT:.3,PUSH_COOLDOWN:.42,PUSH_STUN:.32,SIDE_DOT:.45,FRONT_FORCE:.82,FRONT_UP:1.3,FRONT_TWIST:1.4,FRONT_STUN:.82,BACK_FORCE:1.12,BACK_UP:.85,BACK_TWIST:1,BACK_STUN:1.25,SIDE_FORCE:1,SIDE_UP:1.05,SIDE_TWIST:1,SIDE_STUN:.95,PUSH_TWIST_HIGH:.42,SIDE_SPIN:5.2,SIDE_VEER:.7,GRAB_RANGE:1.9,GRAB_DISTANCE:3.4,GRAB_PULL:30,GRAB_AHEAD:1.15,GRAB_DAMP:5,GRAB_COOLDOWN:.3,GRAB_MAX_FORCE:900,GRAB_DRAG:.7,GRAB_RESIST:.8,GRAB_TUG:.5,WHIP_RATE:2.2,WHIP_MIN_DIST:.9,WHIP_FORCE:44,WHIP_UP:10,WHIP_COOLDOWN:.55,WHIP_DOWN_RATE:4.6,WHIP_KNOCKDOWN:.95,BUMP_STAGGER:.3,BUMP_FORCE:26,BUMP_UP:5,BUMP_TWIST:12,BUMP_COOLDOWN:.55,KICK_RANGE:1.8,KICK_FORCE:135,KICK_UP:34,KICK_SPIN:11,KICK_COOLDOWN:1.1,KICK_KNOCKDOWN:1.15,KICK_FLAIL:7,KICK_YAW:1.5,REBOUND_WINDOW:1.2,REBOUND_ARM:.1,REBOUND_MIN_SPEED:4,REBOUND_DROP:2.6,REBOUND_WALL_DOT:.6,REBOUND_FORCE:1.2,REBOUND_UP:24,REBOUND_SPIN:9,armThrust:9,leanPush:7,grabReach:8,footThrust:10,hitShake:26},LS=new y(0,0,1),kc=new y;function DS(){const s=new Map,t=new Map,e=new Map,n=new Map,i=new Map,o=new Map,r=new Map,a=new Map,c=new Map,l=new Set,h=new Map;let u=0;const f=(F,H)=>{for(const[V,$]of F){const N=$-H;N<=0?F.delete(V):F.set(V,N)}};function d(F,H){f(s,F),f(t,F),f(e,F),f(n,F),f(c,F),f(h,F);for(const[$,N]of i){const Y=N.t-F;Y<=0?i.delete($):i.set($,{...N,t:Y})}const V=[];for(const[$,N]of r){const Y=$.pelvis.velocity,st=Math.hypot(Y.x,Y.z),at=N.spd-st;if(N.t<=ft.REBOUND_WINDOW-ft.REBOUND_ARM&&N.spd>=ft.REBOUND_MIN_SPEED&&at>=ft.REBOUND_DROP&&m($,H)){r.delete($),V.push(_($,N.dx,N.dz,at));continue}const nt=N.t-F;if(nt<=0){r.delete($);continue}r.set($,{t:nt,spd:st,dx:st>.001?Y.x/st:N.dx,dz:st>.001?Y.z/st:N.dz})}return V}function m(F,H){const V=new Set(F.bodies);for(const $ of H.contacts){const N=V.has($.bi),Y=V.has($.bj);if(!(N===Y||(N?$.bj:$.bi).type===gt.DYNAMIC)&&!(Math.abs($.ni.y)>ft.REBOUND_WALL_DOT))return!0}return!1}function _(F,H,V,$){const N=$*ft.REBOUND_FORCE*F.pelvis.mass,Y=$*ft.REBOUND_FORCE*F.torso.mass;F.pelvis.wakeUp(),F.pelvis.applyImpulse(new y(-H*N,ft.REBOUND_UP,-V*N)),F.torso.wakeUp(),F.torso.applyImpulse(new y(-H*Y,ft.REBOUND_UP*.3,-V*Y),new y(0,ft.PUSH_TWIST_AT,0));const st=-V*ft.REBOUND_SPIN,at=H*ft.REBOUND_SPIN;for(const nt of[F.pelvis,F.torso])nt.wakeUp(),nt.angularVelocity.x+=st,nt.angularVelocity.z+=at;const pt=F.pelvis.position;return{rag:F,x:pt.x,y:pt.y,z:pt.z,power:Math.max(.25,Math.min(1,$/9))}}function p(F,H,V,$){for(const N of F)N.wakeUp(),N.applyImpulse(new y(H*N.mass,V*N.mass,$*N.mass))}function g(F,H){const V=[];for(const $ of["upperArm"+H,"lowerArm"+H,"hand"+H]){const N=F.parts.get($);N&&V.push(N.body)}return V}function M(F,H){const V=[];for(const $ of["lowerLeg"+H,"foot"+H]){const N=F.parts.get($);N&&V.push(N.body)}return V}function E(F){F.torso.quaternion.vmult(LS,kc);let H=kc.x,V=kc.z,$=Math.hypot(H,V);return $<.2&&(H=F.intentX,V=F.intentZ,$=Math.hypot(H,V)),$<.001?{x:0,z:1}:{x:H/$,z:V/$}}function T(F,H,V,$,N){const Y=Math.hypot(H,V);if(Y<.001)return null;const st=H/Y,at=V/Y,pt=F.pelvis.position;let nt=null,Mt=1/0;for(const yt of $){if(yt===F)continue;const Dt=yt.pelvis.position,X=Dt.x-pt.x,ce=Dt.z-pt.z,Bt=Math.hypot(X,ce);if(Bt>N||Bt<.001||Math.abs(Dt.y-pt.y)>1.8)continue;const Yt=X/Bt*st+ce/Bt*at;if(!(Yt<ft.frontDot)&&Bt<Mt){Mt=Bt;const Ct=X/Bt,qt=ce/Bt,It=E(yt),O=It.x*Ct+It.z*qt,C=It.x*qt-It.z*Ct,q=O>ft.SIDE_DOT?"back":O<-.45?"front":"side";nt={target:yt,dirX:Ct,dirZ:qt,dist:Bt,power:U(Bt,Yt,N),side:q,sideSign:C>=0?1:-1}}}return nt}function U(F,H,V){const $=1-Math.min(1,F/V),N=(H-ft.frontDot)/(1-ft.frontDot),Y=.6*$+.4*Math.max(0,Math.min(1,N));return ft.PUSH_MIN+(1-ft.PUSH_MIN)*Y}const D=F=>!n.has(F),w=F=>n.has(F);function I(F,H,V,$){if(s.has(F)||F.state!=="ACTIVE")return null;const N=T(F,H,V,$,ft.PUSH_RANGE);if(!N||!D(N.target))return null;s.set(F,ft.PUSH_COOLDOWN),n.set(N.target,ft.hitImmunity);const Y=N.target,st=N.power,at=N.side==="front"?{f:ft.FRONT_FORCE,up:ft.FRONT_UP,tw:ft.FRONT_TWIST,st:ft.FRONT_STUN,at:ft.PUSH_TWIST_HIGH}:N.side==="back"?{f:ft.BACK_FORCE,up:ft.BACK_UP,tw:ft.BACK_TWIST,st:ft.BACK_STUN,at:ft.PUSH_TWIST_AT}:{f:ft.SIDE_FORCE,up:ft.SIDE_UP,tw:ft.SIDE_TWIST,st:ft.SIDE_STUN,at:ft.PUSH_TWIST_AT};if(Y.pelvis.wakeUp(),Y.pelvis.applyImpulse(new y(N.dirX*ft.PUSH_FORCE*st*at.f,ft.PUSH_UP*st*at.up,N.dirZ*ft.PUSH_FORCE*st*at.f)),Y.torso.wakeUp(),Y.torso.applyImpulse(new y(N.dirX*ft.PUSH_TWIST*st*at.tw,0,N.dirZ*ft.PUSH_TWIST*st*at.tw),new y(0,at.at,0)),N.side==="side"){const yt=ft.SIDE_SPIN*st*N.sideSign;Y.pelvis.wakeUp(),Y.torso.wakeUp(),Y.pelvis.angularVelocity.y+=yt,Y.torso.angularVelocity.y+=yt}const pt=(st-ft.PUSH_MIN)/(1-ft.PUSH_MIN);let nt=N.dirX,Mt=N.dirZ;if(N.side==="side"){const yt=ft.SIDE_VEER*N.sideSign,Dt=Math.cos(yt),X=Math.sin(yt);nt=N.dirX*Dt-N.dirZ*X,Mt=N.dirX*X+N.dirZ*Dt}Y.state==="ACTIVE"&&i.set(Y,{t:ft.PUSH_STUN*at.st*(.35+.65*pt),x:nt,z:Mt});for(const yt of["L","R"])p(g(F,yt),N.dirX*ft.armThrust,1.5,N.dirZ*ft.armThrust);return F.torso.applyImpulse(new y(N.dirX*ft.leanPush,0,N.dirZ*ft.leanPush)),N}function A(F,H,V,$){if(t.has(F)||F.state!=="ACTIVE")return null;const N=T(F,H,V,$,ft.KICK_RANGE);if(!N||!D(N.target))return null;t.set(F,ft.KICK_COOLDOWN),n.set(N.target,ft.hitImmunity);const Y=N.target;Y.knockdown(ft.KICK_KNOCKDOWN),Y.pelvis.wakeUp(),Y.pelvis.applyImpulse(new y(N.dirX*ft.KICK_FORCE,ft.KICK_UP,N.dirZ*ft.KICK_FORCE)),Y.torso.wakeUp(),Y.torso.applyImpulse(new y(N.dirX*ft.hitShake,ft.hitShake*.4,N.dirZ*ft.hitShake),new y(0,ft.PUSH_TWIST_AT,0));const st=N.dirZ*ft.KICK_SPIN,at=-N.dirX*ft.KICK_SPIN,pt=(u++%2===0?1:-1)*ft.KICK_YAW;for(const yt of[Y.pelvis,Y.torso])yt.wakeUp(),yt.angularVelocity.x+=st,yt.angularVelocity.z+=at,yt.angularVelocity.y+=pt;const nt=-N.dirZ,Mt=N.dirX;p(g(Y,"L"),-nt*ft.KICK_FLAIL,ft.KICK_FLAIL*.6,-Mt*ft.KICK_FLAIL),p(g(Y,"R"),nt*ft.KICK_FLAIL,ft.KICK_FLAIL*.6,Mt*ft.KICK_FLAIL),r.set(Y,{t:ft.REBOUND_WINDOW,spd:0,dx:N.dirX,dz:N.dirZ});for(const yt of["L","R"])p(M(F,yt),N.dirX*ft.footThrust,3,N.dirZ*ft.footThrust);return N}function x(F,H,V,$){if(e.has(F))return null;if(o.has(F))return o.delete(F),e.set(F,ft.GRAB_COOLDOWN),"released";if(F.state!=="ACTIVE")return null;const N=T(F,H,V,$,ft.GRAB_RANGE);if(!N)return null;for(const Y of o.values())if(Y===N.target)return null;o.set(F,N.target),e.set(F,ft.GRAB_COOLDOWN);for(const Y of["L","R"])p(g(F,Y),N.dirX*ft.grabReach,2,N.dirZ*ft.grabReach);return"grabbed"}function v(F){const H=[],V=new Set;for(const[$,N]of o){if($.state!=="ACTIVE"){o.delete($),a.delete($),H.push({kind:"dropped",holder:$,target:N});continue}const Y=$.pelvis.position,st=N.pelvis.position,at=Math.hypot(st.x-Y.x,st.z-Y.z);if(at>ft.GRAB_DISTANCE){o.delete($),a.delete($),H.push({kind:"dropped",holder:$,target:N});continue}const pt=at>.001?(st.x-Y.x)/at:1,nt=at>.001?(st.z-Y.z)/at:0,Mt=Y.x+pt*ft.GRAB_AHEAD,yt=Y.z+nt*ft.GRAB_AHEAD,Dt=o.get(N)===$,X=a.get($);if(X&&!Dt&&at>ft.WHIP_MIN_DIST&&!c.has($)&&N.state==="ACTIVE"){const q=X.x*nt-X.z*pt,J=X.x*pt+X.z*nt,ut=Math.abs(Math.atan2(q,J))/Math.max(1e-4,F);if(ut>ft.WHIP_RATE){c.set($,ft.WHIP_COOLDOWN);const rt=q>=0?1:-1,Ut=-nt*rt,xt=pt*rt,St=Math.min(1,ut/ft.WHIP_DOWN_RATE);N.pelvis.wakeUp(),N.pelvis.applyImpulse(new y(Ut*ft.WHIP_FORCE*St,ft.WHIP_UP*St,xt*ft.WHIP_FORCE*St)),N.torso.wakeUp(),N.torso.applyImpulse(new y(Ut*ft.WHIP_FORCE*.35*St,0,xt*ft.WHIP_FORCE*.35*St),new y(0,ft.PUSH_TWIST_AT,0));const jt=ut>ft.WHIP_DOWN_RATE;if(jt?(N.knockdown(ft.WHIP_KNOCKDOWN),o.delete($),a.delete($)):N.state==="ACTIVE"&&i.set(N,{t:ft.PUSH_STUN*.8,x:Ut,z:xt}),H.push({kind:"whip",holder:$,target:N,power:St,down:jt}),jt)continue}}a.set($,{x:pt,z:nt}),Dt&&(!l.has($)&&!l.has(N)&&!V.has(N)&&H.push({kind:"tug",holder:$,target:N}),V.add($));const ce=N.pelvis.mass,Bt=Dt?ft.GRAB_TUG:1,Yt=N.pelvis.velocity.x-$.pelvis.velocity.x,Ct=N.pelvis.velocity.z-$.pelvis.velocity.z;let qt=((Mt-st.x)*ft.GRAB_PULL-Yt*ft.GRAB_DAMP)*ce*Bt,It=((yt-st.z)*ft.GRAB_PULL-Ct*ft.GRAB_DAMP)*ce*Bt;const O=Math.hypot(qt,It),C=ft.GRAB_MAX_FORCE*Bt;O>C&&(qt=qt/O*C,It=It/O*C),N.pelvis.wakeUp(),N.pelvis.applyForce(new y(qt,0,It));for(const q of[$.handL,$.handR])q.applyForce(new y(pt*40,0,nt*40))}l.clear();for(const $ of V)l.add($);return H}function P(F,H,V,$,N){if(F.state!=="ACTIVE"||H.state!=="ACTIVE"||h.has(F)||h.has(H)||n.has(F)||n.has(H))return!1;const Y=Math.max(.35,Math.min(1,N));h.set(F,ft.BUMP_COOLDOWN),h.set(H,ft.BUMP_COOLDOWN);const st=(at,pt,nt)=>{at.pelvis.wakeUp(),at.pelvis.applyImpulse(new y(pt*ft.BUMP_FORCE*Y,ft.BUMP_UP*Y,nt*ft.BUMP_FORCE*Y)),at.torso.wakeUp(),at.torso.applyImpulse(new y(pt*ft.BUMP_TWIST*Y,0,nt*ft.BUMP_TWIST*Y),new y(0,ft.PUSH_TWIST_AT,0)),i.set(at,{t:ft.BUMP_STAGGER*Y,x:pt,z:nt})};return st(F,-V,-$),st(H,V,$),!0}function b(F){const H=i.get(F);return H?{x:H.x,z:H.z}:null}const S=F=>o.get(F)??null;function R(F){for(const[H,V]of o)if(V===F)return H;return null}const L=()=>[...o].map(([F,H])=>({holder:F,target:H}));function G(F){o.delete(F);for(const[H,V]of o)V===F&&(o.delete(H),a.delete(H));s.delete(F),t.delete(F),e.delete(F),n.delete(F),i.delete(F),r.delete(F),a.delete(F),c.delete(F),l.delete(F),h.delete(F)}function k(){o.clear(),s.clear(),t.clear(),e.clear(),n.clear(),i.clear(),r.clear(),a.clear(),c.clear(),l.clear(),h.clear()}return{tick:d,tryPush:I,tryKick:A,toggleGrab:x,updateHolds:v,tryBump:P,shoveDir:b,holding:S,heldBy:R,isImmune:w,pairs:L,tugPairs:()=>[...l],forget:G,reset:k}}const Ee={RUN_SPEED:2.2,RUN_LEAN:10,STOP_DECEL:6,STOP_PITCH:26,STOP_TIME:.22,TURN_RATE:3,TURN_ROLL:20,TURN_TIME:.2,TURN_MIN_SPEED:1.4,LAND_SPEED:5,LAND_PITCH:30,LAND_TIME:.26,LAND_ARM:5,AIR_TUCK:2.5,AIR_TUCK_MAX_SPIN:5,AIR_TUCK_DELAY:.18,HIP_SHARE:.5},di=new y;function NS(){const s=new Map,t=()=>({spd:0,hx:0,hz:1,vy:0,air:!1,airT:0,stopT:0,stopX:0,stopZ:1,turnT:0,turnSign:1,landT:0});function e(a,c,l,h){di.set(l*h,0,-c*h),a.torso.applyTorque(di);const u=h*Ee.HIP_SHARE;di.set(l*u,0,-c*u),a.pelvis.applyTorque(di)}function n(a,c,l,h){di.set(c*h,0,l*h),a.torso.applyTorque(di);const u=h*Ee.HIP_SHARE;di.set(c*u,0,l*u),a.pelvis.applyTorque(di)}function i(a,c){let l=s.get(a);l||(l=t(),s.set(a,l));const h=a.pelvis.velocity,u=Math.hypot(h.x,h.z),f=u>.05?h.x/u:l.hx,d=u>.05?h.z/u:l.hz,m=a.grounded;if(a.state!=="ACTIVE"){const E=t();return E.hx=f,E.hz=d,E.spd=u,E.vy=h.y,E.air=!m,s.set(a,E),null}let _=null;const p=a.pelvis.position,g=!m;if(l.air&&!g){const E=-l.vy;if(E>Ee.LAND_SPEED){const T=Math.min(1,(E-Ee.LAND_SPEED)/8);l.landT=Ee.LAND_TIME;for(const U of[a.handL,a.handR])U.wakeUp(),U.applyImpulse(new y(0,Ee.LAND_ARM*(.5+T)*U.mass,0));_={kind:"land",x:p.x,y:p.y,z:p.z,dirX:f,dirZ:d,power:.35+T*.65}}l.airT=0}g&&(l.airT+=c);const M=(l.spd-u)/Math.max(1e-4,c);if(m&&l.spd>Ee.RUN_SPEED&&M>Ee.STOP_DECEL&&l.stopT<=0&&(l.stopT=Ee.STOP_TIME,l.stopX=l.hx,l.stopZ=l.hz,_||(_={kind:"stop",x:p.x,y:p.y,z:p.z,dirX:l.stopX,dirZ:l.stopZ,power:Math.min(1,M/30)})),m&&u>Ee.TURN_MIN_SPEED&&l.spd>Ee.TURN_MIN_SPEED){const E=l.hx*d-l.hz*f,T=l.hx*f+l.hz*d,U=Math.abs(Math.atan2(E,T))/Math.max(1e-4,c);U>Ee.TURN_RATE&&l.turnT<=0&&(l.turnT=Ee.TURN_TIME,l.turnSign=E>=0?1:-1,_||(_={kind:"turn",x:p.x,y:p.y,z:p.z,dirX:f,dirZ:d,power:Math.min(1,U/9)}))}if(l.landT>0)e(a,f,d,Ee.LAND_PITCH*(l.landT/Ee.LAND_TIME)),l.landT-=c;else if(l.stopT>0)e(a,l.stopX,l.stopZ,Ee.STOP_PITCH*(l.stopT/Ee.STOP_TIME)),l.stopT-=c;else if(m&&u>Ee.RUN_SPEED){const E=Math.min(1,(u-Ee.RUN_SPEED)/Math.max(.5,ct.maxSpeed-Ee.RUN_SPEED));e(a,-f,-d,Ee.RUN_LEAN*E)}if(l.turnT>0&&(n(a,f,d,Ee.TURN_ROLL*l.turnSign*(l.turnT/Ee.TURN_TIME)),l.turnT-=c),g&&l.airT>Ee.AIR_TUCK_DELAY)for(const E of["upperLegL","upperLegR"]){const T=a.parts.get(E);T&&(T.body.angularVelocity.length()>Ee.AIR_TUCK_MAX_SPIN||(di.set(d*Ee.AIR_TUCK,0,-f*Ee.AIR_TUCK),T.body.applyTorque(di)))}return l.spd=u,l.hx=f,l.hz=d,l.vy=h.y,l.air=g,_}return{update:i,forget:a=>{s.delete(a)},reset:()=>s.clear()}}const US=document.getElementById("app"),_e=nS(US),{scene:Os,camera:Xn,renderer:Ea,physics:wn,objects:Vi,objectById:ai}=_e;let Yf=new Map;function Kf(){Yf=new Map(Vi.map(s=>[s.id,{p:s.body.position.clone(),q:s.body.quaternion.clone(),ld:s.body.linearDamping,ad:s.body.angularDamping}]))}Kf();_e.onMapLoaded(Kf);const wu=()=>_e.map.spawns,Ot=new Map,md=[{skin:7040888,shirt:2830136,pants:1316636,shoes:14236475,eye:16726876},{skin:8022904,shirt:3877688,pants:1840154,shoes:16747069,eye:16726876}];function jf(s){if(Ue(s))return md[(-s-1)%md.length];const t=we.presetOf(s);return pS(t??Wf(s))}function Ue(s){return s<0}function ba(){return[...Ot.keys()].filter(s=>!Ue(s)).sort((s,t)=>s-t)}function is(s,t){const e=Ot.get(s);if(e)return e;const n=[...Ot.keys()].filter(u=>Ue(u)===Ue(s)).length,i=wu(),[o,r]=t??i[n%i.length],a=MS(s),c=wS(a)|iS,l=cS(wn,Os,new y(o,ct.rideHeight+.15,r),_e.materials.player,jf(s),a,c),h={id:s,rag:l,input:{moveX:0,moveZ:0,jump:!1},grabPending:!1,trickPending:!1,kickPending:!1,stopPending:!1,kickPower:0};return Ot.set(s,h),h}function Oa(s){const t=Ot.get(s);t&&(Bi(t.rag),ln.forget(t.rag),Qe.forget(t.rag),bu.forget(t.rag),Oo.forget(t.rag),Yn.forget(t.rag),rp.forget(t.rag),cr.delete(t.rag),Bl.delete(t.rag),Hl.delete(t.rag),fa.delete(t.rag),t.rag.dispose(wn,Os),Ot.delete(s))}let ii=Math.PI,mi=.28;const Oc=6.2,zS=1.8;let Su=!1;Ea.domElement.addEventListener("click",()=>{je.phase==="playing"&&Ea.domElement.requestPointerLock()});document.addEventListener("mousedown",s=>{!Su||s.button!==0||$f()});document.addEventListener("mouseup",s=>{s.button===0&&Qf()});document.addEventListener("pointerlockchange",()=>{Su=document.pointerLockElement===Ea.domElement});document.addEventListener("mousemove",s=>{if(!Su)return;const t=qf({yaw:ii,pitch:mi},s.movementX,s.movementY);ii=t.yaw,mi=t.pitch});let Bc=Math.PI*.15;function FS(s){Bc+=s*.06;const t=17,e=9.5;Xn.position.lerp(new K(Math.sin(Bc)*t,e,Math.cos(Bc)*t),.05),Xn.lookAt(0,1,0)}let uo=0;function de(s){uo=Math.min(1,Math.max(uo,s))}let Hc=0;const kS=70;function OS(s,t,e){const n=s.x-Math.sin(ii)*Math.cos(mi)*Oc,i=s.y+Math.sin(mi)*Oc+zS,o=s.z-Math.cos(ii)*Math.cos(mi)*Oc;Xn.position.lerp(new K(n,i,o),.16);const r=Math.hypot(t.x,t.z),a=Math.min(1,r/ct.maxSpeed)*6;Hc+=(a-Hc)*Math.min(1,e*3);const c=kS+Hc;Math.abs(Xn.fov-c)>.01&&(Xn.fov=c,Xn.updateProjectionMatrix()),uo=Math.max(0,uo-e*3.2);const l=uo*uo*.5;Xn.lookAt(s.x+(Math.random()-.5)*l,s.y+.7+(Math.random()-.5)*l,s.z+(Math.random()-.5)*l)}const Le={};let Po=!1,Io=!1,Lo=!1,Do=!1,No=0,Zf=0,Uo=!1;function $f(){Uo||(Uo=!0,Zf=performance.now())}function Jf(){return Uo?Math.min(1,(performance.now()-Zf)/(dt.chargeTime*1e3)):0}function Qf(){Uo&&(No=Jf(),Uo=!1,Do=!0,dp=performance.now()/1e3,Pd=No,Pd>.75&&(lr=1.3))}const Gn={R:!1,T:!1,Y:!1,U:!1};window.addEventListener("keydown",s=>{s.code==="KeyE"&&!Le.KeyE&&(Po=!0),(s.code==="ShiftLeft"||s.code==="ShiftRight")&&!Le[s.code]&&(Io=!0),s.code==="KeyF"&&!Le[s.code]&&$f(),s.code==="KeyQ"&&!Le[s.code]&&(Lo=!0),s.code==="KeyM"&&!Le[s.code]&&(Jt.setMuted(!Jt.muted),Jt.play("ui")),s.code==="KeyH"&&!Le[s.code]&&(La=!La,Du()),s.code==="KeyR"&&!Le.KeyR&&(Gn.R=!0),s.code==="KeyT"&&!Le.KeyT&&(Gn.T=!0),s.code==="KeyY"&&!Le.KeyY&&(Gn.Y=!0),s.code==="KeyU"&&!Le.KeyU&&(Gn.U=!0),Le[s.code]=!0,s.code==="Space"&&s.preventDefault()});window.addEventListener("keyup",s=>{s.code==="KeyF"&&Qf(),Le[s.code]=!1});window.addEventListener("blur",()=>{for(const s of Object.keys(Le))Le[s]=!1;Uo=!1});function tp(){const{fx:s,fz:t}=Xf(ii),e=Math.hypot(s,t)||1;return{ax:s/e,az:t/e}}function Eu(){const{fx:s,fz:t,rx:e,rz:n}=Xf(ii);let i=0,o=0;(Le.KeyW||Le.ArrowUp)&&(i+=s,o+=t),(Le.KeyS||Le.ArrowDown)&&(i-=s,o-=t),(Le.KeyA||Le.ArrowLeft)&&(i-=e,o-=n),(Le.KeyD||Le.ArrowRight)&&(i+=e,o+=n);const r=Math.hypot(i,o);return r>0&&(i/=r,o/=r),{mx:i,mz:o}}const dn=[];function fi(s){return dn.filter(t=>t.ownerRag===s)}function Bi(s){for(let t=dn.length-1;t>=0;t--)if(dn[t].ownerRag===s){const e=dn[t];e.constraint&&wn.removeConstraint(e.constraint);const n=ai.get(e.objectId);n&&(n.body.linearDamping=e.prevLinearDamping,n.body.angularDamping=e.prevAngularDamping,n.body.material=e.prevMaterial),dn.splice(t,1)}s.setHeld([])}function Ba(s,t){return lS(s.body,t.position)}function gd(s){let t=null,e=1/0;for(const n of Vi){if(n.grabbable===!1||n.body.position.distanceTo(s.position)>n.grabRadius)continue;const o=n.body.position.vadd(n.body.quaternion.vmult(Ba(n,s))).distanceTo(s.position),r=n.grabReach??ct.grabReach;o<r&&o<e&&(e=o,t=n)}return t}function BS(s,t){const e=Math.abs(wn.gravity.y),n=s.mass*e<=ct.carryLiftStrength*t;for(const i of dn){const o=ai.get(i.objectId);if(!(!o||o.body!==s))if(n&&!i.constraint){const r=Ba(o,i.hand);i.pivotLocal=r;const a=new Of(i.hand,new y(0,0,0),s,r,i.holdForce);for(const c of a.equations)c.maxForce=0,c.minForce=-0;wn.addConstraint(a),i.constraint=a,i.ramp=0}else!n&&i.constraint&&(wn.removeConstraint(i.constraint),i.constraint=null)}}function vd(s){if(fi(s).length>0)return Bi(s),!1;const t=gd(s.handL)??gd(s.handR);if(!t)return!1;const e=t.body.material,n=t.body.linearDamping,i=t.body.angularDamping;for(const o of[s.handL,s.handR]){const r=Ba(t,o),a=dS(t.body,Math.abs(wn.gravity.y));dn.push({ownerRag:s,hand:o,objectId:t.id,constraint:null,ramp:0,holdForce:a,pivotLocal:r,prevLinearDamping:n,prevAngularDamping:i,prevMaterial:e})}return t.body.linearDamping=Math.max(n,ct.carryObjDamp),t.body.angularDamping=Math.max(i,ct.carryObjAngDamp),t.body.material=_e.materials.held,t.body.wakeUp(),!0}const ln=SS(),Qe=DS(),bu=NS(),Oo=eS(_e,oe),Yn=Uw(_e,oe);let ep=new Set;function np(){ep=new Set(_e.obstacleSpecs.map(s=>s.id))}const se=ES(Os),HS=16777215,ip=7268351,Ta=new Map;let GS=0;const VS=new za(.17,.3,4);function WS(s){let t=Ta.get(s);if(t)return t;const e=new yn({color:ip,toneMapped:!1});return e.depthTest=!1,e.depthWrite=!1,t=new Pt(VS,e),t.rotation.z=Math.PI,t.renderOrder=998,t.frustumCulled=!1,Os.add(t),Ta.set(s,t),t}function XS(s){var e;const t=xr();for(const[n,i]of Ta)Ot.has(n)||(Os.remove(i),i.material.dispose(),Ta.delete(n));for(const n of Ot.values()){if(Ue(n.id))continue;const i=WS(n.id),o=n.rag===t;i.visible=mn&&je.phase==="playing",i.material.color.setHex(o?HS:ip),i.scale.setScalar(o?.8:1.15);const r=((e=n.rag.parts.get("head"))==null?void 0:e.body.position)??n.rag.pelvis.position;i.position.set(r.x,r.y+.62+Math.sin(s*3+n.id)*.05,r.z),i.rotation.y+=.02}}const Jt=TS(),Tn=s=>`/audio/${encodeURIComponent(s)}`;Jt.loadSampleUrls({touch:Tn("mixkit-small-hit-in-a-game-2072.wav"),kick:Tn("mixkit-soccer-ball-kick-2099.wav"),kickHard:Tn("mixkit-hitting-soccer-ball-2112.wav"),ballBounce:Tn("mixkit-ball-bouncing-in-the-ground-2077.wav"),ballHard:Tn("mixkit-hitting-soccer-ball-2112.wav"),ragdoll:Tn("mixkit-cartoon-falling-whistle-395.wav"),trick:Tn("floraphonic-movement-swipe-whoosh-3-186577.mp3"),goal:Tn("mixkit-game-level-completed-2059.wav"),crowd:Tn("mixkit-stadium-joy-shouting-crowd-3022.wav"),countdown:Tn("mixkit-start-match-countdown-1954.wav")});const sp=Tn("the_mountain-game-game-music-508018.mp3"),Gc=[Tn("mfcc-retro-arcade-game-music-297305.mp3"),Tn("djartmusic-best-game-console-301284.mp3"),Tn("hitslab-game-gaming-video-game-music-459876.mp3")],qS=s=>Gc[s]??Gc[Gc.length-1];RS(Jt);Jt.playBgm(sp);const YS=8;let ar=[];function op(s){if(s==null)return!1;const t=we.id;return t!==null&&_i(t)===s}function Tu(s,t,e=1,n){const i=t==null||op(t)?1:.4;Jt.play(s,{vol:e*i,rate:n})}function Ye(s,t,e=1,n){Tu(s,t,e,n),!(!De||we.offline)&&(ar.some(i=>i.n===s)||ar.length<YS&&ar.push({n:s,p:t??void 0,v:e,r:n}))}for(const s of["pointerdown","keydown"])window.addEventListener(s,()=>{Jt.unlock(),KS()},{once:!1,passive:!0});window.audioDebug=()=>Jt.status();let xd=!1;function KS(){xd||(xd=!0,window.setTimeout(()=>{const s=Jt.status(),t=s.bgm;t.error?console.warn("[audio] BGM 재생 실패:",t.error,s):t.src?t.volume===0?console.warn("[audio] BGM 은 재생 중인데 볼륨이 0 이다 - 설정(⚙)에서 BGM 슬라이더를 올려라. localStorage['gr.vol.bgm'] = "+JSON.stringify(localStorage.getItem("gr.vol.bgm")),s):console.log("[audio] BGM ok:",decodeURIComponent(t.src.split("/audio/")[1]??t.src),"vol",t.volume):console.warn("[audio] BGM 이 아직 시작되지 않았다 (want =",t.want,")",s)},1500))}const cr=new Map,Bl=new Map,Hl=new Map,fa=new Map,Vc=.9,jS=ct.rideHeight+.35;function ZS(s,t){const e=be(s);if(!De){$S(s,t,e);return}const n=Math.hypot(s.pelvis.velocity.x,s.pelvis.velocity.z),i=!s.grounded;if(Hl.get(s)&&!i&&(Jt.play("land",{vol:e?.9:.3}),e&&s.pelvis.velocity.y<-4&&de(.2)),Hl.set(s,i),!s.grounded||n<.6||s.state!=="ACTIVE")return;const o=Math.floor(s.swingPhase/Math.PI);Bl.get(s)!==o&&(Bl.set(s,o),Jt.play("step",{vol:(e?.9:.25)*Math.min(1,n/ct.maxSpeed),rate:.9+Math.random()*.2}))}function $S(s,t,e){const n=s.pelvis.position,i=fa.get(s);if(!i){fa.set(s,{x:n.x,y:n.y,z:n.z,dist:0,air:!1});return}const o=Math.hypot(n.x-i.x,n.z-i.z),r=o/Math.max(.001,t),a=n.y>jS;i.air&&!a&&(Jt.play("land",{vol:e?.9:.3}),e&&n.y-i.y<-.08&&de(.2));let c=i.dist+(o>2?0:o);!a&&s.state==="ACTIVE"&&r>.6&&c>=Vc&&(c-=Vc,Jt.play("step",{vol:(e?.9:.25)*Math.min(1,r/ct.maxSpeed),rate:.9+Math.random()*.2})),c>Vc*2&&(c=0),fa.set(s,{x:n.x,y:n.y,z:n.z,dist:c,air:a})}function be(s){const t=we.id;if(t===null)return!1;const e=Ot.get(_i(t));return!!e&&e.rag===s}let _d=0;const rp=IS(oe);function JS(){if(!De)return;const s=_e.map.botSpawns??[];if(s.length===0)return;let t=1/0;for(const e of Ot.values())Ue(e.id)||(t=Math.min(t,e.rag.pelvis.position.z));if(isFinite(t))for(let e=0;e<s.length;e++){const n=-(e+1);if(!Ot.has(n)&&!(t>s[e][1]+QS)){is(n,s[e]),Jt.play("botSpawn"),de(.85),hp("방해꾼 등장!"),se.kick(s[e][0],.05,s[e][1],1),se.kick(s[e][0],.05,s[e][1],.5);for(const[i,o]of[[1,0],[-1,0],[0,1],[0,-1]])se.dash(s[e][0],s[e][1],i,o)}}}const QS=26;function Au(){if(De)for(const s of[...Ot.keys()])Ue(s)&&Oa(s)}function t1(){for(const s of[...Ot.keys()])Ue(s)&&Oa(s)}const $r=[],ap=new Mn;Os.add(ap);function e1(){const s=Oo.activeMarkers();for(;$r.length<s.length;){const t=new Pt(new Co(.62,1,40),new yn({color:16726876,transparent:!0,opacity:.8,depthWrite:!1,toneMapped:!1,side:Wn}));t.rotation.x=-Math.PI/2,ap.add(t),$r.push(t)}for(let t=0;t<$r.length;t++){const e=$r[t],n=s[t];if(!n){e.visible=!1;continue}e.visible=!0;const i=Math.min(1,Math.max(0,n.y/ve.hoverY)),o=n.r*(1.25+i*1.35);e.scale.set(o,o,1),e.position.set(n.x,.05,n.z),e.material.opacity=.35+(1-i)*.5}}const n1=document.getElementById("ball-cue"),i1=document.getElementById("ball-cue-arrow"),s1=document.getElementById("ball-cue-dist"),o1=72;function cp(s,t,e,n,i,o){if(!s||!t||!e)return;if(!n||!i||!mn){s.hidden=!0;return}const r=new K(n.x,n.y,n.z),a=r.clone().sub(Xn.position).dot(Xn.getWorldDirection(new K))<0,c=r.clone().project(Xn);let l=a?-c.x:c.x,h=a?-c.y:c.y;if(!a&&Math.abs(c.x)<=1&&Math.abs(c.y)<=1){s.hidden=!0;return}const f=Math.max(Math.abs(l),Math.abs(h))||1;l/=f,h/=f;const d=window.innerWidth/2-o,m=window.innerHeight/2-o,_=window.innerWidth/2+l*d,p=window.innerHeight/2-h*m;s.hidden=!1,s.style.transform=`translate(${_.toFixed(0)}px, ${p.toFixed(0)}px) translate(-50%, -50%)`;const g=Math.atan2(l,h)*180/Math.PI-90;t.style.transform=`rotate(${g.toFixed(0)}deg)`,e.textContent=`${Math.hypot(n.x-i.position.x,n.z-i.position.z).toFixed(0)}m`}function r1(s){var t;cp(n1,i1,s1,((t=rn())==null?void 0:t.position)??null,s,o1)}const a1=document.getElementById("mate-cue"),c1=document.getElementById("mate-cue-arrow"),l1=document.getElementById("mate-cue-dist"),u1=112;function h1(s){const t=xr();let e=null,n=1/0;if(s&&t)for(const i of Ot.values()){if(Ue(i.id)||i.rag===t)continue;const o=i.rag.pelvis.position,r=Math.hypot(o.x-s.position.x,o.z-s.position.z);r<n&&(n=r,e=o)}cp(a1,c1,l1,e,s,u1)}_e.onMapLoaded(()=>{Oo.rebuild(),Yn.rebuild(),np(),mn&&Au(),mn&&Lu(),Wl=0,jl=0,Zl=0,ao=0,Pa=0,Ia=new Set,Ca=new Set,Ra=new Set,Cs=0,Vl=new Set,ti=null,As=null,Aa=!1});Oo.rebuild();Yn.rebuild();np();function rn(){const s=ai.get(tn);return s?s.body:null}const d1=1.8,f1=5.5;let yd=0,Jr=null;function Md(s){if(!De)return;const t=performance.now();if(t-yd<70)return;let e=0;try{e=Math.abs(s.contact.getImpactVelocityAlongNormal())}catch{return}if(!Number.isFinite(e)||e<d1)return;yd=t;const n=e>=f1;Ye(n?"ballHard":"ballBounce",null,n?.85:Math.min(.75,.28+e*.07))}function Cu(){const s=rn();s!==Jr&&(Jr&&Jr.removeEventListener("collide",Md),Jr=s,s&&s.addEventListener("collide",Md))}_e.onMapLoaded(Cu);Cu();const we=new fS;let De=!1,mn=!1;const fr=new Map,Ru=new Map,Pu=new Map;let wd=!1;function Gl(s){if(!(wd&&De===s)){wd=!0,De=s;for(const t of Vi)t.body.type=s?gt.DYNAMIC:gt.KINEMATIC,t.body.mass=s?t.mass:0,s||(t.body.velocity.setZero(),t.body.angularVelocity.setZero()),t.body.updateMassProperties(),t.body.wakeUp();for(const t of Ot.values())lp(t.rag,s);if(mn&&(s?Au():t1()),!s){for(const t of dn)t.constraint&&wn.removeConstraint(t.constraint);dn.length=0}}}function lp(s,t){for(const e of s.bodies)e.type=t?gt.DYNAMIC:gt.KINEMATIC,t||(e.velocity.setZero(),e.angularVelocity.setZero()),e.updateMassProperties()}we.on(s=>{var t;if(mn)switch(s.type){case"welcome":{is(s.id);for(const e of s.players)is(e);Gl(we.isHost);break}case"host":Gl(we.isHost);break;case"playerJoined":is(s.id),De&&lp(Ot.get(s.id).rag,!0);break;case"playerLeft":Oa(s.id),fr.delete(s.id);break;case"input":if(!De)break;fr.set(s.id,s.input);break;case"restart":De&&je.restart();break;case"nextMap":De&&je.nextMap();break;case"snapshot":{if(De)break;if(s.game&&je.applyRemote(s.game),s.sfx)for(const e of s.sfx)Tu(e.n,e.p,e.v??1,e.r);for(const e of s.ragdolls){is(e.id);const n=[],i=[];for(let o=0;o<e.b.length;o+=7)n.push(new K(e.b[o],e.b[o+1],e.b[o+2])),i.push(new Gi(e.b[o+3],e.b[o+4],e.b[o+5],e.b[o+6]));Ru.set(e.id,{pos:n,quat:i}),(t=Ot.get(e.id))==null||t.rag.setNetState(e.st)}for(const e of s.objects)Pu.set(e.id,{p:new K(e.p[0],e.p[1],e.p[2]),q:new Gi(e.r[0],e.r[1],e.r[2],e.r[3])});break}}});const Wc=ve.voidY;function p1(){const s=wu(),t=Math.max(...s.map(n=>n[1])),e=_e.map.goal.z;return[Math.min(t,e)+3,Math.max(t,e)-1]}const Sd=-.3,Ed=1.5,es=new Map,m1=ct.rideHeight-.25,g1=2.5,v1=.35,Qo=new Map,Qr=new Map;function x1(){const[s,t]=p1(),e=o=>Math.max(s,Math.min(t,o));for(const o of Ot.values()){const r=o.rag.pelvis.position;let a=!1;if(r.y<Sd&&!o.rag.grounded){const l=(es.get(o.id)??0)+Ds;es.set(o.id,l),a=l>Ed}else es.delete(o.id);a&&es.delete(o.id);let c=!1;if(!a&&o.rag.state==="ACTIVE"&&r.y<m1){const l=Qr.get(o.id);if(!l||Math.hypot(r.x-l.x,r.z-l.z)>v1)Qr.set(o.id,{x:r.x,z:r.z}),Qo.set(o.id,0);else{const h=(Qo.get(o.id)??0)+Ds;Qo.set(o.id,h),c=h>g1}}else Qr.delete(o.id),Qo.delete(o.id);c&&(Qr.delete(o.id),Qo.delete(o.id)),!(r.y>Wc&&!a&&!c)&&(Bi(o.rag),o.rag.reset(new y(0,ct.rideHeight+.15,e(r.z+4))),o.input.moveX=0,o.input.moveZ=0,o.input.jump=!1,o.grabPending=!1,o.trickPending=!1,o.stopPending=!1,o.kickPending=!1)}const n=ai.get(tn);let i=!1;if(n){if(n.body.position.y<Sd){const o=(es.get(tn)??0)+Ds;es.set(tn,o),i=o>Ed}else es.delete(tn);i&&es.delete(tn)}if(n&&(n.body.position.y<=Wc||i)){const o=[...Ot.values()],r=o.length?o.reduce((a,c)=>a+c.rag.pelvis.position.z,0)/o.length:t;n.body.position.set(0,1.2,e(r-1.5)),n.body.velocity.setZero(),n.body.angularVelocity.setZero(),n.body.force.setZero(),n.body.torque.setZero(),n.body.wakeUp()}for(const o of Vi)o.grabbable===!1&&(ep.has(o.id)||o.body.position.y>Wc||(o.body.position.set(0,ve.hoverY,o.body.position.z),o.body.velocity.setZero(),o.body.angularVelocity.setZero()))}function _1(){Lu(),As=null,Aa=!1,Ca=new Set,Ra=new Set,Cs=0,Pa=0,Ia=new Set,ga=!1,Kl=!1,_o=0,fo=0,lr=0,sr.clear(),ql.clear(),Yl=-1e9,Qe.reset(),bu.reset();for(const n of Ot.values())Bi(n.rag);for(const n of dn)n.constraint&&wn.removeConstraint(n.constraint);dn.length=0;for(const n of Vi){const i=Yf.get(n.id);i&&(n.body.position.copy(i.p),n.body.quaternion.copy(i.q),n.body.velocity.setZero(),n.body.angularVelocity.setZero(),n.body.force.setZero(),n.body.torque.setZero(),n.body.linearDamping=i.ld,n.body.angularDamping=i.ad,n.body.updateMassProperties(),n.body.wakeUp(),n.mesh.position.set(i.p.x,i.p.y,i.p.z),n.mesh.quaternion.set(i.q.x,i.q.y,i.q.z,i.q.w))}let s=0,t=0;const e=_e.map.botSpawns??[];for(const n of Ot.values()){const i=wu(),[o,r]=Ue(n.id)&&e.length?e[t++%e.length]:i[s++%i.length];n.rag.reset(new y(o,ct.rideHeight+.15,r)),n.input.moveX=0,n.input.moveZ=0,n.input.jump=!1,n.grabPending=!1,n.trickPending=!1,n.kickPending=!1}for(const n of fr.values())n.grab=!1;Ru.clear(),Pu.clear()}const je=xS(_e,{isAuthority:()=>De,resetWorld:_1,requestRestartRemote:()=>we.send({type:"restart"}),requestNextMapRemote:()=>we.send({type:"nextMap"}),isBallCarried:()=>dn.some(s=>s.objectId===tn),onGoal:()=>{Jt.play("goal"),Jt.play("crowd",{vol:.9}),de(.7);const s=_e.map.goal.z;for(let t=0;t<4;t++)se.kick(_e.map.goal.x+(t-1.5)*1.6,.05,s+1.5,1)},onFail:()=>Jt.play("fail")});function _i(s){const t=ba();if(t.length<2)return s;const e=t.indexOf(s);return e<0?s:t[(e+1)%t.length]}const ys=document.getElementById("tut"),y1={WASD:"<b>WASD</b>로 공을 몰아보세요 — 빨리 달릴수록 공이 앞으로 크게 굴러갑니다",F:"<b>F</b>를 눌러 차보세요 — 길게 누르고 있다가 놓으면 더 세게 나갑니다",SHIFT:"<b>Shift</b> — 공은 한쪽으로 띄우고 몸은 반대쪽으로 빠집니다 (상대를 지나칠 때)",E:"<b>E</b>로 공을 안고 뛸 수 있습니다 (느려집니다) · 다시 <b>E</b>로 놓기"};function M1(s){if(!ys)return;if(!s||!mn||!_e.map.tutorial){ys.hidden=!0;return}const t=s.position.z,e=Hf.find(([i])=>Math.abs(t-i)<=Bw);if(!e){ys.hidden=!0;return}const n=y1[e[1]];if(!n){ys.hidden=!0;return}ys.innerHTML!==n&&(ys.innerHTML=n),ys.hidden=!1}const Iu=()=>ba().length;let ti=null;const w1=5,bd=4.5,S1=2.6,E1=["빗나갔다!","그쪽 아니라고","패스 미안"];function b1(){if(!De)return;const s=rn();if(!s||!ti)return;if(performance.now()-ti.t>w1*1e3){Math.hypot(s.position.x-ti.x,s.position.z-ti.z)>=bd&&Iu()>=2&&(Jt.play("drop",{vol:.5,rate:.8}),un("passFail",E1,6)),ti=null;return}if(!(Math.hypot(s.position.x-ti.x,s.position.z-ti.z)<bd))for(const e of Ot.values()){if(Ue(e.id)||e.id===ti.id)continue;const n=e.rag.pelvis.position;if(Math.hypot(s.position.x-n.x,s.position.z-n.z)>S1)continue;const i=Yn.openGate(n.z);ti=null,up(i);return}}function up(s){ke("PASS!",s!==null?"게이트가 열렸다":"좋은 패스"),Jt.play("goal",{vol:.7,rate:1.25}),de(.3);const t=rn();t&&(se.kick(t.position.x,.05,t.position.z,1),se.trail(t.position.x,t.position.y,t.position.z))}let Vl=new Set;function T1(){if(!De)for(const s of Yn.stations){if(s.spec.kind!=="coopgate")continue;s.body.position.y<A1&&!Vl.has(s.spec.z)&&(Vl.add(s.spec.z),up(s.spec.z))}}const A1=.6,C1=25;let As=null,ho=0,Aa=!1;function R1(s){if(ho=Math.max(0,ho-s),!De)return;const t=rn();if(!t){As=null;return}const e=t.position.z;if(As===null||e<As){As=e;return}const n=As+C1;if(e<=n)return;const i=t.velocity.z>1.2;t.position.z=n,t.velocity.z>0&&(t.velocity.z=0),t.wakeUp(),i&&ho<=0&&(ho=1.2,fo=Hn.cool,se.kick(t.position.x,t.position.y,t.position.z,.6),Jt.play("hit",{vol:.5}),Aa||(Aa=!0,ke("여기까지","공은 여기보다 뒤로는 안 굴러간다")))}function P1(){De&&(Iu()>=2||Yn.needsSoloOpen()&&Yn.openGate())}let Wl=0,ta=0;const I1=6.5,L1=2;function D1(s,t){if(ta=Math.max(0,ta-s),!t||!mn||Wl>=L1||ta>0||je.phase!=="playing"||_r())return;const e=t.pelvis.position;for(const n of Ot.values()){if(!Ue(n.id)||n.rag.state!=="ACTIVE")continue;const i=n.rag.pelvis.position;if(!(Math.hypot(i.x-e.x,i.z-e.z)>I1)){ke("Shift","옆으로 재껴서 지나가기 · Q 급정지"),Wl++,ta=6;return}}}const N1=1.15,Td=3.2,Xc=1.5,Ad=1.6,Ms=new Map;function Cd(s,t,e,n){var o;const i=fi(s);if(i.length!==0){for(const r of i){const a=ai.get(r.objectId);a&&a.body.applyImpulse(new y(t*2.6,1.4,e*2.6))}Bi(s),Ye("drop",n,.8,1.05),(be(s)||((o=Ot.get(n))==null?void 0:o.rag)===xr())&&(un("steal",Y1,5)||ke("놓쳤다!","안고 있던 공이 튀어나갔다"))}}const U1=["쿵!","야 앞에 봐","둘 다 넘어짐"],z1=["저리 가!","밀었다","어어어","비켜봐"],F1=["제대로 박았다","퍽!","날아가라"],k1=["뻥!","차버렸다","굴러간다","안녕히 가세요"],O1=["툭","스쳤다","비켜비켜"],B1=["뒤에서 몰래","등 떠밀기","앞으로 고꾸라져라"],H1=["옆구리!","빙그르르","휘청"],G1=["벽에 박았다","퉁!","튕겨 나왔다","한 번 더 굴러"],V1=["원심력!","빙 돌려서","던져버렸다"],W1=["줄다리기!","안 놔","누가 이기나 보자"],X1=["어이쿠","부딪혔다","미안"],q1=["붙잡았다","어딜 가","같이 가자"],Y1=["공 놓쳤다!","내놔","그거 이제 내 거"];function K1(s){if(!De)return;for(const[e,n]of Ms){const i=n-s;i<=0?Ms.delete(e):Ms.set(e,i)}const t=[...Ot.values()];for(let e=0;e<t.length;e++)for(let n=e+1;n<t.length;n++){const i=t[e],o=t[n];if(Ue(i.id)||Ue(o.id)||i.rag.state!=="ACTIVE"||o.rag.state!=="ACTIVE"||Ms.has(i.id)||Ms.has(o.id)||Qe.isImmune(i.rag)||Qe.isImmune(o.rag)||Qe.holding(i.rag)===o.rag||Qe.holding(o.rag)===i.rag)continue;const r=i.rag.pelvis.position,a=o.rag.pelvis.position;let c=a.x-r.x,l=a.z-r.z;const h=Math.hypot(c,l);if(h>N1||h<.001)continue;c/=h,l/=h;const u=i.rag.pelvis.velocity,f=o.rag.pelvis.velocity,d=(u.x-f.x)*c+(u.z-f.z)*l;if(d<Td){if(d>=Xc){const p=(d-Xc)/(Td-Xc);if(Qe.tryBump(i.rag,o.rag,c,l,.4+p*.6)){const g=(r.x+a.x)*.5,M=(r.z+a.z)*.5;Ye("hit",null,.3+p*.25,1.7),se.dash(g,M,c,l),se.dash(g,M,-c,-l),(be(i.rag)||be(o.rag))&&(de(.2+p*.2),p>.5&&!un("nudge",X1,8)&&ke("어이쿠","부딪혀서 휘청였다"))}}continue}i.rag.knockdown(1.1),o.rag.knockdown(1.1),i.rag.pelvis.applyImpulse(new y(-c*34,18,-l*34)),o.rag.pelvis.applyImpulse(new y(c*34,18,l*34)),Ms.set(i.id,Ad),Ms.set(o.id,Ad),Jt.play("hit",{vol:1});const m=(r.x+a.x)*.5,_=(r.z+a.z)*.5;se.dash(m,_,c,l),se.dash(m,_,-c,-l),se.kick(m,.05,_,.5),(be(i.rag)||be(o.rag))&&(de(.9),un("bump",U1,3)||ke("쿵!","둘이 정면으로 부딪혔다"))}}const j1=.9,Z1=5;let Ca=new Set,Cs=0;function Xl(){return _e.map.ballSlots??[]}function $1(s){if(!s||!mn||je.phase!=="playing"||_r())return;const t=s.pelvis.position,e=rn();if(e)for(const n of Xl()){if(Ca.has(n))continue;const i=t.z-n;if(!(i<0||i>Z1)&&!(Math.abs(t.x)>5.4)&&!(e.position.z>n)){Ca.add(n),ke("공만 통과","사람은 옆으로 돌아간다 — 초록 길로");return}}}let Ra=new Set;function J1(s){if(!De)return;const t=rn();if(!t){Cs=0;return}for(const n of Xl()){const i=n-.5;if(!Ra.has(n)){t.position.z<i&&Ra.add(n);continue}if(t.position.z<=i)continue;const o=t.velocity.z>1.2;t.position.z=i,t.velocity.z>0&&(t.velocity.z=0),t.wakeUp(),o&&ho<=0&&(ho=1.2,se.kick(t.position.x,t.position.y,t.position.z,.6),Jt.play("hit",{vol:.5}))}if(!(Math.abs(t.position.x)<5.4&&Xl().some(n=>Math.abs(t.position.z-n)<j1))||Math.hypot(t.velocity.x,t.velocity.z)>.35){Cs=0;return}Cs+=s,!(Cs<1.2)&&(Cs=0,t.velocity.z=-2.4,t.wakeUp())}const Q1=16,tE=3;let tr=0,Pa=0,Ia=new Set;function eE(s,t){if(tr=Math.max(0,tr-s),!t||!mn||Iu()<2||je.phase!=="playing"||_r())return;const e=t.pelvis.position;for(const n of Yn.buttonGates()){const i=e.z-n.z;if(i<0||i>Q1)continue;const o=Yn.onPad(n.z,e.x,e.y,e.z);if(n.open&&!o){if(Ia.has(n.z))continue;Ia.add(n.z),ke("지금이다","친구가 문을 잡고 있다 — 공 몰고 먼저 지나가라"),tr=4;return}if(!n.open&&tr<=0&&Pa<tE){ke("버튼 문","한 명이 발판을 밟으면 열린다 — 나머지가 공을 몰고 지나가라"),Pa++,tr=8;return}}}const Rs=document.getElementById("alert-banner");let pa=0;function hp(s){if(!Rs)return;const t=Rs.querySelector("span");t&&(t.textContent=s),Rs.hidden=!0,Rs.offsetWidth,Rs.hidden=!1,pa=1.1}function nE(s){!Rs||pa<=0||(pa-=s,pa<=0&&(Rs.hidden=!0))}const Ps=document.getElementById("move-toast");let ma=0;function ke(s,t=""){Ps&&(Ps.innerHTML=t?`${s}<small>${t}</small>`:s,Ps.hidden=!0,Ps.offsetWidth,Ps.hidden=!1,ma=.75)}function iE(s){!Ps||ma<=0||(ma-=s,ma<=0&&(Ps.hidden=!0))}const Rd=new Map,ql=new Map;let Yl=-1e9;const sE=1.6;function un(s,t,e){const n=performance.now()/1e3;if(n-Yl<sE||n-(ql.get(s)??-1e9)<e)return!1;const i=(Rd.get(s)??0)%t.length;return Rd.set(s,i+1),ql.set(s,n),Yl=n,ke(t[i]),!0}function xr(){var t;const s=we.id;return s===null?null:((t=Ot.get(_i(s)))==null?void 0:t.rag)??null}const Hn={wildSpeed:5.2,stealSpeed:4.6,mateSpeed:8.5,jumpMul:1.5,jumpAdd:1.4,cool:1,near:2.6,myKickGrace:.5};let qc=0,Yc=0,Kc=0,ga=!1,fo=0,dp=-1e9,Pd=0,lr=0,_o=0;const Id={steal:["뺏겼다!","야 그거 내 공","도둑이야!"],mate:["친구가 찼다!","그쪽 아니야!","누구야 지금"],wild:["뻥—!","공 날아감!","어디가!"],goal:["아까비!","골 코앞에서…","다 왔었는데"],over:["너무 셌다!","패스가 아니라 슛인데","공 어디감"]};function oE(s){fo=Math.max(0,fo-s),_o=Math.max(0,_o-s);const t=rn();if(!t||je.phase!=="playing"){ga=!1;return}const e=t.position.x,n=t.position.y,i=t.position.z;if(!ga){ga=!0,qc=e,Yc=i,Kc=0;return}const o=Math.max(1e-4,s),r=Math.hypot(e-qc,i-Yc)/o,a=Kc;qc=e,Yc=i,Kc=r;const c=performance.now()/1e3,l=xr();if(lr>0&&(lr-=s,lr<=0&&l&&Math.hypot(e-l.pelvis.position.x,i-l.pelvis.position.z)>13&&r>3&&(Jt.play("drop",{vol:.5,rate:.8}),un("over",Id.over,8))),r>60||dn.some(_=>_.objectId===tn)||fo>0||r<a*Hn.jumpMul+Hn.jumpAdd||c-dp<Hn.myKickGrace)return;let h=1/0,u=1/0,f=1/0;for(const _ of Ot.values()){const p=_.rag.pelvis.position,g=Math.hypot(p.x-e,p.z-i);Ue(_.id)?h=Math.min(h,g):_.rag===l?f=Math.min(f,g):u=Math.min(u,g)}let d;if(h<Hn.near){if(r<Hn.stealSpeed)return;d="steal"}else if(u<Hn.near){if(r<Hn.mateSpeed)return;d="mate"}else{if(f<Hn.near&&r<Hn.mateSpeed||r<Hn.wildSpeed)return;d="wild"}const m=Math.abs(i-_e.map.goal.z)<22;m&&d==="wild"&&(d="goal"),fo=Hn.cool,_o=.55,se.kick(e,n,i,1),Jt.play("hit",{vol:.7,rate:d==="steal"?1.35:1.15}),l&&Math.hypot(e-l.pelvis.position.x,i-l.pelvis.position.z)<14&&de(m?.75:.45),un(d,Id[d],d==="goal"?6:d==="steal"?4.5:3.5)}const Ld=-3,sr=new Map;let Kl=!1;const ea={me:["으아아—","안녕히 계세요","발이 미끄러졌다"],mate:["친구가 떨어졌다!","야 어디가","한 명 실종"],bot:["방해꾼도 떨어졌다","잘 가라"],ball:["공이 떨어졌다!","공 어디감"]};function rE(){if(je.phase!=="playing")return;const s=xr();for(const n of Ot.values()){const i=n.rag.pelvis.position,o=sr.get(n.id)??!1,r=i.y<Ld;r!==o&&(sr.set(n.id,r),r?n.rag===s?(Jt.play("fail",{vol:.45,rate:1.6}),de(.4),un("fallMe",ea.me,4)):Ue(n.id)?un("fallBot",ea.bot,10):(Jt.play("drop",{vol:.4,rate:.75}),un("fallMate",ea.mate,4)):i.y>-1&&(se.kick(i.x,.05,i.z,.7),n.rag===s&&Jt.play("pickup",{vol:.7})))}for(const n of[...sr.keys()])Ot.has(n)||sr.delete(n);const t=rn();if(!t)return;const e=t.position.y<Ld;e!==Kl&&(Kl=e,e?(Jt.play("drop",{vol:.6,rate:.7}),un("fallBall",ea.ball,5)):t.position.y>-1&&(se.kick(t.position.x,.05,t.position.z,1.1),_o=.6,Jt.play("pickup",{vol:.8,rate:.85})))}const na=new Map,Dd=new Map;let Nd="playing";const ia=new Set;function aE(){for(const t of Ot.values()){const e=na.get(t.id);na.set(t.id,t.rag.state),!(e===void 0||e!=="ACTIVE"||t.rag.state==="ACTIVE")&&(Tu("ragdoll",t.id,.9,1),op(t.id)&&de(.5))}for(const t of[...na.keys()])Ot.has(t)||na.delete(t);for(const t of Yn.buttonGates()){const e=Dd.get(t.z);Dd.set(t.z,t.open),!(e===void 0||e===t.open)&&Jt.play(t.open?"pickup":"drop",{vol:.55,rate:.65})}if(De)return;const s=je.phase;s!==Nd&&(s==="success"?(Jt.play("goal"),Jt.play("crowd",{vol:.9}),de(.7)):s==="fail"&&Jt.play("fail"),Nd=s);for(const t of Ot.values())!Ue(t.id)||ia.has(t.id)||(ia.add(t.id),Jt.play("botSpawn"),de(.85),hp("방해꾼 등장!"));for(const t of[...ia])Ot.has(t)||ia.delete(t)}const cE=3.2,lE=["아슬아슬!","닿을 뻔했다","지금 뭐 지나갔지"];function fp(s,t,e){for(const n of Yn.stations){const i=n.body;if(!(i.position.y<-.2)&&Math.hypot(i.position.x-s,i.position.z-t)<e)return!0}return!1}const Ud=2;let jl=0,Zl=0,ao=0;function uE(s,t){if(ao=Math.max(0,ao-s),!t||!mn||ao>0||je.phase!=="playing"||_r())return;const e=rn();if(!e)return;const n=t.pelvis.position,i=Math.hypot(e.position.x-n.x,e.position.z-n.z);if(jl<Ud&&i>4&&i<12){ke("F — 러시","놓친 공으로 달려든다 (러시 중엔 못 꺾는다)"),jl++,ao=9;return}if(Zl<Ud&&i<3){const o=e.position.x,r=e.position.z;fp(o,r-4.5,3.4)&&n.z>r&&(ke("Q — 급정지","공을 세우고 지나갈 때를 기다린다"),Zl++,ao=12)}}const er=document.getElementById("countdown");let po=0,$l=-1;const _r=()=>po>0;function Lu(){po=3.2,$l=-1}function hE(s){if(!er)return;if(po<=0){er.hidden=!0;return}po-=s,er.hidden=!1;const t=Math.ceil(po-.2);if(t!==$l){$l=t;const e=_e.map,n=`<div class="cd-stage">STAGE ${_e.mapIndex+1} / ${_e.mapCount} · ${e.name.replace(/^\d+\.\s*/,"")}<em>${e.blurb}</em></div>`;er.innerHTML=`${n}<span>${t>0?t:"GO!"}</span>`,t>=3?Jt.play("countdown"):t<=0&&(Jt.play("start"),Jt.playBgm(qS(_e.mapIndex)))}po<=0&&(er.hidden=!0)}let zd="playing";function dE(){if(!mn)return;const s=je.phase;s!==zd&&(zd=s,s!=="playing"&&Jt.playBgm(sp))}let jc=!1;const yo=document.getElementById("kick-gauge"),Fd=yo==null?void 0:yo.querySelector("i");function fE(){if(!yo||!Fd)return;const s=Jf();if(s<=0){yo.hidden=!0,jc=!1;return}yo.hidden=!1,s>=1&&!jc&&(jc=!0,Jt.play("kickCharge")),Fd.style.width=`${(s*100).toFixed(0)}%`}const kd=document.getElementById("hud"),Od=document.getElementById("help-swap");let La=!1,pp=0,Zc=0,sa=0;function Du(){var n;if(kd.hidden=!La||!mn,!La)return;const s=we.id,t=s!==null?_i(s):null,e=t!==null?(n=Ot.get(t))==null?void 0:n.rag:void 0;Od&&(Od.hidden=t===null||t===s),kd.innerHTML=[`FPS: ${pp}   Ping: ${we.ping}ms`,`나: P${s??"-"}${we.isHost?" (HOST)":""}   접속: ${ba().length}   봇: ${Ot.size-ba().length}`,`조종 중인 캐릭터: P${t??"-"}${t===s?" (자기 자신)":""}`,`상태: ${(e==null?void 0:e.state)??"-"}   접지: ${e!=null&&e.grounded?"O":"X"}`,`WS: ${we.statusText}   Grab: ${dn.length}   Auth: ${De?"LOCAL":"REMOTE"}`,"[DEBUG] R:넘어짐 T:리셋 Y:충격 U:점프"].join("<br/>")}let $c=0;const pE=30,$e=s=>Math.round(s*1e3)/1e3;function mE(){if(De){const s=[];for(const n of Ot.values()){const i=[];for(const o of n.rag.bodies)i.push($e(o.position.x),$e(o.position.y),$e(o.position.z),$e(o.quaternion.x),$e(o.quaternion.y),$e(o.quaternion.z),$e(o.quaternion.w));s.push({id:n.id,b:i,st:n.rag.state})}const t=Vi.map(n=>({id:n.id,p:[$e(n.body.position.x),$e(n.body.position.y),$e(n.body.position.z)],r:[$e(n.body.quaternion.x),$e(n.body.quaternion.y),$e(n.body.quaternion.z),$e(n.body.quaternion.w)]})),e=ar;ar=[],we.send({type:"snapshot",ragdolls:s,objects:t,game:je.snapshot(),...e.length?{sfx:e}:{}})}else{const s=je.phase==="playing",{mx:t,mz:e}=s?Eu():{mx:0,mz:0},{ax:n,az:i}=tp(),o={mx:$e(t),mz:$e(e),ax:$e(n),az:$e(i),jump:s&&!!Le.Space,grab:s&&Po,trick:s&&Io,stop:s&&Lo,kick:s&&Do,kp:$e(No)};we.send({type:"input",input:o}),Po=!1,Io=!1,Lo=!1,Do=!1,No=0}}const Ds=1/60,Bd=5,gE=new O_;let ro=0,Hd=5;function vE(s){const t=we.id,e=je.phase==="playing"&&!_r(),{mx:n,mz:i}=e?Eu():{mx:0,mz:0},{ax:o,az:r}=tp(),a={mx:n,mz:i,ax:o,az:r,jump:e&&!!Le.Space,grab:e&&Po,trick:e&&Io,stop:e&&Lo,kick:e&&Do,kp:No};if(De&&(Po=!1,Io=!1,Lo=!1,Do=!1,No=0),De&&t!==null){for(const u of Ot.values())u.input.moveX=0,u.input.moveZ=0,u.input.jump=!1,u.input.aimX=0,u.input.aimZ=0;const c=(u,f)=>{const d=_i(u),m=Ot.get(d);!m||!e||(m.input.moveX=f.mx,m.input.moveZ=f.mz,m.input.jump=f.jump,m.input.aimX=f.ax??0,m.input.aimZ=f.az??0,f.grab&&(m.grabPending=!0),f.trick&&(m.trickPending=!0),f.stop&&(m.stopPending=!0),f.kick&&(m.kickPending=!0,m.kickPower=f.kp??0))};c(t,a);for(const[u,f]of fr)c(u,f);for(const u of fr.values())u.grab=!1,u.trick=!1,u.stop=!1,u.kick=!1,u.kp=0;const l=[...Ot.values()].filter(u=>!Ue(u.id)&&fi(u.rag).some(f=>f.objectId===tn)).map(u=>u.rag);for(const u of Qe.tick(s,wn))Ye("hit",null,.55+u.power*.45,.62),se.kick(u.x,u.y,u.z,u.power),de(be(u.rag)?.6+u.power*.5:.2+u.power*.2),un("rebound",G1,4)||ke("퉁!","날아가다 부딪혔다");const h=[...Ot.values()].map(u=>u.rag);for(const u of Ot.values()){const f=u.input.aimX??0,d=u.input.aimZ??0;if(u.grabPending){u.grabPending=!1;const w=Qe.tryPush(u.rag,f,d,h);if(w){const I=w.power,A=w.side,x=w.target.pelvis.position,v=(A==="back"?1.18:A==="side"?1.56:1.42)-I*.22;if(Ye("hit",u.id,.45+I*.5,v),se.touch(x.x,x.y-.1,x.z,.5+I*.5),se.dash(x.x,x.z,w.dirX,w.dirZ),I>.8&&se.kick(x.x,x.y-.1,x.z,.5),be(u.rag)){de((A==="back"?.2:.16)+I*.26);const S=I<.55?O1:A==="back"?B1:A==="side"?H1:I>.8?F1:z1,R=I<.55?"살짝 스쳤다":A==="back"?"등을 떠밀었다":A==="side"?"옆에서 밀어 돌렸다":"정통으로 박았다";un("scuffle",S,I<.55?7:5)||ke("밀치기",R)}be(w.target)&&de(.3+I*.4);const P=A==="back"?.5:A==="side"?.62:.78,b=fi(w.target).some(S=>S.objectId===tn);I>P&&(Cd(w.target,w.dirX,w.dirZ,u.id),b&&(se.kick(x.x,x.y,x.z,.9),(be(u.rag)||be(w.target))&&de(.55)))}else{const I=fi(u.rag).length>0;I&&Ye("drop",u.id);const A=vd(u.rag);!I&&A&&Ye("pickup",u.id);const x=rn();!I&&!A&&x&&ln.requestPickup(u.rag,x)}}if(u.stopPending){const w=Qe.toggleGrab(u.rag,f,d,h);if(w){u.stopPending=!1;const I=u.rag.pelvis.position;if(w==="grabbed"){Ye("pickup",u.id,.85,.8);const A=Qe.holding(u.rag);A&&se.touch(A.pelvis.position.x,A.pelvis.position.y,A.pelvis.position.z,.5),be(u.rag)&&(de(.2),un("scuffle",q1,6)||ke("붙잡기","Q로 놓는다 · 반대로 걸으면 뿌리친다")),A&&be(A)&&(de(.3),ke("붙잡혔다!","반대로 걸으면 뿌리칠 수 있다"))}else Ye("drop",u.id,.8,1.1),se.dash(I.x,I.z,f,d)}}if(u.kickPending){const w=rn(),I=u.rag.pelvis.position;if(!(!!w&&Math.hypot(w.position.x-I.x,w.position.z-I.z)<=dt.kickRange)){const x=Qe.tryKick(u.rag,f,d,h);if(x){u.kickPending=!1,u.kickPower=0;const v=x.target.pelvis.position;Ye("hit",u.id,1,.78),se.kick(v.x,v.y,v.z,1),se.kick(I.x,.4,I.z,.7),se.dash(v.x,v.z,x.dirX,x.dirZ),be(u.rag)&&(de(.6),un("scuffle",k1,5)||ke("발차기","제대로 걷어찼다")),be(x.target)&&de(1),Cd(x.target,x.dirX,x.dirZ,u.id)}}}const m=fi(u.rag),_=[],p=[];for(const w of m){const I=ai.get(w.objectId);if(!I)continue;_.push(I.body),w.constraint||(w.pivotLocal=Ba(I,w.hand));const A=I.body.quaternion.vmult(w.pivotLocal);p.push({hand:w.hand,target:I.body.position.vadd(A),targetVel:I.body.velocity.vadd(I.body.angularVelocity.cross(A))})}if(u.rag.setHeld(_,p),Ue(u.id)){const w=rn();if(w){const I=rp.update(u.rag,w,s,{carriers:l,humans:[...Ot.values()].filter(A=>!Ue(A.id)).map(A=>A.rag),goalZ:_e.map.goal.z,role:PS(u.id)});u.input.moveX=I.input.moveX,u.input.moveZ=I.input.moveZ,u.input.jump=!1;for(const A of I.brokeCarry){const x=[...Ot.values()].find(v=>v.rag===A);if(x){for(const v of fi(x.rag)){const P=ai.get(v.objectId);if(P){const b=P.body.position.x-u.rag.pelvis.position.x,S=P.body.position.z-u.rag.pelvis.position.z,R=Math.hypot(b,S)||1;P.body.applyImpulse(new y(b/R*ae.bumpImpulse,1.4,S/R*ae.bumpImpulse))}}Bi(x.rag)}}for(const A of I.tackled){A.knockdown(ae.tackleKnockTime);const x=[...Ot.values()].find(P=>P.rag===A);Ye("ballHard",(x==null?void 0:x.id)??null,.9,.8);const v=A.pelvis.position;se.dash(v.x,v.z,v.x-u.rag.pelvis.position.x,v.z-u.rag.pelvis.position.z),se.kick(v.x,.05,v.z,.6),(be(A)||be(u.rag))&&de(.7)}}else u.input.moveX=0,u.input.moveZ=0}const g=ln.dashDir(u.rag);g&&(u.input.moveX=g.x,u.input.moveZ=g.z);const M=ln.rushDir(u.rag);if(M){const w=dt.rushSteer,I=M.x*(1-w)+u.input.moveX*w,A=M.z*(1-w)+u.input.moveZ*w,x=Math.hypot(I,A)||1;u.input.moveX=I/x,u.input.moveZ=A/x}const E=Qe.shoveDir(u.rag);E&&(u.input.moveX=E.x,u.input.moveZ=E.z);const T=Qe.heldBy(u.rag);if(T){const w=T.pelvis.position,I=u.rag.pelvis.position,A=w.x-I.x,x=w.z-I.z,v=Math.hypot(A,x);if(v>ft.GRAB_AHEAD){const P=A/v,b=x/v;let S=P,R=b;const L=Math.hypot(u.input.moveX,u.input.moveZ);if(L>.01){const F=(u.input.moveX*P+u.input.moveZ*b)/L;if(F<0){let H=(u.input.moveX*-b+u.input.moveZ*P)/L;Math.abs(H)<.001&&(H=1);const V=ft.GRAB_RESIST*-F*Math.sign(H),$=Math.cos(V),N=Math.sin(V);S=P*$-b*N,R=P*N+b*$}}const G=S*ft.GRAB_DRAG+u.input.moveX*(1-ft.GRAB_DRAG),k=R*ft.GRAB_DRAG+u.input.moveZ*(1-ft.GRAB_DRAG),B=Math.hypot(G,k)||1;u.input.moveX=G/B,u.input.moveZ=k/B}}u.rag.control(s,u.input,wn);const U=bu.update(u.rag,s);U&&U.kind==="land"&&U.power>.5?se.kick(U.x,.04,U.z,U.power*.6):U&&U.kind==="stop"&&U.power>.4&&se.dash(U.x,U.z,U.dirX,U.dirZ);const D=rn();if(ln.tick(u.rag,s),D&&!Ue(u.id)){ln.scooping(u.rag)&&fi(u.rag).length===0&&(ln.scoopStep(u.rag,D),vd(u.rag));const w=fi(u.rag).some(A=>A.objectId===tn);if(u.stopPending&&(u.stopPending=!1,ln.tryStopTurn(u.rag,D,w))){const A=ln.takeTrick(u.rag);A&&se.dash(A.x,A.z,A.dodgeX,A.dodgeZ),Ye("trick",u.id,.9,.72),be(u.rag)&&(de(.22),ke("스톱턴","급정지 — 달려오는 상대가 지나친다"))}if(u.trickPending&&(u.trickPending=!1,ln.tryTrick(u.rag,D,w))){const A=ln.takeTrick(u.rag);if(A&&(se.dash(A.x,A.z,A.dodgeX,A.dodgeZ),cr.set(u.rag,dt.trickLockout+.25),Ye("trick",u.id),be(u.rag))){const x=u.rag.pelvis.position;fp(x.x,x.z,cE)?(de(.45),un("nearmiss",lE,4)||ke("재끼기","공은 한쪽 · 몸은 반대쪽")):(de(.3),ke("재끼기","공은 한쪽 · 몸은 반대쪽"))}}if(u.kickPending){u.kickPending=!1;const A=ln.tryKick(u.rag,D,w,u.kickPower);if(u.kickPower=0,A)ti={id:u.id,x:A.x,z:A.z,t:performance.now()},se.kick(A.x,A.y,A.z,A.power),Ye("kick",u.id,.55+A.power*.45,1.15-A.power*.25),be(u.rag)&&de(.25+A.power*.35);else{const x=ln.tryRush(u.rag,D,w);if(x){const v=u.rag.pelvis.position;se.dash(v.x,v.z,x.x,x.z),Ye("step",u.id,1,.55),be(u.rag)&&de(.18)}}}ln.dribble(u.rag,D,s,w);const I=ln.takeTouch(u.rag);I&&(se.touch(I.x,I.y,I.z,I.strength),Ye("touch",u.id,.4+I.strength*.6)),w&&ln.carryPenalty(u.rag)}else u.trickPending=!1,u.stopPending=!1,u.kickPending=!1}{const u=new Map,f=new Set;for(const d of dn){if(d.ramp+=s,d.constraint){const g=Math.min(1,d.ramp/ct.carryRamp);for(const M of d.constraint.equations)M.maxForce=d.holdForce*g,M.minForce=-d.holdForce*g}const m=ai.get(d.objectId);if(!m)continue;const _=`${d.objectId}:${d.ownerRag.pelvis.id}`;if(f.has(_))continue;f.add(_);const p=u.get(m.body)??[];p.push({rag:d.ownerRag,ramp:d.ramp}),u.set(m.body,p)}for(const[d,m]of u)BS(d,m.length);for(const[d,m]of u)hS(wn,d,m)}if(e){const u=[...Ot.values()].map(m=>m.rag),f=Yn.update(s,u,rn()??void 0);JS(),b1(),P1(),R1(s),J1(s);for(const m of Qe.updateHolds(s)){const _=[...Ot.values()].find(E=>E.rag===m.holder),p=_?_.id:null,g=m.target.pelvis.position,M=be(m.holder)||be(m.target);m.kind==="dropped"?(Ye("drop",p,.6,1.2),M&&de(.15)):m.kind==="whip"?(Ye("trick",p,.6+m.power*.4,.6),se.dash(g.x,g.z,m.target.pelvis.velocity.x,m.target.pelvis.velocity.z),m.down?(Ye("hit",p,.9,.8),se.kick(g.x,g.y,g.z,.9),de(be(m.target)?.9:.4),un("scuffle",V1,5)||ke("던지기","잡고 홱 돌리면 날아간다")):M&&de(.25+m.power*.3)):(Ye("pickup",p,.7,.6),M&&(de(.2),un("scuffle",W1,6)||ke("줄다리기!","서로 잡았다 — 먼저 방향을 바꾸는 쪽이 이긴다")))}K1(s);const d=[...Oo.update(s,u),...f];for(const m of d){if(Jt.play("hit",{vol:be(m.rag)?1:.4}),be(m.rag)&&de(.85),be(m.rag)){const p=_e.map.goal.z,g=rn();Math.abs(m.rag.pelvis.position.z-p)<20&&g&&Math.abs(g.position.z-p)<20&&(de(1.3),ke("아까비!","골 코앞에서 놓쳤다"))}const _=fi(m.rag);if(_.length>0){for(const p of _){const g=ai.get(p.objectId);g&&g.body.applyImpulse(new y(m.dirX*2.2,1.2,m.dirZ*2.2))}Bi(m.rag)}}}wn.step(s);for(const u of Ot.values())u.rag.guard()&&Bi(u.rag);e&&x1()}else{for(const[c,l]of Ru){const h=Ot.get(c);h&&h.rag.bodies.forEach((u,f)=>{if(f>=l.pos.length)return;const d=new K(u.position.x,u.position.y,u.position.z);d.lerp(l.pos[f],.4),u.position.set(d.x,d.y,d.z);const m=new Gi(u.quaternion.x,u.quaternion.y,u.quaternion.z,u.quaternion.w);m.slerp(l.quat[f],.4),u.quaternion.set(m.x,m.y,m.z,m.w)})}for(const c of Vi){const l=Pu.get(c.id);if(!l)continue;const h=new K(c.body.position.x,c.body.position.y,c.body.position.z);h.lerp(l.p,.4),c.body.position.set(h.x,h.y,h.z);const u=new Gi(c.body.quaternion.x,c.body.quaternion.y,c.body.quaternion.z,c.body.quaternion.w);u.slerp(l.q,.4),c.body.quaternion.set(u.x,u.y,u.z,u.w)}wn.step(s)}je.update(s)}function mp(){requestAnimationFrame(mp);const s=Math.min(gE.getDelta(),.25),t=we.id;{const i=t!==null&&je.phase==="playing"?Ot.get(_i(t)):void 0;i&&(Gn.R&&i.rag.knockdown(),Gn.T&&i.rag.reset(new y(i.rag.pelvis.position.x,ct.rideHeight+.3,i.rag.pelvis.position.z)),Gn.Y&&i.rag.torso.applyImpulse(new y(60,25,0)),Gn.U&&i.rag.pelvis.applyImpulse(new y(0,ct.jumpImpulse,0))),Gn.R=Gn.T=Gn.Y=Gn.U=!1}ro+=s,Hd>0&&(ro=Math.min(ro,Ds),Hd--);let e=0;for(;ro>=Ds&&e<Bd;)vE(Ds),ro-=Ds,e++;e>=Bd&&(ro=0);for(const i of Ot.values())i.rag.sync();for(const i of Vi)i.mesh.position.set(i.body.position.x,i.body.position.y,i.body.position.z),i.mesh.quaternion.set(i.body.quaternion.x,i.body.quaternion.y,i.body.quaternion.z,i.body.quaternion.w);const n=t!==null?Ot.get(_i(t)):void 0;n?OS(n.rag.pelvis.position,n.rag.pelvis.velocity,s):FS(s);{const i=n?n.rag.pelvis.position:null,o=i?i.x:0,r=i?i.z:0;_e.sun.position.set(o+17,19,r+11),_e.sun.target.position.set(o,0,r),_e.sun.target.updateMatrixWorld()}e1();{const i=rn();let o=_o>0;for(const[r,a]of cr){const c=a-s;if(c<=0){cr.delete(r);continue}cr.set(r,c),o=!0}o&&i&&_d%3===0&&se.trail(i.position.x,i.position.y,i.position.z),_d++}for(const i of Ot.values())ZS(i.rag,s);oE(s),rE(),mn&&aE(),se.update(s),XS(GS+=s),r1(n?n.rag.pelvis:null),h1(n?n.rag.pelvis:null),M1(n?n.rag.pelvis:null),fE(),hE(s),iE(s),nE(s),D1(s,n?n.rag:null),uE(s,n?n.rag:null),eE(s,n?n.rag:null),$1(n?n.rag:null),T1(),je.render(s),dE(),Ea.render(Os,Xn),$c+=s,$c>=1/pE&&($c=0,mE()),Zc++,sa+=s,sa>=.5&&(pp=Math.round(Zc/sa),Zc=0,sa=0,Du())}mp();function xE(){if(mn)return;mn=!0;const s=we.id;if(s!==null){for(const t of[s,...we.peers].sort((e,n)=>e-n))is(t);Gl(we.isHost),Au(),Cu(),Lu();for(const t of["goalbar","help"])document.getElementById(t).hidden=!1;Du()}}gS(we,{onStart:()=>xE()});window.__dbg={get yaw(){return ii},set yaw(s){ii=s},get pitch(){return mi},set pitch(s){mi=s},get camera(){return Xn.position.toArray()},look(s,t){const e=qf({yaw:ii,pitch:mi},s,t);return ii=e.yaw,mi=e.pitch,{yaw:ii,pitch:mi}},ballConst:dt,audio:()=>Jt.status(),move:Eu,keys:Le,physics:wn,world:_e,net:we,inGame:()=>mn,grabs:()=>dn.map(s=>{const t=ai.get(s.objectId),e=t?t.body.position.vadd(t.body.quaternion.vmult(s.pivotLocal)):null;return{objectId:s.objectId,constrained:!!s.constraint,ramp:s.ramp,hand:s.hand.position.toArray(),target:e?e.toArray():null,gap:e?s.hand.position.distanceTo(e):null}}),players:()=>[...Ot.values()].map(s=>({id:s.id,pelvis:s.rag.pelvis.position.toArray(),state:s.rag.state,tilt:s.rag.torso.quaternion.vmult(new y(0,1,0)).y,spin:s.rag.torso.angularVelocity.length(),grounded:s.rag.grounded,group:s.rag.pelvis.collisionFilterGroup,mask:s.rag.pelvis.collisionFilterMask})),objects:()=>Vi.map(s=>({id:s.id,mass:s.body.mass,type:s.body.type,p:s.body.position.toArray(),group:s.body.collisionFilterGroup,mask:s.body.collisionFilterMask})),obj:s=>ai.get(s).body.position.toArray(),spawn:s=>(is(s),[...Ot.keys()]),outfit:jf,controlled:()=>we.id!==null?_i(we.id):null,authority:()=>De,phase:()=>je.phase,pressE:()=>{Po=!0},pressTrick:()=>{Io=!0},pressKick:()=>{Do=!0},pressQ:()=>{Lo=!0},scuffle:()=>({holds:Qe.pairs().map(s=>{const t=[...Ot.values()].find(n=>n.rag===s.holder),e=[...Ot.values()].find(n=>n.rag===s.target);return{holder:t?t.id:null,target:e?e.id:null}}),shoved:[...Ot.values()].filter(s=>Qe.shoveDir(s.rag)!==null).map(s=>s.id),immune:[...Ot.values()].filter(s=>Qe.isImmune(s.rag)).map(s=>s.id),tug:Qe.tugPairs().map(s=>{var t;return(t=[...Ot.values()].find(e=>e.rag===s))==null?void 0:t.id}).filter(s=>s!==void 0)}),setBots:s=>{for(const e of[...Ot.keys()])Ue(e)&&Oa(e);const t=_e.map.botSpawns??[];for(let e=0;e<Math.min(s,t.length);e++)is(-(e+1),t[e]);return[...Ot.keys()].filter(Ue)},bots:()=>[...Ot.values()].filter(s=>Ue(s.id)).map(s=>({id:s.id,pos:s.rag.pelvis.position.toArray().map(t=>+t.toFixed(2)),state:s.rag.state,input:[+s.input.moveX.toFixed(2),+s.input.moveZ.toFixed(2)]})),hazards:()=>Oo.stations.map(s=>({id:s.spec.id,phase:s.phase,timer:+s.timer.toFixed(2),pos:s.body.position.toArray().map(t=>+t.toFixed(2))})),ball:()=>{const s=rn();if(!s)return null;const t=we.id!==null?Ot.get(_i(we.id)):void 0;return{p:s.position.toArray(),v:s.velocity.toArray(),w:s.angularVelocity.toArray(),speed:Math.hypot(s.velocity.x,s.velocity.z),spin:s.angularVelocity.length(),heldBy:dn.filter(e=>e.objectId===tn).length,distToPlayer:t?Math.hypot(s.position.x-t.rag.pelvis.position.x,s.position.z-t.rag.pelvis.position.z):null,trickCooldown:t?ln.cooldownOf(t.rag):null}},teleport(s,t){const e=we.id;if(e===null)return null;const n=Ot.get(_i(e));return n?(Bi(n.rag),n.rag.reset(new y(s,ct.rideHeight+.15,t)),n.rag.pelvis.position.toArray()):null}};
