/*
 *
 * date_time_plugin.js
 * 
 * Arquivo que define as funções do plugin de criação de seletor de data e hora nos inputs do formulário.
 * 
 * Exemplo de chamada de função: createDateTimePlugin({id: "data", acceptsAtCurrentDate: false});
 *
 * IMPORTANTE:
 * - Caso for utilizar data default na utilização do plugin, utilize o formato "AAAA/MM/DD HH:MM:SS", mesmo que
 *  o plugin utilizado seja apenas o de hora (TimePlugin).
 * 
 */

// lista de meses
var months = [
    [0,  "Janeiro",   31], 
    [1,  "Fevereiro", 28], 
    [2,  "Março",     31], 
    [3,  "Abril",     30], 
    [4,  "Maio",      31], 
    [5,  "Junho",     30], 
    [6,  "Julho",     30], 
    [7,  "Agosto",    31], 
    [8,  "Setembro",  30], 
    [9,  "Outubro",   31], 
    [10, "Novembro",  30], 
    [11, "Dezembro",  31]
];
/* 
 * Variável que define a data atual. Caso queira preencher com uma determinada data altere esta variável, criando
 * o objeto da classe Date() com a data desejada.
 */
var listParameters = [];            // Lista de parâmetros do DateTime Plugin
var actualObject = null;            // Objeto datetime atual que está sendo manipulado
var startYearDefault = 1900;        // Ano de início do seletor de anos
var endYearDefault = 2100;          // Ano final do seletor de anos
var dateNow = new Date();           // Data default (data atual)
var erPontLetras = /[\Wa-z]/igm;    // Somente Pontuações/Simbolos e Letras.
var erBissexto   = /(^(((0[1-9]|[12][0-9]|3[01])([-.\/])(0[13578]|10|12)([-.\/])(\d{4}))|(([0][1-9]|[12][0-9]|30)([-.\/])(0[469]|11)([-.\/])(\d{4}))|((0[1-9]|1[0-9]|2[0-8])([-.\/])(02)([-.\/])(\d{4}))|((29)(\.|-|\/)(02)([-.\/])([02468][048]00))|((29)([-.\/])(02)([-.\/])([13579][26]00))|((29)([-.\/])(02)([-.\/])([0-9][0-9][0][48]))|((29)([-.\/])(02)([-.\/])([0-9][0-9][2468][048]))|((29)([-.\/])(02)([-.\/])([0-9][0-9][13579][26])))( ([0-1]{1}[0-9]{1}|[2]{1}[0-3]{1})[\\/:.-]([0-5]{1}[0-9]{1}|[1]{1}[0-9]{1})([\\/:.-]([0-5]{1}[0-9]{1}|[1]{1}[0-9]{1}))?)?$)/;
var erHora       = /(^([0-1]{1}[0-9]{1}|[2]{1}[0-3]{1})[\\/:.-]([0-5]{1}[0-9]{1}|[1]{1}[0-9]{1})([\\/:.-]([0-5]{1}[0-9]{1}|[1]{1}[0-9]{1}))?$)/;
var campoPreenchidoManual = false;  // Verifica se o valor do campo de data foi preenchido manualmente

/**
 * Função que inicializa o DateTimePlugin
 */
function createDateTimePlugin(parameters){
    if(listParameters.length == 0){
        getDataParameters(parameters);
        mountPlugin();
    }else{
        var status;
        for(var i = 0; i < parameters.length; i++){
            status = false;
            for(var r=0; r < listParameters.length; r++){
                if(listParameters[r].id == parameters[i].id){
                    listParameters[r] = insertDataParameters(listParameters[r], parameters[i].data);
                    status = true;
                    break;
                }
            }
            if(!status){
                listParameters.push({id: "", data: {
                    "defaultValue": new Date(), "selectCombined": false, "acceptsAtCurrentDate": false,
                    "startFromCurrentDate": false, "dateActual": false, "callBackFunction": null, 
                    "lenStartYear": startYearDefault,
                    "lenEndYear": endYearDefault, "modeView": 0, "emptyDate": false, "dateReference": new Date()}
                });
                listParameters[listParameters.length-1].id = parameters[i].id;
                listParameters[listParameters.length-1] = insertDataParameters(
                    listParameters[listParameters.length-1], parameters[i].data);
            }
        }
    }
}

/**
 * Função que preenche os parâmetros padrão do DateTime Plugin
 */
function getDataParameters(parameters){
    if(parameters != undefined){
        for(var i=0; i < parameters.length; i++){
            var values = parameters[i].data;
            // Modview = Modo de exibição (0 - data, 1 - hora, 2 - data e hora)
            listParameters.push({id: "", data: {
                "defaultValue": new Date(), "selectCombined": false, "acceptsAtCurrentDate": false,
                "startFromCurrentDate": false, "dateActual": false, "callBackFunction": null, 
                "lenStartYear": startYearDefault, "lenEndYear": endYearDefault, "modeView": 0, 
                "emptyDate": false, 
                "dateReference": new Date()}
            });
            listParameters[i].id = parameters[i].id;
            listParameters[i] = insertDataParameters(listParameters[i], values);
        }
    }
}

/*
 * Função que atualiza algum parâmetro do datetime plugin.
 */
function updateDateTimePlugin(id, data){
    for(var r=0; r < listParameters.length; r++){
        if(listParameters[r].id == id){
            listParameters[r] = insertDataParameters(listParameters[r], data)
            break;
        }
    }
}

/*
 * Função que preenche os dados do objeto de parâmetros na lista de parâmetros.
 */
function insertDataParameters(parameters, values){
    if(values.defaultValue != undefined)
        parameters.data.defaultValue = createDateObject(values.defaultValue);
    else
        parameters.data.defaultValue = createDateObject($("#" + parameters.id).val());
    if(values.selectCombined != undefined)
        parameters.data.selectCombined = values.selectCombined;
    if(values.acceptsAtCurrentDate != undefined)
        parameters.data.acceptsAtCurrentDate = values.acceptsAtCurrentDate;
    if(values.startFromCurrentDate != undefined)
        parameters.data.startFromCurrentDate = values.startFromCurrentDate;
        parameters.data.dateReference = new Date(parameters.data.defaultValue.toGMTString());
    if(values.dateActual != undefined)
        parameters.data.dateActual = values.dateActual;
    if(values.callBackFunction != undefined)
        parameters.data.callBackFunction = values.callBackFunction;
    if(values.lenStartYear != undefined)
        parameters.data.lenStartYear = values.lenStartYear;
    if(values.lenEndYear != undefined)
        parameters.data.lenEndYear = values.lenEndYear;
    if(values.defaultValue == undefined && values.dateActual == undefined || values.emptyDate == true)
        parameters.data.emptyDate = true;
    else
        parameters.data.emptyDate = false;
    if(values.startFromDefaultValue != undefined){
        parameters.data.startFromCurrentDate = true;
        parameters.data.dateReference = new Date(parameters.data.defaultValue.toGMTString());
    }
    if(values.acceptsAtDefaultValue != undefined){
        parameters.data.acceptsAtCurrentDate = true;
        parameters.data.dateReference = new Date(parameters.data.defaultValue.toGMTString());
    }
    if(values.mode != undefined){
        if(values.mode == 'time')
            parameters.data.modeView = 1;
        else if(values.mode == 'datetime')
            parameters.data.modeView = 2;
        else
            parameters.data.modeView = 0;
    }
    if(parameters.data.modeView == 1)
        $("#" + parameters.id).attr("mask-me", "hora");
    else if(parameters.data.modeView == 2)
        $("#" + parameters.id).attr("mask-me", "datahora");
    else
        $("#" + parameters.id).attr("mask-me", "data");

    definirMascara($("#" + parameters.id));
    // preenche os campos com as datas, caso seja necessário
    if(!parameters.data.emptyDate){
        if(parameters.data.modeView == 1){
            $("#" + parameters.id).val(createHour(parameters.data.defaultValue.getHours(), 
                parameters.data.defaultValue.getMinutes()));
        }else if(parameters.data.modeView == 2){
            $("#" + parameters.id).val(createDateHour(parameters.data.defaultValue.getDate(), 
                parameters.data.defaultValue.getMonth()+1, parameters.data.defaultValue.getFullYear(), 
                parameters.data.defaultValue.getHours(), parameters.data.defaultValue.getMinutes()));
        }else{
            $("#" + parameters.id).val(createDate(parameters.data.defaultValue.getDate(), 
                parameters.data.defaultValue.getMonth()+1, parameters.data.defaultValue.getFullYear()));
        }
    }
    return parameters;
}

/*
 * Função que monta o DateTimePlugin
 */
function mountPlugin(){
    /** Date Plugin **/
    var html = "";                  // Variável com o html do plugin de data e hora
    html += "<div id=\"date_plugin\" class=\"date_plugin\">";
    html += "    <div class=\"container-select-text-options\">";
    html += "        <i class=\"fa fa-chevron-circle-left button-left-plugin\" aria-hidden=\"true\" ";
    html += "            onclick=\"buttonLeftPlugin();\"></i>";
    html += "        <select class=\"select-text-option-month\" onChange=\"selectTextOptionMonth();\">";
    // seletor de meses
    r = 0;
    lengthArray = months.length;
    while(r < lengthArray){
        html += "        <option disabled id=\"option_" + months[r][0] + "\" value=\"" + 
            months[r][0] + "\">" + months[r][1] + "</option>";
        r++;
    }   
    html += "        </select>";
    // seletor de anos
    html += "        <select class=\"select-text-option-year\" onChange=\"selectTextOptionYear();\">";
    var yearCont = startYearDefault;
    while(yearCont <= endYearDefault){
        html += "        <option disabled id=\"option_year_" + yearCont + "\" value=\"" + 
            yearCont + "\">" + yearCont + "</option>";
        yearCont++;
    }
    html += "        </select>";
    html += "        <i class=\"fa fa-chevron-circle-right button-right-plugin\" aria-hidden=\"true\" ";
    html += "            onclick=\"buttonRigthPlugin();\"></i>";
    html += "    </div>"
    html += "    <table class=\"container-days-of-week\">";
    html += "        <thead>";
    html += "            <tr>";
    html += "                <td class=\"header-line red-day\">Dom</div>";
    html += "                <td class=\"header-line\">Seg</div>";
    html += "                <td class=\"header-line\">Ter</div>";
    html += "                <td class=\"header-line\">Qua</div>";
    html += "                <td class=\"header-line\">Qui</div>";
    html += "                <td class=\"header-line\">Sex</div>";
    html += "                <td class=\"header-line\">Sab</div>";
    html += "            </tr>";
    html += "        </thead>";
    html += "        <tbody id=\"days-month-table\">";
    html += "        <tbody>";
    html += "    </table>";
    html += "    <div class=\"btn-select-value\" onclick=\"buttonSelectValue();\">";
    html += "        <i class=\"fa fa-check-circle-o\" aria-hidden=\"true\"></i>";
    html += "        <p class=\"text-btn-select-value\">&nbsp;&nbsp;&nbsp;OK</p>";
    html += "    </div>";
    html += "    <div class=\"btn-close-container\" onclick=\"buttonCloseContainer();\">";
    html += "        <i class=\"fa fa-times-circle-o\" aria-hidden=\"true\"></i>";
    html += "    </div>";
    html += "</div>";
    
    /** Time Plugin **/
    html += "<div id=\"time_plugin\" class=\"time_plugin_combined\">";
    html += "    <div class=\"container-btn-inc\">";
    html += "        <div class=\"btn-inc-hour\" onclick=\"buttonIncHour();\">";
    html += "            <i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i>";
    html += "        </div>";
    html += "        <div class=\"btn-inc-minute\" onclick=\"buttonIncMinute();\">";
    html += "            <i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i>";
    html += "        </div>";
    html += "    </div>";
    html += "    <div class=\"container-input-values-time\">";
    html += "        <input id=\"hour-value\" type=\"text\" mask-me=\"dia\" class=\"field-hour\" value=\"00\" ";
    html += "            onBlur=\"fieldHourValue();\" />";
    html += "        <p class=\"separator-time\">:</p>";
    html += "        <input id=\"minute-value\" type=\"text\" mask-me=\"dia\" class=\"field-minute\" ";
    html += "            value=\"00\" onBlur=\"fieldMinuteValue();\" />";
    html += "    </div>";
    html += "    <div class=\"container-btn-dec\">";
    html += "        <div class=\"btn-dec-hour\" onclick=\"buttonDecHour();\">";
    html += "            <i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i>";
    html += "        </div>";
    html += "        <div class=\"btn-dec-minute\" onclick=\"buttonDecMinute();\">";
    html += "            <i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i>";
    html += "        </div>";
    html += "    </div>";
    html += "    <div class=\"btn-select-value\" onclick=\"buttonSelectValue();\">";
    html += "        <i class=\"fa fa-check-circle-o\" aria-hidden=\"true\"></i>";
    html += "        <p class=\"text-btn-select-value\">&nbsp;&nbsp;&nbsp;OK</p>";
    html += "    </div>";
    html += "    <div class=\"btn-close-container\" onclick=\"buttonCloseContainer();\">";
    html += "        <i class=\"fa fa-times-circle-o\" aria-hidden=\"true\"></i>";
    html += "    </div>";
    html += "</div>";
    $("#date_time_plugin").append(html);
}

/*
 * Função preenche o calendário com os dias do mẽs.
 */
function insertDaysMonth(){
    var dayWeek = 7;
    var cont = 1;
    var emptyDays = true;
    var lastDay = getLastDay(dateNow.getMonth());

    if(lastDay > 28){
        if(dateNow.getDate() > lastDay)
            dateNow.setDate(lastDay);
    }

    var firstDay = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1).getDay();
    if(firstDay == 0)
        firstDay = 7;
    var html = "<tr>";

    var lastDayLastMonth = 0;
    if(dateNow.getMonth() == 2){
        lastDayLastMonth = verificaBissexto();
    }else if(dateNow.getMonth() > 0){
        lastDayLastMonth = months[dateNow.getMonth()-1][2];
    }else{
        lastDayLastMonth = months[11][2];
    }
    while(cont <= lastDay){
        if(dayWeek != firstDay && emptyDays){
            var yearSelect = parseInt(dateNow.getFullYear()) - 1;
            var yearActual = parseInt(actualObject.data.dateReference.getFullYear());
            if(actualObject.data.startFromCurrentDate && actualObject.data.dateReference.getMonth() == dateNow.getMonth() && actualObject.data.dateReference.getFullYear() == dateNow.getFullYear()){
                html += "<td id=\"select_opacity_day_" + cont + "\" class=\"body-line disabled-day\">" + 
                    ((lastDayLastMonth-firstDay)+1) + "</td>";
            }else if((actualObject.data.lenStartYear > 0 && actualObject.data.lenEndYear > 0) && (dateNow.getMonth()==0) && (yearSelect < yearActual-actualObject.data.lenStartYear || yearSelect > yearActual+actualObject.data.lenEndYear)){
                html += "<td id=\"select_opacity_day_" + cont + "\" class=\"body-line disabled-day\">" + 
                    ((lastDayLastMonth-firstDay)+1) + "</td>";
            }else{
                html += "<td id=\"select_opacity_day_" + cont + "\" onclick=\"selectPrevValue('" + 
                    ((lastDayLastMonth-firstDay)+1) + 
                    "')\" class=\"body-line opacity-day\">" + 
                    ((lastDayLastMonth-firstDay)+1) + "</td>";
            }
            lastDayLastMonth++;
            if(dayWeek == 7){
                dayWeek = 1;
            }else{
                dayWeek++;
            }
        }else{
            emptyDays = false;
            if(dayWeek == 7){
                if(cont != 1){
                    html += "</tr>";
                    html += "<tr>";
                }
                if(actualObject.data.startFromCurrentDate && actualObject.data.dateReference.getDate() > cont && dateNow.getMonth() == actualObject.data.dateReference.getMonth() && dateNow.getYear() == actualObject.data.dateReference.getYear()){
                    html += "<td id=\"select_day_" + cont + "\" class=\"body-line disabled-day\">" + cont + "</td>";
                }else if(actualObject.data.acceptsAtCurrentDate && actualObject.data.dateReference.getDate() < cont && dateNow.getMonth() == actualObject.data.dateReference.getMonth() && dateNow.getYear() == actualObject.data.dateReference.getYear()){
                    html += "<td id=\"select_day_" + cont + "\" class=\"body-line disabled-day\">" + cont + "</td>";
                }else{
                    if(dateNow.getDate() == cont){
                        html += "<td id=\"select_day_" + cont + "\" onclick=\"selectValue('" + cont + 
                            "')\" class=\"body-line red-day actual-day\" onmouseover=\"daySelectMouse('" + 
                            cont + "')\">" + cont + "</td>";
                    }else{
                        html += "<td id=\"select_day_" + cont + "\" onclick=\"selectValue('" + cont + 
                            "')\" class=\"body-line red-day\" onmouseover=\"daySelectMouse('" + 
                            cont + "')\">" + cont + "</td>";
                    }
                }
                dayWeek = 1;
            }else{
                if(actualObject.data.startFromCurrentDate && actualObject.data.dateReference.getDate() > cont && dateNow.getMonth() == actualObject.data.dateReference.getMonth() && dateNow.getYear() == actualObject.data.dateReference.getYear()){
                    html += "<td id=\"select_day_" + cont + "\" class=\"body-line disabled-day\">" + cont + "</td>";
                }else if(actualObject.data.acceptsAtCurrentDate && actualObject.data.dateReference.getDate() < cont && dateNow.getMonth() == actualObject.data.dateReference.getMonth() && dateNow.getYear() == actualObject.data.dateReference.getYear()){
                    html += "<td id=\"select_day_" + cont + "\" class=\"body-line disabled-day\">" + cont + "</td>";
                }else{
                    if(dateNow.getDate() == cont){
                        html += "<td id=\"select_day_" + cont + "\" onclick=\"selectValue('" + cont + 
                            "')\" class=\"body-line actual-day\" onmouseover=\"daySelectMouse('" + 
                            cont + "')\">" + cont + "</td>";
                    }else{
                        html += "<td id=\"select_day_" + cont + "\" onclick=\"selectValue('" + cont + 
                        "')\" class=\"body-line\" onmouseover=\"daySelectMouse('" + 
                        cont + "')\">" + cont + "</td>";
                    }
                }
                dayWeek++;
            }
            cont++; 
        }
    }
    if(dayWeek != 7){
        var daysOfNextMonth = 1;
        var yearSelect = parseInt(dateNow.getFullYear()) + 1;
        var yearActual = parseInt(actualObject.data.dateReference.getFullYear());
        while(dayWeek != 7){
            if(actualObject.data.acceptsAtCurrentDate && dateNow.getMonth() == actualObject.data.dateReference.getMonth() && dateNow.getYear() == actualObject.data.dateReference.getYear()){
                html += "<td id=\"select_opacity_day_" + cont + "\" class=\"body-line disabled-day\">" + 
                    daysOfNextMonth + "</td>";
            }else if(actualObject.data.acceptsAtCurrentDate && (dateNow.getMonth()+1 == actualObject.data.dateReference.getMonth() && daysOfNextMonth > actualObject.data.dateReference.getDate())){
                html += "<td id=\"select_opacity_day_" + cont + "\" class=\"body-line disabled-day\">" + 
                    daysOfNextMonth + "</td>";
            }else if((actualObject.data.lenStartYear > 0 && actualObject.data.lenEndYear > 0) && (dateNow.getMonth()==11) && (yearSelect < yearActual-actualObject.data.lenStartYear || yearSelect > yearActual+actualObject.data.lenEndYear)){
                html += "<td id=\"select_opacity_day_" + cont + "\" class=\"body-line disabled-day\">" + 
                    daysOfNextMonth + "</td>";
            }else{
                html += "<td id=\"select_opacity_day_" + cont + "\" onclick=\"selectNextValue('" + daysOfNextMonth + 
                    "')\" class=\"body-line opacity-day\">" + daysOfNextMonth + "</td>";
            }
            daysOfNextMonth++;
            dayWeek++;
        }
    }
    /* 
     * Exibe os meses que podem ser selecionados, caso as opções de bloqueio de datas antigas ou futuras esteja
     * habilitada.
     */
    if(actualObject.data.acceptsAtCurrentDate && actualObject.data.dateReference.getYear() == dateNow.getYear()){
        r = 0;
        lengthArray = months[actualObject.data.dateReference.getMonth()][0] + 1;
        s = lengthArray;
        aux = months.length;
    }else if(actualObject.data.startFromCurrentDate && actualObject.data.dateReference.getYear() == dateNow.getYear()){
        r = actualObject.data.dateReference.getMonth();
        lengthArray = months.length;
        s = 0;
        aux = r;
    }else{
        r = 0;
        lengthArray = months.length;
        s = 0;
        aux = 0;
    }
    while(r < lengthArray){
        $("#option_" + months[r][0]).removeAttr("disabled");
        r++;
    }
    while(s < aux){
        $("#option_" + months[s][0]).attr("disabled", true);
        s++;
    }

    /* 
     * Exibe os anos que podem ser selecionados, caso as opções de bloqueio de datas antigas ou futuras esteja
     * habilitada.
     */
    var startYear = actualObject.data.lenStartYear;
    var endYear = actualObject.data.lenEndYear;
    aux = startYearDefault;
    if(actualObject.data.acceptsAtCurrentDate || actualObject.data.startFromCurrentDate){
        if(actualObject.data.acceptsAtCurrentDate){
            endYear = parseInt(actualObject.data.dateReference.getFullYear());
        }//else 
        if(actualObject.data.startFromCurrentDate){
            startYear = parseInt(actualObject.data.dateReference.getFullYear());
            aux = startYear;
        }//else
        if(actualObject.data.lenStartYear > 0 && actualObject.data.lenEndYear > 0){
            startYear = parseInt(actualObject.data.dateReference.getFullYear()) - actualObject.data.lenStartYear;
            endYear = parseInt(actualObject.data.dateReference.getFullYear()) + actualObject.data.lenEndYear;
            aux = startYear;
        }
        while(aux <= endYear){
            if(actualObject.data.acceptsAtCurrentDate){
                if(aux > actualObject.data.dateReference.getFullYear()){
                    $("#option_year_" + aux).attr("disabled", true);
                }else{
                    $("#option_year_" + aux).removeAttr("disabled");
                }
            }else if(actualObject.data.startFromCurrentDate){
                if(aux < actualObject.data.dateReference.getFullYear()){
                    $("#option_year_" + aux).attr("disabled", true);
                }else{
                    $("#option_year_" + aux).removeAttr("disabled");
                }
            }
            aux++;
        }
    }else{
        while(aux <= endYear){
            $("#option_year_" + aux).removeAttr("disabled");
            aux++;
        }
    }
    /*if(dateNow.getMonth() == actualObject.data.dateReference.getMonth() && dateNow.getYear() == actualObject.data.dateReference.getYear())
        dateNow.setDate(actualObject.data.dateReference.getDate());*/
    html += "</tr>";
    $("#days-month-table").html(html);
    $(".select-text-option-month").val(dateNow.getMonth());
    $(".select-text-option-year").val(dateNow.getFullYear());
}

/**
 * Função que obtém o objeto datetime plugin atual que será manipulado.
 */
function getActualObject(id){
    for(var r=0; r < listParameters.length; r++){
        if(listParameters[r].id == id){
            actualObject = listParameters[r];
            break;
        }
    }
}

/*
 * Função de mapeamento de foco nos campos de datas que utilizam o DateTimePlugin.
 */
$('body').on('focus', '*.datetime_plugin', function(){
    if($(this).attr("readonly") == undefined && $(this).attr("disabled") == undefined){
        $("#date_time_plugin").css("display", "none"); 
        $("#date_time_plugin").toggle(); 
        var width = $("#date_time_plugin").css('width').replace(erPontLetras, '');    
        var height = $("#date_time_plugin").css('height').replace(erPontLetras, '');    
        var top  = ($(this).offset().top + (this.clientHeight * 1.1));    
        var left = $(this).offset().left;
        var x    = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
        if (left > (x - width - 5)){
            left = (x - width - 5);
        }
        
        getActualObject(this.id);
        dateNow = actualObject.data.defaultValue;
        
        if(actualObject.data.modeView == 1){
            $("#date_plugin").css("display", "none");
            $("#time_plugin").css("display", "block");
            $("#time_plugin").attr("class", "time_plugin");
            $("#hour-value").val(formatar("00", dateNow.getHours()));
            $("#minute-value").val(formatar("00", dateNow.getMinutes()));
        }else if(actualObject.data.modeView == 2){
            $("#date_plugin").css("display", "block");
            $("#time_plugin").css("display", "block");
            $("#time_plugin").attr("class", "time_plugin_combined");
            $("#hour-value").val(formatar("00", dateNow.getHours()));
            $("#minute-value").val(formatar("00", dateNow.getMinutes()));
            insertDaysMonth();
        }else{
            $("#date_plugin").css("display", "block");
            $("#time_plugin").css("display", "none");
            insertDaysMonth();
        }
        $("#date_time_plugin").css({'display': 'block', 'top': top, 'left': left});
        campoPreenchidoManual = false;
    }
});

/*
 * Função que mapea o evento de perda de foco do campo de data.
 */
$('body').on('blur', '*.datetime_plugin', function(){
    if(campoPreenchidoManual){
        if($(this).attr("readonly") == undefined && $(this).attr("disabled") == undefined){
            var date = actualObject.data.dateReference;
            var dateInformed = createDateObject($(this).val());
            if(eData($(this).val())){
                if(actualObject.data.startFromCurrentDate)
                    if(verifyDates(actualObject.data.dateReference, dateInformed)){
                        dateInformed = actualObject.data.dateReference;
                }else if(actualObject.data.acceptsAtCurrentDate){
                    if(verifyDates(dateInformed, actualObject.data.dateReference))
                        dateInformed = actualObject.data.dateReference;
                }
                updateDateTimeObject(dateInformed);
                date = dateInformed;
            }
            if(actualObject.data.modeView == 1){
                $(this).val(createHour(date.getHours(), date.getMinutes()));
            }else if(actualObject.data.modeView == 2){
                $(this).val(createDateHour(date.getDate(), date.getMonth()+1, date.getFullYear(), 
                    date.getHours(), date.getMinutes()));
            }else{
                $(this).val(createDate(date.getDate(), date.getMonth()+1, date.getFullYear()));
            }
        }
    }
});

/*
 * Ação de manipulação de tecla pressionada
 */
$("body").on("keypress", ".datetime_plugin", function(event){
    var tecla = ( window.event ) ? event.keyCode : event.which;
    var type  = $(this).attr("mask-me");
    v = String.fromCharCode(tecla);
    var er = /[^0-9]/ig; // Somente (0-9).
  
    if ((v.match(er) != null) && (tecla != 8 ) && (tecla != 0)){
        event.preventDefault(event); 
    }
});

/*
 * Ação de manipulação de tecla após ser pressionada.
 */
$("body").on("keyup", ".datetime_plugin", function(event){
    var tecla   = ( window.event ) ? event.keyCode : event.which; // Captura Tecla.
    if(tecla == 13 || tecla == 9){
        return;
    }
    var type    = $(this).attr("mask-me"); // Tipo de mascara que sera aplicada.
    var string  = $(this).val(); // texto atual do campo.
    if ((tecla != 16) && (tecla < 37 || tecla > 40)){
        len = $(this).attr("maxlength");
        if (tecla == 8 && string.length < len-1){
            return;
        }
        definirMascara(this);
    }
    campoPreenchidoManual = true;
});

/*
 * Função que mapea o evento de fechar datetime plugin.
 */
function buttonCloseContainer(){
    $("#date_time_plugin").css("display", "none");
    campoPreenchidoManual = false;
    if(actualObject.data.callBackFunction){
        callFunction(actualObject.data.callBackFunction);
    }
}

/*
 * Função que mapea o evento de click do botão de selecionar data/hora.
 */
function buttonSelectValue(){
    campoPreenchidoManual = false;
    updateDateTimeObject(dateNow);
    if(actualObject.data.modeView == 2){
        validadeFiledsTime();
        var newHour = parseInt($("#hour-value").val());
        var newMinute = parseInt($("#minute-value").val());
        $("#" + actualObject.id).val(createDateHour(dateNow.getDate(), dateNow.getMonth() + 1, 
            dateNow.getFullYear(), dateNow.getHours(), dateNow.getMinutes()));
    }else if(actualObject.data.modeView == 0){
        $("#" + actualObject.id).val(createDate(dateNow.getDate(), dateNow.getMonth() + 1, dateNow.getFullYear()));
    }else if(actualObject.data.modeView == 1){
        validadeFiledsTime();
        $("#" + actualObject.id).val(createHour(dateNow.getHours(), dateNow.getMinutes()));
    }
    $("#date_time_plugin").css("display", "none");
    if(actualObject.data.callBackFunction){
        callFunction(actualObject.data.callBackFunction);
    }
}

/*
 * Função que mapea o evento de seleção de valor no seletor de meses.
 */
function selectTextOptionMonth(){
    campoPreenchidoManual = false;
    dateNow.setMonth($(".select-text-option-month").val());
    insertDaysMonth();
    updateDateTimeObject(dateNow);
}

/*
 * Função que mapea o evento de seleção de valor no seletor de ano.
 */
function selectTextOptionYear(){
    campoPreenchidoManual = false;
    dateNow.setFullYear($(".select-text-option-year").val());
    insertDaysMonth();
    updateDateTimeObject(dateNow);
}

/*
 * Função que troca o fundo do campo de dia, quando o mouse é passado pelo campo.
 */
function daySelectMouse(day){
    campoPreenchidoManual = false;
    $("#select_day_" + dateNow.getDate()).attr("class", 
        $("#select_day_" + dateNow.getDate()).attr("class").replace("actual-day", ""));
    $("#select_day_" + actualObject.data.defaultValue.getDate()).attr("class", 
        $("#select_day_" + actualObject.data.defaultValue.getDate()).attr("class").replace("actual-day", ""));
    $("#select_day_" + day).attr("class", $("#select_day_" + day).attr("class") + " actual-day");
    dateNow.setDate(day);
}

/*
 * Função que seleciona o dia que foi clicado no seletor de datas.
 */
function selectValue(day){
    campoPreenchidoManual = false;
    $("#select_day_" + dateNow.getDate()).attr("class", 
        $("#select_day_" + dateNow.getDate()).attr("class").replace("actual-day", ""));
    $("#select_day_" + actualObject.data.defaultValue.getDate()).attr("class", 
        $("#select_day_" + actualObject.data.defaultValue.getDate()).attr("class").replace("actual-day", ""));
    $("#select_day_" + day).attr("class", $("#select_day_" + day).attr("class") + " actual-day");
    dateNow.setDate(day);
    buttonSelectValue();
}

/*
 * Função que seleciona o mês anterior no seletor de meses.
 */
function selectPrevValue(day){
    campoPreenchidoManual = false;
    var month = parseInt($(".select-text-option-month").val());
    if(month <= 0){
        dateNow.setMonth($(".select-text-option-month").val(11));
        $(".select-text-option-month").val(11);
        $(".select-text-option-year").val(parseInt($(".select-text-option-year").val())-1);
        dateNow.setFullYear($(".select-text-option-year").val());
    }else{
        month--;
        dateNow.setMonth(month);
        $(".select-text-option-month").val(month);
    }
    dateNow.setDate(parseInt(day));
    insertDaysMonth();
    updateDateTimeObject(dateNow);
}

/*
 * Função que seleciona o próximo mês no seletor de meses.
 */
function selectNextValue(day){
    campoPreenchidoManual = false;
    var month = parseInt($(".select-text-option-month").val());
    if(month >= 11){
        dateNow.setMonth($(".select-text-option-month").val(0));
        $(".select-text-option-month").val(0);
        $(".select-text-option-year").val(parseInt($(".select-text-option-year").val())+1);
        dateNow.setFullYear($(".select-text-option-year").val());
    }else{
        month++;
        dateNow.setMonth(month);
        $(".select-text-option-month").val(month);
    }
    dateNow.setDate(parseInt(day));
    insertDaysMonth();
    updateDateTimeObject(dateNow);
}

/*
 * Função que mapea o evento de click do botão de próximo mês.
 */
function buttonLeftPlugin(){
    campoPreenchidoManual = false;
    var month = parseInt($(".select-text-option-month").val());
    var yearSelect = parseInt(dateNow.getFullYear()) - 1;
    var yearActual = parseInt(actualObject.data.dateReference.getFullYear());
    if((actualObject.data.lenStartYear > 0 && actualObject.data.lenEndYear > 0) && (month==0) && (yearSelect < yearActual-actualObject.data.lenStartYear || yearSelect > yearActual+actualObject.data.lenEndYear)){
        return;
    }else{
        if((actualObject.data.startFromCurrentDate && month > actualObject.data.dateReference.getMonth() || dateNow.getYear() != actualObject.data.dateReference.getYear()) || (!actualObject.data.startFromCurrentDate)){
            var day = dateNow.getDate();
            var lastDay = 31;
            dateNow.setDate(1);
            if(month <= 0){
                lastDay = getLastDay(11);
                dateNow.setMonth(11);
                dateNow.setFullYear(parseInt($(".select-text-option-year").val())-1);
            }else{
                month--;
                lastDay = getLastDay(month);
                dateNow.setMonth(month);
                $(".select-text-option-month").val(month);
            }

            if(lastDay >= 28){
                if(day > lastDay)
                    day = lastDay;
            }
            dateNow.setDate(day);
            updateDateTimeObject(dateNow);
            insertDaysMonth();
        }
    }
}

/*
 * Função que mapea o evento de click do botão de mês anterior.
 */
function buttonRigthPlugin(){
    campoPreenchidoManual = false;
    var month = parseInt($(".select-text-option-month").val());
    var yearSelect = parseInt(dateNow.getFullYear()) + 1;
    var yearActual = parseInt(actualObject.data.dateReference.getFullYear());
    if((actualObject.data.lenStartYear > 0 && actualObject.data.lenEndYear > 0) && (month==11) && (yearSelect < yearActual-actualObject.data.lenStartYear || yearSelect > yearActual+actualObject.data.lenEndYear)){
        return;
    }else{
        if((actualObject.data.acceptsAtCurrentDate && month < actualObject.data.dateReference.getMonth() || dateNow.getYear() != actualObject.data.dateReference.getYear()) || (!actualObject.data.acceptsAtCurrentDate)){
            var day = dateNow.getDate();
            var lastDay = 31;
            dateNow.setDate(1);
            if(month >= 11){
                lastDay = getLastDay(0);
                dateNow.setMonth(0);
                dateNow.setMonth($(".select-text-option-month").val(0));
                $(".select-text-option-month").val(0);
                $(".select-text-option-year").val(parseInt($(".select-text-option-year").val())+1);
                dateNow.setFullYear($(".select-text-option-year").val());
            }else{
                ++month;
                lastDay = getLastDay(month);
                dateNow.setMonth(month);
                $(".select-text-option-month").val(month);
            }
            if(lastDay >= 28){
                if(day > lastDay)
                    day = lastDay;
            }
            dateNow.setDate(day);
            updateDateTimeObject(dateNow);
            insertDaysMonth();
        }
    }
}

/*
 * Função que mapea o evento de click do botão de incrementar horas.
 */
function buttonIncHour(){
    campoPreenchidoManual = false;
    var newHour = parseInt($("#hour-value").val()) + 1;
    if(newHour > 23)
        newHour = 0;
    dateNow.setHours(parseInt(newHour));
    updateDateTimeObject(dateNow);
    $("#hour-value").val(formatar("00", newHour));
}

/*
 * Função que mapea o evento de click do botão de incrementar minutos.
 */
function buttonIncMinute(){
    campoPreenchidoManual = false;
    var newMinute = parseInt($("#minute-value").val()) + 1;
    if(newMinute > 59){
        newMinute = 0;
        hour = parseInt($("#hour-value").val());
        if(hour == 23)
            hour = 0;
        else
            hour++;
        $("#hour-value").val(formatar("00", hour));
    }
    dateNow.setMinutes(parseInt(newMinute));
    updateDateTimeObject(dateNow);
    $("#minute-value").val(formatar("00", newMinute));
}

/*
 * Função que mapea o evento de  de click do botão de decrementar horas.
 */
function buttonDecHour(){
    campoPreenchidoManual = false;
    var newHour = parseInt($("#hour-value").val()) - 1;
    if(newHour < 0)
        newHour = 23;
    dateNow.setHours(parseInt(newHour));
    updateDateTimeObject(dateNow);
    $("#hour-value").val(formatar("00", newHour));
}

/*
 * Função que mapea o evento de click do botão de decrementar minutos.
 */
function buttonDecMinute(){
    campoPreenchidoManual = false;
    var newMinute = parseInt($("#minute-value").val()) - 1;
    if(newMinute < 0){
        newMinute = 59;
        hour = parseInt($("#hour-value").val());
        if(hour == 0)
            hour = 23;
        else
            hour--;
        $("#hour-value").val(formatar("00", hour));
    }
    updateDateTimeObject(dateNow);
    $("#minute-value").val(formatar("00", newMinute));
}

/*
 * Função que mapea o evento de perda de foco do campo de hora.
 */
function fieldHourValue(){
    campoPreenchidoManual = false;
    validadeFiledsTime();
    dateNow.setHours(parseInt(parseInt($("#hour-value").val())));
    updateDateTimeObject(dateNow);
}

/*
 * Função que mapea o evento de perda de foco do campo minuto.
 */
function fieldMinuteValue(){
    campoPreenchidoManual = false;
    validadeFiledsTime();
    dateNow.setMinutes(parseInt(parseInt($("#minute-value").val())));
    updateDateTimeObject(dateNow);
}

/*
 * Função que verifica os valores dos campos de hora e minuto.
 */
function validadeFiledsTime(){
    campoPreenchidoManual = false;
    var newHour = parseInt($("#hour-value").val());
    if(newHour > 23){
        $("#hour-value").val("23");
        dateNow.setHours(parseInt(23));
    }else if(newHour < 0){
        $("#hour-value").val("00");
        dateNow.setHours(parseInt(0));
    }
    var newMinute = parseInt($("#minute-value").val());
    if(newMinute > 59){
        $("#minute-value").val("59");
        dateNow.setMinutes(parseInt(59));
    }else if(newMinute < 0){
        $("#minute-value").val("00");
        dateNow.setMinutes(parseInt(0));
    }
}

/*
 * Função que atualiza a data do objeto datetime plugin.
 */
function updateDateTimeObject(date){
    for(var r=0; r < listParameters.length; r++){
        if(listParameters[r].id == actualObject.id){
            listParameters[r].data.defaultValue = date;
            break;
        }
    }
}

/*
 * Função que obém o último dia do mês, da data passada como parâmetro.
 */
function getLastDay(month){
    if(month == 1){
        return verificaBissexto();
    }else{
        return months[month][2];
    }
}

/**
 * Função que verifica se o valor passado com parâmetro é uma data/hora válida e cria um objeto da classe Date.
 */
function createDateObject(strDate){
    try{
        if(strDate != "" && strDate != null){
            if(strDate.length == 10){
                if((isNaN(new Date(strDate).getTime())) || (strDate.indexOf("/") != -1)){
                    if(isNaN(new Date(strDate.substring(6, 10) + "/" + strDate.substring(3, 
                        5) + "/" + strDate.substring(0, 2)).getTime())){
                        return new Date(strDate);
                    }else{
                        return new Date(strDate.substring(6, 10) + "/" + strDate.substring(3, 
                            5) + "/" + strDate.substring(0, 2));
                    }
                }else{
                    return new Date(strDate);
                }
            }else if(strDate.length == 5){
                if(isNaN(new Date("1900/01/01 " + strDate.substring(11, 13) + ":" + strDate.substring(14, 16)))){
                    return new Date()
                }else{
                    return new Date("1900/01/01 " + strDate.substring(11, 13) + ":" + strDate.substring(14, 16))
                }
            }else if(strDate.length == 16){
                if(new Date(strDate) != new Date()){
                    if(isNaN(new Date(strDate.substring(6, 10) + "/" + strDate.substring(3, 
                        5) + "/" + strDate.substring(0, 2) + " " + strDate.substring(11, 
                        13) + ":" + strDate.substring(14, 16)))){
                        return new Date()
                    }else{
                        return new Date(strDate.substring(6, 10) + "/" + strDate.substring(3, 
                        5) + "/" + strDate.substring(0, 2) + " " + strDate.substring(11, 
                        13) + ":" + strDate.substring(14, 16))
                    }
                }else{
                    return new Date(strDate);
                }
            }else{
                return new Date();
            }
        }else{
            return new Date();
        }
    }catch(e){
        return new Date();
    }
}

/*
 * Formata uma string com a mascara passada.
 */
function formatar(pattern, string){
    pattern = pattern.toString();
    string = string.toString();
    for(var i=pattern.length-string.length; i > 0; i--){
        string = '#' + string;
    }
    var ntext = '';
    for(var i=pattern.length-1; i >= 0; i--){
        if (string[i] == '#'){
            ntext = pattern[i] + ntext;
        }else{
            ntext = string[i] + ntext;
        }
    }
    return ntext;
}

/*
 * Obtém o último dia do mês de fevereiro, considerando anos bissextos
 */
function verificaBissexto(){
    var year = parseInt(dateNow.getFullYear());
    if(((year/4).toString().indexOf(".") == -1) && ((year/100).toString().indexOf(".") != -1)){
        // ano bissexto
        return 29;
    }else if(((year/4).toString().indexOf(".") == -1) && ((year/100).toString().indexOf(".") == -1) && ((year/400).toString().indexOf(".") == -1)){
        // ano bissexto
        return 29;
    }else{
        // não é ano bissexcto
        return 28;
    }
}

/*
 * Valida se a data, hora ou os dois são válidos
 */
function validateDateTime(value){
    var erBissexto   = /^(((0[1-9]|[12][0-9]|3[01])([-.\/])(0[13578]|10|12)([-.\/])(\d{4}))|(([0][1-9]|[12][0-9]|30)([-.\/])(0[469]|11)([-.\/])(\d{4}))|((0[1-9]|1[0-9]|2[0-8])([-.\/])(02)([-.\/])(\d{4}))|((29)(\.|-|\/)(02)([-.\/])([02468][048]00))|((29)([-.\/])(02)([-.\/])([13579][26]00))|((29)([-.\/])(02)([-.\/])([0-9][0-9][0][48]))|((29)([-.\/])(02)([-.\/])([0-9][0-9][2468][048]))|((29)([-.\/])(02)([-.\/])([0-9][0-9][13579][26])))$/;
    erBissexto.lastIndex = 0;
    return erBissexto.test(value);
}

/*
 * Função que cria a máscara de data e/ou hora.
 */
function definirMascara(obj, tecla){
    var type    = $(obj).attr("mask-me"); // Tipo de mascara que sera aplicada.
    var posCur  = obj.selectionStart + 1; // Captura Posição do cursor no Objeto.
    var string  = $(obj).val(); // texto atual do campo.
    var mascara = ""; // Mascara que será aplicada.
    var tamanho = 0; // Tamanho máximo do campo.
    if (string != ''){
        if (type == "data"){ // Data
            mascara = "99/99/9999";
        }
        if (type == "datahora"){ // Data Hora
            mascara = "99/99/9999!99:99";
        }
        if (type == "hora"){ // Hora
            mascara = "99:99";
        }
        if (type == "dia"){ // Hora
            mascara = "99";
        }
        
        tamanho = mascara.length;

        $(obj).attr("maxlength", tamanho);
        $(obj).val(aplicarMascara(mascara, string, type, tecla));
        // Decrementa o Cursor se for Sobrescrever.
        if (posCur <= string.length ){
            posCur--;
        }else{
            // Incrementa o Cursor se ocorrer 2 Pontuações consecutivas.
            if ($(obj).val().length > posCur){
                posCur++;
            }
        }   

        // Retorna o Cursor na Mesma Posição em que estava Antes no Objeto.
        obj.selectionStart = posCur;
        obj.selectionEnd = posCur;
    }
}

/*
 * Função que aplica a máscara no campo do formulário.
 */
function aplicarMascara(pattern, string, type, tecla){
    if (type != 'decimal' && type != 'decimal0' && type != 'decimal3'){
        var txt  = string.replace(/\W/g, '');    // Remover Pontuação.
    }else{
        var txt  = string;
    }
    var opc1 = pattern.replace(/[?]/g, '9'); // Máscara com Opcionais.
    var opc2 = pattern.replace(/[?]/g, '');  // Máscara sem Opcionais.
    if (opc2){
        if (string.match(/[0-9a-z]/ig).length <= opc2.match(/[9]/ig).length){
            newPattern = opc2; 
        }else{
            newPattern = opc1;
        }
    }else{
        newPattern = opc1;
    }
    mascara = [];
    for (i=0; i < newPattern.length; i++){
        if (newPattern[i] != '9'){
            mascara[i] = newPattern[i];
        }else{
            mascara[i] = ' ';
        } 
    }
    var cont = 0;
    for (i=0; i < mascara.length; i++){
        if (mascara[i] == ' '){
            if (txt[cont]){
                mascara[i] = txt[cont];
            }else{
                mascara[i] = ' ';   
            }
            cont++;
        }
    }
    var resp = '';
    for (i=0; i < mascara.length; i++){
        if (mascara[i] == ' '){
            break;
        }
        resp += mascara[i];
    }
    resp = resp.replace("!", " ");
    return resp;
}

/*
 * Função que verifica se o valor passado com parâmetro é uma data válida.
 */
function eData(value){
    erBissexto.lastIndex = 0;
    return erBissexto.test(value);
}

/*
 * Função que verifica se o valor passado com parâmetro é uma hora válida.
 */
function eHora(value){
    erHora.lastIndex = 0;
    return erHora.test(value);
}

/*
 * Retorna String em Formato de Data.
 */
function createDate(day, month, year){
    return formatar('00', day) + '/' + formatar('00', month) + '/' + year;
}

/*
 * Retorna String em Formato de hora.
 */
function createHour(hour, minute){
    return formatar('00', hour) + ':' + formatar('00', minute);
}

/*
 * Retorna String em Formato de hora.
 */
function createDateHour(day, month, year, hour, minute){
    return formatar('00', day) + '/' + formatar('00', month) + '/' + year + " " + formatar('00', 
        hour) + ':' + formatar('00', minute);
}

/*
 * Função que verifica se a primeira data passada como parâmetro é maior que a segunda.
 */
function verifyDates(date1, date2){
    if(date1 != undefined && date2 != undefined)
        return date1 > date2;
    else
        return false;
}

/*
 * Função que executa a função de callback passada pelo usuário, quando esta for definida pelo usuário.
 */
function callFunction(func){
    if (func != null){ 
        func.call();
    }
}

/*
 * Função que converte a data passada como parâmetro para o formato 2017-12-31)
 */
function conertDateFormatUtc(strDate){
    var date = strDate.slice();
    date = date.split("/");
    return date[2] + '-' + date[1] + '-' + date[0];
}

/*
 * Mapea qual local da página foi clicado.
 */
$("body").click(function(event){ 
    try{
        e = event|| window.event;
        var div = $("#date_time_plugin");
        var out = true;
        if((div.has(e.target).length > 0 || e.target == div[0]) || (e.target.className.search("datetime_plugin") != -1) || (e.target.className.search("opacity-day") != -1))
            out = false;
        if(out){
            $('#date_time_plugin').each(function(){
                $(this).css("display", "none");
            });
        }
    }catch(e){}
});
