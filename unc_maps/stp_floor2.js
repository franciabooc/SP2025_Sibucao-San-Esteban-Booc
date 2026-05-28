import * as React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";

const SVGComponent = (props) => (
  <Svg width={627} height={721} viewBox="0 0 627 721" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G id=" 2nd  floor">
      <G id="stp building outline">
        <Path id="Vector 4" d="M474 52H154V651.5L474 652V52Z" fill="#C9C9C9" stroke="#1E1E1E" />
        <Path id="Vector 5" d="M154 52L153.999 578" stroke="#1E1E1E" />
      </G>
      <Path id="Canteen" d="M474 367H154V52H474V367Z" fill="#C9C9C9" stroke="#1E1E1E" />
      <G id="stair to canteen">
        <Path d="M219 332H154V316.579V303.531V288.11V276.248V259.641V246.593V231.172V219.31V203.89V190.841V175.421V160H219V175.421V190.841V203.89V219.31V231.172V246.593V259.641V276.248V288.11V303.531V316.579V332Z" fill="#C9C9C9" />
        <Path d="M154 316.579V332H219V316.579M154 316.579H219M154 316.579V303.531M219 316.579V303.531M219 303.531H154M219 303.531V288.11M154 303.531V288.11M154 288.11H219M154 288.11V276.248M219 288.11V276.248M219 276.248H154M219 276.248V259.641M154 276.248V259.641M154 259.641H219M154 259.641V246.593M219 259.641V246.593M219 246.593H154M219 246.593V231.172M154 246.593V231.172M154 231.172H219M154 231.172V219.31M219 231.172V219.31M219 219.31H154M219 219.31V203.89M154 219.31V203.89M154 203.89H219M154 203.89V190.841M219 203.89V190.841M219 190.841H154M219 190.841V175.421M154 190.841V175.421M154 175.421V160H219V175.421M154 175.421H219" stroke="#1E1E1E" />
      </G>
      <Circle id="stp_f2_stair_A_3" cx={187} cy={332} r={6} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="stp_f2_room_canteen" cx={231} cy={352} r={6} fill="#D9D9D9" fillOpacity={0.05} />
      <Path id="stp_f2_pathguide" d="M187.5 332L231 352" stroke="#EDEDED" strokeOpacity={0.1} strokeWidth={3} />
    </G>
  </Svg>
);

export default SVGComponent;