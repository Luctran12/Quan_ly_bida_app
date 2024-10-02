import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Octicons from '@expo/vector-icons/Octicons';




export default function HomePage (navigation){
    var x='hello';
    {console.log(x)}
    return (
    <Tab.Navigator>

   
    
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerSide}>
                <Text style={styles.headerTitle}>CHỦ QUÁN</Text>
                <Text style={styles.headerText}>Nguyen Van A</Text>
            </View>
            <View style={styles.headerSide}>
                <Image
                    source={require('../../assets/headerAvata.png')}
                    style={styles.headerAvata}
                />
            </View>      
        </View>

        <View style={styles.gridContainer}>
            <TouchableOpacity 
            style={styles.gridItems} 
             onPress={()=>{
                navigation.navigate('Manage')
             }}

            >
                <Octicons name="people" size={100} color="black" style={styles.gridIcon}/>
                <Text> Quản Lý Nhân Viên</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItems}>
                <FontAwesome6 name="sack-dollar" size={100} color="black" style={styles.gridIcon}/>
                <Text>Doanh Thu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItems}>
                <MaterialCommunityIcons name="table-furniture" size={100} color="black" style={styles.gridIcon}/>
                <Text>Tình Trạng Bàn</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.gridItems}
            onPress={()=>{
                navigation.navigate('Setting')
             }}
            >
                <SimpleLineIcons name="settings" size={100} color="black"  style={styles.gridIcon}/>
                <Text>Chỉnh Sửa</Text>
            </TouchableOpacity>
        </View>


        
    </View>
    </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#eed5b2',
        padding: 20,
        height:'100%',
        width:'100%'
    },
    header:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
        flexDirection:'row',
        borderWidth:2,
        borderColor:'red',
    },
    headerSide:{
        flex:1,
        alignItems:'center',
        // borderWidth:2,
        // borderColor:'red',
    },
    headerTitle:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        
    },
    headerText:{
        fontSize: 20,
        color: '#666',
        marginBottom: 10,
        
    },
    headerAvata:{
        width: 150,
        height: 200,
        resizeMode: 'contain',
    },
    gridContainer:{
        flex:2,
        borderWidth:2,
        borderColor:'red',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        
    },
    gridItems:{
        marginTop:30,
        // elevation: 10,
    },
    gridIcon:{
        borderWidth:2,
        borderRadius:30,
        padding:10,
    }
   

})