import { StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
    myScrollView: {
      flexGrow: 1,
    },
    container: {
      flexGrow: 1,
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
  
    },
    mapstyle: {
      flexGrow: 1,
      height: 300,
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    infoContainer: {
      padding: 16
    },
    head: {
      flex: 1,
      width: 'auto',
      flexDirection: 'row',
      marginBottom: 10,
    },
    itemImage: {
      flex: 1,
      width: 100,
      height: 100,
      borderRadius: 5
    },
    textContainer: {
      flex: 2,
      width: 'auto',
      height: 'auto',
      padding: 10,
    },
    content1: {
      marginTop: 5,
      flexDirection: 'row',
    },
    itemName: {
      flexGrow: 1,
      fontSize: 24,
      color: '#666666'
    },
    itemPrice: {
      fontSize: 18,
      color: '#999999',
      flex: 1,
      justifyContent: 'flex-end',
    },
    itemStar: {
      width: 100,
      height: 20,
      marginRight: 10,
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 0,
    },
    itemMoreInfo: {
      fontSize: 18,
      color: '#999999',
      marginTop: 10,
      marginBottom: 10
    },
    itemMoreInfoLink: {
      fontSize: 18,
      color: 'dodgerblue',
      marginTop: 10,
      marginBottom: 10
    }
  
  });
  
  export default styles;