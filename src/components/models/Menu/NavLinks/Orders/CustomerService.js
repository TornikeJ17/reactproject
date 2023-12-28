// CustomerService.js

export const CustomerService = {
    getCustomers: (params) => {
        // Simulate a real API call with parameters like lazyState
        // For now, we'll just return a promise that resolves to static data

        // If you have a lazy event, you might want to handle pagination, sorting, etc. here
        // For simplicity, ignoring params and returning static data

        return new Promise((resolve) => {
            // This would be your data array for customers
            const customers = [
                {
                    id: "1000",
                    code: "f230fh0g3",
                    name: "Bamboo Watch",
                    description: "Product Description",
                    image: "bamboo-watch.jpg",
                    price: 65,
                    category: "Accessories",
                    quantity: 24,
                    inventoryStatus: "INSTOCK",
                    rating: 5,
                },
                {
                    id: "1000",
                    code: "f230fh0g3",
                    name: "Bamboo Watch",
                    description: "Product Description",
                    image: "bamboo-watch.jpg",
                    price: 65,
                    category: "Accessories",
                    quantity: 24,
                    inventoryStatus: "INSTOCK",
                    rating: 5,
                },
                {
                    id: "1000",
                    code: "f230fh0g3",
                    name: "Bamboo Watch",
                    description: "Product Description",
                    image: "bamboo-watch.jpg",
                    price: 65,
                    category: "Accessories",
                    quantity: 24,
                    inventoryStatus: "INSTOCK",
                    rating: 5,
                },
                // ... More customers
                // ... additional customer objects
            ];

            const response = {
                totalRecords: customers.length, // total number of records
                customers: customers, // array of customer records
                // ... you can add additional fields that your front end expects
            };

            // Resolve the promise with the response object
            resolve(response);
        });
    },
};
