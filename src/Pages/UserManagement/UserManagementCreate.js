import {useFormik} from 'formik';
import React, {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../Components/Atoms/Button';
import InputText from '../../Components/Atoms/InputText';
import allActions from '../../Config/Redux/Actions';
import {addUserValidationSchema} from '../../Config/ValidationSchema/userValidationSchema';

const initialValue = {
  fullname: '',
  email: '',
  phone: '',
};
const UserManagementCreate = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {addNewUser, updateUser} = allActions.userManagementAction;
  const {auth, userManagement} = useSelector(state => state);
  const {message, visible, loading} = auth;
  const {user} = userManagement;
  const {update, _uid} = route.params;
  const [form, setForm] = useState(update ? user : initialValue);
  const formik = useFormik({
    initialValues: form,
    enableReinitialize: true,
    onSubmit: (e, a) => onFormSubmit(e, a),
    validationSchema: addUserValidationSchema,
  });

  const {
    values,
    errors,
    setFieldTouched,
    touched,
    handleSubmit,
    setFieldValue,
  } = formik;

  const onChangeText = ({name, val}) => {
    setFieldTouched(name);
    setFieldValue(name, val);
    setForm(prevState => ({
      ...prevState,
      [name]: val,
    }));
  };

  const onFormSubmit = (value, {setSubmitting, resetForm}) => {
    Keyboard.dismiss();
    resetForm(initialValue);
    setSubmitting(false);

    update
      ? dispatch(updateUser(value, _uid, navigation))
      : dispatch(addNewUser(value, navigation));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection} />
      <Snackbar visible={visible}>{message}</Snackbar>
      <View style={styles.content}>
        <View style={styles.contentBody}>
          <View style>
            <InputText
              placeholder="Nama"
              name="fullname"
              value={values.fullname}
              error={errors.fullname}
              onChangeText={e => onChangeText(e)}
              onBlur={e => setFieldTouched(e)}
              isError={touched.fullname}
            />
            <InputText
              placeholder="Email"
              name="email"
              value={values.email}
              error={errors.email}
              onChangeText={e => onChangeText(e)}
              onBlur={e => setFieldTouched(e)}
              isError={touched.email}
            />
            <InputText
              placeholder="Telepon"
              name="phone"
              value={values.phone}
              error={errors.phone}
              onChangeText={e => onChangeText(e)}
              onBlur={e => setFieldTouched(e)}
              isError={touched.phone}
            />
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
          disabled={loading}
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

export default UserManagementCreate;
