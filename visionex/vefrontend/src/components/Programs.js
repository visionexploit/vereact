import React, { useState, useEffect } from 'react';
import './Programs.css';
import { FaSearch, FaFilter, FaGraduationCap, FaLanguage, FaClock, FaMoneyBillWave } from 'react-icons/fa';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [1030, 55500],
    studyDuration: [1.5, 6],
    country: '',
    university: '',
    studyMajor: '',
    studyLevel: '',
    language: ''
  });

  // Mock data - replace with actual API call
  useEffect(() => {
  const mockPrograms = [
    {
      id: 1,
      title: "Gastronomy and Culinary Arts",
      university: "Altinbas University",
        country: "Turkey",
      language: "Turkish",
      level: "Bachelor",
        duration: 4,
        price: 8500,
        discountedPrice: 3500,
        image: "path_to_image"
      },
      // Add more mock programs here
    ];
    setPrograms(mockPrograms);
  }, []);

  return (
    <div className="programs-container">
      <div className="programs-header">
        <h1>Programs</h1>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search programs..." />
        </div>
          </div>
          
      <div className="filters-section">
            <div className="filter-group">
          <h3>Price Range</h3>
          <div className="range-slider">
                  <input 
                    type="range" 
              min="1030" 
              max="55500" 
                    value={filters.priceRange[0]} 
              onChange={(e) => setFilters({...filters, priceRange: [e.target.value, filters.priceRange[1]]})}
                  />
                  <input 
                    type="range" 
              min="1030" 
              max="55500" 
                    value={filters.priceRange[1]} 
              onChange={(e) => setFilters({...filters, priceRange: [filters.priceRange[0], e.target.value]})}
                  />
                </div>
                <div className="range-values">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
              </div>
            </div>

            <div className="filter-group">
          <h3>Study Duration</h3>
          <div className="range-slider">
                  <input 
                    type="range" 
              min="1.5" 
              max="6" 
              step="0.5"
              value={filters.studyDuration[0]} 
              onChange={(e) => setFilters({...filters, studyDuration: [e.target.value, filters.studyDuration[1]]})}
                  />
                  <input 
                    type="range" 
              min="1.5" 
              max="6" 
              step="0.5"
              value={filters.studyDuration[1]} 
              onChange={(e) => setFilters({...filters, studyDuration: [filters.studyDuration[0], e.target.value]})}
                  />
                </div>
                <div className="range-values">
            <span>{filters.studyDuration[0]} years</span>
            <span>{filters.studyDuration[1]} years</span>
              </div>
            </div>

            <div className="filter-group">
          <h3>Study Level</h3>
              <select 
            value={filters.studyLevel}
            onChange={(e) => setFilters({...filters, studyLevel: e.target.value})}
          >
            <option value="">All Levels</option>
            <option value="bachelor">Bachelor</option>
            <option value="master-thesis">Master With Thesis</option>
            <option value="master-no-thesis">Master Without Thesis</option>
            <option value="phd">PhD</option>
              </select>
            </div>

            <div className="filter-group">
          <h3>Language</h3>
              <select 
            value={filters.language}
            onChange={(e) => setFilters({...filters, language: e.target.value})}
          >
            <option value="">All Languages</option>
            <option value="english">English</option>
            <option value="turkish">Turkish</option>
            <option value="arabic">Arabic</option>
              </select>
            </div>
            </div>

      <div className="programs-grid">
        {programs.map(program => (
          <div key={program.id} className="program-card">
            <div className="program-image">
              <img src={program.image} alt={program.title} />
            </div>
            <div className="program-info">
              <h3>{program.title}</h3>
              <p className="university">{program.university}</p>
              <div className="program-details">
                <span><FaGraduationCap /> {program.level}</span>
                <span><FaLanguage /> {program.language}</span>
                <span><FaClock /> {program.duration} years</span>
              </div>
              <div className="program-price">
                <span className="original-price">${program.price}</span>
                <span className="discounted-price">${program.discountedPrice}</span>
              </div>
              <button className="register-btn">Register Now</button>
            </div>
          </div>
        ))}
                    </div>
                    
      <div className="pagination">
        <button className="page-btn">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <span>...</span>
        <button className="page-btn">450</button>
                      </div>
                    </div>
  );
};

export default Programs;