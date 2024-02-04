import React, { useEffect, useState } from 'react';
import shape from '../../../image/share-2 1.svg';
import svg_facebook from '../../../svgs/social-media/Rectangle 6590.svg';
import svg_instagram from '../../../svgs/social-media/Rectangle 6591.svg';
import svg_x from '../../../svgs/social-media/x.svg';
import svg_tiktok from '../../../svgs/social-media/tiktok-svgrepo-com.svg';
import svg_whatsapp from '../../../svgs/social-media/whatsapp-icon-logo-svgrepo-com.svg';
import svg_youtube from '../../../svgs/social-media/Rectangle 6593.svg';
import svg_linkedin from '../../../svgs/social-media/Rectangle 6594.svg';
import ModalAddSocialMedia from '../../../Modals/ModalAddSocialMedia';
import ModalDelete from '../../../Modals/ModalDelete';
import AboutHim from './aboutHim';
import CheckMedia from './checkMedia';
import { auth } from '../../../firebase/firebase'

const SocialMedia = () => {
      const [selectedSocialMedia, setSelectedSocialMedia] = useState([]);
      const [userId, setUserId] = useState(null);
      const maxSocialMediaCount = 6;

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

      const handleSelectSocialMedia = (socialMedia) => {
            const isAlreadySelected = selectedSocialMedia.some((item) => item.name === socialMedia);

            if (!isAlreadySelected && selectedSocialMedia.length < maxSocialMediaCount) {
                  const selectedOption = socialMediaPages.find((page) => page.name === socialMedia);

                  setSelectedSocialMedia((prevSelected) => [
                        ...prevSelected,
                        {
                              name: socialMedia,
                              icon: selectedOption ? selectedOption.icon : null,
                              page: selectedOption ? selectedOption : { name: '', url: '' },
                        },
                  ]);
            }
      };

      const handleRemoveSocialMedia = (socialMediaName) => {
            setSelectedSocialMedia((prevSelected) =>
                  prevSelected.filter((item) => item.name !== socialMediaName)
            );
      };

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
                              <div className='flex gap-5'>
                                    <button className='bg-blue-700 px-2 py-1 rounded-lg text-sm'>
                                          <ModalAddSocialMedia onSelectSocialMedia={handleSelectSocialMedia} />
                                    </button>
                                    <img src={shape} alt='' />
                              </div>
                        </div>
                        <div className='border'></div>
                        <div className='my-3'>
                              <h1>Please select or copy like to get in touch with him. Add them as a friend on social media</h1>
                        </div>
                        <div className='border'></div>
                        {selectedSocialMedia.map((socialMedia) => (
                              <div key={socialMedia.name} className='flex gap-4 my-4'>
                                    <div className='w-1/6'>{socialMedia.icon}</div>
                                    <div className='w-5/6 flex justify-between'>
                                          <div>{socialMedia.name && <h1>{socialMedia.name}</h1>}</div>
                                          {socialMedia.name && (
                                                <div className='flex gap-5'>
                                                      <CheckMedia selectedSocialMedia={selectedSocialMedia} userId={userId} />
                                                      <div className='h-6 w-6 cursor-pointer'>
                                                            <ModalDelete onDeleteMedia={handleRemoveSocialMedia} name={socialMedia.name} />
                                                      </div>
                                                </div>
                                          )}
                                    </div>
                              </div>
                        ))}
                        <AboutHim />
                  </div>
            </div>
      );
};

export default SocialMedia;
