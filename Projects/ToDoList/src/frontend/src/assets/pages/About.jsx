import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-background border-t border-border/40 animate-fade-in pb-24">
      <div className="relative bg-secondary/10 border-b border-border/50 py-24 mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight mb-6">
            About <span className="text-primary">Our Vision</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We are dedicated to building premium products that combine exceptional performance with stunning aesthetics. Our goal is to craft digital experiences that leave a lasting impression.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-slide-up">
        <div className="bg-card shadow-lg shadow-foreground/5 rounded-3xl p-10 border border-border/50">
          <h2 className="text-3xl font-bold text-foreground mb-6">Who We Are</h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-6">
            Our team consists of passionate designers, engineers, and creators who believe that technology should be as beautiful as it is functional.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We obsess over every detail—from the responsive behavior of our components to the subtle gradients that give our platform its unique identity. Our philosophy is rooted in minimalism, speed, and elegance.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 relative">
          <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] -z-10 blur-xl"></div>
          <div className="bg-secondary/40 aspect-square rounded-3xl border border-border flex flex-col items-center justify-center p-6 text-center shadow-sm hover:border-primary/40 transition-colors">
            <span className="text-4xl font-black text-primary mb-2">1M+</span>
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active Users</span>
          </div>
          <div className="bg-secondary/40 aspect-square rounded-3xl border border-border flex flex-col items-center justify-center p-6 text-center shadow-sm translate-y-8 hover:border-primary/40 transition-colors">
            <span className="text-4xl font-black text-primary mb-2">99%</span>
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Satisfaction</span>
          </div>
          <div className="bg-secondary/40 aspect-square rounded-3xl border border-border flex flex-col items-center justify-center p-6 text-center shadow-sm -translate-y-8 hover:border-primary/40 transition-colors">
            <span className="text-4xl font-black text-primary mb-2">24/7</span>
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Support</span>
          </div>
          <div className="bg-secondary/40 aspect-square rounded-3xl border border-border flex flex-col items-center justify-center p-6 text-center shadow-sm hover:border-primary/40 transition-colors">
            <span className="text-4xl font-black text-primary mb-2">50+</span>
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Awards</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About