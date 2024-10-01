import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
}from 'react-native'
const height_modal =150;
const ModalManage=(props)=>{
    const closeModal= (bool,data)=>{
        props.changeModalVisible(bool);
        props.setData(data);
    }
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
                    <View style={styles.buttonsView}>
                    <TouchableOpacity
                        style={styles.touchableOpacity}
                        onPress={()=>closeModal(false,'cancel')}
                    >
                        <Text style={[styles.text,{color:'blue'}]}>
                            Cancel
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.touchableOpacity}
                        onPress={()=>closeModal(false,'ok')}
                    >
                        <Text style={[styles.text,{color:'blue'}]}>
                            OK
                        </Text>
                    </TouchableOpacity>
                </View>

                </View>
                
            </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        borderWidth:10,
        // flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'yellow',
        height:'100%',
        width:'100%',
    },
    modal:{
        borderWidth:2,
        height:height_modal,
        paddingTop:10,
        backgroundColor:'red',
        borderRadius:10,
        width:'80%'
    },
    text:{
        borderWidth:2,
        borderColor:'white',
        margin:5,
        fontSize:16,
        fontWeight:'bold'
    },
    touchableOpacity:{
        flex:1,
        paddingVertical:10,
        alignItems:'center'
    },
    textView:{
        flex:1,
        alignItems:'center'
    },
    buttonsView:{
        borderWidth:2,
        width:'100%',
        flexDirection:'row',
    }




})
export {ModalManage}