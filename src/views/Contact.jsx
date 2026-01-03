import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Loader2,
  CheckCircle,
  AlertCircle,
  Shield,
} from "lucide-react";
import SITE from "../config/Variables";

gsap.registerPlugin(ScrollTrigger);

// ===== CONFIGURACIÓN DE SEGURIDAD =====
const SECURITY_CONFIG = {
  MIN_TIME_BETWEEN_SUBMISSIONS: 60000, // 60 segundos entre envíos
  MAX_DAILY_SUBMISSIONS: 5, // Máximo 5 mensajes por día por IP/usuario
  HONEYPOT_FIELD: "website", // Campo trampa para bots
  MIN_TYPING_TIME: 5000, // Tiempo mínimo de 5 segundos antes de poder enviar
};

const Contact = () => {
  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const emailFormRef = useRef(null);
  const formStartTime = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [timeUntilNextSubmit, setTimeUntilNextSubmit] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  // ===== SISTEMA DE RATE LIMITING =====
  const checkRateLimit = () => {
    const now = Date.now();
    const submissions = JSON.parse(
      localStorage.getItem("formSubmissions") || "[]"
    );

    // Limpiar envíos antiguos (más de 24 horas)
    const recentSubmissions = submissions.filter(
      (time) => now - time < 24 * 60 * 60 * 1000
    );

    // Verificar límite diario
    if (recentSubmissions.length >= SECURITY_CONFIG.MAX_DAILY_SUBMISSIONS) {
      setIsRateLimited(true);
      return false;
    }

    // Verificar tiempo mínimo entre envíos
    const lastSubmission = recentSubmissions[recentSubmissions.length - 1];
    if (
      lastSubmission &&
      now - lastSubmission < SECURITY_CONFIG.MIN_TIME_BETWEEN_SUBMISSIONS
    ) {
      const timeLeft =
        SECURITY_CONFIG.MIN_TIME_BETWEEN_SUBMISSIONS - (now - lastSubmission);
      setTimeUntilNextSubmit(Math.ceil(timeLeft / 1000));
      return false;
    }

    return true;
  };

  const recordSubmission = () => {
    const submissions = JSON.parse(
      localStorage.getItem("formSubmissions") || "[]"
    );
    submissions.push(Date.now());
    localStorage.setItem("formSubmissions", JSON.stringify(submissions));
  };

  // ===== TEMPORIZADOR DE COOLDOWN =====
  useEffect(() => {
    if (timeUntilNextSubmit > 0) {
      const timer = setInterval(() => {
        setTimeUntilNextSubmit((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeUntilNextSubmit]);

  // ===== VALIDACIÓN ANTI-BOT =====
  const validateHumanInteraction = (data) => {
    // 1. Verificar honeypot (campo invisible que solo los bots llenan)
    if (data[SECURITY_CONFIG.HONEYPOT_FIELD]) {
      console.warn("Bot detected: Honeypot filled");
      return false;
    }

    // 2. Verificar tiempo mínimo de llenado del formulario
    const timeTaken = Date.now() - formStartTime.current;
    if (timeTaken < SECURITY_CONFIG.MIN_TYPING_TIME) {
      console.warn("Bot detected: Form filled too quickly");
      return false;
    }

    // 3. Verificar que el contenido no sea spam obvio
    const spamKeywords = [
      "viagra",
      "casino",
      "lottery",
      "prize",
      "click here",
      "buy now",
    ];
    const messageContent =
      `${data.name} ${data.email} ${data.subject} ${data.message}`.toLowerCase();
    if (spamKeywords.some((keyword) => messageContent.includes(keyword))) {
      console.warn("Spam keywords detected");
      return false;
    }

    // 4. Verificar que el mensaje no sea todo en mayúsculas
    if (
      data.message === data.message.toUpperCase() &&
      data.message.length > 20
    ) {
      console.warn("Message is all caps");
      return false;
    }

    // 5. Verificar URLs sospechosas (más de 3 links en el mensaje)
    const urlCount = (data.message.match(/https?:\/\//g) || []).length;
    if (urlCount > 3) {
      console.warn("Too many URLs in message");
      return false;
    }

    return true;
  };

  // ===== ENVÍO DEL FORMULARIO =====
  const onSubmit = async (data) => {
    // Verificar rate limiting
    if (!checkRateLimit()) {
      setSubmitStatus("ratelimit");
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    // Validar interacción humana
    if (!validateHumanInteraction(data)) {
      setSubmitStatus("spam");
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Configuración de EmailJS
      const serviceId = "service_byh41et";
      const templateId = "template_qmnb7pj";
      const publicKey = "TnZ-QqxhC9x_lR_oE";

      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_name: "Tu Nombre",
        // Agregar información adicional de seguridad
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      // Registrar envío exitoso
      recordSubmission();
      setSubmitStatus("success");
      reset();

      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("Error al enviar email:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===== INICIALIZAR TIEMPO DE FORMULARIO =====
  useEffect(() => {
    formStartTime.current = Date.now();

    // Verificar rate limit al cargar
    checkRateLimit();
  }, []);

  // ===== ANIMACIONES GSAP =====
  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        once: true,
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        formRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        infoRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );
  }, []);

  return (
    <section
      id="contact"
      ref={contactRef}
      className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
          >
            Contáctame
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            ¿Interesado en trabajar juntos? ¡Hablemos! Estoy disponible para
            proyectos freelance, colaboraciones o simplemente para charlar sobre
            tecnología.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div
            ref={formRef}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Envíame un mensaje
              </h3>
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <Shield className="w-4 h-4" />
                <span className="font-medium">Protegido</span>
              </div>
            </div>

            {/* Success Message */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">
                    ¡Mensaje enviado exitosamente!
                  </p>
                  <p className="text-sm text-green-700">
                    Te responderé lo antes posible.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Error al enviar el mensaje</p>
                  <p className="text-sm text-red-700">
                    Por favor, intenta nuevamente o contáctame directamente.
                  </p>
                </div>
              </div>
            )}

            {/* Rate Limit Message */}
            {submitStatus === "ratelimit" && (
              <div className="mb-6 p-4 bg-orange-50 border border-orange-200 text-orange-800 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Límite de envíos alcanzado</p>
                  <p className="text-sm text-orange-700">
                    {timeUntilNextSubmit > 0
                      ? `Por favor espera ${timeUntilNextSubmit} segundos antes de enviar otro mensaje.`
                      : `Has alcanzado el límite diario de mensajes. Intenta mañana o contáctame directamente.`}
                  </p>
                </div>
              </div>
            )}

            {/* Spam Detection Message */}
            {submitStatus === "spam" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-start gap-3">
                <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Mensaje no permitido</p>
                  <p className="text-sm text-red-700">
                    El contenido del mensaje ha sido detectado como spam. Por
                    favor revisa tu mensaje y asegúrate de que sea legítimo.
                  </p>
                </div>
              </div>
            )}

            {/* Rate Limit Warning */}
            {isRateLimited && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Límite diario alcanzado</p>
                  <p className="text-sm text-yellow-700">
                    Has enviado el máximo de mensajes permitidos hoy. Por favor
                    contáctame directamente o intenta mañana.
                  </p>
                </div>
              </div>
            )}

            <form
              ref={emailFormRef}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Honeypot field - Campo invisible para atrapar bots */}
              <input
                type="text"
                {...register(SECURITY_CONFIG.HONEYPOT_FIELD)}
                style={{ display: "none" }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Nombre *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "El nombre es requerido",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                    maxLength: { value: 100, message: "Máximo 100 caracteres" },
                  })}
                  className={`w-full px-4 py-3 border ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  } bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="Tu nombre completo"
                  disabled={isSubmitting || isRateLimited}
                />
                {errors.name && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "El email es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido",
                    },
                  })}
                  className={`w-full px-4 py-3 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="tu@email.com"
                  disabled={isSubmitting || isRateLimited}
                />
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Asunto *
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject", {
                    required: "El asunto es requerido",
                    minLength: { value: 3, message: "Mínimo 3 caracteres" },
                    maxLength: { value: 150, message: "Máximo 150 caracteres" },
                  })}
                  className={`w-full px-4 py-3 border ${
                    errors.subject ? "border-red-300" : "border-gray-300"
                  } bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="¿En qué puedo ayudarte?"
                  disabled={isSubmitting || isRateLimited}
                />
                {errors.subject && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  rows="5"
                  {...register("message", {
                    required: "El mensaje es requerido",
                    minLength: { value: 10, message: "Mínimo 10 caracteres" },
                    maxLength: {
                      value: 1000,
                      message: "Máximo 1000 caracteres",
                    },
                  })}
                  className={`w-full px-4 py-3 border ${
                    errors.message ? "border-red-300" : "border-gray-300"
                  } bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                  placeholder="Cuéntame más sobre tu proyecto o consulta..."
                  disabled={isSubmitting || isRateLimited}
                ></textarea>
                {errors.message && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={
                  isSubmitting || isRateLimited || timeUntilNextSubmit > 0
                }
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : timeUntilNextSubmit > 0 ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    Espera {timeUntilNextSubmit}s
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Enviar Mensaje
                  </>
                )}
              </button>

              {/* Security Info */}
              <p className="text-xs text-gray-500 text-center mt-3 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                Tu mensaje está protegido contra spam y abuso
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Información de Contacto
              </h3>

              <div className="space-y-4">
                <div className="flex items-start p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${
                        SITE.contact?.email || "correo@ejemplo.com"
                      }`}
                      className="text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {SITE.contact?.email || "correo@ejemplo.com"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Teléfono
                    </p>
                    <a
                      href={`tel:${SITE.contact?.phone || ""}`}
                      className="text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {SITE.contact?.phone || "+00 000 000 0000"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Ubicación
                    </p>
                    <p className="text-gray-900">
                      {SITE.contact?.location || "Ciudad, País"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Conecta conmigo
              </h4>
              <div className="flex gap-3">
                <a
                  href={SITE.social?.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href={SITE.social?.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-900 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                También puedes encontrarme en estas plataformas para conocer más
                sobre mi trabajo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
