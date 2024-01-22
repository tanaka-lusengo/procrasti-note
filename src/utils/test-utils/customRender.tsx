import { ReactNode } from 'react';
import { render } from '@testing-library/react';

import Providers from '@/Providers';

const customRender = (component: ReactNode) =>
  render(<Providers>{component}</Providers>);

export default customRender;
