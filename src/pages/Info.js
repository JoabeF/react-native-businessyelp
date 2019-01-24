import React from 'react';
import {
  Linking, 
  Clipboard,
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Text, 
  View,
  AsyncStorage 
} from 'react-native';
import styles from '../styles/infostyles';
import { Location } from 'expo';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Star from 'react-native-star-view';
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default class App extends React.Component {

  state = {
    location: null,
    lat: 0.0,
    lon: 0.0,
  }

  componentDidMount() {
    this.getMyLocation();
    this.addPlace();
  }

  getMyLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: false });

      let lat = location.coords.latitude;
      let lon = location.coords.longitude;

      this.setState({ location });
      this.setState({ lat });
      this.setState({ lon });

    } catch (e) {

      console.log("catch error", e.message);
    }
  }

  addPlace = async () => {

    const existingPlaces = await AsyncStorage.getItem('places')
    let places = JSON.parse(existingPlaces);
    let newPlace = this.props.navigation.state.params.info;
    const { id } = newPlace; 

    if( !places ){
      places = []
    }
    
    if (places.length > 10)
      this.delPlace(places);

    if(this.lookup(places, id)) { // o lugar já está salvo nos históricos.
      return;

    }else {
      places.unshift(newPlace);
      
      await AsyncStorage.setItem('places', JSON.stringify(places) )
      .then( ()=>{
        console.log('Salvou direitinho!')
      })
      .catch( ()=>{
        console.log('Algo deu errado ao salvar o lugar')
      });
    }  
  }

  delPlace = async (places) => {

    places.pop();
    console.log("F1: ", places);

    await AsyncStorage.setItem('places', JSON.stringify(places))
    .then(() => {
        console.log('Salvou direitinho!')
    })
    .catch(() => {
        console.log('Algo deu errado ao salvar o lugar')
    });
  }

  lookup( places, id ) { // só serão no maximo 10 pesquisas.
    for(let i = 0, len = places.length; i < len; i++) {
        if( places[ i ].id === id )
            return true;
    }
    return false;
  }
  
  writeToClipboard = async (text) => {
    await Clipboard.setString(text);
  };
  
  render() {

    const item = this.props.navigation.state.params.info;
    let lat = parseFloat(this.state.lat);
    let lon = parseFloat(this.state.lon);

    let price = '';
    let colorPrice = '';
    let status = '';

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

    if (item.is_closed)
      status = 'Fechado';
    else
      status = 'Aberto';

    return (
      <View style={styles.container}>

        <ScrollView>

          <MapView style={styles.mapstyle}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            region={{
              latitude: lat,
              longitude: lon,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02
            }}>
            <Marker
              coordinate={{
                latitude: item.coordinates.latitude,
                longitude: item.coordinates.longitude,
              }}
              title={item.name}
            ></Marker>

          </MapView>

          <View style={styles.infoContainer}>
            <View style={styles.head}>
              <Image source={{ uri: item.image_url }} style={styles.itemImage} />

              <View style={styles.textContainer}>
                <Text style={styles.itemName}>{item.name}</Text>

                <View style={styles.content1}>
                  <Star score={item.rating} style={styles.itemStar} />

                  <Text style={styles.itemPrice}><FontAwesome name={'dollar'} size={18} color={colorPrice} />
                    {price}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.itemMoreInfo}>
              <FontAwesome style={styles.iconStyle} name={'glass'} size={18} color={'#DDD'} />
              {" " + status} </Text>

            <Text style={styles.itemMoreInfo}>
              <FontAwesome style={styles.iconStyle} name={'map-marker'} size={18} color={'tomato'} />
              {" " + item.location.address1} </Text>

            <TouchableOpacity onPress={() => this.writeToClipboard(item.phone)}>
              <Text style={styles.itemMoreInfoLink}>
                <FontAwesome name={'phone'} size={18} color={'darkslategrey'} />
                {" " + item.phone}</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <Text style={styles.itemMoreInfoLink}>
                <FontAwesome name={'globe'} size={18} color={'cadetblue'} />
                  {" " + 'Visitar página web'}
              </Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </View>

    );
  }
}