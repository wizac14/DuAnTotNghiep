import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const ItemCart = (props) => {
    const { dulieu } = props;
    return (
        <View style={styles.container}>
            <View style={styles.viewImage}>
                <Image style={styles.image} source={{ uri: dulieu.image }} />
            </View>
            <View style={styles.view1}>
                <Text style={styles.textName}>{dulieu.title}</Text>
                <View style={styles.view2}>
                    <View style={{ marginTop: 10 }}>
                        <Image style={styles.color} source={{ uri: dulieu.color }} />
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <Text>{dulieu.nameColor}</Text>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <Text>{dulieu.size}</Text>
                    </View>
                </View>
                <View style={styles.view2}>
                    <View >
                        <Text style={styles.textPrice}>{dulieu.price}</Text>
                    </View>
                    <View style={styles.viewValue}>
                        <View >
                            <TouchableOpacity >
                                <Ionicons name='remove-outline' size={15}  style={{ marginLeft:10, marginTop:5 }}/> 
                            </TouchableOpacity>
                        </View>
                        <View >
                            <Text  style={styles.textQuantity}>{dulieu.quantity}</Text>
                        </View>
                        <View >
                            <TouchableOpacity>
                                <Ionicons name='add-outline' size={15} style={{ marginLeft:10, marginTop:5}}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </View>
            <View style={styles.view2}>
                <View>
                    <TouchableOpacity style={styles.icon}>
                        <Ionicons name='trash-outline' size={25} />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default ItemCart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#EEEEEE",
        borderRadius: 20

    },
    viewColor: {
        marginTop: 10,
    },
    color: {
        width: 20,
        height: 20,
        borderRadius: 10
    },
    viewImage: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,
    },
    icon: {
        marginTop: 20, marginRight:30
    },
    view1: {
        flexDirection: 'column'
    },
    view2: {
        flexDirection: 'row', 

    },
    viewValue:{
        flexDirection: 'row',
        backgroundColor:'#F5F5F5',
        width:80,
        marginLeft:40, 
        borderRadius:50, 
        marginTop:10
    },
    textName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    
    textPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:10
    }, 
    textQuantity:{
        marginTop:3, 
        marginLeft:10, 
        fontWeight:'bold'
    }
})