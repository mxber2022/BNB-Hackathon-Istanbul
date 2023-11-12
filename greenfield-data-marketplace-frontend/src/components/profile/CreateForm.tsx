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

  async function addLink() {
    console.log("Adding link to database initiated", inputValue);
  }

  return (
    <>
    <div>
        <div>
            <button className='zina' onClick={redirectToTypeform}>Create Form (Typeform)</button>
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
