/**
 * Import React and React Native
 */
import React from 'react';
import { StyleSheet, RefreshControl, View, Image, Animated, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Container, Header, Segment, Left, Body, Title, Right, Content, Text, List, ListItem, Thumbnail, Spinner, Button, Icon, Item, Input } from 'native-base';
import moment from 'moment';
import momentDurationFormat from 'moment-duration-format'; // Version can be specified in package.json

/**
 * Import Utilities
*/
import titleCase from '../../utilities/titleCase';
import abbreviateNumber from '../../utilities/abbreviateNumber';
import isEmpty from '../../utilities/isEmpty';
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

const Home = function (props) {
	
    return (
        <Container style={ [Styles.backgroundWrapper] }>
        	<Header hasSegment noShadow style={ [Styles.backgroundHeader] }>
        		<Body style={ [Styles.flex, !props.searchFocused && isAndroid() && Styles.marginLeft, props.searchFocused && isAndroid() && Styles.marginRight] }>
        			{ !props.searchFocused && <Title style={ [Styles.textUbandaniLight] }>Ubandani</Title> }
        			{ props.searchFocused && <Item style={ [isAndroid() && Styles.borderBottom, isIOS() && Styles.borderRadius, Styles.marginBottom, styles.searchItem, isAndroid() && { borderBottomColor: Styles.textUbandaniLight.color }] } disabled={ (props.collectionsLoading || props.collectionsRefreshing || props.filmsLoading || props.filmsRefreshing || props.musicLoading || props.musicRefreshing) } >
        					{ isAndroid() && <Button iconRight transparent style={ [Styles.height100] } onPress={ () => ( props.blurSearch(this.searchInput) ) }>
	                                <Icon name="arrow-back" ios="ios-arrow-back" android="md-arrow-back" style={ [Styles.textUbandaniLight] } />
	                            </Button>
	                        }
	                        <Input
	                          autoFocus={ props.searchFocused }
	                          ref={ (input) => ( this.searchInput = input ) }
	                          onLayout={ () => ( this.searchInput._root.focus() ) }
	                          style={ [Styles.textUbandaniLight] }
	                          placeholder="Search..."
	                          placeholderTextColor={ Styles.textLight.color }
	                          onChangeText={ props.search }
	                          autoCapitalization="none"
	                          autoCorrect={ false }
	                          clearButtonMode="while-editing"
	                        />
	                        { isAndroid() && <Button iconLeft transparent onPress={ () => ( props.clearSearch(this.searchInput) ) }>
	                                <Icon name="close" ios="ios-close" android="md-close" style={ [Styles.textUbandaniLight] } />
	                            </Button>
	                        }
        				</Item>
        			}
        			{ props.searchFocused && isIOS() && <Button transparent onPress={ () => ( props.blurSearch(this.searchInput) ) }>
                            <Text>Cancel</Text>
                        </Button>
                    }
        		</Body>
        		{ !props.searchFocused && <Right>
	        			<Button transparent onPress={ () => ( props.focusSearch(this.searchInput) ) }>
	        				<Icon name="search" ios="ios-search" android="md-search" style={ [Styles.textLignt] } />
	        			</Button>
	        			<Button transparent onPress={ () => ( props.switchViews(this.coverFlowView, this.listView) ) }>
	        				{ props.coverFlowView && !props.listView && !props.switchingViews && <Icon name="list-box" ios="ios-list-box" android="md-list-box" style={ [Styles.textLignt] } /> }
	        				{ !props.coverFlowView && props.listView && !props.switchingViews && <Icon name="albums" ios="ios-albums" android="md-albums" style={ [Styles.textLignt] } /> }
	        				{ props.switchingViews && <Spinner size="small" color={ Styles.textUbandaniLight.color } style={ [Styles.heightAuto] } /> }
	        			</Button>
	        			{ false && <Button transparent onPress={ props.profile }>
		        				<Icon name="person" ios="ios-person" android="md-person" style={ [Styles.textLignt] } />
		        			</Button>
		        		}
	        		</Right>
	        	}
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
	                  refreshing={ props.collectionsRefreshing || props.filmsRefreshing || props.musicRefreshing }
	                  onRefresh={ props.refresh }
	                />
	            }
	            keyboardShouldPersistTaps="handle"
            	showsVerticalScrollIndicator={ !props.coverFlowView && props.listView } 
            	style={ [Styles.backgroundKimyaKimyaLight] }
            	contentContainerStyle={ [(isEmpty(props.collections[props.segment]) && !props.collectionsLoading) && (isEmpty(props.collections[props.segment]) && !props.collectionsLoading) && (isEmpty(props.collections[props.segment]) && !props.collectionsLoading) && Styles.flex] }
            >
            	{ !isEmpty(props.playing) && <View style={ [Styles.backgroundUbandani] }>
	            		<TouchableWithoutFeedback onPress={ () => (
	            				props.player(props.playing, props.playing.section, props.playing.category, props.playing.collection)
	            			) }>
			            	<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.padding] }>
			            		<View style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter] }>
				            		<Button transparent onPress={ props.removePlaying }>
										<Icon name="close" ios="ios-close" android="md-close" style={ [Styles.textUbandaniLight] } />
					    			</Button>
					    		</View>
			        			<View style={ [Styles.flex, Styles.paddingLeft, Styles.paddingRight] }>
			        				<Text numberOfLines={1} style={ [Styles.textUbandaniLight, Styles.textAlignLeft] }>Continue Watching...</Text>
			        				<Text numberOfLines={1} style={ [Styles.textLabel, Styles.textSmall, Styles.textAlignLeft] }>{ props.playing.title }</Text>
			        				<Text numberOfLines={1} style={ [Styles.textUbandaniLight, Styles.textSmall, Styles.textAlignLeft] }>{ moment.duration(props.playing.seek, "seconds").format("mm:ss", { trim: false }) } / { moment.duration(props.playing.duration, "seconds").format("mm:ss", { trim: false }) }</Text>
			        			</View>
			        			<View style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfPadding] }>
			        				<Thumbnail square large defaultSource={ props.defaultThumbnail } source={ (props.playing.thumbnail)? { uri: props.playing.thumbnail } : props.defaultThumbnail } style={ [{ width: 120 }] } />
		            				<View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, { width: 120 }] }>
		            					<Thumbnail small source={ require('../../assets/Play_Icon.png') } style={ [Styles.marginLeft, Styles.halfMarginTop] } />
		            				</View>
			        			</View>
			            	</View>
			            </TouchableWithoutFeedback>
			        </View>
	        	}

	            <View style={ [Styles.flex] }>
	            	{ /** Content Unavailable */ }
	            	{ (isEmpty(props.collections[props.segment]) && !props.collectionsLoading) && (isEmpty(props.collections[props.segment]) && !props.collectionsLoading) && (isEmpty(props.collections[props.segment]) && !props.collectionsLoading) && <View style={ [Styles.flex, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.doublePadding] }>
	            			<Text style={ [Styles.textLabel, Styles.textAlignCenter, Styles.doubleMargin] }>{ "No Video Content" + ((props.searchKey)? (" matching the key " + props.searchKey) : "" ) + " found in this category. Pull down to Refresh Conten" }"</Text>
	            		</View>
	            	}

	            	{ /** Collections */ }
	            	{ (!isEmpty(props.collections[props.segment]) || props.collectionsLoading) && <View style={ [Styles.flex] }>
		            		<Text style={ [Styles.doublePadding, Styles.paddingBottom, Styles.textLarge, Styles.textBold, Styles.textDark] }>Collections</Text>
		            		<View style={ [Styles.flex, { minHeight: 120 }] }>
		            			{ !isEmpty(props.collections[props.segment]) && <FlatList
		            					style={ [props.listView && Styles.doublePaddingBottom] }
		            					contentContainerStyle={ props.coverFlowView && [Styles.padding, Styles.noPaddingTop, props.collectionsLoading && Styles.flex] }
										keyboardShouldPersistTaps="always"
										horizontal={ props.coverFlowView }
										showsHorizontalScrollIndicator={ false }
										data={ Object.values(props.collections[props.segment]) }
										keyExtractor={ (item) => ( ((props.coverFlowView)? "coverFlowView_" : "listView_") + item.id ) }
										renderItem={ ({item}) =>
											(props.coverFlowView && !props.listView)? (
												<View key={ "coverFlowView_" + item.id } style={ [Styles.backgroundWhite, Styles.shadow, Styles.borderRadius, Styles.overflowHidden, Styles.margin, Styles.noMarginTop, { width: 200 }] }>
			            							<TouchableWithoutFeedback onPress={ () => props.collection(item, props.segment) }>
							            				<View style={ [Styles.flex] }>
					            							<Image defaultSource={ props.defaultThumbnail } source={ (item.thumbnail)? { uri: item.thumbnail } : props.defaultThumbnail } style={ [Styles.width100, Styles.flex, Styles.positionAbsolute, Styles.verticalPositionTop, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.borderTopLeftRadius, Styles.borderTopRightRadius, { height: 120 }] } />
							            					<View style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.borderTop, Styles.borderLeft, Styles.borderRight, Styles.borderTopLeftRadius, Styles.borderTopRightRadius, { height: 120 }] }>
							            						<Thumbnail small source={ require('../../assets/Play_Icon.png') } />
							            					</View>
							            					<View style={ [Styles.padding, Styles.doublePaddingBottom] }>
							            						<Text numberOfLines={2} style={ [Styles.fextDark] }>
							            							{ item.title }
							            						</Text>
							            						<Text numberOfLines={2} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>
							            							{ item.tagline }
							            						</Text>
									            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.halfPaddingLeft] }>
									            					{ !!item._videos && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
										            						<Icon name="videocam" ios="ios-videocam" android="md-videocam" style={ [Styles.textSmall, Styles.textPlaceholder] } />
										            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item._videos) }</Text>
										            					</View>
										            				}
									            					{ !!item.views && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
										            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textPlaceholder] } />
										            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.views) }</Text>
										            					</View>
										            				}
									            					{ !!item.shares && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
										            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textPlaceholder] } />
										            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.shares) }</Text>
										            					</View>
										            				}
									            					{ !!item.likes && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
										            						<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textPlaceholder] } />
										            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.likes) }</Text>
										            					</View>
										            				}
									            				</View>
							            					</View>
							            				</View>
						            				</TouchableWithoutFeedback>
						            			</View>
											) : (
												<ListItem thumbnail square key={ "listView_" + item.id } onPress={ () => props.collection(item, props.segment) } style={ [Styles.marginBottom] }>
							            			<Left>
							            				<Thumbnail square large defaultSource={ props.defaultThumbnail } source={ (item.thumbnail)? { uri: item.thumbnail } : props.defaultThumbnail } style={ [{ width: 120 }] } />
							            				<View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, { width: 120 }] }>
							            					<Thumbnail small source={ require('../../assets/Play_Icon.png') } />
							            				</View>
							            			</Left>
							            			<Body style={ [Styles.paddingRight] }>
							            				<Text numberOfLines={2} style={ [Styles.fextDark] }>
							            					{ item.title }
							            				</Text>
							            				<Text numberOfLines={2} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>
							            					{ item.tagline }
							            				</Text>
							            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.halfPaddingLeft] }>
							            					{ !!item._videos && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="videocam" ios="ios-videocam" android="md-videocam" style={ [Styles.textSmall, Styles.textPlaceholder] } />
								            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item._videos) }</Text>
								            					</View>
								            				}
							            					{ !!item.views && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textPlaceholder] } />
								            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.views) }</Text>
								            					</View>
								            				}
							            					{ !!item.shares && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textPlaceholder] } />
								            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.shares) }</Text>
								            					</View>
								            				}
							            					{ !!item.likes && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textPlaceholder] } />
								            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.likes) }</Text>
								            					</View>
								            				}
							            				</View>
							            			</Body>
							            		</ListItem>
											)
										}
		            				/>
		            			}
		            			{ isEmpty(props.collections[props.segment]) && !props.collectionsLoading && <View style={ [Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter] }>
				            			<Text style={ [Styles.textLabel, Styles.textAlignCenter, Styles.padding, Styles.margin] }>{ "No Collections" + ((props.searchKey)? (" matching the key " + props.searchKey) : "" ) + "found in this category" }</Text>
				            		</View>
				            	}
		            			{ (props.collectionsLoading || props.switchingViews) && <View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.height100, Styles.backgroundKimyaKimyaLightTransluscent] }>
				            			<Spinner color={ Styles['textUbandani'].color } />
				            		</View>
				            	}
		            		</View>
	            		</View>
	            	}

	            	{ /** Films */ }
	            	{ (!isEmpty(props.films[props.segment]) || props.filmsLoading) && <View style={ [Styles.flex] }>
		            		<Text style={ [Styles.doublePadding, Styles.paddingBottom, Styles.textLarge, Styles.textBold, Styles.textDark] }>Films</Text>
		            		<View style={ [Styles.flex, { minHeight: 120 }] }>
		            			{ !isEmpty(props.films[props.segment]) && <FlatList
		            					style={ [props.listView && Styles.doublePaddingBottom] }
		            					contentContainerStyle={ props.coverFlowView && [Styles.padding, Styles.noPaddingTop, props.collectionsLoading && Styles.flex] }
										keyboardShouldPersistTaps="always"
										horizontal={ props.coverFlowView }
										showsHorizontalScrollIndicator={ false }
										data={ Object.values(props.films[props.segment]) }
										keyExtractor={ (item) => ( ((props.coverFlowView)? "coverFlowView_" : "listView_") + item.id ) }
										renderItem={ ({item}) =>
											(props.coverFlowView && !props.listView)? (
												<View key={ "coverFlowView_" + item.id } style={ [Styles.backgroundWhite, Styles.shadow, Styles.borderRadius, Styles.overflowHidden, Styles.margin, Styles.noMarginTop, { width: 200 }] }>
			            							<TouchableWithoutFeedback onPress={ () => props.player(item, "films", props.segment) }>
							            				<View style={ [Styles.flex] }>
					            							<Image defaultSource={ props.defaultThumbnail } source={ (item.thumbnail)? { uri: item.thumbnail } : props.defaultThumbnail } style={ [Styles.width100, Styles.flex, Styles.positionAbsolute, Styles.verticalPositionTop, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.borderTopLeftRadius, Styles.borderTopRightRadius, { height: 120 }] } />
							            					<View style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.borderTop, Styles.borderLeft, Styles.borderRight, Styles.borderTopLeftRadius, Styles.borderTopRightRadius, { height: 120 }] }>
							            						<Thumbnail small source={ require('../../assets/Play_Icon.png') } />
							            						<View style={ [Styles.positionAbsolute, Styles.verticalPositionBottom, Styles.horizontalPositionRight, Styles.backgroundDark, Styles.halfMargin, { padding: 2, paddingRight: 3 }] }>
									            					<Text style={ [Styles.textUbandaniLight, Styles.textXXSmall] }>
									            						{ moment.duration(item.duration, "seconds").format("mm:ss", { trim: false }) }
									            					</Text>
									            				</View>
							            					</View>
							            					<View style={ [Styles.padding, Styles.doublePaddingBottom] }>
							            						<Text numberOfLines={2} style={ [Styles.fextDark] }>
							            							{ item.title }
							            						</Text>
							            						<Text numberOfLines={2} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>
							            							{ item.tagline }
							            						</Text>
									            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.halfPaddingLeft] }>
									            					{ !!item.views && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
										            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textPlaceholder] } />
										            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.views) }</Text>
										            					</View>
										            				}
									            					{ !isEmpty(item.shares) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
										            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textPlaceholder] } />
										            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.shares.length) }</Text>
										            					</View>
										            				}
									            					{ !isEmpty(item.likes) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
										            						<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textPlaceholder] } />
										            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.likes.length) }</Text>
										            					</View>
										            				}
									            				</View>
							            					</View>
							            				</View>
						            				</TouchableWithoutFeedback>
						            			</View>
											) : (
												<ListItem thumbnail square key={ "listView_" + item.id } onPress={ () => props.player(item, "films", props.segment) } style={ [Styles.marginBottom] }>
							            			<Left>
							            				<Thumbnail square large defaultSource={ props.defaultThumbnail } source={ (item.thumbnail)? { uri: item.thumbnail } : props.defaultThumbnail } style={ [{ width: 120 }] } />
							            				<View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, { width: 120 }] }>
							            					<Thumbnail small source={ require('../../assets/Play_Icon.png') } />
							            				</View>
							            				<View style={ [Styles.positionAbsolute, Styles.verticalPositionBottom, Styles.horizontalPositionRight, Styles.backgroundDark, Styles.halfMargin, { padding: 2, paddingRight: 3 }] }>
							            					<Text style={ [Styles.textUbandaniLight, Styles.textXXSmall] }>
							            						{ moment.duration(item.duration, "seconds").format("mm:ss", { trim: false }) }
							            					</Text>
							            				</View>
							            			</Left>
							            			<Body style={ [Styles.paddingRight] }>
							            				<Text numberOfLines={2} style={ [Styles.fextDark] }>
							            					{ item.title }
							            				</Text>
							            				<Text numberOfLines={2} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>
							            					{ item.tagline }
							            				</Text>
							            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.halfPaddingLeft] }>
							            					{ !!item.views && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textPlaceholder] } />
								            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.views) }</Text>
								            					</View>
								            				}
							            					{ !isEmpty(item.shares) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textPlaceholder] } />
								            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.shares.length) }</Text>
								            					</View>
								            				}
							            					{ !isEmpty(item.likes) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textPlaceholder] } />
								            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.likes.length) }</Text>
								            					</View>
								            				}
							            				</View>
							            			</Body>
							            		</ListItem>
											)
										}
									/>
								}
								{ isEmpty(props.films[props.segment]) && !props.collectionsLoading && <View style={ [Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter] }>
				            			<Text style={ [Styles.textLabel, Styles.textAlignCenter, Styles.padding, Styles.margin] }>{ "No Films" + ((props.searchKey)? (" matching the key " + props.searchKey) : "" ) + "found in this category" }</Text>
				            		</View>
				            	}
		            			{ (props.filmsLoading || props.switchingViews) && <View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.height100, Styles.backgroundKimyaKimyaLightTransluscent] }>
				            			<Spinner color={ Styles['textUbandani'].color } />
				            		</View>
				            	}
							</View>
	            		</View>
	            	}

	            	{ /** Music */ }
	            	{ (!isEmpty(props.music[props.segment]) || props.musicLoading) && <View style={ [Styles.flex] }>
		            		<Text style={ [Styles.doublePadding, Styles.paddingBottom, Styles.textLarge, Styles.textBold, Styles.textDark] }>Music</Text>
		            		<View style={ [Styles.flex, { minHeight: 120 }] }>
		            			{ !isEmpty(props.music[props.segment]) && <FlatList
		            					style={ [props.listView && Styles.doublePaddingBottom] }
		            					contentContainerStyle={ props.coverFlowView && [Styles.padding, Styles.noPaddingTop, props.collectionsLoading && Styles.flex] }
										keyboardShouldPersistTaps="always"
										horizontal={ props.coverFlowView }
										showsHorizontalScrollIndicator={ false }
										data={ Object.values(props.music[props.segment]) }
										keyExtractor={ (item) => ( ((props.coverFlowView)? "coverFlowView_" : "listView_") + item.id ) }
										renderItem={ ({item}) =>
											(props.coverFlowView && !props.listView)? (
												<View key={ "coverFlowView_" + item.id } style={ [Styles.backgroundWhite, Styles.shadow, Styles.borderRadius, Styles.overflowHidden, Styles.margin, Styles.noMarginTop, { width: 200 }] }>
			            							<TouchableWithoutFeedback onPress={ () => props.player(item, "music", props.segment) }>
							            				<View style={ [Styles.flex] }>
					            							<Image defaultSource={ props.defaultThumbnail } source={ (item.thumbnail)? { uri: item.thumbnail } : props.defaultThumbnail } style={ [Styles.width100, Styles.flex, Styles.positionAbsolute, Styles.verticalPositionTop, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.borderTopLeftRadius, Styles.borderTopRightRadius, { height: 120 }] } />
							            					<View style={ [Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.borderTop, Styles.borderLeft, Styles.borderRight, Styles.borderTopLeftRadius, Styles.borderTopRightRadius, { height: 120 }] }>
							            						<Thumbnail small source={ require('../../assets/Play_Icon.png') } />
							            						<View style={ [Styles.positionAbsolute, Styles.verticalPositionBottom, Styles.horizontalPositionRight, Styles.backgroundDark, Styles.halfMargin, { padding: 2, paddingRight: 3 }] }>
									            					<Text style={ [Styles.textUbandaniLight, Styles.textXXSmall] }>
									            						{ moment.duration(item.duration, "seconds").format("mm:ss", { trim: false }) }
									            					</Text>
									            				</View>
							            					</View>
							            					<View style={ [Styles.padding, Styles.doublePaddingBottom] }>
							            						<Text numberOfLines={2} style={ [Styles.fextDark] }>
							            							{ item.title }
							            						</Text>
							            						<Text numberOfLines={2} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>
							            							{ item.tagline }
							            						</Text>
									            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.halfPaddingLeft] }>
									            					{ !!item.views && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
										            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textPlaceholder] } />
										            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.views) }</Text>
										            					</View>
										            				}
									            					{ !isEmpty(item.shares) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
										            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textPlaceholder] } />
										            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.shares.length) }</Text>
										            					</View>
										            				}
									            					{ !isEmpty(item.likes) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginRight] }>
										            						<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textPlaceholder] } />
										            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.likes.length) }</Text>
										            					</View>
										            				}
									            				</View>
							            					</View>
							            				</View>
						            				</TouchableWithoutFeedback>
						            			</View>
											) : (
												<ListItem thumbnail square key={ "listView_" + item.id } onPress={ () => props.player(item, "music", props.segment) } style={ [Styles.marginBottom] }>
							            			<Left>
							            				<Thumbnail square large defaultSource={ props.defaultThumbnail } source={ (item.thumbnail)? { uri: item.thumbnail } : props.defaultThumbnail } style={ [{ width: 120 }] } />
							            				<View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, { width: 120 }] }>
							            					<Thumbnail small source={ require('../../assets/Play_Icon.png') } />
							            				</View>
							            				<View style={ [Styles.positionAbsolute, Styles.verticalPositionBottom, Styles.horizontalPositionRight, Styles.backgroundDark, Styles.halfMargin, { padding: 2, paddingRight: 3 }] }>
							            					<Text style={ [Styles.textUbandaniLight, Styles.textXXSmall] }>
							            						{ moment.duration(item.duration, "seconds").format("mm:ss", { trim: false }) }
							            					</Text>
							            				</View>
							            			</Left>
							            			<Body style={ [Styles.paddingRight] }>
							            				<Text numberOfLines={2} style={ [Styles.fextDark] }>
							            					{ item.title }
							            				</Text>
							            				<Text numberOfLines={2} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>
							            					{ item.tagline }
							            				</Text>
							            				<View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.halfPaddingLeft] }>
							            					{ !!item.views && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textPlaceholder] } />
								            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.views) }</Text>
								            					</View>
								            				}
							            					{ !isEmpty(item.shares) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textPlaceholder] } />
								            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.shares.length) }</Text>
								            					</View>
								            				}
							            					{ !isEmpty(item.likes) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfMarginRight] }>
								            						<Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textPlaceholder] } />
								            						<Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(item.likes.length) }</Text>
								            					</View>
								            				}
							            				</View>
							            			</Body>
							            		</ListItem>
											)
										}
									/>
								}
								{ isEmpty(props.music[props.segment]) && !props.collectionsLoading && <View style={ [Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter] }>
				            			<Text style={ [Styles.textLabel, Styles.textAlignCenter, Styles.padding, Styles.margin] }>{ "No Music" + ((props.searchKey)? (" matching the key " + props.searchKey) : "" ) + "found in this category" }</Text>
				            		</View>
				            	}
		            			{ (props.musicLoading || props.switchingViews) && <View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.height100, Styles.backgroundKimyaKimyaLightTransluscent] }>
				            			<Spinner color={ Styles['textUbandani'].color } />
				            		</View>
				            	}
							</View>
		            	</View>
		            }
	            </View>

	            { props.searchFocused && (!isEmpty(props.collections[props.segment]) || !isEmpty(props.films[props.segment]) || !isEmpty(props.music[props.segment])) && <View style={ [{ height: props.keyboardHeight }] } /> }
            </Content>
        </Container>
    );
}

/**
 * Styles
*/
const styles = StyleSheet.create({
	searchItem: { borderBottomWidth: 1.5 }
});

export default Home;
