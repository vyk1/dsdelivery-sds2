import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import AsyncSelect from 'react-select/async';
import api, { MB_TOKEN } from './api';

import './styles.css'
import { OrderLocationData } from './types';

const initialPos = {
  lat: -23.56168,
  lng: -46.656139
}

type Place = {
  label?: string;
  value?: string;
  position: {
    lat: number;
    lng: number;
  };
}

type Props = {
  onChangeLocation: (location: OrderLocationData) => void
}

export default function OrderLocation({ onChangeLocation }: Props) {

  const [address, setAddress] = useState<Place>({
    position: initialPos
  });

  useEffect(() => {
  }, []);

  const loadOptions = async (inputValue: string, callback: (places: Place[]) => void) => {
    const response = await api.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?access_token=${MB_TOKEN}`
    );

    const places = response.data.features.map((item: any) => {
      return ({
        label: item.place_name,
        value: item.place_name,
        position: {
          lat: item.center[1],
          lng: item.center[0]
        },
        // place: item.place_name,
      });
    });

    callback(places);
  };

  const handleChangeSelect = (place: Place) => {
    setAddress(place);
    onChangeLocation({
      latitude: place.position.lat,
      longitude: place.position.lng,
      // exclamação no final para definiir que virá definido
      address: place.label!
    });
  };

  return (
    <div className="order-location-container">
      <div className="order-location-content">
        <h3 className="order-location-title">Selecione onde o pedido deve ser entregue:</h3>
        <div className="order-filter-container">
          <AsyncSelect
            placeholder="Digite o endereço para a entrega do pedido"
            clasname="filter"
            loadOptions={loadOptions}
            onChange={val => handleChangeSelect(val as Place)}
          />
        </div>
        <MapContainer
          // manter unicidade e recarregar o componente
          key={address.position.lat}
          center={address.position} zoom={13} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={address.position}>
            <Popup>
              Marcado
              </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}