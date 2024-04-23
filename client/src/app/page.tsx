import Image from 'next/image';

import coffeeGuy from '@/../public/images/coffee-guy.svg';
import { getUserSession } from '@/actions/auth-actions';
import { ButtonLink, Typewriter, Typography } from '@/components/ui';

import * as Styled from './page.styled';

const Home = async () => {
  const userSession = await getUserSession();

  return (
    <Styled.Section>
      <Typography tag="h1" textalign="center">
        <Typewriter
          options={{
            strings: ['Time to get organised!'],
            autoStart: true,
            loop: true,
          }}
        />
      </Typography>

      <Image
        src={coffeeGuy}
        width={350}
        style={{ height: 'auto' }}
        priority
        rel="preload"
        alt="Man hugging a giant cup of spilling coffee"
      />

      <Typography fontSize="h4" textalign="center">
        <b>Procrasti-Not(e)</b> is a simple and effective &quot;to-do&quot; list
        and task manager app which helps you manage your time and, of course,
        helps you to <b>not procrastinate</b> 😉
      </Typography>

      <ButtonLink href={userSession ? '/notes' : '/sign-in'}>
        Lets get started!
      </ButtonLink>
    </Styled.Section>
  );
};

export default Home;
