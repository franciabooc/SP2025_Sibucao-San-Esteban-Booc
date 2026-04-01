import * as React from "react";
import Svg, { G, Path, Circle, Ellipse, Defs, Polyline, Text } from "react-native-svg"; // Added Text import

/* SVGR has dropped some elements not supported by react-native-svg: filter */

const SVGComponent = ({ pathCoordinates, ...props }) => (
  <Svg
    width={1414}
    height={527}
    viewBox="0 0 1414 527"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G id="AMS Ground Floor">
      <Path id="Security Office" d="M888.5 154L919 175L958.5 115L921 89.5V125.5L888.5 117.5V154Z" fill="#C9C9C9" stroke="black" />
      <Circle id="ams_stair_C_L1_1" cx={379} cy={168} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Path id="BIDYO Office" d="M1296 347.5L1282 369L1306 385L1319 363.5L1296 347.5Z" fill="#C9C9C9" stroke="black" />
      <Path
        id="AMSCO Office"
        d="M1205 364L1173.5 343.5L1195 311.5L1213.5 283L1245 304L1276.5 325L1258.5 353.5L1237.5 385.5L1205 364Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="Plannning and Quality Management Office"
        d="M1173.5 343.5L1141.5 322.5L1181.5 262L1213.5 283L1195 311.5L1173.5 343.5Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="Scholarship and Grants Office"
        d="M1141.5 322.5L1109.5 301L1149.5 241L1181.5 262L1163 290.5L1141.5 322.5Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="COE Faculty Office "
        d="M1109.5 301L1078 280L1117.5 220L1149.5 241L1131.5 269L1109.5 301Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="COE Dean&#39;s Office"
        d="M1077.5 281.5L1046 260.5L1085.5 201L1117 221.5L1077.5 281.5Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="SPED Lab"
        d="M1046.5 259L1014.5 238L1054.5 177.5L1086 199.5L1067.5 227L1046.5 259Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="Dance Studio"
        d="M951 195.5L919 175L958.5 115L999 141L1011 123.5L1034 138.5L1023 157L1054.5 177.5L1014.5 238L982.5 216.5L951 195.5Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="ams 112"
        d="M856.5 166.5H818V128V89.5H855.5L856 128L856.5 166.5Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="University College Guidance and Testing Room"
        d="M741.5 166.5L665 167V129L664.5 90V56H817V89.5H818V128V166.5H741.5Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="SSNS Dean&#39;s Office"
        d="M589 167H550.5V129.5V90H589V128V167Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="CJE Dean&#39;s Office"
        d="M550.5 167H512.5V129V90H550.5V167Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="PEP Room"
        d="M436.5 128V167H512.5V128V90H436.5V128Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path id="Vector 8" d="M416 180V168" stroke="#EDEDED" strokeWidth={4} />
      <Path
        id="VPAAS Office"
        d="M322 166.5H284V128.5V90H322H360V128V166.5H322Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="SSNS Faculty Room"
        d="M284 166.5H207V128V90H245H284V128V166.5Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="Restroom (Male) 1st Floor"
        d="M207 166.5H166.5V128V90H207V128V166.5Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="CJE Faculty Room"
        d="M233 233L201 213L214.5 190.5L245.5 190H283.5L286.5 218L265.5 253L233 233Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="Restroom (Female) 1st Floor"
        d="M166.5 166.5H128L131.5 128L135 90H166.5V128V166.5Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="ETEAP"
        d="M245.5 285.5L181 245.5L201 213L233 233L265.5 253L245.5 285.5Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="SBA Faculty Room"
        d="M193.5 298L161 278.5L181 245.5L245.5 285.5L225.5 318L193.5 298Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <Path
        id="SBA Dean&#39;s Office"
        d="M154 364L121.5 343.5L140.5 311L161 278.5L193.5 298L226 318L206.5 350.5L186 383L154 364Z"
        fill="#C9C9C9"
        stroke="black"
      />
      <G id="VPAA Office" filter="url(#filter0_d_57_17)">
        <Path
          d="M114 428.5L81.5 408.5L101 376.5L121.5 343.5L154 363.5L186 383L166.5 416L147 449L114 428.5Z"
          fill="#C9C9C9"
        />
        <Path
          d="M114 428.5L81.5 408.5L101 376.5L121.5 343.5L154 363.5L186 383L166.5 416L147 449L114 428.5Z"
          stroke="black"
        />
      </G>
      <Path id="AMS Stall" d="M436.5 141.5L398 141V167H436.5V141.5Z" fill="#C9C9C9" stroke="black" />
      <Circle id="ams_100" cx={182} cy={389} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_28" cx={193} cy={395} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_101" cx={222} cy={324} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_102" cx={229} cy={312} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_103" cx={262} cy={258} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_104" cx={269} cy={247} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_24" cx={279} cy={252} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_restroom_female_1" cx={135} cy={167} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_restroom_male_1" cx={200} cy={167} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_22" cx={135} cy={178} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_21" cx={200} cy={178} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_105" cx={277} cy={167} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_20" cx={277} cy={178} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_106" cx={353} cy={167} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_19" cx={353} cy={178} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_23" cx={304} cy={210} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="node 22" cx={363} cy={213} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_entrance_3" cx={369} cy={232} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_18" cx={357.5} cy={192.5} r={3.5} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_17" cx={416} cy={180} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_C_L1_2" cx={379} cy={117} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_C_L1_3" cx={416} cy={117} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_C_L1_4" cx={416} cy={141} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stall" cx={416} cy={167} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_107" cx={506} cy={167} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_16" cx={506} cy={180} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_108_A" cx={520} cy={167} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_15" cx={520} cy={180} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_108_B" cx={582} cy={167} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_14" cx={582} cy={180} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_109" cx={659} cy={167} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_110" cx={726} cy={167} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_111" cx={747} cy={167} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_B_L1_1" cx={872} cy={138} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_B_L1_2" cx={872} cy={101} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_B_L1_3" cx={905} cy={102} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_B_L1_4" cx={905} cy={120} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_113" cx={914} cy={172} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_entrance_2" cx={897} cy={215} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Ellipse id="intersection_8" cx={909} cy={189.5} rx={3} ry={2.5} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_10" cx={856} cy={180} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_9" cx={872} cy={161} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_114" cx={977} cy={213} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_115" cx={1041} cy={256} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_116" cx={1052} cy={263} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_118" cx={1116} cy={305} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_119" cx={1168} cy={339} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_120" cx={1232} cy={381} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_A_L1_1" cx={1270} cy={363} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_A_L1_2" cx={1290} cy={333} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_A_L1_3" cx={1312} cy={348} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_stair_A_L1_4" cx={1307} cy={355} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams 121" cx={1301} cy={381} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_1" cx={1280} cy={429} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_entrance_1" cx={1280} cy={441} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_122" cx={1312} cy={389} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_2" cx={1224} cy={392} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_3" cx={1161} cy={351} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_6" cx={1033} cy={268} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_5" cx={1044} cy={275} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_4" cx={1108} cy={317} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_7" cx={969} cy={224} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="node 43" cx={942} cy={207} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_12" cx={726} cy={180} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_11" cx={747} cy={180} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_13" cx={659} cy={180} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_25" cx={272} cy={264} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_26" cx={239} cy={318} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_27" cx={232} cy={329} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="intersection_21" cx={200} cy={178} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Circle id="ams_to_jh" cx={150} cy={463} r={3} fill="#D9D9D9" fillOpacity={0.02} />
      <Path id="ramp 1 to 2nd floor" d="M141 458.5L147 449L81.5 408.5L69 429.5L98 447L104 435.5L141 458.5Z" stroke="black" />
      <Path id="Vector 1" d="M150 462.5L193 394.5L232 329L240.5 316L272.5 263L279.5 250.5L303 209L356.5 192L415.5 180H505H519.5H581.5H658H734H855.5L907 189L941 206.5L967.5 224L1032 267L1044.5 275.5L1107.5 316L1161.5 350.5L1223.5 391.5L1279 427.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 2" d="M279 252L269 247" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 3" d="M272 264L262 258.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 4" d="M239 318L229 312.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 5" d="M232 329.5L222 324.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 6" d="M193 395L182.5 389" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 7" d="M135 178H200.5H277H353L357 192L363 213L369 232.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 9" d="M506 180V167.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 10" d="M520 180V167" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 11" d="M582 180V167.5M659 180V167" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 12" d="M726 180V167.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 64" d="M747 180V167.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 13" d="M897 214L909 189" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 14" d="M969 224.5L976.5 213.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 15" d="M1033 267.5L1040.5 256" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 16" d="M1044 275L1052 263.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 17" d="M1108 316.5L1115.5 305.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 18" d="M1161 350.5L1167.5 340.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 19" d="M1224 392L1231.5 382" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 20" d="M1269.5 364L1279.5 428.5L1300.5 382.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 32" d="M1269.5 364L1290 333L1312.5 348L1307.5 355" stroke="#EDEDED" strokeOpacity={0.02} strokeWidth={4} />
      <Path id="Vector 21" d="M1279.5 429L1311 390" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 22" d="M872 139V161.5L908 189.5L913.5 172.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 23" d="M357 192L379 169" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 34" d="M379 169.5V117H416.5V141.5" stroke="#EDEDED" strokeOpacity={0.02} strokeWidth={4} />
      <Path id="Vector 24" d="M353 178V168" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 25" d="M277 178V167.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 26" d="M200 178V167.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 27" d="M135 179.5V167.5" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Vector 28" d="M1280 428.5V441" stroke="#EDEDED" strokeWidth={4} />
      <Path id="Dean of Student and Alumni Affairs" d="M589 167H665V90H589V167Z" fill="#C9C9C9" stroke="black" />
      <Path id="SHS Guidance Office" d="M1332.5 346L1306 385L1337.5 406.5L1364 366.5L1332.5 346Z" fill="#C9C9C9" stroke="black" />
      <Path id="stair 1 to 2nd floor" d="M398 141.5H436.5V90H360V141.5M398 141.5L397.948 144.25M398 141.5H360M360 165V168H397.5L397.623 161.5M360 165H397.5L397.623 161.5M360 165V161.5M397.623 161.5H360M397.623 161.5L397.679 158.5M360 161.5V158.5M397.679 158.5H360M397.679 158.5L397.736 155.5M360 158.5V155.5M360 155.5H397.736M360 155.5V152.5M397.736 155.5L397.792 152.5M397.792 152.5H360M397.792 152.5L397.84 150M360 152.5V150M360 150H397.84M360 150V147M397.84 150L397.896 147M397.896 147H360M397.896 147L397.948 144.25M360 147V144.223M360 144.223L397.948 144.25M360 144.223V141.5" stroke="black" />
      <Path id="stair 2 to 2nd floor" d="M888.5 117.5L921 125.5V89.5H856V111.5M888.5 117.5V120.5M888.5 117.5H856M888.5 117.5V111.5H856M856 134.5V138.5H888.5V134.5M856 134.5H888.5M856 134.5V132M888.5 134.5V132M888.5 132H856M888.5 132V129M856 132V129M856 129H888.5M856 129V126M888.5 129V126M888.5 126H856M888.5 126V123.5M856 126V123.5M856 123.5H888.5M856 123.5V120.5M888.5 123.5V120.5M888.5 120.5H856M856 120.5V117.5M856 117.5V114.5M888.5 114.5H856M856 114.5V111.5" stroke="black" />
      <Path id="Vector 63" d="M872 139.5V101H905V119.5" stroke="#EDEDED" strokeOpacity={0.02} strokeWidth={4} />
      <Path id="stair 3 to 2nd floor" d="M1259.64 351.5L1258 354L1281.5 369.5L1283.15 367M1259.64 351.5L1283.15 367M1259.64 351.5L1261 349.415M1283.15 367L1284.62 364.763M1284.62 364.763L1261 349.415M1284.62 364.763L1286.11 362.5M1261 349.415L1262.71 346.794M1262.71 346.794L1286.11 362.5M1262.71 346.794L1264.22 344.5M1286.11 362.5L1287.5 360.397M1287.5 360.397L1264.22 344.5M1287.5 360.397L1289.08 358M1264.22 344.5L1265.85 342M1265.85 342L1289.08 358M1265.85 342L1267.33 339.744M1289.08 358L1290.73 355.5M1290.73 355.5L1267.33 339.744M1290.73 355.5L1292.38 353M1267.33 339.744L1268.8 337.5M1268.8 337.5L1292.38 353M1268.8 337.5L1270.43 335M1292.38 353L1293.92 350.654M1293.92 350.654L1270.43 335M1293.92 350.654L1295.5 348.259M1270.43 335L1272.07 332.5M1272.07 332.5L1284.5 313.5L1332.5 346L1320 364L1296 347.5L1295.5 348.259M1272.07 332.5L1295.5 348.259" stroke="black" />
      <Path id="ground building outline" d="M134.5 469.5L69 429.5L142.5 308L214.5 190.5H125L135.5 90H436.5H664.5V55.5H817V90H921L999 141L1011.5 123.5L1034 138.5L1023.5 157L1276.5 325L1284.5 313.5L1364 366.5L1337.5 406.5L1338.5 407.227M1323 440L1343 410.5L1340.5 408.682M1323 440L1320.25 438.351M1323 440L1319.5 446L1250 453L1226 442.5L1227.75 440M1313 434L1333.5 403.5L1336 405.5L1315.5 435.5M1313 434L1315.5 435.5M1313 434L1253 441.5L1233 432.5M1315.5 435.5L1318 437M1315.5 435.5L1313 438L1252.5 444.5L1231.5 434.643M1318 437L1338.5 407.227M1318 437L1320.25 438.351M1318 437L1316 440.5L1251.5 447L1229.5 437.5M1338.5 407.227L1340.5 408.682M1340.5 408.682L1320.25 438.351M1320.25 438.351L1318 443L1251 450L1227.75 440M1233 432.5L1231.5 434.643M1233 432.5L1241 420L1158 366L1063 303.5L999 260.5L935.5 218.5L933.23 225.5M1231.5 434.643L1229.5 437.5M1229.5 437.5L1227.75 440M853.5 199L933.23 225.5M853.5 199L852.5 202M853.5 199L856.5 190H726H512.5H435.5M933.23 225.5L932.095 229M932.095 229L852.5 202M932.095 229L931.284 231.5M852.5 202L851.667 204.5M851.667 204.5L931.284 231.5M851.667 204.5L850.833 207M931.284 231.5L930.392 234.25M930.392 234.25L929.5 237L850 209.5L850.833 207M930.392 234.25L850.833 207M435.5 190L306.5 229.5M435.5 190L436.438 193M306.5 229.5L307.32 232M306.5 229.5L246 330L187 428.5L155 481.5M436.438 193L307.32 232M436.438 193L437.375 196M307.32 232L308.305 235M308.305 235L437.375 196M308.305 235L309.289 238M437.375 196L438.312 199M438.312 199L309.289 238M438.312 199L443.781 216.5M309.289 238L314.703 254.5L315.195 256M315.195 256L443.781 216.5M315.195 256L316.098 258.75M443.781 216.5L444.641 219.25M444.641 219.25L445.5 222L317 261.5L316.098 258.75M444.641 219.25L316.098 258.75" stroke="black" />
    </G>

    {/* ROOM LABELS */}
    <G id="Room Labels">
        <Text x="182" y="389" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 100</Text>
        <Text x="222" y="324" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 101</Text>
        <Text x="229" y="312" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 102</Text>
        <Text x="262" y="258" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 103</Text>
        <Text x="269" y="247" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 104</Text>
        <Text x="277" y="167" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 105</Text>
        <Text x="353" y="167" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 106</Text>
        <Text x="506" y="167" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 107</Text>
        <Text x="520" y="167" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 108A</Text>
        <Text x="582" y="167" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 108B</Text>
        <Text x="659" y="167" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 109</Text>
        <Text x="726" y="167" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 110</Text>
        <Text x="747" y="167" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 111</Text>
        <Text x="914" y="172" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 113</Text>
        <Text x="977" y="213" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 114</Text>
        <Text x="1041" y="256" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 115</Text>
        <Text x="1052" y="263" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 116</Text>
        <Text x="1116" y="305" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 118</Text>
        <Text x="1168" y="339" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 119</Text>
        <Text x="1232" y="381" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 120</Text>
        <Text x="1301" y="381" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 121</Text>
        <Text x="1312" y="389" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">AMS 122</Text>
        <Text x="135" y="167" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">FemaleCR</Text>
        <Text x="200" y="167" fontSize="10" fill="black" textAnchor="middle" alignmentBaseline="middle">MaleCR</Text>
    </G>

    {/* PATH DRAWING LOGIC */}

    {pathCoordinates && pathCoordinates.length > 0 && (
      <>
        <Polyline
          points={pathCoordinates.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="#00FF00"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Start Node (Green Dot) */}
        <Circle
          cx={pathCoordinates[0].x}
          cy={pathCoordinates[0].y}
          r={8}
          fill="green"
          stroke="white"
          strokeWidth={2}
        />

        {/* End Node (Red Dot) */}
        <Circle
          cx={pathCoordinates[pathCoordinates.length - 1].x}
          cy={pathCoordinates[pathCoordinates.length - 1].y}
          r={8}
          fill="red"
          stroke="white"
          strokeWidth={2}
        />
      </>
    )}

    <Defs></Defs>
  </Svg>
);

export default SVGComponent;