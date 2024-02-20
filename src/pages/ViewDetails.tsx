import { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { callOutline, globeOutline, mapOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import './ViewDetails.css';
import axios from "axios";
import { Brewery } from './details';

const ViewDetails: React.FC = () => {
  const [brewery, setBrewery] = useState<Brewery|null>(null);
  const { id } = useParams<{ id: string; }>();

  useEffect(() => {
    getBreweryById();
  }, []);

  function getBreweryById() {
    axios.get("https://api.openbrewerydb.org/v1/breweries/"+id).then(
    (theResponse) => {
      setBrewery(theResponse.data);
    })
    .catch(error =>
      console.error(error)
    );
  }

  return (
    <IonPage id="view-details-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Brewery Details" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {brewery ? (
          <>
            <IonItem>
              <IonTitle>{brewery.name}</IonTitle>
            </IonItem>
            <IonItem>
              <IonLabel>Brewery Type: {brewery.brewery_type}</IonLabel>
            </IonItem>
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle className='ion-text-center'>Address:</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                {brewery.street},<br/>
                {brewery.city}, {brewery.state},<br/>
                {brewery.country}, {brewery.postal_code}.
              </IonCardContent>
              <IonButton expand='block' fill='outline' href={`https://www.google.com/maps/place/${brewery.street},${brewery.city},${brewery.state},${brewery.country}`}>Search on Google Map</IonButton>
            </IonCard>
            <IonItem>
              <IonIcon icon={callOutline} slot="start" />
              <a href={`tel:${brewery.phone}`}>{brewery.phone}</a>
            </IonItem>
            <IonItem>
              <IonIcon icon={globeOutline} slot="start" />
              <a href={brewery.website_url}>{brewery.website_url}</a>
            </IonItem>
            <IonItem>
              <IonIcon icon={mapOutline} slot="start" />
              <a href={`http://www.google.com/maps/place/${brewery.latitude},${brewery.longitude}`} >Go to Location</a>
            </IonItem>
          </>
        ) : (
          <div>Details not found
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewDetails;
