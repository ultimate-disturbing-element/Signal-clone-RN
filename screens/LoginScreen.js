import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import {Button,Input,Image} from 'react-native-elements';
import { auth } from '../firebase';
const LoginScreen = ({ navigation }) => {

    const [email,setEmail] = useState("");
    const [password,setpassword] = useState("");
    useEffect(() => {
       const unsubscribe =  auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    }, [])
    const signIn = () => {
        auth.signInWithEmailAndPassword(email,password).catch(err=>alert(err));
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>
            <Image source={{
                uri:
                "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
            }} style={{width:200,height:200}}/>
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(text)=>setEmail(text)}/>
                <Input placeholder="Email"  type="password" secureTextEntry value={password} onChangeText={(text)=> setpassword(text)} onSubmitEditing={signIn}/>
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button onPress={()=>navigation.navigate('Register')} containerStyle={styles.button} type="outline" title="Register" />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding: 10,
        backgroundColor:"white"
    },
    inputContainer:{
        width: 300
    },
    button:{
        width: 200,
        marginTop:10
    }
})
