/* ====== DATOS DE LA PRESENTACIÓN ======
   Las CIFRAS 2026 (proyectos, pagos y mantenimiento de impacto) ya NO se escriben aquí:
   se leen automáticamente de los 2 archivos Excel de la carpeta  excel/
   Para actualizar: reemplace los Excel por la versión reciente, CON EL MISMO NOMBRE
   y con las mismas hojas y títulos de columna. No hay que tocar código. */
const EXCEL = {
  pagos:       "excel/Pagos Norte 2026.xlsx",                                       /* hojas: LISTA PROYECTOS, OBRAS Y ADECUACIONES, GENERALES */
  presupuesto: "excel/Consolidado Cierre 2025 y Presupuesto 2026 Final Final.xlsx"  /* hojas: PTTO IMPACTO, AVISOS IMPACTO */
};
/* El Excel no trae la ciudad. Se asigna así:
   1) por la sede (Nombre Ceco) o por la definición del proyecto en estas listas;
   2) si no está en la lista, por palabras clave (BGA, Cúcuta, Cartagena, Santa Marta...);
   3) si no coincide nada, Barranquilla. Agregue aquí una línea si una sede o proyecto nuevo queda mal. */
const CIUDAD_POR_SEDE = {
  "Adtivo Bucaramanga": "Bucaramanga",
  "Adtivo Cartagena": "Cartagena",
  "Atel Barranquilla": "Barranquilla",
  "Atel Movisol Cartagena": "Cartagena",
  "Ay Dx Salud Sura Altos Del Prado Poliza": "Barranquilla",
  "Ay Dx Salud Sura Bucaramanga": "Bucaramanga",
  "Ay Dx Sura Bucaramanga": "Bucaramanga",
  "Ay Dx Sura La Plazuela": "Cartagena",
  "Ay Dx Sura Pie De La Popa Toma De Muestr": "Cartagena",
  "Ay Dx Sura Pie Popa": "Cartagena",
  "Ay Dx Sura Portal Del Prado": "Barranquilla",
  "Ay Dx Sura Viva Barranquilla Poliza": "Barranquilla",
  "Ayudas Diagnosticas Sura Imágenes Portal": "Barranquilla",
  "Ayudas Diagnosticas Sura Laboratorio Por": "Barranquilla",
  "Bucaramanga": "Bucaramanga",
  "Cartagena": "Cartagena",
  "Cem Atlas": "Bucaramanga",
  "Cucuta": "Cúcuta",
  "IPS ATEL Santa Marta": "Santa Marta",
  "Ips Altos Del Prado": "Barranquilla",
  "Ips Bucaramanga": "Bucaramanga",
  "Ips Urgencias Barranquilla": "Barranquilla",
  "Op Autos Bucaramanga": "Bucaramanga",
  "Padro Office": "Barranquilla",
  "Portal Genoves": "Barranquilla",
  "Promotora Valledupar": "Valledupar",
  "Salud Sura Bucaramanga": "Bucaramanga",
  "Salud Sura Portal Del Genoves": "Barranquilla",
  "Salud Sura Serena Del Mar": "Cartagena",
  "Sc Aten Dom Barranquilla": "Barranquilla",
  "Sura Cucuta": "Cúcuta",
  "Urg Altos Del Prado": "Barranquilla"
};
const CIUDAD_POR_PROYECTO = {
  "2026.ADEC.EDF51B-07710": "Barranquilla",
  "2026.AP.WIFI.P8.GEN-0768": "Barranquilla",
  "2026.AUD.CGR.GENOVES-076": "Barranquilla",
  "2026.CIERRE.LAB.CTGA-076": "Cartagena",
  "2026.LAB.GENOVES.AYDX-07": "Barranquilla",
  "2026.REHAB.GENOV-07707": "Barranquilla",
  "ADE.ALTOS.PRADO-07808": "Barranquilla",
  "ADE.BAÑOS.PRAD-07733": "Barranquilla",
  "ADE.IPS.BUCARA-07735": "Bucaramanga",
  "ADE.MAP.HOL.ADX-07678": "Bucaramanga",
  "ADE.PLAT.MOVR-07736": "Cúcuta",
  "ADE.SC.CONTINEL-07821": "Barranquilla",
  "ADE.TRA.ODON.IPS-07715": "Bucaramanga",
  "ADE.VACU.AL.PRAD-07774": "Barranquilla",
  "ADEC.SALUD MODULAR-07650": "Barranquilla",
  "ODONTOSSBGA-07612": "Bucaramanga",
  "PLA.MOD.IPS.BG-07717": "Bucaramanga",
  "PROY.SE.BGA.SEGUR-07797": "Bucaramanga",
  "PROY.SE.BGA.SERV-07795": "Bucaramanga",
  "REF.SUC.BUCARAM-07773": "Bucaramanga",
  "REHAB.GENOVES.IPS-07728": "Barranquilla",
  "SALAS.LACT.N.IPS-07822": "Barranquilla",
  "SALAS.LACT.NORT-07789": "Barranquilla",
  "SIST.EXT.LAB.GEN-07793": "Barranquilla"
};
/* Presupuesto operativo 2026 Regional Norte (Final aprobado)
 Actualizacion 22 Nov 2026, esto ya no se muestra*/
const PPTO_NORTE = {
 "lineas": 666,
 "area": {
  "Servicios públicos": 10648518273,
  "Mantenimiento": 8114875059,
  "Servicios generales": 5408561177,
  "Insumos": 1097472596,
  "Ambiental": 675083678,
  "Gestión de equipos e instalaciones": 389806560,
  "Lavandería": 226928095,
  "Transporte terrestre personas": 14576418,
  "Gastos de viaje": 9888247,
  "Dotación e insumos administrativos": 1393721
 },
 "compania": {
  "IPS Sura": 13063138194,
  "Ayudas Diagnosticas": 8659235450,
  "Servicios Generales": 4182380574,
  "EPS Sura": 439666174,
  "Sura Generales": 236980034,
  "Operaciones Ge Suramericana": 5703400
 }
};

const CIUDADES = {
  "Barranquilla": {
    foto: "img/sedes/barranquilla.jpg",
    sedes: "Portal del Genovés · Altos del Prado · Urgencias Cordialidad · Prado Office Center · Salud en Casa",
    hitos: {
      "2025": [
        "Adecuaciones del servicio farmacéutico del piso 2 y de CE Genovés",
        "Salas de espera y puestos de trabajo de la IPS en el piso 6 de Genovés",
        "Señalización interna del laboratorio y expansión de las oficinas de Salud en el piso 8 de Genovés",
        "Adecuación de oficinas de la sucursal en el piso 6 y respaldo de planta para el circuito del ascensor en Genovés",
        "Preinstalaciones para silla odontológica en Genovés e instalación de AP en la IPS Altos del Prado",
        "Rehabilitación de Urgencias Altos del Prado y reforma del laboratorio del piso 3",
        "Adecuaciones de baños y accesos de Ayudas Diagnósticas y ARL en Urgencias Cordialidad",
        "Adecuación del punto de café de ARL en Prado Office Center",
        "Adecuación e intervención de Bebé Canguro en Salud en Casa Barranquilla",
        "Adecuación de la plataforma de EPS Barranquilla, renovación de equipos de aire acondicionado en CC Viva y reubicación de aire acondicionado en IPS Continental"
      ],
      "2026": [
        "Adecuación del laboratorio de hematología y del sistema de extracción en Genovés",
        "Rehabilitación de Genovés, activos biomédicos y adecuación del auditorio",
        "Adecuaciones de vacunación en el piso 5, puntos de red adicionales y sala de lactancia en Genovés",
        "Adecuaciones de baños privados, Gestión Materna, odontología, pisos y superficies en la IPS Altos del Prado",
        "Cambio de plataformas y tándems, adecuaciones eléctricas y pintura del piso 3 en Urgencias Altos del Prado",
        "Sala de lactancia, farmacias satélite y mejoras en áreas asistenciales de Urgencias Cordialidad",
        "Adecuación de Prado Office Center, sala de lactancia, cambio de soportes de puestos de trabajo y mejoras de iluminación y auditorio",
        "Pintura, impermeabilización de cubierta y reparación de la baranda en Salud en Casa Barranquilla",
        "Mejoras de sujeción de vidrios de fachada, rieles de puertas y cielo raso en CC Viva",
        "Reparaciones del Edificio 51B para cumplimiento de la NSR-10",
        "Pintura de Ayudas Diagnósticas Portal del Prado y adecuación de los consultorios 8 y 9 en Salud SURA Continental",
        "Adecuación de la plataforma de IPS ATEL Barranquilla, con mobiliario, cableado, pintura y reinstalación"
      ]
    }
  },

  "Cartagena": {
    foto: "img/sedes/cartagena.jpg",
    sedes: "Sucursal Seguros · EPS San Felipe · Serena del Mar",
    hitos: {
      "2025": [
        "Remodelación de CE, cambio de cubierta y adecuación del punto de café en la Sucursal Cartagena",
        "Rediseño de puestos de trabajo en EPS San Felipe",
        "Instalación de registros para mejorar el mantenimiento del aire acondicionado en IPS Serena del Mar",
        "Cierre del Laboratorio San Felipe en Ayudas Diagnósticas Pie de la Popa"
      ],
      "2026": [
        "Retiro de baldosas, resane, pintura, impermeabilización y reparación de cielo raso e iluminación en Ayudas Diagnósticas TM Plazuela",
        "Cambio de cielo raso, pintura de plataformas e interiores, pintura de la estructura metálica de los parqueaderos y reparación de la línea de vida en la Sucursal Cartagena",
        "Pintura de la sede IPS Movisol",
        "Pintura y reparación de cielo raso en IPS Serena del Mar",
        "Cambio de pisos y mejora de la plataforma en Ayudas Diagnósticas Pie de la Popa, con adecuaciones de puertas, paredes, cielo raso, mobiliario, aire acondicionado y cableado eléctrico"
      ]
    }
  },

  "Bucaramanga": {
    foto: "img/sedes/bucaramanga.jpg",
    sedes: "CEM SURA · Atlas P7 · IPS · Autos SURA",
    hitos: {
      "2025": [
        "Validación de la plataforma de EPS Bucaramanga dentro del proyecto nacional de mobiliario",
        "Instalación de lavamanos, marca, señalización y plataformas en IPS Bucaramanga",
        "Adecuación de la unidad de odontología en Salud SURA Bucaramanga",
        "Adecuación del nicho de café y reparación de la fachada en Autos SURA Bucaramanga",
        "Adecuación del auditorio, puntos de café y sala de lactancia y descanso en CEM SURA Atlas"
      ],
      "2026": [
        "Adecuación de mapa y holter, renovación RETIE, iluminación y fachada en Ayudas Diagnósticas TM Bucaramanga",
        "Adecuación de Salud Modular, plan modular, extracción de baños, transformador y plataforma con módulo de movilidad reducida en IPS Bucaramanga",
        "Renovación de mobiliario, pisos, tableros eléctricos, fachada, cielo raso y áreas de odontología en IPS Bucaramanga",
        "Adecuación de la unidad de odontología, renovación RETIE y pintura de consultorios en Salud SURA Bucaramanga",
        "Remodelación de la Sucursal Bucaramanga, renovación de imagen y adecuaciones del auditorio y del sistema eléctrico para videobeam",
        "Remodelación de Autos SURA Bucaramanga Seguros y mejoras de asfalto, pérgola, baranda del área de motos e imagen",
        "Cambio de iluminación a LED y adecuación del cuarto de aseo en CEM SURA Atlas"
      ]
    }
  },

  "Cúcuta": {
    foto: "img/sedes/cucuta.jpg",
    sedes: "Sucursal Seguros SURA · Ayudas Diagnósticas Gran Colombia",
    hitos: {
      "2025": [
        "Portón vehicular y adecuación del nicho de café en la Sucursal Seguros SURA Cúcuta",
        "Adecuación de consultorio en Salud SURA Cúcuta"
      ],
      "2026": [
        "Certificación del portón vehicular de la Sucursal Seguros SURA Cúcuta",
        "Instalación de plataforma con módulo de movilidad reducida y adecuación de la esclusa del patio en Salud SURA Cúcuta"
      ]
    }
  },

  "Santa Marta": {
    foto: "img/sedes/santa-marta.jpg",
    sedes: "IPS ATEL Aquarela Plaza · Ayudas Diagnósticas El Progreso",
    hitos: {
      "2025": [
        "Traslado de IPS ATEL a Aquarela Plaza"
      ],
      "2026": [
        "Mejoras en los baños y cuartos de residuos de IPS ATEL Aquarela Plaza"
      ]
    }
  },

  "Montería": {
    foto: "img/sedes/monteria.jpg",
    sedes: "Ayudas Diagnósticas Montería · CGR",
    hitos: {
      "2025": [],
      "2026": []
    }
  },

  "Valledupar": {
    foto: "img/sedes/valledupar.jpg",
    sedes: "Promotora · Consultorio IPS ATEL",
    hitos: {
      "2025": [
        "Arreglos y mejoras de la cubierta de Promotora Valledupar"
      ],
      "2026": [
        "Adecuación de la rampa de acceso de Promotora Valledupar",
        "Cambio de luminarias en Promotora Valledupar"
      ]
    }
  }
};

/* Video: pegue un enlace de YouTube (formato embed) o deje la ruta local */
const VIDEO = { youtube:"", local:"video/presentacion.mp4" };

/* ====== SEDES POR CIUDAD (v6) ======
   FOTOS CON CUALQUIER NOMBRE (ej. fotos de WhatsApp): agregue a la sede la línea
     fotos:["img/sedes/<ciudad>/<CARPETA>/nombre exacto.jpg", "..."],
   Si las fotos se llaman foto-1.jpg ... foto-20.jpg no hace falta listarlas.
   FOTOS: cada sede tiene su carpeta dentro de su ciudad:  img/sedes/<ciudad>/<CARPETA>/
          Dentro, nombre las fotos: foto-1.jpg, foto-2.jpg, foto-3.jpg ... (hasta 8; también .png o .webp)
   - id: "<CARPETA>/foto"  → la parte antes de /foto es el nombre EXACTO de la carpeta. No lo cambie si no renombra la carpeta.
   - nombre: texto que aparece en el desplegable (se puede cambiar libremente).
   - cia: compañía(s) de la sede, para el filtro.
   - impacto: nombre(s) de la sede tal como aparece en IMPACTO_2026 / AVISOS_IMPACTO (se cargan solas en 2026).
   - proyectos: código de definición del proyecto en PROYECTOS_2026 (última columna). Se cargan solos en 2026.
   - hitos: mejoras escritas a mano por año. Para agregar una, escriba "texto" entre comillas separado por coma. */

const SEDES = [

  /* ---------- BARRANQUILLA ---------- */

  {
    id:"Genovés/foto",
    ciudad:"Barranquilla",
    fotos:[
      "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-17-07-25 1.jpg",
      "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-17-07-25 2.jpg",
      "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-17-07-25 3.jpg",
      "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-17-07-25 4.jpg",
      "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-17-07-25.jpg",
      "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-17-07-26 1.jpg",
      "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-17-07-26 2.jpg",
      "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-17-07-26.jpg",
      "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-19-10-10.jpg",
      "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-19-51-26 1.jpg",
      "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-19-51-26 2.jpg",
      "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-19-51-26 3.jpg",
      "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-19-51-26 4.jpg",
      "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-19-51-26.jpg",
      "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-19-51-27 1.jpg",
      "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-19-51-27.jpg"
    ],
    nombre:"Genovés (edificio)",
    cia:["Servicios Generales","IPS Sura","Ayudas Diagnosticas"],
    hitos:{
      "2025":[
  "Proyecto · 2025.AYDX.GENOVESP2-0738: Adecuaciones del servicio farmacéutico piso 2 Genovés",
  "Proyecto · 2025.CE.GENOVES-07530: Adecuaciones CE Genovés",
  "Proyecto · 2025.IPSGENP6.RIPS-07367: Salas de espera y puestos de trabajo IPS piso 6 Genovés",
  "Proyecto · 2025.SEÑALES.LAB-07482: Señalización interna laboratorio piso 8",
  "Proyecto · EXP.SALUDS.P8G-07490: Expansión oficinas Salud piso 8 Genovés",
  "Proyecto · REF.OF.PG.P6-07477: Adecuación oficinas sucursal piso 6 Genovés",
  "Proyecto · RESPALDOELEVADOR-07389: Respaldo de planta para circuito de ascensor",
  "Proyecto · 2025.S.ODONTO.GENO-07593: Preinstalaciones para silla odontológica Genovés"
 ],

 "2026":[
  "Proyecto · Adecuaicones Laboratorio Genoves - hematologia",
  "Proyecto · Adecuaciones de Auditorio",
  "Proyecto · Puntos de red para AP adicionales piso 8 Genoves",
  "Proyecto · Rehabilitacion Genoves",
  "Proyecto · Activos Biomedicos Rehab Genoves",
  "Proyecto · Sistema Extraccion Laboratorio genoves",
  "Proyecto · Salas de lactancia Prado office center- Portal de Genoves",
  "Proyecto · Vacunacion Genoves P5 - IPS",
  "Proyecto · Vacunacion Genoves P5 - AYDX",
  "Mantenimiento · Arreglo Aviso Fachada",
  "Mantenimiento · Cambio de forro sillas del auditorio Piso 7",
  "Mantenimiento · Cambio de cielo raso en madera de entrada PBS",
  "Mantenimiento · Puertas para cierre espacio  cocineta piso 6",
  "Mantenimiento · Informe del sistema de Extracción",
  "Mantenimiento · Pintura sala de reuniones piso 6 y 7, lobby , recepcion piso 7",
  "Mantenimiento · Señalizacion area de lactancia piso 6",
  "Mantenimiento · Cambio de forro sillas del auditorio Piso 7 (12)",
  "Mantenimiento · Mntto aviso fachada / valla Publicitaria Genoves",
  "Mantenimiento · Arreglo de Cielo raso Farmacia",
  "Mantenimiento · Cambio de cielo raso en area de farmacia cruz verde",
  "Mantenimiento · Cambio acometida electrica de area imagenes piso 2 genoves",
  "Mantenimiento · Arreglo de cielo raso de sala espera urgencia",
  "Mantenimiento · Limpieza vidrios de fachada Genoves Corporatvio 6, 7 y 8",
  "Mantenimiento · Cambio de cielo raso en area de sala de espera",
  "Mantenimiento · Arreglo tanque Fibra de vidrio",
  "Mantenimiento · Tuberias de cuarto de maquinas de chillers",
  "Mantenimiento · Suministro de blackout sala 3 y 5 piso 6 Torre corporativa",
  "Mantenimiento · Jardineria torre corporativa ( poteras)",
  "Mantenimiento · Blackouts Lobby",
  "Mantenimiento · Acometida Electrica AA Farmacia"
 ],
      "2027":["Quirofanos Piso 9"]
    }
  },

  {
    id:"IPS ALTOS DEL PRADO/foto",
    ciudad:"Barranquilla",
    nombre:"IPS Altos del Prado",
    cia:["IPS Sura"],
    hitos:{
    "2025":[
  "Proyecto · 2025-INSTALACION APPRADO: Instalación AP en IPS Altos del Prado"
 ],

 "2026":[
  "Proyecto · Baños Pirvados ALtos del pRado",
  "Proyecto · Adec. Gestion Materna - Puerta odontologia /400013761",
  "Proyecto · Instalacion de piso en vinilo, cambio de superficies, pintura",
  "Mantenimiento · Cambio piso rampa",
  "Mantenimiento · Retiro de Baldosas + Resane y Pintura paredes y puertas  piso 1",
  "Mantenimiento · Tapizado de mobiliario Piso 2",
  "Mantenimiento · Retiro de Baldosas + Resane y Pintura piso 2",
  "Mantenimiento · Pintura de la rampa",
  "Mantenimiento · Impermeabilización area de cubierta- lado de vacunación",
  "Mantenimiento · Canalizacion y adec. de cableado para reforma en las paredes 1er piso",
  "Mantenimiento · Materas de Fachada",
  "Mantenimiento · Cambio de mueble odontologia",
  "Mantenimiento · Desmonte e instalacion de plataforma- reforma paredes 1er piso",
  "Mantenimiento · Impresion de señalizacion pasillo cons 1 al 5 por pintura piso 2 mtto impacto",
  "Mantenimiento · Resane y pintura Prado"
 ],
    "2027":[]
    }
  },

  {
    id:"URG ALTO PRADO/foto",
    ciudad:"Barranquilla",
    nombre:"Urgencias Altos del Prado",
    cia:["IPS Sura"],
    hitos:{
      "2025":[
      "Proyecto · 2024.REHAB.URG.PRADO-072: Rehabilitación de Urgencias Prado",
      "Proyecto · REF.POCT.UR.AP-07485: Reforma laboratorio piso 3 Urgencias Altos del Prado"
 ],

 "2026":[
  "Mantenimiento · Cambio de Plataformas Piso 1 y 2",
  "Mantenimiento · Cambio de Tandems",
  "Mantenimiento · Pintura Piso 3",
  "Mantenimiento · Arreglo de Aviso Fachada",
  "Mantenimiento · Retapizado sofas descanso medico piso 3",
  "Mantenimiento · Pintura puertas Piso 3",
  "Mantenimiento · Acometidas Electricas de plataformas"
 ],
      "2027":[]
    }
  },

  {
    id:"URG CORDIALIDAD/foto",
    ciudad:"Barranquilla",
    nombre:"Urgencias Cordialidad",
    cia:["IPS Sura","Ayudas Diagnosticas"],
    hitos:{
      "2025":[
  "Proyecto · 2025.AYDX.CORD.P2-07369: Adecuaciones en baños y puerta acceso AYDX Cord RIPS",
  "Proyecto · 2025.IPS.CORD.P2-07370: Adecuaciones acceso ARL Cordialidad RIPS"
  ],

 "2026":[
  "Proyecto · Sala de lactancia Cordialidad",
  "Proyecto · Farmacias satelites",
  "Mantenimiento · Pintura fachada Frontal",
  "Mantenimiento · mantenimiento aviso fachada",
  "Mantenimiento · Pintura fasttrack y ERA",
  "Mantenimiento · Pintura recepcion y sala espera triage",
  "Mantenimiento · Cojines para area de descanso medicos",
  "Mantenimiento · Pintura Observacion adultos y Procedimientos",
  "Mantenimiento · Cambio Esmerilados vidrios fachada",
  "Mantenimiento · Pintura Piso 2",
  "Mantenimiento · Retapizado Tandems",
  "Mantenimiento · Sistemas de alarmas",
  "Mantenimiento · Pintura de Escaleras"
 ],
      "2027":["Salud en Casa Sotano"]
    }
  },

  {
    id:"CE PRADO OFFICE CENTER/foto",
    ciudad:"Barranquilla",
    nombre:"CE Prado Office Center",
    cia:["Servicios Generales"],
    hitos:{
    "2025":["Proyecto · PUNTOSDECAFE-ARL-07526: Adecuación punto de café ARL"],
    "2026":["Proyecto · Salas de lactancia Prado office center- Portal de Genoves",
      "Proyecto · Adecuacion Prado Office Center",
      "Mantenimiento · Cambio de soportes a los puestos de trabajo",
      "Mantenimiento · Pintura almacenes- cambio de luminarias en cafetin- almacenes",
      "Mantenimiento · Pintura almacen auditorio, cielo del hall ingreso a la sede, instalacion de protector en el auditorio.",
      "Mantenimiento · Cotizacion pintua de zocalos",
      "Mantenimiento · Cambio de sillas interlocutoras butterfly por mal estado"],
    "2027":["Entrega de la nueva remodelacion"]
    }
  },

  {
    id:"SALUD EN CASA BAQ/foto",
    ciudad:"Barranquilla",
    nombre:"Salud en Casa Barranquilla",
    cia:["IPS Sura"],
    hitos:{
    "2025":[
  "Proyecto · 2025-ADEC. BEBE CANGURO-: Adecuación Bebé Canguro",
  "Proyecto · 2025-INTERV.BEBE CANGURO: Intervención Bebé Canguro"
 ],

 "2026":[
  "Mantenimiento · Pintura Interna y parte fachada",
  "Mantenimiento · Impermeabilizacion de Cubierta",
  "Mantenimiento · Pintura parqueadero",
  "Mantenimiento · Pintura de farmacia",
  "Mantenimiento · Mtto y reparacion de baranda en cubierta"
 ],
    "2027":[]
    }
  },

  {
    id:"EPS BAQ/foto",
    ciudad:"Barranquilla",
    nombre:"EPS Barranquilla",
    cia:["EPS Sura"],
    hitos:{
      "2025":["Proyecto · ADECUACION EPS PLAT.-073: Adecuación de plataforma EPS Barranquilla"],
      "2026":[],
      "2027":[]
    }
  },

  {
    id:"CC VIVA/foto",
    ciudad:"Barranquilla",
    nombre:"CC Viva · Ayudas Diagnósticas",
    cia:["Ayudas Diagnosticas"],
    hitos:{
    "2025":["Proyectos · Renovaciones de equipos de AA"],
    "2026":[
  "Mantenimiento · Arreglo y mejora de sujecion de vidrios Fachada",
  "Mantenimiento · Cambio de Rieles puertas de Vidrio",
  "Mantenimiento · Arreglo Cielo Raso De la sede"
 ],
    "2027":["¨Proyectos · Traslado al Edf. 51B"]
    }
  },

  /* otras sedes de Barranquilla (fotos pendientes) */

  {
    id:"EDIFICIO 51B/foto",
    ciudad:"Barranquilla",
    nombre:"Edificio 51B",
    cia:["Ayudas Diagnosticas"],
    hitos:{
      "2025":[],
      "2026":["Proyectos · Reparaciones para cumplimiento NSR-10"],
      "2027":["Proyectos · Adecuaciones para trasaldos de IPS/AYDX"]
    }
  },

  {
    id:"AYDX ALTOS DEL PRADO/foto",
    ciudad:"Barranquilla",
    nombre:"Ayudas Diagnósticas Altos del Prado",
    cia:["Ayudas Diagnosticas"],
    hitos:{
    "2025":[],
    "2026":[],
    "2027":[]
    }
  },

  {
    id:"AYDX PORTAL DEL PRADO/foto",
    ciudad:"Barranquilla",
    nombre:"Ayudas Diagnósticas Portal del Prado",
    cia:["Ayudas Diagnosticas"],
    hitos:{
    "2025":[],
    "2026":["Mantenimiento · Pintura Sede"],
    "2027":["Proyectos · Mejorar Capacidad Termica AA"]
    }
  },

  {
    id:"IPS ATEL BAQ/foto",
    ciudad:"Barranquilla",
    nombre:"IPS ATEL Barranquilla",
    cia:["IPS Sura"],
    hitos:{
    "2025":[],
    "2026":[
      "Mantenimiento · Pintura de sede- retiro de baldosas",
      "Mantenimiento · Mueble para organizar area de plataforma",
      "Mantenimiento · Desinstalación e instalacion cableado plataforma",
      "Mantenimiento · Desmonte e instalacion de plataforma"
    ],
    "2027":[]
    }
  },

  {
    id:"SALUD SURA CONTINENTAL/foto",
    ciudad:"Barranquilla",
    nombre:"SURA Continental",
    cia:["IPS Sura"],
    hitos:{
    "2025":["Proyecto · 2025-REUBICACION AA-0762: Reubicación de aire acondicionado IPS Continental"],
    "2026":["Proyecto · Adec. consultorios 8 y 9"],
    "2027":[]
    }
  },


  /* ---------- CARTAGENA ---------- */

  {
    id:"AYDX TM PLAZUELA CTGA/foto",
    ciudad:"Cartagena",
    nombre:"Ayudas Diagnósticas TM Plazuela",
    cia:["Ayudas Diagnosticas"],
    hitos:{
    "2025":[],
    "2026":[
      "Mantenimiento · Retiro de Baldosa + resane y pintura",
      "Mantenimiento · Pintura Interna de Sede",
      "Mantenimiento · Arreglo de Cielo raso y luminarias doble altura",
      "Mantenimiento · Impermeabilizacion"
        ],
    "2027":[]
    }
  },

  {
    id:"CE SUCURSAL SEGUROS CTGA/foto",
    ciudad:"Cartagena",
    nombre:"CE Sucursal Seguros Cartagena",
    cia:["Servicios Generales"],
    hitos:{
      "2025":[
  "Proyecto · 2025.CE.CTGA-07538: Remodelación CE Cartagena",
  "Proyecto · 2025.CUBIERTA.CTGA-07534: Cambio de cubierta Cartagena",
  "Proyecto · 2025.P.CAFE.CTGA-07525: Punto de café Cartagena"
 ],

 "2026":[
  "Mantenimiento · Cambio de Cielo Raso Sucursal Cartagena",
  "Mantenimiento · Pintura de Estructura Metalica Parqueaderos",
  "Mantenimiento · Arreglos adicionales y obra civil",
  "Mantenimiento · Esmerilados De Sala Recepcion",
  "Mantenimiento · Arreglo Linea de Vida",
  "Mantenimiento · Señalizacion Interna Platformas Nuevas",
  "Mantenimiento · Pintura Plataforma e interiores",
  "Mantenimiento · Pintura de Oficina de Gerencia y salas de reuniones"
 ],
      "2027":[]
    }
  },

  {
    id:"EPS SAN FELIPE CTGA/foto",
    ciudad:"Cartagena",
    nombre:"EPS San Felipe",
    cia:["EPS Sura"],
    hitos:{
      "2025":["Proyecto · Rediseño de puestos de trabajo"],
      "2026":[],
      "2027":[]
    }
  },

  {
    id:"IPS MOVISOL CTGA/foto",
    ciudad:"Cartagena",
    nombre:"IPS Movisol",
    cia:["IPS Sura"],
    hitos:{
    "2025":[],
    "2026":["Mantenimiento · Pintura de Sede"],
    "2027":[]
    }
  },

  {
    id:"IPS SERENA DEL MAR CTGA/foto",
    ciudad:"Cartagena",
    nombre:"IPS Serena del Mar",
    cia:["IPS Sura"],
    hitos:{
      "2025":["Mantenimiento · Registros para mejorar mntto AA"],
      "2026":["Mantenimiento · Pintura de sede",
              "Mantenimiento · Arreglo Cielo raso"
      ],
      "2027":[]
    }
  },

  /* otras sedes de Cartagena (fotos pendientes) */

  {
    id:"AYDX PIE DE LA POPA CTGA/foto",
    ciudad:"Cartagena",
    nombre:"Ayudas Diagnósticas Pie de la Popa",
    cia:["Ayudas Diagnosticas"],
    hitos:{
    "2025":[ "Proyecto · Cierre del Laboratorio San Felipe"],
    "2026":[
  "Mantenimiento · Cambio de Pisos Sala De Espera",
  "Mantenimiento · Pintura y Arreglo de puertas por cambio de piso",
  "Mantenimiento · Mejora de Plataforma",
  "Mantenimiento · Reubciacion de Plataforma x cambio de piso",
  "Mantenimiento · Arreglo de Paredes y Cielo raso por tuebrias de AA",
  "Mantenimiento · Apoyo logistico Mobiliario por cambio de piso",
  "Mantenimiento · Apoyo tecnico en cambio de AA",
  "Mantenimiento · Cableado electrico por cambio de piso"
 ],
    "2027":[]
    }
  },


  /* ---------- BUCARAMANGA ---------- */

  {
    id:"AYDX TM BUCARAMANGA/foto",
    ciudad:"Bucaramanga",
    nombre:"Ayudas Diagnósticas TM Bucaramanga",
    cia:["Ayudas Diagnosticas"],
    hitos:{
    "2025":[],
    "2026":[
  "Proyecto · Mapa y holter BGA",
  "Mantenimiento · pintura de fachada por cambio de aviso",
  "Mantenimiento · Renovacion RETIE",
  "Mantenimiento · Renovacion iluminacion",
  "Mantenimiento · Demarcacion de cuartos de maquinas"
 ],
    "2027":[]
    }
  },

  {
    id:"EPS BUCARAMANGA/foto",
    ciudad:"Bucaramanga",
    nombre:"EPS Bucaramanga",
    cia:["EPS Sura"],
    hitos:{
      "2025":["Validación de plataforma EPS dentro del proyecto de mobiliario nacional"],
      "2026":[],
      "2027":[]
    }
  },

  {
    id:"IPS BUCARAMANGA/foto",
    ciudad:"Bucaramanga",
    nombre:"IPS Bucaramanga",
    cia:["IPS Sura"],
    hitos:{
    "2025":[
  "Proyecto · INST.LAV.IPS.BUC-07501: Instalación de lavamanos IPS Bucaramanga",
  "Proyecto · MARCAIPSARLBGA-07392: Marca y señalización IPS/ARL Bucaramanga",
  "Proyecto · PLATAFORMABGA-07459: Adecuación e instalación de plataformas IPS Bucaramanga"
 ],

 "2026":[
  "Proyecto · Adecuacion salud modular",
  "Proyecto · Extraccion baños y transformador IPS BGA",
  "Proyecto · Plan Modular IPS BGA",
  "Proyecto · Plataforma con modulo movilidad reducida",
  "Mantenimiento · Sellado piso vinilo",
  "Mantenimiento · Organización de tableros electricos",
  "Mantenimiento · pintura de odontología y retiro de poceta",
  "Mantenimiento · pintura de fachada por cambio de aviso",
  "Mantenimiento · pintura cafetin",
  "Mantenimiento · Pintura almacen de insumo",
  "Mantenimiento · Reparacion cielo raso por cambio de ductos",
  "Mantenimiento · Renovacion de muebles de almacenamiento odontologia",
  "Mantenimiento · Limpieza e impemeabilizacion area de maquinas",
  "Mantenimiento · Instalacion de lamina de alfajor para acceso a tableros",
  "Mantenimiento · Pintura sala de espera",
  "Mantenimiento · Renovacion de mobiliario sala de espera",
  "Mantenimiento · Reparacion paso peatonal externo"
 ],
    "2027":[]
    }
  },

  {
    id:"SALUD SURA BUCARAMANGA/foto",
    ciudad:"Bucaramanga",
    nombre:"Salud SURA Bucaramanga",
    cia:["IPS Sura"],
    hitos:{
    "2025":[
  "Proyecto · ODONTOSSBGA-07612: Unidad de odontología Salud SURA Bucaramanga"
 ],

 "2026":[
  "Proyecto · UNIDAD ODONTOLOGIA SS BGA",
  "Mantenimiento · Pintura consultorios",
  "Mantenimiento · Renovacion RETIE",
  "Mantenimiento · Pintura puertas mueble sala de procedmientos"
 ],
    "2027":[]
    }
  },

  /* otras sedes de Bucaramanga (fotos pendientes) */

  {
    id:"SUCURSAL BUCARAMANGA/foto",
    ciudad:"Bucaramanga",
    nombre:"Sucursal Bucaramanga",
    cia:["Sura Generales","Ayudas Diagnosticas"],
    hitos:{
      "2025":[],
      "2026":[
  "Proyecto · Remodelacion Sucursal Bucaramanga",
  "Mantenimiento · Limpieza de aviso fachada",
  "Mantenimiento · Renovacion imagen",
  "Mantenimiento · Pintura Auditorio",
  "Mantenimiento · Adecuaciones electricas Instalacion video beam"
 ],
      "2027":[]
    }
  },

  {
    id:"AUTOS SURA BUCARAMANGA/foto",
    ciudad:"Bucaramanga",
    nombre:"Autos SURA Bucaramanga",
    cia:["Sura Generales","Servicios Generales"],
    hitos:{
      "2025":[
  "Proyecto · CAFEBGAAUTOS-07542: Adecuación de nicho de café Autos Bucaramanga",
  "Proyecto · FACHADAAUTOSBGA-07515: Reparación de fachada Autos Bucaramanga"
 ],

 "2026":[
  "Proyecto · Remodelacion Autos Bucaramanga Seguros",
  "Mantenimiento · Reparacion de asfalto",
  "Mantenimiento · Lavado de pergola",
  "Mantenimiento · Instalacion baranda area motos",
  "Mantenimiento · Renovacion imagen"
 ],

 "2027":[
  "Proyecto · Remodelacion Autos Bucaramanga Servicios"
 ]
    }
  },

  {
    id:"CEM ATLAS/foto",
    ciudad:"Bucaramanga",
    nombre:"CEM SURA Atlas",
    cia:["Servicios Generales"],
    hitos:{
   "2025":[
  "Proyecto · AUDITORIOATLASBGA-07514: Adecuaciones del auditorio Atlas",
  "Proyecto · PUNTOSCAFEBGA-07509: Adecuaciones de café Atlas",
  "Proyecto · SALALACDESATLAS-07513: Sala de lactancia y descanso Atlas"
 ],

 "2026":[
  "Mantenimiento · Relleno de puff",
  "Mantenimiento · Pintura cuarto de aseo, instalacion de panel led y cuelga traperos",
  "Mantenimiento · Cambio de iluminacion a led"
 ],
    "2027":[]
    }
  },


  /* ---------- CÚCUTA ---------- */

  {
    id:"CE SUCURSAL CUCUTA/foto",
    ciudad:"Cúcuta",
    nombre:"Sucursal Seguros SURA Cúcuta",
    cia:["Servicios Generales"],
    hitos:{
      "2025":[
  "Proyecto · PORTONSSCUCUTA-07393: Portón vehicular Cúcuta",
  "Proyecto · PUNTOSCAFECUC-07512: Nicho de café Cúcuta"
 ],

 "2026":[
  "Mantenimiento · Certificacion del porton"
 ],
      "2027":[]
    }
  },

  {
    id:"SALUD SURA CUCUTA/foto",
    ciudad:"Cúcuta",
    nombre:"Salud SURA Cúcuta",
    cia:["IPS Sura"],
    hitos:{
   "2025":[
  "Proyecto · CONSULTORIOCUC-07461: Adecuación de consultorio Cúcuta"
 ],

 "2026":[
  "Proyecto · Plataforma con modulo movilidad reducida Cucuta",
  "Mantenimiento · Esclusa patio"
 ],
    "2027":[]
    }
  },




  /* ---------- SANTA MARTA ---------- */

  {
    id:"IPS ATEL AQUARELA/foto",
    ciudad:"Santa Marta",
    nombre:"IPS ATEL Aquarela Plaza",
    cia:["IPS Sura"],
    hitos:{
      "2025":["Traslado de la sede a Aquarela"],
      "2026":["Mejora en los baños y cuartos de resiudos"],
      "2027":[]
    }
  },



  /* ---------- MONTERÍA ---------- */

  {
    id:"AYDX MONTERIA/foto",
    ciudad:"Montería",
    nombre:"Ayudas Diagnósticas Montería",
    cia:["Ayudas Diagnosticas"],
    hitos:{
    "2025":["Aperturo en el 2022"],
    "2026":["No presenta novedad"],
    "2027":[]
    }
  },



  /* ---------- VALLEDUPAR ---------- */

  {
    id:"PROMOTORA VALLEDUPAR/foto",
    ciudad:"Valledupar",
    nombre:"Promotora Valledupar",
    cia:["Sura Generales"],
    hitos:{
    "2025":["Mantenimiento · Arreglos y mejoras de la cubierta"],
  "2026":[
  "Proyecto · Adecuacion Rampa Acceso Promotora Valledupar",
  "Mantenimiento · Cambio de luminarias"
 ],
    "2027":[]
    }
  },

  {
    id:"IPS ATEL VALLEDUPAR/foto",
    ciudad:"Valledupar",
    nombre:"Consultorio IPS ATEL Valledupar",
    cia:["IPS Sura"],
    hitos:{
    "2025":[],
    "2026":[],
    "2027":[]
    }
  }

];

/* ====== PROYECTOS DESTACADOS · RESPALDO ======
   La lista principal se genera automáticamente en proyectos_index.json mediante
   actualizar_proyectos.py, que recorre esta estructura física:
   pj_destacados/<ciudad>/<unidad_de_negocio>/<proyecto>/.

   Esta constante se conserva únicamente como respaldo para abrir index.html mediante
   file:// o cuando proyectos_index.json todavía no esté disponible. No es necesario
   registrar aquí cada carpeta nueva: agregue las fotos, ejecute el script localmente o
   deje que Netlify lo ejecute durante el despliegue.
*/
const PROYECTOS_DESTACADOS = [
 {ciudad:"Barranquilla", unidades:["IPS"], proyecto:"rehabilitacion_genoves", carpeta:"rehabilitacion_genoves", nombre:"Rehabilitación Genovés",
  texto:"Escriba aquí la descripción, los resultados y los aspectos destacados del proyecto.",
  fotos:[]}
];

/* ====== PROYECTOS DESTACADOS · TEXTOS PERMANENTES (PJD_TEXTOS) ======
   Aquí se escriben las descripciones de cada proyecto destacado.
   Las carpetas y fotos se detectan solas (actualizar_proyectos.py → proyectos_index.json);
   este bloque SOLO controla el texto que aparece en "TEXTO DEL PROYECTO".

   CÓMO AGREGAR UN PROYECTO NUEVO:
   1) Cree la carpeta: pj_destacados/<ciudad>/<unidad_de_negocio>/<proyecto>/ y agregue las fotos.
   2) Ejecute actualizar_proyectos.py (o deje que Netlify lo ejecute).
   3) Copie la ruta que aparece debajo del título del proyecto en la presentación,
      SIN "pj_destacados/" y SIN la barra final. Ejemplo:
        pantalla: pj_destacados/barranquilla/ips/rehabilitacion_genoves/
        clave:    "barranquilla/ips/rehabilitacion_genoves"
   4) Agregue una línea:  "clave": "texto del proyecto",
   La clave debe escribirse EXACTAMENTE igual al nombre de las carpetas
   (mayúsculas, espacios y tildes incluidos).
   Si un proyecto no tiene línea aquí, se muestra el texto predeterminado. */
const PJD_TEXTOS = {

  /* ---------- BARRANQUILLA ---------- */
  "barranquilla/ips/rehabilitacion_genoves":
    "Apertura del nuevo servicio de terapia fisica en el piso 6 de la torre de salud, cuenta con maquinas de ejercicio, un area de TRX para funcionales, 5 consultorios, 4 cubiculos de terapia de extremidades y 2 cubiculos para terapias de mano",

  /* ---------- BUCARAMANGA ---------- */
  "bucaramanga/servicios_generales/AUTOS SURA BUCARAMANGA":
    "Se adecuan los espacios como Centro de Encuentro",

  "bucaramanga/servicios_generales/VICEPRESIDENCIA DE CANALES Y MERCADOS":
    "Se remodela la sede con la nueva imagen nacional de las oficinas",


};
