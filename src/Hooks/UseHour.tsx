
 export  const UseHours=()=>{

    let date = new Date()
    var hours = date.getHours() - date.getTimezoneOffset()  / 60 -3
    var amPm = hours >= 12 ? 'p.m.' : 'a.m.';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let minute = new Date().getMinutes()
    let segundos = new Date().getSeconds()  

    let HoraActual;

   
     
        
        HoraActual=`${hours}:${minute} ${amPm}  `
   

  
        
   

    
    
 return{
  HoraActual  
 
 }

}