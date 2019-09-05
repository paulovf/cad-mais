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

$("#cpf").blur(function (event) {
  event.preventDefault();
  if(!validarCpf($("#cpf").val())){
    $("#cpf").val("");
  }
});

function validarCpf(strCPF) {
  var Soma;
  var Resto;
  Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
  return true;
}

$("#data_nascimento").blur(function (event) {
  event.preventDefault();
  if(!validaDataNascimento($("#data_nascimento").val())){
    $("#data_nascimento").val("");
  }
});

function validaDataNascimento(data){
  dataAtual= new Date();
  data=new Date(data);
  if (data<dataAtual)
    return true;
   else
    return false;
}

function editarFuncionario(idFuncionario){
  console.log("1111");
  location.href = "/novo_funcionario?id_funcionario=" + idFuncionario;
}
