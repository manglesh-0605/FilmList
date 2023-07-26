import { Text, View, Image, useWindowDimensions } from 'react-native'
import React from 'react'

const FilmItem = ({ item, index }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={[{
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
            backgroundColor: '#fff'
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

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    <Text style={{ paddingHorizontal: 20, fontSize: 18, fontWeight: '600', marginTop: 5, opacity: 0.8 }}>{item.title}</Text>
                    <Text style={{ paddingHorizontal: 20, fontSize: 14, fontWeight: '400', marginB: 5, opacity: 0.8 }}>By: {item.director}</Text>
                </View>
                <Text style={{ paddingHorizontal: 20, fontSize: 12 }}>{item.releaseDate}</Text>
            </View>

        </View>

    )
}

export default FilmItem