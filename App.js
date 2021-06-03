import React, { useState } from 'react';
import {ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { checkConnected } from './functions';
import { useKeepAwake } from 'expo-keep-awake';

export default function App() {
  const [visible,setVisible] = useState(false);
  const [connectStatus , setConnectStatus] = useState(false)
  checkConnected().then(res =>{
    setConnectStatus(res)
  })
  const ActivityIndicatorElement =()=>{
    useKeepAwake();
    return(
      connectStatus?(
      <View style={styles.activityStyle}>
      <ActivityIndicator color='black' size='large' 
      />  
      </View>): ( Alert.alert('Internet Connection Lost'))
    )
  }
  return (
    
    <SafeAreaView style={styles.container}>
    <WebView 
    style={{flex:1}}
    source={{ uri: 'https://gaana.com/' }} 
    javaScriptEnabled={true}
    //for cahse
    domStorageEnabled={true}
    // for activity
    onLoadStart={()=> setVisible(true)}
    onLoad={()=>setVisible(false)}
    />
    {visible ? <ActivityIndicatorElement/> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityStyle:{
    flex:1,
    position:'absolute',
    margin:'auto',
    left:0,
    right:0,
    top:0,
    bottom:0,
    justifyContent:'center'
  },
});
