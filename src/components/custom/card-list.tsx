import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GET_ALL_EVENTS, REMOVE_EVENT, UPDATE_EVENT } from "@/graphql/query";
import { useCreateModal } from "@/hooks/use-create-modal";
import { useDate } from "@/hooks/use-date";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { IEvents } from "@/interface/events.interface";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { BadgeCheck, MoreVertical, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const CardList = () => {
  const { user } = useAuth0();
  const { onOpen } = useCreateModal();
  const { onOpen: onOpenUpdateModal, setInitialData } = useUpdateModal();
  const { date } = useDate();
  const { loading, data } = useQuery(GET_ALL_EVENTS, {
    variables: { userId: `${user?.name}|${user?.email}` },
  });
  const [removeEvent] = useMutation(REMOVE_EVENT, {
    refetchQueries: [GET_ALL_EVENTS],
  });
  const [updateEvent] = useMutation(UPDATE_EVENT, {
    refetchQueries: [GET_ALL_EVENTS],
  });

  const handleRemoveEvent = (eventId: number) => {
    removeEvent({
      variables: {
        removeEventId: eventId,
      },
    });
  };

  const handleUpdateEvent = (event: IEvents) => {
    updateEvent({
      variables: {
        updateEventInput: {
          id: event?.id,
          title: event.title,
          description: event.description,
          completed: true,
        },
      },
    });
  };

  const handleUpdateData = (event: IEvents) => {
    setInitialData(event);
    onOpenUpdateModal();
  };

  const compareDate = (dateToCompare: Date): boolean => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
    return dateToCompare >= startOfDay && dateToCompare < endOfDay;
  };

  const filteredData =
    data?.events &&
    data.events.filter((event: IEvents) =>
      compareDate(new Date(parseInt(event.date, 10)))
    );

  return (
    <div
      data-testid="card-list"
      className="flex flex-col gap-y-4 border border-neutral-200 rounded-lg p-4 w-full h-[900px] overflow-y-auto col-span-2 md:col-span-1"
    >
      <Button
        data-testid="new-event-btn"
        disabled={loading}
        onClick={onOpen}
        variant="outline"
        className="h-[70px]"
      >
        <Plus />
      </Button>
      {loading ? (
        <>
          <Skeleton className="w-full h-[155px] rounded-xl" />
          <Skeleton className="w-full h-[155px] rounded-xl" />
          <Skeleton className="w-full h-[155px] rounded-xl" />
          <Skeleton className="w-full h-[155px] rounded-xl" />
        </>
      ) : filteredData.length > 0 ? (
        filteredData.map((event: IEvents) => (
          <Card key={event.id}>
            <CardHeader className="flex flex-row justify-between">
              <div className="flex flex-col">
                <CardTitle
                  className={cn(event.completed ? "line-through" : "")}
                >
                  {event.title}
                </CardTitle>
                <CardDescription
                  className={cn(event.completed ? "line-through" : "")}
                >
                  {event.description}
                </CardDescription>
              </div>
              <div className="flex gap-x-2 items-center">
                {event.completed && <BadgeCheck className="h-8 w-8" />}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleUpdateData(event)}>
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      disabled={event.completed}
                      onClick={() => handleUpdateEvent(event)}
                    >
                      Mark Done
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleRemoveEvent(event.id)}
                    >
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
          </Card>
        ))
      ) : (
        <div className="text-center h-full text-neutral-600 flex items-center justify-center">
          <h1>No Events</h1>
        </div>
      )}
    </div>
  );
};

export default CardList;
