import { StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    infoContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoText: {
      color: '#808080',
      backgroundColor: '#F5F5F5',
      margin: 16,
      padding:16,
      borderRadius: 5,
      fontSize: 18,
    },
    pickerPrice: {
      height: 20,
      color: '#666666',    
    }, 
    itemlista: {
      flex: 1,
      width: 'auto',
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 5
    },
    itemImage: {
      flex: 1,
      width: 100,
      height: 100,
      borderRadius: 5
    },
    containerContent: {
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
      fontSize: 16,
      color: '#666666'
    },
    itemAddress: {
      fontSize: 12,
      color: '#999999',
    },
    itemPrice: {
      marginLeft: 5,
      fontSize: 14,
      color: '#999999',
      flex: 1,
      justifyContent: 'flex-end',
    },
    itemStar: {
      width: 80,
      height: 16,
      marginRight: 10,
      flex: 1,
      justifyContent: 'flex-start',
      marginBottom: 0,
    }
  });
  
  export default styles;