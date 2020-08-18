import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { VictoryPie } from 'victory-native';

const Donut = () => {

    const realGraphicData = [{ y: 49, x: ' ' }, { y: 51, x: ' ' }]; // Real data

    const [graphicData, setGraphicData] = useState(
        [
            // Data to make animation work
            { y: 0, x: ' ' },  
            { y: 100, x: ' ' }
        ]
    );
    const [graphicColor, setGraphicColor] = useState(
        ['#002FFC', '#E6E6E6']
    );

    useEffect(() => {
        setGraphicData(realGraphicData); // Data we want to display
      }, []);

    return (
        <VictoryPie
            data={graphicData}
            colorScale={graphicColor}
            startAngle={0}
            endAngle={360}
            width={350}
            height={350}
            innerRadius={105}
            animate={{ easing: 'exp' }}
        /> 
    );
}

export default Donut;