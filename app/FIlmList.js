import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, Image, useWindowDimensions, ActivityIndicator, Animated } from 'react-native';
import { gql } from '@apollo/client';
import { SafeAreaView } from 'react-native-safe-area-context';
import client from './apolloClient';
import FilmItem from './FilmItem';

let limit = 10;
let loadMore = true;

const FilmList = () => {
    const [data, setData] = useState([]);
    const [mainLoading, setMainLoading] = useState(false)
    const [error, setError] = useState(false)
    const { width } = useWindowDimensions();
    const [showLoader, setShowLoader] = useState(false);
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        fetchData()
    }, [])

    //called once on end is called .
    const onEndReached = () => {
        if (loadMore) {
            setShowLoader(true);
            limit = limit + 10;
            fetchData()
        }
    }

    //fn to fetch the notifications
    const fetchData = async () => {
        console.log('setData is called withg limnit', limit)
        try {
            const query = gql`
                query {
                    allFilms(first:${limit}) {
                        totalCount
                        films {
                          id
                          title
                          releaseDate
                          director
                        }
                        pageInfo {
                          hasNextPage
                        }
                      }
                    }
            `;
            const response = await client.query({ query });
            console.log('Response ', response.data.allFilms.pageInfo.hasNextPage);
            setData(response.data)
            if (response.data.allFilms.pageInfo.hasNextPage == false) {
                loadMore = false
            }
            setShowLoader(false)

            // return data;
        } catch (error) {
            setShowLoader(false)
            console.error('Error fetching data:', error.message);
            throw error;
        }


    };


    return (

        <SafeAreaView style={{ paddingTop: 50 }}>
            {
                false ?
                    <Text>Loading...</Text>
                    :
                    false ?
                        <Text>Error fetching films</Text>
                        :
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={data?.allFilms?.films}
                            keyExtractor={(item) => item.id}
                            ListHeaderComponent={() => {
                                return (
                                    <View>
                                        <Text style={{
                                            fontWeight: '600',
                                            fontSize: 20,
                                            marginTop: 20
                                        }}>Movie List</Text>
                                    </View>
                                )
                            }}
                            contentContainerStyle={{
                                paddingHorizontal: 30,
                            }}
                            ListFooterComponent={() => {
                                return (
                                    <ActivityIndicator animating={showLoader} style={{ marginVertical: 16 }} color={'red'} size={'large'} />
                                )
                            }}
                            onEndReached={onEndReached}
                            renderItem={({ item, index }) => <FilmItem item={item} index={index} />}

                        />
            }

        </SafeAreaView>

    );
};


export default FilmList;




