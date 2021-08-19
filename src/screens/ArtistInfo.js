import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import {api_key} from '../model/data';
import Axios from 'axios';
import {getJSDocTags} from 'typescript';
import {element} from 'prop-types';

const ArtistInfo = ({route, navigation}) => {
  const [artistTags, setArtistTags] = useState([]);
  const [similarArtists, setSimilarArtists] = useState([]);
  const [listeners, setListeners] = useState(null);
  const [playcount, setPlaycount] = useState(null);
  const {name, mbid, url, image} = route.params;

  const fetchInfo = name1 => {
    Axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=${api_key}&format=json&artist=${name1}`,
    ).then(res => {
      var temp = [];
      //console.log(res.data.artist)
      getTags(res);
      getSimilar(res);
      setListeners(res.data.artist.stats.listeners);
      setPlaycount(res.data.artist.stats.playcount);
    });
  };

  const getTags = res => {
    var temp1 = [];
    res.data.artist.tags.tag.forEach(element => {
      temp1.push(element);
    });
    setArtistTags(temp1);
  };

  const getSimilar = res => {
    var temp = [];
    res.data.artist.similar.artist.forEach(element => {
      temp.push(element);
    });
    setSimilarArtists(temp);
  };
  useEffect(() => {
    fetchInfo(name);
  }, []);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <View style={GlobalStyles.circleAvatar}>
          <Image source={{uri: image[1]['#text']}} />
        </View>
        <Text style={styles.title}>{name}</Text>
        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        <View>
          <View style={{flexDirection: 'row', marginTop: 26}}>
            <View style={{marginHorizontal: 25}}>
              <Text style={{fontWeight: 'bold', fontSize: 21}}>
                {playcount}
              </Text>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#909090', fontSize: 15}}>
                  Number of plays
                </Text>
              </View>
            </View>
            <View style={{marginHorizontal: 25}}>
              <Text style={{fontWeight: 'bold', fontSize: 21}}>
                {listeners}
              </Text>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#909090', fontSize: 15}}>Listeners</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{marginTop: 20, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Tracks', {name: name})}>
          <View
            style={{
              backgroundColor: '#A9A9A9',
              paddingHorizontal: 25,
              paddingVertical: 10,
              borderRadius: 25,
            }}>
            <Text style={{fontSize: 16, fontWeight: '900'}}>
              View Top Songs
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 30, marginStart: 35}}>
        <Text style={{fontStyle: 'italic', fontWeight: '900', fontSize: 19}}>
          Similar Artists
        </Text>
      </View>

      <View style={{marginTop: 26}}>
        <FlatList
          keyExtractor={item => item.name}
          numColumns={2}
          data={similarArtists}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                fetchInfo(item.name);
                navigation.navigate('ArtistInfo', item);
              }}>
              <View style={{backgroundColor: 'white'}}>
                <View style={{padding: 15, justifyContent: 'center'}}>
                  <View style={{width: 150, marginHorizontal: 15}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>
                      {item.name}
                    </Text>
                  </View>
                </View>
                {/* <Divider  style={{borderColor:'#3A3B3C',width:7}} /> */}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{marginTop: 30, marginStart: 35}}>
        <Text style={{fontStyle: 'italic', fontWeight: '900', fontSize: 19}}>
          Tags
        </Text>
      </View>

      <View style={{marginTop: 26}}>
        <FlatList
          keyExtractor={item => item.name}
          numColumns={2}
          data={artistTags}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                fetchInfo(item.name);
                navigation.navigate('ArtistInfo', item);
              }}>
              <View style={{backgroundColor: 'white'}}>
                <View style={{padding: 15, justifyContent: 'center'}}>
                  <View style={{width: 150, marginHorizontal: 15}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>
                      {item.name}
                    </Text>
                  </View>
                </View>
                {/* <Divider  style={{borderColor:'#3A3B3C',width:7}} /> */}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default ArtistInfo;

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    margin: 20,
    marginBottom: 15,
  },
});
