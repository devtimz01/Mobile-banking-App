const parseObject=(value:string):any=>{
    //two string counts=>1 object
    let data = JSON.parse(value);
    let counter= 0
    while(counter<=2){
        if(typeof data=="object"){
            break;
        }
        else{
            data= JSON.parse(data)
            counter++
        }
    }
    return data;
};

const utility={
    parseObject
};

export default utility;