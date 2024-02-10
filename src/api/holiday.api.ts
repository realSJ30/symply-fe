import { IHoliday } from "@/interface/holidays.interface";

const holidayApiKey = import.meta.env.VITE_APP_HOLIDAY_API_KEY;
const baseUrl = "https://holidayapi.com/v1/holidays";

export const fetchHolidays = async ({
  country,
  year = "2023",
}: {
  country: string;
  year?: string;
}) => {
  const url = `${baseUrl}?key=${holidayApiKey}&country=${country}&year=${year}`;
  const response = await fetch(url);
  const { holidays } = await response.json();
  const modHoliday: IHoliday[] = holidays.map((holiday: IHoliday) => ({
    name: holiday.name,
    date: holiday.date,
    observed: holiday.observed,
    public: holiday.public,
    country: holiday.country,
    uuid: holiday.uuid,
  }));
  console.log("[fetchHolidays][api]", modHoliday);
  return modHoliday;
};
