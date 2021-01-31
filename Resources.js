
import React, {useEffect, useState} from 'react';
import '../../App.css';
import '../resources.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function Resources() {

  const [resources, setResources] = useState([{
    
    name: '', 
    type: '',
    drive_link: '',
    youtube_link: ''
    

    // type- aerial,swarm,sae,aerobatics,general,blog


  }])

  useEffect(() => {
    fetch('http://localhost:8080/resources')
    .then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(jsonRes => setResources(jsonRes))
  },[])
  
  useEffect(()=>{
    Aos.init({duration:1500});
  },[]);

  //On clicking Resources(navbar) we should get a dropdown menu with options as-
  // Swarm Robotics
  // Aerial Robotics
  // SAE Aero
  // Aerobatics
  // General
  // Blogs

  //On clicking any of these we need to render(after filtering according to type data) resources page.

  const alltypes = [ ...new Set(resources.map((item) => item.type))];
  const [resourcetype,setResourcetype]=useState("aerial");

  const filterResources = (type) => {
    setResourcetype(type);
    console.log(alltypes);
  };

  const Types = ({ types, filterResources }) => {
      // console.log(types);
    return (
      <div className="btn-container">
        {alltypes.map((type,index) => {
          return (
            <button
              key={index}
              type="button"
              onClick={() => filterResources(type)}
              className={resourcetype === type ? "filter-btn active" : "filter-btn inactive"}
            >
              {type}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="rsc-container">
      <div className="projects-title" data-aos='zoom-in'>
          <h1>Our Resources</h1>
          <div className="project-underline"></div>
        </div>
      <Types types={alltypes} filterResources={filterResources} />
      <div className="panels-container">
      {resources.filter(resource => resource.type === resourcetype).map(resource => (
      <div className='rsc-panel'>
        <div className='rsc-text'>
          <h2>{resource.name}</h2>
          <h5>{resource.type}</h5>
        </div>
        <a className='btns' href={resource.drive_link}>Content</a>
        <a className='btns' href={resource.youtube_link}>Session</a>
        </div>
      ))}
      </div>
    </div>
  )
}