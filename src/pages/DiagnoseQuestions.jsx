import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import Spinner from '../components/Spinner';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import mapIcon from '../assets/svg/mapIcon.svg';
import TopBar from '../components/TopBar';
import markerIcon from '../assets/svg/markerIcon.svg';
import HeartDiseaseIcon from '../assets/svg/heartDiseaseIcon.svg';
import LinearProgress from '@mui/material/LinearProgress';
import CloseIcon from '@mui/icons-material/Close';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import InformationCircle from '../assets/svg/infoCircle.svg';
import HealthIconDisease from '../assets/svg/HealthIconDisease.svg';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import RecyclingIcon from '@mui/icons-material/Recycling';
import ScienceIcon from '@mui/icons-material/Science';
import List from '@mui/material/List';
import InfoIcon from '@mui/icons-material/Info';
import profileCircleIcon from '../assets/svg/profileCircleIcon.svg';
import chatbotImage from '../assets/png/chatbot.png';
import 'leaflet/dist/leaflet.css';

function DiagnoseQuestions() {
  const { diagnoseId } = useParams();
  const [expertDiagnose, setExpertDiagnose] = useState(null);
  const [diagnose, setDiagnose] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();
  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [40, 40], // Size of the icon
    iconAnchor: [20, 40], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -40], // Point from which the popup should open relative to the iconAnchor
  });

  const handleOpenModal = (content) => {
    setModalContent(content);
  };

  const handleCloseModal = () => {
    setModalContent(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login'); // Redirect them to login or appropriate page
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    const fetchDiagnoseData = async () => {
      try {
        const expertDocRef = doc(db, 'expertDiagnose', diagnoseId);
        const expertDocSnap = await getDoc(expertDocRef);

        if (expertDocSnap.exists()) {
          const expertData = expertDocSnap.data();
          setExpertDiagnose(expertData);

          const diagnoseDocRef = doc(db, 'diagnoseResponse', expertData.diagnoseId);
          const diagnoseDocSnap = await getDoc(diagnoseDocRef);

          if (diagnoseDocSnap.exists() && diagnoseDocSnap.data().userRef === user.uid) {
            setDiagnose(diagnoseDocSnap.data());
          } else {
            navigate('/error'); // Redirect or handle unauthorized access
          }
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document: ', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDiagnoseData();
    }
  }, [user, navigate, diagnoseId]);

  const probabilityPercent = diagnose ? diagnose.First_Suggested_Disease_Probability * 100 : 0;
  const probabilityPercent2 = diagnose ? diagnose.Second_Suggested_Disease_Probability * 100 : 0;

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <TopBar title={diagnose.Plant_Name} />
      <div className="m-4 mb-32">
        <div className="relative">
          <img
            src={diagnose.imgUrls[0]}
            alt="Diagnose Result"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          <div className="absolute bottom-0 right-1 p-2 bg-black/50 text-white text-sm font-medium rounded-xl">Diagnose Picture</div>
        </div>

        <div className="mt-8 mb-4 items-center flex">
          <img src={mapIcon} alt="Map" className="h-6 w-6" />
          <p className="font-semibold text-green-400 text-xl">Diagnose Location</p>
        </div>

        <MapContainer
          className="w-full h-56 overflow-x-hidden mb-8"
          center={[diagnose.latitude, diagnose.longitude]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
          />

          <Marker
            position={[diagnose.latitude, diagnose.longitude]}
            icon={customIcon}
            eventHandlers={{
              add: (e) => {
                e.target.openPopup();
              },
            }}
          >
            <Popup>{diagnose.address}</Popup>
          </Marker>
        </MapContainer>

        {!diagnose.is_healthy && (
          <>
            <div className="mt-8 mb-4 flex flex-col">
              <div className="mb-4 flex text-center">
                <img src={HealthIconDisease} alt="Map" className="h-6 w-6" />
                <p className="font-semibold text-green-400 text-xl">Diagnose Disease(s)</p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-start justify-between p-4 ">
                  <div className="flex items-center pb-4">
                    <img src={HeartDiseaseIcon} className="h-7 w-7" alt="Heart Disease Icon" />
                    <p className="font-bold text-gray-700 ml-2 text-lg">{diagnose.First_Suggested_Disease_Name}</p>
                    <img src={InformationCircle} className="h-5 w-5 ml-3" alt="Visibility Icon" />
                    <button
                      onClick={() =>
                        handleOpenModal(
                          <>
                            <div className="flex items-center">
                              <InfoIcon style={{ color: '#10B981' }} />
                              <p className="text-gray-700 font-bold text-xl ml-2">Disease Description</p>
                            </div>
                            <div className="flex">
                              <p className="text-gray-600 font-semibold text-l p-4 ">{diagnose.First_Suggested_Disease_Description}</p>
                            </div>
                            <div className="flex mt-2 items-center">
                              <LightbulbIcon style={{ color: '#10B981' }} />
                              <p className="text-gray-700 font-bold text-xl ml-2">Prevention Tips</p>
                            </div>
                            <div className="p-4 flex font-semibold text-gray-600 ">
                              <List sx={{ pl: 0 }}>
                                {diagnose.First_Suggested_Disease_Treatment.prevention.map((tip, index) => (
                                  <ListItem
                                    key={index}
                                    sx={{
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
                                      },
                                    }}
                                  >
                                    {tip}
                                  </ListItem>
                                ))}
                              </List>
                            </div>
                          </>
                        )
                      }
                      className="font-semibold text-gray-600 text-sm ml-1 mr-5"
                    >
                      Details
                    </button>
                    <LocalHospitalIcon className="-ml-2" />
                    <button
                      onClick={() =>
                        handleOpenModal(
                          <>
                            {diagnose.First_Suggested_Disease_Treatment.biological && (
                              <>
                                <div className="flex items-center -ml-2">
                                  <RecyclingIcon />
                                  <p className="ml-2 text-xl font-bold text-green-500">Biological Treatment</p>
                                </div>
                                <ul>
                                  {diagnose.First_Suggested_Disease_Treatment.biological.map((treatment, index) => (
                                    <ListItem
                                      key={index}
                                      sx={{
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
                                        },
                                      }}
                                    >
                                      {treatment}
                                    </ListItem>
                                  ))}
                                </ul>
                              </>
                            )}
                            {diagnose.First_Suggested_Disease_Treatment.chemical && (
                              <>
                                <div className="flex items-center -ml-2 mt-2">
                                  <ScienceIcon />
                                  <p className="ml-2 text-xl font-bold text-green-500">Chemical Treatment</p>
                                </div>
                                <ul>
                                  {diagnose.First_Suggested_Disease_Treatment.chemical.map((treatment, index) => (
                                    <ListItem
                                      key={index}
                                      sx={{
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
                                        },
                                      }}
                                    >
                                      {treatment}
                                    </ListItem>
                                  ))}
                                </ul>
                              </>
                            )}
                          </>
                        )
                      }
                      className="font-semibold text-gray-600 text-sm ml-1 mr-5"
                    >
                      Treatment
                    </button>
                    <Modal
                      open={modalContent !== null}
                      onClose={handleCloseModal}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: 'auto',
                          maxWidth: '90%',
                          maxHeight: '90vh',
                          bgcolor: 'background.paper',
                          boxShadow: 24,
                          p: 4,
                          overflowY: 'auto',
                        }}
                      >
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
                          {modalContent}
                        </Typography>
                      </Box>
                    </Modal>
                  </div>
                  <div className="card p-4 self-stretch">
                    <Box display="flex" alignItems="center">
                      <Box width="100%" mr={1}>
                        <LinearProgress
                          variant="determinate"
                          value={probabilityPercent}
                          sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#EF4444' } }}
                        />
                      </Box>
                      <Box minWidth={35}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
                          {`${Math.round(probabilityPercent)}%`}
                        </Typography>
                      </Box>
                    </Box>
                  </div>
                </div>

                {diagnose.Second_Suggested_Disease_Name && (
                  <div className="flex flex-col items-start justify-between p-4 ">
                    <div className="flex items-center pb-4">
                      <img src={HeartDiseaseIcon} className="h-7 w-7" alt="Heart Disease Icon" />
                      <p className="font-bold text-gray-700 ml-2 text-lg">{diagnose.Second_Suggested_Disease_Name}</p>
                      <img src={InformationCircle} className="h-5 w-5 ml-3" alt="Visibility Icon" />
                      <button
                        onClick={() =>
                          handleOpenModal(
                            <>
                              <div className="flex items-center">
                                <InfoIcon style={{ color: '#10B981' }} />
                                <p className="text-gray-700 font-bold text-xl ml-2">Disease Description</p>
                              </div>
                              <div className="flex">
                                <p className="text-gray-600 font-semibold text-l p-4 ">{diagnose.Second_Suggested_Disease_Description}</p>
                              </div>
                              <div className="flex mt-2 items-center">
                                <LightbulbIcon style={{ color: '#10B981' }} />
                                <p className="text-gray-700 font-bold text-xl ml-2">Prevention Tips</p>
                              </div>
                              <div className="p-4 flex font-semibold text-gray-600 ">
                                <List sx={{ pl: 0 }}>
                                  {diagnose.Second_Suggested_Disease_Treatment.prevention.map((tip, index) => (
                                    <ListItem
                                      key={index}
                                      sx={{
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
                                        },
                                      }}
                                    >
                                      {tip}
                                    </ListItem>
                                  ))}
                                </List>
                              </div>
                            </>
                          )
                        }
                        className="font-semibold text-gray-600 text-sm ml-1 mr-5"
                      >
                        Details
                      </button>
                      <LocalHospitalIcon />
                      <button
                        onClick={() =>
                          handleOpenModal(
                            <>
                              {diagnose.Second_Suggested_Disease_Treatment.biological && (
                                <>
                                  <div className="flex items-center -ml-2">
                                    <RecyclingIcon />
                                    <p className="ml-2 text-xl font-bold text-green-500">Biological Treatment</p>
                                  </div>
                                  <ul>
                                    {diagnose.Second_Suggested_Disease_Treatment.biological.map((treatment, index) => (
                                      <ListItem
                                        key={index}
                                        sx={{
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
                                          },
                                        }}
                                      >
                                        {treatment}
                                      </ListItem>
                                    ))}
                                  </ul>
                                </>
                              )}
                              {diagnose.Second_Suggested_Disease_Treatment.chemical && (
                                <>
                                  <div className="flex items-center -ml-2 mt-2">
                                    <ScienceIcon />
                                    <p className="ml-2 text-xl font-bold text-green-500">Chemical Treatment</p>
                                  </div>
                                  <ul>
                                    {diagnose.Second_Suggested_Disease_Treatment.chemical.map((treatment, index) => (
                                      <ListItem
                                        key={index}
                                        sx={{
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
                                          },
                                        }}
                                      >
                                        {treatment}
                                      </ListItem>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </>
                          )
                        }
                        className="font-semibold text-gray-600 text-sm ml-1 mr-5"
                      >
                        Treatment
                      </button>
                      <Modal
                        open={modalContent !== null}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 'auto',
                            maxWidth: '90%',
                            maxHeight: '90vh',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            overflowY: 'auto',
                          }}
                        >
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
                            {modalContent}
                          </Typography>
                        </Box>
                      </Modal>
                    </div>
                    <div className="card p-4 self-stretch ">
                      <Box display="flex" alignItems="center">
                        <Box width="100%" mr={1}>
                          <LinearProgress
                            variant="determinate"
                            value={probabilityPercent2}
                            sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#F59E0B' } }}
                          />
                        </Box>
                        <Box minWidth={35}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
                            {`${Math.round(probabilityPercent2)}%`}
                          </Typography>
                        </Box>
                      </Box>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        <div className="flex items-center pt-5 ml-6 mb-3">
          <img src={profileCircleIcon} alt="profileCircle" className="h-6 w-6" />
          <p className="ml-2 text-xl font-bold text-gray-700">ChatBot Support</p>
        </div>
        <div className="mt-4 ml-6">
          <div className="flex flex-col">
            <div className="flex items-center">
              <img src={chatbotImage} alt="chatbot" className="h-20 w-20 rounded-xl" />
              <div className="ml-4">
                <p className="text-md font-medium text-gray-700">1-on-1 Direct Chat with our ChatBot</p>
                <p className="text-sm text-gray-500 mr-4">Get expert care tips for your plant's specific needs</p>
              </div>
            </div>
            <div className="pl-4 pr-4">
              <Link to={`/chatbot/${diagnoseId}`}>
                <button className="btn btn-white mt-4 font-bold rounded-xl border-green-600 bg-white text-green-600 w-full">
                  Ask Chatbot
                </button>
              </Link>
            </div>
            <div className="pl-4 pr-4">
              <Link to={`/expert/${diagnoseId}`}>
                <button className="btn btn-white mt-4 font-bold rounded-xl border-green-600 bg-white text-green-600 w-full">
                  Ask Experts
                </button>
              </Link>
            </div>
          </div>
        </div>
        {expertDiagnose && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Expert Questions and Answers</h2>
            <ul>
              <li>Plant Type: {expertDiagnose.plantType}</li>
              <li>Plant Age: {expertDiagnose.plantAge}</li>
              <li>Location: {expertDiagnose.location}</li>
              <li>Watering Frequency: {expertDiagnose.wateringFrequency}</li>
              <li>Soil Type: {expertDiagnose.soilType}</li>
              <li>Discoloration: {expertDiagnose.discoloration}</li>
              <li>Pests: {expertDiagnose.pests}</li>
              <li>Location Change: {expertDiagnose.locationChange}</li>
              <li>Fertilizers: {expertDiagnose.fertilizers}</li>
              <li>Weather Changes: {expertDiagnose.weatherChanges}</li>
              <li>Unusual Growth: {expertDiagnose.unusualGrowth}</li>
              <li>Pruning: {expertDiagnose.pruning}</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default DiagnoseQuestions;
