var kf=Object.defineProperty;var Hf=(s,t,e)=>t in s?kf(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var In=(s,t,e)=>Hf(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ol="169",Gf=0,_u=1,Vf=2,md=1,gd=2,Ti=3,es=0,en=1,zn=2,Zi=0,ro=1,yu=2,Mu=3,Su=4,Wf=5,xs=100,qf=101,Xf=102,Yf=103,jf=104,$f=200,Kf=201,Zf=202,Jf=203,zc=204,Oc=205,Qf=206,tp=207,ep=208,np=209,ip=210,sp=211,op=212,rp=213,ap=214,Bc=0,kc=1,Hc=2,ho=3,Gc=4,Vc=5,Wc=6,qc=7,vd=0,cp=1,lp=2,Ji=0,up=1,hp=2,dp=3,fp=4,pp=5,mp=6,xd=7,_d=300,fo=301,po=302,Xc=303,Yc=304,Ma=306,ra=1e3,bs=1001,jc=1002,Bn=1003,gp=1004,ur=1005,jn=1006,Da=1007,Ts=1008,Di=1009,yd=1010,Md=1011,tr=1012,Bl=1013,Cs=1014,Ri=1015,sr=1016,kl=1017,Hl=1018,mo=1020,Sd=35902,wd=1021,Ed=1022,Zn=1023,bd=1024,Td=1025,ao=1026,go=1027,Ad=1028,Gl=1029,Cd=1030,Vl=1031,Wl=1033,Yr=33776,jr=33777,$r=33778,Kr=33779,$c=35840,Kc=35841,Zc=35842,Jc=35843,Qc=36196,tl=37492,el=37496,nl=37808,il=37809,sl=37810,ol=37811,rl=37812,al=37813,cl=37814,ll=37815,ul=37816,hl=37817,dl=37818,fl=37819,pl=37820,ml=37821,Zr=36492,gl=36494,vl=36495,Rd=36283,xl=36284,_l=36285,yl=36286,vp=3200,xp=3201,Pd=0,_p=1,$i="",Fn="srgb",os="srgb-linear",ql="display-p3",Sa="display-p3-linear",aa="linear",Ee="srgb",ca="rec709",la="p3",Us=7680,wu=519,yp=512,Mp=513,Sp=514,Id=515,wp=516,Ep=517,bp=518,Tp=519,Eu=35044,bu="300 es",Pi=2e3,ua=2001;class To{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const o=i.indexOf(e);o!==-1&&i.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let o=0,r=i.length;o<r;o++)i[o].call(this,t);t.target=null}}}const on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Na=Math.PI/180,Ml=180/Math.PI;function or(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(on[s&255]+on[s>>8&255]+on[s>>16&255]+on[s>>24&255]+"-"+on[t&255]+on[t>>8&255]+"-"+on[t>>16&15|64]+on[t>>24&255]+"-"+on[e&63|128]+on[e>>8&255]+"-"+on[e>>16&255]+on[e>>24&255]+on[n&255]+on[n>>8&255]+on[n>>16&255]+on[n>>24&255]).toLowerCase()}function Qe(s,t,e){return Math.max(t,Math.min(e,s))}function Ap(s,t){return(s%t+t)%t}function Ua(s,t,e){return(1-e)*s+e*t}function Ro(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function gn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class Lt{constructor(t=0,e=0){Lt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Qe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*n-r*i+t.x,this.y=o*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qt{constructor(t,e,n,i,o,r,a,c,l){Qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,o,r,a,c,l)}set(t,e,n,i,o,r,a,c,l){const u=this.elements;return u[0]=t,u[1]=i,u[2]=a,u[3]=e,u[4]=o,u[5]=c,u[6]=n,u[7]=r,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,o=this.elements,r=n[0],a=n[3],c=n[6],l=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],y=i[0],p=i[3],m=i[6],x=i[1],v=i[4],M=i[7],T=i[2],b=i[5],E=i[8];return o[0]=r*y+a*x+c*T,o[3]=r*p+a*v+c*b,o[6]=r*m+a*M+c*E,o[1]=l*y+u*x+f*T,o[4]=l*p+u*v+f*b,o[7]=l*m+u*M+f*E,o[2]=h*y+d*x+g*T,o[5]=h*p+d*v+g*b,o[8]=h*m+d*M+g*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*r*u-e*a*l-n*o*u+n*a*c+i*o*l-i*r*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=u*r-a*l,h=a*c-u*o,d=l*o-r*c,g=e*f+n*h+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return t[0]=f*y,t[1]=(i*l-u*n)*y,t[2]=(a*n-i*r)*y,t[3]=h*y,t[4]=(u*e-i*c)*y,t[5]=(i*o-a*e)*y,t[6]=d*y,t[7]=(n*c-l*e)*y,t[8]=(r*e-n*o)*y,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,o,r,a){const c=Math.cos(o),l=Math.sin(o);return this.set(n*c,n*l,-n*(c*r+l*a)+r+t,-i*l,i*c,-i*(-l*r+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Fa.makeScale(t,e)),this}rotate(t){return this.premultiply(Fa.makeRotation(-t)),this}translate(t,e){return this.premultiply(Fa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Fa=new Qt;function Ld(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function ha(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Cp(){const s=ha("canvas");return s.style.display="block",s}const Tu={};function Jr(s){s in Tu||(Tu[s]=!0,console.warn(s))}function Rp(s,t,e){return new Promise(function(n,i){function o(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:n()}}setTimeout(o,e)})}function Pp(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Ip(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Au=new Qt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Cu=new Qt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Po={[os]:{transfer:aa,primaries:ca,luminanceCoefficients:[.2126,.7152,.0722],toReference:s=>s,fromReference:s=>s},[Fn]:{transfer:Ee,primaries:ca,luminanceCoefficients:[.2126,.7152,.0722],toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Sa]:{transfer:aa,primaries:la,luminanceCoefficients:[.2289,.6917,.0793],toReference:s=>s.applyMatrix3(Cu),fromReference:s=>s.applyMatrix3(Au)},[ql]:{transfer:Ee,primaries:la,luminanceCoefficients:[.2289,.6917,.0793],toReference:s=>s.convertSRGBToLinear().applyMatrix3(Cu),fromReference:s=>s.applyMatrix3(Au).convertLinearToSRGB()}},Lp=new Set([os,Sa]),de={enabled:!0,_workingColorSpace:os,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Lp.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=Po[t].toReference,i=Po[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return Po[s].primaries},getTransfer:function(s){return s===$i?aa:Po[s].transfer},getLuminanceCoefficients:function(s,t=this._workingColorSpace){return s.fromArray(Po[t].luminanceCoefficients)}};function co(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function za(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Fs;class Dp{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Fs===void 0&&(Fs=ha("canvas")),Fs.width=t.width,Fs.height=t.height;const n=Fs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Fs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ha("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),o=i.data;for(let r=0;r<o.length;r++)o[r]=co(o[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(co(e[n]/255)*255):e[n]=co(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Np=0;class Dd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=or(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let o;if(Array.isArray(i)){o=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?o.push(Oa(i[r].image)):o.push(Oa(i[r]))}else o=Oa(i);n.url=o}return e||(t.images[this.uuid]=n),n}}function Oa(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Dp.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Up=0;class mn extends To{constructor(t=mn.DEFAULT_IMAGE,e=mn.DEFAULT_MAPPING,n=bs,i=bs,o=jn,r=Ts,a=Zn,c=Di,l=mn.DEFAULT_ANISOTROPY,u=$i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Up++}),this.uuid=or(),this.name="",this.source=new Dd(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=o,this.minFilter=r,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Lt(0,0),this.repeat=new Lt(1,1),this.center=new Lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_d)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ra:t.x=t.x-Math.floor(t.x);break;case bs:t.x=t.x<0?0:1;break;case jc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ra:t.y=t.y-Math.floor(t.y);break;case bs:t.y=t.y<0?0:1;break;case jc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}mn.DEFAULT_IMAGE=null;mn.DEFAULT_MAPPING=_d;mn.DEFAULT_ANISOTROPY=1;class me{constructor(t=0,e=0,n=0,i=1){me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*o,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*o,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*o,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,o;const c=t.elements,l=c[0],u=c[4],f=c[8],h=c[1],d=c[5],g=c[9],y=c[2],p=c[6],m=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-y)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+y)<.1&&Math.abs(g+p)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,M=(d+1)/2,T=(m+1)/2,b=(u+h)/4,E=(f+y)/4,C=(g+p)/4;return v>M&&v>T?v<.01?(n=0,i=.707106781,o=.707106781):(n=Math.sqrt(v),i=b/n,o=E/n):M>T?M<.01?(n=.707106781,i=0,o=.707106781):(i=Math.sqrt(M),n=b/i,o=C/i):T<.01?(n=.707106781,i=.707106781,o=0):(o=Math.sqrt(T),n=E/o,i=C/o),this.set(n,i,o,e),this}let x=Math.sqrt((p-g)*(p-g)+(f-y)*(f-y)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(f-y)/x,this.z=(h-u)/x,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Fp extends To{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const o=new mn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,o=this.textures.length;i<o;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Dd(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Rs extends Fp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Nd extends mn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Bn,this.minFilter=Bn,this.wrapR=bs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class zp extends mn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Bn,this.minFilter=Bn,this.wrapR=bs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}let Ni=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,o,r,a){let c=n[i+0],l=n[i+1],u=n[i+2],f=n[i+3];const h=o[r+0],d=o[r+1],g=o[r+2],y=o[r+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f;return}if(a===1){t[e+0]=h,t[e+1]=d,t[e+2]=g,t[e+3]=y;return}if(f!==y||c!==h||l!==d||u!==g){let p=1-a;const m=c*h+l*d+u*g+f*y,x=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const T=Math.sqrt(v),b=Math.atan2(T,m*x);p=Math.sin(p*b)/T,a=Math.sin(a*b)/T}const M=a*x;if(c=c*p+h*M,l=l*p+d*M,u=u*p+g*M,f=f*p+y*M,p===1-a){const T=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=T,l*=T,u*=T,f*=T}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,i,o,r){const a=n[i],c=n[i+1],l=n[i+2],u=n[i+3],f=o[r],h=o[r+1],d=o[r+2],g=o[r+3];return t[e]=a*g+u*f+c*d-l*h,t[e+1]=c*g+u*h+l*f-a*d,t[e+2]=l*g+u*d+a*h-c*f,t[e+3]=u*g-a*f-c*h-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,o=t._z,r=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(i/2),f=a(o/2),h=c(n/2),d=c(i/2),g=c(o/2);switch(r){case"XYZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f+h*d*g;break;case"YZX":this._x=h*u*f+l*d*g,this._y=l*d*f+h*u*g,this._z=l*u*g-h*d*f,this._w=l*u*f-h*d*g;break;case"XZY":this._x=h*u*f-l*d*g,this._y=l*d*f-h*u*g,this._z=l*u*g+h*d*f,this._w=l*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],o=e[8],r=e[1],a=e[5],c=e[9],l=e[2],u=e[6],f=e[10],h=n+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-c)*d,this._y=(o-l)*d,this._z=(r-i)*d}else if(n>a&&n>f){const d=2*Math.sqrt(1+n-a-f);this._w=(u-c)/d,this._x=.25*d,this._y=(i+r)/d,this._z=(o+l)/d}else if(a>f){const d=2*Math.sqrt(1+a-n-f);this._w=(o-l)/d,this._x=(i+r)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+f-n-a);this._w=(r-i)/d,this._x=(o+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,o=t._z,r=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+r*a+i*l-o*c,this._y=i*u+r*c+o*a-n*l,this._z=o*u+r*l+n*c-i*a,this._w=r*u-n*a-i*c-o*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,o=this._z,r=this._w;let a=r*t._w+n*t._x+i*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=n,this._y=i,this._z=o,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*r+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*o+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),f=Math.sin((1-e)*u)/l,h=Math.sin(e*u)/l;return this._w=r*f+this._w*h,this._x=n*f+this._x*h,this._y=i*f+this._y*h,this._z=o*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class B{constructor(t=0,e=0,n=0){B.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ru.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ru.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*i,this.y=o[1]*e+o[4]*n+o[7]*i,this.z=o[2]*e+o[5]*n+o[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,o=t.elements,r=1/(o[3]*e+o[7]*n+o[11]*i+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*i+o[12])*r,this.y=(o[1]*e+o[5]*n+o[9]*i+o[13])*r,this.z=(o[2]*e+o[6]*n+o[10]*i+o[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,o=t.x,r=t.y,a=t.z,c=t.w,l=2*(r*i-a*n),u=2*(a*e-o*i),f=2*(o*n-r*e);return this.x=e+c*l+r*f-a*u,this.y=n+c*u+a*l-o*f,this.z=i+c*f+o*u-r*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i,this.y=o[1]*e+o[5]*n+o[9]*i,this.z=o[2]*e+o[6]*n+o[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,o=t.z,r=e.x,a=e.y,c=e.z;return this.x=i*c-o*a,this.y=o*r-n*c,this.z=n*a-i*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ba.copy(this).projectOnVector(t),this.sub(Ba)}reflect(t){return this.sub(Ba.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Qe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ba=new B,Ru=new Ni;class rr{constructor(t=new B(1/0,1/0,1/0),e=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,Gn):Gn.fromBufferAttribute(o,r),Gn.applyMatrix4(t.matrixWorld),this.expandByPoint(Gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),hr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),hr.copy(n.boundingBox)),hr.applyMatrix4(t.matrixWorld),this.union(hr)}const i=t.children;for(let o=0,r=i.length;o<r;o++)this.expandByObject(i[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Gn),Gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Io),dr.subVectors(this.max,Io),zs.subVectors(t.a,Io),Os.subVectors(t.b,Io),Bs.subVectors(t.c,Io),Bi.subVectors(Os,zs),ki.subVectors(Bs,Os),rs.subVectors(zs,Bs);let e=[0,-Bi.z,Bi.y,0,-ki.z,ki.y,0,-rs.z,rs.y,Bi.z,0,-Bi.x,ki.z,0,-ki.x,rs.z,0,-rs.x,-Bi.y,Bi.x,0,-ki.y,ki.x,0,-rs.y,rs.x,0];return!ka(e,zs,Os,Bs,dr)||(e=[1,0,0,0,1,0,0,0,1],!ka(e,zs,Os,Bs,dr))?!1:(fr.crossVectors(Bi,ki),e=[fr.x,fr.y,fr.z],ka(e,zs,Os,Bs,dr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(pi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const pi=[new B,new B,new B,new B,new B,new B,new B,new B],Gn=new B,hr=new rr,zs=new B,Os=new B,Bs=new B,Bi=new B,ki=new B,rs=new B,Io=new B,dr=new B,fr=new B,as=new B;function ka(s,t,e,n,i){for(let o=0,r=s.length-3;o<=r;o+=3){as.fromArray(s,o);const a=i.x*Math.abs(as.x)+i.y*Math.abs(as.y)+i.z*Math.abs(as.z),c=t.dot(as),l=e.dot(as),u=n.dot(as);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Op=new rr,Lo=new B,Ha=new B;let Xl=class{constructor(t=new B,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Op.setFromPoints(t).getCenter(n);let i=0;for(let o=0,r=t.length;o<r;o++)i=Math.max(i,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Lo.subVectors(t,this.center);const e=Lo.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Lo,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ha.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Lo.copy(t.center).add(Ha)),this.expandByPoint(Lo.copy(t.center).sub(Ha))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}};const mi=new B,Ga=new B,pr=new B,Hi=new B,Va=new B,mr=new B,Wa=new B;let Bp=class{constructor(t=new B,e=new B(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,mi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=mi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(mi.copy(this.origin).addScaledVector(this.direction,e),mi.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ga.copy(t).add(e).multiplyScalar(.5),pr.copy(e).sub(t).normalize(),Hi.copy(this.origin).sub(Ga);const o=t.distanceTo(e)*.5,r=-this.direction.dot(pr),a=Hi.dot(this.direction),c=-Hi.dot(pr),l=Hi.lengthSq(),u=Math.abs(1-r*r);let f,h,d,g;if(u>0)if(f=r*c-a,h=r*a-c,g=o*u,f>=0)if(h>=-g)if(h<=g){const y=1/u;f*=y,h*=y,d=f*(f+r*h+2*a)+h*(r*f+h+2*c)+l}else h=o,f=Math.max(0,-(r*h+a)),d=-f*f+h*(h+2*c)+l;else h=-o,f=Math.max(0,-(r*h+a)),d=-f*f+h*(h+2*c)+l;else h<=-g?(f=Math.max(0,-(-r*o+a)),h=f>0?-o:Math.min(Math.max(-o,-c),o),d=-f*f+h*(h+2*c)+l):h<=g?(f=0,h=Math.min(Math.max(-o,-c),o),d=h*(h+2*c)+l):(f=Math.max(0,-(r*o+a)),h=f>0?o:Math.min(Math.max(-o,-c),o),d=-f*f+h*(h+2*c)+l);else h=r>0?-o:o,f=Math.max(0,-(r*h+a)),d=-f*f+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(Ga).addScaledVector(pr,h),d}intersectSphere(t,e){mi.subVectors(t.center,this.origin);const n=mi.dot(this.direction),i=mi.dot(mi)-n*n,o=t.radius*t.radius;if(i>o)return null;const r=Math.sqrt(o-i),a=n-r,c=n+r;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,o,r,a,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,i=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,i=(t.min.x-h.x)*l),u>=0?(o=(t.min.y-h.y)*u,r=(t.max.y-h.y)*u):(o=(t.max.y-h.y)*u,r=(t.min.y-h.y)*u),n>r||o>i||((o>n||isNaN(n))&&(n=o),(r<i||isNaN(i))&&(i=r),f>=0?(a=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,mi)!==null}intersectTriangle(t,e,n,i,o){Va.subVectors(e,t),mr.subVectors(n,t),Wa.crossVectors(Va,mr);let r=this.direction.dot(Wa),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;Hi.subVectors(this.origin,t);const c=a*this.direction.dot(mr.crossVectors(Hi,mr));if(c<0)return null;const l=a*this.direction.dot(Va.cross(Hi));if(l<0||c+l>r)return null;const u=-a*Hi.dot(Wa);return u<0?null:this.at(u/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class Ce{constructor(t,e,n,i,o,r,a,c,l,u,f,h,d,g,y,p){Ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,o,r,a,c,l,u,f,h,d,g,y,p)}set(t,e,n,i,o,r,a,c,l,u,f,h,d,g,y,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=o,m[5]=r,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=f,m[14]=h,m[3]=d,m[7]=g,m[11]=y,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ce().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/ks.setFromMatrixColumn(t,0).length(),o=1/ks.setFromMatrixColumn(t,1).length(),r=1/ks.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,o=t.z,r=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(o),f=Math.sin(o);if(t.order==="XYZ"){const h=r*u,d=r*f,g=a*u,y=a*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=d+g*l,e[5]=h-y*l,e[9]=-a*c,e[2]=y-h*l,e[6]=g+d*l,e[10]=r*c}else if(t.order==="YXZ"){const h=c*u,d=c*f,g=l*u,y=l*f;e[0]=h+y*a,e[4]=g*a-d,e[8]=r*l,e[1]=r*f,e[5]=r*u,e[9]=-a,e[2]=d*a-g,e[6]=y+h*a,e[10]=r*c}else if(t.order==="ZXY"){const h=c*u,d=c*f,g=l*u,y=l*f;e[0]=h-y*a,e[4]=-r*f,e[8]=g+d*a,e[1]=d+g*a,e[5]=r*u,e[9]=y-h*a,e[2]=-r*l,e[6]=a,e[10]=r*c}else if(t.order==="ZYX"){const h=r*u,d=r*f,g=a*u,y=a*f;e[0]=c*u,e[4]=g*l-d,e[8]=h*l+y,e[1]=c*f,e[5]=y*l+h,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=r*c}else if(t.order==="YZX"){const h=r*c,d=r*l,g=a*c,y=a*l;e[0]=c*u,e[4]=y-h*f,e[8]=g*f+d,e[1]=f,e[5]=r*u,e[9]=-a*u,e[2]=-l*u,e[6]=d*f+g,e[10]=h-y*f}else if(t.order==="XZY"){const h=r*c,d=r*l,g=a*c,y=a*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=h*f+y,e[5]=r*u,e[9]=d*f-g,e[2]=g*f-d,e[6]=a*u,e[10]=y*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(kp,t,Hp)}lookAt(t,e,n){const i=this.elements;return wn.subVectors(t,e),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Gi.crossVectors(n,wn),Gi.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Gi.crossVectors(n,wn)),Gi.normalize(),gr.crossVectors(wn,Gi),i[0]=Gi.x,i[4]=gr.x,i[8]=wn.x,i[1]=Gi.y,i[5]=gr.y,i[9]=wn.y,i[2]=Gi.z,i[6]=gr.z,i[10]=wn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,o=this.elements,r=n[0],a=n[4],c=n[8],l=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],y=n[6],p=n[10],m=n[14],x=n[3],v=n[7],M=n[11],T=n[15],b=i[0],E=i[4],C=i[8],R=i[12],_=i[1],w=i[5],L=i[9],I=i[13],U=i[2],F=i[6],N=i[10],G=i[14],z=i[3],q=i[7],$=i[11],et=i[15];return o[0]=r*b+a*_+c*U+l*z,o[4]=r*E+a*w+c*F+l*q,o[8]=r*C+a*L+c*N+l*$,o[12]=r*R+a*I+c*G+l*et,o[1]=u*b+f*_+h*U+d*z,o[5]=u*E+f*w+h*F+d*q,o[9]=u*C+f*L+h*N+d*$,o[13]=u*R+f*I+h*G+d*et,o[2]=g*b+y*_+p*U+m*z,o[6]=g*E+y*w+p*F+m*q,o[10]=g*C+y*L+p*N+m*$,o[14]=g*R+y*I+p*G+m*et,o[3]=x*b+v*_+M*U+T*z,o[7]=x*E+v*w+M*F+T*q,o[11]=x*C+v*L+M*N+T*$,o[15]=x*R+v*I+M*G+T*et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],o=t[12],r=t[1],a=t[5],c=t[9],l=t[13],u=t[2],f=t[6],h=t[10],d=t[14],g=t[3],y=t[7],p=t[11],m=t[15];return g*(+o*c*f-i*l*f-o*a*h+n*l*h+i*a*d-n*c*d)+y*(+e*c*d-e*l*h+o*r*h-i*r*d+i*l*u-o*c*u)+p*(+e*l*f-e*a*d-o*r*f+n*r*d+o*a*u-n*l*u)+m*(-i*a*u-e*c*f+e*a*h+i*r*f-n*r*h+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],u=t[8],f=t[9],h=t[10],d=t[11],g=t[12],y=t[13],p=t[14],m=t[15],x=f*p*l-y*h*l+y*c*d-a*p*d-f*c*m+a*h*m,v=g*h*l-u*p*l-g*c*d+r*p*d+u*c*m-r*h*m,M=u*y*l-g*f*l+g*a*d-r*y*d-u*a*m+r*f*m,T=g*f*c-u*y*c-g*a*h+r*y*h+u*a*p-r*f*p,b=e*x+n*v+i*M+o*T;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/b;return t[0]=x*E,t[1]=(y*h*o-f*p*o-y*i*d+n*p*d+f*i*m-n*h*m)*E,t[2]=(a*p*o-y*c*o+y*i*l-n*p*l-a*i*m+n*c*m)*E,t[3]=(f*c*o-a*h*o-f*i*l+n*h*l+a*i*d-n*c*d)*E,t[4]=v*E,t[5]=(u*p*o-g*h*o+g*i*d-e*p*d-u*i*m+e*h*m)*E,t[6]=(g*c*o-r*p*o-g*i*l+e*p*l+r*i*m-e*c*m)*E,t[7]=(r*h*o-u*c*o+u*i*l-e*h*l-r*i*d+e*c*d)*E,t[8]=M*E,t[9]=(g*f*o-u*y*o-g*n*d+e*y*d+u*n*m-e*f*m)*E,t[10]=(r*y*o-g*a*o+g*n*l-e*y*l-r*n*m+e*a*m)*E,t[11]=(u*a*o-r*f*o-u*n*l+e*f*l+r*n*d-e*a*d)*E,t[12]=T*E,t[13]=(u*y*i-g*f*i+g*n*h-e*y*h-u*n*p+e*f*p)*E,t[14]=(g*a*i-r*y*i-g*n*c+e*y*c+r*n*p-e*a*p)*E,t[15]=(r*f*i-u*a*i+u*n*c-e*f*c-r*n*h+e*a*h)*E,this}scale(t){const e=this.elements,n=t.x,i=t.y,o=t.z;return e[0]*=n,e[4]*=i,e[8]*=o,e[1]*=n,e[5]*=i,e[9]*=o,e[2]*=n,e[6]*=i,e[10]*=o,e[3]*=n,e[7]*=i,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),o=1-n,r=t.x,a=t.y,c=t.z,l=o*r,u=o*a;return this.set(l*r+n,l*a-i*c,l*c+i*a,0,l*a+i*c,u*a+n,u*c-i*r,0,l*c-i*a,u*c+i*r,o*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,o,r){return this.set(1,n,o,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,o=e._x,r=e._y,a=e._z,c=e._w,l=o+o,u=r+r,f=a+a,h=o*l,d=o*u,g=o*f,y=r*u,p=r*f,m=a*f,x=c*l,v=c*u,M=c*f,T=n.x,b=n.y,E=n.z;return i[0]=(1-(y+m))*T,i[1]=(d+M)*T,i[2]=(g-v)*T,i[3]=0,i[4]=(d-M)*b,i[5]=(1-(h+m))*b,i[6]=(p+x)*b,i[7]=0,i[8]=(g+v)*E,i[9]=(p-x)*E,i[10]=(1-(h+y))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let o=ks.set(i[0],i[1],i[2]).length();const r=ks.set(i[4],i[5],i[6]).length(),a=ks.set(i[8],i[9],i[10]).length();this.determinant()<0&&(o=-o),t.x=i[12],t.y=i[13],t.z=i[14],Vn.copy(this);const l=1/o,u=1/r,f=1/a;return Vn.elements[0]*=l,Vn.elements[1]*=l,Vn.elements[2]*=l,Vn.elements[4]*=u,Vn.elements[5]*=u,Vn.elements[6]*=u,Vn.elements[8]*=f,Vn.elements[9]*=f,Vn.elements[10]*=f,e.setFromRotationMatrix(Vn),n.x=o,n.y=r,n.z=a,this}makePerspective(t,e,n,i,o,r,a=Pi){const c=this.elements,l=2*o/(e-t),u=2*o/(n-i),f=(e+t)/(e-t),h=(n+i)/(n-i);let d,g;if(a===Pi)d=-(r+o)/(r-o),g=-2*r*o/(r-o);else if(a===ua)d=-r/(r-o),g=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,o,r,a=Pi){const c=this.elements,l=1/(e-t),u=1/(n-i),f=1/(r-o),h=(e+t)*l,d=(n+i)*u;let g,y;if(a===Pi)g=(r+o)*f,y=-2*f;else if(a===ua)g=o*f,y=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-h,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=y,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ks=new B,Vn=new Ce,kp=new B(0,0,0),Hp=new B(1,1,1),Gi=new B,gr=new B,wn=new B,Pu=new Ce,Iu=new Ni;class di{constructor(t=0,e=0,n=0,i=di.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,o=i[0],r=i[4],a=i[8],c=i[1],l=i[5],u=i[9],f=i[2],h=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-Qe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(Qe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Qe(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Pu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Pu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Iu.setFromEuler(this),this.setFromQuaternion(Iu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}di.DEFAULT_ORDER="XYZ";class Ud{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Gp=0;const Lu=new B,Hs=new Ni,gi=new Ce,vr=new B,Do=new B,Vp=new B,Wp=new Ni,Du=new B(1,0,0),Nu=new B(0,1,0),Uu=new B(0,0,1),Fu={type:"added"},qp={type:"removed"},Gs={type:"childadded",child:null},qa={type:"childremoved",child:null};class nn extends To{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gp++}),this.uuid=or(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=nn.DEFAULT_UP.clone();const t=new B,e=new di,n=new Ni,i=new B(1,1,1);function o(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ce},normalMatrix:{value:new Qt}}),this.matrix=new Ce,this.matrixWorld=new Ce,this.matrixAutoUpdate=nn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ud,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Hs.setFromAxisAngle(t,e),this.quaternion.multiply(Hs),this}rotateOnWorldAxis(t,e){return Hs.setFromAxisAngle(t,e),this.quaternion.premultiply(Hs),this}rotateX(t){return this.rotateOnAxis(Du,t)}rotateY(t){return this.rotateOnAxis(Nu,t)}rotateZ(t){return this.rotateOnAxis(Uu,t)}translateOnAxis(t,e){return Lu.copy(t).applyQuaternion(this.quaternion),this.position.add(Lu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Du,t)}translateY(t){return this.translateOnAxis(Nu,t)}translateZ(t){return this.translateOnAxis(Uu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(gi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?vr.copy(t):vr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Do.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gi.lookAt(Do,vr,this.up):gi.lookAt(vr,Do,this.up),this.quaternion.setFromRotationMatrix(gi),i&&(gi.extractRotation(i.matrixWorld),Hs.setFromRotationMatrix(gi),this.quaternion.premultiply(Hs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Fu),Gs.child=t,this.dispatchEvent(Gs),Gs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(qp),qa.child=t,this.dispatchEvent(qa),qa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),gi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),gi.multiply(t.parent.matrixWorld)),t.applyMatrix4(gi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Fu),Gs.child=t,this.dispatchEvent(Gs),Gs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let o=0,r=i.length;o<r;o++)i[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Do,t,Vp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Do,Wp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let o=0,r=i.length;o<r;o++)i[o].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function o(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];o(t.shapes,f)}else o(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(o(t.materials,this.material[c]));i.material=a}else i.material=o(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(o(t.animations,c))}}if(e){const a=r(t.geometries),c=r(t.materials),l=r(t.textures),u=r(t.images),f=r(t.shapes),h=r(t.skeletons),d=r(t.animations),g=r(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function r(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}nn.DEFAULT_UP=new B(0,1,0);nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Wn=new B,vi=new B,Xa=new B,xi=new B,Vs=new B,Ws=new B,zu=new B,Ya=new B,ja=new B,$a=new B,Ka=new me,Za=new me,Ja=new me;class $n{constructor(t=new B,e=new B,n=new B){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Wn.subVectors(t,e),i.cross(Wn);const o=i.lengthSq();return o>0?i.multiplyScalar(1/Math.sqrt(o)):i.set(0,0,0)}static getBarycoord(t,e,n,i,o){Wn.subVectors(i,e),vi.subVectors(n,e),Xa.subVectors(t,e);const r=Wn.dot(Wn),a=Wn.dot(vi),c=Wn.dot(Xa),l=vi.dot(vi),u=vi.dot(Xa),f=r*l-a*a;if(f===0)return o.set(0,0,0),null;const h=1/f,d=(l*c-a*u)*h,g=(r*u-a*c)*h;return o.set(1-d-g,g,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(t,e,n,i,o,r,a,c){return this.getBarycoord(t,e,n,i,xi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,xi.x),c.addScaledVector(r,xi.y),c.addScaledVector(a,xi.z),c)}static getInterpolatedAttribute(t,e,n,i,o,r){return Ka.setScalar(0),Za.setScalar(0),Ja.setScalar(0),Ka.fromBufferAttribute(t,e),Za.fromBufferAttribute(t,n),Ja.fromBufferAttribute(t,i),r.setScalar(0),r.addScaledVector(Ka,o.x),r.addScaledVector(Za,o.y),r.addScaledVector(Ja,o.z),r}static isFrontFacing(t,e,n,i){return Wn.subVectors(n,e),vi.subVectors(t,e),Wn.cross(vi).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Wn.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),Wn.cross(vi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return $n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return $n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,o){return $n.getInterpolation(t,this.a,this.b,this.c,e,n,i,o)}containsPoint(t){return $n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return $n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,o=this.c;let r,a;Vs.subVectors(i,n),Ws.subVectors(o,n),Ya.subVectors(t,n);const c=Vs.dot(Ya),l=Ws.dot(Ya);if(c<=0&&l<=0)return e.copy(n);ja.subVectors(t,i);const u=Vs.dot(ja),f=Ws.dot(ja);if(u>=0&&f<=u)return e.copy(i);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return r=c/(c-u),e.copy(n).addScaledVector(Vs,r);$a.subVectors(t,o);const d=Vs.dot($a),g=Ws.dot($a);if(g>=0&&d<=g)return e.copy(o);const y=d*l-c*g;if(y<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Ws,a);const p=u*g-d*f;if(p<=0&&f-u>=0&&d-g>=0)return zu.subVectors(o,i),a=(f-u)/(f-u+(d-g)),e.copy(i).addScaledVector(zu,a);const m=1/(p+y+h);return r=y*m,a=h*m,e.copy(n).addScaledVector(Vs,r).addScaledVector(Ws,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Fd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},xr={h:0,s:0,l:0};function Qa(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class ie{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Fn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,de.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=de.workingColorSpace){return this.r=t,this.g=e,this.b=n,de.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=de.workingColorSpace){if(t=Ap(t,1),e=Qe(e,0,1),n=Qe(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,r=2*n-o;this.r=Qa(r,o,t+1/3),this.g=Qa(r,o,t),this.b=Qa(r,o,t-1/3)}return de.toWorkingColorSpace(this,i),this}setStyle(t,e=Fn){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=i[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Fn){const n=Fd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=co(t.r),this.g=co(t.g),this.b=co(t.b),this}copyLinearToSRGB(t){return this.r=za(t.r),this.g=za(t.g),this.b=za(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Fn){return de.fromWorkingColorSpace(rn.copy(this),t),Math.round(Qe(rn.r*255,0,255))*65536+Math.round(Qe(rn.g*255,0,255))*256+Math.round(Qe(rn.b*255,0,255))}getHexString(t=Fn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=de.workingColorSpace){de.fromWorkingColorSpace(rn.copy(this),e);const n=rn.r,i=rn.g,o=rn.b,r=Math.max(n,i,o),a=Math.min(n,i,o);let c,l;const u=(a+r)/2;if(a===r)c=0,l=0;else{const f=r-a;switch(l=u<=.5?f/(r+a):f/(2-r-a),r){case n:c=(i-o)/f+(i<o?6:0);break;case i:c=(o-n)/f+2;break;case o:c=(n-i)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=de.workingColorSpace){return de.fromWorkingColorSpace(rn.copy(this),e),t.r=rn.r,t.g=rn.g,t.b=rn.b,t}getStyle(t=Fn){de.fromWorkingColorSpace(rn.copy(this),t);const e=rn.r,n=rn.g,i=rn.b;return t!==Fn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Vi),this.setHSL(Vi.h+t,Vi.s+e,Vi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Vi),t.getHSL(xr);const n=Ua(Vi.h,xr.h,e),i=Ua(Vi.s,xr.s,e),o=Ua(Vi.l,xr.l,e);return this.setHSL(n,i,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*i,this.g=o[1]*e+o[4]*n+o[7]*i,this.b=o[2]*e+o[5]*n+o[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const rn=new ie;ie.NAMES=Fd;let Xp=0,ar=class extends To{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xp++}),this.uuid=or(),this.name="",this.type="Material",this.blending=ro,this.side=es,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zc,this.blendDst=Oc,this.blendEquation=xs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ie(0,0,0),this.blendAlpha=0,this.depthFunc=ho,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Us,this.stencilZFail=Us,this.stencilZPass=Us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ro&&(n.blending=this.blending),this.side!==es&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==zc&&(n.blendSrc=this.blendSrc),this.blendDst!==Oc&&(n.blendDst=this.blendDst),this.blendEquation!==xs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ho&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Us&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Us&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Us&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(o){const r=[];for(const a in o){const c=o[a];delete c.metadata,r.push(c)}return r}if(e){const o=i(t.textures),r=i(t.images);o.length>0&&(n.textures=o),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let o=0;o!==i;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}};class hn extends ar{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=vd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Oe=new B,_r=new Lt;class ci{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Eu,this.updateRanges=[],this.gpuType=Ri,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,o=this.itemSize;i<o;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)_r.fromBufferAttribute(this,e),_r.applyMatrix3(t),this.setXY(e,_r.x,_r.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix3(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ro(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=gn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ro(e,this.array)),e}setX(t,e){return this.normalized&&(e=gn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ro(e,this.array)),e}setY(t,e){return this.normalized&&(e=gn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ro(e,this.array)),e}setZ(t,e){return this.normalized&&(e=gn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ro(e,this.array)),e}setW(t,e){return this.normalized&&(e=gn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=gn(e,this.array),n=gn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=gn(e,this.array),n=gn(n,this.array),i=gn(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,o){return t*=this.itemSize,this.normalized&&(e=gn(e,this.array),n=gn(n,this.array),i=gn(i,this.array),o=gn(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Eu&&(t.usage=this.usage),t}}class zd extends ci{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Od extends ci{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Te extends ci{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Yp=0;const Ln=new Ce,tc=new nn,qs=new B,En=new rr,No=new rr,Ye=new B;class An extends To{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yp++}),this.uuid=or(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ld(t)?Od:zd)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new Qt().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ln.makeRotationFromQuaternion(t),this.applyMatrix4(Ln),this}rotateX(t){return Ln.makeRotationX(t),this.applyMatrix4(Ln),this}rotateY(t){return Ln.makeRotationY(t),this.applyMatrix4(Ln),this}rotateZ(t){return Ln.makeRotationZ(t),this.applyMatrix4(Ln),this}translate(t,e,n){return Ln.makeTranslation(t,e,n),this.applyMatrix4(Ln),this}scale(t,e,n){return Ln.makeScale(t,e,n),this.applyMatrix4(Ln),this}lookAt(t){return tc.lookAt(t),tc.updateMatrix(),this.applyMatrix4(tc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qs).negate(),this.translate(qs.x,qs.y,qs.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const o=t[n];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new Te(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const o=e[n];En.setFromBufferAttribute(o),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,En.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,En.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(En.min),this.boundingBox.expandByPoint(En.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xl);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(t){const n=this.boundingSphere.center;if(En.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];No.setFromBufferAttribute(a),this.morphTargetsRelative?(Ye.addVectors(En.min,No.min),En.expandByPoint(Ye),Ye.addVectors(En.max,No.max),En.expandByPoint(Ye)):(En.expandByPoint(No.min),En.expandByPoint(No.max))}En.getCenter(n);let i=0;for(let o=0,r=t.count;o<r;o++)Ye.fromBufferAttribute(t,o),i=Math.max(i,n.distanceToSquared(Ye));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ye.fromBufferAttribute(a,l),c&&(qs.fromBufferAttribute(t,l),Ye.add(qs)),i=Math.max(i,n.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ci(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<n.count;C++)a[C]=new B,c[C]=new B;const l=new B,u=new B,f=new B,h=new Lt,d=new Lt,g=new Lt,y=new B,p=new B;function m(C,R,_){l.fromBufferAttribute(n,C),u.fromBufferAttribute(n,R),f.fromBufferAttribute(n,_),h.fromBufferAttribute(o,C),d.fromBufferAttribute(o,R),g.fromBufferAttribute(o,_),u.sub(l),f.sub(l),d.sub(h),g.sub(h);const w=1/(d.x*g.y-g.x*d.y);isFinite(w)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(w),p.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(w),a[C].add(y),a[R].add(y),a[_].add(y),c[C].add(p),c[R].add(p),c[_].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let C=0,R=x.length;C<R;++C){const _=x[C],w=_.start,L=_.count;for(let I=w,U=w+L;I<U;I+=3)m(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const v=new B,M=new B,T=new B,b=new B;function E(C){T.fromBufferAttribute(i,C),b.copy(T);const R=a[C];v.copy(R),v.sub(T.multiplyScalar(T.dot(R))).normalize(),M.crossVectors(b,R);const w=M.dot(c[C])<0?-1:1;r.setXYZW(C,v.x,v.y,v.z,w)}for(let C=0,R=x.length;C<R;++C){const _=x[C],w=_.start,L=_.count;for(let I=w,U=w+L;I<U;I+=3)E(t.getX(I+0)),E(t.getX(I+1)),E(t.getX(I+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ci(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const i=new B,o=new B,r=new B,a=new B,c=new B,l=new B,u=new B,f=new B;if(t)for(let h=0,d=t.count;h<d;h+=3){const g=t.getX(h+0),y=t.getX(h+1),p=t.getX(h+2);i.fromBufferAttribute(e,g),o.fromBufferAttribute(e,y),r.fromBufferAttribute(e,p),u.subVectors(r,o),f.subVectors(i,o),u.cross(f),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,p),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let h=0,d=e.count;h<d;h+=3)i.fromBufferAttribute(e,h+0),o.fromBufferAttribute(e,h+1),r.fromBufferAttribute(e,h+2),u.subVectors(r,o),f.subVectors(i,o),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ye.fromBufferAttribute(t,e),Ye.normalize(),t.setXYZ(e,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,f=a.normalized,h=new l.constructor(c.length*u);let d=0,g=0;for(let y=0,p=c.length;y<p;y++){a.isInterleavedBufferAttribute?d=c[y]*a.data.stride+a.offset:d=c[y]*u;for(let m=0;m<u;m++)h[g++]=l[d++]}return new ci(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new An,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const o=this.morphAttributes;for(const a in o){const c=[],l=o[a];for(let u=0,f=l.length;u<f;u++){const h=l[u],d=t(h,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,c=r.length;a<c;a++){const l=r[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let o=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const d=l[f];u.push(d.toJSON(t.data))}u.length>0&&(i[c]=u,o=!0)}o&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(e))}const o=t.morphAttributes;for(const l in o){const u=[],f=o[l];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let l=0,u=r.length;l<u;l++){const f=r[l];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ou=new Ce,cs=new Bp,yr=new Xl,Bu=new B,Mr=new B,Sr=new B,wr=new B,ec=new B,Er=new B,ku=new B,br=new B;class Nt extends nn{constructor(t=new An,e=new hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=i.length;o<r;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,o=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(o&&a){Er.set(0,0,0);for(let c=0,l=o.length;c<l;c++){const u=a[c],f=o[c];u!==0&&(ec.fromBufferAttribute(f,t),r?Er.addScaledVector(ec,u):Er.addScaledVector(ec.sub(e),u))}e.add(Er)}return e}raycast(t,e){const n=this.geometry,i=this.material,o=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),yr.copy(n.boundingSphere),yr.applyMatrix4(o),cs.copy(t.ray).recast(t.near),!(yr.containsPoint(cs.origin)===!1&&(cs.intersectSphere(yr,Bu)===null||cs.origin.distanceToSquared(Bu)>(t.far-t.near)**2))&&(Ou.copy(o).invert(),cs.copy(t.ray).applyMatrix4(Ou),!(n.boundingBox!==null&&cs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,cs)))}_computeIntersections(t,e,n){let i;const o=this.geometry,r=this.material,a=o.index,c=o.attributes.position,l=o.attributes.uv,u=o.attributes.uv1,f=o.attributes.normal,h=o.groups,d=o.drawRange;if(a!==null)if(Array.isArray(r))for(let g=0,y=h.length;g<y;g++){const p=h[g],m=r[p.materialIndex],x=Math.max(p.start,d.start),v=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let M=x,T=v;M<T;M+=3){const b=a.getX(M),E=a.getX(M+1),C=a.getX(M+2);i=Tr(this,m,t,n,l,u,f,b,E,C),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),y=Math.min(a.count,d.start+d.count);for(let p=g,m=y;p<m;p+=3){const x=a.getX(p),v=a.getX(p+1),M=a.getX(p+2);i=Tr(this,r,t,n,l,u,f,x,v,M),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(r))for(let g=0,y=h.length;g<y;g++){const p=h[g],m=r[p.materialIndex],x=Math.max(p.start,d.start),v=Math.min(c.count,Math.min(p.start+p.count,d.start+d.count));for(let M=x,T=v;M<T;M+=3){const b=M,E=M+1,C=M+2;i=Tr(this,m,t,n,l,u,f,b,E,C),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),y=Math.min(c.count,d.start+d.count);for(let p=g,m=y;p<m;p+=3){const x=p,v=p+1,M=p+2;i=Tr(this,r,t,n,l,u,f,x,v,M),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function jp(s,t,e,n,i,o,r,a){let c;if(t.side===en?c=n.intersectTriangle(r,o,i,!0,a):c=n.intersectTriangle(i,o,r,t.side===es,a),c===null)return null;br.copy(a),br.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(br);return l<e.near||l>e.far?null:{distance:l,point:br.clone(),object:s}}function Tr(s,t,e,n,i,o,r,a,c,l){s.getVertexPosition(a,Mr),s.getVertexPosition(c,Sr),s.getVertexPosition(l,wr);const u=jp(s,t,e,n,Mr,Sr,wr,ku);if(u){const f=new B;$n.getBarycoord(ku,Mr,Sr,wr,f),i&&(u.uv=$n.getInterpolatedAttribute(i,a,c,l,f,new Lt)),o&&(u.uv1=$n.getInterpolatedAttribute(o,a,c,l,f,new Lt)),r&&(u.normal=$n.getInterpolatedAttribute(r,a,c,l,f,new B),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:c,c:l,normal:new B,materialIndex:0};$n.getNormal(Mr,Sr,wr,h.normal),u.face=h,u.barycoord=f}return u}class li extends An{constructor(t=1,e=1,n=1,i=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:o,depthSegments:r};const a=this;i=Math.floor(i),o=Math.floor(o),r=Math.floor(r);const c=[],l=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,n,e,t,r,o,0),g("z","y","x",1,-1,n,e,-t,r,o,1),g("x","z","y",1,1,t,n,e,i,r,2),g("x","z","y",1,-1,t,n,-e,i,r,3),g("x","y","z",1,-1,t,e,n,i,o,4),g("x","y","z",-1,-1,t,e,-n,i,o,5),this.setIndex(c),this.setAttribute("position",new Te(l,3)),this.setAttribute("normal",new Te(u,3)),this.setAttribute("uv",new Te(f,2));function g(y,p,m,x,v,M,T,b,E,C,R){const _=M/E,w=T/C,L=M/2,I=T/2,U=b/2,F=E+1,N=C+1;let G=0,z=0;const q=new B;for(let $=0;$<N;$++){const et=$*w-I;for(let J=0;J<F;J++){const At=J*_-L;q[y]=At*x,q[p]=et*v,q[m]=U,l.push(q.x,q.y,q.z),q[y]=0,q[p]=0,q[m]=b>0?1:-1,u.push(q.x,q.y,q.z),f.push(J/E),f.push(1-$/C),G+=1}}for(let $=0;$<C;$++)for(let et=0;et<E;et++){const J=h+et+F*$,At=h+et+F*($+1),j=h+(et+1)+F*($+1),st=h+(et+1)+F*$;c.push(J,At,st),c.push(At,j,st),z+=6}a.addGroup(d,z,R),d+=z,h+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new li(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function vo(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function ln(s){const t={};for(let e=0;e<s.length;e++){const n=vo(s[e]);for(const i in n)t[i]=n[i]}return t}function $p(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Bd(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:de.workingColorSpace}const Kp={clone:vo,merge:ln};var Zp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ns extends ar{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zp,this.fragmentShader=Jp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=vo(t.uniforms),this.uniformsGroups=$p(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?e.uniforms[i]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[i]={type:"m4",value:r.toArray()}:e.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class kd extends nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ce,this.projectionMatrix=new Ce,this.projectionMatrixInverse=new Ce,this.coordinateSystem=Pi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Wi=new B,Hu=new Lt,Gu=new Lt;class Tn extends kd{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ml*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Na*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ml*2*Math.atan(Math.tan(Na*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Wi.x,Wi.y).multiplyScalar(-t/Wi.z),Wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wi.x,Wi.y).multiplyScalar(-t/Wi.z)}getViewSize(t,e){return this.getViewBounds(t,Hu,Gu),e.subVectors(Gu,Hu)}setViewOffset(t,e,n,i,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Na*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,o=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;o+=r.offsetX*i/c,e-=r.offsetY*n/l,i*=r.width/c,n*=r.height/l}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Xs=-90,Ys=1;class Qp extends nn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Tn(Xs,Ys,t,e);i.layers=this.layers,this.add(i);const o=new Tn(Xs,Ys,t,e);o.layers=this.layers,this.add(o);const r=new Tn(Xs,Ys,t,e);r.layers=this.layers,this.add(r);const a=new Tn(Xs,Ys,t,e);a.layers=this.layers,this.add(a);const c=new Tn(Xs,Ys,t,e);c.layers=this.layers,this.add(c);const l=new Tn(Xs,Ys,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,o,r,a,c]=e;for(const l of e)this.remove(l);if(t===Pi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ua)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,c,l,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,o),t.setRenderTarget(n,1,i),t.render(e,r),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,i),t.render(e,u),t.setRenderTarget(f,h,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Hd extends mn{constructor(t,e,n,i,o,r,a,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:fo,super(t,e,n,i,o,r,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class tm extends Rs{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Hd(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:jn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new li(5,5,5),o=new ns({name:"CubemapFromEquirect",uniforms:vo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:Zi});o.uniforms.tEquirect.value=e;const r=new Nt(i,o),a=e.minFilter;return e.minFilter===Ts&&(e.minFilter=jn),new Qp(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,i){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,i);t.setRenderTarget(o)}}const nc=new B,em=new B,nm=new Qt;let gs=class{constructor(t=new B(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=nc.subVectors(n,e).cross(em.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(nc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/i;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||nm.getNormalMatrix(t),i=this.coplanarPoint(nc).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}};const ls=new Xl,Ar=new B;class Yl{constructor(t=new gs,e=new gs,n=new gs,i=new gs,o=new gs,r=new gs){this.planes=[t,e,n,i,o,r]}set(t,e,n,i,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Pi){const n=this.planes,i=t.elements,o=i[0],r=i[1],a=i[2],c=i[3],l=i[4],u=i[5],f=i[6],h=i[7],d=i[8],g=i[9],y=i[10],p=i[11],m=i[12],x=i[13],v=i[14],M=i[15];if(n[0].setComponents(c-o,h-l,p-d,M-m).normalize(),n[1].setComponents(c+o,h+l,p+d,M+m).normalize(),n[2].setComponents(c+r,h+u,p+g,M+x).normalize(),n[3].setComponents(c-r,h-u,p-g,M-x).normalize(),n[4].setComponents(c-a,h-f,p-y,M-v).normalize(),e===Pi)n[5].setComponents(c+a,h+f,p+y,M+v).normalize();else if(e===ua)n[5].setComponents(a,f,y,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ls.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ls.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ls)}intersectsSprite(t){return ls.center.set(0,0,0),ls.radius=.7071067811865476,ls.applyMatrix4(t.matrixWorld),this.intersectsSphere(ls)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Ar.x=i.normal.x>0?t.max.x:t.min.x,Ar.y=i.normal.y>0?t.max.y:t.min.y,Ar.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Ar)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Gd(){let s=null,t=!1,e=null,n=null;function i(o,r){e(o,r),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){s=o}}}function im(s){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,f=l.byteLength,h=s.createBuffer();s.bindBuffer(c,h),s.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=s.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=s.SHORT;else if(l instanceof Uint32Array)d=s.UNSIGNED_INT;else if(l instanceof Int32Array)d=s.INT;else if(l instanceof Int8Array)d=s.BYTE;else if(l instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,c,l){const u=c.array,f=c.updateRanges;if(s.bindBuffer(l,a),f.length===0)s.bufferSubData(l,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],y=f[d];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++h,f[h]=y)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const y=f[d];s.bufferSubData(l,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(s.deleteBuffer(c.buffer),t.delete(a))}function r(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:o,update:r}}class Ps extends An{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const o=t/2,r=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,u=c+1,f=t/a,h=e/c,d=[],g=[],y=[],p=[];for(let m=0;m<u;m++){const x=m*h-r;for(let v=0;v<l;v++){const M=v*f-o;g.push(M,-x,0),y.push(0,0,1),p.push(v/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<a;x++){const v=x+l*m,M=x+l*(m+1),T=x+1+l*(m+1),b=x+1+l*m;d.push(v,M,b),d.push(M,T,b)}this.setIndex(d),this.setAttribute("position",new Te(g,3)),this.setAttribute("normal",new Te(y,3)),this.setAttribute("uv",new Te(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ps(t.width,t.height,t.widthSegments,t.heightSegments)}}var sm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,om=`#ifdef USE_ALPHAHASH
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
#endif`,rm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,am=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,um=`#ifdef USE_AOMAP
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
#endif`,hm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dm=`#ifdef USE_BATCHING
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
#endif`,fm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,vm=`#ifdef USE_IRIDESCENCE
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
#endif`,xm=`#ifdef USE_BUMPMAP
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
#endif`,_m=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ym=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Mm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Sm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Em=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Tm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Am=`#define PI 3.141592653589793
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
} // validated`,Cm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Rm=`vec3 transformedNormal = objectNormal;
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
#endif`,Pm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Im=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Dm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Nm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Um=`
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
}`,Fm=`#ifdef USE_ENVMAP
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
#endif`,zm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Om=`#ifdef USE_ENVMAP
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
#endif`,Bm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,km=`#ifdef USE_ENVMAP
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
#endif`,Hm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qm=`#ifdef USE_GRADIENTMAP
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
}`,Xm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ym=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$m=`uniform bool receiveShadow;
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
#endif`,Km=`#ifdef USE_ENVMAP
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
#endif`,Zm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,t0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,e0=`PhysicalMaterial material;
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
#endif`,n0=`struct PhysicalMaterial {
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
}`,i0=`
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
#endif`,s0=`#if defined( RE_IndirectDiffuse )
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
#endif`,o0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,r0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,a0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,c0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,l0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,u0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,h0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,d0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,f0=`#if defined( USE_POINTS_UV )
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
#endif`,p0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,m0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,g0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,v0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,x0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_0=`#ifdef USE_MORPHTARGETS
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
#endif`,y0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,M0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,S0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,w0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,E0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,b0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,T0=`#ifdef USE_NORMALMAP
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
#endif`,A0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,C0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,R0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,P0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,I0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,L0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,D0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,N0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,U0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,F0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,z0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,O0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,B0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,k0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,H0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,G0=`float getShadowMask() {
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
}`,V0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,W0=`#ifdef USE_SKINNING
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
#endif`,q0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,X0=`#ifdef USE_SKINNING
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
#endif`,Y0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,j0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,K0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Z0=`#ifdef USE_TRANSMISSION
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
#endif`,J0=`#ifdef USE_TRANSMISSION
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
#endif`,Q0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ng=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ig=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sg=`uniform sampler2D t2D;
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
}`,og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lg=`#include <common>
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
}`,ug=`#if DEPTH_PACKING == 3200
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
}`,hg=`#define DISTANCE
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
}`,dg=`#define DISTANCE
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
}`,fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mg=`uniform float scale;
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
}`,gg=`uniform vec3 diffuse;
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
}`,vg=`#include <common>
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
}`,xg=`uniform vec3 diffuse;
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
}`,_g=`#define LAMBERT
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
}`,yg=`#define LAMBERT
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
}`,Mg=`#define MATCAP
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
}`,Sg=`#define MATCAP
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
}`,wg=`#define NORMAL
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
}`,Eg=`#define NORMAL
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
}`,bg=`#define PHONG
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
}`,Tg=`#define PHONG
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
}`,Ag=`#define STANDARD
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
}`,Cg=`#define STANDARD
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
}`,Rg=`#define TOON
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
}`,Pg=`#define TOON
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
}`,Ig=`uniform float size;
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
}`,Lg=`uniform vec3 diffuse;
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
}`,Dg=`#include <common>
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
}`,Ng=`uniform vec3 color;
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
}`,Ug=`uniform float rotation;
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
}`,Fg=`uniform vec3 diffuse;
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
}`,Jt={alphahash_fragment:sm,alphahash_pars_fragment:om,alphamap_fragment:rm,alphamap_pars_fragment:am,alphatest_fragment:cm,alphatest_pars_fragment:lm,aomap_fragment:um,aomap_pars_fragment:hm,batching_pars_vertex:dm,batching_vertex:fm,begin_vertex:pm,beginnormal_vertex:mm,bsdfs:gm,iridescence_fragment:vm,bumpmap_pars_fragment:xm,clipping_planes_fragment:_m,clipping_planes_pars_fragment:ym,clipping_planes_pars_vertex:Mm,clipping_planes_vertex:Sm,color_fragment:wm,color_pars_fragment:Em,color_pars_vertex:bm,color_vertex:Tm,common:Am,cube_uv_reflection_fragment:Cm,defaultnormal_vertex:Rm,displacementmap_pars_vertex:Pm,displacementmap_vertex:Im,emissivemap_fragment:Lm,emissivemap_pars_fragment:Dm,colorspace_fragment:Nm,colorspace_pars_fragment:Um,envmap_fragment:Fm,envmap_common_pars_fragment:zm,envmap_pars_fragment:Om,envmap_pars_vertex:Bm,envmap_physical_pars_fragment:Km,envmap_vertex:km,fog_vertex:Hm,fog_pars_vertex:Gm,fog_fragment:Vm,fog_pars_fragment:Wm,gradientmap_pars_fragment:qm,lightmap_pars_fragment:Xm,lights_lambert_fragment:Ym,lights_lambert_pars_fragment:jm,lights_pars_begin:$m,lights_toon_fragment:Zm,lights_toon_pars_fragment:Jm,lights_phong_fragment:Qm,lights_phong_pars_fragment:t0,lights_physical_fragment:e0,lights_physical_pars_fragment:n0,lights_fragment_begin:i0,lights_fragment_maps:s0,lights_fragment_end:o0,logdepthbuf_fragment:r0,logdepthbuf_pars_fragment:a0,logdepthbuf_pars_vertex:c0,logdepthbuf_vertex:l0,map_fragment:u0,map_pars_fragment:h0,map_particle_fragment:d0,map_particle_pars_fragment:f0,metalnessmap_fragment:p0,metalnessmap_pars_fragment:m0,morphinstance_vertex:g0,morphcolor_vertex:v0,morphnormal_vertex:x0,morphtarget_pars_vertex:_0,morphtarget_vertex:y0,normal_fragment_begin:M0,normal_fragment_maps:S0,normal_pars_fragment:w0,normal_pars_vertex:E0,normal_vertex:b0,normalmap_pars_fragment:T0,clearcoat_normal_fragment_begin:A0,clearcoat_normal_fragment_maps:C0,clearcoat_pars_fragment:R0,iridescence_pars_fragment:P0,opaque_fragment:I0,packing:L0,premultiplied_alpha_fragment:D0,project_vertex:N0,dithering_fragment:U0,dithering_pars_fragment:F0,roughnessmap_fragment:z0,roughnessmap_pars_fragment:O0,shadowmap_pars_fragment:B0,shadowmap_pars_vertex:k0,shadowmap_vertex:H0,shadowmask_pars_fragment:G0,skinbase_vertex:V0,skinning_pars_vertex:W0,skinning_vertex:q0,skinnormal_vertex:X0,specularmap_fragment:Y0,specularmap_pars_fragment:j0,tonemapping_fragment:$0,tonemapping_pars_fragment:K0,transmission_fragment:Z0,transmission_pars_fragment:J0,uv_pars_fragment:Q0,uv_pars_vertex:tg,uv_vertex:eg,worldpos_vertex:ng,background_vert:ig,background_frag:sg,backgroundCube_vert:og,backgroundCube_frag:rg,cube_vert:ag,cube_frag:cg,depth_vert:lg,depth_frag:ug,distanceRGBA_vert:hg,distanceRGBA_frag:dg,equirect_vert:fg,equirect_frag:pg,linedashed_vert:mg,linedashed_frag:gg,meshbasic_vert:vg,meshbasic_frag:xg,meshlambert_vert:_g,meshlambert_frag:yg,meshmatcap_vert:Mg,meshmatcap_frag:Sg,meshnormal_vert:wg,meshnormal_frag:Eg,meshphong_vert:bg,meshphong_frag:Tg,meshphysical_vert:Ag,meshphysical_frag:Cg,meshtoon_vert:Rg,meshtoon_frag:Pg,points_vert:Ig,points_frag:Lg,shadow_vert:Dg,shadow_frag:Ng,sprite_vert:Ug,sprite_frag:Fg},Et={common:{diffuse:{value:new ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new Lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new ie(16777215)},opacity:{value:1},center:{value:new Lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},si={basic:{uniforms:ln([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:ln([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new ie(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:ln([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new ie(0)},specular:{value:new ie(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:ln([Et.common,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.roughnessmap,Et.metalnessmap,Et.fog,Et.lights,{emissive:{value:new ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:ln([Et.common,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.gradientmap,Et.fog,Et.lights,{emissive:{value:new ie(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:ln([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:ln([Et.points,Et.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:ln([Et.common,Et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:ln([Et.common,Et.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:ln([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:ln([Et.sprite,Et.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:ln([Et.common,Et.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:ln([Et.lights,Et.fog,{color:{value:new ie(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};si.physical={uniforms:ln([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new Lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new Lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new ie(0)},specularColor:{value:new ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new Lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};const Cr={r:0,b:0,g:0},us=new di,zg=new Ce;function Og(s,t,e,n,i,o,r){const a=new ie(0);let c=o===!0?0:1,l,u,f=null,h=0,d=null;function g(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?e:t).get(v)),v}function y(x){let v=!1;const M=g(x);M===null?m(a,c):M&&M.isColor&&(m(M,1),v=!0);const T=s.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(s.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function p(x,v){const M=g(v);M&&(M.isCubeTexture||M.mapping===Ma)?(u===void 0&&(u=new Nt(new li(1,1,1),new ns({name:"BackgroundCubeMaterial",uniforms:vo(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,b,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),us.copy(v.backgroundRotation),us.x*=-1,us.y*=-1,us.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(us.y*=-1,us.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(zg.makeRotationFromEuler(us)),u.material.toneMapped=de.getTransfer(M.colorSpace)!==Ee,(f!==M||h!==M.version||d!==s.toneMapping)&&(u.material.needsUpdate=!0,f=M,h=M.version,d=s.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Nt(new Ps(2,2),new ns({name:"BackgroundMaterial",uniforms:vo(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:es,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=de.getTransfer(M.colorSpace)!==Ee,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(f!==M||h!==M.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,f=M,h=M.version,d=s.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,v){x.getRGB(Cr,Bd(s)),n.buffers.color.setClear(Cr.r,Cr.g,Cr.b,v,r)}return{getClearColor:function(){return a},setClearColor:function(x,v=1){a.set(x),c=v,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,m(a,c)},render:y,addToRenderList:p}}function Bg(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=h(null);let o=i,r=!1;function a(_,w,L,I,U){let F=!1;const N=f(I,L,w);o!==N&&(o=N,l(o.object)),F=d(_,I,L,U),F&&g(_,I,L,U),U!==null&&t.update(U,s.ELEMENT_ARRAY_BUFFER),(F||r)&&(r=!1,M(_,w,L,I),U!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function c(){return s.createVertexArray()}function l(_){return s.bindVertexArray(_)}function u(_){return s.deleteVertexArray(_)}function f(_,w,L){const I=L.wireframe===!0;let U=n[_.id];U===void 0&&(U={},n[_.id]=U);let F=U[w.id];F===void 0&&(F={},U[w.id]=F);let N=F[I];return N===void 0&&(N=h(c()),F[I]=N),N}function h(_){const w=[],L=[],I=[];for(let U=0;U<e;U++)w[U]=0,L[U]=0,I[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:L,attributeDivisors:I,object:_,attributes:{},index:null}}function d(_,w,L,I){const U=o.attributes,F=w.attributes;let N=0;const G=L.getAttributes();for(const z in G)if(G[z].location>=0){const $=U[z];let et=F[z];if(et===void 0&&(z==="instanceMatrix"&&_.instanceMatrix&&(et=_.instanceMatrix),z==="instanceColor"&&_.instanceColor&&(et=_.instanceColor)),$===void 0||$.attribute!==et||et&&$.data!==et.data)return!0;N++}return o.attributesNum!==N||o.index!==I}function g(_,w,L,I){const U={},F=w.attributes;let N=0;const G=L.getAttributes();for(const z in G)if(G[z].location>=0){let $=F[z];$===void 0&&(z==="instanceMatrix"&&_.instanceMatrix&&($=_.instanceMatrix),z==="instanceColor"&&_.instanceColor&&($=_.instanceColor));const et={};et.attribute=$,$&&$.data&&(et.data=$.data),U[z]=et,N++}o.attributes=U,o.attributesNum=N,o.index=I}function y(){const _=o.newAttributes;for(let w=0,L=_.length;w<L;w++)_[w]=0}function p(_){m(_,0)}function m(_,w){const L=o.newAttributes,I=o.enabledAttributes,U=o.attributeDivisors;L[_]=1,I[_]===0&&(s.enableVertexAttribArray(_),I[_]=1),U[_]!==w&&(s.vertexAttribDivisor(_,w),U[_]=w)}function x(){const _=o.newAttributes,w=o.enabledAttributes;for(let L=0,I=w.length;L<I;L++)w[L]!==_[L]&&(s.disableVertexAttribArray(L),w[L]=0)}function v(_,w,L,I,U,F,N){N===!0?s.vertexAttribIPointer(_,w,L,U,F):s.vertexAttribPointer(_,w,L,I,U,F)}function M(_,w,L,I){y();const U=I.attributes,F=L.getAttributes(),N=w.defaultAttributeValues;for(const G in F){const z=F[G];if(z.location>=0){let q=U[G];if(q===void 0&&(G==="instanceMatrix"&&_.instanceMatrix&&(q=_.instanceMatrix),G==="instanceColor"&&_.instanceColor&&(q=_.instanceColor)),q!==void 0){const $=q.normalized,et=q.itemSize,J=t.get(q);if(J===void 0)continue;const At=J.buffer,j=J.type,st=J.bytesPerElement,gt=j===s.INT||j===s.UNSIGNED_INT||q.gpuType===Bl;if(q.isInterleavedBufferAttribute){const ot=q.data,vt=ot.stride,nt=q.offset;if(ot.isInstancedInterleavedBuffer){for(let bt=0;bt<z.locationSize;bt++)m(z.location+bt,ot.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let bt=0;bt<z.locationSize;bt++)p(z.location+bt);s.bindBuffer(s.ARRAY_BUFFER,At);for(let bt=0;bt<z.locationSize;bt++)v(z.location+bt,et/z.locationSize,j,$,vt*st,(nt+et/z.locationSize*bt)*st,gt)}else{if(q.isInstancedBufferAttribute){for(let ot=0;ot<z.locationSize;ot++)m(z.location+ot,q.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let ot=0;ot<z.locationSize;ot++)p(z.location+ot);s.bindBuffer(s.ARRAY_BUFFER,At);for(let ot=0;ot<z.locationSize;ot++)v(z.location+ot,et/z.locationSize,j,$,et*st,et/z.locationSize*ot*st,gt)}}else if(N!==void 0){const $=N[G];if($!==void 0)switch($.length){case 2:s.vertexAttrib2fv(z.location,$);break;case 3:s.vertexAttrib3fv(z.location,$);break;case 4:s.vertexAttrib4fv(z.location,$);break;default:s.vertexAttrib1fv(z.location,$)}}}}x()}function T(){C();for(const _ in n){const w=n[_];for(const L in w){const I=w[L];for(const U in I)u(I[U].object),delete I[U];delete w[L]}delete n[_]}}function b(_){if(n[_.id]===void 0)return;const w=n[_.id];for(const L in w){const I=w[L];for(const U in I)u(I[U].object),delete I[U];delete w[L]}delete n[_.id]}function E(_){for(const w in n){const L=n[w];if(L[_.id]===void 0)continue;const I=L[_.id];for(const U in I)u(I[U].object),delete I[U];delete L[_.id]}}function C(){R(),r=!0,o!==i&&(o=i,l(o.object))}function R(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:C,resetDefaultState:R,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfProgram:E,initAttributes:y,enableAttribute:p,disableUnusedAttributes:x}}function kg(s,t,e){let n;function i(l){n=l}function o(l,u){s.drawArrays(n,l,u),e.update(u,n,1)}function r(l,u,f){f!==0&&(s.drawArraysInstanced(n,l,u,f),e.update(u,n,f))}function a(l,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];e.update(d,n,1)}function c(l,u,f,h){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)r(l[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,h,0,f);let g=0;for(let y=0;y<f;y++)g+=u[y];for(let y=0;y<h.length;y++)e.update(g,n,h[y])}}this.setMode=i,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Hg(s,t,e,n){let i;function o(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(E){return!(E!==Zn&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const C=E===sr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==Di&&n.convert(E)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Ri&&!C)}function c(E){if(E==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(h===!0){const E=t.get("EXT_clip_control");E.clipControlEXT(E.LOWER_LEFT_EXT,E.ZERO_TO_ONE_EXT)}const d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),v=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,b=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:x,maxVaryings:v,maxFragmentUniforms:M,vertexTextures:T,maxSamples:b}}function Gg(s){const t=this;let e=null,n=0,i=!1,o=!1;const r=new gs,a=new Qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||n!==0||i;return i=h,n=f.length,d},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,y=f.clipIntersection,p=f.clipShadows,m=s.get(f);if(!i||g===null||g.length===0||o&&!p)o?u(null):l();else{const x=o?0:n,v=x*4;let M=m.clippingState||null;c.value=M,M=u(g,h,v,d);for(let T=0;T!==v;++T)M[T]=e[T];m.clippingState=M,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,h,d,g){const y=f!==null?f.length:0;let p=null;if(y!==0){if(p=c.value,g!==!0||p===null){const m=d+y*4,x=h.matrixWorldInverse;a.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,M=d;v!==y;++v,M+=4)r.copy(f[v]).applyMatrix4(x,a),r.normal.toArray(p,M),p[M+3]=r.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,p}}function Vg(s){let t=new WeakMap;function e(r,a){return a===Xc?r.mapping=fo:a===Yc&&(r.mapping=po),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===Xc||a===Yc)if(t.has(r)){const c=t.get(r).texture;return e(c,r.mapping)}else{const c=r.image;if(c&&c.height>0){const l=new tm(c.height);return l.fromEquirectangularTexture(s,r),t.set(r,l),r.addEventListener("dispose",i),e(l.texture,r.mapping)}else return null}}return r}function i(r){const a=r.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class Vd extends kd{constructor(t=-1,e=1,n=1,i=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let o=n-t,r=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,r=o+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const eo=4,Vu=[.125,.215,.35,.446,.526,.582],_s=20,ic=new Vd,Wu=new ie;let sc=null,oc=0,rc=0,ac=!1;const vs=(1+Math.sqrt(5))/2,js=1/vs,qu=[new B(-vs,js,0),new B(vs,js,0),new B(-js,0,vs),new B(js,0,vs),new B(0,vs,-js),new B(0,vs,js),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)];class Sl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){sc=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),rc=this._renderer.getActiveMipmapLevel(),ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,i,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ju(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(sc,oc,rc),this._renderer.xr.enabled=ac,t.scissorTest=!1,Rr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===fo||t.mapping===po?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),sc=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),rc=this._renderer.getActiveMipmapLevel(),ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:jn,minFilter:jn,generateMipmaps:!1,type:sr,format:Zn,colorSpace:os,depthBuffer:!1},i=Xu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xu(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Wg(o)),this._blurMaterial=qg(o,t,e)}return i}_compileMaterial(t){const e=new Nt(this._lodPlanes[0],t);this._renderer.compile(e,ic)}_sceneToCubeUV(t,e,n,i){const a=new Tn(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(Wu),u.toneMapping=Ji,u.autoClear=!1;const d=new hn({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1}),g=new Nt(new li,d);let y=!1;const p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,y=!0):(d.color.copy(Wu),y=!0);for(let m=0;m<6;m++){const x=m%3;x===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):x===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));const v=this._cubeSize;Rr(i,x*v,m>2?v:0,v,v),u.setRenderTarget(i),y&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=f,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===fo||t.mapping===po;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=ju()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yu());const o=i?this._cubemapMaterial:this._equirectMaterial,r=new Nt(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const c=this._cubeSize;Rr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(r,ic)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let o=1;o<i;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=qu[(i-o-1)%qu.length];this._blur(t,o-1,o,r,a)}e.autoClear=n}_blur(t,e,n,i,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,i,"latitudinal",o),this._halfBlur(r,t,n,n,i,"longitudinal",o)}_halfBlur(t,e,n,i,o,r,a){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Nt(this._lodPlanes[i],l),h=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(o)?Math.PI/(2*d):2*Math.PI/(2*_s-1),y=o/g,p=isFinite(o)?1+Math.floor(u*y):_s;p>_s&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${_s}`);const m=[];let x=0;for(let E=0;E<_s;++E){const C=E/y,R=Math.exp(-C*C/2);m.push(R),E===0?x+=R:E<p&&(x+=2*R)}for(let E=0;E<m.length;E++)m[E]=m[E]/x;h.envMap.value=t.texture,h.samples.value=p,h.weights.value=m,h.latitudinal.value=r==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:v}=this;h.dTheta.value=g,h.mipInt.value=v-n;const M=this._sizeLods[i],T=3*M*(i>v-eo?i-v+eo:0),b=4*(this._cubeSize-M);Rr(e,T,b,3*M,2*M),c.setRenderTarget(e),c.render(f,ic)}}function Wg(s){const t=[],e=[],n=[];let i=s;const o=s-eo+1+Vu.length;for(let r=0;r<o;r++){const a=Math.pow(2,i);e.push(a);let c=1/a;r>s-eo?c=Vu[r-s+eo-1]:r===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,f=1+l,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,y=3,p=2,m=1,x=new Float32Array(y*g*d),v=new Float32Array(p*g*d),M=new Float32Array(m*g*d);for(let b=0;b<d;b++){const E=b%3*2/3-1,C=b>2?0:-1,R=[E,C,0,E+2/3,C,0,E+2/3,C+1,0,E,C,0,E+2/3,C+1,0,E,C+1,0];x.set(R,y*g*b),v.set(h,p*g*b);const _=[b,b,b,b,b,b];M.set(_,m*g*b)}const T=new An;T.setAttribute("position",new ci(x,y)),T.setAttribute("uv",new ci(v,p)),T.setAttribute("faceIndex",new ci(M,m)),t.push(T),i>eo&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Xu(s,t,e){const n=new Rs(s,t,e);return n.texture.mapping=Ma,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Rr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function qg(s,t,e){const n=new Float32Array(_s),i=new B(0,1,0);return new ns({name:"SphericalGaussianBlur",defines:{n:_s,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:jl(),fragmentShader:`

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
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function Yu(){return new ns({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jl(),fragmentShader:`

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
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function ju(){return new ns({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function jl(){return`

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
	`}function Xg(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Xc||c===Yc,u=c===fo||c===po;if(l||u){let f=t.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new Sl(s)),f=l?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const d=a.image;return l&&d&&d.height>0||u&&d&&i(d)?(e===null&&(e=new Sl(s)),f=l?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",o),f.texture):null}}}return a}function i(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function o(a){const c=a.target;c.removeEventListener("dispose",o);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function Yg(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Jr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function jg(s,t,e,n){const i={},o=new WeakMap;function r(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);for(const g in h.morphAttributes){const y=h.morphAttributes[g];for(let p=0,m=y.length;p<m;p++)t.remove(y[p])}h.removeEventListener("dispose",r),delete i[h.id];const d=o.get(h);d&&(t.remove(d),o.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return i[h.id]===!0||(h.addEventListener("dispose",r),i[h.id]=!0,e.memory.geometries++),h}function c(f){const h=f.attributes;for(const g in h)t.update(h[g],s.ARRAY_BUFFER);const d=f.morphAttributes;for(const g in d){const y=d[g];for(let p=0,m=y.length;p<m;p++)t.update(y[p],s.ARRAY_BUFFER)}}function l(f){const h=[],d=f.index,g=f.attributes.position;let y=0;if(d!==null){const x=d.array;y=d.version;for(let v=0,M=x.length;v<M;v+=3){const T=x[v+0],b=x[v+1],E=x[v+2];h.push(T,b,b,E,E,T)}}else if(g!==void 0){const x=g.array;y=g.version;for(let v=0,M=x.length/3-1;v<M;v+=3){const T=v+0,b=v+1,E=v+2;h.push(T,b,b,E,E,T)}}else return;const p=new(Ld(h)?Od:zd)(h,1);p.version=y;const m=o.get(f);m&&t.remove(m),o.set(f,p)}function u(f){const h=o.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&l(f)}else l(f);return o.get(f)}return{get:a,update:c,getWireframeAttribute:u}}function $g(s,t,e){let n;function i(h){n=h}let o,r;function a(h){o=h.type,r=h.bytesPerElement}function c(h,d){s.drawElements(n,d,o,h*r),e.update(d,n,1)}function l(h,d,g){g!==0&&(s.drawElementsInstanced(n,d,o,h*r,g),e.update(d,n,g))}function u(h,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,o,h,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];e.update(p,n,1)}function f(h,d,g,y){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<h.length;m++)l(h[m]/r,d[m],y[m]);else{p.multiDrawElementsInstancedWEBGL(n,d,0,o,h,0,y,0,g);let m=0;for(let x=0;x<g;x++)m+=d[x];for(let x=0;x<y.length;x++)e.update(m,n,y[x])}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function Kg(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,r,a){switch(e.calls++,r){case s.TRIANGLES:e.triangles+=a*(o/3);break;case s.LINES:e.lines+=a*(o/2);break;case s.LINE_STRIP:e.lines+=a*(o-1);break;case s.LINE_LOOP:e.lines+=a*o;break;case s.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Zg(s,t,e){const n=new WeakMap,i=new me;function o(r,a,c){const l=r.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(a);if(h===void 0||h.count!==f){let _=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",_)};var d=_;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let M=0;g===!0&&(M=1),y===!0&&(M=2),p===!0&&(M=3);let T=a.attributes.position.count*M,b=1;T>t.maxTextureSize&&(b=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const E=new Float32Array(T*b*4*f),C=new Nd(E,T,b,f);C.type=Ri,C.needsUpdate=!0;const R=M*4;for(let w=0;w<f;w++){const L=m[w],I=x[w],U=v[w],F=T*b*4*w;for(let N=0;N<L.count;N++){const G=N*R;g===!0&&(i.fromBufferAttribute(L,N),E[F+G+0]=i.x,E[F+G+1]=i.y,E[F+G+2]=i.z,E[F+G+3]=0),y===!0&&(i.fromBufferAttribute(I,N),E[F+G+4]=i.x,E[F+G+5]=i.y,E[F+G+6]=i.z,E[F+G+7]=0),p===!0&&(i.fromBufferAttribute(U,N),E[F+G+8]=i.x,E[F+G+9]=i.y,E[F+G+10]=i.z,E[F+G+11]=U.itemSize===4?i.w:1)}}h={count:f,texture:C,size:new Lt(T,b)},n.set(a,h),a.addEventListener("dispose",_)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",r.morphTexture,e);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const y=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(s,"morphTargetBaseInfluence",y),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",h.size)}return{update:o}}function Jg(s,t,e,n){let i=new WeakMap;function o(c){const l=n.render.frame,u=c.geometry,f=t.get(c,u);if(i.get(f)!==l&&(t.update(f),i.set(f,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;i.get(h)!==l&&(h.update(),i.set(h,l))}return f}function r(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:o,dispose:r}}class Wd extends mn{constructor(t,e,n,i,o,r,a,c,l,u=ao){if(u!==ao&&u!==go)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ao&&(n=Cs),n===void 0&&u===go&&(n=mo),super(null,i,o,r,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Bn,this.minFilter=c!==void 0?c:Bn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const qd=new mn,$u=new Wd(1,1),Xd=new Nd,Yd=new zp,jd=new Hd,Ku=[],Zu=[],Ju=new Float32Array(16),Qu=new Float32Array(9),th=new Float32Array(4);function Ao(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let o=Ku[i];if(o===void 0&&(o=new Float32Array(i),Ku[i]=o),t!==0){n.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,s[r].toArray(o,a)}return o}function We(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function qe(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function wa(s,t){let e=Zu[t];e===void 0&&(e=new Int32Array(t),Zu[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Qg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function tv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;s.uniform2fv(this.addr,t),qe(e,t)}}function ev(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(We(e,t))return;s.uniform3fv(this.addr,t),qe(e,t)}}function nv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;s.uniform4fv(this.addr,t),qe(e,t)}}function iv(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),qe(e,t)}else{if(We(e,n))return;th.set(n),s.uniformMatrix2fv(this.addr,!1,th),qe(e,n)}}function sv(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),qe(e,t)}else{if(We(e,n))return;Qu.set(n),s.uniformMatrix3fv(this.addr,!1,Qu),qe(e,n)}}function ov(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),qe(e,t)}else{if(We(e,n))return;Ju.set(n),s.uniformMatrix4fv(this.addr,!1,Ju),qe(e,n)}}function rv(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function av(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;s.uniform2iv(this.addr,t),qe(e,t)}}function cv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;s.uniform3iv(this.addr,t),qe(e,t)}}function lv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;s.uniform4iv(this.addr,t),qe(e,t)}}function uv(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function hv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;s.uniform2uiv(this.addr,t),qe(e,t)}}function dv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;s.uniform3uiv(this.addr,t),qe(e,t)}}function fv(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;s.uniform4uiv(this.addr,t),qe(e,t)}}function pv(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let o;this.type===s.SAMPLER_2D_SHADOW?($u.compareFunction=Id,o=$u):o=qd,e.setTexture2D(t||o,i)}function mv(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Yd,i)}function gv(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||jd,i)}function vv(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Xd,i)}function xv(s){switch(s){case 5126:return Qg;case 35664:return tv;case 35665:return ev;case 35666:return nv;case 35674:return iv;case 35675:return sv;case 35676:return ov;case 5124:case 35670:return rv;case 35667:case 35671:return av;case 35668:case 35672:return cv;case 35669:case 35673:return lv;case 5125:return uv;case 36294:return hv;case 36295:return dv;case 36296:return fv;case 35678:case 36198:case 36298:case 36306:case 35682:return pv;case 35679:case 36299:case 36307:return mv;case 35680:case 36300:case 36308:case 36293:return gv;case 36289:case 36303:case 36311:case 36292:return vv}}function _v(s,t){s.uniform1fv(this.addr,t)}function yv(s,t){const e=Ao(t,this.size,2);s.uniform2fv(this.addr,e)}function Mv(s,t){const e=Ao(t,this.size,3);s.uniform3fv(this.addr,e)}function Sv(s,t){const e=Ao(t,this.size,4);s.uniform4fv(this.addr,e)}function wv(s,t){const e=Ao(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Ev(s,t){const e=Ao(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function bv(s,t){const e=Ao(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Tv(s,t){s.uniform1iv(this.addr,t)}function Av(s,t){s.uniform2iv(this.addr,t)}function Cv(s,t){s.uniform3iv(this.addr,t)}function Rv(s,t){s.uniform4iv(this.addr,t)}function Pv(s,t){s.uniform1uiv(this.addr,t)}function Iv(s,t){s.uniform2uiv(this.addr,t)}function Lv(s,t){s.uniform3uiv(this.addr,t)}function Dv(s,t){s.uniform4uiv(this.addr,t)}function Nv(s,t,e){const n=this.cache,i=t.length,o=wa(e,i);We(n,o)||(s.uniform1iv(this.addr,o),qe(n,o));for(let r=0;r!==i;++r)e.setTexture2D(t[r]||qd,o[r])}function Uv(s,t,e){const n=this.cache,i=t.length,o=wa(e,i);We(n,o)||(s.uniform1iv(this.addr,o),qe(n,o));for(let r=0;r!==i;++r)e.setTexture3D(t[r]||Yd,o[r])}function Fv(s,t,e){const n=this.cache,i=t.length,o=wa(e,i);We(n,o)||(s.uniform1iv(this.addr,o),qe(n,o));for(let r=0;r!==i;++r)e.setTextureCube(t[r]||jd,o[r])}function zv(s,t,e){const n=this.cache,i=t.length,o=wa(e,i);We(n,o)||(s.uniform1iv(this.addr,o),qe(n,o));for(let r=0;r!==i;++r)e.setTexture2DArray(t[r]||Xd,o[r])}function Ov(s){switch(s){case 5126:return _v;case 35664:return yv;case 35665:return Mv;case 35666:return Sv;case 35674:return wv;case 35675:return Ev;case 35676:return bv;case 5124:case 35670:return Tv;case 35667:case 35671:return Av;case 35668:case 35672:return Cv;case 35669:case 35673:return Rv;case 5125:return Pv;case 36294:return Iv;case 36295:return Lv;case 36296:return Dv;case 35678:case 36198:case 36298:case 36306:case 35682:return Nv;case 35679:case 36299:case 36307:return Uv;case 35680:case 36300:case 36308:case 36293:return Fv;case 36289:case 36303:case 36311:case 36292:return zv}}class Bv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=xv(e.type)}}class kv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ov(e.type)}}class Hv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let o=0,r=i.length;o!==r;++o){const a=i[o];a.setValue(t,e[a.id],n)}}}const cc=/(\w+)(\])?(\[|\.)?/g;function eh(s,t){s.seq.push(t),s.map[t.id]=t}function Gv(s,t,e){const n=s.name,i=n.length;for(cc.lastIndex=0;;){const o=cc.exec(n),r=cc.lastIndex;let a=o[1];const c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&r+2===i){eh(e,l===void 0?new Bv(a,s,t):new kv(a,s,t));break}else{let f=e.map[a];f===void 0&&(f=new Hv(a),eh(e,f)),e=f}}}class Qr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const o=t.getActiveUniform(e,i),r=t.getUniformLocation(e,o.name);Gv(o,r,this)}}setValue(t,e,n,i){const o=this.map[e];o!==void 0&&o.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let o=0,r=e.length;o!==r;++o){const a=e[o],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,o=t.length;i!==o;++i){const r=t[i];r.id in e&&n.push(r)}return n}}function nh(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Vv=37297;let Wv=0;function qv(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=i;r<o;r++){const a=r+1;n.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return n.join(`
`)}function Xv(s){const t=de.getPrimaries(de.workingColorSpace),e=de.getPrimaries(s);let n;switch(t===e?n="":t===la&&e===ca?n="LinearDisplayP3ToLinearSRGB":t===ca&&e===la&&(n="LinearSRGBToLinearDisplayP3"),s){case os:case Sa:return[n,"LinearTransferOETF"];case Fn:case ql:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function ih(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const o=/ERROR: 0:(\d+)/.exec(i);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+i+`

`+qv(s.getShaderSource(t),r)}else return i}function Yv(s,t){const e=Xv(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function jv(s,t){let e;switch(t){case up:e="Linear";break;case hp:e="Reinhard";break;case dp:e="Cineon";break;case fp:e="ACESFilmic";break;case mp:e="AgX";break;case xd:e="Neutral";break;case pp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Pr=new B;function $v(){de.getLuminanceCoefficients(Pr);const s=Pr.x.toFixed(4),t=Pr.y.toFixed(4),e=Pr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Kv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qo).join(`
`)}function Zv(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Jv(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const o=s.getActiveAttrib(t,i),r=o.name;let a=1;o.type===s.FLOAT_MAT2&&(a=2),o.type===s.FLOAT_MAT3&&(a=3),o.type===s.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:s.getAttribLocation(t,r),locationSize:a}}return e}function qo(s){return s!==""}function sh(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function oh(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Qv=/^[ \t]*#include +<([\w\d./]+)>/gm;function wl(s){return s.replace(Qv,ex)}const tx=new Map;function ex(s,t){let e=Jt[t];if(e===void 0){const n=tx.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return wl(e)}const nx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rh(s){return s.replace(nx,ix)}function ix(s,t,e,n){let i="";for(let o=parseInt(t);o<parseInt(e);o++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return i}function ah(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function sx(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===md?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===gd?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Ti&&(t="SHADOWMAP_TYPE_VSM"),t}function ox(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case fo:case po:t="ENVMAP_TYPE_CUBE";break;case Ma:t="ENVMAP_TYPE_CUBE_UV";break}return t}function rx(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case po:t="ENVMAP_MODE_REFRACTION";break}return t}function ax(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case vd:t="ENVMAP_BLENDING_MULTIPLY";break;case cp:t="ENVMAP_BLENDING_MIX";break;case lp:t="ENVMAP_BLENDING_ADD";break}return t}function cx(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function lx(s,t,e,n){const i=s.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const c=sx(e),l=ox(e),u=rx(e),f=ax(e),h=cx(e),d=Kv(e),g=Zv(o),y=i.createProgram();let p,m,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(qo).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(qo).join(`
`),m.length>0&&(m+=`
`)):(p=[ah(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qo).join(`
`),m=[ah(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ji?"#define TONE_MAPPING":"",e.toneMapping!==Ji?Jt.tonemapping_pars_fragment:"",e.toneMapping!==Ji?jv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,Yv("linearToOutputTexel",e.outputColorSpace),$v(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(qo).join(`
`)),r=wl(r),r=sh(r,e),r=oh(r,e),a=wl(a),a=sh(a,e),a=oh(a,e),r=rh(r),a=rh(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===bu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===bu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=x+p+r,M=x+m+a,T=nh(i,i.VERTEX_SHADER,v),b=nh(i,i.FRAGMENT_SHADER,M);i.attachShader(y,T),i.attachShader(y,b),e.index0AttributeName!==void 0?i.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function E(w){if(s.debug.checkShaderErrors){const L=i.getProgramInfoLog(y).trim(),I=i.getShaderInfoLog(T).trim(),U=i.getShaderInfoLog(b).trim();let F=!0,N=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(F=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,y,T,b);else{const G=ih(i,T,"vertex"),z=ih(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+L+`
`+G+`
`+z)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(I===""||U==="")&&(N=!1);N&&(w.diagnostics={runnable:F,programLog:L,vertexShader:{log:I,prefix:p},fragmentShader:{log:U,prefix:m}})}i.deleteShader(T),i.deleteShader(b),C=new Qr(i,y),R=Jv(i,y)}let C;this.getUniforms=function(){return C===void 0&&E(this),C};let R;this.getAttributes=function(){return R===void 0&&E(this),R};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=i.getProgramParameter(y,Vv)),_},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Wv++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=T,this.fragmentShader=b,this}let ux=0;class hx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),o=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new dx(t),e.set(t,n)),n}}class dx{constructor(t){this.id=ux++,this.code=t,this.usedTimes=0}}function fx(s,t,e,n,i,o,r){const a=new Ud,c=new hx,l=new Set,u=[],f=i.logarithmicDepthBuffer,h=i.reverseDepthBuffer,d=i.vertexTextures;let g=i.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return l.add(_),_===0?"uv":`uv${_}`}function m(_,w,L,I,U){const F=I.fog,N=U.geometry,G=_.isMeshStandardMaterial?I.environment:null,z=(_.isMeshStandardMaterial?e:t).get(_.envMap||G),q=z&&z.mapping===Ma?z.image.height:null,$=y[_.type];_.precision!==null&&(g=i.getMaxPrecision(_.precision),g!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",g,"instead."));const et=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,J=et!==void 0?et.length:0;let At=0;N.morphAttributes.position!==void 0&&(At=1),N.morphAttributes.normal!==void 0&&(At=2),N.morphAttributes.color!==void 0&&(At=3);let j,st,gt,ot;if($){const Xe=si[$];j=Xe.vertexShader,st=Xe.fragmentShader}else j=_.vertexShader,st=_.fragmentShader,c.update(_),gt=c.getVertexShaderID(_),ot=c.getFragmentShaderID(_);const vt=s.getRenderTarget(),nt=U.isInstancedMesh===!0,bt=U.isBatchedMesh===!0,It=!!_.map,kt=!!_.matcap,O=!!z,_e=!!_.aoMap,Xt=!!_.lightMap,$t=!!_.bumpMap,Ct=!!_.normalMap,te=!!_.displacementMap,Ot=!!_.emissiveMap,D=!!_.metalnessMap,A=!!_.roughnessMap,Y=_.anisotropy>0,tt=_.clearcoat>0,ht=_.dispersion>0,at=_.iridescence>0,zt=_.sheen>0,mt=_.transmission>0,wt=Y&&!!_.anisotropyMap,Yt=tt&&!!_.clearcoatMap,ft=tt&&!!_.clearcoatNormalMap,X=tt&&!!_.clearcoatRoughnessMap,rt=at&&!!_.iridescenceMap,dt=at&&!!_.iridescenceThicknessMap,ut=zt&&!!_.sheenColorMap,Rt=zt&&!!_.sheenRoughnessMap,_t=!!_.specularMap,jt=!!_.specularColorMap,H=!!_.specularIntensityMap,St=mt&&!!_.transmissionMap,Q=mt&&!!_.thicknessMap,ct=!!_.gradientMap,Mt=!!_.alphaMap,yt=_.alphaTest>0,ee=!!_.alphaHash,Re=!!_.extensions;let ke=Ji;_.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(ke=s.toneMapping);const ne={shaderID:$,shaderType:_.type,shaderName:_.name,vertexShader:j,fragmentShader:st,defines:_.defines,customVertexShaderID:gt,customFragmentShaderID:ot,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:g,batching:bt,batchingColor:bt&&U._colorsTexture!==null,instancing:nt,instancingColor:nt&&U.instanceColor!==null,instancingMorph:nt&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:vt===null?s.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:os,alphaToCoverage:!!_.alphaToCoverage,map:It,matcap:kt,envMap:O,envMapMode:O&&z.mapping,envMapCubeUVHeight:q,aoMap:_e,lightMap:Xt,bumpMap:$t,normalMap:Ct,displacementMap:d&&te,emissiveMap:Ot,normalMapObjectSpace:Ct&&_.normalMapType===_p,normalMapTangentSpace:Ct&&_.normalMapType===Pd,metalnessMap:D,roughnessMap:A,anisotropy:Y,anisotropyMap:wt,clearcoat:tt,clearcoatMap:Yt,clearcoatNormalMap:ft,clearcoatRoughnessMap:X,dispersion:ht,iridescence:at,iridescenceMap:rt,iridescenceThicknessMap:dt,sheen:zt,sheenColorMap:ut,sheenRoughnessMap:Rt,specularMap:_t,specularColorMap:jt,specularIntensityMap:H,transmission:mt,transmissionMap:St,thicknessMap:Q,gradientMap:ct,opaque:_.transparent===!1&&_.blending===ro&&_.alphaToCoverage===!1,alphaMap:Mt,alphaTest:yt,alphaHash:ee,combine:_.combine,mapUv:It&&p(_.map.channel),aoMapUv:_e&&p(_.aoMap.channel),lightMapUv:Xt&&p(_.lightMap.channel),bumpMapUv:$t&&p(_.bumpMap.channel),normalMapUv:Ct&&p(_.normalMap.channel),displacementMapUv:te&&p(_.displacementMap.channel),emissiveMapUv:Ot&&p(_.emissiveMap.channel),metalnessMapUv:D&&p(_.metalnessMap.channel),roughnessMapUv:A&&p(_.roughnessMap.channel),anisotropyMapUv:wt&&p(_.anisotropyMap.channel),clearcoatMapUv:Yt&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:ft&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:X&&p(_.clearcoatRoughnessMap.channel),iridescenceMapUv:rt&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:dt&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&p(_.sheenRoughnessMap.channel),specularMapUv:_t&&p(_.specularMap.channel),specularColorMapUv:jt&&p(_.specularColorMap.channel),specularIntensityMapUv:H&&p(_.specularIntensityMap.channel),transmissionMapUv:St&&p(_.transmissionMap.channel),thicknessMapUv:Q&&p(_.thicknessMap.channel),alphaMapUv:Mt&&p(_.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Ct||Y),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!N.attributes.uv&&(It||Mt),fog:!!F,useFog:_.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:h,skinning:U.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:At,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:ke,decodeVideoTexture:It&&_.map.isVideoTexture===!0&&de.getTransfer(_.map.colorSpace)===Ee,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===zn,flipSided:_.side===en,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Re&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&_.extensions.multiDraw===!0||bt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return ne.vertexUv1s=l.has(1),ne.vertexUv2s=l.has(2),ne.vertexUv3s=l.has(3),l.clear(),ne}function x(_){const w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(const L in _.defines)w.push(L),w.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(v(w,_),M(w,_),w.push(s.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function v(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function M(_,w){a.disableAll(),w.supportsVertexTextures&&a.enable(0),w.instancing&&a.enable(1),w.instancingColor&&a.enable(2),w.instancingMorph&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),w.dispersion&&a.enable(20),w.batchingColor&&a.enable(21),_.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.reverseDepthBuffer&&a.enable(4),w.skinning&&a.enable(5),w.morphTargets&&a.enable(6),w.morphNormals&&a.enable(7),w.morphColors&&a.enable(8),w.premultipliedAlpha&&a.enable(9),w.shadowMapEnabled&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),w.alphaToCoverage&&a.enable(20),_.push(a.mask)}function T(_){const w=y[_.type];let L;if(w){const I=si[w];L=Kp.clone(I.uniforms)}else L=_.uniforms;return L}function b(_,w){let L;for(let I=0,U=u.length;I<U;I++){const F=u[I];if(F.cacheKey===w){L=F,++L.usedTimes;break}}return L===void 0&&(L=new lx(s,w,_,o),u.push(L)),L}function E(_){if(--_.usedTimes===0){const w=u.indexOf(_);u[w]=u[u.length-1],u.pop(),_.destroy()}}function C(_){c.remove(_)}function R(){c.dispose()}return{getParameters:m,getProgramCacheKey:x,getUniforms:T,acquireProgram:b,releaseProgram:E,releaseShaderCache:C,programs:u,dispose:R}}function px(){let s=new WeakMap;function t(r){return s.has(r)}function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function n(r){s.delete(r)}function i(r,a,c){s.get(r)[a]=c}function o(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:o}}function mx(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function ch(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function lh(){const s=[];let t=0;const e=[],n=[],i=[];function o(){t=0,e.length=0,n.length=0,i.length=0}function r(f,h,d,g,y,p){let m=s[t];return m===void 0?(m={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:y,group:p},s[t]=m):(m.id=f.id,m.object=f,m.geometry=h,m.material=d,m.groupOrder=g,m.renderOrder=f.renderOrder,m.z=y,m.group=p),t++,m}function a(f,h,d,g,y,p){const m=r(f,h,d,g,y,p);d.transmission>0?n.push(m):d.transparent===!0?i.push(m):e.push(m)}function c(f,h,d,g,y,p){const m=r(f,h,d,g,y,p);d.transmission>0?n.unshift(m):d.transparent===!0?i.unshift(m):e.unshift(m)}function l(f,h){e.length>1&&e.sort(f||mx),n.length>1&&n.sort(h||ch),i.length>1&&i.sort(h||ch)}function u(){for(let f=t,h=s.length;f<h;f++){const d=s[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:o,push:a,unshift:c,finish:u,sort:l}}function gx(){let s=new WeakMap;function t(n,i){const o=s.get(n);let r;return o===void 0?(r=new lh,s.set(n,[r])):i>=o.length?(r=new lh,o.push(r)):r=o[i],r}function e(){s=new WeakMap}return{get:t,dispose:e}}function vx(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new B,color:new ie};break;case"SpotLight":e={position:new B,direction:new B,color:new ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new B,color:new ie,distance:0,decay:0};break;case"HemisphereLight":e={direction:new B,skyColor:new ie,groundColor:new ie};break;case"RectAreaLight":e={color:new ie,position:new B,halfWidth:new B,halfHeight:new B};break}return s[t.id]=e,e}}}function xx(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let _x=0;function yx(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Mx(s){const t=new vx,e=xx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new B);const i=new B,o=new Ce,r=new Ce;function a(l){let u=0,f=0,h=0;for(let R=0;R<9;R++)n.probe[R].set(0,0,0);let d=0,g=0,y=0,p=0,m=0,x=0,v=0,M=0,T=0,b=0,E=0;l.sort(yx);for(let R=0,_=l.length;R<_;R++){const w=l[R],L=w.color,I=w.intensity,U=w.distance,F=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)u+=L.r*I,f+=L.g*I,h+=L.b*I;else if(w.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(w.sh.coefficients[N],I);E++}else if(w.isDirectionalLight){const N=t.get(w);if(N.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const G=w.shadow,z=e.get(w);z.shadowIntensity=G.intensity,z.shadowBias=G.bias,z.shadowNormalBias=G.normalBias,z.shadowRadius=G.radius,z.shadowMapSize=G.mapSize,n.directionalShadow[d]=z,n.directionalShadowMap[d]=F,n.directionalShadowMatrix[d]=w.shadow.matrix,x++}n.directional[d]=N,d++}else if(w.isSpotLight){const N=t.get(w);N.position.setFromMatrixPosition(w.matrixWorld),N.color.copy(L).multiplyScalar(I),N.distance=U,N.coneCos=Math.cos(w.angle),N.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),N.decay=w.decay,n.spot[y]=N;const G=w.shadow;if(w.map&&(n.spotLightMap[T]=w.map,T++,G.updateMatrices(w),w.castShadow&&b++),n.spotLightMatrix[y]=G.matrix,w.castShadow){const z=e.get(w);z.shadowIntensity=G.intensity,z.shadowBias=G.bias,z.shadowNormalBias=G.normalBias,z.shadowRadius=G.radius,z.shadowMapSize=G.mapSize,n.spotShadow[y]=z,n.spotShadowMap[y]=F,M++}y++}else if(w.isRectAreaLight){const N=t.get(w);N.color.copy(L).multiplyScalar(I),N.halfWidth.set(w.width*.5,0,0),N.halfHeight.set(0,w.height*.5,0),n.rectArea[p]=N,p++}else if(w.isPointLight){const N=t.get(w);if(N.color.copy(w.color).multiplyScalar(w.intensity),N.distance=w.distance,N.decay=w.decay,w.castShadow){const G=w.shadow,z=e.get(w);z.shadowIntensity=G.intensity,z.shadowBias=G.bias,z.shadowNormalBias=G.normalBias,z.shadowRadius=G.radius,z.shadowMapSize=G.mapSize,z.shadowCameraNear=G.camera.near,z.shadowCameraFar=G.camera.far,n.pointShadow[g]=z,n.pointShadowMap[g]=F,n.pointShadowMatrix[g]=w.shadow.matrix,v++}n.point[g]=N,g++}else if(w.isHemisphereLight){const N=t.get(w);N.skyColor.copy(w.color).multiplyScalar(I),N.groundColor.copy(w.groundColor).multiplyScalar(I),n.hemi[m]=N,m++}}p>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Et.LTC_FLOAT_1,n.rectAreaLTC2=Et.LTC_FLOAT_2):(n.rectAreaLTC1=Et.LTC_HALF_1,n.rectAreaLTC2=Et.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const C=n.hash;(C.directionalLength!==d||C.pointLength!==g||C.spotLength!==y||C.rectAreaLength!==p||C.hemiLength!==m||C.numDirectionalShadows!==x||C.numPointShadows!==v||C.numSpotShadows!==M||C.numSpotMaps!==T||C.numLightProbes!==E)&&(n.directional.length=d,n.spot.length=y,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=M+T-b,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=E,C.directionalLength=d,C.pointLength=g,C.spotLength=y,C.rectAreaLength=p,C.hemiLength=m,C.numDirectionalShadows=x,C.numPointShadows=v,C.numSpotShadows=M,C.numSpotMaps=T,C.numLightProbes=E,n.version=_x++)}function c(l,u){let f=0,h=0,d=0,g=0,y=0;const p=u.matrixWorldInverse;for(let m=0,x=l.length;m<x;m++){const v=l[m];if(v.isDirectionalLight){const M=n.directional[f];M.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(p),f++}else if(v.isSpotLight){const M=n.spot[d];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(p),d++}else if(v.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(p),r.identity(),o.copy(v.matrixWorld),o.premultiply(p),r.extractRotation(o),M.halfWidth.set(v.width*.5,0,0),M.halfHeight.set(0,v.height*.5,0),M.halfWidth.applyMatrix4(r),M.halfHeight.applyMatrix4(r),g++}else if(v.isPointLight){const M=n.point[h];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(p),h++}else if(v.isHemisphereLight){const M=n.hemi[y];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(p),y++}}}return{setup:a,setupView:c,state:n}}function uh(s){const t=new Mx(s),e=[],n=[];function i(u){l.camera=u,e.length=0,n.length=0}function o(u){e.push(u)}function r(u){n.push(u)}function a(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:o,pushShadow:r}}function Sx(s){let t=new WeakMap;function e(i,o=0){const r=t.get(i);let a;return r===void 0?(a=new uh(s),t.set(i,[a])):o>=r.length?(a=new uh(s),r.push(a)):a=r[o],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class wx extends ar{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ex extends ar{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const bx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Tx=`uniform sampler2D shadow_pass;
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
}`;function Ax(s,t,e){let n=new Yl;const i=new Lt,o=new Lt,r=new me,a=new wx({depthPacking:xp}),c=new Ex,l={},u=e.maxTextureSize,f={[es]:en,[en]:es,[zn]:zn},h=new ns({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Lt},radius:{value:4}},vertexShader:bx,fragmentShader:Tx}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new An;g.setAttribute("position",new ci(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Nt(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=md;let m=this.type;this.render=function(b,E,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;const R=s.getRenderTarget(),_=s.getActiveCubeFace(),w=s.getActiveMipmapLevel(),L=s.state;L.setBlending(Zi),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const I=m!==Ti&&this.type===Ti,U=m===Ti&&this.type!==Ti;for(let F=0,N=b.length;F<N;F++){const G=b[F],z=G.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);const q=z.getFrameExtents();if(i.multiply(q),o.copy(z.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(o.x=Math.floor(u/q.x),i.x=o.x*q.x,z.mapSize.x=o.x),i.y>u&&(o.y=Math.floor(u/q.y),i.y=o.y*q.y,z.mapSize.y=o.y)),z.map===null||I===!0||U===!0){const et=this.type!==Ti?{minFilter:Bn,magFilter:Bn}:{};z.map!==null&&z.map.dispose(),z.map=new Rs(i.x,i.y,et),z.map.texture.name=G.name+".shadowMap",z.camera.updateProjectionMatrix()}s.setRenderTarget(z.map),s.clear();const $=z.getViewportCount();for(let et=0;et<$;et++){const J=z.getViewport(et);r.set(o.x*J.x,o.y*J.y,o.x*J.z,o.y*J.w),L.viewport(r),z.updateMatrices(G,et),n=z.getFrustum(),M(E,C,z.camera,G,this.type)}z.isPointLightShadow!==!0&&this.type===Ti&&x(z,C),z.needsUpdate=!1}m=this.type,p.needsUpdate=!1,s.setRenderTarget(R,_,w)};function x(b,E){const C=t.update(y);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Rs(i.x,i.y)),h.uniforms.shadow_pass.value=b.map.texture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,s.setRenderTarget(b.mapPass),s.clear(),s.renderBufferDirect(E,null,C,h,y,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,s.setRenderTarget(b.map),s.clear(),s.renderBufferDirect(E,null,C,d,y,null)}function v(b,E,C,R){let _=null;const w=C.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(w!==void 0)_=w;else if(_=C.isPointLight===!0?c:a,s.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const L=_.uuid,I=E.uuid;let U=l[L];U===void 0&&(U={},l[L]=U);let F=U[I];F===void 0&&(F=_.clone(),U[I]=F,E.addEventListener("dispose",T)),_=F}if(_.visible=E.visible,_.wireframe=E.wireframe,R===Ti?_.side=E.shadowSide!==null?E.shadowSide:E.side:_.side=E.shadowSide!==null?E.shadowSide:f[E.side],_.alphaMap=E.alphaMap,_.alphaTest=E.alphaTest,_.map=E.map,_.clipShadows=E.clipShadows,_.clippingPlanes=E.clippingPlanes,_.clipIntersection=E.clipIntersection,_.displacementMap=E.displacementMap,_.displacementScale=E.displacementScale,_.displacementBias=E.displacementBias,_.wireframeLinewidth=E.wireframeLinewidth,_.linewidth=E.linewidth,C.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const L=s.properties.get(_);L.light=C}return _}function M(b,E,C,R,_){if(b.visible===!1)return;if(b.layers.test(E.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&_===Ti)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,b.matrixWorld);const I=t.update(b),U=b.material;if(Array.isArray(U)){const F=I.groups;for(let N=0,G=F.length;N<G;N++){const z=F[N],q=U[z.materialIndex];if(q&&q.visible){const $=v(b,q,R,_);b.onBeforeShadow(s,b,E,C,I,$,z),s.renderBufferDirect(C,null,I,$,b,z),b.onAfterShadow(s,b,E,C,I,$,z)}}}else if(U.visible){const F=v(b,U,R,_);b.onBeforeShadow(s,b,E,C,I,F,null),s.renderBufferDirect(C,null,I,F,b,null),b.onAfterShadow(s,b,E,C,I,F,null)}}const L=b.children;for(let I=0,U=L.length;I<U;I++)M(L[I],E,C,R,_)}function T(b){b.target.removeEventListener("dispose",T);for(const C in l){const R=l[C],_=b.target.uuid;_ in R&&(R[_].dispose(),delete R[_])}}}const Cx={[Bc]:kc,[Hc]:Wc,[Gc]:qc,[ho]:Vc,[kc]:Bc,[Wc]:Hc,[qc]:Gc,[Vc]:ho};function Rx(s){function t(){let H=!1;const St=new me;let Q=null;const ct=new me(0,0,0,0);return{setMask:function(Mt){Q!==Mt&&!H&&(s.colorMask(Mt,Mt,Mt,Mt),Q=Mt)},setLocked:function(Mt){H=Mt},setClear:function(Mt,yt,ee,Re,ke){ke===!0&&(Mt*=Re,yt*=Re,ee*=Re),St.set(Mt,yt,ee,Re),ct.equals(St)===!1&&(s.clearColor(Mt,yt,ee,Re),ct.copy(St))},reset:function(){H=!1,Q=null,ct.set(-1,0,0,0)}}}function e(){let H=!1,St=!1,Q=null,ct=null,Mt=null;return{setReversed:function(yt){St=yt},setTest:function(yt){yt?gt(s.DEPTH_TEST):ot(s.DEPTH_TEST)},setMask:function(yt){Q!==yt&&!H&&(s.depthMask(yt),Q=yt)},setFunc:function(yt){if(St&&(yt=Cx[yt]),ct!==yt){switch(yt){case Bc:s.depthFunc(s.NEVER);break;case kc:s.depthFunc(s.ALWAYS);break;case Hc:s.depthFunc(s.LESS);break;case ho:s.depthFunc(s.LEQUAL);break;case Gc:s.depthFunc(s.EQUAL);break;case Vc:s.depthFunc(s.GEQUAL);break;case Wc:s.depthFunc(s.GREATER);break;case qc:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ct=yt}},setLocked:function(yt){H=yt},setClear:function(yt){Mt!==yt&&(s.clearDepth(yt),Mt=yt)},reset:function(){H=!1,Q=null,ct=null,Mt=null}}}function n(){let H=!1,St=null,Q=null,ct=null,Mt=null,yt=null,ee=null,Re=null,ke=null;return{setTest:function(ne){H||(ne?gt(s.STENCIL_TEST):ot(s.STENCIL_TEST))},setMask:function(ne){St!==ne&&!H&&(s.stencilMask(ne),St=ne)},setFunc:function(ne,Xe,sn){(Q!==ne||ct!==Xe||Mt!==sn)&&(s.stencilFunc(ne,Xe,sn),Q=ne,ct=Xe,Mt=sn)},setOp:function(ne,Xe,sn){(yt!==ne||ee!==Xe||Re!==sn)&&(s.stencilOp(ne,Xe,sn),yt=ne,ee=Xe,Re=sn)},setLocked:function(ne){H=ne},setClear:function(ne){ke!==ne&&(s.clearStencil(ne),ke=ne)},reset:function(){H=!1,St=null,Q=null,ct=null,Mt=null,yt=null,ee=null,Re=null,ke=null}}}const i=new t,o=new e,r=new n,a=new WeakMap,c=new WeakMap;let l={},u={},f=new WeakMap,h=[],d=null,g=!1,y=null,p=null,m=null,x=null,v=null,M=null,T=null,b=new ie(0,0,0),E=0,C=!1,R=null,_=null,w=null,L=null,I=null;const U=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,N=0;const G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(G)[1]),F=N>=1):G.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),F=N>=2);let z=null,q={};const $=s.getParameter(s.SCISSOR_BOX),et=s.getParameter(s.VIEWPORT),J=new me().fromArray($),At=new me().fromArray(et);function j(H,St,Q,ct){const Mt=new Uint8Array(4),yt=s.createTexture();s.bindTexture(H,yt),s.texParameteri(H,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(H,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ee=0;ee<Q;ee++)H===s.TEXTURE_3D||H===s.TEXTURE_2D_ARRAY?s.texImage3D(St,0,s.RGBA,1,1,ct,0,s.RGBA,s.UNSIGNED_BYTE,Mt):s.texImage2D(St+ee,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Mt);return yt}const st={};st[s.TEXTURE_2D]=j(s.TEXTURE_2D,s.TEXTURE_2D,1),st[s.TEXTURE_CUBE_MAP]=j(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[s.TEXTURE_2D_ARRAY]=j(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),st[s.TEXTURE_3D]=j(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),o.setClear(1),r.setClear(0),gt(s.DEPTH_TEST),o.setFunc(ho),Xt(!1),$t(_u),gt(s.CULL_FACE),O(Zi);function gt(H){l[H]!==!0&&(s.enable(H),l[H]=!0)}function ot(H){l[H]!==!1&&(s.disable(H),l[H]=!1)}function vt(H,St){return u[H]!==St?(s.bindFramebuffer(H,St),u[H]=St,H===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=St),H===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=St),!0):!1}function nt(H,St){let Q=h,ct=!1;if(H){Q=f.get(St),Q===void 0&&(Q=[],f.set(St,Q));const Mt=H.textures;if(Q.length!==Mt.length||Q[0]!==s.COLOR_ATTACHMENT0){for(let yt=0,ee=Mt.length;yt<ee;yt++)Q[yt]=s.COLOR_ATTACHMENT0+yt;Q.length=Mt.length,ct=!0}}else Q[0]!==s.BACK&&(Q[0]=s.BACK,ct=!0);ct&&s.drawBuffers(Q)}function bt(H){return d!==H?(s.useProgram(H),d=H,!0):!1}const It={[xs]:s.FUNC_ADD,[qf]:s.FUNC_SUBTRACT,[Xf]:s.FUNC_REVERSE_SUBTRACT};It[Yf]=s.MIN,It[jf]=s.MAX;const kt={[$f]:s.ZERO,[Kf]:s.ONE,[Zf]:s.SRC_COLOR,[zc]:s.SRC_ALPHA,[ip]:s.SRC_ALPHA_SATURATE,[ep]:s.DST_COLOR,[Qf]:s.DST_ALPHA,[Jf]:s.ONE_MINUS_SRC_COLOR,[Oc]:s.ONE_MINUS_SRC_ALPHA,[np]:s.ONE_MINUS_DST_COLOR,[tp]:s.ONE_MINUS_DST_ALPHA,[sp]:s.CONSTANT_COLOR,[op]:s.ONE_MINUS_CONSTANT_COLOR,[rp]:s.CONSTANT_ALPHA,[ap]:s.ONE_MINUS_CONSTANT_ALPHA};function O(H,St,Q,ct,Mt,yt,ee,Re,ke,ne){if(H===Zi){g===!0&&(ot(s.BLEND),g=!1);return}if(g===!1&&(gt(s.BLEND),g=!0),H!==Wf){if(H!==y||ne!==C){if((p!==xs||v!==xs)&&(s.blendEquation(s.FUNC_ADD),p=xs,v=xs),ne)switch(H){case ro:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case yu:s.blendFunc(s.ONE,s.ONE);break;case Mu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Su:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case ro:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case yu:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Mu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Su:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}m=null,x=null,M=null,T=null,b.set(0,0,0),E=0,y=H,C=ne}return}Mt=Mt||St,yt=yt||Q,ee=ee||ct,(St!==p||Mt!==v)&&(s.blendEquationSeparate(It[St],It[Mt]),p=St,v=Mt),(Q!==m||ct!==x||yt!==M||ee!==T)&&(s.blendFuncSeparate(kt[Q],kt[ct],kt[yt],kt[ee]),m=Q,x=ct,M=yt,T=ee),(Re.equals(b)===!1||ke!==E)&&(s.blendColor(Re.r,Re.g,Re.b,ke),b.copy(Re),E=ke),y=H,C=!1}function _e(H,St){H.side===zn?ot(s.CULL_FACE):gt(s.CULL_FACE);let Q=H.side===en;St&&(Q=!Q),Xt(Q),H.blending===ro&&H.transparent===!1?O(Zi):O(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),i.setMask(H.colorWrite);const ct=H.stencilWrite;r.setTest(ct),ct&&(r.setMask(H.stencilWriteMask),r.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),r.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),te(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?gt(s.SAMPLE_ALPHA_TO_COVERAGE):ot(s.SAMPLE_ALPHA_TO_COVERAGE)}function Xt(H){R!==H&&(H?s.frontFace(s.CW):s.frontFace(s.CCW),R=H)}function $t(H){H!==Gf?(gt(s.CULL_FACE),H!==_&&(H===_u?s.cullFace(s.BACK):H===Vf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ot(s.CULL_FACE),_=H}function Ct(H){H!==w&&(F&&s.lineWidth(H),w=H)}function te(H,St,Q){H?(gt(s.POLYGON_OFFSET_FILL),(L!==St||I!==Q)&&(s.polygonOffset(St,Q),L=St,I=Q)):ot(s.POLYGON_OFFSET_FILL)}function Ot(H){H?gt(s.SCISSOR_TEST):ot(s.SCISSOR_TEST)}function D(H){H===void 0&&(H=s.TEXTURE0+U-1),z!==H&&(s.activeTexture(H),z=H)}function A(H,St,Q){Q===void 0&&(z===null?Q=s.TEXTURE0+U-1:Q=z);let ct=q[Q];ct===void 0&&(ct={type:void 0,texture:void 0},q[Q]=ct),(ct.type!==H||ct.texture!==St)&&(z!==Q&&(s.activeTexture(Q),z=Q),s.bindTexture(H,St||st[H]),ct.type=H,ct.texture=St)}function Y(){const H=q[z];H!==void 0&&H.type!==void 0&&(s.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function tt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ht(){try{s.compressedTexImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function at(){try{s.texSubImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function zt(){try{s.texSubImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function mt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function wt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Yt(){try{s.texStorage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ft(){try{s.texStorage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function X(){try{s.texImage2D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function rt(){try{s.texImage3D.apply(s,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function dt(H){J.equals(H)===!1&&(s.scissor(H.x,H.y,H.z,H.w),J.copy(H))}function ut(H){At.equals(H)===!1&&(s.viewport(H.x,H.y,H.z,H.w),At.copy(H))}function Rt(H,St){let Q=c.get(St);Q===void 0&&(Q=new WeakMap,c.set(St,Q));let ct=Q.get(H);ct===void 0&&(ct=s.getUniformBlockIndex(St,H.name),Q.set(H,ct))}function _t(H,St){const ct=c.get(St).get(H);a.get(St)!==ct&&(s.uniformBlockBinding(St,ct,H.__bindingPointIndex),a.set(St,ct))}function jt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),l={},z=null,q={},u={},f=new WeakMap,h=[],d=null,g=!1,y=null,p=null,m=null,x=null,v=null,M=null,T=null,b=new ie(0,0,0),E=0,C=!1,R=null,_=null,w=null,L=null,I=null,J.set(0,0,s.canvas.width,s.canvas.height),At.set(0,0,s.canvas.width,s.canvas.height),i.reset(),o.reset(),r.reset()}return{buffers:{color:i,depth:o,stencil:r},enable:gt,disable:ot,bindFramebuffer:vt,drawBuffers:nt,useProgram:bt,setBlending:O,setMaterial:_e,setFlipSided:Xt,setCullFace:$t,setLineWidth:Ct,setPolygonOffset:te,setScissorTest:Ot,activeTexture:D,bindTexture:A,unbindTexture:Y,compressedTexImage2D:tt,compressedTexImage3D:ht,texImage2D:X,texImage3D:rt,updateUBOMapping:Rt,uniformBlockBinding:_t,texStorage2D:Yt,texStorage3D:ft,texSubImage2D:at,texSubImage3D:zt,compressedTexSubImage2D:mt,compressedTexSubImage3D:wt,scissor:dt,viewport:ut,reset:jt}}function hh(s,t,e,n){const i=Px(n);switch(e){case wd:return s*t;case bd:return s*t;case Td:return s*t*2;case Ad:return s*t/i.components*i.byteLength;case Gl:return s*t/i.components*i.byteLength;case Cd:return s*t*2/i.components*i.byteLength;case Vl:return s*t*2/i.components*i.byteLength;case Ed:return s*t*3/i.components*i.byteLength;case Zn:return s*t*4/i.components*i.byteLength;case Wl:return s*t*4/i.components*i.byteLength;case Yr:case jr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case $r:case Kr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Kc:case Jc:return Math.max(s,16)*Math.max(t,8)/4;case $c:case Zc:return Math.max(s,8)*Math.max(t,8)/2;case Qc:case tl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case el:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case nl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case il:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case sl:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case ol:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case rl:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case al:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case cl:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case ll:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case ul:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case hl:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case dl:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case fl:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case pl:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case ml:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Zr:case gl:case vl:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Rd:case xl:return Math.ceil(s/4)*Math.ceil(t/4)*8;case _l:case yl:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Px(s){switch(s){case Di:case yd:return{byteLength:1,components:1};case tr:case Md:case sr:return{byteLength:2,components:1};case kl:case Hl:return{byteLength:2,components:4};case Cs:case Bl:case Ri:return{byteLength:4,components:1};case Sd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function Ix(s,t,e,n,i,o,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Lt,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,A){return d?new OffscreenCanvas(D,A):ha("canvas")}function y(D,A,Y){let tt=1;const ht=Ot(D);if((ht.width>Y||ht.height>Y)&&(tt=Y/Math.max(ht.width,ht.height)),tt<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const at=Math.floor(tt*ht.width),zt=Math.floor(tt*ht.height);f===void 0&&(f=g(at,zt));const mt=A?g(at,zt):f;return mt.width=at,mt.height=zt,mt.getContext("2d").drawImage(D,0,0,at,zt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ht.width+"x"+ht.height+") to ("+at+"x"+zt+")."),mt}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ht.width+"x"+ht.height+")."),D;return D}function p(D){return D.generateMipmaps&&D.minFilter!==Bn&&D.minFilter!==jn}function m(D){s.generateMipmap(D)}function x(D,A,Y,tt,ht=!1){if(D!==null){if(s[D]!==void 0)return s[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let at=A;if(A===s.RED&&(Y===s.FLOAT&&(at=s.R32F),Y===s.HALF_FLOAT&&(at=s.R16F),Y===s.UNSIGNED_BYTE&&(at=s.R8)),A===s.RED_INTEGER&&(Y===s.UNSIGNED_BYTE&&(at=s.R8UI),Y===s.UNSIGNED_SHORT&&(at=s.R16UI),Y===s.UNSIGNED_INT&&(at=s.R32UI),Y===s.BYTE&&(at=s.R8I),Y===s.SHORT&&(at=s.R16I),Y===s.INT&&(at=s.R32I)),A===s.RG&&(Y===s.FLOAT&&(at=s.RG32F),Y===s.HALF_FLOAT&&(at=s.RG16F),Y===s.UNSIGNED_BYTE&&(at=s.RG8)),A===s.RG_INTEGER&&(Y===s.UNSIGNED_BYTE&&(at=s.RG8UI),Y===s.UNSIGNED_SHORT&&(at=s.RG16UI),Y===s.UNSIGNED_INT&&(at=s.RG32UI),Y===s.BYTE&&(at=s.RG8I),Y===s.SHORT&&(at=s.RG16I),Y===s.INT&&(at=s.RG32I)),A===s.RGB_INTEGER&&(Y===s.UNSIGNED_BYTE&&(at=s.RGB8UI),Y===s.UNSIGNED_SHORT&&(at=s.RGB16UI),Y===s.UNSIGNED_INT&&(at=s.RGB32UI),Y===s.BYTE&&(at=s.RGB8I),Y===s.SHORT&&(at=s.RGB16I),Y===s.INT&&(at=s.RGB32I)),A===s.RGBA_INTEGER&&(Y===s.UNSIGNED_BYTE&&(at=s.RGBA8UI),Y===s.UNSIGNED_SHORT&&(at=s.RGBA16UI),Y===s.UNSIGNED_INT&&(at=s.RGBA32UI),Y===s.BYTE&&(at=s.RGBA8I),Y===s.SHORT&&(at=s.RGBA16I),Y===s.INT&&(at=s.RGBA32I)),A===s.RGB&&Y===s.UNSIGNED_INT_5_9_9_9_REV&&(at=s.RGB9_E5),A===s.RGBA){const zt=ht?aa:de.getTransfer(tt);Y===s.FLOAT&&(at=s.RGBA32F),Y===s.HALF_FLOAT&&(at=s.RGBA16F),Y===s.UNSIGNED_BYTE&&(at=zt===Ee?s.SRGB8_ALPHA8:s.RGBA8),Y===s.UNSIGNED_SHORT_4_4_4_4&&(at=s.RGBA4),Y===s.UNSIGNED_SHORT_5_5_5_1&&(at=s.RGB5_A1)}return(at===s.R16F||at===s.R32F||at===s.RG16F||at===s.RG32F||at===s.RGBA16F||at===s.RGBA32F)&&t.get("EXT_color_buffer_float"),at}function v(D,A){let Y;return D?A===null||A===Cs||A===mo?Y=s.DEPTH24_STENCIL8:A===Ri?Y=s.DEPTH32F_STENCIL8:A===tr&&(Y=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Cs||A===mo?Y=s.DEPTH_COMPONENT24:A===Ri?Y=s.DEPTH_COMPONENT32F:A===tr&&(Y=s.DEPTH_COMPONENT16),Y}function M(D,A){return p(D)===!0||D.isFramebufferTexture&&D.minFilter!==Bn&&D.minFilter!==jn?Math.log2(Math.max(A.width,A.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?A.mipmaps.length:1}function T(D){const A=D.target;A.removeEventListener("dispose",T),E(A),A.isVideoTexture&&u.delete(A)}function b(D){const A=D.target;A.removeEventListener("dispose",b),R(A)}function E(D){const A=n.get(D);if(A.__webglInit===void 0)return;const Y=D.source,tt=h.get(Y);if(tt){const ht=tt[A.__cacheKey];ht.usedTimes--,ht.usedTimes===0&&C(D),Object.keys(tt).length===0&&h.delete(Y)}n.remove(D)}function C(D){const A=n.get(D);s.deleteTexture(A.__webglTexture);const Y=D.source,tt=h.get(Y);delete tt[A.__cacheKey],r.memory.textures--}function R(D){const A=n.get(D);if(D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(A.__webglFramebuffer[tt]))for(let ht=0;ht<A.__webglFramebuffer[tt].length;ht++)s.deleteFramebuffer(A.__webglFramebuffer[tt][ht]);else s.deleteFramebuffer(A.__webglFramebuffer[tt]);A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer[tt])}else{if(Array.isArray(A.__webglFramebuffer))for(let tt=0;tt<A.__webglFramebuffer.length;tt++)s.deleteFramebuffer(A.__webglFramebuffer[tt]);else s.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&s.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&s.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let tt=0;tt<A.__webglColorRenderbuffer.length;tt++)A.__webglColorRenderbuffer[tt]&&s.deleteRenderbuffer(A.__webglColorRenderbuffer[tt]);A.__webglDepthRenderbuffer&&s.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const Y=D.textures;for(let tt=0,ht=Y.length;tt<ht;tt++){const at=n.get(Y[tt]);at.__webglTexture&&(s.deleteTexture(at.__webglTexture),r.memory.textures--),n.remove(Y[tt])}n.remove(D)}let _=0;function w(){_=0}function L(){const D=_;return D>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),_+=1,D}function I(D){const A=[];return A.push(D.wrapS),A.push(D.wrapT),A.push(D.wrapR||0),A.push(D.magFilter),A.push(D.minFilter),A.push(D.anisotropy),A.push(D.internalFormat),A.push(D.format),A.push(D.type),A.push(D.generateMipmaps),A.push(D.premultiplyAlpha),A.push(D.flipY),A.push(D.unpackAlignment),A.push(D.colorSpace),A.join()}function U(D,A){const Y=n.get(D);if(D.isVideoTexture&&Ct(D),D.isRenderTargetTexture===!1&&D.version>0&&Y.__version!==D.version){const tt=D.image;if(tt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{At(Y,D,A);return}}e.bindTexture(s.TEXTURE_2D,Y.__webglTexture,s.TEXTURE0+A)}function F(D,A){const Y=n.get(D);if(D.version>0&&Y.__version!==D.version){At(Y,D,A);return}e.bindTexture(s.TEXTURE_2D_ARRAY,Y.__webglTexture,s.TEXTURE0+A)}function N(D,A){const Y=n.get(D);if(D.version>0&&Y.__version!==D.version){At(Y,D,A);return}e.bindTexture(s.TEXTURE_3D,Y.__webglTexture,s.TEXTURE0+A)}function G(D,A){const Y=n.get(D);if(D.version>0&&Y.__version!==D.version){j(Y,D,A);return}e.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture,s.TEXTURE0+A)}const z={[ra]:s.REPEAT,[bs]:s.CLAMP_TO_EDGE,[jc]:s.MIRRORED_REPEAT},q={[Bn]:s.NEAREST,[gp]:s.NEAREST_MIPMAP_NEAREST,[ur]:s.NEAREST_MIPMAP_LINEAR,[jn]:s.LINEAR,[Da]:s.LINEAR_MIPMAP_NEAREST,[Ts]:s.LINEAR_MIPMAP_LINEAR},$={[yp]:s.NEVER,[Tp]:s.ALWAYS,[Mp]:s.LESS,[Id]:s.LEQUAL,[Sp]:s.EQUAL,[bp]:s.GEQUAL,[wp]:s.GREATER,[Ep]:s.NOTEQUAL};function et(D,A){if(A.type===Ri&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===jn||A.magFilter===Da||A.magFilter===ur||A.magFilter===Ts||A.minFilter===jn||A.minFilter===Da||A.minFilter===ur||A.minFilter===Ts)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(D,s.TEXTURE_WRAP_S,z[A.wrapS]),s.texParameteri(D,s.TEXTURE_WRAP_T,z[A.wrapT]),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,z[A.wrapR]),s.texParameteri(D,s.TEXTURE_MAG_FILTER,q[A.magFilter]),s.texParameteri(D,s.TEXTURE_MIN_FILTER,q[A.minFilter]),A.compareFunction&&(s.texParameteri(D,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(D,s.TEXTURE_COMPARE_FUNC,$[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Bn||A.minFilter!==ur&&A.minFilter!==Ts||A.type===Ri&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const Y=t.get("EXT_texture_filter_anisotropic");s.texParameterf(D,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function J(D,A){let Y=!1;D.__webglInit===void 0&&(D.__webglInit=!0,A.addEventListener("dispose",T));const tt=A.source;let ht=h.get(tt);ht===void 0&&(ht={},h.set(tt,ht));const at=I(A);if(at!==D.__cacheKey){ht[at]===void 0&&(ht[at]={texture:s.createTexture(),usedTimes:0},r.memory.textures++,Y=!0),ht[at].usedTimes++;const zt=ht[D.__cacheKey];zt!==void 0&&(ht[D.__cacheKey].usedTimes--,zt.usedTimes===0&&C(A)),D.__cacheKey=at,D.__webglTexture=ht[at].texture}return Y}function At(D,A,Y){let tt=s.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(tt=s.TEXTURE_2D_ARRAY),A.isData3DTexture&&(tt=s.TEXTURE_3D);const ht=J(D,A),at=A.source;e.bindTexture(tt,D.__webglTexture,s.TEXTURE0+Y);const zt=n.get(at);if(at.version!==zt.__version||ht===!0){e.activeTexture(s.TEXTURE0+Y);const mt=de.getPrimaries(de.workingColorSpace),wt=A.colorSpace===$i?null:de.getPrimaries(A.colorSpace),Yt=A.colorSpace===$i||mt===wt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);let ft=y(A.image,!1,i.maxTextureSize);ft=te(A,ft);const X=o.convert(A.format,A.colorSpace),rt=o.convert(A.type);let dt=x(A.internalFormat,X,rt,A.colorSpace,A.isVideoTexture);et(tt,A);let ut;const Rt=A.mipmaps,_t=A.isVideoTexture!==!0,jt=zt.__version===void 0||ht===!0,H=at.dataReady,St=M(A,ft);if(A.isDepthTexture)dt=v(A.format===go,A.type),jt&&(_t?e.texStorage2D(s.TEXTURE_2D,1,dt,ft.width,ft.height):e.texImage2D(s.TEXTURE_2D,0,dt,ft.width,ft.height,0,X,rt,null));else if(A.isDataTexture)if(Rt.length>0){_t&&jt&&e.texStorage2D(s.TEXTURE_2D,St,dt,Rt[0].width,Rt[0].height);for(let Q=0,ct=Rt.length;Q<ct;Q++)ut=Rt[Q],_t?H&&e.texSubImage2D(s.TEXTURE_2D,Q,0,0,ut.width,ut.height,X,rt,ut.data):e.texImage2D(s.TEXTURE_2D,Q,dt,ut.width,ut.height,0,X,rt,ut.data);A.generateMipmaps=!1}else _t?(jt&&e.texStorage2D(s.TEXTURE_2D,St,dt,ft.width,ft.height),H&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ft.width,ft.height,X,rt,ft.data)):e.texImage2D(s.TEXTURE_2D,0,dt,ft.width,ft.height,0,X,rt,ft.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){_t&&jt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,St,dt,Rt[0].width,Rt[0].height,ft.depth);for(let Q=0,ct=Rt.length;Q<ct;Q++)if(ut=Rt[Q],A.format!==Zn)if(X!==null)if(_t){if(H)if(A.layerUpdates.size>0){const Mt=hh(ut.width,ut.height,A.format,A.type);for(const yt of A.layerUpdates){const ee=ut.data.subarray(yt*Mt/ut.data.BYTES_PER_ELEMENT,(yt+1)*Mt/ut.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Q,0,0,yt,ut.width,ut.height,1,X,ee,0,0)}A.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Q,0,0,0,ut.width,ut.height,ft.depth,X,ut.data,0,0)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Q,dt,ut.width,ut.height,ft.depth,0,ut.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else _t?H&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,Q,0,0,0,ut.width,ut.height,ft.depth,X,rt,ut.data):e.texImage3D(s.TEXTURE_2D_ARRAY,Q,dt,ut.width,ut.height,ft.depth,0,X,rt,ut.data)}else{_t&&jt&&e.texStorage2D(s.TEXTURE_2D,St,dt,Rt[0].width,Rt[0].height);for(let Q=0,ct=Rt.length;Q<ct;Q++)ut=Rt[Q],A.format!==Zn?X!==null?_t?H&&e.compressedTexSubImage2D(s.TEXTURE_2D,Q,0,0,ut.width,ut.height,X,ut.data):e.compressedTexImage2D(s.TEXTURE_2D,Q,dt,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):_t?H&&e.texSubImage2D(s.TEXTURE_2D,Q,0,0,ut.width,ut.height,X,rt,ut.data):e.texImage2D(s.TEXTURE_2D,Q,dt,ut.width,ut.height,0,X,rt,ut.data)}else if(A.isDataArrayTexture)if(_t){if(jt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,St,dt,ft.width,ft.height,ft.depth),H)if(A.layerUpdates.size>0){const Q=hh(ft.width,ft.height,A.format,A.type);for(const ct of A.layerUpdates){const Mt=ft.data.subarray(ct*Q/ft.data.BYTES_PER_ELEMENT,(ct+1)*Q/ft.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ct,ft.width,ft.height,1,X,rt,Mt)}A.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ft.width,ft.height,ft.depth,X,rt,ft.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,dt,ft.width,ft.height,ft.depth,0,X,rt,ft.data);else if(A.isData3DTexture)_t?(jt&&e.texStorage3D(s.TEXTURE_3D,St,dt,ft.width,ft.height,ft.depth),H&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ft.width,ft.height,ft.depth,X,rt,ft.data)):e.texImage3D(s.TEXTURE_3D,0,dt,ft.width,ft.height,ft.depth,0,X,rt,ft.data);else if(A.isFramebufferTexture){if(jt)if(_t)e.texStorage2D(s.TEXTURE_2D,St,dt,ft.width,ft.height);else{let Q=ft.width,ct=ft.height;for(let Mt=0;Mt<St;Mt++)e.texImage2D(s.TEXTURE_2D,Mt,dt,Q,ct,0,X,rt,null),Q>>=1,ct>>=1}}else if(Rt.length>0){if(_t&&jt){const Q=Ot(Rt[0]);e.texStorage2D(s.TEXTURE_2D,St,dt,Q.width,Q.height)}for(let Q=0,ct=Rt.length;Q<ct;Q++)ut=Rt[Q],_t?H&&e.texSubImage2D(s.TEXTURE_2D,Q,0,0,X,rt,ut):e.texImage2D(s.TEXTURE_2D,Q,dt,X,rt,ut);A.generateMipmaps=!1}else if(_t){if(jt){const Q=Ot(ft);e.texStorage2D(s.TEXTURE_2D,St,dt,Q.width,Q.height)}H&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,X,rt,ft)}else e.texImage2D(s.TEXTURE_2D,0,dt,X,rt,ft);p(A)&&m(tt),zt.__version=at.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function j(D,A,Y){if(A.image.length!==6)return;const tt=J(D,A),ht=A.source;e.bindTexture(s.TEXTURE_CUBE_MAP,D.__webglTexture,s.TEXTURE0+Y);const at=n.get(ht);if(ht.version!==at.__version||tt===!0){e.activeTexture(s.TEXTURE0+Y);const zt=de.getPrimaries(de.workingColorSpace),mt=A.colorSpace===$i?null:de.getPrimaries(A.colorSpace),wt=A.colorSpace===$i||zt===mt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const Yt=A.isCompressedTexture||A.image[0].isCompressedTexture,ft=A.image[0]&&A.image[0].isDataTexture,X=[];for(let ct=0;ct<6;ct++)!Yt&&!ft?X[ct]=y(A.image[ct],!0,i.maxCubemapSize):X[ct]=ft?A.image[ct].image:A.image[ct],X[ct]=te(A,X[ct]);const rt=X[0],dt=o.convert(A.format,A.colorSpace),ut=o.convert(A.type),Rt=x(A.internalFormat,dt,ut,A.colorSpace),_t=A.isVideoTexture!==!0,jt=at.__version===void 0||tt===!0,H=ht.dataReady;let St=M(A,rt);et(s.TEXTURE_CUBE_MAP,A);let Q;if(Yt){_t&&jt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,St,Rt,rt.width,rt.height);for(let ct=0;ct<6;ct++){Q=X[ct].mipmaps;for(let Mt=0;Mt<Q.length;Mt++){const yt=Q[Mt];A.format!==Zn?dt!==null?_t?H&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Mt,0,0,yt.width,yt.height,dt,yt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Mt,Rt,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):_t?H&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Mt,0,0,yt.width,yt.height,dt,ut,yt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Mt,Rt,yt.width,yt.height,0,dt,ut,yt.data)}}}else{if(Q=A.mipmaps,_t&&jt){Q.length>0&&St++;const ct=Ot(X[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,St,Rt,ct.width,ct.height)}for(let ct=0;ct<6;ct++)if(ft){_t?H&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,X[ct].width,X[ct].height,dt,ut,X[ct].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,Rt,X[ct].width,X[ct].height,0,dt,ut,X[ct].data);for(let Mt=0;Mt<Q.length;Mt++){const ee=Q[Mt].image[ct].image;_t?H&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Mt+1,0,0,ee.width,ee.height,dt,ut,ee.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Mt+1,Rt,ee.width,ee.height,0,dt,ut,ee.data)}}else{_t?H&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,dt,ut,X[ct]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,Rt,dt,ut,X[ct]);for(let Mt=0;Mt<Q.length;Mt++){const yt=Q[Mt];_t?H&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Mt+1,0,0,dt,ut,yt.image[ct]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Mt+1,Rt,dt,ut,yt.image[ct])}}}p(A)&&m(s.TEXTURE_CUBE_MAP),at.__version=ht.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function st(D,A,Y,tt,ht,at){const zt=o.convert(Y.format,Y.colorSpace),mt=o.convert(Y.type),wt=x(Y.internalFormat,zt,mt,Y.colorSpace);if(!n.get(A).__hasExternalTextures){const ft=Math.max(1,A.width>>at),X=Math.max(1,A.height>>at);ht===s.TEXTURE_3D||ht===s.TEXTURE_2D_ARRAY?e.texImage3D(ht,at,wt,ft,X,A.depth,0,zt,mt,null):e.texImage2D(ht,at,wt,ft,X,0,zt,mt,null)}e.bindFramebuffer(s.FRAMEBUFFER,D),$t(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,tt,ht,n.get(Y).__webglTexture,0,Xt(A)):(ht===s.TEXTURE_2D||ht>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ht<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,tt,ht,n.get(Y).__webglTexture,at),e.bindFramebuffer(s.FRAMEBUFFER,null)}function gt(D,A,Y){if(s.bindRenderbuffer(s.RENDERBUFFER,D),A.depthBuffer){const tt=A.depthTexture,ht=tt&&tt.isDepthTexture?tt.type:null,at=v(A.stencilBuffer,ht),zt=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,mt=Xt(A);$t(A)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,mt,at,A.width,A.height):Y?s.renderbufferStorageMultisample(s.RENDERBUFFER,mt,at,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,at,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,zt,s.RENDERBUFFER,D)}else{const tt=A.textures;for(let ht=0;ht<tt.length;ht++){const at=tt[ht],zt=o.convert(at.format,at.colorSpace),mt=o.convert(at.type),wt=x(at.internalFormat,zt,mt,at.colorSpace),Yt=Xt(A);Y&&$t(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Yt,wt,A.width,A.height):$t(A)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Yt,wt,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,wt,A.width,A.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ot(D,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,D),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),U(A.depthTexture,0);const tt=n.get(A.depthTexture).__webglTexture,ht=Xt(A);if(A.depthTexture.format===ao)$t(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0,ht):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0);else if(A.depthTexture.format===go)$t(A)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0,ht):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function vt(D){const A=n.get(D),Y=D.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==D.depthTexture){const tt=D.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),tt){const ht=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,tt.removeEventListener("dispose",ht)};tt.addEventListener("dispose",ht),A.__depthDisposeCallback=ht}A.__boundDepthTexture=tt}if(D.depthTexture&&!A.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");ot(A.__webglFramebuffer,D)}else if(Y){A.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[tt]),A.__webglDepthbuffer[tt]===void 0)A.__webglDepthbuffer[tt]=s.createRenderbuffer(),gt(A.__webglDepthbuffer[tt],D,!1);else{const ht=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,at=A.__webglDepthbuffer[tt];s.bindRenderbuffer(s.RENDERBUFFER,at),s.framebufferRenderbuffer(s.FRAMEBUFFER,ht,s.RENDERBUFFER,at)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=s.createRenderbuffer(),gt(A.__webglDepthbuffer,D,!1);else{const tt=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ht=A.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ht),s.framebufferRenderbuffer(s.FRAMEBUFFER,tt,s.RENDERBUFFER,ht)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function nt(D,A,Y){const tt=n.get(D);A!==void 0&&st(tt.__webglFramebuffer,D,D.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),Y!==void 0&&vt(D)}function bt(D){const A=D.texture,Y=n.get(D),tt=n.get(A);D.addEventListener("dispose",b);const ht=D.textures,at=D.isWebGLCubeRenderTarget===!0,zt=ht.length>1;if(zt||(tt.__webglTexture===void 0&&(tt.__webglTexture=s.createTexture()),tt.__version=A.version,r.memory.textures++),at){Y.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(A.mipmaps&&A.mipmaps.length>0){Y.__webglFramebuffer[mt]=[];for(let wt=0;wt<A.mipmaps.length;wt++)Y.__webglFramebuffer[mt][wt]=s.createFramebuffer()}else Y.__webglFramebuffer[mt]=s.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){Y.__webglFramebuffer=[];for(let mt=0;mt<A.mipmaps.length;mt++)Y.__webglFramebuffer[mt]=s.createFramebuffer()}else Y.__webglFramebuffer=s.createFramebuffer();if(zt)for(let mt=0,wt=ht.length;mt<wt;mt++){const Yt=n.get(ht[mt]);Yt.__webglTexture===void 0&&(Yt.__webglTexture=s.createTexture(),r.memory.textures++)}if(D.samples>0&&$t(D)===!1){Y.__webglMultisampledFramebuffer=s.createFramebuffer(),Y.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let mt=0;mt<ht.length;mt++){const wt=ht[mt];Y.__webglColorRenderbuffer[mt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,Y.__webglColorRenderbuffer[mt]);const Yt=o.convert(wt.format,wt.colorSpace),ft=o.convert(wt.type),X=x(wt.internalFormat,Yt,ft,wt.colorSpace,D.isXRRenderTarget===!0),rt=Xt(D);s.renderbufferStorageMultisample(s.RENDERBUFFER,rt,X,D.width,D.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.RENDERBUFFER,Y.__webglColorRenderbuffer[mt])}s.bindRenderbuffer(s.RENDERBUFFER,null),D.depthBuffer&&(Y.__webglDepthRenderbuffer=s.createRenderbuffer(),gt(Y.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(at){e.bindTexture(s.TEXTURE_CUBE_MAP,tt.__webglTexture),et(s.TEXTURE_CUBE_MAP,A);for(let mt=0;mt<6;mt++)if(A.mipmaps&&A.mipmaps.length>0)for(let wt=0;wt<A.mipmaps.length;wt++)st(Y.__webglFramebuffer[mt][wt],D,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,wt);else st(Y.__webglFramebuffer[mt],D,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);p(A)&&m(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(zt){for(let mt=0,wt=ht.length;mt<wt;mt++){const Yt=ht[mt],ft=n.get(Yt);e.bindTexture(s.TEXTURE_2D,ft.__webglTexture),et(s.TEXTURE_2D,Yt),st(Y.__webglFramebuffer,D,Yt,s.COLOR_ATTACHMENT0+mt,s.TEXTURE_2D,0),p(Yt)&&m(s.TEXTURE_2D)}e.unbindTexture()}else{let mt=s.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(mt=D.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(mt,tt.__webglTexture),et(mt,A),A.mipmaps&&A.mipmaps.length>0)for(let wt=0;wt<A.mipmaps.length;wt++)st(Y.__webglFramebuffer[wt],D,A,s.COLOR_ATTACHMENT0,mt,wt);else st(Y.__webglFramebuffer,D,A,s.COLOR_ATTACHMENT0,mt,0);p(A)&&m(mt),e.unbindTexture()}D.depthBuffer&&vt(D)}function It(D){const A=D.textures;for(let Y=0,tt=A.length;Y<tt;Y++){const ht=A[Y];if(p(ht)){const at=D.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,zt=n.get(ht).__webglTexture;e.bindTexture(at,zt),m(at),e.unbindTexture()}}}const kt=[],O=[];function _e(D){if(D.samples>0){if($t(D)===!1){const A=D.textures,Y=D.width,tt=D.height;let ht=s.COLOR_BUFFER_BIT;const at=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,zt=n.get(D),mt=A.length>1;if(mt)for(let wt=0;wt<A.length;wt++)e.bindFramebuffer(s.FRAMEBUFFER,zt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+wt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,zt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+wt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,zt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,zt.__webglFramebuffer);for(let wt=0;wt<A.length;wt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ht|=s.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ht|=s.STENCIL_BUFFER_BIT)),mt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,zt.__webglColorRenderbuffer[wt]);const Yt=n.get(A[wt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Yt,0)}s.blitFramebuffer(0,0,Y,tt,0,0,Y,tt,ht,s.NEAREST),c===!0&&(kt.length=0,O.length=0,kt.push(s.COLOR_ATTACHMENT0+wt),D.depthBuffer&&D.resolveDepthBuffer===!1&&(kt.push(at),O.push(at),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,O)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,kt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),mt)for(let wt=0;wt<A.length;wt++){e.bindFramebuffer(s.FRAMEBUFFER,zt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+wt,s.RENDERBUFFER,zt.__webglColorRenderbuffer[wt]);const Yt=n.get(A[wt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,zt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+wt,s.TEXTURE_2D,Yt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,zt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){const A=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[A])}}}function Xt(D){return Math.min(i.maxSamples,D.samples)}function $t(D){const A=n.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Ct(D){const A=r.render.frame;u.get(D)!==A&&(u.set(D,A),D.update())}function te(D,A){const Y=D.colorSpace,tt=D.format,ht=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||Y!==os&&Y!==$i&&(de.getTransfer(Y)===Ee?(tt!==Zn||ht!==Di)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),A}function Ot(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=L,this.resetTextureUnits=w,this.setTexture2D=U,this.setTexture2DArray=F,this.setTexture3D=N,this.setTextureCube=G,this.rebindTextures=nt,this.setupRenderTarget=bt,this.updateRenderTargetMipmap=It,this.updateMultisampleRenderTarget=_e,this.setupDepthRenderbuffer=vt,this.setupFrameBufferTexture=st,this.useMultisampledRTT=$t}function Lx(s,t){function e(n,i=$i){let o;const r=de.getTransfer(i);if(n===Di)return s.UNSIGNED_BYTE;if(n===kl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Hl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Sd)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===yd)return s.BYTE;if(n===Md)return s.SHORT;if(n===tr)return s.UNSIGNED_SHORT;if(n===Bl)return s.INT;if(n===Cs)return s.UNSIGNED_INT;if(n===Ri)return s.FLOAT;if(n===sr)return s.HALF_FLOAT;if(n===wd)return s.ALPHA;if(n===Ed)return s.RGB;if(n===Zn)return s.RGBA;if(n===bd)return s.LUMINANCE;if(n===Td)return s.LUMINANCE_ALPHA;if(n===ao)return s.DEPTH_COMPONENT;if(n===go)return s.DEPTH_STENCIL;if(n===Ad)return s.RED;if(n===Gl)return s.RED_INTEGER;if(n===Cd)return s.RG;if(n===Vl)return s.RG_INTEGER;if(n===Wl)return s.RGBA_INTEGER;if(n===Yr||n===jr||n===$r||n===Kr)if(r===Ee)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===Yr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===jr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===$r)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Kr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===Yr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===jr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===$r)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Kr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$c||n===Kc||n===Zc||n===Jc)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===$c)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Kc)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Zc)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Jc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Qc||n===tl||n===el)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Qc||n===tl)return r===Ee?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===el)return r===Ee?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===nl||n===il||n===sl||n===ol||n===rl||n===al||n===cl||n===ll||n===ul||n===hl||n===dl||n===fl||n===pl||n===ml)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===nl)return r===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===il)return r===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===sl)return r===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ol)return r===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===rl)return r===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===al)return r===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===cl)return r===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ll)return r===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ul)return r===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===hl)return r===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===dl)return r===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===fl)return r===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===pl)return r===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ml)return r===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Zr||n===gl||n===vl)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===Zr)return r===Ee?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===gl)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===vl)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Rd||n===xl||n===_l||n===yl)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===Zr)return o.COMPRESSED_RED_RGTC1_EXT;if(n===xl)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===_l)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===yl)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===mo?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class Dx extends Tn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class dn extends nn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Nx={type:"move"};class lc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,o=null,r=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){r=!0;for(const y of t.hand.values()){const p=e.getJointPose(y,n),m=this._getHandJoint(l,y);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;l.inputState.pinching&&h>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&o!==null&&(i=o),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Nx)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new dn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Ux=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Fx=`
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

}`;class zx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new mn,o=t.properties.get(i);o.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ns({vertexShader:Ux,fragmentShader:Fx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Nt(new Ps(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ox extends To{constructor(t,e){super();const n=this;let i=null,o=1,r=null,a="local-floor",c=1,l=null,u=null,f=null,h=null,d=null,g=null;const y=new zx,p=e.getContextAttributes();let m=null,x=null;const v=[],M=[],T=new Lt;let b=null;const E=new Tn;E.layers.enable(1),E.viewport=new me;const C=new Tn;C.layers.enable(2),C.viewport=new me;const R=[E,C],_=new Dx;_.layers.enable(1),_.layers.enable(2);let w=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let st=v[j];return st===void 0&&(st=new lc,v[j]=st),st.getTargetRaySpace()},this.getControllerGrip=function(j){let st=v[j];return st===void 0&&(st=new lc,v[j]=st),st.getGripSpace()},this.getHand=function(j){let st=v[j];return st===void 0&&(st=new lc,v[j]=st),st.getHandSpace()};function I(j){const st=M.indexOf(j.inputSource);if(st===-1)return;const gt=v[st];gt!==void 0&&(gt.update(j.inputSource,j.frame,l||r),gt.dispatchEvent({type:j.type,data:j.inputSource}))}function U(){i.removeEventListener("select",I),i.removeEventListener("selectstart",I),i.removeEventListener("selectend",I),i.removeEventListener("squeeze",I),i.removeEventListener("squeezestart",I),i.removeEventListener("squeezeend",I),i.removeEventListener("end",U),i.removeEventListener("inputsourceschange",F);for(let j=0;j<v.length;j++){const st=M[j];st!==null&&(M[j]=null,v[j].disconnect(st))}w=null,L=null,y.reset(),t.setRenderTarget(m),d=null,h=null,f=null,i=null,x=null,At.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){o=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",I),i.addEventListener("selectstart",I),i.addEventListener("selectend",I),i.addEventListener("squeeze",I),i.addEventListener("squeezestart",I),i.addEventListener("squeezeend",I),i.addEventListener("end",U),i.addEventListener("inputsourceschange",F),p.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(T),i.renderState.layers===void 0){const st={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:o};d=new XRWebGLLayer(i,e,st),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new Rs(d.framebufferWidth,d.framebufferHeight,{format:Zn,type:Di,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let st=null,gt=null,ot=null;p.depth&&(ot=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=p.stencil?go:ao,gt=p.stencil?mo:Cs);const vt={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:o};f=new XRWebGLBinding(i,e),h=f.createProjectionLayer(vt),i.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),x=new Rs(h.textureWidth,h.textureHeight,{format:Zn,type:Di,depthTexture:new Wd(h.textureWidth,h.textureHeight,gt,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await i.requestReferenceSpace(a),At.setContext(i),At.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function F(j){for(let st=0;st<j.removed.length;st++){const gt=j.removed[st],ot=M.indexOf(gt);ot>=0&&(M[ot]=null,v[ot].disconnect(gt))}for(let st=0;st<j.added.length;st++){const gt=j.added[st];let ot=M.indexOf(gt);if(ot===-1){for(let nt=0;nt<v.length;nt++)if(nt>=M.length){M.push(gt),ot=nt;break}else if(M[nt]===null){M[nt]=gt,ot=nt;break}if(ot===-1)break}const vt=v[ot];vt&&vt.connect(gt)}}const N=new B,G=new B;function z(j,st,gt){N.setFromMatrixPosition(st.matrixWorld),G.setFromMatrixPosition(gt.matrixWorld);const ot=N.distanceTo(G),vt=st.projectionMatrix.elements,nt=gt.projectionMatrix.elements,bt=vt[14]/(vt[10]-1),It=vt[14]/(vt[10]+1),kt=(vt[9]+1)/vt[5],O=(vt[9]-1)/vt[5],_e=(vt[8]-1)/vt[0],Xt=(nt[8]+1)/nt[0],$t=bt*_e,Ct=bt*Xt,te=ot/(-_e+Xt),Ot=te*-_e;if(st.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Ot),j.translateZ(te),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),vt[10]===-1)j.projectionMatrix.copy(st.projectionMatrix),j.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{const D=bt+te,A=It+te,Y=$t-Ot,tt=Ct+(ot-Ot),ht=kt*It/A*D,at=O*It/A*D;j.projectionMatrix.makePerspective(Y,tt,ht,at,D,A),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function q(j,st){st===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(st.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;let st=j.near,gt=j.far;y.texture!==null&&(y.depthNear>0&&(st=y.depthNear),y.depthFar>0&&(gt=y.depthFar)),_.near=C.near=E.near=st,_.far=C.far=E.far=gt,(w!==_.near||L!==_.far)&&(i.updateRenderState({depthNear:_.near,depthFar:_.far}),w=_.near,L=_.far);const ot=j.parent,vt=_.cameras;q(_,ot);for(let nt=0;nt<vt.length;nt++)q(vt[nt],ot);vt.length===2?z(_,E,C):_.projectionMatrix.copy(E.projectionMatrix),$(j,_,ot)};function $(j,st,gt){gt===null?j.matrix.copy(st.matrixWorld):(j.matrix.copy(gt.matrixWorld),j.matrix.invert(),j.matrix.multiply(st.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(st.projectionMatrix),j.projectionMatrixInverse.copy(st.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Ml*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(h===null&&d===null))return c},this.setFoveation=function(j){c=j,h!==null&&(h.fixedFoveation=j),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=j)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(_)};let et=null;function J(j,st){if(u=st.getViewerPose(l||r),g=st,u!==null){const gt=u.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let ot=!1;gt.length!==_.cameras.length&&(_.cameras.length=0,ot=!0);for(let nt=0;nt<gt.length;nt++){const bt=gt[nt];let It=null;if(d!==null)It=d.getViewport(bt);else{const O=f.getViewSubImage(h,bt);It=O.viewport,nt===0&&(t.setRenderTargetTextures(x,O.colorTexture,h.ignoreDepthValues?void 0:O.depthStencilTexture),t.setRenderTarget(x))}let kt=R[nt];kt===void 0&&(kt=new Tn,kt.layers.enable(nt),kt.viewport=new me,R[nt]=kt),kt.matrix.fromArray(bt.transform.matrix),kt.matrix.decompose(kt.position,kt.quaternion,kt.scale),kt.projectionMatrix.fromArray(bt.projectionMatrix),kt.projectionMatrixInverse.copy(kt.projectionMatrix).invert(),kt.viewport.set(It.x,It.y,It.width,It.height),nt===0&&(_.matrix.copy(kt.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),ot===!0&&_.cameras.push(kt)}const vt=i.enabledFeatures;if(vt&&vt.includes("depth-sensing")){const nt=f.getDepthInformation(gt[0]);nt&&nt.isValid&&nt.texture&&y.init(t,nt,i.renderState)}}for(let gt=0;gt<v.length;gt++){const ot=M[gt],vt=v[gt];ot!==null&&vt!==void 0&&vt.update(ot,st,l||r)}et&&et(j,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),g=null}const At=new Gd;At.setAnimationLoop(J),this.setAnimationLoop=function(j){et=j},this.dispose=function(){}}}const hs=new di,Bx=new Ce;function kx(s,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Bd(s)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,x,v,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?o(p,m):m.isMeshToonMaterial?(o(p,m),f(p,m)):m.isMeshPhongMaterial?(o(p,m),u(p,m)):m.isMeshStandardMaterial?(o(p,m),h(p,m),m.isMeshPhysicalMaterial&&d(p,m,M)):m.isMeshMatcapMaterial?(o(p,m),g(p,m)):m.isMeshDepthMaterial?o(p,m):m.isMeshDistanceMaterial?(o(p,m),y(p,m)):m.isMeshNormalMaterial?o(p,m):m.isLineBasicMaterial?(r(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,x,v):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function o(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===en&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===en&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const x=t.get(m),v=x.envMap,M=x.envMapRotation;v&&(p.envMap.value=v,hs.copy(M),hs.x*=-1,hs.y*=-1,hs.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(hs.y*=-1,hs.z*=-1),p.envMapRotation.value.setFromMatrix4(Bx.makeRotationFromEuler(hs)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function r(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,x,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=v*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===en&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function y(p,m){const x=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Hx(s,t,e,n){let i={},o={},r=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,v){const M=v.program;n.uniformBlockBinding(x,M)}function l(x,v){let M=i[x.id];M===void 0&&(g(x),M=u(x),i[x.id]=M,x.addEventListener("dispose",p));const T=v.program;n.updateUBOMapping(x,T);const b=t.render.frame;o[x.id]!==b&&(h(x),o[x.id]=b)}function u(x){const v=f();x.__bindingPointIndex=v;const M=s.createBuffer(),T=x.__size,b=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,T,b),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,M),M}function f(){for(let x=0;x<a;x++)if(r.indexOf(x)===-1)return r.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const v=i[x.id],M=x.uniforms,T=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let b=0,E=M.length;b<E;b++){const C=Array.isArray(M[b])?M[b]:[M[b]];for(let R=0,_=C.length;R<_;R++){const w=C[R];if(d(w,b,R,T)===!0){const L=w.__offset,I=Array.isArray(w.value)?w.value:[w.value];let U=0;for(let F=0;F<I.length;F++){const N=I[F],G=y(N);typeof N=="number"||typeof N=="boolean"?(w.__data[0]=N,s.bufferSubData(s.UNIFORM_BUFFER,L+U,w.__data)):N.isMatrix3?(w.__data[0]=N.elements[0],w.__data[1]=N.elements[1],w.__data[2]=N.elements[2],w.__data[3]=0,w.__data[4]=N.elements[3],w.__data[5]=N.elements[4],w.__data[6]=N.elements[5],w.__data[7]=0,w.__data[8]=N.elements[6],w.__data[9]=N.elements[7],w.__data[10]=N.elements[8],w.__data[11]=0):(N.toArray(w.__data,U),U+=G.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,L,w.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(x,v,M,T){const b=x.value,E=v+"_"+M;if(T[E]===void 0)return typeof b=="number"||typeof b=="boolean"?T[E]=b:T[E]=b.clone(),!0;{const C=T[E];if(typeof b=="number"||typeof b=="boolean"){if(C!==b)return T[E]=b,!0}else if(C.equals(b)===!1)return C.copy(b),!0}return!1}function g(x){const v=x.uniforms;let M=0;const T=16;for(let E=0,C=v.length;E<C;E++){const R=Array.isArray(v[E])?v[E]:[v[E]];for(let _=0,w=R.length;_<w;_++){const L=R[_],I=Array.isArray(L.value)?L.value:[L.value];for(let U=0,F=I.length;U<F;U++){const N=I[U],G=y(N),z=M%T,q=z%G.boundary,$=z+q;M+=q,$!==0&&T-$<G.storage&&(M+=T-$),L.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=M,M+=G.storage}}}const b=M%T;return b>0&&(M+=T-b),x.__size=M,x.__cache={},this}function y(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function p(x){const v=x.target;v.removeEventListener("dispose",p);const M=r.indexOf(v.__bindingPointIndex);r.splice(M,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete o[v.id]}function m(){for(const x in i)s.deleteBuffer(i[x]);r=[],i={},o={}}return{bind:c,update:l,dispose:m}}class Gx{constructor(t={}){const{canvas:e=Cp(),context:n=null,depth:i=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=t;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=r;const d=new Uint32Array(4),g=new Int32Array(4);let y=null,p=null;const m=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Fn,this.toneMapping=Ji,this.toneMappingExposure=1;const v=this;let M=!1,T=0,b=0,E=null,C=-1,R=null;const _=new me,w=new me;let L=null;const I=new ie(0);let U=0,F=e.width,N=e.height,G=1,z=null,q=null;const $=new me(0,0,F,N),et=new me(0,0,F,N);let J=!1;const At=new Yl;let j=!1,st=!1;const gt=new Ce,ot=new Ce,vt=new B,nt=new me,bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let It=!1;function kt(){return E===null?G:1}let O=n;function _e(P,k){return e.getContext(P,k)}try{const P={alpha:!0,depth:i,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ol}`),e.addEventListener("webglcontextlost",ct,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",yt,!1),O===null){const k="webgl2";if(O=_e(k,P),O===null)throw _e(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let Xt,$t,Ct,te,Ot,D,A,Y,tt,ht,at,zt,mt,wt,Yt,ft,X,rt,dt,ut,Rt,_t,jt,H;function St(){Xt=new Yg(O),Xt.init(),_t=new Lx(O,Xt),$t=new Hg(O,Xt,t,_t),Ct=new Rx(O),$t.reverseDepthBuffer&&Ct.buffers.depth.setReversed(!0),te=new Kg(O),Ot=new px,D=new Ix(O,Xt,Ct,Ot,$t,_t,te),A=new Vg(v),Y=new Xg(v),tt=new im(O),jt=new Bg(O,tt),ht=new jg(O,tt,te,jt),at=new Jg(O,ht,tt,te),dt=new Zg(O,$t,D),ft=new Gg(Ot),zt=new fx(v,A,Y,Xt,$t,jt,ft),mt=new kx(v,Ot),wt=new gx,Yt=new Sx(Xt),rt=new Og(v,A,Y,Ct,at,h,c),X=new Ax(v,at,$t),H=new Hx(O,te,$t,Ct),ut=new kg(O,Xt,te),Rt=new $g(O,Xt,te),te.programs=zt.programs,v.capabilities=$t,v.extensions=Xt,v.properties=Ot,v.renderLists=wt,v.shadowMap=X,v.state=Ct,v.info=te}St();const Q=new Ox(v,O);this.xr=Q,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const P=Xt.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=Xt.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(P){P!==void 0&&(G=P,this.setSize(F,N,!1))},this.getSize=function(P){return P.set(F,N)},this.setSize=function(P,k,V=!0){if(Q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=P,N=k,e.width=Math.floor(P*G),e.height=Math.floor(k*G),V===!0&&(e.style.width=P+"px",e.style.height=k+"px"),this.setViewport(0,0,P,k)},this.getDrawingBufferSize=function(P){return P.set(F*G,N*G).floor()},this.setDrawingBufferSize=function(P,k,V){F=P,N=k,G=V,e.width=Math.floor(P*V),e.height=Math.floor(k*V),this.setViewport(0,0,P,k)},this.getCurrentViewport=function(P){return P.copy(_)},this.getViewport=function(P){return P.copy($)},this.setViewport=function(P,k,V,Z){P.isVector4?$.set(P.x,P.y,P.z,P.w):$.set(P,k,V,Z),Ct.viewport(_.copy($).multiplyScalar(G).round())},this.getScissor=function(P){return P.copy(et)},this.setScissor=function(P,k,V,Z){P.isVector4?et.set(P.x,P.y,P.z,P.w):et.set(P,k,V,Z),Ct.scissor(w.copy(et).multiplyScalar(G).round())},this.getScissorTest=function(){return J},this.setScissorTest=function(P){Ct.setScissorTest(J=P)},this.setOpaqueSort=function(P){z=P},this.setTransparentSort=function(P){q=P},this.getClearColor=function(P){return P.copy(rt.getClearColor())},this.setClearColor=function(){rt.setClearColor.apply(rt,arguments)},this.getClearAlpha=function(){return rt.getClearAlpha()},this.setClearAlpha=function(){rt.setClearAlpha.apply(rt,arguments)},this.clear=function(P=!0,k=!0,V=!0){let Z=0;if(P){let W=!1;if(E!==null){const xt=E.texture.format;W=xt===Wl||xt===Vl||xt===Gl}if(W){const xt=E.texture.type,Tt=xt===Di||xt===Cs||xt===tr||xt===mo||xt===kl||xt===Hl,Dt=rt.getClearColor(),Ut=rt.getClearAlpha(),Ht=Dt.r,Wt=Dt.g,Bt=Dt.b;Tt?(d[0]=Ht,d[1]=Wt,d[2]=Bt,d[3]=Ut,O.clearBufferuiv(O.COLOR,0,d)):(g[0]=Ht,g[1]=Wt,g[2]=Bt,g[3]=Ut,O.clearBufferiv(O.COLOR,0,g))}else Z|=O.COLOR_BUFFER_BIT}k&&(Z|=O.DEPTH_BUFFER_BIT,O.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),V&&(Z|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ct,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",yt,!1),wt.dispose(),Yt.dispose(),Ot.dispose(),A.dispose(),Y.dispose(),at.dispose(),jt.dispose(),H.dispose(),zt.dispose(),Q.dispose(),Q.removeEventListener("sessionstart",Ds),Q.removeEventListener("sessionend",Fi),Rn.stop()};function ct(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const P=te.autoReset,k=X.enabled,V=X.autoUpdate,Z=X.needsUpdate,W=X.type;St(),te.autoReset=P,X.enabled=k,X.autoUpdate=V,X.needsUpdate=Z,X.type=W}function yt(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function ee(P){const k=P.target;k.removeEventListener("dispose",ee),Re(k)}function Re(P){ke(P),Ot.remove(P)}function ke(P){const k=Ot.get(P).programs;k!==void 0&&(k.forEach(function(V){zt.releaseProgram(V)}),P.isShaderMaterial&&zt.releaseShaderCache(P))}this.renderBufferDirect=function(P,k,V,Z,W,xt){k===null&&(k=bt);const Tt=W.isMesh&&W.matrixWorld.determinant()<0,Dt=Ne(P,k,V,Z,W);Ct.setMaterial(Z,Tt);let Ut=V.index,Ht=1;if(Z.wireframe===!0){if(Ut=ht.getWireframeAttribute(V),Ut===void 0)return;Ht=2}const Wt=V.drawRange,Bt=V.attributes.position;let fe=Wt.start*Ht,Me=(Wt.start+Wt.count)*Ht;xt!==null&&(fe=Math.max(fe,xt.start*Ht),Me=Math.min(Me,(xt.start+xt.count)*Ht)),Ut!==null?(fe=Math.max(fe,0),Me=Math.min(Me,Ut.count)):Bt!=null&&(fe=Math.max(fe,0),Me=Math.min(Me,Bt.count));const De=Me-fe;if(De<0||De===1/0)return;jt.setup(W,Z,Dt,V,Ut);let Mn,ce=ut;if(Ut!==null&&(Mn=tt.get(Ut),ce=Rt,ce.setIndex(Mn)),W.isMesh)Z.wireframe===!0?(Ct.setLineWidth(Z.wireframeLinewidth*kt()),ce.setMode(O.LINES)):ce.setMode(O.TRIANGLES);else if(W.isLine){let Gt=Z.linewidth;Gt===void 0&&(Gt=1),Ct.setLineWidth(Gt*kt()),W.isLineSegments?ce.setMode(O.LINES):W.isLineLoop?ce.setMode(O.LINE_LOOP):ce.setMode(O.LINE_STRIP)}else W.isPoints?ce.setMode(O.POINTS):W.isSprite&&ce.setMode(O.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)ce.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(Xt.get("WEBGL_multi_draw"))ce.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Gt=W._multiDrawStarts,Ke=W._multiDrawCounts,le=W._multiDrawCount,Hn=Ut?tt.get(Ut).bytesPerElement:1,Ns=Ot.get(Z).currentProgram.getUniforms();for(let Sn=0;Sn<le;Sn++)Ns.setValue(O,"_gl_DrawID",Sn),ce.render(Gt[Sn]/Hn,Ke[Sn])}else if(W.isInstancedMesh)ce.renderInstances(fe,De,W.count);else if(V.isInstancedBufferGeometry){const Gt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Ke=Math.min(V.instanceCount,Gt);ce.renderInstances(fe,De,Ke)}else ce.render(fe,De)};function ne(P,k,V){P.transparent===!0&&P.side===zn&&P.forceSinglePass===!1?(P.side=en,P.needsUpdate=!0,oe(P,k,V),P.side=es,P.needsUpdate=!0,oe(P,k,V),P.side=zn):oe(P,k,V)}this.compile=function(P,k,V=null){V===null&&(V=P),p=Yt.get(V),p.init(k),x.push(p),V.traverseVisible(function(W){W.isLight&&W.layers.test(k.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),P!==V&&P.traverseVisible(function(W){W.isLight&&W.layers.test(k.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),p.setupLights();const Z=new Set;return P.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const xt=W.material;if(xt)if(Array.isArray(xt))for(let Tt=0;Tt<xt.length;Tt++){const Dt=xt[Tt];ne(Dt,V,W),Z.add(Dt)}else ne(xt,V,W),Z.add(xt)}),x.pop(),p=null,Z},this.compileAsync=function(P,k,V=null){const Z=this.compile(P,k,V);return new Promise(W=>{function xt(){if(Z.forEach(function(Tt){Ot.get(Tt).currentProgram.isReady()&&Z.delete(Tt)}),Z.size===0){W(P);return}setTimeout(xt,10)}Xt.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let Xe=null;function sn(P){Xe&&Xe(P)}function Ds(){Rn.stop()}function Fi(){Rn.start()}const Rn=new Gd;Rn.setAnimationLoop(sn),typeof self<"u"&&Rn.setContext(self),this.setAnimationLoop=function(P){Xe=P,Q.setAnimationLoop(P),P===null?Rn.stop():Rn.start()},Q.addEventListener("sessionstart",Ds),Q.addEventListener("sessionend",Fi),this.render=function(P,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Q.enabled===!0&&Q.isPresenting===!0&&(Q.cameraAutoUpdate===!0&&Q.updateCamera(k),k=Q.getCamera()),P.isScene===!0&&P.onBeforeRender(v,P,k,E),p=Yt.get(P,x.length),p.init(k),x.push(p),ot.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),At.setFromProjectionMatrix(ot),st=this.localClippingEnabled,j=ft.init(this.clippingPlanes,st),y=wt.get(P,m.length),y.init(),m.push(y),Q.enabled===!0&&Q.isPresenting===!0){const xt=v.xr.getDepthSensingMesh();xt!==null&&zi(xt,k,-1/0,v.sortObjects)}zi(P,k,0,v.sortObjects),y.finish(),v.sortObjects===!0&&y.sort(z,q),It=Q.enabled===!1||Q.isPresenting===!1||Q.hasDepthSensing()===!1,It&&rt.addToRenderList(y,P),this.info.render.frame++,j===!0&&ft.beginShadows();const V=p.state.shadowsArray;X.render(V,P,k),j===!0&&ft.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=y.opaque,W=y.transmissive;if(p.setupLights(),k.isArrayCamera){const xt=k.cameras;if(W.length>0)for(let Tt=0,Dt=xt.length;Tt<Dt;Tt++){const Ut=xt[Tt];qt(Z,W,P,Ut)}It&&rt.render(P);for(let Tt=0,Dt=xt.length;Tt<Dt;Tt++){const Ut=xt[Tt];lr(y,P,Ut,Ut.viewport)}}else W.length>0&&qt(Z,W,P,k),It&&rt.render(P),lr(y,P,k);E!==null&&(D.updateMultisampleRenderTarget(E),D.updateRenderTargetMipmap(E)),P.isScene===!0&&P.onAfterRender(v,P,k),jt.resetDefaultState(),C=-1,R=null,x.pop(),x.length>0?(p=x[x.length-1],j===!0&&ft.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?y=m[m.length-1]:y=null};function zi(P,k,V,Z){if(P.visible===!1)return;if(P.layers.test(k.layers)){if(P.isGroup)V=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(k);else if(P.isLight)p.pushLight(P),P.castShadow&&p.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||At.intersectsSprite(P)){Z&&nt.setFromMatrixPosition(P.matrixWorld).applyMatrix4(ot);const Tt=at.update(P),Dt=P.material;Dt.visible&&y.push(P,Tt,Dt,V,nt.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||At.intersectsObject(P))){const Tt=at.update(P),Dt=P.material;if(Z&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),nt.copy(P.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),nt.copy(Tt.boundingSphere.center)),nt.applyMatrix4(P.matrixWorld).applyMatrix4(ot)),Array.isArray(Dt)){const Ut=Tt.groups;for(let Ht=0,Wt=Ut.length;Ht<Wt;Ht++){const Bt=Ut[Ht],fe=Dt[Bt.materialIndex];fe&&fe.visible&&y.push(P,Tt,fe,V,nt.z,Bt)}}else Dt.visible&&y.push(P,Tt,Dt,V,nt.z,null)}}const xt=P.children;for(let Tt=0,Dt=xt.length;Tt<Dt;Tt++)zi(xt[Tt],k,V,Z)}function lr(P,k,V,Z){const W=P.opaque,xt=P.transmissive,Tt=P.transparent;p.setupLightsView(V),j===!0&&ft.setGlobalState(v.clippingPlanes,V),Z&&Ct.viewport(_.copy(Z)),W.length>0&&Zt(W,k,V),xt.length>0&&Zt(xt,k,V),Tt.length>0&&Zt(Tt,k,V),Ct.buffers.depth.setTest(!0),Ct.buffers.depth.setMask(!0),Ct.buffers.color.setMask(!0),Ct.setPolygonOffset(!1)}function qt(P,k,V,Z){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Z.id]===void 0&&(p.state.transmissionRenderTarget[Z.id]=new Rs(1,1,{generateMipmaps:!0,type:Xt.has("EXT_color_buffer_half_float")||Xt.has("EXT_color_buffer_float")?sr:Di,minFilter:Ts,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:de.workingColorSpace}));const xt=p.state.transmissionRenderTarget[Z.id],Tt=Z.viewport||_;xt.setSize(Tt.z,Tt.w);const Dt=v.getRenderTarget();v.setRenderTarget(xt),v.getClearColor(I),U=v.getClearAlpha(),U<1&&v.setClearColor(16777215,.5),v.clear(),It&&rt.render(V);const Ut=v.toneMapping;v.toneMapping=Ji;const Ht=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),p.setupLightsView(Z),j===!0&&ft.setGlobalState(v.clippingPlanes,Z),Zt(P,V,Z),D.updateMultisampleRenderTarget(xt),D.updateRenderTargetMipmap(xt),Xt.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let Bt=0,fe=k.length;Bt<fe;Bt++){const Me=k[Bt],De=Me.object,Mn=Me.geometry,ce=Me.material,Gt=Me.group;if(ce.side===zn&&De.layers.test(Z.layers)){const Ke=ce.side;ce.side=en,ce.needsUpdate=!0,Kt(De,V,Z,Mn,ce,Gt),ce.side=Ke,ce.needsUpdate=!0,Wt=!0}}Wt===!0&&(D.updateMultisampleRenderTarget(xt),D.updateRenderTargetMipmap(xt))}v.setRenderTarget(Dt),v.setClearColor(I,U),Ht!==void 0&&(Z.viewport=Ht),v.toneMapping=Ut}function Zt(P,k,V){const Z=k.isScene===!0?k.overrideMaterial:null;for(let W=0,xt=P.length;W<xt;W++){const Tt=P[W],Dt=Tt.object,Ut=Tt.geometry,Ht=Z===null?Tt.material:Z,Wt=Tt.group;Dt.layers.test(V.layers)&&Kt(Dt,k,V,Ut,Ht,Wt)}}function Kt(P,k,V,Z,W,xt){P.onBeforeRender(v,k,V,Z,W,xt),P.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),W.onBeforeRender(v,k,V,Z,P,xt),W.transparent===!0&&W.side===zn&&W.forceSinglePass===!1?(W.side=en,W.needsUpdate=!0,v.renderBufferDirect(V,k,Z,W,P,xt),W.side=es,W.needsUpdate=!0,v.renderBufferDirect(V,k,Z,W,P,xt),W.side=zn):v.renderBufferDirect(V,k,Z,W,P,xt),P.onAfterRender(v,k,V,Z,W,xt)}function oe(P,k,V){k.isScene!==!0&&(k=bt);const Z=Ot.get(P),W=p.state.lights,xt=p.state.shadowsArray,Tt=W.state.version,Dt=zt.getParameters(P,W.state,xt,k,V),Ut=zt.getProgramCacheKey(Dt);let Ht=Z.programs;Z.environment=P.isMeshStandardMaterial?k.environment:null,Z.fog=k.fog,Z.envMap=(P.isMeshStandardMaterial?Y:A).get(P.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&P.envMap===null?k.environmentRotation:P.envMapRotation,Ht===void 0&&(P.addEventListener("dispose",ee),Ht=new Map,Z.programs=Ht);let Wt=Ht.get(Ut);if(Wt!==void 0){if(Z.currentProgram===Wt&&Z.lightsStateVersion===Tt)return $e(P,Dt),Wt}else Dt.uniforms=zt.getUniforms(P),P.onBeforeCompile(Dt,v),Wt=zt.acquireProgram(Dt,Ut),Ht.set(Ut,Wt),Z.uniforms=Dt.uniforms;const Bt=Z.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Bt.clippingPlanes=ft.uniform),$e(P,Dt),Z.needsLights=ve(P),Z.lightsStateVersion=Tt,Z.needsLights&&(Bt.ambientLightColor.value=W.state.ambient,Bt.lightProbe.value=W.state.probe,Bt.directionalLights.value=W.state.directional,Bt.directionalLightShadows.value=W.state.directionalShadow,Bt.spotLights.value=W.state.spot,Bt.spotLightShadows.value=W.state.spotShadow,Bt.rectAreaLights.value=W.state.rectArea,Bt.ltc_1.value=W.state.rectAreaLTC1,Bt.ltc_2.value=W.state.rectAreaLTC2,Bt.pointLights.value=W.state.point,Bt.pointLightShadows.value=W.state.pointShadow,Bt.hemisphereLights.value=W.state.hemi,Bt.directionalShadowMap.value=W.state.directionalShadowMap,Bt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Bt.spotShadowMap.value=W.state.spotShadowMap,Bt.spotLightMatrix.value=W.state.spotLightMatrix,Bt.spotLightMap.value=W.state.spotLightMap,Bt.pointShadowMap.value=W.state.pointShadowMap,Bt.pointShadowMatrix.value=W.state.pointShadowMatrix),Z.currentProgram=Wt,Z.uniformsList=null,Wt}function ye(P){if(P.uniformsList===null){const k=P.currentProgram.getUniforms();P.uniformsList=Qr.seqWithValue(k.seq,P.uniforms)}return P.uniformsList}function $e(P,k){const V=Ot.get(P);V.outputColorSpace=k.outputColorSpace,V.batching=k.batching,V.batchingColor=k.batchingColor,V.instancing=k.instancing,V.instancingColor=k.instancingColor,V.instancingMorph=k.instancingMorph,V.skinning=k.skinning,V.morphTargets=k.morphTargets,V.morphNormals=k.morphNormals,V.morphColors=k.morphColors,V.morphTargetsCount=k.morphTargetsCount,V.numClippingPlanes=k.numClippingPlanes,V.numIntersection=k.numClipIntersection,V.vertexAlphas=k.vertexAlphas,V.vertexTangents=k.vertexTangents,V.toneMapping=k.toneMapping}function Ne(P,k,V,Z,W){k.isScene!==!0&&(k=bt),D.resetTextureUnits();const xt=k.fog,Tt=Z.isMeshStandardMaterial?k.environment:null,Dt=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:os,Ut=(Z.isMeshStandardMaterial?Y:A).get(Z.envMap||Tt),Ht=Z.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Wt=!!V.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Bt=!!V.morphAttributes.position,fe=!!V.morphAttributes.normal,Me=!!V.morphAttributes.color;let De=Ji;Z.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(De=v.toneMapping);const Mn=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ce=Mn!==void 0?Mn.length:0,Gt=Ot.get(Z),Ke=p.state.lights;if(j===!0&&(st===!0||P!==R)){const Pn=P===R&&Z.id===C;ft.setState(Z,P,Pn)}let le=!1;Z.version===Gt.__version?(Gt.needsLights&&Gt.lightsStateVersion!==Ke.state.version||Gt.outputColorSpace!==Dt||W.isBatchedMesh&&Gt.batching===!1||!W.isBatchedMesh&&Gt.batching===!0||W.isBatchedMesh&&Gt.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Gt.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Gt.instancing===!1||!W.isInstancedMesh&&Gt.instancing===!0||W.isSkinnedMesh&&Gt.skinning===!1||!W.isSkinnedMesh&&Gt.skinning===!0||W.isInstancedMesh&&Gt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Gt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Gt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Gt.instancingMorph===!1&&W.morphTexture!==null||Gt.envMap!==Ut||Z.fog===!0&&Gt.fog!==xt||Gt.numClippingPlanes!==void 0&&(Gt.numClippingPlanes!==ft.numPlanes||Gt.numIntersection!==ft.numIntersection)||Gt.vertexAlphas!==Ht||Gt.vertexTangents!==Wt||Gt.morphTargets!==Bt||Gt.morphNormals!==fe||Gt.morphColors!==Me||Gt.toneMapping!==De||Gt.morphTargetsCount!==ce)&&(le=!0):(le=!0,Gt.__version=Z.version);let Hn=Gt.currentProgram;le===!0&&(Hn=oe(Z,k,W));let Ns=!1,Sn=!1,Pa=!1;const Ue=Hn.getUniforms(),Oi=Gt.uniforms;if(Ct.useProgram(Hn.program)&&(Ns=!0,Sn=!0,Pa=!0),Z.id!==C&&(C=Z.id,Sn=!0),Ns||R!==P){$t.reverseDepthBuffer?(gt.copy(P.projectionMatrix),Pp(gt),Ip(gt),Ue.setValue(O,"projectionMatrix",gt)):Ue.setValue(O,"projectionMatrix",P.projectionMatrix),Ue.setValue(O,"viewMatrix",P.matrixWorldInverse);const Pn=Ue.map.cameraPosition;Pn!==void 0&&Pn.setValue(O,vt.setFromMatrixPosition(P.matrixWorld)),$t.logarithmicDepthBuffer&&Ue.setValue(O,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Ue.setValue(O,"isOrthographic",P.isOrthographicCamera===!0),R!==P&&(R=P,Sn=!0,Pa=!0)}if(W.isSkinnedMesh){Ue.setOptional(O,W,"bindMatrix"),Ue.setOptional(O,W,"bindMatrixInverse");const Pn=W.skeleton;Pn&&(Pn.boneTexture===null&&Pn.computeBoneTexture(),Ue.setValue(O,"boneTexture",Pn.boneTexture,D))}W.isBatchedMesh&&(Ue.setOptional(O,W,"batchingTexture"),Ue.setValue(O,"batchingTexture",W._matricesTexture,D),Ue.setOptional(O,W,"batchingIdTexture"),Ue.setValue(O,"batchingIdTexture",W._indirectTexture,D),Ue.setOptional(O,W,"batchingColorTexture"),W._colorsTexture!==null&&Ue.setValue(O,"batchingColorTexture",W._colorsTexture,D));const Ia=V.morphAttributes;if((Ia.position!==void 0||Ia.normal!==void 0||Ia.color!==void 0)&&dt.update(W,V,Hn),(Sn||Gt.receiveShadow!==W.receiveShadow)&&(Gt.receiveShadow=W.receiveShadow,Ue.setValue(O,"receiveShadow",W.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(Oi.envMap.value=Ut,Oi.flipEnvMap.value=Ut.isCubeTexture&&Ut.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&k.environment!==null&&(Oi.envMapIntensity.value=k.environmentIntensity),Sn&&(Ue.setValue(O,"toneMappingExposure",v.toneMappingExposure),Gt.needsLights&&Le(Oi,Pa),xt&&Z.fog===!0&&mt.refreshFogUniforms(Oi,xt),mt.refreshMaterialUniforms(Oi,Z,G,N,p.state.transmissionRenderTarget[P.id]),Qr.upload(O,ye(Gt),Oi,D)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Qr.upload(O,ye(Gt),Oi,D),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Ue.setValue(O,"center",W.center),Ue.setValue(O,"modelViewMatrix",W.modelViewMatrix),Ue.setValue(O,"normalMatrix",W.normalMatrix),Ue.setValue(O,"modelMatrix",W.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const Pn=Z.uniformsGroups;for(let La=0,Bf=Pn.length;La<Bf;La++){const xu=Pn[La];H.update(xu,Hn),H.bind(xu,Hn)}}return Hn}function Le(P,k){P.ambientLightColor.needsUpdate=k,P.lightProbe.needsUpdate=k,P.directionalLights.needsUpdate=k,P.directionalLightShadows.needsUpdate=k,P.pointLights.needsUpdate=k,P.pointLightShadows.needsUpdate=k,P.spotLights.needsUpdate=k,P.spotLightShadows.needsUpdate=k,P.rectAreaLights.needsUpdate=k,P.hemisphereLights.needsUpdate=k}function ve(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(P,k,V){Ot.get(P.texture).__webglTexture=k,Ot.get(P.depthTexture).__webglTexture=V;const Z=Ot.get(P);Z.__hasExternalTextures=!0,Z.__autoAllocateDepthBuffer=V===void 0,Z.__autoAllocateDepthBuffer||Xt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(P,k){const V=Ot.get(P);V.__webglFramebuffer=k,V.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(P,k=0,V=0){E=P,T=k,b=V;let Z=!0,W=null,xt=!1,Tt=!1;if(P){const Ut=Ot.get(P);if(Ut.__useDefaultFramebuffer!==void 0)Ct.bindFramebuffer(O.FRAMEBUFFER,null),Z=!1;else if(Ut.__webglFramebuffer===void 0)D.setupRenderTarget(P);else if(Ut.__hasExternalTextures)D.rebindTextures(P,Ot.get(P.texture).__webglTexture,Ot.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){const Bt=P.depthTexture;if(Ut.__boundDepthTexture!==Bt){if(Bt!==null&&Ot.has(Bt)&&(P.width!==Bt.image.width||P.height!==Bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(P)}}const Ht=P.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(Tt=!0);const Wt=Ot.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(Wt[k])?W=Wt[k][V]:W=Wt[k],xt=!0):P.samples>0&&D.useMultisampledRTT(P)===!1?W=Ot.get(P).__webglMultisampledFramebuffer:Array.isArray(Wt)?W=Wt[V]:W=Wt,_.copy(P.viewport),w.copy(P.scissor),L=P.scissorTest}else _.copy($).multiplyScalar(G).floor(),w.copy(et).multiplyScalar(G).floor(),L=J;if(Ct.bindFramebuffer(O.FRAMEBUFFER,W)&&Z&&Ct.drawBuffers(P,W),Ct.viewport(_),Ct.scissor(w),Ct.setScissorTest(L),xt){const Ut=Ot.get(P.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ut.__webglTexture,V)}else if(Tt){const Ut=Ot.get(P.texture),Ht=k||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ut.__webglTexture,V||0,Ht)}C=-1},this.readRenderTargetPixels=function(P,k,V,Z,W,xt,Tt){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=Ot.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Tt!==void 0&&(Dt=Dt[Tt]),Dt){Ct.bindFramebuffer(O.FRAMEBUFFER,Dt);try{const Ut=P.texture,Ht=Ut.format,Wt=Ut.type;if(!$t.textureFormatReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$t.textureTypeReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=P.width-Z&&V>=0&&V<=P.height-W&&O.readPixels(k,V,Z,W,_t.convert(Ht),_t.convert(Wt),xt)}finally{const Ut=E!==null?Ot.get(E).__webglFramebuffer:null;Ct.bindFramebuffer(O.FRAMEBUFFER,Ut)}}},this.readRenderTargetPixelsAsync=async function(P,k,V,Z,W,xt,Tt){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=Ot.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Tt!==void 0&&(Dt=Dt[Tt]),Dt){const Ut=P.texture,Ht=Ut.format,Wt=Ut.type;if(!$t.textureFormatReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$t.textureTypeReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=P.width-Z&&V>=0&&V<=P.height-W){Ct.bindFramebuffer(O.FRAMEBUFFER,Dt);const Bt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Bt),O.bufferData(O.PIXEL_PACK_BUFFER,xt.byteLength,O.STREAM_READ),O.readPixels(k,V,Z,W,_t.convert(Ht),_t.convert(Wt),0);const fe=E!==null?Ot.get(E).__webglFramebuffer:null;Ct.bindFramebuffer(O.FRAMEBUFFER,fe);const Me=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Rp(O,Me,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Bt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,xt),O.deleteBuffer(Bt),O.deleteSync(Me),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(P,k=null,V=0){P.isTexture!==!0&&(Jr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,P=arguments[1]);const Z=Math.pow(2,-V),W=Math.floor(P.image.width*Z),xt=Math.floor(P.image.height*Z),Tt=k!==null?k.x:0,Dt=k!==null?k.y:0;D.setTexture2D(P,0),O.copyTexSubImage2D(O.TEXTURE_2D,V,0,0,Tt,Dt,W,xt),Ct.unbindTexture()},this.copyTextureToTexture=function(P,k,V=null,Z=null,W=0){P.isTexture!==!0&&(Jr("WebGLRenderer: copyTextureToTexture function signature has changed."),Z=arguments[0]||null,P=arguments[1],k=arguments[2],W=arguments[3]||0,V=null);let xt,Tt,Dt,Ut,Ht,Wt;V!==null?(xt=V.max.x-V.min.x,Tt=V.max.y-V.min.y,Dt=V.min.x,Ut=V.min.y):(xt=P.image.width,Tt=P.image.height,Dt=0,Ut=0),Z!==null?(Ht=Z.x,Wt=Z.y):(Ht=0,Wt=0);const Bt=_t.convert(k.format),fe=_t.convert(k.type);D.setTexture2D(k,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,k.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,k.unpackAlignment);const Me=O.getParameter(O.UNPACK_ROW_LENGTH),De=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Mn=O.getParameter(O.UNPACK_SKIP_PIXELS),ce=O.getParameter(O.UNPACK_SKIP_ROWS),Gt=O.getParameter(O.UNPACK_SKIP_IMAGES),Ke=P.isCompressedTexture?P.mipmaps[W]:P.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,Ke.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Ke.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Dt),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ut),P.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,W,Ht,Wt,xt,Tt,Bt,fe,Ke.data):P.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,W,Ht,Wt,Ke.width,Ke.height,Bt,Ke.data):O.texSubImage2D(O.TEXTURE_2D,W,Ht,Wt,xt,Tt,Bt,fe,Ke),O.pixelStorei(O.UNPACK_ROW_LENGTH,Me),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,De),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Mn),O.pixelStorei(O.UNPACK_SKIP_ROWS,ce),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Gt),W===0&&k.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),Ct.unbindTexture()},this.copyTextureToTexture3D=function(P,k,V=null,Z=null,W=0){P.isTexture!==!0&&(Jr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,Z=arguments[1]||null,P=arguments[2],k=arguments[3],W=arguments[4]||0);let xt,Tt,Dt,Ut,Ht,Wt,Bt,fe,Me;const De=P.isCompressedTexture?P.mipmaps[W]:P.image;V!==null?(xt=V.max.x-V.min.x,Tt=V.max.y-V.min.y,Dt=V.max.z-V.min.z,Ut=V.min.x,Ht=V.min.y,Wt=V.min.z):(xt=De.width,Tt=De.height,Dt=De.depth,Ut=0,Ht=0,Wt=0),Z!==null?(Bt=Z.x,fe=Z.y,Me=Z.z):(Bt=0,fe=0,Me=0);const Mn=_t.convert(k.format),ce=_t.convert(k.type);let Gt;if(k.isData3DTexture)D.setTexture3D(k,0),Gt=O.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)D.setTexture2DArray(k,0),Gt=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,k.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,k.unpackAlignment);const Ke=O.getParameter(O.UNPACK_ROW_LENGTH),le=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Hn=O.getParameter(O.UNPACK_SKIP_PIXELS),Ns=O.getParameter(O.UNPACK_SKIP_ROWS),Sn=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,De.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,De.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Ut),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ht),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Wt),P.isDataTexture||P.isData3DTexture?O.texSubImage3D(Gt,W,Bt,fe,Me,xt,Tt,Dt,Mn,ce,De.data):k.isCompressedArrayTexture?O.compressedTexSubImage3D(Gt,W,Bt,fe,Me,xt,Tt,Dt,Mn,De.data):O.texSubImage3D(Gt,W,Bt,fe,Me,xt,Tt,Dt,Mn,ce,De),O.pixelStorei(O.UNPACK_ROW_LENGTH,Ke),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,le),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Hn),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ns),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Sn),W===0&&k.generateMipmaps&&O.generateMipmap(Gt),Ct.unbindTexture()},this.initRenderTarget=function(P){Ot.get(P).__webglFramebuffer===void 0&&D.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?D.setTextureCube(P,0):P.isData3DTexture?D.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?D.setTexture2DArray(P,0):D.setTexture2D(P,0),Ct.unbindTexture()},this.resetState=function(){T=0,b=0,E=null,Ct.reset(),jt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ql?"display-p3":"srgb",e.unpackColorSpace=de.workingColorSpace===Sa?"display-p3":"srgb"}}class $l{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new ie(t),this.near=e,this.far=n}clone(){return new $l(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class $d extends nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new di,this.environmentIntensity=1,this.environmentRotation=new di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Kl extends mn{constructor(t,e,n,i,o,r,a,c,l){super(t,e,n,i,o,r,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class fi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),o=0;e.push(0);for(let r=1;r<=t;r++)n=this.getPoint(r/t),o+=n.distanceTo(i),e.push(o),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const o=n.length;let r;e?r=e:r=t*n[o-1];let a=0,c=o-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-r,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===r)return i/(o-1);const u=n[i],h=n[i+1]-u,d=(r-u)/h;return(i+d)/(o-1)}getTangent(t,e){let i=t-1e-4,o=t+1e-4;i<0&&(i=0),o>1&&(o=1);const r=this.getPoint(i),a=this.getPoint(o),c=e||(r.isVector2?new Lt:new B);return c.copy(a).sub(r).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new B,i=[],o=[],r=[],a=new B,c=new Ce;for(let d=0;d<=t;d++){const g=d/t;i[d]=this.getTangentAt(g,new B)}o[0]=new B,r[0]=new B;let l=Number.MAX_VALUE;const u=Math.abs(i[0].x),f=Math.abs(i[0].y),h=Math.abs(i[0].z);u<=l&&(l=u,n.set(1,0,0)),f<=l&&(l=f,n.set(0,1,0)),h<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),o[0].crossVectors(i[0],a),r[0].crossVectors(i[0],o[0]);for(let d=1;d<=t;d++){if(o[d]=o[d-1].clone(),r[d]=r[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Qe(i[d-1].dot(i[d]),-1,1));o[d].applyMatrix4(c.makeRotationAxis(a,g))}r[d].crossVectors(i[d],o[d])}if(e===!0){let d=Math.acos(Qe(o[0].dot(o[t]),-1,1));d/=t,i[0].dot(a.crossVectors(o[0],o[t]))>0&&(d=-d);for(let g=1;g<=t;g++)o[g].applyMatrix4(c.makeRotationAxis(i[g],d*g)),r[g].crossVectors(i[g],o[g])}return{tangents:i,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Zl extends fi{constructor(t=0,e=0,n=1,i=1,o=0,r=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Lt){const n=e,i=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=i;for(;o>i;)o-=i;o<Number.EPSILON&&(r?o=0:o=i),this.aClockwise===!0&&!r&&(o===i?o=-i:o=o-i);const a=this.aStartAngle+t*o;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=c-this.aX,d=l-this.aY;c=h*u-d*f+this.aX,l=h*f+d*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Vx extends Zl{constructor(t,e,n,i,o,r){super(t,e,n,n,i,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Jl(){let s=0,t=0,e=0,n=0;function i(o,r,a,c){s=o,t=a,e=-3*o+3*r-2*a-c,n=2*o-2*r+a+c}return{initCatmullRom:function(o,r,a,c,l){i(r,a,l*(a-o),l*(c-r))},initNonuniformCatmullRom:function(o,r,a,c,l,u,f){let h=(r-o)/l-(a-o)/(l+u)+(a-r)/u,d=(a-r)/u-(c-r)/(u+f)+(c-a)/f;h*=u,d*=u,i(r,a,h,d)},calc:function(o){const r=o*o,a=r*o;return s+t*o+e*r+n*a}}}const Ir=new B,uc=new Jl,hc=new Jl,dc=new Jl;class Wx extends fi{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new B){const n=e,i=this.points,o=i.length,r=(o-(this.closed?0:1))*t;let a=Math.floor(r),c=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:c===0&&a===o-1&&(a=o-2,c=1);let l,u;this.closed||a>0?l=i[(a-1)%o]:(Ir.subVectors(i[0],i[1]).add(i[0]),l=Ir);const f=i[a%o],h=i[(a+1)%o];if(this.closed||a+2<o?u=i[(a+2)%o]:(Ir.subVectors(i[o-1],i[o-2]).add(i[o-1]),u=Ir),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(f),d),y=Math.pow(f.distanceToSquared(h),d),p=Math.pow(h.distanceToSquared(u),d);y<1e-4&&(y=1),g<1e-4&&(g=y),p<1e-4&&(p=y),uc.initNonuniformCatmullRom(l.x,f.x,h.x,u.x,g,y,p),hc.initNonuniformCatmullRom(l.y,f.y,h.y,u.y,g,y,p),dc.initNonuniformCatmullRom(l.z,f.z,h.z,u.z,g,y,p)}else this.curveType==="catmullrom"&&(uc.initCatmullRom(l.x,f.x,h.x,u.x,this.tension),hc.initCatmullRom(l.y,f.y,h.y,u.y,this.tension),dc.initCatmullRom(l.z,f.z,h.z,u.z,this.tension));return n.set(uc.calc(c),hc.calc(c),dc.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new B().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function dh(s,t,e,n,i){const o=(n-t)*.5,r=(i-e)*.5,a=s*s,c=s*a;return(2*e-2*n+o+r)*c+(-3*e+3*n-2*o-r)*a+o*s+e}function qx(s,t){const e=1-s;return e*e*t}function Xx(s,t){return 2*(1-s)*s*t}function Yx(s,t){return s*s*t}function jo(s,t,e,n){return qx(s,t)+Xx(s,e)+Yx(s,n)}function jx(s,t){const e=1-s;return e*e*e*t}function $x(s,t){const e=1-s;return 3*e*e*s*t}function Kx(s,t){return 3*(1-s)*s*s*t}function Zx(s,t){return s*s*s*t}function $o(s,t,e,n,i){return jx(s,t)+$x(s,e)+Kx(s,n)+Zx(s,i)}class Kd extends fi{constructor(t=new Lt,e=new Lt,n=new Lt,i=new Lt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Lt){const n=e,i=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set($o(t,i.x,o.x,r.x,a.x),$o(t,i.y,o.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Jx extends fi{constructor(t=new B,e=new B,n=new B,i=new B){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new B){const n=e,i=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set($o(t,i.x,o.x,r.x,a.x),$o(t,i.y,o.y,r.y,a.y),$o(t,i.z,o.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Zd extends fi{constructor(t=new Lt,e=new Lt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Lt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Lt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Qx extends fi{constructor(t=new B,e=new B){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new B){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new B){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jd extends fi{constructor(t=new Lt,e=new Lt,n=new Lt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Lt){const n=e,i=this.v0,o=this.v1,r=this.v2;return n.set(jo(t,i.x,o.x,r.x),jo(t,i.y,o.y,r.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class t_ extends fi{constructor(t=new B,e=new B,n=new B){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new B){const n=e,i=this.v0,o=this.v1,r=this.v2;return n.set(jo(t,i.x,o.x,r.x),jo(t,i.y,o.y,r.y),jo(t,i.z,o.z,r.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Qd extends fi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Lt){const n=e,i=this.points,o=(i.length-1)*t,r=Math.floor(o),a=o-r,c=i[r===0?r:r-1],l=i[r],u=i[r>i.length-2?i.length-1:r+1],f=i[r>i.length-3?i.length-1:r+2];return n.set(dh(a,c.x,l.x,u.x,f.x),dh(a,c.y,l.y,u.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new Lt().fromArray(i))}return this}}var fh=Object.freeze({__proto__:null,ArcCurve:Vx,CatmullRomCurve3:Wx,CubicBezierCurve:Kd,CubicBezierCurve3:Jx,EllipseCurve:Zl,LineCurve:Zd,LineCurve3:Qx,QuadraticBezierCurve:Jd,QuadraticBezierCurve3:t_,SplineCurve:Qd});class e_ extends fi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new fh[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let o=0;for(;o<i.length;){if(i[o]>=n){const r=i[o]-n,a=this.curves[o],c=a.getLength(),l=c===0?0:1-r/c;return a.getPointAt(l,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,o=this.curves;i<o.length;i++){const r=o[i],a=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,c=r.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new fh[i.type]().fromJSON(i))}return this}}class n_ extends e_{constructor(t){super(),this.type="Path",this.currentPoint=new Lt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Zd(this.currentPoint.clone(),new Lt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const o=new Jd(this.currentPoint.clone(),new Lt(t,e),new Lt(n,i));return this.curves.push(o),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,o,r){const a=new Kd(this.currentPoint.clone(),new Lt(t,e),new Lt(n,i),new Lt(o,r));return this.curves.push(a),this.currentPoint.set(o,r),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Qd(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,o,r){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,o,r),this}absarc(t,e,n,i,o,r){return this.absellipse(t,e,n,n,i,o,r),this}ellipse(t,e,n,i,o,r,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,i,o,r,a,c),this}absellipse(t,e,n,i,o,r,a,c){const l=new Zl(t,e,n,i,o,r,a,c);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ql extends An{constructor(t=[new Lt(0,-.5),new Lt(.5,0),new Lt(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Qe(i,0,Math.PI*2);const o=[],r=[],a=[],c=[],l=[],u=1/e,f=new B,h=new Lt,d=new B,g=new B,y=new B;let p=0,m=0;for(let x=0;x<=t.length-1;x++)switch(x){case 0:p=t[x+1].x-t[x].x,m=t[x+1].y-t[x].y,d.x=m*1,d.y=-p,d.z=m*0,y.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case t.length-1:c.push(y.x,y.y,y.z);break;default:p=t[x+1].x-t[x].x,m=t[x+1].y-t[x].y,d.x=m*1,d.y=-p,d.z=m*0,g.copy(d),d.x+=y.x,d.y+=y.y,d.z+=y.z,d.normalize(),c.push(d.x,d.y,d.z),y.copy(g)}for(let x=0;x<=e;x++){const v=n+x*u*i,M=Math.sin(v),T=Math.cos(v);for(let b=0;b<=t.length-1;b++){f.x=t[b].x*M,f.y=t[b].y,f.z=t[b].x*T,r.push(f.x,f.y,f.z),h.x=x/e,h.y=b/(t.length-1),a.push(h.x,h.y);const E=c[3*b+0]*M,C=c[3*b+1],R=c[3*b+0]*T;l.push(E,C,R)}}for(let x=0;x<e;x++)for(let v=0;v<t.length-1;v++){const M=v+x*t.length,T=M,b=M+t.length,E=M+t.length+1,C=M+1;o.push(T,b,C),o.push(E,C,b)}this.setIndex(o),this.setAttribute("position",new Te(r,3)),this.setAttribute("uv",new Te(a,2)),this.setAttribute("normal",new Te(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ql(t.points,t.segments,t.phiStart,t.phiLength)}}class tu extends Ql{constructor(t=1,e=1,n=4,i=8){const o=new n_;o.absarc(0,-e/2,t,Math.PI*1.5,0),o.absarc(0,e/2,t,0,Math.PI*.5),super(o.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new tu(t.radius,t.length,t.capSegments,t.radialSegments)}}class eu extends An{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const o=[],r=[],a=[],c=[],l=new B,u=new Lt;r.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let f=0,h=3;f<=e;f++,h+=3){const d=n+f/e*i;l.x=t*Math.cos(d),l.y=t*Math.sin(d),r.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(r[h]/t+1)/2,u.y=(r[h+1]/t+1)/2,c.push(u.x,u.y)}for(let f=1;f<=e;f++)o.push(f,f+1,0);this.setIndex(o),this.setAttribute("position",new Te(r,3)),this.setAttribute("normal",new Te(a,3)),this.setAttribute("uv",new Te(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new eu(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class xo extends An{constructor(t=1,e=1,n=1,i=32,o=1,r=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),o=Math.floor(o);const u=[],f=[],h=[],d=[];let g=0;const y=[],p=n/2;let m=0;x(),r===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new Te(f,3)),this.setAttribute("normal",new Te(h,3)),this.setAttribute("uv",new Te(d,2));function x(){const M=new B,T=new B;let b=0;const E=(e-t)/n;for(let C=0;C<=o;C++){const R=[],_=C/o,w=_*(e-t)+t;for(let L=0;L<=i;L++){const I=L/i,U=I*c+a,F=Math.sin(U),N=Math.cos(U);T.x=w*F,T.y=-_*n+p,T.z=w*N,f.push(T.x,T.y,T.z),M.set(F,E,N).normalize(),h.push(M.x,M.y,M.z),d.push(I,1-_),R.push(g++)}y.push(R)}for(let C=0;C<i;C++)for(let R=0;R<o;R++){const _=y[R][C],w=y[R+1][C],L=y[R+1][C+1],I=y[R][C+1];t>0&&(u.push(_,w,I),b+=3),e>0&&(u.push(w,L,I),b+=3)}l.addGroup(m,b,0),m+=b}function v(M){const T=g,b=new Lt,E=new B;let C=0;const R=M===!0?t:e,_=M===!0?1:-1;for(let L=1;L<=i;L++)f.push(0,p*_,0),h.push(0,_,0),d.push(.5,.5),g++;const w=g;for(let L=0;L<=i;L++){const U=L/i*c+a,F=Math.cos(U),N=Math.sin(U);E.x=R*N,E.y=p*_,E.z=R*F,f.push(E.x,E.y,E.z),h.push(0,_,0),b.x=F*.5+.5,b.y=N*.5*_+.5,d.push(b.x,b.y),g++}for(let L=0;L<i;L++){const I=T+L,U=w+L;M===!0?u.push(U,U+1,I):u.push(U+1,U,I),C+=3}l.addGroup(m,C,M===!0?1:2),m+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xo(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ea extends xo{constructor(t=1,e=1,n=32,i=1,o=!1,r=0,a=Math.PI*2){super(0,t,e,n,i,o,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(t){return new Ea(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class nu extends An{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const o=[],r=[];a(i),l(n),u(),this.setAttribute("position",new Te(o,3)),this.setAttribute("normal",new Te(o.slice(),3)),this.setAttribute("uv",new Te(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const v=new B,M=new B,T=new B;for(let b=0;b<e.length;b+=3)d(e[b+0],v),d(e[b+1],M),d(e[b+2],T),c(v,M,T,x)}function c(x,v,M,T){const b=T+1,E=[];for(let C=0;C<=b;C++){E[C]=[];const R=x.clone().lerp(M,C/b),_=v.clone().lerp(M,C/b),w=b-C;for(let L=0;L<=w;L++)L===0&&C===b?E[C][L]=R:E[C][L]=R.clone().lerp(_,L/w)}for(let C=0;C<b;C++)for(let R=0;R<2*(b-C)-1;R++){const _=Math.floor(R/2);R%2===0?(h(E[C][_+1]),h(E[C+1][_]),h(E[C][_])):(h(E[C][_+1]),h(E[C+1][_+1]),h(E[C+1][_]))}}function l(x){const v=new B;for(let M=0;M<o.length;M+=3)v.x=o[M+0],v.y=o[M+1],v.z=o[M+2],v.normalize().multiplyScalar(x),o[M+0]=v.x,o[M+1]=v.y,o[M+2]=v.z}function u(){const x=new B;for(let v=0;v<o.length;v+=3){x.x=o[v+0],x.y=o[v+1],x.z=o[v+2];const M=p(x)/2/Math.PI+.5,T=m(x)/Math.PI+.5;r.push(M,1-T)}g(),f()}function f(){for(let x=0;x<r.length;x+=6){const v=r[x+0],M=r[x+2],T=r[x+4],b=Math.max(v,M,T),E=Math.min(v,M,T);b>.9&&E<.1&&(v<.2&&(r[x+0]+=1),M<.2&&(r[x+2]+=1),T<.2&&(r[x+4]+=1))}}function h(x){o.push(x.x,x.y,x.z)}function d(x,v){const M=x*3;v.x=t[M+0],v.y=t[M+1],v.z=t[M+2]}function g(){const x=new B,v=new B,M=new B,T=new B,b=new Lt,E=new Lt,C=new Lt;for(let R=0,_=0;R<o.length;R+=9,_+=6){x.set(o[R+0],o[R+1],o[R+2]),v.set(o[R+3],o[R+4],o[R+5]),M.set(o[R+6],o[R+7],o[R+8]),b.set(r[_+0],r[_+1]),E.set(r[_+2],r[_+3]),C.set(r[_+4],r[_+5]),T.copy(x).add(v).add(M).divideScalar(3);const w=p(T);y(b,_+0,x,w),y(E,_+2,v,w),y(C,_+4,M,w)}}function y(x,v,M,T){T<0&&x.x===1&&(r[v]=x.x-1),M.x===0&&M.z===0&&(r[v]=T/2/Math.PI+.5)}function p(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nu(t.vertices,t.indices,t.radius,t.details)}}class iu extends nu{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new iu(t.radius,t.detail)}}class _o extends An{constructor(t=.5,e=1,n=32,i=1,o=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:o,thetaLength:r},n=Math.max(3,n),i=Math.max(1,i);const a=[],c=[],l=[],u=[];let f=t;const h=(e-t)/i,d=new B,g=new Lt;for(let y=0;y<=i;y++){for(let p=0;p<=n;p++){const m=o+p/n*r;d.x=f*Math.cos(m),d.y=f*Math.sin(m),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,u.push(g.x,g.y)}f+=h}for(let y=0;y<i;y++){const p=y*(n+1);for(let m=0;m<n;m++){const x=m+p,v=x,M=x+n+1,T=x+n+2,b=x+1;a.push(v,M,b),a.push(M,T,b)}}this.setIndex(a),this.setAttribute("position",new Te(c,3)),this.setAttribute("normal",new Te(l,3)),this.setAttribute("uv",new Te(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _o(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class is extends An{constructor(t=1,e=32,n=16,i=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(r+a,Math.PI);let l=0;const u=[],f=new B,h=new B,d=[],g=[],y=[],p=[];for(let m=0;m<=n;m++){const x=[],v=m/n;let M=0;m===0&&r===0?M=.5/e:m===n&&c===Math.PI&&(M=-.5/e);for(let T=0;T<=e;T++){const b=T/e;f.x=-t*Math.cos(i+b*o)*Math.sin(r+v*a),f.y=t*Math.cos(r+v*a),f.z=t*Math.sin(i+b*o)*Math.sin(r+v*a),g.push(f.x,f.y,f.z),h.copy(f).normalize(),y.push(h.x,h.y,h.z),p.push(b+M,1-v),x.push(l++)}u.push(x)}for(let m=0;m<n;m++)for(let x=0;x<e;x++){const v=u[m][x+1],M=u[m][x],T=u[m+1][x],b=u[m+1][x+1];(m!==0||r>0)&&d.push(v,M,b),(m!==n-1||c<Math.PI)&&d.push(M,T,b)}this.setIndex(d),this.setAttribute("position",new Te(g,3)),this.setAttribute("normal",new Te(y,3)),this.setAttribute("uv",new Te(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new is(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ss extends ar{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pd,this.normalScale=new Lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ba extends nn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ie(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class i_ extends ba{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ie(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const fc=new Ce,ph=new B,mh=new B;class tf{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Lt(512,512),this.map=null,this.mapPass=null,this.matrix=new Ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yl,this._frameExtents=new Lt(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;ph.setFromMatrixPosition(t.matrixWorld),e.position.copy(ph),mh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(mh),e.updateMatrixWorld(),fc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(fc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const gh=new Ce,Uo=new B,pc=new B;class s_ extends tf{constructor(){super(new Tn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Lt(4,2),this._viewportCount=6,this._viewports=[new me(2,1,1,1),new me(0,1,1,1),new me(3,1,1,1),new me(1,1,1,1),new me(3,0,1,1),new me(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,o=t.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),Uo.setFromMatrixPosition(t.matrixWorld),n.position.copy(Uo),pc.copy(n.position),pc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(pc),n.updateMatrixWorld(),i.makeTranslation(-Uo.x,-Uo.y,-Uo.z),gh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gh)}}class o_ extends ba{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new s_}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class r_ extends tf{constructor(){super(new Vd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class vh extends ba{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.target=new nn,this.shadow=new r_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class a_ extends ba{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class c_{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=xh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=xh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function xh(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ol}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ol);class Jn{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){const t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){const t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){const e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new S);const e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new S);const n=this.elements,i=t.x,o=t.y,r=t.z;return e.x=n[0]*i+n[1]*o+n[2]*r,e.y=n[3]*i+n[4]*o+n[5]*r,e.z=n[6]*i+n[7]*o+n[8]*r,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new Jn);const n=this.elements,i=t.elements,o=e.elements,r=n[0],a=n[1],c=n[2],l=n[3],u=n[4],f=n[5],h=n[6],d=n[7],g=n[8],y=i[0],p=i[1],m=i[2],x=i[3],v=i[4],M=i[5],T=i[6],b=i[7],E=i[8];return o[0]=r*y+a*x+c*T,o[1]=r*p+a*v+c*b,o[2]=r*m+a*M+c*E,o[3]=l*y+u*x+f*T,o[4]=l*p+u*v+f*b,o[5]=l*m+u*M+f*E,o[6]=h*y+d*x+g*T,o[7]=h*p+d*v+g*b,o[8]=h*m+d*M+g*E,e}scale(t,e){e===void 0&&(e=new Jn);const n=this.elements,i=e.elements;for(let o=0;o!==3;o++)i[3*o+0]=t.x*n[3*o+0],i[3*o+1]=t.y*n[3*o+1],i[3*o+2]=t.z*n[3*o+2];return e}solve(t,e){e===void 0&&(e=new S);const n=3,i=4,o=[];let r,a;for(r=0;r<n*i;r++)o.push(0);for(r=0;r<3;r++)for(a=0;a<3;a++)o[r+i*a]=this.elements[r+3*a];o[3+4*0]=t.x,o[3+4*1]=t.y,o[3+4*2]=t.z;let c=3;const l=c;let u;const f=4;let h;do{if(r=l-c,o[r+i*r]===0){for(a=r+1;a<l;a++)if(o[r+i*a]!==0){u=f;do h=f-u,o[h+i*r]+=o[h+i*a];while(--u);break}}if(o[r+i*r]!==0)for(a=r+1;a<l;a++){const d=o[r+i*a]/o[r+i*r];u=f;do h=f-u,o[h+i*a]=h<=r?0:o[h+i*a]-o[h+i*r]*d;while(--u)}}while(--c);if(e.z=o[2*i+3]/o[2*i+2],e.y=(o[1*i+3]-o[1*i+2]*e.z)/o[1*i+1],e.x=(o[0*i+3]-o[0*i+2]*e.z-o[0*i+1]*e.y)/o[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";const e=",";for(let n=0;n<9;n++)t+=this.elements[n]+e;return t}reverse(t){t===void 0&&(t=new Jn);const e=3,n=6,i=l_;let o,r;for(o=0;o<3;o++)for(r=0;r<3;r++)i[o+n*r]=this.elements[o+3*r];i[3+6*0]=1,i[3+6*1]=0,i[3+6*2]=0,i[4+6*0]=0,i[4+6*1]=1,i[4+6*2]=0,i[5+6*0]=0,i[5+6*1]=0,i[5+6*2]=1;let a=3;const c=a;let l;const u=n;let f;do{if(o=c-a,i[o+n*o]===0){for(r=o+1;r<c;r++)if(i[o+n*r]!==0){l=u;do f=u-l,i[f+n*o]+=i[f+n*r];while(--l);break}}if(i[o+n*o]!==0)for(r=o+1;r<c;r++){const h=i[o+n*r]/i[o+n*o];l=u;do f=u-l,i[f+n*r]=f<=o?0:i[f+n*r]-i[f+n*o]*h;while(--l)}}while(--a);o=2;do{r=o-1;do{const h=i[o+n*r]/i[o+n*o];l=n;do f=n-l,i[f+n*r]=i[f+n*r]-i[f+n*o]*h;while(--l)}while(r--)}while(--o);o=2;do{const h=1/i[o+n*o];l=n;do f=n-l,i[f+n*o]=i[f+n*o]*h;while(--l)}while(o--);o=2;do{r=2;do{if(f=i[e+r+n*o],isNaN(f)||f===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(o,r,f)}while(r--)}while(o--);return t}setRotationFromQuaternion(t){const e=t.x,n=t.y,i=t.z,o=t.w,r=e+e,a=n+n,c=i+i,l=e*r,u=e*a,f=e*c,h=n*a,d=n*c,g=i*c,y=o*r,p=o*a,m=o*c,x=this.elements;return x[3*0+0]=1-(h+g),x[3*0+1]=u-m,x[3*0+2]=f+p,x[3*1+0]=u+m,x[3*1+1]=1-(l+g),x[3*1+2]=d-y,x[3*2+0]=f-p,x[3*2+1]=d+y,x[3*2+2]=1-(l+h),this}transpose(t){t===void 0&&(t=new Jn);const e=this.elements,n=t.elements;let i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}}const l_=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class S{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new S);const n=t.x,i=t.y,o=t.z,r=this.x,a=this.y,c=this.z;return e.x=a*o-c*i,e.y=c*n-r*o,e.z=r*i-a*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new S(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new S(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new Jn([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){const o=1/i;this.x*=o,this.y*=o,this.z*=o}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new S);const e=this.x,n=this.y,i=this.z;let o=Math.sqrt(e*e+n*n+i*i);return o>0?(o=1/o,t.x=e*o,t.y=n*o,t.z=i*o):(t.x=1,t.y=0,t.z=0),t}length(){const t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){const e=this.x,n=this.y,i=this.z,o=t.x,r=t.y,a=t.z;return Math.sqrt((o-e)*(o-e)+(r-n)*(r-n)+(a-i)*(a-i))}distanceSquared(t){const e=this.x,n=this.y,i=this.z,o=t.x,r=t.y,a=t.z;return(o-e)*(o-e)+(r-n)*(r-n)+(a-i)*(a-i)}scale(t,e){e===void 0&&(e=new S);const n=this.x,i=this.y,o=this.z;return e.x=t*n,e.y=t*i,e.z=t*o,e}vmul(t,e){return e===void 0&&(e=new S),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new S),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new S),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){const n=this.length();if(n>0){const i=u_,o=1/n;i.set(this.x*o,this.y*o,this.z*o);const r=h_;Math.abs(i.x)<.9?(r.set(1,0,0),i.cross(r,t)):(r.set(0,1,0),i.cross(r,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){const i=this.x,o=this.y,r=this.z;n.x=i+(t.x-i)*e,n.y=o+(t.y-o)*e,n.z=r+(t.z-r)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(_h),_h.almostEquals(t,e)}clone(){return new S(this.x,this.y,this.z)}}S.ZERO=new S(0,0,0);S.UNIT_X=new S(1,0,0);S.UNIT_Y=new S(0,1,0);S.UNIT_Z=new S(0,0,1);const u_=new S,h_=new S,_h=new S;class Cn{constructor(t){t===void 0&&(t={}),this.lowerBound=new S,this.upperBound=new S,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){const o=this.lowerBound,r=this.upperBound,a=n;o.copy(t[0]),a&&a.vmult(o,o),r.copy(o);for(let c=1;c<t.length;c++){let l=t[c];a&&(a.vmult(l,yh),l=yh),l.x>r.x&&(r.x=l.x),l.x<o.x&&(o.x=l.x),l.y>r.y&&(r.y=l.y),l.y<o.y&&(o.y=l.y),l.z>r.z&&(r.z=l.z),l.z<o.z&&(o.z=l.z)}return e&&(e.vadd(o,o),e.vadd(r,r)),i&&(o.x-=i,o.y-=i,o.z-=i,r.x+=i,r.y+=i,r.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new Cn().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,o=t.upperBound,r=i.x<=n.x&&n.x<=o.x||e.x<=o.x&&o.x<=n.x,a=i.y<=n.y&&n.y<=o.y||e.y<=o.y&&o.y<=n.y,c=i.z<=n.z&&n.z<=o.z||e.z<=o.z&&o.z<=n.z;return r&&a&&c}volume(){const t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,o=t.upperBound;return e.x<=i.x&&n.x>=o.x&&e.y<=i.y&&n.y>=o.y&&e.z<=i.z&&n.z>=o.z}getCorners(t,e,n,i,o,r,a,c){const l=this.lowerBound,u=this.upperBound;t.copy(l),e.set(u.x,l.y,l.z),n.set(u.x,u.y,l.z),i.set(l.x,u.y,u.z),o.set(u.x,l.y,u.z),r.set(l.x,u.y,l.z),a.set(l.x,l.y,u.z),c.copy(u)}toLocalFrame(t,e){const n=Mh,i=n[0],o=n[1],r=n[2],a=n[3],c=n[4],l=n[5],u=n[6],f=n[7];this.getCorners(i,o,r,a,c,l,u,f);for(let h=0;h!==8;h++){const d=n[h];t.pointToLocal(d,d)}return e.setFromPoints(n)}toWorldFrame(t,e){const n=Mh,i=n[0],o=n[1],r=n[2],a=n[3],c=n[4],l=n[5],u=n[6],f=n[7];this.getCorners(i,o,r,a,c,l,u,f);for(let h=0;h!==8;h++){const d=n[h];t.pointToWorld(d,d)}return e.setFromPoints(n)}overlapsRay(t){const{direction:e,from:n}=t,i=1/e.x,o=1/e.y,r=1/e.z,a=(this.lowerBound.x-n.x)*i,c=(this.upperBound.x-n.x)*i,l=(this.lowerBound.y-n.y)*o,u=(this.upperBound.y-n.y)*o,f=(this.lowerBound.z-n.z)*r,h=(this.upperBound.z-n.z)*r,d=Math.max(Math.max(Math.min(a,c),Math.min(l,u)),Math.min(f,h)),g=Math.min(Math.min(Math.max(a,c),Math.max(l,u)),Math.max(f,h));return!(g<0||d>g)}}const yh=new S,Mh=[new S,new S,new S,new S,new S,new S,new S,new S];class Sh{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){const o=i;i=n,n=o}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:o}=e;if(o>i){const r=o;o=i,i=r}this.matrix[(i*(i+1)>>1)+o-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}}class ef{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;const n=this._listeners;if(n[t]===void 0)return this;const i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;const n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,o=n.length;i<o;i++)n[i].call(this,t)}return this}}class Be{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){const n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new S),this.normalize();const e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){const n=d_,i=f_;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{const n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new Be);const n=this.x,i=this.y,o=this.z,r=this.w,a=t.x,c=t.y,l=t.z,u=t.w;return e.x=n*u+r*a+i*l-o*c,e.y=i*u+r*c+o*a-n*l,e.z=o*u+r*l+n*c-i*a,e.w=r*u-n*a-i*c-o*l,e}inverse(t){t===void 0&&(t=new Be);const e=this.x,n=this.y,i=this.z,o=this.w;this.conjugate(t);const r=1/(e*e+n*n+i*i+o*o);return t.x*=r,t.y*=r,t.z*=r,t.w*=r,t}conjugate(t){return t===void 0&&(t=new Be),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){const t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new S);const n=t.x,i=t.y,o=t.z,r=this.x,a=this.y,c=this.z,l=this.w,u=l*n+a*o-c*i,f=l*i+c*n-r*o,h=l*o+r*i-a*n,d=-r*n-a*i-c*o;return e.x=u*l+d*-r+f*-c-h*-a,e.y=f*l+d*-a+h*-r-u*-c,e.z=h*l+d*-c+u*-a-f*-r,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,o;const r=this.x,a=this.y,c=this.z,l=this.w;switch(e){case"YZX":const u=r*a+c*l;if(u>.499&&(n=2*Math.atan2(r,l),i=Math.PI/2,o=0),u<-.499&&(n=-2*Math.atan2(r,l),i=-Math.PI/2,o=0),n===void 0){const f=r*r,h=a*a,d=c*c;n=Math.atan2(2*a*l-2*r*c,1-2*h-2*d),i=Math.asin(2*u),o=Math.atan2(2*r*l-2*a*c,1-2*f-2*d)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=o}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");const o=Math.cos(t/2),r=Math.cos(e/2),a=Math.cos(n/2),c=Math.sin(t/2),l=Math.sin(e/2),u=Math.sin(n/2);return i==="XYZ"?(this.x=c*r*a+o*l*u,this.y=o*l*a-c*r*u,this.z=o*r*u+c*l*a,this.w=o*r*a-c*l*u):i==="YXZ"?(this.x=c*r*a+o*l*u,this.y=o*l*a-c*r*u,this.z=o*r*u-c*l*a,this.w=o*r*a+c*l*u):i==="ZXY"?(this.x=c*r*a-o*l*u,this.y=o*l*a+c*r*u,this.z=o*r*u+c*l*a,this.w=o*r*a-c*l*u):i==="ZYX"?(this.x=c*r*a-o*l*u,this.y=o*l*a+c*r*u,this.z=o*r*u-c*l*a,this.w=o*r*a+c*l*u):i==="YZX"?(this.x=c*r*a+o*l*u,this.y=o*l*a+c*r*u,this.z=o*r*u-c*l*a,this.w=o*r*a-c*l*u):i==="XZY"&&(this.x=c*r*a-o*l*u,this.y=o*l*a-c*r*u,this.z=o*r*u+c*l*a,this.w=o*r*a+c*l*u),this}clone(){return new Be(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new Be);const i=this.x,o=this.y,r=this.z,a=this.w;let c=t.x,l=t.y,u=t.z,f=t.w,h,d,g,y,p;return d=i*c+o*l+r*u+a*f,d<0&&(d=-d,c=-c,l=-l,u=-u,f=-f),1-d>1e-6?(h=Math.acos(d),g=Math.sin(h),y=Math.sin((1-e)*h)/g,p=Math.sin(e*h)/g):(y=1-e,p=e),n.x=y*i+p*c,n.y=y*o+p*l,n.z=y*r+p*u,n.w=y*a+p*f,n}integrate(t,e,n,i){i===void 0&&(i=new Be);const o=t.x*n.x,r=t.y*n.y,a=t.z*n.z,c=this.x,l=this.y,u=this.z,f=this.w,h=e*.5;return i.x+=h*(o*f+r*u-a*l),i.y+=h*(r*f+a*c-o*u),i.z+=h*(a*f+o*l-r*c),i.w+=h*(-o*c-r*l-a*u),i}}const d_=new S,f_=new S,p_={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class Pt{constructor(t){t===void 0&&(t={}),this.id=Pt.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}Pt.idCounter=0;Pt.types=p_;class ae{constructor(t){t===void 0&&(t={}),this.position=new S,this.quaternion=new Be,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return ae.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return ae.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new S),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new S),n.vsub(t,i),e.conjugate(wh),wh.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new S),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new S),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new S),e.w*=-1,e.vmult(n,i),e.w*=-1,i}}const wh=new Be;class Ko extends Pt{constructor(t){t===void 0&&(t={});const{vertices:e=[],faces:n=[],normals:i=[],axes:o,boundingSphereRadius:r}=t;super({type:Pt.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),r?this.boundingSphereRadius=r:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=o?o.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;const i=new S;for(let o=0;o!==t.length;o++){const r=t[o],a=r.length;for(let c=0;c!==a;c++){const l=(c+1)%a;e[r[c]].vsub(e[r[l]],i),i.normalize();let u=!1;for(let f=0;f!==n.length;f++)if(n[f].almostEquals(i)||n[f].almostEquals(i)){u=!0;break}u||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);const e=this.faceNormals[t]||new S;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;const n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){const n=this.faces[t],i=this.vertices[n[0]],o=this.vertices[n[1]],r=this.vertices[n[2]];Ko.computeNormal(i,o,r,e)}static computeNormal(t,e,n,i){const o=new S,r=new S;e.vsub(t,r),n.vsub(e,o),o.cross(r,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,o,r,a,c,l){const u=new S;let f=-1,h=-Number.MAX_VALUE;for(let g=0;g<n.faces.length;g++){u.copy(n.faceNormals[g]),o.vmult(u,u);const y=u.dot(r);y>h&&(h=y,f=g)}const d=[];for(let g=0;g<n.faces[f].length;g++){const y=n.vertices[n.faces[f][g]],p=new S;p.copy(y),o.vmult(p,p),i.vadd(p,p),d.push(p)}f>=0&&this.clipFaceAgainstHull(r,t,e,d,a,c,l)}findSeparatingAxis(t,e,n,i,o,r,a,c){const l=new S,u=new S,f=new S,h=new S,d=new S,g=new S;let y=Number.MAX_VALUE;const p=this;if(p.uniqueAxes)for(let m=0;m!==p.uniqueAxes.length;m++){n.vmult(p.uniqueAxes[m],l);const x=p.testSepAxis(l,t,e,n,i,o);if(x===!1)return!1;x<y&&(y=x,r.copy(l))}else{const m=a?a.length:p.faces.length;for(let x=0;x<m;x++){const v=a?a[x]:x;l.copy(p.faceNormals[v]),n.vmult(l,l);const M=p.testSepAxis(l,t,e,n,i,o);if(M===!1)return!1;M<y&&(y=M,r.copy(l))}}if(t.uniqueAxes)for(let m=0;m!==t.uniqueAxes.length;m++){o.vmult(t.uniqueAxes[m],u);const x=p.testSepAxis(u,t,e,n,i,o);if(x===!1)return!1;x<y&&(y=x,r.copy(u))}else{const m=c?c.length:t.faces.length;for(let x=0;x<m;x++){const v=c?c[x]:x;u.copy(t.faceNormals[v]),o.vmult(u,u);const M=p.testSepAxis(u,t,e,n,i,o);if(M===!1)return!1;M<y&&(y=M,r.copy(u))}}for(let m=0;m!==p.uniqueEdges.length;m++){n.vmult(p.uniqueEdges[m],h);for(let x=0;x!==t.uniqueEdges.length;x++)if(o.vmult(t.uniqueEdges[x],d),h.cross(d,g),!g.almostZero()){g.normalize();const v=p.testSepAxis(g,t,e,n,i,o);if(v===!1)return!1;v<y&&(y=v,r.copy(g))}}return i.vsub(e,f),f.dot(r)>0&&r.negate(r),!0}testSepAxis(t,e,n,i,o,r){const a=this;Ko.project(a,t,n,i,mc),Ko.project(e,t,o,r,gc);const c=mc[0],l=mc[1],u=gc[0],f=gc[1];if(c<f||u<l)return!1;const h=c-f,d=u-l;return h<d?h:d}calculateLocalInertia(t,e){const n=new S,i=new S;this.computeLocalAABB(i,n);const o=n.x-i.x,r=n.y-i.y,a=n.z-i.z;e.x=1/12*t*(2*r*2*r+2*a*2*a),e.y=1/12*t*(2*o*2*o+2*a*2*a),e.z=1/12*t*(2*r*2*r+2*o*2*o)}getPlaneConstantOfFace(t){const e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,o,r,a){const c=new S,l=new S,u=new S,f=new S,h=new S,d=new S,g=new S,y=new S,p=this,m=[],x=i,v=m;let M=-1,T=Number.MAX_VALUE;for(let _=0;_<p.faces.length;_++){c.copy(p.faceNormals[_]),n.vmult(c,c);const w=c.dot(t);w<T&&(T=w,M=_)}if(M<0)return;const b=p.faces[M];b.connectedFaces=[];for(let _=0;_<p.faces.length;_++)for(let w=0;w<p.faces[_].length;w++)b.indexOf(p.faces[_][w])!==-1&&_!==M&&b.connectedFaces.indexOf(_)===-1&&b.connectedFaces.push(_);const E=b.length;for(let _=0;_<E;_++){const w=p.vertices[b[_]],L=p.vertices[b[(_+1)%E]];w.vsub(L,l),u.copy(l),n.vmult(u,u),e.vadd(u,u),f.copy(this.faceNormals[M]),n.vmult(f,f),e.vadd(f,f),u.cross(f,h),h.negate(h),d.copy(w),n.vmult(d,d),e.vadd(d,d);const I=b.connectedFaces[_];g.copy(this.faceNormals[I]);const U=this.getPlaneConstantOfFace(I);y.copy(g),n.vmult(y,y);const F=U-y.dot(e);for(this.clipFaceAgainstPlane(x,v,y,F);x.length;)x.shift();for(;v.length;)x.push(v.shift())}g.copy(this.faceNormals[M]);const C=this.getPlaneConstantOfFace(M);y.copy(g),n.vmult(y,y);const R=C-y.dot(e);for(let _=0;_<x.length;_++){let w=y.dot(x[_])+R;if(w<=o&&(console.log(`clamped: depth=${w} to minDist=${o}`),w=o),w<=r){const L=x[_];if(w<=1e-6){const I={point:L,normal:y,depth:w};a.push(I)}}}}clipFaceAgainstPlane(t,e,n,i){let o,r;const a=t.length;if(a<2)return e;let c=t[t.length-1],l=t[0];o=n.dot(c)+i;for(let u=0;u<a;u++){if(l=t[u],r=n.dot(l)+i,o<0)if(r<0){const f=new S;f.copy(l),e.push(f)}else{const f=new S;c.lerp(l,o/(o-r),f),e.push(f)}else if(r<0){const f=new S;c.lerp(l,o/(o-r),f),e.push(f),e.push(l)}c=l,o=r}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new S);const n=this.vertices,i=this.worldVertices;for(let o=0;o!==this.vertices.length;o++)e.vmult(n[o],i[o]),t.vadd(i[o],i[o]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){const n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){const o=n[i];o.x<t.x?t.x=o.x:o.x>e.x&&(e.x=o.x),o.y<t.y?t.y=o.y:o.y>e.y&&(e.y=o.y),o.z<t.z?t.z=o.z:o.z>e.z&&(e.z=o.z)}}computeWorldFaceNormals(t){const e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new S);const n=this.faceNormals,i=this.worldFaceNormals;for(let o=0;o!==e;o++)t.vmult(n[o],i[o]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0;const e=this.vertices;for(let n=0;n!==e.length;n++){const i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){const o=this.vertices;let r,a,c,l,u,f,h=new S;for(let d=0;d<o.length;d++){h.copy(o[d]),e.vmult(h,h),t.vadd(h,h);const g=h;(r===void 0||g.x<r)&&(r=g.x),(l===void 0||g.x>l)&&(l=g.x),(a===void 0||g.y<a)&&(a=g.y),(u===void 0||g.y>u)&&(u=g.y),(c===void 0||g.z<c)&&(c=g.z),(f===void 0||g.z>f)&&(f=g.z)}n.set(r,a,c),i.set(l,u,f)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new S);const e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){const n=this.vertices.length,i=this.vertices;if(e){for(let o=0;o<n;o++){const r=i[o];e.vmult(r,r)}for(let o=0;o<this.faceNormals.length;o++){const r=this.faceNormals[o];e.vmult(r,r)}}if(t)for(let o=0;o<n;o++){const r=i[o];r.vadd(t,r)}}pointIsInside(t){const e=this.vertices,n=this.faces,i=this.faceNormals,o=new S;this.getAveragePointLocal(o);for(let r=0;r<this.faces.length;r++){let a=i[r];const c=e[n[r][0]],l=new S;t.vsub(c,l);const u=a.dot(l),f=new S;o.vsub(c,f);const h=a.dot(f);if(u<0&&h>0||u>0&&h<0)return!1}return-1}static project(t,e,n,i,o){const r=t.vertices.length,a=m_;let c=0,l=0;const u=g_,f=t.vertices;u.setZero(),ae.vectorToLocalFrame(n,i,e,a),ae.pointToLocalFrame(n,i,u,u);const h=u.dot(a);l=c=f[0].dot(a);for(let d=1;d<r;d++){const g=f[d].dot(a);g>c&&(c=g),g<l&&(l=g)}if(l-=h,c-=h,l>c){const d=l;l=c,c=d}o[0]=c,o[1]=l}}const mc=[],gc=[];new S;const m_=new S,g_=new S;class an extends Pt{constructor(t){super({type:Pt.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=S,o=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],r=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],c=new Ko({vertices:o,faces:r,axes:a});this.convexPolyhedronRepresentation=c,c.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new S),an.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){const i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){const n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let o=0;o!==n.length;o++)e.vmult(n[o],n[o]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){const i=this.halfExtents,o=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let r=0;r<o.length;r++)qi.set(o[r][0],o[r][1],o[r][2]),e.vmult(qi,qi),t.vadd(qi,qi),n(qi.x,qi.y,qi.z)}calculateWorldAABB(t,e,n,i){const o=this.halfExtents;Qn[0].set(o.x,o.y,o.z),Qn[1].set(-o.x,o.y,o.z),Qn[2].set(-o.x,-o.y,o.z),Qn[3].set(-o.x,-o.y,-o.z),Qn[4].set(o.x,-o.y,-o.z),Qn[5].set(o.x,o.y,-o.z),Qn[6].set(-o.x,o.y,-o.z),Qn[7].set(o.x,-o.y,o.z);const r=Qn[0];e.vmult(r,r),t.vadd(r,r),i.copy(r),n.copy(r);for(let a=1;a<8;a++){const c=Qn[a];e.vmult(c,c),t.vadd(c,c);const l=c.x,u=c.y,f=c.z;l>i.x&&(i.x=l),u>i.y&&(i.y=u),f>i.z&&(i.z=f),l<n.x&&(n.x=l),u<n.y&&(n.y=u),f<n.z&&(n.z=f)}}}const qi=new S,Qn=[new S,new S,new S,new S,new S,new S,new S,new S],su={DYNAMIC:1,STATIC:2,KINEMATIC:4},ou={AWAKE:0,SLEEPY:1,SLEEPING:2};class pt extends ef{constructor(t){t===void 0&&(t={}),super(),this.id=pt.idCounter++,this.index=-1,this.world=null,this.vlambda=new S,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new S,this.previousPosition=new S,this.interpolatedPosition=new S,this.initPosition=new S,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new S,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new S,this.force=new S;const e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?pt.STATIC:pt.DYNAMIC,typeof t.type==typeof pt.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=pt.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new S,this.quaternion=new Be,this.initQuaternion=new Be,this.previousQuaternion=new Be,this.interpolatedQuaternion=new Be,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new S,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new S,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new S,this.invInertia=new S,this.invInertiaWorld=new Jn,this.invMassSolve=0,this.invInertiaSolve=new S,this.invInertiaWorldSolve=new Jn,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new S(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new S(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new Cn,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new S,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){const t=this.sleepState;this.sleepState=pt.AWAKE,this.wakeUpAfterNarrowphase=!1,t===pt.SLEEPING&&this.dispatchEvent(pt.wakeupEvent)}sleep(){this.sleepState=pt.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){const e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===pt.AWAKE&&n<i?(this.sleepState=pt.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(pt.sleepyEvent)):e===pt.SLEEPY&&n>i?this.wakeUp():e===pt.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(pt.sleepEvent))}}updateSolveMassProperties(){this.sleepState===pt.SLEEPING||this.type===pt.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new S),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new S),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new S),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new S),this.quaternion.vmult(t,e),e}addShape(t,e,n){const i=new S,o=new Be;return e&&i.copy(e),n&&o.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(o),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){const e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){const t=this.shapes,e=this.shapeOffsets,n=t.length;let i=0;for(let o=0;o!==n;o++){const r=t[o];r.updateBoundingSphereRadius();const a=e[o].length(),c=r.boundingSphereRadius;a+c>i&&(i=a+c)}this.boundingRadius=i}updateAABB(){const t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,o=v_,r=x_,a=this.quaternion,c=this.aabb,l=__;for(let u=0;u!==i;u++){const f=t[u];a.vmult(e[u],o),o.vadd(this.position,o),a.mult(n[u],r),f.calculateWorldAABB(o,r,l.lowerBound,l.upperBound),u===0?c.copy(l):c.extend(l)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){const e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){const n=y_,i=M_;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new S),this.type!==pt.DYNAMIC)return;this.sleepState===pt.SLEEPING&&this.wakeUp();const n=S_;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new S),this.type!==pt.DYNAMIC)return;const n=w_,i=E_;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===pt.DYNAMIC&&(this.sleepState===pt.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new S),this.type!==pt.DYNAMIC)return;this.sleepState===pt.SLEEPING&&this.wakeUp();const n=e,i=b_;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);const o=T_;n.cross(t,o),this.invInertiaWorld.vmult(o,o),this.angularVelocity.vadd(o,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new S),this.type!==pt.DYNAMIC)return;const n=A_,i=C_;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){const t=R_;this.invMass=this.mass>0?1/this.mass:0;const e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),an.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){const n=new S;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===pt.DYNAMIC||this.type===pt.KINEMATIC)||this.sleepState===pt.SLEEPING)return;const i=this.velocity,o=this.angularVelocity,r=this.position,a=this.force,c=this.torque,l=this.quaternion,u=this.invMass,f=this.invInertiaWorld,h=this.linearFactor,d=u*t;i.x+=a.x*d*h.x,i.y+=a.y*d*h.y,i.z+=a.z*d*h.z;const g=f.elements,y=this.angularFactor,p=c.x*y.x,m=c.y*y.y,x=c.z*y.z;o.x+=t*(g[0]*p+g[1]*m+g[2]*x),o.y+=t*(g[3]*p+g[4]*m+g[5]*x),o.z+=t*(g[6]*p+g[7]*m+g[8]*x),r.x+=i.x*t,r.y+=i.y*t,r.z+=i.z*t,l.integrate(this.angularVelocity,t,this.angularFactor,l),e&&(n?l.normalizeFast():l.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}pt.idCounter=0;pt.COLLIDE_EVENT_NAME="collide";pt.DYNAMIC=su.DYNAMIC;pt.STATIC=su.STATIC;pt.KINEMATIC=su.KINEMATIC;pt.AWAKE=ou.AWAKE;pt.SLEEPY=ou.SLEEPY;pt.SLEEPING=ou.SLEEPING;pt.wakeupEvent={type:"wakeup"};pt.sleepyEvent={type:"sleepy"};pt.sleepEvent={type:"sleep"};const v_=new S,x_=new Be,__=new Cn,y_=new Jn,M_=new Jn;new Jn;const S_=new S,w_=new S,E_=new S,b_=new S,T_=new S,A_=new S,C_=new S,R_=new S;class P_{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!(!(t.collisionFilterGroup&e.collisionFilterMask)||!(e.collisionFilterGroup&t.collisionFilterMask)||(t.type&pt.STATIC||t.sleepState===pt.SLEEPING)&&(e.type&pt.STATIC||e.sleepState===pt.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){const o=I_;e.position.vsub(t.position,o);const r=(t.boundingRadius+e.boundingRadius)**2;o.lengthSquared()<r&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){const n=L_,i=D_,o=N_,r=t.length;for(let a=0;a!==r;a++)i[a]=t[a],o[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==r;a++){const c=i[a].id,l=o[a].id,u=c<l?`${c},${l}`:`${l},${c}`;n[u]=a,n.keys.push(u)}for(let a=0;a!==n.keys.length;a++){const c=n.keys.pop(),l=n[c];t.push(i[l]),e.push(o[l]),delete n[c]}}setWorld(t){}static boundingSphereCheck(t,e){const n=new S;t.position.vsub(e.position,n);const i=t.shapes[0],o=e.shapes[0];return Math.pow(i.boundingSphereRadius+o.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const I_=new S;new S;new Be;new S;const L_={keys:[]},D_=[],N_=[];new S;new S;new S;class nf extends P_{constructor(){super()}collisionPairs(t,e,n){const i=t.bodies,o=i.length;let r,a;for(let c=0;c!==o;c++)for(let l=0;l!==c;l++)r=i[c],a=i[l],this.needBroadphaseCollision(r,a)&&this.intersectionTest(r,a,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){const o=t.bodies[i];o.aabbNeedsUpdate&&o.updateAABB(),o.aabb.overlaps(e)&&n.push(o)}return n}}class er{constructor(){this.rayFromWorld=new S,this.rayToWorld=new S,this.hitNormalWorld=new S,this.hitPointWorld=new S,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,o,r,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=o,this.body=r,this.distance=a}}let sf,of,rf,af,cf,lf,uf;const ru={CLOSEST:1,ANY:2,ALL:4};sf=Pt.types.SPHERE;of=Pt.types.PLANE;rf=Pt.types.BOX;af=Pt.types.CYLINDER;cf=Pt.types.CONVEXPOLYHEDRON;lf=Pt.types.HEIGHTFIELD;uf=Pt.types.TRIMESH;class Fe{get[sf](){return this._intersectSphere}get[of](){return this._intersectPlane}get[rf](){return this._intersectBox}get[af](){return this._intersectConvex}get[cf](){return this._intersectConvex}get[lf](){return this._intersectHeightfield}get[uf](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new S),e===void 0&&(e=new S),this.from=t.clone(),this.to=e.clone(),this.direction=new S,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=Fe.ANY,this.result=new er,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||Fe.ANY,this.result=e.result||new er,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(Eh),vc.length=0,t.broadphase.aabbQuery(t,Eh,vc),this.intersectBodies(vc),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());const n=this.checkCollisionResponse;if(n&&!t.collisionResponse||!(this.collisionFilterGroup&t.collisionFilterMask)||!(t.collisionFilterGroup&this.collisionFilterMask))return;const i=U_,o=F_;for(let r=0,a=t.shapes.length;r<a;r++){const c=t.shapes[r];if(!(n&&!c.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[r],o),t.quaternion.vmult(t.shapeOffsets[r],i),i.vadd(t.position,i),this.intersectShape(c,o,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){const o=this.from;if(K_(o,this.direction,n)>t.boundingSphereRadius)return;const a=this[t.type];a&&a.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,o){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,o)}_intersectPlane(t,e,n,i,o){const r=this.from,a=this.to,c=this.direction,l=new S(0,0,1);e.vmult(l,l);const u=new S;r.vsub(n,u);const f=u.dot(l);a.vsub(n,u);const h=u.dot(l);if(f*h>0||r.distanceTo(a)<f)return;const d=l.dot(c);if(Math.abs(d)<this.precision)return;const g=new S,y=new S,p=new S;r.vsub(n,g);const m=-l.dot(g)/d;c.scale(m,y),r.vadd(y,p),this.reportIntersection(l,p,o,i,-1)}getAABB(t){const{lowerBound:e,upperBound:n}=t,i=this.to,o=this.from;e.x=Math.min(i.x,o.x),e.y=Math.min(i.y,o.y),e.z=Math.min(i.z,o.z),n.x=Math.max(i.x,o.x),n.y=Math.max(i.y,o.y),n.z=Math.max(i.z,o.z)}_intersectHeightfield(t,e,n,i,o){t.data,t.elementSize;const r=z_;r.from.copy(this.from),r.to.copy(this.to),ae.pointToLocalFrame(n,e,r.from,r.from),ae.pointToLocalFrame(n,e,r.to,r.to),r.updateDirection();const a=O_;let c,l,u,f;c=l=0,u=f=t.data.length-1;const h=new Cn;r.getAABB(h),t.getIndexOfPosition(h.lowerBound.x,h.lowerBound.y,a,!0),c=Math.max(c,a[0]),l=Math.max(l,a[1]),t.getIndexOfPosition(h.upperBound.x,h.upperBound.y,a,!0),u=Math.min(u,a[0]+1),f=Math.min(f,a[1]+1);for(let d=c;d<u;d++)for(let g=l;g<f;g++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(d,g,h),!!h.overlapsRay(r)){if(t.getConvexTrianglePillar(d,g,!1),ae.pointToWorldFrame(n,e,t.pillarOffset,Lr),this._intersectConvex(t.pillarConvex,e,Lr,i,o,bh),this.result.shouldStop)return;t.getConvexTrianglePillar(d,g,!0),ae.pointToWorldFrame(n,e,t.pillarOffset,Lr),this._intersectConvex(t.pillarConvex,e,Lr,i,o,bh)}}}_intersectSphere(t,e,n,i,o){const r=this.from,a=this.to,c=t.radius,l=(a.x-r.x)**2+(a.y-r.y)**2+(a.z-r.z)**2,u=2*((a.x-r.x)*(r.x-n.x)+(a.y-r.y)*(r.y-n.y)+(a.z-r.z)*(r.z-n.z)),f=(r.x-n.x)**2+(r.y-n.y)**2+(r.z-n.z)**2-c**2,h=u**2-4*l*f,d=B_,g=k_;if(!(h<0))if(h===0)r.lerp(a,h,d),d.vsub(n,g),g.normalize(),this.reportIntersection(g,d,o,i,-1);else{const y=(-u-Math.sqrt(h))/(2*l),p=(-u+Math.sqrt(h))/(2*l);if(y>=0&&y<=1&&(r.lerp(a,y,d),d.vsub(n,g),g.normalize(),this.reportIntersection(g,d,o,i,-1)),this.result.shouldStop)return;p>=0&&p<=1&&(r.lerp(a,p,d),d.vsub(n,g),g.normalize(),this.reportIntersection(g,d,o,i,-1))}}_intersectConvex(t,e,n,i,o,r){const a=H_,c=Th,l=r&&r.faceList||null,u=t.faces,f=t.vertices,h=t.faceNormals,d=this.direction,g=this.from,y=this.to,p=g.distanceTo(y),m=l?l.length:u.length,x=this.result;for(let v=0;!x.shouldStop&&v<m;v++){const M=l?l[v]:v,T=u[M],b=h[M],E=e,C=n;c.copy(f[T[0]]),E.vmult(c,c),c.vadd(C,c),c.vsub(g,c),E.vmult(b,a);const R=d.dot(a);if(Math.abs(R)<this.precision)continue;const _=a.dot(c)/R;if(!(_<0)){d.scale(_,vn),vn.vadd(g,vn),qn.copy(f[T[0]]),E.vmult(qn,qn),C.vadd(qn,qn);for(let w=1;!x.shouldStop&&w<T.length-1;w++){ti.copy(f[T[w]]),ei.copy(f[T[w+1]]),E.vmult(ti,ti),E.vmult(ei,ei),C.vadd(ti,ti),C.vadd(ei,ei);const L=vn.distanceTo(g);!(Fe.pointInTriangle(vn,qn,ti,ei)||Fe.pointInTriangle(vn,ti,qn,ei))||L>p||this.reportIntersection(a,vn,o,i,M)}}}}_intersectTrimesh(t,e,n,i,o,r){const a=G_,c=j_,l=$_,u=Th,f=V_,h=W_,d=q_,g=Y_,y=X_,p=t.indices;t.vertices;const m=this.from,x=this.to,v=this.direction;l.position.copy(n),l.quaternion.copy(e),ae.vectorToLocalFrame(n,e,v,f),ae.pointToLocalFrame(n,e,m,h),ae.pointToLocalFrame(n,e,x,d),d.x*=t.scale.x,d.y*=t.scale.y,d.z*=t.scale.z,h.x*=t.scale.x,h.y*=t.scale.y,h.z*=t.scale.z,d.vsub(h,f),f.normalize();const M=h.distanceSquared(d);t.tree.rayQuery(this,l,c);for(let T=0,b=c.length;!this.result.shouldStop&&T!==b;T++){const E=c[T];t.getNormal(E,a),t.getVertex(p[E*3],qn),qn.vsub(h,u);const C=f.dot(a),R=a.dot(u)/C;if(R<0)continue;f.scale(R,vn),vn.vadd(h,vn),t.getVertex(p[E*3+1],ti),t.getVertex(p[E*3+2],ei);const _=vn.distanceSquared(h);!(Fe.pointInTriangle(vn,ti,qn,ei)||Fe.pointInTriangle(vn,qn,ti,ei))||_>M||(ae.vectorToWorldFrame(e,a,y),ae.pointToWorldFrame(n,e,vn,g),this.reportIntersection(y,g,o,i,E))}c.length=0}reportIntersection(t,e,n,i,o){const r=this.from,a=this.to,c=r.distanceTo(e),l=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(l.hitFaceIndex=typeof o<"u"?o:-1,this.mode){case Fe.ALL:this.hasHit=!0,l.set(r,a,t,e,n,i,c),l.hasHit=!0,this.callback(l);break;case Fe.CLOSEST:(c<l.distance||!l.hasHit)&&(this.hasHit=!0,l.hasHit=!0,l.set(r,a,t,e,n,i,c));break;case Fe.ANY:this.hasHit=!0,l.hasHit=!0,l.set(r,a,t,e,n,i,c),l.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,ys),n.vsub(e,Fo),t.vsub(e,xc);const o=ys.dot(ys),r=ys.dot(Fo),a=ys.dot(xc),c=Fo.dot(Fo),l=Fo.dot(xc);let u,f;return(u=c*a-r*l)>=0&&(f=o*l-r*a)>=0&&u+f<o*c-r*r}}Fe.CLOSEST=ru.CLOSEST;Fe.ANY=ru.ANY;Fe.ALL=ru.ALL;const Eh=new Cn,vc=[],Fo=new S,xc=new S,U_=new S,F_=new Be,vn=new S,qn=new S,ti=new S,ei=new S;new S;new er;const bh={faceList:[0]},Lr=new S,z_=new Fe,O_=[],B_=new S,k_=new S,H_=new S;new S;new S;const Th=new S,G_=new S,V_=new S,W_=new S,q_=new S,X_=new S,Y_=new S;new Cn;const j_=[],$_=new ae,ys=new S,Dr=new S;function K_(s,t,e){e.vsub(s,ys);const n=ys.dot(t);return t.scale(n,Dr),Dr.vadd(s,Dr),e.distanceTo(Dr)}class hf{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}}class Ta{constructor(t,e,n){n===void 0&&(n={}),n=hf.defaults(n,{collideConnected:!0,wakeUpBodies:!0}),this.equations=[],this.bodyA=t,this.bodyB=e,this.id=Ta.idCounter++,this.collideConnected=n.collideConnected,n.wakeUpBodies&&(t&&t.wakeUp(),e&&e.wakeUp())}update(){throw new Error("method update() not implmemented in this Constraint subclass!")}enable(){const t=this.equations;for(let e=0;e<t.length;e++)t[e].enabled=!0}disable(){const t=this.equations;for(let e=0;e<t.length;e++)t[e].enabled=!1}}Ta.idCounter=0;class Ah{constructor(){this.spatial=new S,this.rotational=new S}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}}class Is{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=Is.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new Ah,this.jacobianElementB=new Ah,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){const i=e,o=t,r=n;this.a=4/(r*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(r*r*o*(1+4*i))}computeB(t,e,n){const i=this.computeGW(),o=this.computeGq(),r=this.computeGiMf();return-o*t-i*e-r*n}computeGq(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.position,r=i.position;return t.spatial.dot(o)+e.spatial.dot(r)}computeGW(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.velocity,r=i.velocity,a=n.angularVelocity,c=i.angularVelocity;return t.multiplyVectors(o,a)+e.multiplyVectors(r,c)}computeGWlambda(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.vlambda,r=i.vlambda,a=n.wlambda,c=i.wlambda;return t.multiplyVectors(o,a)+e.multiplyVectors(r,c)}computeGiMf(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.force,r=n.torque,a=i.force,c=i.torque,l=n.invMassSolve,u=i.invMassSolve;return o.scale(l,Ch),a.scale(u,Rh),n.invInertiaWorldSolve.vmult(r,Ph),i.invInertiaWorldSolve.vmult(c,Ih),t.multiplyVectors(Ch,Ph)+e.multiplyVectors(Rh,Ih)}computeGiMGt(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.invMassSolve,r=i.invMassSolve,a=n.invInertiaWorldSolve,c=i.invInertiaWorldSolve;let l=o+r;return a.vmult(t.rotational,Nr),l+=Nr.dot(t.rotational),c.vmult(e.rotational,Nr),l+=Nr.dot(e.rotational),l}addToWlambda(t){const e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,o=this.bj,r=Z_;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),o.vlambda.addScaledVector(o.invMassSolve*t,n.spatial,o.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,r),i.wlambda.addScaledVector(t,r,i.wlambda),o.invInertiaWorldSolve.vmult(n.rotational,r),o.wlambda.addScaledVector(t,r,o.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}Is.idCounter=0;const Ch=new S,Rh=new S,Ph=new S,Ih=new S,Nr=new S,Z_=new S;class ta extends Is{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new S,this.rj=new S,this.ni=new S}computeB(t){const e=this.a,n=this.b,i=this.bi,o=this.bj,r=this.ri,a=this.rj,c=J_,l=Q_,u=i.velocity,f=i.angularVelocity;i.force,i.torque;const h=o.velocity,d=o.angularVelocity;o.force,o.torque;const g=ty,y=this.jacobianElementA,p=this.jacobianElementB,m=this.ni;r.cross(m,c),a.cross(m,l),m.negate(y.spatial),c.negate(y.rotational),p.spatial.copy(m),p.rotational.copy(l),g.copy(o.position),g.vadd(a,g),g.vsub(i.position,g),g.vsub(r,g);const x=m.dot(g),v=this.restitution+1,M=v*h.dot(m)-v*u.dot(m)+d.dot(l)-f.dot(c),T=this.computeGiMf();return-x*e-M*n-t*T}getImpactVelocityAlongNormal(){const t=ey,e=ny,n=iy,i=sy,o=oy;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,o),this.ni.dot(o)}}const J_=new S,Q_=new S,ty=new S,ey=new S,ny=new S,iy=new S,sy=new S,oy=new S;class df extends Ta{constructor(t,e,n,i,o){e===void 0&&(e=new S),i===void 0&&(i=new S),o===void 0&&(o=1e6),super(t,n),this.pivotA=e.clone(),this.pivotB=i.clone();const r=this.equationX=new ta(t,n),a=this.equationY=new ta(t,n),c=this.equationZ=new ta(t,n);this.equations.push(r,a,c),r.minForce=a.minForce=c.minForce=-o,r.maxForce=a.maxForce=c.maxForce=o,r.ni.set(1,0,0),a.ni.set(0,1,0),c.ni.set(0,0,1)}update(){const t=this.bodyA,e=this.bodyB,n=this.equationX,i=this.equationY,o=this.equationZ;t.quaternion.vmult(this.pivotA,n.ri),e.quaternion.vmult(this.pivotB,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),o.ri.copy(n.ri),o.rj.copy(n.rj)}}class ry extends Is{constructor(t,e,n){n===void 0&&(n={});const i=typeof n.maxForce<"u"?n.maxForce:1e6;super(t,e,-i,i),this.axisA=n.axisA?n.axisA.clone():new S(1,0,0),this.axisB=n.axisB?n.axisB.clone():new S(0,1,0),this.angle=typeof n.angle<"u"?n.angle:0}computeB(t){const e=this.a,n=this.b,i=this.axisA,o=this.axisB,r=ay,a=cy,c=this.jacobianElementA,l=this.jacobianElementB;i.cross(o,r),o.cross(i,a),c.rotational.copy(a),l.rotational.copy(r);const u=Math.cos(this.angle)-i.dot(o),f=this.computeGW(),h=this.computeGiMf();return-u*e-f*n-t*h}}const ay=new S,cy=new S;class ly extends Is{constructor(t,e,n){n===void 0&&(n={});const i=typeof n.maxForce<"u"?n.maxForce:1e6;super(t,e,-i,i),this.axisA=n.axisA?n.axisA.clone():new S(1,0,0),this.axisB=n.axisB?n.axisB.clone():new S(0,1,0),this.maxAngle=Math.PI/2}computeB(t){const e=this.a,n=this.b,i=this.axisA,o=this.axisB,r=uy,a=hy,c=this.jacobianElementA,l=this.jacobianElementB;i.cross(o,r),o.cross(i,a),c.rotational.copy(a),l.rotational.copy(r);const u=Math.cos(this.maxAngle)-i.dot(o),f=this.computeGW(),h=this.computeGiMf();return-u*e-f*n-t*h}}const uy=new S,hy=new S;class dy extends df{constructor(t,e,n){n===void 0&&(n={});const i=typeof n.maxForce<"u"?n.maxForce:1e6,o=n.pivotA?n.pivotA.clone():new S,r=n.pivotB?n.pivotB.clone():new S;super(t,o,e,r,i),this.axisA=n.axisA?n.axisA.clone():new S,this.axisB=n.axisB?n.axisB.clone():new S,this.collideConnected=!!n.collideConnected,this.angle=typeof n.angle<"u"?n.angle:0;const a=this.coneEquation=new ry(t,e,n),c=this.twistEquation=new ly(t,e,n);this.twistAngle=typeof n.twistAngle<"u"?n.twistAngle:0,a.maxForce=0,a.minForce=-i,c.maxForce=0,c.minForce=-i,this.equations.push(a,c)}update(){const t=this.bodyA,e=this.bodyB,n=this.coneEquation,i=this.twistEquation;super.update(),t.vectorToWorldFrame(this.axisA,n.axisA),e.vectorToWorldFrame(this.axisB,n.axisB),this.axisA.tangents(i.axisA,i.axisA),t.vectorToWorldFrame(i.axisA,i.axisA),this.axisB.tangents(i.axisB,i.axisB),e.vectorToWorldFrame(i.axisB,i.axisB),n.angle=this.angle,i.maxAngle=this.twistAngle}}new S;new S;new S;new S;new S;new S;class Lh extends Is{constructor(t,e,n){super(t,e,-n,n),this.ri=new S,this.rj=new S,this.t=new S}computeB(t){this.a;const e=this.b;this.bi,this.bj;const n=this.ri,i=this.rj,o=fy,r=py,a=this.t;n.cross(a,o),i.cross(a,r);const c=this.jacobianElementA,l=this.jacobianElementB;a.negate(c.spatial),o.negate(c.rotational),l.spatial.copy(a),l.rotational.copy(r);const u=this.computeGW(),f=this.computeGiMf();return-u*e-t*f}}const fy=new S,py=new S;class bn{constructor(t,e,n){n=hf.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=bn.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}}bn.idCounter=0;class Ci{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=Ci.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}}Ci.idCounter=0;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new Fe;new S;new S;new S;new S(1,0,0),new S(0,1,0),new S(0,0,1);new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;class ui extends Pt{constructor(t){if(super({type:Pt.types.SPHERE}),this.radius=t!==void 0?t:1,this.radius<0)throw new Error("The sphere radius cannot be negative.");this.updateBoundingSphereRadius()}calculateLocalInertia(t,e){e===void 0&&(e=new S);const n=2*t*this.radius*this.radius/5;return e.x=n,e.y=n,e.z=n,e}volume(){return 4*Math.PI*Math.pow(this.radius,3)/3}updateBoundingSphereRadius(){this.boundingSphereRadius=this.radius}calculateWorldAABB(t,e,n,i){const o=this.radius,r=["x","y","z"];for(let a=0;a<r.length;a++){const c=r[a];n[c]=t[c]-o,i[c]=t[c]+o}}}new S;new S;new S;new S;new S;new S;new S;new S;new S;class my extends Pt{constructor(){super({type:Pt.types.PLANE}),this.worldNormal=new S,this.worldNormalNeedsUpdate=!0,this.boundingSphereRadius=Number.MAX_VALUE}computeWorldNormal(t){const e=this.worldNormal;e.set(0,0,1),t.vmult(e,e),this.worldNormalNeedsUpdate=!1}calculateLocalInertia(t,e){return e===void 0&&(e=new S),e}volume(){return Number.MAX_VALUE}calculateWorldAABB(t,e,n,i){_i.set(0,0,1),e.vmult(_i,_i);const o=Number.MAX_VALUE;n.set(-o,-o,-o),i.set(o,o,o),_i.x===1?i.x=t.x:_i.x===-1&&(n.x=t.x),_i.y===1?i.y=t.y:_i.y===-1&&(n.y=t.y),_i.z===1?i.z=t.z:_i.z===-1&&(n.z=t.z)}updateBoundingSphereRadius(){this.boundingSphereRadius=Number.MAX_VALUE}}const _i=new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new Cn;new S;new Cn;new S;new S;new S;new S;new S;new S;new S;new Cn;new S;new ae;new Cn;class gy{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){const e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}}class vy extends gy{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0;const i=this.iterations,o=this.tolerance*this.tolerance,r=this.equations,a=r.length,c=e.bodies,l=c.length,u=t;let f,h,d,g,y,p;if(a!==0)for(let M=0;M!==l;M++)c[M].updateSolveMassProperties();const m=_y,x=yy,v=xy;m.length=a,x.length=a,v.length=a;for(let M=0;M!==a;M++){const T=r[M];v[M]=0,x[M]=T.computeB(u),m[M]=1/T.computeC()}if(a!==0){for(let b=0;b!==l;b++){const E=c[b],C=E.vlambda,R=E.wlambda;C.set(0,0,0),R.set(0,0,0)}for(n=0;n!==i;n++){g=0;for(let b=0;b!==a;b++){const E=r[b];f=x[b],h=m[b],p=v[b],y=E.computeGWlambda(),d=h*(f-y-E.eps*p),p+d<E.minForce?d=E.minForce-p:p+d>E.maxForce&&(d=E.maxForce-p),v[b]+=d,g+=d>0?d:-d,E.addToWlambda(d)}if(g*g<o)break}for(let b=0;b!==l;b++){const E=c[b],C=E.velocity,R=E.angularVelocity;E.vlambda.vmul(E.linearFactor,E.vlambda),C.vadd(E.vlambda,C),E.wlambda.vmul(E.angularFactor,E.wlambda),R.vadd(E.wlambda,R)}let M=r.length;const T=1/u;for(;M--;)r[M].multiplier=v[M]*T}return n}}const xy=[],_y=[],yy=[];class My{constructor(){this.objects=[],this.type=Object}release(){const t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){const e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}}class Sy extends My{constructor(){super(...arguments),this.type=S}constructObject(){return new S}}const Se={sphereSphere:Pt.types.SPHERE,spherePlane:Pt.types.SPHERE|Pt.types.PLANE,boxBox:Pt.types.BOX|Pt.types.BOX,sphereBox:Pt.types.SPHERE|Pt.types.BOX,planeBox:Pt.types.PLANE|Pt.types.BOX,convexConvex:Pt.types.CONVEXPOLYHEDRON,sphereConvex:Pt.types.SPHERE|Pt.types.CONVEXPOLYHEDRON,planeConvex:Pt.types.PLANE|Pt.types.CONVEXPOLYHEDRON,boxConvex:Pt.types.BOX|Pt.types.CONVEXPOLYHEDRON,sphereHeightfield:Pt.types.SPHERE|Pt.types.HEIGHTFIELD,boxHeightfield:Pt.types.BOX|Pt.types.HEIGHTFIELD,convexHeightfield:Pt.types.CONVEXPOLYHEDRON|Pt.types.HEIGHTFIELD,sphereParticle:Pt.types.PARTICLE|Pt.types.SPHERE,planeParticle:Pt.types.PLANE|Pt.types.PARTICLE,boxParticle:Pt.types.BOX|Pt.types.PARTICLE,convexParticle:Pt.types.PARTICLE|Pt.types.CONVEXPOLYHEDRON,cylinderCylinder:Pt.types.CYLINDER,sphereCylinder:Pt.types.SPHERE|Pt.types.CYLINDER,planeCylinder:Pt.types.PLANE|Pt.types.CYLINDER,boxCylinder:Pt.types.BOX|Pt.types.CYLINDER,convexCylinder:Pt.types.CONVEXPOLYHEDRON|Pt.types.CYLINDER,heightfieldCylinder:Pt.types.HEIGHTFIELD|Pt.types.CYLINDER,particleCylinder:Pt.types.PARTICLE|Pt.types.CYLINDER,sphereTrimesh:Pt.types.SPHERE|Pt.types.TRIMESH,planeTrimesh:Pt.types.PLANE|Pt.types.TRIMESH};class wy{get[Se.sphereSphere](){return this.sphereSphere}get[Se.spherePlane](){return this.spherePlane}get[Se.boxBox](){return this.boxBox}get[Se.sphereBox](){return this.sphereBox}get[Se.planeBox](){return this.planeBox}get[Se.convexConvex](){return this.convexConvex}get[Se.sphereConvex](){return this.sphereConvex}get[Se.planeConvex](){return this.planeConvex}get[Se.boxConvex](){return this.boxConvex}get[Se.sphereHeightfield](){return this.sphereHeightfield}get[Se.boxHeightfield](){return this.boxHeightfield}get[Se.convexHeightfield](){return this.convexHeightfield}get[Se.sphereParticle](){return this.sphereParticle}get[Se.planeParticle](){return this.planeParticle}get[Se.boxParticle](){return this.boxParticle}get[Se.convexParticle](){return this.convexParticle}get[Se.cylinderCylinder](){return this.convexConvex}get[Se.sphereCylinder](){return this.sphereConvex}get[Se.planeCylinder](){return this.planeConvex}get[Se.boxCylinder](){return this.boxConvex}get[Se.convexCylinder](){return this.convexConvex}get[Se.heightfieldCylinder](){return this.heightfieldCylinder}get[Se.particleCylinder](){return this.particleCylinder}get[Se.sphereTrimesh](){return this.sphereTrimesh}get[Se.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new Sy,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,o,r){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new ta(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;const c=this.currentContactMaterial;a.restitution=c.restitution,a.setSpookParams(c.contactEquationStiffness,c.contactEquationRelaxation,this.world.dt);const l=n.material||t.material,u=i.material||e.material;return l&&u&&l.restitution>=0&&u.restitution>=0&&(a.restitution=l.restitution*u.restitution),a.si=o||n,a.sj=r||i,a}createFrictionEquationsFromContact(t,e){const n=t.bi,i=t.bj,o=t.si,r=t.sj,a=this.world,c=this.currentContactMaterial;let l=c.friction;const u=o.material||n.material,f=r.material||i.material;if(u&&f&&u.friction>=0&&f.friction>=0&&(l=u.friction*f.friction),l>0){const h=l*(a.frictionGravity||a.gravity).length();let d=n.invMass+i.invMass;d>0&&(d=1/d);const g=this.frictionEquationPool,y=g.length?g.pop():new Lh(n,i,h*d),p=g.length?g.pop():new Lh(n,i,h*d);return y.bi=p.bi=n,y.bj=p.bj=i,y.minForce=p.minForce=-h*d,y.maxForce=p.maxForce=h*d,y.ri.copy(t.ri),y.rj.copy(t.rj),p.ri.copy(t.ri),p.rj.copy(t.rj),t.ni.tangents(y.t,p.t),y.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),p.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),y.enabled=p.enabled=t.enabled,e.push(y,p),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;const n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];ds.setZero(),$s.setZero(),Ks.setZero();const o=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==o?(ds.vadd(e.ni,ds),$s.vadd(e.ri,$s),Ks.vadd(e.rj,Ks)):(ds.vsub(e.ni,ds),$s.vadd(e.rj,$s),Ks.vadd(e.ri,Ks));const r=1/t;$s.scale(r,n.ri),Ks.scale(r,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),ds.normalize(),ds.tangents(n.t,i.t)}getContacts(t,e,n,i,o,r,a){this.contactPointPool=o,this.frictionEquationPool=a,this.result=i,this.frictionResult=r;const c=Ty,l=Ay,u=Ey,f=by;for(let h=0,d=t.length;h!==d;h++){const g=t[h],y=e[h];let p=null;g.material&&y.material&&(p=n.getContactMaterial(g.material,y.material)||null);const m=g.type&pt.KINEMATIC&&y.type&pt.STATIC||g.type&pt.STATIC&&y.type&pt.KINEMATIC||g.type&pt.KINEMATIC&&y.type&pt.KINEMATIC;for(let x=0;x<g.shapes.length;x++){g.quaternion.mult(g.shapeOrientations[x],c),g.quaternion.vmult(g.shapeOffsets[x],u),u.vadd(g.position,u);const v=g.shapes[x];for(let M=0;M<y.shapes.length;M++){y.quaternion.mult(y.shapeOrientations[M],l),y.quaternion.vmult(y.shapeOffsets[M],f),f.vadd(y.position,f);const T=y.shapes[M];if(!(v.collisionFilterMask&T.collisionFilterGroup&&T.collisionFilterMask&v.collisionFilterGroup)||u.distanceTo(f)>v.boundingSphereRadius+T.boundingSphereRadius)continue;let b=null;v.material&&T.material&&(b=n.getContactMaterial(v.material,T.material)||null),this.currentContactMaterial=b||p||n.defaultContactMaterial;const E=v.type|T.type,C=this[E];if(C){let R=!1;v.type<T.type?R=C.call(this,v,T,u,f,c,l,g,y,v,T,m):R=C.call(this,T,v,f,u,l,c,y,g,v,T,m),R&&m&&(n.shapeOverlapKeeper.set(v.id,T.id),n.bodyOverlapKeeper.set(g.id,y.id))}}}}}sphereSphere(t,e,n,i,o,r,a,c,l,u,f){if(f)return n.distanceSquared(i)<(t.radius+e.radius)**2;const h=this.createContactEquation(a,c,t,e,l,u);i.vsub(n,h.ni),h.ni.normalize(),h.ri.copy(h.ni),h.rj.copy(h.ni),h.ri.scale(t.radius,h.ri),h.rj.scale(-e.radius,h.rj),h.ri.vadd(n,h.ri),h.ri.vsub(a.position,h.ri),h.rj.vadd(i,h.rj),h.rj.vsub(c.position,h.rj),this.result.push(h),this.createFrictionEquationsFromContact(h,this.frictionResult)}spherePlane(t,e,n,i,o,r,a,c,l,u,f){const h=this.createContactEquation(a,c,t,e,l,u);if(h.ni.set(0,0,1),r.vmult(h.ni,h.ni),h.ni.negate(h.ni),h.ni.normalize(),h.ni.scale(t.radius,h.ri),n.vsub(i,Ur),h.ni.scale(h.ni.dot(Ur),Dh),Ur.vsub(Dh,h.rj),-Ur.dot(h.ni)<=t.radius){if(f)return!0;const d=h.ri,g=h.rj;d.vadd(n,d),d.vsub(a.position,d),g.vadd(i,g),g.vsub(c.position,g),this.result.push(h),this.createFrictionEquationsFromContact(h,this.frictionResult)}}boxBox(t,e,n,i,o,r,a,c,l,u,f){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,o,r,a,c,t,e,f)}sphereBox(t,e,n,i,o,r,a,c,l,u,f){const h=this.v3pool,d=Qy;n.vsub(i,Fr),e.getSideNormals(d,r);const g=t.radius;let y=!1;const p=eM,m=nM,x=iM;let v=null,M=0,T=0,b=0,E=null;for(let N=0,G=d.length;N!==G&&y===!1;N++){const z=Ky;z.copy(d[N]);const q=z.length();z.normalize();const $=Fr.dot(z);if($<q+g&&$>0){const et=Zy,J=Jy;et.copy(d[(N+1)%3]),J.copy(d[(N+2)%3]);const At=et.length(),j=J.length();et.normalize(),J.normalize();const st=Fr.dot(et),gt=Fr.dot(J);if(st<At&&st>-At&&gt<j&&gt>-j){const ot=Math.abs($-q-g);if((E===null||ot<E)&&(E=ot,T=st,b=gt,v=q,p.copy(z),m.copy(et),x.copy(J),M++,f))return!0}}}if(M){y=!0;const N=this.createContactEquation(a,c,t,e,l,u);p.scale(-g,N.ri),N.ni.copy(p),N.ni.negate(N.ni),p.scale(v,p),m.scale(T,m),p.vadd(m,p),x.scale(b,x),p.vadd(x,N.rj),N.ri.vadd(n,N.ri),N.ri.vsub(a.position,N.ri),N.rj.vadd(i,N.rj),N.rj.vsub(c.position,N.rj),this.result.push(N),this.createFrictionEquationsFromContact(N,this.frictionResult)}let C=h.get();const R=tM;for(let N=0;N!==2&&!y;N++)for(let G=0;G!==2&&!y;G++)for(let z=0;z!==2&&!y;z++)if(C.set(0,0,0),N?C.vadd(d[0],C):C.vsub(d[0],C),G?C.vadd(d[1],C):C.vsub(d[1],C),z?C.vadd(d[2],C):C.vsub(d[2],C),i.vadd(C,R),R.vsub(n,R),R.lengthSquared()<g*g){if(f)return!0;y=!0;const q=this.createContactEquation(a,c,t,e,l,u);q.ri.copy(R),q.ri.normalize(),q.ni.copy(q.ri),q.ri.scale(g,q.ri),q.rj.copy(C),q.ri.vadd(n,q.ri),q.ri.vsub(a.position,q.ri),q.rj.vadd(i,q.rj),q.rj.vsub(c.position,q.rj),this.result.push(q),this.createFrictionEquationsFromContact(q,this.frictionResult)}h.release(C),C=null;const _=h.get(),w=h.get(),L=h.get(),I=h.get(),U=h.get(),F=d.length;for(let N=0;N!==F&&!y;N++)for(let G=0;G!==F&&!y;G++)if(N%3!==G%3){d[G].cross(d[N],_),_.normalize(),d[N].vadd(d[G],w),L.copy(n),L.vsub(w,L),L.vsub(i,L);const z=L.dot(_);_.scale(z,I);let q=0;for(;q===N%3||q===G%3;)q++;U.copy(n),U.vsub(I,U),U.vsub(w,U),U.vsub(i,U);const $=Math.abs(z),et=U.length();if($<d[q].length()&&et<g){if(f)return!0;y=!0;const J=this.createContactEquation(a,c,t,e,l,u);w.vadd(I,J.rj),J.rj.copy(J.rj),U.negate(J.ni),J.ni.normalize(),J.ri.copy(J.rj),J.ri.vadd(i,J.ri),J.ri.vsub(n,J.ri),J.ri.normalize(),J.ri.scale(g,J.ri),J.ri.vadd(n,J.ri),J.ri.vsub(a.position,J.ri),J.rj.vadd(i,J.rj),J.rj.vsub(c.position,J.rj),this.result.push(J),this.createFrictionEquationsFromContact(J,this.frictionResult)}}h.release(_,w,L,I,U)}planeBox(t,e,n,i,o,r,a,c,l,u,f){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,o,r,a,c,t,e,f)}convexConvex(t,e,n,i,o,r,a,c,l,u,f,h,d){const g=xM;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,o,i,r,g,h,d)){const y=[],p=_M;t.clipAgainstHull(n,o,e,i,r,g,-100,100,y);let m=0;for(let x=0;x!==y.length;x++){if(f)return!0;const v=this.createContactEquation(a,c,t,e,l,u),M=v.ri,T=v.rj;g.negate(v.ni),y[x].normal.negate(p),p.scale(y[x].depth,p),y[x].point.vadd(p,M),T.copy(y[x].point),M.vsub(n,M),T.vsub(i,T),M.vadd(n,M),M.vsub(a.position,M),T.vadd(i,T),T.vsub(c.position,T),this.result.push(v),m++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(v,this.frictionResult)}this.enableFrictionReduction&&m&&this.createFrictionFromAverage(m)}}sphereConvex(t,e,n,i,o,r,a,c,l,u,f){const h=this.v3pool;n.vsub(i,sM);const d=e.faceNormals,g=e.faces,y=e.vertices,p=t.radius;let m=!1;for(let x=0;x!==y.length;x++){const v=y[x],M=cM;r.vmult(v,M),i.vadd(M,M);const T=aM;if(M.vsub(n,T),T.lengthSquared()<p*p){if(f)return!0;m=!0;const b=this.createContactEquation(a,c,t,e,l,u);b.ri.copy(T),b.ri.normalize(),b.ni.copy(b.ri),b.ri.scale(p,b.ri),M.vsub(i,b.rj),b.ri.vadd(n,b.ri),b.ri.vsub(a.position,b.ri),b.rj.vadd(i,b.rj),b.rj.vsub(c.position,b.rj),this.result.push(b),this.createFrictionEquationsFromContact(b,this.frictionResult);return}}for(let x=0,v=g.length;x!==v&&m===!1;x++){const M=d[x],T=g[x],b=lM;r.vmult(M,b);const E=uM;r.vmult(y[T[0]],E),E.vadd(i,E);const C=hM;b.scale(-p,C),n.vadd(C,C);const R=dM;C.vsub(E,R);const _=R.dot(b),w=fM;if(n.vsub(E,w),_<0&&w.dot(b)>0){const L=[];for(let I=0,U=T.length;I!==U;I++){const F=h.get();r.vmult(y[T[I]],F),i.vadd(F,F),L.push(F)}if($y(L,b,n)){if(f)return!0;m=!0;const I=this.createContactEquation(a,c,t,e,l,u);b.scale(-p,I.ri),b.negate(I.ni);const U=h.get();b.scale(-_,U);const F=h.get();b.scale(-p,F),n.vsub(i,I.rj),I.rj.vadd(F,I.rj),I.rj.vadd(U,I.rj),I.rj.vadd(i,I.rj),I.rj.vsub(c.position,I.rj),I.ri.vadd(n,I.ri),I.ri.vsub(a.position,I.ri),h.release(U),h.release(F),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult);for(let N=0,G=L.length;N!==G;N++)h.release(L[N]);return}else for(let I=0;I!==T.length;I++){const U=h.get(),F=h.get();r.vmult(y[T[(I+1)%T.length]],U),r.vmult(y[T[(I+2)%T.length]],F),i.vadd(U,U),i.vadd(F,F);const N=oM;F.vsub(U,N);const G=rM;N.unit(G);const z=h.get(),q=h.get();n.vsub(U,q);const $=q.dot(G);G.scale($,z),z.vadd(U,z);const et=h.get();if(z.vsub(n,et),$>0&&$*$<N.lengthSquared()&&et.lengthSquared()<p*p){if(f)return!0;const J=this.createContactEquation(a,c,t,e,l,u);z.vsub(i,J.rj),z.vsub(n,J.ni),J.ni.normalize(),J.ni.scale(p,J.ri),J.rj.vadd(i,J.rj),J.rj.vsub(c.position,J.rj),J.ri.vadd(n,J.ri),J.ri.vsub(a.position,J.ri),this.result.push(J),this.createFrictionEquationsFromContact(J,this.frictionResult);for(let At=0,j=L.length;At!==j;At++)h.release(L[At]);h.release(U),h.release(F),h.release(z),h.release(et),h.release(q);return}h.release(U),h.release(F),h.release(z),h.release(et),h.release(q)}for(let I=0,U=L.length;I!==U;I++)h.release(L[I])}}}planeConvex(t,e,n,i,o,r,a,c,l,u,f){const h=pM,d=mM;d.set(0,0,1),o.vmult(d,d);let g=0;const y=gM;for(let p=0;p!==e.vertices.length;p++)if(h.copy(e.vertices[p]),r.vmult(h,h),i.vadd(h,h),h.vsub(n,y),d.dot(y)<=0){if(f)return!0;const x=this.createContactEquation(a,c,t,e,l,u),v=vM;d.scale(d.dot(y),v),h.vsub(v,v),v.vsub(n,x.ri),x.ni.copy(d),h.vsub(i,x.rj),x.ri.vadd(n,x.ri),x.ri.vsub(a.position,x.ri),x.rj.vadd(i,x.rj),x.rj.vsub(c.position,x.rj),this.result.push(x),g++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(x,this.frictionResult)}this.enableFrictionReduction&&g&&this.createFrictionFromAverage(g)}boxConvex(t,e,n,i,o,r,a,c,l,u,f){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,o,r,a,c,t,e,f)}sphereHeightfield(t,e,n,i,o,r,a,c,l,u,f){const h=e.data,d=t.radius,g=e.elementSize,y=IM,p=PM;ae.pointToLocalFrame(i,r,n,p);let m=Math.floor((p.x-d)/g)-1,x=Math.ceil((p.x+d)/g)+1,v=Math.floor((p.y-d)/g)-1,M=Math.ceil((p.y+d)/g)+1;if(x<0||M<0||m>h.length||v>h[0].length)return;m<0&&(m=0),x<0&&(x=0),v<0&&(v=0),M<0&&(M=0),m>=h.length&&(m=h.length-1),x>=h.length&&(x=h.length-1),M>=h[0].length&&(M=h[0].length-1),v>=h[0].length&&(v=h[0].length-1);const T=[];e.getRectMinMax(m,v,x,M,T);const b=T[0],E=T[1];if(p.z-d>E||p.z+d<b)return;const C=this.result;for(let R=m;R<x;R++)for(let _=v;_<M;_++){const w=C.length;let L=!1;if(e.getConvexTrianglePillar(R,_,!1),ae.pointToWorldFrame(i,r,e.pillarOffset,y),n.distanceTo(y)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(L=this.sphereConvex(t,e.pillarConvex,n,y,o,r,a,c,t,e,f)),f&&L||(e.getConvexTrianglePillar(R,_,!0),ae.pointToWorldFrame(i,r,e.pillarOffset,y),n.distanceTo(y)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(L=this.sphereConvex(t,e.pillarConvex,n,y,o,r,a,c,t,e,f)),f&&L))return!0;if(C.length-w>2)return}}boxHeightfield(t,e,n,i,o,r,a,c,l,u,f){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,o,r,a,c,t,e,f)}convexHeightfield(t,e,n,i,o,r,a,c,l,u,f){const h=e.data,d=e.elementSize,g=t.boundingSphereRadius,y=CM,p=RM,m=AM;ae.pointToLocalFrame(i,r,n,m);let x=Math.floor((m.x-g)/d)-1,v=Math.ceil((m.x+g)/d)+1,M=Math.floor((m.y-g)/d)-1,T=Math.ceil((m.y+g)/d)+1;if(v<0||T<0||x>h.length||M>h[0].length)return;x<0&&(x=0),v<0&&(v=0),M<0&&(M=0),T<0&&(T=0),x>=h.length&&(x=h.length-1),v>=h.length&&(v=h.length-1),T>=h[0].length&&(T=h[0].length-1),M>=h[0].length&&(M=h[0].length-1);const b=[];e.getRectMinMax(x,M,v,T,b);const E=b[0],C=b[1];if(!(m.z-g>C||m.z+g<E))for(let R=x;R<v;R++)for(let _=M;_<T;_++){let w=!1;if(e.getConvexTrianglePillar(R,_,!1),ae.pointToWorldFrame(i,r,e.pillarOffset,y),n.distanceTo(y)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(w=this.convexConvex(t,e.pillarConvex,n,y,o,r,a,c,null,null,f,p,null)),f&&w||(e.getConvexTrianglePillar(R,_,!0),ae.pointToWorldFrame(i,r,e.pillarOffset,y),n.distanceTo(y)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(w=this.convexConvex(t,e.pillarConvex,n,y,o,r,a,c,null,null,f,p,null)),f&&w))return!0}}sphereParticle(t,e,n,i,o,r,a,c,l,u,f){const h=wM;if(h.set(0,0,1),i.vsub(n,h),h.lengthSquared()<=t.radius*t.radius){if(f)return!0;const g=this.createContactEquation(c,a,e,t,l,u);h.normalize(),g.rj.copy(h),g.rj.scale(t.radius,g.rj),g.ni.copy(h),g.ni.negate(g.ni),g.ri.set(0,0,0),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}}planeParticle(t,e,n,i,o,r,a,c,l,u,f){const h=yM;h.set(0,0,1),a.quaternion.vmult(h,h);const d=MM;if(i.vsub(a.position,d),h.dot(d)<=0){if(f)return!0;const y=this.createContactEquation(c,a,e,t,l,u);y.ni.copy(h),y.ni.negate(y.ni),y.ri.set(0,0,0);const p=SM;h.scale(h.dot(i),p),i.vsub(p,p),y.rj.copy(p),this.result.push(y),this.createFrictionEquationsFromContact(y,this.frictionResult)}}boxParticle(t,e,n,i,o,r,a,c,l,u,f){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,o,r,a,c,t,e,f)}convexParticle(t,e,n,i,o,r,a,c,l,u,f){let h=-1;const d=bM,g=TM;let y=null;const p=EM;if(p.copy(i),p.vsub(n,p),o.conjugate(Nh),Nh.vmult(p,p),t.pointIsInside(p)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,o),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(o);for(let m=0,x=t.faces.length;m!==x;m++){const v=[t.worldVertices[t.faces[m][0]]],M=t.worldFaceNormals[m];i.vsub(v[0],Uh);const T=-M.dot(Uh);if(y===null||Math.abs(T)<Math.abs(y)){if(f)return!0;y=T,h=m,d.copy(M)}}if(h!==-1){const m=this.createContactEquation(c,a,e,t,l,u);d.scale(y,g),g.vadd(i,g),g.vsub(n,g),m.rj.copy(g),d.negate(m.ni),m.ri.set(0,0,0);const x=m.ri,v=m.rj;x.vadd(i,x),x.vsub(c.position,x),v.vadd(n,v),v.vsub(a.position,v),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,o,r,a,c,l,u,f){return this.convexHeightfield(e,t,i,n,r,o,c,a,l,u,f)}particleCylinder(t,e,n,i,o,r,a,c,l,u,f){return this.convexParticle(e,t,i,n,r,o,c,a,l,u,f)}sphereTrimesh(t,e,n,i,o,r,a,c,l,u,f){const h=Uy,d=Fy,g=zy,y=Oy,p=By,m=ky,x=Wy,v=Ny,M=Ly,T=qy;ae.pointToLocalFrame(i,r,n,p);const b=t.radius;x.lowerBound.set(p.x-b,p.y-b,p.z-b),x.upperBound.set(p.x+b,p.y+b,p.z+b),e.getTrianglesInAABB(x,T);const E=Dy,C=t.radius*t.radius;for(let I=0;I<T.length;I++)for(let U=0;U<3;U++)if(e.getVertex(e.indices[T[I]*3+U],E),E.vsub(p,M),M.lengthSquared()<=C){if(v.copy(E),ae.pointToWorldFrame(i,r,v,E),E.vsub(n,M),f)return!0;let F=this.createContactEquation(a,c,t,e,l,u);F.ni.copy(M),F.ni.normalize(),F.ri.copy(F.ni),F.ri.scale(t.radius,F.ri),F.ri.vadd(n,F.ri),F.ri.vsub(a.position,F.ri),F.rj.copy(E),F.rj.vsub(c.position,F.rj),this.result.push(F),this.createFrictionEquationsFromContact(F,this.frictionResult)}for(let I=0;I<T.length;I++)for(let U=0;U<3;U++){e.getVertex(e.indices[T[I]*3+U],h),e.getVertex(e.indices[T[I]*3+(U+1)%3],d),d.vsub(h,g),p.vsub(d,m);const F=m.dot(g);p.vsub(h,m);let N=m.dot(g);if(N>0&&F<0&&(p.vsub(h,m),y.copy(g),y.normalize(),N=m.dot(y),y.scale(N,m),m.vadd(h,m),m.distanceTo(p)<t.radius)){if(f)return!0;const z=this.createContactEquation(a,c,t,e,l,u);m.vsub(p,z.ni),z.ni.normalize(),z.ni.scale(t.radius,z.ri),z.ri.vadd(n,z.ri),z.ri.vsub(a.position,z.ri),ae.pointToWorldFrame(i,r,m,m),m.vsub(c.position,z.rj),ae.vectorToWorldFrame(r,z.ni,z.ni),ae.vectorToWorldFrame(r,z.ri,z.ri),this.result.push(z),this.createFrictionEquationsFromContact(z,this.frictionResult)}}const R=Hy,_=Gy,w=Vy,L=Iy;for(let I=0,U=T.length;I!==U;I++){e.getTriangleVertices(T[I],R,_,w),e.getNormal(T[I],L),p.vsub(R,m);let F=m.dot(L);if(L.scale(F,m),p.vsub(m,m),F=m.distanceTo(p),Fe.pointInTriangle(m,R,_,w)&&F<t.radius){if(f)return!0;let N=this.createContactEquation(a,c,t,e,l,u);m.vsub(p,N.ni),N.ni.normalize(),N.ni.scale(t.radius,N.ri),N.ri.vadd(n,N.ri),N.ri.vsub(a.position,N.ri),ae.pointToWorldFrame(i,r,m,m),m.vsub(c.position,N.rj),ae.vectorToWorldFrame(r,N.ni,N.ni),ae.vectorToWorldFrame(r,N.ri,N.ri),this.result.push(N),this.createFrictionEquationsFromContact(N,this.frictionResult)}}T.length=0}planeTrimesh(t,e,n,i,o,r,a,c,l,u,f){const h=new S,d=Cy;d.set(0,0,1),o.vmult(d,d);for(let g=0;g<e.vertices.length/3;g++){e.getVertex(g,h);const y=new S;y.copy(h),ae.pointToWorldFrame(i,r,y,h);const p=Ry;if(h.vsub(n,p),d.dot(p)<=0){if(f)return!0;const x=this.createContactEquation(a,c,t,e,l,u);x.ni.copy(d);const v=Py;d.scale(p.dot(d),v),h.vsub(v,v),x.ri.copy(v),x.ri.vsub(a.position,x.ri),x.rj.copy(h),x.rj.vsub(c.position,x.rj),this.result.push(x),this.createFrictionEquationsFromContact(x,this.frictionResult)}}}}const ds=new S,$s=new S,Ks=new S,Ey=new S,by=new S,Ty=new Be,Ay=new Be,Cy=new S,Ry=new S,Py=new S,Iy=new S,Ly=new S;new S;const Dy=new S,Ny=new S,Uy=new S,Fy=new S,zy=new S,Oy=new S,By=new S,ky=new S,Hy=new S,Gy=new S,Vy=new S,Wy=new Cn,qy=[],Ur=new S,Dh=new S,Xy=new S,Yy=new S,jy=new S;function $y(s,t,e){let n=null;const i=s.length;for(let o=0;o!==i;o++){const r=s[o],a=Xy;s[(o+1)%i].vsub(r,a);const c=Yy;a.cross(t,c);const l=jy;e.vsub(r,l);const u=c.dot(l);if(n===null||u>0&&n===!0||u<=0&&n===!1){n===null&&(n=u>0);continue}else return!1}return!0}const Fr=new S,Ky=new S,Zy=new S,Jy=new S,Qy=[new S,new S,new S,new S,new S,new S],tM=new S,eM=new S,nM=new S,iM=new S,sM=new S,oM=new S,rM=new S,aM=new S,cM=new S,lM=new S,uM=new S,hM=new S,dM=new S,fM=new S;new S;new S;const pM=new S,mM=new S,gM=new S,vM=new S,xM=new S,_M=new S,yM=new S,MM=new S,SM=new S,wM=new S,Nh=new Be,EM=new S;new S;const bM=new S,Uh=new S,TM=new S,AM=new S,CM=new S,RM=[0],PM=new S,IM=new S;class Fh{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){const n=e;e=t,t=n}return t<<16|e}set(t,e){const n=this.getKey(t,e),i=this.current;let o=0;for(;n>i[o];)o++;if(n!==i[o]){for(let r=i.length-1;r>=o;r--)i[r+1]=i[r];i[o]=n}}tick(){const t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){const n=this.current,i=this.previous,o=n.length,r=i.length;let a=0;for(let c=0;c<o;c++){let l=!1;const u=n[c];for(;u>i[a];)a++;l=u===i[a],l||zh(t,u)}a=0;for(let c=0;c<r;c++){let l=!1;const u=i[c];for(;u>n[a];)a++;l=n[a]===u,l||zh(e,u)}}}function zh(s,t){s.push((t&4294901760)>>16,t&65535)}const _c=(s,t)=>s<t?`${s}-${t}`:`${t}-${s}`;class LM{constructor(){this.data={keys:[]}}get(t,e){const n=_c(t,e);return this.data[n]}set(t,e,n){const i=_c(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){const n=_c(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){const t=this.data,e=t.keys;for(;e.length>0;){const n=e.pop();delete t[n]}}}class DM extends ef{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new S,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new S,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new nf,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new vy,this.constraints=[],this.narrowphase=new wy(this),this.collisionMatrix=new Sh,this.collisionMatrixPrevious=new Sh,this.bodyOverlapKeeper=new Fh,this.shapeOverlapKeeper=new Fh,this.contactmaterials=[],this.contactMaterialTable=new LM,this.defaultMaterial=new Ci("default"),this.defaultContactMaterial=new bn(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){const t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){const e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof er?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=Fe.ALL,n.from=t,n.to=e,n.callback=i,yc.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=Fe.ANY,n.from=t,n.to=e,n.result=i,yc.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=Fe.CLOSEST,n.from=t,n.to=e,n.result=i,yc.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof pt&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;const e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let o=0;o!==n.length;o++)n[o].index=o;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){const e=this.bodies;for(let n=0;n<e.length;n++){const i=e[n].shapes;for(let o=0;o<i.length;o++){const r=i[o];if(r.id===t)return r}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){const e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);const n=Ge.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{const i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;const i=Ge.now();let o=0;for(;this.accumulator>=t&&o<n&&(this.internalStep(t),this.accumulator-=t,o++,!(Ge.now()-i>t*1e3)););this.accumulator=this.accumulator%t;const r=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){const c=this.bodies[a];c.previousPosition.lerp(c.position,r,c.interpolatedPosition),c.previousQuaternion.slerp(c.quaternion,r,c.interpolatedQuaternion),c.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;const e=this.contacts,n=OM,i=BM,o=this.bodies.length,r=this.bodies,a=this.solver,c=this.gravity,l=this.doProfiling,u=this.profile,f=pt.DYNAMIC;let h=-1/0;const d=this.constraints,g=zM;c.length();const y=c.x,p=c.y,m=c.z;let x=0;for(l&&(h=Ge.now()),x=0;x!==o;x++){const I=r[x];if(I.type===f){const U=I.force,F=I.mass;U.x+=F*y,U.y+=F*p,U.z+=F*m}}for(let I=0,U=this.subsystems.length;I!==U;I++)this.subsystems[I].update();l&&(h=Ge.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),l&&(u.broadphase=Ge.now()-h);let v=d.length;for(x=0;x!==v;x++){const I=d[x];if(!I.collideConnected)for(let U=n.length-1;U>=0;U-=1)(I.bodyA===n[U]&&I.bodyB===i[U]||I.bodyB===n[U]&&I.bodyA===i[U])&&(n.splice(U,1),i.splice(U,1))}this.collisionMatrixTick(),l&&(h=Ge.now());const M=FM,T=e.length;for(x=0;x!==T;x++)M.push(e[x]);e.length=0;const b=this.frictionEquations.length;for(x=0;x!==b;x++)g.push(this.frictionEquations[x]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,M,this.frictionEquations,g),l&&(u.narrowphase=Ge.now()-h),l&&(h=Ge.now()),x=0;x<this.frictionEquations.length;x++)a.addEquation(this.frictionEquations[x]);const E=e.length;for(let I=0;I!==E;I++){const U=e[I],F=U.bi,N=U.bj,G=U.si,z=U.sj;let q;if(F.material&&N.material?q=this.getContactMaterial(F.material,N.material)||this.defaultContactMaterial:q=this.defaultContactMaterial,q.friction,F.material&&N.material&&(F.material.friction>=0&&N.material.friction>=0&&F.material.friction*N.material.friction,F.material.restitution>=0&&N.material.restitution>=0&&(U.restitution=F.material.restitution*N.material.restitution)),a.addEquation(U),F.allowSleep&&F.type===pt.DYNAMIC&&F.sleepState===pt.SLEEPING&&N.sleepState===pt.AWAKE&&N.type!==pt.STATIC){const $=N.velocity.lengthSquared()+N.angularVelocity.lengthSquared(),et=N.sleepSpeedLimit**2;$>=et*2&&(F.wakeUpAfterNarrowphase=!0)}if(N.allowSleep&&N.type===pt.DYNAMIC&&N.sleepState===pt.SLEEPING&&F.sleepState===pt.AWAKE&&F.type!==pt.STATIC){const $=F.velocity.lengthSquared()+F.angularVelocity.lengthSquared(),et=F.sleepSpeedLimit**2;$>=et*2&&(N.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(F,N,!0),this.collisionMatrixPrevious.get(F,N)||(zo.body=N,zo.contact=U,F.dispatchEvent(zo),zo.body=F,N.dispatchEvent(zo)),this.bodyOverlapKeeper.set(F.id,N.id),this.shapeOverlapKeeper.set(G.id,z.id)}for(this.emitContactEvents(),l&&(u.makeContactConstraints=Ge.now()-h,h=Ge.now()),x=0;x!==o;x++){const I=r[x];I.wakeUpAfterNarrowphase&&(I.wakeUp(),I.wakeUpAfterNarrowphase=!1)}for(v=d.length,x=0;x!==v;x++){const I=d[x];I.update();for(let U=0,F=I.equations.length;U!==F;U++){const N=I.equations[U];a.addEquation(N)}}a.solve(t,this),l&&(u.solve=Ge.now()-h),a.removeAllEquations();const C=Math.pow;for(x=0;x!==o;x++){const I=r[x];if(I.type&f){const U=C(1-I.linearDamping,t),F=I.velocity;F.scale(U,F);const N=I.angularVelocity;if(N){const G=C(1-I.angularDamping,t);N.scale(G,N)}}}this.dispatchEvent(UM),l&&(h=Ge.now());const _=this.stepnumber%(this.quatNormalizeSkip+1)===0,w=this.quatNormalizeFast;for(x=0;x!==o;x++)r[x].integrate(t,_,w);this.clearForces(),this.broadphase.dirty=!0,l&&(u.integrate=Ge.now()-h),this.stepnumber+=1,this.dispatchEvent(NM);let L=!0;if(this.allowSleep)for(L=!1,x=0;x!==o;x++){const I=r[x];I.sleepTick(this.time),I.sleepState!==pt.SLEEPING&&(L=!0)}this.hasActiveBodies=L}emitContactEvents(){const t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(yi,Mi),t){for(let o=0,r=yi.length;o<r;o+=2)Oo.bodyA=this.getBodyById(yi[o]),Oo.bodyB=this.getBodyById(yi[o+1]),this.dispatchEvent(Oo);Oo.bodyA=Oo.bodyB=null}if(e){for(let o=0,r=Mi.length;o<r;o+=2)Bo.bodyA=this.getBodyById(Mi[o]),Bo.bodyB=this.getBodyById(Mi[o+1]),this.dispatchEvent(Bo);Bo.bodyA=Bo.bodyB=null}yi.length=Mi.length=0;const n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(yi,Mi),n){for(let o=0,r=yi.length;o<r;o+=2){const a=this.getShapeById(yi[o]),c=this.getShapeById(yi[o+1]);Si.shapeA=a,Si.shapeB=c,a&&(Si.bodyA=a.body),c&&(Si.bodyB=c.body),this.dispatchEvent(Si)}Si.bodyA=Si.bodyB=Si.shapeA=Si.shapeB=null}if(i){for(let o=0,r=Mi.length;o<r;o+=2){const a=this.getShapeById(Mi[o]),c=this.getShapeById(Mi[o+1]);wi.shapeA=a,wi.shapeB=c,a&&(wi.bodyA=a.body),c&&(wi.bodyB=c.body),this.dispatchEvent(wi)}wi.bodyA=wi.bodyB=wi.shapeA=wi.shapeB=null}}clearForces(){const t=this.bodies,e=t.length;for(let n=0;n!==e;n++){const i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}}new Cn;const yc=new Fe,Ge=globalThis.performance||{};if(!Ge.now){let s=Date.now();Ge.timing&&Ge.timing.navigationStart&&(s=Ge.timing.navigationStart),Ge.now=()=>Date.now()-s}new S;const NM={type:"postStep"},UM={type:"preStep"},zo={type:pt.COLLIDE_EVENT_NAME,body:null,contact:null},FM=[],zM=[],OM=[],BM=[],yi=[],Mi=[],Oo={type:"beginContact",bodyA:null,bodyB:null},Bo={type:"endContact",bodyA:null,bodyB:null},Si={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},wi={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};class kM extends $d{constructor(){super();const t=new li;t.deleteAttribute("uv");const e=new ss({side:en}),n=new ss,i=new o_(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);const o=new Nt(t,e);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);const r=new Nt(t,n);r.position.set(-10.906,2.009,1.846),r.rotation.set(0,-.195,0),r.scale.set(2.328,7.905,4.651),this.add(r);const a=new Nt(t,n);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const c=new Nt(t,n);c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),this.add(c);const l=new Nt(t,n);l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),this.add(l);const u=new Nt(t,n);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);const f=new Nt(t,n);f.position.set(-2.193,-.369,-5.547),f.rotation.set(0,.516,0),f.scale.set(3.875,3.487,2.986),this.add(f);const h=new Nt(t,Zs(50));h.position.set(-16.116,14.37,8.208),h.scale.set(.1,2.428,2.739),this.add(h);const d=new Nt(t,Zs(50));d.position.set(-16.109,18.021,-8.207),d.scale.set(.1,2.425,2.751),this.add(d);const g=new Nt(t,Zs(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);const y=new Nt(t,Zs(43));y.position.set(-.462,8.89,14.52),y.scale.set(4.38,5.441,.088),this.add(y);const p=new Nt(t,Zs(20));p.position.set(3.235,11.486,-12.541),p.scale.set(2.5,2,.1),this.add(p);const m=new Nt(t,Zs(100));m.position.set(0,20,0),m.scale.set(1,.1,1),this.add(m)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function Zs(s){const t=new hn;return t.color.setScalar(s),t}const ko=new B;function Dn(s,t,e,n,i,o){const r=2*Math.PI*i/4,a=Math.max(o-2*i,0),c=Math.PI/4;ko.copy(t),ko[n]=0,ko.normalize();const l=.5*r/(r+a),u=1-ko.angleTo(s)/c;return Math.sign(ko[e])===1?u*l:a/(r+a)+l+l*(1-u)}class HM extends li{constructor(t=1,e=1,n=1,i=2,o=.1){if(i=i*2+1,o=Math.min(t/2,e/2,n/2,o),super(1,1,1,i,i,i),i===1)return;const r=this.toNonIndexed();this.index=null,this.attributes.position=r.attributes.position,this.attributes.normal=r.attributes.normal,this.attributes.uv=r.attributes.uv;const a=new B,c=new B,l=new B(t,e,n).divideScalar(2).subScalar(o),u=this.attributes.position.array,f=this.attributes.normal.array,h=this.attributes.uv.array,d=u.length/6,g=new B,y=.5/i;for(let p=0,m=0;p<u.length;p+=3,m+=2)switch(a.fromArray(u,p),c.copy(a),c.x-=Math.sign(c.x)*y,c.y-=Math.sign(c.y)*y,c.z-=Math.sign(c.z)*y,c.normalize(),u[p+0]=l.x*Math.sign(a.x)+c.x*o,u[p+1]=l.y*Math.sign(a.y)+c.y*o,u[p+2]=l.z*Math.sign(a.z)+c.z*o,f[p+0]=c.x,f[p+1]=c.y,f[p+2]=c.z,Math.floor(p/d)){case 0:g.set(1,0,0),h[m+0]=Dn(g,c,"z","y",o,n),h[m+1]=1-Dn(g,c,"y","z",o,e);break;case 1:g.set(-1,0,0),h[m+0]=1-Dn(g,c,"z","y",o,n),h[m+1]=1-Dn(g,c,"y","z",o,e);break;case 2:g.set(0,1,0),h[m+0]=1-Dn(g,c,"x","z",o,t),h[m+1]=Dn(g,c,"z","x",o,n);break;case 3:g.set(0,-1,0),h[m+0]=1-Dn(g,c,"x","z",o,t),h[m+1]=1-Dn(g,c,"z","x",o,n);break;case 4:g.set(0,0,1),h[m+0]=1-Dn(g,c,"x","y",o,t),h[m+1]=1-Dn(g,c,"y","x",o,e);break;case 5:g.set(0,0,-1),h[m+0]=Dn(g,c,"x","y",o,t),h[m+1]=1-Dn(g,c,"y","x",o,e);break}}}const Ho={floorA:16181192,floorB:15126433,floorRim:14268292},yo=new Map,Oh=new Map;function Ze(s,t,e){const n=`b${s},${t},${e}`;let i=yo.get(n);if(!i){const o=Math.min(.055,Math.min(s,t,e)*.3);i=new HM(s,t,e,2,o),yo.set(n,i)}return i}function El(s,t,e,n=18){const i=`c${s},${t},${e},${n}`;let o=yo.get(i);return o||(o=new xo(s,t,e,n),yo.set(i,o)),o}function Ai(s,t=18){const e=`s${s},${t}`;let n=yo.get(e);return n||(n=new is(s,t,Math.max(8,t>>1)),yo.set(e,n)),n}function pe(s,t={}){const e=t.rough??.5,n=t.metal??.03,i=t.emissive??0,o=t.emissiveIntensity??1,r=t.opacity??1,a=`${s}|${e}|${n}|${i}|${o}|${r}`;let c=Oh.get(a);return c||(c=new ss({color:s,roughness:e,metalness:n,emissive:i,emissiveIntensity:o,transparent:r<1,opacity:r}),Oh.set(a,c)),c}function Qi(s,t,e,n,i,o=!0){const r=new Nt(t,e);return r.position.set(n[0],n[1],n[2]),r.rotation.set(i[0],i[1],i[2]),r.castShadow=o,r.receiveShadow=!0,s.root.add(r),r}function GM(s,t,e,n){const i=new pt({type:pt.STATIC,shape:t,material:s.mat});return i.position.set(e[0],e[1],e[2]),i.quaternion.setFromEuler(n[0],n[1],n[2]),s.physics.addBody(i),s.bodies.push(i),i}function xn(s,t,e,n,i=[0,0,0],o){const r=Qi(s,Ze(t[0],t[1],t[2]),pe(n,o),e,i);return GM(s,new an(new S(t[0]/2,t[1]/2,t[2]/2)),e,i),r}function he(s,t,e,n,i=[0,0,0],o){const r=Math.min(t[0],t[1],t[2])>=.12;return Qi(s,Ze(t[0],t[1],t[2]),pe(n,o),e,i,r)}function Xo(s,t,e,n,i,o,r=[0,0,0],a){const c=Math.min(t,e)>=.1;return Qi(s,El(t,e,n),pe(o,a),i,r,c)}function VM(s,t,e,n,i=[1,1,1],o){const r=Qi(s,Ai(t),pe(n,o),e,[0,0,0]);return r.scale.set(i[0],i[1],i[2]),r}function au(s){let t=s>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function WM(){const t=document.createElement("canvas");t.width=t.height=128*2;const e=t.getContext("2d"),n=a=>"#"+a.toString(16).padStart(6,"0");e.fillStyle=n(Ho.floorRim),e.fillRect(0,0,128*2,128*2);const i=(a,c,l)=>{e.fillStyle=n(l),e.fillRect(a*128+3,c*128+3,122,122);const u=e.createLinearGradient(a*128,c*128,a*128,c*128+128);u.addColorStop(0,"rgba(255,255,255,0.28)"),u.addColorStop(.55,"rgba(255,255,255,0.0)"),u.addColorStop(1,"rgba(0,0,0,0.07)"),e.fillStyle=u,e.fillRect(a*128+3,c*128+3,122,122)};i(0,0,Ho.floorA),i(1,1,Ho.floorA),i(1,0,Ho.floorB),i(0,1,Ho.floorB);const o=au(7);e.globalAlpha=.05;for(let a=0;a<400;a++){e.fillStyle=o()>.5?"#ffffff":"#000000";const c=1+o()*3;e.fillRect(o()*128*2,o()*128*2,c,c)}e.globalAlpha=1;const r=new Kl(t);return r.wrapS=r.wrapT=ra,r.repeat.set(15,15),r.colorSpace=Fn,r}function qM(){const e=document.createElement("canvas");e.width=64,e.height=512;const n=e.getContext("2d"),i=n.createLinearGradient(0,0,0,512);i.addColorStop(0,"#3f8fe0"),i.addColorStop(.35,"#79bdf2"),i.addColorStop(.62,"#bfe3fb"),i.addColorStop(.8,"#ffe6c9"),i.addColorStop(1,"#ffd7ae"),n.fillStyle=i,n.fillRect(0,0,64,512);const o=au(31);n.globalAlpha=.26,n.fillStyle="#ffffff";for(let a=0;a<22;a++){const c=512*(.5+o()*.28),l=3+o()*8;n.beginPath(),n.ellipse(64/2,c,64*(.5+o()*.6),l,0,0,Math.PI*2),n.fill()}n.globalAlpha=1;const r=new Kl(e);return r.colorSpace=Fn,r}const Pe={laneA:9430015,laneB:11989247,laneEdge:5227511,fence:16748487,fenceTop:16765286,post:10185983,start:8121759,finish:16765286,skirt:7259903,cloud:16777215,balloon:[16739210,16765286,8121759,6607615,12882175,16752488]};function Bh(s,t,e,n,i=1.7){const o=Math.abs(n-e),r=(e+n)/2;xn(s,[.36,i,o],[t,i/2,r],Pe.fence,[0,0,0],{rough:.5}),he(s,[.5,.16,o],[t,i+.08,r],Pe.fenceTop,[0,0,0],{rough:.4});for(let a=Math.min(e,n);a<=Math.max(e,n);a+=4)Xo(s,.16,.16,i+.5,[t,(i+.5)/2,a],Pe.post,[0,0,0],{rough:.45}),VM(s,.2,[t,i+.55,a],Pe.fenceTop,[1,.8,1],{rough:.35})}const kh=new Map;function XM(s,t){const e=`${s}|${t}`,n=kh.get(e);if(n)return n;const i=256,o=document.createElement("canvas");o.width=i,o.height=i;const r=o.getContext("2d");r.clearRect(0,0,i,i);const a=s.length<=1?168:s.length<=2?132:300/s.length;r.font=`900 ${a}px ui-sans-serif, system-ui, "Malgun Gothic", sans-serif`,r.textAlign="center",r.textBaseline="middle",r.lineWidth=a*.16,r.strokeStyle="rgba(18,24,32,0.85)",r.strokeText(s,i/2,i/2+a*.02),r.fillStyle=`#${t.toString(16).padStart(6,"0")}`,r.fillText(s,i/2,i/2+a*.02);const c=new Kl(o);c.anisotropy=4;const l=new hn({map:c,transparent:!0,depthWrite:!1,toneMapped:!1});return kh.set(e,l),l}function YM(s,t,e,n,i,o,r){he(s,[n,.04,i],[t,.03,e],r,[0,0,0],{rough:.8});const a=.16;he(s,[n,.05,a],[t,.045,e-i/2+a/2],16777215,[0,0,0],{rough:.7}),he(s,[n,.05,a],[t,.045,e+i/2-a/2],16777215,[0,0,0],{rough:.7}),he(s,[a,.05,i],[t-n/2+a/2,.045,e],16777215,[0,0,0],{rough:.7}),he(s,[a,.05,i],[t+n/2-a/2,.045,e],16777215,[0,0,0],{rough:.7});const c=Math.min(n,i)*.8,l=new Nt(new Ps(c,c),XM(o,16777215));l.rotation.x=-Math.PI/2,l.rotation.z=Math.PI,l.position.set(t,.07,e),s.root.add(l)}function jM(s,t,e,n=16777215){for(const r of[-1,1])xn(s,[.22,3.2,.22],[r*e,3.2/2,t],n,[0,0,0],{rough:.35});xn(s,[e*2+.22,.22,.22],[0,3.2,t],n,[0,0,0],{rough:.35}),xn(s,[e*2,3.2,.2],[0,3.2/2,t-2.2],14675967,[0,0,0],{rough:.9});for(const r of[-1,1])xn(s,[.2,3.2,2.2],[r*e,3.2/2,t-1.1],14675967,[0,0,0],{rough:.9});for(let r=1;r<6;r++){const a=.5333333333333333*r;he(s,[e*2,.05,.05],[0,a,t-2.15],16777215,[0,0,0],{rough:.8})}for(let r=-3;r<=3;r++)he(s,[.05,3.2,.05],[e/3.2*r,3.2/2,t-2.15],16777215,[0,0,0],{rough:.8});he(s,[e*2+1.2,.06,.28],[0,.045,t],16777215,[0,0,0],{rough:.8})}function $M(s,t,e,n={}){const i=n.slotH??.78,o=n.sideGap??1.6,r=n.wallH??2.4,a=n.color??16747069,c=.5,l=e-o;if(l<=.2)return;xn(s,[l*2,r-i,c],[0,i+(r-i)/2,t],a,[0,0,0],{rough:.45});for(const h of[-1,1])xn(s,[.26,i,c*1.1],[h*l,i/2,t],a,[0,0,0],{rough:.45});const u=Math.max(2,Math.round(l));for(let h=1;h<u;h++){const d=-l+l*2*h/u;he(s,[.1,i,.1],[d,i/2,t],16765286,[0,0,0],{rough:.5})}he(s,[l*2,.05,1.6],[0,.04,t],16765286,[0,0,0],{rough:.75});for(const h of[-1,1])he(s,[o-.2,.05,1.6],[h*(e-o/2),.04,t],8121759,[0,0,0],{rough:.75});const f=.42;for(const h of[-1,1])xn(s,[o-.2,f,.36],[h*(e-o/2),f/2,t],4180362,[0,0,0],{rough:.6})}function Hh(s,t,e,n,i=1){const o=[[0,0,0,1],[.9,-.15,.1,.72],[-.95,-.1,-.1,.66],[.35,.35,-.2,.62],[-.4,.28,.25,.55]];for(const[r,a,c,l]of o){const u=Qi(s,Ai(l*i,14),pe(Pe.cloud,{rough:1,metal:0}),[t+r*i,e+a*i,n+c*i],[0,0,0],!1);u.receiveShadow=!1}}function KM(s,t,e,n,i,o=1){Qi(s,Ai(.42*o,16),pe(i,{rough:.3}),[t,e,n],[0,0,0],!1).scale.set(1,1.18,1),Qi(s,El(.07*o,.02*o,.16*o),pe(i,{rough:.4}),[t,e-.5*o,n],[0,0,0],!1);const a=Qi(s,El(.015,.015,1.6*o),pe(16777215,{rough:.9}),[t,e-1.38*o,n],[0,0,0],!1);a.receiveShadow=!1}const K={spinRate:1.5,spinY:1.05,spinThick:.34,pistonPeriod:4.4,pistonOutFrac:.32,pistonSpeed:5.5,pistonW:1.5,pistonH:1.5,pistonD:2.6,rollR:1.9,rollMass:120,rollSpeed:7.5,rollPeriod:7,rollRun:18,rollParkY:-40,sweepW:2.2,sweepH:1.3,sweepD:.7,sweepSpeed:3.6,sweepEdgeGap:.6,popW:5.4,popH:1.5,popD:.6,popPeriod:3.4,popUpFrac:.42,popSpeed:4.5,popSink:.15,shutterH:1.6,shutterD:.6,shutterPeriod:4,shutterSpeed:3.2,shutterGapHalf:.55,gateW:5.6,gateH:2.6,gateD:.5,gateSink:3.2,gateSpeed:4,shutterW:6.45,btnPadX:4.6,btnPadAhead:3.6,btnPadHalf:1.15,btnPadMaxY:1.5,rollHitPad:.6,rollKnockSide:90,rollKnockUp:30,rollKnockdownTime:1.4,rollHitCooldown:1.3,hitPad:.42,hitPadY:.12,hitMinSpeed:1.2,hitCooldownTime:2.4,hitMinY:.62,knockPush:62,knockUp:26,knockdownTime:1.15};function ZM(s,t){let e=Math.imul(s+1,2654435761)^Math.imul(t+1,2246822507);return e=Math.imul(e^e>>>16,2146121005),e=Math.imul(e^e>>>15,2221713035),((e^e>>>16)>>>0)/4294967296}const JM=new Set(["spinner","piston","sweeper","shutter"]),Gh=new S,zr=new S;function QM(s,t){const e=s.shapes[0];if(!(e instanceof an))return!1;const n=e.halfExtents;return t.vsub(s.position,Gh),s.quaternion.conjugate().vmult(Gh,zr),Math.abs(zr.x)<=n.x+K.hitPad&&Math.abs(zr.y)<=n.y+K.hitPadY&&Math.abs(zr.z)<=n.z+K.hitPad}function tS(s,t){let e=[];const n=new Map;function i(){e=[],n.clear();for(const p of s.obstacleSpecs){const m=s.objectById.get(p.id);m&&e.push({spec:p,body:m.body,clock:p.phase,rolling:!1,x:0,cycle:0,homeX:p.arg*(t+K.pistonW*.5),opened:!1,forceOpen:!1})}o()}function o(){for(const p of e){p.clock=p.spec.phase,p.cycle=0,p.rolling=!1,p.opened=!1,p.forceOpen=!1;const m=p.body;switch(m.velocity.setZero(),m.angularVelocity.setZero(),m.force.setZero(),m.torque.setZero(),p.spec.kind){case"spinner":m.position.set(0,K.spinY,p.spec.z),m.angularVelocity.set(0,K.spinRate,0);break;case"piston":m.position.set(p.homeX,K.pistonH*.5,p.spec.z);break;case"roller":m.position.set(0,K.rollParkY,p.spec.z);break;case"sweeper":m.position.set(-5.300000000000001,K.sweepH*.5,p.spec.z);break;case"popup":m.position.set(p.spec.arg*2.4,-1.5*.5-K.popSink,p.spec.z);break;case"shutter":m.position.set(p.spec.arg*(t+1),K.shutterH*.5,p.spec.z);break;case"coopgate":case"buttongate":m.position.set(0,K.gateH*.5,p.spec.z);break}m.wakeUp()}}function r(p,m){const x=[];for(const[v,M]of n){const T=M-p;T<=0?n.delete(v):n.set(v,T)}for(const v of e){v.clock+=p;const M=v.body;switch(v.spec.kind){case"spinner":M.position.set(0,K.spinY,v.spec.z),M.velocity.setZero(),M.angularVelocity.set(0,K.spinRate,0);break;case"piston":{const b=v.clock%K.pistonPeriod<K.pistonPeriod*K.pistonOutFrac,E=v.spec.arg*(t-K.pistonW*.9),R=(b?E:v.homeX)-M.position.x,_=Math.abs(R)<.05?0:Math.sign(R)*K.pistonSpeed;M.velocity.set(_,0,0),M.position.y=K.pistonH*.5,M.position.z=v.spec.z;break}case"sweeper":{const T=t-K.sweepW*.5-K.sweepEdgeGap,b=T*2,E=b*2/K.sweepSpeed,C=(v.clock%E+E)%E,w=((C<E/2?-T+C/(E/2)*b:T-(C-E/2)/(E/2)*b)-M.position.x)/Math.max(.001,p);M.velocity.set(Math.max(-3.6,Math.min(K.sweepSpeed,w)),0,0),M.position.y=K.sweepH*.5,M.position.z=v.spec.z;break}case"popup":{const b=v.clock%K.popPeriod<K.popPeriod*K.popUpFrac,E=K.popH*.5,C=-1.5*.5-K.popSink,_=(b?E:C)-M.position.y;M.velocity.set(0,Math.abs(_)<.05?0:Math.sign(_)*K.popSpeed,0),M.position.x=v.spec.arg*2.4,M.position.z=v.spec.z;break}case"shutter":{const b=v.clock%K.shutterPeriod<K.shutterPeriod*.5,E=K.shutterW,C=v.spec.arg*(K.shutterGapHalf+E*.5),R=v.spec.arg*(t+E*.5),w=(b?C:R)-M.position.x,L=Math.abs(w)<.05?0:Math.sign(w)*K.shutterSpeed;M.velocity.set(L,0,0),M.position.y=K.shutterH*.5,M.position.z=v.spec.z;break}case"buttongate":{if(!v.forceOpen){let E=!1;for(const C of m){if(C.state!=="ACTIVE")continue;const R=C.pelvis.position;if(!(R.y>K.btnPadMaxY)&&!(Math.abs(R.z-(v.spec.z+K.btnPadAhead))>K.btnPadHalf)&&!(Math.abs(Math.abs(R.x)-K.btnPadX)>K.btnPadHalf)){E=!0;break}}if(v.opened=E,E){for(const C of m)if(C.pelvis.position.z<v.spec.z-K.gateD){v.forceOpen=!0;break}}}const b=(v.opened?-2.6*.5-K.gateSink:K.gateH*.5)-M.position.y;M.velocity.set(0,Math.abs(b)<.05?0:Math.sign(b)*K.gateSpeed,0),M.position.x=0,M.position.z=v.spec.z;break}case"coopgate":{const b=(v.opened?-1.3-K.gateSink:K.gateH*.5)-M.position.y;M.velocity.set(0,Math.abs(b)<.05?0:Math.sign(b)*K.gateSpeed,0),M.position.x=0,M.position.z=v.spec.z;break}case"roller":{if(v.rolling)(M.position.z>v.spec.z+K.rollRun||M.position.y<-5)&&(M.position.set(0,K.rollParkY,v.spec.z),M.velocity.setZero(),M.angularVelocity.setZero(),v.rolling=!1,v.cycle++,v.clock=0);else if(v.clock>=K.rollPeriod){const T=ZM(v.spec.id,v.cycle);v.x=(T*2-1)*(t-K.rollR-.4),M.position.set(v.x,K.rollR+.05,v.spec.z),M.velocity.set(0,0,K.rollSpeed),M.angularVelocity.set(K.rollSpeed/K.rollR,0,0),M.wakeUp(),v.rolling=!0,v.clock=0}break}}if(JM.has(v.spec.kind)){let T=M.velocity.x,b=M.velocity.z,E=Math.hypot(T,b,M.velocity.y);if(v.spec.kind==="spinner"&&(E=1/0),E>=K.hitMinSpeed)for(const C of m){if(C.state!=="ACTIVE"||n.has(C)||C.pelvis.position.y<K.hitMinY||!QM(M,C.pelvis.position))continue;let R=T,_=b;if(v.spec.kind==="spinner"){const L=C.pelvis.position.x-M.position.x,I=C.pelvis.position.z-M.position.z;R=K.spinRate*I,_=-1.5*L}const w=Math.hypot(R,_);w<.001?(R=0,_=1):(R/=w,_/=w),C.knockdown(K.knockdownTime),C.pelvis.applyImpulse(new S(R*K.knockPush,K.knockUp,_*K.knockPush)),n.set(C,K.hitCooldownTime),x.push({rag:C,dirX:R,dirZ:_})}}if(!(v.spec.kind!=="roller"||!v.rolling))for(const T of m){if(T.state!=="ACTIVE"||n.has(T))continue;const b=T.pelvis.position,E=b.x-M.position.x,C=b.z-M.position.z;if(Math.hypot(E,C)>K.rollR+K.rollHitPad||Math.abs(b.y-M.position.y)>K.rollR+1.2)continue;let R=E;Math.abs(R)<.2&&(R=b.x>=0?1:-1);const _=Math.hypot(R,1)||1;T.knockdown(K.rollKnockdownTime),T.pelvis.applyImpulse(new S(R/_*K.rollKnockSide*.5,K.rollKnockUp,K.rollKnockSide)),n.set(T,K.rollHitCooldown),x.push({rag:T,dirX:R/_,dirZ:1})}}return x}function a(){const p=[];for(const m of e)m.spec.kind==="roller"&&(m.body.position.y<0||p.push({x:m.body.position.x,z:m.body.position.z,r:K.rollR}));return p}function c(p){n.delete(p)}const l=p=>p.spec.kind==="coopgate",u=p=>p.spec.kind==="coopgate"||p.spec.kind==="buttongate";function f(p){if(p===void 0){const M=e.filter(T=>u(T)&&!T.opened);for(const T of M)T.opened=!0,T.forceOpen=!0;return M.length?M[0].spec.z:null}const m=e.filter(M=>l(M)&&!M.opened);if(m.length===0)return null;const v=m.filter(M=>M.spec.z<p).sort((M,T)=>T.spec.z-M.spec.z)[0]??m[0];return v.opened=!0,v.spec.z}function h(){return e.filter(p=>l(p)&&!p.opened).map(p=>p.spec.z)}function d(){return e.filter(p=>p.spec.kind==="buttongate").map(p=>({z:p.spec.z,open:p.body.position.y<0}))}function g(p,m,x,v){return x>K.btnPadMaxY||Math.abs(v-(p+K.btnPadAhead))>K.btnPadHalf?!1:Math.abs(Math.abs(m)-K.btnPadX)<=K.btnPadHalf}function y(){for(const p of e)if(u(p)&&!p.forceOpen)return!0;return!1}return{rebuild:i,park:o,update:r,rollers:a,forget:c,openGate:f,closedGates:h,needsSoloOpen:y,buttonGates:d,onPad:g,get stations(){return e}}}const fn=90,eS=100,nS=200,re=7,iS=2.6,ni=1.2;function Mc(s){return function({b:e,addBall:n,addHazard:i,addObstacle:o}){const{startZ:r,finishZ:a}=s,c=au(s.seed);function l(x,v,M,T=Pe.laneB){const b=x-v,E=(x+v)/2;xn(e,[M*2,ni,b],[0,-ni/2,E],T,[0,0,0],{rough:.6});for(let C=v;C<x;C+=4){const R=Math.min(4,x-C);he(e,[M*2-.4,.04,R*.5],[0,.02,C+R*.25],Pe.laneA,[0,0,0],{rough:.75})}for(const C of[-1,1])he(e,[.5,.06,b],[C*(M-.25),.03,E],Pe.laneEdge,[0,0,0],{rough:.6});he(e,[M*2+.5,.5,b],[0,-ni-.2,E],Pe.skirt,[0,0,0],{rough:.7})}function u(x,v){he(e,[re*2-.6,.06,.7],[0,.045,x],v,[0,0,0],{rough:.7});for(const M of[-1,1])Xo(e,.28,.28,3.4,[M*(re-.4),1.7,x],v,[0,0,0],{rough:.45});he(e,[re*2,.32,.32],[0,3.4,x],v,[0,0,0],{rough:.45})}for(const[x,v,M]of s.sections)l(x,v,M,Pe.laneB);for(const[x,v]of s.gates)u(x,v);const f=x=>{for(const[v,M,T]of s.sections)if(x<=v&&x>=M)return T;return re};for(let x=r-8;x>a;x-=26){const v=f(x);for(const M of[-1,1])Xo(e,.5,.34,14,[M*(v-1),-ni-7.2,x],Pe.post,[0,0,0],{rough:.6})}he(e,[re*2-.6,.05,11],[0,.035,r-5.5],Pe.start,[0,0,0],{rough:.7}),he(e,[re*2-.6,.05,9],[0,.035,a+4.5],Pe.finish,[0,0,0],{rough:.7});for(let x=0;x<14;x++){const v=(re*2-.6)/14;he(e,[v,.06,.5],[-re+.3+v*(x+.5),.045,a+9],x%2?16777215:2830136,[0,0,0],{rough:.8})}he(e,[re*2-.6,.06,.4],[0,.045,r-11.5],16777215,[0,0,0],{rough:.8});const h=re+3.2,d=1.5,g=1.6;function y(x,v){const M=[];for(const[E,C]of s.shortcuts??[])for(const R of[E,C]){const _=Math.min(x,R+g),w=Math.max(v,R-g);_>w&&M.push([_,w])}if(M.length===0)return[[x,v]];M.sort((E,C)=>C[0]-E[0]);const T=[];let b=x;for(const[E,C]of M)b>E&&T.push([b,E]),b=Math.min(b,C);return b>v&&T.push([b,v]),T}for(const[x,v]of s.shortcuts??[]){const M=x-v;xn(e,[d*2,ni,M],[h,-ni/2,(x+v)/2],Pe.laneB,[0,0,0],{rough:.6});for(const T of[-1,1])he(e,[.34,.07,M],[h+T*(d-.17),.04,(x+v)/2],16735603,[0,0,0],{rough:.7});he(e,[d*2+.5,.5,M],[h,-ni-.2,(x+v)/2],Pe.skirt,[0,0,0],{rough:.7});for(const T of[x,v]){const b=(re+h-d)/2,E=h-d-re;xn(e,[E,ni,g*2],[b,-ni/2,T],Pe.laneB,[0,0,0],{rough:.6}),he(e,[E+1.2,.06,.34],[b,.045,T+g-.2],16765286,[0,0,0],{rough:.7}),he(e,[E+1.2,.06,.34],[b,.045,T-g+.2],16765286,[0,0,0],{rough:.7})}for(const[T,b]of[[x,1],[v,-1]])xn(e,[d*2,1.2,.4],[h,.6,T+b*(g+.2)],Pe.fence,[0,0,0],{rough:.5}),he(e,[d*2,.14,.5],[h,1.27,T+b*(g+.2)],16735603,[0,0,0],{rough:.4});for(let T=x-6;T>v;T-=26)Xo(e,.45,.3,14,[h,-ni-7.2,T],Pe.post,[0,0,0],{rough:.6})}for(const[x,v,M]of s.sections){if(M<re){for(const T of[x,v])for(const b of[-1,1])Xo(e,.34,.34,2.2,[b*(re-.4),1.1,T],16765286,[0,0,0],{rough:.45});for(const T of[-1,1])xn(e,[.22,.42,x-v],[T*(M-.11),.21,(x+v)/2],16765286,[0,0,0],{rough:.6});continue}Bh(e,-re,x,v);for(const[T,b]of y(x,v))Bh(e,re,T,b)}for(const x of[r,a])xn(e,[re*2,1.7,.4],[0,.85,x],Pe.fence,[0,0,0],{rough:.5}),he(e,[re*2,.16,.5],[0,1.78,x],Pe.fenceTop,[0,0,0],{rough:.4});for(let x=r+6;x>a-10;x-=11){const v=c()>.5?1:-1;Hh(e,v*(re+5+c()*5),-2-c()*4,x+c()*5,1.1+c()*.9),c()>.5&&Hh(e,-v*(re+7+c()*6),3+c()*5,x-c()*6,.9+c()*.8)}let p=0;for(let x=r-4;x>a+4;x-=14)for(const v of[-1,1]){const M=Pe.balloon[p++%Pe.balloon.length];KM(e,v*(f(x)+1.1),3.2+p%3*.5,x,M,1)}s.hazards.forEach((x,v)=>i(eS+v,x,2.2+v*1.15));let m=nS;for(const[x,v,M,T]of s.obstacles)if(o(m++,x,v,M,T),x==="buttongate")for(const b of[-1,1]){const E=b*K.btnPadX,C=v+K.btnPadAhead;he(e,[K.btnPadHalf*2,.06,K.btnPadHalf*2],[E,.045,C],9133302,[0,0,0],{rough:.6}),he(e,[K.btnPadHalf*1.5,.09,K.btnPadHalf*1.5],[E,.07,C],16765286,[0,0,0],{rough:.5}),he(e,[.14,.05,K.btnPadAhead],[E,.035,v+K.btnPadAhead/2],9133302,[0,0,0],{rough:.7})}for(const x of s.ballSlots??[])$M(e,x,re);if(s.tutorial)for(const[x,v,M]of ff)YM(e,0,x,5.2,4.2,v,M);jM(e,a+6,ea),n(fn,.3,[0,.31,r-11])}}const ea=4.2,ff=[[6,"WASD",4176112],[-1,"F",15765823],[-6,"SHIFT",10185983],[-11,"E",4180362]],sS=2.6,ri=[{id:"sky",name:"1. 하늘 코스",blurb:"드리블을 익힌다",timeLimit:200,targetId:fn,targetName:"공",goal:{x:0,z:-104,radius:2.4,halfWidth:ea},spawns:[[-1.6,10],[1.6,10],[-3.6,10],[3.6,10]],botSpawns:[[3.2,-76]],ballSlots:[-52],floor:{size:30,color:9430015,outside:10475775,hideOutside:!0,hideFloor:!0,noGround:!0},fog:[12577279,70,210],build:Mc({startZ:18,finishZ:-110,seed:20260827,tutorial:!0,sections:[[18,-12,re],[-12,-52,re],[-52,-110,re]],gates:[[-12,Pe.laneEdge],[-52,16747069]],hazards:[2,-30,-76],obstacles:[["buttongate",-8,0,0],["popup",-20,-1,0],["spinner",-33,4.2,1],["coopgate",-40,0,0],["piston",-46,-1,.4],["sweeper",-60,0,0],["popup",-72,1,1.2],["piston",-82,1,1.6]],ballSlots:[-52],shortcuts:[[-56,-78]]})},{id:"canyon",name:"2. 회전 협곡",blurb:"공만 지나가는 틈과 좁은 다리",timeLimit:230,targetId:fn,targetName:"공",goal:{x:0,z:-134,radius:2.4,halfWidth:ea},spawns:[[-1.6,10],[1.6,10],[-3.6,10],[3.6,10]],botSpawns:[[3.2,-50],[-3.2,-112]],ballSlots:[-20,-104],floor:{size:30,color:16769202,outside:16765088,hideOutside:!0,hideFloor:!0,noGround:!0},fog:[16769728,65,200],build:Mc({startZ:18,finishZ:-140,seed:771133,sections:[[18,-10,re],[-10,-56,re],[-56,-96,iS],[-96,-140,re]],gates:[[-10,16765286],[-56,16747069],[-96,8150271]],hazards:[-4,-34,-108],ballSlots:[-20,-104],obstacles:[["sweeper",-26,0,0],["buttongate",-36,0,0],["spinner",-46,4.4,1.1],["piston",-52,-1,0],["popup",-52,1,.9],["coopgate",-70,0,0],["popup",-98,0,.7],["spinner",-110,4.4,.5],["piston",-113,1,1.4]],shortcuts:[[-40,-56]]})},{id:"denof",name:"3. 봇 소굴",blurb:"셔터 통로와 방해꾼 셋",timeLimit:260,targetId:fn,targetName:"공",goal:{x:0,z:-154,radius:2.4,halfWidth:ea},spawns:[[-1.6,10],[1.6,10],[-3.6,10],[3.6,10]],botSpawns:[[3.4,-34],[-3.4,-86],[2.6,-108]],ballSlots:[-72],floor:{size:30,color:14272767,outside:13219583,hideOutside:!0,hideFloor:!0,noGround:!0},fog:[14208255,60,190],build:Mc({startZ:18,finishZ:-160,seed:424242,sections:[[18,-14,re],[-14,-60,re],[-60,-100,re],[-100,-160,re]],gates:[[-14,8150271],[-60,16747069],[-100,16765286]],hazards:[-6,-50,-112],ballSlots:[-72],obstacles:[["buttongate",-16,0,0],["shutter",-24,-1,0],["shutter",-24,1,0],["roller",-44,0,0],["spinner",-54,4.4,.8],["coopgate",-66,0,0],["piston",-78,-1,0],["piston",-81,1,1.1],["sweeper",-92,0,.5],["coopgate",-102,0,0],["shutter",-104,-1,1.3],["shutter",-104,1,1.3],["popup",-108,0,.4],["buttongate",-114,0,0],["spinner",-120,4.4,.3]],shortcuts:[[-86,-100]]})}],ue={radius:1.1,mass:40,hoverY:13,warnTime:1.3,linger:1.9,period:6.2,hitPad:.75,hitVertical:1.6,knockSide:78,knockUp:34,knockdownTime:1.5,hitCooldown:1.2,voidY:-8};function oS(s,t){let e=Math.imul(s+1,2654435761)^Math.imul(t+1,2246822507);return e=Math.imul(e^e>>>16,2146121005),e=Math.imul(e^e>>>15,2221713035),((e^e>>>16)>>>0)/4294967296}function rS(s,t){let e=[];const n=new Map;function i(){e=[],n.clear();for(const u of s.hazardSpecs){const f=s.objectById.get(u.id);f&&e.push({spec:u,body:f.body,phase:"wait",timer:u.phase,x:0,cycle:0})}o()}function o(){for(const u of e)u.phase="wait",u.timer=u.spec.phase,u.cycle=0,r(u,0)}function r(u,f){u.body.position.set(f,ue.hoverY,u.spec.z),u.body.velocity.setZero(),u.body.angularVelocity.setZero(),u.body.force.setZero(),u.body.torque.setZero(),u.body.wakeUp()}function a(u,f){const h=[];for(const[d,g]of n){const y=g-u;y<=0?n.delete(d):n.set(d,y)}for(const d of e){switch(d.timer-=u,d.phase){case"wait":if(d.timer<=0){const g=oS(d.spec.id,d.cycle);d.x=(g*2-1)*(t-ue.radius-.6),d.phase="warn",d.timer=ue.warnTime,r(d,d.x)}else r(d,d.x);break;case"warn":r(d,d.x),d.timer<=0&&(d.phase="fall",d.timer=6);break;case"fall":(d.body.position.y<=ue.radius+.35||d.timer<=0)&&(d.phase="linger",d.timer=ue.linger);break;case"linger":d.timer<=0&&(d.cycle++,d.phase="wait",d.timer=ue.period,r(d,0));break}if(!(d.phase!=="fall"&&d.phase!=="linger"))for(const g of f){if(g.state!=="ACTIVE"||n.has(g))continue;const y=g.pelvis.position,p=y.x-d.body.position.x,m=y.z-d.body.position.z;if(Math.hypot(p,m)>ue.radius+ue.hitPad||Math.abs(y.y-d.body.position.y)>ue.radius+ue.hitVertical)continue;let v=p,M=m;const T=Math.hypot(v,M);T<.001?(v=y.x>=0?1:-1,M=0):(v/=T,M/=T),g.knockdown(ue.knockdownTime),g.pelvis.applyImpulse(new S(v*ue.knockSide,ue.knockUp,M*ue.knockSide)),g.torso.applyImpulse(new S(v*ue.knockSide*.35,0,M*ue.knockSide*.35)),n.set(g,ue.hitCooldown),h.push({rag:g,dirX:v,dirZ:M})}}return h}function c(){const u=[];for(const f of e){const h=f.body.position.y;h<ue.radius+.6||u.push({x:f.body.position.x,z:f.body.position.z,y:h,r:ue.radius})}return u}function l(u){n.delete(u)}return{rebuild:i,park:o,update:a,activeMarkers:c,forget:l,get stations(){return e}}}function aS(s){const t=new $d,e=new $l(14281983,45,130);t.fog=e;const n=new Tn(70,window.innerWidth/window.innerHeight,.1,220),i=new Gx({antialias:!0});i.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.setSize(window.innerWidth,window.innerHeight),i.toneMapping=xd,i.toneMappingExposure=1,i.shadowMap.enabled=!0,i.shadowMap.type=gd,s.appendChild(i.domElement);const o=new Sl(i),r=new kM;t.environment=o.fromScene(r,.04).texture,t.environmentIntensity=.35,r.dispose(),o.dispose(),t.add(new a_(16777215,.12)),t.add(new i_(12574975,15258536,.4));const a=new vh(16773852,2.7);a.position.set(17,19,11),a.castShadow=!0,a.shadow.mapSize.set(2048,2048),a.shadow.camera.left=-22,a.shadow.camera.right=22,a.shadow.camera.top=22,a.shadow.camera.bottom=-22,a.shadow.camera.near=1,a.shadow.camera.far=70,a.shadow.bias=-6e-4,a.shadow.normalBias=.025,t.add(a),t.add(a.target);const c=new vh(11128319,.28);c.position.set(-12,9,-14),t.add(c);const l=new Nt(new is(95,32,20),new hn({map:qM(),side:en,depthWrite:!1,fog:!1}));l.renderOrder=-1,t.add(l);const u=new DM({gravity:new S(0,-18,0)});u.broadphase=new nf,u.allowSleep=!1,u.solver.iterations=22,u.solver.tolerance=5e-4;const f=new Ci("ground"),h=new Ci("player"),d=new Ci("prop"),g=new Ci("held"),y=new Ci("ball");u.addContactMaterial(new bn(f,h,{friction:.55,restitution:0})),u.addContactMaterial(new bn(f,d,{friction:.2,restitution:.05})),u.addContactMaterial(new bn(h,d,{friction:.3,restitution:.05})),u.addContactMaterial(new bn(f,g,{friction:.004,restitution:.05})),u.addContactMaterial(new bn(h,g,{friction:.3,restitution:.05})),u.addContactMaterial(new bn(d,g,{friction:.2,restitution:.05})),u.addContactMaterial(new bn(f,y,{friction:.32,restitution:.45})),u.addContactMaterial(new bn(h,y,{friction:.28,restitution:.35})),u.addContactMaterial(new bn(d,y,{friction:.25,restitution:.45}));const p=WM();p.anisotropy=i.capabilities.getMaxAnisotropy();const m=new Nt(new Ps(30,30),new ss({map:p,roughness:.72,metalness:.02}));m.rotation.x=-Math.PI/2,m.receiveShadow=!0,t.add(m);const x=new Nt(new Ps(190,190),new ss({color:8306794,roughness:.95,metalness:0}));x.rotation.x=-Math.PI/2,x.position.y=-.08,t.add(x);const v=new pt({type:pt.STATIC,shape:new my,material:f});v.quaternion.setFromEuler(-Math.PI/2,0,0),u.addBody(v);const M=[],T=new Map;let b=null,E=[],C=0;const R=[],_=(q,$,et,J,At,j,st,gt={rough:.45})=>{const ot=new dn,vt=new Nt(Ze($[0],$[1],$[2]),pe(J,gt));vt.castShadow=!0,vt.receiveShadow=!0,ot.add(vt),st==null||st(ot),ot.position.set(et[0],et[1],et[2]),t.add(ot);const nt=new pt({mass:At,shape:new an(new S($[0]/2,$[1]/2,$[2]/2)),position:new S(et[0],et[1],et[2]),material:d});nt.angularDamping=.2,nt.linearDamping=.02,u.addBody(nt);const bt={id:q,mesh:ot,body:nt,grabRadius:j,mass:At};M.push(bt),T.set(q,bt)},w=(q,$,et,J={})=>{const{mass:At=1.1,color:j=16777215,patch:st=2830136}=J,gt=new dn,ot=new Nt(Ai($,28),pe(j,{rough:.38}));ot.castShadow=!0,ot.receiveShadow=!0,gt.add(ot);const vt=[[0,1,0],[0,-1,0],[1,.3,.5],[-1,.3,-.5],[.5,-.3,-1],[-.5,-.3,1],[.8,.2,-.8],[-.8,.2,.8]];for(const It of vt){const kt=Math.hypot(It[0],It[1],It[2]),O=new Nt(Ai($*.34,14),pe(st,{rough:.4}));O.position.set(It[0]/kt*$*.86,It[1]/kt*$*.86,It[2]/kt*$*.86),O.scale.set(1,1,1),gt.add(O)}gt.position.set(et[0],et[1],et[2]),t.add(gt);const nt=new pt({mass:At,shape:new ui($),position:new S(et[0],et[1],et[2]),material:y});nt.angularDamping=.65,nt.linearDamping=.012,u.addBody(nt);const bt={id:q,mesh:gt,body:nt,grabRadius:$+1.6,grabReach:1.5,mass:At};M.push(bt),T.set(q,bt)},L=[],I=(q,$,et)=>{const J=new dn,At=new Nt(Ai(ue.radius,24),pe(16735603,{rough:.35}));At.castShadow=!0,At.receiveShadow=!0,J.add(At);for(const[gt,ot]of[[.55,.62],[-.55,.62],[0,.9]]){const vt=new Nt(Ai(ue.radius*ot,18),pe(16765286,{rough:.4}));vt.position.y=ue.radius*gt,vt.scale.set(1,.42,1),J.add(vt)}J.position.set(0,ue.hoverY,$),t.add(J);const j=new pt({mass:ue.mass,shape:new ui(ue.radius),position:new S(0,ue.hoverY,$),material:d});j.angularDamping=.35,j.linearDamping=.008,u.addBody(j);const st={id:q,mesh:J,body:j,grabRadius:0,grabbable:!1,mass:ue.mass};M.push(st),T.set(q,st),L.push({id:q,z:$,phase:et})},U=[],F=(q,$,et,J,At)=>{const j=new dn;let st;if($==="roller"){const ot=new Nt(Ai(K.rollR,26),pe(16747069,{rough:.4}));ot.castShadow=!0,ot.receiveShadow=!0,j.add(ot);for(const vt of[.5,-.5]){const nt=new Nt(Ai(K.rollR*.72,20),pe(2830149,{rough:.5}));nt.position.y=K.rollR*vt,nt.scale.set(1,.34,1),j.add(nt)}st=new pt({mass:K.rollMass,shape:new ui(K.rollR),position:new S(0,K.rollParkY,et),material:d}),st.angularDamping=.05,st.linearDamping=.005}else if($==="spinner"){const ot=new Nt(Ze(J*2,K.spinThick,K.spinThick),pe(16765286,{rough:.35}));ot.castShadow=!0,ot.receiveShadow=!0,j.add(ot);for(const vt of[-1,1]){const nt=new Nt(Ze(K.spinThick*1.6,K.spinThick*1.6,K.spinThick*1.6),pe(16735603,{rough:.35}));nt.position.x=vt*J,j.add(nt)}st=new pt({mass:0,type:pt.KINEMATIC,shape:new an(new S(J,K.spinThick*.5,K.spinThick*.5)),position:new S(0,K.spinY,et),material:d})}else if($==="sweeper"){const ot=new Nt(Ze(K.sweepW,K.sweepH,K.sweepD),pe(3200672,{rough:.4}));ot.castShadow=!0,ot.receiveShadow=!0,j.add(ot);for(const vt of[-1,1]){const nt=new Nt(Ze(.28,K.sweepH*1.06,K.sweepD*1.06),pe(16765286,{rough:.35}));nt.position.x=vt*K.sweepW*.5,j.add(nt)}st=new pt({mass:0,type:pt.KINEMATIC,shape:new an(new S(K.sweepW*.5,K.sweepH*.5,K.sweepD*.5)),position:new S(0,K.sweepH*.5,et),material:d})}else if($==="popup"){const ot=new Nt(Ze(K.popW,K.popH,K.popD),pe(16735603,{rough:.42}));ot.castShadow=!0,ot.receiveShadow=!0,j.add(ot);const vt=new Nt(Ze(K.popW*1.02,.18,K.popD*1.06),pe(16765286,{rough:.35}));vt.position.y=K.popH*.5-.09,j.add(vt),st=new pt({mass:0,type:pt.KINEMATIC,shape:new an(new S(K.popW*.5,K.popH*.5,K.popD*.5)),position:new S(0,-1.5,et),material:d})}else if($==="coopgate"){const ot=new Nt(Ze(K.gateW,K.gateH,K.gateD),pe(2078376,{rough:.4}));ot.castShadow=!0,ot.receiveShadow=!0,j.add(ot);for(let vt=0;vt<4;vt++){const nt=new Nt(Ze(K.gateW*1.02,.2,K.gateD*1.06),pe(16765286,{rough:.35}));nt.position.y=-2.6*.35+vt*(K.gateH*.23),j.add(nt)}st=new pt({mass:0,type:pt.KINEMATIC,shape:new an(new S(K.gateW*.5,K.gateH*.5,K.gateD*.5)),position:new S(0,K.gateH*.5,et),material:d})}else if($==="buttongate"){const ot=new Nt(Ze(K.gateW,K.gateH,K.gateD),pe(9133302,{rough:.4}));ot.castShadow=!0,ot.receiveShadow=!0,j.add(ot);for(let vt=0;vt<4;vt++){const nt=new Nt(Ze(K.gateW*1.02,.2,K.gateD*1.06),pe(16765286,{rough:.35}));nt.position.y=-2.6*.35+vt*(K.gateH*.23),j.add(nt)}st=new pt({mass:0,type:pt.KINEMATIC,shape:new an(new S(K.gateW*.5,K.gateH*.5,K.gateD*.5)),position:new S(0,K.gateH*.5,et),material:d})}else if($==="shutter"){const ot=K.shutterW,vt=new Nt(Ze(ot,K.shutterH,K.shutterD),pe(5217791,{rough:.4}));vt.castShadow=!0,vt.receiveShadow=!0,j.add(vt);const nt=new Nt(Ze(.24,K.shutterH*1.04,K.shutterD*1.06),pe(16765286,{rough:.35}));nt.position.x=-Math.sign(J||1)*ot*.5,j.add(nt),st=new pt({mass:0,type:pt.KINEMATIC,shape:new an(new S(ot*.5,K.shutterH*.5,K.shutterD*.5)),position:new S(0,K.shutterH*.5,et),material:d})}else{const ot=new Nt(Ze(K.pistonW,K.pistonH,K.pistonD),pe(8150271,{rough:.4}));ot.castShadow=!0,ot.receiveShadow=!0,j.add(ot);const vt=new Nt(Ze(K.pistonW*1.02,.22,K.pistonD*1.02),pe(16765286,{rough:.4}));vt.position.y=K.pistonH*.22,j.add(vt),st=new pt({mass:0,type:pt.KINEMATIC,shape:new an(new S(K.pistonW*.5,K.pistonH*.5,K.pistonD*.5)),position:new S(0,K.pistonH*.5,et),material:d})}t.add(j),u.addBody(st);const gt={id:q,mesh:j,body:st,grabRadius:0,grabbable:!1,mass:st.mass};M.push(gt),T.set(q,gt),U.push({id:q,kind:$,z:et,arg:J,phase:At})};function N(){for(const q of E)u.removeBody(q);E=[],b&&(t.remove(b),b.clear(),b=null);for(const q of M)u.removeBody(q.body),t.remove(q.mesh),q.mesh.clear();M.length=0,T.clear(),L.length=0,U.length=0}function G(q){N(),C=Math.max(0,Math.min(ri.length-1,q));const $=ri[C];b=new dn,t.add(b),E=[];const et={physics:u,mat:f,root:b,bodies:E};$.build({b:et,addProp:_,addBall:w,addHazard:I,addObstacle:F}),m.scale.set($.floor.size/30,$.floor.size/30,1),m.material.color.setHex($.floor.color),x.material.color.setHex($.floor.outside),m.visible=!$.floor.hideFloor;const J=!$.floor.noGround,At=u.bodies.includes(v);J&&!At&&u.addBody(v),!J&&At&&u.removeBody(v),x.visible=!$.floor.hideOutside;const j=$.fog??[14281983,45,130];e.color.setHex(j[0]),e.near=j[1],e.far=j[2];for(const st of R)st()}G(0),window.addEventListener("resize",()=>{n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),i.setSize(window.innerWidth,window.innerHeight)});const z={scene:t,camera:n,renderer:i,physics:u,objects:M,objectById:T,groundBody:v,materials:{ground:f,player:h,prop:d,held:g,ball:y},sun:a,get mapIndex(){return C},get map(){return ri[C]},mapCount:ri.length,loadMap:G,onMapLoaded(q){R.push(q)},hazardSpecs:L,obstacleSpecs:U};return window.__world=z,z}const cS=1,it={rideHeight:.86,rideSpring:2600,rideDamp:220,rideRayExtra:.5,uprightTorque:70,uprightDamp:46,yawTorque:42,yawMaxRate:9,moveAccel:8,moveForce:980,maxSpeed:4.6,airForceRatio:.22,brakeRatio:1,leanAmount:.26,jumpImpulse:88,jumpCooldown:.45,legSwing:17,kneeSwing:6,armSwing:6,swingSpeed:8.5,swingDamp:1.2,endSpinDamp:40,endDamp:.85,carryTorque:3.5,carryDamp:.5,carryObjDamp:.45,carryObjAngDamp:.7,carryDist:.55,carryHeight:.12,carryKp:62,carryKd:15,carryLiftStrength:260,carryPushStrength:400,pushLowRatio:.85,pushSpeedFactor:1,pushVelGain:10,pushCatchGain:6,pushCatchMax:3,pushHoldDist:.42,antiHangK:2600,antiHangMax:900,antiHangDamp:260,carryUprightAccel:45,carryUprightDampRate:9,carryDragAssist:.75,carryRamp:.55,grabReach:.5,holdForceMin:300,holdForceScale:2.5,holdForceMax:500,carryUprightBoost:1.5,reachTorque:6.5,reachElbowRatio:.6,reachDamp:.9,handReachKp:400,handReachKd:40,handReachMax:60,handReachRamp:.35,fallTiltDot:.42,fallTiltTime:.55,impactSpeed:13,ragdollTime:1.7,recoverTime:1.3},Ft={pelvis:{rx:.17,mass:5},torso:{r:.2,sep:.28,mass:5,y:.42},head:{r:.19,mass:1.2,y:.44},upperArm:{r:.085,sep:.18,mass:.55},lowerArm:{r:.075,sep:.17,mass:.45},hand:{r:.085,mass:.3},upperLeg:{r:.105,sep:.2,mass:1.5},lowerLeg:{r:.09,sep:.2,mass:1.1},foot:{r:.1,mass:.6},shoulderX:.29,hipX:.14};function Ei(s,t,e,n,i,o,r,a=.35){const c=new pt({mass:e,position:n.clone(),material:i,linearDamping:.02,angularDamping:a,collisionFilterGroup:o,collisionFilterMask:r});return t>0?(c.addShape(new ui(s),new S(0,-t/2,0)),c.addShape(new ui(s),new S(0,t/2,0))):c.addShape(new ui(s)),c.updateMassProperties(),c.allowSleep=!1,c}const Xn={head:{r:1.95,len:1,up:.16},torso:{r:1.22,len:.85},pelvis:{r:1.28,len:1},upperArm:{r:1.55,len:.55},lowerArm:{r:1.62,len:.55},hand:{r:2.05,len:1},upperLeg:{r:1.15,len:.86},lowerLeg:{r:1.3,len:.76},foot:{r:1.62,len:1}};function lS(s){return new ss({color:s,roughness:.42,metalness:.05})}const uS={r:1,len:1};function bi(s,t,e,n=uS){const i=s*n.r,o=t>0?t*n.len:t,r=t>0?new tu(i,o,8,20):new is(i,24,16);n.up&&r.translate(0,n.up,0);const a=new Nt(r,lS(e));return a.castShadow=!0,a.receiveShadow=!0,a}function hS(s,t,e,n=0){const i=new is(t*.19,12,10),o=new ss({color:e,roughness:.25,metalness:.1});for(const r of[-1,1]){const a=new Nt(i,o);a.position.set(r*t*.34,n+t*.1,t*.9),s.add(a);const c=new Nt(new is(t*.07,8,6),new hn({color:16777215}));c.position.set(r*t*.3,n+t*.16,t*1.02),s.add(c)}}function Xi(s,t,e,n,i,o,r=4e3){return new dy(s,t,{pivotA:e,pivotB:n,axisA:new S(0,-1,0),axisB:new S(0,-1,0),angle:i,twistAngle:o,maxForce:r})}function dS(s,t){const e=Math.min(255,Math.round((s>>16&255)*t)),n=Math.min(255,Math.round((s>>8&255)*t)),i=Math.min(255,Math.round((s&255)*t));return e<<16|n<<8|i}function fS(s,t,e,n,i,o,r){const a=new Map,c=[],l=[],u=new dn;t.add(u);const f=r;function h(X,rt,dt){return s.addBody(rt),u.add(dt),a.set(X,{name:X,body:rt,mesh:dt}),c.push(rt),rt}const d=e,g=Ei(Ft.pelvis.rx,0,Ft.pelvis.mass,new S(d.x,d.y,d.z),n,o,f);h("pelvis",g,bi(Ft.pelvis.rx,0,i.pants,Xn.pelvis));const y=d.y+Ft.torso.y,p=Ei(Ft.torso.r,Ft.torso.sep,Ft.torso.mass,new S(d.x,y,d.z),n,o,f);h("torso",p,bi(Ft.torso.r,Ft.torso.sep,i.shirt,Xn.torso));const m=y+Ft.head.y,x=Ei(Ft.head.r,0,Ft.head.mass,new S(d.x,m,d.z),n,o,f,it.endDamp),v=bi(Ft.head.r,0,i.skin,Xn.head);hS(v,Ft.head.r*Xn.head.r,i.eye??3811874,Xn.head.up??0),h("head",x,v);function M(X,rt){const dt=d.x+X*Ft.shoulderX,Rt=y+.13-Ft.upperArm.sep/2-.08,_t=Ei(Ft.upperArm.r,Ft.upperArm.sep,Ft.upperArm.mass,new S(dt,Rt,d.z),n,o,f);h("upperArm"+rt,_t,bi(Ft.upperArm.r,Ft.upperArm.sep,i.shirt,Xn.upperArm));const jt=Rt-Ft.upperArm.sep/2-Ft.lowerArm.sep/2-.05,H=Ei(Ft.lowerArm.r,Ft.lowerArm.sep,Ft.lowerArm.mass,new S(dt,jt,d.z),n,o,f,it.endDamp);h("lowerArm"+rt,H,bi(Ft.lowerArm.r,Ft.lowerArm.sep,i.skin,Xn.lowerArm));const St=jt-Ft.lowerArm.sep/2-Ft.hand.r-.02,Q=Ei(Ft.hand.r,0,Ft.hand.mass,new S(dt,St,d.z),n,o,f,it.endDamp);h("hand"+rt,Q,bi(Ft.hand.r,0,i.skin,Xn.hand));const ct=Xi(p,_t,new S(X*Ft.shoulderX,.13,0),new S(0,Ft.upperArm.sep/2+.08,0),Math.PI*.55,Math.PI/4,5e3);s.addConstraint(ct),l.push(ct);const Mt=Xi(_t,H,new S(0,-.18/2-.025,0),new S(0,Ft.lowerArm.sep/2+.025,0),Math.PI*.3,Math.PI/8,2200);s.addConstraint(Mt),l.push(Mt);const yt=Xi(H,Q,new S(0,-.17/2-.01,0),new S(0,Ft.hand.r+.01,0),Math.PI*.22,Math.PI/8,900);return s.addConstraint(yt),l.push(yt),{ua:_t,la:H,hand:Q}}const T=M(-1,"L"),b=M(1,"R");function E(X,rt){const dt=d.x+X*Ft.hipX,Rt=d.y-.1-Ft.upperLeg.sep/2-.06,_t=Ei(Ft.upperLeg.r,Ft.upperLeg.sep,Ft.upperLeg.mass,new S(dt,Rt,d.z),n,o,f);h("upperLeg"+rt,_t,bi(Ft.upperLeg.r,Ft.upperLeg.sep,i.pants,Xn.upperLeg));const jt=Rt-Ft.upperLeg.sep/2-Ft.lowerLeg.sep/2-.05,H=Ei(Ft.lowerLeg.r,Ft.lowerLeg.sep,Ft.lowerLeg.mass,new S(dt,jt,d.z),n,o,f);h("lowerLeg"+rt,H,bi(Ft.lowerLeg.r,Ft.lowerLeg.sep,i.pants,Xn.lowerLeg));const St=jt-Ft.lowerLeg.sep/2-Ft.foot.r,Q=Ei(Ft.foot.r,0,Ft.foot.mass,new S(dt,St,d.z+.03),n,o,f,it.endDamp);h("foot"+rt,Q,bi(Ft.foot.r,0,i.shoes??dS(i.pants,.55),Xn.foot));const ct=Xi(g,_t,new S(X*Ft.hipX,-.1,0),new S(0,Ft.upperLeg.sep/2+.06,0),Math.PI*.42,Math.PI/6,9e3);s.addConstraint(ct),l.push(ct);const Mt=Xi(_t,H,new S(0,-.2/2-.025,0),new S(0,Ft.lowerLeg.sep/2+.025,0),Math.PI*.26,Math.PI/10,4e3);s.addConstraint(Mt),l.push(Mt);const yt=Xi(H,Q,new S(0,-.2/2-.01,0),new S(0,Ft.foot.r+.01,0),Math.PI*.2,Math.PI/10,1500);return s.addConstraint(yt),l.push(yt),{ul:_t,ll:H,foot:Q}}const C=E(-1,"L"),R=E(1,"R"),_=Xi(g,p,new S(0,Ft.torso.y/2,0),new S(0,-.42/2,0),Math.PI*.18,Math.PI/7,26e3);s.addConstraint(_),l.push(_);const w=Xi(p,x,new S(0,Ft.head.y/2,0),new S(0,-.44/2,0),Math.PI*.16,Math.PI/6,3e3);s.addConstraint(w),l.push(w);const L=c.map(X=>X.position.vsub(g.position)),I=c.reduce((X,rt)=>X+rt.mass,0);let U="ACTIVE",F=0,N=0,G=0,z=0,q=0,$=!1,et=0,J=0,At=0;const j=new Set;let st=0,gt=[],ot=0,vt=0,nt=0,bt=0,It=0,kt=0,O=0,_e=1;for(const X of["head","torso","pelvis"])a.get(X).body.addEventListener("collide",dt=>{if(U!=="ACTIVE"||_e>0||J>0)return;const ut=Math.abs(dt.contact.getImpactVelocityAlongNormal());ut>it.impactSpeed&&Xt(it.ragdollTime,`충격(${X}) rel=${ut.toFixed(1)}`)});function Xt(X=it.ragdollTime,rt="unknown"){if(U==="RAGDOLL")return;console.warn(`[ragdoll] knockdown 발동! reason=${rt} state=${U}->RAGDOLL seconds=${X.toFixed(2)}`),U="RAGDOLL",N=X,G=0,F=0;const dt=9,ut=7;for(const Rt of c){const _t=Rt.velocity.length();_t>dt&&Rt.velocity.scale(dt/_t,Rt.velocity);const jt=Rt.angularVelocity.length();jt>ut&&Rt.angularVelocity.scale(ut/jt,Rt.angularVelocity)}}const $t=new S(0,1,0),Ct=new S,te=new Fe,Ot=new er;function D(){return p.quaternion.vmult($t,Ct),Ct.y}function A(X){te.from.set(g.position.x,g.position.y,g.position.z),te.to.set(g.position.x,g.position.y-(it.rideHeight+it.rideRayExtra),g.position.z);let rt=-1;for(const dt of X.bodies)if(dt.collisionFilterGroup!==o&&!j.has(dt)&&(Ot.reset(),te.intersectBody(dt,Ot),Ot.hasHit)){const ut=g.position.y-Ot.hitPointWorld.y;(rt<0||ut<rt)&&(rt=ut)}return rt}function Y(X,rt){X.torque.x+=rt.x,X.torque.y+=rt.y,X.torque.z+=rt.z}function tt(X,rt,dt,ut){const Rt=Math.min(X.inertia.x,X.inertia.y,X.inertia.z),_t=Math.abs(rt)*Rt/ut,jt=-rt*dt;return Math.max(-_t,Math.min(_t,jt))}function ht(X,rt,dt,ut){const _t=Math.min(X.inertia.x,X.inertia.y,X.inertia.z)*dt/ut;return Math.max(-_t,Math.min(_t,rt))}const at=new S;function zt(X,rt,dt,ut,Rt){const _t=dt.x-rt.x,jt=dt.y-rt.y,H=dt.z-rt.z,St=Math.hypot(_t,jt,H);if(!(St>1e-4))return;const Q=_t/St,ct=jt/St,Mt=H/St;at.set(0,-1,0),X.quaternion.vmult(at,at);const yt=at;Y(X,new S((yt.y*Mt-yt.z*ct)*ut+tt(X,X.angularVelocity.x,it.reachDamp,Rt),(yt.z*Q-yt.x*Mt)*ut+tt(X,X.angularVelocity.y,it.reachDamp,Rt),(yt.x*ct-yt.y*Q)*ut+tt(X,X.angularVelocity.z,it.reachDamp,Rt)))}function mt(X,rt,dt){if(z=Math.max(0,z-X),_e=Math.max(0,_e-X),J=Math.max(0,J-X),U==="ACTIVE"&&_e<=0&&J<=0)for(const qt of["torso","pelvis","head"]){const Zt=a.get(qt).body;if(Zt.angularVelocity.length()>34||Zt.velocity.length()>34){Xt(.9,`선제안전장치(${qt}) angVel=${Zt.angularVelocity.length().toFixed(1)} vel=${Zt.velocity.length().toFixed(1)}`);break}}const ut=A(dt);$=ut>=0&&ut<=it.rideHeight+.18;const Rt=D();if(U==="ACTIVE")Rt<it.fallTiltDot&&_e<=0&&J<=0?(F+=X,F>it.fallTiltTime&&Xt(it.ragdollTime,`기울어짐 up=${Rt.toFixed(2)}`)):F=0;else if(U==="RAGDOLL")N-=X,N<=0&&(console.warn("[ragdoll] RAGDOLL -> RECOVERING"),U="RECOVERING",G=it.recoverTime);else if(U==="RECOVERING"&&(G-=X,G<=0)){console.warn("[ragdoll] RECOVERING -> ACTIVE"),U="ACTIVE",F=0,J=.9;for(const qt of c)qt.velocity.scale(.35,qt.velocity),qt.angularVelocity.scale(.35,qt.angularVelocity)}if(U==="RAGDOLL")return;const _t=U==="RECOVERING"?1-Math.max(0,G)/it.recoverTime:1,jt=Rt;if(ut>=0&&ut<it.rideHeight+.12&&jt>.35&&z<=0){const qt=Math.abs(dt.gravity.y),Zt=I*qt,Kt=it.rideHeight-ut,oe=Math.max(-.15,Math.min(.22,Kt)),ye=g.velocity.y,$e=Math.min(1,(jt-.35)/.4),Ne=(Zt+oe*it.rideSpring-ye*it.rideDamp)*_t*$e;if(Number.isFinite(Ne)){const Le=Math.max(-Zt*.4,Math.min(Zt*1.55,Ne));g.applyForce(new S(0,Le,0))}}const H=At>0?.35:1,St=Math.hypot(vt,nt);let Q=0,ct=0;if(St>.001&&$){const qt=Math.min(1,St)*it.leanAmount*H;Q=vt/St*qt,ct=nt/St*qt}const Mt=Math.hypot(Q,1,ct),yt=Q/Mt,ee=1/Mt,Re=ct/Mt;p.quaternion.vmult($t,Ct);const ke=it.uprightTorque*_t*(At>0?it.carryUprightBoost:1);Y(p,new S((Ct.y*Re-Ct.z*ee)*ke+tt(p,p.angularVelocity.x,it.uprightDamp,X),tt(p,p.angularVelocity.y,it.uprightDamp*.4,X),(Ct.x*ee-Ct.y*yt)*ke+tt(p,p.angularVelocity.z,it.uprightDamp,X))),g.quaternion.vmult($t,Ct),Y(g,new S((Ct.y*Re-Ct.z*ee)*ke*.6+tt(g,g.angularVelocity.x,it.uprightDamp*.5,X),tt(g,g.angularVelocity.y,it.uprightDamp*.25,X),(Ct.x*ee-Ct.y*yt)*ke*.6+tt(g,g.angularVelocity.z,it.uprightDamp*.5,X)));const ne=g.velocity.x,Xe=g.velocity.z,sn=Math.hypot(ne,Xe),Ds=Math.hypot(rt.moveX,rt.moveZ),Fi=Ds>.01,Rn=Fi?rt.moveX/Ds:0,zi=Fi?rt.moveZ/Ds:0;bt=Rn,It=zi;{const qt=rt.aimX??0,Zt=rt.aimZ??0,Kt=Math.hypot(qt,Zt);Kt>.01&&(kt=qt/Kt,O=Zt/Kt)}if($||Fi){const qt=Rn*it.maxSpeed,Zt=zi*it.maxSpeed,Kt=qt-ne,oe=Zt-Xe,ye=I+st*it.carryDragAssist,$e=ye/I,Ne=$?1:it.airForceRatio,Le=it.moveAccel*ye*Ne*_t*(Fi?1:it.brakeRatio);let ve=Kt*Le,P=oe*Le;const k=Math.hypot(ve,P),V=it.moveForce*$e*Ne*_t;k>V&&(ve=ve/k*V,P=P/k*V),g.applyForce(new S(ve,0,P)),p.applyForce(new S(ve*.22,0,P*.22)),vt=ve/Math.max(1,V),nt=P/Math.max(1,V)}else vt=0,nt=0;if(Fi){const qt=Math.atan2(Rn,zi),Zt=new S(0,0,1);p.quaternion.vmult(Zt,Zt);const Kt=Math.atan2(Zt.x,Zt.z);let oe=qt-Kt;for(;oe>Math.PI;)oe-=Math.PI*2;for(;oe<-Math.PI;)oe+=Math.PI*2;Y(p,new S(0,ht(p,oe*it.yawTorque*_t,it.yawMaxRate,X),0))}if($&&sn>.15){const qt=Math.min(1,sn/(it.maxSpeed*.75));q+=X*it.swingSpeed*(.35+.65*qt);const Zt=Math.sin(q),Kt=sn>.01?ne/sn:Rn,oe=sn>.01?Xe/sn:zi,ye=(ve,P,k,V)=>Y(ve,new S(P*V+tt(ve,ve.angularVelocity.x,it.swingDamp,X),tt(ve,ve.angularVelocity.y,it.swingDamp,X),k*V+tt(ve,ve.angularVelocity.z,it.swingDamp,X))),$e=it.legSwing*_t*qt;ye(C.ul,oe*Zt,-Kt*Zt,$e),ye(R.ul,-oe*Zt,Kt*Zt,$e);const Ne=it.kneeSwing*_t*qt,Le=Math.sin(q-Math.PI/2);if(ye(C.ll,oe*Le,-Kt*Le,Ne),ye(R.ll,-oe*Le,Kt*Le,Ne),At===0){const ve=it.armSwing*_t*qt;ye(T.ua,-oe*Zt,Kt*Zt,ve),ye(b.ua,oe*Zt,-Kt*Zt,ve)}}for(const qt of[T.hand,b.hand,C.foot,R.foot])Y(qt,new S(tt(qt,qt.angularVelocity.x,it.endSpinDamp,X),tt(qt,qt.angularVelocity.y,it.endSpinDamp,X),tt(qt,qt.angularVelocity.z,it.endSpinDamp,X)));const lr=st*Math.abs(dt.gravity.y)<=it.carryLiftStrength;if(gt.length>0&&U==="ACTIVE"){ot+=X;const qt=Math.min(1,ot/it.handReachRamp)*_t,Zt=Math.abs(dt.gravity.y);for(const Kt of gt){const oe=Kt.hand===T.hand?-1:1,ye=oe<0?T:b;let $e=0;for(const Wt of[ye.ua,ye.la,Kt.hand]){const Bt=Wt.mass*Zt*qt;Wt.applyForce(new S(0,Bt,0)),$e+=Bt}p.applyForce(new S(0,-$e,0));const Ne=new S(oe*Ft.shoulderX,.13,0);p.quaternion.vmult(Ne,Ne),Ne.vadd(p.position,Ne),zt(ye.ua,Ne,Kt.target,it.reachTorque*qt,X);const Le=new S(0,-.18/2-.025,0);ye.ua.quaternion.vmult(Le,Le),Le.vadd(ye.ua.position,Le),zt(ye.la,Le,Kt.target,it.reachTorque*it.reachElbowRatio*qt,X);const ve=Kt.target.vsub(Kt.hand.position),P=Kt.targetVel,k=Kt.hand.velocity.x-(P?P.x:0),V=Kt.hand.velocity.y-(P?P.y:0),Z=Kt.hand.velocity.z-(P?P.z:0),W=(ve.x*it.handReachKp-k*it.handReachKd)*Kt.hand.mass,xt=(ve.y*it.handReachKp-V*it.handReachKd)*Kt.hand.mass,Tt=(ve.z*it.handReachKp-Z*it.handReachKd)*Kt.hand.mass,Dt=Math.hypot(W,xt,Tt),Ut=(Dt>it.handReachMax?it.handReachMax/Dt:1)*qt,Ht=new S(W*Ut,xt*Ut,Tt*Ut);Number.isFinite(Ht.x)&&Number.isFinite(Ht.y)&&Number.isFinite(Ht.z)&&(Kt.hand.applyForce(Ht),p.applyForce(new S(-Ht.x,-Ht.y,-Ht.z)))}}if(At>0&&lr){const qt=new S(0,0,1);p.quaternion.vmult(qt,qt);const Zt=qt.x*.86,Kt=-.5,oe=qt.z*.86,ye=Math.hypot(Zt,Kt,oe),$e=Zt/ye,Ne=Kt/ye,Le=oe/ye,ve=it.carryTorque*_t;for(const k of[T.ua,b.ua]){const V=new S(0,-1,0);k.quaternion.vmult(V,V),Y(k,new S((V.y*Le-V.z*Ne)*ve+tt(k,k.angularVelocity.x,it.carryDamp,X),(V.z*$e-V.x*Le)*ve+tt(k,k.angularVelocity.y,it.carryDamp,X),(V.x*Ne-V.y*$e)*ve+tt(k,k.angularVelocity.z,it.carryDamp,X)))}const P=it.carryTorque*.55*_t;for(const k of[T.la,b.la]){const V=new S(0,-1,0);k.quaternion.vmult(V,V),Y(k,new S((V.y*Le-V.z*Ne)*P+tt(k,k.angularVelocity.x,it.carryDamp,X),(V.z*$e-V.x*Le)*P+tt(k,k.angularVelocity.y,it.carryDamp,X),(V.x*Ne-V.y*$e)*P+tt(k,k.angularVelocity.z,it.carryDamp,X)))}}rt.jump&&$&&z<=0&&U==="ACTIVE"&&(z=it.jumpCooldown,g.applyImpulse(new S(0,it.jumpImpulse,0)),p.applyImpulse(new S(0,it.jumpImpulse*.25,0)),C.ul.applyImpulse(new S(0,-2,1.5)),R.ul.applyImpulse(new S(0,-2,1.5)));{const qt=g.velocity.x,Zt=g.velocity.z,Kt=Math.hypot(qt,Zt),oe=it.maxSpeed*1.3;Kt>oe&&(g.velocity.x=qt/Kt*oe,g.velocity.z=Zt/Kt*oe),z<=0&&g.velocity.y>6.5&&(g.velocity.y=6.5)}}function wt(){let X=!1;for(const rt of c){const dt=rt.position,ut=rt.velocity,Rt=rt.angularVelocity,_t=rt.quaternion;if(!Number.isFinite(dt.x)||!Number.isFinite(dt.y)||!Number.isFinite(dt.z)||!Number.isFinite(ut.x)||!Number.isFinite(ut.y)||!Number.isFinite(ut.z)||!Number.isFinite(Rt.x)||!Number.isFinite(Rt.y)||!Number.isFinite(Rt.z)||!Number.isFinite(_t.x)||!Number.isFinite(_t.y)||!Number.isFinite(_t.z)||!Number.isFinite(_t.w)||dt.y<-25||dt.y>45||Math.abs(dt.x)>400||Math.abs(dt.z)>400){X=!0;break}}if(X){et++,console.warn(`[ragdoll] NaN/이탈 감지 -> 복구 (#${et})`);const rt=new S(Number.isFinite(g.position.x)?g.position.x:0,3,Number.isFinite(g.position.z)?g.position.z:0);return Yt(rt),!0}for(const rt of c){const dt=rt.velocity.length();dt>40&&rt.velocity.scale(40/dt,rt.velocity);const ut=rt.angularVelocity.length();ut>20&&rt.angularVelocity.scale(20/ut,rt.angularVelocity)}return!1}function Yt(X){c.forEach((rt,dt)=>{const ut=L[dt];rt.type=pt.DYNAMIC,rt.position.set(X.x+ut.x,X.y+ut.y,X.z+ut.z),rt.velocity.setZero(),rt.angularVelocity.setZero(),rt.quaternion.set(0,0,0,1),rt.force.setZero(),rt.torque.setZero(),rt.updateMassProperties(),rt.wakeUp()}),U="ACTIVE",F=0,N=0,G=0,_e=1,J=0}return{parts:a,bodies:c,constraints:l,group:u,pelvis:g,torso:p,handL:T.hand,handR:b.hand,get state(){return U},get grounded(){return $},get swingPhase(){return q},get aimX(){return kt},get aimZ(){return O},get intentX(){return bt},get intentZ(){return It},control:mt,sync(){for(const X of a.values())X.mesh.position.set(X.body.position.x,X.body.position.y,X.body.position.z),X.mesh.quaternion.set(X.body.quaternion.x,X.body.quaternion.y,X.body.quaternion.z,X.body.quaternion.w)},knockdown:Xt,setNetState(X){U=X},setHeld(X,rt=[]){At=X.length,j.clear(),st=0;for(const dt of X)j.add(dt),st+=dt.mass;rt.length===0&&(ot=0),gt=rt},reset:Yt,guard:wt,dispose(X,rt){for(const dt of l)X.removeConstraint(dt);for(const dt of c)X.removeBody(dt);rt.remove(u),u.traverse(dt=>{const ut=dt;if(!ut.isMesh)return;ut.geometry.dispose();const Rt=ut.material;if(Array.isArray(Rt))for(const _t of Rt)_t.dispose();else Rt.dispose()})}}}function bl(s){const t=s.shapes[0];if(t instanceof an)return t.halfExtents;if(t instanceof ui){const n=t.radius;return new S(n,n,n)}const e=s.boundingRadius||.5;return new S(e,e,e)}function pS(s,t){const e=s.quaternion.clone().conjugate().vmult(t.vsub(s.position)),n=s.shapes[0];if(n instanceof ui){const o=e.length();return o<1e-6?new S(0,n.radius,0):e.scale(n.radius/o)}const i=bl(s);return new S(Math.max(-i.x,Math.min(i.x,e.x)),Math.max(-i.y,Math.min(i.y,e.y)),Math.max(-i.z,Math.min(i.z,e.z)))}function Sc(s,t,e){const n=s.shapes[0];if(n instanceof ui)return n.radius;if(!(n instanceof an))return 0;const i=n.halfExtents;let o=0;const r=new S;for(const[a,c]of[[new S(1,0,0),i.x],[new S(0,1,0),i.y],[new S(0,0,1),i.z]])s.quaternion.vmult(a,r),o+=Math.abs(r.x*t+r.z*e)*c;return o}function mS(s){const t=s.shapes[0];if(t instanceof ui)return t.radius;if(!(t instanceof an))return 0;const e=t.halfExtents;let n=0;const i=new S;for(const[o,r]of[[new S(1,0,0),e.x],[new S(0,1,0),e.y],[new S(0,0,1),e.z]])s.quaternion.vmult(o,i),n+=Math.abs(i.y)*r;return n}function gS(s,t,e){if(e.length===0)return;const n=Math.abs(s.gravity.y),i=t.mass*n;let o=0,r=0,a=0,c=0,l=0;for(const T of e){const b=Math.min(1,T.ramp/it.carryRamp);o+=it.carryLiftStrength*b,r+=it.carryPushStrength*b;const E=new S(0,0,1);T.rag.torso.quaternion.vmult(E,E);const C=Math.hypot(E.x,E.z)||1,R=E.x/C,_=E.z/C;a+=T.rag.torso.position.x+R*(it.carryDist+Sc(t,R,_)),c+=T.rag.torso.position.y+it.carryHeight,l+=T.rag.torso.position.z+_*(it.carryDist+Sc(t,R,_))}const u=e.length;a/=u,c/=u,l/=u;const f=i<=o;let h=0;f&&(h=i+(c-t.position.y)*it.carryKp*t.mass-t.velocity.y*it.carryKd*t.mass,h=Math.max(-o,Math.min(o,h)));let d,g;if(f)d=(a-t.position.x)*it.carryKp*t.mass-t.velocity.x*it.carryKd*t.mass,g=(l-t.position.z)*it.carryKp*t.mass-t.velocity.z*it.carryKd*t.mass;else{let T=0,b=0;for(const _ of e)T+=_.rag.intentX,b+=_.rag.intentZ;const E=Math.hypot(T,b);let C=0,R=0;for(const _ of e){const w=t.position.x-_.rag.torso.position.x,L=t.position.z-_.rag.torso.position.z,I=Math.hypot(w,L);if(I<1e-4)continue;const U=w/I,F=L/I,N=I-(it.pushHoldDist+Sc(t,U,F));if(N<=0)continue;const G=Math.min(it.pushCatchMax,N*it.pushCatchGain);C-=U*G,R-=F*G}if(C/=e.length,R/=e.length,E>.01){const _=T/E*it.maxSpeed*it.pushSpeedFactor+C,w=b/E*it.maxSpeed*it.pushSpeedFactor+R;d=(_-t.velocity.x)*it.pushVelGain*t.mass,g=(w-t.velocity.z)*it.pushVelGain*t.mass}else C!==0||R!==0?(d=(C-t.velocity.x)*it.pushVelGain*t.mass,g=(R-t.velocity.z)*it.pushVelGain*t.mass):(d=-t.velocity.x*it.pushVelGain*t.mass*.5,g=-t.velocity.z*it.pushVelGain*t.mass*.5)}const y=Math.hypot(d,g);if(y>r){const T=r/y;d*=T,g*=T}if(f)t.applyForce(new S(d,h,g));else{const T=new S(0,-mS(t)*it.pushLowRatio,0);t.applyForce(new S(d,0,g),T)}const p=1/e.length;for(const T of e)if(T.rag.pelvis.applyForce(new S(-d*p,-h*p,-g*p)),!f){const b=T.rag.pelvis.position.y-it.rideHeight;if(b>0){const E=Math.min(it.antiHangMax,b*it.antiHangK)+Math.max(0,T.rag.pelvis.velocity.y)*it.antiHangDamp;T.rag.pelvis.applyForce(new S(0,-E,0))}}const m=new S(0,1,0);t.quaternion.vmult(m,m);const x=Math.max(t.inertia.x,t.inertia.z),v=it.carryUprightAccel*e.length,M=it.carryUprightDampRate*e.length;t.torque.x+=x*(-m.z*v-t.angularVelocity.x*M),t.torque.z+=x*(m.x*v-t.angularVelocity.z*M)}function vS(s,t){return Math.min(it.holdForceMax,Math.max(it.holdForceMin,s.mass*t*it.holdForceScale))}class xS{constructor(){In(this,"ws",null);In(this,"id",null);In(this,"hostId",null);In(this,"peers",new Set);In(this,"ping",0);In(this,"room",null);In(this,"offline",!1);In(this,"picks",{});In(this,"myPreset",0);In(this,"handlers",[]);In(this,"pingTimer",null)}connect(t){this.close();const e=new WebSocket(t);this.ws=e,this.offline=!1,e.onopen=()=>{this.pingTimer=window.setInterval(()=>{this.send({type:"ping",t:performance.now()})},1e3)},e.onmessage=n=>{let i;try{i=JSON.parse(n.data)}catch{return}if(i.type==="pong"){this.ping=Math.round(performance.now()-i.t);return}if(i.type==="welcome"){this.id=i.id,this.hostId=i.hostId,this.room=i.room,this.picks=i.picks??{},this.peers.clear();for(const o of i.players)this.peers.add(o)}i.type==="picks"&&(this.picks=i.picks,this.id!==null&&this.picks[this.id]!==void 0&&(this.myPreset=this.picks[this.id])),i.type==="host"&&(this.hostId=i.hostId),i.type==="playerJoined"&&this.peers.add(i.id),i.type==="playerLeft"&&this.peers.delete(i.id);for(const o of this.handlers)o(i)},e.onclose=()=>{this.pingTimer!==null&&(window.clearInterval(this.pingTimer),this.pingTimer=null),this.ws===e&&(this.ws=null)}}goOffline(t=0){this.close(),this.offline=!0,this.id=t,this.hostId=t,this.room=null,this.peers.clear(),this.picks={[t]:this.myPreset}}presetOf(t){const e=this.picks[t];return e===void 0?null:e}close(){if(this.pingTimer!==null&&(window.clearInterval(this.pingTimer),this.pingTimer=null),this.ws){const t=this.ws;this.ws=null,t.onopen=t.onmessage=t.onclose=null,(t.readyState===WebSocket.OPEN||t.readyState===WebSocket.CONNECTING)&&t.close()}}get isHost(){return this.id!==null&&this.id===this.hostId}get controlledId(){if(this.id===null)return null;const t=[...this.peers][0];return t!==void 0?t:this.id}get statusText(){if(this.offline)return"SOLO";if(!this.ws)return"CLOSED";switch(this.ws.readyState){case WebSocket.CONNECTING:return"CONNECTING";case WebSocket.OPEN:return"OPEN";case WebSocket.CLOSING:return"CLOSING";default:return"CLOSED"}}on(t){this.handlers.push(t)}send(t){this.ws&&this.ws.readyState===WebSocket.OPEN&&this.ws.send(JSON.stringify(t))}}const Ii=[{name:"블루베리",shirt:5217791,pants:3621201,shoes:16777215,skin:16767416,eye:2042436},{name:"딸기우유",shirt:16752331,pants:9060178,shoes:16777215,skin:16769732,eye:4861789},{name:"라임소다",shirt:9363562,pants:3112296,shoes:2830136,skin:15774084,eye:3104058},{name:"귤",shirt:16747069,pants:9190186,shoes:15783503,skin:16236693,eye:3811874},{name:"포도",shirt:12160255,pants:5978746,shoes:9133302,skin:14260844,eye:4861789},{name:"민트초코",shirt:6281380,pants:4869980,shoes:7031343,skin:9263674,eye:1119516},{name:"레몬",shirt:16769126,pants:5663535,shoes:4165455,skin:16767416,eye:3811874},{name:"체리콕",shirt:15753082,pants:2908042,shoes:14236475,skin:12089934,eye:2042436}];function pf(s){return(s+1)*3%Ii.length}function _S(s){const t=Ii[(s%Ii.length+Ii.length)%Ii.length];return{skin:t.skin,shirt:t.shirt,pants:t.pants,shoes:t.shoes,eye:t.eye}}const Vh=`ws://${location.hostname}:8080`,we=s=>document.getElementById(s),Wh={noRoom:"그런 방이 없다. 코드를 다시 확인해라.",full:"방이 가득 찼다 (최대 4명).",badCode:"코드는 영문/숫자 4자리다."};function yS(s,t){const e=we("menu"),n={title:we("panel-title"),pick:we("panel-pick"),mode:we("panel-mode"),create:we("panel-create"),join:we("panel-join"),lobby:we("panel-lobby")},i=we("join-code"),o=we("join-error"),r=we("lobby-code"),a=we("lobby-players"),c=we("lobby-hint"),l=we("btn-start-game"),u=we("pick-grid"),f=we("pick-hint");let h=!1,d="single";function g(E){for(const[C,R]of Object.entries(n))R.hidden=C!==E;e.hidden=!1,E==="join"&&(o.textContent="",i.focus())}function y(){e.hidden=!0}const p=E=>"#"+E.toString(16).padStart(6,"0");function m(){const E=s.myPreset,C=new Map;for(const[R,_]of Object.entries(s.picks)){const w=Number(R);w!==s.id&&C.set(_,w)}u.innerHTML=Ii.map((R,_)=>{const w=C.get(_),L=["pick-card"];return _===E&&w===void 0&&L.push("selected"),w!==void 0&&L.push("taken"),`<div class="${L.join(" ")}" data-i="${_}" role="button" tabindex="0">
        <div class="doll">
          <i class="head" style="background:${p(R.skin)}"></i>
          <i class="eye eyeL" style="background:${p(R.eye??0)}"></i>
          <i class="eye eyeR" style="background:${p(R.eye??0)}"></i>
          <i class="arm armL" style="background:${p(R.shirt)}"></i>
          <i class="arm armR" style="background:${p(R.shirt)}"></i>
          <i class="body" style="background:${p(R.shirt)}"></i>
          <i class="leg legL" style="background:${p(R.pants)}"></i>
          <i class="leg legR" style="background:${p(R.pants)}"></i>
          <i class="foot footL" style="background:${p(R.shoes??3355443)}"></i>
          <i class="foot footR" style="background:${p(R.shoes??3355443)}"></i>
        </div>
        <div class="pick-name">${R.name}</div>
        <div class="pick-by">${w!==void 0?`P${v(w)} 사용중`:""}</div>
      </div>`}).join(""),f.textContent=d==="lobby"?"회색으로 흐린 캐릭터는 같은 방의 다른 사람이 쓰는 중이다.":d==="multi"?"먼저 캐릭터를 고른다. 방에서 겹치면 자동으로 다른 걸로 바꿔준다.":"마음에 드는 캐릭터를 골라라."}u.addEventListener("click",E=>{const C=E.target.closest(".pick-card");!C||C.classList.contains("taken")||(s.myPreset=Number(C.dataset.i),s.offline||s.send({type:"pick",preset:s.myPreset}),m())});function x(){return[s.id,...s.peers].filter(E=>E!==null).sort((E,C)=>E-C)}function v(E){const C=x().indexOf(E);return C>=0?C+1:E}function M(){r.textContent=s.room??"----";const E=x();a.innerHTML=E.map((C,R)=>{const _=C===s.id?" (나)":"",w=C===s.hostId?" · 방장":"",L=s.presetOf(C)??pf(C);return`<li>P${R+1}${_}${w} — ${Ii[L%Ii.length].name}</li>`}).join(""),l.hidden=!s.isHost,c.textContent=s.isHost?E.length<2?"혼자서도 시작할 수 있다. 친구에게 위 코드를 알려줘라.":"모두 모였으면 시작해라.":"방장이 시작하기를 기다리는 중…"}s.on(E=>{switch(E.type){case"joinError":g("join"),o.textContent=Wh[E.reason]??"방에 들어가지 못했다.";break;case"welcome":s.send({type:"pick",preset:s.myPreset}),M(),g("lobby");break;case"picks":{if(s.id!==null&&E.picks[s.id]===void 0){const C=new Set(Object.values(E.picks)),R=Ii.findIndex((_,w)=>!C.has(w));R>=0&&(s.myPreset=R,s.send({type:"pick",preset:R}))}h||(m(),M());break}case"playerJoined":case"playerLeft":case"host":h||M();break;case"gameStart":if(h)break;h=!0,y(),t.onStart("multi");break}});function T(){h||(h=!0,s.goOffline(0),y(),t.onStart("single"))}we("btn-single").addEventListener("click",()=>{d="single",m(),g("pick")}),we("btn-multi").addEventListener("click",()=>{d="multi",m(),g("pick")}),we("btn-pick-ok").addEventListener("click",()=>{d==="single"?T():d==="lobby"?(M(),g("lobby")):g("mode")}),we("btn-pick-back").addEventListener("click",()=>{d==="lobby"?(M(),g("lobby")):g("title")}),we("btn-change-char").addEventListener("click",()=>{d="lobby",m(),g("pick")}),we("btn-back-title").addEventListener("click",()=>g("title")),we("btn-create-room").addEventListener("click",()=>{g("create"),s.connect(`${Vh}/?create=1`)}),we("btn-join-room").addEventListener("click",()=>g("join"));for(const E of["btn-back-mode","btn-back-mode2","btn-leave-lobby"])we(E).addEventListener("click",()=>{s.close(),l.disabled=!1,g("mode")});function b(){const E=i.value.trim().toUpperCase();if(E.length!==4){o.textContent=Wh.badCode;return}o.textContent="들어가는 중…",s.connect(`${Vh}/?room=${encodeURIComponent(E)}`)}we("btn-join-go").addEventListener("click",b),i.addEventListener("keydown",E=>{E.key==="Enter"&&b()}),i.addEventListener("input",()=>{i.value=i.value.toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,4)}),l.addEventListener("click",()=>{s.isHost&&(l.disabled=!0,s.send({type:"startGame"}))}),r.addEventListener("click",()=>{var C;const E=s.room;E&&((C=navigator.clipboard)==null||C.writeText(E))}),g("title")}ri[0].targetId;ri[0].targetName;ri[0].timeLimit;const qh=3,Js=4054148,wc=16765503;function MS(s){const t=s.charCodeAt(s.length-1),e=t>=44032&&t<=55203&&(t-44032)%28!==0;return s+(e?"을":"를")}function Xh(s){const t=Math.max(0,Math.ceil(s));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function Ec(s){const t=new hn({color:s});return t.depthTest=!1,t.depthWrite=!1,t.toneMapped=!1,t}function SS(s,t){const{scene:e}=s;let n=null,i=null,o=null,r,a,c,l,u=0,f=0,h=1.6,d=4,g=null,y=!1,p=null,m=ri[0].timeLimit,x=!0;function v(nt){nt.traverse(bt=>{const It=bt;if(!It.isMesh)return;It.geometry.dispose();const kt=It.material;if(Array.isArray(kt))for(const O of kt)O.dispose();else kt.dispose()})}function M(){n&&(e.remove(n),v(n),n=null),o&&(e.remove(o),v(o),o=null),i&&(i.removeFromParent(),v(i),i=null)}function T(){M();const nt=s.map;u=nt.goal.x,f=nt.goal.z,h=nt.goal.radius,d=nt.goal.halfWidth??nt.goal.radius*2.4,g=null,y=!1,m=nt.timeLimit,x=nt.judge!==!1,E.hidden=!x;const bt=s.objectById.get(nt.targetId)??null;p=(bt==null?void 0:bt.body)??null;const It=new dn;It.position.set(u,0,f),It.visible=x,e.add(It),n=It,a=new Nt(new eu(h,48),new hn({color:Js,transparent:!0,opacity:.18,depthWrite:!1,toneMapped:!1})),a.rotation.x=-Math.PI/2,a.position.y=.015,It.add(a),r=new Nt(new _o(h-.22,h,64),new hn({color:Js,transparent:!0,opacity:.85,depthWrite:!1,toneMapped:!1})),r.rotation.x=-Math.PI/2,r.position.y=.02,It.add(r),c=new dn,c.rotation.x=-Math.PI/2,c.position.y=.03;for(let Ct=0;Ct<6;Ct++)c.add(new Nt(new _o(h+.08,h+.3,8,1,Ct/6*Math.PI*2,.55),new hn({color:Js,transparent:!0,opacity:.7,depthWrite:!1,toneMapped:!1})));It.add(c);const kt=new Nt(new xo(h*.92,h,2.8,32,1,!0),new hn({color:Js,transparent:!0,opacity:.1,side:zn,depthWrite:!1,toneMapped:!1}));kt.position.y=1.4,It.add(kt);const O=new ss({color:3123306,roughness:.5}),_e=h*1.45,Xt=2.6;for(const Ct of[-1,1]){const te=new Nt(new li(.26,Xt,.26),O);te.position.set(0,Xt/2,Ct*_e),te.castShadow=!0,It.add(te)}const $t=new Nt(new li(.26,.26,_e*2+.26),O);if($t.position.set(0,Xt+.13,0),$t.castShadow=!0,It.add($t),l=new Nt(new iu(.34),Ec(Js)),l.position.set(u,3.5,f),l.renderOrder=998,e.add(l),n.add(l),l.position.set(0,3.5,0),o=new dn,o.visible=!1,o.renderOrder=999,e.add(o),bt){const Ct=bl(bt.body);i=new Nt(new li(Ct.x*2,Ct.y*2,Ct.z*2),new hn({color:wc,side:en,toneMapped:!1})),i.scale.setScalar(1.05),bt.mesh.add(i);const te=new Nt(new xo(.09,.09,.42,12),Ec(wc));te.position.y=.42;const Ot=new Nt(new Ea(.26,.42,14),Ec(wc));Ot.rotation.z=Math.PI,o.add(te,Ot);for(const D of o.children)D.renderOrder=999;o.visible=!0}b.textContent=bt?x?`[${s.mapIndex+1}/${s.mapCount}] ${nt.name} — ${MS(nt.targetName)} 출구까지`:`${nt.name} — ${nt.blurb}`:`목표 오브젝트(id ${nt.targetId})를 찾을 수 없다`}const b=document.getElementById("goal-text"),E=document.getElementById("timer"),C=document.getElementById("goal-dist"),R=document.getElementById("result"),_=document.getElementById("result-title"),w=document.getElementById("result-sub"),L=document.getElementById("retry"),I=document.getElementById("next-map");R.hidden=!0;let U="playing",F=ri[0].timeLimit,N=0,G=0,z="playing",q=0,$=!1;T(),F=m,s.onMapLoaded(()=>{T(),U="playing",F=m,N=0});function et(){var It;if(!p)return!1;const nt=p.position.z,bt=g;return g=nt,!(bt===null||!(bt>f&&nt<=f)||Math.abs(p.position.x-u)>d||p.position.y>qh||(It=t.isBallCarried)!=null&&It.call(t))}function J(){if(!p||p.position.y>qh)return!1;const nt=p.position.x-u,bt=p.position.z-f;return Math.hypot(nt,bt)<=h}function At(nt){var bt,It;if(x&&t.isAuthority()&&U==="playing"){if(F-=nt,F<=0){F=0,U="fail",(bt=t.onFail)==null||bt.call(t);return}et()&&(y=!0),y&&(y=!1,U="success",N=F,(It=t.onGoal)==null||It.call(t))}}const j=nt=>nt.replace(/^\d+\.\s*/,"");function st(){const nt=U==="success",bt=s.mapIndex>=s.mapCount-1,It=s.mapIndex+1;nt&&bt&&($=!0),_.textContent=$?"전체 클리어!":nt?"성공!":"실패!",_.style.color=nt?"#5ef2a0":"#ff8080";const kt=bt?null:j(ri[s.mapIndex+1].name);w.textContent=$?`STAGE 1~${s.mapCount} 전부 통과했다. 수고했다!`:nt?`STAGE ${It} 「${j(s.map.name)}」 클리어 — 남은 시간 ${Xh(N)}`+(kt?` · 다음은 「${kt}」`:""):`STAGE ${It} 「${j(s.map.name)}」 — 시간 초과`+(p?` · 골까지 ${Math.hypot(p.position.x-u,p.position.z-f).toFixed(0)}m 남았다`:""),I&&(I.hidden=!(nt&&!bt)),L.textContent=$?"처음부터":"다시하기",R.hidden=!1,document.pointerLockElement&&document.exitPointerLock()}function gt(nt){G+=nt,c.rotation.z+=nt*.6;const bt=1+Math.sin(G*2.4)*.04;if(r.scale.set(bt,bt,1),l.position.y=3.5+Math.sin(G*2)*.16,l.rotation.y+=nt*1.2,p&&i&&o){i.scale.setScalar(1.04+Math.sin(G*3.2)*.012);const O=bl(p).y;o.position.set(p.position.x,p.position.y+O+.55+Math.sin(G*2.6)*.12,p.position.z),o.rotation.y+=nt*1.5}const kt=U==="success"||J()?16777215:Js;if(r.material.color.setHex(kt),a.material.color.setHex(kt),E.textContent=Xh(F),E.classList.toggle("urgent",U==="playing"&&F<=30),p){const O=Math.hypot(p.position.x-u,p.position.z-f);C.textContent=x?`출구까지 ${O.toFixed(1)}m`:`코스 끝까지 ${O.toFixed(0)}m`}(U!==z||U!=="playing"&&s.mapIndex!==q)&&(z=U,q=s.mapIndex,U==="playing"?R.hidden=!0:st())}function ot(){if($){$=!1,L.textContent="다시하기",s.loadMap(0),t.resetWorld();return}t.resetWorld(),U="playing",F=m,N=0}function vt(){s.mapIndex>=s.mapCount-1||(s.loadMap(s.mapIndex+1),t.resetWorld())}return L.addEventListener("click",nt=>{nt.preventDefault(),t.isAuthority()?ot():t.requestRestartRemote()}),I==null||I.addEventListener("click",nt=>{var bt;nt.preventDefault(),t.isAuthority()?vt():(bt=t.requestNextMapRemote)==null||bt.call(t)}),{get phase(){return U},update:At,render:gt,restart:ot,nextMap:vt,snapshot(){return{phase:U,t:Math.round(F*10)/10,m:s.mapIndex}},applyRemote(nt){t.isAuthority()||(nt.m!==void 0&&nt.m!==s.mapIndex&&s.loadMap(nt.m),nt.phase==="success"&&U!=="success"&&(N=nt.t),U=nt.phase,F=nt.t)}}}function mf(s){const t=Math.sin(s),e=Math.cos(s);return{fx:t,fz:e,rx:-e,rz:t}}const wS=-.15,ES=.85,Yh=.0022,Or=50,bc=(s,t,e)=>Math.max(t,Math.min(e,s));function gf(s,t,e){const n=bc(t,-Or,Or),i=bc(e,-Or,Or);return{yaw:s.yaw-n*Yh,pitch:bc(s.pitch+i*Yh,wS,ES)}}function bS(s){return 1<<(s>=0?s%10:10+(-s-1)%4)+1}function TS(s){return 65535&~s}const lt={radius:.3,mass:1.1,range:2.6,fade:.25,touchAhead:1.7,touchSide:1.6,touchIntervalSlow:.13,touchIntervalFast:.22,touchSpeed:1,ahead:1.2,leadBase:.62,leadPerSpeed:.22,pushOut:1.8,minAhead:.34,unstickSpeed:2.1,behindLimit:-.4,touchMax:6,touchBrake:2,turnBite:.45,turnBoost:.8,turnAlign:.72,turnResetDot:.93,turnReachAhead:1.25,turnReachSide:1.55,turnRateFull:6,turnSmooth:.13,turnBehind:-1.35,guideAccel:5.5,guideDamp:2,trapRange:1.8,trapMaxSpeed:6.5,trapMax:2.5,kickRange:1.85,chargeTime:.55,kickForwardMin:6.5,kickForwardMax:15.5,kickUpMin:1.6,kickUpMax:4.4,kickCooldown:.55,rushRange:14,rushTime:.45,rushImpulse:26,rushAccel:45,rushReach:2.2,rushTouchKeep:.25,rushCooldown:1.2,rushSteer:.22,kickLockout:.5,kickRecoil:6,scoopRange:2.8,scoopTime:.55,scoopAccel:30,scoopAhead:.45,scoopHeight:.05,carryDrag:150,trickCooldown:.8,trickBallUp:4.2,trickBallSide:3.2,trickBallKeep:1,trickLockout:.45,trickSettleTime:.85,trickSettleDamp:3.4,trickSettleFwdDamp:.7,trickBodySide:30,trickDash:.42,trickDashForward:.85,trickBodyUp:16,trickTorque:34,trickRange:2.1,stopCooldown:1,stopRange:2.2,stopBallKeep:.12,stopBallPull:2.2,stopBrake:1.35,stopDash:.38,stopLockout:.22};function AS(){const s=new Map;function t(R){let _=s.get(R);return _||(_={trickTimer:0,lockout:0,pokeTimer:0,kickTimer:0,scoopTimer:0,dashTimer:0,dashX:0,dashZ:0,lastTrick:0,stopTimer:0,settleTimer:0,settleRefX:0,settleRefZ:0,lastDirX:0,lastDirZ:0,turnRate:0,rushTimer:0,rushX:0,rushZ:0,rushCd:0,touch:null,lastTrickInfo:null},s.set(R,_)),_}function e(R){const _=R.intentX,w=R.intentZ;return Math.hypot(_,w)>.01?{x:_,z:w}:n(R)}function n(R){const _=R.aimX,w=R.aimZ;if(Math.hypot(_,w)>.01)return{x:_,z:w};const L=new S(0,0,1);R.torso.quaternion.vmult(L,L);const I=Math.hypot(L.x,L.z)||1;return{x:L.x/I,z:L.z/I}}const i=R=>Math.hypot(R.intentX,R.intentZ)>.01;function o(R,_,w,L){if(L||R.state!=="ACTIVE")return;const I=t(R);if(I.settleTimer>0){const mt=_.velocity,wt=I.settleRefX,Yt=I.settleRefZ,ft=mt.x*wt+mt.z*Yt,X=wt*ft,rt=Yt*ft,dt=mt.x-X,ut=mt.z-rt,Rt=_.mass;_.applyForce(new S(-(X*lt.trickSettleFwdDamp+dt*lt.trickSettleDamp)*Rt,0,-(rt*lt.trickSettleFwdDamp+ut*lt.trickSettleDamp)*Rt)),_.wakeUp()}if(I.lockout>0||I.scoopTimer>0||_.position.y>lt.radius*2.2)return;const U=R.pelvis.position,F=_.position.x-U.x,N=_.position.z-U.z,G=Math.hypot(F,N);if(G>lt.range)return;const z=R.pelvis.velocity,q=_.velocity.x,$=_.velocity.z,et=Math.hypot(q,$);if(!i(R)){if(G<lt.trapRange&&et>.15&&et<lt.trapMaxSpeed&&I.pokeTimer<=0){const mt=Math.min(lt.trapMax,et*_.mass);_.applyImpulse(new S(-q/et*mt,0,-$/et*mt),new S(0,lt.radius,0)),I.pokeTimer=lt.touchIntervalSlow,I.touch={x:_.position.x,y:lt.radius*.5,z:_.position.z,strength:Math.min(1,mt/lt.trapMax)*.6},_.wakeUp()}return}const J=e(R),At=Math.hypot(z.x,z.z),j=lt.leadBase+At*lt.leadPerSpeed,st=lt.range*(1-lt.fade),gt=G<=st?1:Math.max(0,(lt.range-G)/(lt.range-st));{const mt=F*J.z-N*J.x;let wt=-J.z*mt*lt.guideAccel,Yt=J.x*mt*lt.guideAccel;const ft=(_.velocity.x-z.x)*J.z-(_.velocity.z-z.z)*J.x;wt+=-J.z*ft*lt.guideDamp,Yt+=J.x*ft*lt.guideDamp;const X=Math.hypot(wt,Yt),rt=lt.guideAccel*gt;X>rt&&X>0&&(wt=wt/X*rt,Yt=Yt/X*rt),_.applyForce(new S(wt*_.mass,0,Yt*_.mass))}const ot=F*J.x+N*J.z,vt=I.lastDirX!==0||I.lastDirZ!==0,nt=vt?Math.max(-1,Math.min(1,J.x*I.lastDirX+J.z*I.lastDirZ)):1,bt=vt?nt<lt.turnResetDot:!1,It=Math.acos(nt)/Math.max(1e-4,w),kt=1-Math.exp(-w/lt.turnSmooth);I.turnRate+=(It-I.turnRate)*kt;const O=Math.min(1,I.turnRate/lt.turnRateFull);I.lastDirX=J.x,I.lastDirZ=J.z;const _e=I.rushTimer>0?lt.rushReach:1,Xt=lt.touchAhead*(1+(lt.turnReachAhead-1)*O)*_e,$t=lt.touchSide*(1+(lt.turnReachSide-1)*O)*_e,Ct=lt.behindLimit+(lt.turnBehind-lt.behindLimit)*O;if(ot<Ct||ot>Xt){_.wakeUp();return}if(Math.abs(F*J.z-N*J.x)>$t){_.wakeUp();return}const te=ot<lt.minAhead;if(I.pokeTimer>0&&!te&&!bt){_.wakeUp();return}let Ot=At*lt.touchSpeed+Math.max(0,j-ot)*lt.pushOut;const D=I.rushTimer>0&&ot>j;D&&(Ot=At*lt.rushTouchKeep),te&&(Ot=Math.max(Ot,At+lt.unstickSpeed));const A=et>.5?(q*J.x+$*J.z)/et:1;let Y,tt,ht;if(A<lt.turnAlign)Y=(J.x*Ot-q*lt.turnBite)*_.mass,tt=(J.z*Ot-$*lt.turnBite)*_.mass,ht=lt.touchMax*lt.turnBoost;else{const mt=q*J.x+$*J.z,wt=(Ot-mt)*_.mass;Y=J.x*wt,tt=J.z*wt,ht=wt>=0||D?lt.touchMax:lt.touchBrake}const at=Math.hypot(Y,tt);at>ht&&at>0&&(Y=Y/at*ht,tt=tt/at*ht),_.applyImpulse(new S(Y,0,tt));const zt=Math.min(1,At/it.maxSpeed);I.pokeTimer=lt.touchIntervalSlow+(lt.touchIntervalFast-lt.touchIntervalSlow)*zt,I.touch={x:_.position.x-J.x*lt.radius,y:lt.radius*.5,z:_.position.z-J.z*lt.radius,strength:Math.min(1,Math.hypot(Y,tt)/lt.touchMax)},_.wakeUp()}function r(R,_,w,L=0){if(R.state!=="ACTIVE")return null;const I=t(R);if(I.kickTimer>0||w)return null;const U=R.pelvis.position,F=_.position.x-U.x,N=_.position.z-U.z;if(Math.hypot(F,N)>lt.kickRange)return null;const G=Math.max(0,Math.min(1,L)),z=lt.kickForwardMin+(lt.kickForwardMax-lt.kickForwardMin)*G,q=lt.kickUpMin+(lt.kickUpMax-lt.kickUpMin)*G,$=n(R);_.applyImpulse(new S($.x*z,q,$.z*z));const et=lt.kickRecoil*(.5+G*.5);return R.pelvis.applyImpulse(new S(-$.x*et,0,-$.z*et)),_.wakeUp(),I.kickTimer=lt.kickCooldown,I.lockout=Math.max(I.lockout,lt.kickLockout),{x:_.position.x,y:.02,z:_.position.z,power:G}}function a(R){return Math.max(0,t(R).kickTimer/lt.kickCooldown)}function c(R){const _=t(R),w=_.lastTrickInfo;return _.lastTrickInfo=null,w}function l(R){const _=t(R),w=_.touch;return _.touch=null,w}function u(R,_){if(R.state!=="ACTIVE")return!1;const w=R.pelvis.position;return Math.hypot(_.position.x-w.x,_.position.z-w.z)>lt.scoopRange?!1:(t(R).scoopTimer=lt.scoopTime,!0)}function f(R){return t(R).scoopTimer>0}function h(R,_){const w=new S(0,0,1);R.torso.quaternion.vmult(w,w);const L=Math.hypot(w.x,w.z)||1,I=R.torso.position.x+w.x/L*lt.scoopAhead,U=R.torso.position.y+lt.scoopHeight,F=R.torso.position.z+w.z/L*lt.scoopAhead,N=Math.abs(-18);let G=(I-_.position.x)*34-_.velocity.x*6,z=(U-_.position.y)*34-_.velocity.y*6+N,q=(F-_.position.z)*34-_.velocity.z*6;const $=Math.hypot(G,z,q);if($>lt.scoopAccel){const et=lt.scoopAccel/$;G*=et,z*=et,q*=et}_.applyForce(new S(G*_.mass,z*_.mass,q*_.mass)),_.wakeUp()}function d(R){const _=R.pelvis.velocity;R.pelvis.applyForce(new S(-_.x*lt.carryDrag,0,-_.z*lt.carryDrag))}function g(R,_,w){const L=t(R);if(L.trickTimer>0||w||R.state!=="ACTIVE"||R.pelvis.position.y>it.rideHeight+.35)return!1;const I=R.pelvis.position;if(Math.hypot(_.position.x-I.x,_.position.z-I.z)>lt.trickRange)return!1;const F=n(R);e(R);const N=-F.z,G=F.x,z=R.intentX*N+R.intentZ*G;let q;Math.abs(z)>.25?q=Math.sign(z):q=(_.position.x-I.x)*N+(_.position.z-I.z)*G>=0?-1:1;const $=-q;{const j=R.pelvis.velocity,st=j.x*F.x+j.z*F.z,gt=F.x*st*lt.trickBallKeep+N*$*lt.trickBallSide,ot=F.z*st*lt.trickBallKeep+G*$*lt.trickBallSide;_.applyImpulse(new S((gt-_.velocity.x)*_.mass,lt.trickBallUp,(ot-_.velocity.z)*_.mass))}_.wakeUp(),R.pelvis.applyImpulse(new S(N*q*lt.trickBodySide,lt.trickBodyUp,G*q*lt.trickBodySide)),R.torso.torque.y+=q*lt.trickTorque,L.trickTimer=lt.trickCooldown,L.lockout=lt.trickLockout,L.settleTimer=lt.trickSettleTime,L.settleRefX=F.x,L.settleRefZ=F.z;const et=N*q+F.x*lt.trickDashForward,J=G*q+F.z*lt.trickDashForward,At=Math.hypot(et,J)||1;return L.dashTimer=lt.trickDash,L.dashX=et/At,L.dashZ=J/At,L.lastTrick=performance.now(),L.lastTrickInfo={x:I.x,z:I.z,dodgeX:N*q,dodgeZ:G*q,ballX:N*$,ballZ:G*$},!0}function y(R,_,w){const L=t(R);if(L.stopTimer>0||w||R.state!=="ACTIVE"||R.pelvis.position.y>it.rideHeight+.35)return!1;const I=R.pelvis.position;if(Math.hypot(_.position.x-I.x,_.position.z-I.z)>lt.stopRange)return!1;const F=_.velocity;_.applyImpulse(new S(-F.x*(1-lt.stopBallKeep)*_.mass,0,-F.z*(1-lt.stopBallKeep)*_.mass),new S(0,lt.radius,0));const N=I.x-_.position.x,G=I.z-_.position.z,z=Math.hypot(N,G)||1;_.applyImpulse(new S(N/z*lt.stopBallPull,0,G/z*lt.stopBallPull)),_.wakeUp();const q=R.pelvis.velocity,$=Math.hypot(q.x,q.z);for(const J of[R.pelvis,R.torso]){const At=J.velocity;J.applyImpulse(new S(-At.x*lt.stopBrake*J.mass,0,-At.z*lt.stopBrake*J.mass))}const et=$>.3?{x:-q.x/$,z:-q.z/$}:e(R);return L.dashTimer=lt.stopDash,L.dashX=$>.3?et.x:-et.x,L.dashZ=$>.3?et.z:-et.z,L.stopTimer=lt.stopCooldown,L.lockout=Math.max(L.lockout,lt.stopLockout),L.lastTrickInfo={x:I.x,z:I.z,dodgeX:L.dashX,dodgeZ:L.dashZ,ballX:0,ballZ:0},!0}function p(R){return Math.max(0,t(R).stopTimer/lt.stopCooldown)}function m(R,_){const w=t(R);if(w.trickTimer=Math.max(0,w.trickTimer-_),w.stopTimer=Math.max(0,w.stopTimer-_),w.settleTimer=Math.max(0,w.settleTimer-_),w.lockout=Math.max(0,w.lockout-_),w.pokeTimer=Math.max(0,w.pokeTimer-_),w.kickTimer=Math.max(0,w.kickTimer-_),w.scoopTimer=Math.max(0,w.scoopTimer-_),w.dashTimer=Math.max(0,w.dashTimer-_),w.rushCd=Math.max(0,w.rushCd-_),w.rushTimer>0)if(w.rushTimer=Math.max(0,w.rushTimer-_),R.state!=="ACTIVE")w.rushTimer=0;else for(const L of R.bodies)L.applyForce(new S(w.rushX*lt.rushAccel*L.mass,0,w.rushZ*lt.rushAccel*L.mass))}function x(R,_,w){if(w||R.state!=="ACTIVE")return null;const L=t(R);if(L.rushCd>0||L.rushTimer>0)return null;const I=R.pelvis.position,U=Math.hypot(_.position.x-I.x,_.position.z-I.z);if(U<=lt.kickRange||U>lt.rushRange)return null;const F=e(R);L.rushTimer=lt.rushTime,L.rushX=F.x,L.rushZ=F.z,L.rushCd=lt.rushCooldown;const N=R.bodies.reduce((G,z)=>G+z.mass,0)||1;for(const G of R.bodies){const z=lt.rushImpulse*G.mass/N;G.applyImpulse(new S(F.x*z,0,F.z*z))}return{x:F.x,z:F.z}}function v(R){return t(R).rushTimer>0}function M(R){const _=t(R);return _.rushTimer<=0?null:{x:_.rushX,z:_.rushZ}}function T(R){return t(R).rushCd}function b(R){const _=t(R);return _.dashTimer<=0?null:{x:_.dashX,z:_.dashZ}}function E(R){s.delete(R)}function C(R){return t(R).trickTimer}return{dribble:o,tryKick:r,kickCooldownOf:a,carryPenalty:d,tryTrick:g,tick:m,forget:E,cooldownOf:C,requestPickup:u,scooping:f,scoopStep:h,dashDir:b,takeTouch:l,takeTrick:c,tryStopTurn:y,stopCooldownOf:p,tryRush:x,rushing:v,rushCooldownOf:T,rushDir:M}}function Br(s,t,e,n){const i=new hn({color:n.color,transparent:!0,depthWrite:!1,toneMapped:!1,side:zn}),o=[];for(let r=0;r<e;r++){const a=i.clone(),c=new Nt(t,a);c.visible=!1,n.flat&&(c.rotation.x=-Math.PI/2),c.renderOrder=997,s.add(c),o.push({mesh:c,mat:a,life:0,maxLife:1,from:1,to:1,alpha:1,vx:0,vy:0,vz:0})}return i.dispose(),o}function CS(s){const t=new dn;t.frustumCulled=!1,s.add(t);const e=new _o(.55,1,20),n=new is(1,10,8),i=Br(t,e,10,{color:16777215,flat:!0}),o=Br(t,n,14,{color:16765503}),r=Br(t,e,8,{color:16777215,flat:!0}),a=Br(t,e,4,{color:10479359,flat:!0}),c=[i,o,r,a];function l(f){let h=f[0];for(const d of f){if(d.life<=0)return d;d.life<h.life&&(h=d)}return h}function u(f,h,d,g,y,p,m,x,v=0,M=0,T=0){f.mesh.position.set(h,d,g),f.life=y,f.maxLife=y,f.from=p,f.to=m,f.alpha=x,f.vx=v,f.vy=M,f.vz=T,f.mesh.scale.setScalar(p),f.mat.opacity=x,f.mesh.visible=!0}return{touch(f,h,d,g){const y=Math.max(.25,Math.min(1,g));u(l(i),f,h+.02,d,.26,.24*y,.9*y,.62*y)},trail(f,h,d){u(l(o),f,h,d,.5,.26,.06,.8)},dash(f,h,d,g){for(let y=0;y<3;y++){const p=.6+y*.35;u(l(r),f-d*.15*y,.04,h-g*.15*y,.42+y*.06,.3,1.25+y*.25,.62,-d*p,0,-g*p)}},kick(f,h,d,g){const y=.6+g*.9;u(l(a),f,h+.02,d,.3,.3,1.9*y,.6)},update(f){for(const h of c)for(const d of h){if(d.life<=0)continue;if(d.life-=f,d.life<=0){d.mesh.visible=!1,d.mat.opacity=0;continue}const g=1-d.life/d.maxLife;d.mesh.scale.setScalar(d.from+(d.to-d.from)*g),d.mat.opacity=d.alpha*(1-g),d.mesh.position.x+=d.vx*f,d.mesh.position.y+=d.vy*f,d.mesh.position.z+=d.vz*f}},dispose(){s.remove(t);for(const f of c)for(const h of f)h.mat.dispose();e.dispose(),n.dispose()}}}const RS={step:{type:"triangle",f0:150,f1:90,dur:.07,gain:.05,noise:.8,attack:.002},touch:{type:"sine",f0:420,f1:260,dur:.07,gain:.1,noise:.25,attack:.002},kick:{type:"sine",f0:220,f1:70,dur:.16,gain:.3,noise:.35,attack:.002},kickCharge:{type:"square",f0:660,f1:880,dur:.06,gain:.07,attack:.004},trick:{type:"triangle",f0:480,f1:1150,dur:.2,gain:.2,attack:.004,harmonic:1.5},pickup:{type:"sine",f0:520,f1:780,dur:.12,gain:.16,attack:.004},drop:{type:"sine",f0:500,f1:300,dur:.1,gain:.13,attack:.004},hit:{type:"sawtooth",f0:180,f1:60,dur:.24,gain:.3,noise:.6,attack:.001},land:{type:"triangle",f0:130,f1:70,dur:.1,gain:.12,noise:.5,attack:.002},botSpawn:{type:"sawtooth",f0:300,f1:120,dur:.45,gain:.22,attack:.02,harmonic:.5},goal:{type:"square",f0:520,f1:1050,dur:.55,gain:.26,attack:.006,harmonic:1.5},fail:{type:"sawtooth",f0:380,f1:110,dur:.7,gain:.24,attack:.01},countdown:{type:"square",f0:700,f1:700,dur:.1,gain:.18,attack:.004},start:{type:"square",f0:900,f1:1300,dur:.3,gain:.24,attack:.004,harmonic:1.5},ui:{type:"sine",f0:660,f1:880,dur:.07,gain:.12,attack:.003}};function PS(){let s=null,t=null,e=null,n=null,i=!1,o=!1,r=0,a=0;const c=new Map,l=new Map,u={step:.12,touch:.05,hit:.12,land:.15,kickCharge:.05};function f(){if(s)return s;try{const v=window.AudioContext??window.webkitAudioContext;if(!v)return null;s=new v,t=s.createGain(),t.gain.value=.9,t.connect(s.destination),e=s.createGain(),e.gain.value=0,e.connect(t)}catch{s=null}return s}let h=null;function d(v){if(h)return h;const M=Math.floor(v.sampleRate*.5);h=v.createBuffer(1,M,v.sampleRate);const T=h.getChannelData(0);for(let b=0;b<M;b++)T[b]=Math.random()*2-1;return h}function g(v,M={}){if(i||!o)return;const T=f();if(!T||!t)return;r++;const b=T.currentTime,E=u[v];if(E!==void 0){const z=l.get(v)??-1e9;if(b-z<E)return;l.set(v,b)}a++;const C=M.vol??1,R=M.rate??1;let _=t;if(M.pan!==void 0&&typeof T.createStereoPanner=="function"){const z=T.createStereoPanner();z.pan.value=Math.max(-1,Math.min(1,M.pan)),z.connect(t),_=z}const w=c.get(v);if(w){const z=T.createBufferSource();z.buffer=w,z.playbackRate.value=R;const q=T.createGain();q.gain.value=C,z.connect(q).connect(_),z.start();return}const L=RS[v],I=L.dur/R,U=T.createGain(),F=L.gain*C,N=L.attack??.005;U.gain.setValueAtTime(1e-4,b),U.gain.exponentialRampToValueAtTime(Math.max(2e-4,F),b+N),U.gain.exponentialRampToValueAtTime(1e-4,b+I),U.connect(_);const G=T.createOscillator();if(G.type=L.type,G.frequency.setValueAtTime(L.f0*R,b),G.frequency.exponentialRampToValueAtTime(Math.max(20,L.f1*R),b+I),G.connect(U),G.start(b),G.stop(b+I+.02),L.harmonic){const z=T.createOscillator();z.type=L.type,z.frequency.setValueAtTime(L.f0*L.harmonic*R,b),z.frequency.exponentialRampToValueAtTime(Math.max(20,L.f1*L.harmonic*R),b+I);const q=T.createGain();q.gain.value=.4,z.connect(q).connect(U),z.start(b),z.stop(b+I+.02)}if(L.noise){const z=T.createBufferSource();z.buffer=d(T);const q=T.createBiquadFilter();q.type="bandpass",q.frequency.value=L.f0*2;const $=T.createGain();$.gain.value=L.noise,z.connect(q).connect($).connect(U),z.start(b),z.stop(b+I+.02)}}const y=[[262,330,392],[294,370,440],[220,277,330],[247,311,392]];let p=0;function m(){const v=f();if(!v||!e||i)return;const M=v.currentTime,T=y[p++%y.length];for(const b of T){const E=v.createOscillator();E.type="triangle",E.frequency.value=b;const C=v.createGain();C.gain.setValueAtTime(1e-4,M),C.gain.exponentialRampToValueAtTime(.05,M+.25),C.gain.exponentialRampToValueAtTime(1e-4,M+1.9),E.connect(C).connect(e),E.start(M),E.stop(M+2)}}function x(v){if(!(!f()||!e))if(v){if(n!==null)return;e.gain.value=1,m(),n=window.setInterval(m,2e3)}else n!==null&&(clearInterval(n),n=null),e.gain.value=0}return{play:g,music:x,unlock(){const v=f();v&&(o=!0,v.state==="suspended"&&v.resume())},status(){return{ctx:s?s.state:"none",unlocked:o,muted:i,played:r,heard:a}},setMuted(v){i=v,t&&(t.gain.value=v?0:.9)},get muted(){return i},async loadSamples(v){const M=f();if(M){for(const[T,b]of Object.entries(v))if(b)try{c.set(T,await M.decodeAudioData(b.slice(0)))}catch{}}},dispose(){n!==null&&clearInterval(n),s&&s.close(),s=null}}}const un={reactionTime:.3,turnRate:3.2,leadTime:.85,stealDist:1.45,stealImpulse:4.6,stealCooldown:2.6,bumpDist:1.35,bumpImpulse:3.4,bumpCooldown:1.1,laneMargin:1.3,hugDist:.55,spawnGrace:1.1};function IS(s){const t=new Map;function e(o){let r=t.get(o);return r||(r={memory:[],dirX:0,dirZ:-1,stealTimer:0,bumpTimer:0,clock:0},t.set(o,r)),r}function n(o){t.delete(o)}function i(o,r,a,c){const l=e(o);l.clock+=a,l.stealTimer=Math.max(0,l.stealTimer-a),l.bumpTimer=Math.max(0,l.bumpTimer-a);const u=[];for(l.memory.push({t:l.clock,x:r.position.x,z:r.position.z,vx:r.velocity.x,vz:r.velocity.z});l.memory.length>2&&l.memory[1].t<=l.clock-un.reactionTime;)l.memory.shift();const f=l.memory[0];if(o.state!=="ACTIVE")return{input:{moveX:0,moveZ:0,jump:!1},brokeCarry:u};const h=o.pelvis.position,d=Math.hypot(f.x-h.x,f.z-h.z),g=Math.min(un.leadTime,d/6),y=s-un.laneMargin,p=Math.max(-y,Math.min(y,f.x+f.vx*g)),m=f.z+f.vz*g;let x=p-h.x,v=m-h.z;const M=Math.hypot(x,v);if(M>.001?(x/=M,v/=M):(x=l.dirX,v=l.dirZ),M<un.hugDist){const L=-v,I=x;x=x*.35+L*.94,v=v*.35+I*.94;const U=Math.hypot(x,v)||1;x/=U,v/=U}const T=Math.atan2(l.dirX,l.dirZ);let E=Math.atan2(x,v)-T;for(;E>Math.PI;)E-=Math.PI*2;for(;E<-Math.PI;)E+=Math.PI*2;const C=un.turnRate*a,R=T+Math.max(-C,Math.min(C,E));l.dirX=Math.sin(R),l.dirZ=Math.cos(R);const _=r.position.x-h.x,w=r.position.z-h.z;if(Math.hypot(_,w)<un.stealDist&&l.stealTimer<=0&&l.clock>=un.spawnGrace&&(r.applyImpulse(new S(l.dirX*un.stealImpulse,.8,l.dirZ*un.stealImpulse)),r.wakeUp(),l.stealTimer=un.stealCooldown),l.bumpTimer<=0&&l.clock>=un.spawnGrace)for(const L of c){const I=L.pelvis.position;if(!(Math.hypot(I.x-h.x,I.z-h.z)>un.bumpDist)){u.push(L),l.bumpTimer=un.bumpCooldown;break}}return{input:{moveX:l.dirX,moveZ:l.dirZ,jump:!1},brokeCarry:u}}return{update:i,forget:n,stateOf:e}}const LS=document.getElementById("app"),xe=aS(LS),{scene:Ls,camera:On,renderer:da,physics:_n,objects:Ui,objectById:ai}=xe;let vf=new Map;function xf(){vf=new Map(Ui.map(s=>[s.id,{p:s.body.position.clone(),q:s.body.quaternion.clone(),ld:s.body.linearDamping,ad:s.body.angularDamping}]))}xf();xe.onMapLoaded(xf);const cu=()=>xe.map.spawns,Vt=new Map,jh=[{skin:7040888,shirt:2830136,pants:1316636,shoes:14236475,eye:16726876},{skin:8022904,shirt:3877688,pants:1840154,shoes:16747069,eye:16726876}];function _f(s){if(Ie(s))return jh[(-s-1)%jh.length];const t=ge.presetOf(s);return _S(t??pf(s))}function Ie(s){return s<0}function fa(){return[...Vt.keys()].filter(s=>!Ie(s)).sort((s,t)=>s-t)}function Ki(s,t){const e=Vt.get(s);if(e)return e;const n=[...Vt.keys()].filter(f=>Ie(f)===Ie(s)).length,i=cu(),[o,r]=t??i[n%i.length],a=bS(s),c=TS(a)|cS,l=fS(_n,Ls,new S(o,it.rideHeight+.15,r),xe.materials.player,_f(s),a,c),u={id:s,rag:l,input:{moveX:0,moveZ:0,jump:!1},grabPending:!1,trickPending:!1,kickPending:!1,stopPending:!1,kickPower:0};return Vt.set(s,u),u}function Aa(s){const t=Vt.get(s);t&&(ts(t.rag),Je.forget(t.rag),Co.forget(t.rag),kn.forget(t.rag),Rf.forget(t.rag),Jo.delete(t.rag),Tl.delete(t.rag),Al.delete(t.rag),na.delete(t.rag),t.rag.dispose(_n,Ls),Vt.delete(s))}let Kn=Math.PI,oi=.28;const Tc=6.2,DS=1.8;let lu=!1;da.domElement.addEventListener("click",()=>{Ve.phase==="playing"&&da.domElement.requestPointerLock()});document.addEventListener("mousedown",s=>{!lu||s.button!==0||Mf()});document.addEventListener("mouseup",s=>{s.button===0&&wf()});document.addEventListener("pointerlockchange",()=>{lu=document.pointerLockElement===da.domElement});document.addEventListener("mousemove",s=>{if(!lu)return;const t=gf({yaw:Kn,pitch:oi},s.movementX,s.movementY);Kn=t.yaw,oi=t.pitch});let Ac=Math.PI*.15;function NS(s){Ac+=s*.06;const t=17,e=9.5;On.position.lerp(new B(Math.sin(Ac)*t,e,Math.cos(Ac)*t),.05),On.lookAt(0,1,0)}let no=0;function je(s){no=Math.min(1,Math.max(no,s))}let Cc=0;const US=70;function FS(s,t,e){const n=s.x-Math.sin(Kn)*Math.cos(oi)*Tc,i=s.y+Math.sin(oi)*Tc+DS,o=s.z-Math.cos(Kn)*Math.cos(oi)*Tc;On.position.lerp(new B(n,i,o),.16);const r=Math.hypot(t.x,t.z),a=Math.min(1,r/it.maxSpeed)*6;Cc+=(a-Cc)*Math.min(1,e*3);const c=US+Cc;Math.abs(On.fov-c)>.01&&(On.fov=c,On.updateProjectionMatrix()),no=Math.max(0,no-e*3.2);const l=no*no*.5;On.lookAt(s.x+(Math.random()-.5)*l,s.y+.7+(Math.random()-.5)*l,s.z+(Math.random()-.5)*l)}const be={};let Mo=!1,So=!1,nr=!1,wo=!1,Eo=0,yf=0,bo=!1;function Mf(){bo||(bo=!0,yf=performance.now())}function Sf(){return bo?Math.min(1,(performance.now()-yf)/(lt.chargeTime*1e3)):0}function wf(){bo&&(Eo=Sf(),bo=!1,wo=!0,Uf=performance.now()/1e3,sd=Eo,sd>.75&&(Qo=1.3))}const Un={R:!1,T:!1,Y:!1,U:!1};window.addEventListener("keydown",s=>{s.code==="KeyE"&&!be.KeyE&&(Mo=!0),(s.code==="ShiftLeft"||s.code==="ShiftRight")&&!be[s.code]&&(So=!0),s.code==="KeyF"&&!be[s.code]&&Mf(),s.code==="KeyQ"&&!be[s.code]&&(nr=!0),s.code==="KeyM"&&!be[s.code]&&(se.setMuted(!se.muted),se.play("ui")),s.code==="KeyH"&&!be[s.code]&&(ya=!ya,vu()),s.code==="KeyR"&&!be.KeyR&&(Un.R=!0),s.code==="KeyT"&&!be.KeyT&&(Un.T=!0),s.code==="KeyY"&&!be.KeyY&&(Un.Y=!0),s.code==="KeyU"&&!be.KeyU&&(Un.U=!0),be[s.code]=!0,s.code==="Space"&&s.preventDefault()});window.addEventListener("keyup",s=>{s.code==="KeyF"&&wf(),be[s.code]=!1});window.addEventListener("blur",()=>{for(const s of Object.keys(be))be[s]=!1;bo=!1});function Ef(){const{fx:s,fz:t}=mf(Kn),e=Math.hypot(s,t)||1;return{ax:s/e,az:t/e}}function uu(){const{fx:s,fz:t,rx:e,rz:n}=mf(Kn);let i=0,o=0;(be.KeyW||be.ArrowUp)&&(i+=s,o+=t),(be.KeyS||be.ArrowDown)&&(i-=s,o-=t),(be.KeyA||be.ArrowLeft)&&(i-=e,o-=n),(be.KeyD||be.ArrowRight)&&(i+=e,o+=n);const r=Math.hypot(i,o);return r>0&&(i/=r,o/=r),{mx:i,mz:o}}const tn=[];function ji(s){return tn.filter(t=>t.ownerRag===s)}function ts(s){for(let t=tn.length-1;t>=0;t--)if(tn[t].ownerRag===s){const e=tn[t];e.constraint&&_n.removeConstraint(e.constraint);const n=ai.get(e.objectId);n&&(n.body.linearDamping=e.prevLinearDamping,n.body.angularDamping=e.prevAngularDamping,n.body.material=e.prevMaterial),tn.splice(t,1)}s.setHeld([])}function Ca(s,t){return pS(s.body,t.position)}function $h(s){let t=null,e=1/0;for(const n of Ui){if(n.grabbable===!1||n.body.position.distanceTo(s.position)>n.grabRadius)continue;const o=n.body.position.vadd(n.body.quaternion.vmult(Ca(n,s))).distanceTo(s.position),r=n.grabReach??it.grabReach;o<r&&o<e&&(e=o,t=n)}return t}function zS(s,t){const e=Math.abs(_n.gravity.y),n=s.mass*e<=it.carryLiftStrength*t;for(const i of tn){const o=ai.get(i.objectId);if(!(!o||o.body!==s))if(n&&!i.constraint){const r=Ca(o,i.hand);i.pivotLocal=r;const a=new df(i.hand,new S(0,0,0),s,r,i.holdForce);for(const c of a.equations)c.maxForce=0,c.minForce=-0;_n.addConstraint(a),i.constraint=a,i.ramp=0}else!n&&i.constraint&&(_n.removeConstraint(i.constraint),i.constraint=null)}}function Kh(s){if(ji(s).length>0)return ts(s),!1;const t=$h(s.handL)??$h(s.handR);if(!t)return!1;const e=t.body.material,n=t.body.linearDamping,i=t.body.angularDamping;for(const o of[s.handL,s.handR]){const r=Ca(t,o),a=vS(t.body,Math.abs(_n.gravity.y));tn.push({ownerRag:s,hand:o,objectId:t.id,constraint:null,ramp:0,holdForce:a,pivotLocal:r,prevLinearDamping:n,prevAngularDamping:i,prevMaterial:e})}return t.body.linearDamping=Math.max(n,it.carryObjDamp),t.body.angularDamping=Math.max(i,it.carryObjAngDamp),t.body.material=xe.materials.held,t.body.wakeUp(),!0}const Je=AS(),Co=rS(xe,7),kn=tS(xe,7);let bf=new Set;function Tf(){bf=new Set(xe.obstacleSpecs.map(s=>s.id))}const ze=CS(Ls),OS=16777215,Af=7268351,pa=new Map;let BS=0;const kS=new Ea(.17,.3,4);function HS(s){let t=pa.get(s);if(t)return t;const e=new hn({color:Af,toneMapped:!1});return e.depthTest=!1,e.depthWrite=!1,t=new Nt(kS,e),t.rotation.z=Math.PI,t.renderOrder=998,t.frustumCulled=!1,Ls.add(t),pa.set(s,t),t}function GS(s){var e;const t=Ra();for(const[n,i]of pa)Vt.has(n)||(Ls.remove(i),i.material.dispose(),pa.delete(n));for(const n of Vt.values()){if(Ie(n.id))continue;const i=HS(n.id),o=n.rag===t;i.visible=cn&&Ve.phase==="playing",i.material.color.setHex(o?OS:Af),i.scale.setScalar(o?.8:1.15);const r=((e=n.rag.parts.get("head"))==null?void 0:e.body.position)??n.rag.pelvis.position;i.position.set(r.x,r.y+.62+Math.sin(s*3+n.id)*.05,r.z),i.rotation.y+=.02}}const se=PS(),VS=8;let Zo=[];function Cf(s){if(s==null)return!1;const t=ge.id;return t!==null&&hi(t)===s}function hu(s,t,e=1,n){const i=t==null||Cf(t)?1:.4;se.play(s,{vol:e*i,rate:n})}function fs(s,t,e=1,n){hu(s,t,e,n),!(!Ae||ge.offline)&&(Zo.some(i=>i.n===s)||Zo.length<VS&&Zo.push({n:s,p:t??void 0,v:e,r:n}))}for(const s of["pointerdown","keydown"])window.addEventListener(s,()=>se.unlock(),{once:!1,passive:!0});const Jo=new Map,Tl=new Map,Al=new Map,na=new Map,Rc=.9,WS=it.rideHeight+.35;function qS(s,t){const e=ii(s);if(!Ae){XS(s,t,e);return}const n=Math.hypot(s.pelvis.velocity.x,s.pelvis.velocity.z),i=!s.grounded;if(Al.get(s)&&!i&&(se.play("land",{vol:e?.9:.3}),e&&s.pelvis.velocity.y<-4&&je(.2)),Al.set(s,i),!s.grounded||n<.6||s.state!=="ACTIVE")return;const o=Math.floor(s.swingPhase/Math.PI);Tl.get(s)!==o&&(Tl.set(s,o),se.play("step",{vol:(e?.9:.25)*Math.min(1,n/it.maxSpeed),rate:.9+Math.random()*.2}))}function XS(s,t,e){const n=s.pelvis.position,i=na.get(s);if(!i){na.set(s,{x:n.x,y:n.y,z:n.z,dist:0,air:!1});return}const o=Math.hypot(n.x-i.x,n.z-i.z),r=o/Math.max(.001,t),a=n.y>WS;i.air&&!a&&(se.play("land",{vol:e?.9:.3}),e&&n.y-i.y<-.08&&je(.2));let c=i.dist+(o>2?0:o);!a&&s.state==="ACTIVE"&&r>.6&&c>=Rc&&(c-=Rc,se.play("step",{vol:(e?.9:.25)*Math.min(1,r/it.maxSpeed),rate:.9+Math.random()*.2})),c>Rc*2&&(c=0),na.set(s,{x:n.x,y:n.y,z:n.z,dist:c,air:a})}function ii(s){const t=ge.id;if(t===null)return!1;const e=Vt.get(hi(t));return!!e&&e.rag===s}let Zh=0;const Rf=IS(7);function YS(){if(!Ae)return;const s=xe.map.botSpawns??[];if(s.length===0)return;let t=1/0;for(const e of Vt.values())Ie(e.id)||(t=Math.min(t,e.rag.pelvis.position.z));if(isFinite(t))for(let e=0;e<s.length;e++){const n=-(e+1);if(!Vt.has(n)&&!(t>s[e][1]+jS)){Ki(n,s[e]),se.play("botSpawn"),je(.85),Nf("방해꾼 등장!"),ze.kick(s[e][0],.05,s[e][1],1),ze.kick(s[e][0],.05,s[e][1],.5);for(const[i,o]of[[1,0],[-1,0],[0,1],[0,-1]])ze.dash(s[e][0],s[e][1],i,o)}}}const jS=26;function du(){if(Ae)for(const s of[...Vt.keys()])Ie(s)&&Aa(s)}function $S(){for(const s of[...Vt.keys()])Ie(s)&&Aa(s)}const kr=[],Pf=new dn;Ls.add(Pf);function KS(){const s=Co.activeMarkers();for(;kr.length<s.length;){const t=new Nt(new _o(.62,1,40),new hn({color:16726876,transparent:!0,opacity:.8,depthWrite:!1,toneMapped:!1,side:zn}));t.rotation.x=-Math.PI/2,Pf.add(t),kr.push(t)}for(let t=0;t<kr.length;t++){const e=kr[t],n=s[t];if(!n){e.visible=!1;continue}e.visible=!0;const i=Math.min(1,Math.max(0,n.y/ue.hoverY)),o=n.r*(1.25+i*1.35);e.scale.set(o,o,1),e.position.set(n.x,.05,n.z),e.material.opacity=.35+(1-i)*.5}}const ZS=document.getElementById("ball-cue"),JS=document.getElementById("ball-cue-arrow"),QS=document.getElementById("ball-cue-dist"),tw=72;function If(s,t,e,n,i,o){if(!s||!t||!e)return;if(!n||!i||!cn){s.hidden=!0;return}const r=new B(n.x,n.y,n.z),a=r.clone().sub(On.position).dot(On.getWorldDirection(new B))<0,c=r.clone().project(On);let l=a?-c.x:c.x,u=a?-c.y:c.y;if(!a&&Math.abs(c.x)<=1&&Math.abs(c.y)<=1){s.hidden=!0;return}const h=Math.max(Math.abs(l),Math.abs(u))||1;l/=h,u/=h;const d=window.innerWidth/2-o,g=window.innerHeight/2-o,y=window.innerWidth/2+l*d,p=window.innerHeight/2-u*g;s.hidden=!1,s.style.transform=`translate(${y.toFixed(0)}px, ${p.toFixed(0)}px) translate(-50%, -50%)`;const m=Math.atan2(l,u)*180/Math.PI-90;t.style.transform=`rotate(${m.toFixed(0)}deg)`,e.textContent=`${Math.hypot(n.x-i.position.x,n.z-i.position.z).toFixed(0)}m`}function ew(s){var t;If(ZS,JS,QS,((t=pn())==null?void 0:t.position)??null,s,tw)}const nw=document.getElementById("mate-cue"),iw=document.getElementById("mate-cue-arrow"),sw=document.getElementById("mate-cue-dist"),ow=112;function rw(s){const t=Ra();let e=null,n=1/0;if(s&&t)for(const i of Vt.values()){if(Ie(i.id)||i.rag===t)continue;const o=i.rag.pelvis.position,r=Math.hypot(o.x-s.position.x,o.z-s.position.z);r<n&&(n=r,e=o)}If(nw,iw,sw,e,s,ow)}xe.onMapLoaded(()=>{Co.rebuild(),kn.rebuild(),Tf(),cn&&du(),cn&&gu(),Pl=0,Ul=0,Fl=0,to=0,xa=0,_a=new Set,ga=new Set,va=new Set,Ss=0,Rl=new Set,Yn=null,Ms=null,ma=!1});Co.rebuild();kn.rebuild();Tf();function pn(){const s=ai.get(fn);return s?s.body:null}const ge=new xS;let Ae=!1,cn=!1;const ir=new Map,fu=new Map,pu=new Map;let Jh=!1;function Cl(s){if(!(Jh&&Ae===s)){Jh=!0,Ae=s;for(const t of Ui)t.body.type=s?pt.DYNAMIC:pt.KINEMATIC,t.body.mass=s?t.mass:0,s||(t.body.velocity.setZero(),t.body.angularVelocity.setZero()),t.body.updateMassProperties(),t.body.wakeUp();for(const t of Vt.values())Lf(t.rag,s);if(cn&&(s?du():$S()),!s){for(const t of tn)t.constraint&&_n.removeConstraint(t.constraint);tn.length=0}}}function Lf(s,t){for(const e of s.bodies)e.type=t?pt.DYNAMIC:pt.KINEMATIC,t||(e.velocity.setZero(),e.angularVelocity.setZero()),e.updateMassProperties()}ge.on(s=>{var t;if(cn)switch(s.type){case"welcome":{Ki(s.id);for(const e of s.players)Ki(e);Cl(ge.isHost);break}case"host":Cl(ge.isHost);break;case"playerJoined":Ki(s.id),Ae&&Lf(Vt.get(s.id).rag,!0);break;case"playerLeft":Aa(s.id),ir.delete(s.id);break;case"input":if(!Ae)break;ir.set(s.id,s.input);break;case"restart":Ae&&Ve.restart();break;case"nextMap":Ae&&Ve.nextMap();break;case"snapshot":{if(Ae)break;if(s.game&&Ve.applyRemote(s.game),s.sfx)for(const e of s.sfx)hu(e.n,e.p,e.v??1,e.r);for(const e of s.ragdolls){Ki(e.id);const n=[],i=[];for(let o=0;o<e.b.length;o+=7)n.push(new B(e.b[o],e.b[o+1],e.b[o+2])),i.push(new Ni(e.b[o+3],e.b[o+4],e.b[o+5],e.b[o+6]));fu.set(e.id,{pos:n,quat:i}),(t=Vt.get(e.id))==null||t.rag.setNetState(e.st)}for(const e of s.objects)pu.set(e.id,{p:new B(e.p[0],e.p[1],e.p[2]),q:new Ni(e.r[0],e.r[1],e.r[2],e.r[3])});break}}});const Pc=ue.voidY;function aw(){const s=cu(),t=Math.max(...s.map(n=>n[1])),e=xe.map.goal.z;return[Math.min(t,e)+3,Math.max(t,e)-1]}const Qh=-.3,td=1.5,Yi=new Map,cw=it.rideHeight-.25,lw=2.5,uw=.35,Go=new Map,Hr=new Map;function hw(){const[s,t]=aw(),e=o=>Math.max(s,Math.min(t,o));for(const o of Vt.values()){const r=o.rag.pelvis.position;let a=!1;if(r.y<Qh&&!o.rag.grounded){const l=(Yi.get(o.id)??0)+As;Yi.set(o.id,l),a=l>td}else Yi.delete(o.id);a&&Yi.delete(o.id);let c=!1;if(!a&&o.rag.state==="ACTIVE"&&r.y<cw){const l=Hr.get(o.id);if(!l||Math.hypot(r.x-l.x,r.z-l.z)>uw)Hr.set(o.id,{x:r.x,z:r.z}),Go.set(o.id,0);else{const u=(Go.get(o.id)??0)+As;Go.set(o.id,u),c=u>lw}}else Hr.delete(o.id),Go.delete(o.id);c&&(Hr.delete(o.id),Go.delete(o.id)),!(r.y>Pc&&!a&&!c)&&(ts(o.rag),o.rag.reset(new S(0,it.rideHeight+.15,e(r.z+4))),o.input.moveX=0,o.input.moveZ=0,o.input.jump=!1,o.grabPending=!1,o.trickPending=!1,o.stopPending=!1,o.kickPending=!1)}const n=ai.get(fn);let i=!1;if(n){if(n.body.position.y<Qh){const o=(Yi.get(fn)??0)+As;Yi.set(fn,o),i=o>td}else Yi.delete(fn);i&&Yi.delete(fn)}if(n&&(n.body.position.y<=Pc||i)){const o=[...Vt.values()],r=o.length?o.reduce((a,c)=>a+c.rag.pelvis.position.z,0)/o.length:t;n.body.position.set(0,1.2,e(r-1.5)),n.body.velocity.setZero(),n.body.angularVelocity.setZero(),n.body.force.setZero(),n.body.torque.setZero(),n.body.wakeUp()}for(const o of Ui)o.grabbable===!1&&(bf.has(o.id)||o.body.position.y>Pc||(o.body.position.set(0,ue.hoverY,o.body.position.z),o.body.velocity.setZero(),o.body.angularVelocity.setZero()))}function dw(){gu(),Ms=null,ma=!1,ga=new Set,va=new Set,Ss=0,xa=0,_a=new Set,oa=!1,Nl=!1,lo=0,so=0,Qo=0,Yo.clear(),Ll.clear(),Dl=-1e9;for(const n of Vt.values())ts(n.rag);for(const n of tn)n.constraint&&_n.removeConstraint(n.constraint);tn.length=0;for(const n of Ui){const i=vf.get(n.id);i&&(n.body.position.copy(i.p),n.body.quaternion.copy(i.q),n.body.velocity.setZero(),n.body.angularVelocity.setZero(),n.body.force.setZero(),n.body.torque.setZero(),n.body.linearDamping=i.ld,n.body.angularDamping=i.ad,n.body.updateMassProperties(),n.body.wakeUp(),n.mesh.position.set(i.p.x,i.p.y,i.p.z),n.mesh.quaternion.set(i.q.x,i.q.y,i.q.z,i.q.w))}let s=0,t=0;const e=xe.map.botSpawns??[];for(const n of Vt.values()){const i=cu(),[o,r]=Ie(n.id)&&e.length?e[t++%e.length]:i[s++%i.length];n.rag.reset(new S(o,it.rideHeight+.15,r)),n.input.moveX=0,n.input.moveZ=0,n.input.jump=!1,n.grabPending=!1,n.trickPending=!1,n.kickPending=!1}for(const n of ir.values())n.grab=!1;fu.clear(),pu.clear()}const Ve=SS(xe,{isAuthority:()=>Ae,resetWorld:dw,requestRestartRemote:()=>ge.send({type:"restart"}),requestNextMapRemote:()=>ge.send({type:"nextMap"}),isBallCarried:()=>tn.some(s=>s.objectId===fn),onGoal:()=>{se.play("goal"),je(.7);const s=xe.map.goal.z;for(let t=0;t<4;t++)ze.kick(xe.map.goal.x+(t-1.5)*1.6,.05,s+1.5,1)},onFail:()=>se.play("fail")});function hi(s){const t=fa();if(t.length<2)return s;const e=t.indexOf(s);return e<0?s:t[(e+1)%t.length]}const ps=document.getElementById("tut"),fw={WASD:"<b>WASD</b>로 공을 몰아보세요 — 빨리 달릴수록 공이 앞으로 크게 굴러갑니다",F:"<b>F</b>를 눌러 차보세요 — 길게 누르고 있다가 놓으면 더 세게 나갑니다",SHIFT:"<b>Shift</b> — 공은 한쪽으로 띄우고 몸은 반대쪽으로 빠집니다 (상대를 지나칠 때)",E:"<b>E</b>로 공을 안고 뛸 수 있습니다 (느려집니다) · 다시 <b>E</b>로 놓기"};function pw(s){if(!ps)return;if(!s||!cn||xe.map.id!=="goalrush"){ps.hidden=!0;return}const t=s.position.z,e=ff.find(([i])=>Math.abs(t-i)<=sS);if(!e){ps.hidden=!0;return}const n=fw[e[1]];if(!n){ps.hidden=!0;return}ps.innerHTML!==n&&(ps.innerHTML=n),ps.hidden=!1}const mu=()=>fa().length;let Yn=null;const mw=5,ed=4.5,gw=2.6,vw=["빗나갔다!","그쪽 아니라고","패스 미안"];function xw(){if(!Ae)return;const s=pn();if(!s||!Yn)return;if(performance.now()-Yn.t>mw*1e3){Math.hypot(s.position.x-Yn.x,s.position.z-Yn.z)>=ed&&mu()>=2&&(se.play("drop",{vol:.5,rate:.8}),Li("passFail",vw,6)),Yn=null;return}if(!(Math.hypot(s.position.x-Yn.x,s.position.z-Yn.z)<ed))for(const e of Vt.values()){if(Ie(e.id)||e.id===Yn.id)continue;const n=e.rag.pelvis.position;if(Math.hypot(s.position.x-n.x,s.position.z-n.z)>gw)continue;const i=kn.openGate(n.z);Yn=null,Df(i);return}}function Df(s){yn("PASS!",s!==null?"게이트가 열렸다":"좋은 패스"),se.play("goal",{vol:.7,rate:1.25}),je(.3);const t=pn();t&&(ze.kick(t.position.x,.05,t.position.z,1),ze.trail(t.position.x,t.position.y,t.position.z))}let Rl=new Set;function _w(){if(!Ae)for(const s of kn.stations){if(s.spec.kind!=="coopgate")continue;s.body.position.y<yw&&!Rl.has(s.spec.z)&&(Rl.add(s.spec.z),Df(s.spec.z))}}const yw=.6,Mw=25;let Ms=null,io=0,ma=!1;function Sw(s){if(io=Math.max(0,io-s),!Ae)return;const t=pn();if(!t){Ms=null;return}const e=t.position.z;if(Ms===null||e<Ms){Ms=e;return}const n=Ms+Mw;if(e<=n)return;const i=t.velocity.z>1.2;t.position.z=n,t.velocity.z>0&&(t.velocity.z=0),t.wakeUp(),i&&io<=0&&(io=1.2,so=Nn.cool,ze.kick(t.position.x,t.position.y,t.position.z,.6),se.play("hit",{vol:.5}),ma||(ma=!0,yn("여기까지","공은 여기보다 뒤로는 안 굴러간다")))}function ww(){Ae&&(mu()>=2||kn.needsSoloOpen()&&kn.openGate())}let Pl=0,Gr=0;const Ew=6.5,bw=2;function Tw(s,t){if(Gr=Math.max(0,Gr-s),!t||!cn||Pl>=bw||Gr>0||Ve.phase!=="playing"||cr())return;const e=t.pelvis.position;for(const n of Vt.values()){if(!Ie(n.id)||n.rag.state!=="ACTIVE")continue;const i=n.rag.pelvis.position;if(!(Math.hypot(i.x-e.x,i.z-e.z)>Ew)){yn("Shift","옆으로 재껴서 지나가기 · Q 급정지"),Pl++,Gr=6;return}}}const Aw=1.15,Cw=3.2,nd=1.6,ms=new Map,Rw=["쿵!","야 앞에 봐","둘 다 넘어짐"];function Pw(s){if(!Ae)return;for(const[e,n]of ms){const i=n-s;i<=0?ms.delete(e):ms.set(e,i)}const t=[...Vt.values()];for(let e=0;e<t.length;e++)for(let n=e+1;n<t.length;n++){const i=t[e],o=t[n];if(Ie(i.id)||Ie(o.id)||i.rag.state!=="ACTIVE"||o.rag.state!=="ACTIVE"||ms.has(i.id)||ms.has(o.id))continue;const r=i.rag.pelvis.position,a=o.rag.pelvis.position;let c=a.x-r.x,l=a.z-r.z;const u=Math.hypot(c,l);if(u>Aw||u<.001)continue;c/=u,l/=u;const f=i.rag.pelvis.velocity,h=o.rag.pelvis.velocity;if((f.x-h.x)*c+(f.z-h.z)*l<Cw)continue;i.rag.knockdown(1.1),o.rag.knockdown(1.1),i.rag.pelvis.applyImpulse(new S(-c*34,18,-l*34)),o.rag.pelvis.applyImpulse(new S(c*34,18,l*34)),ms.set(i.id,nd),ms.set(o.id,nd),se.play("hit",{vol:1});const g=(r.x+a.x)*.5,y=(r.z+a.z)*.5;ze.dash(g,y,c,l),ze.dash(g,y,-c,-l),ze.kick(g,.05,y,.5),(ii(i.rag)||ii(o.rag))&&(je(.9),Li("bump",Rw,3)||yn("쿵!","둘이 정면으로 부딪혔다"))}}const Iw=.9,Lw=5;let ga=new Set,Ss=0;function Il(){return xe.map.ballSlots??[]}function Dw(s){if(!s||!cn||Ve.phase!=="playing"||cr())return;const t=s.pelvis.position,e=pn();if(e)for(const n of Il()){if(ga.has(n))continue;const i=t.z-n;if(!(i<0||i>Lw)&&!(Math.abs(t.x)>5.4)&&!(e.position.z>n)){ga.add(n),yn("공만 통과","사람은 옆으로 돌아간다 — 초록 길로");return}}}let va=new Set;function Nw(s){if(!Ae)return;const t=pn();if(!t){Ss=0;return}for(const n of Il()){const i=n-.5;if(!va.has(n)){t.position.z<i&&va.add(n);continue}if(t.position.z<=i)continue;const o=t.velocity.z>1.2;t.position.z=i,t.velocity.z>0&&(t.velocity.z=0),t.wakeUp(),o&&io<=0&&(io=1.2,ze.kick(t.position.x,t.position.y,t.position.z,.6),se.play("hit",{vol:.5}))}if(!(Math.abs(t.position.x)<5.4&&Il().some(n=>Math.abs(t.position.z-n)<Iw))||Math.hypot(t.velocity.x,t.velocity.z)>.35){Ss=0;return}Ss+=s,!(Ss<1.2)&&(Ss=0,t.velocity.z=-2.4,t.wakeUp())}const Uw=16,Fw=3;let Vo=0,xa=0,_a=new Set;function zw(s,t){if(Vo=Math.max(0,Vo-s),!t||!cn||mu()<2||Ve.phase!=="playing"||cr())return;const e=t.pelvis.position;for(const n of kn.buttonGates()){const i=e.z-n.z;if(i<0||i>Uw)continue;const o=kn.onPad(n.z,e.x,e.y,e.z);if(n.open&&!o){if(_a.has(n.z))continue;_a.add(n.z),yn("지금이다","친구가 문을 잡고 있다 — 공 몰고 먼저 지나가라"),Vo=4;return}if(!n.open&&Vo<=0&&xa<Fw){yn("버튼 문","한 명이 발판을 밟으면 열린다 — 나머지가 공을 몰고 지나가라"),xa++,Vo=8;return}}}const ws=document.getElementById("alert-banner");let ia=0;function Nf(s){if(!ws)return;const t=ws.querySelector("span");t&&(t.textContent=s),ws.hidden=!0,ws.offsetWidth,ws.hidden=!1,ia=1.1}function Ow(s){!ws||ia<=0||(ia-=s,ia<=0&&(ws.hidden=!0))}const Es=document.getElementById("move-toast");let sa=0;function yn(s,t=""){Es&&(Es.innerHTML=t?`${s}<small>${t}</small>`:s,Es.hidden=!0,Es.offsetWidth,Es.hidden=!1,sa=.75)}function Bw(s){!Es||sa<=0||(sa-=s,sa<=0&&(Es.hidden=!0))}const id=new Map,Ll=new Map;let Dl=-1e9;const kw=1.6;function Li(s,t,e){const n=performance.now()/1e3;if(n-Dl<kw||n-(Ll.get(s)??-1e9)<e)return!1;const i=(id.get(s)??0)%t.length;return id.set(s,i+1),Ll.set(s,n),Dl=n,yn(t[i]),!0}function Ra(){var t;const s=ge.id;return s===null?null:((t=Vt.get(hi(s)))==null?void 0:t.rag)??null}const Nn={wildSpeed:5.2,stealSpeed:4.6,mateSpeed:8.5,jumpMul:1.5,jumpAdd:1.4,cool:1,near:2.6,myKickGrace:.5};let Ic=0,Lc=0,Dc=0,oa=!1,so=0,Uf=-1e9,sd=0,Qo=0,lo=0;const od={steal:["뺏겼다!","야 그거 내 공","도둑이야!"],mate:["친구가 찼다!","그쪽 아니야!","누구야 지금"],wild:["뻥—!","공 날아감!","어디가!"],goal:["아까비!","골 코앞에서…","다 왔었는데"],over:["너무 셌다!","패스가 아니라 슛인데","공 어디감"]};function Hw(s){so=Math.max(0,so-s),lo=Math.max(0,lo-s);const t=pn();if(!t||Ve.phase!=="playing"){oa=!1;return}const e=t.position.x,n=t.position.y,i=t.position.z;if(!oa){oa=!0,Ic=e,Lc=i,Dc=0;return}const o=Math.max(1e-4,s),r=Math.hypot(e-Ic,i-Lc)/o,a=Dc;Ic=e,Lc=i,Dc=r;const c=performance.now()/1e3,l=Ra();if(Qo>0&&(Qo-=s,Qo<=0&&l&&Math.hypot(e-l.pelvis.position.x,i-l.pelvis.position.z)>13&&r>3&&(se.play("drop",{vol:.5,rate:.8}),Li("over",od.over,8))),r>60||tn.some(y=>y.objectId===fn)||so>0||r<a*Nn.jumpMul+Nn.jumpAdd||c-Uf<Nn.myKickGrace)return;let u=1/0,f=1/0,h=1/0;for(const y of Vt.values()){const p=y.rag.pelvis.position,m=Math.hypot(p.x-e,p.z-i);Ie(y.id)?u=Math.min(u,m):y.rag===l?h=Math.min(h,m):f=Math.min(f,m)}let d;if(u<Nn.near){if(r<Nn.stealSpeed)return;d="steal"}else if(f<Nn.near){if(r<Nn.mateSpeed)return;d="mate"}else{if(h<Nn.near&&r<Nn.mateSpeed||r<Nn.wildSpeed)return;d="wild"}const g=Math.abs(i-xe.map.goal.z)<22;g&&d==="wild"&&(d="goal"),so=Nn.cool,lo=.55,ze.kick(e,n,i,1),se.play("hit",{vol:.7,rate:d==="steal"?1.35:1.15}),l&&Math.hypot(e-l.pelvis.position.x,i-l.pelvis.position.z)<14&&je(g?.75:.45),Li(d,od[d],d==="goal"?6:d==="steal"?4.5:3.5)}const rd=-3,Yo=new Map;let Nl=!1;const Vr={me:["으아아—","안녕히 계세요","발이 미끄러졌다"],mate:["친구가 떨어졌다!","야 어디가","한 명 실종"],bot:["방해꾼도 떨어졌다","잘 가라"],ball:["공이 떨어졌다!","공 어디감"]};function Gw(){if(Ve.phase!=="playing")return;const s=Ra();for(const n of Vt.values()){const i=n.rag.pelvis.position,o=Yo.get(n.id)??!1,r=i.y<rd;r!==o&&(Yo.set(n.id,r),r?n.rag===s?(se.play("fail",{vol:.45,rate:1.6}),je(.4),Li("fallMe",Vr.me,4)):Ie(n.id)?Li("fallBot",Vr.bot,10):(se.play("drop",{vol:.4,rate:.75}),Li("fallMate",Vr.mate,4)):i.y>-1&&(ze.kick(i.x,.05,i.z,.7),n.rag===s&&se.play("pickup",{vol:.7})))}for(const n of[...Yo.keys()])Vt.has(n)||Yo.delete(n);const t=pn();if(!t)return;const e=t.position.y<rd;e!==Nl&&(Nl=e,e?(se.play("drop",{vol:.6,rate:.7}),Li("fallBall",Vr.ball,5)):t.position.y>-1&&(ze.kick(t.position.x,.05,t.position.z,1.1),lo=.6,se.play("pickup",{vol:.8,rate:.85})))}const Wr=new Map,ad=new Map;let cd="playing";const qr=new Set;function Vw(){for(const t of Vt.values()){const e=Wr.get(t.id);Wr.set(t.id,t.rag.state),!(e===void 0||e!=="ACTIVE"||t.rag.state==="ACTIVE")&&(hu("hit",t.id,.85,1.05),Cf(t.id)&&je(.5))}for(const t of[...Wr.keys()])Vt.has(t)||Wr.delete(t);for(const t of kn.buttonGates()){const e=ad.get(t.z);ad.set(t.z,t.open),!(e===void 0||e===t.open)&&se.play(t.open?"pickup":"drop",{vol:.55,rate:.65})}if(Ae)return;const s=Ve.phase;s!==cd&&(s==="success"?(se.play("goal"),je(.7)):s==="fail"&&se.play("fail"),cd=s);for(const t of Vt.values())!Ie(t.id)||qr.has(t.id)||(qr.add(t.id),se.play("botSpawn"),je(.85),Nf("방해꾼 등장!"));for(const t of[...qr])Vt.has(t)||qr.delete(t)}const Ww=3.2,qw=["아슬아슬!","닿을 뻔했다","지금 뭐 지나갔지"];function Ff(s,t,e){for(const n of kn.stations){const i=n.body;if(!(i.position.y<-.2)&&Math.hypot(i.position.x-s,i.position.z-t)<e)return!0}return!1}const ld=2;let Ul=0,Fl=0,to=0;function Xw(s,t){if(to=Math.max(0,to-s),!t||!cn||to>0||Ve.phase!=="playing"||cr())return;const e=pn();if(!e)return;const n=t.pelvis.position,i=Math.hypot(e.position.x-n.x,e.position.z-n.z);if(Ul<ld&&i>4&&i<12){yn("F — 러시","놓친 공으로 달려든다 (러시 중엔 못 꺾는다)"),Ul++,to=9;return}if(Fl<ld&&i<3){const o=e.position.x,r=e.position.z;Ff(o,r-4.5,3.4)&&n.z>r&&(yn("Q — 급정지","공을 세우고 지나갈 때를 기다린다"),Fl++,to=12)}}const Wo=document.getElementById("countdown");let oo=0,zl=-1;const cr=()=>oo>0;function gu(){oo=3.2,zl=-1}function Yw(s){if(!Wo)return;if(oo<=0){Wo.hidden=!0;return}oo-=s,Wo.hidden=!1;const t=Math.ceil(oo-.2);if(t!==zl){zl=t;const e=xe.map,n=`<div class="cd-stage">STAGE ${xe.mapIndex+1} / ${xe.mapCount} · ${e.name.replace(/^\d+\.\s*/,"")}<em>${e.blurb}</em></div>`;Wo.innerHTML=`${n}<span>${t>0?t:"GO!"}</span>`,se.play(t>0?"countdown":"start")}oo<=0&&(Wo.hidden=!0)}let Nc=!1;const uo=document.getElementById("kick-gauge"),ud=uo==null?void 0:uo.querySelector("i");function jw(){if(!uo||!ud)return;const s=Sf();if(s<=0){uo.hidden=!0,Nc=!1;return}uo.hidden=!1,s>=1&&!Nc&&(Nc=!0,se.play("kickCharge")),ud.style.width=`${(s*100).toFixed(0)}%`}const hd=document.getElementById("hud"),dd=document.getElementById("help-swap");let ya=!1,zf=0,Uc=0,Xr=0;function vu(){var n;if(hd.hidden=!ya||!cn,!ya)return;const s=ge.id,t=s!==null?hi(s):null,e=t!==null?(n=Vt.get(t))==null?void 0:n.rag:void 0;dd&&(dd.hidden=t===null||t===s),hd.innerHTML=[`FPS: ${zf}   Ping: ${ge.ping}ms`,`나: P${s??"-"}${ge.isHost?" (HOST)":""}   접속: ${fa().length}   봇: ${Vt.size-fa().length}`,`조종 중인 캐릭터: P${t??"-"}${t===s?" (자기 자신)":""}`,`상태: ${(e==null?void 0:e.state)??"-"}   접지: ${e!=null&&e.grounded?"O":"X"}`,`WS: ${ge.statusText}   Grab: ${tn.length}   Auth: ${Ae?"LOCAL":"REMOTE"}`,"[DEBUG] R:넘어짐 T:리셋 Y:충격 U:점프"].join("<br/>")}let Fc=0;const $w=30,He=s=>Math.round(s*1e3)/1e3;function Kw(){if(Ae){const s=[];for(const n of Vt.values()){const i=[];for(const o of n.rag.bodies)i.push(He(o.position.x),He(o.position.y),He(o.position.z),He(o.quaternion.x),He(o.quaternion.y),He(o.quaternion.z),He(o.quaternion.w));s.push({id:n.id,b:i,st:n.rag.state})}const t=Ui.map(n=>({id:n.id,p:[He(n.body.position.x),He(n.body.position.y),He(n.body.position.z)],r:[He(n.body.quaternion.x),He(n.body.quaternion.y),He(n.body.quaternion.z),He(n.body.quaternion.w)]})),e=Zo;Zo=[],ge.send({type:"snapshot",ragdolls:s,objects:t,game:Ve.snapshot(),...e.length?{sfx:e}:{}})}else{const s=Ve.phase==="playing",{mx:t,mz:e}=s?uu():{mx:0,mz:0},{ax:n,az:i}=Ef(),o={mx:He(t),mz:He(e),ax:He(n),az:He(i),jump:s&&!!be.Space,grab:s&&Mo,trick:s&&So,stop:s&&nr,kick:s&&wo,kp:He(Eo)};ge.send({type:"input",input:o}),Mo=!1,So=!1,nr=!1,wo=!1,Eo=0}}const As=1/60,fd=5,Zw=new c_;let Qs=0,pd=5;function Jw(s){const t=ge.id,e=Ve.phase==="playing"&&!cr(),{mx:n,mz:i}=e?uu():{mx:0,mz:0},{ax:o,az:r}=Ef(),a={mx:n,mz:i,ax:o,az:r,jump:e&&!!be.Space,grab:e&&Mo,trick:e&&So,stop:e&&nr,kick:e&&wo,kp:Eo};if(Ae&&(Mo=!1,So=!1,nr=!1,wo=!1,Eo=0),Ae&&t!==null){for(const u of Vt.values())u.input.moveX=0,u.input.moveZ=0,u.input.jump=!1,u.input.aimX=0,u.input.aimZ=0;const c=(u,f)=>{const h=hi(u),d=Vt.get(h);!d||!e||(d.input.moveX=f.mx,d.input.moveZ=f.mz,d.input.jump=f.jump,d.input.aimX=f.ax??0,d.input.aimZ=f.az??0,f.grab&&(d.grabPending=!0),f.trick&&(d.trickPending=!0),f.stop&&(d.stopPending=!0),f.kick&&(d.kickPending=!0,d.kickPower=f.kp??0))};c(t,a);for(const[u,f]of ir)c(u,f);for(const u of ir.values())u.grab=!1,u.trick=!1,u.stop=!1,u.kick=!1,u.kp=0;const l=[...Vt.values()].filter(u=>!Ie(u.id)&&ji(u.rag).some(f=>f.objectId===fn)).map(u=>u.rag);for(const u of Vt.values()){if(u.grabPending){u.grabPending=!1;const m=ji(u.rag).length>0;m&&fs("drop",u.id);const x=Kh(u.rag);!m&&x&&fs("pickup",u.id);const v=pn();!m&&!x&&v&&Je.requestPickup(u.rag,v)}const f=ji(u.rag),h=[],d=[];for(const m of f){const x=ai.get(m.objectId);if(!x)continue;h.push(x.body),m.constraint||(m.pivotLocal=Ca(x,m.hand));const v=x.body.quaternion.vmult(m.pivotLocal);d.push({hand:m.hand,target:x.body.position.vadd(v),targetVel:x.body.velocity.vadd(x.body.angularVelocity.cross(v))})}if(u.rag.setHeld(h,d),Ie(u.id)){const m=pn();if(m){const x=Rf.update(u.rag,m,s,l);u.input.moveX=x.input.moveX,u.input.moveZ=x.input.moveZ,u.input.jump=!1;for(const v of x.brokeCarry){const M=[...Vt.values()].find(T=>T.rag===v);if(M){for(const T of ji(M.rag)){const b=ai.get(T.objectId);if(b){const E=b.body.position.x-u.rag.pelvis.position.x,C=b.body.position.z-u.rag.pelvis.position.z,R=Math.hypot(E,C)||1;b.body.applyImpulse(new S(E/R*un.bumpImpulse,1.4,C/R*un.bumpImpulse))}}ts(M.rag)}}}else u.input.moveX=0,u.input.moveZ=0}const g=Je.dashDir(u.rag);g&&(u.input.moveX=g.x,u.input.moveZ=g.z);const y=Je.rushDir(u.rag);if(y){const m=lt.rushSteer,x=y.x*(1-m)+u.input.moveX*m,v=y.z*(1-m)+u.input.moveZ*m,M=Math.hypot(x,v)||1;u.input.moveX=x/M,u.input.moveZ=v/M}u.rag.control(s,u.input,_n);const p=pn();if(Je.tick(u.rag,s),p&&!Ie(u.id)){Je.scooping(u.rag)&&ji(u.rag).length===0&&(Je.scoopStep(u.rag,p),Kh(u.rag));const m=ji(u.rag).some(v=>v.objectId===fn);if(u.stopPending&&(u.stopPending=!1,Je.tryStopTurn(u.rag,p,m))){const v=Je.takeTrick(u.rag);v&&ze.dash(v.x,v.z,v.dodgeX,v.dodgeZ),fs("trick",u.id,.9,.72),ii(u.rag)&&(je(.22),yn("스톱턴","급정지 — 달려오는 상대가 지나친다"))}if(u.trickPending&&(u.trickPending=!1,Je.tryTrick(u.rag,p,m))){const v=Je.takeTrick(u.rag);if(v&&(ze.dash(v.x,v.z,v.dodgeX,v.dodgeZ),Jo.set(u.rag,lt.trickLockout+.25),fs("trick",u.id),ii(u.rag))){const M=u.rag.pelvis.position;Ff(M.x,M.z,Ww)?(je(.45),Li("nearmiss",qw,4)||yn("재끼기","공은 한쪽 · 몸은 반대쪽")):(je(.3),yn("재끼기","공은 한쪽 · 몸은 반대쪽"))}}if(u.kickPending){u.kickPending=!1;const v=Je.tryKick(u.rag,p,m,u.kickPower);if(u.kickPower=0,v)Yn={id:u.id,x:v.x,z:v.z,t:performance.now()},ze.kick(v.x,v.y,v.z,v.power),fs("kick",u.id,.55+v.power*.45,1.15-v.power*.25),ii(u.rag)&&je(.25+v.power*.35);else{const M=Je.tryRush(u.rag,p,m);if(M){const T=u.rag.pelvis.position;ze.dash(T.x,T.z,M.x,M.z),fs("step",u.id,1,.55),ii(u.rag)&&je(.18)}}}Je.dribble(u.rag,p,s,m);const x=Je.takeTouch(u.rag);x&&(ze.touch(x.x,x.y,x.z,x.strength),fs("touch",u.id,.4+x.strength*.6)),m&&Je.carryPenalty(u.rag)}else u.trickPending=!1,u.stopPending=!1,u.kickPending=!1}{const u=new Map,f=new Set;for(const h of tn){if(h.ramp+=s,h.constraint){const p=Math.min(1,h.ramp/it.carryRamp);for(const m of h.constraint.equations)m.maxForce=h.holdForce*p,m.minForce=-h.holdForce*p}const d=ai.get(h.objectId);if(!d)continue;const g=`${h.objectId}:${h.ownerRag.pelvis.id}`;if(f.has(g))continue;f.add(g);const y=u.get(d.body)??[];y.push({rag:h.ownerRag,ramp:h.ramp}),u.set(d.body,y)}for(const[h,d]of u)zS(h,d.length);for(const[h,d]of u)gS(_n,h,d)}if(e){const u=[...Vt.values()].map(d=>d.rag),f=kn.update(s,u);YS(),xw(),ww(),Sw(s),Nw(s),Pw(s);const h=[...Co.update(s,u),...f];for(const d of h){if(se.play("hit",{vol:ii(d.rag)?1:.4}),ii(d.rag)&&je(.85),ii(d.rag)){const y=xe.map.goal.z,p=pn();Math.abs(d.rag.pelvis.position.z-y)<20&&p&&Math.abs(p.position.z-y)<20&&(je(1.3),yn("아까비!","골 코앞에서 놓쳤다"))}const g=ji(d.rag);if(g.length>0){for(const y of g){const p=ai.get(y.objectId);p&&p.body.applyImpulse(new S(d.dirX*2.2,1.2,d.dirZ*2.2))}ts(d.rag)}}}_n.step(s);for(const u of Vt.values())u.rag.guard()&&ts(u.rag);e&&hw()}else{for(const[c,l]of fu){const u=Vt.get(c);u&&u.rag.bodies.forEach((f,h)=>{if(h>=l.pos.length)return;const d=new B(f.position.x,f.position.y,f.position.z);d.lerp(l.pos[h],.4),f.position.set(d.x,d.y,d.z);const g=new Ni(f.quaternion.x,f.quaternion.y,f.quaternion.z,f.quaternion.w);g.slerp(l.quat[h],.4),f.quaternion.set(g.x,g.y,g.z,g.w)})}for(const c of Ui){const l=pu.get(c.id);if(!l)continue;const u=new B(c.body.position.x,c.body.position.y,c.body.position.z);u.lerp(l.p,.4),c.body.position.set(u.x,u.y,u.z);const f=new Ni(c.body.quaternion.x,c.body.quaternion.y,c.body.quaternion.z,c.body.quaternion.w);f.slerp(l.q,.4),c.body.quaternion.set(f.x,f.y,f.z,f.w)}_n.step(s)}Ve.update(s)}function Of(){requestAnimationFrame(Of);const s=Math.min(Zw.getDelta(),.25),t=ge.id;{const i=t!==null&&Ve.phase==="playing"?Vt.get(hi(t)):void 0;i&&(Un.R&&i.rag.knockdown(),Un.T&&i.rag.reset(new S(i.rag.pelvis.position.x,it.rideHeight+.3,i.rag.pelvis.position.z)),Un.Y&&i.rag.torso.applyImpulse(new S(60,25,0)),Un.U&&i.rag.pelvis.applyImpulse(new S(0,it.jumpImpulse,0))),Un.R=Un.T=Un.Y=Un.U=!1}Qs+=s,pd>0&&(Qs=Math.min(Qs,As),pd--);let e=0;for(;Qs>=As&&e<fd;)Jw(As),Qs-=As,e++;e>=fd&&(Qs=0);for(const i of Vt.values())i.rag.sync();for(const i of Ui)i.mesh.position.set(i.body.position.x,i.body.position.y,i.body.position.z),i.mesh.quaternion.set(i.body.quaternion.x,i.body.quaternion.y,i.body.quaternion.z,i.body.quaternion.w);const n=t!==null?Vt.get(hi(t)):void 0;n?FS(n.rag.pelvis.position,n.rag.pelvis.velocity,s):NS(s);{const i=n?n.rag.pelvis.position:null,o=i?i.x:0,r=i?i.z:0;xe.sun.position.set(o+17,19,r+11),xe.sun.target.position.set(o,0,r),xe.sun.target.updateMatrixWorld()}KS();{const i=pn();let o=lo>0;for(const[r,a]of Jo){const c=a-s;if(c<=0){Jo.delete(r);continue}Jo.set(r,c),o=!0}o&&i&&Zh%3===0&&ze.trail(i.position.x,i.position.y,i.position.z),Zh++}for(const i of Vt.values())qS(i.rag,s);Hw(s),Gw(),cn&&Vw(),ze.update(s),GS(BS+=s),ew(n?n.rag.pelvis:null),rw(n?n.rag.pelvis:null),pw(n?n.rag.pelvis:null),jw(),Yw(s),Bw(s),Ow(s),Tw(s,n?n.rag:null),Xw(s,n?n.rag:null),zw(s,n?n.rag:null),Dw(n?n.rag:null),_w(),Ve.render(s),da.render(Ls,On),Fc+=s,Fc>=1/$w&&(Fc=0,Kw()),Uc++,Xr+=s,Xr>=.5&&(zf=Math.round(Uc/Xr),Uc=0,Xr=0,vu())}Of();function Qw(){if(cn)return;cn=!0;const s=ge.id;if(s!==null){for(const t of[s,...ge.peers].sort((e,n)=>e-n))Ki(t);Cl(ge.isHost),du(),gu(),se.music(!0);for(const t of["goalbar","help"])document.getElementById(t).hidden=!1;vu()}}yS(ge,{onStart:()=>Qw()});window.__dbg={get yaw(){return Kn},set yaw(s){Kn=s},get pitch(){return oi},set pitch(s){oi=s},get camera(){return On.position.toArray()},look(s,t){const e=gf({yaw:Kn,pitch:oi},s,t);return Kn=e.yaw,oi=e.pitch,{yaw:Kn,pitch:oi}},ballConst:lt,audio:()=>se.status(),move:uu,keys:be,physics:_n,world:xe,net:ge,inGame:()=>cn,grabs:()=>tn.map(s=>{const t=ai.get(s.objectId),e=t?t.body.position.vadd(t.body.quaternion.vmult(s.pivotLocal)):null;return{objectId:s.objectId,constrained:!!s.constraint,ramp:s.ramp,hand:s.hand.position.toArray(),target:e?e.toArray():null,gap:e?s.hand.position.distanceTo(e):null}}),players:()=>[...Vt.values()].map(s=>({id:s.id,pelvis:s.rag.pelvis.position.toArray(),state:s.rag.state,grounded:s.rag.grounded,group:s.rag.pelvis.collisionFilterGroup,mask:s.rag.pelvis.collisionFilterMask})),objects:()=>Ui.map(s=>({id:s.id,mass:s.body.mass,type:s.body.type,p:s.body.position.toArray(),group:s.body.collisionFilterGroup,mask:s.body.collisionFilterMask})),obj:s=>ai.get(s).body.position.toArray(),spawn:s=>(Ki(s),[...Vt.keys()]),outfit:_f,controlled:()=>ge.id!==null?hi(ge.id):null,authority:()=>Ae,phase:()=>Ve.phase,pressE:()=>{Mo=!0},pressTrick:()=>{So=!0},pressKick:()=>{wo=!0},setBots:s=>{for(const e of[...Vt.keys()])Ie(e)&&Aa(e);const t=xe.map.botSpawns??[];for(let e=0;e<Math.min(s,t.length);e++)Ki(-(e+1),t[e]);return[...Vt.keys()].filter(Ie)},bots:()=>[...Vt.values()].filter(s=>Ie(s.id)).map(s=>({id:s.id,pos:s.rag.pelvis.position.toArray().map(t=>+t.toFixed(2)),state:s.rag.state,input:[+s.input.moveX.toFixed(2),+s.input.moveZ.toFixed(2)]})),hazards:()=>Co.stations.map(s=>({id:s.spec.id,phase:s.phase,timer:+s.timer.toFixed(2),pos:s.body.position.toArray().map(t=>+t.toFixed(2))})),ball:()=>{const s=pn();if(!s)return null;const t=ge.id!==null?Vt.get(hi(ge.id)):void 0;return{p:s.position.toArray(),v:s.velocity.toArray(),w:s.angularVelocity.toArray(),speed:Math.hypot(s.velocity.x,s.velocity.z),spin:s.angularVelocity.length(),heldBy:tn.filter(e=>e.objectId===fn).length,distToPlayer:t?Math.hypot(s.position.x-t.rag.pelvis.position.x,s.position.z-t.rag.pelvis.position.z):null,trickCooldown:t?Je.cooldownOf(t.rag):null}},teleport(s,t){const e=ge.id;if(e===null)return null;const n=Vt.get(hi(e));return n?(ts(n.rag),n.rag.reset(new S(s,it.rideHeight+.15,t)),n.rag.pelvis.position.toArray()):null}};
