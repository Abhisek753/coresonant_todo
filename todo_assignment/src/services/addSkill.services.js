import axios from "axios";
const URL="https://jsonplaceholder.typicode.com/users/1/todos"



const Token=JSON.parse(localStorage.getItem("user"))?.token;

export const savetasksService=(data)=>{
    const axiosConfig = {
        method: 'post',
        url: URL+"saveSkill",
        data:data,
        headers: {
          'Authorization': `Bearer ${Token}`, 
          'Content-Type': 'application/json', 
        },
      };
     return axios(axiosConfig)
    

}



export const gettasksService=(payload)=>{
    const axiosConfig = {
        method: 'get',
        url: URL,
        data: payload,
        // headers: {
        //   'Authorization': `Bearer ${Token}`, 
        //   'Content-Type': 'application/json', 
        // },
      };
     return axios(axiosConfig)
}
export const gettasksListService=(payload)=>{
  const axiosConfig = {
      method: 'get',
      url: URL,
      data: payload,
      // headers: {
      //   'Authorization': `Bearer ${Token}`, 
      //   'Content-Type': 'application/json', 
      // },
    };
   return axios(axiosConfig)
}



















