import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Method from '@/components/sections/Method';
import Projects from '@/components/sections/Projects';
import Result from '@/components/sections/Result';
import Contact from '@/components/sections/Contact';

export default async function HomePage() {
  try {
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
  } catch (error) {
    console.error('Error rendering HomePage:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-primary mb-4">Error Loading Page</h1>
          <p className="text-text-secondary">Please check the console for details.</p>
        </div>
      </div>
    );
  }
}
