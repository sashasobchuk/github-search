import {useEffect, useState} from "react";


export  const errorReporte =(string:string,e:any ='error',deploy:boolean=false )=>{
    if(deploy){
        alert(JSON.stringify(e) + string)
    }else {
        console.warn(JSON.stringify(e)  + string)
    }
}




export const useLoadingMore =(deps:Array<any> |null,loading:boolean |null,onToLoad:Function |any):null=>{

    let    handleIntersect = (entries:any, ) => {
        entries.forEach((entry:any) => {
            // console.log('scroll work');
            if (entry.intersectionRatio > 0) {
                onToLoad()
            }
        });
    };
    const [observing,setObserving]=useState(false)
    let createObserver = () => {
        let options = {
            root: null,
            // rootMargin: "40px",
            threshold: 1,
        };
        const boxElement = document.getElementById("loading");
        let observer:any = new IntersectionObserver(
            handleIntersect,
            options
        );
        document.querySelector('#loading') && observer.observe(boxElement);
        // document.querySelector('#loading') && setObserving(true)
    };
    useEffect(() => {
        if(!observing && !loading){
            createObserver()
        }
    }, [deps?.length,loading])
    return null
}
