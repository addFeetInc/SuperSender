

//////////SETUP//////////

// Create DOM Links
function openPopup(){
    let popup = window.open('', '_blank', 'width=500,height=400,scrollbars=yes,resizable=yes');
    if(popup){
        popup.close()
        return popup

    }
}

function fillViewListWindow(lid){
    // const win = openPopup()
    // const newDiv = win.document.createElement('div')
    // const list = listFromID(lid)
    // console.log(list)
    // for (let pid of list['Result']){
    //     const person = personFromID(pid)
    //     const company = companyFromID(person['Company_ID'])
    //     const newRow = `<p>${person['Name']} (id: ${pid}), ${company['Name']}</p>`
    //     newDiv.innerHTML += newRow
    // }
    // win.document.body.appendChild(newDiv)
    fillPreviewModal('list-modal', 'list', lid)
}

function listFromID(lid){
    if(listObjects.find(obj=>obj['List_ID']==lid)){
        return listObjects.find(obj=>obj['List_ID']==lid)
    }else{
        
    }

}
function companyFromID(cid){
    return companyObjects.find(obj=>obj['Company_ID']==cid)
}

function personFromID(pid){
    const bin = Object.keys(companyStaffBins).find(key=>companyStaffBins[key].some(obj=>obj['Person_ID'] == pid))
    return companyStaffBins[bin].find(obj=>obj['Person_ID'] == pid)
}

//DOM Links: Banner
const showFileBtn = document.getElementById("show-file-tab");
const showPersonBtn = document.getElementById("show-person-tab");
const showCompanyBtn = document.getElementById("show-company-tab");
const showListBtn = document.getElementById("show-list-tab");
const showGenericEmailBtn = document.getElementById("show-generic-email-tab");
const showAllBtn = document.getElementById("show-all-tab");
const toggleColDataTypeVisBtn = document.getElementById("toggle-col-datatype-vis")

//DOM Links: File Tab
const fileTab = document.getElementById('file-tab');
const fileInput = document.getElementById('file-upload');
const loadButton = document.getElementById('load-file');
const fileSaveNameInput = document.getElementById('file-save-name');
const saveButton = document.getElementById('save-file');
const loadMemoryButton = document.getElementById('load-memory');
const clearMemoryButton = document.getElementById('clear-memory');
const outputElement = document.getElementById('output');

//DOM Links: Person Tab
const personTab = document.getElementById('person-tab');
const personHiddenColContainer = document.getElementById("person-hidden-column-container");
const personGridElement = document.getElementById('person-grid');

const initAddColBtn = document.getElementById("init-add-col-btn")
const addColContainer = document.getElementById("add-col-container")
const addColPersonInput = document.getElementById("add-column-person-input")
const addColPersonTypeSelect = document.getElementById("add-column-person-type-select")
const addColPersonBtn = document.getElementById("add-column-person-btn")

const initAddPerBtn = document.getElementById("init-add-per-btn")
const addPerContainer = document.getElementById("add-per-container")
const addPerPersonInputName = document.getElementById("add-per-person-input-name")
const addPerPersonSelectCompany = document.getElementById("add-per-person-select-company")
const addPerPersonInputEmail = document.getElementById("add-per-person-input-email")
const addPerPersonBtn = document.getElementById("add-per-person-btn")

const initDelColBtn = document.getElementById("init-del-col-btn")
const delColContainer = document.getElementById("del-col-container")
const delColPersonInput = document.getElementById("del-column-person-input")
const delColPersonBtn = document.getElementById("del-column-person-btn")

const initDelPerBtn = document.getElementById("init-del-per-btn")  
const delPerContainer = document.getElementById("del-per-container")
const delPerPersonInput = document.getElementById("del-per-person-input")
const delPerPersonBtn = document.getElementById("del-per-person-btn")



const editPerContainer = document.getElementById("edit-per-container")

//DOM Links: Company Tab
const companyTab = document.getElementById('company-tab');
const companyHiddenColContainer = document.getElementById("company-hidden-column-container");
const companyGridElement = document.getElementById('company-grid');

const initAddCompanyBtn = document.getElementById("init-add-company-btn")
const addCompanyContainer = document.getElementById("add-company-container")
const addCompanyInput = document.getElementById("add-company-input")
const addCompanyBtn = document.getElementById("add-company-btn")

const initDelCompanyBtn = document.getElementById("init-del-company-btn") 
const delCompanyContainer = document.getElementById("del-company-container")
const delCompanyInput = document.getElementById("del-company-input")
const delCompanyBtn = document.getElementById("del-company-btn")

const editCompanyContainer = document.getElementById("edit-company-container")

//DOM Links: List Tab
const listTab = document.getElementById('list-tab');
const listHiddenColContainer = document.getElementById("list-hidden-column-container");
const listGridElement = document.getElementById('list-grid');

const initAddListBtn = document.getElementById("init-add-list-btn")
const addListContainer = document.getElementById("add-list-container")
const addListInput = document.getElementById("add-list-input")
const addListBtn = document.getElementById("add-list-btn")

const initDelListBtn = document.getElementById("init-del-list-btn")
const delListContainer = document.getElementById("del-list-container")
const delListInput = document.getElementById("del-list-input")
const delListBtn = document.getElementById("del-list-btn")

const editListContainer = document.getElementById("edit-list-container")


//DOM Links: Generic Email Tab
const genericEmailTab = document.getElementById('generic-email-tab');
const genericEmailHiddenColContainer = document.getElementById("generic-email-hidden-column-container");
const genericEmailGridElement = document.getElementById('generic-email-grid');

const initAddGenericEmailBtn = document.getElementById("init-add-generic-email-btn")
const addGenericEmailContainer = document.getElementById("add-generic-email-container")
const addGenericEmailInput = document.getElementById("add-generic-email-input")
const addGenericEmailBtn = document.getElementById("add-generic-email-btn")

const initDelGenericEmailBtn = document.getElementById("init-del-generic-email-btn") 
const delGenericEmailContainer = document.getElementById("del-generic-email-container")
const delGenericEmailInput = document.getElementById("del-generic-email-input")
const delGenericEmailBtn = document.getElementById("del-generic-email-btn")

const editGenericEmailContainer = document.getElementById("edit-generic-email-container")


//DOM Links: Tailored Email Tab



// Initialize Arrays and Objects
let file_save_name = 'output'
let downloadEmailPath = ''

let personObjects = []
let companyObjects = []
let listObjects = []
let genericEmailObjects = []
let tailoredEmailObjects = []
let companyStaffBins = {}

let personColumns = []
let companyColumns = []
let listColumns = []
let genericEmailColumns = []
let tailoredEmailColumns = []

let columnDataTypeShown = false


let enableAutoSaveToLocal = false


fileSaveNameInput.value = file_save_name

// Setup Classes
class Column{
    constructor(column_name){
        this.hideColumn = false
        this.dataType = '_'
        this.name = cleanColumnName(column_name)

        if(isHidden(column_name)){
            this.hideColumn = true
        }

        if (isGroup(column_name)){
            this.dataType = '#'
        }else if(isPoint(column_name)){
            this.dataType = '!'
        }else if(isStringArrayOfIntegers(column_name)){
            this.dataType = '%'
        }else if(isStringArrayOfStrings(column_name)){
            this.dataType = '*'
        }else if(isInteger(column_name)){
            this.dataType = '&'
        // }else if(isEmailAddress(column_name)){
        //     this.datatype = '@'
        // }else if(isSerial(column_name)){
        //     this.datatype = '^'
        }
        
    }
}

// Initial UI Configuration
showAllTabs()


//// Initial Table Setup
//Person
for (let col of ['&Person_ID', 'Name', 'Email', '&Company_ID','#Not_on_Project']){
    personColumns.push(new Column(col))
}
companyStaffBins = {'0':[]}

//Company
for (let col of ['&Company_ID', 'Name']){
    companyColumns.push(new Column(col))
}
companyObjects.push({'Company_ID':0, 'Name':"UNASSIGNED"})

//Lists
for (let col of ['&List_ID', 'List_Name', '#Inclusive', '%Exceptions', '*Points', '*Groups', '%Persons', '%Lists', '%Result']){
    listColumns.push(new Column(col))
}

//Generic Email
for (let col of ['&Email_ID', 'Name', '%To','%Cc','%Bcc','Subject','Greeting','Body','Closing','Signature']){
    genericEmailColumns.push(new Column(col))
}

refreshCompanyTable()
enableAutoSaveToLocal = true


//////////LOCAL STORAGE//////////

function saveAllToLocal(){
    // localStorage.setItem('personObjects', JSON.stringify(personObjects))
    localStorage.setItem('companyObjects', JSON.stringify(companyObjects))
    localStorage.setItem('listObjects', JSON.stringify(listObjects))
    localStorage.setItem('genericEmailObjects', JSON.stringify(genericEmailObjects))
    localStorage.setItem('tailoredEmailObjects', JSON.stringify(tailoredEmailObjects))
    localStorage.setItem('companyStaffBins', JSON.stringify(companyStaffBins))
    
    localStorage.setItem('personColumns', JSON.stringify(personColumns))
    localStorage.setItem('companyColumns', JSON.stringify(companyColumns))
    localStorage.setItem('listColumns', JSON.stringify(listColumns))
    localStorage.setItem('genericEmailColumns', JSON.stringify(genericEmailColumns))
    localStorage.setItem('tailoredEmailColumns', JSON.stringify(tailoredEmailColumns))
    
    localStorage.setItem('columnDataTypeShown', JSON.stringify(columnDataTypeShown))


    console.log('items saved to Local Storage')
}

function loadAllFromLocal(){
    // personObjects = JSON.parse(localStorage.getItem('personObjects'))
    companyObjects = JSON.parse(localStorage.getItem('companyObjects'))
    listObjects = JSON.parse(localStorage.getItem('listObjects'))
    genericEmailObjects = JSON.parse(localStorage.getItem('genericEmailObjects'))
    tailoredEmailObjects = JSON.parse(localStorage.getItem('tailoredEmailObjects'))
    companyStaffBins = JSON.parse(localStorage.getItem('companyStaffBins'))
    
    personColumns = JSON.parse(localStorage.getItem('personColumns'))
    companyColumns = JSON.parse(localStorage.getItem('companyColumns'))
    listColumns = JSON.parse(localStorage.getItem('listColumns'))
    genericEmailColumns = JSON.parse(localStorage.getItem('genericEmailColumns'))
    tailoredEmailColumns = JSON.parse(localStorage.getItem('tailoredEmailColumns'))
    
    columnDataTypeShown = JSON.parse(localStorage.getItem('columnDataTypeShown'))

    refreshCompanyTable()
    console.log('items loaded from Local Storage')
}

function clearAllFromLocal(){
    localStorage.clear()
}


//////////FILE TAB FUNCTIONS//////////

////LOAD File
// note: utilize promise for data retrieval later on
function loadFile(){
    personObjects = []
    companyObjects = []
    listObjects = []
    companyStaffBins = {}
    genericEmailObjects = []
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select a file.");
        return;
    }
    const reader = new FileReader();
    reader.onload = function(event){
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const companySheet = workbook.Sheets[workbook.SheetNames[1]];
        const companySheetData = XLSX.utils.sheet_to_json(companySheet, { header: 1 });
        companyTableToObjects(companySheetData)
        const personSheet = workbook.Sheets[workbook.SheetNames[0]];
        const personSheetData = XLSX.utils.sheet_to_json(personSheet, { header: 1 });
        personTableToObjects(personSheetData)
        const listSheet = workbook.Sheets[workbook.SheetNames[2]];
        const listSheetData = XLSX.utils.sheet_to_json(listSheet, { header: 1 });
        listTableToObjects(listSheetData)
        const genericEmailSheet = workbook.Sheets[workbook.SheetNames[3]];
        const genericEmailSheetData = XLSX.utils.sheet_to_json(genericEmailSheet, { header: 1 });
        genericEmailTableToObjects(genericEmailSheetData)
        fillCompanyStaffBins()
        compileAllLists()
        console.log("Person Objects: ",personObjects)
        console.log("Company Objects: ",companyObjects)
        console.log("List Objects: ", listObjects)
        console.log("Company Staff Bins: ",companyStaffBins)
        console.log("Generic Email Objects: ",genericEmailObjects)
        buildPersonGrid()
        updatePersonGridFromCSBins()
        updatePersonHiddenColumnContainer()
        refreshCompanyTable()
        buildListGrid()
        updateListGridFromListObjects()
        buildGenericEmailGrid()
        showPersonTab()
        outputElement.innerHTML = `<p>File Load COMPLETE (${new Date()}): ${file.name}</p>`+outputElement.innerHTML;
    };
    
    reader.readAsArrayBuffer(file);
};

////SAVE File
function saveFile(){
    file_save_name = fileSaveNameInput.value

    //Prep Company Data
    let company_data = []
    for (let company of companyObjects){
        let modified_company = {}
        for (let key in company){
            const key_object = colObjectFromName(key,companyColumns)
            let modified_key = key_object['dataType'] != '_' ? key_object['dataType'] + key : key
            if(key_object.hideColumn){
                modified_key = '.'+modified_key
            }
            if(isIntegerColFromObject(key_object)){
                modified_company[modified_key] = parseInt(company[key])
            }else{
                modified_company[modified_key] = `${company[key]}`
            }
        }
        company_data.push(modified_company)
    }

    //Prep Person Data
    updateCSBinsFromPersonGrid()  // Redundant & Unecessary (ideally)
    let person_data = []
    for (let bin in companyStaffBins){
        for (let person of companyStaffBins[bin]){
            let modified_person = {}
            for (let key in person){
                const key_object = colObjectFromName(key,personColumns)
                let modified_key = key_object['dataType'] != '_' ? key_object['dataType'] + key : key
                if(key_object.hideColumn){
                    modified_key = '.'+modified_key
                }
                if(isIntegerColFromObject(key_object)){
                    modified_person[modified_key] = parseInt(person[key])
                }else{
                    modified_person[modified_key] = `${person[key]}`
                }
            }
            person_data.push(modified_person)
        }
    }

    //Prep List Data
    let list_data = []
    for (let list of listObjects){
        let modified_list = {}
        for (let key in list){
            const key_object = colObjectFromName(key,listColumns)
            let modified_key = key_object['dataType'] != '_' ? key_object['dataType'] + key : key
            if(key_object.hideColumn){
                modified_key = '.'+modified_key
            }
            if(isIntegerColFromObject(key_object)){
                modified_list[modified_key] = parseInt(list[key])
            }else{
                modified_list[modified_key] = `${list[key]}`
            }
        }
        list_data.push(modified_list)
    }
    console.log(list_data)

    //Prep Generic Email Data
    let generic_email_data = []
    for (let email of genericEmailObjects){
        let modified_email = {}
        for (let key in email){
            const key_object = colObjectFromName(key,genericEmailColumns)
            console.log('key: ', key)
            console.log('key_object: ', key_object)
            console.log('email: ', email)
            let modified_key = key_object['dataType'] != '_' ? key_object['dataType'] + key : key
            if(key_object.hideColumn){
                modified_key = '.'+modified_key
            }
            if(isIntegerColFromObject(key_object)){
                modified_email[modified_key] = parseInt(email[key])
            }else{
                modified_email[modified_key] = `${email[key]}`
            }
        }
        generic_email_data.push(modified_email)
    }   
    
    const person_ws = XLSX.utils.json_to_sheet(person_data); // Create person sheet
    const company_ws = XLSX.utils.json_to_sheet(company_data); // Create company sheet
    const list_ws = XLSX.utils.json_to_sheet(list_data); // Create list sheet
    const generic_email_ws = XLSX.utils.json_to_sheet(generic_email_data); // Create generic email sheet

    const wb = XLSX.utils.book_new();  // Create workbook
    XLSX.utils.book_append_sheet(wb, person_ws, 'Person Table');  // Append person sheet to workbook
    XLSX.utils.book_append_sheet(wb, company_ws, 'Company Table');  // Append company sheet to workbook
    XLSX.utils.book_append_sheet(wb, list_ws, 'List Table');  // Append list sheet to workbook
    XLSX.utils.book_append_sheet(wb, generic_email_ws, 'Generic Email Table');  // Append generic Email sheet to workbook
    XLSX.writeFile(wb, `${file_save_name}.xlsx`);  // Write to file

    outputElement.innerHTML = `<p>File Save Dialog Opened [Browser not capable of determining if save operation was success/failure]  (${new Date()}): ${file_save_name}.xlsx</p>`+outputElement.innerHTML;
}


////TRANSFORM Data into Objects
function reformatData(raw, col){
    if (isPointOrGroup(col)){
        if (raw && ( raw === 1 || raw ==='1')){
            return Number(true)
        }else{
            return Number(false)
        }
    }else if(isStringArrayOfIntegers(col)){
        if (raw){
            return parseArrayOfIntegers(raw)
        }else{
            return []
        }
    }else if(isStringArrayOfStrings(col)){
        if(raw){
            return parseArrayOfStrings(raw)
        }else{
            return []
        }
    }else if(isInteger(col)){
        if(raw){
            return parseInt(raw)
        }else{
            return 0
        }
    }else{
        if (raw){
            return raw
        }else{
            return ""
        }
    }
}

function personTableToObjects(input){
    personObjects = []
    personColumns = []
    for (let x=0; x<input[0].length; x++){
        personColumns.push(new Column(input[0][x]))
    }
    console.log(personColumns)
    for (let y=0; y<input.length; y++){
        if (y==0){
            continue;
        }
        let temp_object = {}
        for (let x=0; x<input[0].length; x++){
            temp_object[`${cleanColumnName(input[0][x])}`] = reformatData(input[y][x], input[0][x])
        }
        personObjects.push(temp_object)
    }
}

function companyTableToObjects(input){
    companyObjects = []
    companyColumns = []
    companyObjects.push({'Company_ID':0, 'Name':"UNASSIGNED"})

    for (let x=0; x<input[0].length; x++){
        companyColumns.push(new Column(input[0][x]))
    }
    for (let y=0; y<input.length; y++){
        if (y==0){
            continue;
        }
        let temp_object = {}
        for (let x=0; x<input[0].length; x++){
            temp_object[`${cleanColumnName(input[0][x])}`] = reformatData(input[y][x], input[0][x])
        }
        console.log('temp_object: ', temp_object)
        if(temp_object['Company_ID'] == 0 || temp_object['Company_ID'] == '0'){
        }else{
            companyObjects.push(temp_object)
        }
        // companyObjects.push(temp_object)
    }
}

function sortCompanyObjects(){
    companyObjects.sort((a,b)=>a.Company_ID-b.Company_ID)
}

function fillCompanyStaffBins(){
    companyStaffBins = {}
    for (let company of companyObjects){
        companyStaffBins[`${company['Company_ID']}`] = []
    }
    for (let person of personObjects){
        if (person['Company_ID'] && companyObjects.some(obj=>obj['Company_ID']==person['Company_ID'])){
            companyStaffBins[`${person['Company_ID']}`].push(person)
        }
        else{
            person['Company_ID'] = 0
            companyStaffBins['0'].push(person)
        }
    }   
}

function sortBins(){
    for (let bin in companyStaffBins){
        for (let person of companyStaffBins[bin]){
            if(`${person['Company_ID']}` === bin){

            }else{
                const pid = person['Person_ID']
                companyStaffBins[`${person['Company_ID']}`].push(person)
                companyStaffBins[bin] = companyStaffBins[bin].filter(obj=>obj['Person_ID']!=pid)
            }
        }
    }
    for (let bin in companyStaffBins){
        companyStaffBins[bin].sort((a,b)=>a.Person_ID-b.Person_ID)
    } 
}

function listTableToObjects(input){
    listObjects = []
    listColumns = []
    for (let x=0; x<input[0].length; x++){
        listColumns.push(new Column(input[0][x]))
    }
    for (let y=0; y<input.length; y++){
        if (y==0){
            continue;
        }
        let temp_object = {}
        for (let x=0; x<input[0].length; x++){
            temp_object[`${cleanColumnName(input[0][x])}`] = reformatData(input[y][x], input[0][x])
        }
        listObjects.push(temp_object)
    }
    removeDNEExceptionsFromAllLists()
}

function genericEmailTableToObjects(input){
    genericEmailObjects = []
    genericEmailColumns = []
    for (let x=0; x<input[0].length; x++){
        genericEmailColumns.push(new Column(input[0][x]))
    }
    for (let y=0; y<input.length; y++){
        if (y==0){
            continue;
        }
        let temp_object = {}
        for (let x=0; x<input[0].length; x++){
            temp_object[`${cleanColumnName(input[0][x])}`] = reformatData(input[y][x], input[0][x])
        }
        genericEmailObjects.push(temp_object)
    }
}


//////////PERSON TAB FUNCTIONS//////////

////REFRESH
function refreshPersonTable(){
    buildPersonGrid()
    updatePersonGridFromCSBins()
    updatePersonHiddenColumnContainer()

    refreshListTable()


}

////ADD & DELETE Columns
function addPersonTableColumn(name, type='str',default_all=false){
    //Title the column
    const columnName = cleanColumnName(name)

    if (columnName.toLowerCase()=='person_id' || columnName.toLowerCase()=='name' || columnName.toLowerCase()=='company' || columnName.toLowerCase()=='not_on_project'){
        alert('INVALID OPERATION: Cannot add column with any of the following names: Person_ID, Name, Company, Not_on_Project')
        return
    }
    personColumns.push(new Column(name))
    console.log(personColumns)
    


    //Boolean
    let isBool = false
    if (isPointOrGroupColFromName(columnName,personColumns)){isBool=true}

    //Default value
    let default_value
    if (isBool){
        if (default_all == true){
            default_value = true
        }else{
            default_value = false
        }
    }else{
        // alert('Column must start with # or !')
        // return
        if (isStringColFromName(columnName,personColumns)){
            default_value = ''
        } else {
            default_value = 0
        }
    }
    
    //Add the property to every person object
    for (let bin in companyStaffBins){
        for (let person of companyStaffBins[bin]){
            person[columnName] = default_value
        }
    }
    refreshPersonTable()
}

function deletePersonTableColumn(name){
    const columnName = cleanColumnName(name)
    if (columnName.toLowerCase()=='person_id' || columnName.toLowerCase()=='name' || columnName.toLowerCase()=='company' || columnName.toLowerCase()=='not_on_project'){
        alert('INVALID OPERATION: Cannot add column with any of the following names: Person_ID, Name, Company, Not_on_Project')
        return
    }
    personColumns = personColumns.filter(obj=>obj.name!=columnName)

    //Delete the property to every person object
    for (let bin in companyStaffBins){
        for (let person of companyStaffBins[bin]){
            delete person[columnName]
        }
    }
    refreshPersonTable()
}

////HIDE & SHOW Columns
function makePersonColumnHidden(colName){
    colObjectFromName(colName,personColumns).hideColumn = true
    refreshPersonTable()
}

function makePersonColumnShown(colName){
    colObjectFromName(colName,personColumns).hideColumn = false
    refreshPersonTable()
}

function updatePersonHiddenColumnContainer(){
    personHiddenColContainer.innerHTML = 'Hidden Columns: '
    let hiddenColumns = personColumns.filter(obj => obj.hideColumn==true).map(obj=>obj.name)
    for (let x of hiddenColumns){
        personHiddenColContainer.innerHTML += `<button onclick="makePersonColumnShown('${x}')">${x}</button>`
    }
}

////ADD & DELETE Persons
function addPerson(name, cid, email_address){
    let new_object = {}
    const allColumns = personColumns.map(col=>col.name)
    console.log('all columns:',allColumns[1])

    if(!name){alert('Please enter NAME'); return}
    if(!email_address){alert('Please enter EMAIL ADDRESS'); return}
    if(!isValidEmail(email_address)){alert('Please enter VALID email address'); return}
    
    new_object['Person_ID'] = findNextPersonIDNumber()
    new_object['Name'] = name
    new_object['Company_ID'] = parseInt(cid) ? parseInt(cid) : 0
    new_object['Email'] = email_address

    for (let columns_subset of [personColumns.filter(obj=>!isPointOrGroupColFromObject(obj)), personColumns.filter(obj=>isPointOrGroupColFromObject(obj))]){
        for (let col_obj of columns_subset){
            if(col_obj.name=='Name' || col_obj.name=='Person_ID' || col_obj.name=='Company_ID' || col_obj.name=='Email'){
            }else if(isPointOrGroupColFromObject(col_obj)){
                new_object[col_obj.name] = false
            }else if(isStrArrIntColFromObject(col_obj)){
                new_object[col_obj.name] = []
            }else if(isStrArrStrColFromObject(col_obj)){
                new_object[col_obj.name] = []
            }else if(isIntegerColFromObject(col_obj)){
                new_object[col_obj.name] = 0
            }else{
                new_object[col_obj.name] = ""
            }
        }
    }


    console.log(new_object)
    companyStaffBins[cid ? cid : '0'].push(new_object)
    sortBins()
    refreshPersonTable()
}

function findNextPersonIDNumber(){
    let nextNumber = 0
    for (let bin in companyStaffBins){
        for (let person of companyStaffBins[bin]){
            thisNumber = parseInt(person['Person_ID'])
            if (thisNumber>=nextNumber){
                nextNumber=thisNumber+1
            }
        }
    }
    return nextNumber
}

function deletePerson(pid){
    for (let bin in companyStaffBins){
        if(companyStaffBins[bin].some(obj=>obj['Person_ID']==pid)){
            companyStaffBins[bin] = companyStaffBins[bin].filter(obj=>obj['Person_ID']!=pid)
        }
    }
    refreshPersonTable()
}

function fillCompanySelectOptions(){
    addPerPersonSelectCompany.innerHTML=''
    for (let company of companyObjects){
        const newOption = document.createElement('option')
        newOption.value = parseInt(`${company['Company_ID']}`.trim())
        newOption.textContent = `${company['Name']} (ID: ${company['Company_ID']})`
        addPerPersonSelectCompany.appendChild(newOption)
        console.log('Company: ', company)
        console.log('new-option value: ', newOption.value, typeof newOption.value)
    }
    for (let opt of addPerPersonSelectCompany.options){
        if(opt.value == '0'){
            opt.setAttribute('selected', 'selected')
        }
    }
}

////EDITING Persons
function openEditPerContainer(pid){
    fillEditEntryModal('person-modal', 'person', pid)
}


////BUILDING Person Grid

function buildPersonGrid(){
    for (let child of personGridElement.children){
        child.innerHTML = ''
    }
    // Setup columns
    let checkColumnObjects = personColumns.filter(obj=>isPointOrGroupColFromObject(obj))
    let infoColumnObjects = personColumns.filter(obj=>!isPointOrGroupColFromObject(obj))
    let checkColumns = personColumns.filter(obj=>isPointOrGroupColFromObject(obj)).map(obj=>obj.name)
    let infoColumns = personColumns.filter(obj=>!isPointOrGroupColFromObject(obj)).map(obj=>obj.name)
    console.log("buildPersonGrid -> Check Columns: ",checkColumns)

    personGridElement.children[0].appendChild(createHeaderRow([...infoColumnObjects, ...checkColumnObjects], 'person'))

    for (let bin in companyStaffBins){
        for (let person of companyStaffBins[bin]){
            const newRow = createRow(person, 'Person_ID', 'Name', [...infoColumnObjects, ...checkColumnObjects], 'person')
            personGridElement.children[1].appendChild(newRow)
        }
    }
    
}

////UPDATE Grid & Objects
function updateCSBinsFromPersonGrid(){
    for (let bin in companyStaffBins){
        for (let person of companyStaffBins[bin]){
            for (let x in person){
                if (isGroupColFromName(x,personColumns)||isPointColFromName(x,personColumns)){
                    person[x] = +document.querySelector(`[data-table="person"][data-row="${person['Person_ID']}"][data-column="${x}"] input[type="checkbox"]`).checked
                }
            }
        }
    }
    console.log("updateCSBinsFromPersonGrid -> Company Staff Bins: ", companyStaffBins)
}

function updatePersonGridFromCSBins(){
    for (let bin in companyStaffBins){
        for (let person of companyStaffBins[bin]){
            for (let x in person){
                // console.log("Check: ", x, person)
                if (isGroupColFromName(x,personColumns)||isPointColFromName(x,personColumns)){
                    document.querySelector(`[data-table="person"][data-row="${person['Person_ID']}"][data-column="${x}"] input[type="checkbox"]`).checked = Boolean(person[x])
                }
            }
        }
    }
    console.log("updatePersonGridFromCSBins -> Company Staff Bins: ", companyStaffBins)
}




//////////COMPANY TAB FUNCTIONS//////////

////REFRESH
function refreshCompanyTable(){
    fillCompanySelectOptions()
    sortCompanyObjects()
    buildCompanyGrid()
    updateCompanyGridFromCompanyObjects()
    updateCompanyHiddenColumnContainer()

    refreshPersonTable()
}

////HIDE & SHOW Columns
function makeCompanyColumnHidden(colName){
    colObjectFromName(colName,companyColumns).hideColumn = true
    refreshCompanyTable()
}

function makeCompanyColumnShown(colName){
    colObjectFromName(colName,companyColumns).hideColumn = false
    refreshCompanyTable()
}

function updateCompanyHiddenColumnContainer(){
    companyHiddenColContainer.innerHTML = 'Hidden Columns: '
    let hiddenColumns = companyColumns.filter(obj => obj.hideColumn==true).map(obj=>obj.name)
    for (let x of hiddenColumns){
        companyHiddenColContainer.innerHTML += `<button onclick="makeCompanyColumnShown('${x}')">${x}</button>`
    }
}

////ADD & DELETE Companies

function addCompany(name){
    let new_object = {}  
    for (let col_obj of companyColumns){
        if(col_obj.name=='Company Name' || col_obj.name=='Company_ID'){
        }else if(isPointOrGroupColFromObject(col_obj)){
            new_object[col_obj.name] = false
        }else if(isStrArrIntColFromObject(col_obj)){
            new_object[col_obj.name] = []
        }else if(isStrArrStrColFromObject(col_obj)){
            new_object[col_obj.name] = []
        }else if(isIntegerColFromObject(col_obj)){
            new_object[col_obj.name] = 0
        }else{
            new_object[col_obj.name] = ""
        }
    }

    new_object['Company_ID'] = findNextCompanyIDNumber()
    new_object['Name'] = name
    console.log(new_object)
    companyObjects.push(new_object)
    companyStaffBins[new_object['Company_ID']] = []
    
    refreshCompanyTable()
}

function findNextCompanyIDNumber(){
    for(let a=1; companyObjects.length+2; a++){
        let lock = true
        for (let company of companyObjects){
            const c = parseInt(company['Company_ID'])
            if (c==a){
                lock = false
                break
            }
        }
        if(lock){
            return a
        }
    }
    return 0
}

function deleteCompany(cid){
    companyObjects = companyObjects.filter(obj=>obj['Company_ID']!=cid)
    reassignCompanyIfDNEForSpecific(cid, 0)
    sortBins()
    delete companyStaffBins[cid]
    removeDNEExceptionsFromAllLists()
    refreshCompanyTable()
}

////EDITING Company

function openEditCompanyContainer(cid){
    fillEditEntryModal('company-modal', 'company', cid)
}

function applyEditCompanyContainer(){
    const cid = parseInt(editCompanyContainer.querySelector("#edit-cid").textContent)
    console.log(cid)
    let temp_object = {"Company_ID": cid }
    const inputs = editCompanyContainer.querySelectorAll('select, input')
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

    const index = companyObjects.findIndex(obj=>obj['Company_ID']==cid)
    companyObjects.splice(index,1,temp_object)

    refreshCompanyTable()
}


////BUILD Company Grid
function buildCompanyGrid(){
    for (let child of companyGridElement.children){
        child.innerHTML = ''
    }
    // Setup columns
    let columns = companyColumns.map(obj=>obj.name)
    let checkColumns = companyColumns.filter(obj=>isPointOrGroupColFromObject(obj)).map(obj=>obj.name)
    let arrayIntColumns = companyColumns.filter(obj=>isStrArrIntColFromObject(obj)).map(obj=>obj.name)
    let arrayStrColumns = companyColumns.filter(obj=>isStrArrStrColFromObject(obj)).map(obj=>obj.name)
    let infoColumns = companyColumns.filter(obj=>!isPointOrGroupColFromObject(obj)&&!isStrArrIntColFromObject(obj)&&!isStrArrStrColFromObject(obj)).map(obj=>obj.name)

    console.log("buildCompanyGrid -> Check Columns: ",checkColumns)
    console.log("buildCompanyGrid -> Array Int Columns: ",arrayIntColumns)
    console.log("buildCompanyGrid -> Array Str Columns: ",arrayStrColumns)
    console.log("buildCompanyGrid -> Info Columns: ",infoColumns)

    companyGridElement.children[0].appendChild(createHeaderRow(companyColumns, 'company'))

    for (let company of companyObjects){
        const newRow = createRow(company, 'Company_ID', 'Name', companyColumns, 'company')
        console.log(companyGridElement.children)
        companyGridElement.children[1].appendChild(newRow)
    }
}

////UPDATE Grid & Objects
function updateCompanyObjectsFromCompanyGrid(){
    for (let company of companyObjects){
        for (let x in company){
            if (isPointOrGroupColFromName(x,companyColumns)){
                company[x] = +document.querySelector(`[data-table="company"][data-row="${company['Company_ID']}"][data-column="${x}"] input[type="checkbox"]`).checked
            }
        }
    }
    console.log(companyObjects)
}

function updateCompanyGridFromCompanyObjects(){
    for (let company of companyObjects){
        for (let x in company){
            if (isPointOrGroupColFromName(x,companyColumns)){
                document.querySelector(`[data-table="company"][data-row="${company['Company_ID']}"][data-column="${x}"] input[type="checkbox"]`).checked = Boolean(company[x])
            }
        }
    }
}


////HANDLE Persons with DNE Companies

function assignCompanyOfPerson(pid, cid){
    for (let bin in companyStaffBins){
        for(let person of companyStaffBins[bin]){
            if(person['Person_ID'] == pid){
                person['Company_ID'] = cid
                return
            }
        }
    }
}

function hasExistingCompany(pid){
    let cid
    for (let bin in companyStaffBins){
        for (let person of companyStaffBins[bin]){
            if(person['Person_ID'] == pid){
                cid = person['Company_ID']
                break
            }
        }
        if(cid || cid==0){
            break
        }
    }
    return companyObjects.some(obj=>obj['Company_ID']==cid)
}

function reassignCompanyIfDNE(pid, alternate_cid){
    if (hasExistingCompany(pid)){
    }else{
        assignCompanyOfPerson(pid, alternate_cid)
    }
}

function reassignCompanyIfDNEForSpecific(current_cid, alternate_cid){
    for (let bin in companyStaffBins){
        for (let person of companyStaffBins[bin]){
            if(person['Company_ID'] == current_cid){
                reassignCompanyIfDNE(person['Person_ID'], alternate_cid)
            }
        }
    }
}

function reassignCompanyIfDNEForAll(alternate_cid){
    for (let bin in companyStaffBins){
        for (let person of companyStaffBins[bin]){
            reassignCompanyIfDNE(person['Person_ID'], alternate_cid)
        }
    }
}


////HANDLE List with DNE Companies as Exceptions

function removeDNEExceptionsFromList(lid){
    for (let list of listObjects){
        if(list['List_ID'] == lid){
            list['Exceptions'] = list['Exceptions'].filter(val=>companyObjects.some(obj=>obj['Company_ID']==val))
            return
        }
    }
}

function removeDNEExceptionsFromAllLists(){
    for (let list of listObjects){
        console.log(list)
        if (list['Exceptions'].length){
            list['Exceptions'] = list['Exceptions'].filter(val=>companyObjects.some(obj=>obj['Company_ID']==val))
        }
        
    }
}


//////////LIST TAB FUNCTIONS//////////

////REFRESH
function refreshListTable(){
    compileAllLists()
    buildListGrid()
    updateListGridFromListObjects()
    updateListHiddenColumnContainer()
    
    refreshGenericEmailTable()
}

////HIDE & SHOW Columns
function makeListColumnHidden(colName){
    colObjectFromName(colName,listColumns).hideColumn = true
    refreshListTable()
}

function makeListColumnShown(colName){
    colObjectFromName(colName,listColumns).hideColumn = false
    refreshListTable()
}

function updateListHiddenColumnContainer(){
    listHiddenColContainer.innerHTML = 'Hidden Columns: '
    let hiddenColumns = listColumns.filter(obj => obj.hideColumn==true).map(obj=>obj.name)
    for (let x of hiddenColumns){
        listHiddenColContainer.innerHTML += `<button onclick="makeListColumnShown('${x}')">${x}</button>`
    }
}

////ADD & DELETE Lists

function addList(name){
    let new_object = {}  
    for (let col_obj of listColumns){
        if(col_obj.name=='List_Name' || col_obj.name=='List_ID'){
        }else if(isPointOrGroupColFromObject(col_obj)){
            new_object[col_obj.name] = false
        }else if(isStrArrIntColFromObject(col_obj)){
            new_object[col_obj.name] = []
        }else if(isStrArrStrColFromObject(col_obj)){
            new_object[col_obj.name] = []
        }else if(isIntegerColFromObject(col_obj)){
            new_object[col_obj.name] = 0
        }else{
            new_object[col_obj.name] = ""
        }

    }

    new_object['List_ID'] = findNextListIDNumber()
    new_object['List_Name'] = name
    console.log(new_object)
    listObjects.push(new_object)
    
    refreshListTable()
}

function findNextListIDNumber(){
    let nextNumber = 0
    for (let list of listObjects){
        thisNumber = parseInt(list['List_ID'])
        if (thisNumber>=nextNumber){
            nextNumber=thisNumber+1
        }
    }
    return nextNumber
}

function deleteList(lid){
    listObjects = listObjects.filter(obj=>obj['List_ID']!=lid)

    refreshListTable()
}

////EDITING List

function openEditListContainer(lid){
    // fillEditListContainer(lid)
    // showEditListContainer()
    fillEditEntryModal('list-modal', 'list', lid)
}

////BUILD List Grid
function buildListGrid(){
    for (let child of listGridElement.children){
        child.innerHTML = ''
    }
    // Setup columns
    let columns = listColumns.map(obj=>obj.name)
    let checkColumns = listColumns.filter(obj=>isPointOrGroupColFromObject(obj)).map(obj=>obj.name)
    let arrayIntColumns = listColumns.filter(obj=>isStrArrIntColFromObject(obj)).map(obj=>obj.name)
    let arrayStrColumns = listColumns.filter(obj=>isStrArrStrColFromObject(obj)).map(obj=>obj.name)
    let infoColumns = listColumns.filter(obj=>!isPointOrGroupColFromObject(obj)&&!isStrArrIntColFromObject(obj)&&!isStrArrStrColFromObject(obj)).map(obj=>obj.name)

    console.log("buildListGrid -> Check Columns: ",checkColumns)
    console.log("buildListGrid -> Array Int Columns: ",arrayIntColumns)
    console.log("buildListGrid -> Array Str Columns: ",arrayStrColumns)
    console.log("buildListGrid -> Info Columns: ",infoColumns)

    listGridElement.children[0].appendChild(createHeaderRow(listColumns, 'list'))

    for (let list of listObjects){
        const newRow = createRow(list, 'List_ID', 'List_Name', listColumns, 'list')
        listGridElement.children[1].appendChild(newRow)
    }
}

////UPDATE Grid & Objects
function updateListObjectsFromListGrid(){
    for (let list of listObjects){
        for (let x in list){
            if (isPointOrGroupColFromName(x,listColumns)){
                list[x] = +document.querySelector(`[data-table="list"][data-row="${list['List_ID']}"][data-column="${x}"] input[type="checkbox"]`).checked
            }
        }
    }
    console.log(listObjects)
}

function updateListGridFromListObjects(){
    for (let list of listObjects){
        for (let x in list){
            if (isPointOrGroupColFromName(x,listColumns)){
                document.querySelector(`[data-table="list"][data-row="${list['List_ID']}"][data-column="${x}"] input[type="checkbox"]`).checked = Boolean(list[x])
            }
        }
    }
}

////COMPILATION
function compileAllLists(){
    for (let list of listObjects){
        const lid = list['List_ID']
        compileList(lid)
    }
}

function compileList(lid){
    // Find list
    const list = listObjects.find(item => item['List_ID'] == lid)
    console.log('lid: ', lid)
    console.log('list contents: ', list)
    let result = []

    // Inclusive & Exception Check
    const inclusive = Boolean(list['Inclusive'])
    const exceptions = list['Exceptions']
    console.log("inclusive:", inclusive)
    console.log("exceptions:", exceptions)
    
    // Setup Points, Groups, Individuals, Other Lists
    const points = list['Points']
    console.log('points: ',points)
    const groups = list['Groups']
    console.log('groups: ',groups)
    const individuals = list['Persons']
    console.log('individuals: ',individuals)
    const otherlists = list['Lists']
    console.log('otherlists: ',otherlists)
    
    // Filter Companies (for Inclusive & Exceptions)
    let companies
    if(inclusive){
        companies = companyObjects.map(company=>company['Company_ID']).filter(val=>!exceptions.includes(val))
    }else{
        companies = companyObjects.map(company=>company['Company_ID']).filter(val=>exceptions.includes(val))
    }
    console.log("companies: ",companies)

    // Compile the list
    // Company
    for (let company of companies){
        console.log('company_id: ',company)
        let bus = []
        //Person
        for (let person of companyStaffBins[company]){
            // console.log('person: ', person)
            const pid = person['Person_ID']
            let include = false
            //Point Check
            for (let point of points){
                if(person[point]){
                    console.log('pass: ',point, pid)
                    include = true
                }
            }
            //Group Check
            for (let group of groups){
                if(person[group]){
                    console.log('pass: ',group, pid)
                    include = true
                }
            }
            //Individuals Check
            for (let individual of individuals){
                if(individual == pid){
                    console.log('pass: ',individual, pid)
                    include = true
                }
            }
            //Other Lists Check
            for (let otherlist of otherlists){
                const otherlistObject = listObjects.find(obj => obj['List_ID']==otherlist)
                if (otherlistObject && lid>otherlist){
                    console.log(otherlistObject)
                    if(otherlistObject['Result'].includes(pid)){
                        console.log('pass: List#',otherlist, pid)
                        include = true
                    }
                }else{}
            }
            console.log('include: ', include)
            if(person['Not_on_Project']){
                include = false
            }
            if(include){
                bus.push(pid)
            }
            console.log('bus: ',bus, 'pid: ', pid, 'include: ', include)
        }
        result.push(...bus)
        console.log('bus:',bus)
    }
    result = [...new Set(result)]
    console.log(`List ${lid}: `, result)
    list['Result'] = result
}

function isPersonInCompany(pid, cid){
    return companyStaffBins[cid].some(person=>person['Person_ID']==pid)
}



//////////GENERIC EMAIL TAB FUNCTIONS//////////

////REFRESH
function refreshGenericEmailTable(){
    buildGenericEmailGrid()
    updateGenericEmailHiddenColumnContainer()
    if(enableAutoSaveToLocal){
        saveAllToLocal()
    }
}

////HIDE & SHOW Columns
function makeGenericEmailColumnHidden(colName){
    colObjectFromName(colName,genericEmailColumns).hideColumn = true
    refreshGenericEmailTable()
}

function makeGenericEmailColumnShown(colName){
    colObjectFromName(colName,genericEmailColumns).hideColumn = false
    refreshGenericEmailTable()
}

function updateGenericEmailHiddenColumnContainer(){
    genericEmailHiddenColContainer.innerHTML = 'Hidden Columns: '
    let hiddenColumns = genericEmailColumns.filter(obj => obj.hideColumn==true).map(obj=>obj.name)
    for (let x of hiddenColumns){
        genericEmailHiddenColContainer.innerHTML += `<button onclick="makeGenericEmailColumnShown('${x}')">${x}</button>`
    }
}

////ADD & DELETE Generic Emails
function addGenericEmail(name){
    let new_object = {}
    for (let col_obj of genericEmailColumns){
        if(col_obj.name=='Email Name' || col_obj.name=='Email_ID'){
        }else if(isPointOrGroupColFromObject(col_obj)){
            new_object[col_obj.name] = Nummber(false)
        }else if(isStrArrIntColFromObject(col_obj)){
            new_object[col_obj.name] = []
        }else if(isStrArrStrColFromObject(col_obj)){
            new_object[col_obj.name] = []
        }else if(isIntegerColFromObject(col_obj)){
            new_object[col_obj.name] = 0
        }else{
            new_object[col_obj.name] = ""
        }

    }

    new_object['Email_ID'] = findNextGenericEmailIDNumber()
    new_object['Email_Name'] = name
    console.log(new_object)
    genericEmailObjects.push(new_object)

    buildGenericEmailGrid()
}

function findNextGenericEmailIDNumber(){
    let nextNumber = 0
    for (let email of genericEmailObjects){
        thisNumber = parseInt(email['Email_ID'])
        if (thisNumber>=nextNumber){
            nextNumber=thisNumber+1
        }
    }
    return nextNumber
}

function deleteGenericEmail(eid){
    genericEmailObjects = genericEmailObjects.filter(obj=>obj['Email_ID']!=eid)

    buildGenericEmailGrid()
}

////EDITING Generic Email
function openEditGenericEmailContainer(eid){
    fillEditEntryModal('generic-email-modal', 'generic_email', eid)
}

////BUILD Generic Email Grid

function buildGenericEmailGrid(){
    console.log('genericEmailObjects: ',genericEmailObjects)
    for (let child of genericEmailGridElement.children){
        child.innerHTML = ''
    }
    
    genericEmailGridElement.children[0].appendChild(createHeaderRow(genericEmailColumns, 'generic_email'))

    for (let email of genericEmailObjects){
        const newRow = createRow(email, 'Email_ID', 'Email_Name', genericEmailColumns, 'generic_email')
        genericEmailGridElement.children[1].appendChild(newRow)
    }
}

////COMPILE Email


function copyListToClipboard(lid){
    const textToCopy = arrayOfEmailAddressesFromPersonIDs(listFromID(lid)['Result']).join('; ')
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log("Text copied to clipboard!");
        })
        .catch(err => {
            console.error("Failed to copy: ", err);
        });
}

function combineMailingLists(array_of_lids){
    let combined_list  = []
    for (let lid of array_of_lids){
        const list_object = listFromID(lid)
        const list_result = list_object['Result']
        combined_list.push(...list_result)
    }
    combined_list = Array.from(new Set(combined_list))
    return combined_list
}

function excludeRecipientsFromLists(target_array_of_pids, exclusion_array_of_pids){
    console.log(target_array_of_pids)
    console.log(exclusion_array_of_pids)
    return target_array_of_pids.filter(pid => !exclusion_array_of_pids.includes(pid))
}

function compileGenericEmail(eid){
    const email_object = genericEmailObjects.find(obj=>obj['Email_ID']==eid)
    const to = email_object['To']
    const cc = email_object['Cc']
    const bcc = email_object['Bcc']
    const subject = email_object['Subject']
    const greeting = email_object['Greeting']
    const body = email_object['Body']
    const closing = email_object['Closing']
    const signature = email_object['Signature']

    const headers = [
        `To: ${arrayOfEmailAddressesFromPersonIDs(combineMailingLists(to)).join('; ')}`,
        `Cc: ${arrayOfEmailAddressesFromPersonIDs(excludeRecipientsFromLists(combineMailingLists(cc), combineMailingLists(to))).join(';')}`,
        `Bcc: ${arrayOfEmailAddressesFromPersonIDs(excludeRecipientsFromLists(combineMailingLists(bcc), combineMailingLists(to))).join(';')}`,
        `Subject: ${subject}`,
        "MIME-Version: 1.0",
        "Content-Type: text/plain; charset=UTF-8"
    ]
    const message = greeting+'\r\n'+body+'\r\n'+closing+'\n'+signature

    // Combine the headers and message into one string
    const emailContent = headers.join("\r\n") + "\r\n\r\n" + message
    return emailContent
}

function previewGenericEmail(eid){
    // const emailContent = compileGenericEmail(eid)
    // const win = openPopup()
    // const newDiv = win.document.createElement('div')
    // newDiv.innerHTML = emailContent.replace(/\n/g,'<br>')
    // win.document.body.appendChild(newDiv) 
    fillPreviewModal('generic-email-modal','generic_email', eid)

}

function downloadGenericEmailFile(eid){
    const emailContent = compileGenericEmail(eid)
    // Create a Blob and generate a download link
    const blob = new Blob([emailContent], { type: "message/rfc822" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const email_object = genericEmailObjects.find(obj=>obj['Email_ID']==eid)
    const timestamp = new Date()

    link.download = `Gen_${email_object['Email_ID'].toString().padStart(4, '0') + "_" + email_object['Email_Name'] + "_" + timestamp.toISOString()}.eml`; // The file name
    // Trigger the download
    link.click();
}

function emailAddressFromPersonID(pid){
    const person = personFromID(pid)
    return person['Email']
}

function arrayOfEmailAddressesFromPersonIDs(array_of_pids){
    return array_of_pids.map(val => emailAddressFromPersonID(val))
}

//Fix Top Margin on Mobile Version
function isMobileBrowser() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }
  
  function setRealVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    if (isMobileBrowser()) {
      setRealVh(); // Run on initial load
      window.addEventListener('resize', setRealVh); // Run on resize
    }
});

//////////EVENT LISTENERS//////////
loadButton.addEventListener('click',loadFile)
saveButton.addEventListener('click',saveFile)

loadMemoryButton.addEventListener('click',loadAllFromLocal)
clearMemoryButton.addEventListener('click',clearAllFromLocal)

showFileBtn.addEventListener('click', showFileTab)
showPersonBtn.addEventListener('click', showPersonTab)
showCompanyBtn.addEventListener('click', showCompanyTab)
showListBtn.addEventListener('click', showListTab)
showGenericEmailBtn.addEventListener('click', showGenericEmailTab)
showAllBtn.addEventListener('click', showAllTabs)

initAddColBtn.addEventListener('click', showAddColContainer)
addColPersonBtn.addEventListener('click', ()=>addPersonTableColumn(addColPersonTypeSelect.value+addColPersonInput.value))
initAddPerBtn.addEventListener('click', showAddPerContainer)
addPerPersonBtn.addEventListener('click', ()=>addPerson(addPerPersonInputName.value, addPerPersonSelectCompany.value, addPerPersonInputEmail.value))
initDelColBtn.addEventListener('click', showDelColContainer)
delColPersonBtn.addEventListener('click', ()=>deletePersonTableColumn(delColPersonInput.value))
initDelPerBtn.addEventListener('click', showDelPerContainer)
delPerPersonBtn.addEventListener('click', ()=>deletePerson(delPerPersonInput.value))

initAddCompanyBtn.addEventListener('click', showAddCompanyContainer)
addCompanyBtn.addEventListener('click', ()=>addCompany(addCompanyInput.value))
initDelCompanyBtn.addEventListener('click', showDelCompanyContainer)
delCompanyBtn.addEventListener('click', ()=>deleteCompany(delCompanyInput.value))

initAddListBtn.addEventListener('click', showAddListContainer)
addListBtn.addEventListener('click', ()=>addList(addListInput.value))
initDelListBtn.addEventListener('click', showDelListContainer)
delListBtn.addEventListener('click', ()=>deleteList(delListInput.value))

initAddGenericEmailBtn.addEventListener('click', showAddGenericEmailContainer)
addGenericEmailBtn.addEventListener('click', ()=>addGenericEmail(addGenericEmailInput.value))
initDelGenericEmailBtn.addEventListener('click', showDelGenericEmailContainer)
delGenericEmailBtn.addEventListener('click', ()=>deleteGenericEmail(delGenericEmailInput.value))

// toggleColDataTypeVisBtn.addEventListener('click',()=>toggleColDataTypeVis())
