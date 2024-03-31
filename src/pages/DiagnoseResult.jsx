import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import mapIcon from '../assets/svg/mapIcon.svg'
import TopBar from '../components/TopBar'
import markerIcon from '../assets/svg/markerIcon.svg'
import 'leaflet/dist/leaflet.css';
function DiagnoseResult() {

    const [diagnose, setDiagnose] = useState(null)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null);
    const params=useParams()
    const auth=getAuth()
    const navigate=useNavigate()
    const customIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [40, 40], // Size of the icon
        iconAnchor: [20, 40], // Point of the icon which will correspond to marker's location
        popupAnchor: [0, -40], // Point from which the popup should open relative to the iconAnchor
      });
    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                // User not logged in or session expired
                navigate('/login'); // Redirect them to login or appropriate page
            }
        });

        return () => unsubscribe(); // Cleanup the subscription
    }, [auth, navigate]);

    useEffect(() => {
        const fetchDiagnose = async () => {
            if (user) { // Only proceed if there's a user
                const docRef = doc(db, 'diagnoseResponse', params.diagnoseId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists() && docSnap.data().userRef === user.uid) {
                    setDiagnose(docSnap.data());
                } else {
                    navigate('/error'); // Redirect or handle unauthorized access
                }
                setLoading(false);
            }
        };
        if (user) {
            fetchDiagnose();
            
        }
    }, [user, navigate, params.diagnoseId]);

    if(loading){
        return <Spinner />
    }

  return (
    <>
    <TopBar title={diagnose.Plant_Name} />
    <div className='m-4 mb-32'>
      
      
        <div className='relative'>
      <img 
             src={diagnose.imgUrls[0]} 
             alt="Diagnose Result" 
             className="w-full h-auto object-cover rounded-lg shadow-lg" // TailwindCSS classes for full width, auto height, cover object fit, rounded corners, and shadow
            />
        <div className="absolute bottom-0 right-1 p-2 bg-black/50 text-white text-sm font-medium rounded-xl">Diagnose Picture</div>
        </div>
      

     <div className='mt-8 mb-4 items-center flex'>
        <img src={mapIcon} alt="Map" className='h-6 w-6' />
        <p className='font-semibold text-gray-700 text-lg'>Diagnose Location</p>
        
     </div>

     <MapContainer
            
            className='w-full h-56 overflow-x-hidden mb-8'
            center={[diagnose.latitude, diagnose.longitude]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            />

            <Marker
              position={[diagnose.latitude, diagnose.longitude]}
              icon={customIcon}
              eventHandlers={{
                add: (e) => {
                  e.target.openPopup();
                }
              }}
            >
              <Popup>{diagnose.address}</Popup>
            </Marker>
          </MapContainer>

    </div>
    
    </>
  )
}

export default DiagnoseResult
   