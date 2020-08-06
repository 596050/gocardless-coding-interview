// they send an easy problem to solve

// 1. implement an API that captures the heartbeat of some legacy systems and

// 2. implement another API that reports those that has not sent a heartbeat for more than N seconds

// They sent me a small piece of pseudocode of a web crawler and they asked me questions about what could fail, how it could be improve, architecture design of it and some edge cases such as redirect managements, exceptions, duplicate resources, etc.
// The coding challenge involved using an API to update a frontend UI.
// (Questions related to the programming language you choose OOP)

<!-- redirect managements, exceptions, duplicate resources, etc. -->

// --------------------------------------

// 1. implement an API that captures the heartbeat of some legacy systems and

// 2. implement another API that reports those that has not sent a heartbeat for more than N seconds

// Scenario creating RESTful service to post heartbeats for server monitoring and provideRESTFul interface for getting the data.

// configured list of servers
// register a server with you

// CORS
// ip address and port?
// backkoff algorithm to stop health check calls?
// Lazily read from the file
// Redis, relational database, NoSQL
// multiple instances writing to the file
// hashing function to check
// which server is contacting, hostname
// distributed systems
// security
// websockets - would the implementation change
// How to get local time
// hostname of our website and not the source of the request
// authentication
// check other services for health check and last N seconds report
// port number, heartbeat number
// time since last checkin
// dynamic configuration, multiple servers acting on a single data source
// postgres, redis, mongo
// set up database server, capture
// NoSQL would give more flexibility for different types of server accessing this service
// use a relational database for structured information
// testing
