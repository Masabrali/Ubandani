/**
 * Import React and React Native
 */
import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Container, Header, Left, Body, Title, Right, Content, Text, List, ListItem, Thumbnail, Spinner, Button, Icon } from 'native-base'; // Version can be specified in package.json

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

const Player = function (props) {
	return (
        <Container style={ [Styles.wrapper] }>
        	<Header noShadow style={ [Styles.backgroundDark] }>
        		<Left>
        			<Button iconLeft transparent onPress={ props.back }>
                      	<Icon name="arrow-back" ios="ios-arrow-back" android="md-arrow-back" style={ [Styles.textUbandaniLight] } />
                      	{ isIOS() && <Text styles={ [Styles.textUbandaniLight] }>Back</Text> }
                  	</Button>
        		</Left>
        		<Right>
        			<Button transparent onPress={ props.like }>
                      	<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textUbandaniLight] } />
                  	</Button>
                  	<Button transparent onPress={ props.share }>
                      	<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textUbandaniLight] } />
                  	</Button>
        		</Right>
        	</Header>

        	<StatusBar backgroundColor={ Styles.backgroundDark.backgroundColor } />

          <View style={ [Styles.backgroundDark] }>
          	<View style={ [{ height: 200 }] }>
          		<View style={ [Styles.flex, Styles.flexJustifyCenter, Styles.flexAlignCenter] }>
          			<View style={ [Styles.flexRow, Styles.flexJustifySpaceEvenly, Styles.flexAlignCenter] }>
          				<Button transparent>
          					<Icon name="skip-backward" ios="ios-skip-backward" android="md-skip-backward" style={ [Styles.textUbandaniLight] } />
          				</Button>
          				<Thumbnail source={ require('../../assets/Play_Icon.png') } style={ [Styles.marginLeft, Styles.marginRight] } />
          				<Button transparent>
          					<Icon name="skip-forward" ios="ios-skip-forward" android="md-skip-forward" style={ [Styles.textUbandaniLight] } />
          				</Button>
          			</View>
          		</View>
          	</View>
          	<View style={ [Styles.flexRow, Styles.flexAlignCenter, Styles.padding, Styles.doublePaddingTop, Styles.doublePaddingBottom, Styles.borderBottom] }>
          		<View style={ [Styles.flex, Styles.flexRow, Styles.halfPaddingLeft] }>
          			<Text style={ [Styles.textLarge, Styles.textLabel] }>Ch 1: </Text>
          			<Text style={ [Styles.textLarge, Styles.textUbandaniLight] }>Mgombea...</Text>
          		</View>
          		<View style={ [Styles.flexRow, Styles.flexJustifyEnd, Styles.flexAlignCenter, Styles.halfPaddingRight] }>
      					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginLeft] }>
      						  <Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textUbandani] } />
      						  <Text style={ [Styles.textSmall, Styles.textUbandani] }> 10k</Text>
      					</View>
      					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginLeft] }>
      						  <Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textUbandani] } />
      						  <Text style={ [Styles.textSmall, Styles.textUbandani] }> 5k</Text>
      					</View>
                <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginLeft] }>
                    <Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
                    <Text style={ [Styles.textSmall, Styles.textUbandani] }> 2k</Text>
                </View>
              </View>
  			    </View>
          </View>
        	<Content contentContainerStyle={ [Styles.backgroundKimyaKimyaLight] }>
        		<View style={ [Styles.padding, Styles.noPaddingBottom, Styles.flexRow, Styles.flexAlignCenter] }>
          			<Text numberOfLines={2} style={ [Styles.textLabel, Styles.halfPadding, Styles.flex] }>
          				Occaecati sapiente modi molestias qui. Dolor facilis similique facilis. Voluptatem possimus eligendi assumenda magni et qui cumque voluptates. Rerum excepturi amet laboriosam dolorem voluptatum. Repellendus nobis voluptatem ratione voluptatem dolor ipsam dolor
          			</Text>
    				 <Button primary transparent onPress={ props.excerpt }>
    				    <Text style={ [Styles.textPrimary] }>Read More</Text>
    				</Button>
        		</View>
	        	<View>
          			<View style={ [Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.padding, Styles.halfPaddingBottom, Styles.borderBottom] }>
            				<Text style={ [Styles.flex, Styles.textMedium, Styles.halfPaddingLeft, Styles.halfPaddingRight] }>Up Next</Text>
          			</View>
          			<List>
	            		<ListItem thumbnail square onPress={ props.player }>
	            			<Left>
	            				  <Thumbnail square source={ require('../../assets/Play_Placeholder.png') } />
	            			</Left>
	            			<Body style={ [Styles.paddingRight] }>
	            				<View style={ [Styles.flexRow, Styles.flexJusityStart, Styles.flexAlignCenter] }>
		            					<Text style={ [Styles.textLabel] }>Ch 2:</Text>
		            					<Text numberOfLines={1} style={ [Styles.textDark, Styles.flex] }>Boda boda...</Text>
		            					<Text style={ [Styles.textXSmall, Styles.textLable] }>(NEXT)</Text>
	            				</View>
	            				<Text numberOfLines={1} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>Dogo dogo sio dili...</Text>
	            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter] }>
		            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
		            						  <Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textUbandani] } />
		            						  <Text style={ [Styles.textSmall, Styles.textUbandani] }> 5k</Text>
		            					</View>
		            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
		            						  <Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textUbandani] } />
		            						  <Text style={ [Styles.textSmall, Styles.textUbandani] }> 2k</Text>
		            					</View>
                          <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter] }>
                              <Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
                              <Text style={ [Styles.textSmall, Styles.textUbandani] }> 1k</Text>
                          </View>
	            				</View>
	            			</Body>
	            		</ListItem>
	            		<ListItem thumbnail square onPress={ props.player }>
	            			<Left>
	            				  <Thumbnail square source={ require('../../assets/Play_Placeholder.png') } />
	            			</Left>
	            			<Body style={ [Styles.paddingRight] }>
	            				<View style={ [Styles.flexRow, Styles.flexJusityStart, Styles.flexAlignCenter] }>
		            					<Text style={ [Styles.textLabel] }>Ch 3:</Text>
		            					<Text numberOfLines={1} style={ [Styles.textDark, Styles.flex] }>Wazazi...</Text>
	            				</View>
	            				<Text numberOfLines={1} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>Pamoja tunaweza...</Text>
	            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter] }>
		            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
		            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textUbandani] } />
		            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 5k</Text>
		            					</View>
		            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
		            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textUbandani] } />
		            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 3k</Text>
	            					  </View>
                          <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter] }>
                              <Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
                              <Text style={ [Styles.textSmall, Styles.textUbandani] }> 1k</Text>
                          </View>
	            				</View>
	            			</Body>
	            		</ListItem>
            		</List>
          		</View>
        	</Content>
        </Container>
    );
}

/**
 * Styles
*/
const styles = StyleSheet.create({});

export default Player;