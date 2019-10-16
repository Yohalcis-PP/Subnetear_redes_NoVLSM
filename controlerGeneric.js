var ipe = new Array();
var ips = new Array();
var subnetear = document.querySelector(".ip");
var contSubnet=0;

var limpiar = document.querySelector(".clear");
limpiar.addEventListener("click", function(){
  location.href="index.html";

});


subnetear.addEventListener("click", function() {
  var ip1 = document.getElementById("octetoUno").value;
  var ip2 = document.getElementById("octetoDos").value;
  var ip3 = document.getElementById("octetoTres").value;
  var ip4 = document.getElementById("octetoCuatro").value;
  var cantSubNet = document.getElementById("amountNetwork").value;
  var sele = document.getElementById("criterio");
  var selectedOption = sele.options[sele.selectedIndex].text;
  
  
  gestionarSubnt(cantSubNet, ip1 + "." + ip2 + "." + ip3 + ".", ip4);
});

function gestionarSubnt(cantNet, ip, ip4) {
  let N = Number(getN(cantNet));
  let saltos = Number(getSaltos(N));
  let mascara = getMascara(N);
  let prefijo = 24 + N;
  let i = 0;

  while (i <= Number((cantNet - 1) * saltos)) {
    
    u = i+1;
    primeraIpUtil = ip + u; 
    ipb = ip + i;
    ultimaIpUtil = ip + (i + saltos - 2); 
    broadcast = ip + (i + saltos - 1);
    ipe = [ipb + "/" + prefijo , primeraIpUtil , ultimaIpUtil , mascara, broadcast];
    ips.push(ipe);
    i += saltos;
  }

  paintTable(ips);

}

function getN(cantNet) {
  let n;
  for (i = 2; ; i++) {
    if (Math.pow(2, i) >= cantNet) {
      n = i;
      break;
    }
  }
  return n;
}

function getSaltos(n) {
  let exp = Number(8 - n);
  let saltos = Math.pow(2, exp);
  return saltos;
}

function getMasc(n) {
  let masca;
  if (n == 2) {masca = 192;  }
  if (n == 3) {masca = 224;  }
  if (n == 4) {masca = 240;  }
  if (n == 5) {masca = 248;  }
  if (n == 6) {masca = 252;  }

  return masca;
}

function getMascara(n) {
  let mascara = "255.255.255." + getMasc(n);

  return mascara;
}

function paintTable(ips){

  contSubnet+=1;
  document.getElementById("body").insertRow(-1).innerHTML = ` <th scope="row"></th> <td></td> <td>Sunetting #${contSubnet}</td> <td></td> <td></td>`;

  for (let a in ips) {
    document.getElementById("body").insertRow(-1).innerHTML = ` <th scope="row"> ${ips[a][0]}</th> <td>${ips[a][1]}</td> <td>${ips[a][2]}</td> <td>${ips[a][3]}</td> <td>${ips[a][4]}</td>`;
    
  }

  while(ips.length > 0){
  ips.pop(); 
  }
}