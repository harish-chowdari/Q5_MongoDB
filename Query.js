db.users.aggregate([ 
    { $group: 
        {
            _id: null,
            totalUsers: { $sum: 1 },
            AverageAge: { $avg: "$age" },
            countries: { $push: "$country" }
        } 
    },

    { $unwind: "$countries" }, 

    { $group: 
        { 
            _id: "$countries",
            totalUsersInCollection: { $first: "$totalUsers" },
            AverageAgeOverAll: { $first: "$AverageAge" },
            userByCountry: { $sum: 1 } 
        } 
    }, 

    { $project: 
        { 
            _id: 0, 
            totalUsersInCollection: 1,
            AverageAgeOverAll: 1,
            country: "$_id", userByCountry: 1 
        } 
    }
])