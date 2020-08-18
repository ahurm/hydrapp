import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';

const Donut = () => {

    const [graphicData, setGraphicData] = useState(
        [
            { y: 59, x: ' '},
            { y: 41, x: ' '}
        ]
    );

    const [graphicColor, setGraphicColor] = useState(
        ['#002FFC', '#E6E6E6']
    );

    return (
        <VictoryPie
            data={graphicData}
            colorScale={graphicColor}
            startAngle={0}
            endAngle={360}
            width={350}
            height={350}
            innerRadius={105}
        /> 
    );
}

export default Donut;