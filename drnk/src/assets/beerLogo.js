/* eslint-disable */
import { ReactComponent as Svg } from "./beerLogo.svg";
import './beerLogo.css'

export default function BeerLogo(props) {
  return (
    <div>
      <Svg className={'active ' + props.size} />
    </div>
  )
}