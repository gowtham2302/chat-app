import {useEffect , useState} from 'react'

const proj_name= 'chat-app'

export default function useLocalStorage(key , iniValue) {
  const f_key = proj_name + key

  const [value , setvalue] = useState (() => {
    const jsonValue = localStorage.getItem(f_key)
    if (jsonValue != null){
        return JSON.parse(jsonValue)
    }  
    if (typeof iniValue === 'function') {
        return iniValue()
    }
    else{
        return iniValue
    }
  })


  useEffect(()=>{
       localStorage.setItem(f_key, JSON.stringify(value)) 
  } , [f_key,value])


  return [value , setvalue]
}
