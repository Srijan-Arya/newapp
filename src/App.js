import React, { useState } from 'react';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
    };

    const handleSubmit = async () => {
      try {
          const parsedInput = JSON.parse(jsonInput);  // This is where the error could happen
          if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
              throw new Error('Invalid JSON structure');
          }
  
          const res = await fetch('https://vercel-sigma-blond.vercel.app/bfhl', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(parsedInput)
          });
          
          const data = await res.json();
          setResponse(data);
      } catch (error) {
          alert('Invalid JSON input: ' + error.message);
      }
  };
  

    const handleOptionChange = (e) => {
        const value = e.target.value;
        setSelectedOptions(
            selectedOptions.includes(value)
                ? selectedOptions.filter((option) => option !== value)
                : [...selectedOptions, value]
        );
    };

    const renderResponse = () => {
        if (!response) return null;
        let filteredResponse = {};
        selectedOptions.forEach(option => {
            filteredResponse[option] = response[option];
        });
        return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
    };

    return (
        <div className="App">
            <h1>BFHL Challenge</h1>
            <textarea 
                value={jsonInput} 
                onChange={handleInputChange} 
                placeholder='Enter JSON input' 
            />
            <button onClick={handleSubmit}>Submit</button>

            <div>
                <label>
                    <input 
                        type="checkbox" 
                        value="numbers" 
                        onChange={handleOptionChange}
                    />
                    Numbers
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        value="alphabets" 
                        onChange={handleOptionChange}
                    />
                    Alphabets
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        value="highest_lowercase_alphabet" 
                        onChange={handleOptionChange}
                    />
                    Highest Lowercase Alphabet
                </label>
            </div>

            {renderResponse()}
        </div>
    );
}

export default App;
