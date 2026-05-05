
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Check, Rocket, Github } from 'lucide-react';

function ProjectCard({ project }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'Pronto para publicação':
        return {
          color: 'bg-slate-100 text-slate-700 border-slate-200',
          icon: <Settings className="w-3 h-3 mr-1" />
        };
      case 'Entregue':
        return {
          color: 'bg-secondary/20 text-secondary-foreground border-secondary/30',
          icon: <Check className="w-3 h-3 mr-1" />
        };
      case 'Ativo':
        return {
          color: 'bg-orange-100 text-orange-700 border-orange-200',
          icon: <Rocket className="w-3 h-3 mr-1" />
        };
      default:
        return {
          color: 'bg-muted text-muted-foreground border-border',
          icon: null
        };
    }
  };

  const statusConfig = project.status ? getStatusConfig(project.status) : null;

  return (
    <Card className="relative card-rounded shadow-custom-md hover:shadow-custom-xl transition-all duration-200 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
      {project.status && statusConfig && (
        <div className="absolute top-4 right-4 z-10">
          <div className={`inline-flex items-center px-2.5 py-1 pill-rounded text-xs font-medium border shadow-sm backdrop-blur-md ${statusConfig.color}`}>
            {statusConfig.icon}
            {project.status}
          </div>
        </div>
      )}

      <div className="relative w-full h-48 overflow-hidden bg-muted">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            width="400"
            height="300"
            decoding="async"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Sem imagem
          </div>
        )}
      </div>

      <CardHeader className="card-padding pb-3">
        <h3 className="text-xl font-semibold text-card-foreground leading-snug text-balance">
          {project.title}
        </h3>
      </CardHeader>

      <CardContent className="card-padding pt-0 flex-grow">
        <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-wrap text-sm">
          {project.description}
        </p>
      </CardContent>

      <CardFooter className="card-padding pt-0 mt-auto flex gap-2">
        <Button
          asChild
          variant="outline"
          className={`btn-rounded border-primary text-primary hover:bg-primary hover:text-primary-foreground ${project.githubUrl ? 'w-[90%]' : 'w-full'}`}
        >
          <a href={project.demoUrl || '#'} target="_blank" rel="noopener noreferrer">
            Ver projeto funcionando
          </a>
        </Button>
        
        {project.githubUrl && (
          <Button
            asChild
            variant="outline"
            size="icon"
            className="btn-rounded border-primary text-primary hover:bg-primary hover:text-primary-foreground w-[10%] min-w-[40px] shrink-0"
          >
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="Ver repositório no GitHub">
              <Github className="w-4 h-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default React.memo(ProjectCard);
