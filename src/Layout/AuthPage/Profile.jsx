import React, {useEffect, useState} from 'react'
import IsMobile from '../../media/mobilePages/mobilePages'
import IsSimple from '../../media/simplePages/simplePages'

const Profile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1024);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <div>{isMobile ? <IsMobile /> : <IsSimple /> }</div>
  )
}

export default Profile