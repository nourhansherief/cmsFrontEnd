export const formatSourceCodeForSubmit = (source: any) => {
  let newArr = [];
  let enArr = source.en;
  let arArr = source.ar;

  for (let i = 0; i < enArr.length; i++) {
    for (let j = 0; j < arArr.length; j++) {
      if (enArr[i].key == arArr[j].key) {
        newArr.push({ ...enArr[i], defaultValueAr: arArr[j].defaultValue });
      }
    }
  }

  return newArr;
};

export const formatDDFObjForMultipleLangs = (data: any) => {
  let newObj: any = { en: [], ar: [] };

  for (let i = 0; i < data.length; i++) {
    const { defaultValueAr, ...objEn } = data[i];
    const { defaultValue, ...objAr } = data[i];

    newObj.en.push({ ...objEn });
    newObj.ar.push({ ...objAr , defaultValue : objAr.defaultValueAr});
  }

  return newObj;
};
