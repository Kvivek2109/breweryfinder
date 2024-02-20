import { useEffect, useState } from 'react';
import { Brewery } from './details';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Home.css';
import axios from "axios";
import { chevronBack, chevronForward } from 'ionicons/icons';

const Home: React.FC = () => {

  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    getBreweries(pageNum);
  }, []);

  function getBreweries(num: number) {
    axios.get("https://api.openbrewerydb.org/v1/breweries?page="+num+"&per_page=10").then(
    (theResponse) => {
      setBreweries(theResponse.data);
    })
    .catch(error =>
      console.error(error)
    );
  }

  function handlePrevPage() {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
    getBreweries(pageNum);
  }

  function handleNextPage() {
      setPageNum(pageNum + 1);
    getBreweries(pageNum);
  }

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle color='#03045eff' size='large' >Breweries</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen> 
        <IonList className='list-wrapper' inset={true} lines="inset">
          {breweries.map((brewery:{name:string, id:string}, index:number ) => (
          <IonItem className='list-item' routerLink={`/breweries/${brewery.id}`} key={brewery.id} detail={false}>
            <IonLabel>{brewery.name}</IonLabel>
          </IonItem>
          ) )}
        </IonList>
      </IonContent>
      <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" onClick={handlePrevPage}>
            <IonIcon aria-hidden="true" icon={chevronBack} />
          </IonTabButton>
          <IonTabButton tab='tab2'>
            <IonLabel color='#03045eff'>{pageNum}</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" onClick={handleNextPage}>
            <IonIcon aria-hidden="true" icon={chevronForward} />
          </IonTabButton>
        </IonTabBar>
    </IonPage>
  );
};

export default Home;
