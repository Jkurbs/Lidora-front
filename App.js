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

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      bagTitle: 'View Bag'
    }
  }

  render() {
    const title = 'View Bag'
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* Bottomsheet View */}

        <BottomSheet
          ref={sheetRef}
          snapPoints={[100, 300, Dimensions.get('window').height - 100]}
          borderRadius={10}
          renderContent={renderContent}
        />
      </View>
    );
  }
}

renderContent = () => (
  <View
    style={{
      backgroundColor: '#ecf0f1',
      padding: 16,
      fontSize: 20,
      height: windowHeight,
      width: windowWidth,
      marginBottom: -200
    }}
  >
    <Text onPress={showBag} style={{ fontSize: 17, fontWeight: '600', textAlign: 'center', position: "absolute", marginTop: 20, width: windowWidth }}>{this.state.bagTitle}</Text>
  </View>
);

renderHeader = () => (
  <View style={styles.header}>
    <View style={styles.panelHeader}>
      <View style={styles.panelHandle} />
    </View>
  </View>
)

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


// FUNCTIONS 
function showBag(item) {
  sheetRef.current.snapTo(1);
  if (item.title !== null) {
    // Show Item
    console.log('ITEM: ', item);
  }
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