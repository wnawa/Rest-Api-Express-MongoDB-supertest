const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../index");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DATABASE_URL);
});
//1-We use “describe ”function to describe the unit test. 
//it is like a suit which groups together a set of individual tests related to it.
//it will help identify tests in test results
describe('api tests: regres api', () => {
    //2-In it/test function, we write the actual test code. Tell what the test performs in the first argument, 
    //and then in the second argument, write a callback function that contains the test code.
    test('should return all users', async () => {
        //3-In the callback function, the request is sent to the endpoint first, 
        const res = await request(app)
            .get('/api/getall')
        //and the expected and actual responses are then compared. 
        //The test passes if both answers match, else, it fails
        expect(res.ok).toBe(true);
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        expect(res.body.length).toBeGreaterThan(0);
    });
    test('should return a single user', async () => {
        const res = await request(app)
            .get('/api/getOne/65cb771c28d0050876030f5e')
        expect(res.statusCode).toBe(200);
        expect(res.body["name"]).toBe("walaa");
    });
    // // test('should create a new user', async () => {
    // //     const res = await request(app)
    // //         .post('/api/post')
    // //         .send({
    // //             "name": "zotho",
    // //             "age": 100
    // //         })

    // //     expect(res.statusCode).toBe(201);
    // //     expect(res.body["name"]).toBe("zotho");

    // // });

    test('should update a user', async () => {
        const res = await request(app)
            .patch('/api/update/65cb771c28d0050876030f5e')
            .send({
                "name": "walaa",
                "age": "80"
            })
            .expect(200);
        expect(res.body.age).toEqual(80);
   
    });
});

test('should delete a user', async () => {
    await request(app)
        .delete('/api/delete/65cbc1737adf5959a7853cda')//it will fail we dont have id 2
        .expect(200);
});
/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});