import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Flex,
} from "@chakra-ui/react";

const SearchBar = ({
  searchTerm,
  handleSearch,
  categories,
  selectedCategories,
  handleCategoryFilter,
}) => {
  return (
    <FormControl>
      <Flex align="center" justify="space-between" m={4}>
        <FormLabel>Search:</FormLabel>
        <Input value={searchTerm} onChange={handleSearch} mr={4} />

        <FormLabel>Categories:</FormLabel>
        {categories.map((category) => (
          <Checkbox
            key={category.id}
            value={category.id}
            isChecked={selectedCategories.includes(category.id)}
            onChange={() => handleCategoryFilter(category.id)}
            mr={4}
          >
            {category.name}
          </Checkbox>
        ))}
      </Flex>
    </FormControl>
  );
};

export default SearchBar;
