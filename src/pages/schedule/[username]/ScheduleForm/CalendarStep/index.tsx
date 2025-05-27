import { Calendar } from "@/components/Calendar";
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from "./styles";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { api } from "@/lib/axios";

interface Availability {
  possibleTimes: number[];
  availableTimes: number[];
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availability, setAvailability] = useState<Availability | null>(null);

  const isDataSelected = !!selectedDate;

  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd[,]") : null;
  const dayDate = selectedDate
    ? dayjs(selectedDate).format("DD [ de ] MMMM")
    : null;

  const router = useRouter();
  const username = String(router.query.username);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    api
      .get(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format("YYYY-MM-DD"),
        },
      })
      .then((response) => {
        setAvailability(response.data);
      });
  }, [selectedDate, username]);

  return (
    <Container isTimePickerOpen={isDataSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDataSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{dayDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
                disabled={!availability.availableTimes.includes(hour)}
              >
                {String(hour).padStart(2, "0")}h00
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}
