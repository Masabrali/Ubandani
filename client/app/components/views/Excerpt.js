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
            <Header noShadow style={ [Styles.backgroundUbandaniLight] }>
                <Left>
                    <Button iconLeft transparent onPress={ props.back }>
                        <Icon name="arrow-back" ios="ios-arrow-back" android="md-arrow-back" style={ [Styles.textUbandaniDark] } />
                        { isIOS() && <Text styles={ [Styles.textUbandaniDark] }>Back</Text> }
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
            
            <View style={ [Styles.flexRow, Styles.flexJustityStart, Styles.flexAlignCenter, Styles.borderBottom, Styles.paddingBottom, Styles.backgroundUbandaniLight] }>
                <View style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.paddingLeft, Styles.paddingRight] }>
                    <Thumbnail square defaultSource={ require('../../assets/Play_Placeholder.png') } source={ require('../../assets/Play_Placeholder.png') } />
                </View>
                <View styles={ [Styles.flex, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.paddingLeft, Styles.paddingRight] }>
                    <Text style={ [Styles.textXXLarge] }>Sarabi</Text>
                    <Text style={ [Styles.textLabel, Styles.textSmall] }>Anyone can make it...</Text>
                </View>
            </View>
            <Content padder style={ [Styles.backgroundKimyaKimyaLight, Styles.flex] } contentContainerStyle={ [Styles.doublePadding] }>
                <Text style={ [Styles.textLabel, Styles.textMedium, { lineHeight: 28 }] }>
                  Occaecati sapiente modi molestias qui. Dolor facilis similique facilis. Voluptatem possimus eligendi assumenda magni et qui cumque voluptates. Rerum excepturi amet laboriosam dolorem voluptatum. Repellendus nobis voluptatem ratione voluptatem dolor ipsam dolor. Occaecati sapiente modi molestias qui. Dolor facilis similique facilis. Voluptatem possimus eligendi assumenda magni et qui cumque voluptates. Rerum excepturi amet laboriosam dolorem voluptatum. Repellendus nobis voluptatem ratione voluptatem dolor ipsam dolor
                </Text>
            </Content>
        </Container>
    );
}

/**
 * Styles
*/
const styles = StyleSheet.create({});

export default Excerpt;