import React from "react";
import { pure } from 'recompose';
import { View, Image, Text, TouchableOpacity} from "react-native";
import { useTheme } from '@react-navigation/native';
import useGlobalStyles from '../../globalStyle'
import styles from '../storeFront/storeFront.lightStyle'

function ComboCell(props) {
    const item = props.item
    const globalStyle = useGlobalStyles()
    const { colors } = useTheme();

    return (
        <TouchableOpacity onPress={()=>  props.onOpen(item)} >
            <View style={{borderBottomColor: colors.borderPrimary, borderRadius: 10, padding: 16, backgroundColor: colors.bgTertiary, alignItems: 'center', margin: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '70%' }}>
                    <Text style={[globalStyle.textPrimary, styles.menuName]}>{item.name}</Text>
                    <Text style={globalStyle.textSecondary}>{item.description}</Text>
                </View>
                    <Image style={styles.menuImage} defaultSource={{
                        uri: item.imageURL,
                    }} />
            </View>
        </TouchableOpacity>
    )
}

export default pure(ComboCell);