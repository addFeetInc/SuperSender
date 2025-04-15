//////////SHOW & HIDE CONTAINERS//////////

function changeColor(event){
    event.target.style.backgroundColor = "red";
}

////SHOW & HIDE Main Tabs
function showFileTab(){
    fileTab.style.display = "block";
    personTab.style.display = "none";
    companyTab.style.display = "none";
    listTab.style.display = "none";
    genericEmailTab.style.display = "none";
    
    showFileBtn.style.backgroundColor = "black";
    showFileBtn.style.color = "white";
    
    showAllBtn.style = ''
    showPersonBtn.style = ''
    showListBtn.style = ''
    showGenericEmailBtn.style = ''
    showCompanyBtn.style = ''
}

function showPersonTab(){
    fileTab.style.display = "none";
    personTab.style.display = "block";
    companyTab.style.display = "none";
    listTab.style.display = "none";
    genericEmailTab.style.display = "none";
    
    showPersonBtn.style.backgroundColor = "black";
    showPersonBtn.style.color = "white";
    
    showAllBtn.style = ''
    showListBtn.style = ''
    showFileBtn.style = ''
    showGenericEmailBtn.style = ''
    showCompanyBtn.style = ''
}

function showCompanyTab(){
    fileTab.style.display = "none";
    personTab.style.display = "none";
    companyTab.style.display = "block";
    listTab.style.display = "none";
    genericEmailTab.style.display = "none";

    showCompanyBtn.style.backgroundColor = "black";
    showCompanyBtn.style.color = "white";
    
    showAllBtn.style = ''
    showPersonBtn.style = ''
    showFileBtn.style = ''
    showGenericEmailBtn.style = ''
    showListBtn.style = ''
}

function showListTab(){
    fileTab.style.display = "none";
    personTab.style.display = "none";
    companyTab.style.display = "none";
    listTab.style.display = "block";
    genericEmailTab.style.display = "none";

    showListBtn.style.backgroundColor = "black";
    showListBtn.style.color = "white";
    
    showAllBtn.style = ''
    showPersonBtn.style = ''
    showFileBtn.style = ''
    showGenericEmailBtn.style = ''
    showCompanyBtn.style = ''
}

function showGenericEmailTab(){
    fileTab.style.display = "none";
    personTab.style.display = "none";
    companyTab.style.display = "none";
    listTab.style.display = "none";
    genericEmailTab.style.display = "block";

    showGenericEmailBtn.style.backgroundColor = "black";
    showGenericEmailBtn.style.color = "white";
    
    showAllBtn.style = ''
    showPersonBtn.style = ''
    showFileBtn.style = ''
    showListBtn.style = ''
    showCompanyBtn.style = ''
}

function showAllTabs(){
    fileTab.style.display = "block";
    personTab.style.display = "block";
    companyTab.style.display = "block";
    listTab.style.display = "block";
    genericEmailTab.style.display = "block";

    showAllBtn.style.backgroundColor = "black";
    showAllBtn.style.color = "white";
    
    showListBtn.style = ''
    showPersonBtn.style = ''
    showFileBtn.style = ''
    showGenericEmailBtn.style = ''
    showCompanyBtn.style = ''
}

////SHOW & HIDE Person Grid Modification Divs
function showAddColContainer(){
    if(addColContainer.style.display == "block"){
        addColContainer.style.display = "none";
        addPerContainer.style.display = "none";
        delColContainer.style.display = "none";
        delPerContainer.style.display = "none";

        initDelColBtn.style = ''
        initAddColBtn.style = ''
        initAddPerBtn.style = ''
        initDelPerBtn.style = ''
    }else{
        addColContainer.style.display = "block";
        addPerContainer.style.display = "none";
        delColContainer.style.display = "none";
        delPerContainer.style.display = "none";
    
        initAddColBtn.style.backgroundColor = "black";
        initAddColBtn.style.color = "white";
    
        initAddPerBtn.style = ''
        initDelColBtn.style = ''
        initDelPerBtn.style = ''
    }
}

function showAddPerContainer(){
    if(addPerContainer.style.display == "block"){
        addColContainer.style.display = "none";
        addPerContainer.style.display = "none";
        delColContainer.style.display = "none";
        delPerContainer.style.display = "none";

        initDelColBtn.style = ''
        initAddColBtn.style = ''
        initAddPerBtn.style = ''
        initDelPerBtn.style = ''
    }else{
        addColContainer.style.display = "none";
        addPerContainer.style.display = "block";
        delColContainer.style.display = "none";
        delPerContainer.style.display = "none";
    
        initAddPerBtn.style.backgroundColor = "black";
        initAddPerBtn.style.color = "white";
    
        initAddColBtn.style = ''
        initDelColBtn.style = ''
        initDelPerBtn.style = ''
    }
}

function showDelColContainer(){
    if(delColContainer.style.display == "block"){

        addColContainer.style.display = "none";
        addPerContainer.style.display = "none";
        delColContainer.style.display = "none";
        delPerContainer.style.display = "none";

        initDelColBtn.style = ''
        initAddColBtn.style = ''
        initAddPerBtn.style = ''
        initDelPerBtn.style = ''
    }else{
        addColContainer.style.display = "none";
        addPerContainer.style.display = "none";
        delColContainer.style.display = "block";
        delPerContainer.style.display = "none";

        initDelColBtn.style.backgroundColor = "black";
        initDelColBtn.style.color = "white";

        initAddColBtn.style = ''
        initAddPerBtn.style = ''
        initDelPerBtn.style = ''
    }
}

function showDelPerContainer(){
    if(delPerContainer.style.display == "block"){
        addColContainer.style.display = "none";
        addPerContainer.style.display = "none";
        delColContainer.style.display = "none";
        delPerContainer.style.display = "none";

        initDelColBtn.style = ''
        initAddColBtn.style = ''
        initAddPerBtn.style = ''
        initDelPerBtn.style = ''
    }else{
        addColContainer.style.display = "none";
        addPerContainer.style.display = "none";
        delColContainer.style.display = "none";
        delPerContainer.style.display = "block";
    
        initDelPerBtn.style.backgroundColor = "black";
        initDelPerBtn.style.color = "white";
    
        initAddColBtn.style = ''
        initAddPerBtn.style = ''
        initDelColBtn.style = ''
    }
}

////SHOW & HIDE Company Grid Modification Div
function showAddCompanyContainer(){
    if(addCompanyContainer.style.display == "block"){
        addCompanyContainer.style.display = "none";
        delCompanyContainer.style.display = "none";

        initAddCompanyBtn.style = ''
        initDelCompanyBtn.style = ''
    }else{
        addCompanyContainer.style.display = "block";
        delCompanyContainer.style.display = "none";
    
        initAddCompanyBtn.style.backgroundColor = "black";
        initAddCompanyBtn.style.color = "white";
    
        initDelCompanyBtn.style = ''
    }
}
function showDelCompanyContainer(){
    if(delCompanyContainer.style.display == "block"){
        addCompanyContainer.style.display = "none";
        delCompanyContainer.style.display = "none";

        initAddCompanyBtn.style = ''
        initDelCompanyBtn.style = ''
    }else{
        addCompanyContainer.style.display = "none";
        delCompanyContainer.style.display = "block";
    
        initDelCompanyBtn.style.backgroundColor = "black";
        initDelCompanyBtn.style.color = "white";
    
        initAddCompanyBtn.style = ''
    }
}

////SHOW & HIDE List Grid Modification Div
function showAddListContainer(){
    if(addListContainer.style.display == "block"){
        addListContainer.style.display = "none";
        delListContainer.style.display = "none";

        initAddListBtn.style = ''
        initDelListBtn.style = ''
    }else{
        addListContainer.style.display = "block";
        delListContainer.style.display = "none";
    
        initAddListBtn.style.backgroundColor = "black";
        initAddListBtn.style.color = "white";
    
        initDelListBtn.style = ''
    }
}
function showDelListContainer(){
    if(delListContainer.style.display == "block"){
        addListContainer.style.display = "none";
        delListContainer.style.display = "none";

        initAddListBtn.style = ''
        initDelListBtn.style = ''
    }else{
        addListContainer.style.display = "none";
        delListContainer.style.display = "block";
    
        initDelListBtn.style.backgroundColor = "black";
        initDelListBtn.style.color = "white";
    
        initAddListBtn.style = ''
    }
}

////SHOW & HIDE Generic Email Grid Modification Div
function showAddGenericEmailContainer(){
    if(addGenericEmailContainer.style.display == "block"){
        addGenericEmailContainer.style.display = "none";
        delGenericEmailContainer.style.display = "none";

        initAddGenericEmailBtn.style = ''
        initDelGenericEmailBtn.style = ''
    }else{
        addGenericEmailContainer.style.display = "block";
        delGenericEmailContainer.style.display = "none";
    
        initAddGenericEmailBtn.style.backgroundColor = "black";
        initAddGenericEmailBtn.style.color = "white";
    
        initDelGenericEmailBtn.style = ''
    }
}
function showDelGenericEmailContainer(){
    if(delGenericEmailContainer.style.display == "block"){
        addGenericEmailContainer.style.display = "none";
        delGenericEmailContainer.style.display = "none";

        initAddGenericEmailBtn.style = ''
        initDelGenericEmailBtn.style = ''
    }else{
        addGenericEmailContainer.style.display = "none";
        delGenericEmailContainer.style.display = "block";
    
        initDelGenericEmailBtn.style.backgroundColor = "black";
        initDelGenericEmailBtn.style.color = "white";
    
        initAddGenericEmailBtn.style = ''
    }
}

////SHOW & HIDE Edit Generic Email Div
function showEditGenericEmailContainer(){
    editGenericEmailContainer.style.display = "block"
}
function hideEditGenericEmailContainer(){
    editGenericEmailContainer.style.display = "none"
}


////TOGGLE VISIBILTY Column Data Type

function toggleColDataTypeVis(){
    columnDataTypeShown = !columnDataTypeShown
    if (columnDataTypeShown){
        toggleColDataTypeVisBtn.style.backgroundColor = "black";
        toggleColDataTypeVisBtn.style.color = "white";
    }else{
        toggleColDataTypeVisBtn.style = ''
    }
    refreshCompanyTable()
}


function makeColumnHidden(column_name, table_name){

    const table_to_columns_dictionary = {
        'company': companyColumns,
        'person': personColumns,
        'list': listColumns,
        'generic_email': genericEmailColumns
    }
    
    const table_to_refresh_dictionary = {
        'company': refreshCompanyTable,
        'person': refreshPersonTable,
        'list': refreshListTable,
        'generic_email': refreshGenericEmailTable
    }

    colObjectFromName(column_name,table_to_columns_dictionary[table_name]).hideColumn = true
    table_to_refresh_dictionary[table_name]()
}

function makeColumnShown(column_name, table_name){
    const table_to_columns_dictionary = {
        'company': companyColumns,
        'person': personColumns,
        'list': listColumns,
        'generic_email': genericEmailColumns
    }

    const table_to_refresh_dictionary = {
        'company': refreshCompanyTable,
        'person': refreshPersonTable,
        'list': refreshListTable,
        'generic_email': refreshGenericEmailTable
    }
    
    colObjectFromName(column_name,table_to_columns_dictionary[table_name]).hideColumn = false
    table_to_refresh_dictionary[table_name]()
}