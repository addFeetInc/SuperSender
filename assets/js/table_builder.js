//TABLE BUILDER

function createHeaderRow(column_array, table_name){
    const newRow = document.createElement('tr')
    newRow.id = 'person-grid-row-header'
    newRow.className = 'header-row'
    newRow.innerHTML = ''
    for (let column_object of column_array){
        newRow.appendChild(createHeaderCell(column_object, table_name))
    }
    return newRow
}

function createHeaderCell(column_object, table_name){
    const newCell = document.createElement('th')
    newCell.className = isPointOrGroupColFromObject(column_object) ? 'grid-check-el header' : 'grid-info-el header'
    newCell.dataset.table = table_name
    newCell.dataset.row = 'header'
    newCell.dataset.column = column_object.name
    if (column_object.hideColumn){
        newCell.className += newCell.className ? " hidden-col" : "hidden-col"
    }
    newCell.innerHTML = fillHeaderCell(column_object, table_name)
    return newCell
}

function fillHeaderCell(column_object, table_name){
    return `${column_object.name == 'Company_ID' ? 'Company' : column_object.name}${columnDataTypeShown ? (' (' + column_object.dataType + ')'): ''}<br><button onclick="makeColumnHidden('${column_object.name}', '${table_name}')"><i class="bi bi-eye-slash"></i></button>`
}



function createRow(entry_object, id_column_string, name_column_string, column_array, table_name){
    const newRow = document.createElement('tr')
    // newRow.id = ''
    newRow.className = 'grid-row'
    newRow.innerHTML = ''
    for (let column_object of column_array){
        newRow.appendChild(createCell(entry_object, id_column_string, name_column_string, column_object, table_name))
    }
    return newRow
}

function createCell(entry_object, id_column_string, name_column_string, column_object, table_name){
    const newCell = document.createElement('td')
    newCell.className = isPointOrGroupColFromObject(column_object) ? 'grid-check-el' : 'grid-info-el'
    newCell.dataset.table = table_name
    newCell.dataset.row = entry_object[id_column_string]
    newCell.dataset.column = column_object.name
    if (column_object.hideColumn){
        newCell.className += newCell.className ? " hidden-col" : "hidden-col"
    }
    newCell.innerHTML = fillCell(entry_object, id_column_string, name_column_string, column_object, table_name)
    return newCell
}

function fillCell(entry_object, id_column_string, name_column_string, column_object, table_name){

    if (table_name=='company'){
    //Company: Working
        if(isPointOrGroupColFromObject(column_object)){
            return `<input type="checkbox" onchange="updateCompanyObjectsFromCompanyGrid();refreshPersonTable();"></input>`
        }else if(isStrArrIntColFromObject(column_object)){
            if(column_object.name == 'Exceptions'){
                return `${entry_object[column_object.name][0] ? entry_object[column_object.name].map( val => companyObjects.find(obj=>obj['Company_ID']==val) ).map( val => val['Name']+' (id:'+ val['Company_ID'] +')' ).join("<br>") : "(empty)" }`
            }else{
                return `${entry_object[column_object.name][0] ? entry_object[column_object.name].join(", ") : "(empty)" }`
            }
        }else if(isStrArrStrColFromObject(column_object)){
            return `${entry_object[column_object.name][0] ? entry_object[column_object.name].join("<br>") : "(empty)" }`
        }else if(column_object.name == id_column_string){
            if(entry_object[id_column_string] == 0){
                return `${entry_object[column_object.name]}`
            }else{
                return `<button data-bs-toggle="modal" data-bs-target="#company-modal" onclick="openEditCompanyContainer(${entry_object[id_column_string]})"><i class="bi bi-pencil-square"></i></button> ${entry_object[column_object.name]}`
            }
        }else{
            return `${entry_object[column_object.name]}`
        }

    }else if(table_name=='person'){
    //Person: 
        if (isPointOrGroupColFromObject(column_object)){
            return `<input type="checkbox" onchange="updateCSBinsFromPersonGrid();refreshListTable();"/>` 
        }else if (column_object.name === 'Company_ID'){
            company_obj = companyObjects.find(company=>company['Company_ID']===entry_object['Company_ID'])
            console.log(companyObjects)
            console.log(company_obj)
            console.log(entry_object)
            return `${company_obj['Name']} (ID: ${company_obj['Company_ID']})`
        }else if(column_object.name === id_column_string){
            return `<button data-bs-toggle="modal" data-bs-target="#person-modal" onclick="openEditPerContainer(${entry_object[id_column_string]})"><i class="bi bi-pencil-square"></i></button> ${entry_object[column_object.name]}`
        }else{
            return `${entry_object[column_object.name]}`
        }

    }else if(table_name=='list'){
    //List: Working
        if(isPointOrGroupColFromObject(column_object)){
            return `<input type="checkbox" onchange="updateListObjectsFromListGrid();refreshListTable()"/>`
        }else if(isStrArrIntColFromObject(column_object)){

            console.log(entry_object,column_object.name, entry_object[column_object.name])
            if(column_object.name == 'Exceptions'){
                return `${entry_object[column_object.name].length ? entry_object[column_object.name].map( val => companyObjects.find(obj=>obj['Company_ID']==val) ).map( val => val['Name']+' (id:'+ val['Company_ID'] +')' ).join("<br>") : "(empty)" }`
            }else if(column_object.name == 'Result'){
                return `<button data-bs-toggle="modal" data-bs-target="#list-modal" onclick="fillViewListWindow(${entry_object[id_column_string]})"><i class="bi bi-eye"></i></button><button onclick="copyListToClipboard(${entry_object[id_column_string]})"><i class="bi bi-copy"></i></button> (${entry_object[column_object.name].length})`
            }else{
                return `${entry_object[column_object.name][0] ? entry_object[column_object.name].join(", ") : "(empty)" }`
            }
        }else if(isStrArrStrColFromObject(column_object)){

            return `${entry_object[column_object.name][0] ? entry_object[column_object.name].join("<br>") : "(empty)" }`
        }else if(column_object.name == id_column_string){

            return `<button data-bs-toggle="modal" data-bs-target="#list-modal" onclick="openEditListContainer(${entry_object[id_column_string]})"><i class="bi bi-pencil-square"></i></button> ${entry_object[column_object.name]}`
        }else{

            return `${entry_object[column_object.name]}`
        }
        
    }else if(table_name=='generic_email'){
    //Generic Email: Working
        if(column_object.name == id_column_string){
            return `
                <div class="btn-group">
                    <button class="btn btn-outline-secondary triple-button" data-bs-toggle="modal" data-bs-target="#generic-email-modal" onclick="previewGenericEmail(${entry_object[id_column_string]})"><i class="bi bi-eye-fill"></i></button> 
                    <button class="btn btn-outline-secondary triple-button" data-bs-toggle="modal" data-bs-target="#generic-email-modal" onclick="openEditGenericEmailContainer(${entry_object[id_column_string]})"><i class="bi bi-pencil-square"></i></button> 
                    <button class="btn btn-outline-secondary triple-button" onclick="downloadGenericEmailFile(${entry_object[id_column_string]})"><i class="bi bi-download"></i></button> 
                </div>
                ${entry_object[id_column_string]}`
        }else if(column_object.name=='To' || column_object.name=='Cc' || column_object.name=='Bcc'){
            console.log('generic email: ', entry_object)
            console.log(`${column_object.name}: `, column_object.name, entry_object[column_object.name])
            return `${entry_object[column_object.name][0] ? entry_object[column_object.name].map(lid=>listFromID(lid)).map(obj=> `${obj['List_Name']} (id: ${obj['List_ID']})` ).join('<br>') : '(empty)'}`
        }else{
            console.log('generic email: ', entry_object)
            console.log(`${column_object.name}: `, column_object.name, entry_object[column_object.name])
            return `${entry_object[column_object.name][0] ? entry_object[column_object.name] : '(empty)'}`
        }

    }
}

