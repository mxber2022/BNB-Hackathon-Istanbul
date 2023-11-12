import React from 'react';
import '../../components/layout/mystyle.css';
import { useState } from 'react';

function CreateForm() {
  const redirectToTypeform = () => {
    const typeformUrl =
      'https://www.typeform.com/signup/?_gl=1*xa4e1z*_up*MQ..&gclid=CjwKCAiA6byqBhAWEiwAnGCA4FLgBRi3zFEMTshu8QVSfrLXh8P_jsj6ZdTnutRAB7mgsZ-jJYP7-hoC6T4QAvD_BwE&gclsrc=aw.ds&tf_campaign=EUROPE-Generic-Survey-English-Desktop-Equeco_17289058299&tf_source=google&tf_medium=paid&tf_content=140126371834_674319419667&tf_term=google+form+maker';

    // Open the Typeform signup page in a new tab or window
    window.open(typeformUrl, '_blank');
  };

  const [inputValue, setInputValue] = useState('');
    
    const handleChange = (e:any) => {
    setInputValue(e.target.value);
  };

  const [eventName, setEventName] = useState('');

  const handleEventNameChange = (e:any) => {
    setEventName(e.target.value);
  };




  async function addLink() {
    try {
      const response = await fetch('http://localhost:8006/addLink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName,
          link: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Link added successfully:', data);
    } catch (error) {
      console.error('Error adding link:', error);
    }
  }



  return (
    <>
    <div>
        <div>
            <button className='zina' onClick={redirectToTypeform}>Create Form (Typeform)</button>
        </div>



        <div>
          <label htmlFor="eventNameInput" style={{ width: '200px', height: '40px', fontSize:'30px' }}>Enter Event Name </label>
          <input type="text" id="eventNameInput" value={eventName} onChange={handleEventNameChange} style={{ width: '400px', height: '50px', fontSize:'40px', marginTop:'100px'}}/>
        </div>


        <div className='fm_link'>
          <label htmlFor="myInput" style={{ width: '200px', height: '40px', fontSize:'30px' }}>Enter form link </label>
          <input type="text" id="myInput" value={inputValue} style={{ width: '500px', height: '50px', fontSize:'40px', marginTop:'100px'}} onChange={handleChange} />
        </div>

        <div>
            <button className='zinax' onClick={addLink}>Upload Form</button>
        </div>
    
    </div>
    </>
  );
}

export default CreateForm;
