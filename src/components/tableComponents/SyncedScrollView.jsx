import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { SyncedScrollViewContext } from "../../contexts/SyncedScrollViewContext";
import { useFocusEffect } from '@react-navigation/native';

export const SyncedScrollView = (props) => {
  const { id, ...rest } = props;
  const { activeScrollView, offsetPercent, scrollPositions } = useContext(SyncedScrollViewContext);

  const [scrollViewLength, setScrollViewLength] = useState(0);
  const [contentLength, setContentLength] = useState(0);
  const [scrollableLength, setScrollableLength] = useState(0);

  useEffect(() => {
    setScrollableLength(contentLength - scrollViewLength);
  }, [scrollViewLength, contentLength]);

  const handleLayout = ({ nativeEvent: { layout: { width, height } } }) => {
    setScrollViewLength(props.horizontal ? width : height);
  };

  const handleContentSizeChange = (width, height) => {
    setContentLength(props.horizontal ? width : height);
  };

  const scrollViewRef = useRef(null);
  const savedScrollPosition = useRef(0.1);
  
  useFocusEffect(
    React.useCallback(() => {
      if (scrollViewRef.current) {
        const position = 0;
        scrollViewRef.current.scrollTo({ [props.horizontal ? 'x' : 'y']: position, animated: false });
      }
    }, [id, scrollPositions])
  );

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ [props.horizontal ? 'x' : 'y']: savedScrollPosition.current, animated: false });
    }
  }, []);

  const offset = new Animated.Value(0);

  
  useEffect(() => {
    const listener = offsetPercent?.addListener(({ value }) => {
      if (id !== activeScrollView._value && scrollableLength > 0 && value !== 0) {
        savedScrollPosition.current = value * scrollableLength;
        scrollViewRef.current?.scrollTo({ ['x']: savedScrollPosition.current, animated: false });
      
      }
    });


    return () => {
      offsetPercent?.removeListener(listener);
    };
  }, [activeScrollView, scrollableLength, id, props.horizontal, offsetPercent]);

  useEffect(() => {
    const listener = offset.addListener(({ value }) => {
      if (id === activeScrollView._value && scrollableLength > 0 && value !== 0) {
        offsetPercent.setValue(value / scrollableLength);
        scrollPositions[id] = value;
      }
    });

    return () => {
      offset.removeListener(listener);
    };
  }, [activeScrollView, scrollableLength, id, offset, offsetPercent, scrollPositions]);

  const handleTouchStart = () => {
    activeScrollView.setValue(id);
  };

  return (
    <Animated.ScrollView
      {...rest}
      ref={scrollViewRef}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { [props.horizontal ? 'x' : 'y']: offset } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
      onTouchStart={handleTouchStart}
      onLayout={handleLayout}
      onContentSizeChange={handleContentSizeChange}
    />
  );
};
