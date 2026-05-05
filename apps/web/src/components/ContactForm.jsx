import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import EMAILJS_CONFIG from '@/lib/emailjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  User,
  MessageSquare,
} from 'lucide-react';

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  projectSummary: '',
};

const INITIAL_TOUCHED = {
  name: false,
  email: false,
  phone: false,
  projectSummary: false,
};

const PHONE_MASK = '(XX) XXXXX-XXXX';
const TEXTAREA_MAX_LENGTH = 500;

function validateField(name, value) {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Nome é obrigatório';
      if (value.trim().length < 3) return 'Nome deve ter pelo menos 3 caracteres';
      return '';
    case 'email':
      if (!value.trim()) return 'Email é obrigatório';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido';
      return '';
    case 'phone':
      if (!value.trim()) return 'Telefone é obrigatório';
      const digits = value.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 11) return 'Telefone inválido';
      return '';
    case 'projectSummary':
      if (!value.trim()) return 'Resumo do projeto é obrigatório';
      if (value.trim().length < 10) return 'Descreva um pouco mais o projeto (mín. 10 caracteres)';
      return '';
    default:
      return '';
  }
}

function validateForm(formData) {
  const newErrors = {};
  Object.keys(formData).forEach((field) => {
    const error = validateField(field, formData[field]);
    if (error) newErrors[field] = error;
  });
  return newErrors;
}

function applyPhoneMask(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';

  let masked = '(';
  if (digits.length > 0) masked += digits.slice(0, 2);
  if (digits.length >= 3) masked += ') ' + digits.slice(2, 7);
  if (digits.length >= 8) masked += '-' + digits.slice(7, 11);

  return masked;
}

function ContactForm() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(INITIAL_TOUCHED);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const errorRefs = useRef({});

  // Scroll to first error
  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField && errorRefs.current[firstErrorField]) {
      errorRefs.current[firstErrorField]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [errors]);

  // Reset success state after 5 seconds
  useEffect(() => {
    if (!isSuccess) return;
    const timer = setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let processedValue = value;
    if (name === 'phone') {
      processedValue = applyPhoneMask(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Validate on change only if field has been touched
    if (touched[name]) {
      const error = validateField(name, processedValue);
      setErrors((prev) => {
        const next = { ...prev };
        if (error) {
          next[name] = error;
        } else {
          delete next[name];
        }
        return next;
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (error) {
        next[name] = error;
      } else {
        delete next[name];
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      projectSummary: true,
    });

    // Validate all fields
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Por favor, corrija os erros no formulário', {
        icon: <AlertCircle className="h-4 w-4" />,
      });

      // Focus first field with error
      const firstErrorField = Object.keys(validationErrors)[0];
      const firstErrorInput = formRef.current?.querySelector(
        `[name="${firstErrorField}"]`
      );
      firstErrorInput?.focus();

      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.projectSummary,
          phone: formData.phone,
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      toast.success('Mensagem enviada com sucesso!', {
        icon: <CheckCircle2 className="h-4 w-4" />,
      });

      setIsSuccess(true);
      setFormData(INITIAL_FORM_DATA);
      setTouched(INITIAL_TOUCHED);
      setErrors({});
    } catch (error) {
      console.error('[EmailJS Error]', error);

      toast.error('Erro ao enviar mensagem. Tente novamente mais tarde.', {
        icon: <AlertCircle className="h-4 w-4" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldIcon = (field) => {
    switch (field) {
      case 'name':
        return <User className="h-4 w-4 text-muted-foreground" />;
      case 'email':
        return <Mail className="h-4 w-4 text-muted-foreground" />;
      case 'phone':
        return <Phone className="h-4 w-4 text-muted-foreground" />;
      case 'projectSummary':
        return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getInputClassName = (field) => {
    const base =
      'bg-background text-foreground placeholder:text-muted-foreground transition-all duration-200 focus-visible:ring-2';
    if (errors[field] && touched[field]) {
      return `${base} border-destructive focus-visible:ring-destructive/30`;
    }
    if (touched[field] && !errors[field] && formData[field]) {
      return `${base} border-emerald-500/50 focus-visible:ring-emerald-500/30`;
    }
    return `${base}`;
  };

  // Success state
  if (isSuccess) {
    return (
      <section id="contato" className="section-gap bg-muted">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground leading-tight text-balance mb-4"
                style={{ letterSpacing: '-0.02em' }}
              >
                Próximo projeto? Pode ser o seu.
              </h2>
              <p className="text-lg text-muted-foreground">
                Trabalho com profissionais e pequenos negócios que querem presença
                digital que funciona.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-emerald-500/20 shadow-custom-md">
                <CardContent className="flex flex-col items-center justify-center py-16 px-8 text-center">
                  <div className="rounded-full bg-emerald-500/10 p-4 mb-6">
                    <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    Mensagem enviada! 🎉
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-sm">
                    Recebi sua mensagem e entrarei em contato em até 24h. Fique de
                    olho no seu email e WhatsApp!
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-col justify-center space-y-6">
                <div className="bg-secondary/10 p-6 card-rounded border border-secondary/20 transition-all duration-300 hover:shadow-md">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Prefere conversar direto?
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Me chame no WhatsApp e vamos discutir seu projeto sem
                    compromisso.
                  </p>
                  <Button
                    asChild
                    className="w-full btn-rounded bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all duration-200 active:scale-[0.98]"
                  >
                    <a
                      href="https://wa.me/5515991206869?text=Olá, gostaria de conversar sobre um projeto"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Abrir WhatsApp
                    </a>
                  </Button>
                </div>

                <div className="bg-background p-6 card-rounded shadow-custom-sm border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    O que acontece depois?
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Respondo em até 24h com perguntas sobre o projeto
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Alinhamos escopo, prazo e investimento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Começamos o desenvolvimento com entregas parciais
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contato" className="section-gap bg-muted">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground leading-tight text-balance mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Próximo projeto? Pode ser o seu.
            </h2>
            <p className="text-lg text-muted-foreground">
              Trabalho com profissionais e pequenos negócios que querem presença
              digital que funciona.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-custom-md">
              <CardHeader>
                <h3 className="text-xl font-semibold text-foreground">
                  Envie sua mensagem
                </h3>
                <p className="text-sm text-muted-foreground">
                  Preencha o formulário abaixo e entrarei em contato
                </p>
              </CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Nome
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {getFieldIcon('name')}
                      </div>
                      <Input
                        ref={(el) => (errorRefs.current.name = el)}
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Seu nome completo"
                        autoComplete="name"
                        pattern=".{3,}"
                        title="Nome deve ter pelo menos 3 caracteres"
                        disabled={isSubmitting}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                        className={`${getInputClassName('name')} pl-10`}
                      />
                    </div>
                    {errors.name && touched.name && (
                      <p
                        id="name-error"
                        className="text-sm text-destructive flex items-center gap-1.5"
                        role="alert"
                      >
                        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {getFieldIcon('email')}
                      </div>
                      <Input
                        ref={(el) => (errorRefs.current.email = el)}
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="seu@email.com"
                        autoComplete="email"
                        disabled={isSubmitting}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                        className={`${getInputClassName('email')} pl-10`}
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p
                        id="email-error"
                        className="text-sm text-destructive flex items-center gap-1.5"
                        role="alert"
                      >
                        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Telefone / WhatsApp
                    </Label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {getFieldIcon('phone')}
                      </div>
                      <Input
                        ref={(el) => (errorRefs.current.phone = el)}
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={PHONE_MASK}
                        autoComplete="tel"
                        pattern="\(\d{2}\)\s\d{4,5}-\d{4}"
                        title="Formato: (XX) XXXXX-XXXX"
                        disabled={isSubmitting}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        aria-invalid={errors.phone && touched.phone ? 'true' : 'false'}
                        className={`${getInputClassName('phone')} pl-10`}
                      />
                    </div>
                    {errors.phone && touched.phone && (
                      <p
                        id="phone-error"
                        className="text-sm text-destructive flex items-center gap-1.5"
                        role="alert"
                      >
                        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Project Summary Field */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="projectSummary" className="text-foreground">
                        Resumo do projeto
                      </Label>
                      <span
                        className={`text-xs ${
                          formData.projectSummary.length >= TEXTAREA_MAX_LENGTH
                            ? 'text-destructive font-medium'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {formData.projectSummary.length}/{TEXTAREA_MAX_LENGTH}
                      </span>
                    </div>
                    <div className="relative">
                      <Textarea
                        ref={(el) => (errorRefs.current.projectSummary = el)}
                        id="projectSummary"
                        name="projectSummary"
                        value={formData.projectSummary}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Conte um pouco sobre o que você precisa..."
                        rows={5}
                        maxLength={TEXTAREA_MAX_LENGTH}
                        autoComplete="off"
                        disabled={isSubmitting}
                        aria-describedby={
                          errors.projectSummary
                            ? 'projectSummary-error'
                            : undefined
                        }
                        aria-invalid={
                          errors.projectSummary && touched.projectSummary
                            ? 'true'
                            : 'false'
                        }
                        className={`${getInputClassName('projectSummary')} resize-none`}
                      />
                    </div>
                    {errors.projectSummary && touched.projectSummary && (
                      <p
                        id="projectSummary-error"
                        className="text-sm text-destructive flex items-center gap-1.5"
                        role="alert"
                      >
                        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>{errors.projectSummary}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-rounded bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar mensagem
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center font-mono">
                    Resposta em até 24h
                  </p>
                </form>
              </CardContent>
            </Card>

            <div className="flex flex-col justify-center space-y-6">
              <div className="bg-secondary/10 p-6 card-rounded border border-secondary/20 transition-all duration-300 hover:shadow-md">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Prefere conversar direto?
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Me chame no WhatsApp e vamos discutir seu projeto sem
                  compromisso.
                </p>
                <Button
                  asChild
                  className="w-full btn-rounded bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all duration-200 active:scale-[0.98]"
                >
                  <a
                    href="https://wa.me/5515991206869?text=Olá, gostaria de conversar sobre um projeto"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir WhatsApp
                  </a>
                </Button>
              </div>

              <div className="bg-background p-6 card-rounded shadow-custom-sm border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  O que acontece depois?
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Respondo em até 24h com perguntas sobre o projeto
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Alinhamos escopo, prazo e investimento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Começamos o desenvolvimento com entregas parciais
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
