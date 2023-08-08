import styled from "styled-components/native";
// import Carousel, { Pagination } from "react-native-snap-carousel";
import { Metrics, Colors, Fonts } from "../../constants";

// import {
//   isIphoneX,
//   getBottomSpace,
//   getStatusBarHeight
// } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.color};
`;

export const AlignerTop = styled.View`
  flex: 2;
`;

export const AlignerBottom = styled.View`
  flex: 1;
`;

// export const OnboardSlider = styled(Carousel).attrs(props => ({
//   data: props.images,
//   sliderWidth: Metrics.screenWidth,
//   sliderHeight: Metrics.screenHeight,
//   itemWidth: Metrics.screenWidth,
//   itemHeight: Metrics.screenHeight,
//   loop: true,
//   autoplay: true,
//   firstItem: props.firstImage,
//   activeSlideAlignment: "center",
//   showsPagination: true,
//   onSnapToItem: index => props.snapAction(index),
//   inactiveSlideShift: 0,
//   inactiveSlideScale: 1,
//   slideStyle: { alignItems: "center" },
//   contentContainerCustomStyle: {}
// }))``;

export const SliderTopContainer = styled.View`
  height: ${Metrics.screenHeight / 2.1};
  align-items: center;
  justify-content: center;
`;

export const SliderBottomContainer = styled.View`
  flex: 0.5;
  justify-content: center;
  align-items: center;
`;

export const SliderImage = styled.Image.attrs((props) => ({
  source: props.image,
  resizeMode: "contain",
}))`
  width: ${Metrics.screenWidth};
`;

// export const SliderPagination = styled(Pagination).attrs(props => ({
//   carouselRef: props.sliderRef,
//   tappableDots: !!props.sliderRef,
//   containerStyle: {
//     width: 70,
//     height: 20,
//     alignSelf: "center",
//     zIndex: 0
//   },
//   dotsLength: props.length,
//   activeDotIndex: props.activeSlider,
//   dotColor: "#FFFFFFB3",
//   dotStyle: {
//     height: 16,
//     width: 16,
//     borderRadius: 16 / 2,
//     marginHorizontal: 3
//   },
//   inactiveDotStyle: {
//     height: 16,
//     width: 16,
//     borderRadius: 16 / 2,
//     marginHorizontal: 2
//   },
//   inactiveDotColor: "#00000029",
//   inactiveDotOpacity: 0.6,
//   inactiveDotScale: 1
// }))``;

export const BottomSliderContent = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  align-self: center;
  background-color: transparent;
  height: 50;
  width: ${Metrics.screenWidth - 60};
  border-radius: 25px;
  border-width: 1px;
  border-color: ${Colors.white};
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
  color: ${Colors.white};
  font-size: ${Fonts.size.h6};
  font-family: ${Fonts.type.semi_bold};
`;

export const Title = styled.Text`
  font-size: ${Fonts.size.h2};
  font-family: ${Fonts.type.bold};
  color: #ffff;
  text-align: center;
  margin-bottom: 20px;
`;

export const SubTitle = styled.Text`
  font-size: ${Fonts.size.h5};
  font-family: ${Fonts.type.base};
  color: #ffff;
  text-align: center;
  align-self: center;
  width: ${Metrics.screenWidth - 20};
`;
