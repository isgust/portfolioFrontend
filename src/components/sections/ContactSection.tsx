import { Mail, Linkedin, Github, Send, Phone, MapPin, MessageSquare } from "lucide-react";
import ShortsLayout from "../ShortsLayout";
import TechVideoBackground from "../TechVideoBackground";

const ContactSection = () => {
  return (
    <ShortsLayout sectionLabel="Vamos Conversar?" sectionNumber={6} totalSections={6} sectionId="contato">
      <div className="shorts-content flex flex-col justify-between py-6 relative overflow-hidden">
        <TechVideoBackground type="contato" />
        
        <div className="relative z-10 w-full flex flex-col items-center my-auto px-2">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest font-mono">Contato & Parcerias</span>
          <h2 className="text-2xl md:text-3xl font-bold font-display mt-0.5 mb-1">
            Vamos <span className="gradient-text">Conversar?</span>
          </h2>
          <p className="text-xs text-muted-foreground mb-6 max-w-xs text-center">
            Aberto a oportunidades para Desenvolvedor BackEnd Java / Full Stack.
          </p>

          <div className="space-y-3 w-full">
            {/* Primary Email CTA */}
            <a 
              href="mailto:rocha.gustavops@gmail.com"
              className="glass-card p-3 flex items-center justify-between gap-3 hover:border-primary/60 transition-all duration-300 group shadow-lg"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-[10px] text-muted-foreground font-mono">E-mail Principal</p>
                  <p className="text-xs font-semibold text-foreground truncate">rocha.gustavops@gmail.com</p>
                </div>
              </div>
              <Send className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Phone / WhatsApp */}
            <a 
              href="https://wa.me/5598991939476"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-3 flex items-center justify-between gap-3 hover:border-accent/60 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-accent/20 text-accent shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-[10px] text-muted-foreground font-mono">Telefone / WhatsApp</p>
                  <p className="text-xs font-semibold text-foreground truncate">(98) 99193-9476</p>
                </div>
              </div>
              <MessageSquare className="w-4 h-4 text-accent shrink-0 group-hover:scale-110 transition-transform" />
            </a>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a 
                href="https://github.com/isgust" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-card p-3 flex items-center gap-2.5 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="p-2 rounded-lg bg-secondary text-foreground group-hover:text-primary transition-colors">
                  <Github className="w-4 h-4" />
                </div>
                <div className="text-left truncate">
                  <p className="text-[9px] text-muted-foreground font-mono">GitHub</p>
                  <p className="text-xs font-semibold text-foreground truncate">/isgust</p>
                </div>
              </a>

              <a 
                href="https://www.linkedin.com/in/gustavosilvrocha" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-card p-3 flex items-center gap-2.5 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="p-2 rounded-lg bg-secondary text-foreground group-hover:text-primary transition-colors">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="text-left truncate">
                  <p className="text-[9px] text-muted-foreground font-mono">LinkedIn</p>
                  <p className="text-xs font-semibold text-foreground truncate">/gustavosilvrocha</p>
                </div>
              </a>
            </div>

            {/* Location */}
            <div className="glass-card p-2.5 flex items-center justify-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-muted-foreground font-medium">São Luís, Maranhão — Brasil</span>
            </div>
          </div>
          
          <p className="text-[10px] text-muted-foreground mt-5 font-mono">
            © 2026 • Gustavo Rocha • Portfólio Full-Stack
          </p>
        </div>
      </div>
    </ShortsLayout>
  );
};

export default ContactSection;
