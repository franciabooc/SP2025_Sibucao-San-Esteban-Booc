import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RouteOverlay = ({ startLocation, endLocation, onReset }) => {
    if (!startLocation || !endLocation) return null;

    return (
        <View style={styles.overlay}>
            <View style={styles.card}>
                {/* Compact Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Route</Text>
                    <TouchableOpacity onPress={onReset} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Icon name="close" size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Condensed Route Section */}
                <View style={styles.routeContainer}>
                    {/* From Row */}
                    <View style={styles.row}>
                        <View style={styles.dotStart} />
                        <Text style={styles.label}>From:</Text>
                        <Text style={styles.locationText} numberOfLines={1}>{startLocation}</Text>
                    </View>

                    {/* Tiny connector line */}
                    <View style={styles.lineConnector} />

                    {/* To Row */}
                    <View style={styles.row}>
                        <View style={styles.dotEnd} />
                        <Text style={styles.label}>To:</Text>
                        <Text style={styles.locationText} numberOfLines={1}>{endLocation}</Text>
                    </View>
                </View>

                {/* Small Action Button */}
                <TouchableOpacity style={styles.resetButton} onPress={onReset}>
                    <Icon name="refresh" size={14} color="#666" style={{ marginRight: 4 }} />
                    <Text style={styles.resetButtonText}>Clear</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 40,
        left: '8%',
        right: '8%',
        zIndex: 100,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    title: {
        fontSize: 12,
        fontWeight: '800',
        color: '#BBB',
        textTransform: 'uppercase',
    },
    routeContainer: {
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#999',
        marginRight: 6,
    },
    locationText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        flex: 1,
    },
    dotStart: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#4CAF50',
        marginRight: 10,
    },
    dotEnd: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#F44336',
        marginRight: 10,
    },
    lineConnector: {
        width: 1,
        height: 6,
        backgroundColor: '#EEE',
        marginLeft: 2.5,
        marginVertical: 1,
    },
    resetButton: {
        flexDirection: 'row',
        backgroundColor: '#F8F9FA',
        paddingVertical: 5,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EFEFEF',
    },
    resetButtonText: {
        color: '#666',
        fontSize: 11,
        fontWeight: '700',
    },
});

export default RouteOverlay;