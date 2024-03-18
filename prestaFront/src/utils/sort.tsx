// ============================ Tri ========================

import Provider from "@/models/provider";

export const dataFilterBySearchandArea = (data: Provider[], searchInput: string, area: string[]) => {
  return data.filter((item) => {
    const { name } = item;
    const inputValue = searchInput.toLowerCase();
    const nameLower = name.toLowerCase();
    return nameLower.includes(inputValue) && area.includes(item.area);
  });
};

export const dataFilterByJob = (dataFiltered: Provider[], job:string) => {
  return dataFiltered.filter((item) => {
    if(item.job === job) {
      return item;
    } else if(job === "All") {
      return item;
    }
  });

};

