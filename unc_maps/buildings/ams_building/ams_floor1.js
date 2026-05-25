import * as React from "react";
import Svg, { G, Path, Circle, Ellipse, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SVGComponent = (props) => (
  <Svg width={1414} height={527} viewBox="0 0 1414 527" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} >
    <G id="AMS Ground Floor">
      <Path id="Security Office" d="M888.5 154L919 175L958.5 115L921 89.5V125.5L888.5 117.5V154Z" fill="#C9C9C9" stroke="black" />
      <Path id="BIDYO Office" d="M1296 347.5L1282 369L1306 385L1319 363.5L1296 347.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="AMSCO Office" d="M1205 364L1173.5 343.5L1195 311.5L1213.5 283L1245 304L1276.5 325L1258.5 353.5L1237.5 385.5L1205 364Z" fill="#C9C9C9" stroke="black" />
      <Path id="Plannning and Quality Management Office" d="M1173.5 343.5L1141.5 322.5L1181.5 262L1213.5 283L1195 311.5L1173.5 343.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="Scholarship and Grants Office" d="M1141.5 322.5L1109.5 301L1149.5 241L1181.5 262L1163 290.5L1141.5 322.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="COE Faculty Office " d="M1109.5 301L1078 280L1117.5 220L1149.5 241L1131.5 269L1109.5 301Z" fill="#C9C9C9" stroke="black" />
      <Path id="COE Dean&#39;s Office" d="M1078.5 280.5L1047 259.5L1086.5 200L1118 220.5L1078.5 280.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="SPED Lab" d="M1046.5 259L1014.5 238L1054.5 177.5L1086 199.5L1067.5 227L1046.5 259Z" fill="#C9C9C9" stroke="black" />
      <Path id="Dance Studio" d="M951 195.5L919 175L958.5 115L999 141L1011 123.5L1034 138.5L1023 157L1054.5 177.5L1014.5 238L982.5 216.5L951 195.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="ams 112" d="M856.5 166.5H818V128V89.5H855.5L856 128L856.5 166.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="University College Guidance and Testing Room" d="M741.5 166.5L665 167V129L664.5 90V56H817V89.5H818V128V166.5H741.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="SSNS Dean&#39;s Office" d="M589 167H550.5V129.5V90H589V128V167Z" fill="#C9C9C9" stroke="black" />
      <Path id="CJE Dean&#39;s Office" d="M550.5 167H512.5V129V90H550.5V167Z" fill="#C9C9C9" stroke="black" />
      <Path id="PEP Room" d="M436.5 128V167H512.5V128V90H436.5V128Z" fill="#C9C9C9" stroke="black" />
      <Path id="VPAAS Office" d="M322 166.5H284V128.5V90H322H360V128V166.5H322Z" fill="#C9C9C9" stroke="black" />
      <Path id="SSNS Faculty Room" d="M284 166.5H207V128V90H245H284V128V166.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="Restroom Male" d="M207 166.5H166.5V128V90H207V128V166.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="CJE Faculty Room" d="M233 233L201 213L214.5 190.5L245.5 190H283.5L286.5 218L265.5 253L233 233Z" fill="#C9C9C9" stroke="black" />
      <Path id="Restroom Female" d="M166.5 166.5H128L131.5 128L135 90H166.5V128V166.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="ETEAP" d="M245.5 285.5L181 245.5L201 213L233 233L265.5 253L245.5 285.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="SBA Faculty Room" d="M193.5 298L161 278.5L181 245.5L245.5 285.5L225.5 318L193.5 298Z" fill="#C9C9C9" stroke="black" />
      <Path id="SBA Dean&#39;s Office" d="M154 364L121.5 343.5L140.5 311L161 278.5L193.5 298L226 318L206.5 350.5L186 383L154 364Z" fill="#C9C9C9" stroke="black" />
    <G id="VPAA Office" filter="url(#filter0_d_57_17)">
      <Path d="M114 428.5L81.5 408.5L101 376.5L121.5 343.5L154 363.5L186 383L166.5 416L147 449L114 428.5Z" fill="#C9C9C9" />
      <Path d="M114 428.5L81.5 408.5L101 376.5L121.5 343.5L154 363.5L186 383L166.5 416L147 449L114 428.5Z" stroke="black" />
    </G>
      <Path id="AMS Stall" d="M436.5 141.5L398 141V167H436.5V141.5Z" fill="#C9C9C9" stroke="black" />
      <Path id="Dean of Student and Alumni Affairs" d="M589 167H665V90H589V167Z" fill="#C9C9C9" stroke="black" />
      <Path id="SHS Guidance Office" d="M1332.5 346L1306 385L1337.5 406.5L1364 366.5L1332.5 346Z" fill="#C9C9C9" stroke="black" />
    <G id="stair 1 to 2nd floor">
      <Path d="M360 90H436.5V141.5H398L397.948 144.25L397.896 147L397.84 150L397.792 152.5L397.736 155.5L397.679 158.5L397.623 161.5L397.5 168H360V165V161.5V158.5V155.5V152.5V150V147V144.223V141.5V90Z" fill="#C9C9C9" />
      <Path d="M398 141.5H436.5V90H360V141.5M398 141.5L397.948 144.25M398 141.5H360M397.679 158.5L397.623 161.5L397.5 168H360V165M360 165H397.5L397.623 161.5M360 165V161.5M397.623 161.5H360M360 161.5V158.5M397.679 158.5H360M397.679 158.5L397.736 155.5M360 158.5V155.5M360 155.5H397.736M360 155.5V152.5M397.736 155.5L397.792 152.5M397.792 152.5H360M397.792 152.5L397.84 150M360 152.5V150M360 150H397.84M360 150V147M397.948 144.25L397.896 147L397.84 150M397.896 147H360M360 147V144.223M360 144.223L397.948 144.25M360 144.223V141.5" stroke="black" />
    </G>
    <G id="stair 2 to 2nd floor">
      <Path d="M856 89.5H921V111.5V114.5V118V120.75V123.5V125.5L888.5 117.5V120.5V123.5V126V129V132V134.5V138.5H856V134.5V132V129V126V123.5V120.5V117.5V114.5V111.5V89.5Z" fill="#C9C9C9" />
      <Path d="M888.5 117.5L921 125.5V123.5M888.5 117.5V120.5M888.5 117.5H856M888.5 117.5V114.5M856 134.5V138.5H888.5V134.5M856 134.5H888.5M856 134.5V132M888.5 134.5V132M888.5 132H856M888.5 132V129M856 132V129M856 129H888.5M856 129V126M888.5 129V126M888.5 126H856M888.5 126V123.5M856 126V123.5M856 123.5H888.5M856 123.5V120.5M888.5 123.5V120.5M888.5 120.5H856M856 120.5V117.5M856 117.5V114.5M888.5 114.5H856M888.5 114.5V111.5M888.5 114.5H921M888.5 114.5L901.139 118M856 114.5V111.5M856 111.5V89.5H921V111.5M856 111.5H888.5M888.5 111.5H921M901.139 118L911.069 120.75L921 123.5M921 123.5V120.75M921 111.5V114.5M921 114.5V118M921 118H901.139M921 118V120.75M911.069 120.75H921" stroke="black" />
    </G>
    <G id="stair 3 to 2nd floor">
      <Path d="M1284.5 313.5L1332.5 346L1320 364L1296 347.5L1295.5 348.259L1293.92 350.654L1292.38 353L1290.73 355.5L1289.08 358L1287.5 360.397L1286.11 362.5L1284.62 364.763L1283.15 367L1281.5 369.5L1258 354L1259.64 351.5L1261 349.415L1262.71 346.794L1264.22 344.5L1265.85 342L1267.33 339.744L1268.8 337.5L1270.43 335L1272.07 332.5L1284.5 313.5Z" fill="#C9C9C9" />
      <Path d="M1261 349.415L1259.64 351.5L1258 354L1281.5 369.5L1283.15 367L1284.62 364.763L1286.11 362.5L1287.5 360.397M1259.64 351.5L1283.15 367M1284.62 364.763L1261 349.415M1264.22 344.5L1262.71 346.794L1261 349.415M1262.71 346.794L1286.11 362.5M1287.5 360.397L1264.22 344.5M1290.73 355.5L1289.08 358L1287.5 360.397M1267.33 339.744L1265.85 342L1264.22 344.5M1265.85 342L1289.08 358M1290.73 355.5L1267.33 339.744M1290.73 355.5L1292.38 353M1267.33 339.744L1268.8 337.5M1268.8 337.5L1292.38 353M1268.8 337.5L1270.43 335M1270.43 335L1272.07 332.5L1284.5 313.5L1332.5 346L1320 364L1296 347.5L1295.5 348.259L1293.92 350.654L1292.38 353M1293.92 350.654L1270.43 335M1272.07 332.5L1295.5 348.259" stroke="black" />
    </G>
    <G id="ams 1F building outline">
      <Path d="M1344 411L1324 440.5L1320.5 446.5L1251 453.5L1227 443L1228.75 440.5L1230.5 438L1232.5 435.143L1234 433L1242 420.5L1159 366.5L1064 304L1000 261L936.5 219L934.23 226L933.095 229.5L932.284 232L931.392 234.75L930.5 237.5L851 210L851.833 207.5L852.667 205L853.5 202.5L854.5 199.5L857.5 190.5H727H513.5H436.5L437.438 193.5L438.375 196.5L439.312 199.5L444.781 217L445.641 219.75L446.5 222.5L318 262L317.098 259.25L316.195 256.5L315.703 255L310.289 238.5L309.305 235.5L308.32 232.5L307.5 230L436.5 190.5H513.5H727H857.5L854.5 199.5L934.23 226L936.5 219L1000 261L1064 304L1159 366.5L1242 420.5L1234 433L1254 442L1314 434.5L1334.5 404L1337 406L1338.5 407L1339.5 407.727L1341.5 409.182L1344 411Z" fill="#C9C9C9" />
      <Path d="M135.5 470L70 430L143.5 308.5L215.5 191H126L136.5 90.5H437.5H665.5V56H818V90.5H922L1000 141.5L1012.5 124L1035 139L1024.5 157.5L1277.5 325.5L1285.5 314L1365 367L1338.5 407M1341.5 409.182L1339.5 407.727L1338.5 407M1338.5 407L1337 406M1324 440.5L1344 411L1341.5 409.182M1324 440.5L1321.25 438.851M1324 440.5L1320.5 446.5L1251 453.5L1227 443L1228.75 440.5M1314 434.5L1334.5 404L1337 406M1314 434.5L1316.5 436M1314 434.5L1254 442L1234 433M1337 406L1316.5 436M1316.5 436L1319 437.5M1316.5 436L1314 438.5L1253.5 445L1232.5 435.143M1319 437.5L1339.5 407.727M1319 437.5L1321.25 438.851M1319 437.5L1317 441L1252.5 447.5L1230.5 438M1341.5 409.182L1321.25 438.851M1321.25 438.851L1319 443.5L1252 450.5L1228.75 440.5M1230.5 438L1232.5 435.143L1234 433M1234 433L1242 420.5L1159 366.5L1064 304L1000 261L936.5 219L934.23 226M1230.5 438L1228.75 440.5M854.5 199.5L934.23 226M852.667 205L853.5 202.5L854.5 199.5M156 482L188 429L247 330.5L307.5 230L436.5 190.5H513.5H727H857.5L854.5 199.5M934.23 226L933.095 229.5M933.095 229.5L853.5 202.5M931.392 234.75L932.284 232L933.095 229.5M852.667 205L932.284 232M852.667 205L851.833 207.5M931.392 234.75L930.5 237.5L851 210L851.833 207.5M931.392 234.75L851.833 207.5M436.5 190.5L437.438 193.5M307.5 230L308.32 232.5M437.438 193.5L308.32 232.5M437.438 193.5L438.375 196.5M308.32 232.5L309.305 235.5M309.305 235.5L438.375 196.5M309.305 235.5L310.289 238.5M438.375 196.5L439.312 199.5M439.312 199.5L310.289 238.5M439.312 199.5L444.781 217M310.289 238.5L315.703 255L316.195 256.5M316.195 256.5L444.781 217M316.195 256.5L317.098 259.25M444.781 217L445.641 219.75M445.641 219.75L446.5 222.5L318 262L317.098 259.25M445.641 219.75L317.098 259.25" stroke="black" />
    </G>
    <G id="RAMP 1F TO 2F">
      <Path d="M141.5 458.5L88 425.5L86.5 428L103 438L100.556 442L97.5 447L69 429.5L81.5 408.5L147 449L144.25 453.75L141.5 458.5Z" fill="#C9C9C9" />
      <Path d="M144.25 453.75L147 449L81.5 408.5L69 429.5L97.5 447L100.556 442M144.25 453.75L141.5 458.5L88 425.5L86.5 428L103 438L100.556 442M144.25 453.75L85 418.5L79.5 428L100.556 442" stroke="black" />
    </G>
    <G id="RAMP ENTRANCE">
      <Path d="M1241 420L1222 449L1142.5 394L1146.1 389L1151.5 381.5L1212.5 423.5L1222.5 408L1231.75 414L1241 420Z" fill="#C9C9C9" />
      <Path d="M1146.1 389L1142.5 394L1222 449L1241 420L1231.75 414L1222.5 408L1212.5 423.5L1151.5 381.5L1146.1 389ZM1231.75 414L1217 436L1146.1 389" stroke="black" />
    </G>
      <Circle id="ams_f1_room_100" cx={182} cy={386} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_1" cx={195} cy={392} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_2" cx={234} cy={328} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_3" cx={242} cy={315} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_4" cx={272} cy={264} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_5" cx={280} cy={250} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_6" cx={134} cy={178} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_7" cx={200} cy={178} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_8" cx={277} cy={178} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_9" cx={506} cy={178} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_10" cx={519} cy={178} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_11" cx={582} cy={178} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_12" cx={659} cy={178} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_link_jh_f1" cx={147} cy={469} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_101" cx={223} cy={322} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_102" cx={230} cy={310} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_103" cx={261} cy={258} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_104" cx={269} cy={244} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_105" cx={277} cy={166} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_cr_male" cx={200} cy={166} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_cr_female" cx={134} cy={166} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_106" cx={354} cy={166} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_107" cx={506} cy={166} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_foodstall" cx={416} cy={166} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_108_A" cx={519} cy={166} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_108_B" cx={582} cy={166} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_109" cx={659} cy={166} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_110" cx={735} cy={165} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_111" cx={748} cy={165} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_112" cx={838} cy={165} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_113" cx={914} cy={170} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_114" cx={977} cy={212} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_115" cx={1041} cy={254} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_116" cx={1051} cy={262} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_117" cx={1105} cy={295} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_118" cx={1116} cy={303} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_119" cx={1168} cy={337} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_120" cx={1231} cy={378} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_121" cx={1301} cy={378} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_stair_A_1" cx={1270} cy={361} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Ellipse id="ams_f1_stair_A_2" cx={1291} cy={329.5} rx={4} ry={3.5} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_stair_A_3" cx={1315} cy={343} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_stair_A_4" cx={1306} cy={353} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_room_122" cx={1312} cy={386} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_22" cx={1223} cy={392} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_lobby_A" cx={1273} cy={416} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_21" cx={1158} cy={352} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_20" cx={1108} cy={319} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_19" cx={1095} cy={311} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_18" cx={1041} cy={276} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_17" cx={1029} cy={267} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_16" cx={965} cy={226} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_15" cx={838} cy={181} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_14" cx={748} cy={178} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_13" cx={735} cy={178} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_lobby_B" cx={897} cy={195} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_lobby_C" cx={350} cy={193} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_24" cx={303} cy={216} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_int_23" cx={438} cy={178} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_stair_B_1" cx={872} cy={139} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_stair_B_2" cx={872} cy={101} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_stair_B_3" cx={905} cy={102} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_stair_B_4" cx={905} cy={121} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_stair_C_1" cx={379} cy={167} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_stair_C_2" cx={379} cy={118} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Circle id="ams_f1_stair_C_3" cx={416} cy={118} r={4} fill="#D9D9D9" fillOpacity={0.05} />
      <Ellipse id="ams_f1_stair_C_4" cx={416} cy={140.5} rx={4} ry={3.5} fill="#D9D9D9" fillOpacity={0.05} />
      <Path id="ams_f1_pathguide" d="M1095 313L1107.5 321.5L1158 355L1223 396L1273 419L1312.5 389.5M1273 419L1301 381M1273 419L1269.5 364L1290.5 332.5L1313.5 346.5L1306.5 356.5M1223 396L1231.5 382M1158 355L1168 340.5M1107.5 321.5L1117 306M1028.5 269L1041 278L1095 313M1095 313L1105 298.5M1041 278L1052 263.5M1028.5 269L965 227M1028.5 269L1041 255.5M965 227L897 196.5M965 227L977 213.5M897 196.5L838.5 181.5M897 196.5L914 172M897 196.5L872 139.5V101H905.5V121.5M838.5 181.5L748 179M838.5 181.5L837.5 166.5M748 179H734.5M748 179V166M734.5 179H658.5M734.5 179V166.5M658.5 179H583M658.5 179V167M583 179H519M583 179V167M519 179H506M519 179V167M506 179H437.5M506 179V167M437.5 179L349.5 194M437.5 179L416.5 168.5L349.5 194M349.5 194L302 217M349.5 194L379.5 168.5V117H416.5V142M349.5 194L277 179M349.5 194L353.5 166.5M302 217L280 252M302 217L277 179M147 473L194.5 395.5L234 330L241.5 317.5L271.5 266.5L280 252M280 252L269 246.5M271.5 266.5L261 260M241.5 317.5L229.5 312M234 330L223 324M194.5 395.5L182 389M277 179H200.5M277 179V167M200.5 179H134V167.5M200.5 179V167" stroke="#EDEDED" strokeOpacity={0.1} strokeWidth={3} />
    </G>
    <Defs>
    </Defs>
  </Svg>
);
export default SVGComponent;