(function(){"use strict";var t={1688:function(t,e,n){n(6992),n(8674),n(9601),n(7727);var o=n(8935),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("AppNavbar",{attrs:{title:"Granblue Fantasy - Beautify Honors"}}),n("b-container",[n("HonorForm",{attrs:{"prop-expected-honors":t.expectedHonors,"prop-current-honors":t.currentHonors,"prop-has-solution":t.hasSolution},on:{"update:propExpectedHonors":function(e){t.expectedHonors=e},"update:prop-expected-honors":function(e){t.expectedHonors=e},"update:propCurrentHonors":function(e){t.currentHonors=e},"update:prop-current-honors":function(e){t.currentHonors=e},"update:propHasSolution":function(e){t.hasSolution=e},"update:prop-has-solution":function(e){t.hasSolution=e}}}),n("HonorEditableTable",{attrs:{"prop-diff-honors":t.diffHonors,"prop-has-solution":t.hasSolution},on:{"update:propHasSolution":function(e){t.hasSolution=e},"update:prop-has-solution":function(e){t.hasSolution=e}}})],1)],1)},a=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-navbar",{attrs:{variant:"primary",type:"dark"}},[n("b-navbar-brand",{staticClass:"mb-0",attrs:{tag:"h1"}},[t._v(t._s(t.title))]),n("b-navbar-nav",{staticClass:"ml-auto"},[n("b-navbar-brand",{attrs:{href:"https://github.com/qq88976321/gbf-beautify-honors-web"}},[n("b-icon",{attrs:{icon:"github"}})],1)],1)],1)},s=[],u={props:{title:String}},l=u,c=n(1001),p=(0,c.Z)(l,i,s,!1,null,null,null),d=p.exports,f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"form-group-container"},[n("HonorFormInput",{attrs:{label:"Current Honors","prop-honors":t.currentHonors},on:{"update:propHonors":function(e){t.currentHonors=e},"update:prop-honors":function(e){t.currentHonors=e}}}),n("HonorFormInput",{attrs:{label:"Expected Honors","prop-honors":t.expectedHonors},on:{"update:propHonors":function(e){t.expectedHonors=e},"update:prop-honors":function(e){t.expectedHonors=e}}}),n("b-form-group",{attrs:{state:t.diffHonorsState,"invalid-feedback":t.diffHonorsInvalidFeedback,label:"How many honors do you need to get","label-for":"diff-honors"}},[n("b-form-input",{attrs:{disabled:"",id:"diff-honors",state:t.diffHonorsState,value:t.diffHonors}})],1)],1)},m=[],h=(n(9653),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"form-group-container"},[n("b-form-group",{attrs:{state:t.honorsState,"invalid-feedback":t.honorsInvalidFeedback,label:t.label,"label-for":t.label}},[n("b-form-input",{attrs:{type:"number",id:t.label,state:t.honorsState},model:{value:t.honors,callback:function(e){t.honors=t._n(e)},expression:"honors"}})],1)],1)}),b=[],v={props:{label:[String],propHonors:[Number,String]},computed:{honors:{get:function(){return this.propHonors},set:function(t){this.$emit("update:propHonors",t)}},honorsState:function(){return this.propHonors>=0&&this.propHonors<1e11},honorsInvalidFeedback:function(){return this.propHonors<0?"Expected honors must be a positive integer":this.propHonors>=1e11?"Expected honors must be less than 100 billion.":""}}},H=v,g=(0,c.Z)(H,h,b,!1,null,null,null),x=g.exports,y={components:{HonorFormInput:x},props:{propCurrentHonors:[Number,String],propExpectedHonors:[Number,String],propHasSolution:Boolean},computed:{currentHonors:{get:function(){return this.propCurrentHonors},set:function(t){this.$emit("update:propCurrentHonors",t)}},expectedHonors:{get:function(){return this.propExpectedHonors},set:function(t){this.$emit("update:propExpectedHonors",t)}},diffHonors:function(){return this.expectedHonors-this.currentHonors},diffHonorsState:function(){return this.propHasSolution},diffHonorsInvalidFeedback:function(){return"There is no solution to achieve the expected honors. Please relax the constraints and try again."}}},S=y,k=(0,c.Z)(S,f,m,!1,null,null,null),w=k.exports,_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"table-container"},[n("b-row",{attrs:{"align-h":"between"}},[n("b-col",[n("b-button",{attrs:{variant:"primary"},on:{click:function(e){return t.handleAdd()}}},[t._v(" Add Action ")])],1),n("b-col",[n("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.confirm-restore-default-modal",modifiers:{"confirm-restore-default-modal":!0}}],staticClass:"float-right",attrs:{variant:"danger"}},[t._v(" Restore Default Actions ")])],1)],1),n("b-modal",{attrs:{id:"confirm-restore-default-modal",centered:"",title:"Confirmation","ok-variant":"danger","ok-title":"Yes","cancel-title":"No"},on:{ok:function(e){return t.handleRestoreDefault()}}},[t._v(" This action cannot be undone. Are you sure you want to restore to the default actions? ")]),n("b-editable-table",{staticClass:"editable-table",attrs:{rowUpdate:t.rowUpdate,bordered:"",fields:t.fields},on:{"input-change":t.handleInput},scopedSlots:t._u([{key:"cell(delete)",fn:function(e){return[n("b-icon",{staticClass:"remove-icon",attrs:{icon:"trash"},on:{click:function(n){return t.handleDelete(e)}}})]}},{key:"head(honors)",fn:function(e){return[n("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticStyle:{"text-decoration":"underline dotted"},attrs:{title:"The exact honor earned from this action."}},[t._v(t._s(e.label))])]}},{key:"head(maxTimes)",fn:function(e){return[n("span",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],staticStyle:{"text-decoration":"underline dotted"},attrs:{title:"Max acceptable times of this action."}},[t._v(t._s(e.label))])]}},{key:"cell(optimal)",fn:function(e){return[t._v(" "+t._s(t.optimalTimes[e.index])+" ")]}}]),model:{value:t.items,callback:function(e){t.items=e},expression:"items"}})],1)},T=[],E=n(4479),Z=n(6198),O=(n(3290),n(1249),n(2222),n(8862),n(8975),n(528)),C=n(8282),N=n(905),A=[{id:(0,N.Z)(),action:"Eyeball N (0 button)",honors:4e3,maxTimes:10},{id:(0,N.Z)(),action:"Eyeball H (0 button)",honors:6e3,maxTimes:10},{id:(0,N.Z)(),action:"Eyeball VH (0 button)",honors:8e3,maxTimes:10},{id:(0,N.Z)(),action:"Meat Beast VH (0 button)",honors:21400,maxTimes:30},{id:(0,N.Z)(),action:"Meat Beast EX (0 button)",honors:50578,maxTimes:30},{id:(0,N.Z)(),action:"Meat Beast EX+ (0 button)",honors:80800,maxTimes:30},{id:(0,N.Z)(),action:"Meat Beast EX+ (1 summon + attack only)",honors:80810,maxTimes:30},{id:(0,N.Z)(),action:"Join raid and only use Break Assassin",honors:1,maxTimes:10}],F={created:function(){var t=this;return(0,Z.Z)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,C.Z)();case 2:return t.glpk=e.sent,e.next=5,t.solve();case 5:case"end":return e.stop()}}),e)})))()},components:{BEditableTable:O.Z},props:{propDiffHonors:[Number,String],propHasSolution:Boolean},computed:{hasSolution:{get:function(){return this.propHasSolution},set:function(t){this.$emit("update:propHasSolution",t)}}},data:function(){return{glpk:null,fields:[{key:"delete",label:""},{key:"action",label:"Action",type:"text",editable:!0,placeholder:"Enter Action...",class:"action-col"},{key:"honors",label:"Honors",type:"number",min:"0",max:"5000000",editable:!0,class:"honors-col"},{key:"maxTimes",label:"Max times",type:"number",min:"0",max:"1000",editable:!0,placeholder:"Enter Max times...",class:"max-times-col"},{key:"optimal",label:"Optimal times",type:"number",editable:!1,class:"optimal-times-col",variant:""}],items:A,optimalTimes:Array(7).fill("-"),rowUpdate:{}}},methods:{handleInput:function(){},handleAdd:function(){var t=(0,N.Z)();this.rowUpdate={edit:!1,id:t,action:"add",data:{id:t,action:"New Action",honors:0,maxTimes:10}}},handleRestoreDefault:function(){this.items=A},handleDelete:function(t){this.rowUpdate={id:t.id,action:"delete"}},solve:function(){var t=this;return(0,Z.Z)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.glpk){e.next=2;break}return e.abrupt("return");case 2:return n={name:"LP",generals:t.items.map((function(t){return t.id})),objective:{direction:t.glpk.GLP_MIN,name:"obj",vars:t.items.map((function(t){return{name:t.id,coef:1}}))},subjectTo:[{name:"total",vars:t.items.map((function(t){return{name:t.id,coef:t.honors}})),bnds:{type:t.glpk.GLP_FX,ub:t.propDiffHonors,lb:t.propDiffHonors}}].concat((0,E.Z)(t.items.map((function(e){return{name:"max times of ".concat(e.id,", action name=").concat(e.action),vars:[{name:e.id,coef:1}],bnds:0==e.maxTimes?{type:t.glpk.GLP_FX,ub:0,lb:0}:{type:t.glpk.GLP_DB,ub:parseInt(e.maxTimes),lb:0}}}))))},e.abrupt("return",t.glpk.solve(n).then((function(e){e.result.status==t.glpk.GLP_OPT?(t.optimalTimes=t.items.map((function(t){return e.result.vars[t.id]})),t.hasSolution=!0):(t.optimalTimes=t.items.map((function(){return"-"})),t.hasSolution=!1)})).catch((function(t){return console.log(t)})));case 4:case"end":return e.stop()}}),e)})))()}},mounted:function(){if(localStorage.items)try{this.items=JSON.parse(localStorage.items)}catch(t){console.error(t)}},watch:{propDiffHonors:function(){var t=(0,Z.Z)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.solve();case 2:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),items:function(){var t=(0,Z.Z)(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=JSON.stringify(e),localStorage.items=n,t.next=4,this.solve();case 4:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),hasSolution:function(){this.hasSolution?this.fields[this.fields.length-1].variant="info":this.fields[this.fields.length-1].variant="danger"}}},P=F,j=(0,c.Z)(P,_,T,!1,null,null,null),I=j.exports,M={components:{AppNavbar:d,HonorForm:w,HonorEditableTable:I},computed:{diffHonors:function(){return this.expectedHonors-this.currentHonors}},data:function(){return{currentHonors:0,expectedHonors:0,hasSolution:null}},mounted:function(){localStorage.currentHonors&&(this.currentHonors=localStorage.currentHonors),localStorage.expectedHonors&&(this.expectedHonors=localStorage.expectedHonors)},watch:{currentHonors:function(t){localStorage.currentHonors=t},expectedHonors:function(t){localStorage.expectedHonors=t}}},R=M,B=(0,c.Z)(R,r,a,!1,null,null,null),D=B.exports,$=n(8262),G=n(3266);n(44);o["default"].use($.XG7),o["default"].use(G.A7),o["default"].config.productionTip=!1,new o["default"]({render:function(t){return t(D)}}).$mount("#app")}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var a=e[o]={id:o,loaded:!1,exports:{}};return t[o](a,a.exports,n),a.loaded=!0,a.exports}n.m=t,function(){var t=[];n.O=function(e,o,r,a){if(!o){var i=1/0;for(c=0;c<t.length;c++){o=t[c][0],r=t[c][1],a=t[c][2];for(var s=!0,u=0;u<o.length;u++)(!1&a||i>=a)&&Object.keys(n.O).every((function(t){return n.O[t](o[u])}))?o.splice(u--,1):(s=!1,a<i&&(i=a));if(s){t.splice(c--,1);var l=r();void 0!==l&&(e=l)}}return e}a=a||0;for(var c=t.length;c>0&&t[c-1][2]>a;c--)t[c]=t[c-1];t[c]=[o,r,a]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){n.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,o){var r,a,i=o[0],s=o[1],u=o[2],l=0;if(i.some((function(e){return 0!==t[e]}))){for(r in s)n.o(s,r)&&(n.m[r]=s[r]);if(u)var c=u(n)}for(e&&e(o);l<i.length;l++)a=i[l],n.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return n.O(c)},o=self["webpackChunkgbf_beautify_honors_web"]=self["webpackChunkgbf_beautify_honors_web"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(1688)}));o=n.O(o)})();
//# sourceMappingURL=app-legacy.6844e0ec.js.map