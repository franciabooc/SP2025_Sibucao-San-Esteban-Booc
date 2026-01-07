import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import SVGComponent from './mapSvg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const mapWidth = screenWidth;
const mapHeight = screenHeight;

// Change 'path' prop to 'paths' to match the object from ExploreScreen
const InteractiveMap = ({ startNode, endNode, paths }) => {
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const pinchScale = useRef(new Animated.Value(1)).current;
    const baseScale = useRef(new Animated.Value(1)).current;
    const lastScale = useRef(1);

    const scale = Animated.multiply(baseScale, pinchScale);

    const onPanGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: pan.x, translationY: pan.y } }],
        { useNativeDriver: true }
    );

    const onPinchGestureEvent = Animated.event(
        [{ nativeEvent: { scale: pinchScale } }],
        {
            useNativeDriver: true,
            listener: (event) => {
                const pinchValue = event.nativeEvent.scale;
                if (pinchValue !== 1) {
                    pinchScale.setValue(pinchValue);
                }
            }
        }
    );

    const handlePanStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            pan.extractOffset();
        }
    };

    const handlePinchStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            let p = pinchScale.__getValue ? pinchScale.__getValue() : 1;
            const newScale = Math.max(0.5, Math.min(8, lastScale.current * p));
            lastScale.current = newScale;
            baseScale.setValue(lastScale.current);
            pinchScale.setValue(1);
        }
    };

    const animatedStyle = {
        transform: [
            { scale: scale },
            { translateX: pan.x },
            { translateY: pan.y },
        ],
    };

    return (
        <View style={styles.container}>
            <PinchGestureHandler
                onGestureEvent={onPinchGestureEvent}
                onHandlerStateChange={handlePinchStateChange}
            >
                <Animated.View style={styles.flex}>
                    <PanGestureHandler
                        onGestureEvent={onPanGestureEvent}
                        onHandlerStateChange={handlePanStateChange}
                    >
                        <Animated.View style={[styles.mapWrapper, animatedStyle]}>
                            <Animated.View style={[styles.mapContainer, { width: mapWidth, height: mapHeight }]}>
                                <SVGComponent
                                    startNode={startNode}
                                    endNode={endNode}
                                    paths={paths} // Pass the dual-path object here
                                    width={mapWidth}
                                    height={mapHeight}
                                    mapPixelWidth={mapWidth}
                                    currentScale={lastScale.current}
                                />
                            </Animated.View>
                        </Animated.View>
                    </PanGestureHandler>
                </Animated.View>
            </PinchGestureHandler>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    flex: { flex: 1 },
    mapWrapper: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    mapContainer: {
        position: 'relative',
    },
});

export default InteractiveMap;
