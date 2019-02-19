/**
 * Import React and React Native
 */
import React from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
import { Container, Header, Left, Body, Right, Content, Text, List, ListItem, Thumbnail, Spinner, Button, Icon } from 'native-base'; // Version can be specified in package.json

/**
 * Import Utilities
*/
import titleCase from '../../utilities/titleCase';
import isEmpty from '../../utilities/isEmpty';
import isAndroid from '../../utilities/isAndroid';
import isIOS from '../../utilities/isIOS';

/**
 * Import other components
*/
// import StatusBar from '../../components/others/StatusBar';

/**
 * Other variables and constants
*/
import Styles from '../styles';

const Excerpt = function (props) {
	return (
        <Container style={ [Styles.wrapper] }>
            <Header noShadow style={ [Styles.backgroundUbandaniLight, (props.reference == "collection") && Styles.marginTopStatusBar] }>
                <Left>
                    <Button iconLeft transparent onPress={ props.back }>
                        <Icon name="arrow-back" ios="ios-arrow-back" android="md-arrow-back" style={ [Styles.textUbandaniDark] } />
                        { isIOS() && <Text style={ [Styles.textUbandaniDark] }>Back</Text> }
                    </Button>
                </Left>
                <Right>
                    <Button transparent onPress={ props.like }>
                        <Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textUbandaniDark] } />
                    </Button>
                    <Button transparent onPress={ props.share }>
                        <Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textUbandaniDark] } />
                    </Button>
                </Right>
            </Header>

            <StatusBar backgroundColor={ Styles.backgroundUbandaniLight.backgroundColor } barStyle="dark-content" />
            
            <View style={ [Styles.flexRow, Styles.flexJustityCenter, Styles.flexAlignCenter, Styles.borderBottom, Styles.padding, Styles.doublePaddingBottom, Styles.backgroundUbandaniLight] }>
                <View style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.paddingLeft, Styles.paddingRight] }>
                    <Thumbnail square large defaultSource={ props.defaultThumbnail } source={ (props.item.thumbnail)? { uri: props.item.thumbnail } : props.defaultThumbnail } style={ [{ width: 120 }] } />
                </View>
                <View style={ [Styles.flex, Styles.paddingLeft, Styles.paddingRight] }>
                    <Text style={ [Styles.textXXLarge] }>{ props.item.title }</Text>
                    <Text numberOfLines={2} style={ [Styles.textLabel, Styles.textSmall] }>{ props.item.description }</Text>
                </View>
            </View>
            <Content padder style={ [Styles.backgroundKimyaKimyaLight, Styles.flex] } contentContainerStyle={ [Styles.doublePadding] }>
                { !!props.item.starring && <View style={ [Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter] }>
                        <Text style={ [Styles.textLabel] }>Starring:</Text>
                        <Text style={ [Styles.halfMarginLeft] }>{ props.item.starring }</Text>
                    </View>
                }
                { !isEmpty(props.item.cast) && <View style={ [Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter] }>
                        <Text style={ [Styles.textLabel] }>Cast:</Text>
                        <Text style={ [Styles.halfMarginLeft] }>{ props.item.cast.join(', ') }</Text>
                   </View>
                }
                <Text style={ [Styles.halfMarginTop, Styles.textLabel, Styles.textMedium, { lineHeight: 28 }] }>{ props.item.excerpt }</Text>
            </Content>
        </Container>
    );
}

/**
 * Styles
*/
const styles = StyleSheet.create({});

export default Excerpt;