import React,{useState} from 'react'
import { StyleSheet, Text, View,TextInput } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Feather';

const searchbar = () => {
    const [searchtext,setSearchtext] = useState('');

    return (
        <View style={styles.searchbox}>
        <View style={{flexDirection:'row',backgroundColor:'#fff',padding:5}}>
          
          <View style={{padding:10,paddingTop:12}}>
            <Icon name='search' size={22}/>
          </View>


          <TextInput style={{marginLeft:10,width:'75%'}}
          placeholder="search"
          onChangeText={res => setSearchtext(res)}
          
          keyboardType='default'
          value={searchtext}/>
          <View style ={{padding:10,marginLeft:0,paddingTop:13}}>
              <Icon name = 'mic' size= {22} />
          </View>
        </View>
        </View>
    )
}

export default searchbar

const styles = StyleSheet.create({
    searchbox:{
       
        padding:5,
        margin:10,
        
    },
})