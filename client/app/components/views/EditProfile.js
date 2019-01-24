/**
 * Import React and React Native
 */
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Container, Content, Text, Form, Item, Label, Input, Spinner, Button, Icon } from 'native-base';
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
import IconBox from './../others/IconBox';
import StatusBar from '../../components/others/StatusBar';

/**
 * Other variables and constants
*/
import Styles from '../styles';

const EditProfile = function (props) {
	return (
        <Container style={ [Styles.wrapper] }>
        	<StatusBar />

        	<Content contentContainerStyle={ [Styles.backgroundKimyaKimyaLight] }>
        		<View style={ [Styles.flex, Styles.flexJustifyEnd, Styles.flexAlignCenter, Styles.backgroundUbandani] }>
        			<View style={ [Styles.borderRadius, Styles.overflowHidden, Styles.doubleMarginTop, { width: 230, height: 230, marginBottom: -50}] }>
        				<Image source={ require('../../assets/Play_Background.png') } style={ [Styles.imageResizeModeContain, Styles.borderRadius, Styles.backgroundUbandaniLight, { width: 230, height: 230 }] } />
        			</View>
        		</View>
        		<View style={ [Styles.flex, Styles.flexJustifySpaceBetween, Styles.AlignCenter, { paddingTop: 70 }] }>
        			<Form block style={ [Styles.doublePadding, Styles.paddingTop, Styles.flexAlignCenter] }>
        				<Item noIndent last style={ [Styles.noMarginLeft] }>
        					<Input ref={ (input) => ( this.nameInput = input ) } placeholder="Mama Nevi" initialValue="Mama Nevi" value="Mama Nevi" style={ [Styles.textXXLarge, Styles.textAlignCenter, Styles.textUbandaniDark] } />
        					<Label onPress={ () => ( this.nameInput.focus() ) }>
        						<Icon name="create" ios="ios-create" android="md-create" style={ [Styles.textPlaceholder] } />
        					</Label>
        				</Item>
        			</Form>

        			<View style={ [Styles.doublePadding, Styles.paddingTop] }>
	        			<Button block>
	        				<Text>Confirm Changes</Text>
	        			</Button>
	        		</View>
        		</View>
        	</Content>
        </Container>
    );
}

/**
 * Styles
*/
const styles = StyleSheet.create({});

export default EditProfile;