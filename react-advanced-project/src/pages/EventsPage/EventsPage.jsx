import { useEffect, useState } from "react";
import React from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventModal from "./EventModal";
import SearchBar from "./SearchBar";
import EventList from "./EventList";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    userImage: "",
    createdBy: "",
    title: "",
    image: "",
    description: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:3000/events");
      const data = await response.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const getCategoryNames = (eventCategoryIds) => {
    const eventCategories = eventCategoryIds.map((categoryId) =>
      categories.find((category) => category.id === categoryId)
    );
    return eventCategories.map((category) => category?.name || "").join(", ");
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await fetch("http://localhost:3000/users");
      const allUserData = await userData.json();
      const userNameList = allUserData.map((user) => user.name.toLowerCase());
      console.log(userNameList);

      const isUserNameExists = userNameList.some(
        (name) => name === newEvent.createdBy.toLowerCase()
      );

      if (isUserNameExists) {
        const existingUser = allUserData.find(
          (user) => user.name.toLowerCase() === newEvent.createdBy.toLowerCase()
        );
        const userId = existingUser.id;

        const response = await fetch("http://localhost:3000/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newEvent,
            createdBy: userId,
          }),
        });

        if (response.ok) {
          // Event added successfully, fetch the updated event list here
          const data = await response.json();
          console.log("New event added:", data);
          // Reset the form fields
          setNewEvent({
            createdBy: "",
            title: "",
            image: "",
            description: "",
            startTime: "",
            endTime: "",
            categoryIds: [],
          });
          // Close the modal
          setIsModalOpen(false);
          toast.success("Event added successfully!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });

          // Fetch the updated list of events
          const updatedEventsResponse = await fetch(
            "http://localhost:3000/events"
          );
          const updatedEventData = await updatedEventsResponse.json();
          setEvents(updatedEventData);
        } else {
          console.log(
            "Error adding event.",
            response.status,
            response.statusText
          );
        }
      } else {
        const userResponse = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newEvent.createdBy,
            image: newEvent.userImage,
          }),
        });

        if (userResponse.ok) {
          const user = await userResponse.json();

          const response = await fetch("http://localhost:3000/events", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...newEvent,
              createdBy: user.id,
            }),
          });

          if (response.ok) {
            // Event added successfully, fetch the updated event list here
            const data = await response.json();
            console.log("New event added:", data);
            // Reset the form fields
            setNewEvent({
              createdBy: "",
              title: "",
              image: "",
              description: "",
              startTime: "",
              endTime: "",
              categoryIds: [],
            });
            // Close the modal
            setIsModalOpen(false);
            toast.success("Event added successfully!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });

            // Fetch the updated list of events
            const updatedEventsResponse = await fetch(
              "http://localhost:3000/events"
            );
            const updatedEventData = await updatedEventsResponse.json();
            setEvents(updatedEventData);
          } else {
            console.log(
              "Error adding event:",
              response.status,
              response.statusText
            );
          }
        } else {
          console.log(
            "Error adding user:",
            userResponse.status,
            userResponse.statusText
          );
        }
      }
    } catch (error) {
      console.log("Error adding event:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryId)) {
        return prevSelectedCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedCategories, categoryId];
      }
    });
  };

  const isEventMatchSearchTerm = (event) => {
    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const isEventMatchSelectedCategories = (event) => {
    if (selectedCategories.length === 0) {
      return true;
    } else {
      return event.categoryIds.some((categoryId) =>
        selectedCategories.includes(categoryId)
      );
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      isEventMatchSearchTerm(event) && isEventMatchSelectedCategories(event)
  );

  return (
    <div className="App">
      <>
        <Heading textAlign="center">List of Events</Heading>
        <Flex align="center" justify="space-between" mb={4}>
          <Flex>
            <SearchBar
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              categories={categories}
              selectedCategories={selectedCategories}
              handleCategoryFilter={handleCategoryFilter}
            />
          </Flex>
        </Flex>
        <Button onClick={handleModalOpen} my={4} mx="auto" display="block">
          Add Event
        </Button>
        <EventList
          events={filteredEvents}
          getCategoryNames={getCategoryNames}
        />
        <EventModal
          categories={categories}
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
          newEvent={newEvent}
        />
        <ToastContainer />
      </>
    </div>
  );
};
