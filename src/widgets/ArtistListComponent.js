import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'

const ArtistListComponent = ({item}) => {
    return (
        <View>
            <View style={{flexDirection:'row',padding:7}}>
            <View style={GlobalStyles.circleAvatar}>
                        <Image 
                        source={{uri:item.image[1].#text}}
                        />
                    </View>
            </View>
        </View>
    )
}

export default ArtistListComponent;

