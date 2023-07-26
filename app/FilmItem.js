import { Text, View, Image, useWindowDimensions, Animated } from 'react-native'
import React, { useRef, useState, createRef } from 'react'
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';

const FilmItem = ({ item, index }) => {
    const { width } = useWindowDimensions();
    const scale = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const [panEnabled, setPanEnabled] = useState(false);
    const pinchRef = createRef();
    const panRef = createRef();
    const handlePinch = Animated.event([
        {
            nativeEvent: { scale }
        }], {
        listener: (e) => console.log(e.nativeEvent),
        useNativeDriver: true
    })

    const handlePan = Animated.event([
        {
            nativeEvent: {
                translationX: translateX
            }
        }], {
        listener: (e) => console.log(e.nativeEvent),
        useNativeDriver: true
    })

    const handlePinchStateChange = ({ nativeEvent }) => {
        // enabled pan only after pinch-zoom
        if (nativeEvent.state === State.ACTIVE) {
            setPanEnabled(true);
        }

        // when scale < 1, reset scale back to original (1)
        const nScale = nativeEvent.scale;
        if (nativeEvent.state === State.END) {
            if (nScale < 1) {
                Animated.spring(scale, {
                    toValue: 1,
                    useNativeDriver: true
                }).start();
                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true
                }).start();
                setPanEnabled(false);
            }
        }
    };



    return (
        <PanGestureHandler
            ref={panRef}
            onGestureEvent={handlePan}
            simultaneousHandlers={[panRef]}
            enabled={panEnabled}
        >
            <Animated.View>
                <PinchGestureHandler
                    ref={pinchRef}
                    simultaneousHandlers={[pinchRef]}
                    onGestureEvent={handlePinch}
                    onHandlerStateChange={handlePinchStateChange}>
                    <Animated.View
                        style={[{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.23,
                            shadowRadius: 2.62,
                            elevation: 4,
                            marginBottom: 20,
                            marginTop: index === 0 ? 20 : 0,
                            borderRadius: 10,
                            paddingBottom: 10,
                            backgroundColor: '#fff',
                        }, {
                                transform: [
                                    { scale },
                                    { translateX }
                                ]
                            }]}>

                        <Image
                            source={{ uri: 'https://source.unsplash.com/random' }}
                            style={{
                                width: width - 60,
                                height: 170,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                alignSelf: 'center'
                            }}
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ paddingHorizontal: 20, fontSize: 18, fontWeight: '600', marginTop: 5, opacity: 0.8 }}>{item.title}</Text>
                                <Text style={{ paddingHorizontal: 20, fontSize: 14, fontWeight: '400', marginBottom: 5, opacity: 0.8 }}>By: {item.director}</Text>
                            </View>
                            <Text style={{ paddingHorizontal: 20, fontSize: 12, textAlign: 'right' }}>{item.releaseDate}</Text>
                        </View>

                    </Animated.View>
                </PinchGestureHandler>
            </Animated.View>
        </PanGestureHandler>
    )
}

export default FilmItem