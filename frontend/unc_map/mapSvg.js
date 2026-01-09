import * as React from "react";
import Svg, { Rect, G, Path, Ellipse, Circle, Text, Polyline } from "react-native-svg";
import nodesData from "./nodes.json";
import { Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
// Shared location list for suggestions
export const locations = [
    { name: 'UNC Library', type: 'building', x: 759, y: 745 },
    { name: 'UNC Chapel', type: 'building', x: 950, y: 580 },
    { name: 'UNC Covered Court', type: 'building', x: 650, y: 540 },
    { name: 'AMS Building', type: 'building', x: 850, y: 300 },
    { name: 'JH Building', type: 'building', x: 480, y: 310 },
    { name: 'DHS Building', type: 'building', x: 887, y: 680 },
    { name: 'EN Building', type: 'building', x: 290, y: 590 },
    { name: 'ME Building', type: 'building', x: 200, y: 526 },
    { name: 'NB Building', type: 'building', x: 660, y: 700 },
    { name: 'HS Building', type: 'building', x: 510, y: 600 },
    { name: 'SP Building', type: 'building', x: 300, y: 387 },
    { name: 'Science Bldg', type: 'building', x: 330, y: 690 },
    { name: 'Flagpole', type: 'landmark', x: 823, y: 441.9 },
    { name: 'UNC Toblerone', type: 'landmark', x: 914.5, y: 515 },
    { name: 'UNC Fountain', type: 'landmark', x: 943.5, y: 479 },
    { name: 'UNC Arch', type: 'landmark', x: 999.5, y: 498 },
    { name: 'DHS Monument', type: 'landmark', x: 836.5, y: 696 },
    { name: 'Eco Canteen', type: 'landmark', x: 260, y: 660 },
    { name: 'Main Gate Entrance', type: 'gate', x: 1093, y: 524.5 },
    { name: 'Main Gate Exit', type: 'gate', x: 1099, y: 546.5 },
    { name: 'Second Gate', type: 'gate', x: 296, y: 310 },
];

// 1. Translation Map (Make sure these match your 'locations' array names EXACTLY)
export const nameToNodeMap = {
    "UNC Library": ["18"],
    "UNC Chapel": ["24"],
    "UNC Covered Court": ["20", "21", "22", "23"], // North, South, East, West entrances
    "AMS Building": ["3", "4"],
    "JH Building": ["6", "7", "8", "69"],           // Multi-wing access
    "DHS Building": ["19"],
    "EN Building": ["12", "27", "28"],
    "ME Building": ["11"],
    "NB Building": ["17"],
    "HS Building": ["14", "15", "16"],
    "SP Building": ["9", "10"],
    "Science Bldg": ["13", "28"],
    "Flagpole": ["53"],
    "UNC Toblerone": ["31"],
    "UNC Fountain": ["32"],
    "UNC Arch": ["33"],
    "DHS Monument": ["34"],
    "Eco Canteen": ["30"],
    "Main Gate Entrance": ["1"],
    "Main Gate Exit": ["25"],
    "Second Gate": ["26"]
};
const SVGComponent = (props) => {
    const { startNode, endNode, paths = { primary: [], alternative: [] } } = props;

    // Get target nodes (all entrances)
    const getTargetNodes = (input) => {
        if (!input) return [];

        const mapped = nameToNodeMap[input];
        if (Array.isArray(mapped) && mapped.length > 0) {
            return mapped.map(id => nodesData.nodes[String(id)]).filter(Boolean);
        }

        if (typeof mapped === 'string' && nodesData.nodes[String(mapped)]) {
            return [nodesData.nodes[String(mapped)]];
        }

        if (nodesData.nodes[String(input)]) {
            return [nodesData.nodes[String(input)]];
        }

        return Object.values(nodesData.nodes).filter(node => String(node.id) === String(input));
    };

    const startTargets = getTargetNodes(startNode);
    const endTargets = getTargetNodes(endNode);

    // SVG dimensions
    const SVG_WIDTH = 1223;
    const SVG_HEIGHT = 1078;

    // Calculate responsive size - fit portrait phone
    const maxWidth = screenWidth * 0.95;
    const maxHeight = screenHeight * 0.7;
    const aspectRatio = SVG_WIDTH / SVG_HEIGHT;

    let displayWidth = maxWidth;
    let displayHeight = displayWidth / aspectRatio;

    if (displayHeight > maxHeight) {
        displayHeight = maxHeight;
        displayWidth = displayHeight * aspectRatio;
    }

    return (
        <Svg
            width={displayWidth}
            height={displayHeight}
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="#F8F9FA" />
            <G id="Frame 1">

                {/* AREA & GROUNDS */}
                <Path id="AREA" d="M921.5 444L1119.5 518.5L1109 554L1000.5 527L959.5 609L1076.5 647.5L1062.5 693L929 647.5L861 812L433 657L413 679L297 718L246.5 711L231 674L200 644L132.5 589L144 542L150 509L161 495L139 444L132 403V374L331 302L674 175L721 136L819.5 225.5L890 290L907 352L921.5 444Z" fill="white" fillOpacity={0.5} stroke="#B8B8B8" />
                <Path id="GROUNDS" d="M385 375L374.5 384.5V407.5L453.5 494L517 532.5L827.5 669.5H841L850 661.5L893 576L925.5 502L927 491L918 481L861 458.5L840 365L831.5 324L797.5 284L755.5 256.5H729L655 284L507.5 344H469L385 375Z" fill="#DCFFC6" />

                {/* BUILDINGS */}
                <Rect id="cc" x={595.29} y={458.104} width={113.377} height={91.2512} transform="rotate(22.6778 595.29 458.104)" fill="#C9C9C9" stroke="black" />
                <Path id="AMS" d="M702 183.5L640.5 206V231.5L648.5 245.5L723.5 224L757 231.5L851 317.5L877.5 438L904.5 450.5L916 441.5L881 292.5L717.5 144.5L690 167.5L702 183.5Z" fill="#C9C9C9" stroke="black" />
                <Path id="JH RIGHT WING" d="M626.5 220.5L493.5 265.5L496 281L504 296L638.5 251L626.5 220.5Z" fill="#C9C9C9" stroke="black" />
                <Path id="JH MIDDLE" d="M486 264.5L459.5 275L470 303L497.5 294.5L486 264.5Z" fill="#C9C9C9" stroke="black" />
                <Path id="JH LEFT WING" d="M454 277.5L326 321.5L336 353L468 306.5L454 277.5Z" fill="#C9C9C9" stroke="black" />
                <Path id="CHAPEL" d="M964 522L985 532L948.5 615L924 601.5L917.5 576L940 527.5L964 522Z" fill="#C9C9C9" stroke="black" />
                <Path id="DHS" d="M857.5 806L926.5 628.5L892.5 615L879 623.5L813 789.5L857.5 806Z" fill="#C9C9C9" stroke="black" />
                <Path id="LIBRARY" d="M825.5 695L718 651.5L678.5 740.5L786 783L825.5 695Z" fill="#C9C9C9" stroke="black" />
                <Path id="STUDENT PAV" d="M706.5 661L654.5 640L619 722.5L671.5 742.5L706.5 661Z" fill="#C9C9C9" stroke="black" />
                <Path id="NB" d="M508 613.5L478.5 600.5L455 655.5L615.5 724L638.5 672.5L615.5 663.5L609 679L501.5 633L508 613.5Z" fill="#C9C9C9" stroke="black" />
                <Path id="HS" d="M642 664.5L655 637L456 546L446 549.5L439 555.5L410 637L435 644.5L439 637L456 644.5L478.5 596.5L635 664.5H642Z" fill="#C9C9C9" stroke="black" />
                <Path id="EN" d="M350.5 483.5L321.5 493.5L329.5 515.5L173 571.5L194.5 641L353.5 590.5L361.5 611.5L394 601.5L350.5 483.5Z" fill="#C9C9C9" stroke="black" />
                <Path id="SP" d="M150 375.5L153.5 392L130 400.5L135 437.5L153.5 485.5L179 477.5L187 493.5L318.5 452L279 332.5L150 375.5Z" fill="#C9C9C9" stroke="black" />
                <Path id="SCIENCE" d="M397.5 627.5L233 678.5L248 713.5L408.5 664L400.5 647L397.5 627.5Z" fill="#C9C9C9" stroke="black" />
                <Path id="ME" d="M187 499L153 511L170.5 569L208.5 555.5L187 499Z" fill="#C9C9C9" stroke="black" />
                <Path id="JH MONUMENT" d="M501.5 362.5L495.5 343L523.5 334.5L531 354.5L501.5 362.5Z" fill="#C9C9C9" stroke="black" />
                <Path id="FLAGPOLE" d="M823 441.927L839.607 427L853 434.317V451L826.75 446.902L823 441.927Z" fill="#C9C9C9" stroke="black" />

                {/* PATHWAYS */}
                <Path id="Vector 3" d="M485.5 299L496.5 326" stroke="#EDEDED" strokeWidth={4} />
                <Path id="Vector" d="M910 458.5L923 455.5L1004 487.115M910 458.5L873.5 443M910 458.5L907 448M873.5 443L843.5 322L755.5 240L742.25 238M873.5 443L938 497.75M326.5 376L341 371.5L372.375 359.125M326.5 376L298 387.5M326.5 376L375.5 443M326.5 376L317.25 351.75M301.5 315.5L317.25 351.75M375.5 443L332.5 471.5L267.75 497.75M375.5 443L401 524M375.5 443L441.5 512M203 524L267.75 497.75M267.75 497.75L280 532M267.75 497.75L256.5 471.5M401 524L372.375 535M401 524L397.5 626M441.5 512L445.5 548.5M441.5 512L491 537.5M491 537.5L483 556M491 537.5L562 572.75L633 608M633 608L627.5 623.5M633 608L685 632M685 632L679.5 646.5M685 632L726.5 642.5L782 660.5M782 660.5L777.5 672M782 660.5L843.5 684.5L862.096 647.75L880.693 611M938 497.75L917.886 537.5M938 497.75L880.693 611M938 497.75L993 512M917.886 537.5L931.5 543.5M917.886 537.5L880.693 611M880.693 611L887.5 618.5M993 512L1004 487.115M993 512L1093 548.5L1098.5 524L1004 487.115M742.25 238L729 236L630 269.75M742.25 238V229M630 269.75L531 303.5L515 322L483 331.5L466.5 322L403.75 346.75L372.375 359.125M630 269.75L623.5 255M372.375 359.125L365.5 341M317.25 351.75L332.5 341" stroke="#EDEDED" strokeWidth={4} />
                <Path id="Vector 2" d="M874.5 445.5L701 500M594 457.5L560.5 445.5L645.5 266.5" stroke="#EDEDED" strokeWidth={4} />
                <Path id="Vector 4" d="M306 605L315 653" stroke="#EDEDED" strokeWidth={4} />
                <Path id="Vector 5" d="M398 620L300 636" stroke="#EDEDED" strokeWidth={4} />
                <Path id="Vector 6" d="M519.5 550L531 522L563 534" stroke="#EDEDED" strokeWidth={4} />
                <Path id="Vector 7" d="M656 584L645 613.5" stroke="#EDEDED" strokeWidth={4} />
                <Path id="Vector 8" d="M561 445L532 520" stroke="#EDEDED" strokeWidth={4} />

                {/* ENTRANCES & INTERSECTIONS */}
                <Ellipse id="entrance_maingate" cx={1099} cy={524.5} rx={7} ry={6.5} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="intersection_32" cx={645} cy={611} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="cc_entrance_4" cx={656} cy={584} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="cc_entrance_3" cx={563} cy={533} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="intersection_1" cx={1004} cy={488} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="ams_entrance_1" cx={908} cy={447} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="ams_entrance_2" cx={741} cy={229} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="jh_entrance_1" cx={625} cy={256} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="jh_entrance_2" cx={365} cy={341} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="jh_entrance_3" cx={333} cy={341} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="sp_entrance_1" cx={300} cy={387} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="sp_entrance_2" cx={257} cy={473} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="me_entrance" cx={200} cy={526} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="en_entrance_1" cx={374} cy={537} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="sc_entrance_1" cx={398} cy={623} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="hs_entrance_1" cx={445} cy={545} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="hs_entrance_2" cx={484} cy={557} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="hs_entrance_3" cx={626} cy={623} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="nb_entrance_1" cx={680} cy={648} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="lib_entrance" cx={778} cy={673} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="cc_entrance_1" cx={701} cy={503} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="cc_entrance_2" cx={593} cy={457} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="chapel_entrance" cx={932} cy={545} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="en_entrance_2" cx={277} cy={529} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Ellipse id="exit_maingate" cx={1093} cy={546.5} rx={7} ry={6.5} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="en_entrance_3" cx={306} cy={608} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="sc_entrance_2" cx={315} cy={653} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="eco_canteen" cx={297} cy={636} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="jh_entrance_3_2" cx={486} cy={301} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="exit_secondgate" cx={304} cy={319} r={4} fill="#D9D9D9" fillOpacity={0.02} />
                <Circle id="entrance_secondgate" cx={296} cy={310} r={4} fill="#D9D9D9" fillOpacity={0.02} />

                {/* LANDMARKS */}
                <Ellipse id="ECO Canteen" cx={260} cy={644.5} rx={5} ry={4.5} fill="#D9D9D9" fillOpacity={0.02} />
                <Ellipse id="UNC Toblerone" cx={914.5} cy={492} rx={5.5} ry={5} fill="#D9D9D9" fillOpacity={0.02} />
                <Ellipse id="UNC Fountain" cx={943.5} cy={479} rx={5.5} ry={5} fill="#D9D9D9" fillOpacity={0.02} />
                <Ellipse id="UNC Arch" cx={999.5} cy={498} rx={5.5} ry={5} fill="#D9D9D9" fillOpacity={0.02} />
                <Ellipse id="DHS Monument" cx={836.5} cy={696} rx={5.5} ry={5} fill="#D9D9D9" fillOpacity={0.02} />

                {/* ALTERNATIVE PATH */}
                {paths.alternative && paths.alternative.length > 0 && (
                    <Polyline
                        points={paths.alternative.map(p => `${p.x},${p.y}`).join(' ')}
                        fill="none"
                        stroke="#A0A0A0"
                        strokeWidth="3"
                        strokeDasharray="10, 5"
                        strokeLinecap="round"
                    />
                )}

                {/* PRIMARY PATH */}
                {paths.primary && paths.primary.length > 0 && (
                    <Polyline
                        points={paths.primary.map(p => `${p.x},${p.y}`).join(' ')}
                        fill="none"
                        stroke="#007AFF"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                )}

                {/* START HIGHLIGHTS (ALL ENTRANCES) */}
                {startTargets && startTargets.length > 0 && startTargets.map((t, i) => (
                    <Circle
                        key={`start-${i}`}
                        cx={t.x}
                        cy={t.y}
                        r={15}
                        fill="#00FF00"
                        opacity={0.7}
                        stroke="white"
                        strokeWidth={2}
                    />
                ))}

                {/* END HIGHLIGHTS (ALL ENTRANCES) */}
                {endTargets && endTargets.length > 0 && endTargets.map((t, i) => (
                    <Circle
                        key={`end-${i}`}
                        cx={t.x}
                        cy={t.y}
                        r={15}
                        fill="#FF0000"
                        opacity={0.7}
                        stroke="white"
                        strokeWidth={2}
                    />
                ))}

                {/* LOCATION LABELS */}
                {locations.map((b, i) => (
                    <G key={`label-${i}`}>
                        <Text
                            x={b.x}
                            y={b.y - 15}
                            fill="white"
                            fontSize="14"
                            fontWeight="bold"
                            textAnchor="middle"
                            stroke="white"
                            strokeWidth={3}
                            opacity={0.5}
                        >
                            {b.name}
                        </Text>
                        <Text
                            x={b.x}
                            y={b.y - 15}
                            fill="#333"
                            fontSize="14"
                            fontWeight="bold"
                            textAnchor="middle"
                        >
                            {b.name}
                        </Text>
                    </G>
                ))}
            </G>
        </Svg>
    );
};

export default SVGComponent;