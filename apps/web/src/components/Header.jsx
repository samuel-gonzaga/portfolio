import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToSection = sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };
  const navItems = [{
    label: 'Projetos',
    id: 'projetos'
  }, {
    label: 'Sobre',
    id: 'sobre'
  }, {
    label: 'Contato',
    id: 'contato'
  }];
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,transform] duration-300 ${isScrolled ? 'bg-white shadow-custom-md' : 'bg-transparent'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })} className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
            Samuel Gonzaga
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-foreground hover:text-primary transition-colors font-medium">
                {item.label}
              </button>)}
          </nav>

          <div className="hidden md:block">
            <Button asChild className="btn-rounded bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="https://api.whatsapp.com/send/?phone=5515991206869&text=Ol%C3%A1%2C+gostaria+de+conversar+sobre+um+projeto&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                Vamos conversar
              </a>
            </Button>
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                {navItems.map(item => <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors">
                    {item.label}
                  </button>)}
                <Button asChild className="btn-rounded bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                  <a href="https://wa.me/5515991206869?text=Olá, gostaria de conversar sobre um projeto" target="_blank" rel="noopener noreferrer">
                    Vamos conversar
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>;
}
export default Header;