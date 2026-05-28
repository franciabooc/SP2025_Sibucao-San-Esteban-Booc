import * as React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg width={937} height={620} viewBox="0 0 937 620" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G id="me 2nd floor">
      <Path id="2nd floor building outline" d="M196.696 407.29V84.6004L737.232 85.2047V407.29H506.092V471.647H427.534V407.29H196.696Z" stroke="black" strokeWidth={0.604289}/>
      <Path id="UNC Museum" d="M348.674 159.834H196.696V407.29L737.232 406.988V85.2047L348.674 84.6004V159.834Z" fill="#C9C9C9" stroke="black" strokeWidth={0.604289}/>
      <Circle id="me_f2_stair_A_5" cx={293.56} cy={142.36} r={5.89} fill="#D9D9D9" fillOpacity={0.5}/>
      <Circle id="me_f2_room_museum" cx={348.54} cy={105.05} r={5.89} fill="#D9D9D9" fillOpacity={0.5}/>
    </G>
  </Svg>
);
export default SVGComponent;