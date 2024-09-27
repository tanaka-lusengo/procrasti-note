'use client';

import Image from 'next/image';

import profilePhoto from '@/../public/images/profile-photo.jpg';
import { useUser } from '@/context/UserContext';

import * as Styled from './index.styled';

const ProfilePicture = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <Styled.ProfilePictureContainer href="/profile">
      <Image src={profilePhoto} alt="Photo by Philip Martin on Unsplash" />
    </Styled.ProfilePictureContainer>
  );
};

export default ProfilePicture;
