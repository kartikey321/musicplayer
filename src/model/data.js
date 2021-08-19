export const primaryColor = 'black';
export const api_key = '6e81f97f26f8d50fe99abf7890664747';
import React, {useState} from 'react';
import {View, Text} from 'react-native';

import Axios from 'axios';

export const SongsList = tracks => {
  const [songs, setSongs] = useState([]);

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

  return songs;

  // setSongs(temp);
  //console.log('songs: ' + songs);

  //setupPlayer(songs);
};
