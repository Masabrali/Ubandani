<AnimatedHeader
              style={ [Styles.flex] }
              title={ props.collection.title }
              backText={ (isIOS())? "Home" : "" }
              renderLeft={ () =>
                  <Button iconLeft transparent onPress={ props.back }>
                      <Icon name="arrow-back" ios="ios-arrow-back" android="md-arrow-back" style={ [{ color: props.headerForegroundColor }, Styles.textShadow, styles.headerIcon] } />
                      { isIOS() && <Text style={ [{ color: props.headerForegroundColor }, Styles.textUbandaniLight, Styles.textShadow] }>Stories</Text> }
                  </Button>
              }
              renderRight={ () =>
                  <Button iconRight transparent onPress={ props.share }>
                      <Icon name="share" ios="ios-share" android="md-share" style={ [{ color: props.headerForegroundColor }, Styles.textShadow, styles.headerIcon] } />
                      { isIOS() && <Text style={ [{ color: props.headerForegroundColor }, Styles.textUbandaniLight, Styles.textShadow] }>Share</Text> }
                  </Button>
              }
              titleStyle={{ left: 0.1, bottom: 0.1, color: props.headerForegroundColor, backgroundColor: props.titleBackgroundColor, ...Styles.textXXLarge, ...Styles.padding, ...Styles.doublePaddingLeft, ...Styles.doublePaddingRight }}
              headerMaxHeight={ 200 }
              imageSource={ (!!props.cover)? props.cover : props.defaultCover }
              toolbarColor={ props.headerBackgroundColor }
            >
                <Content style={ [Styles.backgroundKimyaKimyaLight] }>
                    <StatusBar backgroundColor={ props.headerBackgroundColor } barStyle={ props.statusbarStyle } />

                    <View style={ [Styles.flexRow, Styles.flexJustifyEnd, Styles.flexAlignCenter, Styles.doublePadding, Styles.noPaddingBottom] }>
                        { !!props.collection._videos && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginLeft] }>
                              <Icon name="videocam" ios="ios-videocam" android="md-videocam" style={ [Styles.textSmall, Styles.textUbandani] } />
                              <Text style={ [Styles.textSmall, Styles.textUbandani] }> { props.collection._videos }</Text>
                          </View>
                        }
                        { !!props.collection.views && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginLeft] }>
                              <Icon name="eye" ios="ios-eye" android="md-eye" style={ [Styles.textSmall, Styles.textUbandani] } />
                              <Text style={ [Styles.textSmall, Styles.textUbandani] }> { props.collection.views }</Text>
                          </View>
                        }
                        { !!props.collection.shares && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginLeft] }>
                              <Icon name="share" ios="ios-share" android="md-share" style={ [Styles.textSmall, Styles.textUbandani] } />
                              <Text style={ [Styles.textSmall, Styles.textUbandani] }> { props.collection.shares }</Text>
                          </View>
                        }
                        { !!props.collection.likes && <View style={ [Styles.flexRow, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.marginLeft] }>
                              <Icon name="heart" ios="ios-heart" android="md-heart" style={ [Styles.textSmall, Styles.textUbandani] } />
                              <Text style={ [Styles.textSmall, Styles.textUbandani] }> { props.collection.likes }</Text>
                          </View>
                        }
                    </View>
                    <View style={ [Styles.padding, Styles.noPaddingBottom] }>
                        <Text numberOfLines={3} style={ [Styles.textLabel, Styles.halfPadding] }>{ props.collection.description }</Text>
                        { !!props.collection.excerpt && <View style={ [Styles.flex, Styles.flexRow, Styles.flexJustifyEnd, Styles.flexAlignCenter] }>
                              <Button primary transparent onPress={ props.excerpt }>
                                  <Text style={ [Styles.textPrimary] }>Read More</Text>
                              </Button>
                          </View>
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
                        <View style={ [Styles.flex] }>
                            { !isEmpty(props.collection.videos) &&  <List
                              style={ [Styles.doublePaddingBottom] }
                              dataArray={ props.collection.videos }
                              keyboardShouldPersistTaps="always"
                              renderRow={ (item) =>
                                      <ListItem thumbnail square key={ item.id } onPress={ () => props.player(item) } style={ [Styles.marginBottom] }>
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
                                                  { (Object.keys(props.collection.videos)[0] == item.id) && <Text style={ [Styles.textXSmall, Styles.textLable] }>(NEXT)</Text> }
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
                            { isEmpty(props.collection.videos) && !props.videosLoading && <View style={ [Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.doublePaddingTop, Styles.doublePaddingBottom] }>
                                  <Text style={ [Styles.textLabel, Styles.textAlignCenter, Styles.padding, Styles.margin] }>No videos found</Text>
                              </View>
                            }
                            { props.videosLoading && <View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flex, Styles.flexColumn, Styles.flexJustifyCenter, Styles.flexAlignCenter, Styles.height100, Styles.backgroundKimyaKimyaLightTransluscent] }>
                                  <Spinner color={ Styles['textUbandani'].color } />
                              </View>
                            }
                        </View>
                    </View>
                    <Text style={ [Styles.padding] }>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </Content>
            </AnimatedHeader>

            <Loader visible={ props.loading } text="" spinnerColor={ Styles.textUbandani.color } />