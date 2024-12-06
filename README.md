# Seasonistas

# Best practice 

1. Create a Centralized API Routes File
Start by creating a file like apiRoutes.ts in your React project, ideally in a folder dedicated to API utilities (e.g., `src/api/`).

`apiRoutes.ts`
In this file, define each API route as a constant. This makes it easy to reference and update in one place if the routes change. You can use TypeScript to add type safety.


`// src/api/apiRoutes.ts`

const `BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";`

```
const apiRoutes = {
  // User routes
  getUser: (userId: string) => `${BASE_URL}/api/user/${userId}`,
  updateUser: (userId: string) => `${BASE_URL}/api/user/${userId}`,
  deleteUser: (userId: string) => `${BASE_URL}/api/user/${userId}`,

  // Auth routes
  login: `${BASE_URL}/api/auth/login`,
  register: `${BASE_URL}/api/auth/register`,
  
  // Listings routes
  getAllListings: `${BASE_URL}/api/listings`,
  getListingById: (listingId: string) => `${BASE_URL}/api/listings/${listingId}`,
  updateListing: (listingId: string) => `${BASE_URL}/api/listings/${listingId}`,
  
  // More routes as needed
  // ...
};

export default apiRoutes;
```

2. Add `REACT_APP_API_BASE_URL` to .env
To make this adaptable across different environments (development, staging, production), define the base URL in your environment file:

`REACT_APP_API_BASE_URL=https://your-production-api-url.com`
3. Using the Centralized Routes with Axios
In your components or services, import apiRoutes to make API calls with axios or any other HTTP client.

Here’s how you might use these routes in a service or component:

Example with Axios
Setup Axios Instance:

```
// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
```

Make API Calls with Centralized Routes:

```
import axiosInstance from './axiosInstance';
import apiRoutes from './apiRoutes';

// Example function to get a user
export const getUser = async (userId: string) => {
  const response = await axiosInstance.get(apiRoutes.getUser(userId));
  return response.data;
};

// Example function to update a listing
export const updateListing = async (listingId: string, data: any) => {
  const response = await axiosInstance.patch(apiRoutes.updateListing(listingId), data);
  return response.data;
};
```

Using in Components:

Now you can call these functions from your components:

```
import { useEffect, useState } from 'react';
import { getUser, updateListing } from '../api/yourApiFunctions';

const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser(userId);
      setUser(userData);
    };

    fetchUser();
  }, [userId]);

  // Render user profile...
};
```
