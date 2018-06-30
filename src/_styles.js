import { StyleSheet, Dimensions } from 'react-native';

let { width, height } = Dimensions.get('window');

const Styles = {
  header: {
    padding: 10,
    paddingTop: 30,
    backgroundColor: 'white',
    shadowOffset: { height: 0 }, 
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2
  },
  headerText: {
    padding: 10
  },
  pageWrapper: {
    flex: 1,
    backgroundColor: 'white'
  },
  pageContainer: {
    position: 'absolute',
    height: height,
    width: width,
    top: 0,
    left: 0,
    backgroundColor: 'white'
  }
}

export default StyleSheet.create(Styles);