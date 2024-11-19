# Poetry Application

## Overview
The Poetry Application is a web-based platform that allows users to search for poems by author or title or both. It leverages Angular as the frontend framework and integrates with a poetry database API for fetching poem data. The application offers a user-friendly interface where users can enter search criteria, browse through poem results, and view the full text of selected poems.

The application is designed with a clean and organized UI, providing a seamless user experience while navigating through the search, poem list, and poem detail views.

## Key Features
- **Search Functionality**: Users can search for poems by either author or title, or both. Partial matching is supported to accommodate searches with limited information.
- **Poem Selection**: Upon searching, users are presented with a list of poems matching the search criteria. The list can be scrolled and clicking on any poem displays its details.
- **Poem Details View**: Users can read the complete poem text with each line presented neatly, with a sticky back button that allows easy navigation.
- **Sticky Navigation**: The "Back" button remains visible while scrolling, ensuring easy navigation throughout the app.
- **State Persistence**: The app maintains view state across components, enabling a consistent navigation experience.

## Architecture
The Poetry Application follows a modular architecture with the following components:

1. **App Component**: The root component that initializes the entire application. It includes shared elements like the header and the main application container.

2. **Poetry Component**: Manages the core functionality of the poetry search and display. It acts as the main container for the search form, poem list, and poem details.

3. **Search Form Component**: Allows users to input author or title information and triggers searches.

4. **Poetry List Component**: Displays a list of poems matching the search query. Users can select a poem from this list to view the full details.

5. **Poem Detail Component**: Displays the full text of a selected poem with each line styled for readability.

6. **State Service**: Manages the application's state, particularly view-related states, such as switching between search view, poem list, and poem detail.

7. **Poetry Service**: Handles API calls to the poetry database. It includes methods for fetching poems by author, title, or both.

## Technologies Used
- **Angular**: Frontend framework for building UI components and managing the application's state.
- **TypeScript**: The primary language for writing Angular components and services.
- **HTML/CSS**: Used for structuring and styling the UI components.
- **RxJS**: Utilized for handling asynchronous data streams and managing observables within the application.
- **PoetryDB API**: An external API used to fetch poem data based on user searches.

## Installation
To run the Poetry Application locally, follow these steps:

1. **Clone the Repository**:
  ```bash
     git clone https://github.com/username/poetry-application.git
     cd poetry-application
  ```
2. **Install Dependencies**
  ```bash
     npm install
  ```

3. **Run the Application**
  ```bash
     ng serve
  ```
The application should now be available at http://localhost:4200/.

## How to Use

1. **Search for a poem**: On the home screen, enter the name of the author, the title, or both, and click on the "Search" button.
   
2. **Browse Poem Results**: If multiple results are returned, you can scroll through the list of poems.
   
3. **View Poem Details**: Click on a poem to see the full text and additional information.
   
4. **Navigate Back**: Use the sticky "Back" button to return to the search or poem list.

## Areas for Improvement
1. **Search Result Refinement**: Currently, if both author and title are supplied, the search returns all poems by the author and separately returns all poems matching the title. This behavior could be refined to filter results based on exact matches for both author and title. 
2. **Error Handling**: Error messages are displayed on the front end, but handling could be enhanced to provide better feedback (e.g., suggestions for typos, loading animations while searching). 
3. **Lazy Loading**: Implementing lazy loading for components such as the poem detail view could help improve the performance, especially for users on slower networks. 
4. **Caching Search Results**: Implementing caching for search results can prevent redundant API calls when users navigate between views. 
5. **Styling Improvements**: The current styling is functional but could be enhanced with animations or transitions to provide a more engaging user experience. For example, adding fade-in effects for the poem list and detail view.

## Future Possibilities
1. **User Favorites**: Add functionality for users to mark poems as favorites and store their list for future reference. 
2. **Offline Mode**: Allow users to save poems for offline viewing, improving usability for those with limited internet access. 
3. **Pagination**: Implement pagination for large result sets to improve user experience when browsing extensive lists of poems. 
4. **Advanced Search Filters**: Add advanced filtering capabilities, such as filtering by genre, poem length, or popularity. 
5. **Internationalization (i18n)**: Support multiple languages for a broader audience by implementing Angular's i18n features.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
