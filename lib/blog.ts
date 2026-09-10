import { brand } from "@/lib/brand"

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: BlogBlock[]
  category: "Novedades" | "Trabajos Plot" | "Sector" | "Eventos"
  date: string
  readMinutes: number
  accent: string
  image: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "expo-san-juan-minero-2025-stands-plot",
    title: "Expo San Juan Minero: stands que marcan presencia",
    excerpt:
      "Cómo diseñamos y montamos stands de alto impacto para marcas mineras: de la idea al montaje, con plazos, seguridad y narrativa de marca.",
    content: [
      {
        type: "p",
        text: "La Expo San Juan Minero concentra proveedores, operadores, gobierno y servicios en un mismo circuito. Para una marca del sector, el stand no es un adorno: es el primer contacto comercial, la prueba de seriedad operativa y el espacio donde se cierran agendas. En Plot Center lo tratamos como un producto integral —diseño, ingeniería, gráfica e instalación— porque en feria no hay segunda oportunidad de primera impresión.",
      },
      {
        type: "h2",
        text: "Qué pide realmente una marca minera en feria",
      },
      {
        type: "p",
        text: "Más allá del “impacto visual”, los clientes del sector suelen pedir tres cosas al mismo tiempo: credibilidad técnica, fluidez para recibir visitas y coherencia con la identidad corporativa. Un stand demasiado ornamental pierde profesionalismo; uno demasiado frío no convierte. El equilibrio se logra cuando la arquitectura del espacio guía la conversación: recepción clara, zona de reunión, soporte de producto y una gráfica que se lee a 15 metros y también de cerca.",
      },
      {
        type: "ul",
        items: [
          "Jerarquía de marca visible desde los pasillos principales",
          "Zonas de trabajo (meeting / demo) sin saturar el área",
          "Materiales y montaje alineados a protocolos de seguridad",
          "Plazos realistas desde planos aprobados hasta inauguración",
        ],
      },
      {
        type: "h2",
        text: "Nuestro proceso llave en mano",
      },
      {
        type: "h3",
        text: "1. Concepto y briefing",
      },
      {
        type: "p",
        text: "Partimos de la esencia de la empresa: qué vende, a quién habla y qué debe recordar el visitante. Traducimos eso a un concepto espacial —circulación, altura, color, iluminación— antes de dibujar un solo panel.",
      },
      {
        type: "h3",
        text: "2. Planos y coordinación",
      },
      {
        type: "p",
        text: "Trabajamos sobre planos aprobados, con análisis del terreno y condiciones del predio. Estructura, gráfica, mobiliario y electricidad se coordinan en cadena para evitar improvisaciones el día del montaje.",
      },
      {
        type: "h3",
        text: "3. Fabricación e instalación",
      },
      {
        type: "p",
        text: "Producimos en taller (imprenta, gráfica, metalúrgica) e instalamos con personal propio y supervisión técnica. El objetivo es llegar a la apertura con el stand limpio, iluminado y listo para recibir.",
      },
      {
        type: "quote",
        text: "Un stand exitoso no se improvisa en el predio: se gana en el briefing, en los planos y en la coordinación de oficios.",
      },
      {
        type: "h2",
        text: "Resultado que se mide en conversaciones",
      },
      {
        type: "p",
        text: "Cuando el espacio está bien resuelto, el equipo comercial deja de “explicar el stand” y empieza a vender. Esa es la métrica que nos importa: presencia que sostiene reuniones, no solo fotos para redes. En Expo Minera, Plot Center acompaña marcas que necesitan verse a la altura del negocio que representan.",
      },
    ],
    category: "Trabajos Plot",
    date: "2025-08-18",
    readMinutes: 8,
    accent: brand.orange,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/08/Rectangle-141.png",
  },
  {
    slug: "via-publica-san-juan-120-espacios",
    title: "Vía pública en San Juan: 120 espacios de alto impacto",
    excerpt:
      "Cobertura urbana, formatos y operación profesional: cómo armar campañas de vía pública con criterio y datos.",
    content: [
      {
        type: "p",
        text: "La vía pública sigue siendo uno de los medios más efectivos para construir marca en una ciudad de escala humana como San Juan. No compite con el scroll: ocupa el recorrido diario. Plot Center opera una red de más de 120 espacios estratégicos bajo concesión oficial, con formatos pensados para frecuencia, cobertura y legibilidad.",
      },
      {
        type: "h2",
        text: "Por qué importa la red (y no solo el aviso)",
      },
      {
        type: "p",
        text: "Un aviso aislado genera recuerdo puntual. Una red bien planificada genera presencia. La diferencia está en combinar ubicaciones premium, rotación inteligente y operación confiable: producción, montaje, mantenimiento y reemplazo sin fricción para el anunciante.",
      },
      {
        type: "h2",
        text: "Formatos disponibles",
      },
      {
        type: "ul",
        items: [
          "Carteles municipales — estructura 150 × 112 cm, lectura horizontal de alto impacto",
          "Chupetes iluminados (backlight) — presencia nocturna y área visual útil 96 × 136 cm",
          "Chupetes estándar — misma lógica vertical para campañas de frecuencia",
        ],
      },
      {
        type: "h2",
        text: "Operación de punta a punta",
      },
      {
        type: "p",
        text: "Gestionamos la campaña completa: brief creativo o adaptación de arte, impresión, instalación y seguimiento. La concesión vigente da formalidad y continuidad: el anunciante compra cobertura real, no improvisación.",
      },
      {
        type: "h3",
        text: "Datos para decidir mejor",
      },
      {
        type: "p",
        text: "Con VP Plot sumamos capa digital a un negocio tradicional: mapa de ubicaciones, geolocalización de piezas y KPIs para entender alcance. La vía pública deja de ser “una foto del cartel” y pasa a ser un plan de medios con criterios claros.",
      },
      {
        type: "quote",
        text: "La mejor campaña de calle no es la más grande: es la que aparece donde tu audiencia ya circula, con la frecuencia correcta.",
      },
      {
        type: "p",
        text: "Si estás evaluando presencia urbana en San Juan, el punto de partida es simple: definir objetivo (lanzamiento, recordación, retail, institucional) y armar un mix de formatos sobre la red. Nosotros nos ocupamos de que se vea, se monte y se sostenga.",
      },
    ],
    category: "Sector",
    date: "2025-08-05",
    readMinutes: 7,
    accent: brand.cyan,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/08/Group-132.png",
  },
  {
    slug: "carteleria-homologada-mineria",
    title: "Cartelería homologada: seguridad visual en minería",
    excerpt:
      "Materiales certificados, instalación profesional y sistemas claros: la señalética como herramienta de prevención.",
    content: [
      {
        type: "p",
        text: "En minería, la cartelería no es decoración. Es parte del sistema de seguridad: organiza flujos, reduce ambigüedad y acompaña protocolos. Una señal mal resuelta —ilegible, mal ubicada o fabricada con material inadecuado— deja de cumplir su función en el momento en que más se necesita.",
      },
      {
        type: "h2",
        text: "Qué significa “homologada” en la práctica",
      },
      {
        type: "p",
        text: "Hablar de materiales homologados implica elegir soportes y acabados capaces de soportar polvo, radiación UV, cambios térmicos, abrasión y, en muchos casos, agentes químicos. También implica respetar criterios de contraste, pictogramas y tipografía legible a distancia.",
      },
      {
        type: "ul",
        items: [
          "Señalética interior para organización de naves, comedores y zonas restringidas",
          "Señalética exterior para caminos, accesos y puntos de encuentro",
          "Piezas de seguridad (velocidad, PPE, evacuación, prohibiciones)",
          "Personalización a medida cuando el layout de planta lo exige",
        ],
      },
      {
        type: "h2",
        text: "Instalación: donde se gana o se pierde el proyecto",
      },
      {
        type: "p",
        text: "Fabricar bien no alcanza. La instalación en campo requiere personal capacitado, anclajes correctos, altura de lectura y cumplimiento de plazos sin improvisar. En Plot Center el mismo equipo que diseña y produce coordina el montaje, con protocolos claros.",
      },
      {
        type: "h3",
        text: "Errores frecuentes que evitamos",
      },
      {
        type: "ul",
        items: [
          "Textos demasiado densos para lectura en movimiento",
          "Materiales de interior usados en exterior",
          "Ubicaciones sin jerarquía ni línea de visión",
          "Falta de stock de repuestos para recambio ágil",
        ],
      },
      {
        type: "quote",
        text: "La mejor señal es la que se entiende en un segundo y sigue legible después de una temporada completa en operación.",
      },
      {
        type: "p",
        text: "Si tu planta necesita actualizar cartelería o implementar un sistema nuevo, el camino correcto es un relevamiento + matriz de señales + producción e instalación. Así la inversión se traduce en orden y seguridad, no en carteles sueltos.",
      },
    ],
    category: "Novedades",
    date: "2025-07-28",
    readMinutes: 8,
    accent: brand.orange,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/05/Foto-01.png",
  },
  {
    slug: "fns-2024-experiencia-stand",
    title: "Fiesta Nacional del Sol: experiencia de marca en vivo",
    excerpt:
      "Stands pensados para sol, noche y multitudes: cómo construir presencia de marca en el evento más masivo de San Juan.",
    content: [
      {
        type: "p",
        text: "La Fiesta Nacional del Sol no se parece a una feria B2B. Hay sol intenso, horarios nocturnos, flujo masivo y una energía cultural que exige otra lectura de marca. El stand deja de ser un display institucional y pasa a ser un espacio que se habita.",
      },
      {
        type: "h2",
        text: "Diseñar para el contexto, no contra él",
      },
      {
        type: "p",
        text: "En FNS trabajamos contrastes altos, tipografías robustas e iluminación que funciona de día y de noche. La circulación se planifica para picos de gente: entradas claras, zonas de activación y escape visual para no saturar.",
      },
      {
        type: "h2",
        text: "Qué entregamos como Plot",
      },
      {
        type: "ul",
        items: [
          "Concepto espacial alineado a la marca y al público del evento",
          "Estructura y gráfica producidas en taller propio",
          "Montaje seguro con supervisión y tiempos de feria",
          "Acabados pensados para fotos, redes y experiencia presencial",
        ],
      },
      {
        type: "h3",
        text: "La métrica real",
      },
      {
        type: "p",
        text: "Más allá del “like”, un buen stand en FNS se mide en permanencia: cuánta gente se queda, cuántas interacciones genera el equipo y cuánto contenido útil sale del espacio. Eso se diseña: no aparece por casualidad.",
      },
      {
        type: "quote",
        text: "En eventos masivos, la marca que se entiende rápido es la que se recuerda después.",
      },
      {
        type: "p",
        text: "Si tu marca vuelve a FNS o a un evento similar, el briefing debería empezar por una pregunta simple: ¿qué queremos que la gente sienta y haga en los próximos 30 segundos dentro del stand?",
      },
    ],
    category: "Eventos",
    date: "2025-07-12",
    readMinutes: 7,
    accent: brand.purple,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/07/Group-121-1.png",
  },
  {
    slug: "plot-lab-app-gestion-ia",
    title: "PLOT LAB: gestión integral con capa de IA",
    excerpt:
      "Cómo construimos una plataforma propia de operación —kanban, RRHH, ERP, CRM y más— con inteligencia artificial nativa.",
    content: [
      {
        type: "p",
        text: "PLOT LAB nació de una necesidad interna: ordenar la operación de un equipo creativo-productivo sin fragmentar la información en diez herramientas. El resultado es una app web integral con módulos de producción, personas, clientes, caja, facturación, stock y compras — y una capa de IA pensada para asistir, no para reemplazar criterio.",
      },
      {
        type: "h2",
        text: "El problema que resuelve",
      },
      {
        type: "p",
        text: "Cuando diseño, taller, comercial y administración no comparten el mismo tablero, aparecen cuellos de botella invisibles: trabajos que se “pierden”, stock desactualizado, clientes sin seguimiento. Centralizar no es un capricho tecnológico: es control operativo.",
      },
      {
        type: "h2",
        text: "Módulos que importan",
      },
      {
        type: "ul",
        items: [
          "Kanban de producción para ver estado real de cada trabajo",
          "CRM / clientes con historial comercial",
          "RRHH para organización de equipos",
          "Caja, facturación, stock y compras en el mismo ecosistema",
          "Plot AI como asistente transversal",
        ],
      },
      {
        type: "h3",
        text: "Por qué la IA está “adentro”",
      },
      {
        type: "p",
        text: "La IA nativa tiene sentido cuando conoce el contexto del negocio. No es un chatbot genérico pegado al costado: es una capa que puede ayudar a priorizar, resumir y acelerar tareas sobre datos reales de operación.",
      },
      {
        type: "quote",
        text: "Construimos para nosotros lo que también construimos para clientes: productos digitales con estética, performance y foco en resultados.",
      },
      {
        type: "p",
        text: "PLOT LAB es, además, carta de presentación: demuestra que en Plot Center el desarrollo web no es una landing suelta, sino sistemas que sostienen trabajo diario.",
      },
    ],
    category: "Trabajos Plot",
    date: "2025-06-30",
    readMinutes: 8,
    accent: brand.cyan,
    image: "/proyectos/plot-lab/01-dashboard.jpg",
  },
  {
    slug: "tendencias-senaletica-2025",
    title: "Tendencias en señalética industrial 2025",
    excerpt:
      "Menos ruido, más claridad: sistemas modulares, pictogramas fuertes y materiales pensados para entornos reales.",
    content: [
      {
        type: "p",
        text: "La señalética industrial está dejando atrás el “cartel lleno de texto”. En 2025 ganan los sistemas claros, modulares y mantenibles. Las plantas cambian de layout; la señalética tiene que poder adaptarse sin rehacer todo desde cero.",
      },
      {
        type: "h2",
        text: "Tres tendencias que ya se notan en campo",
      },
      {
        type: "h3",
        text: "1. Pictogramas primero",
      },
      {
        type: "p",
        text: "La lectura en movimiento exige iconografía fuerte y poca prosa. El texto refuerza; no compite. Contraste, tamaño y ubicación pesan más que el discurso.",
      },
      {
        type: "h3",
        text: "2. Modularidad",
      },
      {
        type: "p",
        text: "Bases y soportes estándar con caras intercambiables reducen costos de recambio y tiempos de intervención. Ideal cuando hay obras o reorganización de naves.",
      },
      {
        type: "h3",
        text: "3. Material correcto al uso",
      },
      {
        type: "p",
        text: "Exterior, interior, alto tránsito, químicos: cada zona pide un soporte distinto. Elegir mal el material es programar el deterioro.",
      },
      {
        type: "ul",
        items: [
          "Auditoría de señales existentes antes de producir de más",
          "Matriz de tipologías (obligación, prohibición, información, evacuación)",
          "Plan de recambio y stock mínimo de piezas críticas",
        ],
      },
      {
        type: "quote",
        text: "La señalética moderna no se “decora”: se diseña como sistema.",
      },
      {
        type: "p",
        text: "En Plot Center unimos diseño gráfico, pre-prensa, producción e instalación para que la tendencia no se quede en moodboard: llegue instalada y cumpla.",
      },
    ],
    category: "Sector",
    date: "2025-06-18",
    readMinutes: 7,
    accent: brand.pink,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/05/Foto-04.png",
  },
  {
    slug: "ploteo-vehicular-flotas-seguras",
    title: "Ploteo vehicular: identidad y marcas de seguridad",
    excerpt:
      "Cómo potenciar flotas con presencia de marca sin resignar durabilidad ni normativa visual de seguridad.",
    content: [
      {
        type: "p",
        text: "Una flota ploteada bien resuelta trabaja doble: refuerza marca en cada traslado y comunica información crítica de seguridad. En sectores industriales y mineros, ese equilibrio no es opcional.",
      },
      {
        type: "h2",
        text: "Qué evaluamos antes de producir",
      },
      {
        type: "p",
        text: "Relevamos tipología de vehículos, uso (ruta, obra, planta), exposición a polvo/UV y requerimientos de franjas, numeración o pictogramas. El diseño se adapta a curvas, vidrios y zonas de desgaste.",
      },
      {
        type: "h2",
        text: "Materiales que aguantan",
      },
      {
        type: "ul",
        items: [
          "Vinilos certificados para exterior y alto tránsito",
          "Opciones reflectivas cuando la visibilidad nocturna es clave",
          "Instalación profesional con personal y equipamiento propio",
          "Asesoramiento gráfico para cumplir objetivos de marca y sector",
        ],
      },
      {
        type: "h3",
        text: "Mantenimiento y recambio",
      },
      {
        type: "p",
        text: "Un buen ploteo también se planifica en el tiempo: zonas de mayor abrasión, limpieza correcta y recambios parciales evitan que la flota se vea “a medias” a los pocos meses.",
      },
      {
        type: "quote",
        text: "La flota es un medio móvil: si la marca se lee mal en movimiento, el ploteo falló aunque se vea bien detenido.",
      },
      {
        type: "p",
        text: "Si estás unificando una flota o sumando unidades, el mejor paso es un mockup por tipología + prueba de material. Después, producción e instalación con el mismo criterio en todas las unidades.",
      },
    ],
    category: "Novedades",
    date: "2025-06-02",
    readMinutes: 7,
    accent: brand.yellow,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/05/Foto-02.png",
  },
  {
    slug: "safari-valle-fertil-app-web",
    title: "Safari Tras Las Sierras: app web del evento",
    excerpt:
      "Landing, inscripciones, tickets, tiempos y en vivo: un producto digital pensado para la operación real de un evento deportivo.",
    content: [
      {
        type: "p",
        text: "Los eventos deportivos de campo necesitan más que una web bonita: necesitan una herramienta que aguante picos de tráfico, consultas desde el celular y actualización constante. Para Safari Tras Las Sierras (Valle Fértil) construimos una app web que concentra la experiencia del evento de punta a punta.",
      },
      {
        type: "h2",
        text: "Qué incluye el producto",
      },
      {
        type: "ul",
        items: [
          "Landing del evento con identidad y convocatoria clara",
          "Inscripciones de pilotos y gestión de datos",
          "Venta de tickets",
          "Noticias y contenidos actualizables",
          "Tiempos de competencias y transmisión en vivo",
        ],
      },
      {
        type: "h2",
        text: "Decisiones de producto que importan",
      },
      {
        type: "p",
        text: "Priorizamos mobile-first: en el desierto y en la ruta la gente entra desde el teléfono. La información crítica (horarios, resultados, tickets) tiene que estar a un toque, sin laberintos.",
      },
      {
        type: "h3",
        text: "Operación durante el evento",
      },
      {
        type: "p",
        text: "El valor aparece el día de la competencia: publicar tiempos, noticias y estado en vivo sin depender de cadenas de WhatsApp. El equipo organiza; el público se informa.",
      },
      {
        type: "quote",
        text: "Un evento bien digitalizado reduce fricción para organizadores y participantes por igual.",
      },
      {
        type: "p",
        text: "Este tipo de desarrollo es el cruce natural de Plot: entendemos eventos, marca y operación, y lo traducimos a producto web usable.",
      },
    ],
    category: "Trabajos Plot",
    date: "2025-05-22",
    readMinutes: 7,
    accent: brand.purple,
    image: "/proyectos/safari/01-landing.jpg",
  },
  {
    slug: "impresion-digital-gran-formato",
    title: "Impresión digital: del flyer al gran formato",
    excerpt:
      "Guía práctica de formatos, materiales y soportes para que la pieza impresa rinda en el uso real.",
    content: [
      {
        type: "p",
        text: "La impresión digital es el último tramo entre el archivo y el impacto. Elegir mal el formato o el material no se “arregla” en Photoshop: se nota en calle, en planta o en el punto de venta.",
      },
      {
        type: "h2",
        text: "Cómo pensamos cada trabajo",
      },
      {
        type: "p",
        text: "Empezamos por el uso: ¿se lee a 2 metros o a 20? ¿Interior o exterior? ¿Temporal o permanente? Con eso definimos soporte, acabado y pre-prensa.",
      },
      {
        type: "h2",
        text: "Familias de solución",
      },
      {
        type: "ul",
        items: [
          "Piezas chicas: tarjetas, etiquetas, flyers, A5–A3",
          "Gran formato: afiches, carteles, banners, ploteos, planos",
          "Lonas: front, backlight, black out, mesh",
          "Vinilos: brillante, microperforado, reflectivo, de corte, alto tránsito",
          "Soportes rígidos: PVC, MDF, corrugado, chapa, acrílico",
        ],
      },
      {
        type: "h3",
        text: "Pre-prensa: el seguro silencioso",
      },
      {
        type: "p",
        text: "Perfiles de color, sangrados, resolución y tipografías convertidas evitan reimpresiones. En Plot ese control es parte del servicio, no un extra.",
      },
      {
        type: "quote",
        text: "Una buena impresión no se nota: lo que se nota es cuando falla.",
      },
      {
        type: "p",
        text: "Si tenés una campaña o señalética por producir, traé el objetivo de uso. Nosotros te devolvemos material, formato y archivo listos para máquina.",
      },
    ],
    category: "Sector",
    date: "2025-05-10",
    readMinutes: 7,
    accent: brand.cyan,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/05/Rectangle-72.png",
  },
  {
    slug: "joven-empresario-landing-admin",
    title: "Premio Joven Empresario: landing + administración",
    excerpt:
      "Cómo resolvimos convocatoria pública y operación interna en un mismo producto web.",
    content: [
      {
        type: "p",
        text: "El Premio Joven Empresario Sanjuanino necesita dos caras: una pública que invite a postular, y una operativa que permita administrar postulaciones y contenidos sin fricción. Diseñamos y desarrollamos ambas.",
      },
      {
        type: "h2",
        text: "Cara pública: claridad y conversión",
      },
      {
        type: "p",
        text: "La landing explica el premio, requisitos y fechas con jerarquía simple. El formulario está pensado para completar desde el celular, porque ahí ocurre la mayoría de las postulaciones.",
      },
      {
        type: "h2",
        text: "Cara interna: administración real",
      },
      {
        type: "ul",
        items: [
          "Gestión de postulaciones y estados",
          "Edición de contenidos sin depender de un desarrollador",
          "Estructura escalable para nuevas ediciones",
        ],
      },
      {
        type: "h3",
        text: "Lo que aprendimos",
      },
      {
        type: "p",
        text: "En proyectos institucionales, la “web linda” no alcanza: hay que diseñar el flujo de quien opera el premio detrás de escena. Si el admin es claro, el evento escala mejor año a año.",
      },
      {
        type: "quote",
        text: "Una convocatoria exitosa se sostiene tanto en el mensaje como en la herramienta que la administra.",
      },
      {
        type: "p",
        text: "Si tu organización lanza convocatorias o premios, pensá el producto digital como sistema: front de marca + back de operación.",
      },
    ],
    category: "Trabajos Plot",
    date: "2025-04-28",
    readMinutes: 6,
    accent: brand.orange,
    image: "/proyectos/joven-empresario/01-landing.jpg",
  },
  {
    slug: "manuales-seguridad-imprenta-minera",
    title: "Manuales de operación y seguridad: documento vivo",
    excerpt:
      "Por qué imprimir bien un manual impacta en capacitación, trazabilidad y cultura preventiva.",
    content: [
      {
        type: "p",
        text: "Un manual de operación y seguridad es un documento vivo: se usa en inducción, se consulta en duda y se audita en cumplimiento. Si está mal impreso —tipografía chica, encuadernado frágil, contraste pobre— deja de ser herramienta.",
      },
      {
        type: "h2",
        text: "Para qué sirven (de verdad)",
      },
      {
        type: "ul",
        items: [
          "Estandarizar procesos y responsabilidades",
          "Prevenir accidentes y reducir ambigüedad",
          "Acompañar capacitaciones y reinducciones",
          "Sostener evidencia ante auditorías y normativas",
        ],
      },
      {
        type: "h2",
        text: "Qué cuidamos en producción",
      },
      {
        type: "p",
        text: "Legibilidad, gramaje, tipo de encuadernado según uso (oficina vs. campo), y tiradas con capacidad de reimpresión rápida cuando el procedimiento cambia. En minería, el manual desactualizado es un riesgo.",
      },
      {
        type: "h3",
        text: "Más allá del manual",
      },
      {
        type: "p",
        text: "En imprenta minera también resolvemos folletos, talonarios de procesos, papelería y piezas de capacitación. La misma cadena de calidad: diseño, pre-prensa e impresión.",
      },
      {
        type: "quote",
        text: "El mejor manual es el que se usa: claro, durable y fácil de actualizar.",
      },
      {
        type: "p",
        text: "Si estás revisando documentación operativa, podemos ayudarte a definir formato, material y tirada según el contexto real de uso en planta.",
      },
    ],
    category: "Novedades",
    date: "2025-04-15",
    readMinutes: 7,
    accent: brand.red,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/07/Foto-48-1.png",
  },
  {
    slug: "phi-bolsa-freelance-diseno",
    title: "PHI (φ): bolsa freelance para diseñadores Plot",
    excerpt:
      "Una plataforma para escalar producción gráfica con talento externo y el respaldo del ecosistema Plot Lab.",
    content: [
      {
        type: "p",
        text: "PHI (φ) nace para resolver un problema clásico de estudios y agencias: picos de demanda gráfica sin perder calidad ni control. Es una bolsa de trabajo freelance orientada a diseñadores de la red Plot, con postulación, panel y entregas coordinadas.",
      },
      {
        type: "h2",
        text: "Cómo funciona el modelo",
      },
      {
        type: "p",
        text: "Los trabajos se publican, los perfiles postulan, y la operación se sigue en panel. El valor no es solo “encontrar un diseñador”: es mantener criterio de marca, plazos y entregables con el respaldo de Plot Lab.",
      },
      {
        type: "ul",
        items: [
          "Bolsa de trabajos de la red creativa",
          "Postulación y selección",
          "Panel del diseñador",
          "Entregas con seguimiento",
        ],
      },
      {
        type: "h3",
        text: "Por qué es estratégico",
      },
      {
        type: "p",
        text: "Escalar con freelancers sin sistema suele terminar en archivos desordenados y calidades dispares. PHI ordena el proceso y protege la experiencia del cliente final.",
      },
      {
        type: "quote",
        text: "La red externa solo potencia si hay método. Sin método, multiplica el caos.",
      },
      {
        type: "p",
        text: "PHI es otra prueba de que en Plot el desarrollo web acompaña al negocio creativo: no es un módulo aislado, es infraestructura.",
      },
    ],
    category: "Trabajos Plot",
    date: "2025-04-01",
    readMinutes: 6,
    accent: brand.blue,
    image: "/proyectos/phi/01-landing.jpg",
  },
  {
    slug: "identidad-visual-marca-espacio",
    title: "De la marca al espacio: identidad que se habita",
    excerpt:
      "Cómo llevar un sistema gráfico del papel a stands, flotas y vía pública sin romper coherencia.",
    content: [
      {
        type: "p",
        text: "Muchas marcas tienen un logo impecable y una aplicación inconsistente. La identidad se rompe cuando cada soporte se resuelve “como se pueda”. En Plot Center trabajamos la identidad como sistema: del manual a la calle.",
      },
      {
        type: "h2",
        text: "Qué debe viajar entre soportes",
      },
      {
        type: "ul",
        items: [
          "Proporciones y zona de respeto del isotipo",
          "Paleta con jerarquías (primarios / acentos / neutros)",
          "Tipografías con roles claros (display vs. lectura)",
          "Tono visual: industria, cercanía, premium, seguridad, etc.",
        ],
      },
      {
        type: "h2",
        text: "Del PDF a la realidad",
      },
      {
        type: "p",
        text: "Un stand, un chupete o un ploteo exigen traducciones técnicas: contraste a distancia, materiales, iluminación, curvas del vehículo. El diseño gráfico y la producción tienen que hablar el mismo idioma.",
      },
      {
        type: "h3",
        text: "El beneficio comercial",
      },
      {
        type: "p",
        text: "La coherencia genera reconocimiento. Cuando la marca se ve igual de bien en feria, en flota y en vía pública, el mercado la percibe más sólida — aunque no sepa explicar por qué.",
      },
      {
        type: "quote",
        text: "Identidad no es un archivo: es una experiencia repetible en cada punto de contacto.",
      },
      {
        type: "p",
        text: "Si estás unificando marca en múltiples frentes, el mejor orden es: sistema gráfico → aplicaciones clave → producción e instalación con control de calidad único.",
      },
    ],
    category: "Sector",
    date: "2025-03-20",
    readMinutes: 7,
    accent: brand.pink,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/07/Foto-129.png",
  },
  {
    slug: "grupo-agencias-invitacion-animada",
    title: "Invitación animada + admin para agencia de inversiones",
    excerpt:
      "Una experiencia web premium por pasos, con acceso personalizado y panel para operar el evento.",
    content: [
      {
        type: "p",
        text: "Para una agencia de inversiones, la invitación no puede sentirse genérica. Diseñamos y desarrollamos una web de invitación animada con secuencia interactiva, apertura por nombre y un panel de administración para gestionar invitados y contenidos.",
      },
      {
        type: "h2",
        text: "La experiencia del invitado",
      },
      {
        type: "p",
        text: "El flujo guía de a un paso: atmósfera, identidad, ingreso personalizado y apertura de la invitación. Cada pantalla refuerza exclusividad sin fricción innecesaria.",
      },
      {
        type: "h2",
        text: "La operación del equipo",
      },
      {
        type: "ul",
        items: [
          "Gestión de invitados",
          "Contenidos del evento editables",
          "Control del flujo sin depender de desarrolladores en cada cambio",
        ],
      },
      {
        type: "h3",
        text: "Diseño + desarrollo en una sola mano",
      },
      {
        type: "p",
        text: "Este tipo de pieza exige dirección de arte y ingeniería de front. Separarlos suele romper la magia. En Plot lo resolvemos integrado.",
      },
      {
        type: "quote",
        text: "La exclusividad se diseña en cada microinteracción, no solo en el copy.",
      },
      {
        type: "p",
        text: "Si tu marca necesita una pieza digital memorable para un evento, pensala como producto: experiencia + admin + métricas de apertura.",
      },
    ],
    category: "Trabajos Plot",
    date: "2025-03-08",
    readMinutes: 6,
    accent: brand.red,
    image: "/proyectos/grupo-agencias/01-invitacion.jpg",
  },
  {
    slug: "preprensa-impresion-sin-sorpresas",
    title: "Pre-prensa: el detalle que evita reimpresiones",
    excerpt:
      "Checklist claro de color, sangrados y archivos para llegar a máquina sin perder tiempo ni material.",
    content: [
      {
        type: "p",
        text: "La pre-prensa es el control de calidad invisible. Cuando falla, se nota en tinta, plazos y presupuesto. Cuando funciona, el cliente solo ve una pieza impecable.",
      },
      {
        type: "h2",
        text: "Checklist mínimo antes de producir",
      },
      {
        type: "ul",
        items: [
          "Modo de color correcto según proceso (y perfil acordado)",
          "Resolución adecuada al tamaño de impresión",
          "Sangrados y marcas según el soporte",
          "Tipografías convertidas o embebidas",
          "Textos y códigos revisados (la errata cara es la impresa)",
        ],
      },
      {
        type: "h2",
        text: "Material y uso: la decisión que más pesa",
      },
      {
        type: "p",
        text: "Un archivo perfecto en el material equivocado sigue siendo un problema. Definimos juntos si la pieza es temporal o permanente, interior o exterior, rígida o flexible.",
      },
      {
        type: "h3",
        text: "Cómo acompañamos desde Plot",
      },
      {
        type: "p",
        text: "Revisamos originales, proponemos ajustes y dejamos el archivo listo. No es burocracia: es evitar una segunda tirada.",
      },
      {
        type: "quote",
        text: "Reimprimir sale más caro que revisar diez minutos.",
      },
      {
        type: "p",
        text: "Si vas a mandar a producir, mandanos el uso previsto junto con el archivo. Con eso ya podemos decirte si está listo o qué hay que corregir.",
      },
    ],
    category: "Novedades",
    date: "2025-02-24",
    readMinutes: 6,
    accent: brand.orange,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/05/Foto-10.png",
  },
  {
    slug: "vp-plot-geolocalizacion-campanas",
    title: "VP Plot: geolocalización y KPIs de campaña",
    excerpt:
      "De la gestión tradicional de vía pública a un sistema con mapa, alquileres y métricas para decidir mejor.",
    content: [
      {
        type: "p",
        text: "VP Plot es la respuesta digital a un negocio físico: administrar alquileres, ubicar piezas y entender el desempeño de campañas de vía pública. Nació para dar transparencia operativa y mejores decisiones comerciales.",
      },
      {
        type: "h2",
        text: "Qué permite hoy",
      },
      {
        type: "ul",
        items: [
          "Administración de alquileres",
          "Geolocalización de chupetes y puntos",
          "Campañas con datos en tiempo casi real",
          "KPIs por anuncio / ubicación",
          "Capa de IA para apoyo decisional",
        ],
      },
      {
        type: "h2",
        text: "Por qué cambia la conversación con el anunciante",
      },
      {
        type: "p",
        text: "En lugar de discutir solo “si el cartel está puesto”, se puede hablar de cobertura, mix de formatos y rotación. Eso profesionaliza la propuesta y acerca la vía pública a la lógica de medios modernos.",
      },
      {
        type: "h3",
        text: "Tecnología con oficio",
      },
      {
        type: "p",
        text: "El sistema no reemplaza la operación de calle: la potencia. Montaje, mantenimiento y producción siguen siendo el corazón; el software ordena y mide.",
      },
      {
        type: "quote",
        text: "Medir no elimina el oficio: lo vuelve defendible frente al cliente.",
      },
      {
        type: "p",
        text: "VP Plot es un ejemplo de desarrollo a medida con impacto directo en el negocio Plot y en la experiencia de marcas que anuncian en San Juan.",
      },
    ],
    category: "Trabajos Plot",
    date: "2025-02-10",
    readMinutes: 7,
    accent: brand.cyan,
    image: "/proyectos/vp-plot/03-mapa-clicks.jpg",
  },
  {
    slug: "stands-llave-en-mano-checklist",
    title: "Stands llave en mano: checklist antes de montar",
    excerpt:
      "Concepto, planos, coordinación y ejecución: las cuatro etapas que separan un stand sólido de una improvisación cara.",
    content: [
      {
        type: "p",
        text: "Montar un stand sin método es la forma más rápida de gastar de más. El checklist no es burocracia: es protección de plazo, seguridad y calidad visual.",
      },
      {
        type: "h2",
        text: "Las cuatro etapas Plot",
      },
      {
        type: "h3",
        text: "1. Concepto",
      },
      {
        type: "p",
        text: "Interpretar la marca y definir qué debe pasar en el espacio (recibir, demostrar, cerrar reunión, activar).",
      },
      {
        type: "h3",
        text: "2. Planos",
      },
      {
        type: "p",
        text: "Validar dimensiones, estructura, accesos y condiciones del predio. Sin planos claros, el montaje se vuelve ensayo-error.",
      },
      {
        type: "h3",
        text: "3. Coordinación",
      },
      {
        type: "p",
        text: "Estructura, gráfica, mobiliario y electricidad alineados. Cada área trabaja en cadena.",
      },
      {
        type: "h3",
        text: "4. Ejecución",
      },
      {
        type: "p",
        text: "Instalación con supervisión, materiales correctos y cierre limpio para el día 0.",
      },
      {
        type: "ul",
        items: [
          "Brief escrito y referencias de marca",
          "Aprobación de renders / planos",
          "Cronograma de fabricación y carga",
          "Plan de montaje y responsables en predio",
        ],
      },
      {
        type: "quote",
        text: "El stand se gana antes de llegar al predio.",
      },
      {
        type: "p",
        text: "Si tenés una feria cerca, empecemos por el checklist. Cuanto antes se cierra el concepto, más margen hay para calidad.",
      },
    ],
    category: "Eventos",
    date: "2025-01-27",
    readMinutes: 7,
    accent: brand.purple,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/08/Rectangle-143.png",
  },
  {
    slug: "comunicacion-visual-mineria-san-juan",
    title: "Comunicación visual para minería en San Juan",
    excerpt:
      "Cartelería, imprenta, flotas, vía pública y stands: un ecosistema local para un sector que exige velocidad y precisión.",
    content: [
      {
        type: "p",
        text: "San Juan atraviesa un ciclo minero que exige proveedores ágiles y serios. La comunicación visual —seguridad, marca, presencia— no es un accesorio: acompaña operación, comunidad y reputación.",
      },
      {
        type: "h2",
        text: "Qué necesita el sector (y con qué respondemos)",
      },
      {
        type: "ul",
        items: [
          "Cartelería homologada e instalación en campo",
          "Imprenta de manuales, folletos y papelería",
          "Ploteo vehicular con criterios de seguridad",
          "Vía pública para campañas de alto alcance",
          "Stands para ferias y eventos del ecosistema minero",
        ],
      },
      {
        type: "h2",
        text: "La ventaja de un solo interlocutor",
      },
      {
        type: "p",
        text: "Cuando diseño, producción e instalación están fragmentados, se pierden días y se diluye responsabilidad. Plot Center integra área técnica, talleres y montaje para acortar la cadena.",
      },
      {
        type: "h3",
        text: "Promesa operativa",
      },
      {
        type: "p",
        text: "Seguridad, eficiencia y respuesta rápida no son un slogan: son el estándar que pedimos a cada entrega. En minería, el tiempo y la claridad salvan costos — y a veces más que eso.",
      },
      {
        type: "quote",
        text: "En un sector exigente, la comunicación visual también tiene que ser operación seria.",
      },
      {
        type: "p",
        text: "Si tu empresa minera o proveedora necesita actualizar señalética, flota o presencia en eventos, hablemos con un relevamiento concreto. Ahí empieza el plan.",
      },
    ],
    category: "Sector",
    date: "2025-01-14",
    readMinutes: 8,
    accent: brand.orange,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/05/Foto-servicios-mineros.png",
  },
  {
    slug: "redisenio-sitio-plot-center",
    title: "Rediseño del sitio Plot: marca primero, conversión después",
    excerpt:
      "Cómo replanteamos el sitio institucional para que la identidad lidere y cada servicio convierta con claridad.",
    content: [
      {
        type: "p",
        text: "El sitio de Plot Center no puede parecer genérico: la marca es tipografía, color, ritmo y oficio. El rediseño prioriza identidad y, al mismo tiempo, caminos claros hacia contacto y WhatsApp.",
      },
      {
        type: "h2",
        text: "Principios de la nueva experiencia",
      },
      {
        type: "ul",
        items: [
          "Marca como señal heroica, no como accesorio de nav",
          "Una idea por sección: menos ruido, más jerarquía",
          "Páginas de servicio con prueba visual y CTA explícito",
          "Performance y responsive reales (no solo “se ve en mobile”)",
        ],
      },
      {
        type: "h2",
        text: "Servicios como productos",
      },
      {
        type: "p",
        text: "Cada vertical —desarrollo web, gráfica, impresión, stands, vía pública, minería— se explica con lenguaje de valor y ejemplos. El usuario entiende rápido qué hacemos y cómo empezar.",
      },
      {
        type: "h3",
        text: "El sitio como demostración",
      },
      {
        type: "p",
        text: "También es laboratorio: animaciones, layouts y sistemas que mostramos a clientes son los mismos que usamos para vender desarrollo y diseño.",
      },
      {
        type: "quote",
        text: "Si tu web no se siente como tu marca, estás pagando por un folleto ajeno.",
      },
      {
        type: "p",
        text: "El rediseño sigue evolucionando con contenido (como este blog) y casos reales. La marca se construye también publicando oficio.",
      },
    ],
    category: "Trabajos Plot",
    date: "2024-12-20",
    readMinutes: 6,
    accent: brand.cyan,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/07/Foto-01.png",
  },
  {
    slug: "novedades-grafica-integral-2025",
    title: "Gráfica integral: concebir, fabricar e instalar",
    excerpt:
      "Por qué el modelo de cadena —técnica, diseño, talleres e instalación— sigue siendo la ventaja competitiva de Plot.",
    content: [
      {
        type: "p",
        text: "La gráfica integral no es un menú de servicios sueltos: es un método. Concebir, fabricar e instalar en la misma organización reduce fricción y eleva el resultado final.",
      },
      {
        type: "h2",
        text: "Las áreas que entran en juego",
      },
      {
        type: "ul",
        items: [
          "Área técnica y presupuestos",
          "Estudio de diseño",
          "Taller de imprenta",
          "Taller gráfico",
          "Taller metalúrgico",
          "Instalaciones",
        ],
      },
      {
        type: "h2",
        text: "Qué gana el cliente",
      },
      {
        type: "p",
        text: "Un solo responsable del resultado. Menos “el archivo estaba bien / el montaje falló”. Más control de plazos y de calidad visual en el punto de impacto.",
      },
      {
        type: "h3",
        text: "Cuándo conviene este enfoque",
      },
      {
        type: "p",
        text: "Proyectos con múltiples soportes (fachada + flota + feria + vía pública), campañas con fecha inamovible, o piezas que requieren estructura además de impresión.",
      },
      {
        type: "quote",
        text: "Separar diseño de fabricación es aceptar que alguien más interprete tu idea.",
      },
      {
        type: "p",
        text: "Si tu próximo proyecto cruza gráfica, estructura e instalación, el modelo integral no es un lujo: es la forma más segura de llegar bien y a tiempo.",
      },
    ],
    category: "Novedades",
    date: "2024-12-05",
    readMinutes: 7,
    accent: brand.pink,
    image: "https://plotcenter.com.ar/wp-content/uploads/2025/05/Foto-9.png",
  },
]

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function formatBlogDate(iso: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`))
}
