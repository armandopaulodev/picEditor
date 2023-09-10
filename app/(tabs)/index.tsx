
import React, { useState } from 'react';
import { GluestackUIProvider, Text, Box, config, Button, ButtonText, ButtonIcon } from "@gluestack-ui/themed";
import * as ImagePicker from 'expo-image-picker';
import { Image, View, StyleSheet } from 'react-native'

import ImageViewer from '../../components/ImageViewer';

const PlaceholderImage = require('../../assets/images/background-image.png');

export default function TabOneScreen() {
  const [selectedImage, setSelectedImage] = useState('');

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <GluestackUIProvider config={config.theme}>
      <Box width="100%" justifyContent="center" alignItems="center" top={100} >
      <Button
          onPress={pickImageAsync}
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
        >
          <ButtonText>Picker IMage</ButtonText>

        </Button>
        <View style={styles.imageContainer}>
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
        </View>
        
      </Box>
    </GluestackUIProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});