import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { CameraIcon, EyeDropperIcon } from '@heroicons/react/24/outline';
import curserIcon from '../assets/svg/cursorIcon.svg';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import axios from "axios";
import AddBoxIcon from '@mui/icons-material/AddBox';

const libraries = ['places'];
const autocompleteOptions = {
  componentRestrictions: { country: ['LB'] },
  types: ['(cities)']
};
const diagnose_key = process.env.REACT_APP_DIAGNOSE_KEY;


function Diagnose() {
  const fileInputRef = useRef(null);
  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);
  const [loading, setLoading] = useState(false);
  
  const [inputAdress, setInputAdress] = useState('');

  const [formData, setFormData] = useState({
    images: {},
    latitude: 0,
    longitude: 0,
    address: ''
  });

  const { images, latitude, longitude, address } = formData;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GEOCODE_API_KEY}`, // Replace with your API key
    libraries,
  });
  const autocompleteRef = useRef(null);
  

  const handlePlaceChanged = () => {
    if (autocompleteRef.current && typeof autocompleteRef.current.getPlace === 'function') {
      const place = autocompleteRef.current.getPlace();
      
      // Check if the place has a geometry property
      if (place.geometry) {
        const address = place.formatted_address;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        // Update formData state with the new address, latitude, and longitude
        setFormData(prevState => ({
          ...prevState,
          address,
          latitude: lat,
          longitude: lng
        }));

        // Optionally, update any other state that depends on the place selection, e.g., setAddress for UI display
        
        
      } else {
        // Handle cases where no geometry is found (optional)
        toast.error('Location does not have a geometry');
      }
    }
  };

  const handleInputChange = (e) => {
    setInputAdress(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (inputAdress.length !== 0 && (latitude === 0 || longitude === 0)) {
      toast.error('Please enter a valid location');
      return;
    }

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, 'images/' + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      console.error('Error uploading images:', error);
      setLoading(false);
      toast.error('Images not uploaded');
      return [];
    });

    const validImgUrls = imgUrls.filter(url => url !== undefined);

    if (validImgUrls.length === 0) {
      // If no valid image URLs, do not proceed with adding the document
      toast.error('No valid image URLs. Cannot save listing.');
      return;
    }

    const formDataCopy = {
      ...formData,
      imgUrls,
    };

    delete formDataCopy.images;

    if (imgUrls.length > 0) {
      const payload = {
        img_url: imgUrls[0], // Or however you want to select the image URL
        longitude: longitude,
        latitude: latitude
      };

      try {
        const response = await axios.post('/plant', payload, {
          headers: {
            'x-api-key': diagnose_key,
            'user': auth.currentUser.uid,
          },
        });

        console.log(response.data);

        if (response.data.is_plant === false) {
          toast.error('The image you provided is not a plant.');
          setLoading(false);
          return;
        }

        const diagnoseResponseData = {
          ...response.data,
          imgUrls,
          timestamp: serverTimestamp(),
          userRef: auth.currentUser.uid,
          address,
          latitude,
          longitude
        };

        const docRef = await addDoc(collection(db, 'diagnoseResponse'), diagnoseResponseData);

        toast.success('Listing saved');
        navigate(`/my-plants/${docRef.id}`);
      } catch (error) {
        console.error('Error Submitting data', error);
        toast.error('Failed to submit data');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('No images provided.');
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    // When the button is clicked, trigger the file input click event
    fileInputRef.current.click();
  };

  const onChange = (e) => {
    let boolean = null;

    if (e.target.value === 'true') {
      boolean = true;
    }
    if (e.target.value === 'false') {
      boolean = false;
    }

    if (e.target.files.length > 3) {
      toast.error("You can only select up to 3 images.");
      return;
    }

    // Files
    if (e.target.files && e.target.files.length !== 0) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate('/sign-in');
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  if (loading) {
    return <Spinner />;
  }

  if (!isLoaded) {
    return <Spinner />;
  }

  return (
    <>
      <div className="fixed flex-col top-4 right-4 flex items-center">
        <Link to="/my-diagnose">
          <AddBoxIcon style={{ fontSize: 30, color: 'green' }} />
        </Link>
        <p className="text-sm text-center">Diagnose History</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="m-8">
          <div className="flex justify-center items-center flex-col">
            <div>
              <input
                ref={fileInputRef}
                type="file"
                id="images"
                accept=".jpg,.png,.jpeg"
                multiple
                required
                className="hidden"
                onChange={onChange}
              />
              <button
                type="button"
                onClick={handleButtonClick}
                className="btn flex items-center border-green-500"
              >
                <CameraIcon className="h-7 w-7 text-green-500" />
                <p className="text-xl ml-2">Diagnose</p>
              </button>
            </div>

            {formData.images && formData.images.length > 0 && (
              <div className="mt-4">
                <p className="text-md flex justify-center m-4 font-semibold">Chosen Pictures:</p>
                <div className="flex flex-wrap justify-center">
                  {Array.from(formData.images).map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      className="avatar w-24 rounded"
                      onLoad={() => URL.revokeObjectURL(file)}
                    />
                  ))}
                </div>
                <div className="justify-center flex">
                  <Autocomplete
                    onLoad={(autocomplete) => { autocompleteRef.current = autocomplete; }}
                    onPlaceChanged={handlePlaceChanged}
                    options={autocompleteOptions}
                  >
                    <label className="form-control w-full mt-2 max-w-xs block mb-4">
                      <div className="label flex justify-between">
                        <span className="label-text font-bold mr-5">Location of the diagnose</span>
                        <span className="label-text-alt">(Optional)</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Zahle"
                        id="address"
                        onChange={handleInputChange}
                        className="input border-green-500 input-bordered w-full max-w-xs mb-2"
                      />
                      <div className="label flex justify-between">
                        <span className="label-text-alt text-sm text-gray-500"></span>
                        <span className="label-text-alt text-gray-600 text-sm flex">
                          Why is it important?
                          <img src={curserIcon} className="h-5 w-5 text-green-500" alt="Click" />
                        </span>
                      </div>
                    </label>
                  </Autocomplete>
                </div>

                <div className="flex justify-center">
                  <button type="submit" className="btn flex items-center border-green-500">
                    <EyeDropperIcon className="h-7 w-7 text-green-500" />
                    <p className="text-xl ml-2">Submit</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default Diagnose;
