import _ from "lodash";

export const tableHeaderReplace = (data, headers1, headers2) => {
   // data  // full data
   //headers1 // headers defauilt in data
   //headers2 // headers change that same index on headers1
   
   const objMapper = data?.map((obj) => {
      let newObj = _.mapKeys(obj, (value, key) => {
         for (let index = 0; index < headers2.length; index++) {
            if (key === headers1[index]) {
               return headers2[index]
            }
         }
         return key
      });
      return newObj;
   })
   return objMapper
}