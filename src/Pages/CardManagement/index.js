import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Snackbar,
  Button as DialogButton,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../Components/Atoms/Button';
import Loader from '../../Components/Atoms/Loader';
import UserListItem from '../../Components/Atoms/UserListItem';
import allActions from '../../Config/Redux/Actions';

const CardManagementShow = ({navigation}) => {
  const dispatch = useDispatch();
  const {showCard, showCardById, deleteCard} = allActions.cardManagementAction;
  const {toggleDialog} = allActions.userManagementAction;
  const {auth, userManagement, cardManagement} = useSelector(state => state);
  const {message, visible, loading, user} = auth;
  const {dialogVisible} = userManagement;
  const [cardId, setCardId] = useState(null);

  useEffect(() => {
    dispatch(showCard());
  }, []);

  const showDialog = _cardId => {
    setCardId(_cardId);
    dispatch(toggleDialog());
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection} />
      <Snackbar visible={visible}>{message}</Snackbar>
      <Loader loading={loading} />
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => dispatch(toggleDialog())}>
          <Dialog.Content>
            <Paragraph>Apakah anda yakin ingin hapus kartu ini?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <DialogButton onPress={() => dispatch(deleteCard(cardId))}>
              Ya, Hapus
            </DialogButton>
            <DialogButton onPress={() => dispatch(toggleDialog())}>
              Batal
            </DialogButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={styles.content}>
        <ScrollView>
          <View style={styles.contentBody}>
            <FlatList
              data={cardManagement.cards}
              renderItem={({item}) => (
                <UserListItem
                  key={item._uid}
                  name={`Nomor Kartu: ${item.cardId}`}
                  onPressEdit={() =>
                    dispatch(showCardById(item.cardId, navigation))
                  }
                  onPressDelete={() => showDialog(item.cardId)}
                />
              )}
            />
          </View>
        </ScrollView>
      </View>
      <View style={{paddingHorizontal: wp(3)}}>
        <Button
          label={'TAMBAH KARTU'}
          onPress={() =>
            navigation.push('CardManagementCreate', {update: false})
          }
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
});

export default CardManagementShow;
