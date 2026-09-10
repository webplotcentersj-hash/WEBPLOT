"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Mail, Building, MessageSquare } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío de formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Cerrar y resetear después de un éxito
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP CON BLUR */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            {/* CONTENEDOR MODAL */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevenir cierre al clickear dentro
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* GRADIENTE DE FONDO ANIMADO */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#ea580c_360deg)] animate-[spin_8s_linear_infinite]" />
                <div className="absolute inset-[1px] bg-[#0a0a0a] rounded-3xl" />
              </div>

              {/* CONTENIDO INTERNO */}
              <div className="relative z-10 flex flex-col h-full max-h-[90vh] overflow-y-auto custom-scrollbar p-8 sm:p-12">
                
                {/* BOTÓN CERRAR */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* ENCABEZADO */}
                <div className="mb-10 text-left">
                  <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white mb-2">
                    Iniciar un <span className="text-[#ea580c] font-brier lowercase text-4xl sm:text-5xl">proyecto</span>
                  </h3>
                  <p className="text-white/50 text-sm sm:text-base font-medium">
                    Déjanos tus datos y un especialista se pondrá en contacto contigo para transformar tu visión en realidad.
                  </p>
                </div>

                {/* ESTADO DE ÉXITO */}
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-[#ea580c]/20 border border-[#ea580c]/50 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(234,88,12,0.3)]">
                      <Send className="w-8 h-8 text-[#ea580c] ml-1" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">¡Mensaje Enviado!</h4>
                    <p className="text-white/60">Nos comunicaremos contigo a la brevedad.</p>
                  </motion.div>
                ) : (
                  /* FORMULARIO */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* NOMBRE */}
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-white/30 group-focus-within:text-[#ea580c] transition-colors" />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Nombre completo"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/50 focus:border-[#ea580c] transition-all"
                        />
                      </div>

                      {/* EMAIL */}
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-white/30 group-focus-within:text-[#ea580c] transition-colors" />
                        </div>
                        <input
                          type="email"
                          required
                          placeholder="Correo electrónico"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/50 focus:border-[#ea580c] transition-all"
                        />
                      </div>
                    </div>

                    {/* EMPRESA */}
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-white/30 group-focus-within:text-[#ea580c] transition-colors" />
                      </div>
                      <input
                        type="text"
                        placeholder="Empresa o Proyecto (Opcional)"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/50 focus:border-[#ea580c] transition-all"
                      />
                    </div>

                    {/* MENSAJE */}
                    <div className="relative group">
                      <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                        <MessageSquare className="h-5 w-5 text-white/30 group-focus-within:text-[#ea580c] transition-colors" />
                      </div>
                      <textarea
                        required
                        rows={4}
                        placeholder="¿En qué podemos ayudarte?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/50 focus:border-[#ea580c] transition-all resize-none"
                      />
                    </div>

                    {/* BOTÓN SUBMIT */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative overflow-hidden group bg-[#ea580c] hover:bg-[#c24100] text-white font-bold uppercase tracking-widest py-5 rounded-xl transition-all duration-300 disabled:opacity-70"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                          </span>
                        ) : (
                          <>
                            Enviar Mensaje
                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
