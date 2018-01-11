/**
 * Feel free to edit this file with your code or use any number of methods or classes.
*/

const PERSONS = [
  { names: 'Juan Antonio' , lastnames: 'Fernandez Muñoz', birthdate: new Date(1979,12,1), type: 'fisica' },
  { names: 'Jose Carlos' , lastnames: 'Hernandez Perez', birthdate: new Date(1979,12,1), type: 'fisica' },
  { names: 'Brenda Liliana' , lastnames: 'Gutierrez Velasco', birthdate: new Date(1979,12,1), type: 'fisica' },
  { names: 'Maria Teresa' , lastnames: 'Herrera Torres', birthdate: new Date(1979,12,1), type: 'fisica' },
  { names: 'Fernando' , lastnames: 'Perez Dieguez', birthdate: new Date(1979,12,1), type: 'fisica' },
  { names: 'Luis Alberto' , lastnames: 'Elizondo Obrador', birthdate: new Date(1979,12,1), type: 'fisica' },
  { names: 'Elvia' , lastnames: 'Jimenez Sanchez', birthdate: new Date(1979,12,1), type: 'fisica' },
  { names: 'Pedro Joaquin' , lastnames: 'Alvarado Obregon', birthdate: new Date(1979,12,1), type: 'fisica' },

  { name: 'Sonora Industrial Azucarera, S. de. R.L.	' , foundation: new Date(2012,9,13), type: 'moral' },
  { name: 'Internacional Turística Flacón, S.A.' , foundation: new Date(1979,2,12), type: 'moral' },
  { name: 'Candados, Llaves y Cerraduras, S.A.' , foundation: new Date(1999,1,11), type: 'moral' },
  { name: 'H. Prieto y Martínez, S. de R.L.' , foundation: new Date(2017,3,5), type: 'moral' },
  { name: 'Fonograbaciones Cinelandia, S. de R.L.' , foundation: new Date(2013,8,13), type: 'moral' },
  { name: 'Arsuyama, S.A.' , foundation: new Date(2014,7,2), type: 'moral' },
  { name: 'Al, S.A.' , foundation: new Date(1989,7,4), type: 'moral' },
  { name: 'Los Viajes Internacionales de Marco Polo, S.A.' , foundation: new Date(1989,7,4), type: 'moral' },
  { name: 'H. Prieto y Martínez, S. de R.L.	' , foundation: new Date(1989,7,4), type: 'moral' },
];

let BADWORDS = [
  'BUEI', 'BUEY', 'CACA', 'CACO', 'CAGA', 'CAGO', 'CAKA', 'CAKO', 'COGE', 'COJA', 'COJE', 'COJI',
  'COJO', 'CULO', 'FETO', 'GUEY', 'JOTO', 'KACA', 'KACO', 'KAGA', 'KAGO', 'KOGE', 'KOJO', 'KAKA',
  'KULO', 'MAME', 'MAMO', 'MEAR', 'MEAS', 'MEON', 'MION', 'MOCO', 'MULA', 'PEDA', 'PEDO', 'PENE',
  'PUTA', 'PUTO', 'QULO', 'RATA', 'RUIN'
];

// YOUR CODE
// Frank's
for(let person of PERSONS) {
  switch (person.type) {
    case 'fisica':
      console.log(personaFisica(person));
      break;
    default:
      console.log(personaMoral(person));
      break;
  }
}

// TYPES ------------------------------------------------------------------------------------------
function personaFisica(person) {
  let r1 = rule_1(getFullNameObject(person));
  r1 = rule_9(r1);// Badwords
  let r2 = rule_2(person.birthdate);
  return `${r1}${r2}${getHomoclave()}`;
}

function personaMoral(person) {
  let abbreviations = ['S. en N.C.','S. en C.', 'S. de R.L.', 'S. en C. por A.', 'S.A.', 'S.A. de C.V.', 'S.N.C.', 'S.C.', 'A.C.', 'A. en P.', 'S.C.L.', 'S.C.S.', 'S.', 'R.L.'];
  let abbreviationsFilter = word => abbreviations.every(elt => elt.toLowerCase() != word.toLowerCase());

  let prepositions = ['de', 'de.', 'y', 'los', 'las', 'del', 'el', 'la', 'para'];
  let prepositionsFilter = word => prepositions.every(elt => elt.toLowerCase() != word.toLowerCase());

  let cleanNamesArr = person.name.trim().replace(',', '').split(' ').filter(abbreviationsFilter)
    .filter(prepositionsFilter).join(' ').split(' ');

  let val = '';

  if(cleanNamesArr.length > 2) {
    let part_a = cleanNamesArr[0].slice(0, 1);
    let part_b = cleanNamesArr[1].slice(0, 1);
    let part_c = cleanNamesArr[2].slice(0, 1);
    val = `${part_a}${part_b}${part_c}`;
  } else if (cleanNamesArr.length > 1) {
    let part_a = cleanNamesArr[0].slice(0, 1);
    let part_b = cleanNamesArr[1].slice(0, 2);
    val = `${part_a}${part_b}`;
  } else {
    let part_a = cleanNamesArr[0].slice(0, 3);
    let i = part_a.length;
    while(i++ < 3)
      part_a += 'x';
    val = `${part_a}`;
  }

  let date = rule_2(person.foundation);

  return `${val.toUpperCase()}${date}${getHomoclave()}`;
}
// Extra ------------------------------------------------------------------------------------------
function getFullNameObject(person) {
  let lastnameFilter = word => ['de', 'de.', 'y', 'los', 'las', 'del', 'el', 'la', 'para'].every(elt => elt.toLowerCase() != word.toLowerCase());
  let nameFilter = word => ['maria', 'jose'].every(elt => elt.toLowerCase() != word.toLowerCase());

  let filteredLastnames = person.lastnames.split(' ').filter(lastnameFilter);
  let filteredNames = person.names.split(' ').filter(nameFilter).join(' ');

  return person.type != 'fisica' ? undefined : {
    father_lastname: filteredLastnames[0],
    mother_lastname: filteredLastnames[1],
    name: filteredNames
  };
}
// RULES FISICA -----------------------------------------------------------------------------------
function rule_1(fullname) {
  if(!fullname) return '';

  if(fullname.father_lastname.length <= 2) return rule_4();
  else return rule_1_();

  // Rule #1
  function rule_1_() {
    let letter_a = fullname.father_lastname.slice(0, 1);
    let vowel = fullname.father_lastname.toLowerCase().slice(1).split('').filter(vowel => {
      switch (vowel) {
        case 'a': case 'e': case 'i': case 'o': case 'u':
          return true;
        default: return false;
      }
    }).slice(0, 1);
    let letter_b = fullname.mother_lastname.slice(0, 1);
    let letter_c = fullname.name.slice(0, 1);
    let val = `${letter_a}${vowel}${letter_b}${letter_c}`;
    return val.toUpperCase();
  }

  // Rule #4 - Short lastname
  function rule_4() {
    let part_a = fullname.father_lastname.slice(0, 1);
    let part_b = fullname.mother_lastname.slice(0, 1);
    let part_c = fullname.name.slice(0, 2);
    let val = `${part_a}${part_b}${part_c}`;
    return val.toUpperCase();
  }
}
function rule_2(birthdate) {
  let day   = birthdate.getDate().toString();
  let month = (birthdate.getMonth()+1).toString();
  let year  = birthdate.getFullYear().toString().slice(2);
  return `${year}${month.length > 1 ? month : `0${month}`}${day.length > 1 ? day : `0${day}`}`;
}
function rule_9(word) {
  return BADWORDS.some(elt => elt == word.toUpperCase()) ? `${word.slice(0, word.length-1)}X` : word;
}
function getHomoclave() {
  return Math.random().toString(36).slice(2, 5).toUpperCase();
}
