import axios from "axios";

export const createModel = async (schemaName)=>{
  try {
    const options = {
        method: 'POST',
        url: 'https://ai-text-to-code-generation.p.rapidapi.com/generate',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '6beb7eba69msh0e9a5664feff189p18af5ejsn08f8c1ca38ae',
          'X-RapidAPI-Host': 'ai-text-to-code-generation.p.rapidapi.com'
        },
        data: `{"input":"mongoose model for ${schemaName} schema and export it"}`
      };

    const res = await axios.request(options)
    return res.data?.message
    
  } catch (error) {
    console.error(error)
  }
}