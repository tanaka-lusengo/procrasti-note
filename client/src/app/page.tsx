'use client';

import Image from 'next/image';
import Typewriter from 'typewriter-effect';

import coffeeGuy from '@/../public/images/coffee-guy.svg';
import { ButtonLink, Typography } from '@/components';

import * as Styled from './page.styled';

const Home = () => {
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
        height={350}
        priority
        rel="preload"
        alt="Man hugging a giant cup of spilling coffee"
      />

      <Typography tag="h4" textalign="center">
        <b>Procrasti-Not(e)</b> is a simple and effective &quot;to-do&quot; list
        and task manager app which helps you manage your time and, of course,{' '}
        <b>not procrastinate</b> 😉
      </Typography>

      <ButtonLink href={'/notes'}>Lets get started!</ButtonLink>
    </Styled.Section>
  );
};
export default Home;
