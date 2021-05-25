(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"+BJ4":function(t,e,n){"use strict";n("rvdV")},18:function(t,e,n){t.exports=n("ntcu")},"9tPo":function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,o=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(t,e){var i,r=e.trim().replace(/^"(.*)"$/,(function(t,e){return e})).replace(/^'(.*)'$/,(function(t,e){return e}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r)?t:(i=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:o+r.replace(/^\.\//,""),"url("+JSON.stringify(i)+")")}))}},BzCV:function(t,e,n){"use strict";n.r(e);var o=n("la7V");function i(t){return function(t){if(Array.isArray(t))return r(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}Vue.use(o.a);var s={props:["collection-id","collection-title","collection-description","collection-visibility","profile-id","profile-username"],data:function(){return{config:window.App.config,loaded:!1,posts:[],ids:[],currentUser:!1,owner:!1,title:this.collectionTitle,description:this.collectionDescription,visibility:this.collectionVisibility,photoId:"",postsList:[],loadingPostList:!1,addingPostToCollection:!1,markedForDeletion:[]}},beforeMount:function(){this.fetchCurrentUser(),this.fetchItems()},mounted:function(){},methods:{fetchCurrentUser:function(){var t=this;1==document.querySelectorAll("body")[0].classList.contains("loggedIn")&&axios.get("/api/pixelfed/v1/accounts/verify_credentials").then((function(e){t.currentUser=e.data,t.owner=t.currentUser.id==t.profileId,window._sharedData.curUser=e.data,window.App.util.navatar()}))},fetchItems:function(){var t=this;axios.get("/api/local/collection/items/"+this.collectionId).then((function(e){t.posts=e.data,t.ids=t.posts.map((function(t){return t.id})),t.loaded=!0}))},previewUrl:function(t){return t.sensitive?"/storage/no-preview.png?v="+(new Date).getTime():t.media_attachments[0].preview_url},previewBackground:function(t){return"background-image: url("+this.previewUrl(t)+");"},addToCollection:function(){var t=this;this.loadingPostList=!0,0==this.postsList.length?axios.get("/api/pixelfed/v1/accounts/"+this.profileId+"/statuses",{params:{min_id:1,limit:13}}).then((function(e){t.postsList=e.data.filter((function(e){return-1==t.ids.indexOf(e.id)})).splice(0,9),t.loadingPostList=!1,t.$refs.addPhotoModal.show()})).catch((function(e){t.loadingPostList=!1,swal("An Error Occured","We cannot process your request at this time, please try again later.","error")})):(this.$refs.addPhotoModal.show(),this.loadingPostList=!1)},pushId:function(){var t=this,e=this.config.uploader.max_collection_length,n=this;if(this.posts.length>=e)swal("Error","You can only add "+e+" posts per collection","error");else{var o=this.photoId,r=window.location.origin,s=o.split("/");o.slice(0,r.length)!==r&&(swal("Invalid URL","You can only add posts from this instance","error"),this.photoId=""),o.slice(0,r.length+3)===r+"/p/"&&6===s.length||(swal("Invalid URL","Invalid URL","error"),this.photoId=""),axios.post("/api/local/collection/item",{collection_id:this.collectionId,post_id:s[5]}).then((function(t){var e;(e=n.ids).push.apply(e,i(s[5]))})).catch((function(e){swal("Invalid URL","The post you entered was invalid","error"),t.photoId=""})),n.$refs.addPhotoModal.hide(),window.location.reload()}},editCollection:function(){this.$refs.editModal.show()},deleteCollection:function(){0!=this.owner&&(window.confirm("Are you sure you want to delete this collection?")&&axios.delete("/api/local/collection/"+this.collectionId).then((function(t){window.location.href="/"})))},updateCollection:function(){this.$refs.editModal.hide(),axios.post("/api/local/collection/"+this.collectionId,{title:this.title,description:this.description,visibility:this.visibility}).then((function(t){console.log(t.data)}))},showEditPhotosModal:function(){this.$refs.editModal.hide(),this.$refs.editPhotosModal.show()},markPhotoForDeletion:function(t){-1==this.markedForDeletion.indexOf(t)?this.markedForDeletion.push(t):this.markedForDeletion=this.markedForDeletion.filter((function(e){return e!=t}))},confirmDeletion:function(){var t=this,e=this;window.confirm("Are you sure you want to delete this?")&&(this.markedForDeletion.forEach((function(n){axios.delete("/api/local/collection/item",{params:{collection_id:e.collectionId,post_id:n}}).then((function(o){e.removeItem(n),t.$refs.editPhotosModal.hide()})).catch((function(t){swal("Oops!","An error occured with your request, please try again later.","error")}))})),this.markedForDeletion=[])},removeItem:function(t){this.posts=this.posts.filter((function(e){return e.id!=t}))},addRecentId:function(t){var e=this;axios.post("/api/local/collection/item",{collection_id:this.collectionId,post_id:t.id}).then((function(t){window.location.reload()})).catch((function(t){swal("Oops!","An error occured, please try selecting another post.","error"),e.photoId=""}))}}},a=(n("+BJ4"),n("KHd+")),l=Object(a.a)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w-100 h-100"},[t.loaded?t._e():n("div",{staticClass:"d-flex justify-content-center align-items-center",staticStyle:{height:"80vh"}},[n("img",{attrs:{src:"/img/pixelfed-icon-grey.svg"}})]),t._v(" "),t.loaded?n("div",{staticClass:"row mt-3"},[n("div",{staticClass:"col-12 p-0 mb-3"},[n("picture",{staticClass:"d-flex align-items-center justify-content-center"},[n("div",{staticClass:"dims"}),t._v(" "),n("div",{staticClass:"text-white",staticStyle:{"z-index":"500",position:"absolute"}},[n("p",{staticClass:"display-4 text-center pt-3"},[t._v(t._s(t.title||"Untitled Collection"))]),t._v(" "),n("p",{staticClass:"lead text-center mb-3"},[t._v(t._s(t.description))]),t._v(" "),n("p",{staticClass:"text-center"},[t._v("\n\t\t\t\t\t\t"+t._s(t.posts.length)+" photos · by "),n("a",{staticClass:"font-weight-bold text-white",attrs:{href:"/"+t.profileUsername}},[t._v(t._s(t.profileUsername))])]),t._v(" "),1==t.owner?n("p",{staticClass:"pt-3 text-center"},[n("span",[n("button",{staticClass:"btn btn-outline-light btn-sm",attrs:{onclick:"this.blur();"},on:{click:function(e){return e.preventDefault(),t.addToCollection(e)}}},[0==t.loadingPostList?n("span",[t._v("Add Photo")]):n("span",{staticClass:"px-4"},[t._m(0)])]),t._v("\n\t\t\t\t\t\t\t     \n\t\t\t\t\t\t\t"),n("button",{staticClass:"btn btn-outline-light btn-sm",attrs:{onclick:"this.blur();"},on:{click:function(e){return e.preventDefault(),t.editCollection(e)}}},[t._v("Edit")]),t._v("\n\t\t\t\t\t\t\t     \n\t\t\t\t\t\t\t"),n("button",{staticClass:"btn btn-outline-light btn-sm",on:{click:function(e){return e.preventDefault(),t.deleteCollection(e)}}},[t._v("Delete")])])]):t._e()]),t._v(" "),n("img",{staticStyle:{width:"100%",height:"600px","object-fit":"cover"},attrs:{src:t.previewUrl(t.posts[0]),alt:""}})])]),t._v(" "),n("div",{staticClass:"col-12 p-0"},[n("masonry",{attrs:{cols:{default:2,700:2,400:1},gutter:{default:"5px"}}},t._l(t.posts,(function(e,o){return n("div",[n("a",{staticClass:"card info-overlay card-md-border-0 mb-1",attrs:{href:e.url}},[n("img",{staticClass:"img-fluid w-100",attrs:{src:t.previewUrl(e)}})])])})),0)],1)]):t._e(),t._v(" "),n("b-modal",{ref:"editModal",attrs:{id:"edit-modal","hide-footer":"",centered:"",title:"Edit Collection","body-class":""}},[n("form",[n("div",{staticClass:"form-group"},[n("label",{staticClass:"font-weight-bold text-muted",attrs:{for:"title"}},[t._v("Title")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"form-control",attrs:{type:"text",id:"title",placeholder:"Untitled Collection"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-group"},[n("label",{staticClass:"font-weight-bold text-muted",attrs:{for:"description"}},[t._v("Description")]),t._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"form-control",attrs:{id:"description",placeholder:"Add a description here ...",rows:"3"},domProps:{value:t.description},on:{input:function(e){e.target.composing||(t.description=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"form-group"},[n("label",{staticClass:"font-weight-bold text-muted",attrs:{for:"visibility"}},[t._v("Visibility")]),t._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.visibility,expression:"visibility"}],staticClass:"custom-select",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.visibility=e.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"public"}},[t._v("Public")]),t._v(" "),n("option",{attrs:{value:"private"}},[t._v("Followers Only")])])]),t._v(" "),n("div",{staticClass:"d-flex justify-content-between align-items-center pt-3"},[n("a",{staticClass:"text-primary font-weight-bold text-decoration-none",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.showEditPhotosModal(e)}}},[t._v("Edit Photos")]),t._v(" "),n("button",{staticClass:"btn btn-primary btn-sm py-1 font-weight-bold px-3 float-right",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.updateCollection(e)}}},[t._v("Save")])])])]),t._v(" "),n("b-modal",{ref:"addPhotoModal",attrs:{id:"add-photo-modal","hide-footer":"",centered:"",title:"Add Photo","body-class":"m-3"}},[n("div",{staticClass:"form-group"},[n("label",{staticClass:"font-weight-bold text-muted",attrs:{for:"title"}},[t._v("Add Recent Post")]),t._v(" "),t.postsList.length>0?n("div",{staticClass:"row m-1"},[t._l(t.postsList,(function(e,o){return n("div",{key:"postList-"+o,staticClass:"col-4 p-1 cursor-pointer",on:{click:function(n){return t.addRecentId(e)}}},[n("div",{staticClass:"square"},[n("div",{staticClass:"square-content",style:"background-image: url("+e.media_attachments[0].url+");"})])])})),t._v(" "),n("div",{staticClass:"col-12"},[n("hr")])],2):t._e()]),t._v(" "),n("form",[n("div",{staticClass:"form-group"},[n("label",{staticClass:"font-weight-bold text-muted",attrs:{for:"title"}},[t._v("Add Post by URL")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.photoId,expression:"photoId"}],staticClass:"form-control",attrs:{type:"text",placeholder:"https://pixelfed.dev/p/admin/1"},domProps:{value:t.photoId},on:{input:function(e){e.target.composing||(t.photoId=e.target.value)}}}),t._v(" "),n("p",{staticClass:"help-text small text-muted"},[t._v("Only local, public posts can be added")])]),t._v(" "),n("button",{staticClass:"btn btn-primary btn-sm py-1 font-weight-bold px-3 float-right",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.pushId(e)}}},[t.addingPostToCollection?n("span",{staticClass:"px-4"},[n("div",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status"}},[n("span",{staticClass:"sr-only"},[t._v("Loading...")])])]):n("span",[t._v("\n\t\t\t\t\tAdd Photo\n\t\t\t\t")])])])]),t._v(" "),n("b-modal",{ref:"editPhotosModal",attrs:{id:"edit-photos-modal","hide-footer":"",centered:"",title:"Edit Collection Photos","body-class":"m-3"}},[n("div",{staticClass:"form-group"},[n("p",{staticClass:"font-weight-bold text-dark text-center"},[t._v("Select a Photo to Delete")]),t._v(" "),t.posts.length>0?n("div",{staticClass:"row m-1 scrollbar-hidden",staticStyle:{"max-height":"350px","overflow-y":"auto"}},t._l(t.posts,(function(e,o){return n("div",{key:"plm-"+o,staticClass:"col-4 p-1 cursor-pointer"},[n("div",{class:[-1==t.markedForDeletion.indexOf(e.id)?"square":"square  delete-border"],on:{click:function(n){return t.markPhotoForDeletion(e.id)}}},[n("div",{staticClass:"square-content",style:"background-image: url("+e.media_attachments[0].url+");"})])])})),0):t._e(),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.markedForDeletion.length>0,expression:"markedForDeletion.length > 0"}]},[n("button",{staticClass:"btn btn-primary font-weight-bold py-0 btn-block mb-0 mt-4",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.confirmDeletion(e)}}},[t._v("Delete "+t._s(t.markedForDeletion.length)+" "+t._s(1==t.markedForDeletion.length?"photo":"photos"))])])])])],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status"}},[e("span",{staticClass:"sr-only"},[this._v("Loading...")])])}],!1,null,"77a83cb3",null);e.default=l.exports},I1BE:function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"==typeof btoa){var i=(s=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),r=o.sources.map((function(t){return"/*# sourceURL="+o.sourceRoot+t+" */"}));return[n].concat(r).concat([i]).join("\n")}var s;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n})).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(o[r]=!0)}for(i=0;i<t.length;i++){var s=t[i];"number"==typeof s[0]&&o[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},"KHd+":function(t,e,n){"use strict";function o(t,e,n,o,i,r,s,a){var l,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),o&&(c.functional=!0),r&&(c._scopeId="data-v-"+r),s?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},c._ssrRegister=l):i&&(l=a?function(){i.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:i),l)if(c.functional){c._injectStyles=l;var d=c.render;c.render=function(t,e){return l.call(e),d(t,e)}}else{var u=c.beforeCreate;c.beforeCreate=u?[].concat(u,l):[l]}return{exports:t,options:c}}n.d(e,"a",(function(){return o}))},SoX8:function(t,e,n){(t.exports=n("I1BE")(!1)).push([t.i,"\n.dims[data-v-77a83cb3] {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tbottom: 0;\n\tleft: 0;\n\tbackground: rgba(0,0,0,.68);\n\tz-index: 300;\n}\n.scrollbar-hidden[data-v-77a83cb3]::-webkit-scrollbar {\n\tdisplay: none;\n}\n.delete-border[data-v-77a83cb3] {\n\tborder: 4px solid #ff0000;\n}\n.delete-border .square-content[data-v-77a83cb3] {\n\tbackground-color: red;\n\tbackground-blend-mode: screen;\n}\n",""])},"aET+":function(t,e,n){var o,i,r={},s=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===i&&(i=o.apply(this,arguments)),i}),a=function(t,e){return e?e.querySelector(t):document.querySelector(t)},l=function(t){var e={};return function(t,n){if("function"==typeof t)return t();if(void 0===e[t]){var o=a.call(this,t,n);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(t){o=null}e[t]=o}return e[t]}}(),c=null,d=0,u=[],f=n("9tPo");function p(t,e){for(var n=0;n<t.length;n++){var o=t[n],i=r[o.id];if(i){i.refs++;for(var s=0;s<i.parts.length;s++)i.parts[s](o.parts[s]);for(;s<o.parts.length;s++)i.parts.push(y(o.parts[s],e))}else{var a=[];for(s=0;s<o.parts.length;s++)a.push(y(o.parts[s],e));r[o.id]={id:o.id,refs:1,parts:a}}}}function h(t,e){for(var n=[],o={},i=0;i<t.length;i++){var r=t[i],s=e.base?r[0]+e.base:r[0],a={css:r[1],media:r[2],sourceMap:r[3]};o[s]?o[s].parts.push(a):n.push(o[s]={id:s,parts:[a]})}return n}function v(t,e){var n=l(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=u[u.length-1];if("top"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),u.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var i=l(t.insertAt.before,n);n.insertBefore(e,i)}}function m(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=u.indexOf(t);e>=0&&u.splice(e,1)}function b(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var o=function(){0;return n.nc}();o&&(t.attrs.nonce=o)}return g(e,t.attrs),v(t,e),e}function g(t,e){Object.keys(e).forEach((function(n){t.setAttribute(n,e[n])}))}function y(t,e){var n,o,i,r;if(e.transform&&t.css){if(!(r="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=r}if(e.singleton){var s=d++;n=c||(c=b(e)),o=_.bind(null,n,s,!1),i=_.bind(null,n,s,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",g(e,t.attrs),v(t,e),e}(e),o=I.bind(null,n,e),i=function(){m(n),n.href&&URL.revokeObjectURL(n.href)}):(n=b(e),o=x.bind(null,n),i=function(){m(n)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else i()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=s()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=h(t,e);return p(n,e),function(t){for(var o=[],i=0;i<n.length;i++){var s=n[i];(a=r[s.id]).refs--,o.push(a)}t&&p(h(t,e),e);for(i=0;i<o.length;i++){var a;if(0===(a=o[i]).refs){for(var l=0;l<a.parts.length;l++)a.parts[l]();delete r[a.id]}}}};var w,C=(w=[],function(t,e){return w[t]=e,w.filter(Boolean).join("\n")});function _(t,e,n,o){var i=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=C(e,i);else{var r=document.createTextNode(i),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(r,s[e]):t.appendChild(r)}}function x(t,e){var n=e.css,o=e.media;if(o&&t.setAttribute("media",o),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function I(t,e,n){var o=n.css,i=n.sourceMap,r=void 0===e.convertToAbsoluteUrls&&i;(e.convertToAbsoluteUrls||r)&&(o=f(o)),i&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var s=new Blob([o],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}},la7V:function(t,e,n){"use strict";var o={tag:{type:[String],default:"div"},cols:{type:[Object,Number,String],default:2},gutter:{type:[Object,Number,String],default:0},css:{type:[Boolean],default:!0},columnTag:{type:[String],default:"div"},columnClass:{type:[String,Array,Object],default:function(){return[]}},columnAttr:{type:[Object],default:function(){return{}}}},i=function(t,e){if(parseInt(t)>-1)return t;if("object"!=typeof t)return 0;var n=1/0,o=t.default||0;for(var i in t){var r=parseInt(i),s=t[r],a=parseInt(s);if(!isNaN(r)&&!isNaN(a))e<=r&&r<n&&(n=r,o=s)}return o},r={props:o,data:function(){return{displayColumns:2,displayGutter:0}},mounted:function(){var t=this;this.$nextTick((function(){t.reCalculate()})),window&&window.addEventListener("resize",this.reCalculate)},updated:function(){var t=this;this.$nextTick((function(){t.reCalculate()}))},beforeDestroy:function(){window&&window.removeEventListener("resize",this.reCalculate)},methods:{reCalculate:function(){var t=this.windowWidth;this.windowWidth=(window?window.innerWidth:null)||1/0,t!==this.windowWidth&&(this._reCalculateColumnCount(this.windowWidth),this._reCalculateGutterSize(this.windowWidth))},_reCalculateGutterSize:function(t){this.displayGutter=i(this.gutter,t)},_reCalculateColumnCount:function(t){var e=i(this.cols,t);e=Math.max(1,Number(e)||0),this.displayColumns=e},_getChildItemsInColumnsArray:function(){var t=[],e=this.$slots.default||[];1===e.length&&e[0].componentOptions&&"transition-group"==e[0].componentOptions.tag&&(e=e[0].componentOptions.children);for(var n=0,o=0;n<e.length;n++,o++)if(e[n].tag){var i=o%this.displayColumns;t[i]||(t[i]=[]),t[i].push(e[n])}else o--;return t}},render:function(t){var e=this,n=this._getChildItemsInColumnsArray(),o=parseInt(this.displayGutter)===1*this.displayGutter?this.displayGutter+"px":this.displayGutter,i={boxSizing:"border-box",backgroundClip:"padding-box",width:100/this.displayColumns+"%",border:"0 solid transparent",borderLeftWidth:o},r=n.map((function(o,r){return t(e.columnTag,{key:r+"-"+n.length,style:e.css?i:null,class:e.columnClass,attrs:e.columnAttr},o)})),s={display:["-webkit-box","-ms-flexbox","flex"],marginLeft:"-"+o};return t(this.tag,this.css?{style:s}:null,r)}},s=function(){};s.install=function(t,e){s.installed||(e&&e.name?t.component(e.name,r):t.component("masonry",r))},"undefined"!=typeof window&&window.Vue&&window.Vue.use(s),e.a=s},ntcu:function(t,e,n){Vue.component("collection-component",n("BzCV").default)},rvdV:function(t,e,n){var o=n("SoX8");"string"==typeof o&&(o=[[t.i,o,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(o,i);o.locals&&(t.exports=o.locals)}},[[18,0]]]);