(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],{35:function(e,t,a){e.exports=a.p+"static/media/north-west-gate.1fb9d39e.jpg"},36:function(e,t,a){e.exports=a.p+"static/media/north-east-gate.54300b9a.jpg"},37:function(e,t,a){e.exports=a.p+"static/media/north-gate.a2e473f2.jpg"},38:function(e,t,a){e.exports=a.p+"static/media/west-gate.7e955c33.jpg"},39:function(e,t,a){e.exports=a.p+"static/media/central-gate.f33b04f9.jpg"},40:function(e,t,a){e.exports=a.p+"static/media/east-gate.7b6ef059.jpg"},41:function(e,t,a){e.exports=a.p+"static/media/south-west-gate.7e955c33.jpg"},42:function(e,t,a){e.exports=a.p+"static/media/south-gate.25ae3350.jpg"},43:function(e,t,a){e.exports=a.p+"static/media/south-east-gate.04dfecff.jpg"},44:function(e,t,a){e.exports=a(82)},49:function(e,t,a){},50:function(e,t,a){},79:function(e,t){},82:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),s=a(33),i=a.n(s),c=(a(49),a(2)),r=a(3),u=a(5),l=a(4),g=a(1),h=a(6),p=(a(50),function(){function e(t){Object(c.a)(this,e),this.componentName="string"===typeof t?t:t.constructor.name}return Object(r.a)(e,[{key:"log",value:function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];t.splice(0,0,"-"),t.splice(0,0,this.componentName),console.log.apply(console,t)}},{key:"error",value:function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];t.splice(0,0,"-"),t.splice(0,0,this.componentName),console.error.apply(console,t)}}]),e}()),m=function(e){return o.a.createElement("img",{alt:e.alt,src:e.src,onLoad:function(t){return e.onImageLoad(t.target)}})},d=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).logger=new p("MapLayer"),a.r1=50,a.r2=150,a.density=.4,a.overlay="rgba( 0, 0, 0, 1 )",a.baseMapImage=null,a.onMouseMove=a.onMouseMove.bind(Object(g.a)(a)),a.onMouseDown=a.onMouseDown.bind(Object(g.a)(a)),a.onMouseUp=a.onMouseUp.bind(Object(g.a)(a)),a.getDataImage=a.getDataImage.bind(Object(g.a)(a)),a.onImageLoad=a.onImageLoad.bind(Object(g.a)(a)),a}return Object(h.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.contextFog=this.canvasFog.getContext("2d")}},{key:"initContextMap",value:function(){var e=this.canvasFog,t=e.width,a=e.height;this.logger.log("Initializing Fog...",t,a),this.contextFog.fillStyle=this.overlay,this.contextFog.fillRect(0,0,t,a),this.contextFog.globalCompositeOperation="destination-out"}},{key:"onMouseDown",value:function(e){e.preventDefault(),this.isRemoveFog=!0}},{key:"onMouseUp",value:function(e){e.preventDefault(),this.isRemoveFog=!1;var t=this.getDataImage();this.logger.log(t),this.props.socket.emit("upload",t)}},{key:"getDataImage",value:function(){var e=document.createElement("canvas");e.width=this.canvasFog.width,e.height=this.canvasFog.height;var t=e.getContext("2d");return t.drawImage(this.baseMapImage,0,0),t.drawImage(this.canvasFog,0,0),e.toDataURL("image/png")}},{key:"onMouseMove",value:function(e,t){if(this.isRemoveFog){t&&(e=t);var a=e.pageX,n=e.pageY;this.contextFog.fillStyle=this.getMapRadialGradient(a,n),this.contextFog.fillRect(a-this.r2,n-this.r2,2*this.r2,2*this.r2)}}},{key:"getMapRadialGradient",value:function(e,t){var a=this.contextFog.createRadialGradient(e,t,this.r1,e,t,this.r2);return a.addColorStop(0,"rgba( 0, 0, 0,  1 )"),a.addColorStop(this.density,"rgba( 0, 0, 0, .1 )"),a.addColorStop(1,"rgba( 0, 0, 0,  0 )"),a}},{key:"onImageLoad",value:function(e){this.baseMapImage=e;var t=e.width,a=e.height;this.canvasFog.width=t,this.canvasFog.height=a,this.initContextMap()}},{key:"render",value:function(){var e=this,t=this.props.image;return o.a.createElement("div",{className:"map"},o.a.createElement(m,{alt:"Baldur's Gate",src:t,onImageLoad:this.onImageLoad}),o.a.createElement("canvas",{id:"canvas-fog",ref:function(t){return e.canvasFog=t},onMouseDown:this.onMouseDown,onMouseUp:this.onMouseUp,onMouseMove:this.onMouseMove}))}}]),t}(n.Component),f=a(34),v=a.n(f),b=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={username:"",password:"",isAuth:!1},a.logger=new p("Login"),a.onSubmit=a.onSubmit.bind(Object(g.a)(a)),a.logout=a.logout.bind(Object(g.a)(a)),a}return Object(h.a)(t,e),Object(r.a)(t,[{key:"onSubmit",value:function(e){var t=this;e.preventDefault(),this.logger.log("Submitting login...",this.state),fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.state)}).then((function(e){return 200===e.status?e.text():""})).then((function(e){t.logger.log(e),t.setState({isAuth:!!e}),t.props.onLoginSuccess&&t.props.onLoginSuccess(e)}))}},{key:"logout",value:function(e){this.logger.log("Logging out"),this.setState({isAuth:!1}),this.props.onLogoutSuccess&&this.props.onLogoutSuccess()}},{key:"render",value:function(){var e=this,t=this.state,a=t.username,n=t.password;return t.isAuth?o.a.createElement("div",{className:"component-login user-login"},o.a.createElement("button",{onClick:this.logout},"Logout")):o.a.createElement("div",{className:"component-login user-logout"},o.a.createElement("form",{onSubmit:this.onSubmit},o.a.createElement("label",null,o.a.createElement("input",{placeholder:"Username",value:a,onChange:function(t){return e.setState({username:t.target.value})}})),o.a.createElement("label",null,o.a.createElement("input",{placeholder:"Password",value:n,onChange:function(t){return e.setState({password:t.target.value})}})),o.a.createElement("input",{type:"submit",value:"Login"})))}}]),t}(n.Component),y=a(35),S=a.n(y),j=a(36),M=a.n(j),O=a(37),k=a.n(O),w=a(38),E=a.n(w),L=a(39),x=a.n(L),I=a(40),F=a.n(I),C=a(41),D=a.n(C),G=a(42),N=a.n(G),R=a(43),A=a.n(R),U=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).list=[{alt:"North West Gate",src:S.a},{alt:"North Gate",src:k.a},{alt:"North Est Gate",src:M.a},{alt:"Est Gate",src:F.a},{alt:"Central Gate",src:x.a},{alt:"West Gate",src:E.a},{alt:"South West Gate",src:D.a},{alt:"South Gate",src:N.a},{alt:"South East Gate",src:A.a}],a}return Object(h.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("ul",null,this.list.map((function(t,a){return o.a.createElement("li",{key:a,onClick:function(){return e.props.onMapSelected(t)}},o.a.createElement("img",{id:"map-".concat(a),alt:t.alt,src:t.src}))})))}}]),t}(n.Component),T=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).logger=new p("App"),a.state={sourceImage:null,image:null,remote:null,authType:null},a.socket=v.a.connect(),a.onLoginSuccess=a.onLoginSuccess.bind(Object(g.a)(a)),a.onLogoutSuccess=a.onLogoutSuccess.bind(Object(g.a)(a)),a.onMapSelected=a.onMapSelected.bind(Object(g.a)(a)),a}return Object(h.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.socket.on("image",(function(t){e.logger.log("Received event 'image'",t),e.setState({remoteImage:t})}))}},{key:"onLoginSuccess",value:function(e){this.setState({authType:e})}},{key:"onLogoutSuccess",value:function(){this.setState({authType:null})}},{key:"onMapSelected",value:function(e){this.setState({sourceImage:e.src})}},{key:"render",value:function(){var e=this.state,t=e.sourceImage,a=e.remoteImage,n=e.authType;return o.a.createElement("div",{className:"App"},o.a.createElement(b,{onLoginSuccess:this.onLoginSuccess,onLogoutSuccess:this.onLogoutSuccess}),"master"===n?o.a.createElement("div",{className:"master-tools"},t?o.a.createElement(d,{image:t,socket:this.socket}):null,o.a.createElement(U,{onMapSelected:this.onMapSelected})):null,"player"===n?o.a.createElement("img",{alt:"Loading map...",src:a}):null)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[44,1,2]]]);
//# sourceMappingURL=main.15a11937.chunk.js.map