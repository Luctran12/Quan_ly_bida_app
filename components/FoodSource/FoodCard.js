import { TouchableOpacity,Image ,Text,View,StyleSheet, Platform} from "react-native";
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

const styles=StyleSheet.create({
    item:{
        
        width: "48%",
        height: 220,
        backgroundColor: "#F0FFFF",
        marginBottom: 8,
        marginLeft: 4,
        marginRight: 4,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "green",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "lightgreen",
        shadowOpacity: 3,
        shadowOffset: {
            width: 2,
            height: 2
        },
        elevation: 4,
    },
    image: {
        marginTop: 10,
        height: "50%",
        width: "70%",
        borderRadius: 5,
    },
    nameFood: {
        
        fontSize: 20,
        fontWeight:  "bold"
    },
    cost: {
        fontSize: 16,
        marginTop: 30,
        marginLeft: 30
    },
    detail: {
        padding: 10,
        flexDirection: "row",
        alignItems:"flex-start",
        marginTop: 10,
        
    },
})


export default FoodCard;