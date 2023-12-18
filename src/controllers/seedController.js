var createError = require('http-errors')

const users = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "securepassword1",
      address: "123 Main St, City, Country",
      phone: "123-456-7890",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password123",
      address: "456 Park Ave, Town, Country",
      phone: "987-654-3210",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      password: "strongpassword",
      address: "789 Elm Rd, Village, Country",
      phone: "555-123-4567",
    },
    {
      name: "Bob Williams",
      email: "bob.williams@example.com",
      password: "secret123",
      address: "321 Oak Ln, City, Country",
      phone: "777-888-9999",
    },
    {
      name: "Eve Anderson",
      email: "eve.anderson@example.com",
      password: "myp@ssword",
      address: "654 Pine St, Town, Country",
      phone: "444-555-6666",
    },
    {
      name: "John Doe",
      email: "john.doeaa@example.com",
      password: "securepassword1",
      address: "123 Main St, City, Country",
      phone: "123-456-7890",
    },
    {
      name: "Jane Smith",
      email: "jane.smithaa@example.com",
      password: "password123",
      address: "456 Park Ave, Town, Country",
      phone: "987-654-3210",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnsonaa@example.com",
      password: "strongpassword",
      address: "789 Elm Rd, Village, Country",
      phone: "555-123-4567",
    },
    {
      name: "Bob Williams",
      email: "bob.williamsaa@example.com",
      password: "secret123",
      address: "321 Oak Ln, City, Country",
      phone: "777-888-9999",
    },
    {
      name: "Eve Anderson",
      email: "eve.andersonaa@example.com",
      password: "myp@ssword",
      address: "654 Pine St, Town, Country",
      phone: "444-555-6666",
    },
    {
      name: "John Doe",
      email: "john.doejj@example.com",
      password: "securepassword1",
      address: "123 Main St, City, Country",
      phone: "123-456-7890",
    },
    {
      name: "Jane Smith",
      email: "jane.smithjj@example.com",
      password: "password123",
      address: "456 Park Ave, Town, Country",
      phone: "987-654-3210",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnsonjj@example.com",
      password: "strongpassword",
      address: "789 Elm Rd, Village, Country",
      phone: "555-123-4567",
    },
    {
      name: "Bob Williams",
      email: "bob.williamsjj@example.com",
      password: "secret123",
      address: "321 Oak Ln, City, Country",
      phone: "777-888-9999",
    },
    {
      name: "Eve Anderson",
      email: "eve.andersonjj@example.com",
      password: "myp@ssword",
      address: "654 Pine St, Town, Country",
      phone: "444-555-6666",
    },
  ];

  const User = require('../models/userModel')


const seedController =async (req,res,next)=>{
    
    try {

        await User.deleteMany()

        const resultUsers = await User.insertMany(users)
        res.status(201).json(resultUsers)

       
    } catch (error) {
        next(error)
    }

}

module.exports = {seedController}