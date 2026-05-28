import * as React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg width={608} height={407} viewBox="0 0 608 407" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G id="me ground floor">
      <Path id="ground building outline" d="M356.223 350.388H576.783V34.7178L347.762 35.7323L49.8887 37.0518V110.28M347.762 35.7323V350.388H356.223M269.282 350.67L276.868 350.679V110.28H49.8887V350.388L269.282 350.67ZM269.282 350.67V383.939H356.223V350.388" stroke="black" strokeWidth={0.583493}/>
      <Path id="ROTC Office" d="M49.8887 37.0518V110.28H276.868V37.0518H49.8887Z" fill="#C9C9C9" stroke="black" strokeWidth={0.583493}/>
      <Path id="Classroom ME 101" d="M276.868 37.0518V110.28H347.762V37.0518H276.868Z" fill="#C9C9C9" stroke="black" strokeWidth={0.583493}/>
      <Path id="Classroom ME 102" d="M356.223 37.0518V110.28H576.783V37.0518H356.223Z" fill="#C9C9C9" stroke="black" strokeWidth={0.583493}/>
      <Circle id="me_f1_room_101" cx={277} cy={331} r={6} fill="#D9D9D9" fillOpacity={0.5}/>
      <Circle id="me_f1_int_1" cx={313} cy={331} r={6} fill="#D9D9D9" fillOpacity={0.5}/>
      <Circle id="me_f1_int_2" cx={313} cy={57} r={6} fill="#D9D9D9" fillOpacity={0.5}/>
      <Circle id="me_f1_room_102" cx={348} cy={331} r={6} fill="#D9D9D9" fillOpacity={0.5}/>
      <Circle id="me_f1_stair_A_1" cx={177} cy={57} r={6} fill="#D9D9D9" fillOpacity={0.5}/>
      <Circle id="me_f1_stair_A_2" cx={69} cy={57} r={6} fill="#D9D9D9" fillOpacity={0.5}/>
      <Circle id="me_f1_stair_B_1" cx={69} cy={331} r={6} fill="#D9D9D9" fillOpacity={0.5}/>
      <Circle id="me_f1_stair_B_2" cx={104} cy={331} r={6} fill="#D9D9D9" fillOpacity={0.5}/>
      <Circle id="me_f1_lobby_A" cx={439} cy={331} r={6} fill="#D9D9D9" fillOpacity={0.5}/>
    </G>
  </Svg>
);
export default SVGComponent;