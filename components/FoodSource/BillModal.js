// import React, { useState } from 'react';
// import { View, Text, Modal, FlatList, Button, StyleSheet } from 'react-native';

// const BillModal = ({ isVisible, onClose, orderedItems ,onResetBill}) => {
// const sortedItems = [...orderedItems].sort((a, b) => parseInt(a.table) - parseInt(b.table));

//     return (
        
//         <Modal
//             visible={isVisible}
//             animationType="slide"
//             transparent={false}
//             onRequestClose={onClose}
           
//         >
//             <View style={styles.modalContainer}>
//                 <View style={styles.listItem}>
//                 <Text style={styles.modalTitle}>Hóa đơn chi tiết</Text>
//                 <FlatList

//                     data={sortedItems}
//                     keyExtractor={( item,index) => index.toString()}
//                     renderItem={({ item }) => (
//                         <View style={styles.item}>
                            
//                             <Text style={styles.itemName}>{item.name} x {item.quantity} (Bàn {item.table})</Text>
//                             <Text style={styles.totalPrice}>{item.total.toLocaleString()} VND</Text>
//                         </View>
//                     )}
//                 />
//                 </View>
//             <View style={styles.button}>
//                 <Button
//                 title="Lam moi"
//                 style={styles.resetButton}
//                 onPress={onResetBill}
//                 color="#3498db"
//             />
//                 <Button title="Đóng" onPress={onClose} />
//                 </View>
//             </View>
//         </Modal>
        
//     );
// };

// const styles = StyleSheet.create({
//     modalContainer: {
//         flex: 1,
//         padding: 32,
//         justifyContent: 'center',
//         alignItems: "center"
//     },
//     modalTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     listItem: {
        
//         marginTop: 10,
//         flex:1,
//         padding: 10,
//         borderWidth: 1,
        
//         height: "70%",
//         width: "100%"

//     },
//     item: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginVertical: 10,
        
//     },
//     totalPrice:{
//         fontSize: 18,
        
//     },
//     itemName:{
//         fontSize: 18
//     },
//     totalText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginTop: 20,
//     },
//     button: {
//         flexDirection:"row",
//         alignContent: "space-around",
//     }
// });
// export default BillModal;