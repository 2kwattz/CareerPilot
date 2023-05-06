const roshanProfile = {

    name: "Roshan Bhatia",
    college: "Parul University",
    anyGirlfriends: "No"
};

const jsonProfile = JSON.stringify(roshanProfile)

console.log(roshanProfile);
console.log(jsonProfile);
console.log(JSON.parse(jsonProfile));