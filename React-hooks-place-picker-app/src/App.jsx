import { useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';
 
const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
  const storedPlaces = storedIds.map((id) => 
  AVAILABLE_PLACES.find((place) => place.id === id)
);
//this code can use implemented as useEffect but here we are not making any callback like we do in fetching locations
//moreover this code does't need to inside the component function because we want it to execute only once so we keep it out.

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

 /*
   Code inside useEffect will execute after the component is rendered.
   It accepts two parameters - a function and dependencies.
   function - the function we want to execute.
   dependencies - an array of values that we want to watch for changes, if dependencies value changes useEffect will re-rerun the code inside.
   here we're leave dependencies as an empty so it will execute only once after the component is rendered.
 */ 
 useEffect(() => {
  /*
  This application sort the place based on short distance from the user so it need the users current location.
  To get the user's current location browsers have a inbuilt function called navigator.geolocation.getCurrentPosition() which will return position object.
  Which will have coord obj with lat and long.  
  */
   navigator.geolocation.getCurrentPosition((position) => {
     const sortedPlaces = sortPlacesByDistance(
       AVAILABLE_PLACES,
       position.coords.latitude,
       position.coords.longitude
     );
     //sortedPlaceDistance function accepts AVAILABLE_PLACES, lat and long and sort the places from shorter to farther distance from the user
     setAvailablePlaces(sortedPlaces);
   });
 }, []); //here we're leave dependencies as an empty so it will execute only once after the component is rendered
//if you see this function is a side effect that it is important for the app but doesn't impact anything else.
//we can use a state to store the sortedPlaces and display it but if you see we set the availablePlace state after the location is fetched.
//when a state is updated the component will be re-rendered so at that time again geolocation fetch function will execute causing an infinite loop.

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
      
    });

    //Here we are trying to store the selected place's id so that we don't lose it when we reload the page using local storage
    //This also a side effect which doesn't required to be executed multiple times
    //but this code is not going to cause infinite loop so we don't need to use useEffect here.
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    if(storedIds.indexOf(id) === -1) { //here we check if the selectedId already exist before storing
      localStorage.setItem(
        'selectedPlaces',
        JSON.stringify([id,...storedIds])
        //here we spread and store the already stored ids along with new id in front
      )
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem('selectedPlaces', JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)))

  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
