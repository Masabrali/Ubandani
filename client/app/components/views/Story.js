/**
 * Import React and React Native
 */
import React from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
import { Container, Left, Body, Right, Content, Text, List, ListItem, Thumbnail, Spinner, Button, Icon } from 'native-base';
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
// import StatusBar from '../../components/others/StatusBar';

/**
 * Other variables and constants
*/
import Styles from '../styles';

const Story = function (props) {
	return (
        <Container style={ [Styles.wrapper, Styles.backgroundKimyaKimyaLight] }>
        	<AnimatedHeader
              style={ [Styles.flex] }
              title="Sarabi"
              titleStyle={{ fontSize: 22, left: 17, bottom: 20, color: Styles.textUbandaniDark.color, ...Styles.textShadow }}
              renderLeft={ () =>
                  <Button iconLeft transparent onPress={ props.back }>
                      <Icon name="arrow-back" ios="ios-arrow-back" android="md-arrow-back" style={ [Styles.textUbandaniDark, Styles.textShadow, styles.headerIcon] } />
                      { isIOS() && <Text styles={ [Styles.textUbandaniDark, Styles.textShadow] }>Stories</Text> }
                  </Button>
              }
              renderRight={ () =>
                  <Button iconRight transparent onPress={ props.share }>
                      <Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textUbandaniDark, Styles.textShadow, styles.headerIcon] } />
                      { isIOS() && <Text styles={ [Styles.textUbandaniDark, Styles.textShadow] }>Share</Text> }
                  </Button>
              }
              headerMaxHeight={220}
              imageSource={ require('../../assets/Play_Placeholder_Cover.png') }
              toolBarColor={ (isIOS())? 'transparent' : Styles.backgroundUbandaniLight.backgroundColor }
            >
              	<Content>
                		<StatusBar backgroundColor={ Styles.backgroundUbandaniLight.backgroundColor } barStyle="dark-content" />

                		<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyEnd, Styles.flexAlignCenter, Styles.doublePadding, Styles.noPaddingBottom] }>
              					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginLeft] }>
              						  <Icon name="videocam" ios="ios-videocam" android="md-videocam" style={ [Styles.textSmall, Styles.textUbandani] } />
              						  <Text style={ [Styles.textSmall, Styles.textUbandani] }> 15</Text>
              					</View>
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
                            <Text style={ [Styles.textSmall, Styles.textUbandani] }> 7k</Text>
                        </View>
        				    </View>
                		<View style={ [Styles.padding, Styles.noPaddingBottom] }>
                  			<Text numberOfLines={3} style={ [Styles.textLabel, Styles.halfPadding] }>
                  				Occaecati sapiente modi molestias qui. Dolor facilis similique facilis. Voluptatem possimus eligendi assumenda magni et qui cumque voluptates. Rerum excepturi amet laboriosam dolorem voluptatum. Repellendus nobis voluptatem ratione voluptatem dolor ipsam dolor
                  			</Text>
                  			<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyEnd, Styles.flexAlignCenter] }>
                    				<Button primary transparent onPress={ props.excerpt }>
                    				    <Text style={ [Styles.textPrimary] }>Read More</Text>
                    				</Button>
                  			</View>
                		</View>
                		<View>
                  			<View style={ [Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.padding, Styles.noPaddingTop, Styles.halfPaddingBottom, Styles.borderBottom] }>
                    				<Text style={ [Styles.flex, Styles.textMedium, Styles.padding, Styles.halfPaddingLeft] }>Chapters</Text>
                    				<Button iconRight transparent onPress={ props.player }>
                    				    <Text style={ [Styles.textUbandani] }>Play All</Text>
                    				    <Icon name="play" ios="ios-play" android="md-play" style={ [Styles.textUbandani] } />
                    				</Button>
                  			</View>
                  			<List>
        		            		<ListItem thumbnail square onPress={ props.player }>
          		            			<Left>
          		            				  <Thumbnail square source={ require('../../assets/Play_Placeholder.png') } />
          		            			</Left>
          		            			<Body style={ [Styles.paddingRight] }>
            		            				<View style={ [Styles.flexRow, Styles.flexJusityStart, Styles.flexAlignCenter] }>
              		            					<Text style={ [Styles.textLabel] }>Ch 1:</Text>
              		            					<Text numberOfLines={1} style={ [Styles.textDark, Styles.flex] }>Mgombea...</Text>
              		            					<Text style={ [Styles.textXSmall, Styles.textLable] }>(NEXT)</Text>
            		            				</View>
            		            				<Text numberOfLines={1} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>Kelele za Chura hazimzuii ng'ombe kunywa maji...</Text>
            		            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter] }>
              		            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
                		            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textUbandani] } />
                		            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 5k</Text>
              		            					</View>
              		            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
                		            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textUbandani] } />
                		            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 3k</Text>
            		            					   </View>
                                         <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
                                            <Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
                                            <Text style={ [Styles.textSmall, Styles.textUbandani] }> 3k</Text>
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
              		            					<Text style={ [Styles.textLabel] }>Ch 2:</Text>
              		            					<Text numberOfLines={1} style={ [Styles.textDark] }>Boda boda...</Text>
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
                                        <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
                                            <Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
                                            <Text style={ [Styles.textSmall, Styles.textUbandani] }> 4k</Text>
                                        </View>
            		            				</View>
          		            			</Body>
        		            		</ListItem>
      	            		</List>
                		</View>
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

export default Story;