import { useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData(); //using useLoader hook we can access the data loaded during the routing and use it to render the component

  // if(data.isError) {
  //   return <p>{data.message}</p>
  // }
  const events = data.events; //when we use  useLoader data we can get the response directly and from that we can get the data we wanted

  // const [isLoading, setIsLoading] = useState(false);
  // const [fetchedEvents, setFetchedEvents] = useState();
  // const [error, setError] = useState();

  // useEffect(() => {
  //   async function fetchEvents() {
  //     setIsLoading(true);

  //     setIsLoading(false);
  //   }

  //   fetchEvents();
  // }, []); 


  //Here the data will be fetched after the component is rendered completely which is not an optimal idea if we are building complex component
  // to evade that we can use react router to fetch the data while we navigate to the specific route before rendering the component
  return (
    <>
      {/* <div style={{ textAlign: 'center' }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div> */}
      {/* {!isLoading && fetchedEvents && */}<EventsList events={events} />
    </>
  );
}

export default EventsPage;

export async function loader() {
  const response = await fetch('https://sturdy-fortnight-4g55rg9rvg735x6r-8080.app.github.dev/eventsss');

  if (!response.ok) {
    // setError('Fetching events failed.');
    // return {isError: true, message: 'Could not fetch events'}; //here we are returning the response with a custom error object with which we can handle error in UI
    throw { message: 'Could not fetch events'}; //instead of the above method, we can also throw error, which will be caught and handled by the closest errorElement of react router
    //the error will bubble up from lower to higher level, if it's finds a error element it will hand
  } else {
    // const resData = await response.json();
    // setFetchedEvents(resData.events);
    return response;
  }
}