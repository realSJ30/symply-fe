import { useEffect, useState } from "react";
import { IHoliday } from "@/interface/holidays.interface";

import { fetchHolidays } from "@/api/holiday.api";
import { years } from "@/const/year";
import { useDate } from "@/hooks/use-date";

import CardList from "@/components/custom/card-list";
import ComboboxDemo from "@/components/custom/combobox";
import HolidayList from "@/components/custom/holidays-list";
import { Calendar } from "@/components/ui/calendar";

const HomePage = () => {
  const yearList = years();
  const { date, onChange } = useDate();
  const [holidays, setHolidays] = useState<IHoliday[]>([]);
  const [year, setYear] = useState<string>(yearList[yearList.length - 1].value);

  useEffect(() => {
    const fetch = async () => {
      const fetchedHolidays = await fetchHolidays({
        country: "PH",
        year: year,
      });
      setHolidays(fetchedHolidays);
    };
    fetch();
  }, [year]);

  return (
    <div className="flex flex-col mt-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-2 md:col-span-1 flex flex-col gap-y-4">
          <Calendar
            data-testid="calendar"
            mode="single"
            holidays={holidays}
            selected={date}
            onSelect={(day) => {
              if (day) {
                onChange(day);
              }
            }}
            className="rounded-md border col-span-2 md:col-span-1"
          />
          <div className="flex flex-col h-[530px] gap-y-2">
            <div
              data-testid="cb-year"
              className="flex items-center justify-between px-2"
            >
              <h1 className="text-lg">Holidays</h1>
              <ComboboxDemo
                options={years()}
                value={year}
                setValue={setYear}
                placeholder="Choose Year"
              />
            </div>
            <HolidayList holidays={holidays} />
          </div>
        </div>
        <CardList />
      </div>
    </div>
  );
};

export default HomePage;
