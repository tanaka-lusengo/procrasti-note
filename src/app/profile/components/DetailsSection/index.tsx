'use client';

import { useState } from 'react';

import type { NoteModel } from '@/types';

import * as Styled from './index.styled';
import {
  ConnectionsSection,
  NotesSection,
  PostsSection,
  SectionHeader,
} from './subComponents';

type VisibleSection = 'notes' | 'posts' | 'connections';

interface DetailsSectionProps {
  notes: NoteModel[];
  // TODO: Add types for posts and connections when the API is ready
  posts?: string[];
  connections?: string[];
}

export const DetailsSection = ({
  notes,
  posts = [
    'How to Stay Productive',
    'The Best Morning Routines',
    '10 Tips for Time Management',
    'Overcoming Procrastination',
    'The Power of Focus',
    'Staying Organized in a Busy World',
    'Creating Daily Habits',
    'Managing Your Work-Life Balance',
    'Setting Realistic Goals',
    'Tracking Your Progress',
  ],
  connections = [
    'Alice Johnson',
    'Bob Smith',
    'Catherine Lee',
    'David Brown',
    'Eva Adams',
    'Frank White',
    'Grace Clark',
    'Henry Davis',
    'Isabella Miller',
    'Jack Wilson',
  ],
}: DetailsSectionProps) => {
  const [visibleSection, setVisibleSection] = useState<VisibleSection>('notes');

  // Handler to toggle the visible section
  const handleSectionClick = (section: VisibleSection) =>
    setVisibleSection(section);

  const renderSectionComponent = () => {
    switch (visibleSection) {
      case 'notes':
        return <NotesSection notes={notes} />;
      case 'posts':
        return <PostsSection posts={posts} />;
      case 'connections':
        return <ConnectionsSection connections={connections} />;
      default:
        return null;
    }
  };

  return (
    <Styled.DetailsContainer>
      <Styled.DetailsHeadersContainer>
        <SectionHeader
          title="Notes"
          count={notes.length}
          isVisible={visibleSection === 'notes'}
          onClick={() => handleSectionClick('notes')}
        />

        <SectionHeader
          title="Posts"
          count={posts.length}
          isVisible={visibleSection === 'posts'}
          onClick={() => handleSectionClick('posts')}
        />

        <SectionHeader
          title="Connections"
          count={connections.length}
          isVisible={visibleSection === 'connections'}
          onClick={() => handleSectionClick('connections')}
        />
      </Styled.DetailsHeadersContainer>

      {renderSectionComponent()}
    </Styled.DetailsContainer>
  );
};
