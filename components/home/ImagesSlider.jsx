import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from "../../constants";
import { SliderBox } from 'react-native-image-slider-box'

const ImagesSlider = () => {
    const slides = [
        "https://wallpaperset.com/w/full/f/d/6/43388.jpg",
        "https://wallpaperset.com/w/full/3/3/6/186736.jpg",
        "https://wallpaperset.com/w/full/a/2/9/186945.jpg",
        "https://wallpaperset.com/w/full/2/b/1/186688.jpg",
        "https://wallpaperset.com/w/full/a/4/b/76571.jpg",
        "https://wallpaperset.com/w/full/2/5/b/408920.jpg",
    ]
    return (
        <View style={styles.imageSlider}>
            <SliderBox images = {slides}
                dotColor = {COLORS.primary}
                dotStyle = {{width: 0,height: 0,borderRadius: 5,marginHorizontal: 0,padding: 0,margin: 0,}}
                inactiveDotColor = {COLORS.secondary}
                ImageComponentStyle = {{borderRadius: 15, width: "95%", marginTop: 15}}
                autoplay
                circleLoop 
            />
        </View>
    )
}

export default ImagesSlider

const styles = StyleSheet.create({
    imageSlider: {
        flex: 1,
        alignItems: 'center',
    }
})