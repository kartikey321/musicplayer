import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {api_key} from '../model/data';
import Axios from 'axios';

const Tracks = ({route, navigation}) => {
  const {name} = route.params;
  const [tracks, setTracks] = useState([]);
  const getTopTracks = name1 => {
    Axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${name1}&api_key=${api_key}&format=json`,
    ).then(res => {
      var temp = [];
      res.data.toptracks.track.forEach(element => {
        // console.log(element);

        temp.push(element);
      }),
        setTracks(temp);
    });
  };
  useEffect(() => {
    console.log(name);
    getTopTracks(name);
  }, []);
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.title}>Top Tracks</Text>

      <FlatList
        data={tracks}
        keyExtractor={item => item['@attr']['rank']}
        renderItem={({item}) => (
          <View style={{backgroundColor: 'white'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MusicPlayer', {
                  mame: item.name,
                  playcount: item.playcount,
                  listeners: item.listeners,
                  mbid: item.mbid,
                  url: item.url,
                  artist: item.artist,
                  image: item.image,
                  tracks: tracks,
                });
              }}>
              <View style={{padding: 15, justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Tracks;

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    margin: 20,
    marginBottom: 15,
  },
});
