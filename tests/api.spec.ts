import { test, expect, request } from '@playwright/test';

const url = "https://nlgshhex6jui2uxpe5gihvsntm0vnbev.lambda-url.ap-southeast-1.on.aws/fantastic-smoothie/order";
const Headers = { "entry-pass": "100-dollar-bill" };


test.describe('invalid size and no entry-pass', () => {
    test('invalid entry-pass', async ({ request }) => {
        const response = await request.post(url, {
            data: {
                "size": "l",
                "fruits": ["watermelon", "watermelon", "strawberry"]
            }
        });

        expect(response.status()).toBe(402);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "payment_required", 
                "message": "not my customer, bye" } 
            } 
        );
        // console.log(responseBody);
    });
    test('size null', async ({ request }) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": null,
                "fruits": ["watermelon", "watermelon", "strawberry"]
            }
        });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "incomplete_menu", 
                "message": "incomplete menu" } 
            } 
               
        );
        // console.log(responseBody);
    });
    test('invalid size', async ({ request }) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "xl",
                "fruits": ["watermelon", "watermelon", "strawberry"]
            }
        });

        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            {
                result: { code: 'not_for_sale', message: 'given option is not for sale' }
            }
        );
        // console.log(responseBody);
    });
    
});

test.describe("size s" , ()=> {
    test("s fruit null" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "s",
                "fruits": []
            }
        });
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "incomplete_menu", 
                "message": "incomplete menu" } 
            } 
        );
    })
    test("S overload" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "s",
                "fruits": ["banana" , "watermelon"]
            }
        });
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "overload", 
                "message": "fruit overload" } 
            }  
        );
    })
    test("S not for sale fruit" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "s",
                "fruits": ["orange"]
            }
        });
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            {
                result: { code: 'not_for_sale', message: 'given option is not for sale' }
            }
        );
    })
    test("S watermelon +no milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "s",
                "fruits": ["watermelon"] ,
                "milk" : null 
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "success", 
                "message": "have a good one!", 
                "fullMenuName": "watermelon sunshine briss" }
               }
               
        );
    })
    test("S watermelon +almond milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "s",
                "fruits": ["watermelon"] ,
                "milk" : "almond" 
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "success", 
                "message": "have a good one!", 
                "fullMenuName": "watermelon sunshine shake" }
               }
               
        );
    })
    test("S banana +no milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "s",
                "fruits": ["banana"] ,
                "milk" : null 
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "success", 
                "message": "have a good one!", 
                "fullMenuName": "banana paradise briss" }
               }
               
        );
    })
    test("S strawberry +no milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "s",
                "fruits": ["strawberry"] ,
                "milk" : null 
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "success", 
                "message": "have a good one!", 
                "fullMenuName": "strawberry paradise briss" }
               }
               
        );
    })
    test("S strawberry +skim milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "s",
                "fruits": ["strawberry"] ,
                "milk" : "skim" 
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "success", 
                "message": "have a good one!", 
                "fullMenuName": "strawberry paradise shake" }
               }
               
        );
    })
    test("S not for sale milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "s",
                "fruits": ["strawberry"] ,
                "milk" : "Chocolate" 
            }
        });
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "not_for_sale", 
                "message": "given option is not for sale" } 
            } 
               
        );
    })
})
