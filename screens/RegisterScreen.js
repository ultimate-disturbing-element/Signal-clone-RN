import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { Button,Text,Input } from 'react-native-elements';
import { auth } from '../firebase';


const RegisterScreen = ({ navigation }) => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [imageUrl,setImageUrl] = useState("");

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle:"Back to Login"
        })
    },[navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email,password)
        .then(authuser => {
            authuser.user.updateProfile({
                displayName:name,
                photoURL:imageUrl ||
                "https://w7.pngwing.com/pngs/31/699/png-transparent-profile-profile-picture-human-face-head-man-woman-community-outline-schema.png",
            })
        })
        .catch((error)=>alert(error.message));
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>
            <Text h3 style={{marginBottom:50}}>Create a Signal account</Text>

            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" autofocus type="text" value={name} onChangeText={(text)=>setName(text)}/>
                <Input placeholder="Email"  type="email" value={email} onChangeText={(text)=>setEmail(text)}/>
                <Input placeholder="Password"  type="password" secureTextEntry value={password} onChangeText={(text)=>setPassword(text)}/>
                <Input placeholder="Profile Picture Url (Optional)" onSubmitEditing={register}  type="text" value={imageUrl} onChangeText={(text)=>setImageUrl(text)}/>
            </View>
            <Button containerStyle={styles.button} title="Register" raised onPress={register} />
        </KeyboardAvoidingView >
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding: 10,
        backgroundColor:"white"
    },
    inputContainer:{
        width: 300,
    },
    button:{
        width: 200,marginTop:10,

    }
})
