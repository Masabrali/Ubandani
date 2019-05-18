/**
 * Import React and React Native
 */
import React from 'react';
import { StyleSheet, View, Image, Slider, RefreshControl, Animated, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Container, Left, Body, Content, Text, ListItem, Thumbnail, Spinner, Button, Switch, Icon } from 'native-base';
import Video from 'react-native-video';
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

const Player = function (props) {
    
    return (
        <Container style={ [Styles.backgroundKimyaKimyaLight] }>

          	<StatusBar backgroundColor={ Styles.backgroundDark.backgroundColor } barStyle="light-content" hidden={ props.videoFullscreen && !props.videoControlsVisible } />

          	<Content
              refreshControl={
                  <RefreshControl
                    refreshing={ props.videosRefreshing }
                    onRefresh={ props.loadNextVideos }
                  />
              }
              contentContainerStyle={ [{ paddingTop: (props.videoFullscreen)? 0 : 200 }] }
            >
                <View style={ [Styles.backgroundDark, Styles.flex, Styles.flexRow, Styles.padding, Styles.doublePaddingRight] }>
                    { !!props.video.prefix && <Text style={ [Styles.textMedium, Styles.textLabel, Styles.halfPadding, Styles.noPaddingRight] }>{ props.video.prefix }: </Text> }
                    <Text numberOfLines={2} style={ [Styles.flex, Styles.textMedium, Styles.textUbandaniLight, Styles.halfPadding, Styles.noPaddingLeft] }>{ props.video.title }</Text>
                </View>
                <View style={ [Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.doublePadding, Styles.noPaddingBottom] }>
                    { !!props.video.views && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.doubleMarginRight] }>
                          <Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textLarge, Styles.textPlaceholder] } />
                          <Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(props.video.views) }</Text>
                      </View>
                    }
                    { !isEmpty(props.video.shares) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.doubleMarginRight] }>
                          <Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textLarge, Styles.textPlaceholder] } />
                          <Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(props.video.shares.length) }</Text>
                      </View>
                    }
                    { !isEmpty(props.video.likes) && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.doubleMarginRight] }>
                          <Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textLarge, Styles.textPlaceholder] } />
                          <Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { abbreviateNumber(props.video.likes.length) }</Text>
                      </View>
                    }
                </View>
                <View style={ [Styles.padding, Styles.noPaddingBotto, Styles.flexRow, Styles.flexAlignCenter] }>
                    <Text numberOfLines={3} style={ [Styles.textLabel, Styles.halfPadding, Styles.flex] }>{ props.video.description }</Text>
                    { !!props.video.excerpt && <Button primary transparent onPress={ props.excerpt }>
                          <Text style={ [Styles.textPrimary] }>Read More</Text>
        				      </Button>
                    }
          		  </View>
  	        	  <View style={ [Styles.flex] }>
                    <View style={ [Styles.flexRow, Styles.flexJustifySpaceBetween, Styles.flexAlignCenter, Styles.padding, Styles.borderBottom] }>
                        <View style={ [Styles.flex, Styles.halfPaddingLeft, Styles.halfPaddingRight] }>
                            <Text style={ [Styles.textMedium] }>Up Next</Text>
                        </View>
                        <View style={ [Styles.flexRow, Styles.flexJustifyEnd, Styles.flexAlignCenter, Styles.halfPaddingRight] }>
                        <Text style={ [Styles.textLabel] }>Autoplay: </Text>
                            <Switch value={ props.autoPlay } onValueChange={ props.autoPlayChanged } thumbColor={ (isAndroid())? ((props.autoPlay)? Styles.textPrimary.color : undefined) : undefined  } trackColor={ props.autoPlay && Styles.backgroundPrimary.backgroundColor } />
                        </View>
                    </View>
                    <View style={ [Styles.flex, Styles.paddingTop] }>
                        { props.videosLoading && <View style={ [Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.doublePaddingTop, Styles.doublePaddingBottom] }>
                              <Spinner color={ Styles['textUbandani'].color } />
                          </View>
                        }
                        { isEmpty(props.nextVideos) && !props.videosLoading && <View style={ [Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.doublePaddingTop, Styles.doublePaddingBottom] }>
                              <Text style={ [Styles.textLabel, Styles.textAlignCenter, Styles.padding, Styles.margin] }>No videos found</Text>
                          </View>
                        }
                        { !isEmpty(props.nextVideos) &&  <FlatList
                              style={ [Styles.doublePaddingBottom] }
                              keyboardShouldPersistTaps="always"
                              data={ Object.values(props.nextVideos) }
                              keyExtractor={ (item) => ( item.id ) }
                              renderItem={ ({item}) => 
                                  <ListItem thumbnail square key={ item.id } onPress={ () => props.playVideo(item) } style={ [Styles.marginBottom] }>
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
                                          <View style={ [Styles.flexRow, Styles.flexJusityStart, Styles.flexAlignStart] }>
                                              { !!item.prefix && <Text style={ [Styles.textLabel] }>{ item.prefix }:</Text> }
                                              <Text numberOfLines={2} style={ [Styles.textDark, Styles.flex] }>{ item.title }</Text>
                                              { item.next && <Text style={ [Styles.textXSmall, Styles.textLable] }>(NEXT)</Text> }
                                          </View>
                                          <Text numberOfLines={2} style={ [Styles.textLabel, Styles.textSmall, Styles.halfMarginBottom] }>
                                              { item.description }
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
                              }
                            />
                        }
                    </View>
            		</View>
          	</Content>

            <View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, props.videoFullscreen && Styles.flex, Styles.backgroundDark, { height: (props.videoFullscreen)? Styles.screenWidth.width - ((props.videoControlsVisible)? Styles.statusbarHeight.height : 0) : 200 }] }>
                <View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flex, Styles.width100, { height: (props.videoFullscreen)? Styles.screenWidth.width - ((props.videoControlsVisible)? Styles.statusbarHeight.height : 0) : 200 }] }>
                    { props.playerVisible && <Video
                        ref={ (ref) => ( this.player = ref ) }
                        source={{ uri: props.video.video }}
                        poster={ (props.video.cover)? props.video.cover : props.defaultCover }
                        posterResizeMode="cover"
                        progressUpdateInterval={ 1000 }
                        paused={ props.videoPaused }
                        repeat={ false }
                        fullscreen={ false }
                        fullscreenAutorotate={ true }
                        fullscreenOrientation="landscape"
                        onLayout={ () => ( props.playerRendered(this.player) ) }
                        onLoadStart={ props.onVideoLoading }
                        onLoad={ props.onVideoLoaded }
                        onBuffer={ props.onVideoBuffering }
                        onError={ props.onVideoError }
                        onProgress={ props.onVideoProgress }
                        onPlaybackStalled={ (e) => ( console.log(e) ) }
                        onPlaybackResume={ props.onPlaybackResume }
                        onSeek={ props.onVideoSeeked }
                        onEnd={ props.onVideoEnded }
                        onAudioBecomingNoisy={ props.pause }
                        style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flex, Styles.width100, { height: (props.videoFullscreen)? Styles.screenWidth.width - ((props.videoControlsVisible)? Styles.statusbarHeight.height : 0) : 200 }] }
                      />
                    }
                </View>
                <View style={ [Styles.flex] }>
                    <Animated.View style={ [Styles.flex, { backgroundColor: "rgba(0, 0, 0, .3)", opacity: props.videoControlsOpacity }] }>
                        <View style={ [Styles.flexRow, Styles.flexJustifySpaceBetween, Styles.flexAlignCenter, Styles.paddingTop, Styles.paddingBottom, { height: (isIOS())? 46 : 56 }] }>
                            <View>
                                { !props.videoFullscreen && <Button iconLeft transparent onPress={ props.back }>
                                      <Icon name="arrow-back" ios="ios-arrow-back" android="md-arrow-back" style={ [Styles.textUbandaniLight] } />
                                      { isIOS() && <Text style={ [Styles.textUbandaniLight] }>Back</Text> }
                                  </Button>
                                }
                                { props.videoFullscreen && <Button iconLeft transparent onPress={ props.exitFullscreen }>
                                      <Icon name="close" ios="ios-close" android="md-close" style={ [Styles.textUbandaniLight] } />
                                      { isIOS() && <Text style={ [Styles.textUbandaniLight] }>Exit</Text> }
                                  </Button>
                                }
                            </View>
                            <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.halfPaddingRight] }>
                                { false && <Button transparent onPress={ props.like }>
                                      <Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textUbandaniLight] } />
                                 </Button>
                               }
                               { false && <Button transparent onPress={ props.share }>
                                      <Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textUbandaniLight] } />
                                 </Button>
                               }
                            </View>
                        </View>
                        <View style={ [Styles.flex, Styles.flexJustifyCenter, Styles.flexAlignCenter] }>
                            { !props.videoLoading && !props.videoBuffering && props.videoError && <Text style={ [Styles.padding, Styles.textUbandaniLight, Styles.textMedium] }>Error : { props.videoError }</Text>
                            }
                            <View style={ [Styles.flexRow, Styles.flexJustifySpaceEvenly, Styles.flexAlignCenter, Styles.screenWidth, Styles.padding] }>
                                <View style={ [Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter] }>
                                    <Button transparent disabled={ isEmpty(props.nextVideos) || (props.nextVideosKeys[0] == props.video.id) } onPress={ props.previous } style={ [!props.videoFullscreen && Styles.halfMargin, props.videoFullscreen && Styles.margin] }>
                                        <Icon name="skip-backward" ios="ios-skip-backward" android="md-skip-backward" style={ [Styles.textUbandaniLight, (isEmpty(props.nextVideos) || (props.nextVideosKeys[0] == props.video.id)) && { opacity: 0.3 }] } />
                                    </Button>
                                </View>
                                <View style={ [Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter] }>
                                    { !props.videoLoading && !props.videoBuffering && !props.videoError && !props.videoEnded && (!props.videoPlaying || props.videoPaused) && <Button transparent onPress={ props.play } style={ [!props.videoFullscreen && Styles.halfMargin, props.videoFullscreen && Styles.margin] }>
                                          <Thumbnail source={ require('../../assets/Play_Icon.png') } style={ [Styles.marginLeft, Styles.marginRight] } />
                                      </Button>
                                    }
                                    { !props.videoLoading && !props.videoBuffering && !props.videoError && props.videoPlaying && <Button transparent onPress={ props.pause } style={ [!props.videoFullscreen && Styles.halfMargin, props.videoFullscreen && Styles.margin] }>
                                          <Thumbnail source={ require('../../assets/Pause_Icon.png') } style={ [Styles.marginLeft, Styles.marginRight] } />
                                      </Button>
                                    }
                                    { !props.videoLoading && !props.videoBuffering && props.videoEnded && <Button transparent onPress={ props.replay } style={ [!props.videoFullscreen && Styles.halfMargin, props.videoFullscreen && Styles.margin] }>
                                          <Thumbnail source={ require('../../assets/Replay_Icon.png') } style={ [Styles.marginLeft, Styles.marginRight] } />
                                      </Button>
                                    }
                                    { !props.videoLoading && !props.videoBuffering && props.videoError && <Button transparent onPress={ props.reload } style={ [!props.videoFullscreen && Styles.halfMargin, props.videoFullscreen && Styles.margin] }>
                                          <Thumbnail source={ require('../../assets/Replay_Icon.png') } style={ [Styles.marginLeft, Styles.marginRight] } />
                                      </Button>
                                    }
                                    { (props.videoLoading || props.videoBuffering) && <Spinner color={ Styles['textUbandani'].color } />
                                    }
                                </View>
                                <View style={ [Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter] }>
                                    <Button transparent disabled={ isEmpty(props.nextVideos) || (props.nextVideosKeys[props.nextVideosKeys.length - 1] == props.video.id) } onPress={ props.next } style={ [!props.videoFullscreen && Styles.halfMargin, props.videoFullscreen && Styles.margin] }>
                                        <Icon name="skip-forward" ios="ios-skip-forward" android="md-skip-forward" style={ [Styles.textUbandaniLight, (isEmpty(props.nextVideos) || (props.nextVideosKeys[props.nextVideosKeys.length - 1] == props.video.id)) && { opacity: 0.3 } ] } />
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.paddingTop, Styles.paddingBottom, { height: (isIOS())? 46 : 56 }] }>
                            <View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.paddingLeft, Styles.halfPaddingRight] }>
                                <View style={ [Styles.flex] }>
                                    <Slider minimumValue={0} maximumValue={ props.videoDuration } step={1} value={ props.videoPlayableDuration } minimumTrackTintColor={ Styles.backgroundWhite.backgroundColor } maximumTrackTintColor={ Styles.backgroundLight.backgroundColor } thumbTintColor={ "transparent" } style={ [Styles.positionAbsolute, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.width100, Styles.flex, { top: '24%', zIndex: 0 }] } />
                                    <View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.height100] } />
                                    <Slider minimumValue={0} maximumValue={ props.videoDuration } step={1} value={ props.videoCurrentTime } onValueChange={ props.seek } minimumTrackTintColor={ Styles.backgroundUbandani.backgroundColor } maximumTrackTintColor={ 'transparent' } thumbTintColor={ Styles.textUbandani.color } style={ [Styles.flex, { zIndex: 1 }] } />
                                </View>
                                <Text style={ [Styles.textUbandaniLight, Styles.textSmall] }>
                                    { moment.duration(props.videoCurrentTime, "seconds").format("mm:ss", { trim: false }) } / { moment.duration(props.videoDuration, "seconds").format("mm:ss", { trim: false }) }
                                </Text>
                            </View>
                            <View style={ [Styles.halfPaddingLeft, Styles.halfPaddingRight] }>
                                { !props.videoFullscreen && <Button transparent onPress={ props.enterFullscreen }>
                                      <Icon name="expand" ios="ios-expand" android="md-expand" style={ [Styles.textUbandaniLight] } />
                                  </Button>
                                }
                                { props.videoFullscreen && <Button transparent onPress={ props.exitFullscreen }>
                                      <Icon name="contract" ios="ios-contract" android="md-contract" style={ [Styles.textUbandaniLight] } />
                                  </Button>
                                }
                            </View>
                        </View>
                    </Animated.View>
                    { !props.videoControlsVisible && <View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flex, Styles.width100, Styles.height100, { height: (props.videoFullscreen)? Styles.screenWidth.width - ((props.videoControlsVisible)? Styles.statusbarHeight.height : 0) : 200 }] }>
                          <TouchableWithoutFeedback onPressIn={ props.toggleVideoControls } style={ [Styles.flex] }>
                              <View style={ [Styles.flex] } />
                          </TouchableWithoutFeedback>
                      </View>
                    }
                </View>
            </View>
        </Container>
    );
}

/**
 * Styles
*/
const styles = StyleSheet.create({});

export default Player;