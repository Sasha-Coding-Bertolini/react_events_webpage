import React from "react";
import { Link } from "react-router-dom";
import { Flex, Image, Text } from "@chakra-ui/react";

const EventCard = ({ event, getCategoryNames }) => {
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return dateTime.toLocaleString("en-US", options);
  };

  return (
    <Flex
      key={event.id}
      flexDirection="column"
      alignItems="center"
      mx={4}
      my={2}
      p={4}
      bg="gray.100"
      borderRadius="md"
      boxShadow="md"
      width={{ base: "100%", sm: "45%", md: "30%" }}
      _hover={{ bg: "gray.200", cursor: "pointer" }}
    >
      <Link to={`/events/${event.id}`}>
        <Flex
          key={event.id}
          flexDirection="column"
          alignItems="center"
          mx={4}
          my={2}
        >
          <Image
            margin="5"
            borderRadius="20"
            boxSize="100px"
            src={event.image}
          />
          <Text fontWeight="bold">{event.title}</Text>
          {event.description && <Text>{event.description}</Text>}
          {event.startTime && (
            <Text color={"green"}>
              Start Time: {formatDateTime(event.startTime)}
            </Text>
          )}
          {event.endTime && (
            <Text color={"red"}>End Time: {formatDateTime(event.endTime)}</Text>
          )}
          {event.categoryIds.length > 0 && (
            <Text as={"i"}>
              Categories: {getCategoryNames(event.categoryIds)}
            </Text>
          )}
        </Flex>
      </Link>
    </Flex>
  );
};

export default EventCard;
