import React, {useState , useRef} from "react";
import {View , Text , StyleSheet ,FlatList ,Animated} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slides from '../Slides';
import SliderComponentItem from "./SliderComponentItem";
import nativeEventEmitter from "react-native-web/dist/exports/NativeEventEmitter";
import {SafeAreaView} from "react-native-web";
import Paginator from "./Paginator";
import NextButton from "./NextButton";
const SliderComponent = ({navigation,firstTime}) => {

    const [currentIndex , setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index)
    }).current
    const slidesRef = useRef(null)
    const viewConfig = useRef({viewAreaCoveragePercentThreshold : 50}).current;

    const scrollTo = async ()=> {
        if (currentIndex < Slides.length- 1){
            slidesRef.current.scrollToIndex({index : currentIndex +1})
        }else{
            try{
                await AsyncStorage.setItem('@viewedSlider' , 'true');
                await navigation.replace('VisitorScreen');
            }catch (err){

            }
        }
    }
    return (
            <View style={{flex : 1 , alignItems : "center" , justifyContent:"center"}}>
                <View style={{flex: 3}}>
                <FlatList data={Slides} renderItem={({item}) => <SliderComponentItem item = {item } /> }
                horizontal
                showsHorizontalScrollIndicator={false}
                          viewabilityConfig={viewConfig}
                          scrollEventThrottle={32}
                          ref={slidesRef}
                          pagingEnabled
                          bounces={false}
                          onViewableItemsChanged={viewableItemsChanged}
                          keyExtractor={(item) => item.id}
                          onScroll={Animated.event([{nativeEvent : {contentOffset : {x : scrollX}}}],{
                              useNativeDriver : false
                          })}


                />
                </View>
                <Paginator data={Slides} scrollX={scrollX} />
                <NextButton percentage={(currentIndex + 1) * (100 / Slides.length)} scrollTo={scrollTo}/>
            </View>

    );
}
export default SliderComponent;