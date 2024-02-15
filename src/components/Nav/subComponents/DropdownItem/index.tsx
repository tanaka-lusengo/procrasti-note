import Link from 'next/link';

type DropdownItemProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const DropdownItem = ({ href, children, onClick }: DropdownItemProps) => (
  <li>
    <Link href={href} onClick={onClick ? onClick : undefined}>
      {children}
    </Link>
  </li>
);

export default DropdownItem;
