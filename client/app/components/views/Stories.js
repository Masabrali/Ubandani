/**
 * Import React and React Native
 */
import React from 'react';
import { StyleSheet, RefreshControl, View, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Segment, Left, Body, Title, Right, Content, Text, List, ListItem, Thumbnail, Spinner, Button, Icon } from 'native-base';
import moment from 'moment';
import momentDurationFormat from 'moment-duration-format'; // Version can be specified in package.json

/**
 * Import Utilities
*/
import titleCase from '../../utilities/titleCase';
import abbreviateNumber from '../../utilities/abbreviateNumber';
import isEmpty from '../../utilities/isEmpty';
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

	let item = {};

    return (
        <Container style={ [Styles.backgroundWrapper] }>
        	<Header hasSegment noShadow style={ [Styles.backgroundHeader] }>
        		<Body style={ [isAndroid() && Styles.marginLeft] }>
        			<Title style={ [Styles.textLight] }>Stories</Title>
        		</Body>
        		<Right>
        			<Button transparent onPress={ () => ( props.switchViews(this.coverFlowView, this.listView) ) }>
        				{ props.coverFlowView && !props.listView && !props.switchingViews && <Icon name="list-box" ios="ios-list-box" android="md-list-box" style={ [Styles.textLignt] } /> }
        				{ !props.coverFlowView && props.listView && !props.switchingViews && <Icon name="albums" ios="ios-albums" android="md-albums" style={ [Styles.textLignt] } /> }
        				{ props.switchingViews && <Spinner size="small" color={ Styles.textLight.color } style={ [Styles.heightAuto] } /> }
        			</Button>
        			<Button transparent onPress={ props.profile }>
        				<Icon name="person" ios="ios-person" android="md-person" style={ [Styles.textLignt] } />
        			</Button>
        		</Right>
        	</Header>
        	<Segment style={ [Styles.backgroundUbandani] }>
            	<Button first active={ props.segment == "all" } style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter, { minWidth: '30%' }] } onPress={ () => ( props.changeSegment('all') ) }>
             		<Text style={ [(props.segment == "all") && Styles.textUbandani] }>All</Text>
            	</Button>
              	<Button active={ props.segment == "puppets" } style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter, { minWidth: '30%' }] } onPress={ () => ( props.changeSegment('puppets') ) }>
              		<Text style={ [(props.segment == "puppets") && Styles.textUbandani] }>Puppets</Text>
              	</Button>
              	<Button last active={ props.segment == "animations" } style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter, { minWidth: '30%' }] } onPress={ () => ( props.changeSegment('animations') ) }>
              		<Text style={ [(props.segment == "animations") && Styles.textUbandani] }>Animation</Text>
              	</Button>
            </Segment>
            <View style={ [Styles.backgroundHeader, Styles.halfPaddingBottom] } />

            <StatusBar />

            <Content
            	refreshControl={
	                <RefreshControl
	                  refreshing={ props.collectionsLoading || props.filmsLoading || props.musicLoading }
	                  onRefresh={ props.refresh }
	                />
	            }
	            keyboardShouldPersistTaps="handle"
            	showsVerticalScrollIndicator={ !props.coverFlowView && props.listView } 
            	style={ [Styles.backgroundKimyaKimyaLight] }
            >
            	<TouchableWithoutFeedback onPress={ props.player }>
	            	<View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.padding, Styles.backgroundUbandani] }>
	            		<View style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter] }>
		            		<Button transparent>
								<Icon name="close" ios="ios-close" android="md-close" style={ [Styles.textLight] } />
			    			</Button>
			    		</View>
	        			<View style={ [Styles.flex, Styles.paddingLeft, Styles.paddingRight] }>
	        				<Text numberOfLines={1} style={ [Styles.textLight, Styles.textAlignLeft] }>Continue Watching...</Text>
	        				<Text numberOfLines={1} style={ [Styles.textLabel, Styles.textSmall, Styles.textAlignLeft] }>Sarabi...</Text>
	        				<Text numberOfLines={1} style={ [Styles.textLight, Styles.textSmall, Styles.textAlignLeft] }>02:30 of 10:16</Text>
	        			</View>
	        			<View style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfPadding] }>
	        				<Thumbnail square source={ require('../../assets/Play_Placeholder.png') } />
	        			</View>
	            	</View>
	            </TouchableWithoutFeedback>

	            <View style={ [Styles.flex] }>
	            	<View style={ [Styles.flex] }>
	            		<Text style={ [Styles.doublePadding, Styles.paddingBottom, Styles.textLarge, Styles.textBold, Styles.textDark] }>Collections</Text>
	            		<View style={ [Styles.flex, { minHeight: 120 }] }>
	            			{ !isEmpty(props.collections[props.segment]) && <View style={ [Styles.flex] }>
			            			{ props.coverFlowView && <Content horizontal={ true } showsHorizontalScrollIndicator={ false } contentContainerStyle={ [Styles.padding, Styles.noPaddingTop, props.collectionsLoading && Styles.flex] }>
			            					{
			            						Object.keys(props.collections[props.segment]).map( (key) => {

			            							item = props.collections[props.segment][key];

			            							return (
				            							<TouchableWithoutFeedback key={ item.id } onPress={ () => props.story(item) }>
								            				<View style={ [Styles.backgroundWhite, Styles.border, Styles.borderRadius, Styles.overflowHidden, Styles.marginLeft, Styles.marginRight, { width: 200 }] }>
						            							<Image source={ (item.thumbnail)? { uri: item.thumbnail } : props.defaultThumbnail } style={ [Styles.width100, Styles.flex, Styles.positionAbsolute, Styles.verticalPositionTop, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.borderTopLeftRadius, Styles.borderTopRightRadius, { height: 120 }] } />
								            					<View style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.borderTop, Styles.borderLeft, Styles.borderRight, Styles.borderTopLeftRadius, Styles.borderTopRightRadius, { height: 120 }] }>
								            						<Thumbnail small source={ require('../../assets/Play_Icon.png') } />
								            						<View style={ [Styles.positionAbsolute, Styles.verticalPositionBottom, Styles.horizontalPositionRight, Styles.backgroundDark, Styles.halfMargin, { padding: 2, paddingRight: 3 }] }>
										            					<Text style={ [Styles.textLight, Styles.textXXSmall] }>
										            						{ moment.duration(616, "seconds").format("mm:ss") }
										            					</Text>
										            				</View>
								            					</View>
								            					<View style={ [Styles.padding, Styles.doublePaddingBottom] }>
								            						<Text style={ [Styles.fextDark] }>{ item.title }</Text>
								            						<Text numberOfLines={1} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>{ item.description }</Text>
										            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.halfPaddingLeft] }>
										            					{ !!item.videos && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
											            						<Icon name="videocam" ios="ios-videocam" android="md-videocam" style={ [Styles.textSmall, Styles.textUbandani] } />
											            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.videos) }</Text>
											            					</View>
											            				}
										            					{ !!item.views && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
											            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textUbandani] } />
											            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.views) }</Text>
											            					</View>
											            				}
										            					{ !!item.shares && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
											            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textUbandani] } />
											            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.shares) }</Text>
											            					</View>
											            				}
										            					{ !!item.likes && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
											            						<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
											            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.likes) }</Text>
											            					</View>
											            				}
										            				</View>
								            					</View>
								            				</View>
							            				</TouchableWithoutFeedback>
							            			);
			            						} )
			            					}
			            				</Content>
			            			}
			            			{ props.listView && <List
			            					style={ [Styles.doublePaddingBottom] }
			            					dataArray={ props.collections[props.segment] }
                      						keyboardShouldPersistTaps="always"
                      						renderRow={ (item) =>
                      							<ListItem thumbnail square key={ item.id } onPress={ () => props.story(item) }>
							            			<Left>
							            				<Thumbnail square large source={ (item.thumbnail)? { uri: item.thumbnail } : props.defaultThumbnail } style={ [{ width: 120 }] } />
							            				<View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, { width: 120 }] }>
							            					<Thumbnail small source={ require('../../assets/Play_Icon.png') } />
							            				</View>
							            			</Left>
							            			<Body style={ [Styles.paddingRight] }>
							            				<Text style={ [Styles.fextDark] }>
							            					{ item.title }
							            				</Text>
							            				<Text numberOfLines={1} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>
							            					{ item.description }
							            				</Text>
							            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.halfPaddingLeft] }>
							            					{ !!item.videos && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="videocam" ios="ios-videocam" android="md-videocam" style={ [Styles.textSmall, Styles.textUbandani] } />
								            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.videos) }</Text>
								            					</View>
								            				}
							            					{ !!item.views && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textUbandani] } />
								            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.views) }</Text>
								            					</View>
								            				}
							            					{ !!item.shares && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textUbandani] } />
								            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.shares) }</Text>
								            					</View>
								            				}
							            					{ !!item.likes && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
								            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.likes) }</Text>
								            					</View>
								            				}
							            				</View>
							            			</Body>
							            		</ListItem>
                      						}
			            				/>
			            			}
			            		</View>
			            	}
			            	{ isEmpty(props.collections[props.segment]) && !props.collectionsLoading && <View style={ [Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter] }>
			            			<Text style={ [Styles.textLabel, Styles.textAlignCenter, Styles.padding, Styles.margin] }>
			            				No Collections found in this category
			            			</Text>
			            		</View>
			            	}
	            			{ (props.collectionsLoading || props.switchingViews) && <View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.height100, Styles.backgroundKimyaKimyaLightTransluscent] }>
			            			<Spinner color={ Styles['textUbandani'].color } />
			            		</View>
			            	}
	            		</View>
	            	</View>

	            	{ /** Films */ }
	            	<View style={ [Styles.flex] }>
	            		<Text style={ [Styles.doublePadding, Styles.paddingBottom, Styles.textLarge, Styles.textBold, Styles.textDark] }>Films</Text>
	            		<View style={ [Styles.flex, { minHeight: 120 }] }>
	            			{ !isEmpty(props.films[props.segment]) && <View style={ [Styles.flex] }>
			            			{ props.coverFlowView && <Content horizontal={ true } showsHorizontalScrollIndicator={ false } contentContainerStyle={ [Styles.padding, Styles.noPaddingTop, props.collectionsLoading && Styles.flex] }>
			            					{
			            						Object.keys(props.films[props.segment]).map( (key) => {

			            							item = props.films[props.segment][key];

			            							return (
				            							<TouchableWithoutFeedback key={ item.id } onPress={ () => props.player(item) }>
								            				<View style={ [Styles.backgroundWhite, Styles.border, Styles.borderRadius, Styles.overflowHidden, Styles.marginLeft, Styles.marginRight, { width: 200 }] }>
						            							<Image source={ (item.thumbnail)? { uri: item.thumbnail } : props.defaultThumbnail } style={ [Styles.width100, Styles.flex, Styles.positionAbsolute, Styles.verticalPositionTop, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.borderTopLeftRadius, Styles.borderTopRightRadius, { height: 120 }] } />
								            					<View style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.borderTop, Styles.borderLeft, Styles.borderRight, Styles.borderTopLeftRadius, Styles.borderTopRightRadius, { height: 120 }] }>
								            						<Thumbnail small source={ require('../../assets/Play_Icon.png') } />
								            						<View style={ [Styles.positionAbsolute, Styles.verticalPositionBottom, Styles.horizontalPositionRight, Styles.backgroundDark, Styles.halfMargin, { padding: 2, paddingRight: 3 }] }>
										            					<Text style={ [Styles.textLight, Styles.textXXSmall] }>
										            						{ moment.duration(item.duration, "seconds").format("mm:ss") }
										            					</Text>
										            				</View>
								            					</View>
								            					<View style={ [Styles.padding, Styles.doublePaddingBottom] }>
								            						<Text style={ [Styles.fextDark] }>{ item.title }</Text>
								            						<Text numberOfLines={1} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>{ item.description }</Text>
										            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.halfPaddingLeft] }>
										            					{ !!item.views && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
											            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textUbandani] } />
											            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.views) }</Text>
											            					</View>
											            				}
										            					{ !isEmpty(item.shares) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
											            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textUbandani] } />
											            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.shares.length) }</Text>
											            					</View>
											            				}
										            					{ !isEmpty(item.likes) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
											            						<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
											            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.likes.length) }</Text>
											            					</View>
											            				}
										            				</View>
								            					</View>
								            				</View>
							            				</TouchableWithoutFeedback>
							            			);
			            						} )
			            					}
			            				</Content>
			            			}
			            			{ props.listView && <List
			            					style={ [Styles.doublePaddingBottom] }
			            					dataArray={ props.films[props.segment] }
                      						keyboardShouldPersistTaps="always"
                      						renderRow={ (item) =>
                      							<ListItem thumbnail square key={ item.id } onPress={ () => props.player(item) }>
							            			<Left>
							            				<Thumbnail square large source={ (item.thumbnail)? { uri: item.thumbnail } : props.defaultThumbnail } style={ [{ width: 120 }] } />
							            				<View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, { width: 120 }] }>
							            					<Thumbnail small source={ require('../../assets/Play_Icon.png') } />
							            				</View>
							            				<View style={ [Styles.positionAbsolute, Styles.verticalPositionBottom, Styles.horizontalPositionRight, Styles.backgroundDark, Styles.halfMargin, { padding: 2, paddingRight: 3 }] }>
							            					<Text style={ [Styles.textLight, Styles.textXXSmall] }>
							            						{ moment.duration(item.duration, "seconds").format("mm:ss") }
							            					</Text>
							            				</View>
							            			</Left>
							            			<Body style={ [Styles.paddingRight] }>
							            				<Text style={ [Styles.fextDark] }>
							            					{ item.title }
							            				</Text>
							            				<Text numberOfLines={1} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>
							            					{ item.description }
							            				</Text>
							            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.halfPaddingLeft] }>
							            					{ !!item.views && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textUbandani] } />
								            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.views) }</Text>
								            					</View>
								            				}
							            					{ !isEmpty(item.shares) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textUbandani] } />
								            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.shares.length) }</Text>
								            					</View>
								            				}
							            					{ !isEmpty(item.likes) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
								            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.likes.length) }</Text>
								            					</View>
								            				}
							            				</View>
							            			</Body>
							            		</ListItem>
                      						}
			            				/>
			            			}
			            		</View>
			            	}
			            	{ isEmpty(props.films[props.segment]) && !props.collectionsLoading && <View style={ [Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter] }>
			            			<Text style={ [Styles.textLabel, Styles.textAlignCenter, Styles.padding, Styles.margin] }>
			            				No Films found in this category
			            			</Text>
			            		</View>
			            	}
	            			{ (props.filmsLoading || props.switchingViews) && <View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.height100, Styles.backgroundKimyaKimyaLightTransluscent] }>
			            			<Spinner color={ Styles['textUbandani'].color } />
			            		</View>
			            	}
	            		</View>
	            	</View>

	            	{ /** Music */ }
	            	<View style={ [Styles.flex] }>
	            		<Text style={ [Styles.doublePadding, Styles.paddingBottom, Styles.textLarge, Styles.textBold, Styles.textDark] }>Music</Text>
	            		<View style={ [Styles.flex, { minHeight: 120 }] }>
	            			{ !isEmpty(props.music[props.segment]) && <View style={ [Styles.flex] }>
			            			{ props.coverFlowView && <Content horizontal={ true } showsHorizontalScrollIndicator={ false } contentContainerStyle={ [Styles.padding, Styles.noPaddingTop, props.collectionsLoading && Styles.flex] }>
			            					{
			            						Object.keys(props.music[props.segment]).map( (key) => {

			            							item = props.music[props.segment][key];

			            							return (
				            							<TouchableWithoutFeedback key={ item.id } onPress={ () => props.player(item) }>
								            				<View style={ [Styles.backgroundWhite, Styles.border, Styles.borderRadius, Styles.overflowHidden, Styles.marginLeft, Styles.marginRight, { width: 200 }] }>
						            							<Image source={ (item.thumbnail)? { uri: item.thumbnail } : props.defaultThumbnail } style={ [Styles.width100, Styles.flex, Styles.positionAbsolute, Styles.verticalPositionTop, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.borderTopLeftRadius, Styles.borderTopRightRadius, { height: 120 }] } />
								            					<View style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.borderTop, Styles.borderLeft, Styles.borderRight, Styles.borderTopLeftRadius, Styles.borderTopRightRadius, { height: 120 }] }>
								            						<Thumbnail small source={ require('../../assets/Play_Icon.png') } />
								            						<View style={ [Styles.positionAbsolute, Styles.verticalPositionBottom, Styles.horizontalPositionRight, Styles.backgroundDark, Styles.halfMargin, { padding: 2, paddingRight: 3 }] }>
										            					<Text style={ [Styles.textLight, Styles.textXXSmall] }>
										            						{ moment.duration(item.duration, "seconds").format("mm:ss") }
										            					</Text>
										            				</View>
								            					</View>
								            					<View style={ [Styles.padding, Styles.doublePaddingBottom] }>
								            						<Text style={ [Styles.fextDark] }>{ item.title }</Text>
								            						<Text numberOfLines={1} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>{ item.description }</Text>
										            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.halfPaddingLeft] }>
										            					{ !!item.views && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
											            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textUbandani] } />
											            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.views) }</Text>
											            					</View>
											            				}
										            					{ !isEmpty(item.shares) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
											            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textUbandani] } />
											            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.shares.length) }</Text>
											            					</View>
											            				}
										            					{ !isEmpty(item.likes) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
											            						<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
											            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.likes.length) }</Text>
											            					</View>
											            				}
										            				</View>
								            					</View>
								            				</View>
							            				</TouchableWithoutFeedback>
							            			);
			            						} )
			            					}
			            				</Content>
			            			}
			            			{ props.listView && <List
			            					style={ [Styles.doublePaddingBottom] }
			            					dataArray={ props.music[props.segment] }
                      						keyboardShouldPersistTaps="always"
                      						renderRow={ (item) =>
                      							<ListItem thumbnail square key={ item.id } onPress={ () => props.player(item) }>
							            			<Left>
							            				<Thumbnail square large source={ (item.thumbnail)? { uri: item.thumbnail } : props.defaultThumbnail } style={ [{ width: 120 }] } />
							            				<View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, { width: 120 }] }>
							            					<Thumbnail small source={ require('../../assets/Play_Icon.png') } />
							            				</View>
							            				<View style={ [Styles.positionAbsolute, Styles.verticalPositionBottom, Styles.horizontalPositionRight, Styles.backgroundDark, Styles.halfMargin, { padding: 2, paddingRight: 3 }] }>
							            					<Text style={ [Styles.textLight, Styles.textXXSmall] }>
							            						{ moment.duration(item.duration, "seconds").format("mm:ss") }
							            					</Text>
							            				</View>
							            			</Left>
							            			<Body style={ [Styles.paddingRight] }>
							            				<Text style={ [Styles.fextDark] }>
							            					{ item.title }
							            				</Text>
							            				<Text numberOfLines={1} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>
							            					{ item.description }
							            				</Text>
							            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.halfPaddingLeft] }>
							            					{ !!item.views && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textUbandani] } />
								            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.views) }</Text>
								            					</View>
								            				}
							            					{ !isEmpty(item.shares) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textUbandani] } />
								            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.shares.length) }</Text>
								            					</View>
								            				}
							            					{ !isEmpty(item.likes) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
								            						<Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(item.likes.length) }</Text>
								            					</View>
								            				}
							            				</View>
							            			</Body>
							            		</ListItem>
                      						}
			            				/>
			            			}
			            		</View>
			            	}
			            	{ isEmpty(props.music[props.segment]) && !props.collectionsLoading && <View style={ [Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter] }>
			            			<Text style={ [Styles.textLabel, Styles.textAlignCenter, Styles.padding, Styles.margin] }>
			            				No Music found in this category
			            			</Text>
			            		</View>
			            	}
	            			{ (props.musicLoading || props.switchingViews) && <View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.height100, Styles.backgroundKimyaKimyaLightTransluscent] }>
			            			<Spinner color={ Styles['textUbandani'].color } />
			            		</View>
			            	}
	            		</View>
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

export default Stories;
