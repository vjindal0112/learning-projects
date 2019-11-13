console.log("Ready to go? Yessiree");

let paras = document.getElementsByTagName('p');
console.log(paras);

// for(ele in paras) {
//   console.log(paras[ele]);
//   paras[ele].style["backgroundColor"] = '#FF00FF';
// }

for(let i = 0; i < paras.length; i++) {
  paras[i].style["backgroundColor"] = '#FF00FF';
}
