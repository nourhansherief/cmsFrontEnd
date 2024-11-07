const cachedData : Record<string , any> = {}

export const CachingData = (key : string , data : any) => {
    if(cachedData[key] !== undefined){
        return cachedData[key]
    }

    cachedData[key] = data
    return data
}