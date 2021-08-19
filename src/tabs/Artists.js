import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View, Button, FlatList,Image,TouchableOpacity, Touchable } from 'react-native'
import {api_key} from '../model/data'
import Axios from 'axios'
import Searchbar from '../widgets/searchbar';
import GlobalStyles from '../styles/GlobalStyles';
import { Divider } from 'react-native-paper';
//import ArtistListComponent from '../widgets/artistListComponent';

const Artists = ({navigation}) => {
   const [artists, setArtists] = useState([]);
    //getArtists();
     
    useEffect(() => {
       
        Axios.get('https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=6e81f97f26f8d50fe99abf7890664747&format=json&limit=35').then(res => {
            var temp =[];
            res.data.artists.artist.forEach(element => {
                //console.log(element);

                temp.push(element);
            }),
            setArtists(temp);
            
            
            
        })
        

    }, [])

    //console.log(artists[1].image[1]["#text"]);

   
    return (
        <View >
            <Searchbar />
            <View>
                <FlatList 
                data ={artists}
                renderItem = {({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ArtistInfo',item)}>
                    <View style={{backgroundColor:'white'}}>
                    <View style={{padding:15,justifyContent:'center'}}>
                    
                        <Text style={{fontWeight:'bold',fontSize:18,marginLeft:30}}>{item.name}</Text>
                        
                                {/* <Image 
                                source={{uri:item.image[1]['#text']}}
                                resizeMode='cover'
                                width='100%'
                                height='100%'
                                /> */}
                           
                    </View>
                    <Divider  style={{borderColor:'#3A3B3C',width:7}} />
                </View>
                </TouchableOpacity>
                )}
                keyExtractor={(item) => item.name}
        
                />
            </View>
            
        </View>
    );
}

export default Artists;

const styles = StyleSheet.create({})
