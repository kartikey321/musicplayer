import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from 'react-native';

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';

import Axios from 'axios';

import {api_key} from '../model/data';

const {width, height} = Dimensions.get('window');

const MusicPlayer = ({navigation, route}) => {
  const playBackState = usePlaybackState();
  const scrollX = useRef(new Animated.Value(0)).current;
  const {name, url, artist, image, mbid, tracks} = route.params;

  const [songIndex, setSongIndex] = useState(0);
  const [songDuration, setSongDuration] = useState(0);

  const [songs, setSongs] = useState([]);

  const songSlider = useRef(null);

  var track = {
    url: 'https://www.last.fm/music/The+Weeknd/_/Can%27t+Feel+My+Face', // Load media from the network
    title: 'Avaritia',
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
    artwork:
      'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png', // Load artwork from the network
    duration: 402, // Duration in seconds
  };

  useEffect(() => {
    Songsdata(tracks);
    setupPlayer();

    // name = tracks[songIndex].name

    scrollX.addListener(({value}) => {
      //console.log('Scroll x' + value);
      //console.log('Device width' + width);
      const index = Math.round(value / width);
      setSongIndex(index);

      //console.log('index ' + index);
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, [tracks]);

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    //console.log(SongsList);
    await TrackPlayer.add(songs);
  };

  const togglePlayBack = async playBackState => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log('currentTrack: ' + currentTrack);

    await TrackPlayer.play();

    if (currentTrack != null) {
      if (playBackState == State.Paused) {
        console.log(playBackState);
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const Songsdata = tracks => {
    var temp = [];

    tracks.forEach(element => {
      Axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${api_key}&artist=${element.artist.name}&track=${element.name}&format=json`,
      ).then(res => {
        try {
          //console.log(res.data.track.duration);
          var songDuration = res.data.track.duration;

          var trackItem = {
            url: element.url, // Load media from the network
            title: element.name,
            artist: element.artist.name,
            artwork: element.image[2]['#text'], // Load artwork from the network
            duration: songDuration,
            id: parseInt(Math.random()), // Duration in seconds
          };

          temp.push(trackItem);
          setSongs(temp);
          //console.log(temp);
        } catch {
          var trackItem = {
            url: element.url, // Load media from the network
            title: element.name,
            artist: element.artist.name,
            album: 'while(1<2)',
            genre: 'Progressive House, Electro House',
            date: '2014-05-20T07:00:00+00:00', // RFC 3339
            artwork: element.image[2]['#text'], // Load artwork from the network
            duration: 0,
            id: parseInt(Math.random()), // Duration in seconds
          };
          temp.push(trackItem);
          setSongs(temp);
          //console.log('temp: ' + temp);
        }
      });
    });

    // setSongs(temp);
    //console.log('songs: ' + songs);

    //setupPlayer(songs);
  };

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const skipToPrev = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  //console.log(tracks);

  const renderSongs = ({index, item}) => {
    return (
      <Animated.View
        style={{width: width, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.artworkWrapper}>
          <Image
            source={{uri: tracks[songIndex].image[2]['#text']}}
            style={styles.artworkImage}
          />
        </View>
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <StatusBar barStyle="light-content" />

        <View style={{width: width}}>
          <Animated.FlatList
            ref={songSlider}
            data={tracks}
            renderItem={renderSongs}
            keyExtractor={item => tracks[songIndex].mbid}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {x: scrollX},
                  },
                },
              ],
              {useNativeDriver: true},
            )}
          />
        </View>
        {/* <Image
            source={{uri: image[2]['#text']}}
            style={styles.artworkImage}
          /> */}

        <View>
          <Text style={styles.title}>{tracks[songIndex].name}</Text>
          <Text style={styles.artist}>{tracks[songIndex].artist.name}</Text>
        </View>

        <View>
          <Slider
            style={styles.progressContainer}
            value={10}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#FFF"
            onSlidingComplete={() => {}}
          />
          <View style={styles.progressLabelContainer}>
            <Text style={styles.progressLabelText}>0:00</Text>
            <Text style={styles.progressLabelText}>3:55</Text>
          </View>
        </View>

        <View style={styles.musicControls}>
          <TouchableOpacity onPress={skipToPrev}>
            <Ionicons
              name="play-skip-back-outline"
              size={35}
              color="#FFD369"
              style={{marginTop: 25}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('playBackState: ' + playBackState);
              togglePlayBack(playBackState);
            }}>
            <Ionicons
              name={
                playBackState == State.Playing
                  ? 'ios-pause-circle'
                  : 'ios-play-circle'
              }
              size={75}
              color="#FFD369"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#FFD369"
              style={{marginTop: 25}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={30} color="#777777" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="repeat" size={30} color="#777777" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={30} color="#777777" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={30} color="#777777" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  bottomContainer: {
    borderTopColor: '#393E46',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  artworkWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
    elevation: 5,
  },
  artworkImage: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#EEEEEE',
  },
  artist: {
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'center',
    color: '#EEEEEE',
    opacity: 0.7,
  },
  progressContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLabelContainer: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#fff',
  },
  musicControls: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});
