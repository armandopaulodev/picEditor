import { Modal, View, Text, Pressable, StyleSheet, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Button,Box,ButtonText, HStack,VStack, Actionsheet,ActionsheetBackdrop,ActionsheetDragIndicator,ActionsheetContent,ActionsheetDragIndicatorWrapper } from '@gluestack-ui/themed';
export default function EmojiPicker({ isVisible, children, onClose, image }) {
  return (
    <Actionsheet isOpen={isVisible} onClose={onClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent maxHeight="75%">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <HStack justifyContent="space-between"  space="lg">
              <Box
                w={50}
                h="$full"
                px="$2"
                borderWidth={1}
                borderStyle="solid"
                borderColor="$borderLight300"
                rounded="$sm"
              >
                <Image
                  source={image}
                  flex={1}
                  resizeMode="contain"
                />
              </Box>
              <VStack flex={1}>
                <Text fontWeight="$bold">Adicone Emoji</Text>
                <Text>A sua imagem selecionada </Text>
              </VStack>
        
              <VStack flex={1}>
              <Button bgColor='#f43f5e'><ButtonText>Rotacao</ButtonText></Button>
              </VStack>
          </HStack>
          {children}
        </ActionsheetContent>
      </Actionsheet>
    // <Modal animationType="slide" transparent={true} visible={isVisible}>
    //   <View style={styles.modalContent}>
    //     <View style={styles.titleContainer}>
    //       <Text style={styles.title}>Emojis disponiveis</Text>
    //       <Pressable onPress={onClose}>
    //         <MaterialIcons name="close" color="#fff" size={22} />
    //       </Pressable>
    //     </View>
    //     {children}
    //   </View>
    // </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '24%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 19,
  },
});
