import React, {Component} from 'react';
import { View, StyleSheet, TextInput, Text, KeyboardAvoidingView, Picker, ScrollView, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

export default class Card extends Component {
    render() {
        return (
            <View style={styles.card}>
                <View style={styles.titleCard}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('EditConfigForm', {data: this.props.data})}>
                        <Feather name="edit" color="#649d66" size={19} style={{marginHorizontal: 10}} />
                    </TouchableOpacity>
                    <Text style={styles.titleTextCard}>Nomor ID {this.props.data.id}</Text>
                    <TouchableOpacity onPress={()=>this.props.modal(true, this.props.data.id)}>
                        <Feather name="trash-2" color="#c81912" size={19} style={{marginHorizontal: 10}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.field}>
                    <Text style={styles.key}>Nama Pelanggan</Text>
                    <Text style={styles.value}>{this.props.data.namapelanggan}</Text>
                </View>
                <View style={styles.field}>
                    <Text style={styles.key}>Lokasi</Text>
                    <Text style={styles.value}>{this.props.data.lokasi}</Text>
                </View>
                <View style={styles.field}>
                    <Text style={styles.key}>Modem</Text>
                    <Text style={styles.value}>{this.props.data.modemid}</Text>
                </View>
                <View style={styles.field}>
                    <Text style={styles.key}>Tgl Pemasangan</Text>
                    <Text style={styles.value}>{this.props.data.tanggalpemasangan}</Text>
                </View>
                <View style={styles.field}>
                    <TouchableOpacity style = {[styles.button, {marginTop: 10}]} onPress={this.onChangePassword}>
                        <Text style = {styles.buttonText}>Download Form</Text>    
                    </TouchableOpacity>
                </View>
                <View style={styles.field}>
                    <TouchableOpacity style = {styles.button} onPress={this.onChangePassword}>
                        <Text style = {styles.buttonText}>Download Config</Text>    
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.5)',
        borderRadius:10,
        overflow: 'hidden',
        marginBottom: 20
        // paddingVertical:10,
    },
    field: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal:20,
        marginBottom: 6
    },
    key: {
        flex: 1,
        fontWeight:"bold",
        color:'#87cefa'
    },
    value: {
        flex: 1,
        fontWeight:"bold",
        color:'#87cefa'
    },
    titleCard: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        // paddingVertical: 7,
        borderBottomWidth: 2,
        borderColor: 'rgba(255,255,255,0.5)',
        backgroundColor: '#002171',
        height: '100%',
        marginBottom: 5,
    },
    titleTextCard: {
        fontWeight:"bold",
        color:'#87cefa',
        marginVertical: 10,
    },
    buttonText: {
        fontSize:15,
        fontWeight:"bold",
        color:'#87cefa'
      },
    button:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#002171',
    fontSize:16,
    fontWeight:"500",
    borderRadius:10,
    marginBottom: 8,
    paddingVertical:15,
    paddingHorizontal:20,
    },
    fab: {
        position: "absolute",
        bottom: 22,
        right: 18,
        opacity: 0.5
    },
})