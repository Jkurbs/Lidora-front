import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from '@react-navigation/native'

const getGlobalStyles = (props) => StyleSheet.create({

    // Backgrounds 
    backgroundPrimary: {
        flex: 1,
        overflow: 'hidden', 
        fontFamily: 'system',
        width: '100%',
        backgroundColor: props.colors.background,
    },

    backgroundSecondary: {
        backgroundColor: props.colors.bgSecondary
    },

    backgroundTertiary: {
        backgroundColor: props.colors.bgTertiary
    },

    // Texts 
    textPrimary: {
        marginTop: 6,
        marginBottom: 6,
        fontWeight: '600',
        fontSize: 15,
        color: props.colors.textPrimary, 
    },

    textSecondary: {
        fontSize: 14,
        marginTop: 6,
        color: props.colors.textSecondary, 
    },

    textTertiary: {
        fontSize: 12,
        color: props.colors.textTertiary, 
    },

    border: {
        borderWidth: 0.5,
        width: '100%',
        backgroundColor: props.colors.borderPrimary,
        borderColor: props.colors.borderPrimary,
    },

    formInput: {
        height: 50,
        borderRadius: 6,
        borderWidth: 1,
        paddingLeft: 6,
        marginTop: 8,
        backgroundColor: props.colors.inputBg,
        borderColor: props.colors.inputBorder,
        color: props.colors.inputTextColor, 
    },

    btnPrimary: {
        zIndex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 30,
        height: 60, 
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        color: '#fffff',
        borderRadius: 5, 
        borderWidth: 1,
        backgroundColor: props.colors.btnPrimaryBg,
        borderColor: props.colors.btnPrimaryBorder, 
    },

    btnPrimaryDisabled: {
        opacity: 0.5,
        height: 60, 
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        color: '#fffff',
        borderRadius: 5, 
        borderWidth: 1,
        backgroundColor: props.colors.btnPrimaryBg,
        borderColor: props.colors.btnPrimaryBorder, 
    },

    btnDelete: {
        justifyContent: 'center', 
        marginTop: 16, 
        height: 60, 
        width: '100%', 
        alignSelf: 'center',
        borderRadius: 5, 
        borderWidth: 1,
        color: props.colors.deletionText,
        backgroundColor: props.colors.deletionBg,
        borderColor: props.colors.deletionBorder
    },
});

function useGlobalStyles() {
    const { colors } = useTheme();

    // We only want to recompute the stylesheet on changes in color.
    const styles = React.useMemo(() => getGlobalStyles({ colors }), [colors]);

    return styles;
}

export default useGlobalStyles;