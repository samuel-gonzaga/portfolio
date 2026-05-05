
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

function ProjectModal({ isOpen, onClose, project }) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-balance">
            {project.title}
          </DialogTitle>
          {project.client && (
            <p className="text-sm text-muted-foreground mt-1">
              Cliente: {project.client}
            </p>
          )}
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            {project.thumbnail && (
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  loading="lazy"
                  width="672"
                  height="256"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {project.description && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Visão Geral</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}

            {project.challenge && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Desafio</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.challenge}
                </p>
              </div>
            )}

            {project.solution && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Solução técnica</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}

            {project.result && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Resultado</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.result}
                </p>
              </div>
            )}

            <div className="bg-muted p-4 rounded-lg border border-border">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-foreground">Stack: </span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {Array.isArray(project.stack) ? project.stack.join(' • ') : project.stack}
                  </span>
                </div>
                {project.differential && (
                  <div>
                    <span className="text-sm font-medium text-foreground">Destaque: </span>
                    <span className="text-sm text-muted-foreground">{project.differential}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectModal;
