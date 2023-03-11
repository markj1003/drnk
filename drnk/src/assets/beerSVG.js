/* eslint-disable */

import { useEffect } from "react";
import { ReactComponent as Svg } from "./beerSVGfade.svg";
import './beerCSS.css'

export default function Logo() {
  useEffect(() => {
  // ... javascript goes here 
    let svg =  document.getElementsByTagName('svg')[0];
    svg.classList.add('active');
    console.log('hi')
  }, []);
  return (
    <div>
      <Svg/>
    </div>
  )
}