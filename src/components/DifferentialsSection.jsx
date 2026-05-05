import React from 'react';
import { Sparkles, Code2, Server } from 'lucide-react';

function DifferentialsSection() {
  const differentials = [
    {
      icon: Sparkles,
      title: 'Inteligência Estratégica',
      description: 'Utilizo ferramentas de IA de última geração para estruturar o conteúdo e o design inicial da sua página em tempo recorde. Isso me permite focar no que realmente importa: a estratégia de conversão do seu negócio.'
    },
    {
      icon: Code2,
      title: 'Refinamento Técnico',
      description: 'Diferente de construtores de sites comuns, eu "abro o capô". Baixo o código, refino cada detalhe em React/Next.js e garanto que a página seja leve, responsiva e otimizada para o Google.'
    },
    {
      icon: Server,
      title: 'Hospedagem Profissional',
      description: 'Entrego sua página hospedada em infraestruturas de alto nível (como a Vercel), garantindo que seu site esteja sempre no ar e carregue instantaneamente no celular do seu cliente.'
    }
  ];

  return (
    <section className="section-gap bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight text-balance mb-4" style={{ letterSpacing: '-0.02em' }}>
            Tecnologia de ponta com toque humano
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Meu processo de trabalho é focado em uma única coisa: velocidade com qualidade. Eu não acredito em processos lentos e burocráticos que travam o crescimento do seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="text-center space-y-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            O resultado? Você recebe uma Landing Page de nível profissional, com código limpo e moderno, em uma fração do tempo que uma agência tradicional levaria.
          </p>
        </div>
      </div>
    </section>
  );
}

export default React.memo(DifferentialsSection);