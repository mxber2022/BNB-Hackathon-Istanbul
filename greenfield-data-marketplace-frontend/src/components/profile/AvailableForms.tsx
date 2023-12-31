import React, { useEffect } from 'react';
import '../../components/layout/mystyle.css';
import { CreateObject } from "../../components/object/create/index";
import { useState } from 'react';
import "../../components/layout/mystyle.css";

function AvailableForms() {

    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    
    const handleTabClick = (index: any) => {
        setSelectedTabIndex(index);
    };

    // const formLinks = [
    //     { eventName: 'BNB Istanbul', link: 'https://docs.google.com/forms/d/e/1FAIpQLSew3qL_N8bquAETQmk4SOY-lMNsRlL7riXIdhU-UMH8dpC03Q/viewform?embedded=true' },
    //     { eventName: 'ETH GLOBAL ISTANBUL', link: 'https://docs.google.com/forms/d/e/1FAIpQLSew3qL_N8bquAETQmk4SOY-lMNsRlL7riXIdhU-UMH8dpC03Q/viewform?usp=sf_link' },
    //     // Add other form links here
    // ];

    const [formLinks, setFormLinks] = useState<{ eventName: string; link: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8006/getAllLinks');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            // Assuming your server returns JSON data
            const data = await response.json();
            setFormLinks(data);
    
            // Do something with the data, like updating component state
            console.log("data", data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);


  return (
    <>
        <div className='formLink'>
            <div>
                {
                    formLinks.map((entry, index) => (
                    <button className='form_btn' key={index} onClick={() => handleTabClick(index)}>
                        {entry.eventName}
                    </button>
                    ))
                }
            </div>

            <div>
                {
                    formLinks.map((entry, index) => (
                    <div key={index} style={{ display: index === selectedTabIndex ? 'block' : 'none' }}>
                        <iframe
                        title={entry.eventName}
                        src={entry.link}
                        width="850px"
                        height="800px"
                        >
                        Loading...
                        </iframe>
                    </div>
                    ))
                }
            </div>

            <div>
                <CreateObject/>
            </div>
        </div>
    </>
  );
}

export default AvailableForms;
