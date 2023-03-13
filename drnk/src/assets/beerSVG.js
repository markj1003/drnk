/* eslint-disable */

import { useEffect } from "react";
import { ReactComponent as Svg } from "./beerSVGfade.svg";
import './beerCSS.css'

export default function Logo(props) {
  useEffect(() => {
  // ... javascript goes here 
    let svg =  document.getElementsByTagName('svg')[1];
    svg.classList.add('active');
    console.log('hi there')
  }, []);
  return (
    <div>
      <Svg className='test'/>
    </div>
  )
}