
import React, { useState } from 'react';
import { GluestackUIProvider, Text, Box, config, Button, ButtonText, ButtonIcon, Fab, AddIcon, FabIcon, FabLabel, Icon } from "@gluestack-ui/themed";
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
      alert("Opha cancelado");
    }
  };

  return (
    <GluestackUIProvider config={config.theme}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
        </View>
        <View style={styles.footerContainer}>
          <Button
            marginBottom={60}
            onPress={pickImageAsync}
            size="lg"
            variant="solid"
            action="secondary"
            bgColor='$rose500'
            isDisabled={false}
            isFocusVisible={false}
          >
            <ButtonText>Carregar Imagem</ButtonText>

          </Button>
        </View>
        
     
          <Fab size="lg" bgColor='$green400' placement="bottom center" isHovered={true} isDisabled={false} isPressed={false} >
           <ButtonText>Usar essa imagem</ButtonText>
          </Fab>
   
      
      </View>

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