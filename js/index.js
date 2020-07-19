var todos = JSON.parse(localStorage.getItem('todos_salvos')) || [{}];

var botao = document.querySelector('#container #add');
var app = document.querySelector('#app');
var boxTarefa = document.querySelector('#container #tarefa');
var boxRepresentante = document.querySelector('#container #representante');
var boxData = document.querySelector('#container #data-final');
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
boxData.setAttribute('min', today);

function Render(){
    for(todo of todos){
    var pos = todos.indexOf(todo);  
    var aux = pos+1;    
        var elementLink = document.createElement('i');
        elementLink.setAttribute('class', 'fa fa-trash');
        elementLink.setAttribute('onclick', 'Excluir('+pos+')');
        var elementTitle = document.createElement('h4');
        var textTitle = document.createTextNode('tarefa '+aux);
        var lista = document.createElement('ul');
        var tarefaElement = document.createElement('li');
        tarefaElement.setAttribute('id', 'tar');
        var tarefaTexto = document.createTextNode(todos[pos].tarefa);
        elementTitle.appendChild(textTitle);
        tarefaElement.appendChild(tarefaTexto);
        lista.appendChild(tarefaElement);
        elementTitle.appendChild(elementLink);
        app.appendChild(elementTitle);
        app.appendChild(lista);
        
    
        var representanteElement = document.createElement('li');
        representanteElement.setAttribute('id', 'rep');
        var representanteTexto = document.createTextNode(todos[pos].representante);
        representanteElement.appendChild(representanteTexto);
        lista.appendChild(representanteElement);
        app.appendChild(lista);
    
        var dataFinalElement = document.createElement('li');
        dataFinalElement.setAttribute('id', 'dat');
        var dataFinalTexto = document.createTextNode(todos[pos].dataFinal);
        dataFinalElement.appendChild(dataFinalTexto);
        lista.appendChild(dataFinalElement);    
        app.appendChild(lista); 
    
     //console.log(todos[pos]);
}
}

botao.onclick = function Add(){
        if(boxTarefa.value === '' || boxRepresentante.value === '' || boxData.value === ''){
            alert("preencha todos os campos");
            if(boxTarefa.value === '')
            return boxTarefa.focus(); 
            if(boxRepresentante.value === '')
            return boxRepresentante.focus();
            if(boxData.value === '')
            return boxData.focus();
        }
        else{
        var novaTarefa = boxTarefa.value;
        var novoRepresentante = boxRepresentante.value;
        var novaData = boxData.value;
        var dataBR = novaData.split('-').reverse().join('/');

        todos.push({tarefa: novaTarefa, representante: novoRepresentante, dataFinal: dataBR});
        //console.log(novaTarefa + ' ' + novoRepresentante + ' ' + novaData);
       //console.log(todos);
       //console.log(dataBR);;

       boxTarefa.value = '';
       boxRepresentante.value = '';
       boxData.value = '';
       app.innerHTML = '';
        Render();
        salvarnoStorage()
        }   
}


function Excluir(pos){
    todos.splice(pos,1);
    app.innerHTML = ''; 
    Render();
    salvarnoStorage()
}

function salvarnoStorage(){
    localStorage.setItem('todos_salvos', JSON.stringify(todos)); // salvar e converter
}

Render();