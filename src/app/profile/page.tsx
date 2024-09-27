import { type Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import coverPhoto from '@/../public/images/cover-photo.jpg';
import { getUserSession } from '@/server/actions/helpers';
import { getAllNotes } from '@/server/actions/note-actions';
import { StatusCode } from '@/utils';

import { DetailsSection, ProfileSection } from './components';
import { ContentContainer } from './page.styled';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Profile page showing user details and content.',
};

const ProfilePage = async () => {
  const userSession = await getUserSession();

  const { data: notes, status: notesStatus } = await getAllNotes();

  if (!userSession || notesStatus === StatusCode.UNAUTHORIZED) {
    redirect('/sign-in');
  }

  if (!notes || notesStatus !== StatusCode.SUCCESS) {
    return <DetailsSection notes={[]} posts={[]} connections={[]} />;
  }

  return (
    <>
      <Image
        src={coverPhoto}
        alt="cover photo for testing"
        loading="lazy"
        style={{
          width: '100%',
          height: '250px',
          objectFit: 'cover',
          borderRadius: '5px',
        }}
      />

      <ContentContainer>
        <ProfileSection />
        <DetailsSection
          notes={notes}
          posts={undefined}
          connections={undefined}
        />
      </ContentContainer>
    </>
  );
};

export default ProfilePage;
