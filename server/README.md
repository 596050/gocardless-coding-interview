https://docs.microsoft.com/en-us/azure/architecture/patterns/health-endpoint-monitoring

https://docs.microsoft.com/en-us/azure/architecture/patterns/health-endpoint-monitoring
// they send an easy problem to solve

First was about 30 mins where you had figure out bugs in already written web crawler code and design your system architecture for a web crawler. Really liked this one as it was challenging and engaging. The interviewer helped me out when I got stuck too. The second was a pair programming exercise about 30 mins where you had to make api calls and format the resulting data into a csv file. This one was fairly easy.

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

<!-- // CORS -->
<!-- // ip address and port? -->
<!-- // backoff algorithm to stop health check calls? -->
<!-- // multiple instances writing to the file -->
<!-- // which server is contacting, hostname
// distributed systems -->

// Lazily read from the file
// index on the last check in column, to quickly find the matching serverId entries
// Redis, relational database, NoSQL
// hashing function to check
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
// how to do this for a distributed system?
// rate limiting
// configuring cors
// dynamic configuration
// security
// websockets - would the implementation change
// how else to identify servers
// What happens if the number of servers change?
// load balancer? How to implement

// pain points

- how to take direct debit payments - agreements with banks
- Add banks across the globe - build a system which adds a new banking system with different payment mechanism

- distrubted system - redis and memcache, rate limiting for distributed system
- fast transactions
- assumptions

- national payments -
- international payments - distributed, redundancy

Simple

Setting up payment details only takes two minutes for customers to complete online.

Transparent

Customers will always be notified by email when a subscription is starting or one-off payment is being taken.

Efficient

No more customers writing out and posting cheques, logging in to online banking or forgetting to pay.

Safe and protected

Your customers’ payments are if a payment is ever taken in error.

International payments

Collect payments from customers around the world, including the UK, Eurozone countries, the USA, Canada and Australia.

Completely customisable

Customise our out-of-the-box payment pages, or build your own bespoke integration using our .

Real-time alerts

Get notified by email for any failed payment or customer cancellation. Sit back and let Success+ intelligently retry any payments that do fail.

Fully safe and secure

GoCardless is authorised by the Financial Conduct Authority, and ISO27001 certified for security standards.

// api to bank
