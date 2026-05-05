import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';
function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById('projetos');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0" style={{
      backgroundImage: 'url(/hero-bg.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85"></div>
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 pill-rounded mb-6 border border-primary/20">
            <Rocket className="h-4 w-4" />
            <span className="text-sm font-medium font-mono">
              Últimos projetos: 3 em produção
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 text-balance" style={{
          letterSpacing: '-0.02em'
        }}>
            Crio sites profissionais que trazem resultado
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            Para profissionais e pequenos negócios que precisam de presença digital que funciona.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button onClick={scrollToProjects} size="lg" className="btn-rounded bg-primary hover:bg-primary/90 text-primary-foreground text-base">
              Ver projetos
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-rounded border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base">
              <a href="https://wa.me/5515991206869?text=Olá, gostaria de conversar sobre um projeto" target="_blank" rel="noopener noreferrer">
                Vamos conversar
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>;
}
export default Hero;