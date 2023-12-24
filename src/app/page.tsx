'use client';

import Image from 'next/image';
import Link from 'next/link';
import Typewriter from 'typewriter-effect';

import coffeeGuy from '@/../public/images/coffee-guy.svg';
import { Typography } from '@/components';

import * as Styled from './page.styled';

const Home = () => (
  <Styled.Section>
    <Typography tag="h1" textalign="center">
      <Typewriter
        options={{
          strings: ['Time to get organised!'],
          autoStart: true,
          loop: true,
          delay: 100,
        }}
      />
    </Typography>

    <Image
      src={coffeeGuy}
      width={400}
      height={400}
      priority
      rel="preload"
      alt="Man hugging a giant cup of spilling coffee"
    />

    <Typography tag="p" textalign="center">
      <b>Procrasti-Not(e)</b> is a simple and effective &quot;to-do&quot; list
      and task manager app which helps you manage your time and of course, not{' '}
      <b>procrastinate</b> 😉
    </Typography>

    <Link href={'/notes'}>Lets Get Started!</Link>
  </Styled.Section>
);

export default Home;
