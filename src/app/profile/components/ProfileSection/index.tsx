'use client';

import { format } from 'date-fns';
import Image from 'next/image';

import profilePhoto from '@/../public/images/profile-photo.jpg';
import { Stack, Typography } from '@/components/Design';
import { Divider } from '@/components/Design/Layout';
import { useUser } from '@/context/UserContext';

import * as Styled from './index.styled';

export const ProfileSection = () => {
  const { user } = useUser();

  return (
    <Styled.ProfileContainer>
      <Styled.ProfileImageContainer>
        <Image
          src={profilePhoto}
          alt="Photo by Philip Martin on Unsplash"
          loading="lazy"
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
      </Styled.ProfileImageContainer>

      <Stack direction="column" gap="xxs">
        {user ? (
          <>
            <Typography component="h2" fontSize="h3">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography>{user.email}</Typography>
          </>
        ) : null}
      </Stack>

      <Styled.BioContainer>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          diam tellus, porttitor sed porttitor sit amet, dapibus laoreet orci.
          Etiam sit amet luctus arcu. In tristique viverra gravida. Ut quis
          posuere eros. Suspendisse molestie dolor id dolor malesuada congue.
          Nulla facilisi. Vestibulum nec porta justo. Integer ac est dolor.
        </Typography>
      </Styled.BioContainer>

      <Divider $noMargin />

      <Stack justifyContent="space-between" alignItems="center">
        <Stack alignItems="center">
          <Typography fontSize="h4">
            <b>23</b>
          </Typography>
          <Typography>Followers</Typography>
        </Stack>
        <Stack alignItems="center">
          <Typography fontSize="h4">
            <b>1023</b>
          </Typography>
          <Typography>Following</Typography>
        </Stack>
      </Stack>

      <Divider $noMargin />

      <Typography>
        Member since:{' '}
        <b>
          {user ? format(new Date(user.createdAt), "EEEE, do 'of' MMMM") : ''}
        </b>
      </Typography>
      <Typography>
        Active account: <b>{user?.isActive ? 'Yes' : 'No'}</b>
      </Typography>
    </Styled.ProfileContainer>
  );
};
