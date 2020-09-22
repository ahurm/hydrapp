import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Body,
  Button,
  Header,
  Right,
  Text,
  Title,
} from 'native-base';

const CustomHeader = (props) => {
  return (
      <Header>
        <Body style={styles.headerBody}>
          <Title style={styles.title}>Hydrapp</Title>
          <Right>
            {props.showButton && <Button rounded onPress={props.toggleModal}>
              <Text>ADD</Text>
            </Button>}
          </Right>
        </Body>
      </Header>
  );
};

const styles = StyleSheet.create({
  headerBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    paddingLeft: 25,
    paddingTop: 1,
    paddingBottom: 1,
  }
});

export default CustomHeader;
