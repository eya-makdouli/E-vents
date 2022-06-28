import React from "react";
import {View, Text, StyleSheet, Animated, useWindowDimensions, Alert} from "react-native";
import {getBackgroundColor} from "react-native/Libraries/LogBox/UI/LogBoxStyle";

const Paginator = ({data , scrollX}) => {
    const {width} = useWindowDimensions();
    return (
      <View style={{flexDirection: 'row' , height : 20 }}>
          {data.map((_, i) =>{
              const inputRange = [(i - 1) * width , i * width , (i + 2) * width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10,20,10],
                    extrapolate : 'clamp',
                }
                );

              const opacity = scrollX.interpolate ({
                  inputRange,
                  outputRange: [0.3, 1 , 0.3]

              })



              return <Animated.View style={[styles.dot , {width : dotWidth} , {opacity}]} key={i.toString()}></Animated.View>

          })}

      </View>

    );


}
export default Paginator;

const styles = StyleSheet.create({
    dot: {
        height: 6 ,
        borderRadius : 5,
        marginHorizontal : 5,
        marginTop: 0,
        backgroundColor : '#493d8a'
    }
})