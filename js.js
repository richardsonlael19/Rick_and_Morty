function x(metodo,url){
var xml = new XMLHttpRequest();
xml.open(metodo,url);
xml.send();

xml.onreadystatechange = () => {
    if(xml.readyState==4){
        if(xml.status==200){
             atualizaTabela(JSON.parse(xml.responseText)); 
             console.log(JSON.parse(xml.responseText));
        }else{
            console.log("oi" + xml.status);
        }

    }


    }
}

function atualizaTabela(dados){
    document.querySelector("#oi").innerHTML = `
    ${
        dados.results.map(item =>{
return ` 
 <a class="dropdown-item" href="#" onclick="cardSelect(('${item.name}')" ${item.name} </a>`
}).join("")
 
} `


}


