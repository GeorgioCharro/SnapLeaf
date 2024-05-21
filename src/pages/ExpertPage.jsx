import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

function ExpertPage() {
  const { diagnoseId } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();
  const [formData, setFormData] = useState({
    plantType: '',
    plantAge: '',
    location: '',
    wateringFrequency: '',
    soilType: '',
    discoloration: '',
    pests: '',
    locationChange: '',
    fertilizers: '',
    weatherChanges: '',
    unusualGrowth: '',
    pruning: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'expertDiagnose', diagnoseId);
        await setDoc(docRef, { ...formData, userRef: user.uid, diagnoseId });
        toast.success('Data saved successfully!');
        navigate('/');
      }
    } catch (error) {
      toast.error('Error saving data: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 mb-32">
      
      <h1 className="text-2xl font-bold mb-4">Expert Diagnosis</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="plantType" className="block font-medium">What type of plant are you trying to diagnose (e.g., indoor houseplant, garden plant, tree)?</label>
          <input type="text" id="plantType" value={formData.plantType} onChange={handleChange} required className="border rounded-lg p-2 w-full" />
        </div>
        <div>
          <label htmlFor="plantAge" className="block font-medium">How old is the plant?</label>
          <input type="text" id="plantAge" value={formData.plantAge} onChange={handleChange} required className="border rounded-lg p-2 w-full" />
        </div>
        <div>
          <label htmlFor="location" className="block font-medium">What is the plant’s current location (e.g., indoors, outdoors, in direct sunlight)?</label>
          <input type="text" id="location" value={formData.location} onChange={handleChange} required className="border rounded-lg p-2 w-full" />
        </div>
        <div>
          <label htmlFor="wateringFrequency" className="block font-medium">How often do you water the plant?</label>
          <input type="text" id="wateringFrequency" value={formData.wateringFrequency} onChange={handleChange} required className="border rounded-lg p-2 w-full" />
        </div>
        <div>
          <label htmlFor="soilType" className="block font-medium">What type of soil is the plant in (e.g., potting mix, garden soil, sandy soil)?</label>
          <input type="text" id="soilType" value={formData.soilType} onChange={handleChange} required className="border rounded-lg p-2 w-full" />
        </div>
        <div>
          <label htmlFor="discoloration" className="block font-medium">Have you noticed any discoloration of the leaves (e.g., yellowing, browning, spots)?</label>
          <input type="text" id="discoloration" value={formData.discoloration} onChange={handleChange} required className="border rounded-lg p-2 w-full" />
        </div>
        <div>
          <label htmlFor="pests" className="block font-medium">Are there any visible pests or insects on the plant?</label>
          <input type="text" id="pests" value={formData.pests} onChange={handleChange} required className="border rounded-lg p-2 w-full" />
        </div>
        <div>
          <label htmlFor="locationChange" className="block font-medium">Have you recently changed the plant’s location or environment?</label>
          <input type="text" id="locationChange" value={formData.locationChange} onChange={handleChange} required className="border rounded-lg p-2 w-full" />
        </div>
        <div>
          <label htmlFor="fertilizers" className="block font-medium">Do you use any fertilizers or plant food? If so, how often?</label>
          <input type="text" id="fertilizers" value={formData.fertilizers} onChange={handleChange} required className="border rounded-lg p-2 w-full" />
        </div>
        <div>
          <label htmlFor="weatherChanges" className="block font-medium">Have there been any recent changes in weather conditions (e.g., temperature, humidity)?</label>
          <input type="text" id="weatherChanges" value={formData.weatherChanges} onChange={handleChange} required className="border rounded-lg p-2 w-full" />
        </div>
        <div>
          <label htmlFor="unusualGrowth" className="block font-medium">Is there any unusual growth or deformities in the plant (e.g., stunted growth, misshapen leaves)?</label>
          <input type="text" id="unusualGrowth" value={formData.unusualGrowth} onChange={handleChange} required className="border rounded-lg p-2 w-full" />
        </div>
        <div>
          <label htmlFor="pruning" className="block font-medium">Have you pruned the plant recently? If so, how much did you trim?</label>
          <input type="text" id="pruning" value={formData.pruning} onChange={handleChange} required className="border rounded-lg p-2 w-full" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default ExpertPage;
