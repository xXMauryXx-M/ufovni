
 export  const UseHours=()=>{

    let date = new Date()

    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    const formattedTime = hours + ':' + minutes + ' ' + ampm;
   

  
        
   

    
    
 return{
    formattedTime
 
 }

}