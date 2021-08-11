import React, {useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
const InputSelect = ({
  placeholder,
  onChange,
  value,
  name,
  errors = [],
  data = [],
  error,
  isError,
}) => {
  const refRBSheet = useRef();
  const [selectedValue, setSelectedValue] = useState({});

  const handleChange = item => {
    refRBSheet.current.close();
    onChange(item);
    setSelectedValue(item);
  };
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => refRBSheet.current.open()}>
        <View style={styles.fieldContent}>
          <Text style={{color: value ? '#000' : '#000'}}>
            {value || placeholder}
          </Text>
        </View>
      </TouchableOpacity>
      {error && isError && <Text style={styles.errorMessage}>{error}</Text>}
      <RBSheet ref={refRBSheet} height={hp(50)} openDuration={10}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuHeaderTitle}>{placeholder}</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.menuItemContainer}>
              {data &&
                data.map((item, index) => (
                  <Item
                    key={item._id}
                    label={item.name}
                    last={index === data.length - 1}
                    onPress={() => handleChange(item)}
                    selected={selectedValue._id === item._id}
                  />
                ))}
            </View>
          </ScrollView>
        </View>
      </RBSheet>
    </View>
  );
};

const Item = ({label, onPress, last = false, selected = false}) => {
  return (
    <TouchableHighlight underlayColor={'transparent'} onPress={onPress}>
      <View
        style={[
          styles.menuItem,
          {
            marginBottom: last ? hp(1) : 0,
            backgroundColor: selected ? '#130f40' : '#fff',
          },
        ]}>
        <Text
          style={[styles.menuHeaderTitle, {color: selected ? '#fff' : '#000'}]}>
          {label}
        </Text>
        <Entypo
          name="chevron-right"
          color={selected ? '#fff' : '#000'}
          size={hp(3)}
        />
      </View>
    </TouchableHighlight>
  );
};

const style = {
  container: {
    paddingHorizontal: wp(3),
    paddingTop: hp(2),
  },
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: hp(2),
  },
  fieldContent: {
    backgroundColor: '#ecf0f1',
    paddingVertical: hp(1.6),
    borderRadius: hp(1),
    paddingHorizontal: wp(3),
  },
  errorMessage: {fontSize: hp(1.4), color: '#43AE1A', paddingLeft: wp(2)},
  menuHeader: {
    backgroundColor: '#fff',
    paddingVertical: hp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  menuHeaderTitle: {fontSize: hp(2)},
  menuItemContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(3),
  },
  menuItem: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    borderRadius: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
});

export default InputSelect;
