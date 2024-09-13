import { TouchableOpacity, onPress,Image ,Text,View,StyleSheet} from "react-native";
const FoodCard= ({onPress, indexImage, name, price}) =>{
    return (
        
        <TouchableOpacity style={styles.item} onPress={onPress}>
            
            <Image source={indexImage} style={styles.image} resizeMode="contain"></Image>
            <View style={styles.detail}>
                <Text style={styles.nameFood}>{name}</Text>
                <Text style={styles.price}>{price}</Text>
            </View>
            
        </TouchableOpacity>
      
    )
}

const styles=StyleSheet.create({
    item:{
        width: "100%",
        height: 200,
        backgroundColor: "#F0FFFF",
        marginBottom: 20,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: "green",
        justifyContent: "center",
        shadowColor: "lightgreen",
        shadowOpacity: 3,
        shadowOffset: {
            width: 2,
            height: 2
        },
        elevation: 4,
    },
    image: {
        height: "70%",
        width: "100%",
        borderRadius: 5,
    },
    nameFood: {
        marginTop: 10,
        fontSize: 20,
        fontWeight:  "bold"
    },
    price: {
        fontSize: 16,
        paddingTop: 20

    },
    detail: {
        flexDirection: "row",
        justifyContent: "space-around",
        
    },
})


export default FoodCard;