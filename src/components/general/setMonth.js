export function setMonth(m){
    if(m == null || m == undefined || m == ""){
        return; 
    }
    switch(m){
        case "01": return "Januar"; 
        case "02": return "Februar";
        case "03": return "März";
        case "04": return "April"; 
        case "05": return "Mai";
        case "06": return "Juni";
        case "07": return "Juli";
        case "08": return "August"; 
        case "09": return "September"; 
        case "10": return "Oktober"; 
        case "11": return "November";
        case "12": return "Dezember"; 
    }
}

