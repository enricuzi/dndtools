(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],{35:function(e,t,a){e.exports=a.p+"static/media/north-west-gate.1fb9d39e.jpg"},36:function(e,t,a){e.exports=a.p+"static/media/north-east-gate.54300b9a.jpg"},37:function(e,t,a){e.exports=a.p+"static/media/north-gate.a2e473f2.jpg"},38:function(e,t,a){e.exports=a.p+"static/media/west-gate.7e955c33.jpg"},39:function(e,t,a){e.exports=a.p+"static/media/central-gate.f33b04f9.jpg"},40:function(e,t,a){e.exports=a.p+"static/media/east-gate.7b6ef059.jpg"},41:function(e,t,a){e.exports=a.p+"static/media/south-west-gate.7e955c33.jpg"},42:function(e,t,a){e.exports=a.p+"static/media/south-gate.25ae3350.jpg"},43:function(e,t,a){e.exports=a.p+"static/media/south-east-gate.04dfecff.jpg"},44:function(e,t,a){e.exports=a(83)},49:function(e,t,a){},50:function(e,t,a){},79:function(e,t){},82:function(e,t,a){},83:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),s=a(33),c=a.n(s),i=(a(49),a(2)),r=a(3),l=a(5),u=a(4),m=a(1),g=a(6),h=(a(50),function(){function e(t){Object(i.a)(this,e),this.componentName="string"===typeof t?t:t.constructor.name}return Object(r.a)(e,[{key:"log",value:function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];t.splice(0,0,"-"),t.splice(0,0,this.componentName),console.log.apply(console,t)}},{key:"error",value:function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];t.splice(0,0,"-"),t.splice(0,0,this.componentName),console.error.apply(console,t)}}]),e}()),v=function(e){return o.a.createElement("img",{alt:e.alt,src:e.src,onLoad:function(t){return e.onImageLoad(t.target)}})},p=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).logger=new h("MapLayer"),a.r1=50,a.r2=150,a.density=.4,a.overlay="rgba( 0, 0, 0, 1 )",a.baseMapImage=null,a.onMouseMove=a.onMouseMove.bind(Object(m.a)(a)),a.onMouseDown=a.onMouseDown.bind(Object(m.a)(a)),a.onMouseUp=a.onMouseUp.bind(Object(m.a)(a)),a.getDataImage=a.getDataImage.bind(Object(m.a)(a)),a.onImageLoad=a.onImageLoad.bind(Object(m.a)(a)),a}return Object(g.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.contextFog=this.canvasFog.getContext("2d"),this.canvasFog.addEventListener("touchstart",(function(t){(function(e,t){var a=e.getBoundingClientRect();return{x:t.touches[0].clientX-a.left,y:t.touches[0].clientY-a.top}})(e.canvasFog,t);var a=t.touches[0],n=new MouseEvent("mousedown",{clientX:a.clientX,clientY:a.clientY});e.onMouseDown(n)}),!1),this.canvasFog.addEventListener("touchend",(function(t){var a=new MouseEvent("mouseup",{});e.onMouseUp(a)}),!1),this.canvasFog.addEventListener("touchmove",(function(t){var a=t.touches[0],n=new MouseEvent("mousemove",{clientX:a.clientX,clientY:a.clientY});e.onMouseMove(n)}),!1)}},{key:"initContextMap",value:function(){var e=this.canvasFog,t=e.width,a=e.height;this.logger.log("Initializing Fog...",t,a),this.contextFog.fillStyle=this.overlay,this.contextFog.fillRect(0,0,t,a),this.contextFog.globalCompositeOperation="destination-out"}},{key:"onMouseDown",value:function(e){e.preventDefault(),this.isRemoveFog=!0}},{key:"onMouseUp",value:function(e){e.preventDefault(),this.isRemoveFog=!1;var t=this.getDataImage();this.logger.log(t),this.props.socket.emit("upload",t)}},{key:"getDataImage",value:function(){var e=document.createElement("canvas");e.width=this.canvasFog.width,e.height=this.canvasFog.height;var t=e.getContext("2d");return t.drawImage(this.baseMapImage,0,0),t.drawImage(this.canvasFog,0,0),e.toDataURL("image/png")}},{key:"onMouseMove",value:function(e){if(e.preventDefault(),this.isRemoveFog){var t=e.pageX,a=e.pageY;this.contextFog.fillStyle=this.getMapRadialGradient(t,a),this.contextFog.fillRect(t-this.r2,a-this.r2,2*this.r2,2*this.r2)}}},{key:"getMapRadialGradient",value:function(e,t){var a=this.contextFog.createRadialGradient(e,t,this.r1,e,t,this.r2);return a.addColorStop(0,"rgba( 0, 0, 0,  1 )"),a.addColorStop(this.density,"rgba( 0, 0, 0, .1 )"),a.addColorStop(1,"rgba( 0, 0, 0,  0 )"),a}},{key:"onImageLoad",value:function(e){this.baseMapImage=e;var t=e.width,a=e.height;this.canvasFog.width=t,this.canvasFog.height=a,this.initContextMap()}},{key:"render",value:function(){var e=this,t=this.props.image;return o.a.createElement("div",{className:"map"},o.a.createElement(v,{alt:"Baldur's Gate",src:t,onImageLoad:this.onImageLoad}),o.a.createElement("canvas",{id:"canvas-fog",ref:function(t){return e.canvasFog=t},onMouseDown:this.onMouseDown,onMouseUp:this.onMouseUp,onMouseMove:this.onMouseMove}))}}]),t}(n.Component),d=a(34),f=a.n(d),b=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).logger=new h("Login"),a.state={username:"",password:""},a.onSubmit=a.onSubmit.bind(Object(m.a)(a)),a.logout=a.logout.bind(Object(m.a)(a)),a}return Object(g.a)(t,e),Object(r.a)(t,[{key:"onSubmit",value:function(e){var t=this;e.preventDefault(),this.logger.log("Submitting login...",this.state),fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.state)}).then((function(e){return 200===e.status?e.text():""})).then((function(e){t.logger.log(e),t.props.onLoginSuccess&&t.props.onLoginSuccess(e)}))}},{key:"logout",value:function(e){this.logger.log("Logging out"),this.props.onLogoutSuccess&&this.props.onLogoutSuccess()}},{key:"render",value:function(){var e=this,t=this.state,a=t.username,n=t.password;return this.props.auth?o.a.createElement("div",{className:"component-login user-login"},o.a.createElement("button",{onClick:this.logout},"Logout")):o.a.createElement("div",{className:"component-login user-logout"},o.a.createElement("form",{onSubmit:this.onSubmit},o.a.createElement("label",null,o.a.createElement("input",{placeholder:"Username",value:a,onChange:function(t){return e.setState({username:t.target.value})}})),o.a.createElement("label",null,o.a.createElement("input",{placeholder:"Password",value:n,onChange:function(t){return e.setState({password:t.target.value})}})),o.a.createElement("input",{type:"submit",value:"Login"})))}}]),t}(n.Component),E=a(35),y=a.n(E),k=a(36),j=a.n(k),M=a(37),S=a.n(M),w=a(38),N=a.n(w),O=a(39),L=a.n(O),I=a(40),x=a.n(I),F=a(41),C=a.n(F),D=a(42),G=a.n(D),R=a(43),U=a.n(R),X=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).list=[{alt:"North West Gate",src:y.a},{alt:"North Gate",src:S.a},{alt:"North Est Gate",src:j.a},{alt:"Est Gate",src:x.a},{alt:"Central Gate",src:L.a},{alt:"West Gate",src:N.a},{alt:"South West Gate",src:C.a},{alt:"South Gate",src:G.a},{alt:"South East Gate",src:U.a}],a}return Object(g.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("ul",null,this.list.map((function(t,a){return o.a.createElement("li",{key:a,onClick:function(){return e.props.onMapSelected(t)}},o.a.createElement("img",{id:"map-".concat(a),alt:t.alt,src:t.src}))})))}}]),t}(n.Component),Y=function(){function e(){Object(i.a)(this,e)}return Object(r.a)(e,null,[{key:"getItem",value:function(e){return this.store.getItem(e)}},{key:"save",value:function(e,t){this.store.setItem(e,t)}},{key:"remove",value:function(e){this.store.removeItem(e)}},{key:"contains",value:function(e){return this.store.hasOwnProperty(e)}},{key:"storage",set:function(e){this.store=e},get:function(){return this.store}}]),e}();Y.store=sessionStorage;a(82);var W=function(){return o.a.createElement("div",{className:"spinner"},o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"campfire-wrapper"},o.a.createElement("div",{className:"tree-container-back"},o.a.createElement("div",{className:"tree-8"}),o.a.createElement("div",{className:"tree-9"}),o.a.createElement("div",{className:"tree-10"})),o.a.createElement("div",{className:"rock-container"},o.a.createElement("div",{className:"rock-big"}),o.a.createElement("div",{className:"rock-small"},o.a.createElement("div",{className:"rock-1"}),o.a.createElement("div",{className:"rock-2"}),o.a.createElement("div",{className:"rock-3"}),o.a.createElement("div",{className:"rock-4"}))),o.a.createElement("div",{className:"smoke-container"},o.a.createElement("svg",null,o.a.createElement("path",{d:"M 150 0 Q 200 100 100 250 C 0 450 120 400 50 600  "})),o.a.createElement("div",{className:"fire-container"},o.a.createElement("div",{className:"flame-1"}),o.a.createElement("div",{className:"flame-2"}),o.a.createElement("div",{className:"flame-3"}))),o.a.createElement("div",{className:"tree-container-front"},o.a.createElement("div",{className:"tree-1"}),o.a.createElement("div",{className:"tree-2"}),o.a.createElement("div",{className:"tree-3"}),o.a.createElement("div",{className:"tree-4"}),o.a.createElement("div",{className:"tree-5"}),o.a.createElement("div",{className:"tree-6"}),o.a.createElement("div",{className:"tree-7"})))))},A=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).logger=new h("App"),a.state={sourceImage:null,image:null,remote:null,auth:Y.getItem("auth")},a.socket=f.a.connect(),a.onLoginSuccess=a.onLoginSuccess.bind(Object(m.a)(a)),a.onLogoutSuccess=a.onLogoutSuccess.bind(Object(m.a)(a)),a.onMapSelected=a.onMapSelected.bind(Object(m.a)(a)),a}return Object(g.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.socket.on("image",(function(t){e.logger.log("Received event 'image'",t),e.setState({remoteImage:t})}))}},{key:"onLoginSuccess",value:function(e){Y.save("auth",e),this.setState({auth:e})}},{key:"onLogoutSuccess",value:function(){Y.remove("auth"),this.setState({auth:null})}},{key:"onMapSelected",value:function(e){this.setState({sourceImage:e.src})}},{key:"render",value:function(){var e=this.state,t=e.sourceImage,a=e.remoteImage,n=e.auth;return o.a.createElement("div",{className:"App"},o.a.createElement(b,{auth:n,onLoginSuccess:this.onLoginSuccess,onLogoutSuccess:this.onLogoutSuccess}),"master"===n?o.a.createElement("div",{className:"master-tools"},t?o.a.createElement(p,{image:t,socket:this.socket}):null,o.a.createElement(X,{onMapSelected:this.onMapSelected})):null,"player"===n?a?o.a.createElement("img",{alt:"Loading map...",src:a}):o.a.createElement(W,null):null)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[44,1,2]]]);
//# sourceMappingURL=main.89d5bc7a.chunk.js.map