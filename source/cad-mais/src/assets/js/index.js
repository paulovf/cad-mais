function pesquisaTabela() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("campo-pesquisa");
  filter = input.value.toUpperCase();
  table = document.getElementById("tabela-dados");
  tr = table.getElementsByClassName("corpo-tabela");
  for (i = 0; i < tr.length; i++) {
    achou = false;
    for (s = 0; s < tr[i].getElementsByTagName("td").length; s++) {
      td = tr[i].getElementsByTagName("td")[s];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          /*tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";*/
          achou = true;
        }
      }else{
        achou = true;
      }
    }
    if(achou){
      tr[i].style.display = "";
    }else{
      tr[i].style.display = "none";
    }
  }
}

function fMasc(objeto,mascara) {
  obj=objeto
  masc=mascara
  setTimeout("fMascEx()",1)
}
function fMascEx() {
  obj.value=masc(obj.value)
}
function mCPF(cpf){
  cpf=cpf.replace(/\D/g,"")
  cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
  cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
  cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
  return cpf
}
function mData(data){
  data=data.replace(/\D/g,"")
  data=data.replace(/(\d{2})(\d)/,"$1/$2")
  data=data.replace(/(\d{2})(\d)/,"$1/$2")
  return data
}
