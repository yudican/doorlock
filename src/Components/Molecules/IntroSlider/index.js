import React from 'react';
import ViewSlider from 'react-native-view-slider';
import {StyleSheet, FlatList, Image, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Intro from '../../Atoms/Intro';

const IntroSlider = ({data}) => {
  return (
    <ViewSlider
      renderSlides={
        <>
          {data &&
            data.map((item, i) => (
              <View key={i} style={styles.viewBox}>
                <Intro {...item} />
              </View>
            ))}
        </>
      }
      style={styles.slider} //Main slider container style
      slideCount={data.length} //How many views you are adding to slide
      dots={true} // Pagination dots visibility true for visibile
      dotActiveColor="red" //Pagination dot active color
      dotInactiveColor="gray" // Pagination do inactive color
      dotsContainerStyle={styles.dotContainer} // Container style of the pagination dots
    />
  );
};

const styles = StyleSheet.create({
  viewBox: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    width: wp(100),
    padding: 10,
    alignItems: 'center',
  },
  slider: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(40),
  },
  dotContainer: {
    backgroundColor: 'transparent',
  },
});

export default IntroSlider;
