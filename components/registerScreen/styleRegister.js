import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    marginTop: 55,
    width: '70%',
    height: 75,
  },

  textInput: {
    width: '100%',
    height: 50,
    marginVertical: 10,
    borderColor: 'silver',
    borderBottomWidth: 1,
  },

  body: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 50,
  },

  button: {
    backgroundColor: '#3DBBF1',
    marginVertical: 15,
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#00B0F0',
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default Style;
