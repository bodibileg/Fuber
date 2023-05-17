import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%',
  },
  textInput: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    marginVertical: 5,
    marginLeft: 30,
  },

  separator: {
    backgroundColor: '#5A5A5A',
    height: 1,
  },
  listView: {
    position: 'absolute',
    top: 105,
  },
  autocompleteContainer: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconContainer: {
    backgroundColor: '#F0F0F0',
    padding: 7,
    borderRadius: 50,
    marginRight: 15,
  },
  locationText: {},

  circle: {
    width: 6,
    height: 6,
    backgroundColor: '#008AD8',
    position: 'absolute',
    top: 22,
    left: 17,
    borderRadius: 3,
  },
  line: {
    width: 1,
    height: 44,
    backgroundColor: 'black',
    position: 'absolute',
    top: 32,
    left: 19,
  },
  square: {
    width: 6,
    height: 6,
    backgroundColor: 'black',
    position: 'absolute',
    top: 80,
    left: 17,
  },
});

export default styles;
