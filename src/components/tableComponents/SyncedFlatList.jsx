import { useContext, useEffect, useState, useRef } from "react";
import { Animated, FlatList } from "react-native";
import { SyncedFlatListContext } from "../../contexts/SyncedFlatListContext";


export const SyncedFlatList = (props) => {
  const { id, ...rest} = props;
  const { activeFlatList, offsetPercent } = useContext(SyncedFlatListContext)

  
  const [flatListLength, setFlatListLength] = useState(0)
  const [contentLength, setContentLength] = useState(0)

  const [scrollableLength, setScrollableLength] = useState(0)

  // Calculate the scrollable Length everytime the contentLength or scrollViewLength changes
  useEffect(() => {
    // The scrollable length is the difference between the content length and the scrollview length
    setScrollableLength(contentLength - flatListLength)
  }, [flatListLength, contentLength])

  const handleLayout = ({ nativeEvent: { layout: { width, height } } }) => {
    // The length of the scrollView depends on the orientation we scroll in
    setFlatListLength(props.horizontal ? width : height)
  }

  const handleContentSizeChange = (width, height) => {
    // The length of the content inside the scrollView depends on the orientation we scroll in
    setContentLength(props.horizontal ? width : height)
  }

  const flatListRef = useRef(null)

  offsetPercent.addListener(({ value }) => {
    // Only respond to changes of the offsetPercent if this scrollView is NOT the activeScrollView
    // --> The active ScrollView responding to its own changes would cause an infinite loop
    // @ts-ignore
    if (id !== activeFlatList._value && scrollableLength > 0) {
      // Depending on the orientation we scroll in, we need to use different properties
      console.log(flatListRef.current);
      // flatListRef.current.scrollTo({ [props.horizontal ? 'x' : 'y']: value * scrollableLength, animated: false })
    }
  })

  
  const offset = new Animated.Value(0)

  const handleScroll = Animated.event(
    // Depending on the orientation we scroll in, we need to use different properties
    [{ nativeEvent: { contentOffset: { [props.horizontal ? 'x' : 'y']: offset } } }],
    { useNativeDriver: true }
  )

  offset.addListener(({ value }) => {
    // Only change the offsetPercent if the scrollView IS the activeScrollView
    // --> The inactive ScrollViews changing the offsetPercent would cause an infinite loop
    // @ts-ignore
    if (id === activeFlatList._value && scrollableLength > 0) {
      offsetPercent.setValue(value / scrollableLength)
    }
  })

  const handleTouchStart = () => {
    activeFlatList.setValue(id)
  }

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
}