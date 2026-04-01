import * as React from "react";
import Svg, { G, Circle, Ellipse, Path, Polyline, Text } from "react-native-svg";

// --- FLOOR 2 LABELS (Coordinates extracted from your SVG) ---
const ROOM_LABELS = [
  { name: "AMS 222", x: 1335, y: 353 },
  { name: "AMS 218", x: 1254, y: 346 },
  { name: "AMS 217", x: 1190, y: 304 },
  { name: "AMS 216", x: 1126, y: 261 },
  { name: "AMS 215", x: 1062, y: 219 },
  { name: "AMS 214", x: 998, y: 176 },
  { name: "AMS 213", x: 955, y: 101 },
  { name: "AMS 212", x: 844, y: 129 },
  { name: "AMS 211", x: 767, y: 129 },
  { name: "AMS 210", x: 690, y: 129 },
  { name: "AMS 209", x: 613, y: 129 },
  { name: "AMS 208", x: 537, y: 129 },
  { name: "AMS 207", x: 460, y: 129 },
  { name: "AMS 206", x: 370, y: 129 },
  { name: "AMS 205", x: 293, y: 129 },
  { name: "AMS 204", x: 285, y: 210 },
  { name: "AMS 203", x: 245, y: 276 },
  { name: "AMS 202", x: 205, y: 342 },
  { name: "AMS 201", x: 165, y: 408 },
  { name: "Male\nCR", x: 215, y: 129 },
  { name: "Female\nCR", x: 149, y: 129 },
];

const AMSFloor2 = ({ pathCoordinates, ...props }) => (
  <Svg
    width={1454}
    height={488}
    viewBox="0 0 1454 488"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G id="AMS 2nd Floor">
      {/* --- INVISIBLE NODES (Reference Points) --- */}
      <Circle id="ams_to_jh_L2" cx={163} cy={434} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_52" cx={176} cy={414} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_201" cx={165} cy={408} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_51" cx={217} cy={348} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_202" cx={205} cy={342} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_50" cx={256} cy={282} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_203" cx={245} cy={276} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_44" cx={317} cy={181} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_204" cx={285} cy={210} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="node 112" cx={948} cy={110} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="node 111" cx={370} cy={142} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_206" cx={370} cy={129} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_46" cx={293} cy={142} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_45" cx={317} cy={142} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_205" cx={293} cy={129} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_47" cx={215} cy={142} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_restroom_male_2" cx={215} cy={129} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_48" cx={149} cy={142} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_restroom_female_2" cx={149} cy={129} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_43" cx={369.5} cy={158.5} r={3.5} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_C_L2_2" cx={395} cy={132} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_C_L2_1" cx={433} cy={131} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_42" cx={460} cy={142} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_207" cx={460} cy={129} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_41" cx={537} cy={142} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_208" cx={537} cy={129} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_40" cx={613} cy={142} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_209" cx={613} cy={129} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_39" cx={690} cy={142} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_210" cx={690} cy={129} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_38" cx={767} cy={142} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_211" cx={767} cy={129} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_37" cx={844} cy={142} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_212" cx={844} cy={129} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Ellipse id="intersection_36" cx={923} cy={142.5} rx={4} ry={3.5} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_B_L2_2" cx={892} cy={101} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_B_L2_1" cx={925} cy={101} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_213" cx={955} cy={101} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_35" cx={990} cy={187} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_214" cx={998} cy={176} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_34" cx={1055} cy={230} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_215" cx={1062} cy={219} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_33" cx={1119} cy={272} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_216" cx={1126} cy={261} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_32" cx={1182} cy={314} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_217" cx={1190} cy={304} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_A_L2_1" cx={1316} cy={343} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_29" cx={1285.5} cy={380.5} r={3.5} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_31" cx={1246} cy={358} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_218" cx={1254} cy={346} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_A_L2_2" cx={1293} cy={327} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_30" cx={1327} cy={362} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_222" cx={1335} cy={353} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_49" cx={295} cy={216} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_A_L2_3" cx={1314} cy={297} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_A_L2_4" cx={1336} cy={312} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_A_L2_5" cx={1331} cy={321} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_B_L2_3" cx={892} cy={65} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_B_L2_4" cx={925} cy={65} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_B_L2_5" cx={925} cy={74} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_C_L2_3" cx={396} cy={79} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_C_L2_4" cx={433} cy={79} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_C_L2_5" cx={433} cy={103} r={3} fill="#D9D9D9" fillOpacity={0.02} />

      {/* --- STAIRS --- */}
      <Path id="stair 3 to 3rd floor" d="M1319.5 312.5L1343 328.5L1355.5 309.5L1308 277L1295.16 296.5M1319.5 312.5L1317.75 315.095M1319.5 312.5L1295.16 296.5M1282.5 315L1306.69 331.5M1306.69 331.5L1305 334L1281 318L1283.96 313.5M1306.69 331.5L1308 329.552M1308 329.552L1283.96 313.5M1308 329.552L1309.72 327M1283.96 313.5L1286 310.407M1286 310.407L1309.72 327M1286 310.407L1287.26 308.5M1309.72 327L1311.41 324.5M1311.41 324.5L1287.26 308.5M1311.41 324.5L1313 322.138M1287.26 308.5L1290.55 303.5M1289.5 306L1313 322.138M1313 322.138L1314.78 319.5M1314.78 319.5L1290.55 303.5M1314.78 319.5L1316 317.69M1290.55 303.5L1292.2 301M1292.2 301L1316 317.69M1292.2 301L1293.51 299M1316 317.69L1317.75 315.095M1317.75 315.095L1293.51 299L1293.51 299L1295.16 296.5" stroke="black" />
      <Path id="stair 1 to 3rd floor" d="M376 129.5V131M376 131H414.5V127M376 131V127M414.5 103.5H453V52.5H414.5H376V103.5M414.5 103.5V107M414.5 103.5H376M376 127H414.5M376 127V124M414.5 127V124.5M414.5 124.5L376 124M414.5 124.5V121.5M376 124V121.5M376 121.5H414.5M376 121.5V118.5M414.5 121.5V118.5M414.5 118.5H376M414.5 118.5V115.5M376 118.5V115.5M376 115.5H414.5M376 115.5V112.5M414.5 115.5V112.5M414.5 112.5H376M414.5 112.5V109.5M376 112.5V109.5M376 109.5H414.5M376 109.5V107M414.5 109.5V107M414.5 107H376M376 107V103.5" stroke="black" />
      <Path id="stair 2 to 3rd floor" d="M908.5 74.5H941.5L942 52.5H876V74.5M908.5 74.5V77M908.5 74.5H876M876 97.5V100.5H908.5V97.5M876 97.5H908.5M876 97.5V94M908.5 97.5V94M908.5 94H876M908.5 94V91M876 94V91M876 91H908.5M876 91V88.5M908.5 91V88.5M908.5 88.5H876M908.5 88.5V86M876 88.5V86M876 86H908.5M876 86V83M908.5 86V83M908.5 83H876M908.5 83V79.5M876 83V79.5M876 79.5H908.5M876 79.5V77M908.5 79.5V77M908.5 77H876M876 77V74.5" stroke="black" />

      {/* --- ROOMS --- */}
      <Path id="AMS 222" d="M1361.5 370L1329.5 349.5L1355.5 309.5L1388.5 331L1361.5 370Z" fill="#C9C9C9" stroke="black" />
      <Path id="Classrom AMS 218" d="M1260 350L1196 307.5L1236.5 247L1300 289.5L1260 350Z" fill="#C9C9C9" stroke="black" />
      <Path id="Classrom AMS 217" d="M1196 307.5L1132 265L1172 204L1236.5 247L1196 307.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="Classrom AMS 216" d="M1132 265L1067.5 222.5L1108 162L1172 204L1132 265Z" fill="#C9C9C9" stroke="black" />
      <Path id="Classrom AMS 215" d="M1067.5 222.5L1004 180L1043.5 120L1108 162L1067.5 222.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="Classrom AMS 214" d="M940 137.5L960.5 105.5L979.5 77.5L1043.5 120.5L1004 180L940 137.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="AMS 213" d="M941.5 92.5L942 52.5L979.5 77.5L960.5 105.5L941.5 92.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="AMS 212" d="M876 129.5H837.5V52.5H876V129.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="Classrom AMS 211" d="M837.5 129.5H760.5V52.5H837.5V129.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="Classrom AMS 210" d="M760.5 129.5H683.5V52.5H760.5V129.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="Classrom AMS 209" d="M683.5 129.5H606.5V52.5H683.5V129.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="Classrom AMS 208" d="M606.5 129.5H530V52.5L606.5 53V129.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="Classrom AMS 207" d="M530 129.5H453V52.5H530V129.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="Classroom AMS 206" d="M376 129.5H299V52.5H376V129.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="Classroom AMS 205" d="M299 129.5L222.5 129V52.5H299V129.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="Restroom (Male) 2nd Floor" d="M222.5 129H181.5V52.5H222.5V129Z" fill="#C9C9C9" stroke="black" />
      <Path id="Restroom (Female) 2nd Floor" d="M181.5 129H142.5L150 52.5H181.5V129Z" fill="#C9C9C9" stroke="black" />
      <Path id="Consultation Room" d="M281 216.5L215.5 176L228.5 153H260H299L302.5 181.5L281 216.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="Classroom AMS 203" d="M241.5 282L175.5 242L215.5 176L281.5 216.5L241.5 282Z" fill="#C9C9C9" stroke="black" />
      <Path id="Classroom AMS 202" d="M201.5 348L136.5 307.5L176 242L241.5 282L201.5 348Z" fill="#C9C9C9" stroke="black" />
      <Path id="AMS 201" d="M161.5 413.5L95.5 373.5L136 307.5L201.5 348L161.5 413.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="building outline" d="M149 434L116.5 415L83 394L96 373.5L115.5 340.5L135.5 308L155.5 275L175.5 242L215.5 176.5L228.5 153H140.5L150 52.5H299H453H684H876.5H942L1043.5 120L1139.5 182.5L1235.5 246.5L1300 289.5L1308 277L1356.5 310L1388.5 331L1361.5 370L1324.5 392.5L1277 394L1213 351.5L1116 288L1020 224L914 154H683H453L415.5 162.5L375.5 174.5L322.5 194L281.5 261.5L241 327L202.5 393.5L169 446.5" stroke="black" />
      
      {/* --- WALL VECTORS --- */}
      <Path id="ramp 1" d="M155 424L148.5 434L82.5 393.5L95.5 373.5L116.5 386.5L110.5 396L155 424Z" stroke="black" />
      <Path id="Vector 35" d="M163.5 434.5L176 414L217 348L256.5 282L295.5 216.5L317.5 181.5L370 158.5L459.5 142.5H537H613H690H767H844H923L989.5 187L1055 230.5L1119.5 272.5L1182 314L1246.5 358.5L1285 380.5L1326.5 362L1334 354.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 36" d="M1316 343.037L1285 379L1293 327" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 37" d="M1246 358L1253.5 347" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 38" d="M1182 314L1190 304.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 39" d="M1119 272.5L1125.5 262" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 40" d="M1055 230.5L1062 220" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 41" d="M990 187.5L997.5 177" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 42" d="M892 103L923.5 141.5L925 102" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 43" d="M923.5 142.5L948 110L954 102.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 44" d="M844 142.5V130.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 45" d="M767 142.5V131" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 46" d="M690 142.5V131" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 47" d="M613 142V130.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 48" d="M537 142.5V131" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 49" d="M460 142V131" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 50" d="M433 131.5L370 157.5L395 133.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 51" d="M370 158.5V142.5V131" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 52" d="M317 181.5V142.5H293H215H149" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 53" d="M149 142.5V131" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 54" d="M215 142.5V130.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 55" d="M293 142.5V131" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 56" d="M286 211L295 216.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 57" d="M246.5 277L256 282.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 58" d="M206 343L216.5 349" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 59" d="M166 409.5L176 415" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 60" d="M395.5 132V79.5H433V102.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 61" d="M892 101.5V64.5H925V74" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 62" d="M1293.5 327L1314 296.5L1336.5 311.5L1331.5 320.5" stroke="#EDEDED" strokeWidth={4} />
    </G>

    {/* --- ROOM LABELS (This was missing!) --- */}
    {ROOM_LABELS.map((label, index) => (
      <Text
        key={index}
        x={label.x}
        y={label.y}
        fill="black"
        fontSize="9"
        fontWeight="bold"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {label.name}
      </Text>
    ))}

    {/* --- PATH DRAWING (This was missing!) --- */}
    {pathCoordinates && pathCoordinates.length > 0 && (
      <>
        <Polyline
          points={pathCoordinates.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#00FF00"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Start/End Dots */}
        <Circle cx={pathCoordinates[0].x} cy={pathCoordinates[0].y} r={8} fill="green" stroke="white" strokeWidth={2} />
        <Circle cx={pathCoordinates[pathCoordinates.length - 1].x} cy={pathCoordinates[pathCoordinates.length - 1].y} r={8} fill="red" stroke="white" strokeWidth={2} />
      </>
    )}
  </Svg>
);

export default AMSFloor2;