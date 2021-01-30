    
    
    import React from "react";
    import { pure } from 'recompose';
    import { View, Text } from "react-native";
    import useGlobalStyles from '../globalStyle'
    import styles from '../storeFront.lightStyle'
    
    function Header(props) {
        const globalStyles = useGlobalStyles()
        return ( 
            <View style={[globalStyles.backgroundTertiary, styles.sectionListHeader]}>
                <TouchableOpacity onPress={()=> props.ref.onClose() } style={styles.sectionListHeaderButton}>
                    <Text style={globalStyles.textPrimary}>Dismiss</Text>
                </TouchableOpacity>
                <View style={[globalStyles.border, styles.sectionListHeaderSeparator]} />
            </View>
        ) 
    }

    export default pure(Header)
