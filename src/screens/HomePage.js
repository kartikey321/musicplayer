import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Axios from 'axios';
import {api_key} from '../model/data';

const HomePage = () => {
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    // const axios = require('axios');
    try {
      const response = await Axios.get(
        'https://ws.audioscrobbler.com/2.0/?method=track.search&track=Believe&api_key=6e81f97f26f8d50fe99abf7890664747&format=json',
      );
      console.log(response.request);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View>
      <Text>HomePage</Text>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
