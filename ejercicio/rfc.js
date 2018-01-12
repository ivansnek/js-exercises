const PERSONS = require('./data');

let eliminaArticulos = (elemento) => {
  let temp = elemento.toLowerCase();
  return temp != "el" && temp != "la" && temp != "los" && temp != "las" && temp != "un" && temp != "una" && temp != "unos" && temp != "unas";
}

let eliminaMalasPalabras = (elemento) => {
  let temp = elemento.toUpperCase();
  return (temp.substring(0, 4) == "CACA" || temp.substring(0, 4) == "PEDO") ? temp.substring(0, 3) + 'X' + temp.substring(4, 10) : temp;
}

let procesa = (persona) => {
  let tempNombres = persona.names.split(" ");
  let tempApell = persona.lastnames.split(" ");
  // persona.names = persona.names.replace("/\¿+|\?+|\°+|\¬+|\|+|\!+|\#+|\$+|\%+|\&+|\\+|\=+|\’+|\¡+|\++|\*+|\~+|\[+|\]+|\{+|\}+|\^+|\<+|\>+|\”+/","");
  // persona.lastnames = persona.lastnames.replace("/\¿+|\?+|\°+|\¬+|\|+|\!+|\#+|\$+|\%+|\&+|\\+|\=+|\’+|\¡+|\++|\*+|\~+|\[+|\]+|\{+|\}+|\^+|\<+|\>+|\”+/","");
  persona.names = tempNombres.filter(eliminaArticulos);
  persona.lastnames = tempApell.filter(eliminaArticulos);
  return persona;
}

let primeraVocal = (cadena) => {
  let i = 0;
  let vocal = false;
  while (i < cadena.length) {
    if (cadena.charAt(i) == 'a' || cadena.charAt(i) == 'e' || cadena.charAt(i) == 'i' || cadena.charAt(i) == 'o' || cadena.charAt(i) == 'u') {
      return i;
    }
    i++;
  }
}

let getMes = (persona) => {
  let mes = persona.birthdate.getMonth();
  return mes < 10 ? '0' + mes : mes + '';
}

let getDia = (persona) => {
  let dia = persona.birthdate.getDay();
  return dia < 10 ? '0' + dia : dia + '';
}

let getRFC_fisicas = (opcion, persona) => {
  let rfc = "";
  switch (opcion) {
    case 1:
      let nombre = (persona.names[0] != "JOSE" && persona.names[0] != "MARIA") ? persona.names[0].substring(0, 2) : persona.names[1].substring(0, 2);
      rfc = (persona.lastnames.length === 1) ? persona.lastnames[0].substring(0, 2) + nombre : persona.lastnames[0].substring(0, 1) + persona.lastnames[1].substring(0, 1) + persona.names[0].substring(0, 2);
      break;
    case 2:
      console.log("Caso 2");
      break;
    default:
      break;
  }
  return rfc + persona.birthdate.getYear() + getMes(persona) + getDia(persona);
}

let i = 0;
while (i < PERSONS.length) {
  if (PERSONS[i].type === "fisica") {
    let persona = procesa(PERSONS[i]);
    let rfc = "";
    if (persona.lastnames[0].length < 3 && persona.names.length === 2 && persona.lastnames.length === 1) {
      rfc = getRFC_fisicas(1, persona);
    } else if (persona.lastnames[0].length > 3 && persona.names.length === 2 && persona.lastnames.length === 1) {
      rfc = getRFC_fisicas(2, persona);
    }
    if (rfc != "") console.log(rfc.toUpperCase());
  } else if (PERSONS[i].type === "moral") { console.log("persona moral"); }
  i++;
}
