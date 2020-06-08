var express = require("express");
const fs = require("fs");
var pdf2html = require("pdf2html");
var md5 = require("md5");
const md5File = require("md5-file");

const fileUpload = require("express-fileupload");
const options = { text: true };
var router = express.Router();
var TESIS = require("../../database/tesis");
var PAGES = require("../../database/page");
var path = "/Users/Ditmar/sistema/police/pdffiles/taha.pdf";
/* GET home page. */
router.use(fileUpload());
router.get("/search", (req, res) => {
  /*var criterio = 
  TESIS.find({pagecontent: //});*/
});
router.get("/detail", (req, res) => {
  var obj = {
    portada: '/thumbail/?name=39ba8_FINAL_CRM_RENSSO.png',
    title: '“ANALISIS DE LOS FUNDAMENTOS PARA EL DISEÑO DE UNA BASE DE \n' +
      'DATOS CRM INTEGRAL ORIENTADA A LOS TRABAJOS DE \n' +
      '\n' +
      'INVESTIGACIÓN DE LA UNIPOL PARA LOGRAR LA MEJORA DE LA \n' +
      'GESTION ACADEMICA”',
    autor: [
      'AUTOR: TCNL. RENSSO ELVIS MERCADO HEREDIA \n\n \n\n   \n\n \n\n \n\nLA PAZ '
    ],
    numberpage: 30,
    abstrac: '1\t\n' +
      '\t\n' +
      '\t\n' +
      '\n' +
      'ÍNDICE DE CONTENIDOS \n' +
      '\t\n' +
      '\n' +
      '\t\n' +
      '\n' +
      '1. Contenido \n' +
      '\n' +
      'CAPÍTULO I ........................................................................................................ 4 \n' +
      '\n' +
      '1. PLANTEAMIENTO DEL PROBLEMA .......................................................... 4 \n' +
      '\n' +
      '1.1. Formulación del problema ......................................................................... 7 \n' +
      '\n' +
      '1.2. Elementos de Análisis ............................................................................... 7 \n' +
      '\n' +
      '1.3. OBJETIVOS .............................................................................................. 7 \n' +
      '\n' +
      '1.3.1. Objetivo General .................................................................................... 7 \n' +
      '\n' +
      '1.3.2. Objetivos Específicos ............................................................................. 8 \n' +
      '\n' +
      '1.4. JUSTIFICACIONES .................................................................................. 8 \n' +
      '\n' +
      '1.4.1. Justificación Teórica ............................................................................... 8 \n' +
      '\n' +
      '1.4.2. Justificación Práctica .............................................................................. 8 \n' +
      '\n' +
      '1.4.3. Justificación Social ................................................................................. 9 \n' +
      '\n' +
      '1.4.4. Justificación Metodológica ..................................................................... 9 \n' +
      '\n' +
      '1.4.5. Viabilidad ................................................................................................ 9 \n' +
      '\n' +
      '1.4.6. Factibilidad ........................................................................................... 10 \n' +
      '\n' +
      '1.5. Delimitación temporal .............................................................................. 10 \n' +
      '\n' +
      '2. MARCO TEORICO ..................................................................................... 11 \n' +
      '\n' +
      '2.1. Marketing Relacional ............................................................................... 11 \n' +
      '\n' +
      '2.1.1. Evolución del Marketing Relacional hacia el CRM ............................... 11 \n' +
      '\n' +
      '2.2. Definición del CRM (Customer Relationship Management) .................... 12 \n' +
      '\n' +
      '2.2.1. Importancia de un CRM ....................................................................... 12 \n' +
      '\n' +
      '2.2.2. Ventajas de  un software CRM ............................................................ 13 \n' +
      '\n' +
      '2.2.3. Componentes del Concepto de CRM .................................................. 13 \n' +
      '\n' +
      '2.3. CRM Educativo ....................................................................................... 15',
      content:      ['Plurinacional de Bolivia. Para el “Vivir Bien” en el equilibrio y relacionando \n' +
      '\n' +
      'armonía con la naturaleza”. \n' +
      '\n' +
      '2.8.4. Indicadores de gestión de calidad en el área académica \n' +
      'Se comprende como indicador de gestión de calidad en el área académica, \n' +
      '\n' +
      'aquella información que proporciona una magnitud en la relación de dos o más \n' +
      '\n' +
      'variables, que nos permita evaluar la efectividad del proceso de enseñanza y \n' +
      '\n' +
      'aprendizaje, es decir, su calidad y eficiencia. De esta manera, no se tratará de \n' +
      '\n' +
      'medir variables aisladas o señalar la evidencia de un hecho, sino de otorgar \n' +
      '\n' +
      'capacidad evaluativa a la información, de modo tal de conocer el estado en el \n' +
      '\n' +
      'que se encuentra la Institución en cuanto a la calidad Educativa respecto de las \n' +
      '\n' +
      'metas que al efecto establezca dicha  Institución.  \n' +
      '\n' +
      'A continuación podemos mostrar algunos indicadores para evaluar la calidad \n' +
      '\n' +
      'académica: \n' +
      '\n' +
      '1. Indicadores relativos a las alumnas/os Los indicadores relativos a las \n' +
      'alumna/os, que son los más numerosos, se refieren a varias de las \n' +
      '\n' +
      'dimensiones, como Requisitos de Admisión y Procesos de Selección, \n' +
      '\n' +
      'Progresión de Estudiantes y Evaluación de Resultados, Apoyo \n' +
      '\n' +
      'Institucional e Infraestructura, y Vinculación con el Medio. Cabe señalar, \n' +
      '\n' +
      'que en muchos casos un mismo indicador aporta a distintas \n' +
      '\n' +
      'dimensiones. \n' +
      '\n' +
      ' \n' +
      '\n' +
      '2. Indicadores relativos a los Académicos/As Los indicadores relativos a \n' +
      'los académicos-as se refieren básicamente a dos de las dimensiones \n' +
      '\n' +
      'identificadas en referencia al cuerpo académico: Características \n' +
      '\n' +
      'Generales y Trayectoria, productividad y sustentabilidad.',
    '15 \n' +
      ' \n' +
      '\n' +
      '3. Indicadores Relativos a la Autorregulación Los indicadores que se \n' +
      'presentan a continuación se refieren a la Capacidad de Autorregulación \n' +
      '\n' +
      'de los programas de posgrado, dimensión en la cual también se ha \n' +
      '\n' +
      'incluido el reconocimiento externo a la calidad (acreditación) de estos \n' +
      '\n' +
      'programas, que normalmente se otorga después de verificar los \n' +
      '\n' +
      'procesos de autorregulación. \n' +
      '\n' +
      'Es importante  tomar en cuenta  estos indicadores para evaluar la calidad \n' +
      '\n' +
      'académica, pero es necesario complementar con información de carácter \n' +
      '\n' +
      'cualitativo y participativo, para poder concebir una visión integral de lo que se \n' +
      '\n' +
      'requiera ser evaluado y poder asumir las acciones pertinentes para su mejora \n' +
      '\n' +
      'continua. \n' +
      '\n' +
      '2.9. MARCO CONCEPTUAL \n' +
      '\n' +
      '2.9.1. Sistema Educativo Policial \n' +
      'El Sistema Educativo Policial (S.E.P.) está constituido por la Dirección Nacional \n' +
      '\n' +
      'de Instrucción y Enseñanza; Universidad Policial “Mcal. Antonio José de \n' +
      '\n' +
      'Sucre”, integrada por las Unidades Académicas de Formación en Pregrado: \n' +
      '\n' +
      'Academia Nacional de Policías y Escuela Básica Policial; y en Postgrado: \n' +
      '\n' +
      'Escuela Superior de Policías, reconocidos en los Artículos 94 al 99 del Capítulo \n' +
      '\n' +
      'IX (del Régimen Educativo) de la Ley Orgánica de la Policía Nacional. \n' +
      '\n' +
      'La Universidad Policial, se constituye en una UNIVERSIDAD PÚBLICA deRégi\n' +
      '\n' +
      'men Especial, dedicada a la enseñanza del conocimiento y la CienciaPolicial, \n' +
      '\n' +
      'orientada a la formación profesional de sus recursos humanos para el \n' +
      '\n' +
      'cumplimiento de la misión constitucional. \n' +
      '\n' +
      '2.9.2. Indicadores de Calidad Educativa \n' +
      'Los indicadores de calidad nos pueden servir para definir y concretar, y sobre \n' +
      '\n' +
      'todo priorizar, en qué aspectos de la calidad educativa se pretende incidir y, a \n' +
      '\n' +
      'partir de ahí, definir los objetivos concretos de una estrategia en política \n' +
      '\n' +
      'educativa \n' +
      '\n' +
      'Los indicadores del sector educativo se dividen en cuatro grandes tipos: \n' +
      '\n' +
      '• Indicadores de resultados del aprendizaje. \n' +
      '\n' +
      '• Indicadores de recursos económicos y humanos.',
    '16 \n' +
      ' \n' +
      '\n' +
      '• Indicadores de acceso a la educación, participación y promoción \n' +
      '\n' +
      '• Indicadores de contexto pedagógico y organización escolar. \n' +
      '\n' +
      'El principal valor de los indicadores es proporcionar información relevante a las \n' +
      '\n' +
      'administraciones educativas, a los órganos de participación institucional, a los \n' +
      '\n' +
      'agentes implicados en el proceso educativo (familias, alumnos, profesores y \n' +
      '\n' +
      'otros profesionales y entidades), así como a los ciudadanos en general, sobre \n' +
      '\n' +
      'el grado de calidad y equidad que alcanza el sistema educativo. (Clarense, \n' +
      '1994 p. 57) \n' +
      '\n' +
      '2.9.3. Calidad en la Educación \n' +
      'Cuando hablamos de calidad en la educación nos referimos a aquel \n' +
      '\n' +
      'funcionamiento en los centros educativos que permite tener un control de todos \n' +
      '\n' +
      'los procesos llevados a cabo en los mismos, así como la correcta gestión de \n' +
      '\n' +
      'éstos. \n' +
      '\n' +
      'Para lograr la calidad en la educación, los centros educativos deben abordar un \n' +
      '\n' +
      'proceso de implementación de procesos de gestión de la calidad. \n' +
      '\n' +
      'Esta implementación de la calidad en educación implica en primer lugar \n' +
      '\n' +
      'identificar el sistema de gestión de calidad que se desea implementar para, una \n' +
      '\n' +
      'vez dado este paso, proceder a la correcta interpretación de los requisitos del \n' +
      '\n' +
      'mismo, de cara a adaptarlo al centro educativo en cuestión y poder lograr el \n' +
      '\n' +
      'correcto cumplimiento de los mismos. \n' +
      '\n' +
      'Así pues, desarrollar la calidad en la educación, implica disponer de un Sistema \n' +
      '\n' +
      'de Gestión de Calidad, así como modelos de evaluación de los diferentes \n' +
      '\n' +
      'programas y centros, así como sus procedimientos y en los modelos de \n' +
      '\n' +
      'excelencia.  \n' +
      '\n' +
      '2.10. MARCO JURIDICO – LEGAL \n' +
      '\n' +
      '2.10.1. Normas que rigen el proceso Educativo \n' +
      'Artículo 1. (Objeto). \n' +
      '\n' +
      'Normar los procedimientos para la planificación, organización, ejecución, \n' +
      '\n' +
      'seguimiento y evaluación de la Gestión Educativa y Escolar  del \n' +
      '\n' +
      'Subsistema de Educación Regular con base en el Modelo Educativo',
    '17 \n' +
      ' \n' +
      '\n' +
      'Sociocomunitario Productivo, establecido por la Ley N° 070 de la \n' +
      '\n' +
      'Educación “Avelino Siñani - Elizardo Pérez” de 20 de diciembre de 2010. \n' +
      '\n' +
      'Artículo 2. (Ámbito de aplicación). \n' +
      '\n' +
      'Las Normas Generales de la Gestión Educativa y Escolar son de \n' +
      '\n' +
      'aplicación obligatoria en toda la estructura administrativa y de gestión del \n' +
      '\n' +
      'Subsistema de Educación Regular; reglamenta todas las acciones de \n' +
      '\n' +
      'Educación Inicial en Familia Comunitaria, Educación Primaria \n' +
      '\n' +
      'Comunitaria Vocacional y Educación Secundaria Comunitaria Productiva \n' +
      '\n' +
      'de las unidades educativas fiscales, privadas y de convenio. \n' +
      '\n' +
      '2.10.2. Fundamentos \n' +
      'El S.E.P. se funda sobre la misión establecida en la Constitución Política del \n' +
      '\n' +
      'Estado, la Ley Orgánica de la Policía Nacional, Ley de Reforma Educativa y las \n' +
      '\n' +
      'bases filosóficas, socioculturales, políticas, económicas y educativas del país. \n' +
      '\n' +
      '2.10.3. Base Legal \n' +
      'La Universidad Policial como principal componente del Sistema Educativo \n' +
      '\n' +
      'Policial (S.E.P.), en su estructura legal, actúa como Universidad Pública de \n' +
      '\n' +
      'RégimenEspecial, bajo la tuición del Comando General de la Policía Nacional, \n' +
      '\n' +
      'sufuncionamiento se ampara en los siguientes estamentos legales: \n' +
      '\n' +
      'a)Constitución Política del Estado: Título VIII, Régimen de la Policía Nacional  \n' +
      'Art. 215. \n' +
      '\n' +
      'b) Ley Orgánica de la Policía Nacional (de 8 de abril de 1985): Arts. 1, 6, 29,55, \n' +
      'inc. “b” Cap. IX (Régimen Educativo), Ley de Reforma Educativa No.1565 (de 7 \n' +
      '\n' +
      'de julio de 1994), Arts. 1, 3, 4, 8, 14 y 19. \n' +
      '\n' +
      'c) Decreto Supremo No. 25477 (de 5 de agosto de 1999), de Reestructuración \n' +
      'de la Policía Nacional, Cap. VII (Formación y Capacitación), Art. 13. \n' +
      '\n' +
      'd) Reglamento General de Universidades Privadas, D. S. No. 26275 \n' +
      '\n' +
      'e) Reglamento General de Postgrado para Universidades Privadas de Bolivia, \n' +
      'D.S. No. 26275, de 5 de agosto de 2001. \n' +
      '\n' +
      'f)  Reglamento de Organización Curricular D.S. 23950.',
    '18 \n' +
      ' \n' +
      '\n' +
      'g) Sistema Educativo Policial R.S. No. 216603 de 25 de enero de 1996. \n' +
      '\n' +
      '2.10.4. Ley Avelino Siñani Elizardo Perez  \n' +
      'La Ley 070 reconoce la educación como un derecho fundamental. Damos \n' +
      '\n' +
      'cuenta a continuación de los principales aspectos de esta ley. \n' +
      '\n' +
      'Artículo 1. (Mandatos Constitucionales de la educación). \n' +
      '\n' +
      '1. Toda persona tiene derecho a recibir educación en todos los niveles \n' +
      '\n' +
      'de manera universal, productiva, gratuita, integral e intercultural, sin \n' +
      '\n' +
      'discriminación. \n' +
      '\n' +
      '2. La educación constituye una función suprema y primera \n' +
      '\n' +
      'responsabilidad financiera del Estado, que tiene la obligación \n' +
      '\n' +
      'indeclinable de sostenerla, garantizarla y gestionarla. \n' +
      '\n' +
      '3. El Estado y la sociedad tienen tuición plena sobre el sistema \n' +
      '\n' +
      'educativo, que comprende la educación regular, la alternativa y especial, \n' +
      '\n' +
      'y la educación superior de formación profesional. El sistema educativo \n' +
      '\n' +
      'desarrolla sus procesos sobre la base de criterios de armonía y \n' +
      '\n' +
      'coordinación. \n' +
      '\n' +
      '4. El sistema educativo está compuesto por las instituciones educativas \n' +
      '\n' +
      'fiscales, instituciones educativas privadas y de convenio. \n' +
      '\n' +
      '5. La educación es unitaria, pública, universal, democrática, participativa, \n' +
      '\n' +
      'comunitaria, descolonizadora y de calidad. \n' +
      '\n' +
      '6. La educación es intracultural, intercultural y plurilingüe en todo el \n' +
      '\n' +
      'sistema educativo. \n' +
      '\n' +
      '7. El sistema educativo se fundamenta en una educación abierta, \n' +
      '\n' +
      'humanista, científica, técnica y tecnológica, productiva, territorial, teórica \n' +
      '\n' +
      'y práctica, liberadora y revolucionaria, crítica y solidaria. \n' +
      '\n' +
      '8. La educación es obligatoria hasta el bachillerato. \n' +
      '\n' +
      '9. La educación fiscal es gratuita en todos sus niveles hasta el superior.',
    '19 \n' +
      ' \n' +
      '\n' +
      '3. MARCO METODOLÓGICO \n' +
      '\n' +
      '3.1. Tipo de investigación \n' +
      'La presente investigación es de tipo descriptivo, que permitirá describir las \n' +
      '\n' +
      'situaciones anteriores, actuales y las que quieren proyectar, propone la \n' +
      '\n' +
      'caracterización del objeto de estudio permitirá  diagnosticar la situación de la  \n' +
      '\n' +
      'parte de la realidad que se investiga determinando su estado actual e \n' +
      '\n' +
      'identificando las necesidades y los problemas existentes. Así mismo mide y \n' +
      '\n' +
      'recoge la información de manera independiente.  \n' +
      '\n' +
      'Con la implementación de indicadores, permitirá a la UNIPOL tener una \n' +
      '\n' +
      'visualización general de la gestión académica y/o administrativa, que permitirán \n' +
      '\n' +
      'un mejoramiento continuo de las actividades académicas y administrativas, que \n' +
      '\n' +
      'reflejen una situación real de la situación de la UNIPOL. \n' +
      '\n' +
      '3.2. Enfoque \n' +
      'El enfoque del presente trabajo de investigación es de tipo cualitativo, ya que \n' +
      '\n' +
      'es necesario ver la calidad de información referida a la gestión académica \n' +
      '\n' +
      'actual, donde se visualizará las debilidades para fortalecer y/o implementar \n' +
      '\n' +
      'indicadores, que permitan reflejar datos certeros sobre el proceso de \n' +
      '\n' +
      'enseñanza aprendizaje. \n' +
      '\n' +
      'Cualitativo; el enfoque se caracteriza en cualitativo y cuantitativo ya que dentro \n' +
      '\n' +
      'la base de aplicación se tomarán datos con relación a los indicadores de \n' +
      '\n' +
      'gestión de calidad. En función a los objetivos de la investigación se decidió \n' +
      '\n' +
      'utilizar el enfoque mixto. \n' +
      '\n' +
      'Por cuanto se aplicara una encuesta a los estudiantes de la UNIPOL, Pos \n' +
      '\n' +
      'Grado y  una entrevista a los expertos en gestión de calidad. \n' +
      '\n' +
      '3.3. Diseño e investigación  \n' +
      'En la investigación se empleó el diseño no experimental transeccional que se \n' +
      '\n' +
      'realiza sin manipular deliberadamente variables. Es decir, “(…) se trata de la \n' +
      '\n' +
      'investigación donde no manipulan intencionalmente las variables \n' +
      '\n' +
      'independientes. Lo que se hace en la investigación no experimental es \n' +
      '\n' +
      'observar los fenómenos tal y como se dan en su contexto natural, para \n' +
      '\n' +
      'después analizarlos”.',
    '20 \n' +
      ' \n' +
      '\n' +
      'La investigación no experimental o ex post facto es cualquier investigación en \n' +
      '\n' +
      'la que resulta imposible manipular variables o asignar aleatoriamente a los \n' +
      '\n' +
      'sujetos o las condiciones. De hecho, no hay condiciones o estímulos a los \n' +
      '\n' +
      'cuales se expongan los sujetos del estudio. Los sujetos son observados en su \n' +
      '\n' +
      'ambiente natural, en su realidad.  \n' +
      '\n' +
      'En un estudio no experimental no se construye ninguna situación, sino que se \n' +
      '\n' +
      'observan situaciones ya existentes, no provocadas intencionalmente por el \n' +
      '\n' +
      'investigador. En la investigación no experimental las variables independientes \n' +
      '\n' +
      'ya han ocurrido y no pueden ser manipuladas. \n' +
      '\n' +
      '3.4. Definición conceptual y operacional de las variables  \n' +
      ' \n' +
      '\n' +
      'Las variables a emplearse en la investigación serán las siguientes: \n' +
      '\n' +
      'Cómo con el diseño de indicadores de en el área académica se podrá optimizar \n' +
      '\n' +
      'el proceso educativo de la UNIPOL \n' +
      '\n' +
      '• Variable exploratoria: gestión de calidad educativa en la UNIPOL \n' +
      '\n' +
      '• Variable propositiva: Diseño de indicadores de gestión de calidad en el \n' +
      'área académica \n' +
      '\n' +
      'A continuación, se presenta la operacionalización de las variables del estudio: \n' +
      '\n' +
      'Tabla 1 – Operacionalización de la variable exploratoria. \n' +
      '\n' +
      'Variable \n' +
      'exploratoria Categorías Subcategorías Indicadores Instrumentos \n' +
      '\n' +
      'Gestión de \n' +
      'calidad educativa \n' +
      '\n' +
      'Diagnosticar el \n' +
      'proceso educativo \n' +
      'actual del área \n' +
      'académica en la \n' +
      'UNIPOL. \n' +
      ' \n' +
      'Analizar la \n' +
      'situación actual de \n' +
      'la calidad \n' +
      'educativa en las \n' +
      'instituciones o \n' +
      'universidades \n' +
      '\n' +
      'Administrativa \n' +
      ' \n' +
      'Social \n' +
      '\n' +
      'Calidad \n' +
      '\n' +
      '- Entrevistas \n' +
      'Eficiencia \n' +
      'Eficacia \n' +
      '\n' +
      'Investigar \n' +
      'indicadores \n' +
      'referentes a \n' +
      'gestión de calidad \n' +
      'en el ámbito \n' +
      'educativo. \n' +
      ' \n' +
      'Analizar los \n' +
      'indicadores más \n' +
      'óptimos referentes \n' +
      '\n' +
      'Gestión \n' +
      'Académica \n' +
      '\n' +
      'Efectividad \n' +
      '\n' +
      '- Revisión \n' +
      'Documental Aplicabilidad',
    '21 \n' +
      ' \n' +
      '\n' +
      'a los diferentes \n' +
      'procesos \n' +
      'académicos. \n' +
      '\n' +
      'Nota: Elaboración propia, 2020. \n' +
      ' \n' +
      '\n' +
      'Tabla 2 – Operacionalización de la variable propositiva. \n' +
      '\n' +
      ' \n' +
      '\n' +
      'Variable Propositiva Categorías Actividades o contenidos \n' +
      'Resultados \n' +
      'esperados \n' +
      '\n' +
      'Diseño de indicadores \n' +
      'de gestión de calidad \n' +
      'en el área académica \n' +
      '\n' +
      'Diagnosticar el \n' +
      'proceso educativo \n' +
      'actual del área \n' +
      'académica en la \n' +
      'UNIPOL. \n' +
      ' \n' +
      'Analizar la \n' +
      'situación actual de \n' +
      'la calidad \n' +
      'educativa en las \n' +
      'instituciones o \n' +
      'universidades \n' +
      '\n' +
      'Macro criterios de \n' +
      'evaluación  \n' +
      'Eficiencia  \n' +
      'Pertinencia \n' +
      'Integridad \n' +
      'Sustentable \n' +
      ' \n' +
      ' \n' +
      '\n' +
      'Con el análisis de los \n' +
      'indicadores existentes y \n' +
      'aplicados en diferentes \n' +
      'instituciones educativas, \n' +
      'se determinará el \n' +
      'diseño adecuado para \n' +
      'la aplicación de dichos \n' +
      'indicadores que \n' +
      'permitan mejorar la \n' +
      'gestión educativa en lo \n' +
      'referido a lo académico. \n' +
      '\n' +
      'Investigar \n' +
      'indicadores \n' +
      'referentes a \n' +
      'gestión de calidad \n' +
      'en el ámbito \n' +
      'educativo. \n' +
      ' \n' +
      'Analizar los \n' +
      'indicadores más \n' +
      'óptimos referentes \n' +
      'a los diferentes \n' +
      'procesos \n' +
      'académicos. \n' +
      '\n' +
      ' \n' +
      'Nota: Elaboración propia, 2020. \n' +
      ' \n' +
      '\n' +
      '3.5. Población y Muestra \n' +
      '\n' +
      '3.5.1. Población o universo \n' +
      '\n' +
      'En estadística es el nombre especifico que recibe particularmente la \n' +
      '\n' +
      'investigación social la operación dentro de la delimitación del campo de \n' +
      '\n' +
      'investigación que tienen por objeto la determinación del conjunto de unidades \n' +
      '\n' +
      'de observaciones del conjunto de unidades de observación que van a ser \n' +
      '\n' +
      'investigadas. (GONZALES, 2017). \n' +
      '\n' +
      'Por tanto, el universo del presente estudio son las siguientes instancias:  \n' +
      '\n' +
      '• Universidad Policial. \n' +
      '\n' +
      '• Información relevante de indicadores de gestión académica aplicada en \n' +
      '\n' +
      'instituciones similares a la UNIPOL.',
    '22 \n' +
      ' \n' +
      '\n' +
      ' \n' +
      '\n' +
      '3.5.2. Unidades de observación  \n' +
      'Por tratarse de una investigación con característica en el enfoque cualitativo, se \n' +
      '\n' +
      'trabajara con unidades de observación las mismas que aportaran con su \n' +
      '\n' +
      'experiencia al momento de realizar la entrevista, a expertos en indicadores de \n' +
      '\n' +
      'gestión de calidad educativa, expertos en normativa de Normas ISO y \n' +
      '\n' +
      'autoridades académicas.    \n' +
      '\n' +
      ' \n' +
      '\n' +
      '3.6. Métodos, técnicas e instrumentos \n' +
      '\n' +
      '3.6.1. Métodos \n' +
      ' \n' +
      'Los siguientes métodos prácticos que se utilizarán en el trabajo de \n' +
      'investigación son: \n' +
      ' \n' +
      '\n' +
      '- Análisis- Síntesis \n' +
      ' \n' +
      '“El análisis, es la distinción y separación de las partes de un todo hasta \n' +
      '\n' +
      'llegar a conocer sus principios o elementos”(LOPEZ F. , 2002, pág. \n' +
      '170). \n' +
      '\n' +
      '“El término de Síntesis, hace referencia a la presentación de un todo \n' +
      '\n' +
      'gracias al destaque de sus partes más interesantes o \n' +
      '\n' +
      'sobresalientes”(PEREZ, 2010, pág. 1). \n' +
      '\n' +
      'A través de la teoría, se recolectará información importante y relevante \n' +
      '\n' +
      'de fuentes confiables de los conceptos sobre los elementos de estudio \n' +
      '\n' +
      'en la investigación referidos al diseño y estructura de indicadores de la \n' +
      '\n' +
      'gestión educativa, que permitirá analizar toda la información de manera \n' +
      '\n' +
      'oportuna y sintetizarla para la adecuada toma de decisiones, mismas \n' +
      '\n' +
      'que influirán en el proceso de enseñanza aprendizaje. \n' +
      '\n' +
      ' \n' +
      '- Inductivo-Deductivo \n' +
      '\n' +
      ' \n' +
      'Este método se refiere en la parte inductiva a “… proceso en el que a \n' +
      '\n' +
      'partir de casos particulares de fenómenos aislados se obtienen \n' +
      '\n' +
      'conclusiones generales o leyes universales” y en la parte deductiva se',
    '23 \n' +
      ' \n' +
      '\n' +
      'refiere a “… proceso en el que a partir de una ley universal se obtiene \n' +
      '\n' +
      'conclusiones particulares”. (Céspedes, 2008 p. 6) \n' +
      ' \n' +
      '\n' +
      'Este método brinda información para adquirir un conocimiento primario \n' +
      '\n' +
      'de la situación de la UNIPOL. De igual manera, se plantea premisas \n' +
      '\n' +
      'respecto a la problemática, para determinar en casos particulares la \n' +
      '\n' +
      'importancia del uso de indicadores que permitan evaluar el proceso de \n' +
      '\n' +
      'enseñanza aprendizaje y a partir de ello adquirir el conocimiento general \n' +
      '\n' +
      'del uso de los indicadores, que permitan la utilización de los adecuados \n' +
      '\n' +
      'en la UNIPOL. \n' +
      '\n' +
      ' \n' +
      '- Histórico- Lógico \n' +
      '\n' +
      ' \n' +
      'Está relacionado con el estudio de la trayectoria de ciertos fenómenos, \n' +
      '\n' +
      'así como los acontecimientos de los mismos. \n' +
      '\n' +
      ' \n' +
      '\n' +
      'Es por ello que analizar como el uso de los indicadores de gestión \n' +
      '\n' +
      'educativa, y su implementación han permitido mejoras en la gestión \n' +
      '\n' +
      'educativa de diferentes instituciones que cuentan con una organización \n' +
      '\n' +
      'similar a la de la UNIPOL; adicionalmente se visualizará los tipos de \n' +
      '\n' +
      'indicadores más indicados para su implementación en la UNIPOL, que \n' +
      '\n' +
      'permitan mejorar la calidad educativa, en torno a la obtención de in \n' +
      '\n' +
      ' \n' +
      '\n' +
      '3.6.2. Técnicas e Instrumentos \n' +
      ' \n' +
      '\n' +
      '- Entrevistas \n' +
      'Es un intercambio de ideas, opiniones mediante una conversación que \n' +
      '\n' +
      'se da entre una, dos o más personas donde un entrevistador es el \n' +
      '\n' +
      'designado para preguntar. \n' +
      '\n' +
      ' \n' +
      '\n' +
      'Tal como se muestra el cuadro de operacionalización de variables, la \n' +
      '\n' +
      'utilización de entrevistas permitirá analizar la situación actual de la \n' +
      '\n' +
      'UNIPOL, realizar el diagnóstico adecuado en la utilización de \n' +
      '\n' +
      'indicadores de gestión académica y cómo se podrían utilizar diferentes',
    '24 \n' +
      ' \n' +
      '\n' +
      'indicadores para mejorar el proceso de enseñanza aprendizaje en la \n' +
      '\n' +
      'UNIPOL. \n' +
      '\n' +
      ' \n' +
      '\n' +
      ' \n' +
      '\n' +
      ' \n' +
      '\n' +
      '- Revisión Documental \n' +
      'Se traduce en la revisión de documentos de acceso general, mediante el \n' +
      '\n' +
      'cual se presentan resultados y conclusiones que sirvan de insumo para \n' +
      '\n' +
      'el desarrollo de la investigación. \n' +
      '\n' +
      ' \n' +
      '\n' +
      'Se realizará la adecuada revisión de documentos relacionados al diseño \n' +
      '\n' +
      'e implementación de indicadores de gestión educativa, cómo esto puede \n' +
      '\n' +
      'resultar beneficioso en la implementación de la UNIPOL y su relación \n' +
      '\n' +
      'con mecanismos de indicadores de calidad a nivel internacional. \n' +
      '\n' +
      '3.7. Procedimiento \n' +
      ' \n' +
      '\n' +
      'Tabla 3 – Procedimiento de la investigación \n' +
      '\n' +
      'Fase A Fase B Fase C \n' +
      'Se inició con la identificación \n' +
      'del problema dentro de la \n' +
      'investigación referido al \n' +
      'diseño de indicadores de \n' +
      'gestión educativa para \n' +
      'mejorar el proceso de \n' +
      'enseñanza aprendizaje, cuyo \n' +
      'sustento está mediante las \n' +
      'justificaciones teórica, \n' +
      'práctica, social y \n' +
      'metodológica; para el \n' +
      'respectivo análisis a \n' +
      'investigar, para \n' +
      'posteriormente plantear los \n' +
      'objetivos tanto general como \n' +
      'específicos. \n' +
      ' \n' +
      'Se desarrolló el marco teórico, \n' +
      'mediante el cual se plasma \n' +
      'toda la teoría relacionada al \n' +
      'diseño y aplicación de \n' +
      'indicadores de gestión de \n' +
      'calidad para la gestión \n' +
      'educativa que busca optimizar \n' +
      'el proceso de enseñanza \n' +
      'aprendizaje, todo ello se \n' +
      'encuentra respaldado con la \n' +
      'bibliografía correspondiente. \n' +
      ' \n' +
      ' \n' +
      '\n' +
      'Se realizó el cuadro de \n' +
      'Operacionalización de \n' +
      'objetivos para poder \n' +
      'identificar los correctos \n' +
      'indicadores e instrumentos \n' +
      'para ir culminando el trabajo \n' +
      'de investigación, donde se \n' +
      'lograron determinar las \n' +
      'herramientas fundamentales \n' +
      'para el adecuado \n' +
      'desenvolvimiento del trabajo \n' +
      'de investigación, donde se \n' +
      'analizará y evaluará de \n' +
      'manera integral el diseño y \n' +
      'aplicación de los indicadores \n' +
      'de gestión educativa. \n' +
      ' \n' +
      '\n' +
      'Se realizarán las entrevistas y \n' +
      'la revisión documental, para \n' +
      'realizar su respectivo análisis \n' +
      'obteniendo los indicadores \n' +
      'correspondientes para poder \n' +
      'optimizar el proceso educativo \n' +
      'en la UNIPOL. \n' +
      ' \n' +
      'Redacción de conclusiones y \n' +
      'recomendaciones. \n' +
      '\n' +
      'Nota: Elaboración propia, 2020.',
    '25 \n' +
      ' \n' +
      '\n' +
      ' \n' +
      '\n' +
      ' \n' +
      '\n' +
      ' \n' +
      '\n' +
      '3.8. Cronograma \n' +
      ' \n' +
      '\n' +
      'Tabla 4 – Cronograma. \n' +
      '\n' +
      'Actividad  Marzo  Abril  Mayo  Junio  \n' +
      '\n' +
      '- Identificación del \n' +
      'problema. \n' +
      '- Justificaciones  \n' +
      'Redacción del \n' +
      'marco teórico. \n' +
      '- Redacción del \n' +
      'marco \n' +
      'metodológico - \n' +
      'Defensa  \n' +
      '\n' +
      ' x \n' +
      ' \n' +
      ' \n' +
      'x  \n' +
      '\n' +
      ' \n' +
      ' \n' +
      '\n' +
      ' \n' +
      '\n' +
      '  \n' +
      'x  \n' +
      '\n' +
      ' \n' +
      '           x  \n' +
      '\n' +
      'Nota: Elaboración propia, 2020.',
    '26 \n' +
      ' \n' +
      '\n' +
      ' \n' +
      '\n' +
      ' \n' +
      '\n' +
      ' \n' +
      '\n' +
      'BIBLIOGRAFÍA \n' +
      ' \n' +
      '\n' +
      '• Clarence (1994) Revista Iberoamericana de Educación. \n' +
      '\n' +
      '• CINDA/PROMESUP/OEA. (1994). “Autoevaluación para Instituciones \n' +
      'de Educación Superior”. Documento extraído del libro “Manual de \n' +
      'Autoevaluación para Instituciones de Educación Superior “. Pautas \n' +
      'y Procedimientos. Págs. 35-48. \n' +
      '\n' +
      '• Cortadellas,J. (2005) Proceso de planificación estratégica. \n' +
      '• Day, Ch. (2007) Pasión por enseñar la identidad personal y \n' +
      '\n' +
      'profesional del docente y sus valores. Editorial Nancea. \n' +
      '\n' +
      '• Dane  (2012)  Guía para Diseño, Construcción e Interpretación de \n' +
      'Indicadores. \n' +
      '\n' +
      '• De los Ríos E., Danae (1999). “Indicadores de Calidad y Eficiencia en \n' +
      'la Educación Universitaria: Algunas propuestas para el sistema de \n' +
      'acreditación chileno”. Memoria para optar al grado de magíster en \n' +
      'gestión y políticas públicas. \n' +
      '\n' +
      '• Departamento Nacional de Planeación, (1996). “Indicadores de \n' +
      'Diagnóstico \n' +
      '\n' +
      '• Eggers, k. (2005) Criterios para evaluar la calidad de la Dimensión \n' +
      'pedagógica del sistema de Educación a distancia de la UDLA. \n' +
      '\n' +
      '• Estatuto Orgánico de la Universidad Policial \n' +
      '\n' +
      '• Fullat Octavín (2000) Occidente: hontanares, sentidos y valores.  \n' +
      '\n' +
      '• Garcia Aretio. (2001) Plan para la mejora de la Calidad. \n' +
      '• Gonzales, M. Ledezma, M. (2002) Criterios e indicadores de calidad \n' +
      '\n' +
      'de la educación superior. \n' +
      '\n' +
      '• Heredia Avaro (2001) Sistema de indicadores para la mejora y el \n' +
      'control integrado de la calidad de los procesos. \n' +
      '\n' +
      '• Lazaro, Angel J., (1992). “La Formalización de Indicadores de \n' +
      'Evaluación”. Universidad Complutense de Madrid.',
    '27 \n' +
      ' \n' +
      '\n' +
      '• Ley de Educación "Avelino Siñani – Elizardo Pérez". \n' +
      '\n' +
      '• Ministerio de Hacienda, (2001). “Evaluación de Programas, Notas \n' +
      'Técnicas, División de Control de Gestión”. Dirección de Presupuesto,  \n' +
      '\n' +
      ' \n' +
      '\n' +
      '• Molina Evaristo.  (2001) Construcción de indicadores y parámetros. \n' +
      'Instituto Politécnico Nacional.  \n' +
      '\n' +
      '• Noriega, Juan y Muñoz, Alberto (1994). “Indicadores de Evaluación \n' +
      'del Centro Docente” \n' +
      '\n' +
      '• Pezantes Avilés Fernando (2011) Indicadores de gestión y calidad en \n' +
      'la educación superior. \n' +
      '\n' +
      '• Quintero José. (2011) Plan de gestión de Calidad. \n' +
      '• Red de la Agenda Local para América Latina y el Caribe, \n' +
      '\n' +
      '(2000).“Indicadores para el Desarrollo Sustentable: Posibilidades y \n' +
      'Limitantes”, Serie Documentos, \n' +
      'Chile.www.iclei.org/redal21/capacidad/indicadores.pdf .  \n' +
      '\n' +
      '• Sarramona Jaime. (1999) Fundamentos de la Educación.   \n' +
      '• Universidad Nacional de Medellín, (2000). “Un Sistema de Indicadores \n' +
      '\n' +
      'para la Universidad”, Oficina de Planeación, , \n' +
      '• Van Gich (1998) Introducción a la Administración: paradigmas en \n' +
      '\n' +
      'las organizaciones.  \n' +
      '• Velásquez de Zapata Carmen. Criterios e indicadores para evaluar la \n' +
      '\n' +
      'calidad de la educación en instituciones de educación superior.'
  ]
  };
  res.render('detail', obj);
    
});
router.get("/home", (req, res) => {
  res.render("home", { content: "Testing WORKS" });
});
router.get("/upload", (req, res) => {
  res.render("review", {});
});
router.get("/review", (req, res) => {
  res.render("reviewtesis",{});
});
function search(namefile) {
  return new Promise((resolve, refuse) => {
    var RESULTS = {};
    pdf2html.pages(namefile, options, async (err, htmlPages) => {
      var datasplit = htmlPages;
      RESULTS["numberpages"] = (datasplit.length);
      RESULTS["report"] = {};
      for (var i = 0; i < datasplit.length; i++) {
        var lines = datasplit[i]
          .replace(/\t/g, " ")
          .trim()
          .replace(/\n/g, "")
          .toLowerCase()
          .replace(/[\s]{2,}/g, " ")
          .match(/[\w\s\á\é\í\ó\ú\,\-\ñ\:\;\(\)\_]{60,}(\.|\:)\s*/g);
          console.log("Procesando " + i);
        if (lines != null) {
          for (var j = 0; j < lines.length; j++) {
            if (lines[j] != "") {
              try {
                var linesdata = new RegExp(lines[j]);
                var result = await PAGES.findOne({ content: linesdata });
                if (result != null) {
                  if (RESULTS["report"][result.idTesis] == null) {
                    RESULTS["report"][result.idTesis] = {
                      title: result.title,
                      autor: result.autor,
                    };
                    RESULTS["report"][result.idTesis]["data"] = [];
                  }
                  RESULTS["report"][result.idTesis].data.push({
                    currentdoc: datasplit[i],
                    currentpage: (i + 1),
                    numberpage: result.numberpage,
                    linesmatch: linesdata.toString(),
                    currectdocpage: i,
                  });
                }
              } catch (error) {

              }
            }
          }
          
        }
      }
      resolve(RESULTS);
    });
  });
}
async function indexofData(results) {
  return new Promise(async (resolve, reject) => {
    var finalreport = {};
  finalreport["currentdoc"] = {};
  finalreport["comparativedocs"] = {}
  var keys = Object.keys(results);
  for (var i = 0 ; i < keys.length; i++) {
    var docs = await TESIS.findOne({_id: keys[i]});
    if (docs != null) {
        var dbdata = docs.toJSON();
        for (var j = 0; j < results[keys[i]].data.length; j++) {
            var originalcontent = dbdata.pages[parseInt(results[keys[i]].data[j].numberpage)];
            var formatContent = originalcontent;
            formatContent = formatContent.toLowerCase();
            var cad = results[keys[i]].data[j].linesmatch.replace(/\//g, "").replace(/\s{2,}/g, " ");
            var expresion = cad.replace(/\s/g, `(\\s|\n)+`);
            var regx = new RegExp(expresion, "g");
            var matchdata = formatContent.match(regx);
            if (matchdata != null) {
              var init = regx.exec(formatContent).index;
              var final = matchdata[0].length;
              var formatDocument = formatContent.replace(regx,`<span id="resaltar">` + cad + `</span>`);
              results[keys[i]].data[j]["originaltxt"] = {original: originalcontent, matchtext: formatDocument, page: parseInt(results[keys[i]].data[j].numberpage + 1)};
            } else {
              results[keys[i]].data[j]["originaltxt"] = {original: originalcontent, matchtext: originalcontent, page: parseInt(results[keys[i]].data[j].numberpage + 1)};
            }
        }
    }
  }
  //Revisar trabajo

  resolve(results);
  })
  
}
router.post("/uploadreview", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ msn: "No existen archivos para subir" });
  }
  var data = req.files;
  var rootpath = __dirname.replace(/routes\/server/g, "");
  var begintoken = new Date();
  begintoken = md5(begintoken.toString()).substr(0, 5);

  var name =
    begintoken +
    "_" +
    data.file.name.replace(/\s/g, "_").replace(/\([\w]+\)/g, "");
  var completename = rootpath + "pdfreview/" + name.toUpperCase();
  data.file.mv(completename, async(err) => {
    if (err) {
      res.status(200).json({msn: "ERROR: " + err});
      return;
    }
    var result = await search(completename);
    await indexofData(result.report);
    var keys = Object.keys(result.report);
    if (keys.length == 0) {
      res.status(200).json({msn: "No se han encontrado coincidencias"});
    }
    var renderdata = {numberpages: result.numberpages, filename: data.file.name, copy: []};
    for (var i = 0; i < keys.length; i++) {
      renderdata.copy.push(result.report[keys[i]]);
    }
    //console.log(renderdata.copy[0].data);
  res.render("reviewreport", renderdata);
  });
});
router.get("/listdatabase", (req, res) => {
  var query = req.query;
  var filter = {};
  if (query.searchkey != null) {
    filter["pages"] = new RegExp(query.searchkey, "g");
  }
  var sort = {_id: -1};
  if (query.sort != null) {
    var name = query.sort;
    var key = name.split("_")[0];
    var param = name.split("_")[1];
    sort[key] = parseInt(param); 
  }
  TESIS.find(filter).limit(30).sort(sort).exec((err, docs) => {
    var c = 1;
    var newdocs = docs.map(item => {
      item["number"] = c;
      item["numpage"] = item.pages.length;
      c++;
      return item;
    })
    res.render("listdatabase", {data: newdocs});
  });
  
});
router.post("/upload", (req, res) => {
  //console.log(req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ msn: "No existen archivos para subir" });
  }

  var data = req.files;
  var rootpath = __dirname.replace(/routes\/server/g, "");
  //res.status(200).json({msn: "LOAD!"});
  var begintoken = new Date();
  begintoken = md5(begintoken.toString()).substr(0, 5);

  var name =
    begintoken +
    "_" +
    data.file.name.replace(/\s/g, "_").replace(/\([\w]+\)/g, "");
  var completename = rootpath + "pdffiles/" + name.toUpperCase();
  data.file.mv(completename, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ msn: "ERROR AL ESCRIBIR EL ARCHIVO EN EL SERVIDOR" });
    }
    const dataop = { page: 1, imageType: "png", width: 160, height: 226 };
    pdf2html.thumbnail(completename, (err, thumbnailPath) => {
      if (err) {
        console.error("Conversion error: " + err);
      } else {
        var newpath = rootpath + "thumbail/" + name.replace(/\.pdf/g, ".png");
        fs.createReadStream(thumbnailPath).pipe(fs.createWriteStream(newpath));
        fs.unlinkSync(thumbnailPath);
        //let dataBuffer = fs.readFileSync("/opt/app/pdffiles/vue2.pdf");
        pdf2html.pages(completename, options, (err, htmlPages) => {
          var pagedata = [];
          for (var i = 0; i < htmlPages.length; i++) {
            var pagehtml = htmlPages[i].replace(/\t/g, " ");
            pagedata.push(pagehtml.trim());
          }
          var page0 = htmlPages[0];
          var results = page0.match(/(\"|\“[\w\.'ñ\sí',;áéíóúÑÁÉÍÓÚ]+(\"|\”){1,})/g);
          var autor = page0.match(/(autor|AUTOR)\:[\w\.'ñ\sí',;áéíóúÑÁÉÍÓÚ]+/g);
          var title = "";
          if (results != null && results.length == 2) {
            title = results[1];
          } else if ( results != null && results[0].length > 35) {
            title = results[0];
          }
          var autorname = "";
          if (autor != null) {
            autorname = autor[0].
            replace(/AUTOR\:/g, "").
            replace(/LA PAZ/g, "").
            replace(/POTOSÍ/g, "").
            replace(/COCHABAMBA/g, "").
            replace(/\n/g, "");
          }
          //abstrac
          var abstrac = "";
          for (var i = 0; i < htmlPages.length; i++) {
            if (htmlPages[i].match(/PLANTEAMIENTO DEL PROBLEMA/g) != null) {
              abstrac =  htmlPages[i];
              break;
            }
          }
          md5File(completename).then(async (hash) => {
            var check = await TESIS.find({md5: hash});
            if (check.length > 0) {
              res.json({msn: "La tesis ya existe en la base de datos"});
              return;
            }
            var coverpageurl = "/thumbail/?name=" + name.replace(/\.pdf/g, ".png");
            var tesis = new TESIS({
              title: title,
              autor: autorname,
              coverpage: coverpageurl,
              realpathCover: newpath,
              photo: "",
              abstract: "",
              pages: pagedata,
              filepdf: completename,
              md5: hash,
            });
            tesis.save((err, docs) => {
              console.log("Se guardo");
              var countcheck = 0;
              for (var i = 0; i < pagedata.length; i++) {
                var page = new PAGES({
                  title: title,
                  autor: autorname,
                  idTesis: docs.id,
                  numberpage: i,
                  md5fromcontent: md5(pagedata[i]),
                  content: pagedata[i]
                    .toLowerCase()
                    .replace(/\n/g, " ")
                    .replace(/[\s]{2,}/g, " "),
                });
                page.save(() => {
                  countcheck++;
                  console.log("Paginas " + countcheck + " %");
                  if (countcheck == pagedata.length - 1) {
                    var obj = {
                      portada: coverpageurl,
                      title: title,
                      autor: autor,
                      numberpage: i + 1,
                      abstrac : abstrac,
                      content: pagedata
                    };
                    console.log(obj);
                    res.render("detail", obj);
                  }
                });
              }
            });
          });
          //-------xxxxxxx------//
        });
      }
    });
  });
});
router.get("/thumbail", (req, res) => {
  var params = req.query;
  if (params.name == null) {
    res.status(200).json({
      msn: "Parametro necesario",
    });
    return;
  }
  var path = __dirname.replace(/routes\/server/g, "thumbail/");

  console.log(__dirname);
  if (!fs.existsSync(path + params.name)) {
    res.status(404).json({ msn: "No existe ese archivo" });
  }
  res.sendFile(path + params.name);
});
router.get("/insert", (req, res, next) => {
  //let dataBuffer = fs.readFileSync("/opt/app/pdffiles/vue2.pdf");
  pdf2html.pages(path, options, (err, htmlPages) => {
    var pagedata = [];
    for (var i = 0; i < htmlPages.length; i++) {
      var pagehtml = htmlPages[i].replace(/\t/g, " ");
      pagedata.push(pagehtml.trim());
    }
    //console.log("--> " + pagedata[100]);
    md5File(path).then((hash) => {
      //console.log(`The MD5 sum of LICENSE.md is: ${hash}`)
      var tesis = new TESIS({
        title: "Tesis 1",
        autor: "Test 1",
        coverpage: "",
        photo: "",
        abstract: "",
        pages: pagedata,
        filepdf: path,
        md5: hash,
      });
      tesis.save((err, docs) => {
        console.log("Se guardo");
        //guardamos las paginas por separado
        //Tesis guardada.
        var countcheck = 0;
        for (var i = 0; i < pagedata.length; i++) {
          var page = new PAGES({
            title: "Tesis 1",
            autor: "Test 1",
            idTesis: docs.id,
            numberpage: i,
            md5fromcontent: md5(pagedata[i]),
            content: pagedata[i]
              .toLowerCase()
              .replace(/\n/g, " ")
              .replace(/[\s]{2,}/g, " "),
          });
          page.save(() => {
            countcheck++;
            console.log("Paginas " + countcheck + " %");
            if (countcheck == pagedata.length - 1) {
              res.render("index", { title: "Parseo de la tesis completo" });
            }
          });
        }
      });
    });
  });
});

module.exports = router;
