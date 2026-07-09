import React, { useState, useEffect } from "react";
import { ShieldCheck, ArrowRight, Heart, Sparkles, Star, MessageCircle, CreditCard, Compass, Flame, Smile, CheckCircle } from "lucide-react";
import CheckoutView from "./components/CheckoutView";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

const CtaButton = ({ onClick, text, id }: { onClick: (id: string, text: string) => void; text?: string; id: string }) => {
  const buttonText = text || "Quero ter acesso a este caminho prático que vai me permitir conseguir tudo isto acima";
  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-4">
      <button
        id={id}
        onClick={() => onClick(id, buttonText)}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-600 hover:via-orange-700 hover:to-red-700 text-white font-sans font-bold text-center text-sm sm:text-base md:text-lg py-4 px-6 rounded-2xl transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-all duration-300 shadow-xl shadow-orange-950/40 border border-white/15 hover:border-white/25 text-wrap"
      >
        <span className="leading-tight">
          {buttonText}
        </span>
        <ArrowRight className="w-5 h-5 flex-shrink-0 animate-pulse" />
      </button>
    </div>
  );
};

export default function App() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeCta, setActiveCta] = useState<{ id: string; text: string } | null>(null);

  useEffect(() => {
    // Automatically trigger initial view tracking event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 
      event: "pagina_carregada" 
    });
  }, []);

  const handleCtaClick = (id: string, text: string) => {
    setActiveCta({ id, text });
    setShowCheckout(true);

    window.dataLayer = window.dataLayer || [];
    // Envia ÚNICA e EXCLUSIVAMENTE o evento clique_cta nos botões de CTA normais
    window.dataLayer.push({ 
      event: "clique_cta",
      cta_id: id,
      cta_text: text
    });

    // O evento abriu_checkout é disparado junto ao abrir o checkout de forma direta e blindada
    window.dataLayer.push({ 
      event: "abriu_checkout",
      cta_id: id,
      cta_text: text
    });
  };

  const handleConfirmCheckout = () => {
    setShowPopup(false);
    setShowCheckout(true);

    window.dataLayer = window.dataLayer || [];
    // O evento abriu_checkout é disparado APENAS no botão que realmente mostra/abre a tela de checkout
    window.dataLayer.push({ 
      event: "abriu_checkout",
      cta_id: activeCta?.id || "unknown",
      cta_text: activeCta?.text || ""
    });
  };

  const handleBackFromCheckout = () => {
    setShowCheckout(false);
  };

  if (showCheckout) {
    return <CheckoutView onBack={handleBackFromCheckout} />;
  }

  return (
    <div className="relative min-h-screen bg-black text-white font-sans flex flex-col justify-between overflow-y-auto select-none">
      
      {/* Background Calm and Inspiring Sunset Image with Multi-layered vignettes */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/sunset_hero.png"
          alt="Sunset Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center select-none opacity-25"
        />
        {/* Soft, glowing radial focus over the golden sunset shades */}
        <div className="absolute inset-0 bg-radial-[circle_at_75%_30%] from-orange-500/10 via-black/60 to-black pointer-events-none mix-blend-screen" />
        
        {/* Sun Glow elements matching Immersive UI specifications */}
        <div className="absolute top-[10%] right-[15%] w-72 h-72 rounded-full blur-3xl bg-orange-500/15 opacity-40 pointer-events-none" />
        <div className="absolute bottom-[20%] left-[10%] w-80 h-80 rounded-full blur-3xl bg-amber-500/10 opacity-30 pointer-events-none" />
        
        {/* Deep ambient gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/90" />
      </div>

      {/* Desktop Top Toolbar Info Bar */}
      <header className="relative z-10 w-full max-w-4xl mx-auto px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-widest text-neutral-400">
          PROPRIEDADE DE VERIFICAÇÃO DE MUDANÇA DE VIDA
        </span>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900/80 backdrop-blur-md rounded-full border border-white/10">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[9px] font-mono tracking-widest text-white/90 font-bold uppercase">
            MÉTODO ATUALIZADO 2026
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">
            {/* Section 1: Hero Block */}
        <section className="text-center flex flex-col gap-6 py-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-amber-100 font-bold leading-tight tracking-tight drop-shadow-md">
            Aprenda como fazer o jejum que Deus atende e tenha respostas em oração
          </h1>
          
          <div className="grid grid-cols-1 gap-3.5 text-left mt-4 max-w-xl mx-auto w-full">
            <div className="flex items-start gap-3 p-3 bg-neutral-900/60 backdrop-blur-sm rounded-xl border border-white/5">
              <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
              <p className="text-sm sm:text-base text-neutral-200">Consiga ter força para continuar na caminhada e vencer</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-neutral-900/60 backdrop-blur-sm rounded-xl border border-white/5">
              <Smile className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-neutral-200">Consiga enxergar solução onde você não está vendo saída</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-neutral-900/60 backdrop-blur-sm rounded-xl border border-white/5">
              <Heart className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-neutral-200">Consiga colocar sua vida de volta aos trilhos</p>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-neutral-900/60 backdrop-blur-sm rounded-xl border border-white/5">
              <Compass className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-neutral-200">Consiga sair da vida do pecado</p>
            </div>
          </div>

          <CtaButton onClick={handleCtaClick} id="cta-hero" />
        </section>

        {/* Section 2: Overcoming Struggles */}
        <section className="py-2">
          <div className="bg-neutral-950/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-serif font-semibold text-amber-200 mb-6 border-b border-white/5 pb-3">
              Tenha acesso a um caminho prático que vai te permitir:
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                <p className="text-neutral-200 text-sm sm:text-base font-medium">
                  Se conectar com Deus
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                <p className="text-neutral-200 text-sm sm:text-base font-medium">
                  Se libertar de uma vez por todas da tristeza
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                <p className="text-neutral-200 text-sm sm:text-base font-medium">
                  Deixar de ter a mente tomada pelo medo
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                <p className="text-neutral-200 text-sm sm:text-base font-medium">
                  Ter paz e união no seu relacionamento
                </p>
              </div>
            </div>
          </div>
          <CtaButton onClick={handleCtaClick} id="cta-superacao" />
        </section>

        {/* Section 3: Victory & Faith */}
        <section className="py-2">
          <div className="bg-neutral-950/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-serif font-semibold text-amber-200 mb-6 border-b border-white/5 pb-3">
              Com esse caminho prático você vai conseguir:
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-neutral-200 text-sm sm:text-base font-medium">
                  Se libertar dos vícios que estão prejudicando sua vida e a vida de quem você ama
                </p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-neutral-200 text-sm sm:text-base font-medium">
                  Se libertar dos pensamentos horríveis e maléficos
                </p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-neutral-200 text-sm sm:text-base font-medium">
                  Restaurar de uma vez por todas sua vida profissional
                </p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-neutral-200 text-sm sm:text-base font-medium">
                  Se confortar caso esteja passando por um luto e está com saudades
                </p>
              </div>
            </div>
          </div>
          <CtaButton onClick={handleCtaClick} id="cta-vitoria-fe" />
        </section>

        {/* Section 4: Family Grace */}
        <section className="py-2">
          <div className="bg-neutral-950/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-serif font-semibold text-amber-200 mb-6 border-b border-white/5 pb-3">
              Esse caminho prático é para quem:
            </h2>
            <div className="flex flex-col gap-4.5">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-neutral-200 text-sm sm:text-base">
                  Quer se aproximar de Deus
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-neutral-200 text-sm sm:text-base">
                  Quer conseguir ouvir a palavra que vem diretamente do trono de Deus
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-neutral-200 text-sm sm:text-base">
                  Quer que Deus ilumine seu caminho e derrame bênçãos na sua vida
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-neutral-200 text-sm sm:text-base">
                  Quer viver em santidade ao senhor para que ele te afaste de tudo aquilo que não é da vontade dele todo poderoso
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-neutral-200 text-sm sm:text-base">
                  Quer conseguir viver em obediência ao Senhor
                </p>
              </div>
            </div>
          </div>
          <CtaButton onClick={handleCtaClick} id="cta-graca-familia" />
        </section>

        {/* Section 5: Testimonial 1 */}
        <section className="py-2">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col justify-between shadow-lg relative">
            <div className="text-amber-400/20 text-6xl font-serif absolute top-2 left-4 pointer-events-none select-none">“</div>
            <p className="text-neutral-300 text-sm sm:text-base italic leading-relaxed relative z-10 pt-4">
              "Eu jejuava, orava, mas parecia que nada acontecia... até que aprendi o jejum que Deus atende de verdade. Pela primeira vez, senti paz, ouvi Deus claramente e recebi respostas que eu buscava há anos. Meu coração está em paz e minha fé foi restaurada."
            </p>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
              <span className="text-sm font-bold text-amber-200">— Rebeca C.</span>
              <div className="flex gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
          </div>
          <CtaButton onClick={handleCtaClick} id="cta-depoimento-1" />
        </section>

        {/* Section 6: Testimonial 2 */}
        <section className="py-2">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col justify-between shadow-lg relative">
            <div className="text-amber-400/20 text-6xl font-serif absolute top-2 left-4 pointer-events-none select-none">“</div>
            <p className="text-neutral-300 text-sm sm:text-base italic leading-relaxed relative z-10 pt-4">
              "Eu achava que não tinha mais jeito. Estava preso em vícios que destruíam meu casamento, minha saúde e meu relacionamento com Deus. Com esse caminho prático, fui sendo libertado dia após dia. Hoje tenho direção, força espiritual e voltou a sorrir."
            </p>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
              <span className="text-sm font-bold text-amber-200">— Felipe D.</span>
              <div className="flex gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
          </div>
          <CtaButton onClick={handleCtaClick} id="cta-depoimento-2" />
        </section>

        {/* Section 7: Benefits */}
        <section className="py-2">
          <div className="bg-neutral-950/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-serif font-semibold text-amber-200 mb-6 border-b border-white/5 pb-3">
              Adquirindo o caminho prático, você vai conseguir:
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-neutral-200 text-sm sm:text-base font-medium">
                  Fazer uma oração poderosa para que você ou alguém que você ama consiga se libertar das drogas
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-neutral-200 text-sm sm:text-base font-medium">
                  Voltar a ser querida(o) pelas pessoas que você teve conflitos
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-neutral-200 text-sm sm:text-base font-medium">
                  Conseguir fazer uma super oração para que toda sua família comece a seguir Deus
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-neutral-200 text-sm sm:text-base font-medium">
                  Ter as promessas do Senhor cumpridas em sua vida
                </p>
              </div>
            </div>
          </div>
          <CtaButton onClick={handleCtaClick} id="cta-beneficios" />
        </section>

        {/* Section 8: FAQ */}
        <section className="py-2 flex flex-col gap-6">
          <h2 className="text-2xl font-serif font-semibold text-center text-amber-100">
            Perguntas frequentes:
          </h2>
          <div className="flex flex-col gap-4">
            <div className="bg-neutral-900/60 backdrop-blur-sm p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-2.5">
                <MessageCircle className="w-5 h-5 text-green-400" />
                <h3 className="font-bold text-base text-white">Como recebo meu caminho prático?</h3>
              </div>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Assim que o pagamento for confirmado você receberá seu caminho prático por Whatsapp e o terá com acesso vitalício, para acessar quando e onde quiser.
              </p>
            </div>

            <div className="bg-neutral-900/60 backdrop-blur-sm p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-2.5">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">Quais são as formas de pagamento disponíveis?</h3>
              </div>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Pix e cartão de crédito.
              </p>
            </div>
          </div>
          <CtaButton onClick={handleCtaClick} id="cta-faq" />
        </section>

        {/* Section 9: Testimonial 3 */}
        <section className="py-2">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col justify-between shadow-lg relative">
            <div className="text-amber-400/20 text-6xl font-serif absolute top-2 left-4 pointer-events-none select-none">“</div>
            <p className="text-neutral-300 text-sm sm:text-base italic leading-relaxed relative z-10 pt-4">
              "Eu estava desempregado, cheio de dívidas e com a mente cheia de medo. Esse caminho prático me ensinou como buscar sabedoria do alto. Pouco tempo depois, portas começaram a se abrir. Hoje estou trabalhando, reorganizando minha vida e firme com Deus."
            </p>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
              <span className="text-sm font-bold text-amber-200">— Tiago F.</span>
              <div className="flex gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
          </div>
          <CtaButton onClick={handleCtaClick} id="cta-depoimento-3" />
        </section>

        {/* Section 10: Testimonial 4 */}
        <section className="py-2">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col justify-between shadow-lg relative">
            <div className="text-amber-400/20 text-6xl font-serif absolute top-2 left-4 pointer-events-none select-none">“</div>
            <p className="text-neutral-300 text-sm sm:text-base italic leading-relaxed relative z-10 pt-4">
              "Meu filho estava preso nas drogas há anos... eu já não sabia mais o que fazer. When fiz a oração que aprendi nesse caminho prático, algo mudou. Deus entrou com poder! Hoje ele está limpo, em paz, e voltamos a viver como família. Foi um milagre!"
            </p>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
              <span className="text-sm font-bold text-amber-200">— Cristina S.</span>
              <div className="flex gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
          </div>
          <CtaButton onClick={handleCtaClick} id="cta-depoimento-4" />
        </section>

        {/* Section 11: Pricing Area */}
        <section className="py-4">
          <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-3xl p-8 sm:p-10 border border-amber-500/20 shadow-2xl text-center max-w-lg mx-auto relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
            <h3 className="text-lg sm:text-xl font-medium text-neutral-400 uppercase tracking-widest mb-3 font-mono">
              Adquira agora o caminho prático por:
            </h3>
            
            <div className="flex flex-col gap-2 items-center justify-center my-6">
              <span className="text-lg sm:text-xl text-neutral-500 line-through font-semibold">
                De R$69
              </span>
              <span className="text-4xl sm:text-5xl md:text-6xl font-serif text-amber-400 font-extrabold tracking-tight drop-shadow-sm leading-tight">
                por apenas R$10!
              </span>
            </div>
          </div>
          <CtaButton onClick={handleCtaClick} id="cta-preco" />
        </section>

        {/* Section 12: Testimonial 5 */}
        <section className="py-2">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col justify-between shadow-lg relative">
            <div className="text-amber-400/20 text-6xl font-serif absolute top-2 left-4 pointer-events-none select-none">“</div>
            <p className="text-neutral-300 text-sm sm:text-base italic leading-relaxed relative z-10 pt-4">
              "Sempre fui a única da minha casa a buscar a Deus. Me sentia sozinha. Depois que fiz o que foi ensinado nesse caminho prático, algo começou a acontecer... Um por um, meus familiares começaram a se aproximar de Deus. Hoje temos culto em casa toda semana!"
            </p>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
              <span className="text-sm font-bold text-amber-200">— Brenda P.</span>
              <div className="flex gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
          </div>
          <CtaButton onClick={handleCtaClick} id="cta-depoimento-5" />
        </section>

        {/* Section 13: Testimonial 6 */}
        <section className="py-2">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col justify-between shadow-lg relative">
            <div className="text-amber-400/20 text-6xl font-serif absolute top-2 left-4 pointer-events-none select-none">“</div>
            <p className="text-neutral-300 text-sm sm:text-base italic leading-relaxed relative z-10 pt-4">
              "Recebi um diagnóstico difícil. Foi um choque. Mas ao aplicar o que aprendi nesse caminho prático, fiz uma oração com fé, entregando tudo nas mãos de Deus. Minha fé foi renovada e, para glória de Deus, minha cura veio. O médico não soube explicar... mas eu sei quem curou!"
            </p>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
              <span className="text-sm font-bold text-amber-200">— Miguel B.</span>
              <div className="flex gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
          </div>
          <CtaButton onClick={handleCtaClick} id="cta-depoimento-6" />
        </section>

      </main>

      {/* Sleek secure disclaimer footer */}
      <footer className="relative z-10 w-full px-6 py-8 border-t border-white/5 text-center text-xs text-neutral-500 font-mono flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-orange-400 animate-pulse" />
        <span className="tracking-widest">AMBIENTE 100% SEGURO & PRIVADO</span>
      </footer>

    </div>
  );
}

