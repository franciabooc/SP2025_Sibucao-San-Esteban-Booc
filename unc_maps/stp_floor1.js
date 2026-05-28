import * as React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";

const SVGComponent = (props) => (
  <Svg width={627} height={721} viewBox="0 0 627 721" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G id="ground floor">
      <G id="stp building outline">
        <Path id="Vector 4" d="M474 52H154V578V651.5L474 652V52Z" fill="#C9C9C9" stroke="#1E1E1E" />
        <G id="Vector 5">
          <Path d="M170 51.5L170 139L162 139L154 139L154 51.5H162H170Z" fill="#C9C9C9" />
          <Path d="M154 139L153.5 489M154 139L154 51.5H162M162 51.5H170L170 139L162 139L154 139M162 139L162 51.5" stroke="#1E1E1E" />
        </G>
        <G id="Vector 6">
          <Path d="M176 489V577.5H164.75H153.5V489H164.75H176Z" fill="#C9C9C9" />
          <Path d="M164.75 489H153.5V577.5H164.75M164.75 489H176V577.5H164.75M164.75 489V577.5" stroke="#1E1E1E" />
        </G>
      </G>
      <G id="stair to canteen">
        <Path d="M219 332H154V316.579V303.531V288.11V276.248V259.641V246.593V231.172V219.31V203.89V190.841V175.421V160H219V175.421V190.841V203.89V219.31V231.172V246.593V259.641V276.248V288.11V303.531V316.579V332Z" fill="#C9C9C9" />
        <Path d="M154 316.579V332H219V316.579M154 316.579H219M154 316.579V303.531M219 316.579V303.531M219 303.531H154M219 303.531V288.11M154 303.531V288.11M154 288.11H219M154 288.11V276.248M219 288.11V276.248M219 276.248H154M219 276.248V259.641M154 276.248V259.641M154 259.641H219M154 259.641V246.593M219 259.641V246.593M219 246.593H154M219 246.593V231.172M154 246.593V231.172M154 231.172H219M154 231.172V219.31M219 231.172V219.31M219 219.31H154M219 219.31V203.89M154 219.31V203.89M154 203.89H219M154 203.89V190.841M219 203.89V190.841M219 190.841H154M219 190.841V175.421M154 190.841V175.421M154 175.421V160H219V175.421M154 175.421H219" stroke="#1E1E1E" />
      </G>
      <Circle id="stp_f1_link_nb_f1" cx={164} cy={540} r={6} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="stp_f1_link_hs_f1" cx={164} cy={97} r={6} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="stp_exit_1" cx={312} cy={58} r={6} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="stp_f1_stair_A_1" cx={187} cy={160} r={6} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="stp_f1_stair_A_2" cx={187} cy={272} r={6} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="stp_f1_int_1" cx={312} cy={97} r={6} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="stp_f1_int_2" cx={242} cy={128} r={6} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="stp_f1_int_3" cx={242} cy={346} r={6} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="stp_f1_int_4" cx={164} cy={361} r={6} fill="#D9D9D9" fillOpacity={0.05} />
      <Path id="stp_f1_pathguide" d="M241.5 129L312.5 97.5L312 58.5M187 160.5L163.5 97.5H312.5M163.5 97.5L241.5 129M187 160.5V272.5M187 160.5L241.5 129M241.5 129V347L163.5 361.5V540" stroke="#EDEDED" strokeOpacity={0.1} strokeWidth={3} />
    </G>
  </Svg>
);

export default SVGComponent;