import React from 'react';
import { Linkedin, Github, MessageCircle } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/samuel-henricky/'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/samuel-gonzaga'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://api.whatsapp.com/send/?phone=5515991206869&text=Ol%C3%A1%2C+gostaria+de+conversar+sobre+um+projeto&type=phone_number&app_absent=0'
    }
  ];

  return (
    <footer className="bg-muted text-muted-foreground py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={link.name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm mt-2">
            Desenvolvido por Samuel Gonzaga.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;