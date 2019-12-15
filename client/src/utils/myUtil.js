// FILTER BY MULTIPLE CRITERIA
export const filterMany = (array, obj) => {
  const objKeys = Object.keys(obj);
  return array.filter(item => {
    return objKeys.every(key => {
      if (!obj[key].length) return true; // passing an empty filter means that filter is ignored.
      return obj[key].includes(item[key]);
    });
  });
};

// // Get items that match at least one criteria
// export const randomFilter = (list, obj) => {
//   //Ensure field is not empty
//   const notEmpty = field => {
//     if (field !== "") return field;
//   };
//   //Perform filtering
//   const filtered = list.filter(item => {
//     for (let key in obj) {
//       if (item[key] === notEmpty(obj[key])) return true;
//     }
//   });
//   return filtered;
// };

//This function merges two array into one removing duplicates
// replace with module.exports in Node project or regular function in vanilla js project
export const mergeArray = (arr1, arr2) => {
  const sorter = [];
  let merged = [];

  for (let i = 0; i < arr1.length; i++) {
    sorter[arr1[i]] = true;
  }

  for (let i = 0; i < arr2.length; i++) {
    if (sorter[arr2[i]]) {
      sorter[arr2[i]] = false;
    } else {
      sorter[arr2[i]] = true;
    }
  }

  for (let key in sorter) {
    merged.push(key);
  }
  return merged;
};
