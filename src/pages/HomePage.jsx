
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from '@/components/Header.jsx';
import Hero from '@/components/Hero.jsx';
import ProjectCard from '@/components/ProjectCard.jsx';
import ProjectModal from '@/components/ProjectModal.jsx';
import AboutSection from '@/components/AboutSection.jsx';
import DifferentialsSection from '@/components/DifferentialsSection.jsx';
import ContactForm from '@/components/ContactForm.jsx';
import Footer from '@/components/Footer.jsx';

const HomePage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Samuel | Portfólio';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Portfólio de Samuel - Desenvolvedor Web');
  }, []);

  const projects = useMemo(() => [
    {
      id: 1,
      title: 'Home Care',
      thumbnail: '/home-care.webp',
      description: 'Landing page para serviços de saúde domiciliar\n\nSite claro, rápido e focado em gerar confiança. O paciente entende os serviços e entra em contato em poucos cliques.\nFunciona no celular, carrega rápido e é fácil de personalizar.',
      demoUrl: 'https://home-care-livid.vercel.app/',
      githubUrl: 'https://github.com/samuel-gonzaga/home-care'
    },
    {
      id: 2,
      title: 'Convite Digital de Casamento',
      thumbnail: '/casamentopaulaefernado.webp',
      status: 'Entregue',
      description: 'Site de confirmação de presenças\n\nUm sistema simples e eficiente para convidados confirmarem presença em poucos cliques. Os dados vão direto para uma planilha — organizado, em tempo real e sem complicação para os noivos.\n\nResultado: Mais de 100 confirmações registradas. Funcionando perfeitamente.',
      demoUrl: 'https://casamentopaulaefernado.com.br/',
      githubUrl: 'https://github.com/samuel-gonzaga/convite-casamento'
    },
    {
      id: 3,
      title: 'Landing Page – Trancista',
      thumbnail: '/malu-braid.webp',
      status: 'Ativo',
      description: 'Site profissional para serviços de beleza\n\nUma landing page que realmente gera contatos. A profissional recebe pedidos de clientas direto pelo site e WhatsApp. Site ativo, funcionando e trazendo resultados orgânicos.\n\nDiferencial: Versão atual já entrega contatos. Próxima versão está em desenvolvimento com foco em conversão ainda maior.',
      demoUrl: 'https://malu-braid.landingpro.app.br/',
      githubUrl: 'https://github.com/samuel-gonzaga/landing-page-malubraid'
    }
  ], []);

  const handleDetailsClick = useCallback((project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll('.scroll-reveal');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <>

      <div className="min-h-screen">
        <Header />
        
        <main>
          <Hero />

          <section id="projetos" className="section-gap bg-background scroll-reveal">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight text-balance mb-4" style={{ letterSpacing: '-0.02em' }}>
                  Projetos em Produção
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Soluções reais para clientes reais
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                  />
                ))}
              </div>
            </div>
          </section>

          <div className="scroll-reveal">
            <AboutSection />
          </div>

          <div className="scroll-reveal">
            <DifferentialsSection />
          </div>

          <div className="scroll-reveal">
            <ContactForm />
          </div>
        </main>

        <Footer />

        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={selectedProject}
        />
      </div>

    </>
  );
};

export default HomePage;
