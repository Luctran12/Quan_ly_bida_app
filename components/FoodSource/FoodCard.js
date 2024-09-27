import { TouchableOpacity,Image ,Dimensions,Text,View,StyleSheet, Platform} from "react-native";
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
const FoodCard= ({onPress, indexImage, name, cost}) =>{
    return (
        
        <TouchableOpacity style={styles.item} onPress={onPress}>
            
            <Image source={indexImage} style={styles.image} resizeMode="contain"></Image>
            <View style={styles.detail}>
                <Text style={styles.nameFood}>{name}</Text>
                <Text style={styles.cost}>{cost}</Text>
            </View>
            
        </TouchableOpacity>
      
    )
}
const { width}= Dimensions.get("window");
const styles=StyleSheet.create({
    item:{
        
        width: width * 0.45,
        height: width * 0.55,
        backgroundColor: "#f0f0f0",
        marginBottom: 8,
        marginLeft: 4,
        marginRight: 4,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#3498db",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#95a5a6",
        shadowOpacity: 3,
        shadowOffset: {
            width: 1,
            height: 1
        },
        elevation: 2,
    },
    image: {
        marginTop: 10,
        height: "50%",
        width: "70%",
        borderRadius: 5,
    },
    nameFood: {
        fontSize: 20,
        fontWeight:  "bold",
        color: "#2c3e50"
    },
    cost: {
        fontSize: 16,
        marginTop: 30,
        marginLeft: 30,
        color: "#e74c3c"
    },
    detail: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"flex-start",
        marginTop: 10,
        
    },
})


export default FoodCard;