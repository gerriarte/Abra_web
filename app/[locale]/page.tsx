import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Method from '@/components/sections/Method';
import Projects from '@/components/sections/Projects';
import Result from '@/components/sections/Result';
import Contact from '@/components/sections/Contact';

export default async function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Method />
      <Projects />
      <Result />
      <Contact />
    </>
  );
}

