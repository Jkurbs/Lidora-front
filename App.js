import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { Dimensions } from 'react-native';

import { StyleSheet, Text, View, SectionList, SafeAreaView, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, Image, Button, Alert, Icon, Navigator } from 'react-native';

const userImageViewSize = 120
const Stack = createStackNavigator();
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const sheetRef = React.createRef();

const DATA = [
  {
    title: "",
    data: [
      { type: 'User', key: 1, firstName: 'Janice', lastName: 'Wargler', imageURL: "https://bootdey.com/img/Content/avatar/avatar6.png" },
    ]
  },
  {
    title: "Menu",
    data: [
      { key: 1, name: 'Rice', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ", price: 3.29, image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=706&q=80" },
      { key: 2, name: 'Healthy gear', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ", price: 10.29, image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1335&q=80" },
      { key: 3, name: 'Tuna burger', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ", price: 12.29, image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" },
      { key: 4, name: 'Hot hoagies - Chicken strips', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ", price: 5.69, image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1231&q=80" },
    ]
  }
]

const Item = ({ title }) => (
  <View style={menuStyles.item}>
    <Text style={menuStyles.title}>{title}</Text>
  </View>
);

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      bagTitle: 'View Bag'
    }
    this.showBag = this.showBag.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  // FUNCTIONS
  showBag = (item) => {
    sheetRef.current.snapTo(1);
    if (item.price !== undefined) {
      console.log('ITEM', item)
      this.setState({
        bagTitle: item.name
      })
    } else {
      this.setState({
        bagTitle: this.state.bagTitle
      })
    }
  }

  renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        fontSize: 20,
        height: windowHeight,
        width: windowWidth,
        marginBottom: -200
      }}
    >
      <Text onPress={this.showBag} style={{ backgroundColor: '#ecf0f1', fontSize: 17, fontWeight: '600', textAlign: 'center', position: "absolute", padding: 16, width: windowWidth, height: 60 }}>{this.state.bagTitle}</Text>
    </View>
  );

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState)
  }

  render() {
    const title = 'View Bag'
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <SectionList style={{ marginBottom: 100 }}
          sections={DATA}
          renderSectionHeader={({ section }) => {
            return (
              <View style={menuStyles.titleContainer}>
                <Text style={menuStyles.title}>
                  {section.title}
                </Text>
              </View>
            )
          }}
          renderItem={({ item }) => {
            if (item.type === 'User') {
              return (
                <View style={styles.container} >
                  {/* User details View */}
                  <Image style={styles.userImage} source={{ uri: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80" }} />
                  <Text style={styles.userName}>Janice Wagner</Text>
                  <View style={iconView.container}>
                    <Ionicons style={iconView.icons} name="ios-timer" size={24} color="#9A9A9A" />
                    <Text>1 day pre-order</Text>
                  </View>
                  <View style={iconView.container}>
                    <Ionicons style={iconView.icons} name="ios-information-circle-outline" size={24} color="#9A9A9A" />
                    <Text>$0.30 Delivery Fee</Text>
                  </View>

                  {/* Description View */}
                  <View style={{ marginTop: 55 }}>
                    <View style={styles.lineStyle} />
                    <Text style={{ margin: 13 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam, quis nostrud exercitation.</Text>
                    <View style={styles.lineStyle} />
                  </View>

                  {/* Schedule View */}
                  <View>
                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: 16.0, marginBottom: 30 }}>
                      <Text style={{ alignSelf: 'flex-start', marginLeft: 13.0, fontSize: 16, fontWeight: '500' }}>View Schedule</Text>
                      <Entypo name="chevron-right" size={24} color="#9A9A9A" />
                    </View>
                    <View style={styles.lineStyle} />
                  </View>
                </View>
              )
            };
            return (
              <TouchableOpacity style={menuStyles.container} onPress={() => this.showBag(item)} >
                <View style={menuStyles.content}>
                  <View style={menuStyles.contentHeader}>
                    <Text style={menuStyles.name}>{item.name}</Text>
                    <Text style={menuStyles.description}>{item.description}</Text>
                    <Text style={menuStyles.price}>{'$' + item.price}</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Image style={menuStyles.image} source={{ uri: item.image }} />
                </TouchableOpacity>
              </TouchableOpacity>
            )
          }}
          stickySectionHeadersEnabled={false}
        />
        {/* Bottomsheet View */}

        <BottomSheet
          ref={sheetRef}
          snapPoints={[100, 300, Dimensions.get('window').height - 100]}
          borderRadius={10}
          renderContent={this.renderContent}
        />
      </View>
    );
  }
}

export default class Layout extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Menu' component={HomeScreen}
            options={{
              // headerTitle: props => <LogoTitle {...props} />,
              headerRight: () => (
                <Ionicons style={iconView.icons} name='ios-list' size={26} color="black" />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
}


// STYLES
const styles = StyleSheet.create({
  container: {
    fontFamily: 'System',
    flex: 1,
    backgroundColor: '#fff',
  },
  userImage: {
    marginTop: 8.0,
    marginLeft: 13.0,
    width: userImageViewSize,
    height: userImageViewSize,
    position: "absolute",
    borderRadius: userImageViewSize / 2,
  },
  userName: {
    marginLeft: userImageViewSize + 32.0,
    marginRight: -13.0,
    marginTop: 8.0,
    fontSize: 21,
    fontWeight: "bold"
  },
  lineStyle: {
    borderWidth: 0.3,
    borderColor: '#CCCCCC',
    marginLeft: 13.0
  },
  schedule: {
    alignContent: 'flex-end'
  }
});

const iconView = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: userImageViewSize + 32.0,
    marginTop: 13.0,
  },
  icons: {
    paddingRight: 8,
  }
});

const menuStyles = StyleSheet.create({
  root: {
    marginTop: 21,
    padding: 8,
  },
  titleContainer: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
  },
  title: {
    marginLeft: 13,
    fontSize: 18,
    fontWeight: '500',
    color: "#000000"

  },
  container: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 13,
    flex: 1,
  },
  contentHeader: {
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 16.0,
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 16,
    fontWeight: '500'
  },
  description: {
    fontSize: 14,
    marginRight: 16.0,
    marginTop: 8.0,
    marginBottom: 8.0
  },
  price: {
    fontSize: 15,
    fontWeight: '600'
  },
});