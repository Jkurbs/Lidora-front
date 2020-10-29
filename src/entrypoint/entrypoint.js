

import React from "react";
import { registerRootComponent } from "expo";
import { Platform, View } from 'react-native';
import { HomeMobile } from '../home/home.mobile'
import { HomeWeb } from '../home/home.web'
import { useMediaQuery } from "react-responsive";

import { isBrowser, isMobileSafari } from "react-device-detect";

function Entrypoint() {
    const isTabletOrMobileDevice = useMediaQuery({
        maxDeviceWidth: 1224,
    })
    return <HomeWeb />;
}

export default Entrypoint;