/**
 * Import React and React Native
 */
import React from 'react';
import { StyleSheet, View, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Left, Body, Title, Right, Content, Text, List, ListItem, Thumbnail, Spinner, Button, Icon } from 'native-base'; // Version can be specified in package.json

/**
 * Import Utilities
*/
import isAndroid from '../../utilities/isAndroid';

/**
 * Import other components
*/
import StatusBar from '../../components/others/StatusBar';

/**
 * Other variables and constants
*/
import Styles from '../styles';

const Stories = function (props) {

    return (
        <Container style={ [Styles.wrapper] }>
        	<Header noShadow style={ [Styles.backgroundHeader] }>
        		<Body style={ [isAndroid() && Styles.marginLeft] }>
        			<Title style={ [Styles.textLight] }>Stories</Title>
        		</Body>
        		<Right>
        			<Button transparent onPress={ () => ( props.switchViews(this.coverFlowView, this.listView) ) }>
        				{ props.coverFlowView && !props.listView && <Icon name="list-box" ios="ios-list-box" android="md-list-box" style={ [Styles.textLignt] } /> }
        				{ !props.coverFlowView && props.listView && <Icon name="albums" ios="ios-albums" android="md-albums" style={ [Styles.textLignt] } /> }
        			</Button>
        			<Button transparent onPress={ props.profile }>
        				<Icon name="person" ios="ios-person" android="md-person" style={ [Styles.textLignt] } />
        			</Button>
        		</Right>
        	</Header>

            <StatusBar />

            <Content showsVerticalScrollIndicator={ !props.coverFlowView && props.listView }  style={ [Styles.backgroundKimyaKimyaLight].concat(props.coverFLowView && [Styles.flex, Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter]) }>
            	<List style={ [Styles.noMarginLeft, Styles.noPaddingLeft, Styles.backgroundUbandani] }>
            		<ListItem noIndent style={ [Styles.noMarginLeft] } onPress={ props.player }>
            			<Body style={ [Styles.flex, Styles.flexRow] }>
            				<View style={ [Styles.flexRow, Styles.flexAlignCenter] }>
            					<Button transparent>
		        					<Icon name="close" ios="ios-close" android="md-close" style={ [Styles.textLight] } />
			        			</Button>
			        			<View style={ [Styles.flex, Styles.flexColumn, Styles.flexJustifyStart, Styles.flexAlignStretch] }>
			        				<Text numberOfLines={1} style={ [Styles.textLight, Styles.textAlignLeft] }>Continue Watching...</Text>
			        				<Text numberOfLines={1} style={ [Styles.textLabel, Styles.textSmall, Styles.textAlignLeft] }>Sarabi...</Text>
			        			</View>
            				</View>
		        		</Body>
		        		<Right>
		        			<Thumbnail square source={ require('../../assets/Play_Placeholder.png') } />
		        		</Right>
            		</ListItem>
            	</List>
            	<View style={ [Styles.flex, Styles.marginTop] }>
            		{ props.coverFlowView && <Animated.View ref={ (view) => ( this.coverFlowView = view ) } style={ [Styles.backgroundKimyaKimyaLight, Styles.flex, { zIndex: props.coverFlowViewZIndex }] }>
		            			<Content horizontal={ true } showsHorizontalScrollIndicator={ false } contentContainerStyle={ [Styles.padding] }>
		            				<TouchableWithoutFeedback onPress={ props.story }>
			            				<View style={ [Styles.backgroundWhite, Styles.border, Styles.borderRadius, Styles.overflowHidden, Styles.marginLeft, Styles.marginRight, { width: 220 }] }>
	            							<Image source={ require('../../assets/Play_Background.png') } style={ [Styles.width100, Styles.flex, Styles.imageResizeModeContain, Styles.positionAbsolute, Styles.positionAbsoluteTop, Styles.positionAbsoluteLeft, Styles.positionAbsoluteRight, Styles.borderTopLeftRadius, Styles.borderTopRightRadius, { height: 220 }] } />
			            					<View style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.borderTop, Styles.borderLeft, Styles.borderRight, Styles.borderTopLeftRadius, Styles.borderTopRightRadius, { height: 220 }] }>
			            						<Thumbnail source={ require('../../assets/Play_Icon.png') } />
			            					</View>
			            					<View style={ [Styles.doublePadding] }>
			            						<Text style={ [Styles.fextDark] }>Sarabi...</Text>
			            						<Text numberOfLines={1} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>Anyone can rise from the ashes...</Text>
					            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifySpaceEvenly, Styles.flexAlignCenter] }>
					            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
					            						<Icon name="videocam" ios="ios-videocam" android="md-videocam" style={ [Styles.textSmall, Styles.textUbandani] } />
					            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 15</Text>
					            					</View>
					            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
					            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textUbandani] } />
					            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 10k</Text>
					            					</View>
					            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
					            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textUbandani] } />
					            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 5k</Text>
					            					</View>
					            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
					            						<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
					            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 7k</Text>
					            					</View>
					            				</View>
			            					</View>
			            				</View>
		            				</TouchableWithoutFeedback>
		            				<TouchableWithoutFeedback onPress={ props.story }>
			            				<View style={ [Styles.backgroundWhite, Styles.border, Styles.borderRadius, Styles.overflowHidden, Styles.marginLeft, Styles.marginRight, { width: 220 }] }>
	            							<Image source={ require('../../assets/Play_Background.png') } style={ [Styles.width100, Styles.flex, Styles.imageResizeModeContain, Styles.positionAbsolute, Styles.positionAbsoluteTop, Styles.positionAbsoluteLeft, Styles.positionAbsoluteRight, Styles.borderTopLeftRadius, Styles.borderTopRightRadius, { height: 220 }] } />
			            					<View style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.borderTop, Styles.borderLeft, Styles.borderRight, Styles.borderTopLeftRadius, Styles.borderTopRightRadius, { height: 220 }] }>
			            						<Thumbnail source={ require('../../assets/Play_Icon.png') } />
			            					</View>
			            					<View style={ [Styles.doublePadding] }>
			            						<Text style={ [Styles.fextDark] }>Mlungula Noma...</Text>
			            						<Text numberOfLines={1} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>Rushwa sio dili...</Text>
					            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifySpaceEvenly, Styles.flexAlignCenter] }>
					            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
					            						<Icon name="videocam" ios="ios-videocam" android="md-videocam" style={ [Styles.textSmall, Styles.textUbandani] } />
					            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 15</Text>
					            					</View>
					            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
					            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textUbandani] } />
					            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 10k</Text>
					            					</View>
					            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
					            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textUbandani] } />
					            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 5k</Text>
					            					</View>
					            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
					            						<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
					            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 7k</Text>
					            					</View>
					            				</View>
			            					</View>
			            				</View>
			            			</TouchableWithoutFeedback>
		            			</Content>
		            		</Animated.View>
		            }
		            { props.listView &&  <Animated.View ref={ (view) => ( this.listView = view ) } style={ [Styles.backgroundKimyaKimyaLight, { marginTop: props.listViewMarginTop}] }>
		            	<List>
			            		<ListItem thumbnail square onPress={ props.story }>
			            			<Left>
			            				<Thumbnail square source={ require('../../assets/Play_Placeholder.png') } />
			            			</Left>
			            			<Body>
			            				<Text style={ [Styles.fextDark] }>Sarabi...</Text>
			            				<Text numberOfLines={1} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>Anyone can rise from the ashes...</Text>
			            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter] }>
			            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
			            						<Icon name="videocam" ios="ios-videocam" android="md-videocam" style={ [Styles.textSmall, Styles.textUbandani] } />
			            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 15</Text>
			            					</View>
			            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
			            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textUbandani] } />
			            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 10k</Text>
			            					</View>
			            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
			            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textUbandani] } />
			            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 5k</Text>
			            					</View>
			            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
			            						<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
			            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 7k</Text>
			            					</View>
			            				</View>
			            			</Body>
			            		</ListItem>
			            		<ListItem thumbnail square onPress={ props.story }>
			            			<Left>
			            				<Thumbnail square source={ require('../../assets/Play_Placeholder.png') } />
			            			</Left>
			            			<Body>
			            				<Text style={ [Styles.fextDark] }>Mlungula Noma...</Text>
			            				<Text numberOfLines={1} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>Rushwa sio dili...</Text>
			            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter] }>
			            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
			            						<Icon name="videocam" ios="ios-videocam" android="md-videocam" style={ [Styles.textSmall, Styles.textUbandani] } />
			            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 15</Text>
			            					</View>
			            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
			            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textUbandani] } />
			            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 10k</Text>
			            					</View>
			            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
			            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textUbandani] } />
			            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 5k</Text>
			            					</View>
			            					<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
			            						<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
			            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> 7k</Text>
			            					</View>
			            				</View>
			            			</Body>
			            		</ListItem>
		            		</List>
		            	</Animated.View>
	            	}
	            </View>
            </Content>
        </Container>
    );
}

/**
 * Styles
*/
const styles = StyleSheet.create({});

export default Stories;
