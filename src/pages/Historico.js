import React from 'react';
import { 
  Text,
  View, 
  TouchableNativeFeedback, 
  Image, 
  FlatList, 
  AsyncStorage 
} from 'react-native';
import styles from  '../styles/mainstyles';
import Star from 'react-native-star-view';
import FontAwesome from "react-native-vector-icons/FontAwesome";  
import { withNavigationFocus } from 'react-navigation';


export class Historico extends React.Component {

  state ={
    jsonData: [],
    visto: false,
  };

  componentDidMount() {
    this.getHistory();
  }

  getHistory = async () => {

    if(this.state.visto)
      return;

    const existingPlaces = await AsyncStorage.getItem('places')
    let places = JSON.parse(existingPlaces);

    if( !places ){
      places = []
    }

    this.setState({jsonData: places});
  }

  renderItem = ({ item }) => {
    let price = '';
    let colorPrice = '';

    if (item.price === '$') {
      price = ' Baixo';
      colorPrice = '#4dc34d';
    } else if (item.price === '$$') {
      price = ' Médio';
      colorPrice = '#e8e425';
    } else if (item.price === '$$$') {
      price = ' Alto';
      colorPrice = '#eb874b';
    } else if (item.price === '$$$$') {
      price = ' You rico ,man?';
      colorPrice = 'tomato';
    }

    return (
      <TouchableNativeFeedback
        onPress={() => { this.props.navigation.navigate("Info", { info: item }); }}>
        <View style={styles.itemlista}>

          <Image source={{ uri: item.image_url }} style={styles.itemImage} />

          <View style={styles.containerContent}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemAddress}>{item.location.address1}</Text>
            <View style={styles.content1}>

              <Star score={item.rating} style={styles.itemStar} />
              <Text style={styles.itemPrice}><FontAwesome name={'dollar'} size={14} color={colorPrice} />
                {price}
              </Text>

            </View>
          </View>
        </View>
      </TouchableNativeFeedback>);
  };

  render() {
  
    if( this.props.isFocused )
      this.getHistory();
    

    if (this.state.jsonData.length === 0) {
      return (
        <View style={styles.infoContainer}>
          <FontAwesome name={'book'} size={60} color={"#808080"} />
            
          <Text style = {styles.infoText}>
            Nenhum histórico.
          </Text>
        </View>
      )

    }else { 
      return (
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.list}
            data={this.state.jsonData}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}>
          </FlatList>
        </View>
      );
    }  
  }
}

export default withNavigationFocus(Historico);