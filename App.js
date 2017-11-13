import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Image
} from 'react-native';

const colors = ['black', 'brown', 'green', 'yellow', 'pink', 'gray']

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      color: null,
      animatedValue: new Animated.Value(0),
    };

    this.renderColors = this.renderColors.bind(this);
  }

  componentWillUpdate() {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 400
    }).start(
      () => {
        this.refs.ColorView.setNativeProps({style:{backgroundColor: this.state.color}});
        this.state.animatedValue.setValue(0);  
      }
    );
  }

  renderColors(item, idx) {
    return (
      <TouchableWithoutFeedback key={idx} onPress={() => this.setState({color: item})}>
        <View style={[styles.colorCircle, {borderColor: item, backgroundColor: item}]}>
          {this.state.color === item ? 
            <Image source={require('./icons8-checkmark.png')} style={{tintColor: 'red', height: 20, width: 20}}/>
            : null
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const animatedSize = this.state.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 400]
      });

    return (
      <View style={styles.mainContainer}>
        <View
          ref='ColorView' 
          style={styles.colorView}
        >
          <Animated.View 
            style={{
              width: animatedSize,
              height: animatedSize,
              backgroundColor: this.state.color || 'green',
              borderColor: this.state.color || 'green',
              borderRadius: animatedSize,
              borderWidth: 1
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          {colors.map(this.renderColors)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  colorView: {
    width:220,
    height : 280,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 100,
    backgroundColor: 'green',
    shadowColor: 'black',
    shadowOffset: {
      width: 20,
      height: 20
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 10
  },
  colorCircle: {
    height: 30,
    width: 30,
    borderRadius: 18,
    borderWidth:1,
    marginHorizontal: 8,
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
