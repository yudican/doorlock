import {useNavigation} from '@react-navigation/native';
import {Formik, useFormik} from 'formik';
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../Components/Atoms/Button';
import HeaderContent from '../../../Components/Atoms/HeaderContent';
import HeaderLogo from '../../../Components/Atoms/HeaderLogo';
import InputText from '../../../Components/Atoms/InputText';
import allActions from '../../../Config/Redux/Actions';
import {registerSchema} from '../../../Config/ValidationSchema/authValidationSchema';

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {message, messages, user, visible, loading} = useSelector(
    state => state.auth,
  );
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });
  const {register, setVisible} = allActions.authAction;

  const formik = useFormik({
    initialValues: form,
    enableReinitialize: true,
    onSubmit: (e, a) => onFormSubmit(e, a),
    validationSchema: registerSchema,
  });

  const {
    values,
    handleChange,
    errors,
    setFieldTouched,
    touched,
    handleSubmit,
    isSubmitting,
  } = formik;

  const onChangeText = ({name, val}) => {
    setFieldTouched(name);
    handleChange(name, val);
    setForm(prevState => ({...prevState, [name]: val}));
  };

  const onFormSubmit = (
    {fullname, email, phone, password},
    {setSubmitting},
  ) => {
    const data = {fullname, email, phone};
    dispatch(register(data, password));
    setSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      <HeaderLogo source={require('../../../Assets/Logo/logo.jpeg')} />
      <Snackbar
        visible={visible}
        action={{
          label: 'Tutup',
          onPress: () => dispatch(setVisible()),
        }}>
        {message}
      </Snackbar>
      <View style={styles.contentContainer}>
        <HeaderContent
          title="Daftar"
          onPress={() => navigation.navigate('Auth')}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={0}>
              <View style={{flex: 1, marginTop: hp(2), marginBottom: hp(8)}}>
                <InputText
                  placeholder={'Nama'}
                  name="fullname"
                  value={values.fullname}
                  error={errors.fullname}
                  onChangeText={e => onChangeText(e)}
                  onBlur={e => setFieldTouched(e)}
                  isError={touched.fullname}
                />
                <InputText
                  placeholder={'Email'}
                  name="email"
                  value={values.email}
                  error={errors.email}
                  onChangeText={e => onChangeText(e)}
                  onBlur={e => setFieldTouched(e)}
                  isError={touched.email}
                />
                <InputText
                  placeholder={'No HP'}
                  name="phone"
                  value={values.phone}
                  error={errors.phone}
                  onChangeText={e => onChangeText(e)}
                  onBlur={e => setFieldTouched(e)}
                  isError={touched.phone}
                />
                <InputText
                  placeholder={'Kata Sandi'}
                  name="password"
                  value={values.password}
                  error={errors.password}
                  secureTextEntry
                  errors={messages}
                  onChangeText={e => onChangeText(e)}
                  onBlur={e => setFieldTouched(e)}
                  isError={touched.password}
                />
                <InputText
                  placeholder={'Konfirmasi Kata Sandi'}
                  name="confirm_password"
                  value={values.confirm_password}
                  error={errors.confirm_password}
                  secureTextEntry
                  errors={messages}
                  onChangeText={e => onChangeText(e)}
                  onBlur={e => setFieldTouched(e)}
                  isError={touched.confirm_password}
                />
                <Button
                  label="DAFTAR SEKARANG"
                  onPress={handleSubmit}
                  loading={loading || isSubmitting}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: hp(2),
                }}>
                <Text>Sudah Punya Akun? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={{color: '#43AE1A'}}>Masuk</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#fff',
    height: '30%',
    paddingHorizontal: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -hp(4),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopStartRadius: hp(4),
    borderTopEndRadius: hp(4),
    marginTop: -hp(4),
    paddingHorizontal: wp(3),
    paddingTop: hp(3),
  },
  imageLogo: {
    height: hp(8),
    width: wp(43),
  },
  introContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hp(4),
  },
  authButton: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hp(4),
    justifyContent: 'flex-end',
  },
});

export default Register;
