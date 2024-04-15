import {
  StyleSheet,
  Text,
  TouchableOpacity,

  View,
  Button,
} from 'react-native';
import React, {useRef} from 'react';
import colors from '../../assets/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = () => {
 

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <MaterialCommunityIcons
          name="pokeball"
          size={32}
          color={colors.grayscale.light}
        />
        <Text style={styles.title}>PokéDex</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: 12,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 12,
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.grayscale.light,
  },
});
