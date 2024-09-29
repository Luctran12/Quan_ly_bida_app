import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
}from 'react-native'
const height_modal =150;
const ModalManage=()=>{
    return(
            <TouchableOpacity
                disabled={true}
                style={styles.container}
                onPress={()=>changeModalVisible(true)}
            >
                <View style={styles.modal}>
                    <View style={styles.textView}>
                        <Text style={styles.text}>
                            Modal header
                        </Text>
                        <Text style={styles.text}>
                            sample decribtion
                        </Text>

                    </View>

                </View>
                <View style={styles.buttonsView}>
                    <TouchableOpacity
                        style={styles.touchableOpacity}
                    >
                        <Text style={styles.text}>
                            Cancel
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.touchableOpacity}
                    >
                        <Text style={styles.text}>
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        // flex:1,
        alignItems:'center',
        backgroundColor:'black',
        height:100,
        width:100,
    },
    modal:{
        height:height_modal,
        paddingTop:10,
        backgroundColor:'black',
        borderRadius:10
    },
    text:{
        margin:5,
        fontSize:16,
        fontWeight:'bold'
    },
    touchableOpacity:{
        flex:1,
        paddingVertical:10,
        alignItems:'center'
    }



})
export {ModalManage}