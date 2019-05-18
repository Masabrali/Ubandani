/**
 * Import React and React Native
 */
import React from 'react';
import { StyleSheet, View, RefreshControl, FlatList } from 'react-native';
import { Container, Left, Body, Right, Content, Text, ListItem, Thumbnail, Spinner, Button, Icon } from 'native-base';
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
import AnimatedHeader from '../../components/others/AnimatedHeader';
import StatusBar from '../../components/others/StatusBar';
import Loader from '../../components/others/Loader';

/**
 * Other variables and constants
*/
import Styles from '../styles';

const Collection = function (props) {
    
    return (
        <Container style={ [Styles.backgroundKimyaKimyaLight] }>
            <AnimatedHeader
              style={ [Styles.flex] }
              title={ props.collection.title }
              subtitle={ props.collection.tagline }
              renderLeft={ () =>
                  <Button iconLeft transparent onPress={ props.back }>
                      <Icon name="arrow-back" ios="ios-arrow-back" android="md-arrow-back" style={ [{ color: props.headerTitleColor }, Styles.textShadow, styles.headerIcon] } />
                      { isIOS() && <Text style={ [{ color: props.headerTitleColor }, Styles.textUbandaniLight, Styles.textShadow] }>Stories</Text> }
                  </Button>
              }
              renderRight={ () =>
                  { false && <Button iconRight transparent onPress={ props.share }>
                        <Icon name="share" ios="ios-share" android="md-share" style={ [{ color: props.headerTitleColor }, Styles.textShadow, styles.headerIcon] } />
                        { isIOS() && <Text style={ [{ color: props.headerTitleColor }, Styles.textUbandaniLight, Styles.textShadow] }>Share</Text> }
                    </Button>
                  }
              }
              titleStyle={ [Styles.textXXXLarge, { color: props.headerTitleColor }] }
              subtitleStyle={ [{ color: props.headerSubtitleColor }] }
              headerDefaultHeight={ 200 }
              headerMaxHeight={ 300 }
              noBorder={ true }
              imageSource={ (!!props.cover)? props.cover : props.defaultCover }
              imageHeight={ 200 }
              toolbarColor={ props.headerBackgroundColor }
              statusbarStyle={ props.statusbarStyle }
            >
                <Content
                  style={ [Styles.backgroundKimyaKimyaLight] }
                  refreshControl={
                      <RefreshControl
                        refreshing={ props.videosRefreshing }
                        onRefresh={ props.fetchCollectionVideos }
                      />
                  }
                >
                    <StatusBar backgroundColor={ props.headerBackgroundColor } barStyle={ props.statusbarStyle } />
                    
                    <View style={ [Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.doublePadding, Styles.noPaddingBottom] }>
                        { !!props.collection._videos && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.doubleMarginRight] }>
                              <Icon name="videocam" ios="ios-videocam" android="md-videocam" style={ [Styles.textLarge, Styles.textPlaceholder] } />
                              <Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { props.collection._videos }</Text>
                          </View>
                        }
                        { !!props.collection.views && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.doubleMarginRight] }>
                              <Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textLarge, Styles.textPlaceholder] } />
                              <Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { props.collection.views }</Text>
                          </View>
                        }
                        { !!props.collection.shares && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.doubleMarginRight] }>
                              <Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textLarge, Styles.textPlaceholder] } />
                              <Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { props.collection.shares }</Text>
                          </View>
                        }
                        { !!props.collection.likes && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.doubleMarginRight] }>
                              <Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textLarge, Styles.textPlaceholder] } />
                              <Text style={ [Styles.textSmall, Styles.textPlaceholder] }> { props.collection.likes }</Text>
                          </View>
                        }
                    </View>
                    <View style={ [Styles.padding, Styles.noPaddingBottom, Styles.flexRow, Styles.flexAlignCenter] }>
                        <Text numberOfLines={3} style={ [Styles.textLabel, Styles.halfPadding, Styles.flex] }>{ props.collection.description }</Text>
                        { !!props.collection.excerpt && <Button primary transparent onPress={ props.excerpt }>
                              <Text style={ [Styles.textPrimary] }>Read More</Text>
                          </Button>
                        }
                    </View>
                    <View style={ [Styles.flex] }>
                        <View style={ [Styles.flexRow, Styles.flexJustifyStart, Styles.flexAlignCenter, Styles.padding, Styles.noPaddingTop, Styles.halfPaddingBottom, Styles.borderBottom] }>
                            <Text style={ [Styles.flex, Styles.textMedium, Styles.padding, Styles.halfPaddingLeft] }>Videos</Text>
                            { !isEmpty(props.collection.videos) && <Button iconRight transparent onPress={ () => props.player(props.collection.videos[Object.keys(props.collection.videos)[0]]) }>
                                  <Text style={ [Styles.textUbandani] }>Play All</Text>
                                  <Icon name="play" ios="ios-play" android="md-play" style={ [Styles.textUbandani] } />
                              </Button>
                            }
                        </View>
                        <View style={ [Styles.flex, Styles.paddingTop] }>
                            { props.videosLoading && <View style={ [Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.doublePaddingTop, Styles.doublePaddingBottom] }>
                                  <Spinner color={ Styles['textUbandani'].color } />
                              </View>
                            }
                            { isEmpty(props.collection.videos) && !props.videosLoading && <View style={ [Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.doublePaddingTop, Styles.doublePaddingBottom] }>
                                  <Text style={ [Styles.textLabel, Styles.textAlignCenter, Styles.padding, Styles.margin] }>No videos found</Text>
                              </View>
                            }
                            { !isEmpty(props.collection.videos) && <FlatList
                                  style={ [Styles.doublePaddingBottom] }
                                  keyboardShouldPersistTaps="always"
                                  data={ Object.values(props.collection.videos) }
                                  keyExtractor={ (item) => ( item.id ) }
                                  renderItem={ ({item}) =>
                                      <ListItem thumbnail square key={ item.id } onPress={ () => props.player(item) } style={ [Styles.marginBottom] }>
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
                                                  { (Object.keys(props.collection.videos)[0] == item.id) && <Text style={ [Styles.textXSmall, Styles.textLable] }>(NEXT)</Text> }
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
            </AnimatedHeader>

            <Loader visible={ props.loading } text="" spinnerColor={ Styles.textUbandani.color } />
        </Container>
    );
}

/**
 * Styles
*/
const styles = StyleSheet.create({
	headerIcon: { fontSize: 24 }
});

export default Collection;