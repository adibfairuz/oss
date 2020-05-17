import React, { Component } from 'react';
import { TouchableOpacity, Image, SafeAreaView, ScrollView, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { LineChart } from "react-native-chart-kit";

import { Block, Card, Text, Icon, Label } from '../components';
import * as theme from '../constants/theme';

const styles = StyleSheet.create({
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

const data = {
  labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
  datasets: [
    {
      data: [0, 10, 20, 50, 45, 28, 36, 80, 99, 120, 86, 55, 43, 39, 78, 102, 122, 130, 110, 101, 99, 78, 53, 22],
      strokeWidth: 2, // optional
    },
  ],
};

export default class Dashboard extends Component {
  getAsyncStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('dashboard adda storageee', value)
      }else{
        console.log('dashboard null storageee', value)
      }
    } catch (error) {
      console.log('dashboard error storageee', value)
    }
};

  componentDidMount(){
    this.getAsyncStorage('user');
  }
  
  render() {
    return (
      <SafeAreaView style={styles.overview}>
        <ScrollView contentContainerStyle={{ paddingVertical: 25 }}>

          <Block row style={[styles.margin, { marginTop: 18 }]}>
            <Card middle style={{ marginRight: 7 }}>
              <Icon sqf />
              <Text h2 style={{ marginTop: 17 }}>1,42</Text>
              <Text paragraph color="gray">LATEST SQF</Text>
              <Text paragraph color="blue">10 MAY 2020 </Text>
            </Card>
            
            <Card middle style={{ marginLeft: 7 }}>
              <Icon attenuation />
              <Text h2 style={{ marginTop: 17 }}>2.4 dB</Text>
              <Text paragraph color="gray">LATEST ATTENUATION</Text>
              <Text paragraph color="blue">10 MAY 2020 </Text>
            </Card>
          </Block>

          <Block row style={[styles.margin, { marginTop: 18 }]}>
            <Card middle style={{ marginRight: 7 }}>
              <Icon time />
              <Text h2 style={{ marginTop: 17 }}>03:50:48</Text>
              <Text paragraph color="gray">UPTIME</Text>
              <Text paragraph color="blue">10 MAY 2020 </Text>
            </Card>
            
            <Card middle style={{ marginLeft: 7 }}>
              <Icon memory />
              <Text h2 style={{ marginTop: 17 }}>615020 KB</Text>
              <Text paragraph color="gray">AVAILABLE MEMORY</Text>
              <Text paragraph color="blue">10 MAY 2020 </Text>
            </Card>
          </Block>
              
          <Card
            title="SQF CHART"
            style={[styles.margin, { marginTop: 18 }]}>
            <Block row right>
              <Block flex={2} row center right>
                <Text paragraph color="blue">10 MAY 2020</Text>
              </Block>
            </Block>
            <Block>
              <Text>Chart</Text>
              <LineChart
                data={data}
                width={Dimensions.get("window").width -108} // from react-native
                height={240}
                
                // yAxisSuffix="k"
                // yAxisInterval={1}
                chartConfig={{
                  backgroundColor: '#043e62',
                  backgroundGradientFrom: '#54b9f8',
                  backgroundGradientTo: '#ceebfd',
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "4",
                    strokeWidth: "1",
                    stroke: "#fff"
                  }
                }}
                bezier
                style={{
                  marginVertical: 10,
                  marginHorizontal: 5,
                  borderRadius: 12,

                }}
              ></LineChart>
            </Block>
          </Card>
          <Card
            title="ATTENUATION CHART"
            style={[styles.margin, { marginTop: 18 }]}>
            <Block row right>
              <Block flex={2} row center right>
                <Text paragraph color="blue">10 MAY 2020</Text>
              </Block>
              </Block>
            <Block>
              <Text>Chart</Text>
              <LineChart
                data={data}
                width={Dimensions.get("window").width -108} // from react-native
                height={240}
                
                // yAxisSuffix="k"
                // yAxisInterval={1}
                chartConfig={{
                  backgroundColor: '#043e62',
                  backgroundGradientFrom: '#54b9f8',
                  backgroundGradientTo: '#ceebfd',
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "4",
                    strokeWidth: "1",
                    stroke: "#fff"
                  }
                }}
                bezier
                style={{
                  marginVertical: 10,
                  marginHorizontal: 5,
                  borderRadius: 12,

                }}
              ></LineChart>
            </Block>
          </Card>


        </ScrollView>
      </SafeAreaView>
    )
  }
}