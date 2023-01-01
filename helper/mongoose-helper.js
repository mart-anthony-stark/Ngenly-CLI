import axios from "axios";

export const createModel = async (schemaName)=>{
    const options = {
        method: 'POST',
        url: 'https://ai-text-to-code-generation.p.rapidapi.com/generate',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '6beb7eba69msh0e9a5664feff189p18af5ejsn08f8c1ca38ae',
          'X-RapidAPI-Host': 'ai-text-to-code-generation.p.rapidapi.com'
        },
        data: `{"input":"mongoose model for ${schemaName} schema"}`
      };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

createModel("Teacher")