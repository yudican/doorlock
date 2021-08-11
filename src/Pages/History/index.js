import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import HistoryItem from '../../Components/Atoms/HistoryItem';
import allActions from '../../Config/Redux/Actions';

const History = ({navigation}) => {
  const dispatch = useDispatch();
  const {getHistory} = allActions.historyAction;
  const {history} = useSelector(state => state);
  const {histories} = history;

  useEffect(() => {
    dispatch(getHistory());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerSection} />
      {/* <Snackbar visible={visible}>{message}</Snackbar> */}
      <View style={styles.content}>
        <FlatList
          data={history.histories}
          renderItem={({item}) => <HistoryItem key={item._uid} {...item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerSection: {
    backgroundColor: '#130f40',
    height: hp(5),
  },
  content: {
    flex: 1,
    backgroundColor: '#f1f2f6',
    borderTopEndRadius: hp(3),
    borderTopStartRadius: hp(3),
    marginTop: -hp(3),
  },
  contentBody: {
    marginHorizontal: hp(3),
    marginTop: hp(3),
  },
  textTitle: {
    fontSize: hp(3),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: hp(3),
  },
});

export default History;
