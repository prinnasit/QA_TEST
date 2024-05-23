import { test, expect, request } from '@playwright/test';


const url = "https://nlgshhex6jui2uxpe5gihvsntm0vnbev.lambda-url.ap-southeast-1.on.aws/fantastic-smoothie/order";
const Headers = { "entry-pass": "100-dollar-bill" };

let i = 0;
let j = 0;
let k = 0;
let l = 0;
test.describe('invalid size and no entry-pass', () => {
    
    // test.beforeEach(async ({ page }) => {
    //     console.log('invalid' + i);
    //     i++;

    // });

    

    test('invalid entry-pass', async ({ request }) => {
        const response = await request.post(url, {
            data: {
                "size": "s",
                "fruits": ["watermelon"]
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
                "fruits": ["watermelon", "strawberry"]
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

    test.beforeEach(async ({ page }) => {
        
        console.log('size s' + j);
        j++;
        // await page.waitForTimeout(500); // เพิ่ม await เพื่อรอ timeout
      });


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

test.describe("size m" , ()=> {

    test.beforeEach(async ({ page }) => {
        
        console.log('size m' + k);
        k++;
        // await page.waitForTimeout(500); // เพิ่ม await เพื่อรอ timeout
      });

    test("m fruit null" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "m",
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

    test("M overload" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "m",
                "fruits": ["banana" , "watermelon" , "strawberry"]
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

    test("M not for sale fruit" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "m",
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

    test("M not for sale milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "m",
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
    test("M banana +no milk " , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "m",
                "fruits": ["banana"] ,
                "milk" : null 
            }
        })

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "success", 
                "message": "have a good one!", 
                "fullMenuName": "banana paradise briss" }
               }
               
        )
    })

    test("M banana + watermelon + no milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "m",
                "fruits": ["banana" , "watermelon"] ,
                "milk" : null 
            }
        })

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "success", 
                "message": "have a good one!", 
                "fullMenuName": "tropical sunshine briss" }
               }
               
        )
    })

    test("M strawberry +strawberry + no milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "m",
                "fruits": ["strawberry" , "strawberry"] ,
                "milk" : null 
            }
        })

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "success", 
                "message": "have a good one!", 
                "fullMenuName": "strawberry paradise briss" }
               }
               
        )
    })

        test("M banana + strawberry + skim milk" , async({request}) => {
            const response = await request.post(url, {
                headers: Headers,
                data: {
                    "size": "m",
                    "fruits": ["banana" , "strawberry"] ,
                    "milk" : "skim" 
                }
            })

            expect(response.status()).toBe(200);
            const responseBody = await response.json();
            expect(responseBody).toEqual(
                { 
                    "result": { 
                    "code": "success", 
                    "message": "have a good one!", 
                    "fullMenuName": "tropical paradise shake" }
                   }
                   
            )
        })

        test("M watermelon + watermelon + almond milk" , async({request}) => {
            const response = await request.post(url, {
                headers: Headers,
                data: {
                    "size": "m",
                    "fruits": ["watermelon" , "watermelon"] ,
                    "milk" : "almond" 
                }
            })

            expect(response.status()).toBe(200);
            const responseBody = await response.json();
            expect(responseBody).toEqual(
                { 
                    "result": { 
                    "code": "success", 
                    "message": "have a good one!", 
                    "fullMenuName": "watermelon sunshine shake" }
                   }
                   
            )
        })

        

})


test.describe("size l" , ()=> {

    test.beforeEach(async ({ page }) => {
        
        console.log('size l' + l);
        l++;
        // await page.waitForTimeout(500); // เพิ่ม await เพื่อรอ timeout
      });

    test("l fruit null" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "l",
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
    test("L overload" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "l",
                "fruits": ["banana" , "watermelon" , "strawberry" , "banana"]
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

    test("L not for sale fruit" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "l",
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

    test("L not for sale milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "l",
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

    test("L banana +no milk " , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "l",
                "fruits": ["banana"] ,
                "milk" : null 
            }
        })

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "success", 
                "message": "have a good one!", 
                "fullMenuName": "banana paradise briss" }
               }
               
        )
    })

    test("L banana + watermelon + no milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "l",
                "fruits": ["banana" , "watermelon"] ,
                "milk" : null 
            }
        })

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "success", 
                "message": "have a good one!", 
                "fullMenuName": "tropical sunshine briss" }
               }
               
        )
    })

    test("L banana + strawberry + no milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "l",
                "fruits": ["banana" , "strawberry"] ,
                "milk" : null 
            }
        })

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "success", 
                "message": "have a good one!", 
                "fullMenuName": "tropical paradise briss" }
               }
               
        )
    })

    test("L strawberry +strawberry + no milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "l",
                "fruits": ["strawberry" , "strawberry"] ,
                "milk" : null 
            }
        })

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "success", 
                "message": "have a good one!", 
                "fullMenuName": "strawberry paradise briss" }
               }
               
        )
    })

    test("L banana + banana + banana + no milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "l",
                "fruits": ["banana" , "banana" , "banana"] ,
                "milk" : null 
            }
        })

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "success", 
                "message": "have a good one!", 
                "fullMenuName": "banana paradise briss" }
               }
               
        )
    })


    test("L banana + banana + strawberry + no milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "l",
                "fruits": ["banana" , "banana" , "strawberry"] ,
                "milk" : null 
            }
        })

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "success", 
                "message": "have a good one!", 
                "fullMenuName": "tropical paradise briss" }
               }
               
        )
    })



    test("L watermelon + watermelon + strawberry + skim milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "l",
                "fruits": ["watermelon" , "watermelon" , "strawberry"] ,
                "milk" : "skim" 
            }
        })

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "success", 
                "message": "have a good one!", 
                "fullMenuName": "tropical sunshine shake" }
               }
               
        )
    })

   

    test("L watermelon + banana + strawberry + almond milk" , async({request}) => {
        const response = await request.post(url, {
            headers: Headers,
            data: {
                "size": "l",
                "fruits": ["watermelon" , "banana" , "strawberry"] ,
                "milk" : "almond" 
            }
        })

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual(
            { 
                "result": { 
                "code": "success", 
                "message": "have a good one!", 
                "fullMenuName": "tropical sunshine shake" }
               }
               
        )
    })

    
})
