"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { CiCalendarDate } from "react-icons/ci";
import { cn } from "@/lib/utils";
import { Calendar } from "@/app/(protected)/dashboard/_components/calendar";
import { HTMLAttributes, useState } from "react";

export function CalendarDateRangePicker({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Button
            id="date"
            variant={"bordered"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CiCalendarDate size={20} className="mr-2" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-background">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
