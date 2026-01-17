import Image from 'next/image';
import Link from 'next/link';

const TEAM_MEMBERS = {
  agustin: 'Agustín',
  lucas: 'Lucas'
} as const;


const SOCIAL_LINKS = {
  /**
  linkedin: {
    href: '#',
    label: 'LinkedIn'
  },
  twitter: {
    href: '#',
    label: 'Twitter'
  }
  */
} as const;

const AboutUs = () => {
  return (
    <section 
      id="nosotros" 
      className="bg-[#212121] py-16"
      aria-labelledby="about-us-title"
    >
      <div className="max-w-2xl md:max-w-3xl mx-auto px-4">
        <h2 
          id="about-us-title"
          className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
        >
          Conoce al equipo detrás de RevivoX
        </h2>
        
        <div className="relative w-full max-w-2xl mx-auto h-[700px] mb-12">
          <Image
            src="https://i.postimg.cc/4NDbjSQ5/Whats-App-Image-2025-05-15-at-18-28-56-1.jpg"
            alt="Equipo RevivoX trabajando en el reacondicionamiento de laptops"
            fill
            className="object-cover rounded-lg"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="text-center mb-12">
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Somos <span className="font-bold">{TEAM_MEMBERS.agustin}</span> y{' '}
            <span className="font-bold">{TEAM_MEMBERS.lucas}</span>, dos estudiantes de informática apasionados por la tecnología y el medio ambiente. 
            Fundamos <span className="font-bold">RevivoX</span> con el objetivo de dar una segunda vida a laptops, combinando innovación, sostenibilidad y accesibilidad en todo Uruguay. 
            Nuestro objetivo es reducir el impacto ambiental de la tecnología, ofreciendo equipos reacondicionados de alta calidad que se adaptan a las necesidades actuales.
          </p>
        </div>
        {/*
        <div className="flex justify-center gap-8">
          {Object.values(SOCIAL_LINKS).map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-[#FF8806] hover:text-[#ffa039] text-lg transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>
        */}

        <div className="mt-12 text-center">
          <p className="text-gray-300 max-w-2xl mx-auto">
            En RevivoX, creemos que la tecnología sostenible no es solo una tendencia, 
            es el futuro. Cada laptop que reacondicionamos es un paso más hacia un mundo 
            donde la innovación y la responsabilidad ambiental van de la mano.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 