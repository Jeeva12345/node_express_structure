async function getUsers() {

    try {

        console.log("Fetching users...");

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        console.log("Response received");

        const users = await response.json();

        console.log("Users Data:");

        users.forEach((user) => {
            console.log(user.name);
        });

    } catch (error) {

        console.log("Error:", error.message);

    }
}

getUsers();

console.log("Program continues...");