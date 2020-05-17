import React from 'react';
import { View, StyleSheet, TextInput, Text, KeyboardAvoidingView, Picker, ScrollView, Alert, TouchableOpacity, BackHandler } from 'react-native';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { DocumentPicker } from 'expo';
import CheckBox  from '@react-native-community/checkbox';
import API_config from '../../../config/API_config';
import { bindActionCreators } from 'redux';
import { getConfigForm, editConfigForm, addConfigForm } from '../../../action/configForm';
import { getAsyncStorage } from '../../../action/asyncStorage';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { getProfile } from '../../../action/profile';
import HeaderSubPage from '../../shared/HeaderSubPage'

const initialState = {
    tanggal_mulai:new Date(),
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
    namapelanggan: "",
    lokasi: "",
    tanggalpemasangan:"",
    konfigurasi:"",
    date_created:"",
    edited_at:"",
    beam9:"",
    beam10:"",
    beam12:"",
    beam13:"",
    beam15:"",
    beam16:"",
    beam18:"",
    modem: ""
}
class ConfigurationForm extends React.Component {
    componentDidMount(){
        this.props.getAsyncStorage('user');
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.user !== this.props.user) {
          this.getProfile();
        }
        if (prevProps.configFormAdded !== this.props.configFormAdded) {
            if (this.props.configFormAdded !== null) {
                if (this.props.configFormAdded.status) {
                    alert(this.props.configFormAdded.message);
                    this.props.navigation.goBack();
                }
            }
        }
    }
    getProfile= () => {
        let data = {
          email: this.props.user,
          token: API_config.token
        }
        this.props.getProfile(data)
    }

    static navigationOptions = ({ navigation }) => {
        return{
            headerTitle: "Add Configuration",
       }
    }
    
    /*state = {lingkup: '', jenis: ''}
    updateJenis = (jenis) => {
        this.setState({ jenis:jenis})
    }*/


    constructor(props){
        super(props)
        this.state = initialState
    }

    createTwoButtonAlert = () =>
    Alert.alert(
    "Configuration Form",
    "Data berhasil ditambahkan",
    [
        { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
    );

    handleCancel = () => {
        this.setState(initialState)
    }
    handleSave = () => {
        const data = {
            user_id: this.props.profile.data.id,
            lokasi: this.state.lokasi,
            tanggalpemasangan: this.state.tanggalpemasangan,
            namapelanggan: this.state.namapelanggan,
            modemid: this.state.modem,
            beam: "",
            beam9: this.state.checkbox1, 
            beam10: this.state.checkbox2, 
            beam12: this.state.checkbox3, 
            beam13: this.state.checkbox4, 
            beam15: this.state.checkbox5, 
            beam16: this.state.checkbox6, 
            beam18: this.state.checkbox7, 
            token: API_config.token
        }
        this.props.addConfigForm(data);
    }

    render() {
        console.log(this.props)
        //const {navigate} = this.props.navigation;
        return (
            // <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
                <ScrollView contentContainerStyle={{}}>
                    <View style={styles.container}>

                        <View style={styles.form}>
                        <Text style={styles.rowHeaderTitle}>
                            Nama Pelanggan
                            </Text>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={[styles.inputForm, {flex: 1}]}
                                    placeholderTextColor='#6F7EA8'
                                    value={this.state.namapelanggan}
                                    onChangeText={(nama) => this.setState({namapelanggan:nama})}
                                />
                            </View>

                            <Text style={styles.rowHeaderTitle}>
                            Lokasi
                            </Text>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={[styles.inputForm, {flex: 1}]}
                                    placeholderTextColor='#6F7EA8'
                                    value={this.state.lokasi}
                                    onChangeText={(posisi) => this.setState({lokasi:posisi})}
                                />
                            </View>

                            <Text style={styles.rowHeaderTitle}>
                                Tanggal Pemasangan
                            </Text>
                            <View>
                                <DatePicker
                                    style={{width: 295}}
                                    date={this.state.tanggalpemasangan}
                                    mode="date"
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="2010-05-01"
                                    maxDate="2030-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        backgroundColor: 'rgba(255,255,255,0.5)',
                                        marginLeft: 36
                                    }
                                    }}
                                    onDateChange={(tanggalpemasangan) => {this.setState({tanggalpemasangan})}}
                                />
                            </View>
                            
                            
                            <Text style={styles.rowHeaderTitle}>
                            Konfigurasi 
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <CheckBox
                                value={this.state.checkbox1}
                                onValueChange={() => this.setState({ checkbox1: !this.state.checkbox1 })}
                                />
                                <Text style={{marginTop: 5}}> Beam9 </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <CheckBox
                                value={this.state.checkbox2}
                                onValueChange={() => this.setState({ checkbox2: !this.state.checkbox2 })}
                                />                         
                                <Text style={{marginTop: 5}}> Beam10 </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>  
                                <CheckBox
                                value={this.state.checkbox3}
                                onValueChange={() => this.setState({ checkbox3: !this.state.checkbox3 })}
                                />                         
                                <Text style={{marginTop: 5}}> Beam12 </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>   
                                <CheckBox
                                value={this.state.checkbox4}
                                onValueChange={() => this.setState({ checkbox4: !this.state.checkbox4 })}
                                />
                                <Text style={{marginTop: 5}}> Beam13 </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>  
                                <CheckBox
                                value={this.state.checkbox5}
                                onValueChange={() => this.setState({ checkbox5: !this.state.checkbox5 })}
                                />
                                <Text style={{marginTop: 5}}> Beam15 </Text>
                            </View>    
                            <View style={{ flexDirection: 'row' }}>  
                                <CheckBox
                                value={this.state.checkbox6}
                                onValueChange={() => this.setState({ checkbox6: !this.state.checkbox6 })}
                                />
                                <Text style={{marginTop: 5}}> Beam16 </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>  
                                <CheckBox
                                value={this.state.checkbox7}
                                onValueChange={() => this.setState({ checkbox7: !this.state.checkbox7})}
                                />
                                <Text style={{marginTop: 5}}> Beam18 </Text>
                            </View>
                            <Text style={styles.rowHeaderTitle}>
                                Modem id
                            </Text>
                            <View style={styles.inputBox}>
                                <TextInput
                                    value={this.state.modem}
                                    style={[styles.inputForm, {flex: 1}]}
                                    placeholderTextColor='#6F7EA8'
                                    onChangeText={(modem) => this.setState({modem})}
                                />
                            </View>
                            <View style={styles.saveCancel}>
                                    <TouchableOpacity style = {styles.buttonCancel} onPress={this.handleCancel}>
                                        <Text style = {styles.buttonText}><MaterialIcons name="settings-backup-restore" size={32} /></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style = {styles.buttonSave} onPress={this.handleSave}>
                                        <Text style = {styles.buttonText}>Save</Text>
                                    </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            // </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#4e73df',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        paddingTop: 30,
        justifyContent: 'center',
    },
    header: {
        flex: 3,
    },
    form: {
        flex: 1,
        margin: 30,
    },
    rowHeaderTitle: {
        color: '#0A1944',
        fontSize: 14,
        fontStyle: 'normal',
        textAlign: 'left',
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
        paddingTop: 10,
        paddingBottom: 5,
    },
    inputBox: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        opacity: 0.8,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginBottom: 10
    },
    inputForm: {
        color: '#0a1944', 
        marginLeft: 5
    },
    button: {
        borderRadius: 5,
        marginTop: 20,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 9,
        paddingBottom: 9,
        backgroundColor: '#002171',
    },
    buttonPicker: {
        borderRadius: 5,
        marginTop: 5,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 9,
        paddingBottom: 9,
        backgroundColor: '#1e90ff',
    },
    textPicker: {
        fontSize: 12,
        color: '#0A1944',
    },
    text: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 16,
        color: 'black',
      },
      ImageIconStyle: {
        height: 80,
        width: 80,
        resizeMode: 'stretch',
    },
    saveCancel: {
        flexDirection: 'row',
        marginTop: 20
      },
    buttonSave:{
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#002171',
        fontSize:16,
        fontWeight:"500",
        borderRadius:10,
        padding: 10,
        marginLeft: 5,
    },
    buttonCancel:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c81912',
        fontSize:16,
        fontWeight:"500",
        borderRadius:10,
        padding: 10,
        marginRight: 5,
    },
    buttonText: {
        fontSize:16,
        fontWeight:"bold",
        color:'#87cefa'
    }
});

function mapStateToProps(state) {
    return {
        user: state.getAsyncStorage.data,
        profile: state.profile.data,
        configFormAdded: state.addConfigForm.data,
        configForm: state.configForm.data,
        error: state.configForm.error,
        loading: state.configForm.loading,
    };
  }
  
  function matchDispatchToProps(dispatch) {
    return bindActionCreators({ addConfigForm, editConfigForm, getConfigForm, getAsyncStorage, getProfile }, dispatch)
  }
  
  export default connect(mapStateToProps, matchDispatchToProps)(ConfigurationForm);