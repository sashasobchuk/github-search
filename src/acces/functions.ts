


export  const errorReporte =(string:string,e:any ='error',deploy:boolean=false )=>{
    if(deploy){
        alert(JSON.stringify(e) + string)
    }else {
        console.warn(JSON.stringify(e)  + string)
    }

}
