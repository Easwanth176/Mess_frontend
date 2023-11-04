import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/form.css';

export default function Form() {
  const [newRegistrationNumber, setNewRegistrationNumber] = useState('');
  const [personName, setPersonName] = useState('');
  const [hostel, setHostel] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [mealRegistrationNumber, setMealRegistrationNumber] = useState('');
  const [mealType, setMealType] = useState('');
  const [error, setError] = useState('');
  const [mealValidation, setMealValidation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingToken, setIsGeneratingToken] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setUserImage(file);
    } else {
      setError('Please select a valid image file.');
    }
  }

  const submitUserRegistration = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      if (!newRegistrationNumber || !personName || !hostel || !userImage) {
        setError('Please fill in all fields.');
      } else {
        const formData = new FormData();
        formData.append('registrationNumber', newRegistrationNumber);
        formData.append('personName', personName);
        formData.append('hostel', hostel);
        formData.append('userImage', userImage);

        const response = await axios.post('https://mess-backend-3lo9.onrender.com/submit', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log('New User Data:', response.data);
        navigate(`/home/${newRegistrationNumber}`);
      }
    } catch (error) {
      console.error('Error submitting user registration:', error);
      setError('An error occurred while submitting the user registration form.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const generateMealToken = async () => {
    setIsGeneratingToken(true);
    setMealValidation('');

    try {
      if (!mealRegistrationNumber || !mealType) {
        setMealValidation('Please fill in all meal registration fields.');
      } else {
        const userExistResponse = await axios.get(`https://mess-backend-3lo9.onrender.com/user-data/${mealRegistrationNumber}`);


        if (userExistResponse.data.registrationNumber === mealRegistrationNumber) {
          navigate(`/home/${mealRegistrationNumber}?mealType=${mealType}`);
        } else {
          setError('User not found. Please register first.');
          setIsGeneratingToken(false);
        }
      }
    } catch (error) {
      console.error('Error checking user data:', error);
      setMealValidation('An error occurred while checking user data.');
    } finally {
      setIsGeneratingToken(false);
    }
  }

  return (
    <div className="container">

      
      <div className="form1">
      <h1>Mess Pass</h1>
        <h2 className="my-4">User Registration</h2>
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={(e) => { e.preventDefault(); submitUserRegistration(); }} className="my-4">
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group">
                <label>Registration Number:</label>
                <input
                  type="text"
                  className="form-control"
                  value={newRegistrationNumber}
                  onChange={(e) => setNewRegistrationNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Name of the Person:</label>
                <input
                  type="text"
                  className="form-control"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Select Hostel:</label>
                <select
                  className="form-control"
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                >
                  <option value="">Select a hostel</option>
                  <option value="Boys Hostel 1">Boys Hostel 1</option>
                  <option value="Boys Hostel 2">Boys Hostel 2</option>
                  <option value="Boys Hostel 3">Boys Hostel 3</option>
                  <option value="Boys Hostel 4">Boys Hostel 4</option>
                  <option value="Boys Hostel 5">Boys Hostel 5</option>
                  <option value="Boys Hostel 6">Boys Hostel 6</option>
                  <option value="Boys Hostel 7">Boys Hostel 7</option>
                  <option value="Girls Hostel 1">Girls Hostel 1</option>
                  <option value="Girls Hostel 2">Girls Hostel 2</option>
                  <option value="Girls Hostel 3">Girls Hostel 3</option>
                  <option value="Girls Hostel 4">Girls Hostel 4</option>
                  <option value="Girls Hostel 5">Girls Hostel 5</option>
                  <option value="Girls Hostel 6">Girls Hostel 6</option>
                  <option value="Girls Hostel 7">Girls Hostel 7</option>

                </select>
              </div>
              <div className="form-group">
                <label>Upload User Image:</label>
                <input
                  type="file"
                  className="form-control-file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {isSubmitting ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  'Submit User Registration'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="formsecond">
          <h2 className="my-4">Generate Token</h2>
          <form onSubmit={(e) => { e.preventDefault(); generateMealToken(); }} className="my-4">
            {mealValidation && <div className="alert alert-danger">{mealValidation}</div>}
            <div className="form-group">
              <label>Meal Registration Number:</label>
              <input
                type="text"
                className="form-control"
                value={mealRegistrationNumber}
                onChange={(e) => setMealRegistrationNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Type of Meal:</label>
              <select
                className="form-control"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              >
                <option value="">Select a meal type</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Snacks">Snacks</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              {isGeneratingToken ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                'Generate Token'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
