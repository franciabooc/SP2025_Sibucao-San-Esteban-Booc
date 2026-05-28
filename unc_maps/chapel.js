import * as React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={444}
    height={245}
    viewBox="0 0 444 245"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G id="chapel">
      <Path
        id="ALTAR"
        d="M105.31 114.597V27.4637H317.117V63.0282L339.246 71.129V113.214L308.226 153.323H137.121L105.31 114.597Z"
        stroke="black"
        strokeWidth={0.395161}
      />
      <Path
        id="BUILDING OUTLINE"
        d="M105.311 27.4637H381.923V71.129M105.311 27.4637H64.6089C64.6853 27.4637 64.7325 31.4341 64.7582 37.9355M105.311 27.4637V37.9355H85.5524M64.7582 37.9355C64.839 58.3333 64.7088 103.645 64.6089 129.415L117.561 194.617H329.215L381.923 129.415V94.246M64.7582 37.9355H75.2782M75.2782 37.9355V125.557L122.302 183.948H324.007L371.254 125.464V94.246M75.2782 37.9355H78.6371M371.254 94.246H381.923M371.254 94.246H367.698M381.923 94.246V71.129M85.5524 37.9355V121.907L127.242 173.278H318.895L360.585 122.105V94.246H364.141M85.5524 37.9355H81.996M81.996 37.9355V123.093L125.661 176.835H320.749L364.141 123.29V94.246M81.996 37.9355H78.6371M364.141 94.246H367.698M364.141 94.246V71.129H381.923M367.698 94.246V124.476L322.452 180.391H124.081L78.8347 124.278L78.6371 37.9355"
        stroke="black"
        strokeWidth={0.395161}
      />
      <Path
        id="CAMPUS MINISTRY OFFICE"
        d="M337.468 71.129H381.923V27.4637H317.117V63.0282L337.468 71.129Z"
        stroke="black"
        strokeWidth={0.395161}
      />
      <Circle
        id="chapel_exit_1"
        cx={223.382}
        cy={166.636}
        r={5.40441}
        fill="#D9D9D9"
      />
      <Circle
        id="chapel_room_ministry"
        cx={352.188}
        cy={71.1581}
        r={5.40441}
        fill="#D9D9D9"
      />
      <Circle
        id="chapel_f1_int_1"
        cx={314.357}
        cy={163.934}
        r={5.40441}
        fill="#D9D9D9"
      />
      <Circle
        id="chapel_f1_int_2"
        cx={349.485}
        cy={117.096}
        r={5.40441}
        fill="#D9D9D9"
      />
      <Path
        id="chapel_f1_pathguide"
        d="M223.382 167.086L314.807 163.934L349.485 117.996L353.088 72.0588"
        stroke="#EDEDED"
        strokeOpacity={0.1}
        strokeWidth={2.70221}
      />
    </G>
  </Svg>
);
export default SVGComponent;
