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
            this.xmlRequest('GET', 'https://rickandmortyapi.com/api/character/')
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
                    ${ dados.results.map(item =>{
                        return  `<tr>
                        <td><img src="${item.image}" alt="..." class="img-thumbnail" height="50" width="50"></td>
                            <td>${item.name}</td>
                            <td>${item.status}</td>
                            <td>${item.gender}</td>
                            <td>${item.species}</td>
                            <td>${item.location.name}</td>
                            </tr>`
                        }).join('')}
                </tbody>
            </table>`
            }).catch(erro =>{
                document.querySelector('#tabela').innerHTML = `<h2>Error! ${erro} </h2>`
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