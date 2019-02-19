import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Animated } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Subtitle, Content, Text } from 'native-base';
import LinearGradient from 'react-native-linear-gradient'; // Version can be specified in package.json

/**
 * Import Utilities
*/
import isEmpty from '../../utilities/isEmpty';
import isArray from '../../utilities/isArray';
import isObject from '../../utilities/isObject';
import isFunction from '../../utilities/isFunction';
import isAndroid from '../../utilities/isAndroid';
import isIOS from '../../utilities/isIOS';

/**
 * Import other components
*/
import StatusBar from './StatusBar';

/**
 * Other variables and constants
*/
import Styles from '../styles';

/**
* Establish some Constants
*/
const HEADER_DEFAULT_HEIGHT = 200;
const DEFAULT_TITLE_FONT_SIZE = 20;

type Props = {};

class AnimatedHeader extends Component<Props> {

	constructor(props) {

        // Intialize props
        super(props);

        // Initialize state
        this.state = {
        	scrollY: new Animated.Value((isIOS())? -(props.headerDefaultHeight || HEADER_DEFAULT_HEIGHT) : 0),
        	HEADER_MIN_HEIGHT: (isIOS())? 60 : 73,
        	HEADER_MAX_HEIGHT: HEADER_DEFAULT_HEIGHT + (2 * ((isIOS())? 60 : 73)),
        	HEADER_MAX_PADDING_LEFT: 0,
        	HEADER_MAX_PADDING_RIGHT: 0
        };

        // Initialize Members
        this.header = undefined;
        this.child = undefined;

        // Bind functions to this
        this.headerRendered = this.headerRendered.bind(this);
        this.leftRendered = this.leftRendered.bind(this);
        this.rightRendered = this.rightRendered.bind(this);
        this.childRendered = this.childRendered.bind(this);
        this.onChildScroll = this.onChildScroll.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderChild = this.renderChild.bind(this);
    }

    headerRendered(e) {
    	return (
    		this.setState({
    			HEADER_MIN_HEIGHT: e.nativeEvent.layout.height,
    			HEADER_MAX_HEIGHT: HEADER_DEFAULT_HEIGHT + (2 * e.nativeEvent.layout.height)
    		})
    	);
    }

    leftRendered(e) {
    	return this.setState({ HEADER_MAX_PADDING_LEFT: e.nativeEvent.layout.width + ((isAndroid())? 20 : 0) });
    }

    rightRendered(e) {
    	return this.setState({ HEADER_MAX_PADDING_RIGHT: e.nativeEvent.layout.width });
    }

    childRendered(e) {

    	const { headerDefaultHeight, headerMaxHeight } = this.props;
    	const { HEADER_MAX_HEIGHT } = this.state;

    	const scrollPosition = (headerMaxHeight || HEADER_MAX_HEIGHT) - (this.props.headerDefaultHeight || HEADER_DEFAULT_HEIGHT);

    	return setTimeout( () => ( this.child._root.scrollToPosition(0, scrollPosition) ) );
    }

    onChildScroll(e) {
    	
    	if (this.props.disabled) return;
    	else {

    		this.setState({ contentOffsetY: e.nativeEvent.contentOffset.y });

    		return this.state.scrollY.setValue(e.nativeEvent.contentOffset.y);
    	}
    }

    renderHeader() {

    	const { title, subtitle, renderLeft, renderRight, titleStyle, subtitleStyle, headerDefaultHeight, toolbarColor, statusbarStyle } = this.props;
    	let { headerMaxHeight, imageHeight } = this.props;

    	const { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT, HEADER_MAX_PADDING_LEFT, HEADER_MAX_PADDING_RIGHT } = this.state;

    	if (headerMaxHeight < headerDefaultHeight)
    		headerMaxHeight = headerDefaultHeight + (HEADER_MIN_HEIGHT * 2);

    	if (imageHeight < headerDefaultHeight) imageHeight = headerDefaultHeight;

    	const HEADER_SCROLL_DISTANCE = (headerMaxHeight || HEADER_MAX_HEIGHT) - HEADER_MIN_HEIGHT;

    	const HEADER_HALF_SCROLL_DISTANCE = (headerMaxHeight || HEADER_MAX_HEIGHT) - (headerDefaultHeight || HEADER_DEFAULT_HEIGHT);

    	const IMAGE_MARGIN = ((headerMaxHeight || HEADER_MAX_HEIGHT) - (imageHeight || HEADER_DEFAULT_HEIGHT )) / 2;

    	let setTitlefontSize = DEFAULT_TITLE_FONT_SIZE;
    	if (!isEmpty(titleStyle)) {
	    	if (isArray(titleStyle))
	    		titleStyle.map( (style) => {

	    			if (style.fontSize) setTitlefontSize = style.fontSize;

	    			return style;
	    		} );
	    	else if (isObject(titleStyle))
	    		setTitlefontSize = titleStyle.fontSize || DEFAULT_TITLE_FONT_SIZE;
	    }

    	const headerHeight = this.state.scrollY.interpolate({
		    inputRange: [0, HEADER_SCROLL_DISTANCE],
		    outputRange: [headerMaxHeight || HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
		    extrapolate: 'clamp',
		});
    	
		const headerPaddingLeft = this.state.scrollY.interpolate({
		    inputRange: [0, HEADER_SCROLL_DISTANCE],
		    outputRange: [Styles.doublePaddingLeft.paddingLeft, HEADER_MAX_PADDING_LEFT],
		    extrapolate: 'clamp',
		});
		
		const headerPaddingRight = this.state.scrollY.interpolate({
		    inputRange: [0, HEADER_SCROLL_DISTANCE],
		    outputRange: [Styles.doublePaddingRight.paddingRight, HEADER_MAX_PADDING_RIGHT],
		    extrapolate: 'clamp',
		});

		const headerOverlayOpacity = this.state.scrollY.interpolate({
		 	inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
		 	outputRange: [0.9, 0.9, 0],
		 	extrapolate: 'clamp',
		});

		const titleFontSize = this.state.scrollY.interpolate({
	      	inputRange: [0, HEADER_SCROLL_DISTANCE],
	      	outputRange: [(setTitlefontSize || DEFAULT_TITLE_FONT_SIZE), DEFAULT_TITLE_FONT_SIZE],
	      	extrapolate: 'clamp',
	    });

    	const imageOpacity = this.state.scrollY.interpolate({
		 	inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
		 	outputRange: [1, 1, 0],
		 	extrapolate: 'clamp',
		});
    	
		const imageTranslate = this.state.scrollY.interpolate({
		 	inputRange: [0, HEADER_HALF_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE],
		 	outputRange: [IMAGE_MARGIN, 0, -(IMAGE_MARGIN || 50)],
		 	extrapolate: 'clamp',
		});

    	return (
    		<Animated.View
    			ref={ (r) => (this.header = r) }
    			style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, Styles.flexColumn, Styles.flexJustifyEnd, Styles.flexAlignStretch, Styles.overflowHidden, { height: headerHeight, backgroundColor: toolbarColor || Styles.backgroundHeader.backgroundColor }] }>
    			{ this.props.imageSource && <Animated.Image source={ this.props.imageSource } style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, { height: imageHeight || HEADER_DEFAULT_HEIGHT, opacity: imageOpacity, transform: [{ translateY: imageTranslate }, { perspective: 1000 }] }] } />
    			}
    			<Animated.View style={ [{ paddingLeft: headerPaddingLeft, paddingRight: headerPaddingRight }] }>
    				<Animated.View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, { height: HEADER_MIN_HEIGHT, opacity: headerOverlayOpacity }] }>
    					<LinearGradient colors={["rgba(0, 0, 0, 0)", toolbarColor]} locations={[0.1, 1]} style={ [Styles.flex] } />
    				</Animated.View>
    				<View style={ [Styles.paddingTop, Styles.paddingBottom] }>
						{ !!title && <Animated.Text numberOfLines={1} style={ [Styles.textBold, Styles.textAlignLeft, ...titleStyle, { fontSize: titleFontSize }] }>
								{title}
							</Animated.Text>
						}
						{ !!subtitle && <Subtitle numberOfLines={1} style={ [Styles.textAlignLeft, ...subtitleStyle] }>
								{subtitle}
							</Subtitle>
						}
    				</View>
    			</Animated.View>
    			<View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.horizontalPositionLeft, Styles.horizontalPositionRight] }>
    				<Animated.View style={ [Styles.positionAbsolute, Styles.verticalPositionTop, Styles.verticalPositionBottom, Styles.horizontalPositionLeft, Styles.horizontalPositionRight, { height: HEADER_MIN_HEIGHT, opacity: headerOverlayOpacity }] }>
    					<LinearGradient colors={[toolbarColor, "rgba(0, 0, 0, 0)"]} style={ [Styles.flex] } />
    				</Animated.View>
	    			<Header transparent noShadow style={ [Styles.backgroundTransparent] } onLayout={ this.headerRendered }>
	    				{ isFunction(renderLeft) && <Left onLayout={ this.leftRendered }>
	    						{ renderLeft() }
	    					</Left>
	    				}
	    				<Body style={ [Styles.flex] } />
	    				{ isFunction(renderRight) && <Right onLayout={ this.rightRendered }>
	    						{ renderRight() }
	    					</Right>
	    				}
	    			</Header>
	    		</View>

    			<StatusBar backgroundColor={ toolbarColor } barStyle={ statusbarStyle } />
    		</Animated.View>
    	);
    }

    renderChild() {
    	
    	const arr = React.Children.toArray(this.props.children);

	    if (isEmpty(arr))
	     	console.error('AnimatedHeader must have ScrollView or FlatList as a child');
	    else {
		    
		    if (arr.length > 1)
		      	console.error('Invalid child, only 1 child accepted');
		    else {
			    
			    const { headerDefaultHeight } = this.props;
			    let { headerMaxHeight } = this.props;

			    const { HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT } = this.state;

			    if (headerMaxHeight < headerDefaultHeight)
    				headerMaxHeight = headerDefaultHeight + (HEADER_MIN_HEIGHT * 2);

			    const childProps = {
					style: [Styles.flex],
					ref: (r) => ( this.child = r ),
					scrollEventThrottle: 16,
					onScroll: this.onChildScroll,
					contentContainerStyle: [...(arr[0].props.contentContainerStyle || []), { paddingTop: headerMaxHeight || this.state.HEADER_MAX_HEIGHT, paddingBottom: (headerMaxHeight || HEADER_MAX_HEIGHT) - (headerDefaultHeight || HEADER_DEFAULT_HEIGHT) }],
					onLayout: this.childRendered
			    };

			    if (!isEmpty(arr[0].props.refreshControl)) {
			    	
			    	childProps.refreshControl = {
			    		...arr[0].props.refreshControl,
			    		props: {
			    			...arr[0].props.refreshControl.props,
			    			progressViewOffset: headerMaxHeight || HEADER_MAX_HEIGHT
			    		}
			    	};

			    	childProps.contentInset = { ...(arr[0].props.contentInset || {}), top: headerMaxHeight || HEADER_MAX_HEIGHT };

		          	childProps.contentOffset={ ...(arr[0].props.contentOffset || {}), y: -(headerDefaultHeight || HEADER_DEFAULT_HEIGHT) };
			    }

		    	return ( React.cloneElement(arr[0], childProps) );
		    }
		}
    }

    render() {

    	return (
    		<View style={[Styles.flex].concat(this.props.style)} onLayout={ this.wrapperRendered }>
    			{ this.renderChild() }
    			{ this.renderHeader() }
    		</View>
    	);
    }
}

/**
 * Container PropTypes
*/
AnimatedHeader.propTypes = {
    children: PropTypes.object.isRequired
};

/**
 * Styles
*/
const styles = StyleSheet.create({});

export default AnimatedHeader;