import React, { useState, useEffect } from 'react';
import './SignUp.css';

function SignUp() {
  // Initialize with default countries to ensure dropdown is never empty
  const [countries, setCountries] = useState([
    {code: 'US', name: 'United States'},
    {code: 'CA', name: 'Canada'},
    {code: 'GB', name: 'United Kingdom'}
  ]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [error, setError] = useState(null);
  const [apiRetries, setApiRetries] = useState(0);

  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      gender: '',
      passportNumber: '',
      fullAddress: '',
      country: ''
    },
    contactInfo: {
      phoneNumber: '',
      email: '',
      languages: ''
    },
    preferences: {
      newsletter: false,
      notifications: true
    }
  });
  
  const [errors, setErrors] = useState({});

  // Expanded default countries list for fallback
  const defaultCountries = [
    {code: 'US', name: 'United States'},
    {code: 'CA', name: 'Canada'},
    {code: 'GB', name: 'United Kingdom'},
    {code: 'AU', name: 'Australia'},
    {code: 'DE', name: 'Germany'},
    {code: 'FR', name: 'France'},
    {code: 'JP', name: 'Japan'},
    {code: 'CN', name: 'China'},
    {code: 'IN', name: 'India'},
    {code: 'BR', name: 'Brazil'},
    {code: 'MX', name: 'Mexico'},
    {code: 'IT', name: 'Italy'},
    {code: 'ES', name: 'Spain'},
    {code: 'RU', name: 'Russia'},
    {code: 'ZA', name: 'South Africa'},
    {code: 'AR', name: 'Argentina'},
    {code: 'SG', name: 'Singapore'},
    {code: 'NZ', name: 'New Zealand'},
    {code: 'SE', name: 'Sweden'},
    {code: 'CH', name: 'Switzerland'}
  ];

  useEffect(() => {
    const fetchCountries = async () => {
      // Define timeoutId at the top level of the function
      let timeoutId;
      
      try {
        setIsLoadingCountries(true);
        setError(null);

        // Using a timeout to avoid hanging if endpoints are unresponsive
        const controller = new AbortController();
        timeoutId = setTimeout(() => controller.abort(), 8000);
        
        // Try multiple reliable public APIs in sequence
        let response = null;
        let data = null;
        
        // List of API endpoints to try in order
        const endpoints = [
          {
            url: 'https://restcountries.com/v3.1/all?fields=name,cca2',
            process: (data) => data.map(country => ({
              code: country.cca2,
              name: country.name.common
            })).sort((a, b) => a.name.localeCompare(b.name))
          },
          {
            url: 'https://raw.githubusercontent.com/annexare/Countries/master/data/countries.json',
            process: (data) => Object.entries(data).map(([code, country]) => ({
              code,
              name: country.name
            })).sort((a, b) => a.name.localeCompare(b.name))
          }
        ];
        
        // Try each endpoint in sequence until one works
        for (const endpoint of endpoints) {
          try {
            console.log(`Trying to fetch countries from: ${endpoint.url}`);
            response = await fetch(endpoint.url, {
              method: 'GET',
              signal: controller.signal
            });
            
            if (response.ok) {
              data = await response.json();
              // Process the data according to the API format
              if (data) {
                const processedData = endpoint.process(data);
                if (processedData.length > 0) {
                  setCountries(processedData);
                  console.log(`Successfully loaded ${processedData.length} countries`);
                  break; // Exit the loop if successful
                }
              }
            }
          } catch (endpointError) {
            console.warn(`Failed to fetch from ${endpoint.url}:`, endpointError);
            // Continue to next endpoint
          }
        }
        
        // If all endpoints failed, use our expanded default list
        if (!response || !response.ok || !data) {
          console.warn('All API endpoints failed, using default countries list');
          setCountries(defaultCountries);
          setError('Could not fetch countries from online sources. Using default country list.');
        }
        
      } catch (err) {
        console.error('Error in country fetching process:', err);
        setError('Note: Using default country list as we couldn\'t connect to any country data sources.');
        // Ensure we have countries even if everything fails
        setCountries(defaultCountries);
      } finally {
        // Clear timeout if it exists
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        setIsLoadingCountries(false);
      }
    };
    
    fetchCountries();
  }, [apiRetries]);
  
  const validate = () => {
    const newErrors = {};
    
    // Personal Info validation
    if (!formData.personalInfo.firstName.trim()) {
      newErrors.personalInfo = {
        ...newErrors.personalInfo,
        firstName: 'First name is required'
      };
    }

    if (!formData.personalInfo.lastName.trim()) {
      newErrors.personalInfo = {
        ...newErrors.personalInfo,
        lastName: 'Last name is required'
      };
    }

    if (!formData.personalInfo.gender.trim()) {
      newErrors.personalInfo = {
        ...newErrors.personalInfo,
        gender: 'Gender is required'
      };
    }

    if (!formData.personalInfo.passportNumber.trim()) {
      newErrors.personalInfo = {
        ...newErrors.personalInfo,
        passportNumber: 'Passport number is required'
      };
    }
    
    if (!formData.personalInfo.fullAddress.trim()) {
      newErrors.personalInfo = {
        ...newErrors.personalInfo,
        fullAddress: 'Full address is required'
      };
    }
    
    if (!formData.personalInfo.country.trim()) {
      newErrors.personalInfo = {
        ...newErrors.personalInfo,
        country: 'Country is required'
      };
    } 
    
    // Contact Information validation
    if (!formData.contactInfo.phoneNumber.trim()) {
      newErrors.contactInfo = {
        ...newErrors.contactInfo,
        phoneNumber: 'Phone number is required'
      };
    }

    if (!formData.contactInfo.email.trim()) {
      newErrors.contactInfo = {
        ...newErrors.contactInfo,
        email: 'Email is required'
      };
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactInfo.email)) {
      newErrors.contactInfo = {
        ...newErrors.contactInfo,
        email: 'Email is invalid'
      };
    }

    if (!formData.contactInfo.languages.trim()) {
      newErrors.contactInfo = {
        ...newErrors.contactInfo,
        languages: 'Language(s) is required'
      };
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [section, field] = name.split('.');
    
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: type === 'checkbox' ? checked : value
      }
    }));
  };

  // Function to retry fetching countries if the initial attempt failed
  const retryFetchCountries = () => {
    setApiRetries(prev => prev + 1);
    setIsLoadingCountries(true);
    setError(null);
    // This will trigger the useEffect again since apiRetries is in the dependency array
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    try {
      // Check if we have a valid country selection before submission
      if (!formData.personalInfo.country) {
        setErrors(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            country: 'Please select a country'
          }
        }));
        return;
      }
      
      const response = await fetch('http://localhost:5000/api/students/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Display the specific error message from the server
        throw new Error(data.message || 'Failed to register student');
      }
      
      // Clear form on successful submission
      setFormData({
        personalInfo: {
          firstName: '',
          lastName: '',
          gender: '',
          passportNumber: '',
          fullAddress: '',
          country: ''
        },
        contactInfo: {
          phoneNumber: '',
          email: '',
          languages: ''
        },
        preferences: {
          newsletter: false,
          notifications: true
        }
      });
      
      // Clear any previous errors
      setError(null);
      
      // Show success message
      alert('Registration successful! Your data has been saved.');
      
    } catch (error) {
      console.error('Error:', error);
      // Display the error message to the user
      setError(error.message);
      
      // If it's a duplicate email error, highlight the email field
      if (error.message.includes('Email already exists')) {
        setErrors(prev => ({
          ...prev,
          contactInfo: {
            ...prev.contactInfo,
            email: 'This email is already registered'
          }
        }));
      }
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      {error && <div className="error-message">{error}</div>}
      {countries && countries.length > defaultCountries.length && !isLoadingCountries && (
        <div className="success-message">
          Loaded {countries.length} countries successfully
        </div>
      )}
      <form onSubmit={handleSubmit} className="multi-section-form">
        {/* Personal Information Section */}
        <div className="form-section">
          <h2 className="section-heading">Personal Information</h2>
          <div className="form-group">
            <label>First Name*:</label>
            <input
              type="text"
              name="personalInfo.firstName"
              value={formData.personalInfo.firstName}
              onChange={handleChange}
            />
            {errors?.personalInfo?.firstName && 
              <span className="error">{errors.personalInfo.firstName}</span>
            }
          </div>
          <div className="form-group">
            <label>Last Name*:</label>
            <input
              type="text"
              name="personalInfo.lastName"
              value={formData.personalInfo.lastName}
              onChange={handleChange}
            />
            {errors?.personalInfo?.lastName && 
              <span className="error">{errors.personalInfo.lastName}</span>
            }
          </div>
          <div className="form-group">
            <label>Gender*:</label>
            <select
              name="personalInfo.gender"
              value={formData.personalInfo.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {errors?.personalInfo?.gender && 
              <span className="error">{errors.personalInfo.gender}</span>
            }
          </div>
          <div className="form-group">
            <label>Passport Number*:</label>
            <input
              type="text"
              name="personalInfo.passportNumber"
              value={formData.personalInfo.passportNumber}
              onChange={handleChange}
            />
            {errors?.personalInfo?.passportNumber && 
              <span className="error">{errors.personalInfo.passportNumber}</span>
            }
          </div>
          <div className="form-group">
            <label>Full Address*:</label>
            <textarea
              name="personalInfo.fullAddress"
              value={formData.personalInfo.fullAddress}
              onChange={handleChange}
            />
            {errors?.personalInfo?.fullAddress && 
              <span className="error">{errors.personalInfo.fullAddress}</span>
            }
          </div>
          <div className="form-group">
            <label>Country of Residence*:</label>
            <select
              name="personalInfo.country"
              value={formData.personalInfo.country}
              onChange={handleChange}
              className={isLoadingCountries ? "loading-select" : ""}
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors?.personalInfo?.country && 
              <span className="error">{errors.personalInfo.country}</span>
            }
            {isLoadingCountries && <span className="loading-indicator">Fetching countries list...</span>}
            {!isLoadingCountries && countries.length <= defaultCountries.length && (
              <>
                <span className="warning">Using default country list. </span>
                <button 
                  type="button" 
                  onClick={retryFetchCountries}
                  className="retry-button"
                >
                  Retry fetching full list
                </button>
              </>
            )}
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="form-section">
          <h2 className="section-heading">Contact Information</h2>
          <div className="form-group">
            <label>Phone Number*:</label>
            <input
              type="tel"
              name="contactInfo.phoneNumber"
              value={formData.contactInfo.phoneNumber}
              onChange={handleChange}
            />
            {errors?.contactInfo?.phoneNumber && 
              <span className="error">{errors.contactInfo.phoneNumber}</span>
            }
          </div>
          <div className="form-group">
            <label>Email Address*:</label>
            <input
              type="email"
              name="contactInfo.email"
              value={formData.contactInfo.email}
              onChange={handleChange}
            />
            {errors?.contactInfo?.email && 
              <span className="error">{errors.contactInfo.email}</span>
            }
          </div>
          <div className="form-group">
            <label>Languages Spoken*:</label>
            <input
              type="text"
              name="contactInfo.languages"
              value={formData.contactInfo.languages}
              onChange={handleChange}
              placeholder="e.g. English, Spanish, French"
            />
            {errors?.contactInfo?.languages && 
              <span className="error">{errors.contactInfo.languages}</span>
            }
          </div>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default SignUp;