/**
 * Import React and React Native
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Text, Form, Item, Input, Spinner, Button, Icon } from 'native-base';
import CodeInput from 'react-native-code-input'; // Version can be specified in package.json

/**
 * Import Utilities
*/
import titleCase from '../../utilities/titleCase';
import isAndroid from '../../utilities/isAndroid';
import isEmpty from '../../utilities/isEmpty';
import isIOS from '../../utilities/isIOS';

/**
 * Import other components
*/
import StatusBar from '../../components/others/StatusBar';

/**
 * Other variables and constants
*/
import Styles from '../styles';

const Verify = function (props) {
  return (
        <Container style={ [Styles.wrapper, Styles.backgroundUbandani] }>
        	<StatusBar />

        	<Content>
        		<View style={ [Styles.doublePadding, Styles.noPaddingBottom, Styles.marginTop] }>
	        		<Text style={ [Styles.textAlignCenter, Styles.halfPadding, Styles.textMedium, Styles.textUbandaniLight] }>
	                    Please Enter the received 6-digit Verification Code below:
	                </Text>
	            </View>
        		<View style={ [Styles.paddingLeft, Styles.paddingRight] }>
	        		<Form block style={ [Styles.doublePadding, Styles.noPaddingBottom, Styles.flexAlignCenter] }>
	        			<Item noIndent style={ [Styles.noBorder, Styles.marginBottom, Styles.noMarginLeft, Styles.paddingLeft, Styles.paddingRight, { orderBottomColor: Styles.textUbandaniLight.color }] }>
	        				<CodeInput
	                            ref={ (input) => { this.codeInput = input; } }
	                            autoFocus={ isIOS() }
	                            keyboardType="numeric"
	                            codeLength={6}
	                            space={8}
	                            size={40}
	                            inputPosition='center'
	                            activeColor={ Styles.textUbandaniLight.color }
	                            inactiveColor={ Styles.textUbandani.color }
	                            className='border-b'
	                            borderType='underline'
	                            cellBorderWidth={1}
	                            codeInputStyle={ [Styles.marginBottom, Styles.textXXLarge, Styles.textUbandaniLight] }
	                            containerStyle={ [styles.verificationCodeContainer] }
	                            placeholder="-"
	                            onFulfill={ props.verificationCodeChanged }
	                        />
	        			</Item>
	        		</Form>
	        	</View>
	        	<View style={ [Styles.doublePadding, Styles.marginBottom] }>
        			<Button block light bordered style={ [Styles.backgroundWrapperTransparent] }>
        				<Text style={ [Styles.textPlaceholder] }>Verify</Text>
        			</Button>
        		</View>
        		<View style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.doublePadding] }>
                    <Button block transparent light>
                        <Text style={ [Styles.textUbandaniLight] }>Request Another Code</Text>
                    </Button>
                </View>
        	</Content>
        </Container>
    );
}

/**
 * Styles
*/
const styles = StyleSheet.create({});

export default Verify;