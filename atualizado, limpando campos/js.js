class Conexao{
    constructor(){
        this.fabricante(); 
        this.veiculo();
        this.bisavo();
        this.avo();
        this.pai();
    
        
       
    }
    

xmlResquest(metodo, url){

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

fabricante(){
     this.xmlResquest('GET', 'https://bibipecasapi.azurewebsites.net/api/v1/category/Brand?token=d77af425057d473bb284007c93439d650ada19a1e728465d9cf815eeed5d75f6&key=99ab20b2efd04848b6c70d5f9a62873d')
    .then(dados => {

        document.querySelector("#select-marca").innerHTML = `
        <select class=" form-control text-center " onclick="conexao.veiculo(this.value)">
        <option>Fabricante</option>
        ${
            dados.map(item => {
                if(!item.Name) return
                return `<option value="${item.Name}">${item.Name} </option>  `
               }).sort()
        }
               </select>`; 

        })
}



veiculo(marca){ 
document.querySelector("#motor").innerHTML =  `<select class="form-control text-center"> <option> bisavo </option> </select> `;
document.querySelector("#avo").innerHTML = `<select class="form-control text-center"> <option> avo </option> </select> `;
document.querySelector("#pai").innerHTML = `<select class="form-control text-center"> <option> pai </option> </select>`;

     this.xmlResquest('GET',`https://bibipecasapi.azurewebsites.net/api/v1/category/Model?brand=${marca}&token=d77af425057d473bb284007c93439d650ada19a1e728465d9cf815eeed5d75f6&key=99ab20b2efd04848b6c70d5f9a62873d`)
    .then(dados => {
        document.querySelector("#veiculo").innerHTML = `
        <select class="form-control text-center" onclick="conexao.bisavo('${marca}', this.value)" >
            <option>Veiculo</option>    
        ${
            dados.map(item =>{
                if(!item.Name) return;

                return `<option value="${item.Name}"> ${item.Name}</option> `
               }).sort()
               
               
              }
             </select>
 `
}).catch(erro=>console.log(erro));
}


bisavo(marca, veiculo){  
    console.log(marca, veiculo) 
    this.xmlResquest('GET',`https://bibipecasapi.azurewebsites.net/api/v1/category/GreatGrandfather?brand=${marca}&model=${veiculo}&token=d77af425057d473bb284007c93439d650ada19a1e728465d9cf815eeed5d75f6&key=99ab20b2efd04848b6c70d5f9a62873d
    `).then(dados => {
        document.querySelector("#motor").innerHTML = `
        <select class="form-control text-center"  onclick="conexao.avo('${marca}','${veiculo}' , this.value)">
            <option>Bisavo</option>
          
            ${
                dados.map(item =>{
                    if(!item.Name) return
                    return ` <option> ${item.Name} </option> `
                   }).sort()
                   
                  }
                  </select>
`
}).catch(erro=>console.log(erro));
}


avo(marca, veiculo, bisavo){  
    console.log(marca, veiculo, bisavo) 
    this.xmlResquest('GET',`https://bibipecasapi.azurewebsites.net/api/v1/category/Grandfather?brand=${marca}&model=${veiculo}&greatGrandfather=${bisavo}&token=d77af425057d473bb284007c93439d650ada19a1e728465d9cf815eeed5d75f6&key=99ab20b2efd04848b6c70d5f9a62873d
    `).then(dados => {
        document.querySelector("#avo").innerHTML = `
        <select class="form-control text-center" onclick="conexao.pai('${marca}','${veiculo}', '${bisavo}' ,this.value) ">
            <option>Avo</option>
          
            ${
                dados.map(item =>{
                    if(!item.Name) return
                    return ` <option> ${item.Name} </option> `
                   }).sort()
                   
                  }
                  </select>
`
}).catch(erro=>console.log(erro));
}
       

pai(marca, veiculo, bisavo,avo){  
    console.log(marca, veiculo, bisavo,avo) 
    this.xmlResquest('GET',`https://bibipecasapi.azurewebsites.net/api/v1/category/Dad?brand=${marca}&model=${veiculo}&greatGrandfather=${bisavo}&grandfather=${avo}&token=d77af425057d473bb284007c93439d650ada19a1e728465d9cf815eeed5d75f6&key=99ab20b2efd04848b6c70d5f9a62873d
    `).then(dados => {
        document.querySelector("#pai").innerHTML = `
        <select class="form-control text-center" onclick="conexao.enviar(this.value)">
            <option>Pai</option> 
            ${
                dados.map(item =>{
                    if(!item.Name) return
                    return ` <option> ${item.PrimeId}</option> `
                   }).sort()
                   
                  }
                  </select>
`


}).catch(erro=>console.log(erro));
}

enviar(pai){ 
    this.xmlResquest('GET',`https://bibipecasapi.azurewebsites.net/api/v1/parts/Similars/${pai}?onlyCustomer=false&token=d77af425057d473bb284007c93439d650ada19a1e728465d9cf815eeed5d75f6&key=99ab20b2efd04848b6c70d5f9a62873d
    `).then(dados => {
        dados.forEach(dados => { 
        document.querySelector("#oi").innerHTML = `
                <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Fabricante</th>
                        <th scope="col">PrimeId</th>
                        <th scope="col">Codigo</th>
                       
                    </tr>
                </thead>
                <tbody>
                ${` 
            <tr>
            <td>${dados.fabricante}</td>
            <td>${dados.primeid}</td>
            <td>${dados.codigo} </td>
           
            
            
            </tr>`}`
              
                
            })

        }
    )}
}