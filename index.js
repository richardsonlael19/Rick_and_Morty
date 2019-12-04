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
            this.xmlRequest('GET', 'https://rickandmortyapi.com/api/episode')
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
             <a class="dropdown-item tabela" onclick="request.pegar('${item.url}')"> ${item.episode}- ${item.name} </a>`
            }).join("")
           
            } `
              
                
            }).catch(erro =>{
                document.querySelector('#tabela').innerHTML = `<h2>Error! ${erro} </h2>`
            })
            

}

pegar(url) {
    
    this.xmlRequest('GET', 'https://rickandmortyapi.com/api/episode').then(dados => {

        dados.results.forEach(topico => {
            if (topico.url == url) {
                
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
        ${ dados.results.map(item =>{
            return  ` <tr>
                <td>${item.characters}</td>
                </tr>`
            }).join('')}
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

    this.xmlRequest('GET', 'https://rickandmortyapi.com/api/character/').then(dados => {
       
        dados.results.forEach(pesquisa => { 
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
                    <td>${pesquisa.name}</td>
                    <td>${pesquisa.status}</td>
                    <td>${pesquisa.gender}</td>
                    <td><img src="${pesquisa.image}" alt="..." class="img-thumbnail" height="50" width="50"></td>
                   
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

    this.xmlRequest('GET','https://rickandmortyapi.com/api/episode').then(dados =>{
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
                    <td>${item.air_date}</td>
                    <td>${item.episode}</td>
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


localizacao(){
    this.xmlRequest('GET','https://rickandmortyapi.com/api/location').then(dados =>{
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