import React, { useEffect, useState } from 'react';
import svg_facebook from '../../svgs/social-media/Rectangle 6590.svg';
import svg_instagram from '../../svgs/social-media/Rectangle 6591.svg';
import svg_x from '../../svgs/social-media/x.svg';
import svg_tiktok from '../../svgs/social-media/tiktok-svgrepo-com.svg';
import svg_whatsapp from '../../svgs/social-media/whatsapp-icon-logo-svgrepo-com.svg';
import svg_youtube from '../../svgs/social-media/Rectangle 6593.svg';
import svg_linkedin from '../../svgs/social-media/Rectangle 6594.svg';
import AboutHim from './Aboutothers';
import { auth } from '../../firebase/firebase'

const SocialMedia = () => {
      const [userId, setUserId] = useState(null);

        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                  if (user) {
                        setUserId(user.uid);
                  } else {
                        setUserId(null);
                  }
            });

            return () => unsubscribe();
      }, []);


      const socialMediaPages = [
            { name: 'Facebook', icon: <img src={svg_facebook} alt="" />, text: 'Facebook' },
            { name: 'Youtube', icon: <img src={svg_youtube} alt="" />, text: 'Youtube' },
            { name: 'Linkedin', icon: <img src={svg_linkedin} alt="" />, text: 'Linkedin' },
            { name: 'Instagram', icon: <img src={svg_instagram} alt="" />, text: 'Instagram' },
            { name: 'X', icon: <img src={svg_x} alt="" />, text: 'X' },
            { name: 'Tik Tok', icon: <img src={svg_tiktok} alt="" />, text: 'Tik Tok' },
            { name: 'WhatsApp', icon: <img src={svg_whatsapp} alt="" />, text: 'WhatsApp' },
      ];

      return (
            <div>
                  <div>
                        <div className='flex justify-between my-3 mt-20'>
                              <div>
                                    <h1 className='font-semibold'>Social Media</h1>
                              </div>
                        </div>
                        <div className='border'></div>
                        <div className='my-3'>
                              <h1>Please select or copy like to get in touch with him. Add them as a friend on social media</h1>
                        </div>
                        <div className='border'></div>
                        <div>
                              {socialMediaPages.map((idx) => (
                                    <div className='flex gap-4 my-4'>
                                          <div className='w-1/6'>{idx.icon}</div>
                                          <p className='w-5/6 flex justify-between'>{idx.name}</p>
                                    </div>
                              ))}
                        </div>
                        <AboutHim />
                  </div>
            </div>
      );
};

export default SocialMedia;
