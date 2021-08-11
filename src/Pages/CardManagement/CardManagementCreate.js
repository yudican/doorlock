import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../Components/Atoms/Button';
import CardRfid from '../../Components/Atoms/CardRfid';
import InputSelect from '../../Components/Atoms/InputSelect';
import allActions from '../../Config/Redux/Actions';
import {getUserName, setDataToSelect} from '../../Utils/helper';

const CardManagementCreate = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {showUser} = allActions.userManagementAction;
  const {addNewCard, getTempCard, setShowCardById, updateCard} =
    allActions.cardManagementAction;
  const {auth, userManagement, cardManagement} = useSelector(state => state);
  const {message, visible, loading} = auth;
  const {user, users} = userManagement;
  const {cardTemp, card} = cardManagement;
  const {update, _uid} = route.params;
  const [selectedUser, setSelectedUser] = useState(
    update ? {_id: card._uid, name: getUserName(users, card._uid)} : {},
  );

  useEffect(() => {
    dispatch(showUser());
    dispatch(getTempCard());
    !update && dispatch(setShowCardById({}));
  }, []);

  const handleSubmit = () => {
    const data = {cardId: cardTemp, _uid: selectedUser._id};
    if (update) {
      dispatch(updateCard(data, card.cardId, navigation));
    } else {
      dispatch(addNewCard(data, navigation));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection} />
      <Snackbar visible={visible}>{message}</Snackbar>
      <View style={styles.content}>
        <View style={styles.contentBody}>
          <View style>
            <InputSelect
              placeholder="Pilih Pengguna"
              value={selectedUser.name}
              data={setDataToSelect(users)}
              onChange={item => setSelectedUser(item)}
            />
            {selectedUser._id && (
              <CardRfid
                placeholder="ID Karu"
                value={card?.cardId || cardTemp}
                disabled={update}
              />
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: wp(3),
        }}>
        <Button
          label={'SIMPAN'}
          loading={loading}
          onPress={handleSubmit}
          disabled={!selectedUser._id || !cardTemp}
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
    backgroundColor: '#fff',
    borderTopEndRadius: hp(3),
    borderTopStartRadius: hp(3),
    marginTop: -hp(3),
  },
  contentBody: {
    marginHorizontal: hp(3),
    marginTop: hp(3),
  },
});

export default CardManagementCreate;
