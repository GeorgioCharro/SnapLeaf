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
import  HeartDiseaseIcon  from '../assets/svg/heartDiseaseIcon.svg';
import LinearProgress from '@mui/material/LinearProgress';
import CloseIcon from '@mui/icons-material/Close';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import InformationCircle from '../assets/svg/infoCircle.svg'
import  HealthIconDisease from '../assets/svg/HealthIconDisease.svg'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import InfoIcon from '@mui/icons-material/Info'

import 'leaflet/dist/leaflet.css';
function DiagnoseResult() {

    const [diagnose, setDiagnose] = useState(null)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDisease, setCurrentDisease] = useState(null);
    const handleOpenModal = (diseaseKey) => {setCurrentDisease(diseaseKey)}
    const handleCloseModal = () => {setCurrentDisease(null);}
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
    const probabilityPercent = diagnose ? diagnose.First_Suggested_Disease_Probability * 100 : 0;
    const probabilityPercent2 = diagnose ? diagnose.Second_Suggested_Disease_Probability * 100 : 0;
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
        <p className='font-semibold text-green-400 text-xl'>Diagnose Location</p>
        
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
            

          {!diagnose.is_healthy && (
  <>
    <div className='mt-8 mb-4 flex flex-col'>
      <div className='mb-4 flex text-center'>
        <img src={HealthIconDisease} alt="Map" className='h-6 w-6' />
        <p className='font-semibold text-green-400 text-xl'>Diagnose Disease(s)</p>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex flex-col items-start justify-between p-4 '>
          <div className='flex items-center pb-4'>
            <img src={HeartDiseaseIcon} className='h-7 w-7' alt="Heart Disease Icon" />
            <p className='font-bold text-gray-700 ml-2 text-lg'>{diagnose.First_Suggested_Disease_Name}</p>
            <img src={InformationCircle} className='h-5 w-5 ml-3' alt="Visibility Icon" />
            <button onClick={() => handleOpenModal('first')} className="font-semibold text-gray-600 text-sm ml-1 mr-5">
              
                 Details 
               </button>
               <LocalHospitalIcon className='-ml-2' />
               <button onClick={() => handleOpenModal('firstTreatment')} className="font-semibold text-gray-600 text-sm ml-1 mr-5">
              
                 Treatment
               </button>
               <Modal
          open={currentDisease !==null}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto', // Adjust width as needed or set a specific value
            maxWidth: '90%', // Prevents the modal from being too wide on small screens
            maxHeight: '90vh', // Limits the modal's height to 90% of the viewport height
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            overflowY: 'auto', // Enables scroll for content that exceeds the modal's height
          }}>
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Details
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {currentDisease === 'first'}
            </Typography>
          </Box>
        </Modal>     
          </div>
          <div className='card  p-4 self-stretch'>
            <Box display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" value={probabilityPercent} sx={{'& .MuiLinearProgress-bar': { backgroundColor: '#EF4444' }, }} />
              </Box>
              <Box minWidth={35}>
                <Typography variant="body2" sx={{fontWeight:'bold',color:'black'}}>{`${Math.round(probabilityPercent)}%`}</Typography>
              </Box>
            </Box>
          </div>
          
        </div>

        {diagnose.Second_Suggested_Disease_Name && (
          <div className='flex flex-col items-start justify-between  p-4 '>
            <div className='flex items-center pb-4'>
              <img src={HeartDiseaseIcon} className='h-7 w-7' alt="Heart Disease Icon" />
              <p className='font-bold text-gray-700 ml-2 text-lg'>{diagnose.Second_Suggested_Disease_Name}</p>
              <img src={InformationCircle} className='h-5 w-5 ml-3' alt="Visibility Icon" />
              <button onClick={() => handleOpenModal('second')} className="font-semibold text-gray-600 text-sm ml-1 mr-5">
                 Details
               </button>
               <Modal
          open={currentDisease !== null}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto', // Adjust width as needed or set a specific value
            maxWidth: '90%', // Prevents the modal from being too wide on small screens
            maxHeight: '90vh', // Limits the modal's height to 90% of the viewport height
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            overflowY: 'auto', // Enables scroll for content that exceeds the modal's height
          }}>
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Details
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {/* Here you can place the content or details you want to show in the modal */}
              {currentDisease === 'first' ? (<><div className='flex items-center'>
                <InfoIcon style={{color:'#10B981'}} />
                <p className='text-gray-700 font-bold text-xl ml-2'>Disease Description</p>
                



              </div>
              <div className='flex'>

              <p className='text-gray-600 font-semibold text-l p-4 '>{diagnose.First_Suggested_Disease_Description}</p>

              </div>

              <div className="flex  mt-2 items-center">

              <LightbulbIcon style={{color:'#10B981'}}  />
              <p className='text-gray-700 font-bold text-xl ml-2'>Prevention Tips</p>
              </div>
              <div className='p-4 flex font-semibold text-gray-600 '>
              <List sx={{ pl: 0 }}>
  {diagnose.First_Suggested_Disease_Treatment.prevention.map((tip, index) => (
    <ListItem key={index} sx={{
      position: 'relative',
      pl: '20px',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        height: '10px',
        width: '10px',
        borderRadius: '50%',
        backgroundColor: '#10B981',
      }
    }}>
      {tip}
    </ListItem>
  ))}
</List>
                
              </div>

              

              </>) : <><div className='flex items-center'>
                <InfoIcon style={{color:'#10B981'}} />
                <p className='text-gray-700 font-bold text-xl ml-2'>Disease Description</p>
                



              </div>
              <div className='flex'>

              <p className='text-gray-600 font-semibold text-l p-4 '>{diagnose.Second_Suggested_Disease_Description}</p>

              </div>

              <div className="flex  mt-2 items-center">

              <LightbulbIcon style={{color:'#10B981'}}  />
              <p className='text-gray-700 font-bold text-xl ml-2'>Prevention Tips</p>
              </div>
              <div className='p-4 flex font-semibold text-gray-600 '>
              <List sx={{ pl: 0 }}>
  {diagnose.Second_Suggested_Disease_Treatment.prevention.map((tip, index) => (
    <ListItem key={index} sx={{
      position: 'relative',
      pl: '20px',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        height: '10px',
        width: '10px',
        borderRadius: '50%',
        backgroundColor: '#10B981',
      }
    }}>
      {tip}
    </ListItem>
  ))}
</List>
                
              </div>

              

              </>}
            </Typography>
          </Box>
        </Modal>      
            </div>
            <div className='card  p-4 self-stretch '>
              <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                  <LinearProgress variant="determinate" value={probabilityPercent2} sx={{'& .MuiLinearProgress-bar': { backgroundColor: '#F59E0B' }, }}  />
                </Box>
                <Box minWidth={35}>
                  <Typography variant="body2" sx={{fontWeight:'bold',color:'black'}}>{`${Math.round(probabilityPercent2)}%`}</Typography>
                </Box>
              </Box>
            </div>
          </div>
        )}
      </div>
    </div>
  </>
)}

    </div>
    
    </>
  )
}

export default DiagnoseResult
   