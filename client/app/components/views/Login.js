/**
 * Import React and React Native
 */
import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Container, Left, Body, Right, Content, Text, Form, Item, Label, Input, Spinner, Button, Icon } from 'native-base';
import AnimatedHeader from 'react-native-animated-header'; // Version can be specified in package.json

/**
 * Import Utilities
*/
import titleCase from '../../utilities/titleCase';
import isAndroid from '../../utilities/isAndroid';
import isIOS from '../../utilities/isIOS';

/**
 * Import other components
*/
import StatusBar from '../../components/others/StatusBar';

/**
 * Other variables and constants
*/
import Styles from '../styles';

const Login = function (props) {
  return (
        <Container style={ [Styles.wrapper, Styles.backgroundUbandani] }>
        	<StatusBar />

        	<Content>
        		<View style={ [Styles.paddingLeft, Styles.paddingRight] }>
	        		<Form block style={ [Styles.doublePadding, Styles.noPaddingBottom, Styles.flexAlignCenter] }>
	        			<Item noIndent style={ [Styles.noMarginLeft, Styles.paddingLeft, Styles.paddingRight, { borderBottomColor: Styles.textUbandaniLight.color }] }>
	        				<Input style={ [Styles.textUbandaniLight] } placeholder="Your name" />
	        			</Item>
	        			<Item noIndent style={ [Styles.noMarginLeft, Styles.paddingLeft, Styles.paddingRight, { borderBottomColor: Styles.textUbandaniLight.color }] }>
	        				<Input style={ [Styles.textUbandaniLight] } placeholder="Email or Phone" />
	        			</Item>
	        			<Item noIndent style={ [Styles.marginBottom, Styles.noMarginLeft, Styles.paddingLeft, Styles.paddingRight, { borderBottomColor: Styles.textUbandaniLight.color }] }>
	        				<Input style={ [Styles.textUbandaniLight] } placeholder="Password" />
	        			</Item>
	        		</Form>
	        	</View>
        		<View style={ [Styles.doublePadding, Styles.marginBottom] }>
        			<Button block light bordered onPress={ props.verify } style={ [Styles.backgroundWrapperTransparent] }>
        				<Text styles={ [Styles.textPlaceholder] }>Login</Text>
        			</Button>
        		</View>
        		<Text style={ [Styles.textUbandaniLight, Styles.textSmall, Styles.marginBottom, Styles.textAlignCenter] }>Or</Text>
        		<View style={ [Styles.doublePadding, Styles.paddingTop] }>
	        			<Button block style={ [Styles.marginBottom, Styles.backgroundFacebook] }>
	        				<Text>Connect With Facebook</Text>
	        			</Button>
	        			<Button block style={ [Styles.marginBottom, Styles.backgroundGoogle] }>
	        				<Text>Connect With Google</Text>
	        			</Button>
	        	</View>
	        	<View style={ [Styles.doublePadding, Styles.marginBottom, Styles.flexJustifyCenter, Styles.flexAlignCenter] }>
        			<TouchableOpacity onPress={ props.terms }>
                        <Text style={ [Styles.textUbandaniLight] }>Ubandani Terms and Privacy Policy</Text>
                    </TouchableOpacity>
        		</View>
        	</Content>
        </Container>
    );
}

/**
 * Styles
*/
const styles = StyleSheet.create({});

export default Login;