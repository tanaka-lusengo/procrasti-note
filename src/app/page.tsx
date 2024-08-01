import Image from 'next/image';

import coffeeGuy from '@/../public/images/coffee-guy.svg';
import { ButtonLink, Stack, Typewriter, Typography } from '@/components/Design';
import { getUserSession } from '@/server/actions/helpers';

import { Subtitle } from './page.styled';

const Home = async () => {
  const userSession = await getUserSession();

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap="md"
      marginTop="md"
    >
      <Typography component="h1" textAlign="center">
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
        height={350}
        priority
        rel="preload"
        alt="Man hugging a giant cup of spilling coffee"
      />

      <Subtitle>
        <b>Procrasti-Not(e)</b> is a simple and effective &quot;to-do&quot; list
        and task manager app which helps you manage your time and, of course,
        helps you to <b>not procrastinate</b> 😉
      </Subtitle>

      <ButtonLink href={userSession ? '/notes' : '/sign-in'}>
        Lets get started!
      </ButtonLink>
    </Stack>
  );
};

export default Home;
