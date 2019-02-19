/**
 * Import React and React Native
 */
import React from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
import { Container, Header, Left, Body, Title, Right, Content, Text, List, ListItem, Thumbnail, Spinner, Button, Icon } from 'native-base';
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
// import StatusBar from '../../components/others/StatusBar';

/**
 * Other variables and constants
*/
import Styles from '../styles';

const Player = function (props) {
    console.log(props.nextVideos)
    return (
        <Container style={ [Styles.wrapper] }>
          	<Header noShadow style={ [Styles.backgroundDark, (props.reference == "collection") && Styles.marginTopStatusBar] }>
            		<Left>
            		    <Button iconLeft transparent onPress={ props.back }>
                        <Icon name="arrow-back" ios="ios-arrow-back" android="md-arrow-back" style={ [Styles.textUbandaniLight] } />
                          	{ isIOS() && <Text style={ [Styles.textUbandaniLight] }>Back</Text> }
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
                    <Image defaultSource={ props.defaultCover } source={ (props.video.cover)? { uri: props.video.cover } : props.defaultCover } style={ [Styles.width100, Styles.flex, Styles.positionAbsolute, Styles.verticalPositionTop, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, { height: 200 }] } />
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
                		    { !!props.video.prefix && <Text style={ [Styles.textLarge, Styles.textLabel] }>{ props.video.prefix }: </Text> }
                		    <Text numberOfLines={1} style={ [Styles.textLarge, Styles.textUbandaniLight] }>{ props.video.title }</Text>
                		</View>
                		<View style={ [Styles.flexRow, Styles.flexJustifyEnd, Styles.flexAlignCenter, Styles.halfPaddingRight] }>
              				  { !!props.video.views && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginLeft] }>
                              <Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textUbandani] } />
                						  <Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(props.video.views) }</Text>
                					</View>
                        }
              					{ !isEmpty(props.video.shares) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginLeft] }>
                              <Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textUbandani] } />
                						  <Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(props.video.shares.length) }</Text>
                					</View>
                        }
                        { !isEmpty(props.video.likes) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginLeft] }>
                              <Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
                              <Text style={ [Styles.textSmall, Styles.textUbandani] }> { abbreviateNumber(props.video.likes.length) }</Text>
                          </View>
                        }
                    </View>
      			    </View>
            </View>
          	<Content contentContainerStyle={ [Styles.backgroundKimyaKimyaLight] }>
                <View style={ [Styles.padding, Styles.noPaddingBottom, Styles.flexRow, Styles.flexAlignCenter] }>
                    <Text numberOfLines={2} style={ [Styles.textLabel, Styles.halfPadding, Styles.flex] }>{ props.video.description }</Text>
                    { !!props.video.excerpt && <Button primary transparent onPress={ props.excerpt }>
                          <Text style={ [Styles.textPrimary] }>Read More</Text>
        				      </Button>
                    }
          		  </View>
  	        	  <View style={ [Styles.flex] }>
              			<View style={ [Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.padding, Styles.halfPaddingBottom, Styles.borderBottom] }>
                				<Text style={ [Styles.flex, Styles.textMedium, Styles.halfPaddingLeft, Styles.halfPaddingRight] }>Up Next</Text>
              			</View>
                    <View style={ [Styles.flex] }>
                        { !isEmpty(props.nextVideos) &&  <List
                              style={ [Styles.doublePaddingBottom] }
                              dataArray={ props.nextVideos }
                              keyboardShouldPersistTaps="always"
                              renderRow={ (item) =>
                                  <ListItem thumbnail square key={ item.id } onPress={ () => props.playVideo(item) } style={ [Styles.marginBottom] }>
                                      <Left>
                                          <Thumbnail square large defaultSource={ props.defaultThumbnail } source={ (item.thumbnail)? { uri: item.thumbnail } : props.defaultThumbnail } style={ [{ width: 120 }] } />
                                          <View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, { width: 120 }] }>
                                              <Thumbnail small source={ require('../../assets/Play_Icon.png') } />
                                          </View>
                                          <View style={ [Styles.positionAbsolute, Styles.verticalPositionBottom, Styles.horizontalPositionRight, Styles.backgroundDark, Styles.halfMargin, { padding: 2, paddingRight: 3 }] }>
                                              <Text style={ [Styles.textLight, Styles.textXXSmall] }>
                                                  { moment.duration(item.duration, "seconds").format("mm:ss", { trim: false }) }
                                              </Text>
                                          </View>
                                      </Left>
                                      <Body style={ [Styles.paddingRight] }>
                                          <View style={ [Styles.flexRow, Styles.flexJusityStart, Styles.flexAlignCenter] }>
                                              { !!item.prefix && <Text style={ [Styles.textLabel] }>{ item.prefix }: </Text> }
                                              <Text numberOfLines={1} style={ [Styles.textDark, Styles.flex] }>{ item.title }</Text>
                                              { (Object.keys(props.nextVideos)[0] == item.id) && <Text style={ [Styles.textXSmall, Styles.textLable] }>(NEXT)</Text> }
                                          </View>
                                          <Text numberOfLines={2} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>
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
                        { isEmpty(props.nextVideos) && !props.videosLoading && <View style={ [Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.doublePaddingTop, Styles.doublePaddingBottom] }>
                              <Text style={ [Styles.textLabel, Styles.textAlignCenter, Styles.padding, Styles.margin] }>No videos found</Text>
                          </View>
                        }
                        { props.videosLoading && <View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.height100, Styles.backgroundKimyaKimyaLightTransluscent] }>
                              <Spinner color={ Styles['textUbandani'].color } />
                          </View>
                        }
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

export default Player;