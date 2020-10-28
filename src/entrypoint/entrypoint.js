

import React from "react";
import { registerRootComponent } from "expo";
import { Platform } from 'react-native';
import homeMobile from '../home/home.mobile'
import homeWeb from '../home/home.web'


function App() {
    if (Platform.OS === 'ios') {
        return <homeMobile />;
    } else {
        return <homeWeb />;
    }
}

export default registerRootComponent(App);