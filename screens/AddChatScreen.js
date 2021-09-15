import React,{useLayoutEffect,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button,Input} from "react-native-elements";
import Icon  from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';

const AddChatScreen = ({navigation}) => {
    useLayoutEffect(() => {
       navigation.setOptions({
           title:"Add a new Chat",
           headerBackTitle:"Chats"
       })
    }, [navigation])

    const [input,setInput] = useState("");
    const createChat = async () =>{
        await db.collection('chats').add({
            chatName:input
        }).then(()=>{
            navigation.goBack();
        }).catch((er)=>alert(err));
    }
    return (
        <View style={styles.container}>
         <Input onSubmitEditing={createChat} placeholder="Enter a Chat Name" value={input} onChangeText={(text)=>setInput(text)} 
         leftIcon={
             <Icon name="wechat" type="antdesign" size={24} color="black" />
         }
        />
        <Button title="Create new Chat" onPress={createChat} />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding: 30,
        height: "100%"
    }
})
