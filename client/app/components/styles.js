/**
 * Import React and React Native
 */
import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native'; // Version can be specified in package.json

/**
 * Import Utilities
*/
import isAndroid from '../utilities/isAndroid';

/**
* Get Screen Widht and Height
*/
const { width, height } = Dimensions.get('window');
const screenWidth = width;
const screenHeight = height;

/**
* Style
*/
const styles = StyleSheet.create({
    /**
     * Utilities
    */
    /**
     * FlexBox Style Utilities
    */
    flex: { flex: 1 },
    flex2: { flex: 2 },
    flex3: { flex: 3 },
    flex4: { flex: 4 },
    flex5: { flex: 5 },
    flex6: { flex: 6 },
    flexGrow: { flexGrow: 1 },
    flexGrow2: { flexGrow: 2 },
    flexGrow3: { flexGrow: 3 },
    flexGrow4: { flexGrow: 4 },
    flexGrow5: { flexGrow: 5 },
    flexGrow6: { flexGrow: 6 },
    flexColumn: { flexDirection: 'column' },
    flexRow: { flexDirection: 'row' },
    flexJustifyStart: { justifyContent: 'flex-start' },
    flexJustifyEnd: { justifyContent: 'flex-end' },
    flexJustifyCenter: { justifyContent: 'center' },
    flexJustifySpaceAround: { justifyContent: 'space-around' },
    flexJustifySpaceBetween: { justifyContent: 'space-between' },
    flexJustifySpaceEvenly: { justifyContent: 'space-evenly' },
    flexAlignCenter: { alignItems: 'center' },
    flexAlignLeft: { alignItems: 'flex-start' },
    flexAlignStart: { alignItems: 'flex-start' },
    flexAlignRight: { alignItems: 'flex-end' },
    flexAlignEnd: { alignItems: 'flex-end' },
    flexAlignStretch: { alignItems: 'stretch' },
    // flexWrap: { flexwrap: 'wrap' },
    /**
    * Position Styles
    */
    positionAbsolute: { position: 'absolute' },
    verticalPositionTop: { top: 0 },
    verticalPositionTop50: { bottom: '50%' },
    verticalPositionTopStatusBar: { top: (isAndroid())? StatusBar.currentHeight : 20 },
    verticalPositionBottom: { bottom: 0 },
    verticalPositionBottom50: { bottom: '50%' },
    verticalPositionBottomStatusBar: { bottom: (isAndroid())? StatusBar.currentHeight : 20 },
    horizontalPositionLeft: { left: 0 },
    horizontalPositionRight: { right: 0 },
    absoluteFillObject: { ...StyleSheet.absoluteFillObject },
    /**
    * Overflow
    */
    overflowHidden: { overflow: 'hidden' },
    /**
     * Text Style Utilities
    */
    textAlignCenter: { textAlign: 'center' },
    textAlignLeft: { textAlign: 'left' },
    textAlignRight: { textAlign: 'right' },
    textBold: { fontWeight: 'bold' },
    textXXXLarge: { fontSize: 26 },
    textXXLarge: { fontSize: 24 },
    textXLarge: { fontSize: 22 },
    textLarge: { fontSize: 20 },
    textMedium: { fontSize: 18 },
    textSmall: { fontSize: 14 },
    textXSmall: { fontSize: 12 },
     textXXSmall: { fontSize: 10 },
    textPrimary: { color: (isAndroid())? '#3f51b5':'#007bff' },
    textSecondary: { color: '#6c757d' },
    textSuccess: { color: '#5cb85c' },
    textWarning: { color: '#f0ad4e' },
    textDanger: { color: '#d9534f' },
    textInfo: { color: '#62B1F6' },
    textLight: { color: '#f4f4f4' },
    textDark: { color: '#000000' },
    textWhite: { color: '#ffffff' },
    textWrapper: { color: '#fbfcfc' },
    textError: { color: '#f43f36' },
    textLink: { color: '#007bff' },
    textPlaceholder: { color: '#777777' },
    textLabel: { color: '#666666' },
    textSubtitle: { color: '#616167' },
    textCopyRight: {
        color: '#555555',
        fontSize: 14
    },
    textDisabled: { color: '#c1c1c7' },
    textUbandani: { color: '#f4a460' },
    textUbandaniLight: { color: '#fef6f0' },
    textUbandaniDark: { color: '#170f09' },
    textShadow: {
        shadowColor: 'rgba(0, 0, 0, .75)',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 5
    },
    /**
     * Border Style Utilities
     */
    noBorder: {
        borderWidth: 0,
        borderColor: 'rgba(0, 0, 0, 0)'
    },
    noBorderBottom: {
        borderBottomWidth: 0,
        borderBottomColor: 'rgba(0, 0, 0, 0)'
    },
    border: {
        borderWidth: .8,
        borderColor: '#c1c1c7'
    },
    borderTop: {
        borderTopWidth: .8,
        borderTopColor: '#c1c1c7'
    },
    borderBottom: {
        borderBottomWidth: .8,
        borderBottomColor: '#c1c1c7'
    },
    borderLeft: {
        borderLeftWidth: .8,
        borderLeftColor: '#c1c1c7'
    },
    borderRight: {
        borderRightWidth: .8,
        borderRightColor: '#c1c1c7'
    },
    borderQuote: {
        borderLeftWidth: 6,
        borderLeftColor: '#c1c1c7',
    },
    borderPrimary: { borderColor: (isAndroid())? '#3f51b5':'#007bff' },
    borderDisabled: { borderColor: '#c1c1c7' },
    borderError: { borderColor: '#f43f36' },
    borderRadius: { borderRadius: 10 },
    halfBorderRadius: { borderRadius: 5 },
    doubleBorderRadius: { borderRadius: 20 },
    borderTopLeftRadius: { borderTopLeftRadius: 10 },
    borderTopRightRadius: { borderTopRightRadius: 10 },
    /**
    * Shadow Style Utlities
    */
    noShadow: {
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        elevation: 0
    },
    shadowTop: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: -3
        },
        shadowRadius: 5,
        shadowOpacity: 0.5
    },
    /**
     * Table
     */
    table: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    cell: {
        padding: 5,
        margin: 5
    },
    /**
     * Margin Style Utilities
     */
    noMargin: { margin: 0 },
    noMarginTop: { marginTop: 0 },
    noMarginBottom: { marginBottom: 0 },
    noMarginLeft: { marginLeft: 0 },
    noMarginRight: { marginRight: 0 },
    margin: { margin: 10  },
    halfMargin: { margin: 5  },
    marginStatusBar: { margin: (isAndroid())? StatusBar.currentHeight : 20  },
    marginTop: { marginTop: 10 },
    halfMarginTop: { marginTop: 5 },
    doubleMarginTop: { marginTop: 20 },
    marginTopStatusBar: { marginTop: (isAndroid())? StatusBar.currentHeight : 20 },
    marginBottom: { marginBottom: 10 },
    halfMarginBottom: { marginBottom: 5 },
    doubleMarginBottom: { marginBottom: 20 },
    marginBottomStatusBar: { marginBottom: (isAndroid())? StatusBar.currentHeight : 20 },
    marginLeft: { marginLeft: 10 },
    halfMarginLeft: { marginLeft: 5 },
    doubleMarginLeft: { marginLeft: 20 },
    marginLeftStatusBar: { marginLeft: (isAndroid())? StatusBar.currentHeight : 20 },
    marginRight: { marginRight: 10 },
    halfMarginRight: { marginRight: 5 },
    doubleMarginRight: { marginRight: 20 },
    marginRightStatusBar: { marginRight: (isAndroid())? StatusBar.currentHeight : 20 },
    /**
     * Margin Style Utilities
     */
    noPadding: { padding: 0 },
    noPaddingTop: { paddingTop: 0 },
    noPaddingBottom: { paddingBottom: 0 },
    noPaddingLeft: { paddingLeft: 0 },
    noPaddingRight: { paddingRight: 0 },
    padding: { padding: 10 },
    halfPadding: { padding: 5 },
    doublePadding: { padding: 20 },
    padder: { padding: (isAndroid())? StatusBar.currentHeight : 20 },
    paddingTop: { paddingTop: 10 },
    halfPaddingTop: { paddingTop: 5 },
    doublePaddingTop: { paddingTop: 20 },
    paddingTopStatusBar: { paddingTop: (isAndroid())? StatusBar.currentHeight : 20 },
    paddingBottom: { paddingBottom: 10 },
    halfPaddingBottom: { paddingBottom: 5 },
    doublePaddingBottom: { paddingBottom: 20 },
    paddingBottomStatusBar: { paddingBottom: (isAndroid())? StatusBar.currentHeight : 20 },
    paddingLeft: { paddingLeft: 10 },
    halfPaddingLeft: { paddingLeft: 5 },
    doublePaddingLeft: { paddingLeft: 20 },
    paddingLeftStatusBar: { paddingLeft: (isAndroid())? StatusBar.currentHeight : 20 },
    paddingRight: { paddingRight: 10 },
    halfPaddingRight: { paddingRight: 5 },
    doublePaddingRight: { paddingRight: 20 },
    paddingRightStatusBar: { paddingRight: (isAndroid())? StatusBar.currentHeight : 20 },
    /**
     * Width Utilities
     */
    screenWidth: { width: screenWidth },
    width100: { width: '100%' },
    widthAuto: { width: 'auto' },
    maxWidth100: { maxWidth: '100%' },
    width90: { width: '90%' },
    width75: { width: '75%' },
    width60: { width: '60%' },
    width50: { width: '50%' },
    width33: { width: '33%' },
    width25: { width: '25%' },
    width10: { width: '10%' },
    /**
    * Height Utilities
    */
    screenHeight: { height: screenHeight },
    heightAuto: { height: 'auto' },
    height100: { height: '100%' },
    maxHeight100: { maxHeight: '100%' },
    height90: { height: '90%' },
    height75: { height: '75%' },
    height60: { height: '60%' },
    height50: { height: '50%' },
    height33: { height: '33%' },
    height25: { height: '25%' },
    height10: { height: '10%' },
    /**
     * Header
     */
    headerPaddingTop: { paddingTop: (isAndroid())? StatusBar.currentHeight : 20 },
    /**
     * label Stylling
     */
    label: {
        fontSize: 18,
        color: '#666666'
    },
    /**
     * Placeholder Stylling
     */
    placeholder: {
        fontSize: 18,
        color: '#666666'
    },
    /**
    * Image Styles
    */
    imageResizeModeCenter: { resizeMode: 'center' },
    imageResizeModeRepeat: { resizeMode: 'repeat' },
    imageResizeModeStretch: { resizeMode: 'stretch' },
    imageResizeModeContain: { resizeMode: 'contain' },
    imageResizeModeCover: { resizeMode: 'cover' },
    /**
     * Cover Image
     */
    coverImage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        minHeight: '100%',
        height: 'auto',
        justifyContent: 'center'
    },
    /**
     * Backgrounds
     */
    backgroundPrimary: { backgroundColor: (isAndroid())? '#3f51b5':'#007bff' },
    backgroundSecondary: { backgroundColor: '#6c757d' },
    backgroundSuccess: { backgroundColor: '#5cb85c' },
    backgroundWarning: { backgroundColor: '#f0ad4e' },
    backgroundDanger: { backgroundColor: '#d9534f' },
    backgroundInfo: { backgroundColor: '#62B1F6' },
    backgroundLight: { backgroundColor: '#f4f4f4' },
    backgroundDark: { backgroundColor: '#000000' },
    backgroundWhite: { backgroundColor: '#ffffff' },
    backgroundTransparent: { backgroundColor: 'transparent' },
    backgroundDarkTransluscent: { backgroundColor: 'rgba(0, 0, 0, .5)' },
    backgroundWhiteTransluscent: { backgroundColor: 'rgba(255, 255, 255, .9)' },
    backgroundDisabled: { backgroundColor: '#c1c1c7' },
    backgroundSelected: { backgroundColor: '#f1f1f7' },
    backgroundWrapper: { backgroundColor: '#fef6f0' },
    backgroundWrapperTransparent: { backgroundColor: 'rgba(254, 246, 240, .3)' },
    backgroundWrapperTransluscent: { backgroundColor: 'rgba(254, 246, 240, .9)' },
    backgroundHeader: { backgroundColor: '#f4a460' },
    backgroundStatusBar: { backgroundColor: '#f4a460' },
    backgroundStatusBarTransparent: { backgroundColor: 'rgba(0, 0, 0, .3)' },
    backgroundUbandani: { backgroundColor: '#f4a460' },
    backgroundUbandaniLight: { backgroundColor: '#fef6f0' },
    backgroundUbandaniDark: { backgroundColor: '#170f09' },
    backgroundKimyaKimyaLight:{ backgroundColor: '#fbfcfc'},
    backgroundKimyaKimyaLightTransluscent: { backgroundColor: 'rgba(251, 252, 252, .9)' },
    backgroundFacebook: { backgroundColor: '#3b5998' },
    backgroundGoogle: { backgroundColor: '#ea4335' },
    /**
     * Other Styles
     */
    loader: { backgroundColor: 'rgba(254, 246, 240, 0.8)' },
    /**
     * TabBar
     */
    tabBar: { backgroundColor: '#FEF6F0' },
    /**
     *  ModalFilterPicker
     */
    modalFilterPicker: {
        borderRadius: (isAndroid())? 0 : 5,
        backgroundColor: '#fef6f0',
        marginBottom: (isAndroid())? StatusBar.currentHeight : 20,
        minWidth: (screenWidth <= 375)? screenWidth - ((isAndroid())? StatusBar.currentHeight : 20) : 320,
        height: (screenHeight <= 812)? screenHeight - ((isAndroid())? (7 * StatusBar.currentHeight) : 140) : 609
    },
    modalFilterPickerOptionText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'left',
        paddingHorizontal: 5
    },
    modalFilterPickerSelectedOptionText: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingHorizontal: 5
    },
    modalFilterPickerCancelButton: {
        flex: 0,
        backgroundColor: '#fef6f0',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: (isAndroid())? 0 : 10,
        minWidth: (screenWidth <= 375)? screenWidth - ((isAndroid())? StatusBar.currentHeight : 20) : 320
    },
    modalFilterPickerCancelButtonText: {
        fontSize: 18,
        color: (isAndroid())? '#3f51b5' : '#007bff',
        textAlign: 'center'
    },
    /**
     * Wrapper
     */
    wrapper: {
        backgroundColor: '#fef6f0'
    },
    /**
     * Header
     */
    header: {
        backgroundColor: '#fef6f0'
    },
    /**
     * Content
     */
    content: {
        backgroundColor: '#ffffff'
    },
    /**
     * Footer
     */
    footer: {
        backgroundColor: '#fef6f0'
    }
});

export default styles;
