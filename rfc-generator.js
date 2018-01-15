/**
 * Feel free to edit this file with your code or use any number of methods or classes.
*/
const PERSONS = [ // date (año, mes, dia)
  { names: 'Juan Antonio', lastnames: 'Fernandez Muñoz', birthdate: new Date(1979, 12, 1), type: 'fisica' },
  { names: 'Jose Carlos', lastnames: 'Hernandez Perez', birthdate: new Date(1979, 12, 1), type: 'fisica' },
  { names: 'Brenda Liliana', lastnames: 'Gutierrez Velasco', birthdate: new Date(1979, 12, 1), type: 'fisica' },
  { names: 'Maria Teresa', lastnames: 'Herrera Torres', birthdate: new Date(1979, 12, 1), type: 'fisica' },
  { names: 'Fernando', lastnames: 'Perez Dieguez', birthdate: new Date(1979, 12, 1), type: 'fisica' },
  { names: 'Luis Alberto', lastnames: 'Elizondo Obrador', birthdate: new Date(1979, 12, 1), type: 'fisica' },
  { names: 'Elvia', lastnames: 'Jimenez Sanchez', birthdate: new Date(1979, 12, 1), type: 'fisica' },
  { names: 'Pedro Joaquin', lastnames: 'Alvarado Obregon', birthdate: new Date(1979, 12, 1), type: 'fisica' },

  { name: 'Sonora Industrial Azucarera, S. de. R.L.	', foundation: new Date(2012, 9, 13), type: 'moral' }, //9
  { name: 'Internacional Turística Flacón, S.A.', foundation: new Date(1979, 2, 12), type: 'moral' },
  { name: 'Candados, Llaves y Cerraduras, S.A.', foundation: new Date(1999, 1, 11), type: 'moral' },
  { name: 'H. Prieto y Martínez, S. de R.L.', foundation: new Date(2017, 3, 5), type: 'moral' },
  { name: 'Fonograbaciones Cinelandia, S. de R.L.', foundation: new Date(2013, 8, 13), type: 'moral' },
  { name: 'Arsuyama, S.A.', foundation: new Date(2014, 7, 2), type: 'moral' },
  { name: 'Al, S.A.', foundation: new Date(1989, 7, 4), type: 'moral' },
  { name: 'Los Viajes Internacionales de Marco Polo, S.A.', foundation: new Date(1989, 7, 4), type: 'moral' }
];
// YOUR CODE
const BadWords = [
  'BUEI', 'BUEY', 'CACA', 'CACO', 'CAGA', 'CAGO', 'CAKA', 'CAKO', 'COGE', 'COJA', 'COJE', 'COJI', 'COJO', 'CULO', 'FETO', 'GUEY', 'JOTO', 'KACA', 'KACO',
  'KAGA', 'KAGO', 'KOGE', 'KOJO', 'KAKA', 'KULO', 'MAME', 'MAMO', 'MEAR', 'MEAS', 'MEON', 'MION', 'MOCO', 'MULA', 'PEDA', 'PEDO', 'PENE', 'PUTA', 'PUTO',
  'QULO', 'RATA', 'RUIN', 'GUMA'
];

let generar = function (persona) {
  if (persona.type === 'moral') { console.log("PErsona moral")
    pMoral(persona);
    anioMoral(persona);

  } else if (persona.type === 'fisica') { console.log("Persona fisica")
    pFisica(persona);
  }
}

//PERSONAS FISICAS
function pFisica(personas) {
  homoclave();
  //ver si el appellido paterno es mas grande que de dos letras
  let tamanoPaterno = personas.lastnames.split(" ");
  console.log(tamanoPaterno);
  console.log(tamanoPaterno[0].length);

  if (tamanoPaterno.length == 1) { //REGLA 7: un solo apellido 
    anioFisico(personas);
    unApellidoF(personas);
    nombresPermitidosF();
  } else if (tamanoPaterno[0].length <= 2) { //apellido paterno de dos o menos letras
    anioFisico(personas);
    paternoMenosDosF(personas);
    nombresPermitidosF();
  } else {                            //apellido paterno normal
    anioFisico(personas);
    calculoNormalF(personas);
    nombresPermitidosF();
  }
}

let homoclave = function () {//clave random
  chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  hClave = '';
  for (var i = 3; i > 0; --i) hClave += chars[Math.floor(Math.random() * chars.length)];
  console.log(hClave);
}

let anioFisico = function (personas) {
  let aa = personas.birthdate.getFullYear();
  aa = aa.toString().substring(2, 4);

  let mm = personas.birthdate.getMonth();
  let mes = mm.toString();
  if (mes.length == 1) {
    mmC = '0' + mm;
  }

  let dd = personas.birthdate.getDate();
  let dia = dd.toString();
  if (dia.length == 1) {
    ddC = '0' + dd;
  }

  cFecha = `${aa}${mmC}${ddC}`;
  console.log(cFecha);
  return cFecha;
}

let calculoNormalF = function (personas) {
  banderaNormal = true;
  banderaR4 = false;
  banderaR7 = false;
  //FORMA NORMAL
  console.log("Apellido Mayor a dos.. Proceso normal");

  artPat = personas.lastnames.toUpperCase().split(" ");
  arrPat = [];
  console.log(artPat);
  for (let a = 0; a < artPat.length; a++) {
    console.log(artPat[a]);
    if (artPat[a] !== 'DE' && artPat[a] !== 'DEL' && artPat[a] !== 'LA' && artPat[a] !== 'LAS' && artPat[a] !== 'LOS') {
      arrPat.push(artPat[a]);
    }
  }
  console.log(artPat); //original
  console.log(arrPat); //limpio 

  //paterno - primera letra y primera vocal
  paterno = personas.lastnames.toUpperCase().charAt(0);
  console.log(paterno);

  //primera vocal de paterno
  let nomtem = `${arrPat[0]} ${arrPat[1]}`
  nomtem = nomtem.split("");
  console.log(nomtem)
  for (var i = 1; i <= nomtem.length; i++) {
    if (nomtem[i] == 'A' || nomtem[i] == 'E' || nomtem[i] == 'I' || nomtem[i] == 'O' || nomtem[i] == 'U') {
      vocal = nomtem[i].toUpperCase();
      console.log(vocal);
      break;
    }
  }

  //materno - primera letra
  let materno = `${arrPat[0]} ${arrPat[1]}`;
  materno = materno.split("")
  console.log(materno);
  for (let j = 0; j <= materno.length; j++) {
    if (materno[j] == ' ') {
      console.log(materno[j + 1]);
      mater = materno[j + 1];
    }
  }

  //nombre - primera letra
  //nobre comuesto 
  let nomCom = personas.names.split(" ");
  console.log(nomCom);
  if (nomCom.length >= 2) {
    console.log("nombre compuessto");
    if (nomCom[0] == 'Maria' || nomCom[0] == 'Jose') {
      nom = nomCom[1].toUpperCase().charAt(0);
      console.log(nom);
    } else {
      nom = personas.names.toUpperCase().charAt(0);
      console.log(nom);
    }
  } else {
    console.log("Nombre no compuesto");
    nom = personas.names.toUpperCase().charAt(0);
    console.log(nom);
  }
}

let paternoMenosDosF = function (personas) {
  banderaNormal = false;
  banderaR4 = true;
  banderaR7 = false;
  //REGLA 4: APELLIDO PATERNO DE DOS O MENOS 
  console.log("Menor de dos ");

  //paterno - primera letra
  paterno = personas.lastnames.toUpperCase().charAt(0);

  //materno - primera letra
  materno = personas.lastnames.split("");
  console.log(materno);
  for (let j = 0; j <= materno.length; j++) {
    if (materno[j] == ' ') {
      console.log(materno[j + 1]);
      mater = materno[j + 1];
    }
  }

  //nombre - dos primeras letras
  upper = personas.names.toUpperCase();
  nom1 = upper.charAt(0);
  console.log(nom1);
  nom2 = upper.charAt(1);
  console.log(nom2);
}

let unApellidoF = function (personas) {//REGLA 7
  banderaNormal = false;
  banderaR4 = false;
  banderaR7 = true;
  console.log("un solo apellido");
  apellido = personas.lastnames.toUpperCase().substring(0, 2);
  console.log(apellido);

  nomb = personas.names.toUpperCase().substring(0, 2);
  console.log(nomb);
}

let nombresPermitidosF = function () { //nombres permitidos personas fisicas normal
  word = '';
  if (banderaR4 == true) { word = `${paterno}${mater}${nom1}${nom2}`; }
  if (banderaNormal == true) { word = `${paterno}${vocal}${mater}${nom}`; }
  if (banderaR7 == true) { word = `${apellido}${nomb}`; }
  console.log(word);
  for (let w = 0; w <= BadWords.length; w++) {
    bw = BadWords[w];
    if (word == bw) {
      nw = BadWords[w];
      nw = nw.split("");
      nw[3] = 'X';
      console.log(nw);

      word = `${nw[0]}${nw[1]}${nw[2]}${nw[3]}`;
      console.log(word);
      return word;
      break;
    }
  }
}

//PERSONAS MORALES
let pMoral = function (morales) {

  clave = morales.name.toUpperCase();
  console.log(clave);
  claveTempo = morales.name.toUpperCase().split("");
  console.log(claveTempo);

  arryTemp = [];
  for (let x = 0; x < claveTempo.length; x++) {
    if (claveTempo[x] !== '.' && claveTempo[x] !== ',') {
      arryTemp.push(claveTempo[x]);
    }
  }
  console.log(arryTemp);
  let claveTempo2 = arryTemp.join("");
  console.log(claveTempo2)
  claveTempo2 = claveTempo2.split(" ");
  console.log(claveTempo2);

  arryTemp2 = [];
  for (let x = 0; x < claveTempo2.length; x++) {
    if (claveTempo2[x] !== 'Y' && claveTempo2[x] !== 'DE' && claveTempo2[x] !== 'S' && claveTempo2[x] !== 'RL'
      && claveTempo2[x] !== 'SA' && claveTempo2[x] !== 'LOS' && claveTempo2[x] !== 'EL' && claveTempo2[x] !== 'LA'
      && claveTempo2[x] !== 'Compañía' && claveTempo2[x] !== 'Cía' && claveTempo2[x] !== 'Sociedad' && claveTempo2[x] !== 'Soc') {
      arryTemp2.push(claveTempo2[x]);
    }
  }
  console.log(arryTemp2);
  console.log(claveLimpia = arryTemp2.join(" "));
  console.log(claveLimpia.length);

  if (arryTemp2.length == 1) {
    unaPalabraM();
  } else if (arryTemp2.length == 2) {
    dosPalabrasM();
  } else {
    masDosPalabrasM();
  }
}

let anioMoral = function (fecha) {

  let aa = fecha.foundation.getFullYear();
  aa = aa.toString().substring(2, 4);
  console.log(aa);
  let mm = fecha.foundation.getMonth();
  let mmLength = mm.toString();
  if (mmLength.length == 1) {
    mm = "0" + mmLength;
    console.log(mm);
  } else {
    mm = mmLength;
    console.log(mm);
  }
  let dd = fecha.foundation.getDate();
  console.log(dd);

  cFecha = `${aa}${mm}${aa}`;
  cFecha = cFecha.toString();
  console.log(cFecha);
  return cFecha;
}

let unaPalabraM = function () {
  console.log("una palabara");
  clave1 = claveLimpia.charAt(0);
  clave2 = claveLimpia.charAt(1);
  clave3 = claveLimpia.charAt(2);

  if (claveLimpia.length < 3) {
    dosLetrasM();
  } else {
    claveF = `${clave1}${clave2}${clave3}`;
    console.log(claveF);
    return claveF;
  }
}

let dosLetrasM = function () {
  clave1 = claveLimpia.charAt(0);
  clave2 = claveLimpia.charAt(1);
  clave3 = "X";

  claveF = `${clave1}${clave2}${clave3}`;
  console.log(claveF);
  return claveF;
}

let dosPalabrasM = function () {
  console.log("Dos palabras")
  clave1 = claveLimpia.charAt(0);

  separa = claveLimpia.split("");
  console.log(separa);

  for (let i = 0; i <= separa.length; i++) {
    if (separa[i] == ' ') {
      clave2 = separa[i + 1];
      clave3 = separa[i + 2];
      break;
    }
  }
  claveF = `${clave1}${clave2}${clave3}`;
  console.log(claveF);
  return claveF;
}

let masDosPalabrasM = function () {
  clave1 = claveLimpia.charAt(0);

  separa = claveLimpia.split("");
  console.log(separa);

  for (let i = 0; i <= separa.length; i++) {
    if (separa[i] == ' ') {
      clave2 = separa[i + 1];
      break;
    }
  }

  out = 0;
  for (let i = 0; i <= separa.length; i++) {
    if (separa[i] == ' ') {
      out++;
      if (separa[i] == ' ' && out > 1) {
        clave3 = separa[i + 1];
        break;
      }
    }
  }
  claveF = `${clave1}${clave2}${clave3}`;
  console.log(claveF);
  return claveF;
}


var id = 5;
generar(PERSONS[id]);
//RFC PERSONA MORAL
var rfcM = `${claveF}-${cFecha}`;
console.log(rfcM)
console.log(PERSONS[id].name, PERSONS[id].foundation);
//RFC PERSONA FISICA
var rfcF = `${word}${cFecha}${hClave}`;
console.log(rfcF);
console.log(PERSONS[id].names, PERSONS[id].lastnames);
console.log(PERSONS[id].birthdate);