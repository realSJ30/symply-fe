import { IOptions } from "@/components/custom/combobox";

export const years = () => {
  const years: IOptions[] = [];
  const currentYear = new Date().getFullYear();
  for (let i = 1; i > 0; i--) {
    const year = currentYear - i;
    years.push({ label: year.toString(), value: year.toString() });
  }
  return years;
};
