/**
 * Import React and React Native
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, ActionSheet, Left, Body, Right, Content, Text, List, ListItem, Spinner, Button, Icon } from 'native-base';
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

const Profile = function (props) {
	return (
        <Container style={ [Styles.wrapper, Styles.backgroundKimyaKimyaLight] }>
        	<AnimatedHeader
              style={ [Styles.flex] }
              title="Mama Nevi"
              titleStyle={{ fontSize: 22, left: 17, bottom: 20, color: Styles.textUbandaniLight.color, ...Styles.textShadow }}
              renderLeft={ () =>
                  <Button iconLeft transparent onPress={ props.back }>
                      <Icon name="arrow-back" ios="ios-arrow-back" android="md-arrow-back" style={ [Styles.textUbandaniLight, Styles.textShadow, styles.headerIcon] } />
                      { isIOS() && <Text styles={ [Styles.textUbandaniLight, Styles.textShadow] }>Stories</Text> }
                  </Button>
              }
              renderRight={ () =>
                  <Button iconRight transparent onPress={ props.editProfile }>
                      <Icon name="create" ios="ios-create" android="md-create" style={ [Styles.textUbandaniLight, Styles.textShadow, styles.headerIcon] } />
                      { isIOS() && <Text styles={ [Styles.textUbandaniLight, Styles.textShadow] }>Settings</Text> }
                  </Button>
              }
              headerMaxHeight={240}
              imageSource={ require('../../assets/md_Profile_Placeholder.png') }
              toolBarColor={ (isIOS())? 'transparent' : Styles.backgroundUbandani.backgroundColor }
            >
              	<Content>
              		<StatusBar />
    				
    				<List>
    					<ListItem itemDivider style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.doublePadding] }>
	      					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.margin] }>
	      						  <Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textUbandani, Styles.textMedium] } />
	      						  <Text style={ [Styles.textMedium, Styles.halfMarginLeft, Styles.textUbandani] }> 200</Text>
	      					</View>
	      					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.margin] }>
	      						  <Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textUbandani, Styles.textMedium] } />
	      						  <Text style={ [Styles.textMedium, Styles.halfMarginLeft, Styles.textUbandani] }> 100</Text>
	      					</View>
	      					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.margin] }>
	      						  <Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textUbandani, Styles.textMedium] } />
	      						  <Text style={ [Styles.textMedium, Styles.halfMarginLeft, Styles.textUbandani] }> 50</Text>
	      					</View>
	    				</ListItem>
	    				<ListItem noIndent style={ [Styles.noBorderBottom, Styles.halfPaddingTop, Styles.halfPaddingBottom] }>
	                        <Left>
	                            <Text>Logged in with Facebook</Text>
	                        </Left>
	                        <Right>
	                        	<Button transparent onPress={ () =>

	                        		ActionSheet.show({
			                            options: [
			                                { text: 'Log In with a different option', icon: 'log-in', iconColor: isAndroid() && Styles.textSuccess.color },
			                                { text: 'Log Out', icon: 'log-out', iconColor: isAndroid() && Styles.textDanger.color },
			                                { text: 'Cancel', icon: (isAndroid())? 'close-circle' : 'close-circle-outline', iconColor: isAndroid() && Styles.textPrimary.color }
			                            ],
			                            cancelButtonIndex: 2,
			                            destructiveButtonIndex: 1,
			                            title: "Account Options"
			                        }, (index) => {

			                            if (index == 0) return props.login();
			                            else if (index == 1) return props.logout();

			                            return;
			                        } )
	                        	}>
	                            	<Icon name="more" ios="ios-more" android="md-more" />
	                            </Button>
	                        </Right>
                    	</ListItem>
                    	<ListItem itemDivider></ListItem>
	                    <ListItem thumbnail onPress={ props.help }>
	                        <Left>
	                            <IconBox name="information" ios="ios-information" android="md-information" backgroundColor="#12a2b8" />
	                        </Left>
	                        <Body>
	                            <Text>Need Help</Text>
	                        </Body>
	                        <Right style={ [Styles.halfMarginRight] }>
	                            <Icon name="arrow-forward" ios="ios-arrow-forward" android="md-arrow-forward" />
	                        </Right>
	                    </ListItem>
	                    <ListItem thumbnail disabled={ props.loading } onPress={ props.invite }>
	                        <Left>
	                            <IconBox name="heart" ios="ios-heart" android="md-heart" backgroundColor="#ec407a" />
	                        </Left>
	                        <Body style={ [Styles.noBorderBottom] }>
	                            <Text>Tell a Friend</Text>
	                        </Body>
	                        <Right style={ [Styles.noBorderBottom, Styles.halfMarginRight] }>
	                        	{ props.loading && <Icon name="arrow-forward" ios="ios-arrow-forward" android="md-arrow-forward" /> }
                            	{ !props.loading && <Spinner size="small" color={ Styles.textUbandani.color } style={ [Styles.heightAuto] } /> }
	                        </Right>
	                    </ListItem>
    				</List>
              	</Content>
            </AnimatedHeader>
        </Container>
    );
}

/**
 * Styles
*/
const styles = StyleSheet.create({
	headerIcon: { fontSize: 24 }
});

export default Profile;