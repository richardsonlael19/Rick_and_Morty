class Http {
    constructor() {}

    xmlRequest(metodo, url) {

        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest()
            request.open(metodo, url);
            request.send();

            request.onreadystatechange = () => {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        resolve(JSON.parse(request.responseText))
                    } else {
                        reject(request.status)
                    }
                }
            }
        })
    }

  

    personagem() {
            this.xmlRequest('GET', 'https://bibipecasapi.azurewebsites.net/api/v1/parts/plate/hyp0327?partName=jta%20cabecote&key=99ab20b2efd04848b6c70d5f9a62873d&token=d77af425057d473bb284007c93439d650ada19a1e728465d9cf815eeed5d75f6&debug=true')
                .then(dados => {
                        document.querySelector("#tabela").innerHTML = `
                <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Foto</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Status</th>
                        <th scope="col">Gênero</th>
                        <th scope="col">Espécie</th>
                        <th scope="col">Localização</th>
                    </tr>
                </thead>
                <tbody>
                ${
                    dados.results.map(item =>{
            return ` 
             <a class="dropdown-item tabela" onclick="request.pegar('${item.name}')"> ${item.name} </a>`
            }).join("")
           
            } `
              
                
            }).catch(erro =>{
                document.querySelector('#tabela').innerHTML = `<h2>Error! ${erro} </h2>`
            })
            

}

pegar(id) {
    this.xmlRequest('GET', 'https://bibipecasapi.azurewebsites.net/api/v1/parts/plate/hyp0327?partName=jta%20cabecote&key=99ab20b2efd04848b6c70d5f9a62873d&token=d77af425057d473bb284007c93439d650ada19a1e728465d9cf815eeed5d75f6&debug=true').then(dados => {
 
        dados.results.forEach(topico => {
            if (topico.name === id) {
                console.log(topico.name)
                document.querySelector("#tabela").innerHTML = `
        <table class="table">
    
        <thead>
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">Status</th>
                <th scope="col">genero</th>
                <th scope="col">Imagem</th>
               
            </tr>
        </thead>
        <tbody id="tabela2"></tbody>
    
    <tbody>
            ${  ` <tr>
                    <td>${topico.name}</td>
                    <td>${topico.status}</td>
                    <td>${topico.gender}</td>
                    <td><img src="${topico.image}" alt="..." class="img-thumbnail" height="50" width="50"></td>
                   
                    </tr>`
            }
            </tbody>
        </table>`
                
            }
        })
    })
}

pequisanome(event){
    event.preventDefault();
    let $ = document.querySelector.bind(document);
    var nome = $(".nome").value;

    this.xmlRequest('GET', 'https://bibipecasapi.azurewebsites.net/api/v1/parts/plate/hyp0327?partName=jta%20cabecote&key=99ab20b2efd04848b6c70d5f9a62873d&token=d77af425057d473bb284007c93439d650ada19a1e728465d9cf815eeed5d75f6&debug=true').then(dados => {
       
        dados.Vehicle.forEach(pesquisa => { 
            if (pesquisa.name === nome ){
      document.querySelector("#tabela").innerHTML = `
        <table class="table">
        <thead>
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">Status</th>
                <th scope="col">genero</th>
                <th scope="col">Imagem</th>
               
            </tr>
        </thead>
        <tbody id="tabela2"></tbody>
    
    <tbody>
            ${  ` <tr>
                    <td>${pesquisa.Brand}</td>
                    <td>${pesquisa.Brand}</td>
                    <td>${pesquisa.Brand}</td>
                    <td><img src="${pesquisa.Brand}" alt="..." class="img-thumbnail" height="50" width="50"></td>
                   
                    </tr>`
            }
            </tbody>
        </table>`
    return
          }
          else{
            console.log("tá fazendo o if errado sua burra")
        }
        })
       
    })
}

    
 epsodios() {

    this.xmlRequest('GET','https://bibipecasapi.azurewebsites.net/api/v1/parts/plate/hyp0327?partName=jta%20cabecote&key=99ab20b2efd04848b6c70d5f9a62873d&token=d77af425057d473bb284007c93439d650ada19a1e728465d9cf815eeed5d75f6&debug=true').then(dados =>{
        document.querySelector("#tabela").innerHTML = `
        <table class="table">
    
        <thead>
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">Data de Lançamento</th>
                <th scope="col">Episódio</th>
                <th scope="col">Criado</th>
            </tr>
        </thead>
        <tbody id="tabela2"></tbody>
    
    <tbody>
            ${ dados.results.map(item =>{
                return  ` <tr>
                    <td>${item.Brand}</td>
                    <td>${item.Brand}</td>
                    <td>${item.Brand}</td>
                    <td>${item.Brand}</td>
                    </tr>`
                }).join('')}
            </tbody>
        </table>`
    }).catch(erro=>{
        document.querySelector("#tabela").innerHTML = `<h2>Error! ${erro} </h2> 
        `
    })

    
}


localizacao(){
    this.xmlRequest('GET','https://bibipecasapi.azurewebsites.net/api/v1/parts/plate/hyp0327?partName=jta%20cabecote&key=99ab20b2efd04848b6c70d5f9a62873d&token=d77af425057d473bb284007c93439d650ada19a1e728465d9cf815eeed5d75f6&debug=true').then(dados =>{
        document.querySelector("#tabela").innerHTML = `
        <table class="table">
    
        <thead>
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">Data de Lançamento</th>
                <th scope="col">Episódio</th>
                <th scope="col">Criado</th>
            </tr>
        </thead>
        <tbody id="tabela2"></tbody>
    
    <tbody>
            ${ dados.results.map(item =>{
                return  ` <tr>
                    <td>${item.name}</td>
                    <td>${item.type}</td>
                    <td>${item.dimension}</td>
                    <td>${item.created}</td>
                    </tr>`
                }).join('')}
            </tbody>
        </table>`
    }).catch(erro=>{
        document.querySelector("#tabela").innerHTML = `<h2>Error! ${erro} </h2> 
        `
    })
}

}