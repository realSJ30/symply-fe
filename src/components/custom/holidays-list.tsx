import { IHoliday } from "@/interface/holidays.interface";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface HolidayListProps {
  holidays: IHoliday[];
}

const HolidayList: React.FC<HolidayListProps> = ({ holidays }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 w-full border border-neutral-200 rounded-lg p-4 h-[530px] overflow-y-auto pb-2">
      {holidays.length > 0 ? (
        holidays.map((holiday) => (
          <Card key={holiday.uuid}>
            <CardHeader>
              <CardTitle>{holiday.name}</CardTitle>
              <CardDescription>{formatDate(holiday.date)}</CardDescription>
            </CardHeader>
          </Card>
        ))
      ) : (
        <div className="text-center h-full text-neutral-600 flex items-center justify-center">
          <h1>No Holidays</h1>
        </div>
      )}
    </div>
  );
};

export default HolidayList;
