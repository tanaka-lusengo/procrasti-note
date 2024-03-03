import { useState } from 'react';
import Link from 'next/link';

import * as Styled from './index.styled';

type NavItemProps = {
  title: string;
  children?: React.ReactNode;
};

const NavItemDropdown = ({ title, children }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Link href={'#'} onClick={() => setIsOpen(!isOpen)}>
        {title}
      </Link>

      <Styled.DropdownContainer $isOpen={isOpen}>
        <ul>{children}</ul>
      </Styled.DropdownContainer>
    </>
  );
};

export default NavItemDropdown;
