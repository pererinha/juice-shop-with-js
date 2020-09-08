# write-up of the vulnerable juice shop 
https://github.com/bkimminich/juice-shop

# authorization header
for some requests the juice shop app checks if the user that is authenticated, it is doing it by reading the value of the variable `Authorization` at the header

you will also need to send this information on the requests that you will do by using the js files, in order to copy do it you need to follow the steps below:

- after you log in with a user
- open the *network* tab of your browser and navigate at the app
- notice that at the request there is a header entry named `Authorization`, that is the [jwt token](https://jwt.io/) the app is using to check if the user is authenticated
- copy that entry `Bearer eyJ0eXAiOiJKV1...`
- paste the content of this value at the file `auth.js`

# broken access control
## admin section 
🕷🕷 

*access the administration section of the store*
### howto
in order to access the admin area you have to first be authenticated as administrator 

once that is done you can try to search on the javascripts anything that starts with admin

eventually you will find the path `/#/administration`

## five-star feedback
🕷🕷 
*get rid of all 5-star customer feedback*

### howto
the script `five-star-feedback.js` will read all the feedbacks, filter the ones with 5 stars and remove them all

to run it
```shell
node five-star-feedback.js
```
note: this request will need the `Authorization` header.

## csrf
🕷🕷🕷

*change the name of a user by performing Cross-Site Request Forgery from another origin*


## easter egg
🕷🕷🕷🕷

*find the hidden easter egg*

## five-star feedback
🕷🕷

*get rid of all 5-star customer feedback*

## forged feedback
🕷🕷🕷
*post some feedback in another users name*

#### howto
- open the feedback form
- change the value of the field `#userId` before submitting the form by running the following command at the console of your browser

```javascript
document.querySelector('#userId').value = '1'
```


## forged review
🕷🕷🕷

*post a product review as another user or edit any user's existing review*

### howto

first of all, add a review to any product and take a look at the request that the browser is sending

it is sending a `PUT` request to the endpoint `/rest/products/${productId}/reviews` and the variables it is sending are `author` and `message`

now open the file `forged-review.js` replace the content of the variables you want, like changing the `author` by any other email

to send the request run:
```shell
node forged-review.js
```

note: this request will need the `Authorization` header.

## manipulate basket
🕷🕷🕷

*put an additional product into another user's shopping basket*

### howto

open the *network* tab of your browser and add a product into your cart
the script of the file `manipulate-basket.js` will send the same request to the app, remember to change the variables to another user

to send the request run:
```shell
node manipulate-basket.js
```

note: this request will need the `Authorization` header.

## product tampering
🕷🕷🕷

*change the href of the link within the OWASP SSL Advanced Forensic Tool (O-Saft) product description into https://owasp.slack.com*

## ssrf
🕷🕷🕷🕷🕷🕷

*request a hidden resource on server through server*

## view basket
🕷🕷

*view another user's shopping basket*

#### howto
open the *network* tab of your browser and open your cart

open the file `view-basket.js` and replace the content of the variable `hackedBasketId` by the basket id you want to see


run 
```shell
node view-basket.js
```
note: this request will need the `Authorization` header.

so you will see something like

```json
{
  "status": "success",
  "data": {
    "id": 7,
    "coupon": null,
    "createdAt": "2020-09-03T22:45:48.811Z",
    "updatedAt": "2020-09-03T22:45:48.811Z",
    "UserId": null,
    "Products": [
      {
        "id": 1,
        "name": "Apple Juice (1000ml)",
        "description": "The all-time classic.",
        "price": 1.99,
        "deluxePrice": 0.99,
        "image": "apple_juice.jpg",
        "createdAt": "2020-09-03T19:59:21.379Z",
        "updatedAt": "2020-09-03T19:59:21.379Z",
        "deletedAt": null,
        "BasketItem": {
          "id": 20,
          "quantity": 1,
          "createdAt": "2020-09-04T18:35:19.047Z",
          "updatedAt": "2020-09-04T18:35:19.047Z",
          "BasketId": 7,
          "ProductId": 1
        }
      }
    ]
  }
}
```

# broken anti automation
## captcha bypass
🕷🕷🕷

*submit 10 or more customer feedbacks within 10 seconds*

### howto

post one simple feedback and check the request at the *network* tab

notice that at the data you are sending you are also sending the `captchaId` and also the `captcha` that is the value of it, that means that the captcha validation will be done at the server side, by using this `captchaId`, as we aren't changing its value we are good to go

open the file `captcha-bypass.js` and replace the values of `captcha` and `captchaId` by the ones that you saw on the request of your browser

you can send the request by running

```shell
node captcha-bypass.js
```
note: this request will need the `Authorization` header.

# broken authentication
## login admin
🕷🕷

*log in with the administrator's user account*

### howto
we know that the admin email is `admin@juice-sh.op`

we also know that their password is weak

the script `login-admin.js` will read a list of passwords and try them all, the list of passwords is at the file `passwords-list.txt`


enter the following command to run it
```shell
node login-admin.js
```

the result will be
```
Invalid password 123456
Invalid password 123456789
Invalid password password
Invalid password qwerty
Invalid password 111111
Invalid password 12345678
Invalid password abc123
Invalid password 1234567
Invalid password 12345
Invalid password password1
Invalid password admin123456
Invalid password adminadmin
The password "admin123" works! 🏆
```

# cryptographic issues
# improper input validation
## missing encoding
🕷

*retrieve the photo of bjoern's cat in "melee combat-mode"*
### howto

open the photo wall

notice that the first image is missing

it has an encode problem, by using the *inspectpr* copy the url of the image (`assets/public/images/uploads/😼-#zatschi-#whoneedsfourlegs-1572600969477.jpg`)


you can use the javascript method `encodeURIComponent` to encode it properly, run the following command at your console
```javascript
encodeURIComponent('assets/public/images/uploads/😼-#zatschi-#whoneedsfourlegs-1572600969477.jpg')
```

the result will be 
```
assets%2Fpublic%2Fimages%2Fuploads%2F%F0%9F%98%BC-%23zatschi-%23whoneedsfourlegs-1572600969477.jpg
```

replace the url of the image by the encoded one

## repetitive registration
🕷

*follow the dry principle while registering a user*

### howto
when you are creating a new user you will notice that when you are typing the password verification, it will check if it matches the password field, make sure that it matches

after that, change the field password, it won't run this verification again

save the user

## zero stars
🕷

*give a devastating zero-star feedback to the store*

### howto

open the feedback form

fill all the field

open the console log of your browser and enable the button, by using the code below

```javascript
document.querySelector('#submitButton').disabled = false;
```

submit the form
# injection
## login admin
🕷🕷

*log in with the administrator's user account*
### howto

you can start by adding a `'` at the email and password inputs 

observe the *network* tab and you will see something like

```sql
SELECT * FROM Users WHERE email = ''' AND password = '3590cb8af0bbb9e78c343b52b93773c9' AND deletedAt IS NULL
```

once you know that you can just enter `' OR 1=1; --'` at the input email and you will be logged in as admin, by doing that it will return all the users of database and autheticate with the first one

# insecure deserialization
# miscellaneous
## score board
🕷

*find the carefully hidden 'Score Board' page*

### howto

you can guess the url or check at the javascript of the app

http://localhost:3000/#/score-board

## privacy policy
🕷

*read our privacy policy*
### howto

just read it
# security misconfiguration
## error handling
🕷

*provoke an error that is neither very gracefully nor consistently handled*

### howto

that will eventually happen :) 

just use the app

## deprecated interface
🕷🕷
*use a deprecated b2b interface that was not properly shut down*

# security through obscurity
# sensitivity data exposure
## confidential document
🕷

*access a confidential document*

### howto

you know that the url `/robots.txt` has information to about how pages or folders should not be indexed by searchengines

open this file and notice that the app has a hidden folder named `/ftp`

open this folder and take a look at the files on it

## exposed metrics
🕷

*find the endpoint that serves usage data to be scraped by a popular monitoring system*

### howto

google what is the default endpoint used by prometeus

it is `/metrics`

# unvalidated redirect
## outdated whitelist
🕷

*let us redirect you to one of our crypto currency addresses which are not promoted any longer*

### howto

you can find the btc url by looking at the js files `/redirect?to=https://blockchain.info/address/1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm`
# vulnerable components
# xss
## dom xss
🕷
*perform a DOM XSS attack with `<iframe src="javascript:alert(`xss`)">`.* 

### howto

when you perform a search you will notice that what you search for is reflected into the dom

once you know that you can just type the string `<iframe src="javascript:alert(`xss`)">` at the search bar
# xxe
