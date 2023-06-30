import React, { useEffect, useState } from "react";
import { Text, Box, Center } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventDetails from "./EventDetails";
import EventEditModal from "./EventEditModal";
import EventDeleteConfirmation from "./EventDeleteConfirmation";

export const EventPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({});
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch event details based on the eventId
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`);
        const eventData = await response.json();
        setEvent(eventData);
      } catch (error) {
        console.log("Error fetching event details:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  if (!event) {
    return (
      <Center minHeight="100vh">
        <Text>Loading...</Text>
      </Center>
    );
  }

  const handleEditClick = () => {
    setEditedEvent(event);
    setIsModalOpen(true); // Open the editing modal
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsModalOpen(false); // Close the editing modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedEvent),
      });
      if (response.ok) {
        const updatedEventData = await response.json();
        setEvent(updatedEventData);
        setIsEditing(false);
        setIsModalOpen(false); // Close the editing modal
        toast.success("Event updated successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        console.log(
          "Error updating event:",
          response.status,
          response.statusText
        );
        toast.error("Error updating event...", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      console.log("Error updating event:", error);
    }
  };

  const handleDeleteClick = () => {
    setIsConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const eventResponse = await fetch(
        `http://localhost:3000/events/${eventId}`
      );

      if (eventResponse.ok) {
        const eventData = await eventResponse.json();
        const userId = eventData.createdBy;
        console.log(userId);

        const response = await fetch(
          `http://localhost:3000/events/${eventId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("Event deleted successfully!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });

          const allEventsResponse = await fetch(`http://localhost:3000/events`);
          const allEventsData = await allEventsResponse.json();
          const createdByList = allEventsData.map((event) => event.createdBy);
          console.log(createdByList);

          if (!createdByList.includes(userId)) {
            const userResponse = await fetch(
              `http://localhost:3000/users/${userId}`,
              {
                method: "DELETE",
              }
            );

            if (userResponse.ok) {
              console.log("Deleted user.");
            } else {
              console.log(
                "Error deleting user.",
                userResponse.status,
                userResponse.statusText
              );
              toast.error("Error deleting user...", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }
          }

          const searchParams = new URLSearchParams();
          searchParams.append("toast", "Event deleted successfully!");
          navigate({
            pathname: "/",
            search: `?${searchParams.toString()}`,
          });
        } else {
          console.log(
            "Error deleting event:",
            response.status,
            response.statusText
          );
          toast.error("Error deleting event...", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else {
        console.log("Event not found:", eventResponse.status);
        toast.error("Event not found...", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error) {
      console.log("Error deleting event:", error);
    }
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const renderEventDetails = () => {
    if (isEditing) {
      return (
        <EventDetails
          event={editedEvent}
          categories={categories}
          users={users}
          isEditing={true}
          handleEditClick={handleCancelClick}
          handleDeleteClick={handleDeleteClick}
        />
      );
    } else {
      return (
        <EventDetails
          event={event}
          categories={categories}
          users={users}
          isEditing={false}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      );
    }
  };

  return (
    <Box p={4}>
      <ToastContainer />
      {renderEventDetails()}
      <EventDeleteConfirmation
        isOpen={isConfirmationOpen}
        handleCloseConfirmation={handleCloseConfirmation}
        handleDeleteConfirmation={handleDeleteConfirmation}
      />
      <EventEditModal
        isOpen={isModalOpen}
        event={editedEvent}
        categories={categories}
        users={users}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        handleCancelClick={handleCancelClick}
      />
    </Box>
  );
};
