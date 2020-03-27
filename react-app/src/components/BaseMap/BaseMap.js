import React from "react";

const BaseMap = props => <img alt={props.alt} src={props.src} onLoad={e => props.onImageLoad(e.target)}/>;

export default BaseMap;
