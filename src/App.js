import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomSheet from 'reanimated-bottom-sheet';
import { Dimensions } from 'react-native';

import { StyleSheet, Text, View, SectionList } from 'react-native';

import ChefInfoView from '../components/chefInfoView';
import EmptyBag from '../components/emptyBagView';
import MenuView from '../components/menuView';
import ItemInfoView from '../components/itemInfoView';

const Stack = createStackNavigator();
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const sheetRef = React.createRef();
var item;

const DATA = [
  {
    title: "",
    data: [
      { type: 'User', key: 1, firstName: 'Janice', lastName: 'Wargler', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam, quis nostrud exercitation.', imageURL: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
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
      bagTitle: 'View Bag',
      bagClosed: true,
      item
    }
    this.showBag = this.showBag.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  // FUNCTIONS
  showBag = (item) => {
    this.item = item
    sheetRef.current.snapTo(1);
    if (item.price !== undefined) {
      this.setState({
        bagTitle: item.name,
        bagClosed: false,
        item: item
      })
    } else {
      this.setState({
        bagTitle: this.state.bagTitle
      })
    }
  }

  fullBag() {
    return (
      <Text>{"Not empty"}</Text>
    )
  }

  renderElement() {
    if (this.state.bagClosed === true) {
      return <EmptyBag />;
    } else {
      return <ItemInfoView item={this.item} />
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
      { this.renderElement(this.state.item)}
    </View>
  );

  render() {
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
              return <ChefInfoView item={item} />;
            };
            return <MenuView item={item} showBag={this.showBag} />
          }}
          stickySectionHeadersEnabled={false}
        />
        {/* Bottomsheet View */}

        <BottomSheet
          ref={sheetRef}
          snapPoints={[100, windowHeight - 100]}
          borderRadius={10}
          renderContent={this.renderContent}
          onOpenStart={() => {
            // calling logic to show bag
            this.setState({
              bagClosed: false
            })
          }}
          onCloseEnd={() => {
            // calling logic to hide bag
            this.setState({
              bagTitle: 'View Bag',
              bagClosed: true
            })
          }}
        />
      </View>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Menu' component={HomeScreen}
            options={{
              // headerTitle: props => <LogoTitle {...props} />,
              headerRight: () => (
                <Ionicons style={{ paddingRight: 16 }} name='ios-list' size={26} color="black" />
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
    alignItems: 'flex-start'
  },
});

export default registerRootComponent(App);
