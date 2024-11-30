import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeCreate from "./components/EmployeeCreate";
import EmployeeUpdate from "./components/EmployeeUpdate";
import Body from "./components/Body";
import Homepage from "./components/Homepage";
import "bootstrap/dist/css/bootstrap.min.css";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                employees: {
                    merge: (existing, incoming) => incoming,
                },
            },
        },
    },
});

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache,
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <Body />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                path: "/employeelist",
                element: <EmployeeList />,
            },
            {
                path: "/employeelist/:employeeid",
                element: <EmployeeDetails />,
            },
            {
                path: "/employeelist/employeeCreate",
                element: <EmployeeCreate />,
            },
            {
                path: "/employeelist/update/:employeeid",
                element: <EmployeeUpdate />,
            },
        ],
    },
]);

function App() {
    return (
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    );
}

export default App;
