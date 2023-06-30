import React from "react";
import {
  Heading,
  Text,
  Image,
  Button,
  Flex,
  Box,
  Center,
} from "@chakra-ui/react";

const EventDetails = ({
  event,
  categories,
  users,
  isEditing,
  handleEditClick,
}) => {
  const {
    title,
    image,
    description,
    startTime,
    endTime,
    categoryIds,
    createdBy,
  } = event;

  const getCategoryNames = (eventCategoryIds) => {
    const eventCategories = eventCategoryIds.map((categoryId) =>
      categories.find((category) => category.id === categoryId)
    );
    return eventCategories.map((category) => category?.name || "").join(", ");
  };

  const getUserNames = (eventCreatedBy) => {
    const user = users.find((user) => user.id === eventCreatedBy);
    return user?.name || "";
  };

  const getUserImage = (eventCreatedBy) => {
    const user = users.find((user) => user.id === eventCreatedBy);
    return user?.image || "";
  };

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
    <>
      <Heading textAlign={"center"}>{title}</Heading>
      <Flex direction={{ base: "column", md: "row" }}>
        <Box
          flex={{ base: "1", md: "2" }}
          margin={"auto"}
          width={{ base: "100%", md: "50%" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Image
            marginY={5}
            borderRadius="20"
            boxSize="100%"
            maxWidth="500px"
            maxHeight={"300px"}
            src={image}
            alt="Event Image"
            objectFit="cover"
            marginRight={5}
            marginTop={"44px"}
          />
          {description && <Text>{description}</Text>}
          {startTime && <Text>Start Time: {formatDateTime(startTime)}</Text>}
          {endTime && <Text>End Time: {formatDateTime(endTime)}</Text>}
          {getCategoryNames(categoryIds) && (
            <Text>Category: {getCategoryNames(categoryIds)}</Text>
          )}
        </Box>
        <Box
          flex={{ base: "1", md: "1" }}
          marginRight={"10%"}
          width={{ base: "100%", md: "50%" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Heading size="md">Created By:</Heading>
          <Image
            marginY={5}
            borderRadius="20"
            boxSize="100%"
            maxWidth={"200px"}
            maxHeight={"200px"}
            src={getUserImage(createdBy)}
            alt="User Image"
            objectFit="cover"
            marginLeft={5}
          />

          <Text>{getUserNames(createdBy)}</Text>
        </Box>
      </Flex>
      <Box flex="1" margin={{ base: "20px 0", md: "auto" }}>
        {isEditing ? (
          <Button onClick={handleEditClick}>Cancel</Button>
        ) : (
          <Button onClick={handleEditClick}>Edit</Button>
        )}
      </Box>
    </>
  );
};

export default EventDetails;
