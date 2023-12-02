import { envs } from "./envs.plugin"

describe ('env plugin', () => {
    test('should get envs', () => {

    expect( envs ).toEqual({
    "MAILER_EMAIL": "jhonimedin@gmail.com",
    "MAILER_SECRET_KEY": "tzkbpiakhrfpcipt",
    "MAILER_SERVICE": "gmail",
    "MONGO_DB_NAME": "NOC",
    "MONGO_PASS": "example",
    "MONGO_URL": "mongodb://root:example@localhost:27017/?authMechanism=DEFAULT",
    "MONGO_USER": "root",
    "PORT": 3000,
    "PROD": false,
    })
    })

    test('should return error if not found env', async ()=>{
        jest.resetModules();
        process.env.PORT = "ABC";
        try {
            await import ('./envs.plugin')
            expect(true).toBe(false);
        }catch(error){
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }
    })
})