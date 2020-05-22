import React, { Component } from 'react';
import { TouchableOpacity, Image, SafeAreaView, ScrollView, StyleSheet, Dimensions, View, Button, Picker} from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { VictoryArea, VictoryBar, VictoryChart, VictoryTheme,VictoryLine } from "victory-native";

import { Block, Card, Text, Icon, Label } from '../components';
import * as theme from '../constants/theme';
import API_config from '../config/API_config';
import { bindActionCreators } from 'redux';
import { getDownlink, getUplink, getModem, getHeadline } from '../action/dashboard';
import { getAsyncStorage } from '../action/asyncStorage';
import { connect } from 'react-redux';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function Unix_timestamp(t)
{
var dt = new Date(t*1000);
var hr = dt.getHours();
var m = dt.getMinutes();
var s = dt.getSeconds();
var time = hr + ":" + m;
return time;  
}

function Nowdate(t)
{
var dt = new Date(t*1000);
var hr = dt.getDate();
var m = dt.getMonth();
var s = dt.getFullYear();
var time = hr + " " + monthNames[m] + " " + s;
return time;  
}

const styles = StyleSheet.create({
  secontainer: {
    marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    inputBox: {
      opacity: 0.8,
      borderRadius: 5,
      justifyContent: 'center',
      marginHorizontal: 20,
      marginBottom: 10,
      backgroundColor: 'rgba(255,255,255,0.5)',
  },
  picker: {
    flex: 1
  },
  overview: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.blue,
  },
  margin: {
    marginHorizontal: 25,
  },
  driver: {
    marginBottom: 11,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#4e73df',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labeluser: {
    fontSize: 13,
    fontWeight:"bold",
    color:'#87cefa',
    textAlign: 'left',
    alignSelf: "flex-start",
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  signupTextBorder: {
    flexGrow: 1,
    fontSize: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 15,
    flexDirection:'row'
  },
  signupText:{
    color:'rgba(255,255,255,0.3)',
    fontSize:20
  },
  buttonText: {
    fontSize:16,
    fontWeight:"bold",
    color:'#87cefa'
  },
  button:{
    width:300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#002171',
    fontSize:16,
    fontWeight:"500",
    borderRadius:10,
    padding: 10
  },
  boxinput:{
    width:300,
    backgroundColor:'rgba(255,255,255,0.5)',
    borderRadius:10,
    paddingVertical:10,
    paddingHorizontal:20,
    fontSize:16,
    marginVertical:5,
  },
  signupButton:{
    color:'#87cefa',
    fontSize:14,
    fontWeight:'500'
  },
});


class Dashboard extends Component {
  static navigationOptions = {
    headerRightContainerStyle: {
      paddingRight: 24
    },
    headerRight: (
      <TouchableOpacity><Icon notification /></TouchableOpacity>
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      a : 14,
      b : 13,
      c : 12,
      d : 11,
      e : 10,
      modemnow : "Modem 1",
      data: [],
      isLoading1: true,
      isLoading2: true,
      isLoading3: true,
      
      downlink: [],
      uplink: [],
      modem: [],
      headline: [],
      router: ''
    }
  } 

  updateRouter1 = () => {
    this.setState({     
      a : 14,
      b : 13,
      c : 12,
      d : 11,
      e : 10,
      modemnow : "Modem 1"
    })
  }

  updateRouter2 = () => {
    this.setState({     
      a : 9,
      b : 8,
      c : 7,
      d : 6,
      e : 5,
      modemnow : "Modem 2"
    })
  }

  updateRouter3 = () => {
    this.setState({     
        a : 4,
        b : 3,
        c : 2,
        d : 1,
        e : 0,
        modemnow : "Modem 3"
      })
  }

  componentDidMount() {
    this.getDownlink();
    this.getUplink();
    this.getModem();
    this.getHeadline();
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.downlink !== this.props.downlink) {
      if (this.props.downlink !== null) {
        if (this.props.downlink.status) {
          this.setState({
            downlink: this.props.downlink.data,
            isLoading1: false
          })
        }
      }
    }
    if (prevProps.uplink !== this.props.uplink) {
      if (this.props.uplink !== null) {
        if (this.props.uplink.status) {
          this.setState({
            uplink: this.props.uplink.data,
            isLoading2: false
          })
        }
      }
    }
    if (prevProps.modem !== this.props.modem) {
      if (this.props.modem !== null) {
        if (this.props.modem.status) {
          this.setState({
            modem: this.props.modem.data,
            isLoading3: false
          })
        }
      }
    }
    if (prevProps.headline !== this.props.headline) {
      if (this.props.headline !== null) {
        if (this.props.headline.status) {
          this.setState({headline: this.props.headline.data})
        }
      }
    }
  }

  getDownlink = () => {
    let data = {
      token: API_config.token
    }
    this.props.getDownlink(data);
  }     
  getUplink = () => {
    let data = {
      token: API_config.token
    }
    this.props.getUplink(data);
  }     
  getModem = () => {
    let data = {
      token: API_config.token
    }
    this.props.getModem(data);
  }     
  getHeadline = () => {
    let data = {
      token: API_config.token
    }
    this.props.getHeadline(data);
  }
  updateRouter = (e) => {
    this.setState({router: e})
    switch (e) {
      case 'm1':
        this.updateRouter1();
        break;
      case 'm2':
        this.updateRouter2();
        break;
      case 'm3':
        this.updateRouter3();
        break;
    
      default:
        break;
    }
  }     

  render() {
      if(this.state.isLoading1 || this.state.isLoading2 || this.state.isLoading3){
        return <View><Text>Loading...</Text></View>
      }

    return (
      <SafeAreaView style={styles.overview}>
        <ScrollView contentContainerStyle={{ paddingVertical: 25 }}>
          <View style = {styles.inputBox}>
                <Picker
                    selectedValue={this.state.router}
                    style={styles.picker}
                    mode='dropdown'
                    onValueChange={this.updateRouter}
                >
                    <Picker.Item label="Modem 1" value="m1" />
                    <Picker.Item label="Modem 2" value="m2" />
                    <Picker.Item label="Modem 3" value="m3" />
                </Picker>
          </View>

          <Block row style={[styles.margin, { marginTop: 18 }]}>
            <Card middle style={{ marginRight: 7 }}>
              <Icon sqf />
              <Text h2 style={{ marginTop: 17 }}>{this.state.downlink[this.state.e].sqf}</Text>
              <Text paragraph color="gray">LATEST SQF</Text>
              <Text paragraph color="blue">{Nowdate(this.state.downlink[this.state.e].timestamp)}</Text>
            </Card>
            
            <Card middle style={{ marginLeft: 7 }}>
              <Icon attenuation />
              <Text h2 style={{ marginTop: 17 }}>{this.state.uplink[this.state.e].power_atten}</Text>
              <Text paragraph color="gray">LATEST ATTENUATION</Text>
              <Text paragraph color="blue">{Nowdate(this.state.uplink[this.state.e].timestamp)}</Text>
            </Card>
          </Block>

          <Block row style={[styles.margin, { marginTop: 18 }]}>
            <Card middle style={{ marginRight: 7 }}>
              <Icon time />
              <Text h2 style={{ marginTop: 17 }}>{this.state.modem[this.state.e].uptime}</Text>
              <Text paragraph color="gray">UPTIME</Text>
              <Text paragraph color="blue">{Nowdate(this.state.modem[this.state.e].timestamp)}</Text>
            </Card>
            
            <Card middle style={{ marginLeft: 7 }}>
              <Icon memory />
              <Text h2 style={{ marginTop: 17 }}>{this.state.modem[this.state.e].memory}</Text>
              <Text paragraph color="gray">AVAILABLE MEMORY</Text>
              <Text paragraph color="blue">{Nowdate(this.state.downlink[this.state.e].timestamp)}</Text>
            </Card>
          </Block>
              
          <Card
            title="SQF CHART"
            style={[styles.margin, { marginTop: 18 }]}>
            <Block row right>
              <Block flex={2} row center right>
                <Text paragraph color="blue">{Nowdate(this.state.downlink[this.state.e].timestamp)}</Text>
              </Block>
            </Block>
            <Block>
              <Text>Chart</Text>
                            <VictoryChart width={300} minDomain={{ y: 100 }} maxDomain={{ y: 170 }} theme={VictoryTheme.material} domainPadding={15}>
                
                <VictoryLine

                    style={{
                      parent: { border: "3px solid #ccc"},
                      stroke: "#073060",
                      strokeWidth: 15
                    }}
                    data={[
                      {  x: Unix_timestamp(this.state.downlink[this.state.a].timestamp), y: this.state.downlink[this.state.a].sqf, label: this.state.downlink[this.state.a].sqf},
                      {  x: Unix_timestamp(this.state.downlink[this.state.b].timestamp), y: this.state.downlink[this.state.b].sqf, label: this.state.downlink[this.state.b].sqf},
                      {  x: Unix_timestamp(this.state.downlink[this.state.c].timestamp), y: this.state.downlink[this.state.c].sqf, label: this.state.downlink[this.state.c].sqf},
                      {  x: Unix_timestamp(this.state.downlink[this.state.d].timestamp), y: this.state.downlink[this.state.d].sqf, label: this.state.downlink[this.state.d].sqf},
                      {  x: Unix_timestamp(this.state.downlink[this.state.e].timestamp), y: this.state.downlink[this.state.e].sqf, label: this.state.downlink[this.state.e].sqf}
                      ]}
                      > 
                </VictoryLine>
              </VictoryChart>
            </Block>
          </Card>
          <Card
            title="ATTENUATION CHART"
            style={[styles.margin, { marginTop: 18 }]}>
            <Block row right>
              <Block flex={2} row center right>
                <Text paragraph color="blue">{Nowdate(this.state.downlink[this.state.e].timestamp)}</Text>
              </Block>
              </Block>
            <Block>
              <Text>Chart</Text>
              <VictoryChart width={300} maxDomain={{ y: 5 }} theme={VictoryTheme.material} domainPadding={15}>
                
                <VictoryLine

                    style={{
                      parent: { border: "3px solid #ccc"},
                      stroke: "#073060",
                      strokeWidth: 15
                    }}
                    data={[
                      {  x: Unix_timestamp(this.state.uplink[this.state.a].timestamp), y: this.state.uplink[this.state.a].power_atten, label: this.state.uplink[this.state.a].power_atten},
                      {  x: Unix_timestamp(this.state.uplink[this.state.b].timestamp), y: this.state.uplink[this.state.b].power_atten, label: this.state.uplink[this.state.b].power_atten},
                      {  x: Unix_timestamp(this.state.uplink[this.state.c].timestamp), y: this.state.uplink[this.state.c].power_atten, label: this.state.uplink[this.state.c].power_atten},
                      {  x: Unix_timestamp(this.state.uplink[this.state.d].timestamp), y: this.state.uplink[this.state.d].power_atten, label: this.state.uplink[this.state.d].power_atten},
                      {  x: Unix_timestamp(this.state.uplink[this.state.e].timestamp), y: this.state.uplink[this.state.e].power_atten, label: this.state.uplink[this.state.e].power_atten}
                      ]}
                      > 
                </VictoryLine>
              </VictoryChart>
            </Block>
          </Card>


        </ScrollView>
      </SafeAreaView>
    )
  }
}

function mapStateToProps(state) {
  return {
      user: state.getAsyncStorage.data,
      downlink: state.downlink.data,
      uplink: state.uplink.data,
      modem: state.modem.data,
      headline: state.headline.data,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getAsyncStorage, getDownlink, getUplink, getModem, getHeadline }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);