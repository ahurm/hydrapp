import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { VictoryPie } from "victory-native";

const CustomPie = () => {

    const [graphicData, setGraphicData] = useState(
        [
            { y: 50, x: ' '},
            { y: 50, x: ' '}
        ]
    );

    const [graphicColor, setGraphicColor] = useState(
        ['#002FFC', '#E0E0E1']
    );

    return (
        <VictoryPie
            data={graphicData}
            colorScale={graphicColor}
            width={350}
            height={350}
            innerRadius={110}
            style={{
            labels: {
            fill: 'white', fontSize: 15, padding: 7,
            }, }}
        /> 
    )
}

export default CustomPie
