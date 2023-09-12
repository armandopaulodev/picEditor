import { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

import Button from '../../components/Button';
import ImageViewer from '../../components/ImageViewer';
import CircleButton from '../../components/CircleButton';
import IconButton from '../../components/IconButton';
import EmojiPicker from '../../components/EmojiPicker';
import EmojiList from '../../components/EmojiList';
import EmojiSticker from '../../components/EmojiSticker';
import React from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Asset } from 'expo-asset';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
const localImage= require('../../assets/images/uz.jpg');

export default function TabOneScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [PlaceholderImage, setPlaceholderImage] = useState<Asset>();

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();
  
  useEffect(() => {
    (async () => {
      const image = Asset.fromModule(localImage);
      await image.downloadAsync();
      setPlaceholderImage(image);
    })();
  }, []);

  if (status === null) {
    requestPermission();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('Opha Parece que nao carregou nehuma imagem');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };


  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Salvo com sucesso");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const _rotate90andFlip = async () => {

    const manipResult = await manipulateAsync(
      selectedImage? selectedImage : PlaceholderImage?.localUri||PlaceholderImage?.uri,
      [{ rotate: 180 }, { flip: FlipType.Horizontal }],
      { compress: 1, format: SaveFormat.PNG }
    );
  
    setSelectedImage(manipResult.uri);
    console.log('result: '+JSON.stringify(manipResult))
  };

  return (
    <GluestackUIProvider>
       <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            ref={imageRef}
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji !== null ? (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          ) : null}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Limpar" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Salvar" onPress={onSaveImageAsync} />
          </View>
          <View style={styles.optionsRow2}>
            <IconButton icon="rotate-90-degrees-ccw" label="Rotacao" onPress={_rotate90andFlip} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button bg={'$rose500'} icon={'cloud-upload'} theme="primary" label="Carregar IMagem" onPress={pickImageAsync} />
          <Button bg={'$green500'} icon={'edit'} theme="primary" label="Usar essa imagem" onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose} image={selectedImage}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
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
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  optionsRow2: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:20
  },
});