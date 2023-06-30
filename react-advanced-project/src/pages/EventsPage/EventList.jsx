import React from "react";
import { Flex } from "@chakra-ui/react";
import EventCard from "./EventCard";

const EventList = ({ events, getCategoryNames }) => {
  return (
    <Flex
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="center"
      flexWrap="wrap"
    >
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          getCategoryNames={getCategoryNames}
        />
      ))}
    </Flex>
  );
};

export default EventList;
