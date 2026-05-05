
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle2 } from 'lucide-react';
function AboutSection() {
  return <section id="sobre" className="section-gap bg-muted">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32 rounded-xl">
                <AvatarImage src="/foto-perfil.webp" alt="Samuel Gonzaga" loading="lazy" width="128" height="128" decoding="async" />
                <AvatarFallback className="text-3xl font-semibold bg-primary text-primary-foreground rounded-xl">
                  DP
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-grow space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight text-balance" style={{
              letterSpacing: '-0.02em'
            }}>
                De onde venho e para onde estou indo.
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Sempre fui fascinado por como a tecnologia pode transformar pequenos negócios. Minha jornada começou no WordPress, criando páginas para profissionais que precisavam de uma presença digital rápida. Mas, conforme fui me aprofundando no desenvolvimento Frontend, percebi que eu queria entregar mais: mais performance, mais controle e uma experiência mais fluida.
                </p>
                <p>
                  Hoje, estudo Análise e Desenvolvimento de Sistemas e foco minha energia em criar Landing Pages modernas usando React e Next.js. Acredito que um site não deve ser apenas 'bonito', mas uma ferramenta técnica robusta que carrega rápido e converte visitantes em clientes. Quando não estou codando ou estudando, estou buscando formas de unir a inteligência artificial ao desenvolvimento humano para entregar resultados que realmente façam a diferença no dia a dia de profissionais liberais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}
export default AboutSection;
