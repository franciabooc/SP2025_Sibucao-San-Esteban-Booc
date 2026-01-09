import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import SVGComponent from './mapSvg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MAP_CONTENT_WIDTH = 1223;
const MAP_CONTENT_HEIGHT = 1078;

export default function InteractiveMap({ startNode, endNode, paths }) {
    // 1. Initial Scale (Portrait fit)
    const scaleX = screenWidth / MAP_CONTENT_WIDTH;
    const scaleY = screenHeight / MAP_CONTENT_HEIGHT;
    const fitScale = Math.min(scaleX, scaleY) * 0.9;

    // 2. Refs for Panning and Scaling
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const baseScale = useRef(new Animated.Value(fitScale)).current;
    const pinchScale = useRef(new Animated.Value(1)).current;

    // Values to track the 'saved' state
    const lastScale = useRef(fitScale);
    const lastOffset = useRef({ x: 0, y: 0 });

    useEffect(() => {
        lastScale.current = fitScale;
        baseScale.setValue(fitScale);
        // Reset position to center
        pan.setOffset({ x: 0, y: 0 });
        pan.setValue({ x: 0, y: 0 });
        lastOffset.current = { x: 0, y: 0 };
    }, [fitScale]);

    const getBoundaries = (currentScale) => {
        const scaledWidth = MAP_CONTENT_WIDTH * currentScale;
        const scaledHeight = MAP_CONTENT_HEIGHT * currentScale;
        const maxOffsetX = Math.max(0, (scaledWidth - screenWidth) / 2);
        const maxOffsetY = Math.max(0, (scaledHeight - screenHeight) / 2);
        return { maxOffsetX, maxOffsetY };
    };

    const onPanGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: pan.x, translationY: pan.y } }],
        { useNativeDriver: true }
    );

    const handlePanStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            const { maxOffsetX, maxOffsetY } = getBoundaries(lastScale.current);

            // 3. LOCKING LOGIC: Update the permanent offset
            lastOffset.current.x += event.nativeEvent.translationX;
            lastOffset.current.y += event.nativeEvent.translationY;

            // Clamp the saved offset so it stays in bounds
            lastOffset.current.x = Math.max(-maxOffsetX, Math.min(maxOffsetX, lastOffset.current.x));
            lastOffset.current.y = Math.max(-maxOffsetY, Math.min(maxOffsetY, lastOffset.current.y));

            // Set the animation to the new locked position
            pan.setOffset({ x: lastOffset.current.x, y: lastOffset.current.y });
            pan.setValue({ x: 0, y: 0 });
        }
    };

    const onPinchGestureEvent = Animated.event(
        [{ nativeEvent: { scale: pinchScale } }],
        { useNativeDriver: true }
    );

    const handlePinchStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            const gestureScale = event.nativeEvent.scale || 1;
            const newScale = Math.max(fitScale, Math.min(5, lastScale.current * gestureScale));

            lastScale.current = newScale;
            baseScale.setValue(newScale);
            pinchScale.setValue(1);

            // Re-clamp translation after zoom
            const { maxOffsetX, maxOffsetY } = getBoundaries(newScale);
            lastOffset.current.x = Math.max(-maxOffsetX, Math.min(maxOffsetX, lastOffset.current.x));
            lastOffset.current.y = Math.max(-maxOffsetY, Math.min(maxOffsetY, lastOffset.current.y));

            // Smoothly animate to the corrected "locked" position if zoom caused overflow
            Animated.spring(pan, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: true,
                friction: 10
            }).start(() => {
                pan.setOffset({ x: lastOffset.current.x, y: lastOffset.current.y });
                pan.setValue({ x: 0, y: 0 });
            });
        }
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
                        avgPointers
                    >
                        <Animated.View
                            style={[
                                styles.mapContainer,
                                {
                                    transform: [
                                        { translateX: pan.x },
                                        { translateY: pan.y },
                                        { scale: Animated.multiply(baseScale, pinchScale) }
                                    ]
                                }
                            ]}
                        >
                            <SVGComponent
                                startNode={startNode}
                                endNode={endNode}
                                paths={paths}
                                width={MAP_CONTENT_WIDTH}
                                height={MAP_CONTENT_HEIGHT}
                            />
                        </Animated.View>
                    </PanGestureHandler>
                </Animated.View>
            </PinchGestureHandler>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        overflow: 'hidden',
    },
    flex: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapContainer: {
        width: MAP_CONTENT_WIDTH,
        height: MAP_CONTENT_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
});