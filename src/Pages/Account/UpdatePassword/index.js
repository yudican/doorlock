import {useFormik} from 'formik';
import React, {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../Components/Atoms/Button';
import InputText from '../../../Components/Atoms/InputText';
import allActions from '../../../Config/Redux/Actions';
import {updatePasswordValidationSchema} from '../../../Config/ValidationSchema/userValidationSchema';

const initialValue = {
  old_password: '',
  new_password: '',
  confirm_password: '',
};
const UpdatePassword = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  const {updateUserPassword} = allActions.profileAction;
  const {visible, message, loading} = auth;
  const {email} = auth.user;
  const [form, setForm] = useState(initialValue);
  const formik = useFormik({
    initialValues: form,
    enableReinitialize: true,
    onSubmit: (e, a) => onFormSubmit(e, a),
    validationSchema: updatePasswordValidationSchema,
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
    const data = {
      email,
      password: value.old_password,
      newPassword: value.new_password,
    };
    dispatch(updateUserPassword(data, navigation));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection} />
      <Snackbar visible={visible}>{message}</Snackbar>
      <View style={styles.content}>
        <View style={styles.contentBody}>
          <View style>
            <InputText
              placeholder="Kata Sandi Sebelumnya"
              name="old_password"
              value={values.old_password}
              error={errors.old_password}
              onChangeText={e => onChangeText(e)}
              onBlur={e => setFieldTouched(e)}
              isError={touched.old_password}
              secureTextEntry
            />
            <InputText
              placeholder="Kata Sandi Baru"
              name="new_password"
              value={values.new_password}
              error={errors.new_password}
              onChangeText={e => onChangeText(e)}
              onBlur={e => setFieldTouched(e)}
              isError={touched.new_password}
              secureTextEntry
            />
            <InputText
              placeholder="Konfirmasi Kata Sandi"
              name="confirm_password"
              value={values.confirm_password}
              error={errors.confirm_password}
              onChangeText={e => onChangeText(e)}
              onBlur={e => setFieldTouched(e)}
              isError={touched.confirm_password}
              secureTextEntry
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

export default UpdatePassword;
