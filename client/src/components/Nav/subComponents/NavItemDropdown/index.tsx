'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import * as Styled from './index.styled';

type NavItemProps = {
  title: string;
  children?: React.ReactNode;
};

const NavItemDropdown = ({ title, children }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // To close the dropdown when clicking outside of it
  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!e.target) return;
      if (isOpen && !e.target.toString().includes('NavItemDropdown')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [isOpen]);

  return (
    <>
      <Link href={'#'} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Back' : title}
      </Link>

      {isOpen !== null ? (
        <Styled.DropdownContainer $isOpen={isOpen}>
          <ul>{children}</ul>
        </Styled.DropdownContainer>
      ) : null}
    </>
  );
};

export default NavItemDropdown;
