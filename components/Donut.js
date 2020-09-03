import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {VictoryPie} from 'victory-native';

const Donut = (props) => {
  const [graphicData, setGraphicData] = useState([
    {y: 0, x: ' '},
    {y: 100, x: ' '},
  ]);

  useEffect(() => {
    const b = parseFloat(props.balance);
    const balance = b >= 100 ? 100 : b;
    setGraphicData([
      {y: balance, x: ' '},
      {y: 100 - balance, x: ' '},
    ]);
  }, [props.balance]);

  return (
    <VictoryPie
      data={graphicData}
      colorScale={['#002FFC', '#E6E6E6']}
      startAngle={0}
      endAngle={360}
      width={350}
      height={350}
      innerRadius={105}
      animate={{easing: 'exp'}}
    />
  );
};

export default Donut;
