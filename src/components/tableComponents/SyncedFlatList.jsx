import { useContext, useEffect, useRef, useState } from "react";
import { Animated, FlatList, FlatListProps } from "react-native";
import { SyncedFlatListContext } from "../../contexts/SyncedFlatListContext";

export const SyncedFlatList = (props) => {
  const { id, ...rest } = props;
  const { activeFlatList, offsetPercent } = useContext(SyncedFlatListContext);

  const [flatListLength, setFlatListLength] = useState(0);
  const [contentLength, setContentLength] = useState(0);

  const [scrollableLength, setScrollableLength] = useState(0);

  useEffect(() => {
    setScrollableLength(contentLength - flatListLength);
  }, [flatListLength, contentLength]);

  const handleLayout = ({ nativeEvent: { layout: { width, height } } }) => {
    setFlatListLength(props.horizontal ? width : height);
  };

  const handleContentSizeChange = (width, height) => {
    setContentLength(props.horizontal ? width : height);
  };

  const flatListRef = useRef(null);

  offsetPercent?.addListener(({ value }) => {
    if (id !== activeFlatList._value && scrollableLength > 0) {
      flatListRef.current?.scrollToOffset({ offset: value * scrollableLength, animated: false });
    }
  });

  const offset = new Animated.Value(0);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { [props.horizontal ? 'x' : 'y']: offset } } }],
    { useNativeDriver: true }
  );

  offset.addListener(({ value }) => {
    if (id === activeFlatList._value && scrollableLength > 0) {
      offsetPercent.setValue(value / scrollableLength);
    }
  });

  const handleTouchStart = () => {
    activeFlatList.setValue(id);
  };

  return (
    <Animated.FlatList
      {...rest}
      ref={flatListRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      onTouchStart={handleTouchStart}
      onLayout={handleLayout}
      onContentSizeChange={handleContentSizeChange}
    />
  );
};
