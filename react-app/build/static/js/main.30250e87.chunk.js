(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],{35:function(e,t,a){e.exports=a.p+"static/media/north-west-gate.1fb9d39e.jpg"},36:function(e,t,a){e.exports=a.p+"static/media/north-east-gate.54300b9a.jpg"},37:function(e,t,a){e.exports=a.p+"static/media/north-gate.a2e473f2.jpg"},38:function(e,t,a){e.exports=a.p+"static/media/west-gate.7e955c33.jpg"},39:function(e,t,a){e.exports=a.p+"static/media/central-gate.f33b04f9.jpg"},40:function(e,t,a){e.exports=a.p+"static/media/east-gate.7b6ef059.jpg"},41:function(e,t,a){e.exports=a.p+"static/media/south-west-gate.ff6decff.jpg"},42:function(e,t,a){e.exports=a.p+"static/media/south-gate.25ae3350.jpg"},43:function(e,t,a){e.exports=a.p+"static/media/south-east-gate.04dfecff.jpg"},44:function(e,t,a){e.exports=a.p+"static/media/full-map.a7fcd8c7.jpg"},45:function(e,t,a){e.exports=a(93)},50:function(e,t,a){},51:function(e,t,a){},80:function(e,t){},83:function(e,t,a){},84:function(e,t,a){},85:function(e,t,a){},86:function(e,t,a){},87:function(e,t,a){},88:function(e,t,a){},89:function(e,t,a){},90:function(e,t,a){},91:function(e,t,a){},92:function(e,t,a){},93:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),s=a(33),i=a.n(s),r=(a(50),a(2)),l=a(3),c=a(5),u=a(4),h=a(6),m=(a(51),a(34)),g=a.n(m),v=function(){function e(t){Object(r.a)(this,e),this.componentName="string"===typeof t?t:t.constructor.name}return Object(l.a)(e,[{key:"log",value:function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];t.splice(0,0,"-"),t.splice(0,0,this.componentName),console.log.apply(console,t)}},{key:"error",value:function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];t.splice(0,0,"-"),t.splice(0,0,this.componentName),console.error.apply(console,t)}}]),e}(),d=a(1),p=(a(83),a(84),function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).logger=new v("Login"),a.state={username:"",password:""},a.onSubmit=a.onSubmit.bind(Object(d.a)(a)),a.logout=a.logout.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"onSubmit",value:function(e){var t=this;e.preventDefault(),this.logger.log("Submitting login...",this.state),fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.state)}).then((function(e){if(200===e.status)return e.text();throw new Error("Error while logging...status code "+e.status)})).then((function(e){e={type:e,id:t.state.username},t.logger.log(e),t.props.onLoginSuccess&&t.props.onLoginSuccess(e)})).catch((function(e){return t.logger.error(e)}))}},{key:"logout",value:function(e){this.logger.log("Logging out"),this.props.onLogoutSuccess&&this.props.onLogoutSuccess()}},{key:"render",value:function(){var e=this,t=this.state,a=t.username,n=t.password;return this.props.user?o.a.createElement("div",{className:"component-login user-login"},o.a.createElement("button",{className:"clear",onClick:this.logout},"Logout")):o.a.createElement("div",{className:"component-login user-logout"},o.a.createElement("form",{onSubmit:this.onSubmit},o.a.createElement("label",null,o.a.createElement("input",{placeholder:"Username",value:a,onChange:function(t){return e.setState({username:t.target.value})}})),o.a.createElement("label",null,o.a.createElement("input",{placeholder:"Password",value:n,onChange:function(t){return e.setState({password:t.target.value})}})),o.a.createElement("input",{className:"save",type:"submit",value:"Login"})))}}]),t}(n.Component)),b=function(){function e(){Object(r.a)(this,e)}return Object(l.a)(e,null,[{key:"getItem",value:function(e,t){return this.contains(e,t)?(t=t||this.store,JSON.parse(t.getItem(e))):null}},{key:"save",value:function(e,t,a){(a=a||this.store).setItem(e,JSON.stringify(t))}},{key:"remove",value:function(e,t){(t=t||this.store).removeItem(e)}},{key:"contains",value:function(e,t){return(t=t||this.store).hasOwnProperty(e)}},{key:"storage",set:function(e){this.store=e},get:function(){return this.store}}]),e}();b.store=sessionStorage;a(85);var f=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={value:20,number:1,bonus:0,roll:null},a.values=[4,6,8,10,12,20,100],a.onChangeDiceValue=a.onChangeDiceValue.bind(Object(d.a)(a)),a.onChangeDiceNumber=a.onChangeDiceNumber.bind(Object(d.a)(a)),a.onChangeDiceBonus=a.onChangeDiceBonus.bind(Object(d.a)(a)),a.roll=a.roll.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"onChangeDiceValue",value:function(e){var t=e.target.value;this.setState({value:Number(t)})}},{key:"onChangeDiceNumber",value:function(e){var t=e.target.value;this.setState({number:Number(t)})}},{key:"onChangeDiceBonus",value:function(e){var t=e.target.value;this.setState({bonus:Number(t)})}},{key:"roll",value:function(){for(var e=this.state,t=e.value,a=e.number,n=e.bonus,o=0,s=0;s<a;s++)o+=Math.floor(Math.random()*t)+1;o+=n,this.setState({roll:o}),this.props.onRoll&&this.props.onRoll({value:t,number:a,bonus:n,roll:o})}},{key:"render",value:function(){var e=this.state,t=e.value,a=e.number,n=e.bonus,s=e.roll;return o.a.createElement("div",{className:"dice-roller"},o.a.createElement("div",{className:"inputs"},o.a.createElement("label",null,o.a.createElement("span",null,"Number"),o.a.createElement("input",{type:"number",min:1,value:a,onChange:this.onChangeDiceNumber})),o.a.createElement("label",null,o.a.createElement("span",null,"Type"),o.a.createElement("select",{onChange:this.onChangeDiceValue},this.values.map((function(e,a){return o.a.createElement("option",{key:a,value:e,selected:e===t},e)})))),o.a.createElement("label",null,o.a.createElement("span",null,"Bonus"),o.a.createElement("input",{type:"number",min:0,value:n,onChange:this.onChangeDiceBonus}))),o.a.createElement("div",{className:"button"},o.a.createElement("button",{className:"save",onClick:this.roll},"Roll")),o.a.createElement("div",{className:"roll"},s))}}]),t}(n.Component),C=(a(86),function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).onClick=a.onClick.bind(Object(d.a)(a)),a.onChangeFile=a.onChangeFile.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"onClick",value:function(){this.input.click()}},{key:"onChangeFile",value:function(e){var t=this,a=e.target.files[0],n=window.prompt("Set image title"),o=new FileReader;o.onload=function(){t.props.onChange&&t.props.onChange({src:o.result,alt:n})},o.readAsDataURL(a)}},{key:"render",value:function(){var e=this,t=this.props.children;return o.a.createElement("button",{className:"upload-file",onClick:this.onClick},o.a.createElement("span",null,t),o.a.createElement("input",{ref:function(t){return e.input=t},type:"file",onChange:this.onChangeFile}))}}]),t}(n.Component)),k=function(e){return o.a.createElement("img",{alt:e.alt,src:e.src,onLoad:function(t){return e.onImageLoad(t.target)}})},E=(a(87),function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).logger=new v("MapLayer"),a.r1=30,a.r2=100,a.density=.4,a.overlay="rgba( 0, 0, 0, 1 )",a.baseMapImage=null,a.onMouseMove=a.onMouseMove.bind(Object(d.a)(a)),a.onMouseDown=a.onMouseDown.bind(Object(d.a)(a)),a.onMouseUp=a.onMouseUp.bind(Object(d.a)(a)),a.getDataImage=a.getDataImage.bind(Object(d.a)(a)),a.onImageLoad=a.onImageLoad.bind(Object(d.a)(a)),a.restoreFog=a.restoreFog.bind(Object(d.a)(a)),a.sendImage=a.sendImage.bind(Object(d.a)(a)),a.showMap=a.showMap.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.contextFog=this.canvasFog.getContext("2d"),this.canvasFog.addEventListener("touchstart",(function(t){var a=t.touches[0],n=a.clientX,o=a.clientY,s=new MouseEvent("mousedown",{clientX:n,clientY:o});e.onMouseDown(s)}),!1),this.canvasFog.addEventListener("touchend",(function(t){var a=new MouseEvent("mouseup",{});e.onMouseUp(a)}),!1),this.canvasFog.addEventListener("touchmove",(function(t){var a=t.touches[0],n=a.clientX,o=a.clientY,s=new MouseEvent("mousemove",{clientX:n,clientY:o});e.onMouseMove(s)}),!1)}},{key:"initContextMap",value:function(){var e=this.canvasFog,t=e.width,a=e.height;this.logger.log("Initializing Fog...",t,a),this.contextFog.fillStyle=this.overlay,this.contextFog.fillRect(0,0,t,a),this.contextFog.globalCompositeOperation="destination-out",this.restoreCanvas=document.createElement("canvas"),this.restoreCanvas.width=t,this.restoreCanvas.height=a,this.restoreContext=this.restoreCanvas.getContext("2d"),this.restoreContext.drawImage(this.canvasFog,0,0)}},{key:"restoreFog",value:function(){this.contextFog.globalCompositeOperation="source-over",this.contextFog.drawImage(this.restoreCanvas,0,0),this.contextFog.globalCompositeOperation="destination-out"}},{key:"sendImage",value:function(){var e=this.getDataImage();this.props.onSendImage&&this.props.onSendImage(e)}},{key:"showMap",value:function(){var e=this.canvasFog,t=e.width,a=e.height;this.contextFog.fillStyle=this.overlay,this.contextFog.fillRect(0,0,t,a)}},{key:"onMouseDown",value:function(e){e.preventDefault(),this.isRemoveFog=!0}},{key:"onMouseUp",value:function(e){e.preventDefault(),this.isRemoveFog=!1}},{key:"onMouseMove",value:function(e){if(e.preventDefault(),this.isRemoveFog){var t=e.clientX,a=e.clientY-this.r2;this.contextFog.fillStyle=this.getMapRadialGradient(t,a),this.contextFog.fillRect(t-this.r2,a-this.r2,2*this.r2,2*this.r2)}}},{key:"getMapRadialGradient",value:function(e,t){var a=this.contextFog.createRadialGradient(e,t,this.r1,e,t,this.r2);return a.addColorStop(0,"rgba( 0, 0, 0,  1 )"),a.addColorStop(this.density,"rgba( 0, 0, 0, .1 )"),a.addColorStop(1,"rgba( 0, 0, 0,  0 )"),a}},{key:"getDataImage",value:function(e){var t=document.createElement("canvas");t.width=this.canvasFog.width,t.height=this.canvasFog.height;var a=t.getContext("2d");return a.drawImage(this.baseMapImage,0,0,this.baseMapImage.width,this.baseMapImage.height,0,0,this.canvasFog.width,this.canvasFog.height),e||a.drawImage(this.canvasFog,0,0),this.restoreContext.drawImage(t,0,0),t.toDataURL("image/png")}},{key:"onImageLoad",value:function(e){this.baseMapImage=e;var t=e.width,a=e.height;this.canvasFog.width=t,this.canvasFog.height=a,this.initContextMap()}},{key:"render",value:function(){var e=this,t=this.props,a=t.image,n=t.alt;return o.a.createElement("div",{className:"map-layer"},o.a.createElement("div",{className:"actions",ref:function(t){return e.actions=t}},o.a.createElement("span",null,n),o.a.createElement("button",{onClick:this.restoreFog},"Cancel"),o.a.createElement("button",{onClick:this.sendImage},"Send"),o.a.createElement("button",{onClick:this.showMap},"Show Map")),o.a.createElement("div",{className:"map-container"},o.a.createElement(k,{alt:n,src:a,onImageLoad:this.onImageLoad}),o.a.createElement("canvas",{id:"canvas-fog",ref:function(t){return e.canvasFog=t},onMouseDown:this.onMouseDown,onMouseUp:this.onMouseUp,onMouseMove:this.onMouseMove})))}}]),t}(n.Component)),O=a(35),j=a.n(O),y=a(36),w=a.n(y),S=a(37),M=a.n(S),I=a(38),N=a.n(I),x=a(39),D=a.n(x),F=a(40),R=a.n(F),L=a(41),T=a.n(L),Y=a(42),X=a.n(Y),U=a(43),G=a.n(U),W=a(44),P=a.n(W),B=(a(88),function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).fullMap={alt:"Full Map",src:P.a},a.list=[{alt:"North West Gate",src:j.a},{alt:"North Gate",src:M.a},{alt:"North Est Gate",src:w.a},{alt:"West Gate",src:N.a},{alt:"Central Gate",src:D.a},{alt:"Est Gate",src:R.a},{alt:"South West Gate",src:T.a},{alt:"South Gate",src:X.a},{alt:"South East Gate",src:G.a}],a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"map-list"},o.a.createElement("ul",null,this.list.map((function(t,a){return o.a.createElement("li",{key:a,onClick:function(){return e.props.onMapSelected(t)}},o.a.createElement("img",{id:"map-".concat(a),alt:t.alt,src:t.src}))}))),o.a.createElement("img",{alt:this.fullMap.alt,src:this.fullMap.src}))}}]),t}(n.Component)),A=(a(89),function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).isDrawEnabled=!1,a.prevX=0,a.currX=0,a.prevY=0,a.currY=0,a.color="black",a.lineWidth=10,a.drawMode="draw",a.setColor=a.setColor.bind(Object(d.a)(a)),a.resetCanvas=a.resetCanvas.bind(Object(d.a)(a)),a.sendImage=a.sendImage.bind(Object(d.a)(a)),a.onMouseMove=a.onMouseMove.bind(Object(d.a)(a)),a.onMouseDown=a.onMouseDown.bind(Object(d.a)(a)),a.onMouseUp=a.onMouseUp.bind(Object(d.a)(a)),a.onMouseOut=a.onMouseOut.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.canvas.width=1024,this.canvas.height=768;var e=this.canvas,t=e.offsetLeft,a=e.offsetTop;this.deltaX=t,this.deltaY=a,this.canvasContext=this.canvas.getContext("2d")}},{key:"onMouseOut",value:function(e){this.isDrawEnabled=!1}},{key:"onMouseUp",value:function(e){this.isDrawEnabled=!1}},{key:"onMouseDown",value:function(e){var t=window,a=t.scrollX,n=t.scrollY;this.prevX=this.currX=parseInt(e.clientX-this.deltaX+a),this.prevY=this.currY=parseInt(e.clientY-this.deltaY+n),this.isDrawEnabled=!0}},{key:"onMouseMove",value:function(e){var t=window,a=t.scrollX,n=t.scrollY;this.currX=parseInt(e.clientX-this.deltaX+a),this.currY=parseInt(e.clientY-this.deltaY+n),this.isDrawEnabled&&(this.canvasContext.beginPath(),"draw"===this.drawMode?(this.canvasContext.globalCompositeOperation="source-over",this.canvasContext.strokeStyle=this.color,this.canvasContext.lineWidth=this.lineWidth):(this.canvasContext.globalCompositeOperation="destination-out",this.canvasContext.lineWidth=3*Number(this.lineWidth)),this.canvasContext.moveTo(this.prevX,this.prevY),this.canvasContext.lineTo(this.currX,this.currY),this.canvasContext.lineJoin=this.canvasContext.lineCap="round",this.canvasContext.stroke(),this.prevX=this.currX,this.prevY=this.currY)}},{key:"setColor",value:function(e){switch(this.drawMode="draw",e.target.className){case"green":this.color="green";break;case"blue":this.color="blue";break;case"red":this.color="red";break;case"yellow":this.color="yellow";break;case"orange":this.color="orange";break;case"white":this.color="white";break;default:this.color="black"}}},{key:"resetCanvas",value:function(){var e=this.canvas,t=e.width,a=e.height;this.canvasContext.fillStyle="white",this.canvasContext.fillRect(0,0,t,a),this.canvasContext.globalCompositeOperation="source-over"}},{key:"getDataImage",value:function(){var e=document.createElement("canvas");return e.width=this.canvas.width,e.height=this.canvas.height,e.getContext("2d").drawImage(this.canvas,0,0),e.toDataURL("image/png")}},{key:"sendImage",value:function(){var e=this.getDataImage();this.props.onSendImage&&this.props.onSendImage(e)}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"free-draw"},o.a.createElement("canvas",{ref:function(t){return e.canvas=t},onMouseMove:this.onMouseMove,onMouseDown:this.onMouseDown,onMouseUp:this.onMouseUp,onMouseOut:this.onMouseOut}),o.a.createElement("div",{className:"color-chooser",ref:function(t){return e.colorChooser=t}},o.a.createElement("button",{className:"green",onClick:this.setColor},"Green"),o.a.createElement("button",{className:"blue",onClick:this.setColor},"Blue"),o.a.createElement("button",{className:"red",onClick:this.setColor},"Red"),o.a.createElement("button",{className:"yellow",onClick:this.setColor},"Yellow"),o.a.createElement("button",{className:"orange",onClick:this.setColor},"Orange"),o.a.createElement("button",{className:"black",onClick:this.setColor},"Black"),o.a.createElement("button",{className:"white",onClick:this.setColor},"White"),o.a.createElement("button",{className:"eraser",onClick:function(){return e.drawMode="eraser"}},"Eraser"),o.a.createElement("select",{onChange:function(t){return e.lineWidth=t.target.value}},o.a.createElement("option",{value:"2"},"2"),o.a.createElement("option",{value:"10",selected:!0},"10"),o.a.createElement("option",{value:"20"},"20")),o.a.createElement("button",{className:"clear",onClick:this.resetCanvas},"Reset"),o.a.createElement("button",{className:"send",onClick:this.sendImage},"Send")))}}]),t}(n.Component)),J=(a(90),function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).rolls=[],a.onClickImage=a.onClickImage.bind(Object(d.a)(a)),a.onClearRolls=a.onClearRolls.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"onClickImage",value:function(){this.props.onClickImage&&this.props.onClickImage()}},{key:"shouldComponentUpdate",value:function(e,t,a){var n=e.user;return!!n&&(n.roll&&this.rolls.push(n.roll),!0)}},{key:"onClearRolls",value:function(){this.rolls=[],this.props.onClearRolls&&this.props.onClearRolls()}},{key:"render",value:function(){var e=this.props.user;return o.a.createElement("div",{className:"user-section section-".concat(e.id)},o.a.createElement("fieldset",null,o.a.createElement("legend",null,e.id),this.rolls.length>0?o.a.createElement("button",{onClick:this.onClearRolls},"Clear"):null,this.rolls.map((function(e,t){var a=e.value,n=e.number,s=e.bonus,i=e.roll;return o.a.createElement("div",{key:t,className:"rolls"},o.a.createElement("span",{className:"dice number"},n),o.a.createElement("span",{className:"dice operator"},"d("),o.a.createElement("span",{className:"dice value"},a),o.a.createElement("span",{className:"dice operator"},") + "),o.a.createElement("span",{className:"dice bonus"},s),o.a.createElement("span",{className:"dice operator"}," = "),o.a.createElement("span",{className:"dice roll"},i))})),e.image?o.a.createElement("img",{alt:"Remote ".concat(e.id),src:e.image,onClick:this.onClickImage}):null))}}]),t}(n.Component)),V=(a(91),function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={value:b.getItem("character",localStorage)},a.onInput=a.onInput.bind(Object(d.a)(a)),a.onSaveText=a.onSaveText.bind(Object(d.a)(a)),a.onClearText=a.onClearText.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"onInput",value:function(){var e=this.content.value;this.setState({value:e})}},{key:"onSaveText",value:function(e){var t=this.content.value;b.save("character",t,localStorage)}},{key:"onClearText",value:function(e){this.content.value=""}},{key:"render",value:function(){var e=this,t=this.state.value;return o.a.createElement("div",{className:"character-sheet"},o.a.createElement("label",null,"Character"),o.a.createElement("textarea",{value:t,onInput:this.onInput,ref:function(t){return e.content=t}}),o.a.createElement("button",{className:"clear",onClick:this.onClearText},"Clear"),o.a.createElement("button",{className:"save",onClick:this.onSaveText},"Save"))}}]),t}(n.Component)),z=(a(92),function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={value:b.getItem("note",localStorage)},a.onInput=a.onInput.bind(Object(d.a)(a)),a.onSaveText=a.onSaveText.bind(Object(d.a)(a)),a.onClearText=a.onClearText.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"onInput",value:function(){var e=this.content.value;this.setState({value:e})}},{key:"onSaveText",value:function(e){var t=this.content.value;b.save("note",t,localStorage)}},{key:"onClearText",value:function(e){this.content.value=""}},{key:"render",value:function(){var e=this,t=this.state.value;return o.a.createElement("div",{className:"note-section"},o.a.createElement("label",null,"Note"),o.a.createElement("textarea",{value:t,onInput:this.onInput,ref:function(t){return e.content=t}}),o.a.createElement("div",{className:"actions"},o.a.createElement("button",{className:"clear",onClick:this.onClearText},"Clear"),o.a.createElement("button",{className:"save",onClick:this.onSaveText},"Save")))}}]),t}(n.Component)),H=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).logger=new v("Home"),a.state={user:b.getItem("user")},a.onLoginSuccess=a.onLoginSuccess.bind(Object(d.a)(a)),a.onLogoutSuccess=a.onLogoutSuccess.bind(Object(d.a)(a)),a.sendRoll=a.sendRoll.bind(Object(d.a)(a)),a.uploadImage=a.uploadImage.bind(Object(d.a)(a)),a.setSourceImage=a.setSourceImage.bind(Object(d.a)(a)),a.togglePanelRight=a.togglePanelRight.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.socket=this.props.socket,this.state.user&&this.socket.emit("login",this.state.user)}},{key:"sendRoll",value:function(e){this.logger.log("Sending roll",e);var t=this.state.user.id;this.socket.emit("roll",{id:t,roll:e})}},{key:"onLoginSuccess",value:function(e){b.save("user",e),this.socket.emit("login",e),this.setState({user:e})}},{key:"onLogoutSuccess",value:function(){b.remove("user"),this.socket.emit("logout",this.state.user),this.setState({user:null})}},{key:"uploadImage",value:function(e){this.logger.log("Uploading image..."),this.socket.emit("upload",{image:e,user:this.state.user})}},{key:"setSourceImage",value:function(e){this.setState({sourceImage:e.src,sourceAlt:e.alt})}},{key:"togglePanelRight",value:function(){this.setState({showPanelRight:this.state.showPanelRight?"":"show"})}},{key:"render",value:function(){var e=this,t=this.state,a=t.sourceImage,n=t.sourceAlt,s=t.user,i=t.masterTool,r=t.showPanelRight,l=this.props.users;return o.a.createElement("div",{className:"home"},o.a.createElement("div",{className:"header header-".concat(s?"logout":"login")},o.a.createElement(p,{user:s,onLoginSuccess:this.onLoginSuccess,onLogoutSuccess:this.onLogoutSuccess}),s&&"master"===s.type?o.a.createElement("div",{className:"master-tools"},o.a.createElement("button",{onClick:function(){return e.setState({masterTool:"baldursFateMaps"})}},"Baldur's Gate"),o.a.createElement("button",{onClick:function(){return e.setState({masterTool:"freeDraw",sourceImage:null})}},"Free Draw"),o.a.createElement(C,{onChange:this.setSourceImage},"Upload")):null),s?o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"panel panel-left"},o.a.createElement(f,{onRoll:this.sendRoll}),"player"===s.type?o.a.createElement(V,null):null),o.a.createElement("div",{className:"panel panel-content"},"master"===s.type?o.a.createElement("div",{className:"master-tools"},a?o.a.createElement(E,{image:a,alt:n,onSendImage:this.uploadImage}):null,"baldursFateMaps"===i?o.a.createElement(B,{onMapSelected:this.setSourceImage}):null,"freeDraw"===i?o.a.createElement(A,{onSendImage:this.uploadImage}):null):null,"player"===s.type?o.a.createElement("div",{className:"player-tools"},o.a.createElement(A,{onSendImage:this.uploadImage})):null,o.a.createElement(z,null)),o.a.createElement("div",{className:"panel panel-right ".concat(r)},l.map((function(t){return t.id!==s.id?o.a.createElement(J,{user:t,onClickImage:e.togglePanelRight}):null})))):null)}}]),t}(n.Component),$=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).logger=new v("App"),a.state={sourceImage:null,sourceAlt:null,image:null,remote:null,users:[],masterTool:null},a.socket=g.a.connect(),a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.socket.on("image",(function(t){e.logger.log("Received remote image from user",t.user);var a=e.state.users;a.find((function(e){return e.id===t.user.id})).image=t.image,e.setState({users:a})})),this.socket.on("join",(function(t){e.logger.log("New user joined the room",t),e.setState({users:t})})),this.socket.on("leave",(function(t){e.logger.log("An user left the room",t),e.setState({users:t})})),this.socket.on("roll",(function(t){e.logger.log("User rolled value",t),e.setState({users:t})}))}},{key:"render",value:function(){var e=this.state.users;return o.a.createElement("div",{className:"App"},o.a.createElement(H,{socket:this.socket,users:e}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement($,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[45,1,2]]]);
//# sourceMappingURL=main.30250e87.chunk.js.map