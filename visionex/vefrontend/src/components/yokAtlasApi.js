// yokAtlasApi.js
// This file contains the API integration with YOK Atlas

/**
 * Fetches program data from YOK Atlas API
 * @param {Object} filters - Optional filters to apply to the API request
 * @returns {Promise} - Promise resolving to the API response data
 */
export const fetchProgramsFromYokAtlas = async (filters = {}) => {
    try {
      // Construct the API URL based on YOK Atlas API documentation
      // This is a placeholder - you'll need to replace with the actual API endpoint
      const apiUrl = 'https://yokatlas.yok.gov.tr/api/programs';
      
      // Convert filters to query string parameters
      const queryParams = new URLSearchParams();
      
      // Add filters if provided
      if (filters.university) queryParams.append('university', filters.university);
      if (filters.program) queryParams.append('program', filters.program);
      if (filters.language) queryParams.append('language', filters.language);
      if (filters.level) queryParams.append('level', filters.level);
      
      // Add pagination if needed
      if (filters.page) queryParams.append('page', filters.page);
      if (filters.pageSize) queryParams.append('pageSize', filters.pageSize);
      
      // Construct the full URL with query parameters
      const fullUrl = `${apiUrl}?${queryParams.toString()}`;
      
      // Make the API request
      const response = await fetch(fullUrl);
      
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`YOK Atlas API error: ${response.status} ${response.statusText}`);
      }
      
      // Parse the JSON response
      const data = await response.json();
      
      // Process and transform the data if needed
      return transformYokAtlasData(data);
      
    } catch (error) {
      console.error('Error fetching data from YOK Atlas API:', error);
      throw error;
    }
  };
  
  /**
   * Transforms the raw data from YOK Atlas API to match our application's data structure
   * @param {Object} rawData - Raw data from YOK Atlas API
   * @returns {Array} - Transformed array of program objects
   */
  const transformYokAtlasData = (rawData) => {
    // This is a placeholder function
    // You'll need to adapt this based on the actual structure of YOK Atlas API response
    
    try {
      // If the API returns an array directly
      if (Array.isArray(rawData)) {
        return rawData.map(program => ({
          id: program.id || generateRandomId(),
          title: program.programName || '',
          university: program.universityName || '',
          location: program.city || 'Turkey',
          level: mapStudyLevel(program.studyLevel),
          language: program.language || 'Turkish',
          duration: mapDuration(program.duration),
          originalPrice: program.fullPrice || 0,
          price: program.discountedPrice || 0,
          hasScholarship: program.discountedPrice < program.fullPrice,
          scholarship: calculateScholarshipPercentage(program.fullPrice, program.discountedPrice),
          imageUrl: program.universityLogo || "/api/placeholder/300/200" 
        }));
      }
      
      // If the API returns objects with nested data
      if (rawData.results && Array.isArray(rawData.results)) {
        return transformYokAtlasData(rawData.results);
      }
      
      // If different structure, return empty array as fallback
      console.warn('Unknown YOK Atlas API response structure', rawData);
      return [];
      
    } catch (error) {
      console.error('Error transforming YOK Atlas data:', error);
      return [];
    }
  };
  
  /**
   * Maps YOK Atlas study level to our application's terminology
   * @param {string} level - YOK Atlas study level
   * @returns {string} - Mapped study level
   */
  const mapStudyLevel = (level) => {
    const levelMap = {
      'lisans': 'Bachelor',
      'onlisans': 'Vocational School',
      'yuksek_lisans_tezli': 'Master With Thesis',
      'yuksek_lisans_tezsiz': 'Master Without Thesis',
      'doktora': 'PhD',
      'butunlesik_doktora': 'Integrated PhD'
    };
    
    return levelMap[level?.toLowerCase()] || 'Bachelor';
  };
  
  /**
   * Maps YOK Atlas duration to our application's format
   * @param {string|number} duration - YOK Atlas duration data
   * @returns {string} - Formatted duration string
   */
  const mapDuration = (duration) => {
    // If duration is already in the format we need
    if (typeof duration === 'string' && duration.includes('month')) {
      return duration;
    }
    
    // If duration is a number (assuming it's in months)
    if (!isNaN(duration)) {
      return `${duration} months`;
    }
    
    // If duration is in years, convert to months
    if (typeof duration === 'string' && duration.includes('year')) {
      const years = parseFloat(duration);
      return `${years * 12} months`;
    }
    
    // Default duration for unknown format
    return '48 months';
  };
  
  /**
   * Calculates scholarship percentage based on full and discounted prices
   * @param {number} fullPrice - Original full price
   * @param {number} discountedPrice - Discounted price
   * @returns {string} - Scholarship percentage as string
   */
  const calculateScholarshipPercentage = (fullPrice, discountedPrice) => {
    if (!fullPrice || fullPrice <= 0 || !discountedPrice) return '0%';
    
    const percentage = Math.round(((fullPrice - discountedPrice) / fullPrice) * 100);
    return `${percentage}%`;
  };
  
  /**
   * Generates a random ID for programs that don't have one
   * @returns {string} - Random ID
   */
  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15);
  };
  
  /**
   * Fetches universities from YOK Atlas API
   * @returns {Promise} - Promise resolving to array of universities
   */
  export const fetchUniversities = async () => {
    try {
      // Replace with actual API endpoint for universities
      const apiUrl = 'https://yokatlas.yok.gov.tr/api/universities';
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`YOK Atlas API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Transform university data to match our needed format
      return data.map(uni => ({
        id: uni.id,
        name: uni.name,
        city: uni.city,
        logo: uni.logo || "/api/placeholder/300/200"
      }));
      
    } catch (error) {
      console.error('Error fetching universities from YOK Atlas API:', error);
      throw error;
    }
  };
  
  export default {
    fetchProgramsFromYokAtlas,
    fetchUniversities
  };