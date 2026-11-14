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
/* Presupuesto operativo 2026 Regional Norte (Final aprobado) */
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
 "Barranquilla":{foto:"img/sedes/barranquilla.jpg",sedes:"Portal del Genovés · Altos del Prado · Urgencias Cordialidad · Prado Office Center  · Salud en Casa",
  hitos:{
  "2025":["Rehabilitación de Urgencias Prado: material didáctico, rampa y escalera","Salas de espera y puestos de trabajo IPS Genovés piso 6","Adecuación de baños y acceso de Ayudas Diagnósticas Cordialidad","Consolidación de mobiliario EPS/IPS con modelo de plataforma Barranquilla"],
   "2026":["Rehabilitación Genovés piso 6 y dotación biomédica","Reparaciones del Edificio 51B para cumplimiento NSR-10","Sistema de extracción y adecuación de hematología en el Laboratorio Genovés","Salas de lactancia, baños, vacunación y consultorios en Altos del Prado, Cordialidad y Continental"],
   "2027":["XXX"]}},
 "Cartagena":{foto:"img/sedes/cartagena.jpg",sedes:"Sucursal Seguros · EPS San Felipe · Serena del Mar",
  hitos:{
  "2025":["Apertura de la sede Serena del Mar, con capacidad para 12.000 usuarios al mes","Rediseño de puestos de trabajo EPS San Felipe y Sucursal (piso 2)"],
   "2026":["Cierre y entrega del Laboratorio San Felipe"],
   "2027":["XXX"]}},
 "Bucaramanga":{foto:"img/sedes/bucaramanga.jpg",sedes:"CEM SURA · Atlas P7 · IPS · Autos SURA",
  hitos:{"2025":["Validación de plataforma EPS dentro del proyecto de mobiliario nacional"],
   "2026":["Remodelación de la Sucursal Bucaramanga","Remodelación Autos SURA Bucaramanga","Unidad de odontología, mapa y holter, plan modular IPS","Plataforma con módulo de movilidad reducida"],
   "2027":["XXX"]}},
 "Cúcuta":{foto:"img/sedes/cucuta.jpg",sedes:"Sucursal Seguros SURA · Ayudas Diagnósticas Gran Colombia",
  hitos:{"2025":["Revisión de costos y rediseño de plataforma y nicho de café"],
   "2026":["Plataforma con módulo de movilidad reducida IPS"],
   "2027":["XXX"]}},
 "Santa Marta":{foto:"img/sedes/santa-marta.jpg",sedes:"IPS ATEL Aquarela Plaza · Ayudas Diagnósticas El Progreso",
  hitos:{"2025":["Nuevo subcontratista HVAC y reprogramación del mantenimiento preventivo"],
   "2026":["Actualización de nombre y dirección de la sede IPS ATEL en contratos de mantenimiento y residuos"],
   "2027":["XXX"]}},
 "Montería":{foto:"img/sedes/monteria.jpg",sedes:"Ayudas Diagnósticas Montería · CGR",
  hitos:{"2025":["Por completar"],"2026":["Por completar"],
  "2027":["XXX"]}},
 "Valledupar":{foto:"img/sedes/valledupar.jpg",sedes:"Promotora · Consultorio IPS ATEL",
  hitos:{"2025":["Por completar"],"2026":["Por completar"],
  "2027":["XXX"]}}
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
 {id:"Genovés/foto", ciudad:"Barranquilla",
  fotos:["img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-17-07-25 1.jpg",
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
         "img/sedes/barranquilla/Genovés/PHOTO-2026-10-28-19-51-27.jpg"], nombre:"Genovés (edificio)", cia:["Servicios Generales","IPS Sura","Ayudas Diagnosticas"],
  impacto:["Portal Genoves","Salud Sura Portal Del Genoves","Ayudas Diagnosticas Sura Laboratorio Por","Ayudas Diagnosticas Sura Imágenes Portal"],
  proyectos:["REHAB.GENOVES.IPS-07728","2026.REHAB.GENOV-07707","2026.LAB.GENOVES.AYDX-07","SIST.EXT.LAB.GEN-07793","2026.AP.WIFI.P8.GEN-0768","2026.AUD.CGR.GENOVES-076","SALAS.LACT.NORT-07789"],
  hitos:{"2025":["Salas de espera y puestos de trabajo IPS piso 6"],
         "2026":["Rehabilitación piso 6 y dotación biomédica"]}},
 {id:"IPS ALTOS DEL PRADO/foto", ciudad:"Barranquilla", nombre:"IPS Altos del Prado", cia:["IPS Sura"],
  impacto:["Ips Altos Del Prado"], proyectos:["ADE.BAÑOS.PRAD-07733","ADE.ALTOS.PRADO-07808","ADE.VACU.AL.PRAD-07774"], hitos:{"2025":[],"2026":[],"2027":[]}},
 {id:"URG ALTO PRADO/foto", ciudad:"Barranquilla", nombre:"Urgencias Altos del Prado", cia:["IPS Sura"],
  impacto:["Urg Altos Del Prado"], proyectos:[], hitos:{"2025":["Rehabilitación de Urgencias Prado: material didáctico, rampa y escalera"],"2026":[]}},
 {id:"URG CORDIALIDAD/foto", ciudad:"Barranquilla", nombre:"Urgencias Cordialidad", cia:["IPS Sura","Ayudas Diagnosticas"],
  impacto:[], proyectos:["SALAS.LACT.N.IPS-07822"], hitos:{"2025":["Adecuación de baños y acceso de Ayudas Diagnósticas"],"2026":[]}},
 {id:"CE PRADO OFFICE CENTER/foto", ciudad:"Barranquilla", nombre:"CE Prado Office Center", cia:["Servicios Generales"],
  impacto:["Padro Office"], proyectos:["SALAS.LACT.NORT-07789"], hitos:{"2025":[],"2026":[],"2027":[]}},
 {id:"SALUD EN CASA BAQ/foto", ciudad:"Barranquilla", nombre:"Salud en Casa Barranquilla", cia:["IPS Sura"],
  impacto:["Sc Aten Dom Barranquilla"], proyectos:[], hitos:{"2025":[],"2026":[],"2027":[]}},
 {id:"EPS BAQ/foto", ciudad:"Barranquilla", nombre:"EPS Barranquilla", cia:["EPS Sura"],
  impacto:[], proyectos:[], hitos:{"2025":["Consolidación de mobiliario EPS/IPS con modelo de plataforma Barranquilla"],"2026":[]}},
 {id:"CC VIVA/foto", ciudad:"Barranquilla", nombre:"CC Viva · Ayudas Diagnósticas", cia:["Ayudas Diagnosticas"],
  impacto:["Ay Dx Sura Viva Barranquilla Poliza"], proyectos:[], hitos:{"2025":[],"2026":[],"2027":[]}},
 /* otras sedes de Barranquilla (fotos pendientes) */
 {id:"EDIFICIO 51B/foto", ciudad:"Barranquilla", nombre:"Edificio 51B", cia:["Ayudas Diagnosticas"],
  impacto:[], proyectos:["2026.ADEC.EDF51B-07710"], hitos:{"2025":[],"2026":["Reparaciones para cumplimiento NSR-10"],"2027":[]}},
 {id:"AYDX ALTOS DEL PRADO/foto", ciudad:"Barranquilla", nombre:"Ayudas Diagnósticas Altos del Prado", cia:["Ayudas Diagnosticas"],
  impacto:["Ay Dx Salud Sura Altos Del Prado Poliza"], proyectos:[], hitos:{"2025":[],"2026":[],"2027":[]}},
 {id:"AYDX PORTAL DEL PRADO/foto", ciudad:"Barranquilla", nombre:"Ayudas Diagnósticas Portal del Prado", cia:["Ayudas Diagnosticas"],
  impacto:["Ay Dx Sura Portal Del Prado"], proyectos:[], hitos:{"2025":[],"2026":[],"2027":[]}},
 {id:"IPS URGENCIAS BAQ/foto", ciudad:"Barranquilla", nombre:"IPS Urgencias Barranquilla", cia:["IPS Sura"],
  impacto:["Ips Urgencias Barranquilla"], proyectos:[], hitos:{"2025":[],"2026":[],"2027":[]}},
 {id:"IPS ATEL BAQ/foto", ciudad:"Barranquilla", nombre:"IPS ATEL Barranquilla", cia:["IPS Sura"],
  impacto:["Atel Barranquilla"], proyectos:[], hitos:{"2025":[],"2026":[],"2027":[]}},
 {id:"SALUD SURA CONTINENTAL/foto", ciudad:"Barranquilla", nombre:"Salud SURA Continental", cia:["IPS Sura"],
  impacto:[], proyectos:["ADE.SC.CONTINEL-07821"], hitos:{"2025":[],"2026":[],"2027":[]}},
 /* ---------- CARTAGENA ---------- */
 {id:"AYDX TM PLAZUELA CTGA/foto", ciudad:"Cartagena", nombre:"Ayudas Diagnósticas TM Plazuela", cia:["Ayudas Diagnosticas"],
  impacto:["Ay Dx Sura La Plazuela"], proyectos:[], hitos:{"2025":[],"2026":[],"2027":[]}},
 {id:"CE SUCURSAL SEGUROS CTGA/foto", ciudad:"Cartagena", nombre:"CE Sucursal Seguros Cartagena", cia:["Servicios Generales"],
  impacto:["Cartagena"], proyectos:[], hitos:{"2025":["Rediseño de puestos de trabajo (piso 2)"],"2026":[],"2027":[]}},
 {id:"EPS SAN FELIPE CTGA/foto", ciudad:"Cartagena", nombre:"EPS San Felipe", cia:["EPS Sura"],
  impacto:["Adtivo Cartagena"], proyectos:[], hitos:{"2025":["Rediseño de puestos de trabajo"],"2026":[],"2027":[]}},
 {id:"IPS MOVISOL CTGA/foto", ciudad:"Cartagena", nombre:"IPS Movisol", cia:["IPS Sura"],
  impacto:["Atel Movisol Cartagena"], proyectos:[], hitos:{"2025":[],"2026":[],"2027":[]}},
 {id:"IPS SERENA DEL MAR CTGA/foto", ciudad:"Cartagena", nombre:"IPS Serena del Mar", cia:["IPS Sura"],
  impacto:["Salud Sura Serena Del Mar"], proyectos:[], hitos:{"2025":["Apertura de la sede, con capacidad para 12.000 usuarios al mes"],"2026":[],"2027":[]}},
 /* otras sedes de Cartagena (fotos pendientes) */
 {id:"AYDX PIE DE LA POPA CTGA/foto", ciudad:"Cartagena", nombre:"Ayudas Diagnósticas Pie de la Popa", cia:["Ayudas Diagnosticas"],
  impacto:["Ay Dx Sura Pie De La Popa Toma De Muestr","Ay Dx Sura Pie Popa"], proyectos:[], hitos:{"2025":[],"2026":[],"2027":[]}},
 /* ---------- BUCARAMANGA ---------- */
 {id:"AYDX TM BUCARAMANGA/foto", ciudad:"Bucaramanga", nombre:"Ayudas Diagnósticas TM Bucaramanga", cia:["Ayudas Diagnosticas"],
  impacto:["Ay Dx Sura Bucaramanga","Ay Dx Salud Sura Bucaramanga"], proyectos:["ADE.MAP.HOL.ADX-07678"], hitos:{"2025":[],"2026":[],"2027":[]}},
 {id:"EPS BUCARAMANGA/foto", ciudad:"Bucaramanga", nombre:"EPS Bucaramanga", cia:["EPS Sura"],
  impacto:["Adtivo Bucaramanga"], proyectos:[], hitos:{"2025":["Validación de plataforma EPS dentro del proyecto de mobiliario nacional"],"2026":[]}},
 {id:"IPS BUCARAMANGA/foto", ciudad:"Bucaramanga", nombre:"IPS Bucaramanga", cia:["IPS Sura"],
  impacto:["Ips Bucaramanga"], proyectos:["ADE.TRA.ODON.IPS-07715","PLA.MOD.IPS.BG-07717","ADE.IPS.BUCARA-07735"], hitos:{"2025":[],"2026":[],"2027":[]}},
 {id:"SALUD SURA BUCARAMANGA/foto", ciudad:"Bucaramanga", nombre:"Salud SURA Bucaramanga", cia:["IPS Sura"],
  impacto:["Salud Sura Bucaramanga"], proyectos:["ODONTOSSBGA-07612"], hitos:{"2025":[],"2026":[],"2027":[]}},
 /* otras sedes de Bucaramanga (fotos pendientes) */
 {id:"SUCURSAL BUCARAMANGA/foto", ciudad:"Bucaramanga", nombre:"Sucursal Bucaramanga", cia:["Sura Generales","Ayudas Diagnosticas"],
  impacto:["Bucaramanga"], proyectos:["REF.SUC.BUCARAM-07773"], hitos:{"2025":[],"2026":["Remodelación de la sucursal"]}},
 {id:"AUTOS SURA BUCARAMANGA/foto", ciudad:"Bucaramanga", nombre:"Autos SURA Bucaramanga", cia:["Sura Generales","Servicios Generales"],
  impacto:["Op Autos Bucaramanga"], proyectos:["PROY.SE.BGA.SEGUR-07797","PROY.SE.BGA.SERV-07795"], hitos:{"2025":[],"2026":["Remodelación de la sede"],"2027":[]}},
 {id:"CEM ATLAS/foto", ciudad:"Bucaramanga", nombre:"CEM SURA Atlas", cia:["Servicios Generales"],
  impacto:["Cem Atlas"], proyectos:[], hitos:{"2025":[],"2026":[],"2027":[]}},
 /* ---------- CÚCUTA ---------- */
 {id:"SUCURSAL SEGUROS CUCUTA/foto", ciudad:"Cúcuta", nombre:"Sucursal Seguros SURA Cúcuta", cia:["Servicios Generales"],
  impacto:["Cucuta"], proyectos:[], hitos:{"2025":["Revisión de costos y rediseño de plataforma y nicho de café"],"2026":[],"2027":[]}},
 {id:"SALUD SURA CUCUTA/foto", ciudad:"Cúcuta", nombre:"Salud SURA Cúcuta", cia:["IPS Sura"],
  impacto:["Sura Cucuta"], proyectos:["ADE.PLAT.MOVR-07736"], hitos:{"2025":[],"2026":[],"2027":[]}},
 {id:"AYDX GRAN COLOMBIA/foto", ciudad:"Cúcuta", nombre:"Ayudas Diagnósticas Gran Colombia", cia:["Ayudas Diagnosticas"],
  impacto:[], proyectos:[], hitos:{"2025":[],"2026":[],"2027":[]}},
 /* ---------- SANTA MARTA ---------- */
 {id:"IPS ATEL AQUARELA/foto", ciudad:"Santa Marta", nombre:"IPS ATEL Aquarela Plaza", cia:["IPS Sura"],
  impacto:["IPS ATEL Santa Marta"], proyectos:[], hitos:{"2025":["Nuevo subcontratista HVAC y reprogramación del mantenimiento preventivo"],"2026":["Actualización de nombre y dirección en contratos de mantenimiento y residuos"],"2027":[]}},
 {id:"AYDX EL PROGRESO/foto", ciudad:"Santa Marta", nombre:"Ayudas Diagnósticas El Progreso", cia:["Ayudas Diagnosticas"],
  impacto:[], proyectos:[], hitos:{"2025":[],"2026":[],"2027":[]}},
 /* ---------- MONTERÍA ---------- */
 {id:"AYDX MONTERIA/foto", ciudad:"Montería", nombre:"Ayudas Diagnósticas Montería", cia:["Ayudas Diagnosticas"],
  impacto:[], proyectos:[], hitos:{"2025":[],"2026":[],"2027":[]}},
 {id:"CGR MONTERIA/foto", ciudad:"Montería", nombre:"CGR Montería", cia:["CGR"],
  impacto:[], proyectos:[], hitos:{"2025":[],"2026":[],"2027":[]}},
 /* ---------- VALLEDUPAR ---------- */
 {id:"PROMOTORA VALLEDUPAR/foto", ciudad:"Valledupar", nombre:"Promotora Valledupar", cia:["Sura Generales"],
  impacto:["Promotora Valledupar"], proyectos:[], hitos:{"2025":[],"2026":[],"2027":[]}},
 {id:"IPS ATEL VALLEDUPAR/foto", ciudad:"Valledupar", nombre:"Consultorio IPS ATEL Valledupar", cia:["IPS Sura"],
  impacto:[], proyectos:[], hitos:{"2025":[],"2026":[],"2027":[]}}
];

/* ====== PROYECTOS DESTACADOS ======
   Cada proyecto corresponde a una carpeta dentro de pj_destacados/.

   Para agregar otro proyecto, copie una entrada y cambie:
   - ciudad: una de estas opciones: Barranquilla, Cartagena, Santa Marta, Valledupar,
     Montería, Cúcuta o Bucaramanga.
   - unidades: una o varias opciones entre Seguros Generales, Servicios Generales,
     IPS, AYDX y EPS.
   - carpeta: nombre EXACTO de la carpeta interna de pj_destacados.
   - nombre: título visible. Si se deja vacío, se forma desde el nombre de la carpeta.
   - texto: contenido inicial del cuadro de texto. El usuario también puede escribir en la
     presentación; ese cambio se conserva localmente en el navegador.
   - fotos (opcional): nombres EXACTOS de archivos cuando no se llaman foto-1.jpg,
     foto-2.jpg, etc. También admite {archivo:"foto.jpg", texto:"Pie de foto"}.

   Sin lista explícita, el carrusel prueba automáticamente foto-1 a foto-20 en formatos
   jpg, jpeg, png y webp dentro de pj_destacados/<carpeta>/.
*/
const PROYECTOS_DESTACADOS = [
 {ciudad:"Barranquilla", unidades:["IPS"], carpeta:"rehabilitacion_genoves", nombre:"Rehabilitación Genovés",
  texto:"Escriba aquí la descripción, los resultados y los aspectos destacados del proyecto.",
  fotos:[]}
];
