import { Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'

const TopFramework = ({ framework }) => {
  return (
    <TouchableOpacity style={styles.frameworkContainer}>
        <ImageBackground source={{ uri: framework.image }} resizeMode='cover' style={{ height: '100%', width: '100%' }}>
            <Text>{framework.name}</Text>
        </ImageBackground>
    </TouchableOpacity>
  )
}

export default TopFramework;

const styles = StyleSheet.create({
    frameworkContainer: {
        height: 200,
        width: 200,
        borderRadius: 100,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 10,
        overflow: 'hidden',
      },
})