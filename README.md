# Recipe Sharing Application

## Overview
This is a Recipe Sharing Application built with **Angular**. Users can register, post, view, edit, and delete recipes. The project demonstrates the use of Angular fundamentals, including **components, services, routing, reactive forms, and change detection**, as well as integration with a mock backend using `json-server`.

## Core Features

### 1. Recipe Display
- **Home Page**: Displays a list of recipes, each with a **title, short description, and thumbnail image**.
- **Recipe Detail View**: Clicking a recipe shows full details including **ingredients, cooking instructions, prep time, and author information**.

### 2. Adding Recipes
- Form for submitting new recipes with fields for:
  - Title
  - Description
  - Ingredients
  - Instructions
  - Thumbnail image
- Uses **Angular Reactive Forms** with validation (required fields, minimum lengths, and uppercase password validation).

### 3. Editing and Deleting Recipes
- Users can **edit or delete** their own recipes after posting.
- Updates propagate to the mock backend (`json-server`) automatically.

### 4. Search Functionality
- A **search bar** filters recipes by **title or description**.
- Users can hit **enter** to search.
- Search results are displayed on a dedicated search page.

### 5. Routing
- Implemented using **Angular Router**.
- Routes include:
  - `/` → Home page with recipe lists
  - `/recipe/:id` → Recipe detail view
  - `/add` → Recipe submission form
  - `/search` → Search results page
  - `**` → 404 Not Found page

### 6. Favorites (Bonus Feature)
- Users can **mark recipes as favorites**.
- Favorites are stored in the user data in the mock backend.
- Filter recipes by favorites on a dedicated page.

### 7. Sorting
- Recipes can be sorted by:
  - Popularity (number of likes)
  - Quickest prep time
  - Latest recipes
- Sorting applies both to home page sections and search results.

## Additional Features Implemented
- **Change Detection Management**: Used `ChangeDetectionStrategy.OnPush` in key components for optimized performance.
- **Likes System**: Increment recipe likes when a user favorites a recipe.
- **Reactive Forms Validation**:
  - Password requires at least one uppercase letter.
  - Password and confirm password matching validation.
- **Responsive UI**: Designed to look good on mobile and desktop screens.
- **Error Handling**: Displays error messages for invalid inputs or backend failures.
- **Standalone Components Architecture**: Many components are standalone for easier reusability.
- **Slice Recipes**: Display a limited number of recipes per section using an `@Input()` slice property.
- **User Authentication (Firebase optional)**: Supports user registration and login.
- **Multi-Language Support (ngx-translate)**: Prepared for internationalization.
- **Smooth UI Transitions**: Implemented smooth transitions for login/signup forms.

## Technical Details

### Components
- `RecipeListComponent`: Displays multiple recipe sections.
- `RecipeDetailComponent`: Shows full recipe details.
- `RecipeFormComponent`: Handles recipe submission and editing.
- `SortedRecipesComponent`: Displays recipes sorted or filtered based on inputs.
- `SearchComponent`: Displays search results.
- `PurchasedProductsComponent`: (Optional) Example of OnPush usage and data fetch.
- `SearchBarComponent`: Handles search input and routing.

### Services
- `RecipeService`: Handles CRUD operations for recipes via `json-server`.
- `UserService`: Manages user authentication, favorites, and likes.

### Mock Backend
- Database located at `app/database/db.json`.

### To Start App
-run:
-npm install -g json-server // to install json server
-json-server --watch db.json --port 3000 // in integrated terminal to run json server
-ng serve // to run angular project



