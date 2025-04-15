
function fillPreviewModal(modal_id,table_name, entry_id){
    $(`#${modal_id} .modal-header`).html('')
    $(`#${modal_id} .modal-body`).html('')
    $(`#${modal_id} .modal-body`).css('text-align','left')
    $(`#${modal_id} .modal-footer button.apply`).addClass('d-none')
    $(`#${modal_id}`).attr("data-entry-id",entry_id)
    
    if(table_name == 'generic_email'){
        $(`#${modal_id} .modal-header`).append(
            `<h4>PREVIEW, Generic_Email_ID: ${entry_id}</h4>`
        )
        const emailContent = compileGenericEmail(entry_id)
        $(`#${modal_id} .modal-body`).append(
            `${emailContent.replace(/\n/g,'<br>')}`
        )
        // console.log(emailContent.replace(/\n/g,'<br>'))
    }else if(table_name == 'list'){
        $(`#${modal_id} .modal-header`).append(
            `<h4>PREVIEW, List_ID: ${entry_id}</h4>`
        )
        const list = listFromID(entry_id)
        // console.log(list)
        for (let pid of list['Result']){
            const person = personFromID(pid)
            const company = companyFromID(person['Company_ID'])
            const newRow = `<p>${person['Name']} (id: ${pid}), ${company['Name']}</p>`
            $(`#${modal_id} .modal-body`).append(newRow)
        }
    }else{
        alert('ERROR')
    }
}

function fillEditEntryModal(modal_id, table_name, entry_id){
    $(`#${modal_id} .modal-header`).html('')
    $(`#${modal_id} .modal-body`).html('')
    $(`#${modal_id} .modal-body`).css('text-align','right')
    $(`#${modal_id} .modal-footer button.apply`).removeClass('d-none')
    $(`#${modal_id}`).attr("data-entry-id",entry_id)
    $(`#${modal_id} .modal-footer button.apply`).on('click', function(){applyEditEntryModal(this);$(`#${modal_id}`).modal('hide')})

    if(table_name == 'company'){
        $(`#${modal_id} .modal-header`).append(
            `<h4>EDIT, Company_ID: ${entry_id}</h4>`
        )

        const index = companyObjects.findIndex(obj=>obj['Company_ID']==entry_id)

        for (let key in companyObjects[index]){
            if (key == "Company_ID"){  
            }else if(isStrArrStrColFromName(key, companyColumns)){

                const dropdownSelect = document.createElement('select')
                dropdownSelect.id = `dropdown-select-${key}`
                dropdownSelect.multiple = true
                dropdownSelect.setAttribute('data-column-name', `${key}`)

                const dropdownLabel = document.createElement('label')
                dropdownLabel.setAttribute('for', `dropdown-select-${key}`)
                dropdownLabel.textContent = `${key}: `

                if(key=='Groups'){
                    for (let person_col_obj of personColumns.filter(obj=>isGroupColFromObject(obj))){
                        const newOption = document.createElement('option')
                        newOption.value = person_col_obj.name
                        newOption.textContent = person_col_obj.name
                        console.log(companyObjects[index][key])
                       
                        dropdownSelect.appendChild(newOption)
                        if(companyObjects[index][key].includes(person_col_obj.name)){newOption.setAttribute('selected', 'selected')}
                    }
                }else if(key=='Points'){
                    for (let person_col_obj of personColumns.filter(obj=>isPointColFromObject(obj))){
                        const newOption = document.createElement('option')
                        newOption.value = person_col_obj.name
                        newOption.textContent = person_col_obj.name
                        console.log(companyObjects[index][key])
                       
                        dropdownSelect.appendChild(newOption)
                        if(companyObjects[index][key].includes(person_col_obj.name)){newOption.setAttribute('selected', 'selected')}
                    }
                }

                dropdownLabel.append(dropdownSelect)
                $(`#${modal_id} .modal-body`).append(dropdownLabel)
                $(`#${modal_id} .modal-body`).append(`<br>`)

            }else if(isStrArrIntColFromName(key, companyColumns) && key == "Exceptions"){
                const dropdownSelect = document.createElement('select')
                dropdownSelect.id = `dropdown-select-${key}`
                dropdownSelect.multiple = true
                dropdownSelect.setAttribute('data-column-name', `${key}`)

                const dropdownLabel = document.createElement('label')
                dropdownLabel.setAttribute('for', `dropdown-select-${key}`)
                dropdownLabel.textContent = `${key}: `

                if(key == "Exceptions"){
                    for (let company_obj of companyObjects){
                        const newOption = document.createElement('option')
                        newOption.value = company_obj['Company_ID']
                        newOption.textContent = `${company_obj['Name']} (id:${company_obj['Company_ID']})`
                        console.log(companyObjects[index][key])
                       
                        dropdownSelect.appendChild(newOption)
                        if(companyObjects[index][key].includes(`${company_obj['Company_ID']}`)){newOption.setAttribute('selected', 'selected')}
                    }
                }

                dropdownLabel.append(dropdownSelect)
                $(`#${modal_id} .modal-body`).append(dropdownLabel)
                $(`#${modal_id} .modal-body`).append(`<br>`)


            }else if(isPointOrGroupColFromName(key, companyColumns)){
                const checkStatus = Boolean(companyObjects[index][key]) ? 'checked' : ""
                $(`#${modal_id} .modal-body`).append(`<label>${key}: <input type="checkbox" data-column-name="${key}" ${checkStatus}/></label><br>`)

            }else{
                let placeholderText = (key=='Exceptions') ? "Enter Company ID #s" : (key=='Persons') ? "Enter Person ID #s" : (key=='Companies') ? "Enter Company ID #s" : "Enter info"
                $(`#${modal_id} .modal-body`).append(`<label>${key}: <input type="text" data-column-name="${key}" placeholder="${placeholderText}" value="${companyObjects[index][key]}"/></label><br>`)
            }  
        }


    }else if(table_name == 'person'){
        $(`#${modal_id} .modal-header`).append(
            `<h4>EDIT, Person_ID: ${entry_id}</h4>`
        )
        $(`#${modal_id} .modal-footer button.apply`).on('click', function(){applyEditEntryModal(this);$(`#${modal_id}`).modal('hide')})
        for (let bin in companyStaffBins){
            if(companyStaffBins[bin].some(obj=>obj['Person_ID']==entry_id)){
                const index = companyStaffBins[bin].findIndex(obj=>obj['Person_ID']==entry_id)
    
                // create the property edit elements
                for (let key in companyStaffBins[bin][index]){
                    if (key == "Person_ID"){
                        
                    }else if(key == "Company_ID"){
                        const dropdownLabel = document.createElement('label')
                        dropdownLabel.textContent = 'Company: '
    
                        const dropdownSelect = document.createElement('select')
                        dropdownSelect.id = 'dropdown-select'
                        dropdownSelect.setAttribute('data-column-name', `${key}`)
    
                        for (let company of companyObjects){
                            const newOption = document.createElement('option')
                            newOption.value = parseInt(`${company['Company_ID']}`.trim())
                            newOption.textContent = `${company['Name']} (ID: ${company['Company_ID']})`
                            dropdownSelect.appendChild(newOption)
                            console.log('Company: ', company)
                            console.log('new-option value: ', newOption.value, typeof newOption.value)
                        }
                        for (let opt of dropdownSelect.options){
                            if(opt.value == `${companyStaffBins[bin][index][key]}`){
                                opt.setAttribute('selected', 'selected')
                            }
                        }
                        console.log('dropdown options: ', dropdownSelect.options)
                        console.log(`${companyStaffBins[bin][index]['Company_ID']}`, typeof `${companyStaffBins[bin][index]['Company_ID']}`)
                        console.log('dropdown-select value:', dropdownSelect.value, typeof dropdownSelect.value)
                        console.log('companyObjects: ', companyObjects)
                        
                        dropdownLabel.setAttribute('for', 'dropdown-select')
                        dropdownLabel.append(dropdownSelect)
                        $(`#${modal_id} .modal-body`).append(dropdownLabel)
                        // $(`#${modal_id} .modal-body`).append(dropdownSelect)
                        $(`#${modal_id} .modal-body`).append(`<br>`)
                        console.log(bin, entry_id, key)
                    }else if(isPointOrGroupColFromName(key,personColumns)){
                        const checkStatus = Boolean(companyStaffBins[bin][index][key]) ? 'checked' : ""
                        $(`#${modal_id} .modal-body`).append(`<label>${key}: <input type="checkbox" data-column-name="${key}" ${checkStatus}/></label><br>`)
                        console.log(bin, entry_id, key)
                    }else{
                        $(`#${modal_id} .modal-body`).append(`<label>${key}: <input type="text" data-column-name="${key}" placeholder="enter ${key.toLowerCase()} " value="${companyStaffBins[bin][index][key]}"/></label><br>`)
                        console.log(bin, entry_id, key)
                    }  
                }
            }
        }
    }else if(table_name == 'list'){
        $(`#${modal_id} .modal-header`).append(
            `<h4>EDIT, List_ID: ${entry_id}</h4>`
        )
        // $(`#${modal_id} .modal-footer button.apply`).on('click', function(){applyEditListContainer(this);$(`#${modal_id}`).modal('hide')})
        $(`#${modal_id} .modal-footer button.apply`).on('click', function(){applyEditEntryModal(this);$(`#${modal_id}`).modal('hide')})

        const index = listObjects.findIndex(obj=>obj['List_ID']==entry_id)

        for (let key in listObjects[index]){
            if (key == "List_ID" || key == "Result"){  
            }else if(isStrArrStrColFromName(key, listColumns)){

                const dropdownSelect = document.createElement('select')
                dropdownSelect.id = `dropdown-select-${key}`
                dropdownSelect.multiple = true
                dropdownSelect.setAttribute('data-column-name', `${key}`)

                const dropdownLabel = document.createElement('label')
                dropdownLabel.setAttribute('for', `dropdown-select-${key}`)
                dropdownLabel.textContent = `${key}: `

                if(key=='Groups'){
                    for (let person_col_obj of personColumns.filter(obj=>isGroupColFromObject(obj))){
                        const newOption = document.createElement('option')
                        newOption.value = person_col_obj.name
                        newOption.textContent = person_col_obj.name
                        console.log(listObjects[index][key])
                       
                        dropdownSelect.appendChild(newOption)
                        if(listObjects[index][key].includes(person_col_obj.name)){newOption.setAttribute('selected', 'selected')}
                    }
                }else if(key=='Points'){
                    for (let person_col_obj of personColumns.filter(obj=>isPointColFromObject(obj))){
                        const newOption = document.createElement('option')
                        newOption.value = person_col_obj.name
                        newOption.textContent = person_col_obj.name
                        console.log(listObjects[index][key])
                       
                        dropdownSelect.appendChild(newOption)
                        if(listObjects[index][key].includes(person_col_obj.name)){newOption.setAttribute('selected', 'selected')}
                    }
                }

                dropdownLabel.append(dropdownSelect)
                $(`#${modal_id} .modal-body`).append(dropdownLabel)
                $(`#${modal_id} .modal-body`).append(`<br>`)

            }else if(isStrArrIntColFromName(key, listColumns) && key == "Exceptions"){
                const dropdownSelect = document.createElement('select')
                dropdownSelect.id = `dropdown-select-${key}`
                dropdownSelect.multiple = true
                dropdownSelect.setAttribute('data-column-name', `${key}`)

                const dropdownLabel = document.createElement('label')
                dropdownLabel.setAttribute('for', `dropdown-select-${key}`)
                dropdownLabel.textContent = `${key}: `

                if(key == "Exceptions"){
                    for (let company_obj of companyObjects){
                        const newOption = document.createElement('option')
                        newOption.value = company_obj['Company_ID']
                        newOption.textContent = `${company_obj['Name']} (id:${company_obj['Company_ID']})`
                        console.log(listObjects[index][key])
                       
                        dropdownSelect.appendChild(newOption)
                        if(listObjects[index][key].includes(company_obj['Company_ID'])){newOption.setAttribute('selected', 'selected')}
                    }
                }

                dropdownLabel.append(dropdownSelect)
                $(`#${modal_id} .modal-body`).append(dropdownLabel)
                $(`#${modal_id} .modal-body`).append(`<br>`)


            }else if(isPointOrGroupColFromName(key, listColumns)){
                const checkStatus = Boolean(listObjects[index][key]) ? 'checked' : ""
                $(`#${modal_id} .modal-body`).append(`<label>${key}: <input type="checkbox" data-column-name="${key}" ${checkStatus}/></label><br>`)

            }else{
                let placeholderText = (key=='Exceptions') ? "Enter Company ID #s" : (key=='Persons') ? "Enter Person ID #s" : (key=='Lists') ? "Enter List ID #s" : "Enter info"
                $(`#${modal_id} .modal-body`).append(`<label>${key}: <input type="text" data-column-name="${key}" placeholder="${placeholderText}" value="${listObjects[index][key]}"/></label><br>`)
            }  
        }

    }else if(table_name == 'generic_email'){
        $(`#${modal_id} .modal-header`).append(
            `<h4>EDIT, Generic_Email_ID: <span id="edit-meid">${entry_id}<span></h4>`
        )
        $(`#${modal_id} .modal-footer button.apply`).on('click', function(){applyEditEntryModal(this);$(`#${modal_id}`).modal('hide')})

        const index = genericEmailObjects.findIndex(obj=>obj['Email_ID']==entry_id)

        for (let key in genericEmailObjects[index]){
            if (key == "Email_ID" || key == "Result"){
            }else if(isStrArrIntColFromName(key, genericEmailColumns) && (key == "To" || key == "Cc" || key == "Bcc")){
                const dropdownSelect = document.createElement('select')
                dropdownSelect.id = `dropdown-select-${key}`
                dropdownSelect.multiple = true
                dropdownSelect.setAttribute('data-column-name', `${key}`)

                const dropdownLabel = document.createElement('label')
                dropdownLabel.setAttribute('for', `dropdown-select-${key}`)
                dropdownLabel.textContent = `${key}: `

                if(key == "To" || key == "Cc" || key == "Bcc"){
                    for (let list_obj of listObjects){
                        const newOption = document.createElement('option')
                        newOption.value = list_obj['List_ID']
                        newOption.textContent = `${list_obj['List_Name']} (id:${list_obj['List_ID']})`
                        console.log(list_obj)
                        console.log(genericEmailObjects[index], key)
                        console.log(genericEmailObjects[index][key])
                       
                        dropdownSelect.appendChild(newOption)
                        if(genericEmailObjects[index][key].includes(list_obj['List_ID'])){newOption.setAttribute('selected', 'selected')}
                    }
                }

                dropdownLabel.append(dropdownSelect)
                $(`#${modal_id} .modal-body`).append(dropdownLabel)
                $(`#${modal_id} .modal-body`).append(`<br>`)


            }else if(key=='Body'){
                let placeholderText = (key=='Exceptions') ? "Enter Company ID #s" : (key=='Persons') ? "Enter Person ID #s" : (key=='Lists') ? "Enter List ID #s" : "Enter info"
                $(`#${modal_id} .modal-body`).append(`<label>${key}: <textarea cols="30" rows="20" class="edit-message-body" data-column-name="${key}" placeholder="${placeholderText}">${genericEmailObjects[index][key]}</textarea></label><br>`)

            }else{
                let placeholderText = (key=='Exceptions') ? "Enter Company ID #s" : (key=='Persons') ? "Enter Person ID #s" : (key=='Lists') ? "Enter List ID #s" : "Enter info"
                $(`#${modal_id} .modal-body`).append(`<label>${key}: <input type="text" data-column-name="${key}" placeholder="${placeholderText}" value="${genericEmailObjects[index][key]}"/></label><br>`)
            }  
        }
    }
}

function applyEditEntryModal(btn){
    const modalContainer = btn.parentElement.parentElement.parentElement.parentElement
    const modal_id = modalContainer.id
    const entry_id = parseInt(modalContainer.dataset.entryId)
    let temp_object = {}

    if(modal_id=='company-modal'){
        temp_object["Company_ID"] = entry_id
        const inputs = modalContainer.querySelectorAll('select, input')
        inputs.forEach((input)=>{
            const columnName = input.dataset['columnName'] ? input.dataset['columnName'] : 'unnamed'
            console.log(columnName)
            if(isStrArrStrColFromName(columnName, companyColumns)){
                temp_object[`${columnName}`] = input.selectedOptions.length ? Array.from(input.selectedOptions).map(option=>option.value) : []
            }else if(columnName == 'Exceptions'){
                temp_object[`${columnName}`] = input.selectedOptions.length ? Array.from(input.selectedOptions).map(option=>option.value) : []
            }else if(isStrArrIntColFromName(columnName, companyColumns)){
                temp_object[`${columnName}`] = input.value.trim() ? input.value.split(",").map(val=>parseInt(val.trim())) : []
            }else{
                temp_object[`${columnName}`] = isGroupColFromName(columnName, companyColumns) || isPointColFromName(columnName, companyColumns) ? +input.checked : parseInt(input.value) ? parseInt(input.value) : input.value 
            }
        })
        console.log('temp_object: ',temp_object)
    
        const index = companyObjects.findIndex(obj=>obj['Company_ID']==entry_id)
        companyObjects.splice(index,1,temp_object)
    
        refreshCompanyTable()


    }else if(modal_id=='person-modal'){
        temp_object["Person_ID"] = entry_id
        const inputs = modalContainer.querySelectorAll('select, input')
        inputs.forEach((input)=>{
            const columnName = input.dataset['columnName'] ? input.dataset['columnName'] : 'unnamed' 
    
            console.log(columnName)
            temp_object[`${columnName}`] = isPointOrGroupColFromName(columnName,personColumns) ? +input.checked : (parseInt(input.value) || parseInt(input.value)==0) ? parseInt(input.value) : input.value 
    
        })
        console.log('temp_object: ',temp_object)
        for (let bin in companyStaffBins){
            if(companyStaffBins[bin].some(obj=>obj['Person_ID']==entry_id)){
                const index = companyStaffBins[bin].findIndex(obj=>obj['Person_ID']==entry_id)
                companyStaffBins[bin].splice(index,1,temp_object)
            }
        }
        sortBins()
        refreshPersonTable()
        // closeEditPerContainer()


    }else if(modal_id=='list-modal'){
        temp_object["List_ID"] = entry_id
        const inputs = modalContainer.querySelectorAll('select, input')
        inputs.forEach((input)=>{
            const columnName = input.dataset['columnName'] ? input.dataset['columnName'] : 'unnamed'
            console.log(columnName)
            if(isStrArrStrColFromName(columnName, listColumns)){
                temp_object[`${columnName}`] = input.selectedOptions.length ? Array.from(input.selectedOptions).map(option=>option.value) : []
            }else if(columnName == 'Exceptions'){
                temp_object[`${columnName}`] = input.selectedOptions.length ? Array.from(input.selectedOptions).map(option=>parseInt(option.value)) : []
            }else if(isStrArrIntColFromName(columnName, listColumns)){
                temp_object[`${columnName}`] = input.value.trim() ? input.value.split(",").map(val=>parseInt(val.trim())) : []
            }else{
                temp_object[`${columnName}`] = isGroupColFromName(columnName, listColumns) || isPointColFromName(columnName, listColumns) ? +input.checked : parseInt(input.value) ? parseInt(input.value) : input.value 
            }
        })
        const index = listObjects.findIndex(obj=>obj['List_ID']==entry_id)
        listObjects.splice(index,1,temp_object)
    
        refreshListTable()

    }else if(modal_id=='generic-email-modal'){
        temp_object["Email_ID"] = entry_id
        const inputs = modalContainer.querySelectorAll('select, input, textarea')
        inputs.forEach((input)=>{
            const columnName = input.dataset['columnName'] ? input.dataset['columnName'] : 'unnamed'
            console.log(columnName)
            if(isStrArrStrColFromName(columnName, genericEmailColumns)){
                temp_object[`${columnName}`] = input.selectedOptions[0] ? Array.from(input.selectedOptions).map(option=>option.value) : []
            }else if( columnName == "To" || columnName == "Cc" || columnName == "Bcc"){
                temp_object[`${columnName}`] = input.selectedOptions.length ? Array.from(input.selectedOptions).map(option=>parseInt(option.value)) : []
            }else if(isStrArrIntColFromName(columnName, genericEmailColumns)){
                temp_object[`${columnName}`] = input.value.trim() ? input.value.split(",").map(val=>parseInt(val.trim())) : []
            }else{
                temp_object[`${columnName}`] = isGroupColFromName(columnName, genericEmailColumns) || isPointColFromName(columnName, genericEmailColumns) ? +input.checked : parseInt(input.value) ? parseInt(input.value) : input.value 
            }
        })
        console.log('temp_object: ',temp_object)
    
        const index = genericEmailObjects.findIndex(obj=>obj['Email_ID']==entry_id)
        genericEmailObjects.splice(index,1,temp_object)
    
        refreshGenericEmailTable()

    }


}
