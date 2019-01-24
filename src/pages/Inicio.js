import React from 'react';
import { 
  Platform,
  TouchableNativeFeedback, 
  Image, 
  FlatList, 
  Text, 
  Picker,
  View,
  ProgressBarAndroid,
  ProgressViewIOS 
} from 'react-native';
import styles from  '../styles/mainstyles';
import Star from 'react-native-star-view';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import api from '../services/api';
import { Location, Permissions } from 'expo';


export default class Inicio extends React.Component {

  state = {
    jsonData: [],
    total: 1,
    loading: false,
    lat: null,
    lon: null,
    price: '1,2,3,4',
  };

  updatePrice = async (price) => {
    await this.setState({ price: price });
    this.loadBusiness();
  }

  componentDidMount() {
    this.requestPermission();
    this.getMyLocation();
  }

  getMyLocation = async () => {

    this.setState({loading: true});

    try {

      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: false });
      let lat = location.coords.latitude;
      let lon = location.coords.longitude;

      this.setState({ lat });
      this.setState({ lon });

      await this.setState({loading: false});
      await this.loadBusiness();

    } catch (e) {

      console.log("catch error", e.message);
    }
  }

  loadBusiness = async () => {
    
    this.setState({loading: true});
    
    let lat = this.state.lat; 
    let lon = this.state.lon;
    let price = this.state.price;

    try {

      let params = {
        term: 'restaurants',
        latitude: lat,
        longitude: lon,
        price: price,
        limit: 10
      };

      let response = await api.get('/search', { params });
      let { businesses } = response.data;
      let { total } = response.data;

      this.setState({ jsonData: businesses });
      this.setState({ total: total });

      await this.setState({loading: false});

    } catch (e) {
      console.log('valor', e.message);
    }
  };

  requestPermission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted')
      alert('Você precisa dessa permissão ver os restaurantes próximos de você.');
  };

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
        onPress = { () => {this.props.navigation.navigate("Info", {info: item});}}>
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
    if(this.state.loading) {
      
      if(Platform.OS ==='android')
        return (        
          <View style={styles.infoContainer}>
            <ProgressBarAndroid styleAttr="Large" color="teal" />
          </View>
        );
      else 
        return (
          <View style={styles.infoContainer}>
            <ProgressViewIOS styleAttr="Large" color="teal" />
          </View>  
        );
    
    }else if (this.state.total == 0) {
     
      return (
        <View style={styles.infoContainer}>
          <FontAwesome name={'folder-open'} size={60} color={"#808080"} />
            
          <Text style = {styles.infoText}>
            Os restaurantes da sua cidade ainda não estão cadastrados no Yelp.
          </Text>
        </View>
      )

    }else { 
      
      return (
        
        <View style={styles.container}>
          <Picker style = {styles.pickerPrice} selectedValue = {this.state.price} onValueChange = {this.updatePrice}>     
            <Picker.Item label = "Todos os preços" value = "'1,2,3,4'" />
            <Picker.Item label = "Baixo" value = "1" />
            <Picker.Item label = "Médio" value = "2" />
            <Picker.Item label = "Alto" value = "3" />
            <Picker.Item label = "You rico, man?" value = "4" />
          </Picker>
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