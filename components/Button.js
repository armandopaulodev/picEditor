import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Button as Gbutton } from '@gluestack-ui/themed'

export default function Button({ label, theme, onPress, bg, icon }) {
  if (theme === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
        ]}>
        <Gbutton bgColor={bg} style={[styles.button]} onPress={onPress}>
          <FontAwesome name={icon} size={18} color="white" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: 'white' }]}>{label}</Text>
        </Gbutton>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    marginBottom:30
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  buttonIcon: {
    paddingRight: 8,
  },
});
